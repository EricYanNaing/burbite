import "server-only";

import type { PostFormValues } from "@/lib/schemas/post";
import { getDb } from "@/server/db/prisma";

export async function listPosts() {
  return getDb().post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createPostRecord(values: PostFormValues) {
  return getDb().post.create({
    data: {
      title: values.title,
      content: values.content || null,
      published: values.published,
    },
  });
}

export async function findPostById(id: string) {
  return getDb().post.findUnique({
    where: {
      id,
    },
  });
}

export async function updatePostRecord(id: string, values: PostFormValues) {
  return getDb().post.update({
    where: {
      id,
    },
    data: {
      title: values.title,
      content: values.content || null,
      published: values.published,
    },
  });
}

export async function deletePostRecord(id: string) {
  return getDb().post.delete({
    where: {
      id,
    },
  });
}
