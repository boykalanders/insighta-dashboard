import type { CampaignChannel, CampaignStatus } from "./database";

export interface MetricCard {
  label: string;
  value: number | string;
  change: number; // percentage change vs prior period
  format: "currency" | "number" | "percent" | "string";
}

export interface TimeSeriesDataPoint {
  date: string;
  [key: string]: number | string;
}

export interface ChannelBreakdown {
  channel: CampaignChannel;
  label: string;
  sessions: number;
  conversions: number;
  revenue: number;
  cost: number;
  roas: number;
}

export interface CampaignRow {
  id: string;
  name: string;
  channel: CampaignChannel;
  status: CampaignStatus;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  cpa: number;
  roas: number;
}

export type DateRange = "7d" | "30d" | "90d" | "custom";
