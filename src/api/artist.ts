import { BaseAPI } from "./base-api";
import { AccessTokenMissing } from "../errors";
import { ValidArtist } from "../types/artist-common";

export class ArtistAPI extends BaseAPI {
  /**
   * List all artists.
   * Authentication is not required.
   */
  async list() {
    return await this.request<Artist.Artist[]>(`/bff/v3/artists`);
  }

  /**
   * Get a single artist.
   * Authentication is not required.
   */
  async get(artist: ValidArtist) {
    return await this.request<Artist.ArtistWithMembers>(
      `/bff/v3/artists/${artist}`
    );
  }

  /**
   * Get a single artist.
   * Authentication is required.
   * @deprecated Use `get` instead.
   */
  async getV1(artist: ValidArtist) {
    if (!this.config.accessToken) {
      throw new AccessTokenMissing();
    }

    const params = new URLSearchParams({
      artistName: artist,
      tid: crypto.randomUUID(),
    });

    return await this.request<Artist.ArtistV1>(
      `/bff/v1/artist?${params.toString()}`
    );
  }
}

export namespace Artist {
  export type Artist = {
    id: string;
    name: string;
    title: string;
    fandomName: string;
    logoImageUrl: string;
    contracts: {
      Como: string;
      Objekt: string;
      ObjektMinter: string;
      Governor: string;
      CommunityPool: string;
      ComoMinter: string;
    };
  };

  export type Member = {
    id: number;
    name: string;
    artist: ValidArtist;
    units: string[];
    alias: string;
    profileImageUrl: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    mainObjektImageUrl: string;
    artistId: string;
    primaryColorHex: string;
  };

  export type SNSLink = {
    name: string;
    address: string;
  };

  export type ArtistWithMembers = Artist & {
    artistMembers: Member[];
    snsLink: {
      discord: SNSLink;
      instagram: SNSLink;
      twitter: SNSLink;
      youtube: SNSLink;
      tiktok: SNSLink;
    };
  };

  export type ArtistV1 = Omit<Artist, "id"> & {
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    activeAt: string;
    order: number;
  };
}
