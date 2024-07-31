import { describe, it, expect, beforeEach } from "vitest";
import { CosmoClient, createClient } from "../../src/client";
import json from "../mocks.json";
import { AccessTokenMissing, UnauthorizedError } from "../../src/errors";
import { server } from "../setup";
import { unauthorizedBffHandler } from "../mocks";

describe("ArtistAPI - BFF", () => {
  let cosmo: CosmoClient;
  beforeEach(() => {
    cosmo = createClient({});
  });

  describe("authenticated", () => {
    beforeEach(() => {
      cosmo.setAccessToken("someAccessToken");
    });

    it("should return a single artist", async () => {
      const response = await cosmo.artists.bffGet("ARTMS");
      expect(response).toEqual(json.getArtistBff);
    });
  });

  describe("unauthenticated", () => {
    it("fetching an artist should throw an error", async () => {
      await expect(cosmo.artists.bffGet("ARTMS")).rejects.toThrowError(
        new AccessTokenMissing()
      );
    });
  });

  describe("invalid token", () => {
    beforeEach(() => {
      cosmo.setAccessToken("someInvalidAccessToken");
      server.use(unauthorizedBffHandler);
    });

    it("should handle unauthorized requests", async () => {
      await expect(cosmo.artists.bffGet("ARTMS")).rejects.toThrowError(
        new UnauthorizedError(
          "Sorry, your username or password was entered Incorrectly"
        )
      );
    });
  });
});
