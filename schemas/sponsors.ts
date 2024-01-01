import { defineType, defineField, defineArrayMember } from "sanity";

export const sponsor = defineType({
  title: "Sponsors",
  name: "sponsor",
  type: "document",
  fields: [
    defineField({
      title: "Name",
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "URL",
      name: "url",
      type: "url",
    }),
    defineField({
      title: "Image",
      name: "image",
      type: "image",
      description: "Logo",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Order Rank",
      name: "orderRank",
      type: "string",
      hidden: true,
    }),
  ],
});
