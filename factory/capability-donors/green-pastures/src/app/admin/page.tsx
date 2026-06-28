import { headers } from "next/headers";

import { AdminOpsBoard } from "@/components/admin-ops-board";
import { adminAuthReadiness, getAdminIdentityFromHeaders } from "@/lib/admin-auth";
import { generateOpsBrief } from "@/lib/ops-ai";
import { createSetupDashboard, fetchOpsDashboard, opsBackendReadiness } from "@/lib/ops-client";

export const metadata = {
  title: "Operations Admin | Himalayan Passage",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

function AdminLockedState({ loginStatus }: { loginStatus?: string }) {
  const missingAccessConfig = !(
    adminAuthReadiness.accessAudienceConfigured &&
    adminAuthReadiness.accessTeamDomainConfigured
  );
  const passwordAuthConfigured = adminAuthReadiness.passwordAuthConfigured;

  return (
    <main className="min-h-[calc(100svh-72px)] bg-stone-50 px-6 py-12 text-stone-950">
      <section className="mx-auto grid max-w-4xl gap-8 rounded-lg border border-stone-200 bg-white p-8 shadow-sm md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            GPTrek Admin
          </p>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight">Admin access is locked</h1>
            <p className="max-w-2xl text-base leading-7 text-stone-650">
              The operations dashboard is deployed. Sign in with the super admin account to load
              private trip, guide, and booking data.
            </p>
          </div>
          {passwordAuthConfigured ? (
            <form
              action="/api/admin/login"
              className="grid max-w-md gap-3 rounded-lg border border-stone-200 bg-stone-50 p-4"
              method="post"
            >
              <label className="grid gap-1 text-sm font-medium text-stone-700">
                Email
                <input
                  autoComplete="email"
                  className="rounded-md border border-stone-300 bg-white px-3 py-2 text-base text-stone-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                  defaultValue="jeremyjcurry@gmail.com"
                  name="email"
                  required
                  type="email"
                />
              </label>
              <label className="grid gap-1 text-sm font-medium text-stone-700">
                Password
                <input
                  autoComplete="current-password"
                  className="rounded-md border border-stone-300 bg-white px-3 py-2 text-base text-stone-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                  name="password"
                  required
                  type="password"
                />
              </label>
              {loginStatus === "failed" ? (
                <p className="text-sm font-medium text-red-700">That email or password did not match.</p>
              ) : null}
              {loginStatus === "unavailable" ? (
                <p className="text-sm font-medium text-red-700">
                  Admin sessions are not configured yet.
                </p>
              ) : null}
              <button
                className="mt-1 rounded-md bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900"
                type="submit"
              >
                Sign in
              </button>
            </form>
          ) : missingAccessConfig ? (
            <p className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              Cloudflare Access is not fully connected to this deployment yet. Create the Access
              application for admin.gptrek.com, or configure the bootstrap admin login in Vercel.
            </p>
          ) : (
            <p className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
              Access configuration is present. Sign in through Cloudflare Access with an approved
              team email to open the dashboard.
            </p>
          )}
        </div>
        <div className="rounded-lg border border-stone-200 bg-stone-50 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
            Deployment status
          </h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-stone-600">Admin domain</dt>
              <dd className="font-medium text-emerald-700">Live</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-stone-600">Ops backend</dt>
              <dd className="font-medium text-emerald-700">
                {opsBackendReadiness.connected ? "Connected" : "Setup required"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-stone-600">Access policy</dt>
              <dd className="font-medium text-amber-700">
                {missingAccessConfig ? "Password fallback" : "Configured"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-stone-600">Super admin</dt>
              <dd className="font-medium text-stone-900">jeremyjcurry@gmail.com</dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<{ login?: string }>;
}) {
  const identity = await getAdminIdentityFromHeaders(await headers());
  const resolvedSearchParams = await searchParams;

  if (!identity) {
    return <AdminLockedState loginStatus={resolvedSearchParams?.login} />;
  }

  const dashboard = await fetchOpsDashboard().catch((error) => {
    console.error("Admin dashboard bootstrap failed", error);

    return createSetupDashboard();
  });
  const initialBrief = generateOpsBrief(dashboard);

  return (
    <main className="min-h-[calc(100svh-72px)] pb-16 pt-8">
      <AdminOpsBoard
        identity={identity}
        initialBrief={initialBrief}
        initialDashboard={dashboard}
        readiness={opsBackendReadiness}
      />
    </main>
  );
}
