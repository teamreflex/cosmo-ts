import { z } from "zod";
import { LegacyArtist, ValidArtist } from "./legacy-artist";
import { BaseAPI } from "./base-api";
import { bffNewsFeedSchema, newsFeedSchema } from "../zod/news";
import { AccessTokenMissing } from "../errors";
import { randomUUID } from "crypto";

export class NewsAPI extends BaseAPI {
  /**
   * Get home page news sections for the given artist.
   *
   * Authentication is required.
   */
  async home(artist: ValidArtist) {
    if (!this.config.accessToken) {
      throw new AccessTokenMissing();
    }

    return await this.request<{ sections: News.Section[] }>(
      `/news/v1?artist=${artist}`
    ).then((res) => res.sections);
  }

  /**
   * Get the news feed for the given artist.
   *
   * Authentication is not required.
   */
  async feed({ artist, startAfter = 0, limit = 10 }: News.Payload) {
    const params = new URLSearchParams({
      artist: artist,
      start_after: startAfter.toString(),
      limit: limit.toString(),
    });

    return await this.request<News.FeedResult<News.SectionFeedContent>>(
      `/news/v1/feed?${params.toString()}`
    );
  }

  /**
   * Get the exclusive news feed for the given artist.
   *
   * Authentication is not required.
   */
  async exclusive({ artist, startAfter = 0, limit = 10 }: News.Payload) {
    const params = new URLSearchParams({
      artist,
      start_after: startAfter.toString(),
      limit: limit.toString(),
    });

    return await this.request<News.FeedResult<News.SectionExclusiveContent>>(
      `/news/v1/exclusive?${params.toString()}`
    );
  }

  /**
   * Get the news feed for the given artist via the backend for frontend endpoint.
   *
   * Authentication is required.
   */
  async feedBff({ artistName, page = 1, size = 10 }: NewsBFF.Payload) {
    if (!this.config.accessToken) {
      throw new AccessTokenMissing();
    }

    const params = new URLSearchParams({
      artistName: artistName,
      tid: randomUUID(),
      page: page.toString(),
      size: size.toString(),
    });

    return await this.request<NewsBFF.FeedResult<NewsBFF.FeedItem>>(
      `/bff/v1/news/feed?${params.toString()}`
    );
  }
}

export namespace News {
  export type Payload = z.infer<typeof newsFeedSchema>;

  export type SectionBar = {
    type: "bar";
    artist: ValidArtist;
    contents: [];
  };

  export type SectionBanner = {
    type: "banner";
    artist: ValidArtist;
    contents: SectionBannerContent[];
  };
  export type SectionBannerContent = {
    id: number;
    url: string;
    createdAt: string;
    label: "release" | "event" | "notice";
    order: number;
    body: string;
    imageUrl: string;
  };

  export type SectionFeed = {
    type: "feed";
    artist: ValidArtist;
    title: string;
    contents: SectionFeedContent[];
  };
  export type SectionFeedContent = {
    id: number;
    url: string;
    createdAt: string;
    artist: ValidArtist;
    logoImageUrl: string;
    body: string;
    imageUrls: string[];
  };

  export type SectionExclusive = {
    type: "exclusive";
    artist: ValidArtist;
    title: string;
    contents: SectionExclusiveContent[];
  };
  export type SectionExclusiveContent = {
    id: number;
    url: string;
    createdAt: string;
    title: string;
    body: string;
    thumbnailImageUrl: string;
    nativeVideoUrl: string;
  };

  export type Section =
    | SectionBar
    | SectionBanner
    | SectionFeed
    | SectionExclusive;

  export type FeedResult<TPostType> = {
    hasNext: boolean;
    total: number;
    nextStartAfter: string;
    results: TPostType[];
  };
}

export namespace NewsBFF {
  export type Payload = z.infer<typeof bffNewsFeedSchema>;

  export type FeedResult<TPostType> = {
    count: number;
    sets: TPostType[];
  };

  type FeedItemImage = {
    thumbnail: string;
    original: string;
  };

  export type FeedItem = {
    data: {
      activeAt: string;
      updatedAt: string;
      createdAt: string;
      artistMembers: unknown[];
      artist: string;
      body: string;
      id: number;
      totalLikeCount: number;
      url: string;
    };
    artist: LegacyArtist.Artist;
    images: FeedItemImage[];
    isLiked: boolean;
  };
}
