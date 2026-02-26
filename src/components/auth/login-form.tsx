"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Mode = "password" | "magic-link";

export function LoginForm() {
  const supabase = createClient();
  const [mode, setMode] = useState<Mode>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "magic-link") {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        setSent(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        // Middleware will handle redirect after session is set
        window.location.href = "/dashboard";
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="space-y-4 animate-in">
        <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 text-brand-400"
          >
            <path
              d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-display text-xl font-bold mb-1">
            Check your inbox
          </h3>
          <p className="text-muted-foreground text-sm">
            We sent a magic link to{" "}
            <span className="text-foreground font-medium">{email}</span>. Click
            the link to sign in.
          </p>
        </div>
        <button
          onClick={() => setSent(false)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
        >
          Try a different email
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex gap-1 p-1 rounded-lg bg-surface-2">
        {(["password", "magic-link"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-150 ${
              mode === m
                ? "bg-surface-1 text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {m === "password" ? "Password" : "Magic link"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-2 border border-border text-foreground placeholder:text-muted-foreground text-sm
              focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all"
          />
        </div>

        {/* Password — only for password mode */}
        {mode === "password" && (
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-2 border border-border text-foreground placeholder:text-muted-foreground text-sm
                focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all"
            />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="px-3.5 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-lg bg-brand-500 hover:bg-brand-400 disabled:opacity-50 disabled:cursor-not-allowed
            text-black font-semibold text-sm transition-all duration-150 active:scale-[0.98]"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="32"
                  strokeLinecap="round"
                />
              </svg>
              {mode === "magic-link" ? "Sending..." : "Signing in..."}
            </span>
          ) : mode === "magic-link" ? (
            "Send magic link"
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      <p className="text-center text-xs text-muted-foreground">
        Don&apos;t have an account?{" "}
        <a
          href="/auth/signup"
          className="text-foreground hover:text-brand-400 transition-colors"
        >
          Create an account
        </a>
      </p>
    </div>
  );
}
