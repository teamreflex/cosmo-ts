import { expect, test } from "vitest";
import { Cosmo } from "../src";
import { json } from "./mocks";

test("fetches seasons", async () => {
  const cosmo = new Cosmo();
  const result = await cosmo.getSeasons("artms");
  expect(result).toEqual(json.getSeason);
});
