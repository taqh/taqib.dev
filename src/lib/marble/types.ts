import { z } from "astro/zod";

export const postSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  description: z.string(),
  coverImage: z.url().nullable().optional(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  authors: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      image: z.url().nullable().optional(),
    }),
  ),
  category: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  }),
  tags: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
    }),
  ),
  attribution: z
    .object({
      author: z.string(),
      url: z.url(),
    })
    .nullable(),
});

export type Post = z.infer<typeof postSchema>;
