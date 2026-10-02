import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MODELS, getProvider, type Model } from "../data/models";
import { Input } from "../components/ui";
import { formatMonthly, formatPrice } from "../lib/utils";

type PricedModel = Model & { pricing: NonNullable<Model["pricing"]> };

const PRESETS = [
  { label: "Chat assistant", input: 2, output: 0.5 },
  { label: "Coding agent", input: 20, output: 4 },
  { label: "Batch pipeline", input: 100, output: 20 },
];

function TokenField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <div className="relative mt-2">
        <Input
          type="number"
          min={0}
          step={0.5}
          inputMode="decimal"
          value={value}
          onChange={(e) => {
            const parsed = Number(e.target.value);
            onChange(Number.isFinite(parsed) && parsed >= 0 ? parsed : 0);
          }}
          className="pr-16 font-mono"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          M tokens
        </span>
      </div>
    </label>
  );
}

export default function Calculator() {
  const [inputM, setInputM] = useState(20);
  const [outputM, setOutputM] = useState(4);

  const rows = useMemo(() => {
    return MODELS.filter((model): model is PricedModel => model.pricing !== null)
      .map((model) => ({ model, cost: inputM * model.pricing.input + outputM * model.pricing.output }))
      .sort((a, b) => a.cost - b.cost);
  }, [inputM, outputM]);

  const excluded = MODELS.filter((model) => model.pricing === null);
  const maxCost = rows.length > 0 ? rows[rows.length - 1].cost : 0;
  const cheapest = rows[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:py-20">
      <p className="eyebrow">Cost calculator</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">What will it actually cost?</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Enter your monthly token volume and see every priced model ranked by list cost. The spread between tiers is
        usually an order of magnitude, not a rounding error.
      </p>

      <div className="panel mt-10 p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <TokenField label="Input tokens · per month" value={inputM} onChange={setInputM} />
          <TokenField label="Output tokens · per month" value={outputM} onChange={setOutputM} />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {PRESETS.map((preset) => {
            const active = inputM === preset.input && outputM === preset.output;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  setInputM(preset.input);
                  setOutputM(preset.output);
                }}
                className={
                  active
                    ? "rounded-full border border-primary/40 bg-primary/[0.1] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-primary"
                    : "rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
                }
              >
                {preset.label} · {preset.input}M / {preset.output}M
              </button>
            );
          })}
        </div>
      </div>

      <div className="panel mt-8 divide-y divide-white/[0.06]">
        {rows.map(({ model, cost }, index) => {
          const provider = getProvider(model.providerId);
          const width = maxCost > 0 ? Math.max(2, (cost / maxCost) * 100) : 0;
          return (
            <div key={model.slug} className="flex items-center gap-4 px-4 py-4 sm:px-6">
              <span className="w-6 font-mono text-xs text-muted-foreground/70">{String(index + 1).padStart(2, "0")}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link to={`/models/${model.slug}`} className="text-sm font-medium hover:text-primary">
                    {model.name}
                  </Link>
                  {model.slug === cheapest?.model.slug && (
                    <span className="rounded-full border border-primary/30 bg-primary/[0.08] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-primary">
                      cheapest
                    </span>
                  )}
                  {model.openWeights && (
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-emerald-300/80">
                      open weights
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: provider?.color }} />
                  {provider?.name}
                </div>
                <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/[0.05]">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary" style={{ width: `${width}%` }} />
                </div>
              </div>
              <div className="hidden w-28 text-right font-mono text-[11px] tabular-nums text-muted-foreground sm:block">
                {formatPrice(model.pricing.input)} / {formatPrice(model.pricing.output)}
              </div>
              <div className="w-24 text-right font-mono text-sm tabular-nums sm:w-28">
                {formatMonthly(cost)}
                <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground/60">
                  per month
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 space-y-2 text-xs leading-relaxed text-muted-foreground/70">
        <p>Estimates use list API pricing per million tokens, excluding cache-hit discounts, batch tiers and long-context surcharges.</p>
        {excluded.length > 0 && (
          <p>
            Self-hosted only (no public API pricing): {excluded.map((model) => model.name).join(", ")}. Their real cost
            is GPU time — see each model page for license and parameter details.
          </p>
        )}
      </div>
    </div>
  );
}
