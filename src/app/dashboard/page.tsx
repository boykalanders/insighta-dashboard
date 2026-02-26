import type { Metadata } from "next";
import { MetricsGrid } from "@/components/dashboard/metrics-grid";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { ChannelTable } from "@/components/dashboard/channel-table";
import { AttributionFunnel } from "@/components/charts/attribution-funnel";
import {
  mockMetrics,
  mockTimeSeries,
  mockChannelBreakdown,
  mockFunnelData,
} from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Overview",
};

/**
 * Dashboard Overview — Server Component.
 *
 * In production this page would:
 * 1. Call `createServerClient()` to get a Supabase client
 * 2. Run parallel queries for metrics, time series, and channel breakdown
 * 3. Pass real data to the child components
 *
 * For now it uses mock data so the app works without a live database.
 */
export default async function DashboardPage() {
  // TODO: replace with real Supabase queries
  // const supabase = await createServerClient();
  // const [metricsRes, seriesRes] = await Promise.all([
  //   supabase.from("channel_metrics").select("*").gte("date", startDate),
  //   supabase.from("campaigns").select("*").eq("status", "active"),
  // ]);

  return (
    <div className="space-y-8 max-w-[1400px]">
      {/* Page header */}
      <div className="opacity-0 animate-fade-in">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Performance Overview
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Aggregated across all active channels and campaigns
        </p>
      </div>

      {/* KPI metric cards */}
      <div className="opacity-0 animate-fade-in-delay-1">
        <MetricsGrid metrics={mockMetrics} />
      </div>

      {/* Revenue chart + Funnel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 opacity-0 animate-fade-in-delay-2">
        <div className="xl:col-span-2">
          <RevenueChart data={mockTimeSeries} />
        </div>
        <div>
          <AttributionFunnel data={mockFunnelData} />
        </div>
      </div>

      {/* Channel breakdown table */}
      <div className="opacity-0 animate-fade-in-delay-3">
        <ChannelTable channels={mockChannelBreakdown} />
      </div>
    </div>
  );
}
