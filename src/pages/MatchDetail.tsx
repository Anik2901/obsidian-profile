import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BrutalistNav from "@/components/BrutalistNav";
import BrutalistFooter from "@/components/BrutalistFooter";
import BrutalistButton from "@/components/BrutalistButton";
import DataRow from "@/components/DataRow";
import DataTag from "@/components/DataTag";
import StatusAvatar from "@/components/StatusAvatar";
import { ArrowLeft } from "lucide-react";
import { matches as matchesApi } from "@/lib/api";
import type { Match } from "@/types/api";

const MatchDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      matchesApi.get(id)
        .then(setMatch)
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <BrutalistNav />
        <div className="flex-1 flex items-center justify-center">
          <p className="label-micro text-muted-foreground animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <BrutalistNav />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl mb-4">Match Not Found</h1>
            <Link to="/matches"><BrutalistButton>Back to Matches</BrutalistButton></Link>
          </div>
        </div>
        <BrutalistFooter />
      </div>
    );
  }

  const p = match.participant;
  const signals = match.signals;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrutalistNav />

      <section className="mx-auto max-w-7xl px-8 py-24">
        <Link to="/matches" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 label-micro">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
          <StatusAvatar src={p.avatar_url || "/placeholder.svg"} alt={p.display_name} size={200} online />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block border border-foreground px-3 py-1 label-micro mb-3">{p.type}</span>
                <p className="font-mono text-xs text-muted-foreground mb-4">Score: {match.score?.toFixed(1)}</p>
              </div>
              <Link to={`/chat/${match.id}`}><BrutalistButton size="sm">Message</BrutalistButton></Link>
            </div>
            <h1 className="text-6xl md:text-8xl leading-[0.85] mb-6">
              {p.display_name.split(" ").map((w, i) => <span key={i}>{w}<br /></span>)}
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-muted-foreground max-w-[40rem] leading-relaxed">
              {p.bio}
            </p>
          </div>
        </div>

        <div className="grid gap-16 md:grid-cols-2 mt-24 max-w-3xl">
          <div>
            <h2 className="label-micro text-muted-foreground mb-8">Details</h2>
            <DataRow label="Age" value={String(p.age)} />
            <DataRow label="Type" value={p.type} />
            <DataRow label="Status" value={match.status} />
            <DataRow label="Matched" value={new Date(match.created_at).toLocaleDateString()} />
          </div>

          {signals && (
            <div>
              <h2 className="label-micro text-muted-foreground mb-8">Signal Breakdown</h2>
              {Object.entries(signals).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between py-3 brutalist-separator">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{key.replace("_", " ")}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1 bg-border">
                      <div className="h-full bg-foreground" style={{ width: `${val}%` }} />
                    </div>
                    <span className="font-mono text-[10px] text-foreground w-8 text-right">{val}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div>
            <h2 className="label-micro text-muted-foreground mb-8">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {(p.interests || []).map((tag) => <DataTag key={tag} label={tag} />)}
            </div>
          </div>
        </div>
      </section>

      <BrutalistFooter />
    </div>
  );
};

export default MatchDetailPage;
