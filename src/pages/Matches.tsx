import BrutalistNav from "@/components/BrutalistNav";
import BrutalistFooter from "@/components/BrutalistFooter";
import MatchCard from "@/components/MatchCard";
import BrutalistButton from "@/components/BrutalistButton";
import match1 from "@/assets/match-1.jpg";
import match2 from "@/assets/match-2.jpg";
import match3 from "@/assets/match-3.jpg";
import match4 from "@/assets/match-4.jpg";
import match6 from "@/assets/match-6.jpg";

const allMatches = [
  { image: match1, name: "Elara Voss", score: "97.2%" },
  { image: match2, name: "Marcus Chen", score: "94.8%" },
  { image: match3, name: "Aria Novak", score: "93.1%" },
  { image: match4, name: "Kai Brennan", score: "91.7%" },
  { image: match6, name: "Leo Strand", score: "89.3%" },
  { image: match1, name: "Nina Volkov", score: "87.6%" },
  { image: match3, name: "Sable Morin", score: "85.4%" },
  { image: match2, name: "Reed Calloway", score: "83.9%" },
  { image: match4, name: "Ash Delacroix", score: "82.1%" },
];

const Matches = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrutalistNav />

      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="label-micro text-muted-foreground mb-4">Compatibility Engine</p>
            <h1 className="text-5xl md:text-7xl">Matches</h1>
          </div>
          <div className="flex gap-3">
            <BrutalistButton size="sm">Filter</BrutalistButton>
            <BrutalistButton size="sm">Sort</BrutalistButton>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {allMatches.map((match, i) => (
            <MatchCard key={`${match.name}-${i}`} image={match.image} name={match.name} score={match.score} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <BrutalistButton>Load More</BrutalistButton>
        </div>
      </section>

      <BrutalistFooter />
    </div>
  );
};

export default Matches;
