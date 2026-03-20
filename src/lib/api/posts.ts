import { apiDelete, apiGet, apiPatch, apiPost } from "@/lib/api/http";
import type { PostFormValues } from "@/lib/schemas/post";

export type PostRecord = {
  id: string;
  title: string;
  content: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PostsResponse = {
  items: PostRecord[];
};

export type PostMutationResponse = {
  item: PostRecord;
  message: string;
};

export type PostDeleteResponse = {
  message: string;
};

export async function fetchPosts() {
  return apiGet<PostsResponse>("/posts", {
    cache: "no-store",
    errorMessage: "Could not load posts.",
  });
}

export async function createPost(values: PostFormValues) {
  return apiPost<PostMutationResponse, PostFormValues>("/posts", values, {
    errorMessage: "Could not create the post.",
  });
}

export async function updatePost(id: string, values: PostFormValues) {
  return apiPatch<PostMutationResponse, PostFormValues>(`/posts/${id}`, values, {
    errorMessage: "Could not update the post.",
  });
}

export async function deletePost(id: string) {
  return apiDelete<PostDeleteResponse>(`/posts/${id}`, {
    errorMessage: "Could not delete the post.",
  });
}
