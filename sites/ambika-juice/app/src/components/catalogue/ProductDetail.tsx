import Link from "next/link";

import type { CatalogueProduct } from "@/content/types";

export function ProductDetail({ product }: { product: CatalogueProduct }) {
  return (
    <main id="main-content" className="productDetail">
      <div className="productGallery" aria-label="Product media">
        <img src={product.media.src} alt={product.media.alt} />
        <div className="productDetailMark" aria-hidden="true">A</div>
      </div>
      <div className="productInfo">
        <p className="sectionEyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        {product.tastingNotes && <p className="tastingNotes">{product.tastingNotes.join(" | ")}</p>}
        <p>{product.description ?? "Prepared fresh at Ambika Juice in Pokhara."}</p>
        <div className="optionShell"><span>PREPARED</span><button type="button">FRESH</button><button type="button">TO ORDER</button></div>
        <a className="addButton" href="https://www.google.com/maps/search/?api=1&query=Ambika+Juice+Rastra+Bank+Chowk+Pokhara">VISIT US · GET DIRECTIONS</a>
        <Link className="textLink" href={`/collections/${product.category}`}>Back to menu <span aria-hidden="true">→</span></Link>
      </div>
    </main>
  );
}
