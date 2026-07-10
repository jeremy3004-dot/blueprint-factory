import Link from "next/link";

import type { CatalogueProduct } from "@/content/types";

export function ProductCard({ product }: { product: CatalogueProduct }) {
  return (
    <Link className="productCard" href={`/products/${product.slug}`} role="listitem">
      <div className="productCardMedia"><img src={product.media.src} alt={product.media.alt} /></div>
      <div className="productCardCopy">
        <h3>{product.name}</h3>
        <span>{product.price ?? "Explore offering"}</span>
      </div>
    </Link>
  );
}

