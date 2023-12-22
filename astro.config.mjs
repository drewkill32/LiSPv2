import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import { sanityIntegration } from '@sanity/astro';

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [react(), sanityIntegration({
    projectId: 'qnm8o52k',
    dataset: 'production',
    useCdn: true,
    studioBasePath: "/admin"
  })],
  adapter: netlify()
});