import Link from "next/link";

import type { CatalogueProduct } from "@/content/types";

export function ProductDetail({ product }: { product: CatalogueProduct }) {
  return (
    <main id="main-content" className="productDetail">
      <div className="productGallery" aria-label="Product media">
        <img src={product.media.src} alt={product.media.alt} />
        <div className="productDetailMark" aria-hidden="true">O</div>
      </div>
      <div className="productInfo">
        <p className="sectionEyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        {product.tastingNotes && <p className="tastingNotes">{product.tastingNotes.join(" | ")}</p>}
        <p>{product.description ?? "A current Onyx reference offering presented through the captured product-detail system."}</p>
        <div className="optionShell"><span>SIZE</span><button type="button">10 OZ</button><button type="button">2 LB</button></div>
        <button className="addButton" type="button">ADD TO CART</button>
        <Link className="textLink" href="/collections/coffee">Back to offerings <span aria-hidden="true">→</span></Link>
      </div>
    </main>
  );
}

