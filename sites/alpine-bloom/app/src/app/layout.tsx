import type { Metadata } from "next";
import { Fraunces, Archivo } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
  display: "swap"
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Alpine Bloom — Women-Powered Himalayan Journeys",
  description:
    "Boutique, women-led trekking in Nepal. Small groups, Nepali women guides, and altitude handled with care — from Annapurna ridgelines to Everest Base Camp.",
  openGraph: {
    title: "Alpine Bloom — Women-Powered Himalayan Journeys",
    description:
      "Boutique, women-led trekking in Nepal. Small groups, Nepali women guides, and altitude handled with care.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${archivo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
