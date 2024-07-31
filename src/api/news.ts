import { ValidArtist } from "./artist";
import { BaseAPI } from "./base-api";

export class NewsAPI extends BaseAPI {
  /**
   * Get home page news sections for the given artist.
   *
   * Authentication is required.
   */
  async home(artist: ValidArtist) {
    return await this.request<{ sections: News.NewsSection[] }>(
      `/news/v1?artist=${artist}`
    ).then((res) => res.sections);
  }

  /**
   * Get the news feed for the given artist.
   *
   * Authentication is not required.
   */
  async feed({ artist, startAfter, limit }: News.NewsPayload) {
    const params = new URLSearchParams({
      artist: artist,
    });

    if (startAfter) {
      params.append("start_after", startAfter.toString());
    }

    if (limit) {
      params.append("limit", limit.toString());
    }

    return await this.request<News.NewsFeedResult<News.NewsSectionFeedContent>>(
      `/news/v1/feed?${params.toString()}`
    );
  }

  /**
   * Get the exclusive news feed for the given artist.
   *
   * Authentication is not required.
   */
  async exclusive({ artist, startAfter, limit }: News.NewsPayload) {
    const params = new URLSearchParams({
      artist: artist,
    });

    if (startAfter) {
      params.append("start_after", startAfter.toString());
    }

    if (limit) {
      params.append("limit", limit.toString());
    }

    return await this.request<
      News.NewsFeedResult<News.NewsSectionExclusiveContent>
    >(`/news/v1/exclusive?${params.toString()}`);
  }
}

export namespace News {
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
}
