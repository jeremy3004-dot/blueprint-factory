// All-sites operator dashboard: one table of every site's gate, last screenshot, compare score, and
// preview URL, written to factory/STATUS.md so it's readable in any editor/GitHub.

export type SiteRow = {
  slug: string;
  nextAction: string;
  lastScreenshot: string | null;
  compareDesktop: number | null;
  compareMobile: number | null;
  previewUrl: string | null;
  pages: string;
};

export type DonorShelfRow = {
  slug: string;
  field: string;
  url: string;
  pages: string;
};

export function isDonorShelfSlug(slug: string): boolean {
  return slug.startsWith("donor-");
}

/** Pull the overall desktop/mobile match from a compare report.md. */
export function parseCompareScore(reportMd: string): { desktop: number | null; mobile: number | null } {
  const desktop = reportMd.match(/^-\s*desktop:\s*([\d.]+)%/mi);
  const mobile = reportMd.match(/^-\s*mobile:\s*([\d.]+)%/mi);
  return {
    desktop: desktop ? Number(desktop[1]) : null,
    mobile: mobile ? Number(mobile[1]) : null
  };
}

/** Pull a recorded preview URL from a deploy.md. Only returns a real http(s) URL. */
export function parsePreviewUrl(deployMd: string): string | null {
  const match = deployMd.match(/^Preview URL:\s*(\S+)\s*$/m);
  return match && /^https?:\/\//.test(match[1]) ? match[1] : null;
}

function shortDate(iso: string | null): string {
  return iso ? iso.slice(0, 10) : "—";
}

function score(desktop: number | null, mobile: number | null): string {
  if (desktop === null && mobile === null) return "—";
  return `${desktop ?? "—"}% / ${mobile ?? "—"}%`;
}

/** Render the operator dashboard. */
export function renderStatusTable(rows: SiteRow[], generatedAt: string, donorRows: DonorShelfRow[] = []): string {
  const lines: string[] = [];
  lines.push("# Blueprint Factory — Status");
  lines.push("");
  lines.push(`Generated: ${generatedAt}`);
  lines.push("");
  lines.push("## Client Sites");
  lines.push("");
  lines.push("| Site | Next action | Pages | Compare (d/m) | Last screenshot | Preview URL |");
  lines.push("| ---- | ----------- | ----- | ------------- | --------------- | ----------- |");
  for (const row of rows) {
    lines.push(
      `| ${row.slug} | ${row.nextAction} | ${row.pages} | ${score(row.compareDesktop, row.compareMobile)} | ${shortDate(row.lastScreenshot)} | ${row.previewUrl ?? "—"} |`
    );
  }
  if (donorRows.length > 0) {
    lines.push("");
    lines.push("## Donor Shelf");
    lines.push("");
    lines.push("| Donor | Field | Evidence URL | Pages |");
    lines.push("| ----- | ----- | ------------ | ----- |");
    for (const row of donorRows) {
      lines.push(`| ${row.slug} | ${row.field} | ${row.url} | ${row.pages} |`);
    }
  }
  lines.push("");
  lines.push("Compare (d/m) is the donor pixel-match at the clone stage (desktop / mobile). Nothing is");
  lines.push("deployed to production — Preview URL is a shareable Vercel preview only.");
  if (donorRows.length > 0) {
    lines.push("Donor Shelf rows are reference evidence packs, not client builds.");
  }
  lines.push("");
  return lines.join("\n");
}
