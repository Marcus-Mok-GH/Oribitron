import { PROVIDERS } from "../data/models";

/**
 * Decorative orbital system — providers mapped onto three counter-rotating
 * rings around a glowing core. Pure CSS transforms, no canvas.
 */
export function OrbitVisual() {
  const rings: { radius: number; duration: "slow" | "mid" | "fast"; providers: typeof PROVIDERS; solid: boolean }[] = [
    { radius: 20, duration: "fast", providers: PROVIDERS.slice(0, 4), solid: true },
    { radius: 31.5, duration: "mid", providers: PROVIDERS.slice(4, 8), solid: false },
    { radius: 43, duration: "slow", providers: PROVIDERS.slice(8, 12), solid: true },
  ];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px] select-none">
      {/* faint guide rings */}
      {rings.map((ring) => (
        <div
          key={`guide-${ring.radius}`}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border ${
            ring.solid ? "border-white/[0.07]" : "border-dashed border-white/[0.08]"
          }`}
          style={{ width: `${ring.radius * 2}%`, height: `${ring.radius * 2}%` }}
        />
      ))}

      {/* rotating provider nodes */}
      {rings.map((ring) => {
        const spin =
          ring.duration === "slow" ? "animate-spin-slow" : ring.duration === "mid" ? "animate-spin-mid" : "animate-spin-fast";
        const counter =
          ring.duration === "slow"
            ? "animate-spin-slow-reverse"
            : ring.duration === "mid"
              ? "animate-spin-mid-reverse"
              : "animate-spin-fast-reverse";

        return (
          <div key={`ring-${ring.radius}`} className={`absolute inset-0 ${spin}`}>
            {ring.providers.map((provider, index) => {
              const angle = (index / ring.providers.length) * Math.PI * 2 - Math.PI / 2;
              const left = 50 + ring.radius * Math.cos(angle);
              const top = 50 + ring.radius * Math.sin(angle);
              return (
                <div
                  key={provider.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${left}%`, top: `${top}%` }}
                  title={provider.name}
                >
                  <div
                    className={`flex size-10 items-center justify-center rounded-full border font-mono text-[10px] backdrop-blur-sm ${counter}`}
                    style={{
                      borderColor: `${provider.color}55`,
                      backgroundColor: `${provider.color}14`,
                      color: provider.color,
                      boxShadow: `0 0 20px -4px ${provider.color}66`,
                    }}
                  >
                    {provider.short}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex size-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />
          <div className="absolute inset-0 rounded-full border border-primary/30" />
          <img src="/orbit.svg" alt="" className="relative size-12 rounded-xl" />
        </div>
      </div>

      {/* glow accents */}
      <div className="pointer-events-none absolute left-[12%] top-[30%] size-1.5 rounded-full bg-secondary/80 blur-[1px]" />
      <div className="pointer-events-none absolute right-[16%] bottom-[22%] size-1 rounded-full bg-primary/80 blur-[1px]" />
      <div className="pointer-events-none absolute right-[28%] top-[12%] size-1 rounded-full bg-white/50 blur-[1px]" />
    </div>
  );
}
