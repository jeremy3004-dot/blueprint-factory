import { AdminOpsBoard } from "@/components/admin-ops-board";
import { fetchOpsDashboard } from "@/lib/ops-client";

export default function AdminPage() {
  const dashboard = fetchOpsDashboard();

  return (
    <main className="adminPage">
      <AdminOpsBoard initialDashboard={dashboard} />
    </main>
  );
}
