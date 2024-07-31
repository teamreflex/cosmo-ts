import { describe, it, expect, beforeEach } from "vitest";
import { CosmoClient, createClient } from "../../src/client";
import json from "../mocks.json";

describe("SeasonAPI", () => {
  let cosmo: CosmoClient;
  beforeEach(() => {
    cosmo = createClient({});
  });

  it("should list seasons", async () => {
    const response = await cosmo.seasons.list("ARTMS");
    expect(response).toEqual(json.getSeasons);
  });
});
