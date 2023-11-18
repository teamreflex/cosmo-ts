import { Artist, ArtistWithMembers, ValidArtist } from "./api/artists";
import {
  LoginPayload,
  LoginResult,
  RefreshPayload,
  RefreshResult,
} from "./api/auth";
import { SearchResult, User } from "./api/user";
import {
  HomeNewsResult,
  NewsFeedResult,
  NewsSectionExclusiveContent,
  NewsSectionFeedContent,
  SeasonResponse,
} from "./types";

export interface CosmoContract {
  /**
   * Fetch all artists within Cosmo.
   */
  getArtists(): Promise<Artist[]>;

  /**
   * Fetch a single artist and its members.
   */
  getArtist(artist: ValidArtist): Promise<ArtistWithMembers>;

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

  /**
   * Fetch news on the home page for the given artist.
   */
  getHomeNews(artist: ValidArtist): Promise<HomeNewsResult>;

  /**
   * Fetch the news feed for the given artist.
   */
  getAtmosphereFeed(
    artist: ValidArtist,
    options?: { startAfter?: number; limit?: number }
  ): Promise<NewsFeedResult<NewsSectionFeedContent>>;

  /**
   * Fetch the exclusive feed for the given artist.
   */
  getExclusiveFeed(
    artist: ValidArtist,
    options?: { startAfter?: number; limit?: number }
  ): Promise<NewsFeedResult<NewsSectionExclusiveContent>>;

  /**
   * Get the past and current seasons for the given artist.
   */
  getSeasons(artist: ValidArtist): Promise<SeasonResponse>;
}
