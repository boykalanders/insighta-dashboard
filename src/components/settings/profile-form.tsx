"use client";

import { useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const supabase = createClient();
  const [fullName, setFullName] = useState(
    (user.user_metadata?.full_name as string) ?? ""
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName },
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Profile updated successfully" });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      {/* Email (read-only) */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Email</label>
        <input
          type="email"
          value={user.email ?? ""}
          disabled
          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-0 border border-border text-muted-foreground text-sm cursor-not-allowed"
        />
        <p className="text-xs text-muted-foreground">
          Email cannot be changed here. Contact support for assistance.
        </p>
      </div>

      {/* Full name */}
      <div className="space-y-1.5">
        <label
          htmlFor="full_name"
          className="text-sm font-medium text-foreground"
        >
          Full name
        </label>
        <input
          id="full_name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your full name"
          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-2 border border-border text-foreground placeholder:text-muted-foreground text-sm
            focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all"
        />
      </div>

      {/* Feedback */}
      {message && (
        <div
          className={`px-3.5 py-2.5 rounded-lg text-sm border ${
            message.type === "success"
              ? "bg-brand-500/10 border-brand-500/20 text-brand-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 rounded-lg bg-brand-500 hover:bg-brand-400 disabled:opacity-50 disabled:cursor-not-allowed
            text-black font-semibold text-sm transition-all duration-150 active:scale-[0.98]"
        >
          {loading ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
