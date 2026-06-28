import type { BookingFormValues } from "@/lib/booking";

export type BookingRequestStatus =
  | "new"
  | "contacted"
  | "proposal_sent"
  | "confirmed"
  | "lost";

export type PipelineStage =
  | "first_contact"
  | "qualified"
  | "proposal"
  | "scheduled"
  | "on_trek"
  | "completed"
  | "lost";

export type TripStatus = "draft" | "held" | "confirmed" | "completed" | "cancelled";

export type OpsBookingRequest = BookingFormValues & {
  id: string;
  status: BookingRequestStatus;
  pipelineStage: PipelineStage;
  createdAt: string;
  updatedAt: string;
  source: "web" | "admin" | "import";
};

export type OpsGuide = {
  id: string;
  slug: string;
  name: string;
  role: string;
  gender: string;
  regions: string[];
  languages: string[];
  certifications: string[];
  active: boolean;
};

export type OpsTripGuide = {
  id: string;
  guideId: string;
  guideName: string;
  guideSlug: string;
  role: string;
  startDate: string;
  endDate: string;
};

export type OpsTrip = {
  id: string;
  requestId?: string;
  name: string;
  routeSlug: string;
  startDate: string;
  endDate: string;
  status: TripStatus;
  travelerCount: number;
  notes?: string;
  assignedGuides: OpsTripGuide[];
};

export type OpsConflict = {
  guideId: string;
  guideName: string;
  tripId?: string;
  tripName?: string;
  startDate: string;
  endDate: string;
  reason: string;
};

export type OpsDashboard = {
  provider: "cloudflare-d1" | "setup-required";
  tenantId: string;
  tenantName: string;
  generatedAt: string;
  bookings: OpsBookingRequest[];
  guides: OpsGuide[];
  trips: OpsTrip[];
  conflicts: OpsConflict[];
};

export type OpsBookingCreateResult = {
  accepted: true;
  stored: boolean;
  bookingId?: string;
  emailSent?: boolean;
  provider: "cloudflare-ops" | "preview";
  message: string;
};
