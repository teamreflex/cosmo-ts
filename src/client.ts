import { ArtistAPI } from "./apis/artist";
import { AuthAPI } from "./apis/auth";
import { NewsAPI } from "./apis/news";
import { SeasonAPI } from "./apis/season";
import { UserAPI } from "./apis/user";
import { Config } from "./config";
import {
  CosmoError,
  CosmoErrorResponse,
  TokenExpiredError,
  UnauthorizedError,
} from "./errors";

export class CosmoClient {
  private config: Config;
  public artists: ArtistAPI;
  public auth: AuthAPI;
  public seasons: SeasonAPI;
  public users: UserAPI;
  public news: NewsAPI;

  constructor(config: Config) {
    this.config = {
      baseUrl: "https://api.cosmo.fans",
      ...config,
    };

    this.artists = new ArtistAPI(this.config);
    this.auth = new AuthAPI(this.config);
    this.seasons = new SeasonAPI(this.config);
    this.users = new UserAPI(this.config);
    this.news = new NewsAPI(this.config);
  }

  static async request<T>(
    url: string,
    config: Config,
    options: RequestInit = {}
  ) {
    const response = await fetch(new URL(url, config.baseUrl), {
      ...options,
      headers: {
        ...options.headers,
        ...(config.accessToken
          ? { Authorization: `Bearer ${config.accessToken}` }
          : {}),
      },
    });

    if (response.ok === false) {
      try {
        const body: CosmoErrorResponse = await response.json();
        switch (response.status) {
          case 401:
            throw new UnauthorizedError(body.error.details);
          case 403:
            throw new TokenExpiredError(body.error.details);
        }
      } catch (err) {
        if (err instanceof CosmoError) {
          throw err;
        }
        throw new CosmoError(`status: ${response.status}, error: ${err}`);
      }
    }

    return response.json() as T;
  }
}

export function createClient(config: Config): CosmoClient {
  return new CosmoClient(config);
}
