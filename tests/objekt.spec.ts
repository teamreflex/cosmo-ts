import { describe, it, expect, beforeEach } from "vitest";
import { CosmoClient } from "../src/client";
import { json } from "./mocks";

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
});
