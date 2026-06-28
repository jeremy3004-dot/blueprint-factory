import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import "leaflet/dist/leaflet.css";

import { AnalyticsProvider } from "@/components/analytics-provider";
import { FloatingConcierge } from "@/components/floating-concierge";
import { companyProfile } from "@/data/company";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: `${companyProfile.legalName} | Nepal Trekking and Adventures`,
  description: `${companyProfile.description} Contact ${companyProfile.email} or ${companyProfile.phones[0]}.`,
  icons: {
    icon: "/brand/green-pastures-logo.png",
    apple: "/brand/green-pastures-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${sans.variable} bg-[var(--background)] font-[var(--font-sans)] text-[var(--foreground)] antialiased`}
      >
        <AnalyticsProvider />
        <div className="relative min-h-screen">
          <SiteHeader />
          {children}
          <FloatingConcierge />
        </div>
      </body>
    </html>
  );
}
