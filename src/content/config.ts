import { z, defineCollection } from "astro:content";

const projectsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      status: z.enum(["live", "dev"]),
      description: z.string(),
      image: z.string(),
      draft: z.boolean().optional(),
      preview: z
        .object({
          src: image().refine((img) => img.width >= 1200, {
            message: "Cover image must be at least 1200 pixels wide!",
          }),
          // this just lets me import images from relative paths in a content collection
          // https://docs.astro.build/en/guides/images/#images-in-content-collections
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
  projects: projectsCollection,
};
