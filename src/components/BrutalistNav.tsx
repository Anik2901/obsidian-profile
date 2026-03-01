import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Matches", path: "/matches" },
  { label: "Messages", path: "/messages" },
  { label: "Agent", path: "/agent" },
  { label: "Settings", path: "/settings" },
];

const BrutalistNav = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <Link to={user ? "/dashboard" : "/"} className="label-micro text-foreground tracking-[0.5em]">
          NEXUS
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "label-micro transition-colors duration-200",
                location.pathname === item.path
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={logout}
            className="label-micro text-muted-foreground hover:text-foreground transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border px-8 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "label-micro transition-colors duration-200",
                location.pathname === item.path
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => { logout(); setMobileOpen(false); }}
            className="label-micro text-muted-foreground hover:text-foreground transition-colors text-left"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default BrutalistNav;
