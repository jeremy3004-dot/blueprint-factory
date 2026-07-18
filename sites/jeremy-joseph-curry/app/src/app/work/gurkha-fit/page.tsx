import type { Metadata } from "next";
import ProjectPage from "../../components/ProjectPage";
import { createPageMetadata } from "../../authority";

const title = "Gurkha Fit | Jeremy Joseph Curry";
const description = "Gurkha Fit training app built by Jeremy Joseph Curry.";

export const metadata: Metadata = createPageMetadata({
  path: "/work/gurkha-fit",
  title,
  description,
  type: "article"
});

export default function GurkhaFitPage() {
  return <ProjectPage label="Fitness app" title="Gurkha Fit" intro="A practical training app for running, ruck, doko-style workouts, clubs, and outdoor progress." detail="Gurkha Fit turns structured training into a mobile experience with GPS activity tracking, bilingual support, club-oriented motivation, and coaching built around real routines." capabilities={["Structured training plans", "GPS activity tracking", "Ruck and doko-style workouts", "Clubs and shared motivation", "Mobile-first coaching experience"]} href="https://www.gurkhafit.app" linkLabel="Visit gurkhafit.app" path="/work/gurkha-fit" metadataTitle={title} metadataDescription={description} />;
}
