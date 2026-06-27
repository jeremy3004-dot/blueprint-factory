import {
  createDemoDashboard,
  demoDashboardWithBooking,
  demoDashboardWithBookingUpdate,
  demoDashboardWithGuideAssignment,
  demoDashboardWithTrip,
} from "@/data/ops-demo";
import type { BookingFormValues, OpsDashboard, PipelineStage, BookingRequestStatus } from "@/lib/ops-types";

export const opsReadiness = {
  mode: "demo",
  connected: false,
  message: "Demo mode is active. No secrets, email, database, or external services are configured.",
};

export function fetchOpsDashboard(): OpsDashboard {
  return createDemoDashboard();
}

export function createOpsBooking(values: BookingFormValues, source: "web" | "admin" = "web") {
  return demoDashboardWithBooking(values, source);
}

export function updateOpsBooking(
  bookingId: string,
  updates: Partial<BookingFormValues> & {
    status?: BookingRequestStatus;
    pipelineStage?: PipelineStage;
  },
) {
  return demoDashboardWithBookingUpdate(bookingId, updates);
}

export function createOpsTripFromBooking(bookingId: string) {
  return demoDashboardWithTrip(bookingId);
}

export function assignOpsGuideToTrip(tripId: string, guideId: string) {
  return demoDashboardWithGuideAssignment(tripId, guideId);
}
