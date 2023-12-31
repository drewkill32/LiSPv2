import { defineType, defineField, defineArrayMember } from "sanity";

export const venue = defineType({
  title: "Venue",
  name: "venue",
  type: "document",
  fields: [
    defineField({
      title: "Name",
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Address",
      name: "address",
      type: "string",
    }),
    defineField({
      title: "Description",
      name: "description",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      type: "image",
      name: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      title: "Location",
      name: "location",
      type: "geopoint",
    }),
  ],
});
