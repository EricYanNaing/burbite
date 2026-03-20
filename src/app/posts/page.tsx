import { Database, Layers3, Sparkles } from "lucide-react";
import { PostsCrudDemo } from "@/components/posts/posts-crud-demo";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const guideCards = [
  {
    icon: Database,
    title: "Prisma + PostgreSQL",
    body: "The database model lives in prisma/schema.prisma and uses PostgreSQL as the datasource.",
  },
  {
    icon: Layers3,
    title: "API route layer",
    body: "The UI talks to `/api/posts`, so you can keep reusing the same client fetch pattern later.",
  },
  {
    icon: Sparkles,
    title: "Extend the pattern",
    body: "Add a new Prisma model, create a schema, create route handlers, then add a small client module and UI.",
  },
];

export default function PostsPage() {
  return (
    <div className="space-y-5">
      <section
        className="overflow-hidden rounded-[28px] p-5 text-white"
        style={{
          backgroundImage:
            "radial-gradient(circle at top right, rgba(255, 227, 173, 0.28), transparent 36%), linear-gradient(135deg, #171f2e 0%, #23405b 54%, #3d7e7b 100%)",
        }}
      >
        <Badge className="border-white/20 bg-white/12 text-white">
          Fullstack CRUD demo
        </Badge>
        <h1 className="mt-5 max-w-[14ch] text-3xl font-semibold leading-tight">
          Prisma-backed posts with create, read, update, and delete.
        </h1>
        <p className="mt-3 max-w-[32ch] text-sm/6 text-white/76">
          This is the smallest reusable pattern in this repo for a real
          fullstack Next.js flow: database model, route handlers, typed client,
          and a client-side CRUD screen.
        </p>
      </section>

      <div className="space-y-3">
        {guideCards.map((card) => {
          const Icon = card.icon;

          return (
            <Card
              key={card.title}
              className="rounded-[24px] border-none shadow-none ring-1 ring-black/5"
            >
              <CardHeader className="gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.body}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      <PostsCrudDemo />
    </div>
  );
}
