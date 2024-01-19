import { describe, it, expect, beforeEach } from "vitest";
import { CosmoClient } from "../src/client";
import { getFeedNewsParams, json } from "./mocks";
import { server } from "./setup";

describe("NewsAPI", () => {
  let cosmo: CosmoClient;

  beforeEach(() => {
    cosmo = new CosmoClient({});
  });

  it("should list the home page news", async () => {
    const response = await cosmo.news.home("ARTMS");
    expect(response).toEqual(json.newsHome.sections);
  });

  it("should list the news feed", async () => {
    const response = await cosmo.news.feed({ artist: "ARTMS" });
    expect(response).toEqual(json.newsFeed);
  });

  it("should list the exclusive feed", async () => {
    const response = await cosmo.news.exclusive({ artist: "ARTMS" });
    expect(response).toEqual(json.newsExclusive);
  });

  it("should pass search params correctly", async () => {
    server.use(getFeedNewsParams);
    const response = await cosmo.news.feed({ artist: "ARTMS", startAfter: 3 });
    expect(response).toEqual({
      ...json.newsFeed,
      nextStartAfter: "6",
    });
  });
});
