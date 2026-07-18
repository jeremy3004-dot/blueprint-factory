import type { Metadata } from "next";
import ProjectPage from "../../components/ProjectPage";
import { createPageMetadata } from "../../authority";

const title = "Bible Trivia Quest | Jeremy Joseph Curry";
const description = "Bible Trivia Quest, an iOS app built by Jeremy Joseph Curry.";

export const metadata: Metadata = createPageMetadata({
  path: "/work/bible-trivia-quest",
  title,
  description,
  type: "article"
});

export default function BibleTriviaQuestPage() {
  return <ProjectPage label="iOS app" title="Bible Trivia Quest" intro="A game-like Bible trivia and study experience for iPhone and iPad." detail="Bible Trivia Quest combines trivia modes, Scripture reading, audio, progress tracking, rewards, and an AI study companion into a mobile product designed for repeat use." capabilities={["Mobile product design and interaction", "Trivia, progression, and rewards", "Scripture reading and audio surfaces", "AI-assisted study features", "App Store release"]} href="https://apps.apple.com/qa/app/bible-trivia-quest/id6762559649" linkLabel="View on the App Store" path="/work/bible-trivia-quest" metadataTitle={title} metadataDescription={description} />;
}
