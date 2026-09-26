import { cn } from "@/lib/utils";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-pill px-6 py-3 text-[0.95rem] font-semibold transition-[transform,background-color,border-color,color] duration-(--duration-ui) ease-(--ease-out-quart) active:translate-y-px";

const variants = {
  primary: "bg-indigo-700 text-white hover:bg-indigo-800",
  secondary: "border border-line bg-surface text-ink hover:border-indigo-300 hover:text-indigo-700",
  ghost: "text-ink-soft hover:text-indigo-700",
  onDark: "bg-white text-indigo-900 hover:bg-indigo-50",
} as const;

type Variant = keyof typeof variants;

/** A band of light crosses solid buttons on hover — the one flourish they get. */
function Sheen() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/18 opacity-0 transition-opacity duration-(--duration-micro) group-hover:animate-[sheen_820ms_var(--ease-out-quart)] group-hover:opacity-100"
    />
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  external,
  ...rest
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={cn(base, variants[variant], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {(variant === "primary" || variant === "onDark") && <Sheen />}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </a>
  );
}

export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: { variant?: Variant } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {(variant === "primary" || variant === "onDark") && <Sheen />}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </button>
  );
}
