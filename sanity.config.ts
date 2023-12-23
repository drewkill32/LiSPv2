import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { googleMapsInput } from "@sanity/google-maps-input";

export default defineConfig({
  name: "default",
  title: "Lost In St. Pete",

  projectId: "qnm8o52k",
  dataset: "production",

  plugins: [
    deskTool(),
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
