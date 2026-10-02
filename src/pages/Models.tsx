import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { CAPABILITY_LABELS, MODELS, PROVIDERS, getProvider, type Capability, type Model } from "../data/models";
import { ModelCard } from "../components/ModelCard";
import { Input, Select } from "../components/ui";
import { cn } from "../lib/utils";

type SortKey = "newest" | "context" | "price" | "score";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "context", label: "Longest context" },
  { value: "price", label: "Lowest price" },
  { value: "score", label: "Best benchmark" },
];

function bestScore(model: Model): number {
  return Math.max(model.benchmarks.swebench ?? 0, model.benchmarks.gpqa ?? 0);
}

export default function Models() {
  const [searchParams, setSearchParams] = useSearchParams();
  const provider = searchParams.get("provider") ?? "all";
  const openOnly = searchParams.get("open") === "1";
  const [query, setQuery] = useState("");
  const [capability, setCapability] = useState<Capability | "all">("all");
  const [sort, setSort] = useState<SortKey>("newest");

  const updateParams = (patch: { provider?: string; open?: boolean }) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (patch.provider !== undefined) {
          if (patch.provider === "all") next.delete("provider");
          else next.set("provider", patch.provider);
        }
        if (patch.open !== undefined) {
          if (patch.open) next.set("open", "1");
          else next.delete("open");
        }
        return next;
      },
      { replace: true }
    );
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = MODELS.filter((model) => {
      if (provider !== "all" && model.providerId !== provider) return false;
      if (openOnly && !model.openWeights) return false;
      if (capability !== "all" && !model.capabilities.includes(capability)) return false;
      if (q) {
        const providerName = getProvider(model.providerId)?.name.toLowerCase() ?? "";
        const haystack = `${model.name} ${providerName} ${model.summary} ${model.bestFor.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    switch (sort) {
      case "newest":
        result.sort((a, b) => b.released.localeCompare(a.released));
        break;
      case "context":
        result.sort((a, b) => b.contextWindow - a.contextWindow);
        break;
      case "price":
        result.sort((a, b) => (a.pricing?.input ?? Infinity) - (b.pricing?.input ?? Infinity));
        break;
      case "score":
        result.sort((a, b) => bestScore(b) - bestScore(a));
        break;
    }
    return result;
  }, [query, provider, openOnly, capability, sort]);

  const filtersActive = query !== "" || provider !== "all" || openOnly || capability !== "all" || sort !== "newest";

  const reset = () => {
    setQuery("");
    setCapability("all");
    setSort("newest");
    updateParams({ provider: "all", open: false });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
      <p className="eyebrow">Model directory</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Every model worth knowing</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {MODELS.length} models from {PROVIDERS.length} labs — frontier APIs and open weights side by side. Filter by
        lab, capability or price, then compare before you commit.
      </p>

      <div className="panel mt-10 p-4">
        <div className="grid gap-3 md:grid-cols-12">
          <div className="relative md:col-span-5">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search models, labs, use cases…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="md:col-span-3">
            <Select value={provider} onChange={(e) => updateParams({ provider: e.target.value })} aria-label="Provider">
              <option value="all">All labs</option>
              {PROVIDERS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="md:col-span-2">
            <Select
              value={capability}
              onChange={(e) => setCapability(e.target.value as Capability | "all")}
              aria-label="Capability"
            >
              <option value="all">Any capability</option>
              {(Object.keys(CAPABILITY_LABELS) as Capability[]).map((cap) => (
                <option key={cap} value={cap}>
                  {CAPABILITY_LABELS[cap]}
                </option>
              ))}
            </Select>
          </div>
          <div className="md:col-span-2">
            <Select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} aria-label="Sort">
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => updateParams({ open: !openOnly })}
            className={cn(
              "rounded-full border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors",
              openOnly
                ? "border-emerald-400/30 bg-emerald-400/[0.1] text-emerald-300"
                : "border-white/10 bg-white/[0.03] text-muted-foreground hover:text-foreground"
            )}
          >
            Open weights only
          </button>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
            {filtered.length} of {MODELS.length} shown
          </span>
          {filtersActive && (
            <button
              type="button"
              onClick={reset}
              className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((model) => (
            <ModelCard key={model.slug} model={model} />
          ))}
        </div>
      ) : (
        <div className="panel mt-8 flex flex-col items-center gap-4 px-6 py-20 text-center">
          <p className="font-display text-xl font-semibold">No models match those filters</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Try widening the search — or reset and browse the full catalog.
          </p>
          <button
            type="button"
            onClick={reset}
            className="font-mono text-xs uppercase tracking-[0.16em] text-primary underline-offset-4 hover:underline"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
