import {
  createDemoDashboard,
  demoDashboardWithBooking,
  demoDashboardWithBookingUpdate,
  demoDashboardWithGuide,
  demoDashboardWithGuideAssignment,
  demoDashboardWithGuideUpdate,
  demoDashboardWithoutGuideAssignment,
  demoDashboardWithTrip,
} from "@/data/ops-demo";
import type { BookingFormValues, OpsDashboard, OpsGuide, PipelineStage, BookingRequestStatus } from "@/lib/ops-types";

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

export function removeOpsGuideAssignment(assignmentId: string) {
  return demoDashboardWithoutGuideAssignment(assignmentId);
}

export function createOpsGuide(values: Omit<OpsGuide, "id">) {
  return demoDashboardWithGuide(values);
}

export function updateOpsGuide(guideId: string, updates: Partial<Omit<OpsGuide, "id">>) {
  return demoDashboardWithGuideUpdate(guideId, updates);
}
