import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Insighta — Marketing Analytics",
    template: "%s | Insighta",
  },
  description:
    "See what truly drives your marketing performance. Unified analytics across every channel.",
  keywords: ["marketing analytics", "attribution", "dashboard", "performance"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background antialiased">{children}</body>
    </html>
  );
}
