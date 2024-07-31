import { z } from "zod";
import { validArtistSchema } from "./artist";

/**
 * COSMO expects comma-separated values for array filters like:
 * - `?season=Atom01,Binary01`
 * URLSearchParams.getAll() returns `Atom01,Binary01` as it expects arrays in the format of:
 * - `?season=Atom01&season=Binary01`
 * Provides a helper function to cast the value to an array before running it through validation.
 */
function castToArray<TSchema extends z.Schema>(schema: TSchema) {
  return z.preprocess((val) => {
    const str = String(val);
    if (str === "") return [];
    return str.includes(",") ? str.split(",") : [str];
  }, z.array(schema));
}

/**
 * For boolean values, COSMO expects only `true` or `undefined`, `false` is not valid.
 */
const nullableTrue = z.preprocess((val) => {
  const str = String(val);
  if (str === "true") return true;
  return undefined;
}, z.union([z.literal("true"), z.literal(undefined)]));

export const objektFilterSchema = z.object({
  start_after: z.coerce.number().optional(),
  sort: z
    .enum(["newest", "oldest", "noAscending", "noDescending"])
    .optional()
    .default("newest"),
  season: castToArray(z.string()).optional().default([]),
  class: castToArray(z.enum(["First", "Special", "Double", "Welcome", "Zero"]))
    .optional()
    .default([]),
  on_offline: castToArray(z.enum(["online", "offline"]))
    .optional()
    .default([]),
  member: z.string().optional(),
  artist: validArtistSchema.optional(),
  transferable: nullableTrue,
  gridable: nullableTrue,
  collection: z.string().optional(),
});
