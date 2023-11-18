import { initUntypeable } from "untypeable";

const u = initUntypeable().pushArg<"GET">();
export const router = u.router({
  "/season/v2/:artist": {
    GET: u.input<{ artist: string }>().output<SeasonResponse>(),
  },
});

export type OngoingSeason = {
  artist: string;
  title: string;
  image: string | null;
  startDate: string;
  endDate: null;
  ongoing: true;
};

export type EndedSeason = {
  artist: string;
  title: string;
  image: string | null;
  startDate: string;
  endDate: string;
  ongoing: false;
};

export type Season = OngoingSeason | EndedSeason;

export type SeasonResponse = {
  seasons: Season[];
  currentSeason: OngoingSeason;
};
