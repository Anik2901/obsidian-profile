import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import BrutalistNav from "@/components/BrutalistNav";
import BrutalistFooter from "@/components/BrutalistFooter";
import BrutalistButton from "@/components/BrutalistButton";
import { ArrowLeft, Send, AlertTriangle, Ban } from "lucide-react";
import { conversations, reports, participants as participantsApi, createWebSocket } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import type { Message, Conversation, WsMessageIn, ReportReason } from "@/types/api";
import { toast } from "sonner";

const ChatThread = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [convo, setConvo] = useState<(Conversation & { messages: Message[] }) | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!id) return;
    conversations.get(id, 50)
      .then((data) => {
        setConvo(data);
        setMessages(data.messages || []);
        conversations.markRead(id).catch(() => {});
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  // WebSocket
  useEffect(() => {
    const ws = createWebSocket();
    if (!ws) return;
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const data: WsMessageIn = JSON.parse(event.data);
      if (data.type === "message" && data.message?.conversation_id === id) {
        setMessages((prev) => [...prev, data.message!]);
        conversations.markRead(id!).catch(() => {});
      }
      if (data.type === "typing" && data.conversation_id === id) {
        setTyping(data.is_typing || false);
      }
    };

    return () => { ws.close(); };
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(async () => {
    if (!newMessage.trim() || !id) return;
    try {
      // Try WebSocket first
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: "send", conversation_id: id, content: newMessage.trim() }));
      } else {
        const msg = await conversations.sendMessage(id, newMessage.trim());
        setMessages((prev) => [...prev, msg]);
      }
      setNewMessage("");
    } catch (err: any) {
      toast.error(err.message);
    }
  }, [newMessage, id]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTyping = (value: string) => {
    setNewMessage(value);
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "typing", conversation_id: id, is_typing: value.length > 0 }));
    }
  };

  const handleReport = async (reason: ReportReason) => {
    if (!convo) return;
    try {
      await reports.create(convo.participant.id, reason);
      toast.success("Report submitted");
      setShowActions(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleBlock = async () => {
    if (!convo) return;
    try {
      await participantsApi.block(convo.participant.id);
      toast.success("User blocked");
      setShowActions(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <div className="border-b border-border">
          <div className="mx-auto max-w-7xl px-8 py-4">
            <Link to="/messages" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="label-micro text-muted-foreground animate-pulse">Loading thread...</p>
        </div>
      </div>
    );
  }

  if (!convo) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <BrutalistNav />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl mb-4">Thread Not Found</h1>
            <Link to="/messages"><BrutalistButton>Back to Messages</BrutalistButton></Link>
          </div>
        </div>
        <BrutalistFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-8 py-4 flex items-center gap-4">
          <Link to="/messages" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <img
            src={convo.participant.avatar_url || "/placeholder.svg"}
            alt={convo.participant.display_name}
            className="h-10 w-10 rounded-full object-cover border border-border"
          />
          <div className="flex-1">
            <p className="text-xs font-black uppercase tracking-wider">{convo.participant.display_name}</p>
            <p className="font-mono text-[9px] text-muted-foreground">
              {typing ? "TYPING..." : "ENCRYPTED CHANNEL"}
            </p>
          </div>
          <div className="flex gap-2">
            <Link to={`/profile/${convo.participant.id}`}>
              <BrutalistButton size="sm">Profile</BrutalistButton>
            </Link>
            <button
              onClick={() => setShowActions(!showActions)}
              className="border border-border px-3 py-1.5 text-muted-foreground hover:border-foreground hover:text-foreground transition-all"
            >
              <AlertTriangle className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Actions dropdown */}
        {showActions && (
          <div className="border-t border-border px-8 py-4 flex flex-wrap gap-2 mx-auto max-w-7xl">
            <BrutalistButton size="sm" onClick={() => handleReport("spam")}>Report: Spam</BrutalistButton>
            <BrutalistButton size="sm" onClick={() => handleReport("harassment")}>Report: Harassment</BrutalistButton>
            <BrutalistButton size="sm" onClick={() => handleReport("fake_profile")}>Report: Fake</BrutalistButton>
            <BrutalistButton size="sm" onClick={handleBlock} className="border-destructive text-destructive hover:bg-destructive hover:text-foreground">
              <Ban className="h-3 w-3 mr-1 inline" /> Block
            </BrutalistButton>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-8 py-8 space-y-6">
          {messages.map((msg) => {
            const isMe = msg.sender_id === user?.id;
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] ${
                  isMe ? "bg-foreground text-background" : "border border-border bg-transparent text-foreground"
                } px-5 py-3`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <p className={`font-mono text-[9px] mt-2 ${isMe ? "text-background/50" : "text-muted-foreground"}`}>
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-3xl px-8 py-4 flex gap-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => handleTyping(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="TYPE A MESSAGE..."
            className="flex-1 bg-transparent border border-border px-4 py-3 text-foreground text-sm uppercase tracking-wider placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors"
          />
          <button
            onClick={handleSend}
            className="border border-foreground px-5 py-3 text-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatThread;
