import type { Metadata } from "next";
import { ChannelCardsGrid } from "@/components/channels/channel-cards-grid";
import { ChannelBarChart } from "@/components/charts/channel-bar-chart";
import { mockChannelBreakdown } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Channels" };

export default async function ChannelsPage() {
  return (
    <div className="space-y-8 max-w-[1400px]">
      <div className="opacity-0 animate-fade-in">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Channel Analytics
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Attribution and efficiency across your media mix
        </p>
      </div>

      <div className="opacity-0 animate-fade-in-delay-1">
        <ChannelCardsGrid channels={mockChannelBreakdown} />
      </div>

      <div className="opacity-0 animate-fade-in-delay-2">
        <ChannelBarChart data={mockChannelBreakdown} />
      </div>
    </div>
  );
}
