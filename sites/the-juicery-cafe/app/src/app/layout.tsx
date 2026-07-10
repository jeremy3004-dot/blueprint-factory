import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { RevealManager, SiteFooter, SiteHeader } from "@/components/site-chrome";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thejuicerycafe.com"),
  title: {
    default: "The Juicery Cafe · Pokhara",
    template: "%s · The Juicery Cafe",
  },
  description:
    "Farm-to-table brunch, cold-pressed juices, smoothies, and community events in North Lakeside, Pokhara.",
  openGraph: {
    title: "The Juicery Cafe · Pokhara",
    description: "Cold-pressed mornings and seasonal brunch in North Lakeside, Pokhara.",
    images: ["/images/juicery/brunch-wide.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <SiteHeader />
        <RevealManager />
        <main id="content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
