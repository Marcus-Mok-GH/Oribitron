import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

const buttonVariants = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_24px_-6px_hsl(38_96%_56%/0.6)]",
  outline: "border border-white/15 bg-white/[0.03] text-foreground hover:bg-white/[0.07] hover:border-white/25",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-white/[0.05]",
} as const;

const buttonSizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-6 text-sm",
} as const;

type ButtonBaseProps = {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = ButtonBaseProps & { to: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;
type ButtonAsButton = ButtonBaseProps & { to?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(
    "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50",
    buttonVariants[variant],
    buttonSizes[size],
    className
  );

  if (rest.to) {
    const { to, ...anchorRest } = rest as ButtonAsLink & { to: string };
    return (
      <Link to={to} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

export function Badge({
  children,
  className,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "open" | "closed" | "accent";
}) {
  const tones = {
    default: "border-white/10 bg-white/[0.04] text-muted-foreground",
    open: "border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-300",
    closed: "border-sky-400/20 bg-sky-400/[0.06] text-sky-300",
    accent: "border-primary/30 bg-primary/[0.08] text-primary",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20",
        className
      )}
      {...rest}
    />
  );
}

export function Select({ className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-10 w-full appearance-none rounded-xl border border-white/10 bg-white/[0.03] px-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20",
        className
      )}
      {...rest}
    >
      {children}
    </select>
  );
}

export function ProviderDot({ color, className }: { color: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block size-2 shrink-0 rounded-full", className)}
      style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}66` }}
    />
  );
}
