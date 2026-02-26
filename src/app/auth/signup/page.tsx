import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Insighta analytics account",
};

export default function SignupPage() {
  return (
    <main className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-surface-1 flex-col justify-between p-12 overflow-hidden noise-overlay">
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Ambient glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-blue-500/8 blur-3xl" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 text-black"
                aria-hidden="true"
              >
                <path
                  d="M3 17l4-8 4 4 4-6 4 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              Insighta
            </span>
          </div>
        </div>

        {/* Tagline */}
        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight">
              See what actually{" "}
              <span className="text-gradient-green">drives</span>
              <br />
              performance.
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
              Unified attribution, predictive modeling, and marketing
              measurement — all in one place.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2">
            {[
              "Cross-channel attribution",
              "Predictive ROAS",
              "Real-time signals",
              "Custom models",
            ].map((feat) => (
              <span
                key={feat}
                className="px-3 py-1 rounded-full text-xs font-medium bg-surface-2 border border-border text-muted-foreground"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Social proof */}
        <div className="relative z-10">
          <p className="text-xs text-muted-foreground">
            Trusted by growth teams at leading brands.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-10 lg:hidden">
            <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4 text-black"
                aria-hidden="true"
              >
                <path
                  d="M3 17l4-8 4 4 4-6 4 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-display text-lg font-bold text-foreground">
              Insighta
            </span>
          </div>

          <div className="space-y-2 mb-8">
            <h2 className="font-display text-3xl font-bold">Create your account</h2>
            <p className="text-muted-foreground">
              Start measuring what matters
            </p>
          </div>

          <SignupForm />
        </div>
      </div>
    </main>
  );
}
