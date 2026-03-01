import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BrutalistNav from "@/components/BrutalistNav";
import BrutalistFooter from "@/components/BrutalistFooter";
import BrutalistButton from "@/components/BrutalistButton";
import StatusAvatar from "@/components/StatusAvatar";
import DataRow from "@/components/DataRow";
import DataTag from "@/components/DataTag";
import { useAuth } from "@/contexts/AuthContext";
import { matches, conversations } from "@/lib/api";
import type { Match, Conversation } from "@/types/api";
import { ChevronRight } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);
  const [recentConvos, setRecentConvos] = useState<Conversation[]>([]);

  useEffect(() => {
    matches.list("accepted").then(setRecentMatches).catch(() => {});
    conversations.list().then(setRecentConvos).catch(() => {});
  }, []);

  if (!user) return null;

  const configData = [
    { label: "DID", value: user.did?.slice(0, 20) + "..." },
    { label: "Age", value: String(user.age) },
    { label: "Radius", value: `${user.radius_km}km` },
    { label: "Type", value: user.type },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrutalistNav />

      {/* Hero Identity */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
          <StatusAvatar src={user.avatar_url || "/placeholder.svg"} alt={user.display_name} size={200} online />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block border border-foreground px-3 py-1 label-micro mb-3">
                  {user.type}
                </span>
                <p className="font-mono text-xs text-muted-foreground mb-4">{user.did}</p>
              </div>
              <Link to="/edit-profile">
                <BrutalistButton size="sm">Edit</BrutalistButton>
              </Link>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-[8rem] leading-[0.85] mb-6">
              {user.display_name.split(" ").map((w, i) => (
                <span key={i}>{w}<br /></span>
              ))}
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-muted-foreground max-w-[40rem] leading-relaxed">
              {user.bio || "No bio yet."}
            </p>
          </div>
        </div>
      </section>

      {/* Data Grid */}
      <section className="mx-auto max-w-7xl px-8 pb-24">
        <div className="grid gap-16 md:grid-cols-3">
          {/* Config Column */}
          <div className="md:col-span-1">
            <h2 className="label-micro text-muted-foreground mb-8">Configuration</h2>
            <div>
              {configData.map((row) => (
                <DataRow key={row.label} label={row.label} value={row.value} />
              ))}
            </div>
            <h2 className="label-micro text-muted-foreground mt-12 mb-6">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {(user.interests || []).map((tag) => (
                <DataTag key={tag} label={tag} />
              ))}
            </div>
          </div>

          {/* Content Column */}
          <div className="md:col-span-2">
            {/* Matches */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="label-micro text-muted-foreground">Matches ({recentMatches.length})</h2>
              <Link to="/matches" className="label-micro text-muted-foreground hover:text-foreground transition-colors">
                View All →
              </Link>
            </div>
            {recentMatches.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {recentMatches.slice(0, 6).map((m) => (
                  <Link
                    key={m.id}
                    to={`/match/${m.id}`}
                    className="group border border-border p-4 transition-all duration-300 hover:border-foreground block"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={m.participant.avatar_url || "/placeholder.svg"}
                        alt={m.participant.display_name}
                        className="h-full w-full object-cover img-brutalist"
                      />
                    </div>
                    <div className="mt-3">
                      <p className="text-xs font-black uppercase tracking-wider">{m.participant.display_name}</p>
                      <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{m.score?.toFixed(1)} score</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="border border-border p-8 text-center">
                <p className="text-sm text-muted-foreground mb-4">No matches yet.</p>
                <Link to="/matches"><BrutalistButton size="sm">Discover</BrutalistButton></Link>
              </div>
            )}

            {/* Conversations */}
            <div className="flex items-center justify-between mt-16 mb-8">
              <h2 className="label-micro text-muted-foreground">Conversations ({recentConvos.length})</h2>
              <Link to="/messages" className="label-micro text-muted-foreground hover:text-foreground transition-colors">
                View All →
              </Link>
            </div>
            {recentConvos.length > 0 ? (
              <div>
                {recentConvos.slice(0, 4).map((c) => (
                  <Link
                    key={c.id}
                    to={`/chat/${c.id}`}
                    className="group flex items-center gap-4 brutalist-separator py-4 transition-all duration-200 hover:px-4 block"
                  >
                    <img
                      src={c.participant.avatar_url || "/placeholder.svg"}
                      alt={c.participant.display_name}
                      className="h-12 w-12 flex-shrink-0 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-black uppercase tracking-wider">{c.participant.display_name}</p>
                      <p className="mt-0.5 truncate text-sm text-muted-foreground">{c.last_message?.content || "No messages"}</p>
                    </div>
                    <div className="flex flex-shrink-0 flex-col items-end gap-1">
                      {c.unread_count > 0 && (
                        <span className="bg-foreground text-background text-[9px] font-bold px-1.5 py-0.5">{c.unread_count}</span>
                      )}
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="border border-border p-8 text-center">
                <p className="text-sm text-muted-foreground">No conversations yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <BrutalistFooter />
    </div>
  );
};

export default Dashboard;
