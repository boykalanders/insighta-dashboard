"use client";

import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import type { DateRange } from "@/types/analytics";
import { cn } from "@/lib/utils";

const ranges: { value: DateRange; label: string }[] = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
];

export function DateRangePicker() {
  const [selected, setSelected] = useState<DateRange>("30d");
  const [open, setOpen] = useState(false);

  const current = ranges.find((r) => r.value === selected)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-2 border border-border text-sm text-foreground hover:border-muted-foreground/50 transition-all"
      >
        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
        <span>{current.label}</span>
        <ChevronDown className="w-3 h-3 text-muted-foreground" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-full mt-1 w-44 z-20 glass-card shadow-xl py-1 animate-fade-in">
            {ranges.map((r) => (
              <button
                key={r.value}
                onClick={() => {
                  setSelected(r.value);
                  setOpen(false);
                }}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm transition-all",
                  selected === r.value
                    ? "text-foreground bg-surface-2"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-2"
                )}
              >
                {r.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
