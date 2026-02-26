"use client";

import { formatNumber } from "@/lib/utils";

interface FunnelStage {
  stage: string;
  value: number;
}

interface AttributionFunnelProps {
  data: FunnelStage[];
}

export function AttributionFunnel({ data }: AttributionFunnelProps) {
  const max = data[0]?.value ?? 1;

  return (
    <div className="glass-card p-5 h-full">
      <div className="mb-5">
        <h2 className="font-display text-base font-bold text-foreground">
          Attribution Funnel
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Cross-channel conversion path
        </p>
      </div>

      <div className="space-y-2.5">
        {data.map((stage, i) => {
          const width = (stage.value / max) * 100;
          const dropoff =
            i > 0 ? ((data[i - 1].value - stage.value) / data[i - 1].value) * 100 : 0;

          return (
            <div key={stage.stage} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium">
                  {stage.stage}
                </span>
                <div className="flex items-center gap-2">
                  {i > 0 && (
                    <span className="text-red-400/70">
                      −{dropoff.toFixed(0)}%
                    </span>
                  )}
                  <span className="font-mono-data text-foreground">
                    {formatNumber(stage.value)}
                  </span>
                </div>
              </div>
              <div className="h-5 rounded-md bg-surface-2 overflow-hidden">
                <div
                  className="h-full rounded-md transition-all duration-700"
                  style={{
                    width: `${width}%`,
                    background: `hsl(${152 - i * 10}, ${60 - i * 4}%, ${50 - i * 2}%)`,
                    opacity: 1 - i * 0.08,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Conversion rate */}
      <div className="mt-5 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Overall conversion rate
          </span>
          <span className="font-mono-data text-sm font-semibold text-brand-400">
            {((data[data.length - 1]?.value / max) * 100).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}
