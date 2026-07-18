# Shipping an iOS App from Nepal: My Release Evidence Method

**By Jeremy Joseph Curry**  
Software Engineer & App Developer based in Nepal

Shipping an iOS app is not the same thing as finishing the code. The code has to become a specific binary, that binary has to match a specific version of the repository, App Store Connect has to process it, testers have to receive it, and the public product page has to describe what the app really does.

That chain is where I put most of my release discipline.

I use Gurkha Fit as the practical example in this article. It is a fitness app with GPS activity tracking, offline operation with later synchronization, an AI coaching surface, and English and Nepali support. Its [public App Store listing](https://apps.apple.com/us/app/gurkha-fit/id6758262705) identifies me as the developer and shows the current product, privacy disclosures, and version history. The point here is not that every app needs the same stack. It is that every release needs a traceable path from source code to the version users can install.

## Start with the user path, not the archive

Before I build a release candidate, I write down the paths that must work on a real device. For an app with the capabilities described on Gurkha Fit's public listing, my test plan includes:

- starting and completing a GPS-tracked activity;
- continuing that activity when the phone is locked or the app is in the background;
- recording an activity without a network connection and synchronizing it later;
- handling location permission choices clearly;
- sending a coaching request and handling an AI-service failure without breaking the rest of the app.

This list changes how I test. A simulator can help with layout, navigation, and controlled location input, but it cannot be the only proof for a mobile product built around outdoor tracking and background behavior. A release candidate has to survive the situations its product description promises.

The same rule applies to metadata. Apple’s [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) require screenshots, descriptions, privacy information, and previews to reflect the app’s core experience. That makes the product page part of the release, not a marketing task that can be patched in later.

## Treat privacy as an implementation inventory

Gurkha Fit’s public listing discloses categories including health and fitness, precise location, identifiers, user content, usage data, and diagnostics. Those labels cannot be chosen from memory. They have to be reconciled with what the binary and its third-party services actually do.

My practical review is a small inventory:

1. Which permissions can the app request?
2. What data is produced when the user grants each permission?
3. Where is that data stored or transmitted?
4. Which third-party SDKs receive it?
5. Can the user still use the rest of the product after declining an optional permission?
6. Does the privacy policy describe the same behavior as the build?

Apple’s [App Store Connect privacy guidance](https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy/) makes developers responsible for keeping answers current and for including the practices of integrated third parties. The engineering consequence is simple: adding a service, permission, or data field can create release work even when the interface barely changes.

For a location-based fitness app, the permission copy also has to explain the benefit and the boundary. Background location is useful during an active workout because the route should not stop when the screen locks. It should not become a vague request for permanent access. The app behavior, permission text, privacy policy, and store disclosure need to tell the same story.

## Give every binary an identity

The most expensive release mistake is not always a crash. Sometimes it is losing confidence about what was actually uploaded.

I prevent that with three identifiers:

- the Git commit for the source;
- the app version and build number inside the IPA; and
- the exact local path of the IPA that was submitted.

In my general release method, I confirm that the source revision, version, build number, and selected artifact agree before submission. I submit the artifact I checked instead of asking a tool to choose whichever build it considers “latest.”

This matters because “latest” can mean several different things: latest local source, latest cloud record, latest uploaded binary, or latest processed TestFlight build. Apple itself uses the build string to uniquely identify a build in its system, as described in [Upload builds](https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds/). My release notes therefore record the identifiers instead of relying on a relative label.

## Processing is not distribution

An upload is only the beginning of the App Store Connect state machine. Apple processes the binary before it appears as an available build. A processed build may be valid without being attached to a tester group, and internal TestFlight availability is separate from external beta approval and public App Store review.

My release checklist distinguishes at least these states:

1. the local IPA passed the precheck;
2. the upload was accepted;
3. App Store Connect finished processing the exact build;
4. the build is valid for testing;
5. the intended TestFlight group can access it;
6. the intended app version has the correct build selected;
7. review information and metadata are complete; and
8. the public listing shows the approved version.

Apple documents build processing and metadata separately in [View builds and metadata](https://developer.apple.com/help/app-store-connect/manage-builds/view-builds-and-metadata/) and explains that one build is selected for each submitted app version in [Choose a build to submit](https://developer.apple.com/help/app-store-connect/manage-builds/choose-a-build-to-submit/). Keeping those states separate prevents a successful upload message from being mistaken for a successful release.

## Use a release gate that can fail loudly

My general release method is designed to stop when the evidence does not line up. The important part is preserving an explicit path from reviewed source to the artifact, App Store Connect record, tester state, and public listing.

A simplified version looks like this:

```text
verify source and tests
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
verify the public App Store page
```

My evidence check is intentionally strict. If the source moved after the IPA was created, I rebuild. If the version or build number does not identify the intended artifact, I stop. Rebuilding is cheaper than publishing something I cannot identify with confidence.

## What working from Nepal changes—and what it does not

Working from Nepal does not change Apple’s technical requirements. It does make me value workflows that do not depend on a fragile chain of interactive clicks or an assumption that a connection will remain stable for every step.

I separate long-running operations. The build produces a local file. The precheck inspects that file. Submission records the file path and upload result. A later command can inspect processing and tester access without rebuilding. If a network step has to be repeated, I still know which artifact is in play.

Time-zone differences also make written evidence valuable. A release can be reviewed hours later without asking, “Which build did we mean?” The answer is in the recorded commit, version, build number, and App Store Connect build record.

## My release definition of done

For me, an iOS release is done only when I can answer these questions:

- Which source revision produced the app?
- Which IPA was submitted?
- What version and build number did Apple process?
- Can the intended testers install that exact build?
- Do permissions, privacy disclosures, screenshots, and description match its behavior?
- If the release is public, does the live App Store page show the expected version?

Gurkha Fit’s public listing currently shows an available iPhone app under my developer name. That public page is the final proof surface, but it is not the whole process. Reliable shipping comes from keeping source, binary, App Store state, and public metadata connected all the way through.

That is the lesson I would give any independent developer preparing an App Store release: build the product, then build an evidence system around the release. The second system is what lets you ship the first one with confidence.

---

Jeremy Joseph Curry is a software engineer and app developer based in Nepal. See his work at [jeremyjosephcurry.com](https://jeremyjosephcurry.com) or view his [App Store developer page](https://apps.apple.com/us/developer/jeremy-joseph-curry/id1867562495).
