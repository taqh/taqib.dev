import { z, defineCollection } from "astro:content";

const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    status: z.enum(["live", "dev"]),
    description: z.string(),
    image: z.string(),
    preview: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional(),
    links: z.object({
      repo: z.string().url().optional(),
      live: z.string().url().optional(),
    }),
    technologies: z.array(z.string()),
  }),
});

export const collections = {
  projects: projectsCollection,
};
