import { ProductDetail } from "@/components/catalogue/ProductDetail";
import { referenceProducts } from "@/content/onyx-reference";
import { routeByPath, routeParamsForPrefix } from "@/content/route-helpers";

export function generateStaticParams() { return routeParamsForPrefix("/products"); }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = routeByPath(`/products/${slug}`);
  const product = referenceProducts.find((item) => item.slug === slug) ?? {
    slug,
    name: route?.title ?? slug.replaceAll("-", " "),
    category: "coffee",
    media: referenceProducts[0].media,
  };
  return <ProductDetail product={product} />;
}

