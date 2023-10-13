import { ValidArtist } from "./api/artists";
import { createDefaultFetcher, typedRouter } from "./router";

type CosmoConfig = {
  accessToken?: string;
  fetcher?: ReturnType<typeof createDefaultFetcher>;
};

export class Cosmo {
  private client: ReturnType<typeof typedRouter>;

  constructor({ accessToken, fetcher }: CosmoConfig = {}) {
    this.client = typedRouter(fetcher ?? createDefaultFetcher(accessToken));
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
}
