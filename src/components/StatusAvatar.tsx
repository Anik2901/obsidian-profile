import { cn } from "@/lib/utils";

interface StatusAvatarProps {
  src: string;
  alt: string;
  size?: number;
  online?: boolean;
  className?: string;
}

const StatusAvatar = ({ src, alt, size = 200, online = true, className }: StatusAvatarProps) => (
  <div className={cn("relative inline-block", className)} style={{ width: size, height: size }}>
    <img
      src={src}
      alt={alt}
      className="h-full w-full rounded-full border border-foreground object-cover"
    />
    {online && (
      <span
        className="absolute bottom-2 right-2 h-4 w-4 rounded-full border-[3px] border-background bg-success"
      />
    )}
  </div>
);

export default StatusAvatar;
