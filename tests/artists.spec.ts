import { expect, test } from "vitest";
import { Cosmo } from "../src";
import { json } from "./mocks";

test("fetches artists", async () => {
  const cosmo = new Cosmo();
  const result = await cosmo.getArtists();
  expect(result).toEqual(json.getArtists.artists);
});

test("fetches a single artist", async () => {
  const cosmo = new Cosmo();
  const result = await cosmo.getArtist("artms");
  expect(result).toEqual(json.getArtist.artist);
});
