import type {
  RegisterRequest, LoginRequest, AuthResponse,
  Participant, ParticipantSettings,
  AgentConfig, AgentProfile,
  DiscoverResult, Match, MatchStatus,
  Conversation, Message,
  Activity, ReportReason,
} from "@/types/api";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

function getToken(): string | null {
  return localStorage.getItem("nexus_token");
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || body.message || `API ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

// ─── Auth ───
export const auth = {
  register: (data: RegisterRequest) =>
    request<AuthResponse>("/auth/register", { method: "POST", body: JSON.stringify(data) }),

  login: (data: LoginRequest) =>
    request<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify(data) }),

  refresh: () =>
    request<AuthResponse>("/auth/refresh", { method: "POST" }),
};

// ─── Participants ───
export const participants = {
  me: () => request<Participant>("/participants/me"),

  updateMe: (data: Partial<Participant>) =>
    request<Participant>("/participants/me", { method: "PUT", body: JSON.stringify(data) }),

  getSettings: () => request<ParticipantSettings>("/participants/me/settings"),

  updateSettings: (data: Partial<ParticipantSettings>) =>
    request<ParticipantSettings>("/participants/me/settings", { method: "PUT", body: JSON.stringify(data) }),

  getProfile: (id: string) => request<Participant>(`/participants/${id}`),

  getBlocked: () => request<{ blocked: string[] }>("/participants/me/blocked"),

  block: (id: string) =>
    request<{ message: string }>(`/participants/${id}/block`, { method: "POST" }),

  unblock: (id: string) =>
    request<{ message: string }>(`/participants/${id}/block`, { method: "DELETE" }),
};

// ─── Agent ───
export const agent = {
  create: (data: AgentConfig) =>
    request<AgentProfile>("/participants/me/agent", { method: "POST", body: JSON.stringify(data) }),

  get: () => request<AgentProfile>("/participants/me/agent"),

  update: (data: Partial<AgentConfig>) =>
    request<AgentProfile>("/participants/me/agent", { method: "PUT", body: JSON.stringify(data) }),

  activity: (limit = 50, offset = 0) =>
    request<{ activities: Activity[]; total: number }>(
      `/participants/me/agent/activity?limit=${limit}&offset=${offset}`
    ),
};

// ─── Matches ───
export const matches = {
  discover: (limit = 20, minScore = 0) =>
    request<{ results: DiscoverResult[]; total: number }>(
      `/matches/discover?limit=${limit}&min_score=${minScore}`
    ),

  propose: (targetId: string) =>
    request<Match>(`/matches/propose/${targetId}`, { method: "POST" }),

  accept: (matchId: string) =>
    request<{ match: Match; conversation_id: string; message: string }>(
      `/matches/${matchId}/accept`, { method: "POST" }
    ),

  reject: (matchId: string) =>
    request<{ match: Match }>(`/matches/${matchId}/reject`, { method: "POST" }),

  list: (status?: MatchStatus) =>
    request<Match[]>(`/matches${status ? `?status=${status}` : ""}`),

  get: (matchId: string) => request<Match>(`/matches/${matchId}`),
};

// ─── Conversations ───
export const conversations = {
  list: () => request<Conversation[]>("/conversations"),

  get: (id: string, messageLimit = 20) =>
    request<Conversation & { messages: Message[] }>(
      `/conversations/${id}?message_limit=${messageLimit}`
    ),

  sendMessage: (conversationId: string, content: string, messageType = "text") =>
    request<Message>(`/conversations/${conversationId}/messages`, {
      method: "POST",
      body: JSON.stringify({ content, message_type: messageType }),
    }),

  getMessages: (conversationId: string, limit = 50, before?: string) =>
    request<{ messages: Message[]; has_more: boolean; next_cursor: string }>(
      `/conversations/${conversationId}/messages?limit=${limit}${before ? `&before=${before}` : ""}`
    ),

  markRead: (conversationId: string) =>
    request<{ marked_count: number }>(`/conversations/${conversationId}/read`, { method: "POST" }),

  unreadCount: () => request<{ unread_count: number }>("/messages/unread-count"),
};

// ─── Reports ───
export const reports = {
  create: (participantId: string, reason: ReportReason, details?: string) =>
    request<{ id: string; message: string }>("/reports", {
      method: "POST",
      body: JSON.stringify({ participant_id: participantId, reason, details }),
    }),
};

// ─── WebSocket ───
export function createWebSocket(): WebSocket | null {
  const token = getToken();
  if (!token) return null;
  const wsBase = API_BASE.replace(/^http/, "ws");
  return new WebSocket(`${wsBase}/ws?token=${token}`);
}
