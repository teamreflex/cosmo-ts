import { randomUUID } from "crypto";
import { BaseAPI } from "./base-api";
import { AccessTokenMissing } from "../errors";

export class ArtistAPI extends BaseAPI {
  /**
   * Get the list of artists available.
   *
   * Authentication is not required.
   */
  async list() {
    const response = await this.request<{
      artists: Artist.Artist[];
    }>("/artist/v1");

    if (!response.artists) {
      return [];
    }

    return response.artists;
  }

  /**
   * Get a single artist.
   *
   * Authentication is not required.
   */
  async get(artist: ValidArtist) {
    return await this.request<{
      artist: Artist.ArtistWithMembers;
    }>(`/artist/v1/${artist}`).then((res) => res.artist);
  }

  /**
   * Get a single artist from the backend for frontend endpoint.
   *
   * Authentication is required.
   */
  async bffGet(artist: ValidArtist) {
    if (!this.config.accessToken) {
      throw new AccessTokenMissing();
    }

    const params = new URLSearchParams({
      artistName: artist,
      tid: randomUUID(),
    });

    return await this.request<{
      artist: Artist.BFFArtist;
    }>(`/bff/v1/artist?${params.toString()}`);
  }
}

/**
 * The list of artists available.
 *
 * `(string & {})` allows any string through while giving typesafety on known artists.
 */
export const validArtists = ["tripleS", "ARTMS"] as const;
export type ValidArtist = (typeof validArtists)[number] | (string & {});

export namespace Artist {
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

  export type BFFArtist = Artist & {
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    activeAt: string;
    order: number;
  };
}
