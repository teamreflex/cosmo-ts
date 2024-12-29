import { ValidArtist } from "../types/artist-common";
import { BaseAPI } from "./base-api";

/**
 * @deprecated Use `Artist` instead.
 */
export class LegacyArtistAPI extends BaseAPI {
  /**
   * Get the list of artists available.
   * Authentication is not required.
   * @deprecated Use `Artist.list` instead.
   */
  async list() {
    const response = await this.request<{
      artists: LegacyArtist.Artist[];
    }>("/artist/v1");

    if (!response.artists) {
      return [];
    }

    return response.artists;
  }

  /**
   * Get a single artist.
   * Authentication is not required.
   * @deprecated Use `Artist.get` instead.
   */
  async get(artist: ValidArtist) {
    return await this.request<{
      artist: LegacyArtist.ArtistWithMembers;
    }>(`/artist/v1/${artist}`).then((res) => res.artist);
  }
}

export namespace LegacyArtist {
  export type Artist = {
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
    mainObjektImageUrl: string;
    order: number;
  };

  export type ArtistWithMembers = Artist & {
    members: Member[];
  };
}
