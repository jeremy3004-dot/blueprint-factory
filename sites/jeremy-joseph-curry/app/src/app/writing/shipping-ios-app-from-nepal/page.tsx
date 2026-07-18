import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "../../components/SiteNav";
import { createPageMetadata, publishedArticleJsonLd } from "../../authority";

const path = "/writing/shipping-ios-app-from-nepal";
const title = "Shipping an iOS App from Nepal: My Release Evidence Method";
const description =
  "Jeremy Joseph Curry explains the release evidence method he uses to connect source code, IPA identity, TestFlight distribution, App Store metadata, and the public product page.";
const publicationDate = "2026-07-18";
const publicationDateTime = `${publicationDate}T00:00:00.000Z`;

export const metadata: Metadata = createPageMetadata({
  path,
  title,
  description,
  type: "article",
  publishedTime: publicationDateTime,
  modifiedTime: publicationDateTime
});

export default function ShippingIosAppFromNepal() {
  const jsonLd = publishedArticleJsonLd({
    path,
    title,
    description,
    datePublished: publicationDate,
    dateModified: publicationDate
  });

  return (
    <main className="subpage">
      <SiteNav />
      <div className="subpageBackdrop" aria-hidden="true" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link className="articleBack" href="/writing">
        &lt;- Back to Writing
      </Link>
      <article className="articlePage" data-approved-article="true">
        <header className="articleHeader">
          <h1>{title}</h1>
          <div className="articleByline">
            <strong>
              By <Link href="/about">Jeremy Joseph Curry</Link>
            </strong>
            <span>Software Engineer &amp; App Developer based in Nepal</span>
          </div>
        </header>

        <div className="articleBody">
          <p>
            Shipping an iOS app is not the same thing as finishing the code. The code has to become
            a specific binary, that binary has to match a specific version of the repository, App
            Store Connect has to process it, testers have to receive it, and the public product page
            has to describe what the app really does.
          </p>
          <p>That chain is where I put most of my release discipline.</p>
          <p>
            I use Gurkha Fit as the practical example in this article. It is a fitness app with GPS
            activity tracking, offline operation with later synchronization, an AI coaching surface,
            and English and Nepali support. Its{" "}
            <a href="https://apps.apple.com/us/app/gurkha-fit/id6758262705">
              public App Store listing
            </a>{" "}
            identifies me as the developer and shows the current product, privacy disclosures, and
            version history. The point here is not that every app needs the same stack. It is that
            every release needs a traceable path from source code to the version users can install.
          </p>

          <h2>Start with the user path, not the archive</h2>
          <p>
            Before I build a release candidate, I write down the paths that must work on a real
            device. For an app with the capabilities described on Gurkha Fit&apos;s public listing, my
            test plan includes:
          </p>
          <ul>
            <li>starting and completing a GPS-tracked activity;</li>
            <li>continuing that activity when the phone is locked or the app is in the background;</li>
            <li>recording an activity without a network connection and synchronizing it later;</li>
            <li>handling location permission choices clearly;</li>
            <li>
              sending a coaching request and handling an AI-service failure without breaking the
              rest of the app.
            </li>
          </ul>
          <p>
            This list changes how I test. A simulator can help with layout, navigation, and controlled
            location input, but it cannot be the only proof for a mobile product built around outdoor
            tracking and background behavior. A release candidate has to survive the situations its
            product description promises.
          </p>
          <p>
            The same rule applies to metadata. Apple’s{" "}
            <a href="https://developer.apple.com/app-store/review/guidelines/">
              App Review Guidelines
            </a>{" "}
            require screenshots, descriptions, privacy information, and previews to reflect the app’s
            core experience. That makes the product page part of the release, not a marketing task
            that can be patched in later.
          </p>

          <h2>Treat privacy as an implementation inventory</h2>
          <p>
            Gurkha Fit’s public listing discloses categories including health and fitness, precise
            location, identifiers, user content, usage data, and diagnostics. Those labels cannot be
            chosen from memory. They have to be reconciled with what the binary and its third-party
            services actually do.
          </p>
          <p>My practical review is a small inventory:</p>
          <ol>
            <li>Which permissions can the app request?</li>
            <li>What data is produced when the user grants each permission?</li>
            <li>Where is that data stored or transmitted?</li>
            <li>Which third-party SDKs receive it?</li>
            <li>Can the user still use the rest of the product after declining an optional permission?</li>
            <li>Does the privacy policy describe the same behavior as the build?</li>
          </ol>
          <p>
            Apple’s{" "}
            <a href="https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy/">
              App Store Connect privacy guidance
            </a>{" "}
            makes developers responsible for keeping answers current and for including the practices
            of integrated third parties. The engineering consequence is simple: adding a service,
            permission, or data field can create release work even when the interface barely changes.
          </p>
          <p>
            For a location-based fitness app, the permission copy also has to explain the benefit and
            the boundary. Background location is useful during an active workout because the route
            should not stop when the screen locks. It should not become a vague request for permanent
            access. The app behavior, permission text, privacy policy, and store disclosure need to
            tell the same story.
          </p>

          <h2>Give every binary an identity</h2>
          <p>
            The most expensive release mistake is not always a crash. Sometimes it is losing
            confidence about what was actually uploaded.
          </p>
          <p>I prevent that with three identifiers:</p>
          <ul>
            <li>the Git commit for the source;</li>
            <li>the app version and build number inside the IPA; and</li>
            <li>the exact local path of the IPA that was submitted.</li>
          </ul>
          <p>
            In my general release method, I confirm that the source revision, version, build number,
            and selected artifact agree before submission. I submit the artifact I checked instead
            of asking a tool to choose whichever build it considers “latest.”
          </p>
          <p>
            This matters because “latest” can mean several different things: latest local source,
            latest cloud record, latest uploaded binary, or latest processed TestFlight build. Apple
            itself uses the build string to uniquely identify a build in its system, as described in{" "}
            <a href="https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds/">
              Upload builds
            </a>{"."} My release notes therefore record the identifiers instead of relying on a relative label.
          </p>

          <h2>Processing is not distribution</h2>
          <p>
            An upload is only the beginning of the App Store Connect state machine. Apple processes
            the binary before it appears as an available build. A processed build may be valid without
            being attached to a tester group, and internal TestFlight availability is separate from
            external beta approval and public App Store review.
          </p>
          <p>My release checklist distinguishes at least these states:</p>
          <ol>
            <li>the local IPA passed the precheck;</li>
            <li>the upload was accepted;</li>
            <li>App Store Connect finished processing the exact build;</li>
            <li>the build is valid for testing;</li>
            <li>the intended TestFlight group can access it;</li>
            <li>the intended app version has the correct build selected;</li>
            <li>review information and metadata are complete; and</li>
            <li>the public listing shows the approved version.</li>
          </ol>
          <p>
            Apple documents build processing and metadata separately in{" "}
            <a href="https://developer.apple.com/help/app-store-connect/manage-builds/view-builds-and-metadata/">
              View builds and metadata
            </a>{" "}
            and explains that one build is selected for each submitted app version in{" "}
            <a href="https://developer.apple.com/help/app-store-connect/manage-builds/choose-a-build-to-submit/">
              Choose a build to submit
            </a>{"."} Keeping those states separate prevents a successful upload message from being mistaken
            for a successful release.
          </p>

          <h2>Use a release gate that can fail loudly</h2>
          <p>
            My general release method is designed to stop when the evidence does not line up. The
            important part is preserving an explicit path from reviewed source to the artifact, App
            Store Connect record, tester state, and public listing.
          </p>
          <p>A simplified version looks like this:</p>
          <pre><code>{`verify source and tests
        ↓
check the next valid build number
        ↓
build the iOS archive
        ↓
inspect IPA version, build, and embedded revision
        ↓
submit that exact file
        ↓
wait for processing
        ↓
attach and verify TestFlight distribution
        ↓
select the build and complete review gates
        ↓
verify the public App Store page`}</code></pre>
          <p>
            My evidence check is intentionally strict. If the source moved after the IPA was created,
            I rebuild. If the version or build number does not identify the intended artifact, I stop.
            Rebuilding is cheaper than publishing something I cannot identify with confidence.
          </p>

          <h2>What working from Nepal changes—and what it does not</h2>
          <p>
            Working from Nepal does not change Apple’s technical requirements. It does make me value
            workflows that do not depend on a fragile chain of interactive clicks or an assumption
            that a connection will remain stable for every step.
          </p>
          <p>
            I separate long-running operations. The build produces a local file. The precheck inspects
            that file. Submission records the file path and upload result. A later command can inspect
            processing and tester access without rebuilding. If a network step has to be repeated, I
            still know which artifact is in play.
          </p>
          <p>
            Time-zone differences also make written evidence valuable. A release can be reviewed hours
            later without asking, “Which build did we mean?” The answer is in the recorded commit,
            version, build number, and App Store Connect build record.
          </p>

          <h2>My release definition of done</h2>
          <p>For me, an iOS release is done only when I can answer these questions:</p>
          <ul>
            <li>Which source revision produced the app?</li>
            <li>Which IPA was submitted?</li>
            <li>What version and build number did Apple process?</li>
            <li>Can the intended testers install that exact build?</li>
            <li>Do permissions, privacy disclosures, screenshots, and description match its behavior?</li>
            <li>If the release is public, does the live App Store page show the expected version?</li>
          </ul>
          <p>
            Gurkha Fit’s public listing currently shows an available iPhone app under my developer
            name. That public page is the final proof surface, but it is not the whole process.
            Reliable shipping comes from keeping source, binary, App Store state, and public metadata
            connected all the way through.
          </p>
          <p>
            That is the lesson I would give any independent developer preparing an App Store release:
            build the product, then build an evidence system around the release. The second system is
            what lets you ship the first one with confidence.
          </p>

          <hr className="articleRule" />
          <p className="articleBio">
            Jeremy Joseph Curry is a software engineer and app developer based in Nepal. See his work
            at <Link href="/">jeremyjosephcurry.com</Link> or view his{" "}
            <a href="https://apps.apple.com/us/developer/jeremy-joseph-curry/id1867562495">
              App Store developer page
            </a>{"."}
          </p>
        </div>
      </article>

      <footer className="footer">
        <strong>Jeremy Joseph Curry</strong>
        <span>Software Engineer &amp; App Developer / Nepal</span>
        <span>
          <Link href="/about">About</Link> / <Link href="/links">All links</Link>
        </span>
        <a href="mailto:hello@jeremyjosephcurry.com">hello@jeremyjosephcurry.com</a>
      </footer>
    </main>
  );
}
