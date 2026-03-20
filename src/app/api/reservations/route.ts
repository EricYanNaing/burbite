import { reservationSchema } from "@/lib/schemas/reservation";

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = reservationSchema.safeParse(payload);

  if (!parsed.success) {
    const fieldErrors = parsed.error.issues.reduce<Record<string, string>>(
      (accumulator, issue) => {
        const path = issue.path.join(".");

        if (path && !accumulator[path]) {
          accumulator[path] = issue.message;
        }

        return accumulator;
      },
      {},
    );

    return Response.json(
      {
        message: "Please fix the form fields and try again.",
        fieldErrors,
      },
      { status: 422 },
    );
  }

  const confirmationId = `BB-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

  return Response.json(
    {
      confirmationId,
      message: `Reservation locked for ${parsed.data.guestName}. Confirmation ${confirmationId}.`,
    },
    { status: 201 },
  );
}
