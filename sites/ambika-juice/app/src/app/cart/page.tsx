import Link from "next/link";

export default function CartPage() {
  return (
    <main id="main-content" className="utilityPage">
      <p className="sectionEyebrow">Reference-only cart state</p>
      <h1>Your cart is empty.</h1>
      <p>This local clone reproduces the donor cart presentation without transactional commerce.</p>
      <Link className="darkButton" href="/collections/coffee">Explore coffee</Link>
    </main>
  );
}

