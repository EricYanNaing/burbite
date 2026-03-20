import { ZodError, z } from "zod";
import { postSchema } from "@/lib/schemas/post";
import {
  deletePostRecord,
  findPostById,
  updatePostRecord,
} from "@/server/posts/repository";

const postParamsSchema = z.object({
  id: z.string().min(1),
});

export async function PATCH(
  request: Request,
  context: RouteContext<"/api/posts/[id]">,
) {
  try {
    const { id } = postParamsSchema.parse(await context.params);
    const existingPost = await findPostById(id);

    if (!existingPost) {
      return Response.json(
        {
          message: "Post not found.",
        },
        {
          status: 404,
        },
      );
    }

    const body = await request.json();
    const values = postSchema.parse(body);
    const item = await updatePostRecord(id, values);

    return Response.json({
      item,
      message: "Post updated successfully.",
    });
  } catch (error) {
    return handlePostRouteError(error, "Could not update the post.");
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext<"/api/posts/[id]">,
) {
  try {
    const { id } = postParamsSchema.parse(await context.params);
    const existingPost = await findPostById(id);

    if (!existingPost) {
      return Response.json(
        {
          message: "Post not found.",
        },
        {
          status: 404,
        },
      );
    }

    await deletePostRecord(id);

    return Response.json({
      message: "Post deleted successfully.",
    });
  } catch (error) {
    return handlePostRouteError(error, "Could not delete the post.");
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
