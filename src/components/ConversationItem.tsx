import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ConversationItemProps {
  id: string;
  avatar: string;
  name: string;
  message: string;
  time: string;
  className?: string;
}

const ConversationItem = ({ id, avatar, name, message, time, className }: ConversationItemProps) => (
  <Link
    to={`/chat/${id}`}
    className={cn(
      "group flex items-center gap-4 brutalist-separator py-4 transition-all duration-200 cursor-pointer hover:px-4 block",
      className
    )}
  >
    <img
      src={avatar}
      alt={name}
      className="h-12 w-12 flex-shrink-0 rounded-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
    />
    <div className="min-w-0 flex-1">
      <p className="text-xs font-black uppercase tracking-wider">{name}</p>
      <p className="mt-0.5 truncate text-sm text-muted-foreground">{message}</p>
    </div>
    <div className="flex flex-shrink-0 flex-col items-end gap-1">
      <span className="font-mono text-[9px] text-muted-foreground">{time}</span>
      <ChevronRight className="h-4 w-4 text-muted-foreground transition-colors duration-200 group-hover:text-foreground" />
    </div>
  </Link>
);

export default ConversationItem;
