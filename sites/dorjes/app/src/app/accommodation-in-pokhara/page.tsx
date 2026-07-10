import type { Metadata } from "next";
import { BookingClose } from "../../components/BookingClose";
import { Reveal } from "../../components/Reveal";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { rooms, site } from "../../lib/content";

export const metadata: Metadata = {
  title: "Accommodation in Pokhara",
  description:
    "Discover Dorje's suites and rooms in Sedi Hills, Pokhara, from private lake-facing suites to quiet courtyard rooms."
};

const roomDetails: Record<(typeof rooms)[number]["name"], readonly string[]> = {
  "Dorje Suite": [
    "Separate sitting room",
    "Private outdoor patio",
    "Phewa Lake outlook",
    "Jetted bathtub",
    "Outdoor shower"
  ],
  "Jen Suite": [
    "Generous private lounge",
    "Separate bedroom",
    "Wide lake views",
    "Emerald-hill outlook",
    "Window-side jetted bathtub"
  ],
  "Deluxe Room": [
    "Comfortable double room",
    "Spacious furnished balcony",
    "Unobstructed lake view"
  ],
  "Standard Room": [
    "King-size bed",
    "Courtyard view",
    "Well-designed bathroom",
    "Quiet minimalist interior"
  ]
};

export default function AccommodationPage() {
  return (
    <>
      <SiteHeader />
      <main id="content" className="site-main">
        <section className="page-hero room-page-hero" aria-labelledby="stay-title">
          <div className="page-shell">
            <Reveal>
              <div className="media-frame room-hero-frame">
                <img
                  src="/media/resort-view.jpg"
                  alt="A shaded terrace at Dorje's overlooking Phewa Lake"
                  fetchPriority="high"
                />
                <div className="room-hero-shade">
                  <p className="eyebrow">Stay · Sedi Hills, Pokhara</p>
                  <h1 id="stay-title" className="display">
                    Rooms shaped by hillside stillness.
                  </h1>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <Reveal className="page-shell page-intro room-intro">
          <div>
            <p className="eyebrow">Eighteen rooms · One hillside</p>
            <h2 className="section-title">A private place above Phewa Lake</h2>
          </div>
          <p className="lede">
            Locally inspired cottages pair warm timber and stone with calm,
            contemporary interiors. Choose a suite made for lingering over the view,
            or a quieter room for an uncomplicated restorative stay in Pokhara.
          </p>
        </Reveal>

        <section className="page-shell story-list room-list" aria-label="Rooms and suites">
          {rooms.map((room, index) => (
            <article className="story-row room-story" key={room.name}>
              <Reveal className="story-media room-story-visual">
                <div className="media-frame room-story-main">
                  <img src={room.hero} alt={`${room.name} at Dorje's Resort & Spa`} />
                </div>
                <div className="media-frame room-story-detail" aria-hidden="true">
                  <img src={room.image} alt="" />
                </div>
              </Reveal>

              <Reveal className="story-copy room-story-copy" delay={120}>
                <span className="story-count">
                  {String(index + 1).padStart(2, "0")} · {room.count}
                </span>
                <p className="eyebrow">Room &amp; suite collection</p>
                <h2 className="section-title">{room.name}</h2>
                <p>{room.description}</p>
                <ul className="room-features" aria-label={`${room.name} features`}>
                  {roomDetails[room.name].map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <div className="room-actions">
                  <a className="text-link" href={site.booking}>
                    Check availability
                  </a>
                  <a className="text-link" href={room.href}>
                    View room details
                  </a>
                </div>
              </Reveal>
            </article>
          ))}
        </section>

        <BookingClose
          eyebrow="Your stay in Pokhara"
          title="Let the lake set the pace of your days."
        />
      </main>
      <SiteFooter />

      <style>{`
        .room-page-hero {
          padding-bottom: clamp(84px, 10vw, 144px);
        }

        .room-hero-frame {
          position: relative;
          aspect-ratio: 4 / 3;
          max-height: min(76vh, 780px);
          margin-inline: auto;
        }

        .room-hero-frame > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 54%;
        }

        .room-hero-shade {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: clamp(28px, 5vw, 74px);
          color: white;
          background: linear-gradient(to top, rgba(18, 20, 16, .66), transparent 62%);
          pointer-events: none;
        }

        .room-hero-shade .eyebrow {
          color: rgba(255, 255, 255, .78);
        }

        .room-hero-shade .display {
          max-width: 820px;
          text-wrap: balance;
        }

        .room-intro {
          align-items: start;
        }

        .room-intro .section-title {
          max-width: 470px;
        }

        .room-intro .lede {
          margin: 0;
        }

        .room-list {
          padding-inline: clamp(0px, 2vw, 30px);
        }

        .room-story-visual {
          position: relative;
          overflow: visible;
        }

        .room-story-main {
          width: 100%;
          height: 100%;
        }

        .room-story-main img,
        .room-story-detail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .room-story-detail {
          position: absolute;
          right: -4%;
          bottom: -10%;
          width: clamp(122px, 29%, 230px);
          aspect-ratio: 1;
          border: 8px solid var(--paper);
          box-shadow: 0 18px 42px rgba(36, 37, 31, .12);
        }

        .room-story:nth-child(even) .room-story-detail {
          right: auto;
          left: -4%;
        }

        .room-story-copy .section-title {
          margin-bottom: 20px;
        }

        .room-story-copy > p:not(.eyebrow) {
          margin: 0;
        }

        .room-features {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px 24px;
          margin: 30px 0 0;
          padding: 22px 0 0;
          border-top: 1px solid var(--line);
          color: var(--muted);
          font-size: 9px;
          font-weight: 500;
          letter-spacing: .09em;
          line-height: 1.5;
          list-style: none;
          text-transform: uppercase;
        }

        .room-features li {
          position: relative;
          padding-left: 20px;
        }

        .room-features li::before {
          content: "";
          position: absolute;
          top: .7em;
          left: 0;
          width: 10px;
          height: 1px;
          background: var(--brass);
        }

        .room-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 34px;
          margin-top: 10px;
        }

        @media (max-width: 1023px) {
          .room-list {
            padding-inline: 0;
          }

          .room-story-detail {
            right: -2%;
            bottom: -8%;
            border-width: 6px;
          }

          .room-story:nth-child(even) .room-story-detail {
            left: -2%;
          }

          .room-features {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .room-page-hero {
            padding-top: 0;
            padding-bottom: 82px;
          }

          .room-page-hero .page-shell {
            width: 100%;
          }

          .room-hero-frame {
            aspect-ratio: 4 / 5;
            max-height: none;
          }

          .room-hero-frame > img {
            object-position: 50% 50%;
          }

          .room-hero-shade {
            padding: 28px 20px 34px;
          }

          .room-story-visual {
            margin-bottom: 22px;
          }

          .room-story-detail {
            right: 12px;
            bottom: -28px;
            width: 34%;
          }

          .room-story:nth-child(even) .room-story-detail {
            right: auto;
            left: 12px;
          }

          .room-features {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap-inline: 18px;
          }
        }

        @media (max-width: 420px) {
          .room-features {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
