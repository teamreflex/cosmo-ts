import { Config } from "../config";
import { CosmoClient } from "../client";
import { Artist, ValidArtist } from "./artist";

export class UserAPI {
  constructor(private config: Config) {}

  /**
   * Get the currently authenticated user.
   */
  async me(): Promise<User> {
    return await CosmoClient.request<{ profile: User }>(
      `/user/v1/me`,
      this.config
    ).then((res) => res.profile);
  }

  /**
   * Search for users.
   */
  async search(query: string): Promise<SearchResponse> {
    return await CosmoClient.request<SearchResponse>(
      `/user/v1/search?query=${query}`,
      this.config
    );
  }
}

export type User = {
  id: number;
  email: string;
  nickname: string;
  address: string;
  birth: string;
  profileImageUrl: string;
  isEligibleForWelcomeObjekt: boolean;
  followingArtists: FollowedArtist[];
  lastViewedArtist: ValidArtist;
  marketingConsentDate: string | null;
  createdAt: string;
};

export type FollowedArtist = Artist & {
  receivedWelcomeObjekt: boolean;
  assetBalance: {
    totalComo: number;
    totalObjekt: number;
  };
};

export type SearchResponse = {
  hasNext: boolean;
  results: SearchResult[];
};

export type SearchResult = {
  nickname: string;
  address: string;
  profileImageUrl: string;
};
