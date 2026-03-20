"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, LoaderCircle, PencilLine, Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  createPost,
  deletePost,
  fetchPosts,
  updatePost,
  type PostRecord,
} from "@/lib/api/posts";
import {
  postSchema,
  type PostFormInput,
  type PostFormValues,
} from "@/lib/schemas/post";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const postDefaults: PostFormInput = {
  title: "",
  content: "",
  published: false,
};

export function PostsCrudDemo() {
  const queryClient = useQueryClient();
  const createForm = useForm<PostFormInput, unknown, PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: postDefaults,
  });
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      toast.success(data.message);
      createForm.reset(postDefaults);
      void queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Could not create the post.",
      );
    },
  });

  const posts = postsQuery.data?.items ?? [];

  return (
    <section className="space-y-4">
      <Card className="rounded-[26px] border-none shadow-none ring-1 ring-black/5">
        <CardHeader>
          <CardTitle>Create a post</CardTitle>
          <CardDescription>
            This form posts to `/api/posts`, validates with Zod, and persists to
            PostgreSQL through Prisma.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-5">
          <form
            className="space-y-4"
            onSubmit={createForm.handleSubmit((values) => {
              createMutation.mutate(values);
            })}
          >
            <Field
              label="Title"
              error={createForm.formState.errors.title?.message}
            >
              <Input
                placeholder="Wednesday launch menu"
                {...createForm.register("title")}
              />
            </Field>

            <Field
              label="Content"
              error={createForm.formState.errors.content?.message}
            >
              <Textarea
                rows={4}
                placeholder="Use this as your first Prisma model and then repeat the same structure for new resources."
                {...createForm.register("content")}
              />
            </Field>

            <label className="flex items-center gap-3 rounded-[18px] border border-border bg-secondary px-3 py-3 text-sm font-medium">
              <input
                type="checkbox"
                className="size-4 rounded border-border accent-primary"
                {...createForm.register("published")}
              />
              Publish immediately
            </label>

            <Button
              type="submit"
              className="w-full rounded-full"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Creating post
                </>
              ) : (
                <>
                  <Plus className="size-4" />
                  Create post
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {postsQuery.isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, index) => (
            <Card
              key={index}
              className="rounded-[24px] border-none shadow-none ring-1 ring-black/5"
            >
              <CardContent className="space-y-3 py-5">
                <div className="h-6 w-32 animate-pulse rounded-full bg-muted" />
                <div className="h-4 w-full animate-pulse rounded-full bg-muted" />
                <div className="h-4 w-3/4 animate-pulse rounded-full bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}

      {postsQuery.isError ? (
        <Card className="rounded-[24px] border-none shadow-none ring-1 ring-black/5">
          <CardHeader>
            <CardTitle>Posts failed to load</CardTitle>
            <CardDescription>
              {postsQuery.error instanceof Error
                ? postsQuery.error.message
                : "Could not load posts from Prisma."}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      {!postsQuery.isLoading && !postsQuery.isError && posts.length === 0 ? (
        <Card className="rounded-[24px] border-none shadow-none ring-1 ring-black/5">
          <CardHeader>
            <CardTitle>No posts yet</CardTitle>
            <CardDescription>
              Create your first record above, then edit or delete it below.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      <div className="space-y-3">
        {posts.map((post) => (
          <PostCrudCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

function PostCrudCard({ post }: { post: PostRecord }) {
  const queryClient = useQueryClient();
  const form = useForm<PostFormInput, unknown, PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post.title,
      content: post.content ?? "",
      published: post.published,
    },
  });
  const updateMutation = useMutation({
    mutationFn: (values: PostFormValues) => updatePost(post.id, values),
    onSuccess: (data) => {
      toast.success(data.message);
      void queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Could not update the post.",
      );
    },
  });
  const deleteMutation = useMutation({
    mutationFn: () => deletePost(post.id),
    onSuccess: (data) => {
      toast.success(data.message);
      void queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Could not delete the post.",
      );
    },
  });

  useEffect(() => {
    form.reset({
      title: post.title,
      content: post.content ?? "",
      published: post.published,
    });
  }, [form, post]);

  return (
    <Card className="rounded-[24px] border-none shadow-none ring-1 ring-black/5">
      <CardHeader className="gap-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>
              Created {formatDate(post.createdAt)}
            </CardDescription>
          </div>
          <Badge
            variant="secondary"
            className="rounded-full bg-secondary text-secondary-foreground"
          >
            {post.published ? (
              <>
                <Check className="size-3.5" />
                Published
              </>
            ) : (
              "Draft"
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-5">
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((values) => {
            updateMutation.mutate(values);
          })}
        >
          <Field label="Title" error={form.formState.errors.title?.message}>
            <Input {...form.register("title")} />
          </Field>

          <Field
            label="Content"
            error={form.formState.errors.content?.message}
          >
            <Textarea rows={3} {...form.register("content")} />
          </Field>

          <label className="flex items-center gap-3 rounded-[18px] border border-border bg-secondary px-3 py-3 text-sm font-medium">
            <input
              type="checkbox"
              className="size-4 rounded border-border accent-primary"
              {...form.register("published")}
            />
            Published
          </label>

          <div className="flex gap-3">
            <Button
              type="submit"
              className="flex-1 rounded-full"
              disabled={updateMutation.isPending || deleteMutation.isPending}
            >
              {updateMutation.isPending ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Saving
                </>
              ) : (
                <>
                  <PencilLine className="size-4" />
                  Save changes
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="secondary"
              className="rounded-full"
              disabled={updateMutation.isPending || deleteMutation.isPending}
              onClick={() => {
                deleteMutation.mutate();
              }}
            >
              {deleteMutation.isPending ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Trash2 className="size-4" />
              )}
            </Button>
          </div>
        </form>
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

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
