import BrutalistNav from "@/components/BrutalistNav";
import BrutalistFooter from "@/components/BrutalistFooter";
import MatchCard from "@/components/MatchCard";
import BrutalistButton from "@/components/BrutalistButton";
import { matchProfiles } from "@/data/profiles";
import { useState } from "react";

type SortMode = "score" | "name";

const Matches = () => {
  const [sortMode, setSortMode] = useState<SortMode>("score");
  const [showCount, setShowCount] = useState(8);

  const sorted = [...matchProfiles].sort((a, b) => {
    if (sortMode === "name") return a.name.localeCompare(b.name);
    return parseFloat(b.score) - parseFloat(a.score);
  });

  const visible = sorted.slice(0, showCount);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrutalistNav />

      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <p className="label-micro text-muted-foreground mb-4">Compatibility Engine</p>
            <h1 className="text-5xl md:text-7xl">Matches</h1>
          </div>
          <div className="flex gap-3">
            <BrutalistButton
              size="sm"
              onClick={() => setSortMode(sortMode === "score" ? "name" : "score")}
            >
              Sort: {sortMode === "score" ? "Score" : "Name"}
            </BrutalistButton>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((match) => (
            <MatchCard
              key={match.id}
              id={match.id}
              image={match.image}
              name={match.name}
              score={match.score}
            />
          ))}
        </div>

        {showCount < sorted.length && (
          <div className="mt-16 flex justify-center">
            <BrutalistButton onClick={() => setShowCount((c) => c + 4)}>
              Load More
            </BrutalistButton>
          </div>
        )}
      </section>

      <BrutalistFooter />
    </div>
  );
};

export default Matches;
