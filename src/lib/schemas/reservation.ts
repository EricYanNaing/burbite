import { z } from "zod";

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

export const reservationSchema = z.object({
  guestName: z
    .string()
    .trim()
    .min(2, "Enter at least 2 characters.")
    .max(60, "Keep the name under 60 characters."),
  phone: z
    .string()
    .trim()
    .min(8, "Phone number looks too short.")
    .max(20, "Phone number looks too long.")
    .regex(/^[0-9+\-() ]+$/, "Use digits and common phone symbols only."),
  partySize: z
    .number()
    .int("Use a whole number.")
    .min(1, "Party size must be at least 1.")
    .max(10, "For groups above 10, call the venue."),
  visitDate: z
    .string()
    .regex(isoDatePattern, "Choose a valid date from the picker."),
  notes: z.string().trim().max(180, "Keep notes under 180 characters."),
});

export type ReservationFormValues = z.infer<typeof reservationSchema>;

export const reservationDefaults: ReservationFormValues = {
  guestName: "",
  phone: "",
  partySize: 2,
  visitDate: "",
  notes: "",
};
