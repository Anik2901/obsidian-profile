import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Profile", path: "/" },
  { label: "Matches", path: "/matches" },
  { label: "Messages", path: "/messages" },
  { label: "Settings", path: "/settings" },
];

const BrutalistNav = () => {
  const location = useLocation();

  return (
    <nav className="border-b border-zinc-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <Link to="/" className="label-micro text-foreground tracking-[0.5em]">
          NEXUS
        </Link>
        <div className="flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "label-micro transition-colors duration-200",
                location.pathname === item.path
                  ? "text-foreground"
                  : "text-zinc-600 hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BrutalistNav;
