import { Config } from "../config";
import { CosmoClient } from "../client";

export class ArtistAPI {
  constructor(private config: Config) {}

  /**
   * Get the list of artists available.
   */
  async list(): Promise<Artist[]> {
    const response = await CosmoClient.request<{
      artists: Artist[];
    }>("/artist/v1", this.config);

    if (!response.artists) {
      return [];
    }

    return response.artists;
  }

  /**
   * Get a single artist.
   */
  async get(artist: ValidArtist): Promise<ArtistWithMembers> {
    const response = await CosmoClient.request<{
      artist: ArtistWithMembers;
    }>(`/artist/v1/${artist}`, this.config);

    if (!response.artist) {
      throw new ArtistNotFoundError(artist);
    }

    return response.artist;
  }
}

/**
 * The list of artists available.
 *
 * `(string & {})` allows any string through while giving typesafety on known artists.
 */
export type ValidArtist = "tripleS" | "ARTMS" | (string & {});

export type Artist = {
  name: string;
  title: string;
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
  name: string;
  artist: string;
  units: string[];
  alias: string;
  profileImageUrl: string;
  mainObjektImageUrl: string;
  order: number;
};

export type ArtistWithMembers = Artist & {
  members: Member[];
};

export class ArtistNotFoundError extends Error {
  constructor(artist: string) {
    super(`Artist not found: ${artist}`);
  }
}
