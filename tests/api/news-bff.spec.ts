import { describe, it, expect, beforeEach } from "vitest";
import { CosmoClient } from "../../src/client";
import { unauthorizedBffHandler } from "../mocks";
import { server } from "../setup";
import json from "../mocks.json";
import { AccessTokenMissing, UnauthorizedError } from "../../src/errors";

describe("NewsAPI - BFF", () => {
  let cosmo: CosmoClient;

  beforeEach(() => {
    cosmo = new CosmoClient({});
  });

  describe("authenticated", () => {
    beforeEach(() => {
      cosmo.setAccessToken("someAccessToken");
    });

    it("should fetch the news feed", async () => {
      const response = await cosmo.news.feedBff({ artistName: "ARTMS" });
      expect(response).toEqual(json.newsFeedBff);
    });
  });

  describe("unauthenticated", () => {
    it("fetching the news feed should throw an error", async () => {
      expect(() =>
        cosmo.news.feedBff({ artistName: "ARTMS" })
      ).rejects.toThrowError(new AccessTokenMissing());
    });
  });

  describe("invalid token", () => {
    beforeEach(() => {
      cosmo.setAccessToken("someInvalidAccessToken");
      server.use(unauthorizedBffHandler);
    });

    it("fetching the news feed should handle unauthorized requests", async () => {
      expect(() =>
        cosmo.news.feedBff({ artistName: "ARTMS" })
      ).rejects.toThrowError(
        new UnauthorizedError(
          "Sorry, your username or password was entered Incorrectly"
        )
      );
    });
  });
});
