import { defineType } from "sanity";

export const venue = defineType({
  title: "Venue",
  name: "venue",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Address",
      name: "address",
      type: "string",
    },
    {
      title: "Description",
      name: "description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      type: "image",
      name: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
    },
    {
      title: "Location",
      name: "location",
      type: "geopoint",
    },
  ],
});
