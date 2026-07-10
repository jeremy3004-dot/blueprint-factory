import type { Metadata } from "next";
import { BookingClose } from "../../components/BookingClose";
import { Reveal } from "../../components/Reveal";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { dining } from "../../lib/content";

export const metadata: Metadata = {
  title: "Dining above Phewa Lake",
  description:
    "Local produce, thoughtful plates and lake-facing drinks at Dorje's Resort & Spa in Sedi Hills, Pokhara."
};

const venues = [
  {
    number: "01",
    name: "Dorje's Bar & Grill",
    detail: "Local flavours and global influences, served with the stillness of the Sedi Hills.",
    image: "/media/dining-table.jpg",
    alt: "A carefully prepared dinner at Dorje's Resort & Spa"
  },
  {
    number: "02",
    name: "Moondance Restaurant",
    detail: "Dorje's first Pokhara gathering place, welcoming travellers in Lakeside since 1991.",
    image: "/media/moondance.jpg",
    alt: "The entrance to Moondance Restaurant in Pokhara"
  },
  {
    number: "03",
    name: "The Hearth",
    detail: "Private dining, barbecue and a fire-pit setting for intimate gatherings of approximately 25 to 30 guests.",
    image: "/media/gallery-g8.jpg",
    alt: "A warm private gathering space at Dorje's"
  }
] as const;

export default function TastesPage() {
  const [farmStory, goldenHourStory, moondanceStory] = dining.stories;

  return (
    <>
      <SiteHeader />
      <main id="content" className="site-main dining-page">
        <section className="dining-hero page-shell" aria-labelledby="dining-title">
          <Reveal className="dining-hero-copy">
            <p className="eyebrow">Taste · Sedi Hills</p>
            <h1 id="dining-title" className="display">From the hillside,<br />to the table.</h1>
            <p className="lede">{dining.intro}</p>
            <a className="text-link" href="#dining-stories">Discover the table</a>
          </Reveal>
          <Reveal className="dining-hero-image media-frame" delay={120}>
            <img
              src="/media/drinks-view.jpg"
              alt="An evening table overlooking the landscape at Dorje's"
              width="600"
              height="600"
              fetchPriority="high"
            />
          </Reveal>
          <p className="dining-hero-caption" aria-hidden="true">Pokhara · Nepal</p>
        </section>

        <section id="dining-stories" className="dining-feature page-shell" aria-labelledby="farm-title">
          <div className="dining-feature-media">
            <Reveal className="dining-feature-primary media-frame">
              <img src={farmStory.image} alt="A platter prepared with local ingredients" width="600" height="800" />
            </Reveal>
            <Reveal className="dining-feature-secondary media-frame" delay={140}>
              <img src="/media/taste.webp" alt="A plated main course at Dorje's" width="600" height="600" />
            </Reveal>
            <span className="dining-feature-index" aria-hidden="true">01</span>
          </div>
          <Reveal className="dining-feature-copy" delay={80}>
            <p className="eyebrow">{farmStory.eyebrow}</p>
            <h2 id="farm-title" className="section-title">{farmStory.title}</h2>
            <p>{farmStory.description}</p>
            <p className="dining-note">Vegetables from the nearby farm and produce from local markets keep each meal close to the landscape that surrounds it.</p>
          </Reveal>
        </section>

        <section className="dining-editorials page-shell" aria-label="Dining stories">
          <article className="dining-editorial">
            <Reveal className="dining-editorial-image media-frame">
              <img src={goldenHourStory.image} alt="A lake-facing table set at golden hour" width="600" height="600" />
            </Reveal>
            <Reveal className="dining-editorial-copy" delay={100}>
              <span className="dining-rule-label">02 · Lake bar</span>
              <p className="eyebrow">{goldenHourStory.eyebrow}</p>
              <h2 className="section-title">{goldenHourStory.title}</h2>
              <p>{goldenHourStory.description}</p>
            </Reveal>
          </article>

          <article className="dining-editorial dining-editorial-reverse">
            <Reveal className="dining-editorial-image media-frame">
              <img src={moondanceStory.image} alt="The entrance to Moondance Restaurant in Lakeside, Pokhara" width="392" height="522" />
            </Reveal>
            <Reveal className="dining-editorial-copy" delay={100}>
              <span className="dining-rule-label">03 · Since 1991</span>
              <p className="eyebrow">{moondanceStory.eyebrow}</p>
              <h2 className="section-title">{moondanceStory.title}</h2>
              <p>{moondanceStory.description}</p>
            </Reveal>
          </article>
        </section>

        <section className="dining-venues" aria-labelledby="venues-title">
          <Reveal className="dining-venues-heading page-shell">
            <div>
              <p className="eyebrow">Three places to gather</p>
              <h2 id="venues-title" className="section-title">A table for every kind of evening</h2>
            </div>
            <p>From a drink above the lake to a private fire-lit meal, our team can help shape the occasion.</p>
          </Reveal>
          <div className="dining-venue-rail" role="list" aria-label="Dorje's dining venues">
            {venues.map((venue, index) => (
              <Reveal key={venue.name} className="dining-venue-card" delay={index * 90} role="listitem">
                <div className="dining-venue-image media-frame">
                  <img src={venue.image} alt={venue.alt} />
                </div>
                <div className="dining-venue-copy">
                  <span>{venue.number}</span>
                  <h3>{venue.name}</h3>
                  <p>{venue.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <BookingClose eyebrow="Dining in Sedi Hills" title="Reserve a table above Phewa Lake" />
      </main>
      <SiteFooter />

      <style>{`
        .dining-page { background: var(--paper); }
        .dining-hero {
          position: relative;
          display: grid;
          grid-template-columns: minmax(300px, .78fr) minmax(440px, 1.22fr);
          gap: clamp(42px, 8vw, 128px);
          align-items: center;
          min-height: calc(100svh - 80px);
          padding-block: clamp(46px, 7vw, 104px);
        }
        .dining-hero::before {
          content: "";
          position: absolute;
          inset: 8% auto 8% 34%;
          width: 1px;
          background: var(--line);
          opacity: .75;
        }
        .dining-hero-copy { position: relative; z-index: 1; padding-left: clamp(0px, 2vw, 28px); }
        .dining-hero-copy .display { font-size: clamp(46px, 5vw, 72px); }
        .dining-hero-copy .lede { max-width: 440px; margin: 32px 0 0; }
        .dining-hero-copy .text-link { text-transform: uppercase; letter-spacing: .16em; }
        .dining-hero-image { height: min(72svh, 810px); min-height: 560px; }
        .dining-hero-image img { object-position: center 58%; }
        .dining-hero-caption {
          position: absolute;
          right: -4px;
          bottom: 12%;
          margin: 0;
          color: var(--muted);
          font-size: 8px;
          letter-spacing: .2em;
          text-transform: uppercase;
          writing-mode: vertical-rl;
        }
        .dining-feature {
          display: grid;
          grid-template-columns: minmax(0, 1.18fr) minmax(290px, .82fr);
          gap: clamp(64px, 10vw, 156px);
          align-items: center;
          padding-block: clamp(120px, 15vw, 220px);
        }
        .dining-feature-media { position: relative; min-height: min(68vw, 820px); }
        .dining-feature-primary { position: absolute; inset: 0 21% 12% 0; }
        .dining-feature-primary img { object-position: center; }
        .dining-feature-secondary {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 43%;
          aspect-ratio: 1;
          border: clamp(8px, 1.2vw, 18px) solid var(--paper);
        }
        .dining-feature-index {
          position: absolute;
          top: 0;
          right: 8%;
          color: var(--brass);
          font-family: var(--display);
          font-size: clamp(44px, 7vw, 100px);
          line-height: 1;
          opacity: 1;
        }
        .dining-feature-copy { max-width: 470px; }
        .dining-feature-copy > p:not(.eyebrow), .dining-editorial-copy > p:not(.eyebrow) { color: var(--muted); }
        .dining-feature-copy .section-title { max-width: 440px; font-size: clamp(34px, 3.6vw, 54px); }
        .dining-feature-copy > p:nth-of-type(2) { margin-top: 30px; }
        .dining-note { margin-top: 28px; padding-top: 24px; border-top: 1px solid var(--line); font-size: 12px; }
        .dining-editorials {
          display: grid;
          gap: clamp(120px, 17vw, 240px);
          padding-bottom: clamp(140px, 17vw, 240px);
        }
        .dining-editorial {
          display: grid;
          grid-template-columns: minmax(0, 1.12fr) minmax(280px, .88fr);
          gap: clamp(54px, 10vw, 160px);
          align-items: center;
        }
        .dining-editorial-image { aspect-ratio: 6 / 5; }
        .dining-editorial-copy { max-width: 480px; }
        .dining-editorial-copy .section-title { max-width: 460px; }
        .dining-editorial-copy > p:last-child { margin: 28px 0 0; }
        .dining-rule-label {
          display: block;
          margin-bottom: clamp(54px, 8vw, 110px);
          padding-bottom: 12px;
          border-bottom: 1px solid var(--line);
          color: var(--muted);
          font-size: 8px;
          letter-spacing: .17em;
          text-transform: uppercase;
        }
        .dining-editorial-reverse { grid-template-columns: minmax(280px, .82fr) minmax(0, 1.18fr); }
        .dining-editorial-reverse .dining-editorial-image { order: 2; aspect-ratio: 4 / 5; max-height: 780px; }
        .dining-editorial-reverse .dining-editorial-copy { justify-self: end; }
        .dining-venues {
          padding: clamp(100px, 12vw, 180px) max(20px, calc((100vw - 1400px) / 2));
          background: var(--moss);
          color: var(--paper-light);
          overflow: hidden;
        }
        .dining-venues .eyebrow { color: rgba(255,255,255,.58); }
        .dining-venues-heading {
          display: grid;
          grid-template-columns: 1fr .72fr;
          gap: 8vw;
          align-items: end;
          margin-bottom: clamp(58px, 7vw, 100px);
        }
        .dining-venues-heading > p { max-width: 420px; margin: 0 0 4px; color: rgba(255,255,255,.62); }
        .dining-venue-rail { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(18px, 2.5vw, 38px); }
        .dining-venue-card { min-width: 0; }
        .dining-venue-image { aspect-ratio: 4 / 5; background: #30372b; }
        .dining-venue-image img { object-position: center; }
        .dining-venue-copy { position: relative; padding: 26px 0 0 36px; border-top: 1px solid rgba(255,255,255,.18); }
        .dining-venue-copy > span { position: absolute; top: 29px; left: 0; color: rgba(255,255,255,.45); font-size: 8px; }
        .dining-venue-copy h3 { margin: 0; font-family: var(--display); font-size: clamp(25px, 2.3vw, 36px); font-weight: 400; line-height: 1.1; }
        .dining-venue-copy p { max-width: 360px; margin: 14px 0 0; color: rgba(255,255,255,.56); font-size: 11px; }

        @media (max-width: 1023px) {
          .dining-hero { grid-template-columns: .9fr 1.1fr; gap: 46px; min-height: 760px; }
          .dining-hero::before { left: 39%; }
          .dining-hero-image { min-height: 540px; }
          .dining-feature { gap: 62px; }
          .dining-feature-media { min-height: 650px; }
          .dining-editorial { gap: 56px; }
        }

        @media (max-width: 720px) {
          .dining-hero {
            grid-template-columns: 1fr;
            gap: 34px;
            min-height: 0;
            padding: 54px 0 96px;
          }
          .dining-hero::before, .dining-hero-caption { display: none; }
          .dining-hero-copy { padding: 0 8px; }
          .dining-hero-copy .display { font-size: clamp(44px, 13vw, 60px); }
          .dining-hero-copy .lede { margin-top: 24px; }
          .dining-hero-image { min-height: 0; height: auto; aspect-ratio: 4 / 5; }
          .dining-feature { grid-template-columns: 1fr; gap: 52px; padding-block: 100px 120px; }
          .dining-feature-media { min-height: 0; height: 128vw; max-height: 660px; }
          .dining-feature-primary { right: 16%; bottom: 13%; }
          .dining-feature-secondary { width: 46%; }
          .dining-feature-index { right: 4%; font-size: 56px; }
          .dining-feature-copy { padding-inline: 8px; }
          .dining-editorials { gap: 118px; padding-bottom: 128px; }
          .dining-editorial, .dining-editorial-reverse { grid-template-columns: 1fr; gap: 34px; }
          .dining-editorial-reverse .dining-editorial-image { order: 0; }
          .dining-editorial-image, .dining-editorial-reverse .dining-editorial-image { aspect-ratio: 4 / 5; }
          .dining-editorial-copy { padding-inline: 8px; }
          .dining-rule-label { margin-bottom: 42px; }
          .dining-venues { padding: 92px 0 100px; }
          .dining-venues-heading { grid-template-columns: 1fr; gap: 26px; padding-inline: 22px; margin-bottom: 54px; }
          .dining-venue-rail {
            display: flex;
            gap: 18px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            padding: 0 22px 18px;
          }
          .dining-venue-rail::-webkit-scrollbar { display: none; }
          .dining-venue-card { flex: 0 0 min(82vw, 338px); scroll-snap-align: start; }
        }
      `}</style>
    </>
  );
}
