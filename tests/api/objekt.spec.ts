import { describe, it, expect, beforeEach } from "vitest";
import { CosmoClient, createClient } from "../../src/client";
import json from "../mocks.json";
import { AccessTokenMissing, UnauthorizedError } from "../../src/errors";
import { server } from "../setup";
import { unauthorizedHandler } from "../mocks";

describe("ObjektAPI", () => {
  let cosmo: CosmoClient;
  beforeEach(() => {
    cosmo = createClient({});
  });

  describe("authenticated", () => {
    beforeEach(() => {
      cosmo.setAccessToken("someAccessToken");
    });

    it("should list filters", async () => {
      const response = await cosmo.objekts.filters();
      expect(response).toEqual(json.getFilters);
    });

    it("should get an objekt by its qr code", async () => {
      const response = await cosmo.objekts.getBySerial("1234");
      expect(response).toEqual(json.getBySerial);
    });

    it("should claim an objekt by its qr code", async () => {
      await expect(() => {
        return cosmo.objekts.claimBySerial("1234");
      }).rejects.toThrowError("not implemented");
    });

    it("should apply lenticular to two objekts", async () => {
      const response = await cosmo.objekts.applyLenticular("A", "B");
      expect(response).toEqual(true);
    });

    it("should remove lenticular from an objekt", async () => {
      const response = await cosmo.objekts.removeLenticular("A");
      expect(response).toEqual(true);
    });
  });

  describe("unauthenticated", () => {
    it("filters should throw an error", async () => {
      await expect(cosmo.objekts.filters()).rejects.toThrowError(
        new AccessTokenMissing()
      );
    });

    it("getting an objekt by its qr code should throw an error", async () => {
      await expect(cosmo.objekts.getBySerial("1234")).rejects.toThrowError(
        new AccessTokenMissing()
      );
    });

    it("claiming an objekt by its qr code should throw an error", async () => {
      await expect(cosmo.objekts.claimBySerial("1234")).rejects.toThrowError(
        new AccessTokenMissing()
      );
    });

    it("applying lenticular to two objekts should throw an error", async () => {
      await expect(
        cosmo.objekts.applyLenticular("A", "B")
      ).rejects.toThrowError(new AccessTokenMissing());
    });

    it("removing lenticular from an objekt should throw an error", async () => {
      await expect(cosmo.objekts.removeLenticular("A")).rejects.toThrowError(
        new AccessTokenMissing()
      );
    });
  });

  describe("invalid token", () => {
    beforeEach(() => {
      cosmo.setAccessToken("someInvalidAccessToken");
      server.use(unauthorizedHandler);
    });

    it("filters should handle unauthorized requests", async () => {
      await expect(cosmo.objekts.filters()).rejects.toThrowError(
        new UnauthorizedError("missing Authorization header")
      );
    });

    it("getting an objekt by its qr code should handle unauthorized requests", async () => {
      await expect(cosmo.objekts.getBySerial("1234")).rejects.toThrowError(
        new UnauthorizedError("missing Authorization header")
      );
    });

    it("claiming an objekt by its qr code should handle unauthorized requests", async () => {
      await expect(cosmo.objekts.claimBySerial("1234")).rejects.toThrowError(
        new Error("not implemented")
      );
    });

    it("applying lenticular to two objekts should handle unauthorized requests", async () => {
      await expect(
        cosmo.objekts.applyLenticular("A", "B")
      ).rejects.toThrowError(
        new UnauthorizedError("missing Authorization header")
      );
    });

    it("removing lenticular from an objekt should handle unauthorized requests", async () => {
      await expect(cosmo.objekts.removeLenticular("A")).rejects.toThrowError(
        new UnauthorizedError("missing Authorization header")
      );
    });
  });

  it("should list the users 30 newest objekts", async () => {
    await expect(() => {
      return cosmo.objekts.ownedBy("0xABCDEF");
    }).rejects.toThrowError("not implemented");
  });

  it("should return the token by its id", async () => {
    const response = await cosmo.objekts.token("1234");
    expect(response).toEqual(json.token);
  });
});
