import Link from "next/link";

import { referenceNavigation } from "@/content/onyx-reference";

interface MegaMenuProps {
  open: boolean;
  onNavigate: () => void;
}

export function MegaMenu({ open, onNavigate }: MegaMenuProps) {
  return (
    <div className="megaMenu" data-open={open} id="site-menu" aria-hidden={!open}>
      <div className="megaMenuInner">
        {referenceNavigation.map((group) => (
          <div className="megaGroup" key={group.label}>
            <p>{group.label}</p>
            <ul>
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={onNavigate} tabIndex={open ? 0 : -1}>
                    {item.label}
                    <span aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <aside className="megaFeature">
          <p>Current release</p>
          <div className="megaFeatureArt" aria-hidden="true">O</div>
          <Link href="/collections/coffee" onClick={onNavigate} tabIndex={open ? 0 : -1}>
            Explore offerings <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </div>
    </div>
  );
}
