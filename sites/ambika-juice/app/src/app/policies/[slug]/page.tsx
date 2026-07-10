import { EditorialPage } from "@/components/sections/EditorialPage";
import { routeByPath, routeParamsForPrefix } from "@/content/route-helpers";

export function generateStaticParams() { return routeParamsForPrefix("/policies"); }

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = routeByPath(`/policies/${slug}`);
  return <EditorialPage title={route?.title ?? slug.replaceAll("-", " ")} label="Policies" />;
}

