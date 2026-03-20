import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters.")
    .max(80, "Title must stay under 80 characters."),
  content: z
    .string()
    .trim()
    .max(400, "Content must stay under 400 characters.")
    .optional()
    .transform((value) => value ?? ""),
  published: z.boolean().default(false),
});

export type PostFormInput = z.input<typeof postSchema>;
export type PostFormValues = z.output<typeof postSchema>;
