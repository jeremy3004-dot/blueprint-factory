import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section-shell flex min-h-[60svh] flex-col items-start justify-center gap-6">
      <p className="section-kicker">Not found</p>
      <h1 className="font-display text-5xl text-white md:text-7xl">
        That trail is not on this map.
      </h1>
      <p className="max-w-2xl text-base leading-8 text-stone-300">
        The route you asked for is not in the current catalog. Head back to the trek
        explorer to compare the routes we currently feature across Everest, Annapurna,
        Mustang, Langtang, Manaslu, and beyond.
      </p>
      <Link
        href="/treks"
        className="rounded-full border border-white/15 px-5 py-3 text-sm uppercase tracking-[0.24em] text-stone-100 transition hover:border-amber-300/35 hover:text-amber-300"
      >
        Back to routes
      </Link>
    </main>
  );
}
