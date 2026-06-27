import type {
  BookingFormValues,
  BookingRequestStatus,
  OpsBookingRequest,
  OpsConflict,
  OpsDashboard,
  OpsGuide,
  OpsTrip,
  PipelineStage,
} from "@/lib/ops-types";
import { trekRoutes } from "@/data/green-pastures";

const now = new Date("2026-06-27T08:00:00.000Z");

const guides: OpsGuide[] = [
  {
    id: "maya-sherpa",
    name: "Maya Sherpa",
    role: "Lead altitude guide",
    regions: ["Everest", "Gokyo", "Tengboche"],
    languages: ["Nepali", "English", "Hindi"],
    active: true,
  },
  {
    id: "lhamo-gurung",
    name: "Lhamo Gurung",
    role: "Village route specialist",
    regions: ["Annapurna", "Ghandruk", "Mardi Himal"],
    languages: ["Nepali", "English"],
    active: true,
  },
  {
    id: "nima-tamang",
    name: "Nima Tamang",
    role: "Safety coordinator",
    regions: ["Langtang", "Helambu"],
    languages: ["Nepali", "English", "Tamang"],
    active: true,
  },
];

const bookings: OpsBookingRequest[] = [
  {
    id: "lead-sarah-annapurna",
    fullName: "Sarah Collins",
    email: "sarah@example.com",
    departureWindow: "October 2026",
    routeSlug: "annapurna-circuit",
    groupSize: "4",
    style: "Private comfort trek",
    addons: ["Women guide match", "Wellness day"],
    notes: "Friends want a strong but unrushed route with village stays.",
    status: "contacted",
    pipelineStage: "qualified",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    source: "web",
  },
  {
    id: "lead-amina-everest",
    fullName: "Amina Patel",
    email: "amina@example.com",
    departureWindow: "April 2027",
    routeSlug: "everest-base-camp",
    groupSize: "2",
    style: "Boutique lodge trek",
    addons: ["Altitude check-in calls"],
    notes: "First Nepal trip. Nervous about altitude and domestic flights.",
    status: "new",
    pipelineStage: "first_contact",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    source: "web",
  },
];

const trips: OpsTrip[] = [
  {
    id: "trip-ghandruk-bloom",
    requestId: "lead-sarah-annapurna",
    name: "Ghandruk bloom private departure",
    routeSlug: "poon-hill-ghandruk",
    startDate: "2026-10-14",
    endDate: "2026-10-21",
    status: "held",
    travelerCount: 4,
    notes: "Hold Lhamo if Sarah approves the proposal this week.",
    assignedGuides: [
      {
        id: "assignment-lhamo-ghandruk",
        guideId: "lhamo-gurung",
        guideName: "Lhamo Gurung",
        role: "Lead guide",
        startDate: "2026-10-14",
        endDate: "2026-10-21",
      },
    ],
  },
  {
    id: "trip-everest-spring",
    requestId: "lead-amina-everest",
    name: "Everest sisterhood spring hold",
    routeSlug: "everest-base-camp",
    startDate: "2027-04-08",
    endDate: "2027-04-23",
    status: "draft",
    travelerCount: 2,
    notes: "Needs guide assignment after route call.",
    assignedGuides: [],
  },
];

const conflicts: OpsConflict[] = [
  {
    guideId: "lhamo-gurung",
    guideName: "Lhamo Gurung",
    tripId: "trip-ghandruk-bloom",
    tripName: "Ghandruk bloom private departure",
    startDate: "2026-10-14",
    endDate: "2026-10-21",
    reason: "Demo watch item: Lhamo is tentatively held for Sarah while another Annapurna inquiry is being qualified.",
  },
];

let demoDashboard: OpsDashboard | null = null;

function cloneDashboard(dashboard: OpsDashboard): OpsDashboard {
  return {
    ...dashboard,
    bookings: dashboard.bookings.map((booking) => ({ ...booking, addons: [...booking.addons] })),
    guides: dashboard.guides.map((guide) => ({
      ...guide,
      regions: [...guide.regions],
      languages: [...guide.languages],
    })),
    trips: dashboard.trips.map((trip) => ({
      ...trip,
      assignedGuides: trip.assignedGuides.map((guide) => ({ ...guide })),
    })),
    conflicts: dashboard.conflicts.map((conflict) => ({ ...conflict })),
  };
}

function recomputeConflicts(dashboard: OpsDashboard): OpsConflict[] {
  const guideAssignments = dashboard.trips.flatMap((trip) =>
    trip.assignedGuides.map((guide) => ({
      guideId: guide.guideId,
      guideName: guide.guideName,
      tripId: trip.id,
      tripName: trip.name,
      startDate: guide.startDate,
      endDate: guide.endDate,
    })),
  );

  const overlaps: OpsConflict[] = [];

  for (let i = 0; i < guideAssignments.length; i += 1) {
    for (let j = i + 1; j < guideAssignments.length; j += 1) {
      const first = guideAssignments[i];
      const second = guideAssignments[j];

      if (
        first.guideId === second.guideId &&
        first.startDate <= second.endDate &&
        second.startDate <= first.endDate
      ) {
        overlaps.push({
          guideId: first.guideId,
          guideName: first.guideName,
          tripId: second.tripId,
          tripName: second.tripName,
          startDate: second.startDate,
          endDate: second.endDate,
          reason: `${first.guideName} is already assigned to ${first.tripName} during overlapping dates.`,
        });
      }
    }
  }

  return [...conflicts, ...overlaps];
}

function saveDashboard(nextDashboard: OpsDashboard): OpsDashboard {
  demoDashboard = {
    ...nextDashboard,
    generatedAt: new Date().toISOString(),
    conflicts: recomputeConflicts(nextDashboard),
  };
  return cloneDashboard(demoDashboard);
}

export const routeOptions = trekRoutes.map((route) => ({
  slug: route.slug,
  name: route.name,
}));

export function createDemoDashboard(): OpsDashboard {
  if (demoDashboard) {
    return cloneDashboard(demoDashboard);
  }

  return saveDashboard({
    provider: "demo",
    tenantName: "Alpine Bloom",
    generatedAt: new Date().toISOString(),
    bookings: bookings.map((booking) => ({ ...booking, addons: [...booking.addons] })),
    guides: guides.map((guide) => ({
      ...guide,
      regions: [...guide.regions],
      languages: [...guide.languages],
    })),
    trips: trips.map((trip) => ({
      ...trip,
      assignedGuides: trip.assignedGuides.map((guide) => ({ ...guide })),
    })),
    conflicts,
  });
}

export function createDemoBooking(
  values: BookingFormValues,
  source: "web" | "admin" = "web",
): OpsBookingRequest {
  return {
    ...values,
    id: `lead-${Date.now().toString(36)}`,
    status: "new",
    pipelineStage: "first_contact",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    source,
  };
}

export function demoDashboardWithBooking(values: BookingFormValues, source: "web" | "admin") {
  const dashboard = createDemoDashboard();
  return saveDashboard({
    ...dashboard,
    bookings: [createDemoBooking(values, source), ...dashboard.bookings],
  });
}

export function demoDashboardWithBookingUpdate(
  bookingId: string,
  updates: Partial<BookingFormValues> & {
    status?: BookingRequestStatus;
    pipelineStage?: PipelineStage;
  },
) {
  const dashboard = createDemoDashboard();
  return saveDashboard({
    ...dashboard,
    bookings: dashboard.bookings.map((booking) =>
      booking.id === bookingId
        ? { ...booking, ...updates, updatedAt: new Date().toISOString() }
        : booking,
    ),
  });
}

export function demoDashboardWithTrip(bookingId: string) {
  const dashboard = createDemoDashboard();
  const booking = dashboard.bookings.find((item) => item.id === bookingId);

  if (!booking) {
    return dashboard;
  }

  if (dashboard.trips.some((trip) => trip.requestId === bookingId)) {
    return dashboard;
  }

  return saveDashboard({
    ...dashboard,
    trips: [
      {
        id: `trip-${booking.id}`,
        requestId: booking.id,
        name: `${booking.fullName} ${booking.departureWindow} hold`,
        routeSlug: booking.routeSlug,
        startDate: "2026-11-03",
        endDate: "2026-11-14",
        status: "held",
        travelerCount: Number.parseInt(booking.groupSize, 10) || 1,
        notes: "Demo hold created from the admin board.",
        assignedGuides: [],
      },
      ...dashboard.trips,
    ],
  });
}

export function demoDashboardWithGuideAssignment(tripId: string, guideId: string) {
  const dashboard = createDemoDashboard();
  const guide = dashboard.guides.find((item) => item.id === guideId);

  if (!guide) {
    return dashboard;
  }

  return saveDashboard({
    ...dashboard,
    trips: dashboard.trips.map((trip) =>
      trip.id === tripId
        ? {
            ...trip,
            assignedGuides: trip.assignedGuides.some((assignment) => assignment.guideId === guide.id)
              ? trip.assignedGuides
              : [
                  ...trip.assignedGuides,
                  {
                    id: `assignment-${trip.id}-${guide.id}`,
                    guideId: guide.id,
                    guideName: guide.name,
                    role: guide.role,
                    startDate: trip.startDate,
                    endDate: trip.endDate,
                  },
                ],
          }
        : trip,
    ),
  });
}
