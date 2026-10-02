import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Zap } from "lucide-react";
import {
  BENCHMARKS,
  CAPABILITY_LABELS,
  getModel,
  getProvider,
  similarModels,
  type BenchmarkId,
  type Capability,
} from "../data/models";
import { BenchmarkBar } from "../components/BenchmarkBar";
import { Badge, Button, Chip, ProviderDot } from "../components/ui";
import { formatDate, formatPrice, formatTokens } from "../lib/utils";

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

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-right font-mono text-sm tabular-nums">{value}</dd>
    </div>
  );
}

export default function ModelDetail() {
  const { slug } = useParams();
  const model = getModel(slug);

  if (!model) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">This model isn't in orbit</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The model you're looking for doesn't exist in the index (yet).
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button to="/models">Back to directory</Button>
        </div>
      </div>
    );
  }

  const provider = getProvider(model.providerId);
  const benchmarks = BENCHMARK_ORDER.filter((id) => model.benchmarks[id] !== undefined);
  const related = similarModels(model, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <Link
        to="/models"
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        All models
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {provider && <ProviderDot color={provider.color} />}
            {provider?.name} · {provider?.region}
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">{model.name}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{model.summary}</p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge tone={model.openWeights ? "open" : "closed"}>
              {model.openWeights ? "Open weights" : "Proprietary API"}
            </Badge>
            <Badge>{model.license}</Badge>
            <Badge>{formatDate(model.released)}</Badge>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {model.bestFor.map((item) => (
              <Chip key={item}>{item}</Chip>
            ))}
          </div>

          <section className="mt-12">
            <h2 className="eyebrow">Why it matters</h2>
            <ul className="mt-5 space-y-3">
              {model.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm leading-relaxed">
                  <Zap className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="eyebrow">Benchmarks</h2>
            {benchmarks.length > 0 ? (
              <>
                <div className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2">
                  {benchmarks.map((id) => (
                    <BenchmarkBar key={id} id={id} value={model.benchmarks[id] as number} />
                  ))}
                </div>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/60">
                  Source: lab + third-party evaluations · directional, not guarantees
                </p>
              </>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                This lab hasn't published comparable benchmarks for {model.name} yet — agentic evaluations only.
              </p>
            )}
          </section>

          <section className="mt-12">
            <h2 className="eyebrow">Capabilities</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {model.capabilities.map((cap: Capability) => (
                <Chip key={cap}>{CAPABILITY_LABELS[cap]}</Chip>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="panel p-6">
            <h2 className="eyebrow">Spec sheet</h2>
            <dl className="mt-4 divide-y divide-white/[0.06]">
              <SpecRow label="Context window" value={`${formatTokens(model.contextWindow)} tokens`} />
              <SpecRow label="Max output" value={`${formatTokens(model.maxOutput)} tokens`} />
              <SpecRow label="Knowledge cutoff" value={model.cutoff} />
              <SpecRow label="Input" value={model.pricing ? `${formatPrice(model.pricing.input)} / 1M` : "Self-hosted"} />
              <SpecRow
                label="Output"
                value={model.pricing ? `${formatPrice(model.pricing.output)} / 1M` : "Self-hosted"}
              />
              {model.pricing?.cache !== undefined && (
                <SpecRow label="Cache hit" value={`${formatPrice(model.pricing.cache)} / 1M`} />
              )}
              {model.params && <SpecRow label="Parameters" value={model.params} />}
              {model.architecture && <SpecRow label="Architecture" value={model.architecture} />}
              <SpecRow label="Modalities" value={model.modalities.join(" · ")} />
            </dl>
            {model.pricing?.note && (
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground/80">{model.pricing.note}</p>
            )}
          </div>

          <div className="panel p-6">
            <h2 className="eyebrow">Put it to work</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Compare {model.name} against the closest alternatives before you commit.
            </p>
            <div className="mt-4 space-y-2">
              {related.map((other) => (
                <Link
                  key={other.slug}
                  to={`/compare?a=${model.slug}&b=${other.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-sm transition-colors hover:border-white/15 hover:bg-white/[0.05]"
                >
                  <span>vs {other.name}</span>
                  <ArrowUpRight className="size-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
                </Link>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground/70">
              Available from {provider?.name}. {provider?.blurb}
            </p>
          </div>

          <div className="panel p-6">
            <h2 className="eyebrow">Benchmark key</h2>
            <dl className="mt-4 space-y-3">
              {benchmarks.slice(0, 4).map((id) => (
                <div key={id}>
                  <dt className="text-xs font-medium">{BENCHMARKS[id].label}</dt>
                  <dd className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {BENCHMARKS[id].description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
