"use client";

import { useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Bell, ChevronDown, LogOut, User as UserIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { DateRangePicker } from "@/components/dashboard/date-range-picker";

interface TopbarProps {
  user: User;
}

export function Topbar({ user }: TopbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth/login";
  };

  const initials =
    user.email
      ?.split("@")[0]
      .slice(0, 2)
      .toUpperCase() ?? "U";

  return (
    <header className="h-14 shrink-0 border-b border-border px-6 lg:px-8 flex items-center justify-between bg-background/80 backdrop-blur-sm">
      {/* Left: page context (slot for breadcrumbs etc.) */}
      <div className="flex items-center gap-3">
        <DateRangePicker />
      </div>

      {/* Right: actions + user */}
      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <button
          className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-all"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" strokeWidth={1.75} />
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-2 transition-all"
            aria-haspopup="true"
            aria-expanded={menuOpen}
          >
            <div className="w-7 h-7 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
              <span className="text-xs font-semibold text-brand-400">
                {initials}
              </span>
            </div>
            <span className="hidden sm:block text-sm text-foreground max-w-[120px] truncate">
              {user.email}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1 w-48 z-20 glass-card shadow-xl py-1 animate-fade-in">
                <div className="px-3 py-2 border-b border-border mb-1">
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
                <a
                  href="/settings"
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-all"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  Profile
                </a>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground hover:text-red-400 hover:bg-red-500/5 transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
