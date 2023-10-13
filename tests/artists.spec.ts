import { expect, test } from "vitest";
import { Cosmo } from "../src";
import { createTestFetcher, getArtists } from "./common";

test("fetches artists", async () => {
  const cosmo = new Cosmo({ fetcher: createTestFetcher() });

  const result = await cosmo.getArtists();

  expect(result).toEqual(getArtists.artists);
});
