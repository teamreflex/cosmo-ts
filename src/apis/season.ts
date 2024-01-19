import { Config } from "../config";
import { CosmoClient } from "../client";
import { ValidArtist } from "./artist";

export class SeasonAPI {
  constructor(private config: Config) {}

  /**
   * Get the seasons for the given artist.
   */
  async list(artist: ValidArtist): Promise<SeasonResponse> {
    return await CosmoClient.request<SeasonResponse>(
      `/season/v2/${artist}`,
      this.config
    );
  }
}

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

export type SeasonResponse = {
  seasons: Season[];
  currentSeason: OngoingSeason;
};
