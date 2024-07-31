import { describe, it, expect, beforeEach } from "vitest";
import { CosmoClient } from "../../src/client";
import json from "../mocks.json";

describe("AuthAPI", () => {
  let cosmo: CosmoClient;

  beforeEach(() => {
    cosmo = new CosmoClient({});
  });

  it("should sign in successfully", async () => {
    const response = await cosmo.auth.signIn({
      channel: "email",
      email: "email@example.com",
      accessToken: "ramperIdToken",
    });

    expect(response).toEqual(json.login);
  });

  it("should refresh the token successfully", async () => {
    const response = await cosmo.auth.refreshToken("someRefeshToken");
    expect(response).toEqual(json.refreshToken);
  });
});
