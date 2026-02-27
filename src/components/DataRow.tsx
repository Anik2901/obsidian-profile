import { cn } from "@/lib/utils";

interface DataRowProps {
  label: string;
  value: string;
  className?: string;
}

const DataRow = ({ label, value, className }: DataRowProps) => (
  <div className={cn("flex items-center justify-between py-3 brutalist-separator", className)}>
    <span className="text-xs text-zinc-600 uppercase tracking-wider">{label}</span>
    <span className="text-sm font-bold text-foreground">{value}</span>
  </div>
);

export default DataRow;
