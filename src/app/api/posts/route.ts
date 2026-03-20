import { ZodError } from "zod";
import { postSchema } from "@/lib/schemas/post";
import { createPostRecord, listPosts } from "@/server/posts/repository";

export async function GET() {
  const items = await listPosts();

  return Response.json({ items });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const values = postSchema.parse(body);
    const item = await createPostRecord(values);

    return Response.json(
      {
        item,
        message: "Post created successfully.",
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return handlePostRouteError(error, "Could not create the post.");
  }
}

function handlePostRouteError(error: unknown, fallback: string) {
  if (error instanceof ZodError) {
    return Response.json(
      {
        message: error.issues[0]?.message ?? fallback,
      },
      {
        status: 400,
      },
    );
  }

  return Response.json(
    {
      message: error instanceof Error ? error.message : fallback,
    },
    {
      status: 500,
    },
  );
}
