import { describe, it, expect, beforeEach } from "vitest";
import { CosmoClient, createClient } from "../../src/client";
import json from "../mocks.json";

describe("ArtistAPI", () => {
  let cosmo: CosmoClient;
  beforeEach(() => {
    cosmo = createClient({});
  });

  it("should return the list of artists", async () => {
    const response = await cosmo.artists.list();
    expect(response).toEqual(json.getArtistsBff);
  });

  it("should return a single artist", async () => {
    const response = await cosmo.artists.get("ARTMS");
    expect(response).toEqual(json.getArtistBff);
  });
});
