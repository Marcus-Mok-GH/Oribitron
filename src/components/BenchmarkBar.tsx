import { BENCHMARKS, type BenchmarkId } from "../data/models";
import { cn } from "../lib/utils";

export function BenchmarkBar({
  id,
  value,
  dim = false,
  className,
}: {
  id: BenchmarkId;
  value: number;
  dim?: boolean;
  className?: string;
}) {
  const meta = BENCHMARKS[id];
  const isPercent = meta.unit === "%";
  const fill = isPercent ? value : Math.max(0, Math.min(100, ((value - 1300) / 4) as number));

  return (
    <div className={cn("space-y-1.5", className)} title={meta.description}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-xs text-muted-foreground">{meta.label}</span>
        <span className={cn("font-mono text-xs tabular-nums", dim ? "text-muted-foreground/70" : "text-foreground")}>
          {isPercent ? `${value.toFixed(1)}%` : value.toLocaleString("en-US")}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
        <div
          className={cn("h-full rounded-full", dim ? "bg-white/25" : "bg-gradient-to-r from-primary/80 to-primary")}
          style={{ width: `${fill}%` }}
        />
      </div>
    </div>
  );
}
