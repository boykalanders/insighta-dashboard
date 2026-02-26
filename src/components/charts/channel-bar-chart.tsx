"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { ChannelBreakdown } from "@/types/analytics";
import { formatCurrency } from "@/lib/utils";

interface ChannelBarChartProps {
  data: ChannelBreakdown[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-3 py-2.5 shadow-xl text-sm space-y-1">
      <p className="text-muted-foreground text-xs mb-1.5 font-medium">{label}</p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.fill }}
          />
          <span className="text-muted-foreground capitalize">{entry.name}</span>
          <span className="font-mono-data text-foreground ml-auto">
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ChannelBarChart({ data }: ChannelBarChartProps) {
  const chartData = data.map((ch) => ({
    name: ch.label,
    Revenue: ch.revenue,
    Cost: ch.cost,
  }));

  return (
    <div className="glass-card p-5">
      <div className="mb-5">
        <h2 className="font-display text-base font-bold text-foreground">
          Revenue vs. Cost by Channel
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Total attributed over selected period
        </p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={chartData}
          margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
          barCategoryGap="30%"
          barGap={3}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(220, 13%, 16%)"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => formatCurrency(v, true)}
            tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(220, 13%, 16%)" }} />
          <Legend
            iconType="square"
            iconSize={8}
            formatter={(value) => (
              <span style={{ color: "hsl(215, 15%, 55%)", fontSize: 12 }}>
                {value}
              </span>
            )}
          />
          <Bar
            dataKey="Revenue"
            fill="hsl(152, 60%, 50%)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="Cost"
            fill="hsl(217, 91%, 65%)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
