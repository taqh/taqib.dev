import { z, defineCollection } from "astro:content";
import { glob } from 'astro/loaders';

const projectCollection = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.{md,mdx}', base: "./src/content/projects" }),
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

export const collections = {
  projects: projectCollection,
};
