import { z } from "zod";
import { validArtistSchema } from "./artist";

export const newsFeedSchema = z.object({
  artist: validArtistSchema,
  startAfter: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
});

export const bffNewsFeedSchema = z.object({
  artistName: validArtistSchema,
  page: z.coerce.number().optional(),
  size: z.coerce.number().optional(),
});
