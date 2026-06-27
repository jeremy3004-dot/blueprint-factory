import Link from "next/link";

export function SiteShell({
  children,
  tone = "paper",
}: {
  children: React.ReactNode;
  tone?: "paper" | "dark";
}) {
  return (
    <main className={`appSurface ${tone === "dark" ? "darkSurface" : ""}`}>
      <header className="appHeader">
        <Link className="appBrand" href="/">
          Alpine <em>Bloom</em>
          <span>Himalaya · Women-Led</span>
        </Link>
        <nav aria-label="Alpine Bloom sections">
          <Link href="/treks">Treks</Link>
          <Link href="/planner">Planner</Link>
          <Link href="/book">Book</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </header>
      {children}
    </main>
  );
}
