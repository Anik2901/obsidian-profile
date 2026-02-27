import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface ConversationItemProps {
  avatar: string;
  name: string;
  message: string;
  time: string;
  className?: string;
}

const ConversationItem = ({ avatar, name, message, time, className }: ConversationItemProps) => (
  <div
    className={cn(
      "group flex items-center gap-4 brutalist-separator py-4 transition-all duration-200 cursor-pointer hover:px-4",
      className
    )}
  >
    <img
      src={avatar}
      alt={name}
      className="h-12 w-12 flex-shrink-0 rounded-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
    />
    <div className="min-w-0 flex-1">
      <p className="text-xs font-bold uppercase tracking-wider">{name}</p>
      <p className="mt-0.5 truncate text-sm text-zinc-500">{message}</p>
    </div>
    <div className="flex flex-shrink-0 flex-col items-end gap-1">
      <span className="font-mono text-[9px] text-zinc-600">{time}</span>
      <ChevronRight className="h-4 w-4 text-zinc-700 transition-colors duration-200 group-hover:text-foreground" />
    </div>
  </div>
);

export default ConversationItem;
