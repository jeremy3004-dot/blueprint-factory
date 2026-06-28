import config from "@payload-config";
import { NotFoundPage } from "@payloadcms/next/views";

import { payloadConfigured } from "@/lib/payload-env";
import { importMap } from "@/payload-import-map";

export default function PayloadAdminNotFound() {
  if (!payloadConfigured()) {
    return null;
  }

  return NotFoundPage({
    config,
    importMap,
    params: Promise.resolve({ segments: [] }),
    searchParams: Promise.resolve({}),
  });
}
