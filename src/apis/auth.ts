import { Config } from "../config";
import { CosmoClient } from "../client";

export class AuthAPI {
  constructor(private config: Config) {}

  /**
   * Sign in with Ramper credentials.
   */
  async signIn(payload: LoginPayload): Promise<LoginResult> {
    return await CosmoClient.request<LoginResult>(
      "/auth/v1/signin",
      this.config,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  }

  /**
   * Refresh an access token.
   */
  async refreshToken(payload: RefreshPayload): Promise<RefreshResult> {
    return await CosmoClient.request<RefreshResult>(
      "/auth/v1/refresh",
      this.config,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  }
}

export type LoginPayload = {
  channel: "email";
  email: string;
  accessToken: string;
};

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

export type RefreshPayload = {
  refreshToken: string;
};

export type RefreshResult = {
  credentials: {
    refreshToken: string;
    accessToken: string;
  };
};
