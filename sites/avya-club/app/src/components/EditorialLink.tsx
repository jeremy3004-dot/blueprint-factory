import type { AnchorHTMLAttributes, ReactNode } from "react";

import { ArrowRightIcon, ArrowUpRightIcon } from "./icons";

interface EditorialLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly children: ReactNode;
  readonly href: string;
}

export function EditorialLink({ children, className = "", href, ...props }: EditorialLinkProps) {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      className={`editorialLink ${className}`.trim()}
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      {...props}
    >
      <span>{children}</span>
      {isExternal ? <ArrowUpRightIcon /> : <ArrowRightIcon />}
    </a>
  );
}
