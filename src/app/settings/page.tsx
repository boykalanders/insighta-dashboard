import type { Metadata } from "next";
import { createServerClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/settings/profile-form";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-8 max-w-2xl opacity-0 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your profile and workspace preferences
        </p>
      </div>

      {/* Profile section */}
      <section className="glass-card p-6 space-y-5">
        <div className="border-b border-border pb-4">
          <h2 className="font-display text-base font-bold text-foreground">
            Profile
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Your personal information and display settings
          </p>
        </div>
        <ProfileForm user={user!} />
      </section>

      {/* Danger zone */}
      <section className="glass-card p-6 border border-red-500/20 space-y-4">
        <div>
          <h2 className="font-display text-base font-bold text-red-400">
            Danger Zone
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Irreversible actions that affect your account
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Delete account</p>
            <p className="text-xs text-muted-foreground">
              Permanently remove your account and all data
            </p>
          </div>
          <button
            disabled
            className="px-4 py-2 rounded-lg text-sm font-medium border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Delete account
          </button>
        </div>
      </section>
    </div>
  );
}
