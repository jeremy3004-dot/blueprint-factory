export type BookingRequestStatus = "new" | "contacted" | "proposal_sent" | "confirmed" | "lost";

export type PipelineStage =
  | "first_contact"
  | "qualified"
  | "proposal"
  | "scheduled"
  | "on_trek"
  | "completed"
  | "lost";

export type TripStatus = "draft" | "held" | "confirmed" | "completed" | "cancelled";

export type BookingFormValues = {
  fullName: string;
  email: string;
  departureWindow: string;
  routeSlug: string;
  groupSize: string;
  style: string;
  addons: string[];
  notes?: string;
};

export type OpsBookingRequest = BookingFormValues & {
  id: string;
  status: BookingRequestStatus;
  pipelineStage: PipelineStage;
  createdAt: string;
  updatedAt: string;
  source: "web" | "admin" | "demo";
};

export type OpsGuide = {
  id: string;
  name: string;
  role: string;
  regions: string[];
  languages: string[];
  active: boolean;
};

export type OpsTripGuide = {
  id: string;
  guideId: string;
  guideName: string;
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
  provider: "demo";
  tenantName: string;
  generatedAt: string;
  bookings: OpsBookingRequest[];
  guides: OpsGuide[];
  trips: OpsTrip[];
  conflicts: OpsConflict[];
};

export type BookingApiResult = {
  accepted: boolean;
  stored: boolean;
  bookingId?: string;
  provider: "demo";
  message: string;
};
