import { describe, it, expect, beforeEach } from "vitest";
import { CosmoClient, createClient } from "../../src/client";
import json from "../mocks.json";
import { AccessTokenMissing, UnauthorizedError } from "../../src/errors";
import { server } from "../setup";
import { gridClaimError, unauthorizedHandler } from "../mocks";
import { Grid } from "../../src/api/grid";

describe("GridAPI", () => {
  let cosmo: CosmoClient;
  beforeEach(() => {
    cosmo = createClient({});
  });

  describe("authenticated", () => {
    beforeEach(() => {
      cosmo.setAccessToken("someAccessToken");
    });

    it("should return the status of an artists grids", async () => {
      const response = await cosmo.grid.artistStatus("artms");
      expect(response).toEqual(json.gridArtistStatus);
    });

    it("should return the editions of an artists grids", async () => {
      const response = await cosmo.grid.editions("artms");
      expect(response).toEqual(json.gridEditions.editions);
    });

    it("should return the list of grids for an edition", async () => {
      const response = await cosmo.grid.editionGrids(
        "artms-atom01-first-edition"
      );
      expect(response).toEqual(json.gridEditionList.grids);
    });

    it("should return the state of a grid", async () => {
      const response = await cosmo.grid.gridStatus(
        "artms-atom01-first-edition"
      );
      expect(response).toEqual(json.gridStatus);
    });

    it("should complete a grid", async () => {
      const response = await cosmo.grid.complete("artms-atom01-first-edition", [
        { no: 101, tokenIdToUse: "101" },
        { no: 102, tokenIdToUse: "102" },
        { no: 103, tokenIdToUse: "103" },
        { no: 104, tokenIdToUse: "104" },
        { no: 105, tokenIdToUse: "105" },
        { no: 106, tokenIdToUse: "106" },
        { no: 107, tokenIdToUse: "107" },
        { no: 108, tokenIdToUse: "108" },
      ]);
      expect(response).toEqual(true);
    });

    it("should prevent duplicate slots from being submitted", async () => {
      await expect(
        cosmo.grid.complete("artms-atom01-first-edition", [
          { no: 101, tokenIdToUse: "101" },
          { no: 102, tokenIdToUse: "102" },
          { no: 103, tokenIdToUse: "103" },
          { no: 104, tokenIdToUse: "104" },
          { no: 105, tokenIdToUse: "105" },
          { no: 106, tokenIdToUse: "106" },
          { no: 107, tokenIdToUse: "107" },
          { no: 107, tokenIdToUse: "108" },
        ])
      ).rejects.toThrowError(new Grid.DuplicateSlotError());
    });

    it("should prevent duplicate tokens from being submitted", async () => {
      await expect(
        cosmo.grid.complete("artms-atom01-first-edition", [
          { no: 101, tokenIdToUse: "101" },
          { no: 102, tokenIdToUse: "102" },
          { no: 103, tokenIdToUse: "103" },
          { no: 104, tokenIdToUse: "104" },
          { no: 105, tokenIdToUse: "105" },
          { no: 106, tokenIdToUse: "106" },
          { no: 107, tokenIdToUse: "107" },
          { no: 108, tokenIdToUse: "107" },
        ])
      ).rejects.toThrowError(new Grid.DuplicateTokenError());
    });

    it("should prevent invalid slot length from being submitted", async () => {
      await expect(
        cosmo.grid.complete("artms-atom01-first-edition", [
          { no: 101, tokenIdToUse: "101" },
          { no: 102, tokenIdToUse: "102" },
          { no: 103, tokenIdToUse: "103" },
        ])
      ).rejects.toThrowError(new Grid.InvalidSlotLengthError());
    });

    it("should claim a grid reward", async () => {
      const response = await cosmo.grid.claim("artms-atom01-first-edition");
      expect(response).toEqual(json.gridClaim);
    });

    it("should handle a grid reward claim error", async () => {
      server.use(gridClaimError);
      await expect(
        cosmo.grid.claim("artms-atom01-first-edition")
      ).rejects.toThrowError(
        new Grid.NotCompletedError("artms-atom01-first-edition")
      );
    });
  });

  describe("unauthenticated", () => {
    it("fetching the status of an artists grids should throw an error", async () => {
      await expect(cosmo.grid.artistStatus("artms")).rejects.toThrowError(
        new AccessTokenMissing()
      );
    });

    it("fetching the editions of an artists grids should throw an error", async () => {
      await expect(cosmo.grid.editions("artms")).rejects.toThrowError(
        new AccessTokenMissing()
      );
    });

    it("fetching the list of grids for an edition should throw an error", async () => {
      await expect(
        cosmo.grid.editionGrids("artms-atom01-first-edition")
      ).rejects.toThrowError(new AccessTokenMissing());
    });

    it("fetching the state of a grid should throw an error", async () => {
      await expect(
        cosmo.grid.gridStatus("artms-atom01-first-edition")
      ).rejects.toThrowError(new AccessTokenMissing());
    });

    it("completing a grid should throw an error", async () => {
      await expect(
        cosmo.grid.complete("artms-atom01-first-edition", [
          { no: 101, tokenIdToUse: "101" },
          { no: 102, tokenIdToUse: "102" },
          { no: 103, tokenIdToUse: "103" },
          { no: 104, tokenIdToUse: "104" },
          { no: 105, tokenIdToUse: "105" },
          { no: 106, tokenIdToUse: "106" },
          { no: 107, tokenIdToUse: "107" },
          { no: 108, tokenIdToUse: "108" },
        ])
      ).rejects.toThrowError(new AccessTokenMissing());
    });

    it("claiming a grid reward should throw an error", async () => {
      await expect(
        cosmo.grid.claim("artms-atom01-first-edition")
      ).rejects.toThrowError(new AccessTokenMissing());
    });
  });

  describe("invalid token", () => {
    beforeEach(() => {
      cosmo.setAccessToken("someInvalidAccessToken");
      server.use(unauthorizedHandler);
    });

    it("fetching the status of an artists grids should handle unauthorized requests", async () => {
      await expect(cosmo.grid.artistStatus("artms")).rejects.toThrowError(
        new UnauthorizedError("missing Authorization header")
      );
    });

    it("fetching the editions of an artists grids should handle unauthorized requests", async () => {
      await expect(cosmo.grid.editions("artms")).rejects.toThrowError(
        new UnauthorizedError("missing Authorization header")
      );
    });

    it("fetching the list of grids for an edition should handle unauthorized requests", async () => {
      await expect(
        cosmo.grid.editionGrids("artms-atom01-first-edition")
      ).rejects.toThrowError(
        new UnauthorizedError("missing Authorization header")
      );
    });

    it("fetching the state of a grid should handle unauthorized requests", async () => {
      await expect(
        cosmo.grid.gridStatus("artms-atom01-first-edition")
      ).rejects.toThrowError(
        new UnauthorizedError("missing Authorization header")
      );
    });

    it("completing a grid should handle unauthorized requests", async () => {
      await expect(
        cosmo.grid.complete("artms-atom01-first-edition", [
          { no: 101, tokenIdToUse: "101" },
          { no: 102, tokenIdToUse: "102" },
          { no: 103, tokenIdToUse: "103" },
          { no: 104, tokenIdToUse: "104" },
          { no: 105, tokenIdToUse: "105" },
          { no: 106, tokenIdToUse: "106" },
          { no: 107, tokenIdToUse: "107" },
          { no: 108, tokenIdToUse: "108" },
        ])
      ).rejects.toThrowError(
        new UnauthorizedError("missing Authorization header")
      );
    });

    it("claiming a grid reward should handle unauthorized requests", async () => {
      await expect(
        cosmo.grid.claim("artms-atom01-first-edition")
      ).rejects.toThrowError(
        new UnauthorizedError("missing Authorization header")
      );
    });
  });
});
