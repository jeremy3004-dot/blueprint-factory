import Link from "next/link";

interface VisitDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function VisitDrawer({ open, onClose }: VisitDrawerProps) {
  if (!open) return null;

  return (
    <div className="drawer visitDrawer" role="dialog" aria-modal="true" aria-label="Visit Ambika Juice">
      <div className="drawerTop darkText">
        <span>VISIT AMBIKA</span>
        <button className="iconButton darkText" type="button" onClick={onClose} aria-label="Close visit details">×</button>
      </div>
      <div className="visitDetails">
        <span className="visitGlyph" aria-hidden="true">◎</span>
        <h2>Rastra Bank Chowk</h2>
        <p>Damside Marg, Pokhara 33700 · Open daily, 10:00 AM–7:30 PM.</p>
        <a className="darkButton" href="https://www.google.com/maps/search/?api=1&query=Ambika+Juice+Rastra+Bank+Chowk+Pokhara" onClick={onClose}>Get directions</a>
        <a className="textLink" href="tel:+9779804172590">+977 980-4172590</a>
      </div>
    </div>
  );
}
