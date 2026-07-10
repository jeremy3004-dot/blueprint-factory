import type { Metadata } from "next";

import { MenuSections } from "@/components/MenuSections";
import { PageHero } from "@/components/PageHero";
import { ReservationRail } from "@/components/ReservationRail";
import { RevealProvider } from "@/components/RevealProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { VisitPanel } from "@/components/VisitPanel";

export const metadata: Metadata = {
  title: "Menu",
  description: "A taste of San Chon's publicly documented Korean favorites in Pokhara.",
};

export default function MenuPage() {
  return (
    <>
      <RevealProvider />
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="A taste of the menu"
          title="Built for the whole table."
          copy="Korean barbecue, comforting bowls, gimbap, noodles, and changing banchan. Availability changes, so ask the team what is cooking today."
          image="/images/grill-fire.png"
          imagePosition="68% center"
        />
        <MenuSections />
        <ReservationRail headingId="menu-plan-a-meal" />
        <VisitPanel />
      </main>
      <SiteFooter />
    </>
  );
}
