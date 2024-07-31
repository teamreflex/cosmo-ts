import { AccessTokenMissing } from "../errors";
import { Artist, ValidArtist } from "./artist";
import { BaseAPI } from "./base-api";

export class UserAPI extends BaseAPI {
  /**
   * Get the currently authenticated user.
   *
   * Authentication is required.
   */
  async me() {
    if (!this.config.accessToken) {
      throw new AccessTokenMissing();
    }

    return await this.request<{ profile: User.User }>(`/user/v1/me`).then(
      (res) => res.profile
    );
  }

  /**
   * Search for users.
   *
   * Authentication is required.
   */
  async search(query: string) {
    if (!this.config.accessToken) {
      throw new AccessTokenMissing();
    }

    return await this.request<Search.SearchResponse>(
      `/user/v1/search?query=${query}`
    );
  }

  /**
   * Get a search result by nickname.
   *
   * Authentication is not required.
   */
  async byNickname(nickname: string) {
    return await this.request<Omit<Search.SearchResult, "profile">>(
      `/user/v1/by-nickname/${nickname}`
    );
  }
}

export namespace User {
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
    profile: Profile[];
  };

  export type FollowedArtist = Artist.Artist & {
    receivedWelcomeObjekt: boolean;
    assetBalance: {
      totalComo: number;
      totalObjekt: number;
    };
  };

  export type Profile = {
    artistName: ValidArtist;
    image: {
      original: string;
      thumbnail: string;
    };
  };
}

export namespace Search {
  export type SearchResponse =
    | {
        hasNext: true;
        nextStartAfter: string;
        results: SearchResult[];
      }
    | {
        hasNext: false;
        results: SearchResult[];
      };

  export type SearchResult = {
    nickname: string;
    address: string;
    profileImageUrl: string;
    profile: User.Profile[];
  };
}
