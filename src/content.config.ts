import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { highlightContent } from "./lib/marble/highlight";
import { fetchPosts } from "./lib/marble/queries";
import { postSchema } from "./lib/marble/types";

const projectCollection = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      status: z.enum(["live", "dev"]),
      description: z.string(),
      image: z.string(),
      slug: z.string(),
      draft: z.boolean().optional(),
      preview: z
        .object({
          src: image(),
          alt: z.string(),
        })
        .optional(),
      links: z.object({
        repo: z.string().url().optional(),
        live: z.string().url().optional(),
      }),
      technologies: z.array(z.string()),
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
      })),
    );
  },
  schema: postSchema,
});

export const collections = {
  projects: projectCollection,
  posts: postCollection,
};
