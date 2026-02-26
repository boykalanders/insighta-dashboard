import type {
  TimeSeriesDataPoint,
  ChannelBreakdown,
  CampaignRow,
  MetricCard,
} from "@/types/analytics";

// ─── Overview Metrics ────────────────────────────────────────────────────────

export const mockMetrics: MetricCard[] = [
  { label: "Total Revenue", value: 482350, change: 14.2, format: "currency" },
  { label: "Total Spend", value: 89420, change: 8.1, format: "currency" },
  { label: "ROAS", value: 5.39, change: 5.7, format: "number" },
  { label: "Conversions", value: 3841, change: 11.4, format: "number" },
];

// ─── Revenue Time Series (last 30 days) ──────────────────────────────────────

function generateTimeSeries(): TimeSeriesDataPoint[] {
  const data: TimeSeriesDataPoint[] = [];
  const base = new Date("2024-06-01");

  for (let i = 0; i < 30; i++) {
    const d = new Date(base);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];

    data.push({
      date: dateStr,
      revenue: Math.round(12000 + Math.random() * 8000 + Math.sin(i / 4) * 3000),
      spend: Math.round(2500 + Math.random() * 1500 + Math.cos(i / 4) * 500),
      conversions: Math.round(100 + Math.random() * 60 + Math.sin(i / 3) * 20),
    });
  }
  return data;
}

export const mockTimeSeries: TimeSeriesDataPoint[] = generateTimeSeries();

// ─── Channel Breakdown ────────────────────────────────────────────────────────

export const mockChannelBreakdown: ChannelBreakdown[] = [
  {
    channel: "paid_search",
    label: "Paid Search",
    sessions: 48200,
    conversions: 1241,
    revenue: 183400,
    cost: 34100,
    roas: 5.38,
  },
  {
    channel: "paid_social",
    label: "Paid Social",
    sessions: 61500,
    conversions: 892,
    revenue: 124100,
    cost: 28500,
    roas: 4.36,
  },
  {
    channel: "email",
    label: "Email",
    sessions: 22100,
    conversions: 698,
    revenue: 89300,
    cost: 3200,
    roas: 27.91,
  },
  {
    channel: "organic",
    label: "Organic",
    sessions: 55000,
    conversions: 731,
    revenue: 67100,
    cost: 0,
    roas: Infinity,
  },
  {
    channel: "display",
    label: "Display",
    sessions: 38900,
    conversions: 189,
    revenue: 14500,
    cost: 17400,
    roas: 0.83,
  },
  {
    channel: "affiliate",
    label: "Affiliate",
    sessions: 12400,
    conversions: 90,
    revenue: 3950,
    cost: 6220,
    roas: 0.63,
  },
];

// ─── Campaigns ────────────────────────────────────────────────────────────────

export const mockCampaigns: CampaignRow[] = [
  {
    id: "c1",
    name: "Summer Brand Awareness — Google",
    channel: "paid_search",
    status: "active",
    spend: 18200,
    impressions: 2100000,
    clicks: 41500,
    ctr: 1.98,
    conversions: 621,
    cpa: 29.31,
    roas: 5.8,
  },
  {
    id: "c2",
    name: "Meta Retargeting — Prospecting",
    channel: "paid_social",
    status: "active",
    spend: 12400,
    impressions: 4800000,
    clicks: 28200,
    ctr: 0.59,
    conversions: 384,
    cpa: 32.29,
    roas: 4.1,
  },
  {
    id: "c3",
    name: "June Newsletter Promo",
    channel: "email",
    status: "completed",
    spend: 800,
    impressions: 42000,
    clicks: 6200,
    ctr: 14.76,
    conversions: 312,
    cpa: 2.56,
    roas: 38.2,
  },
  {
    id: "c4",
    name: "Display Awareness Q2",
    channel: "display",
    status: "paused",
    spend: 9100,
    impressions: 5600000,
    clicks: 11200,
    ctr: 0.2,
    conversions: 89,
    cpa: 102.25,
    roas: 0.9,
  },
  {
    id: "c5",
    name: "Affiliate Network — Summer",
    channel: "affiliate",
    status: "active",
    spend: 4100,
    impressions: 890000,
    clicks: 8900,
    ctr: 1.0,
    conversions: 64,
    cpa: 64.06,
    roas: 0.71,
  },
  {
    id: "c6",
    name: "Brand Keywords — Exact Match",
    channel: "paid_search",
    status: "active",
    spend: 7200,
    impressions: 310000,
    clicks: 22400,
    ctr: 7.23,
    conversions: 398,
    cpa: 18.09,
    roas: 7.2,
  },
];

// ─── Attribution Funnel ───────────────────────────────────────────────────────

export const mockFunnelData = [
  { stage: "Impressions", value: 13800000 },
  { stage: "Sessions", value: 238100 },
  { stage: "Engaged", value: 84200 },
  { stage: "Intent", value: 21400 },
  { stage: "Conversions", value: 3841 },
];
