import { z } from "zod";

export const validArtistSchema = z.union([
  z.literal("ARTMS"),
  z.literal("tripleS"),
]);
