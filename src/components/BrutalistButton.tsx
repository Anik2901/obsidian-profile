import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface BrutalistButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
}

const BrutalistButton = forwardRef<HTMLButtonElement, BrutalistButtonProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    const sizes = {
      sm: "px-4 py-1.5 text-[10px]",
      md: "px-6 py-2.5 text-xs",
      lg: "px-8 py-3 text-sm",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "border border-foreground bg-transparent text-foreground font-bold uppercase tracking-widest transition-all duration-300 hover:bg-foreground hover:text-background",
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

BrutalistButton.displayName = "BrutalistButton";
export default BrutalistButton;
