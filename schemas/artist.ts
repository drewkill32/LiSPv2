import {
  defineType,
  defineField,
  defineArrayMember,
} from "sanity";

export const artist = defineType({
  title: "Artist",
  name: "artist",
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
      title: "Location",
      name: "location",
      type: "string",
    }),
    defineField({
      title: "Bio",
      name: "bio",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
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
      title: "YouTube URL",
      name: "youtubeUrl",
      type: "url",
      validation: (Rule) =>
        Rule.custom((url) => {
          if (!url) {
            return true; // Allow undefined or empty string values
          }
          return url.match(
            /^https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}$/
          )
            ? true
            : "Invalid YouTube URL. URL must be in the format https://www.youtube.com/watch?v=XXXXXXXXXXX";
        }),
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
