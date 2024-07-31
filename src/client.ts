import { ArtistAPI } from "./api/artist";
import { AuthAPI } from "./api/auth";
import { NewsAPI } from "./api/news";
import { ObjektAPI } from "./api/objekt";
import { SeasonAPI } from "./api/season";
import { UserAPI } from "./api/user";
import { Config } from "./config";

export class CosmoClient {
  private config: Config;
  public artists: ArtistAPI;
  public auth: AuthAPI;
  public seasons: SeasonAPI;
  public users: UserAPI;
  public news: NewsAPI;
  public objekts: ObjektAPI;

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
    this.objekts = new ObjektAPI(this.config);
  }

  /**
   * Merge a new config object into the existing one.
   */
  setConfig(config: Config) {
    this.config = {
      ...this.config,
      ...config,
    };
  }

  /**
   * Set the access token for the client.
   */
  setAccessToken(accessToken: string | undefined) {
    this.config.accessToken = accessToken;
  }
}

export function createClient(config: Config): CosmoClient {
  return new CosmoClient(config);
}
