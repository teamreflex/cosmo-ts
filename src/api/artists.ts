import { initUntypeable } from "untypeable";

const u = initUntypeable().pushArg<"GET">();
export const router = u.router({
  "/artist/v1": {
    GET: u.output<{ artists: Artist[] }>(),
  },

  "/artist/v1/:artist": {
    GET: u.input<{ artist: string }>().output<{ artist: ArtistWithMembers }>(),
  },
});

export const validArtists = ["artms", "tripleS"] as const;
export type ValidArtist = (typeof validArtists)[number];

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
