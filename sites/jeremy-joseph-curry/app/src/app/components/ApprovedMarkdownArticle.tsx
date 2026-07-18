import { readFileSync } from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import Link from "next/link";

type ApprovedMarkdownArticleProps = {
  sourceFile: string;
};

function inlineMarkdown(value: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let cursor = 0;
  let match;

  while ((match = pattern.exec(value))) {
    if (match.index > cursor) nodes.push(value.slice(cursor, match.index));
    if (match[2] && match[3]) {
      nodes.push(
        <a href={match[3]} key={`${match.index}-${match[3]}`}>
          {match[2]}
        </a>
      );
    } else if (match[4]) {
      nodes.push(<strong key={`${match.index}-${match[4]}`}>{match[4]}</strong>);
    } else {
      nodes.push(<em key={`${match.index}-${match[5]}`}>{match[5]}</em>);
    }
    cursor = pattern.lastIndex;
  }

  if (cursor < value.length) nodes.push(value.slice(cursor));
  return nodes;
}

function renderBlocks(lines: string[]) {
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }
    if (line === "---") {
      blocks.push(<hr className="articleRule" key={`rule-${index}`} />);
      index += 1;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push(<h2 key={`heading-${index}`}>{line.slice(3)}</h2>);
      index += 1;
      continue;
    }
    if (line.startsWith("> ")) {
      blocks.push(
        <blockquote key={`quote-${index}`}>{inlineMarkdown(line.slice(2))}</blockquote>
      );
      index += 1;
      continue;
    }
    if (line.startsWith("```")) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push(
        <pre key={`code-${index}`}>
          <code>{code.join("\n")}</code>
        </pre>
      );
      continue;
    }
    if (/^- /.test(line)) {
      const items: ReactNode[] = [];
      while (index < lines.length && /^- /.test(lines[index])) {
        items.push(<li key={`item-${index}`}>{inlineMarkdown(lines[index].slice(2))}</li>);
        index += 1;
      }
      blocks.push(<ul key={`list-${index}`}>{items}</ul>);
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const items: ReactNode[] = [];
      while (index < lines.length && /^\d+\. /.test(lines[index])) {
        items.push(
          <li key={`item-${index}`}>{inlineMarkdown(lines[index].replace(/^\d+\. /, ""))}</li>
        );
        index += 1;
      }
      blocks.push(<ol key={`list-${index}`}>{items}</ol>);
      continue;
    }

    blocks.push(<p key={`paragraph-${index}`}>{inlineMarkdown(line)}</p>);
    index += 1;
  }

  return blocks;
}

export default function ApprovedMarkdownArticle({ sourceFile }: ApprovedMarkdownArticleProps) {
  const markdown = readFileSync(path.join(process.cwd(), "content", sourceFile), "utf8").replaceAll(
    "\r",
    ""
  );
  const lines = markdown.split("\n");
  const title = lines[0].replace(/^# /, "");
  const byline = lines[2].replace(/^\*\*/, "").replace(/\*\*\s*$/, "").trim();
  const role = lines[3].trim();

  return (
    <article className="articlePage" data-approved-article="true">
      <header className="articleHeader">
        <h1>{title}</h1>
        <div className="articleByline">
          <strong>
            {byline.replace("Jeremy Joseph Curry", "")}
            <Link href="/about">Jeremy Joseph Curry</Link>
          </strong>
          <span>{role}</span>
        </div>
      </header>
      <div className="articleBody">{renderBlocks(lines.slice(5))}</div>
    </article>
  );
}
