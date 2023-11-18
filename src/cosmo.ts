import { ValidArtist } from "./api/artists";
import { createDefaultFetcher, typedRouter } from "./router";

type CosmoConfig = {
  accessToken?: string;
  maxRetries?: number;
  fetcher?: ReturnType<typeof createDefaultFetcher>;
};

export class Cosmo {
  private client: ReturnType<typeof typedRouter>;

  constructor({ accessToken, maxRetries, fetcher }: CosmoConfig = {}) {
    this.client = typedRouter(
      fetcher ?? createDefaultFetcher({ accessToken, maxRetries })
    );
  }

  /**
   * Fetch all artists within Cosmo.
   */
  async getArtists() {
    const result = await this.client("/artist/v1", "GET");
    return result.artists;
  }

  /**
   * Fetch a single artist and its members.
   */
  async getArtist(artist: ValidArtist) {
    const result = await this.client("/artist/v1/:artist", "GET", { artist });
    return result.artist;
  }

  /**
   * Fetch the currently authenticated user.
   */
  async getUser() {
    const result = await this.client("/user/v1/me", "GET");
    return result.profile;
  }
}
