import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <p className="section-label">404</p>
      <h1>This page has left the table.</h1>
      <p>Return to the cafe's current public pages.</p>
      <Link className="outline-link" href="/">
        <span>Back home</span>
        <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
