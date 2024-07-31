import { Config } from "./config";
import { ArtistAPI } from "./api/artist";
import { AuthAPI } from "./api/auth";
import { GridAPI } from "./api/grid";
import { NewsAPI } from "./api/news";
import { ObjektAPI } from "./api/objekt";
import { RewardsAPI } from "./api/rewards";
import { SeasonAPI } from "./api/season";
import { UserAPI } from "./api/user";

export class CosmoClient {
  private config: Config;
  public artists: ArtistAPI;
  public auth: AuthAPI;
  public seasons: SeasonAPI;
  public users: UserAPI;
  public news: NewsAPI;
  public objekts: ObjektAPI;
  public rewards: RewardsAPI;
  public grid: GridAPI;

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
    this.rewards = new RewardsAPI(this.config);
    this.grid = new GridAPI(this.config);
  }

  /**
   * Set the access token for the client.
   */
  setAccessToken(accessToken: string | undefined) {
    this.config.accessToken = accessToken;
  }
}

/**
 * Create a new instance of the client.
 */
export function createClient(config?: Config): CosmoClient {
  return new CosmoClient(config ?? {});
}
