"use client";

import { useState, useMemo } from "react";
import { Search, ArrowUpDown } from "lucide-react";
import type { CampaignRow } from "@/types/analytics";
import type { CampaignChannel, CampaignStatus } from "@/types/database";
import {
  channelLabel,
  statusLabel,
  formatCurrency,
  formatNumber,
  formatPercent,
  cn,
} from "@/lib/utils";

interface CampaignsTableProps {
  campaigns: CampaignRow[];
}

const statusStyles: Record<CampaignStatus, string> = {
  active: "bg-brand-500/10 text-brand-400 border-brand-500/20",
  paused: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  completed: "bg-muted text-muted-foreground border-border",
  draft: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

const channelColors: Record<CampaignChannel, string> = {
  paid_search: "text-blue-400",
  paid_social: "text-purple-400",
  email: "text-brand-400",
  organic: "text-teal-400",
  display: "text-orange-400",
  affiliate: "text-pink-400",
};

type SortKey = keyof Pick<CampaignRow, "spend" | "conversions" | "roas" | "cpa">;

export function CampaignsTable({ campaigns }: CampaignsTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CampaignStatus | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("spend");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const statuses: Array<CampaignStatus | "all"> = [
    "all",
    "active",
    "paused",
    "completed",
    "draft",
  ];

  const filtered = useMemo(() => {
    let rows = campaigns;

    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          channelLabel(c.channel).toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      rows = rows.filter((c) => c.status === statusFilter);
    }

    rows = [...rows].sort((a, b) => {
      const diff = a[sortKey] - b[sortKey];
      return sortDir === "desc" ? -diff : diff;
    });

    return rows;
  }, [campaigns, search, statusFilter, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  return (
    <div className="glass-card overflow-hidden">
      {/* Toolbar */}
      <div className="px-5 py-4 border-b border-border flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search campaigns..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-surface-2 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-brand-500/50 transition-all"
          />
        </div>

        {/* Status filter pills */}
        <div className="flex gap-1 flex-wrap">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize",
                statusFilter === s
                  ? "bg-surface-2 text-foreground border border-border"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-2"
              )}
            >
              {s === "all" ? "All" : statusLabel(s)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Campaign
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              {(
                [
                  { key: "spend", label: "Spend" },
                  { key: "conversions", label: "Conv." },
                  { key: "cpa", label: "CPA" },
                  { key: "roas", label: "ROAS" },
                ] as { key: SortKey; label: string }[]
              ).map(({ key, label }) => (
                <th
                  key={key}
                  className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  <button
                    onClick={() => toggleSort(key)}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    {label}
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
              ))}
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                CTR
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-10 text-center text-muted-foreground text-sm"
                >
                  No campaigns found
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-surface-2/50 transition-colors group cursor-pointer"
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-foreground group-hover:text-brand-400 transition-colors">
                        {c.name}
                      </p>
                      <p
                        className={`text-xs mt-0.5 ${channelColors[c.channel]}`}
                      >
                        {channelLabel(c.channel)}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "inline-flex px-2 py-0.5 rounded-md text-xs font-medium border capitalize",
                        statusStyles[c.status]
                      )}
                    >
                      {statusLabel(c.status)}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono-data text-foreground">
                    {formatCurrency(c.spend)}
                  </td>
                  <td className="px-5 py-4 font-mono-data text-muted-foreground">
                    {formatNumber(c.conversions)}
                  </td>
                  <td className="px-5 py-4 font-mono-data text-muted-foreground">
                    {formatCurrency(c.cpa)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={c.roas >= 2 ? "badge-up" : "badge-down"}
                    >
                      {c.roas.toFixed(2)}×
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono-data text-muted-foreground">
                    {formatPercent(c.ctr)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Showing {filtered.length} of {campaigns.length} campaigns
        </p>
      </div>
    </div>
  );
}
