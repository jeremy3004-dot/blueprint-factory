import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "San Chon Korean Restaurant · Pokhara",
    template: "%s · San Chon Pokhara",
  },
  description:
    "Korean barbecue, comforting staples, and a calm table on Street 16 in Lakeside, Pokhara.",
  metadataBase: new URL("https://san-chon.example"),
  openGraph: {
    title: "San Chon Korean Restaurant · Pokhara",
    description: "Korean barbecue and a calm Lakeside table in Pokhara.",
    images: [{ url: "/images/hero-table.png", width: 1536, height: 1024 }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
