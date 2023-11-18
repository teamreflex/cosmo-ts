import { expect, test } from "vitest";
import { Cosmo } from "../src";
import { json } from "./mocks";

test("logs the user in", async () => {
  const cosmo = new Cosmo();
  const result = await cosmo.login({
    channel: "email",
    email: "test@example.com",
    accessToken: "accessToken",
  });
  expect(result).toEqual(json.login);
});

test("refreshes a token", async () => {
  const cosmo = new Cosmo();
  const result = await cosmo.refreshToken({ refreshToken: "refreshToken" });
  expect(result).toEqual(json.refreshToken);
});
