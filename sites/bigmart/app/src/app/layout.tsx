import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BigMart Nepal · Your Neighbor",
  description: "A premium campaign concept for BigMart Nepal."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
