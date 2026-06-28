import { TrekExplorer } from "@/components/trek-explorer";
import {
  getPayloadOperatorSources,
  getPayloadTreks,
} from "@/lib/payload-content";

export default async function TreksPage() {
  const [routes, operatorSources] = await Promise.all([
    getPayloadTreks(),
    getPayloadOperatorSources(),
  ]);

  return (
    <main className="pb-24 pt-6 md:pt-8">
      <div className="section-shell">
        <TrekExplorer operatorSources={operatorSources} routes={routes} />
      </div>
    </main>
  );
}
