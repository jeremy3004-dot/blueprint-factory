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
          <p className="introEyebrow">Interactive website portfolio</p>
          <h1>
            High-craft website demos,
            <span> ready to open full screen.</span>
          </h1>
          <p className="introCopy">
            Blueprint Factory builds animated websites for real businesses. This page collects{" "}
            {liveDemoCount} completed live projects and concept demos — each one a full independent
            site you can browse, scroll, and judge on its own terms.
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
              <dd>Live websites &amp; demos</dd>
            </div>
          </dl>
        </section>

        <DemoCarousel projects={liveDemoProjects} />
        <ProjectIndex projects={liveDemoProjects} />
      </main>

      <footer className="siteFooter">
        <p>
          This collection includes production websites and interactive concept demonstrations built
          by Blueprint Factory. Concept entries do not imply that the represented businesses
          commissioned, approved, or currently operate them.
        </p>
      </footer>
    </>
  );
}
