import type { Metadata } from "next";
import { CampaignsTable } from "@/components/campaigns/campaigns-table";
import { mockCampaigns } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Campaigns",
};

export default async function CampaignsPage() {
  // TODO: replace with Supabase query
  // const supabase = await createServerClient();
  // const { data: campaigns } = await supabase
  //   .from("campaigns")
  //   .select("*")
  //   .order("spend", { ascending: false });

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between opacity-0 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Campaigns
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {mockCampaigns.length} campaigns across all channels
          </p>
        </div>
      </div>

      <div className="opacity-0 animate-fade-in-delay-1">
        <CampaignsTable campaigns={mockCampaigns} />
      </div>
    </div>
  );
}
