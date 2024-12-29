/**
 * The list of artists available.
 * `(string & {})` allows any string through while giving typesafety on known artists.
 */
export const validArtists = ["tripleS", "ARTMS"] as const;
export type ValidArtist = (typeof validArtists)[number] | (string & {});
