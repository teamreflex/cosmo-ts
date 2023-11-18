import { http, HttpResponse } from "msw";

export const cosmo = (path: string) => `https://api.cosmo.fans${path}`;

// default handlers
export const handlers = [
  // artist
  http.get(cosmo("/artist/v1"), () => HttpResponse.json(json.getArtists)),
  http.get(cosmo("/artist/v1/*"), () => HttpResponse.json(json.getArtist)),

  // user
  http.get(cosmo("/user/v1/me"), () => HttpResponse.json(json.getUser)),
  http.get(cosmo("/user/v1/search"), () => HttpResponse.json(json.search)),

  // auth
  http.post(cosmo("/auth/v1/signin"), () => HttpResponse.json(json.login)),
  http.post(cosmo("/auth/v1/refresh"), () =>
    HttpResponse.json(json.refreshToken)
  ),
];

// conditional handlers
export const getUserUnauthorized = http.get(cosmo("/user/v1/me"), () =>
  HttpResponse.json({ error: "Unauthorized" }, { status: 401 })
);

export const json = {
  getArtists: {
    artists: [
      {
        name: "tripleS",
        title: "tripleS",
        logoImageUrl: "https://static.cosmo.fans/assets/triples-logo.png",
        contracts: {
          Como: "0x58AeABfE2D9780c1bFcB713Bf5598261b15dB6e5",
          Objekt: "0xA4B37bE40F7b231Ee9574c4b16b7DDb7EAcDC99B",
          ObjektMinter: "0x3D898E02DFA77a1Ef69Ab8Ec369200a2e48DC5E3",
          Governor: "0xc3E5ad11aE2F00c740E74B81f134426A3331D950",
          CommunityPool: "0xdAE81c4c069c86fea2FC08cfD53a4201D661e447",
          ComoMinter: "0xb8f9925Cb456Da53C8D8E45b7eCA154cc596034c",
        },
      },
      {
        name: "artms",
        title: "ARTMS",
        logoImageUrl: "https://static.cosmo.fans/assets/artms-logo.png",
        contracts: {
          Como: "0x8254D8D2903B20187cBC4Dd833d49cECc219F32E",
          Objekt: "0x0fB69F54bA90f17578a59823E09e5a1f8F3FA200",
          CommunityPool: "0x07F93cCc90aF32E4d6ea70A93F36DF9F58C97087",
          ComoMinter: "0xBda6B6C34b27D54EAaAf555e458199467E77Bb18",
          ObjektMinter: "0x9009e2b4fc02eb18e41994d235a78504600AC87c",
          Governor: "0x8466e6E218F0fe438Ac8f403f684451D20E59Ee3",
        },
      },
    ],
  },

  getArtist: {
    artist: {
      name: "artms",
      title: "ARTMS",
      logoImageUrl: "https://static.cosmo.fans/assets/artms-logo.png",
      contracts: {
        Como: "0x8254D8D2903B20187cBC4Dd833d49cECc219F32E",
        Objekt: "0x0fB69F54bA90f17578a59823E09e5a1f8F3FA200",
        CommunityPool: "0x07F93cCc90aF32E4d6ea70A93F36DF9F58C97087",
        ComoMinter: "0xBda6B6C34b27D54EAaAf555e458199467E77Bb18",
        ObjektMinter: "0x9009e2b4fc02eb18e41994d235a78504600AC87c",
        Governor: "0x8466e6E218F0fe438Ac8f403f684451D20E59Ee3",
      },
      members: [
        {
          alias: "HeeJin",
          artist: "artms",
          mainObjektImageUrl: "https://via.placeholder.com/328x488?text=Objekt",
          name: "HeeJin",
          order: 1,
          profileImageUrl: "https://static.cosmo.fans/images/artms/HeeJin.jpg",
          units: [],
        },
        {
          alias: "KimLip",
          artist: "artms",
          mainObjektImageUrl: "https://via.placeholder.com/328x488?text=Objekt",
          name: "KimLip",
          order: 3,
          profileImageUrl: "https://static.cosmo.fans/images/artms/KimLip.jpg",
          units: ["OEC"],
        },
        {
          alias: "JinSoul",
          artist: "artms",
          mainObjektImageUrl: "https://via.placeholder.com/328x488?text=Objekt",
          name: "JinSoul",
          order: 4,
          profileImageUrl: "https://static.cosmo.fans/images/artms/JinSoul.jpg",
          units: ["OEC"],
        },
        {
          alias: "Choerry",
          artist: "artms",
          mainObjektImageUrl: "https://via.placeholder.com/328x488?text=Objekt",
          name: "Choerry",
          order: 5,
          profileImageUrl: "https://static.cosmo.fans/images/artms/Choerry.jpg",
          units: ["OEC"],
        },
        {
          alias: "HaSeul",
          artist: "artms",
          mainObjektImageUrl: "https://via.placeholder.com/328x488?text=Objekt",
          name: "HaSeul",
          order: 2,
          profileImageUrl: "https://static.cosmo.fans/images/artms/HaSeul.jpg",
          units: [],
        },
      ],
    },
  },

  getUser: {
    profile: {
      nickname: "test",
      address: "0xtest",
      profileImageUrl: "",
      artists: [
        {
          name: "artms",
          title: "ARTMS",
          contracts: {
            Como: "0xComo",
            Objekt: "0xObjekt",
          },
          assetBalance: {
            totalComo: 1,
            totalObjekt: 2,
          },
        },
      ],
    },
  },

  search: {
    hasNext: false,
    results: [
      {
        nickname: "Kairu",
        address: "0xcaB3C85ac8f4aE0153B7cF2Bbf1378397890848b",
        profileImageUrl: "",
      },
    ],
  },

  login: {
    user: {
      id: 1,
      email: "test@example.com",
      nickname: "test",
      address: "0xTest",
      profileImageUrl: "",
    },
    credentials: {
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    },
  },

  refreshToken: {
    credentials: {
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    },
  },
};
