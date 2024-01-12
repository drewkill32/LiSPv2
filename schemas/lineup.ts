import { defineType, defineField, defineArrayMember } from "sanity";

export const lineup = defineType({
  title: "Lineup",
  name: "lineup",
  type: "document",
  preview: {
    select: {
      title: "event.title",
      venue: "venue.name",
      venueImage: "venue.image",
      day: "day",
      stage: "stage",
    },
    prepare({ title, venue, venueImage, day, stage }) {
      //format the day
      let dayFormat = "";
      if (day) {
        dayFormat = ` - ${new Date(day).toLocaleDateString([], {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}`;
      }

      stage = stage ? ` (${stage})` : "";
      return {
        title: `${venue}${stage}${dayFormat}`,
        subtitle: title,
        media: venueImage,
      };
    },
  },
  initialValue: {},
  fields: [
    defineField({
      title: "Event",
      name: "event",
      type: "reference",
      to: [{ type: "event" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Venue",
      name: "venue",
      type: "reference",
      to: [{ type: "venue" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Day",
      name: "day",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Stage",
      name: "stage",
      type: "string",
    }),
    defineField({
      title: "Performance",
      name: "performance",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          preview: {
            select: {
              artistName: "artist.name",
              startTime: "startTime",
              endTime: "endTime",
              images: "artist.images",
            },
            prepare({ artistName, images, startTime, endTime }) {
              //format the start and end time
              startTime = new Date(startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
              endTime = new Date(endTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
              return {
                title: artistName,
                subtitle: `${startTime} - ${endTime}`,
                media: images?.[0],
              };
            },
          },
          fields: [
            defineField({
              title: "Artist",
              name: "artist",
              type: "reference",
              to: [{ type: "artist" }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              title: "Start Time",
              name: "startTime",
              type: "datetime",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              title: "End Time",
              name: "endTime",
              type: "datetime",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
});
