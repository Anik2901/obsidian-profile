import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface MatchCardProps {
  id: string;
  image: string;
  name: string;
  score: string;
  className?: string;
}

const MatchCard = ({ id, image, name, score, className }: MatchCardProps) => (
  <Link
    to={`/match/${id}`}
    className={cn(
      "group border border-border p-4 transition-all duration-300 hover:border-foreground cursor-pointer block",
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
      <p className="text-xs font-black uppercase tracking-wider text-foreground">{name}</p>
      <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{score}</p>
    </div>
  </Link>
);

export default MatchCard;
