import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function NotFound() {
  return (
    <div className="flex min-h-[60svh] flex-col items-center justify-center gap-5 text-center">
      <Badge className="rounded-full bg-secondary text-secondary-foreground">
        BurBite
      </Badge>
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold">Bite not found</h1>
        <p className="max-w-[26ch] text-sm/6 text-muted-foreground">
          The route exists, but this sample slug does not. Try one of the cards
          from Discover instead.
        </p>
      </div>
      <Link
        href="/discover"
        className="inline-flex h-10 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground"
      >
        Go to Discover
      </Link>
    </div>
  );
}
