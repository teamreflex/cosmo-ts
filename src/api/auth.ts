import { z } from "zod";
import { BaseAPI } from "./base-api";
import { signInSchema } from "../zod/auth";

export class AuthAPI extends BaseAPI {
  /**
   * Sign in with Ramper credentials.
   * Authentication is not required.
   */
  async signIn(payload: Auth.LoginPayload) {
    return await this.request<Auth.LoginResult>("/auth/v1/signin", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  /**
   * Refresh an access token.
   * Authentication is not required.
   */
  async refreshToken(refreshToken: string) {
    return await this.request<Auth.RefreshResult>("/auth/v1/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
  }
}

export namespace Auth {
  export type LoginPayload = z.infer<typeof signInSchema>;

  export type LoginResult = {
    user: {
      id: number;
      email: string;
      nickname: string;
      address: string;
      profileImageUrl: string;
    };
    credentials: {
      accessToken: string;
      refreshToken: string;
    };
  };

  export type RefreshResult = {
    credentials: {
      refreshToken: string;
      accessToken: string;
    };
  };
}
