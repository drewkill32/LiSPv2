import { z } from "zod";

export const artistSchema = z
  .object({
    name: z.string(),
    location: z.string().optional(),
    image: z.string(),
    slug: z.object({
      current: z.string(),
    }),
    bio: z.array(
      z.object({ children: z.array(z.object({ text: z.string() })) })
    ),
    youtubeUrl: z.string().url().optional(),
  })
  .passthrough();

export type Artist = z.infer<typeof artistSchema>;
