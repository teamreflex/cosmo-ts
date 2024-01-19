import { Config } from "../config";
import { CosmoClient } from "../client";
import { ValidArtist } from "./artist";

export class NewsAPI {
  constructor(private config: Config) {}

  /**
   * Get home page news sections for the given artist.
   */
  async home(artist: ValidArtist): Promise<NewsSection[]> {
    return await CosmoClient.request<{ sections: NewsSection[] }>(
      `/news/v1?artist=${artist}`,
      this.config
    ).then((res) => res.sections);
  }

  /**
   * Get the news feed for the given artist.
   */
  async feed({
    artist,
    startAfter,
    limit,
  }: NewsPayload): Promise<NewsFeedResult<NewsSectionFeedContent>> {
    const params = new URLSearchParams({
      artist: artist,
    });

    if (startAfter) {
      params.append("start_after", startAfter.toString());
    }

    if (limit) {
      params.append("limit", limit.toString());
    }

    return await CosmoClient.request<NewsFeedResult<NewsSectionFeedContent>>(
      `/news/v1/feed?${params.toString()}`,
      this.config
    );
  }

  /**
   * Get the exclusive news feed for the given artist.
   */
  async exclusive({
    artist,
    startAfter,
    limit,
  }: NewsPayload): Promise<NewsFeedResult<NewsSectionExclusiveContent>> {
    const params = new URLSearchParams({
      artist: artist,
    });

    if (startAfter) {
      params.append("start_after", startAfter.toString());
    }

    if (limit) {
      params.append("limit", limit.toString());
    }

    return await CosmoClient.request<
      NewsFeedResult<NewsSectionExclusiveContent>
    >(`/news/v1/exclusive?${params.toString()}`, this.config);
  }
}

export type NewsPayload = {
  artist: ValidArtist;
  startAfter?: number;
  limit?: number;
};

export type NewsSectionBar = {
  type: "bar";
  artist: ValidArtist;
  contents: [];
};

export type NewsSectionBanner = {
  type: "banner";
  artist: ValidArtist;
  contents: NewsSectionBannerContent[];
};
export type NewsSectionBannerContent = {
  id: number;
  url: string;
  createdAt: string;
  label: "release" | "event" | "notice";
  order: number;
  body: string;
  imageUrl: string;
};

export type NewsSectionFeed = {
  type: "feed";
  artist: ValidArtist;
  title: string;
  contents: NewsSectionFeedContent[];
};
export type NewsSectionFeedContent = {
  id: number;
  url: string;
  createdAt: string;
  artist: ValidArtist;
  logoImageUrl: string;
  body: string;
  imageUrls: string[];
};

export type NewsSectionExclusive = {
  type: "exclusive";
  artist: ValidArtist;
  title: string;
  contents: NewsSectionExclusiveContent[];
};
export type NewsSectionExclusiveContent = {
  id: number;
  url: string;
  createdAt: string;
  title: string;
  body: string;
  thumbnailImageUrl: string;
  nativeVideoUrl: string;
};

export type NewsSection =
  | NewsSectionBar
  | NewsSectionBanner
  | NewsSectionFeed
  | NewsSectionExclusive;

export type NewsFeedResult<TPostType> = {
  hasNext: boolean;
  total: number;
  nextStartAfter: string;
  results: TPostType[];
};
