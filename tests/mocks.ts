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

  // news
  http.get(cosmo("/news/v1"), () => HttpResponse.json(json.newsHome)),
  http.get(cosmo("/news/v1/feed"), () => HttpResponse.json(json.newsFeed)),
  http.get(cosmo("/news/v1/exclusive"), () =>
    HttpResponse.json(json.newsExclusive)
  ),

  // season
  http.get(cosmo("/season/v2/*"), () => HttpResponse.json(json.getSeason)),
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

  newsHome: {},

  newsFeed: {
    hasNext: true,
    total: 5,
    nextStartAfter: "3",
    results: [
      {
        id: 317,
        url: "https://www.youtube.com/@official_artms",
        createdAt: "2023-11-06T08:51:38.421Z",
        artist: "ARTMS",
        logoImageUrl: "https://static.cosmo.fans/assets/artms-logo.png",
        body: "On Set of Princess HeeJin's MV  (*˘◡˘*)",
        imageUrls: [
          "https://static.cosmo.fans/admin/uploads/48913c70-03ee-4785-ac0d-40455bedb681.jpg",
          "https://static.cosmo.fans/admin/uploads/6d912cf0-a2af-49d7-a3d7-9d5dfadbd969.jpg",
          "https://static.cosmo.fans/admin/uploads/46fe3874-dd54-4398-9366-6506c1beb8b8.jpg",
          "https://static.cosmo.fans/admin/uploads/196c9e6e-77b1-4bb4-9e98-8490bf1351c9.jpg",
        ],
      },
      {
        id: 295,
        url: "https://www.youtube.com/@official_artms",
        createdAt: "2023-09-06T08:58:04.407Z",
        artist: "ARTMS",
        logoImageUrl: "https://static.cosmo.fans/assets/artms-logo.png",
        body: "ODD EYE CIRCLE's whereabouts",
        imageUrls: [
          "https://static.cosmo.fans/admin/uploads/66987575-ea19-4d1b-b0e6-d0adc7b9425c.jpg",
          "https://static.cosmo.fans/admin/uploads/7e29b0e7-eaaf-4966-8791-e2065820df63.jpg",
          "https://static.cosmo.fans/admin/uploads/a8e24b8d-320f-417e-850d-35b325ede8f5.jpg",
          "https://static.cosmo.fans/admin/uploads/62bfd022-d4a0-4c3e-9850-20a181456fef.jpg",
        ],
      },
      {
        id: 238,
        url: "",
        createdAt: "2023-07-11T01:07:32.559Z",
        artist: "ARTMS",
        logoImageUrl: "https://static.cosmo.fans/assets/artms-logo.png",
        body: "",
        imageUrls: [
          "https://static.cosmo.fans/images/sigma-prod/artms-20230712/feed-1.jpg",
          "https://static.cosmo.fans/images/sigma-prod/artms-20230712/feed-2.jpg",
          "https://static.cosmo.fans/images/sigma-prod/artms-20230712/feed-3.jpg",
          "https://static.cosmo.fans/images/sigma-prod/artms-20230712/feed-4.jpg",
        ],
      },
    ],
  },

  newsExclusive: {
    hasNext: false,
    total: 6,
    results: [
      {
        id: 36,
        url: "https://youtu.be/4uVqzLh1HiE",
        createdAt: "2023-10-23T03:18:18.595Z",
        title: "[Teaser] HeeJin 'Algorithm' (MV Ver.)",
        body: "#ARTMS #HeeJin #희진 #K #Algorithm",
        thumbnailImageUrl:
          "https://static.cosmo.fans/admin/uploads/86763077-0431-41af-af8f-aae1676402e8.jpg",
        nativeVideoUrl: "",
      },
      {
        id: 35,
        url: "https://youtu.be/Lv9O9gLrnzc",
        createdAt: "2023-10-11T13:43:40.316Z",
        title: "[Teaser] HeeJin 'Algorithm' (K Ver.)",
        body: "#ARTMS #HeeJin #희진 #K #Algorithm",
        thumbnailImageUrl:
          "https://static.cosmo.fans/admin/uploads/557c2fde-38df-44d1-ba44-bdcbe7c70c67.jpeg",
        nativeVideoUrl: null,
      },
      {
        id: 31,
        url: "https://static.cosmo.fans/pages/update-notice.html",
        createdAt: "2023-10-03T04:00:00.000Z",
        title: "OEC Europe Tour Selfcam Collection",
        body: "Warning! Delicious food and hunger!",
        thumbnailImageUrl:
          "https://static.cosmo.fans/admin/uploads/b62980ea-e4c1-4b66-b8cd-1b36db3743bc.jpeg",
        nativeVideoUrl:
          "https://customer-odzj4xy9rztfqeuh.cloudflarestream.com/b5d789e48acfe04ff163b19872c32458/manifest/video.m3u8",
      },
      {
        id: 5,
        url: "https://youtu.be/UDxID0_A9x4",
        createdAt: "2023-07-11T01:09:25.477Z",
        title: "ODD EYE CIRCLE ‘Air Force One' MV | ARTMS",
        body: "#KimLip #JinSoul #Choerry #Air Force One",
        thumbnailImageUrl:
          "https://static.cosmo.fans/uploads/assets/production/odd-eye-circle-mv-thumnail.jpg",
        nativeVideoUrl: "",
      },
      {
        id: 6,
        url: "https://youtu.be/FKo0tjVeAEU",
        createdAt: "2023-07-03T05:48:53.128Z",
        title: "[Teaser] ODD EYE CIRCLE ‘Air Force One'",
        body: "#KimLip #JinSoul #Choerry #VersionUp",
        thumbnailImageUrl:
          "https://static.cosmo.fans/images/sigma-prod/artms-20230704/youtube.jpg",
        nativeVideoUrl: "",
      },
      {
        id: 8,
        url: "https://youtu.be/7aFU-Ick8go",
        createdAt: "2023-06-17T01:10:36.157Z",
        title: "ARTMS : The First Step",
        body: "Welcome to Cosmo ARTMS! ",
        thumbnailImageUrl:
          "https://s3.ap-northeast-2.amazonaws.com/static.cosmo.fans/uploads/assets/development/31373e4c-c766-42ab-a2f0-531d205c4dd9.jpeg",
        nativeVideoUrl: "",
      },
    ],
  },

  getSeason: {
    seasons: [
      {
        artist: "artms",
        title: "Atom01",
        image: null,
        startDate: "2023-06-18T00:00:00.000Z",
        endDate: null,
        ongoing: true,
      },
    ],
    currentSeason: {
      artist: "artms",
      title: "Atom01",
      image: null,
      startDate: "2023-06-18T00:00:00.000Z",
      endDate: null,
      ongoing: true,
    },
  },
};
