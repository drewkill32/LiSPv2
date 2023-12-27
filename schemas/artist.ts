import { defineType } from "sanity";

export const artist = defineType({
  title: "Artist",
  name: "artist",
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
      title: "Location",
      name: "location",
      type: "string",
    },
    {
      title: "Bio",
      name: "bio",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      title: "Images",
      name: "images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      title: "YouTube URL",
      name: "youtubeUrl",
      type: "url",
      validation: (Rule) =>
        Rule.custom((url: string) => {
          if (!url) {
            return true; // Allow undefined or empty string values
          }
          return url.match(
            /^https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}$/
          )
            ? true
            : "Invalid YouTube URL. URL must be in the format https://www.youtube.com/watch?v=XXXXXXXXXXX";
        }),
    },
    {
      title: "Socials",
      name: "socials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
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
            },
            {
              name: "socialText",
              type: "string",
              title: "Text",
              description: "Text to display for website link",
              hidden: ({ parent }) => parent?.socialType !== "Website",
            },
            {
              name: "socialUrl",
              type: "string",
              title: "URL",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
});
