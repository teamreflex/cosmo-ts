import { ValidArtist } from "./api/artists";
import { LoginPayload, RefreshPayload } from "./api/auth";
import { CosmoContract } from "./interface";
import { createDefaultFetcher, typedRouter } from "./router";

type CosmoConfig = {
  accessToken?: string;
  maxRetries?: number;
  fetcher?: ReturnType<typeof createDefaultFetcher>;
};

export class Cosmo implements CosmoContract {
  private client: ReturnType<typeof typedRouter>;

  constructor({ accessToken, maxRetries, fetcher }: CosmoConfig = {}) {
    this.client = typedRouter(
      fetcher ?? createDefaultFetcher({ accessToken, maxRetries })
    );
  }

  async getArtists() {
    const result = await this.client("/artist/v1", "GET");
    return result.artists;
  }

  async getArtist(artist: ValidArtist) {
    const result = await this.client("/artist/v1/:artist", "GET", { artist });
    return result.artist;
  }

  async getUser() {
    const result = await this.client("/user/v1/me", "GET");
    return result.profile;
  }

  async searchUser(query: string) {
    const result = await this.client("/user/v1/search", "GET", { query });
    return result.results;
  }

  async login(payload: LoginPayload) {
    return await this.client("/auth/v1/signin", "POST", payload);
  }

  async refreshToken(payload: RefreshPayload) {
    return await this.client("/auth/v1/refresh", "POST", payload);
  }

  async getHomeNews(artist: ValidArtist) {
    return await this.client("/news/v1", "GET", { artist });
  }

  async getAtmosphereFeed(
    artist: ValidArtist,
    options?: { startAfter?: number; limit?: number }
  ) {
    return await this.client("/news/v1/feed", "GET", {
      artist,
      start_after: options?.startAfter,
      limit: options?.limit,
    });
  }

  async getExclusiveFeed(
    artist: ValidArtist,
    options?: { startAfter?: number; limit?: number }
  ) {
    return await this.client("/news/v1/exclusive", "GET", {
      artist,
      start_after: options?.startAfter,
      limit: options?.limit,
    });
  }

  async getSeasons(artist: ValidArtist) {
    return await this.client("/season/v2/:artist", "GET", { artist });
  }
}
