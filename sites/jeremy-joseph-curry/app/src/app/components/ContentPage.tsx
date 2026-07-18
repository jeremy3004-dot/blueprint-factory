import SiteNav from "./SiteNav";

type ContentPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
};

export default function ContentPage({ eyebrow, title, intro, children }: ContentPageProps) {
  return (
    <main className="subpage">
      <SiteNav />
      <div className="subpageBackdrop" aria-hidden="true" />
      <section className="subpageHero" aria-labelledby="page-title">
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="page-title">{title}</h1>
        <p className="subpageIntro">{intro}</p>
      </section>
      <div className="subpageContent">{children}</div>
      <footer className="footer">
        <strong>Jeremy Joseph Curry</strong>
        <span>Software Engineer &amp; App Developer / Nepal</span>
        <span><a href="/about">About</a> / <a href="/links">All links</a></span>
        <a href="mailto:hello@jeremyjosephcurry.com">hello@jeremyjosephcurry.com</a>
      </footer>
    </main>
  );
}

export function ContentBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="contentBlock">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
