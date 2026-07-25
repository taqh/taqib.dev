import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel";
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  fonts: [
    {
      cssVariable: "--font-inter",
      name: "Inter",
      provider: fontProviders.google(),
      styles: ["normal"],
      subsets: ["latin"],
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    {
      cssVariable: "--font-literata",
      name: "Literata",
      provider: fontProviders.google(),
      styles: ["normal"],
      subsets: ["latin"],
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  ],
  integrations: [tailwind(), mdx(), sitemap()],
  output: "server",
  site: "https://taqib.dev",
  trailingSlash: "never",
});
