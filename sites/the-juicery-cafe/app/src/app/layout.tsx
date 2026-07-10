import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { RevealManager, SiteFooter, SiteHeader } from "../components/site-chrome";
import { contact } from "../data/site";
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
  alternates: {
    canonical: "/",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "The Juicery Cafe",
  url: "https://www.thejuicerycafe.com",
  image: "https://www.thejuicerycafe.com/images/juicery/brunch-wide.jpg",
  telephone: contact.phoneDisplay,
  email: contact.email,
  servesCuisine: ["Brunch", "Juice", "Vegetarian", "Vegan", "International"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lakeside near Street 22A, opposite Three Sisters Guesthouse",
    addressLocality: "Pokhara",
    postalCode: "33700",
    addressCountry: "NP",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:30",
      closes: "23:00",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
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
