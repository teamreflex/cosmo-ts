import { AccessTokenMissing } from "../errors";
import { ValidArtist } from "../types/artist-common";
import { Artist } from "./artist";
import { BaseAPI } from "./base-api";
import { LegacyArtist } from "./legacy-artist";

export class UserAPI extends BaseAPI {
  /**
   * Get the currently authenticated user.
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
   * Get the currently authenticated user.
   * Authentication is required.
   */
  async meBff() {
    if (!this.config.accessToken) {
      throw new AccessTokenMissing();
    }

    const params = new URLSearchParams({
      tid: crypto.randomUUID(),
    });

    return await this.request<User.UserBFF>(
      `/bff/v1/users/me?${params.toString()}`
    );
  }

  /**
   * Search for users.
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
   * Authentication is not required.
   */
  async byNickname(nickname: string) {
    return await this.request<Omit<Search.SearchResult, "profile">>(
      `/user/v1/by-nickname/${nickname}`
    );
  }

  /**
   * Update the current user's device profile.
   * Authentication is required.
   */
  async updateDeviceProfile(profile: User.DeviceProfile) {
    if (!this.config.accessToken) {
      throw new AccessTokenMissing();
    }

    return await this.request<boolean>(`/user/v1/me/device-profile`, {
      method: "PUT",
      body: JSON.stringify(profile),
    });
  }
}

export namespace User {
  export type User = {
    id: number;
    guid: string;
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

  export type FollowedArtist = LegacyArtist.Artist & {
    receivedWelcomeObjekt: boolean;
    purchaseCount: number;
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

  export type UserBFF = {
    id: number;
    nickname: string;
    address: string;
    profileImageUrl: string;
    birth: string;
    loginChannel: "email";
    socialLoginUserId: string | null;
    isBanned: boolean;
    marketingConsentDate: string | null;
    lastViewedArtist: ValidArtist;
    lastActiveAt: string;
    locale: string;
    country: string;
    os: string;
    appVersion: string;
    createdAt: string;
    updatedAt: string;
    artists: Artist.ArtistV1[];
    profileImages: {
      artistName: ValidArtist;
      profileImageUrl: string;
    }[];
  };

  export type DeviceProfile = {
    locale: string;
    country: string;
    os: string;
    appVersion: string;
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
