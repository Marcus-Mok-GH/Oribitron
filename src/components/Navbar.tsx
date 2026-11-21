import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui";
import { cn } from "../lib/utils";
import { STATS } from "../data/models";
import { useAuth } from "../lib/auth";

const NAV_LINKS = [
  { to: "/models", label: "Models" },
  { to: "/compare", label: "Compare" },
  { to: "/calculator", label: "Cost calculator" },
];

void STATS;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  const authArea = user ? (
    <div className="flex items-center gap-2">
      <span className="max-w-40 truncate text-sm text-muted-foreground">
        {user.name || user.email}
      </span>
      <Button size="sm" variant="outline" onClick={() => void logout()}>
        Sign out
      </Button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Button to="/login" size="sm" variant="outline">
        Sign in
      </Button>
      <Button to="/signup" size="sm">
        Sign up
      </Button>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/orbit.svg" alt="Oribitron" className="size-8 rounded-lg" />
          <span className="font-display text-lg font-semibold tracking-tight">
            Oribitron
            <span className="ml-1.5 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:inline">
              LLM&nbsp;Index
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm transition-colors",
                  isActive ? "bg-white/[0.06] text-foreground" : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button to="/models" size="sm" variant="outline">
            Browse models
          </Button>
          {!loading && authArea}
        </div>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-white/[0.06] hover:text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-background/95 px-4 py-3 md:hidden">
          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-3 py-2.5 text-sm",
                    isActive ? "bg-white/[0.06] text-foreground" : "text-muted-foreground hover:text-foreground"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          {!loading && (
            <div className="mt-3 flex flex-col gap-2 border-t border-white/[0.06] pt-3">
              {user ? (
                <>
                  <span className="px-3 text-sm text-muted-foreground">{user.name || user.email}</span>
                  <Button size="sm" variant="outline" onClick={() => void logout()}>
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button to="/login" size="sm" variant="outline" onClick={() => setOpen(false)}>
                    Sign in
                  </Button>
                  <Button to="/signup" size="sm" onClick={() => setOpen(false)}>
                    Sign up
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
