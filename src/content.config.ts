import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { highlightContent } from "./lib/marble/highlight";
import { fetchPosts } from "./lib/marble/queries";
import { postSchema } from "./lib/marble/types";

const projectCollection = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/[^_]*.{md,mdx}",
  }),
  schema: ({ image }) =>
    z.object({
      description: z.string(),
      draft: z.boolean().optional(),
      image: z.string(),
      links: z.object({
        live: z.url().optional(),
        repo: z.url().optional(),
      }),
      preview: z
        .object({
          alt: z.string(),
          src: image(),
        })
        .optional(),
      slug: z.string(),
      status: z.enum(["live", "dev"]),
      technologies: z.array(z.string()),
      title: z.string(),
    }),
});

const postCollection = defineCollection({
  loader: async () => {
    const { posts } = await fetchPosts();
    // Must return an array of entries with an id property
    // or an object with IDs as keys and entries as values
    return Promise.all(
      posts.map(async (post) => ({
        ...post,
        content: await highlightContent(post.content),
      }))
    );
  },
  schema: postSchema,
});

const articleCollection = defineCollection({
  loader: glob({
    base: "./src/content/articles",
    pattern: "**/[^_]*.{md,mdx}",
  }),
  schema: z.object({
    description: z.string(),
    draft: z.boolean().default(false),
    image: z.string().optional(),
    publishedAt: z.coerce.date(),
    readingTime: z.number().int().positive().optional(),
    title: z.string(),
  }),
});

export const collections = {
  articles: articleCollection,
  posts: postCollection,
  projects: projectCollection,
};
