import { expect, test } from "vitest";
import { Cosmo } from "../src";
import { json } from "./mocks";

test("fetches home page news", async () => {
  const cosmo = new Cosmo();
  const result = await cosmo.getHomeNews("artms");
  expect(result).toEqual(json.newsHome);
});

test("fetches atmosphere feed", async () => {
  const cosmo = new Cosmo();
  const result = await cosmo.getAtmosphereFeed("artms", { limit: 3 });
  expect(result).toEqual(json.newsFeed);
});

test("fetches exclusive feed", async () => {
  const cosmo = new Cosmo();
  const result = await cosmo.getExclusiveFeed("artms");
  expect(result).toEqual(json.newsExclusive);
});
