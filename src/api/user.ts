import { initUntypeable } from "untypeable";

const u = initUntypeable().pushArg<"GET" | "POST">();
export const router = u.router({
  "/user/v1/me": {
    GET: u.output<{ profile: User }>(),
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
