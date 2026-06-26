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
        <p className="eyebrow">Blueprint Factory Proof</p>
        <h1>High-craft websites start as a system.</h1>
        <p className="lede">
          A glowing trace draws the first fold before any site is called ready:
          brief, art direction, motion evidence, and a taste gate.
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
