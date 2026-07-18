import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { authorityGraph, personJsonLd, PORTRAIT_ALT, websiteJsonLd } from "./authority";

const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "React Native",
  "Node.js",
  "Python",
  "APIs",
  "Databases",
  "AI integration",
  "Cloud deploys"
];

const featuredWork = [
  {
    title: "Bible Trivia Quest",
    label: "iOS app",
    href: "/work/bible-trivia-quest",
    detail:
      "A pixel-art Bible quiz app with trivia modes, Scripture reading, audio, progress tracking, rewards, and AI study companion features."
  },
  {
    title: "HimalRx",
    label: "Pharmacy SaaS",
    href: "/work/himalrx",
    detail:
      "A Nepal-focused pharmacy operations system for inventory, batches, expiry dates, sales, staff, customer records, reminders, and owner reports."
  },
  {
    title: "Green Pastures / GPTrek",
    label: "Travel platform",
    href: "/work/gptrek",
    detail:
      "A trekking company platform for route discovery, booking flow, local operator details, route content, and AI concierge planning support."
  },
  {
    title: "Gurkha Fit",
    label: "Fitness app",
    href: "/work/gurkha-fit",
    detail:
      "A training app for structured running, ruck and doko-style workouts, clubs, GPS activity tracking, bilingual support, and practical coaching."
  }
];

const buildLines = [
  { label: "idea", value: "product brief accepted" },
  { label: "design", value: "interface direction locked" },
  { label: "frontend", value: "responsive app shell built" },
  { label: "backend", value: "APIs and data flow wired" },
  { label: "ai", value: "useful automation added" },
  { label: "ship", value: "deploy complete" }
];

const capabilities = [
  {
    title: "Mobile apps",
    detail: "iOS and Android products from early prototype through release-ready build."
  },
  {
    title: "Web applications",
    detail: "Dashboards, SaaS tools, internal platforms, and product surfaces that hold up in real use."
  },
  {
    title: "Websites and frontend",
    detail: "Fast, responsive, high-craft websites with clean interfaces and strong search foundations."
  },
  {
    title: "Backend systems",
    detail: "APIs, databases, integrations, authentication flows, and deployment paths."
  },
  {
    title: "AI-powered software",
    detail: "LLM features, agent workflows, chat tools, automations, and productized AI interfaces."
  }
];

export default function Home() {
  const homeJsonLd = authorityGraph([personJsonLd, websiteJsonLd]);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <div className="ambient" aria-hidden="true">
        <span className="star starA" />
        <span className="star starB" />
        <span className="star starC" />
        <span className="star starD" />
      </div>

      <header className="siteHeader" aria-label="Site header">
        <a className="brand" href="#top" aria-label="Jeremy Joseph Curry home">
          <span className="brandMark">J</span>
          <span>Jeremy Joseph Curry</span>
        </a>
        <nav className="siteNav" aria-label="Primary navigation">
          <Link href="/writing">Writing</Link>
          <Link href="/about">About</Link>
          <Link href="/links">Links</Link>
          <a className="headerLink" href="mailto:hello@jeremyjosephcurry.com">Contact</a>
        </nav>
      </header>

      <section id="top" className="heroSection" aria-labelledby="hero-title">
        <div className="ghostPanel ghostPanelOne" aria-hidden="true">
          <span>mobile/app.tsx</span>
          <span>api/routes.ts</span>
          <span>ai/agent.ts</span>
          <span>deploy/cloudflare</span>
        </div>
        <div className="ghostPanel ghostPanelTwo" aria-hidden="true">
          <span>npm run build</span>
          <span>typecheck passed</span>
          <span>preview ready</span>
        </div>

        <article className="commandWindow reveal">
          <div className="windowChrome">
            <span className="statusDot" />
            <span>Ship Console</span>
            <span className="chromeMeta">Nepal / Remote</span>
          </div>
          <div className="heroContent">
            <div className="heroCopy">
              <p className="eyebrow">Software Engineer & App Developer</p>
              <h1 id="hero-title">Jeremy Joseph Curry builds software from idea to launch.</h1>
              <p className="lede">
                Full-stack developer based in Nepal, building mobile apps, web applications,
                websites, backend systems, and AI-powered software for founders and teams.
              </p>
              <div className="heroActions" aria-label="Primary actions">
                <a className="button buttonPrimary" href="mailto:hello@jeremyjosephcurry.com">
                  Work with Jeremy
                </a>
                <a className="button buttonGhost" href="#proof">
                  See the work
                </a>
              </div>
              <div className="orchestrates" aria-label="Development focus areas">
                <span>Builds</span>
                <b>Mobile</b>
                <b>Web</b>
                <b>Backend</b>
                <b>AI</b>
              </div>
              <p className="proofLink">
                Public apps and projects include{" "}
                <a href="https://apps.apple.com/us/developer/jeremy-joseph-curry/id1867562495">
                  Apple App Store releases
                </a>
                , business SaaS, and Nepal-focused web platforms.
              </p>
            </div>
            <div className="portraitShell" aria-label="Portrait of Jeremy Joseph Curry">
              <Image
                src="/images/jeremy-joseph-curry-1x1.jpg"
                alt={PORTRAIT_ALT}
                width={1200}
                height={1200}
              />
            </div>
          </div>
        </article>

        <a className="scrollCue" href="#proof">
          See how I build
          <span aria-hidden="true">v</span>
        </a>
      </section>

      <section id="proof" className="proofSection" aria-labelledby="proof-title">
        <div className="sectionHeading reveal">
          <p className="eyebrow">End-to-end delivery</p>
          <h2 id="proof-title">A product builder&apos;s command center.</h2>
          <p>
            One developer who can reason across interface, backend, AI, deployment,
            and the small details that make software feel finished.
          </p>
        </div>

        <div className="proofConsole reveal">
          <div className="browserBar" aria-hidden="true">
            <span />
            <span />
            <span />
            <strong>jeremyjosephcurry.com</strong>
          </div>
          <div className="consoleGrid">
            <div className="consoleMain">
              <p className="consoleLabel">Current pipeline</p>
              <ul>
                {buildLines.map((line, index) => (
                  <li key={line.label} style={{ "--index": index } as CSSProperties}>
                    <span>{line.label}</span>
                    <strong>{line.value}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="consoleSide">
              <p className="consoleLabel">Available for</p>
              <strong>Freelance, product collaborations, and contract engineering.</strong>
              <span>Based in Nepal. Remote worldwide.</span>
            </aside>
          </div>

          <div className="consoleCapabilities">
            {capabilities.map((item, index) => (
              <article className="capabilityRow" key={item.title} style={{ "--index": index } as CSSProperties}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>

          <div className="stackSection" aria-label="Technology stack">
            <div className="stackTrack">
            {stack.concat(stack).map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="workSection" aria-labelledby="work-title">
        <div className="sectionHeading reveal">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title">Real products, not just portfolio words.</h2>
          <p>
            A few public examples of Jeremy Joseph Curry&apos;s software work across mobile apps,
            SaaS, local business platforms, AI-assisted workflows, and Cloudflare-backed web delivery.
          </p>
        </div>

        <div className="workGrid">
          {featuredWork.map((item, index) => (
            <a
              className="workCard reveal"
              href={item.href}
              key={item.title}
              style={{ "--index": index } as CSSProperties}
            >
              <span>{item.label}</span>
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
              <span className="cardArrow" aria-hidden="true">-&gt;</span>
            </a>
          ))}
        </div>
      </section>

      <section id="writing" className="writingSection" aria-labelledby="writing-title">
        <div className="sectionHeading reveal">
          <p className="eyebrow">Writing</p>
          <h2 id="writing-title">Engineering notes for shipping real products.</h2>
          <p>
            Current notes on product interfaces, data contracts, bounded AI behavior, and release
            systems that connect reviewed source to public proof.
          </p>
          <Link className="writingIndexLink" href="/writing">
            Browse all engineering writing -&gt;
          </Link>
        </div>
        <div className="writingGrid">
          <Link className="writingFeature reveal" href="/writing/shipping-ios-app-from-nepal">
            <span>Release engineering / iOS</span>
            <h2>Shipping an iOS App from Nepal: My Release Evidence Method</h2>
            <p>
              How Jeremy connects source revision, IPA identity, TestFlight distribution, App Store
              metadata, and the public product page.
            </p>
            <span className="cardArrow" aria-hidden="true">Read the article -&gt;</span>
          </Link>
          <Link className="writingFeature reveal" href="/writing/five-product-contracts">
            <span>Product engineering / Architecture</span>
            <h2>From Idea to Launch: The Five Product Contracts I Define Before I Build</h2>
            <p>
              A practical model for keeping the problem, interface, data, AI behavior, and release
              path coherent from idea to launch.
            </p>
            <span className="cardArrow" aria-hidden="true">Read the article -&gt;</span>
          </Link>
          <Link
            className="writingFeature reveal"
            href="/writing/reading-the-himalrx-workflow-as-decisions-not-screens"
          >
            <span>Product engineering / Operations</span>
            <h2>Reading the HimalRx Workflow as Decisions, Not Screens</h2>
            <p>
              How batch-aware inventory, connected counter actions, role-specific views, alerts,
              history, and reporting support one coherent operating truth.
            </p>
            <span className="cardArrow" aria-hidden="true">Read the article -&gt;</span>
          </Link>
        </div>
      </section>

      <section className="contactSection" aria-labelledby="contact-title">
        <article className="availabilityCard reveal">
          <div>
            <p className="eyebrow">Availability</p>
            <h2 id="contact-title">Bring the idea. I will help turn it into working software.</h2>
          </div>
          <p>
            Jeremy Joseph Curry is open to freelance projects, product collaborations,
            and contract engineering roles with founders, businesses, and remote teams.
          </p>
          <a className="button buttonPrimary" href="mailto:hello@jeremyjosephcurry.com">
            Email Jeremy
          </a>
        </article>
      </section>

      <footer className="footer">
        <strong>Jeremy Joseph Curry</strong>
        <span>Software Engineer & App Developer / Nepal</span>
        <span><a href="/about">About</a> / <a href="/links">All links</a></span>
        <a href="mailto:hello@jeremyjosephcurry.com">hello@jeremyjosephcurry.com</a>
      </footer>
    </main>
  );
}
