import { z } from "astro:content";

export const postSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  description: z.string(),
  coverImage: z.string().url().nullable().optional(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  authors: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      image: z.string().url().nullable().optional(),
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
      url: z.string().url(),
    })
    .nullable(),
});

export type Post = z.infer<typeof postSchema>;
