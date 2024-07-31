import { describe, it, expect, beforeEach } from "vitest";
import { CosmoClient, createClient } from "../../src/client";
import json from "../mocks.json";
import { AccessTokenMissing } from "../../src/errors";

describe("ArtistAPI", () => {
  let cosmo: CosmoClient;
  beforeEach(() => {
    cosmo = createClient({});
  });

  it("should list artists", async () => {
    const response = await cosmo.artists.list();
    expect(response).toEqual(json.getArtists.artists);
  });

  it("should return a single artist with its members", async () => {
    const response = await cosmo.artists.get("ARTMS");
    expect(response).toEqual(json.getArtist.artist);
  });

  describe("backend for frontend", () => {
    it("should return a single artist when authenticated", async () => {
      cosmo.setAccessToken("someAccessToken");
      const response = await cosmo.artists.bffGet("ARTMS");
      expect(response).toEqual(json.getArtistBff);
    });

    it("should throw an error when unauthenticated", async () => {
      await expect(cosmo.artists.bffGet("ARTMS")).rejects.toThrowError(
        new AccessTokenMissing()
      );
    });
  });
});
