import { ValidArtist } from "./artist";
import { BaseAPI } from "./base-api";

export class SeasonAPI extends BaseAPI {
  /**
   * Get the seasons for the given artist.
   *
   * Authentication is not required.
   */
  async list(artist: ValidArtist) {
    return await this.request<{
      seasons: Season.Season[];
      currentSeason: Season.OngoingSeason;
    }>(`/season/v2/${artist}`);
  }
}

export namespace Season {
  export type OngoingSeason = {
    artist: string;
    title: string;
    image: string | null;
    startDate: string;
    endDate: null;
    ongoing: true;
  };

  export type EndedSeason = {
    artist: string;
    title: string;
    image: string | null;
    startDate: string;
    endDate: string;
    ongoing: false;
  };

  export type Season = OngoingSeason | EndedSeason;
}
