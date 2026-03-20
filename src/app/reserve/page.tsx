import { ReservationForm } from "@/components/reserve/reservation-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReservePage() {
  return (
    <div className="space-y-5">
      <section
        className="overflow-hidden rounded-[28px] p-5 text-white"
        style={{
          backgroundImage:
            "radial-gradient(circle at top left, rgba(255, 210, 140, 0.4), transparent 35%), linear-gradient(135deg, #2b1b11 0%, #5f3219 45%, #b95b1d 100%)",
        }}
      >
        <Badge className="border-white/20 bg-white/12 text-white">
          Zod Form Example
        </Badge>
        <h1 className="mt-5 text-3xl font-semibold leading-tight">
          One shared schema on both client and server.
        </h1>
        <p className="mt-3 max-w-[31ch] text-sm/6 text-white/78">
          The form validates with `react-hook-form` + `zodResolver`, then posts
          to a Route Handler that validates the same schema again.
        </p>
      </section>

      <Card className="rounded-[24px] border-none shadow-none ring-1 ring-black/5">
        <CardHeader className="gap-1">
          <CardTitle>Shared validation path</CardTitle>
          <CardDescription>
            `src/lib/schemas/reservation.ts` is imported by the client form and
            by `src/app/api/reservations/route.ts`.
          </CardDescription>
        </CardHeader>
      </Card>

      <ReservationForm />
    </div>
  );
}
