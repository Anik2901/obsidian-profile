import { cn } from "@/lib/utils";

interface DataTagProps {
  label: string;
  className?: string;
}

const DataTag = ({ label, className }: DataTagProps) => (
  <span
    className={cn(
      "inline-block border border-zinc-800 px-3 py-1 text-[10px] font-extrabold uppercase text-zinc-400 transition-all duration-200 hover:border-foreground hover:text-foreground",
      className
    )}
  >
    {label}
  </span>
);

export default DataTag;
