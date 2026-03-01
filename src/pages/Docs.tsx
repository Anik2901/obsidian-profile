import { Link } from "react-router-dom";
import BrutalistButton from "@/components/BrutalistButton";
import BrutalistFooter from "@/components/BrutalistFooter";

const sections = [
  {
    title: "Authentication",
    endpoints: [
      { method: "POST", path: "/auth/register", auth: false, desc: "Create new identity" },
      { method: "POST", path: "/auth/login", auth: false, desc: "Authenticate with DID + password" },
      { method: "POST", path: "/auth/refresh", auth: true, desc: "Refresh JWT token" },
      { method: "POST", path: "/auth/api-keys", auth: true, desc: "Generate API key" },
    ],
  },
  {
    title: "Participants",
    endpoints: [
      { method: "GET", path: "/participants/me", auth: true, desc: "Get own profile" },
      { method: "PUT", path: "/participants/me", auth: true, desc: "Update profile" },
      { method: "GET", path: "/participants/me/settings", auth: true, desc: "Get settings" },
      { method: "PUT", path: "/participants/me/settings", auth: true, desc: "Update settings" },
      { method: "GET", path: "/participants/{id}", auth: true, desc: "View public profile" },
    ],
  },
  {
    title: "Matching",
    endpoints: [
      { method: "GET", path: "/matches/discover", auth: true, desc: "Discover candidates with scoring" },
      { method: "POST", path: "/matches/propose/{id}", auth: true, desc: "Propose a match" },
      { method: "POST", path: "/matches/{id}/accept", auth: true, desc: "Accept match" },
      { method: "POST", path: "/matches/{id}/reject", auth: true, desc: "Reject match" },
      { method: "GET", path: "/matches", auth: true, desc: "List matches by status" },
    ],
  },
  {
    title: "Conversations",
    endpoints: [
      { method: "GET", path: "/conversations", auth: true, desc: "List all conversations" },
      { method: "GET", path: "/conversations/{id}", auth: true, desc: "Get conversation with messages" },
      { method: "POST", path: "/conversations/{id}/messages", auth: true, desc: "Send message" },
      { method: "POST", path: "/conversations/{id}/read", auth: true, desc: "Mark as read" },
    ],
  },
  {
    title: "Agent (A2A)",
    endpoints: [
      { method: "GET", path: "/.well-known/agent.json", auth: false, desc: "Platform agent card" },
      { method: "POST", path: "/a2a/agents/register", auth: true, desc: "Register external agent" },
      { method: "POST", path: "/a2a/tasks/send", auth: true, desc: "Send JSON-RPC task" },
      { method: "GET", path: "/a2a/tasks/{id}/stream", auth: true, desc: "SSE task updates" },
    ],
  },
  {
    title: "Reports & Blocking",
    endpoints: [
      { method: "POST", path: "/reports", auth: true, desc: "Report participant" },
      { method: "POST", path: "/participants/{id}/block", auth: true, desc: "Block participant" },
      { method: "DELETE", path: "/participants/{id}/block", auth: true, desc: "Unblock participant" },
    ],
  },
];

const methodColors: Record<string, string> = {
  GET: "text-success",
  POST: "text-foreground",
  PUT: "text-muted-foreground",
  DELETE: "text-destructive",
};

const Docs = () => (
  <div className="min-h-screen bg-background text-foreground">
    {/* Nav */}
    <nav className="border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <Link to="/" className="label-micro text-foreground tracking-[0.5em]">NEXUS</Link>
        <Link to="/login"><BrutalistButton size="sm">Login</BrutalistButton></Link>
      </div>
    </nav>

    <section className="mx-auto max-w-7xl px-8 py-24">
      <p className="label-micro text-muted-foreground mb-4">Reference Documentation</p>
      <h1 className="text-5xl md:text-7xl mb-6">API Docs</h1>
      <p className="text-lg font-light italic text-muted-foreground max-w-xl mb-16">
        Complete REST, WebSocket, and A2A protocol reference for the Nexus platform.
      </p>

      {/* Auth Pattern */}
      <div className="border border-border p-8 mb-16">
        <h2 className="text-sm mb-4">Authentication</h2>
        <div className="font-mono text-xs text-muted-foreground leading-loose">
          <p className="text-foreground mb-1">All authenticated requests require:</p>
          <p className="pl-4">Authorization: Bearer {"<JWT_TOKEN>"}</p>
          <p className="mt-3">Tokens from /auth/register or /auth/login</p>
          <p>Default expiry: 24 hours — use /auth/refresh before expiry</p>
        </div>
      </div>

      {/* Endpoint Sections */}
      <div className="space-y-16">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="label-micro text-muted-foreground mb-8">{section.title}</h2>
            <div className="border border-border">
              {section.endpoints.map((ep, i) => (
                <div
                  key={ep.path + ep.method}
                  className={`flex items-center gap-4 px-6 py-4 ${
                    i < section.endpoints.length - 1 ? "brutalist-separator" : ""
                  }`}
                >
                  <span className={`font-mono text-[10px] font-bold w-14 ${methodColors[ep.method] || "text-foreground"}`}>
                    {ep.method}
                  </span>
                  <span className="font-mono text-xs text-foreground flex-1">{ep.path}</span>
                  <span className="text-xs text-muted-foreground hidden sm:block">{ep.desc}</span>
                  {ep.auth && (
                    <span className="label-nano text-muted-foreground border border-border px-2 py-0.5">AUTH</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* WebSocket */}
      <div className="mt-16">
        <h2 className="label-micro text-muted-foreground mb-8">WebSocket</h2>
        <div className="border border-border p-8 font-mono text-xs text-muted-foreground leading-loose">
          <p className="text-foreground mb-3">Connect: ws://localhost:8000/ws?token=JWT</p>
          <p className="text-foreground mt-4 mb-1">Client → Server:</p>
          <p className="pl-4">{`{"type": "send", "conversation_id": "...", "content": "..."}`}</p>
          <p className="pl-4">{`{"type": "typing", "conversation_id": "...", "is_typing": true}`}</p>
          <p className="pl-4">{`{"type": "read", "conversation_id": "..."}`}</p>
          <p className="text-foreground mt-4 mb-1">Server → Client:</p>
          <p className="pl-4">{`{"type": "message", "message": {...}}`}</p>
          <p className="pl-4">{`{"type": "typing", "conversation_id": "...", "is_typing": true}`}</p>
          <p className="pl-4">{`{"type": "read", "conversation_id": "...", "count": N}`}</p>
        </div>
      </div>
    </section>

    <BrutalistFooter />
  </div>
);

export default Docs;
