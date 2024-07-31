import { describe, it, expect, beforeEach } from "vitest";
import { CosmoClient } from "../../src/client";
import json from "../mocks.json";

describe("ObjektAPI", () => {
  let cosmo: CosmoClient;

  beforeEach(() => {
    cosmo = new CosmoClient({});
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
    expect(() => {
      return cosmo.objekts.claimBySerial("1234");
    }).rejects.toThrowError("not implemented");
  });

  it("should list the users 30 newest objekts", async () => {
    expect(() => {
      return cosmo.objekts.ownedBy("0xABCDEF");
    }).rejects.toThrowError("not implemented");
  });

  it("should return the token by its id", async () => {
    const response = await cosmo.objekts.token("1234");
    expect(response).toEqual(json.token);
  });

  it("should apply lenticular to two objekts", async () => {
    expect(() => {
      return cosmo.objekts.applyLenticular("A", "B");
    }).rejects.toThrowError("not implemented");
  });

  it("should remove lenticular from an objekt", async () => {
    expect(() => {
      return cosmo.objekts.removeLenticular("A");
    }).rejects.toThrowError("not implemented");
  });
});
