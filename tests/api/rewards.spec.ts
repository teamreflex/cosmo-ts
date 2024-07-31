import { describe, it, expect, beforeEach } from "vitest";
import { CosmoClient, createClient } from "../../src/client";
import json from "../mocks.json";
import { AccessTokenMissing, UnauthorizedError } from "../../src/errors";
import { server } from "../setup";
import { unauthorizedBffHandler } from "../mocks";

describe("RewardsAPI", () => {
  let cosmo: CosmoClient;
  beforeEach(() => {
    cosmo = createClient({});
  });

  describe("authenticated", () => {
    beforeEach(() => {
      cosmo.setAccessToken("someAccessToken");
    });

    it("should return the list of pending rewards", async () => {
      const response = await cosmo.rewards.list();
      expect(response).toEqual(json.rewardsList);
    });

    it("should check if there are any pending rewards", async () => {
      const response = await cosmo.rewards.check();
      expect(response).toEqual(true);
    });

    it("should claim all pending rewards", async () => {
      const response = await cosmo.rewards.claim();
      expect(response).toEqual(true);
    });
  });

  describe("unauthenticated", () => {
    it("fetching the list of pending rewards should throw an error", async () => {
      await expect(cosmo.rewards.list()).rejects.toThrowError(
        new AccessTokenMissing()
      );
    });

    it("checking if there are any pending rewards should throw an error", async () => {
      await expect(cosmo.rewards.check()).rejects.toThrowError(
        new AccessTokenMissing()
      );
    });

    it("claiming all pending rewards should throw an error", async () => {
      await expect(cosmo.rewards.claim()).rejects.toThrowError(
        new AccessTokenMissing()
      );
    });
  });

  describe("invalid token", () => {
    beforeEach(() => {
      cosmo.setAccessToken("someInvalidAccessToken");
      server.use(unauthorizedBffHandler);
    });

    it("fetching the list of pending rewards should handle unauthorized requests", async () => {
      await expect(cosmo.rewards.list()).rejects.toThrowError(
        new UnauthorizedError(
          "Sorry, your username or password was entered Incorrectly"
        )
      );
    });

    it("checking if there are any pending rewards should handle unauthorized requests", async () => {
      await expect(cosmo.rewards.check()).rejects.toThrowError(
        new UnauthorizedError(
          "Sorry, your username or password was entered Incorrectly"
        )
      );
    });

    it("claiming all pending rewards should handle unauthorized requests", async () => {
      await expect(cosmo.rewards.claim()).rejects.toThrowError(
        new UnauthorizedError(
          "Sorry, your username or password was entered Incorrectly"
        )
      );
    });
  });
});
