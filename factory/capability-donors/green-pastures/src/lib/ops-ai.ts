import type { OpsDashboard } from "@/lib/ops-types";

function plural(count: number, singular: string, pluralLabel = `${singular}s`) {
  return `${count} ${count === 1 ? singular : pluralLabel}`;
}

export function generateOpsBrief(dashboard: OpsDashboard) {
  const newBookings = dashboard.bookings.filter((booking) => booking.status === "new");
  const unassignedTrips = dashboard.trips.filter(
    (trip) => trip.assignedGuides.length === 0 && trip.status !== "cancelled",
  );
  const confirmedTrips = dashboard.trips.filter((trip) => trip.status === "confirmed");
  const activeGuides = dashboard.guides.filter((guide) => guide.active);

  const lines = [
    `${dashboard.tenantName} ops brief: ${plural(newBookings.length, "new request")}, ${plural(dashboard.trips.length, "trip")} on the board, and ${plural(activeGuides.length, "active guide")}.`,
  ];

  if (dashboard.conflicts.length > 0) {
    lines.push(
      `Resolve ${plural(dashboard.conflicts.length, "guide conflict")} before confirming more departures.`,
    );
  }

  if (unassignedTrips.length > 0) {
    lines.push(
      `Assign guides for ${unassignedTrips
        .slice(0, 3)
        .map((trip) => trip.name)
        .join(", ")}.`,
    );
  }

  if (newBookings.length > 0) {
    lines.push(
      `Contact ${newBookings
        .slice(0, 3)
        .map((booking) => `${booking.fullName} about ${booking.departureWindow}`)
        .join("; ")}.`,
    );
  }

  if (confirmedTrips.length > 0) {
    lines.push(
      `Confirmed departures should get permit, hotel, domestic flight, and emergency-contact checks next.`,
    );
  }

  if (lines.length === 1) {
    lines.push("No urgent operational gaps are visible. Keep the guide calendar current.");
  }

  return lines.join(" ");
}

