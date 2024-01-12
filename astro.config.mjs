import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { sanityIntegration as sanity } from "@sanity/astro";
import netlify from "@astrojs/netlify";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  integrations: [
    react(),
    sanity({
      projectId: "qnm8o52k",
      dataset: "production",
      useCdn: true,
      studioBasePath: "/admin",
    }),
    tailwind(),
  ],
  adapter: netlify(),
});
