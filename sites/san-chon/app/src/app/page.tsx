import { EmberHero } from "@/components/EmberHero";
import ExperienceTabs from "@/components/ExperienceTabs";
import FavoritesRail from "@/components/FavoritesRail";
import { IntroStatement } from "@/components/IntroStatement";
import ProofGrid from "@/components/ProofGrid";
import { ReservationRail } from "@/components/ReservationRail";
import { RevealProvider } from "@/components/RevealProvider";
import SensoryCollage from "@/components/SensoryCollage";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import StoryBand from "@/components/StoryBand";
import { VisitPanel } from "@/components/VisitPanel";

export default function HomePage() {
  return (
    <>
      <RevealProvider />
      <SiteHeader />
      <main>
        <EmberHero />
        <ReservationRail headingId="plan-a-meal-top" />
        <IntroStatement />
        <FavoritesRail />
        <ExperienceTabs />
        <ReservationRail headingId="plan-a-meal-middle" />
        <StoryBand />
        <SensoryCollage />
        <ProofGrid />
        <VisitPanel />
      </main>
      <SiteFooter />
    </>
  );
}
