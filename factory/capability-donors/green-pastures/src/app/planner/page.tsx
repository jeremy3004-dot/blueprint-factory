import { AIConcierge } from "@/components/ai-concierge";
import { companyProfile } from "@/data/company";

export default function PlannerPage() {
  return (
    <main className="section-shell pb-24 pt-12 md:pt-16">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <p className="section-kicker">{companyProfile.shortName} trip desk</p>
          <h1 className="font-display text-5xl text-white md:text-7xl">
            Shape the Nepal itinerary around how you want to travel.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-stone-300">
            Compare Everest and Annapurna routes, timing, guide style, helicopter exits,
            and restricted-area permits with the details that matter for your{" "}
            {companyProfile.shortName} itinerary.
          </p>
        </div>
        <AIConcierge />
      </div>
    </main>
  );
}
