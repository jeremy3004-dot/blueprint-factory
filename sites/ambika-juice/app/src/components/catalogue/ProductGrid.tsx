"use client";

import { useState } from "react";

import { referenceCategories, referenceProducts } from "@/content/onyx-reference";
import { CategoryFilter } from "./CategoryFilter";
import { ProductCard } from "./ProductCard";

export function ProductGrid() {
  const [active, setActive] = useState("All");
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

