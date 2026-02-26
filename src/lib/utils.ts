import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges Tailwind classes safely, resolving conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as USD currency. */
export function formatCurrency(
  value: number,
  compact = false
): string {
  if (compact && Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (compact && Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/** Format a large number with compact notation. */
export function formatNumber(value: number, compact = true): string {
  if (compact && Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (compact && Math.abs(value) >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat("en-US").format(value);
}

/** Format a decimal as a percentage string. */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/** Return sign-prefixed percentage string for change indicators. */
export function formatChange(change: number): string {
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(1)}%`;
}

/** Map a CampaignChannel slug to a human-readable label. */
export function channelLabel(channel: string): string {
  const map: Record<string, string> = {
    paid_search: "Paid Search",
    paid_social: "Paid Social",
    email: "Email",
    organic: "Organic",
    display: "Display",
    affiliate: "Affiliate",
  };
  return map[channel] ?? channel;
}

/** Map a CampaignStatus to a display-friendly string. */
export function statusLabel(status: string): string {
  const map: Record<string, string> = {
    active: "Active",
    paused: "Paused",
    completed: "Completed",
    draft: "Draft",
  };
  return map[status] ?? status;
}
