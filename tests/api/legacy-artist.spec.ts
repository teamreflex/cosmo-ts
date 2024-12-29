import { describe, it, expect, beforeEach } from "vitest";
import { CosmoClient, createClient } from "../../src/client";
import json from "../mocks.json";

describe("LegacyArtistAPI", () => {
  let cosmo: CosmoClient;
  beforeEach(() => {
    cosmo = createClient({});
  });

  it("should list artists", async () => {
    const response = await cosmo.legacy.artists.list();
    expect(response).toEqual(json.getArtists.artists);
  });

  it("should return a single artist with its members", async () => {
    const response = await cosmo.legacy.artists.get("ARTMS");
    expect(response).toEqual(json.getArtist.artist);
  });
});
