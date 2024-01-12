import { defineType, defineField } from "sanity";

export const festivalEvent = defineType({
  title: "Events",
  name: "event",
  type: "document",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Start Date",
      name: "startDate",
      type: "date",
    }),
    defineField({
      title: "End Date",
      name: "endDate",
      type: "date",
    }),
    defineField({
      title: "Image",
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
        },
      ],
    }),
  ],
});
