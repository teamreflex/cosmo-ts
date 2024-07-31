import { describe, it, expect, beforeEach } from "vitest";
import { CosmoClient } from "../../src/client";
import { getUserUnauthorized } from "../mocks";
import { server } from "../setup";
import { UnauthorizedError } from "../../src/errors";
import json from "../mocks.json";

describe("UserAPI", () => {
  let cosmo: CosmoClient;

  beforeEach(() => {
    cosmo = new CosmoClient({});
  });

  it("should get the currently authenticated user", async () => {
    const response = await cosmo.users.me();
    expect(response).toEqual(json.getUser.profile);
  });

  it("should error when unauthenticated", async () => {
    server.use(getUserUnauthorized);

    expect(() => cosmo.users.me()).rejects.toThrowError(
      new UnauthorizedError("missing Authorization header")
    );
  });

  it("should search for users", async () => {
    const response = await cosmo.users.search("example");
    expect(response).toEqual(json.search);
  });

  it("should get a user by their nickname", async () => {
    const response = await cosmo.users.byNickname("example");
    expect(response).toEqual(json.byNickname);
  });
});
