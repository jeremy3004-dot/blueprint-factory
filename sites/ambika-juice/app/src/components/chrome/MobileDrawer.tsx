import Link from "next/link";

import { referenceNavigation } from "@/content/ambika-content";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  if (!open) return null;

  return (
    <div className="drawer mobileDrawer" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site navigation">
      <div className="drawerTop">
        <span className="wordmark">AMBIKA</span>
        <button className="iconButton" type="button" onClick={onClose} aria-label="Close menu">×</button>
      </div>
      <div className="mobileDrawerBody">
        {referenceNavigation.map((group) => (
          <section key={group.label}>
            <p>{group.label}</p>
            {group.items.map((item) => (
              <Link href={item.href} onClick={onClose} key={item.href}>{item.label}</Link>
            ))}
          </section>
        ))}
      </div>
      <div className="drawerFoot">FRESH FRUIT · MADE TO ORDER · POKHARA</div>
    </div>
  );
}
