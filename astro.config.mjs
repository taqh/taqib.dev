import { defineConfig, fontProviders } from "astro/config";
import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";

import vercel from "@astrojs/vercel";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), sitemap()],
  site: "https://taqib.dev",
  output: "server",
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  experimental: {
    fonts: [
      {
        name: "Inter",
        cssVariable: "--font-inter",
        provider: fontProviders.google(),
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        styles: ["normal"],
        subsets: ["latin"],
      },
      {
        name: "Literata",
        cssVariable: "--font-literata",
        provider: fontProviders.google(),
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        styles: ["normal"],
        subsets: ["latin"],
      },
    ],
  },
});