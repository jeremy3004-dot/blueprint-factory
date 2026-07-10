import Link from "next/link";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  if (!open) return null;

  return (
    <div className="drawer cartDrawer" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div className="drawerTop darkText">
        <span>CART (0)</span>
        <button className="iconButton darkText" type="button" onClick={onClose} aria-label="Close cart">×</button>
      </div>
      <div className="cartEmpty">
        <span className="cartGlyph" aria-hidden="true">○</span>
        <h2>Your cart is empty.</h2>
        <p>Explore the newest offerings from Onyx Coffee Lab.</p>
        <Link className="darkButton" href="/collections/coffee" onClick={onClose}>Shop coffee</Link>
      </div>
    </div>
  );
}

