# From Idea to Launch: The Five Product Contracts I Define Before I Build

**By Jeremy Joseph Curry**  
Software Engineer & App Developer based in Nepal

“Build the app” sounds like one task. In practice, a product has to remain coherent across several systems: the problem definition, the interface, the data, any AI behavior, and the release path.

I connect those systems by writing five small contracts before I treat a product as ready to build. They are not legal documents and they do not need to be long. Each contract says what must remain true as the product moves from an idea to something people can use.

In my public portfolio, I present [HimalRx](https://himalrx.com/) as a pharmacy operations product, [Gurkha Fit](https://www.gurkhafit.app/) as a mobile fitness product, and [GPTrek](https://gptrek.com/) as a travel discovery and booking experience. That portfolio is my self-attestation of the relationship; the public product workflows provide the examples used here. The products are different, but the questions that keep them coherent are surprisingly consistent.

## 1. The problem contract

The problem contract names the operator, the decision, and the evidence required to make that decision.

For the public HimalRx workflow, “manage pharmacy inventory” is too broad. A more useful problem statement is:

> Pharmacy staff need to find current stock and batch context at the counter, while owners need a reviewable record of inventory, sales, alerts, and staff activity.

That statement immediately affects scope. Products, batches, expiry dates, sales, receipts, customers, activity history, and reports belong in the same operational loop. Diagnosis and treatment recommendations do not; the public product explicitly identifies itself as operations software rather than a clinical system.

For GPTrek, the primary journey is different. Travelers need to discover routes, understand local trip information, and move toward a booking or planning decision. An AI-assisted concierge can help with planning, but it should support route discovery and the booking flow rather than replace them.

A good problem contract stops a team from selecting features because they are fashionable. It provides a test: does this feature shorten or strengthen the named decision?

## 2. The interface contract

The interface contract describes the important user states, including failure and recovery states.

For Gurkha Fit, a polished activity screen is only one state. The full interface contract includes:

- before an activity, when permissions and workout type are selected;
- during an activity, when route and progress are being recorded;
- while the app is in the background;
- after an activity, when the result is reviewed;
- without a network connection;
- when queued data synchronizes later; and
- when an AI coaching request fails or is unavailable.

The public App Store listing describes GPS-based activities, offline operation with automatic synchronization, AI coaching, maps and pacing, and an English/Nepali interface. Those promises create interface obligations. “Offline-first” cannot mean displaying a friendly disconnected banner while the main task becomes impossible. The user needs to complete the activity and understand what will happen to the record.

Writing states before screens also reveals where mobile and web interfaces should diverge. A field workflow needs large targets, clear status, and recovery from interruption. An owner dashboard can prioritize comparison, review, and export. Consistency does not require forcing both jobs into the same layout.

## 3. The data contract

The data contract names the source of truth, the local working state, the synchronization rules, and the history needed for review.

Gurkha Fit's public App Store description promises offline operation with automatic synchronization when connectivity returns. I treat that public promise as a data-contract obligation. It creates several questions the interface alone cannot answer:

- What makes a local record unique?
- When is it safe to retry?
- How does the system avoid creating a duplicate activity?
- What does the user see while synchronization is pending?
- Which copy wins if data changes in two places?

In the public HimalRx workflow, the data questions are about operational traceability. Current quantity matters, but so do the batch, expiry date, sale, adjustment, and movement history that explain it. An owner report should summarize the same records used at the counter, not a parallel set of manually reconstructed numbers.

I prefer to make data transitions explicit:

```text
created locally → pending sync → accepted remotely → confirmed to user
```

or:

```text
stock received → batch recorded → quantity moved → sale recorded → report updated
```

Once the transitions are visible, the backend is easier to design and the interface can show honest states.

## 4. The intelligence contract

Adding AI creates a new kind of product dependency: an output can be fluent without being correct. The intelligence contract defines the AI’s role, the context it may use, the actions it may take, and what happens when it is wrong or unavailable.

Gurkha Fit publicly describes an AI training officer that provides personalized guidance. In product terms, that is a coaching surface inside a broader training app. The core activity record, workout library, progress tracking, and offline behavior should not depend on every AI request succeeding.

GPTrek’s AI-assisted concierge has another role: help travelers explore and plan. It should be grounded in the product’s route and operator content and guide the user toward useful planning or booking information. It should not invent availability or silently turn a suggestion into a confirmed booking.

My basic intelligence contract asks:

1. What user problem is AI better positioned to help with?
2. What trusted product data can it use?
3. Which output is advice, and which output changes system state?
4. What must require a clear user confirmation?
5. What does the product do when the model times out or produces an unusable answer?

AI is most useful when it has a narrow job inside a reliable product. It is weakest when it is used to hide missing workflow design.

## 5. The release contract

The release contract defines how a reviewed source revision becomes a public product and how that fact is proven.

For a web product, I want the release record to identify the source revision, build result, deployment target, and checks performed against the real domain. A provider saying “deployment successful” is not enough if the custom domain serves an old build or a critical route fails.

For an iOS product, the chain is longer:

```text
source revision
    → local IPA
    → embedded version and build number
    → App Store Connect build record
    → TestFlight distribution
    → selected review build
    → public App Store version
```

The [Gurkha Fit App Store page](https://apps.apple.com/us/app/gurkha-fit/id6758262705) is public proof that the product is available under my developer name. The engineering proof for a particular release still needs the exact commit, artifact, build number, processing state, tester access, and public version.

This contract also includes metadata and policy surfaces. Screenshots must show the real app. Support and privacy URLs must resolve. Data disclosures must match the services and permissions in the build. A launch is a connected public state, not only a binary upload.

## How the contracts work together

These contracts are useful because they expose contradictions early.

Suppose the interface promises offline completion, but the data contract has no durable local record. That is a product gap, not a copy problem.

Suppose an AI assistant can create a booking, but the intelligence contract does not require confirmation and the data contract has no idempotent booking action. That is an operational risk.

Suppose the release process uploads a binary, but nobody can tie it to the reviewed source revision. That is an evidence gap even if the upload succeeds.

The connections can be summarized like this:

```text
problem → interface → data → intelligence → release
   ↑          ↓         ↓          ↓            ↓
reader     user state  truth     bounded help  public proof
```

Each contract constrains the next. The release contract also loops back to the beginning, because real usage and support evidence should inform the next product decision.

## A practical one-page version

Before I start a substantial build, I want one page that answers:

**Problem**

- Who is doing the work?
- What decision or outcome are they trying to reach?
- What is explicitly outside the product boundary?

**Interface**

- What is the happy path?
- What are the waiting, denied, offline, empty, and failure states?
- What must work on the actual target device?

**Data**

- What is the source of truth?
- What can exist locally or temporarily?
- How are retries, duplicates, conflicts, and history handled?

**Intelligence**

- What is AI allowed to advise or do?
- What context can it use?
- What requires confirmation?
- What is the non-AI fallback?

**Release**

- Which tests and reviews block release?
- How is the artifact tied to source?
- Which public URL or store record proves the launch?
- What live checks happen after deployment?

That page does not replace design, architecture, or testing. It gives them a shared direction.

## The real meaning of end to end

End-to-end product engineering is sometimes described as doing frontend, backend, databases, AI, and deployment. Those capabilities matter, but the stronger definition is making the boundaries between them explicit.

The interface should reveal real data states. The backend should preserve the evidence the operator needs. AI should have a bounded role. Deployment should publish an identifiable revision. The public description should match the product a user actually receives.

That is how I try to take an idea to launch: not by treating each layer as a separate checklist, but by making five clear contracts agree.

---

Jeremy Joseph Curry is a software engineer and app developer based in Nepal. Explore his work at [jeremyjosephcurry.com](https://jeremyjosephcurry.com).
