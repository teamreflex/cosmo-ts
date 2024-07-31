import { describe, it, expect, beforeEach } from "vitest";
import { CosmoClient } from "../../src/client";
import { getFeedNewsParams, unauthorizedHandler } from "../mocks";
import { server } from "../setup";
import json from "../mocks.json";
import { AccessTokenMissing, UnauthorizedError } from "../../src/errors";

describe("NewsAPI", () => {
  let cosmo: CosmoClient;

  beforeEach(() => {
    cosmo = new CosmoClient({});
  });

  describe("authenticated", () => {
    beforeEach(() => {
      cosmo.setAccessToken("someAccessToken");
    });

    it("should list the home page news when authenticated", async () => {
      const response = await cosmo.news.home("ARTMS");
      expect(response).toEqual(json.newsHome.sections);
    });
  });

  describe("unauthenticated", () => {
    it("home page news should throw an error", async () => {
      expect(() => cosmo.news.home("ARTMS")).rejects.toThrowError(
        new AccessTokenMissing()
      );
    });
  });

  describe("invalid token", () => {
    beforeEach(() => {
      cosmo.setAccessToken("someInvalidAccessToken");
      server.use(unauthorizedHandler);
    });

    it("home page news should handle unauthorized requests", async () => {
      expect(() => cosmo.news.home("ARTMS")).rejects.toThrowError(
        new UnauthorizedError("missing Authorization header")
      );
    });
  });

  it("should list the news feed", async () => {
    const response = await cosmo.news.feed({ artist: "ARTMS" });
    expect(response).toEqual(json.newsFeed);
  });

  it("should list the exclusive feed", async () => {
    const response = await cosmo.news.exclusive({ artist: "ARTMS" });
    expect(response).toEqual(json.newsExclusive);
  });

  it("should pass search params correctly", async () => {
    server.use(getFeedNewsParams);
    const response = await cosmo.news.feed({ artist: "ARTMS", startAfter: 3 });
    expect(response).toEqual({
      ...json.newsFeed,
      nextStartAfter: "6",
    });
  });
});
