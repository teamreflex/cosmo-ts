import { Artist, ArtistWithMembers } from "./api/artists";
import {
  LoginPayload,
  LoginResult,
  RefreshPayload,
  RefreshResult,
} from "./api/auth";
import { SearchResult, User } from "./api/user";

export interface CosmoContract {
  /**
   * Fetch all artists within Cosmo.
   */
  getArtists(): Promise<Artist[]>;

  /**
   * Fetch a single artist and its members.
   */
  getArtist(artist: string): Promise<ArtistWithMembers>;

  /**
   * Fetch the currently authenticated user.
   */
  getUser(): Promise<User>;

  /**
   * Search for users.
   */
  searchUser(query: string): Promise<SearchResult[]>;

  /**
   * Log into Cosmo using an email and Ramper access token.
   */
  login(payload: LoginPayload): Promise<LoginResult>;

  /**
   * Log into Cosmo using an email and Ramper access token.
   */
  refreshToken(payload: RefreshPayload): Promise<RefreshResult>;
}
