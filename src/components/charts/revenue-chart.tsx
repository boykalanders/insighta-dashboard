"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { format, parseISO } from "date-fns";
import type { TimeSeriesDataPoint } from "@/types/analytics";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface RevenueChartProps {
  data: TimeSeriesDataPoint[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-3 py-2.5 shadow-xl text-sm space-y-1">
      <p className="text-muted-foreground text-xs mb-1.5">
        {format(parseISO(label), "MMM d, yyyy")}
      </p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground capitalize">{entry.name}</span>
          <span className="font-medium text-foreground font-mono-data ml-auto">
            {entry.name === "revenue" || entry.name === "spend"
              ? formatCurrency(entry.value)
              : formatNumber(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-display text-base font-bold text-foreground">
            Revenue & Spend
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Daily performance over selected period
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(152, 60%, 50%)" stopOpacity={0.15} />
              <stop offset="95%" stopColor="hsl(152, 60%, 50%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(217, 91%, 65%)" stopOpacity={0.12} />
              <stop offset="95%" stopColor="hsl(217, 91%, 65%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(220, 13%, 16%)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tickFormatter={(v) => format(parseISO(v), "MMM d")}
            tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            yAxisId="revenue"
            tickFormatter={(v) => formatCurrency(v, true)}
            tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={6}
            formatter={(value) => (
              <span style={{ color: "hsl(215, 15%, 55%)", fontSize: 12 }}>
                {value}
              </span>
            )}
          />
          <Area
            yAxisId="revenue"
            type="monotone"
            dataKey="revenue"
            stroke="hsl(152, 60%, 50%)"
            strokeWidth={2}
            fill="url(#revenueGradient)"
            dot={false}
            activeDot={{ r: 4, fill: "hsl(152, 60%, 50%)" }}
          />
          <Area
            yAxisId="revenue"
            type="monotone"
            dataKey="spend"
            stroke="hsl(217, 91%, 65%)"
            strokeWidth={2}
            fill="url(#spendGradient)"
            dot={false}
            activeDot={{ r: 4, fill: "hsl(217, 91%, 65%)" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
