// import {
//   defineType,
//   defineField,
//   defineArrayMember,
// } from "@sanity-typed/types";

// export const event = defineType({
//   title: "Event",
//   name: "event",
//   type: "document",
//   fields: [
//     defineField({
//       title: "Title",
//       name: "title",
//       type: "string",
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       title: "Slug",
//       name: "slug",
//       type: "slug",
//       options: {
//         source: "title",
//       },
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       title: "Location",
//       name: "location",
//       type: "string",
//     }),
//     defineField({
//       title: "Bio",
//       name: "bio",
//       type: "array",
//       of: [{ type: "block" }],
//     }),
//     defineField({
//       title: "Images",
//       name: "images",
//       type: "array",
//       of: [
//         {
//           type: "image",
//           options: {
//             hotspot: true,
//           },
//           fields: [
//             {
//               name: "alt",
//               type: "string",
//             },
//           ],
//         },
//       ],
//     },
//     defineField({
//       title: "YouTube URL",
//       name: "youtubeUrl",
//       type: "url",
//       validation: (Rule) =>
//         Rule.custom((url: string) => {
//           if (!url) {
//             return true; // Allow undefined or empty string values
//           }
//           return url.match(
//             /^https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}$/
//           )
//             ? true
//             : "Invalid YouTube URL. URL must be in the format https://www.youtube.com/watch?v=XXXXXXXXXXX";
//         }),
//     },
//     defineField({
//       title: "Socials",
//       name: "socials",
//       type: "array",
//       of: [
//         {
//           type: "object",
//           fields: [
//             {
//               name: "socialType",
//               type: "string",
//               title: "type",
//               initialValue: "Website",
//               options: {
//                 list: [
//                   "Facebook",
//                   "Instagram",
//                   "SoundCloud",
//                   "Spotify",
//                   "Bandcamp",
//                   "Website",
//                 ],
//               },
//               validation: (Rule) => Rule.required(),
//             },
//             {
//               name: "socialText",
//               type: "string",
//               title: "Text",
//               description: "Text to display for website link",
//               hidden: ({ parent }) => parent?.socialType !== "Website",
//             },
//             {
//               name: "socialUrl",
//               type: "string",
//               title: "URL",
//               validation: (Rule) => Rule.required(),
//             },
//           ],
//         },
//       ],
//     },
//   ],
// });
