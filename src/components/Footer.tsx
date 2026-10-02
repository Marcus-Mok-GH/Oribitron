import { Link } from "react-router-dom";
import { LAST_UPDATED, PROVIDERS, STATS } from "../data/models";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-black/20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src="/orbit.svg" alt="Oribitron" className="size-8 rounded-lg" />
            <span className="font-display text-lg font-semibold tracking-tight">Oribitron</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A map of the large language model universe: {STATS.modelCount} models from {STATS.providerCount}{" "}
            labs, with the context windows, pricing and 2026 benchmarks that actually change a decision.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
            Last reviewed · {LAST_UPDATED}
          </p>
        </div>

        <div>
          <h3 className="eyebrow">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link to="/models" className="transition-colors hover:text-foreground">
                Model directory
              </Link>
            </li>
            <li>
              <Link to="/compare" className="transition-colors hover:text-foreground">
                Side-by-side compare
              </Link>
            </li>
            <li>
              <Link to="/calculator" className="transition-colors hover:text-foreground">
                Cost calculator
              </Link>
            </li>
            <li>
              <Link to="/models?open=1" className="transition-colors hover:text-foreground">
                Open-weight models
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Labs tracked</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-muted-foreground">
            {PROVIDERS.map((provider) => (
              <li key={provider.id}>
                <Link
                  to={`/models?provider=${provider.id}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: provider.color }} />
                  {provider.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground/70 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 Oribitron. Built for people who have to choose a model, not just talk about one.</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em]">
            Specs compiled from public sources — verify before production use
          </p>
        </div>
      </div>
    </footer>
  );
}
