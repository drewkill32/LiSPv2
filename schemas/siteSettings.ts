import { defineType, defineField, defineArrayMember } from "sanity";
import { MyCustomStringInput } from "../sanity/components/MyCustomStringInput";
import { CogIcon } from "@sanity/icons";

export const siteSettings = defineType({
  title: "Site Settings",
  name: "siteSettings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      title: "Site Title",
      name: "title",
      type: "string",
      components: {
        input: MyCustomStringInput,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Site Description",
      name: "description",
      type: "text",
    }),
    defineField({
      title: "Images",
      name: "images",
      type: "array",
      of: [
        defineArrayMember({
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
    }),
    defineField({
      title: "Socials",
      name: "socials",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "socialType",
              type: "string",
              title: "type",
              initialValue: "Website",
              options: {
                list: [
                  "Facebook",
                  "Instagram",
                  "SoundCloud",
                  "Spotify",
                  "Bandcamp",
                  "Website",
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "socialText",
              type: "string",
              title: "Text",
              description: "Text to display for website link",
              hidden: ({ parent }) => parent?.socialType !== "Website",
            }),
            defineField({
              name: "socialUrl",
              type: "string",
              title: "URL",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
});
