import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/** Fill `{key}` tokens in copy strings. */
export const fmt = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k: string) => (k in vars ? String(vars[k]) : `{${k}}`));

/** Shilling amounts: millions get one decimal, anything smaller is grouped in full. */
export function tzs(value: number, { short = true }: { short?: boolean } = {}) {
  if (short && value >= 1_000_000) return `TZS ${(value / 1_000_000).toFixed(1)}M`;
  return `TZS ${value.toLocaleString("en-US")}`;
}

export const pct = (part: number, whole: number) =>
  whole === 0 ? 0 : Math.round((part / whole) * 100);
