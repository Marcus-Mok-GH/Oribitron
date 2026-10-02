import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { getProvider, type Model } from "../data/models";
import { formatPrice, formatTokens } from "../lib/utils";
import { Badge, ProviderDot } from "./ui";

function topSignal(model: Model): { label: string; value: string } | null {
  const candidates: { key: "swebench" | "gpqa" | "aime" | "mmluPro"; short: string }[] = [
    { key: "swebench", short: "SWE-bench" },
    { key: "gpqa", short: "GPQA" },
    { key: "aime", short: "AIME" },
    { key: "mmluPro", short: "MMLU-Pro" },
  ];
  for (const candidate of candidates) {
    const value = model.benchmarks[candidate.key];
    if (value !== undefined) return { label: candidate.short, value: `${value.toFixed(1)}%` };
  }
  return null;
}

export function ModelCard({ model }: { model: Model }) {
  const provider = getProvider(model.providerId);
  const signal = topSignal(model);

  return (
    <Link
      to={`/models/${model.slug}`}
      className="panel group relative flex flex-col gap-4 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.04]"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {provider && <ProviderDot color={provider.color} />}
          {provider?.name}
        </div>
        <Badge tone={model.openWeights ? "open" : "closed"}>{model.openWeights ? "Open weights" : "API"}</Badge>
      </div>

      <div>
        <h3 className="flex items-center gap-1.5 font-display text-lg font-semibold tracking-tight">
          {model.name}
          <ArrowUpRight className="size-4 shrink-0 text-transparent transition-colors duration-300 group-hover:text-primary" />
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{model.summary}</p>
      </div>

      <div className="mt-auto grid grid-cols-3 gap-2 border-t border-white/[0.06] pt-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">Context</p>
          <p className="mt-0.5 font-mono text-sm tabular-nums">{formatTokens(model.contextWindow)}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">Input /M</p>
          <p className="mt-0.5 font-mono text-sm tabular-nums">
            {model.pricing ? formatPrice(model.pricing.input) : "Self-host"}
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
            {signal ? signal.label : "Released"}
          </p>
          <p className="mt-0.5 font-mono text-sm tabular-nums">
            {signal ? signal.value : model.released.replace("-", ".")}
          </p>
        </div>
      </div>

    </Link>
  );
}
