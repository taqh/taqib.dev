import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx()],
  site: "https://taqib.vercel.app",
  output: "server",
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
});