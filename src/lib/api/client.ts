import type { BiteVenue } from "@/lib/data/bites";
import { apiGet, apiPost } from "@/lib/api/http";
import {
  reservationSchema,
  type ReservationFormValues,
} from "@/lib/schemas/reservation";

type BitesResponse = {
  items: BiteVenue[];
  total: number;
  query: string;
  page: number;
  limit: number;
  hasMore: boolean;
  nextPage: number | null;
};

type FetchBitesOptions = {
  query?: string;
  page?: number;
  limit?: number;
  signal?: AbortSignal;
};

type ReservationResponse = {
  confirmationId: string;
  message: string;
};

export async function fetchBites({
  query = "",
  page = 1,
  limit = 3,
  signal,
}: FetchBitesOptions = {}): Promise<BitesResponse> {
  return apiGet<BitesResponse>("/bites", {
    params: {
      q: query.trim() || undefined,
      page,
      limit,
    },
    cache: "no-store",
    signal,
    errorMessage: "Could not load the BurBite feed.",
  });
}

export async function submitReservation(
  values: ReservationFormValues,
): Promise<ReservationResponse> {
  const payload = reservationSchema.parse(values);

  return apiPost<ReservationResponse, ReservationFormValues>(
    "/reservations",
    payload,
    {
      errorMessage: "Reservation request failed.",
    },
  );
}
