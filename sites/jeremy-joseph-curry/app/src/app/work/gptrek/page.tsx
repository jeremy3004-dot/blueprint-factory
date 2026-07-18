import type { Metadata } from "next";
import ProjectPage from "../../components/ProjectPage";
import { createPageMetadata } from "../../authority";

const title = "GPTrek | Jeremy Joseph Curry";
const description = "GPTrek is a Nepal trekking discovery, booking, route content, and AI-assisted planning platform.";

export const metadata: Metadata = createPageMetadata({
  path: "/work/gptrek",
  title,
  description,
  type: "article"
});

export default function GptrekPage() {
  return <ProjectPage label="Travel platform" title="Green Pastures / GPTrek" intro="A trekking discovery and planning platform connected to local travel operations in Nepal." detail="GPTrek supports route discovery, booking flow, local operator details, route content, and AI-assisted concierge planning for travelers exploring Nepal." capabilities={["Travel product and route discovery", "Booking-oriented user journeys", "Local operator and route content", "AI concierge planning", "Cloud-backed web delivery"]} href="https://gptrek.com" linkLabel="Visit gptrek.com" path="/work/gptrek" metadataTitle={title} metadataDescription={description} />;
}
