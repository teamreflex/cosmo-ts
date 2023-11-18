import { initUntypeable } from "untypeable";
import { ValidArtist } from "./artists";

const u = initUntypeable().pushArg<"GET">();
export const router = u.router({
  "/news/v1": {
    GET: u.input<{ artist: ValidArtist }>().output<HomeNewsResult>(),
  },

  "/news/v1/feed": {
    GET: u
      .input<NewsPayload>()
      .output<NewsFeedResult<NewsSectionFeedContent>>(),
  },

  "/news/v1/exclusive": {
    GET: u
      .input<NewsPayload>()
      .output<NewsFeedResult<NewsSectionExclusiveContent>>(),
  },
});

export type NewsPayload = {
  artist: ValidArtist;
  start_after?: number;
  limit?: number;
};

export type HomeNewsResult = {
  sections: NewsSection[];
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
