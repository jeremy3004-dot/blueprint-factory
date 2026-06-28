import config from "@payload-config";
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import "@payloadcms/next/css";

import { payloadConfigured } from "@/lib/payload-env";
import { importMap } from "@/payload-import-map";

const serverFunction = (args: { args: Record<string, unknown>; name: string }) =>
  handleServerFunctions({
    ...args,
    config,
    importMap,
  });

export default function PayloadAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!payloadConfigured()) {
    return <>{children}</>;
  }

  return RootLayout({
    children,
    config,
    importMap,
    serverFunction,
  });
}
