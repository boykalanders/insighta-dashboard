import type { ChannelBreakdown } from "@/types/analytics";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface ChannelCardsGridProps {
  channels: ChannelBreakdown[];
}

const channelAccents: Record<string, string> = {
  paid_search: "border-blue-500/30 bg-blue-500/5",
  paid_social: "border-purple-500/30 bg-purple-500/5",
  email: "border-brand-500/30 bg-brand-500/5",
  organic: "border-teal-500/30 bg-teal-500/5",
  display: "border-orange-500/30 bg-orange-500/5",
  affiliate: "border-pink-500/30 bg-pink-500/5",
};

const roasColors: Record<string, string> = {
  paid_search: "text-blue-400",
  paid_social: "text-purple-400",
  email: "text-brand-400",
  organic: "text-teal-400",
  display: "text-orange-400",
  affiliate: "text-pink-400",
};

export function ChannelCardsGrid({ channels }: ChannelCardsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {channels.map((ch) => (
        <div
          key={ch.channel}
          className={`glass-card p-5 border ${channelAccents[ch.channel] ?? ""} space-y-4`}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-bold text-foreground">
              {ch.label}
            </h3>
            <span
              className={`font-mono-data text-xl font-bold ${roasColors[ch.channel]}`}
            >
              {ch.roas === Infinity ? "∞" : ch.roas.toFixed(1)}
              <span className="text-xs font-normal ml-0.5">× ROAS</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Revenue</p>
              <p className="font-mono-data text-sm font-semibold text-foreground">
                {formatCurrency(ch.revenue, true)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Cost</p>
              <p className="font-mono-data text-sm font-semibold text-foreground">
                {ch.cost === 0 ? "—" : formatCurrency(ch.cost, true)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Sessions</p>
              <p className="font-mono-data text-sm text-foreground">
                {formatNumber(ch.sessions)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Conv.</p>
              <p className="font-mono-data text-sm text-foreground">
                {formatNumber(ch.conversions)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
