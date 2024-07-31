import { describe, it, expect, beforeEach } from "vitest";
import { CosmoClient } from "../../src/client";
import { unauthorizedHandler } from "../mocks";
import { server } from "../setup";
import { AccessTokenMissing, UnauthorizedError } from "../../src/errors";
import json from "../mocks.json";

describe("UserAPI", () => {
  let cosmo: CosmoClient;

  beforeEach(() => {
    cosmo = new CosmoClient({});
  });

  describe("authenticated", () => {
    beforeEach(() => {
      cosmo.setAccessToken("someAccessToken");
    });

    it("should get the currently authenticated user", async () => {
      const response = await cosmo.users.me();
      expect(response).toEqual(json.getUser.profile);
    });

    it("should search for users", async () => {
      const response = await cosmo.users.search("example");
      expect(response).toEqual(json.search);
    });
  });

  describe("unauthenticated", () => {
    it("getting the current user should throw an error", async () => {
      await expect(cosmo.users.me()).rejects.toThrowError(
        new AccessTokenMissing()
      );
    });

    it("user search should throw an error", async () => {
      expect(() => cosmo.users.search("example")).rejects.toThrowError(
        new AccessTokenMissing()
      );
    });
  });

  describe("invalid token", () => {
    beforeEach(() => {
      cosmo.setAccessToken("someInvalidAccessToken");
      server.use(unauthorizedHandler);
    });

    it("getting the current user should handle unauthorized requests", async () => {
      expect(() => cosmo.users.me()).rejects.toThrowError(
        new UnauthorizedError("missing Authorization header")
      );
    });

    it("user search should handle unauthorized requests", async () => {
      expect(() => cosmo.users.search("example")).rejects.toThrowError(
        new UnauthorizedError("missing Authorization header")
      );
    });
  });

  it("should get a user by their nickname", async () => {
    const response = await cosmo.users.byNickname("example");
    expect(response).toEqual(json.byNickname);
  });
});
