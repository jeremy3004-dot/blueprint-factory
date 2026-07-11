import Image from "next/image";
import type { LiveDemoProject } from "@/data/projects";

type ProjectIndexProps = {
  projects: LiveDemoProject[];
};

export function ProjectIndex({ projects }: ProjectIndexProps) {
  return (
    <section className="indexSection" aria-labelledby="project-index-heading">
      <div className="indexIntro">
        <p className="sectionEyebrow">Static index</p>
        <h2 id="project-index-heading">Every demo, one glance</h2>
        <p>
          The carousel is the signature move. This index keeps every project discoverable without
          motion.
        </p>
      </div>

      <ol className="indexList">
        {projects.map((project, index) => (
          <li key={project.slug} className="indexItem">
            <div className="indexNumber" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="indexThumb">
              <Image
                src={project.screenshot}
                alt=""
                fill
                sizes="120px"
                className="indexImage"
              />
            </div>
            <div className="indexCopy">
              <div className="indexMeta">
                <span className="liveDemoBadge">Live Demo</span>
                <p className="indexCategory">{project.category}</p>
              </div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </div>
            <a
              href={project.url}
              className="indexCta"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo for ${project.name}`}
            >
              View Live Demo
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
