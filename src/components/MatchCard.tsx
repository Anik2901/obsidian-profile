import { cn } from "@/lib/utils";

interface MatchCardProps {
  image: string;
  name: string;
  score: string;
  className?: string;
}

const MatchCard = ({ image, name, score, className }: MatchCardProps) => (
  <div
    className={cn(
      "group border border-zinc-800 p-4 transition-all duration-300 hover:border-foreground cursor-pointer",
      className
    )}
  >
    <div className="aspect-square overflow-hidden">
      <img
        src={image}
        alt={name}
        className="h-full w-full object-cover img-brutalist"
      />
    </div>
    <div className="mt-3">
      <p className="text-xs font-bold uppercase tracking-wider text-foreground">{name}</p>
      <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{score}</p>
    </div>
  </div>
);

export default MatchCard;
