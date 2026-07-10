import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  display: "swap"
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dorjes.com"),
  title: {
    default: "Dorje's Resort & Spa — Sedi Hills, Pokhara",
    template: "%s — Dorje's Resort & Spa"
  },
  description: "An eco-luxury boutique resort in Sedi Hills, Pokhara, overlooking Phewa Lake.",
  icons: { icon: "/media/favicon.png" },
  openGraph: {
    title: "Dorje's Resort & Spa",
    description: "Comfort, taste, rejuvenation and the quiet of Phewa Lake.",
    images: ["/media/hero-poster.webp"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

