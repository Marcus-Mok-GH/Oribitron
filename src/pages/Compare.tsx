import { useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, Minus } from "lucide-react";
import {
  BENCHMARKS,
  CAPABILITY_LABELS,
  MODELS,
  getModel,
  getProvider,
  type BenchmarkId,
  type Capability,
  type Model,
} from "../data/models";
import { ProviderDot, Select } from "../components/ui";
import { cn, formatDate, formatPrice, formatTokens } from "../lib/utils";

const SLOT_KEYS = ["a", "b", "c"] as const;
const DEFAULT_SLUGS = ["claude-opus-5", "gpt-5-6-sol", "gemini-3-6-flash"];

const BENCHMARK_ORDER: BenchmarkId[] = [
  "swebench",
  "swebenchPro",
  "terminalBench",
  "gpqa",
  "aime",
  "arcAgi2",
  "hle",
  "mmluPro",
  "arenaElo",
];

const CAPABILITY_ORDER = Object.keys(CAPABILITY_LABELS) as Capability[];

function formatBenchmark(id: BenchmarkId, value: number): string {
  return BENCHMARKS[id].unit === "%" ? `${value.toFixed(1)}%` : value.toLocaleString("en-US");
}

function SectionRow({ label, span }: { label: string; span: number }) {
  return (
    <tr>
      <td colSpan={span} className="border-b border-white/[0.06] bg-white/[0.015] px-5 py-2.5">
        <span className="eyebrow">{label}</span>
      </td>
    </tr>
  );
}

export default function Compare() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [slugs, setSlugs] = useState<string[]>(() =>
    SLOT_KEYS.map((key, index) => searchParams.get(key) ?? DEFAULT_SLUGS[index])
  );

  const setSlot = (index: number, slug: string) => {
    const next = [...slugs];
    next[index] = slug;
    setSlugs(next);
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        if (slug) params.set(SLOT_KEYS[index], slug);
        else params.delete(SLOT_KEYS[index]);
        return params;
      },
      { replace: true }
    );
  };

  const chosen = slugs.map((slug) => (slug ? getModel(slug) : undefined)).filter((m): m is Model => m !== undefined);
  const columns = chosen.filter((model, index) => chosen.findIndex((m) => m.slug === model.slug) === index);

  const benchmarkIds = BENCHMARK_ORDER.filter((id) => columns.some((m) => m.benchmarks[id] !== undefined));

  const specRows: { label: string; render: (model: Model) => ReactNode }[] = [
    {
      label: "Lab",
      render: (model) => {
        const provider = getProvider(model.providerId);
        return (
          <span className="inline-flex items-center gap-2">
            {provider && <ProviderDot color={provider.color} />}
            {provider?.name}
          </span>
        );
      },
    },
    { label: "Released", render: (model) => formatDate(model.released) },
    { label: "Weights", render: (model) => (model.openWeights ? "Open" : "Proprietary") },
    { label: "License", render: (model) => model.license },
    { label: "Parameters", render: (model) => model.params ?? "—" },
    { label: "Knowledge cutoff", render: (model) => model.cutoff },
    { label: "Context window", render: (model) => `${formatTokens(model.contextWindow)} tokens` },
    { label: "Max output", render: (model) => `${formatTokens(model.maxOutput)} tokens` },
    { label: "Input / 1M", render: (model) => (model.pricing ? formatPrice(model.pricing.input) : "Self-hosted") },
    { label: "Output / 1M", render: (model) => (model.pricing ? formatPrice(model.pricing.output) : "Self-hosted") },
    { label: "Modalities", render: (model) => model.modalities.join(" · ") },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
      <p className="eyebrow">Head to head</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Compare models side by side</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Pick up to three models. The comparison lives in the URL, so you can share the exact matchup with your team.
      </p>

      <div className="panel mt-10 grid gap-3 p-4 sm:grid-cols-3">
        {SLOT_KEYS.map((key, index) => (
          <div key={key}>
            <label className="eyebrow" htmlFor={`slot-${key}`}>
              Model {key.toUpperCase()}
            </label>
            <Select
              id={`slot-${key}`}
              className="mt-2"
              value={slugs[index] ?? ""}
              onChange={(e) => setSlot(index, e.target.value)}
            >
              <option value="">— None —</option>
              {MODELS.map((model) => (
                <option key={model.slug} value={model.slug}>
                  {model.name} · {getProvider(model.providerId)?.name}
                </option>
              ))}
            </Select>
          </div>
        ))}
      </div>

      {columns.length < 2 ? (
        <div className="panel mt-8 px-6 py-16 text-center">
          <p className="font-display text-xl font-semibold">Select at least two models</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            Pick a second model above to build the comparison table.
          </p>
        </div>
      ) : (
        <div className="panel mt-8 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="w-48 px-5 py-5 text-left align-bottom">
                  <span className="eyebrow">Comparison</span>
                </th>
                {columns.map((model) => {
                  const provider = getProvider(model.providerId);
                  return (
                    <th key={model.slug} className="px-5 py-5 text-left align-bottom">
                      <Link to={`/models/${model.slug}`} className="font-display text-lg font-semibold tracking-tight hover:text-primary">
                        {model.name}
                      </Link>
                      <div className="mt-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        {provider && <ProviderDot color={provider.color} />}
                        {provider?.name}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <SectionRow label="Overview" span={columns.length + 1} />
              {specRows.map((row) => (
                <tr key={row.label} className="border-b border-white/[0.05]">
                  <td className="px-5 py-3 text-muted-foreground">{row.label}</td>
                  {columns.map((model) => (
                    <td key={model.slug} className="px-5 py-3 font-mono text-xs tabular-nums">
                      {row.render(model)}
                    </td>
                  ))}
                </tr>
              ))}

              <SectionRow label="Capabilities" span={columns.length + 1} />
              {CAPABILITY_ORDER.map((capability) => (
                <tr key={capability} className="border-b border-white/[0.05]">
                  <td className="px-5 py-3 text-muted-foreground">{CAPABILITY_LABELS[capability]}</td>
                  {columns.map((model) => {
                    const has = model.capabilities.includes(capability);
                    return (
                      <td key={model.slug} className="px-5 py-3">
                        {has ? (
                          <Check className="size-4 text-emerald-400" />
                        ) : (
                          <Minus className="size-4 text-muted-foreground/40" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {benchmarkIds.length > 0 && (
                <>
                  <SectionRow label="Benchmarks" span={columns.length + 1} />
                  {benchmarkIds.map((id) => {
                    const values = columns
                      .map((model) => model.benchmarks[id])
                      .filter((value): value is number => value !== undefined);
                    const best = values.length > 0 ? Math.max(...values) : undefined;
                    return (
                      <tr key={id} className="border-b border-white/[0.05]">
                        <td className="px-5 py-3 text-muted-foreground" title={BENCHMARKS[id].description}>
                          {BENCHMARKS[id].label}
                        </td>
                        {columns.map((model) => {
                          const value = model.benchmarks[id];
                          if (value === undefined) {
                            return (
                              <td key={model.slug} className="px-5 py-3 font-mono text-xs text-muted-foreground/50">
                                not published
                              </td>
                            );
                          }
                          return (
                            <td
                              key={model.slug}
                              className={cn(
                                "px-5 py-3 font-mono text-xs tabular-nums",
                                value === best ? "font-semibold text-primary" : "text-muted-foreground"
                              )}
                            >
                              {formatBenchmark(id, value)}
                              {value === best && (
                                <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.14em] text-primary/70">
                                  best
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/60">
        Benchmark scores compiled from public evaluations · directional, verify before production
      </p>
    </div>
  );
}
