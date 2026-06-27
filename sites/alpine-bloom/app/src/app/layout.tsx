import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alpine Bloom | Himalayan Travel For Women",
  description: "Women-focused Himalayan trekking and cultural journeys with calm expedition support."
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
