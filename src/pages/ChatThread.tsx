import { useParams, Link } from "react-router-dom";
import BrutalistNav from "@/components/BrutalistNav";
import BrutalistFooter from "@/components/BrutalistFooter";
import BrutalistButton from "@/components/BrutalistButton";
import { ArrowLeft, Send } from "lucide-react";
import { conversationThreads } from "@/data/profiles";
import { useState } from "react";

const ChatThread = () => {
  const { id } = useParams<{ id: string }>();
  const thread = conversationThreads.find((t) => t.id === id);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(thread?.messages || []);

  if (!thread) {
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

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), sender: "me" as const, text: newMessage.trim(), time: "now" },
    ]);
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Chat Header */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-8 py-4 flex items-center gap-4">
          <Link to="/messages" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <img
            src={thread.avatar}
            alt={thread.name}
            className="h-10 w-10 rounded-full object-cover border border-border"
          />
          <div className="flex-1">
            <p className="text-xs font-black uppercase tracking-wider">{thread.name}</p>
            <p className="font-mono text-[9px] text-muted-foreground">ENCRYPTED CHANNEL</p>
          </div>
          <Link to={`/match/${thread.id}`}>
            <BrutalistButton size="sm">View Profile</BrutalistButton>
          </Link>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-8 py-8 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] ${
                  msg.sender === "me"
                    ? "bg-foreground text-background"
                    : "border border-border bg-transparent text-foreground"
                } px-5 py-3`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={`font-mono text-[9px] mt-2 ${
                  msg.sender === "me" ? "text-background/50" : "text-muted-foreground"
                }`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-3xl px-8 py-4 flex gap-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
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
