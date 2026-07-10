import { ProductGrid } from "@/components/catalogue/ProductGrid";
import { routeByPath, routeParamsForPrefix } from "@/content/route-helpers";

export function generateStaticParams() { return routeParamsForPrefix("/collections"); }

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = routeByPath(`/collections/${slug}`);
  const title = route?.title ?? slug.replaceAll("-", " ");
  return (
    <main id="main-content" className="collectionPage">
      <header className="collectionHero"><p>SHOP ONYX</p><h1>{title}</h1></header>
      <ProductGrid />
    </main>
  );
}

