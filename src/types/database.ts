/**
 * Auto-generate this file from your Supabase project using:
 *   npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
 *
 * The types below are hand-written stubs that mirror the expected schema.
 * Replace with the generated output once you connect to a real Supabase project.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          organization: string | null;
          role: "admin" | "analyst" | "viewer";
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["profiles"]["Row"],
          "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      campaigns: {
        Row: {
          id: string;
          name: string;
          channel: CampaignChannel;
          status: CampaignStatus;
          budget: number;
          spend: number;
          impressions: number;
          clicks: number;
          conversions: number;
          revenue: number;
          start_date: string;
          end_date: string | null;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["campaigns"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["campaigns"]["Insert"]>;
      };
      channel_metrics: {
        Row: {
          id: string;
          channel: CampaignChannel;
          date: string;
          sessions: number;
          conversions: number;
          revenue: number;
          cost: number;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["channel_metrics"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<
          Database["public"]["Tables"]["channel_metrics"]["Insert"]
        >;
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: {
      campaign_channel: CampaignChannel;
      campaign_status: CampaignStatus;
    };
  };
}

export type CampaignChannel =
  | "paid_search"
  | "paid_social"
  | "email"
  | "organic"
  | "display"
  | "affiliate";

export type CampaignStatus = "active" | "paused" | "completed" | "draft";

// Convenience row types
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Campaign = Database["public"]["Tables"]["campaigns"]["Row"];
export type ChannelMetric =
  Database["public"]["Tables"]["channel_metrics"]["Row"];
