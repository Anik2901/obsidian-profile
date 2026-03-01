// ─── Auth ───
export type ParticipantType = "agent" | "human";

export interface RegisterRequest {
  type: ParticipantType;
  display_name: string;
  bio: string;
  age: number;
  interests: string[];
  location_lat: number;
  location_lon: number;
  radius_km: number;
  avatar_url?: string;
  password: string;
}

export interface LoginRequest {
  did: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  did: string;
  participant_id: string;
  public_key?: string;
}

// ─── Participant ───
export interface Participant {
  id: string;
  did: string;
  display_name: string;
  bio: string;
  age: number;
  interests: string[];
  location_lat: number;
  location_lon: number;
  radius_km: number;
  avatar_url: string;
  type: ParticipantType;
  owner_id?: string;
}

export type ProfileVisibility = "public" | "matches_only";
export type CoordinatePrecision = "city" | "exact" | "hidden";

export interface ParticipantSettings {
  stealth_mode: boolean;
  read_receipts: boolean;
  auto_archive: boolean;
  profile_visibility: ProfileVisibility;
  coordinate_precision: CoordinatePrecision;
}

// ─── Agent ───
export type PersonalityType = "casual" | "intellectual" | "flirty" | "witty";

export interface AgentConfig {
  display_name: string;
  bio: string;
  interests: string[];
  personality_type: PersonalityType;
  auto_match_threshold: number;
  auto_respond: boolean;
  lobby_enabled: boolean;
  avatar_url?: string;
}

export interface AgentProfile extends AgentConfig {
  id: string;
  match_count: number;
  conversation_count: number;
}

// ─── Matching ───
export type MatchStatus = "proposed" | "accepted" | "rejected";

export interface MatchSignals {
  interest: number;
  proximity: number;
  bio_affinity: number;
  trust: number;
  freshness: number;
}

export interface DiscoverResult {
  participant: Participant;
  score: number;
  distance_km: number;
  shared_interests: string[];
  signals: MatchSignals;
}

export interface Match {
  id: string;
  status: MatchStatus;
  participant: Participant;
  score: number;
  signals?: MatchSignals;
  created_at: string;
}

// ─── Conversations & Messages ───
export type MessageType = "text" | "system" | "icebreaker";

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: MessageType;
  created_at: string;
}

export interface Conversation {
  id: string;
  match_id: string;
  participant: Participant;
  last_message?: Message;
  unread_count: number;
  created_at: string;
}

// ─── Activity ───
export type ActivityType = "match_proposed" | "match_accepted" | "match_rejected" | "message_sent" | "report_filed" | "block_created";

export interface Activity {
  id: string;
  participant_id: string;
  activity_type: ActivityType;
  activity_metadata: Record<string, unknown>;
  created_at: string;
}

// ─── Reports ───
export type ReportReason = "spam" | "harassment" | "fake_profile" | "inappropriate" | "other";

// ─── WebSocket ───
export interface WsMessageOut {
  type: "send" | "typing" | "read" | "ping";
  conversation_id?: string;
  content?: string;
  is_typing?: boolean;
}

export interface WsMessageIn {
  type: "connected" | "message" | "typing" | "read" | "pong" | "error";
  participant_id?: string;
  display_name?: string;
  message?: Message;
  conversation_id?: string;
  is_typing?: boolean;
  count?: number;
  detail?: string;
}
