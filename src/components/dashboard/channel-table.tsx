import type { ChannelBreakdown } from "@/types/analytics";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface ChannelTableProps {
  channels: ChannelBreakdown[];
}

const channelColors: Record<string, string> = {
  paid_search: "bg-blue-500",
  paid_social: "bg-purple-500",
  email: "bg-brand-500",
  organic: "bg-teal-500",
  display: "bg-orange-500",
  affiliate: "bg-pink-500",
};

export function ChannelTable({ channels }: ChannelTableProps) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="font-display text-base font-bold text-foreground">
          Channel Performance
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Revenue attribution by marketing channel
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {[
                "Channel",
                "Sessions",
                "Conversions",
                "Revenue",
                "Cost",
                "ROAS",
              ].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {channels.map((ch) => {
              const roasDisplay =
                ch.roas === Infinity ? "∞" : ch.roas.toFixed(2) + "×";
              const roasGood = ch.roas >= 2;

              return (
                <tr
                  key={ch.channel}
                  className="hover:bg-surface-2/50 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          channelColors[ch.channel] ?? "bg-muted"
                        }`}
                      />
                      <span className="font-medium text-foreground">
                        {ch.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-mono-data text-muted-foreground">
                    {formatNumber(ch.sessions)}
                  </td>
                  <td className="px-5 py-3.5 font-mono-data text-muted-foreground">
                    {formatNumber(ch.conversions)}
                  </td>
                  <td className="px-5 py-3.5 font-mono-data text-foreground font-medium">
                    {formatCurrency(ch.revenue)}
                  </td>
                  <td className="px-5 py-3.5 font-mono-data text-muted-foreground">
                    {ch.cost === 0 ? (
                      <span className="badge-up">—</span>
                    ) : (
                      formatCurrency(ch.cost)
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={roasGood ? "badge-up" : "badge-down"}>
                      {roasDisplay}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
