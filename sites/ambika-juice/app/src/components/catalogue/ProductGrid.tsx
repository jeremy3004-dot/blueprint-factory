"use client";

import { useState } from "react";

import { referenceCategories, referenceProducts } from "@/content/ambika-content";
import { CategoryFilter } from "./CategoryFilter";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ initialCategory }: { initialCategory?: string }) {
  const initialLabel = referenceCategories.find((item) => item.slug === initialCategory)?.name ?? "All";
  const [active, setActive] = useState(initialLabel);
  const labels = ["All", ...referenceCategories.map((category) => category.name)];
  const category = referenceCategories.find((item) => item.name === active)?.slug;
  const products = category ? referenceProducts.filter((product) => product.category === category) : referenceProducts;

  return (
    <>
      <CategoryFilter labels={labels} active={active} onChange={setActive} />
      <div className="productGrid" role="list">{products.map((product) => <ProductCard product={product} key={product.slug} />)}</div>
    </>
  );
}
