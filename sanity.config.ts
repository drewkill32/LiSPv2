import { defineConfig } from "sanity";
import type { InferSchemaValues } from "@sanity-typed/types";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { googleMapsInput } from "@sanity/google-maps-input";
import { structure } from "./sanity/structure";

const config = defineConfig({
  name: "default",
  title: "Lost In St. Pete",
  projectId: "qnm8o52k",
  dataset: "production",
  plugins: [
    deskTool({
      structure: structure,
    }),
    visionTool(),
    googleMapsInput({
      apiKey: import.meta.env.PUBLIC_GOOGLE_API_KEY,
      defaultZoom: 13,
      defaultLocation: { lat: 27.768, lng: -82.658 },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});

export default config;

export type SanityValues = InferSchemaValues<typeof config>;
export type Artist = SanityValues["artist"];
