import { TrendingUp, TrendingDown } from "lucide-react";
import type { MetricCard } from "@/types/analytics";
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  formatChange,
} from "@/lib/utils";

interface MetricsGridProps {
  metrics: MetricCard[];
}

function formatValue(value: number | string, format: MetricCard["format"]) {
  if (typeof value === "string") return value;
  switch (format) {
    case "currency":
      return formatCurrency(value, true);
    case "percent":
      return formatPercent(value);
    case "number":
      return formatNumber(value);
    default:
      return String(value);
  }
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const isPositive = metric.change >= 0;
        return (
          <div
            key={metric.label}
            className="metric-card glass-card p-5 space-y-3"
          >
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {metric.label}
            </p>

            <div className="space-y-1.5">
              <p className="font-display text-3xl font-bold text-foreground font-mono-data">
                {formatValue(metric.value, metric.format)}
              </p>

              <div
                className={`flex items-center gap-1 ${
                  isPositive ? "badge-up" : "badge-down"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="w-3 h-3" strokeWidth={2} />
                ) : (
                  <TrendingDown className="w-3 h-3" strokeWidth={2} />
                )}
                <span>{formatChange(metric.change)}</span>
                <span className="text-muted-foreground font-normal">
                  vs prior period
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
