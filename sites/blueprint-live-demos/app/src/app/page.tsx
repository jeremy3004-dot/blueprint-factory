import { DemoCarousel } from "@/components/DemoCarousel";
import { ProjectIndex } from "@/components/ProjectIndex";
import { liveDemoCount, liveDemoProjects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <header className="siteHeader">
        <p className="siteMark">Blueprint Factory</p>
        <p className="siteSubtitle">Live Demos</p>
      </header>

      <main>
        <section className="introSection">
          <p className="introEyebrow">Interactive concept portfolio</p>
          <h1>
            High-craft website demos,
            <span> ready to open full screen.</span>
          </h1>
          <p className="introCopy">
            Blueprint Factory builds animated websites for real businesses. This page collects{" "}
            {liveDemoCount} completed live demos — each one a full independent site you can browse,
            scroll, and judge on its own terms.
          </p>
          <dl className="introStats">
            <div>
              <dt>Published demos</dt>
              <dd>{liveDemoCount}</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>Full-page live sites</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Concept demonstrations</dd>
            </div>
          </dl>
        </section>

        <DemoCarousel projects={liveDemoProjects} />
        <ProjectIndex projects={liveDemoProjects} />
      </main>

      <footer className="siteFooter">
        <p>
          These are interactive concept demonstrations built by Blueprint Factory. They do not
          imply that the represented businesses commissioned, approved, or currently operate each
          concept.
        </p>
      </footer>
    </>
  );
}
