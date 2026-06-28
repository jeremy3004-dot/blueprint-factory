import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { companyProfile } from "@/data/company";
import { travelFaqItems } from "@/data/site-content";

export default function FaqPage() {
  return (
    <main className="section-shell pb-24 pt-12 md:pt-16">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="space-y-5">
          <p className="section-kicker">FAQ and helpful stuff</p>
          <h1 className="font-display text-5xl text-white md:text-7xl">
            Practical details to sort before you book.
          </h1>
          <p className="max-w-xl text-base leading-8 text-stone-300">
            Use these notes to prepare for your Nepal trek request. The {companyProfile.shortName} team can still fine-tune route, dates, paperwork, guide style, and backup plans around your exact itinerary.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-stone-950 transition hover:bg-amber-200"
            >
              Start booking <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/treks"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm uppercase tracking-[0.24em] text-stone-100 transition hover:border-amber-300/40 hover:text-amber-300"
            >
              Compare routes
            </Link>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2">
          {travelFaqItems.map((item) => (
            <article key={item.question} className="border-t border-white/10 pt-5">
              <h2 className="text-sm uppercase tracking-[0.22em] text-stone-100">
                {item.question}
              </h2>
              <p className="mt-3 text-sm leading-7 text-stone-300">{item.answer}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
