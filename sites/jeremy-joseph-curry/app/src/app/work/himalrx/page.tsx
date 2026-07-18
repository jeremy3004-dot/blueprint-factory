import type { Metadata } from "next";
import ProjectPage from "../../components/ProjectPage";
import { createPageMetadata } from "../../authority";

const title = "HimalRx | Jeremy Joseph Curry";
const description = "HimalRx is pharmacy operations software for inventory, batches, expiry dates, sales, staff, customers, reminders, and reporting.";

export const metadata: Metadata = createPageMetadata({
  path: "/work/himalrx",
  title,
  description,
  type: "article"
});

export default function HimalRxPage() {
  return <ProjectPage label="Pharmacy SaaS" title="HimalRx" intro="A Nepal-focused operations platform for pharmacies and the people who run them." detail="HimalRx brings inventory, batches, expiry dates, sales, staff, customer records, reminders, and owner reports into one practical web application." capabilities={["Business workflow design", "Inventory and batch tracking", "Sales and customer records", "Reminders and operational reporting", "Responsive web application"]} href="https://himalrx.com" linkLabel="Visit himalrx.com" path="/work/himalrx" metadataTitle={title} metadataDescription={description} />;
}
