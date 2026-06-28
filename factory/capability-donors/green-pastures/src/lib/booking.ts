import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z.string().min(2, "Enter your name"),
  email: z.email("Enter a valid email"),
  departureWindow: z.string().min(2, "Choose a departure window"),
  routeSlug: z.string().min(1, "Choose a route"),
  groupSize: z.string().min(1, "Choose a group size"),
  style: z.string().min(1, "Choose a travel style"),
  addons: z.array(z.string()),
  notes: z
    .string()
    .max(1_500, "Keep notes under 1500 characters")
    .optional()
    .or(z.literal("")),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export type BookingApiResult = {
  accepted: boolean;
  stored: boolean;
  bookingId?: string;
  emailSent?: boolean;
  provider: "cloudflare-ops" | "preview";
  message: string;
};
