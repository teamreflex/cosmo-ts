import { expect, test } from "vitest";
import { Cosmo } from "../src";
import { server } from "./setup";
import { getUserUnauthorized, json } from "./mocks";
import { CosmoUnauthenticatedError } from "../src/error";

test("unauthenticated client should error when fetching user", async () => {
  server.use(getUserUnauthorized);

  const cosmo = new Cosmo();
  expect(() => cosmo.getUser()).rejects.toThrowError(
    new CosmoUnauthenticatedError()
  );
});

test("fetches the user", async () => {
  const cosmo = new Cosmo({ accessToken: "accessToken" });
  const result = await cosmo.getUser();
  expect(result).toEqual(json.getUser.profile);
});
