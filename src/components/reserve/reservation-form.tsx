"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle, PartyPopper } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { submitReservation } from "@/lib/api/client";
import {
  reservationDefaults,
  reservationSchema,
  type ReservationFormValues,
} from "@/lib/schemas/reservation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ReservationForm() {
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: reservationDefaults,
  });

  const reservationMutation = useMutation({
    mutationFn: submitReservation,
    onSuccess: (data) => {
      form.reset(reservationDefaults);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not submit the reservation.",
      );
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    reservationMutation.mutate(values);
  });

  return (
    <Card className="rounded-[28px] border-none shadow-none ring-1 ring-black/5">
      <CardHeader>
        <CardTitle>Book your table</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 pb-5">
        <form className="space-y-4" onSubmit={onSubmit}>
          <Field
            label="Guest name"
            error={form.formState.errors.guestName?.message}
          >
            <Input
              placeholder="Ari Somchai"
              {...form.register("guestName")}
            />
          </Field>

          <Field label="Phone" error={form.formState.errors.phone?.message}>
            <Input placeholder="+66 8X XXX XXXX" {...form.register("phone")} />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Party size"
              error={form.formState.errors.partySize?.message}
            >
              <Input
                type="number"
                min={1}
                max={10}
                {...form.register("partySize", { valueAsNumber: true })}
              />
            </Field>

            <Field
              label="Visit date"
              error={form.formState.errors.visitDate?.message}
            >
              <Input type="date" {...form.register("visitDate")} />
            </Field>
          </div>

          <Field label="Notes" error={form.formState.errors.notes?.message}>
            <Textarea
              rows={4}
              placeholder="Window seat, late arrival, allergy notes..."
              {...form.register("notes")}
            />
          </Field>

          <Button
            type="submit"
            className="h-11 w-full rounded-full"
            disabled={reservationMutation.isPending}
          >
            {reservationMutation.isPending ? (
              <>
                <LoaderCircle className="size-4 animate-spin" />
                Sending booking
              </>
            ) : (
              "Request reservation"
            )}
          </Button>
        </form>

        {reservationMutation.isSuccess ? (
          <div className="rounded-[22px] bg-accent p-4 text-accent-foreground">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <PartyPopper className="size-4" />
              Confirmed
            </div>
            <p className="mt-2 text-sm/6">{reservationMutation.data.message}</p>
          </div>
        ) : null}

        {reservationMutation.isError ? (
          <div className="rounded-[22px] bg-destructive/10 p-4 text-sm/6 text-destructive">
            {reservationMutation.error instanceof Error
              ? reservationMutation.error.message
              : "Could not submit the reservation."}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

function Field({ label, error, children }: FieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium">{label}</span>
      {children}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </label>
  );
}
