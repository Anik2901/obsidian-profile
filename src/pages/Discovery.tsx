import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BrutalistNav from "@/components/BrutalistNav";
import BrutalistFooter from "@/components/BrutalistFooter";
import BrutalistButton from "@/components/BrutalistButton";
import DataTag from "@/components/DataTag";
import { matches as matchesApi } from "@/lib/api";
import type { DiscoverResult, Match, MatchStatus } from "@/types/api";
import { toast } from "sonner";
import { MapPin } from "lucide-react";

type TabMode = "discover" | "proposed" | "accepted" | "rejected";

const Discovery = () => {
  const [tab, setTab] = useState<TabMode>("discover");
  const [discovered, setDiscovered] = useState<DiscoverResult[]>([]);
  const [matchList, setMatchList] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (tab === "discover") {
      matchesApi.discover(20)
        .then((r) => setDiscovered(r.results))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      matchesApi.list(tab as MatchStatus)
        .then(setMatchList)
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [tab]);

  const handlePropose = async (targetId: string) => {
    try {
      await matchesApi.propose(targetId);
      toast.success("Match proposed");
      setDiscovered((prev) => prev.filter((d) => d.participant.id !== targetId));
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleAccept = async (matchId: string) => {
    try {
      const res = await matchesApi.accept(matchId);
      toast.success(res.message || "Match accepted");
      setMatchList((prev) => prev.filter((m) => m.id !== matchId));
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleReject = async (matchId: string) => {
    try {
      await matchesApi.reject(matchId);
      toast.success("Match rejected");
      setMatchList((prev) => prev.filter((m) => m.id !== matchId));
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const tabs: TabMode[] = ["discover", "proposed", "accepted", "rejected"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrutalistNav />

      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <p className="label-micro text-muted-foreground mb-4">Compatibility Engine</p>
            <h1 className="text-5xl md:text-7xl">Matches</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border border-border mb-12">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 label-micro transition-all duration-200 border-r border-border last:border-r-0 ${
                tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="label-micro text-muted-foreground animate-pulse">Scanning network...</p>
        ) : tab === "discover" ? (
          <div className="grid gap-4">
            {discovered.length === 0 ? (
              <div className="border border-border p-8 text-center">
                <p className="text-sm text-muted-foreground">No candidates found. Try adjusting your radius.</p>
              </div>
            ) : (
              discovered.map((d) => (
                <div key={d.participant.id} className="border border-border p-6 flex flex-col md:flex-row md:items-center gap-6 transition-all duration-300 hover:border-foreground group">
                  <img
                    src={d.participant.avatar_url || "/placeholder.svg"}
                    alt={d.participant.display_name}
                    className="h-20 w-20 rounded-full object-cover img-brutalist flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-sm font-black uppercase tracking-wider">{d.participant.display_name}</p>
                      <span className="font-mono text-[10px] text-muted-foreground">{d.score.toFixed(1)} score</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {d.distance_km.toFixed(0)}km away
                    </p>
                    <p className="text-sm text-muted-foreground font-light italic truncate">{d.participant.bio}</p>
                    {d.shared_interests.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {d.shared_interests.map((i) => (
                          <DataTag key={i} label={i} className="text-[8px] px-2 py-0.5" />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Link to={`/profile/${d.participant.id}`}>
                      <BrutalistButton size="sm" className="border-border text-muted-foreground hover:border-foreground hover:text-foreground hover:bg-transparent">
                        View
                      </BrutalistButton>
                    </Link>
                    <BrutalistButton size="sm" onClick={() => handlePropose(d.participant.id)}>
                      Propose
                    </BrutalistButton>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {matchList.length === 0 ? (
              <div className="border border-border p-8 text-center">
                <p className="text-sm text-muted-foreground">No {tab} matches.</p>
              </div>
            ) : (
              matchList.map((m) => (
                <div key={m.id} className="border border-border p-6 flex flex-col md:flex-row md:items-center gap-6 transition-all duration-300 hover:border-foreground">
                  <img
                    src={m.participant.avatar_url || "/placeholder.svg"}
                    alt={m.participant.display_name}
                    className="h-16 w-16 rounded-full object-cover grayscale flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black uppercase tracking-wider">{m.participant.display_name}</p>
                    <p className="font-mono text-[10px] text-muted-foreground mt-1">
                      {m.score?.toFixed(1)} score · {new Date(m.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Link to={`/match/${m.id}`}>
                      <BrutalistButton size="sm" className="border-border text-muted-foreground hover:border-foreground hover:text-foreground hover:bg-transparent">
                        Details
                      </BrutalistButton>
                    </Link>
                    {tab === "proposed" && (
                      <>
                        <BrutalistButton size="sm" onClick={() => handleAccept(m.id)}>Accept</BrutalistButton>
                        <BrutalistButton size="sm" onClick={() => handleReject(m.id)}
                          className="border-destructive text-destructive hover:bg-destructive hover:text-foreground">
                          Reject
                        </BrutalistButton>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </section>

      <BrutalistFooter />
    </div>
  );
};

export default Discovery;
