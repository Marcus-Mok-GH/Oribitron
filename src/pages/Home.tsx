import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CircleDollarSign, Gauge, Radar, Unlock } from "lucide-react";
import { BENCHMARKS, LAST_UPDATED, MODELS, STATS, featuredModels, getProvider } from "../data/models";
import { formatPrice, formatTokens } from "../lib/utils";
import { OrbitVisual } from "../components/OrbitVisual";
import { ModelCard } from "../components/ModelCard";
import { Button } from "../components/ui";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid-faint" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-24">
        <div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            The LLM observatory · reviewed {LAST_UPDATED}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-5 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Navigate the <span className="text-primary text-glow">model universe</span>, before you build on it.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Oribitron tracks frontier and open-weight large language models — context windows, real API pricing,
            and the 2026 benchmarks that still separate them — so you can shortlist the right model in minutes
            instead of weeks.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button to="/models" size="lg">
              Explore {STATS.modelCount} models
              <ArrowRight className="size-4" />
            </Button>
            <Button to="/compare" size="lg" variant="outline">
              Compare side by side
            </Button>
          </motion.div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.55, delay: 0.32 }}
            className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70"
          >
            Frontier APIs · Open weights · Cost calculator
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative"
        >
          <OrbitVisual />
        </motion.div>
      </div>
    </section>
  );
}

function StatsStrip() {
  const stats = [
    { label: "Models tracked", value: `${STATS.modelCount}` },
    { label: "Labs", value: `${STATS.providerCount}` },
    { label: "Open-weight models", value: `${STATS.openWeightCount}` },
    { label: "Longest context", value: formatTokens(STATS.maxContext) },
  ];
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.015]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-4 sm:px-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="px-2 py-8 md:px-6">
            <p className="font-display text-3xl font-semibold tabular-nums tracking-tight md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Featured() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Featured this month</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            The models defining mid-2026
          </h2>
        </div>
        <Link
          to="/models"
          className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          All {STATS.modelCount} models
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featuredModels().map((model) => (
          <ModelCard key={model.slug} model={model} />
        ))}
      </div>
    </section>
  );
}

const FEATURES = [
  {
    icon: Radar,
    title: "A release radar that never blinks",
    body: "Frontier and open-weight launches from twelve labs — dated, de-duplicated, and translated into the numbers that matter.",
  },
  {
    icon: Gauge,
    title: "Benchmarks that still separate models",
    body: "GPQA Diamond, SWE-bench Verified and Pro, Terminal-Bench, ARC-AGI-2, HLE. No saturated MMLU theater.",
  },
  {
    icon: CircleDollarSign,
    title: "Price-aware by design",
    body: "API list pricing per million tokens — including cache-hit rates — plus a calculator for your real monthly volume.",
  },
  {
    icon: Unlock,
    title: "Open weights as first-class citizens",
    body: "Licenses, parameter counts and MoE details up front, so self-hosting is a genuine option rather than a footnote.",
  },
];

function Features() {
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.015]">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <p className="eyebrow">Why Oribitron</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Built to shorten the shortlist
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="panel group p-6 transition-colors hover:border-white/15">
              <div className="flex size-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.08] text-primary">
                <feature.icon className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Leaderboard() {
  const leaders = MODELS.filter((m) => m.benchmarks.swebench !== undefined)
    .sort((a, b) => (b.benchmarks.swebench ?? 0) - (a.benchmarks.swebench ?? 0))
    .slice(0, 6);

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Coding leaderboard</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            SWE-bench Verified, top six
          </h2>
        </div>
        <p className="max-w-xs text-xs leading-relaxed text-muted-foreground/80">
          {BENCHMARKS.swebench.description} Open-weight models are shaded. Scores are directional.
        </p>
      </div>

      <div className="panel mt-10 divide-y divide-white/[0.06]">
        {leaders.map((model, index) => {
          const provider = getProvider(model.providerId);
          const score = model.benchmarks.swebench ?? 0;
          return (
            <Link
              key={model.slug}
              to={`/models/${model.slug}`}
              className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.03] sm:gap-6"
            >
              <span className="w-6 font-mono text-xs text-muted-foreground/70">{String(index + 1).padStart(2, "0")}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {model.name}
                  {model.openWeights && (
                    <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-emerald-300/80">open</span>
                  )}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: provider?.color }} />
                  {provider?.name}
                </p>
              </div>
              <div className="hidden h-1.5 w-40 overflow-hidden rounded-full bg-white/[0.05] sm:block md:w-64">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary/70 to-primary"
                  style={{ width: `${score}%` }}
                />
              </div>
              <span className="w-16 text-right font-mono text-sm tabular-nums">{score.toFixed(1)}%</span>
              <span className="hidden w-24 text-right font-mono text-xs tabular-nums text-muted-foreground md:block">
                {model.pricing ? `${formatPrice(model.pricing.input)}/M` : "self-host"}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function CalculatorCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <div className="panel relative overflow-hidden p-8 sm:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 size-72 rounded-full bg-secondary/10 blur-3xl" />
        <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow">Monthly cost calculator</p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              What would your token bill actually look like?
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Drop in your monthly input and output volume, and see every priced model ranked by cost — the
              difference between tiers is often 20×, not 20%.
            </p>
          </div>
          <Button to="/calculator" size="lg" className="shrink-0">
            Open the calculator
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <Featured />
      <Features />
      <Leaderboard />
      <CalculatorCta />
    </>
  );
}
