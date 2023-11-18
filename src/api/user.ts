import { initUntypeable } from "untypeable";

const u = initUntypeable().pushArg<"GET">();
export const router = u.router({
  "/user/v1/me": {
    GET: u.output<{ profile: User }>(),
  },

  "/user/v1/search": {
    GET: u.input<{ query: string }>().output<SearchResponse>(),
  },
});

export type User = {
  nickname: string;
  address: string;
  profileImageUrl: string;
  artists: {
    name: string;
    title: string;
    contracts: {
      Como: string;
      Objekt: string;
    };
    assetBalance: {
      totalComo: number;
      totalObjekt: number;
    };
  }[];
};

export type SearchResponse = {
  hasNext: boolean;
  results: SearchResult[];
};

export type SearchResult = {
  nickname: string;
  address: string;
  profileImageUrl: string;
};
