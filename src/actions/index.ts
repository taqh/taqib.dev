import { defineAction } from "astro:actions";
import { z } from 'astro:schema';

export const server = {
  contact: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().min(2),
      email: z.string().email(),
      message: z.string().min(2),
    }),
    handler: async ({ email, name, message }) => {
      // call a mailing service, or store to a database
      return { success: true };
    },
  }),
};