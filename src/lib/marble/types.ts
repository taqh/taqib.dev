import { z } from "astro/zod";

export const postSchema = z.object({
  attribution: z
    .object({
      author: z.string(),
      url: z.url(),
    })
    .nullable(),
  authors: z.array(
    z.object({
      id: z.string(),
      image: z.url().nullable().optional(),
      name: z.string(),
    })
  ),
  category: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  }),
  content: z.string(),
  coverImage: z.url().nullable().optional(),
  description: z.string(),
  id: z.string(),
  publishedAt: z.coerce.date(),
  slug: z.string(),
  tags: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
    })
  ),
  title: z.string(),
  updatedAt: z.coerce.date(),
});

export type Post = z.infer<typeof postSchema>;
