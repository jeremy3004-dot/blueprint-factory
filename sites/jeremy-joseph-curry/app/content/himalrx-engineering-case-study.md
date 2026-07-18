# Reading the HimalRx Workflow as Decisions, Not Screens

**By Jeremy Joseph Curry**  
Software Engineer & App Developer based in Nepal

A pharmacy does not need another collection of disconnected forms. It needs a reliable way to answer operational questions while work is happening:

- Is this item in stock?
- Which batch is it from?
- When does that batch expire?
- What changed after the last stock count?
- Which products need attention today?
- Can the owner review sales and staff activity without reconstructing the day from paper?

In my public portfolio, I present HimalRx as a web-based operations product for pharmacies in Nepal. The public HimalRx workflow at [himalrx.com](https://himalrx.com/) connects inventory, batches, expiry dates, barcode lookup, sales, customers, staff activity, alerts, receipts, and owner reports in one workspace.

This is a case study about the product and workflow decisions visible in the publicly presented product. My portfolio is a self-attestation of my role, not independent verification of ownership, authorship, employment, or a client relationship. This article does not claim a customer count, revenue, or clinical outcomes.

## Define the boundary before the feature list

A useful boundary in the public HimalRx narrative is what the product should *not* be. It is presented as pharmacy operations software. It supports inventory, sales, reminders, and reporting. The public site says it does not diagnose patients, recommend treatment, or make prescription decisions.

That boundary narrows the engineering problem. The public workflow focuses on the movement and condition of stock, the record of a sale, staff actions, and the information an owner needs to run the operation. It also keeps medical decision-making outside a product that is not presented as a clinical system.

Clear boundaries are a product feature. They prevent a practical operations tool from accumulating risky claims and half-built responsibilities.

## Model the batch, not just the product

A generic inventory screen often treats a product and its quantity as the whole truth. For pharmacy operations, that model is too shallow. Two boxes of the same medicine may belong to different batches and expire on different dates. A total count can look healthy while one batch needs immediate action.

HimalRx therefore presents batch and expiry tracking as a core workflow, not an optional note. My product-design interpretation of that public presentation uses a proposed record closer to:

```text
product
  ├── batch number
  ├── expiry date
  ├── quantity
  ├── supplier context
  └── movement history
```

This proposed model makes other features more coherent. In my product-design interpretation, an expiry alert could point to the affected batch, a stock adjustment could leave a trace, a sale could reduce the relevant inventory record, and an owner report could describe more than a single undifferentiated quantity. These are design choices I infer from the public workflow, not verified descriptions of HimalRx’s internal data model or sale and adjustment behavior.

The broader lesson is that the database should reflect the decision the operator has to make. If the decision is “Which stock should I act on?”, storing only “How many products exist?” is not enough.

## Connect the counter action to the permanent record

At the counter, speed matters. The publicly described staff shelf tool centers quick actions: scan a barcode, check stock, add a batch, adjust a quantity, or look up a customer. But speed without a connected record creates a new problem. The action disappears into an isolated screen or another spreadsheet.

I interpret the public HimalRx product walkthrough as intending this connected flow:

```text
barcode or product lookup
        ↓
batch and stock context
        ↓
sale or quantity movement
        ↓
receipt and customer record
        ↓
activity history and owner reporting
```

This diagram is my intended-flow interpretation of the public presentation, not verified end-to-end behavior inside HimalRx.

That connection is more important than any individual screen. The counter interface should make the common action fast, while the data model preserves enough context for later review.

## Design separate views around separate decisions

Owners and staff may work with the same records, but they do not always need the same interface.

The owner dashboard emphasizes stock value, products needing attention, recent sales, staff activity, and exportable reports. The staff shelf tool emphasizes barcode lookup, stock checks, batch entry, quantity adjustments, and customer lookup. These are two views into the same operation, organized around different decisions.

I prefer this approach to simply hiding a few buttons by role. A role-aware product should ask what each person is trying to accomplish, then reduce the path to that outcome.

It also makes permissions easier to reason about. A private pharmacy workspace can expose day-to-day tools to staff while reserving higher-level oversight and administrative actions for the appropriate role. The public product describes staff roles and activity history; it does not claim that every possible permission scenario has been solved.

## Turn alerts into actions

An alert is only useful if it arrives early enough and points to a next step.

HimalRx publicly surfaces low-stock and expiry warnings because both conditions call for operational review. Low stock can inform a reorder decision. An approaching expiry date can trigger the pharmacy’s documented handling process under applicable requirements. The software’s job is to surface the recorded batch and date; it does not decide how a medicine should be handled or make a clinical decision.

This distinction affects the interface. “You have 12 alerts” is weak. “This batch of this product is approaching its recorded expiry date” gives the operator a place to begin. Good operational software reduces the distance between a signal and the record that explains it.

## Keep history alongside the current state

Current stock is necessary, but it is not sufficient for understanding an operation. When a number looks wrong, the next question is usually, “What happened?”

That is why movement history and staff activity belong beside inventory and sales. A current quantity answers what the system believes now. A history of adjustments, sales, and recorded actions provides the context needed to review how it got there.

I treat exports the same way. An export is not the primary product experience, but it matters for owners, accountants, and operating reviews. A system becomes more useful when information can move into legitimate downstream work without requiring someone to retype it from the screen.

## Read the smallest complete operational loop

HimalRx has a public responsive web surface. That surface presents a connected set of operating workflows:

- inventory and product records;
- batch and expiry tracking;
- barcode-assisted counter lookup;
- sales, receipts, and customer records;
- low-stock and expiry alerts;
- staff roles and activity history; and
- owner reports and exports.

The important word is *connected*. A longer feature list would not make the product stronger if the stock record, sale, alert, and report contradicted one another.

For an operations product, I define “smallest complete” as the narrowest set of workflows that can preserve a trustworthy record from the first action to the final review. That often requires more thought than building several attractive dashboards, but it creates a better foundation for iteration.

## What I would measure next

I am not publishing adoption or performance numbers because I do not have a public evidence set that supports them. If I were evaluating the next stage of the product with authorized operational data, I would focus on measures tied to workflow quality:

- time from barcode lookup to completed sale;
- frequency of stock adjustments and unresolved discrepancies;
- number of batches approaching expiry with no recorded follow-up;
- successful report exports;
- failed or abandoned counter flows; and
- support requests grouped by workflow, not just by page.

These are proposed evaluation measures, not reported HimalRx results. The distinction matters. A case study should separate what is publicly presented from what still needs to be measured.

## The engineering lesson

The central engineering lesson I draw from the public HimalRx workflow is that operational products should be modeled around decisions and evidence.

A batch record is useful because it supports an expiry decision. A movement history is useful because it explains current stock. A staff tool is useful because it shortens a counter action. An owner dashboard is useful because it summarizes records that already agree underneath.

When I build business software, I try to connect those pieces before expanding the feature list. The interface, data model, alerts, roles, and reports are not separate projects. They are different views of one operating truth.

That is how the public HimalRx narrative presents the product: not a digital notebook, but a coherent operational workspace for the people running a pharmacy.

---

Jeremy Joseph Curry is a software engineer and app developer based in Nepal. Explore [HimalRx](https://himalrx.com/) and the [HimalRx project page](https://jeremyjosephcurry.com/work/himalrx).
