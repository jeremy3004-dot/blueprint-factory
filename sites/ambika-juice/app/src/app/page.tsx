import { CampaignGrid } from "@/components/sections/CampaignGrid";
import { CategoryBand } from "@/components/sections/CategoryBand";
import { EditorialSplit } from "@/components/sections/EditorialSplit";
import { FullBleedMedia } from "@/components/sections/FullBleedMedia";
import { Hero } from "@/components/sections/Hero";
import { OriginRail } from "@/components/sections/OriginRail";
import { PressRail } from "@/components/sections/PressRail";
import { homeSections } from "@/content/home-sections";

export default function Home() {
  return (
    <main id="main-content" className="referenceHome">
      {homeSections.map((section) => {
        if (section.kind === "hero") return <Hero section={section} key={section.id} />;
        if (section.kind === "editorial") return <EditorialSplit section={section} key={section.id} />;
        if (section.kind === "campaign") return <CampaignGrid section={section} key={section.id} />;
        if (section.kind === "origin") return <OriginRail section={section} key={section.id} />;
        if (section.kind === "press") return <PressRail section={section} key={section.id} />;
        if (section.kind === "category") return <CategoryBand section={section} key={section.id} />;
        return <FullBleedMedia section={section} key={section.id} />;
      })}
    </main>
  );
}
