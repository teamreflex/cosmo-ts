import { describe, it, expect, beforeEach } from "vitest";
import { CosmoClient } from "../src/client";
import { json } from "./mocks";

describe("SeasonAPI", () => {
  let cosmo: CosmoClient;

  beforeEach(() => {
    cosmo = new CosmoClient({});
  });

  it("should list seasons", async () => {
    const response = await cosmo.seasons.list("ARTMS");
    expect(response).toEqual(json.getSeasons);
  });
});
