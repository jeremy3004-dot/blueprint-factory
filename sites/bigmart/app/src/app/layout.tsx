import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BigMart Nepal Concept",
  description: "A high-craft Blueprint Factory concept for BigMart Nepal."
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
