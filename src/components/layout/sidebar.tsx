"use client";

import Link from "next/link";
import { LayoutDashboard, Megaphone, BarChart2, Settings, TrendingUp } from "lucide-react";
import { NavItem } from "./nav-item";

const navItems = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/campaigns",
    label: "Campaigns",
    icon: Megaphone,
  },
  {
    href: "/channels",
    label: "Channels",
    icon: BarChart2,
  },
];

const bottomNav = [
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex w-[220px] shrink-0 flex-col h-screen bg-surface-1 border-r border-border">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center shrink-0 group-hover:bg-brand-400 transition-colors">
            <TrendingUp className="w-4 h-4 text-black" strokeWidth={2.5} />
          </div>
          <span className="font-display text-base font-bold text-foreground">
            Insighta
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="px-3 mb-2 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
          Analytics
        </p>
        {navItems.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="px-3 py-4 border-t border-border space-y-0.5">
        {bottomNav.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </div>
    </aside>
  );
}
