import { headers } from "next/headers";

import { AdminOpsBoard } from "@/components/admin-ops-board";
import { adminAuthReadiness, getAdminIdentityFromHeaders } from "@/lib/admin-auth";
import { fetchOpsDashboard } from "@/lib/ops-client";

export const metadata = {
  title: "Alpine Bloom Admin",
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
    <main className="adminPage">
      <section className="adminLocked shell">
        <div>
          <p className="kicker">Alpine Bloom operations</p>
          <h1>Admin access is locked</h1>
          <p>
            This desk holds women traveler inquiries, women guide assignments, and private
            departure planning. Sign in before opening the operations board.
          </p>
        </div>

        {passwordAuthConfigured ? (
          <form action="/api/admin/login" className="adminLoginPanel" method="post">
            <label className="adminField">
              <span>Email</span>
              <input autoComplete="email" name="email" required type="email" />
            </label>
            <label className="adminField">
              <span>Password</span>
              <input autoComplete="current-password" name="password" required type="password" />
            </label>
            {loginStatus === "failed" ? (
              <p className="adminLoginError">That email or password did not match.</p>
            ) : null}
            {loginStatus === "unavailable" ? (
              <p className="adminLoginError">Admin sessions are not configured yet.</p>
            ) : null}
            {loginStatus === "limited" ? (
              <p className="adminLoginError">Too many attempts. Try again later.</p>
            ) : null}
            <button className="adminButton wide" type="submit">
              Sign in
            </button>
          </form>
        ) : missingAccessConfig ? (
          <div className="adminLoginPanel">
            <p className="adminModeNote">
              Production access is closed until Cloudflare Access or bootstrap password auth is
              configured in Vercel.
            </p>
          </div>
        ) : (
          <div className="adminLoginPanel">
            <p className="adminModeNote">
              Cloudflare Access configuration is present. Sign in with an approved Alpine Bloom
              admin account to continue.
            </p>
          </div>
        )}
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

  const dashboard = fetchOpsDashboard();

  return (
    <main className="adminPage">
      <AdminOpsBoard identity={identity} initialDashboard={dashboard} />
    </main>
  );
}
