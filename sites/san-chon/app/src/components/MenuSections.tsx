import { menuSections } from "@/data/site";

export function MenuSections() {
  return (
    <div className="menuSections">
      <nav className="menuSections__nav container" aria-label="Menu sections">
        {menuSections.map((section) => (
          <a key={section.id} href={`#${section.id}`}>{section.title}</a>
        ))}
      </nav>

      {menuSections.map((section, sectionIndex) => (
        <section className="menuChapter container" id={section.id} key={section.id}>
          <div className="menuChapter__intro" data-reveal>
            <p className="eyebrow">{section.eyebrow}</p>
            <h2 className="display">{section.title}</h2>
            <p>{section.note}</p>
          </div>
          <div className="menuChapter__items">
            {section.items.map((item, index) => (
              <article
                className="menuItem"
                data-reveal
                key={item.name}
                style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}
              >
                <span aria-hidden="true">{String(sectionIndex + 1).padStart(2, "0")}.{index + 1}</span>
                <div>
                  <h3 className="display">{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
