import { describe, it, expect, beforeEach } from "vitest";
import { CosmoClient } from "../src/client";
import { json } from "./mocks";

describe("ArtistAPI", () => {
  let cosmo: CosmoClient;

  beforeEach(() => {
    cosmo = new CosmoClient({});
  });

  it("should list artists", async () => {
    const response = await cosmo.artists.list();
    expect(response).toEqual(json.getArtists.artists);
  });

  it("should return a single artist with its members", async () => {
    const response = await cosmo.artists.get("ARTMS");
    expect(response).toEqual(json.getArtist.artist);
  });
});
