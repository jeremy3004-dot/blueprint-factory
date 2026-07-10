import { EditorialPage } from "@/components/sections/EditorialPage";
import { routeByPath, routeParamsForPrefix } from "@/content/route-helpers";

export function generateStaticParams() { return routeParamsForPrefix("/pages"); }

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = routeByPath(`/pages/${slug}`);
  return <EditorialPage title={route?.title ?? slug.replaceAll("-", " ")} />;
}

