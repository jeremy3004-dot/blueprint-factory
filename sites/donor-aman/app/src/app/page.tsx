const craftNotes = [
  "Art direction before build",
  "One signature moment",
  "Motion judged in context"
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="heroGrid" aria-hidden="true" />
        <p className="eyebrow">Blueprint Factory Starter</p>
        <h1>donor-aman is ready for its signature moment.</h1>
        <p className="lede">
          Replace this starter page with the site-specific concept from
          art-direction.md. The blueprint-line motif is only a starting point.
        </p>
        <div className="trace" aria-hidden="true" />
      </section>

      <section className="proof">
        {craftNotes.map((note) => (
          <article key={note}>
            <span />
            <h2>{note}</h2>
          </article>
        ))}
      </section>
    </main>
  );
}
