import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BrutalistNav from "@/components/BrutalistNav";
import BrutalistFooter from "@/components/BrutalistFooter";
import { conversations as convoApi } from "@/lib/api";
import type { Conversation } from "@/types/api";
import { ChevronRight } from "lucide-react";

const MessagesPage = () => {
  const [convos, setConvos] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    convoApi.list().then(setConvos).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrutalistNav />

      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="mb-16">
          <p className="label-micro text-muted-foreground mb-4">Communication Log</p>
          <h1 className="text-5xl md:text-7xl">Messages</h1>
        </div>

        <div className="max-w-3xl">
          {loading ? (
            <p className="label-micro text-muted-foreground animate-pulse">Loading conversations...</p>
          ) : convos.length === 0 ? (
            <div className="border border-border p-8 text-center">
              <p className="text-sm text-muted-foreground">No conversations yet. Match with someone to start chatting.</p>
            </div>
          ) : (
            convos.map((c) => (
              <Link
                key={c.id}
                to={`/chat/${c.id}`}
                className="group flex items-center gap-4 brutalist-separator py-4 transition-all duration-200 cursor-pointer hover:px-4 block"
              >
                <img
                  src={c.participant.avatar_url || "/placeholder.svg"}
                  alt={c.participant.display_name}
                  className="h-12 w-12 flex-shrink-0 rounded-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-black uppercase tracking-wider">{c.participant.display_name}</p>
                    {c.unread_count > 0 && (
                      <span className="bg-foreground text-background text-[9px] font-bold px-1.5 py-0.5">{c.unread_count}</span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">{c.last_message?.content || "No messages"}</p>
                </div>
                <div className="flex flex-shrink-0 flex-col items-end gap-1">
                  <span className="font-mono text-[9px] text-muted-foreground">
                    {c.last_message ? new Date(c.last_message.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-colors duration-200 group-hover:text-foreground" />
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      <BrutalistFooter />
    </div>
  );
};

export default MessagesPage;
