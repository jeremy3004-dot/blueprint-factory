import { ClubOverview } from "../components/home/ClubOverview";
import { ExperienceGrid } from "../components/home/ExperienceGrid";
import { Hero } from "../components/home/Hero";
import { IdentityGallery } from "../components/home/IdentityGallery";
import { IntroStory } from "../components/home/IntroStory";
import { MembershipCta } from "../components/home/MembershipCta";

export default function Home() {
  return (
    <main className="homePage">
      <Hero />
      <IntroStory />
      <ClubOverview />
      <ExperienceGrid />
      <IdentityGallery />
      <MembershipCta />
    </main>
  );
}
