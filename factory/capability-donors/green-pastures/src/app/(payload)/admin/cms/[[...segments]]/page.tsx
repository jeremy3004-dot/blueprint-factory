import config from "@payload-config";
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";

import { payloadConfigured } from "@/lib/payload-env";
import { importMap } from "@/payload-import-map";

type Args = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<Record<string, string | string[]>>;
};

export const generateMetadata = ({ params, searchParams }: Args) =>
  payloadConfigured()
    ? generatePageMetadata({ config, params, searchParams })
    : { title: "Payload CMS setup required" };

export default function PayloadAdminPage({ params, searchParams }: Args) {
  if (!payloadConfigured()) {
    return (
      <main className="min-h-screen bg-stone-950 px-6 py-16 text-stone-100">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-amber-200">
            Payload CMS
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            CMS setup required
          </h1>
          <p className="mt-4 text-sm leading-7 text-stone-300">
            Set `DATABASE_URI` and `PAYLOAD_SECRET` to enable the editorial CMS.
            The public site and operations admin continue to use static fallback
            data until the CMS database is connected.
          </p>
        </div>
      </main>
    );
  }

  return RootPage({ config, importMap, params, searchParams });
}
