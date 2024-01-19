import { http, HttpResponse } from "msw";

const cosmo = (path: string) => `https://api.cosmo.fans${path}`;

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
  http.get(cosmo("/season/v2/*"), () => HttpResponse.json(json.getSeasons)),

  // objekt
  http.get("https://gas-station.cosmo.fans/v1/polygon-mainnet", () =>
    HttpResponse.json(json.gasStation)
  ),
  http.get(cosmo("/objekt/v2/filters"), () =>
    HttpResponse.json(json.getFilters)
  ),
  http.get(cosmo("/objekt/v1/by-serial/*"), () =>
    HttpResponse.json(json.getBySerial)
  ),
];

// conditional handlers
export const getUserUnauthorized = http.get(cosmo("/user/v1/me"), () =>
  HttpResponse.json(
    {
      error: {
        message: "unauthorized",
        details: "missing Authorization header",
      },
    },
    { status: 401 }
  )
);
export const getFeedNewsParams = http.get(
  cosmo("/news/v1/feed"),
  ({ request }) => {
    const url = new URL(request.url);
    const startAfter = url.searchParams.get("start_after");
    const parsed = parseInt(startAfter ?? "0");
    return HttpResponse.json({
      ...json.newsFeed,
      nextStartAfter: (parsed + 3).toString(),
    });
  }
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
      id: 970613,
      email: "email@example.com",
      nickname: "Example",
      address: "0xABCDEF",
      birth: "1997-06-13",
      profileImageUrl: "",
      isEligibleForWelcomeObjekt: false,
      followingArtists: [
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
          receivedWelcomeObjekt: true,
          assetBalance: {
            totalComo: 123,
            totalObjekt: 456,
          },
        },
      ],
      lastViewedArtist: "artms",
      marketingConsentDate: "2023-01-01T00:00:00.000Z",
      createdAt: "2022-01-01T00:00:00.000Z",
    },
  },

  search: {
    hasNext: false,
    results: [
      {
        nickname: "Example",
        address: "0xABCDEF",
        profileImageUrl: "",
      },
    ],
  },

  login: {
    user: {
      id: 970613,
      email: "email@example.com",
      nickname: "example",
      address: "0xABCDEF",
      profileImageUrl: "",
    },
    credentials: {
      accessToken: "access-token",
      refreshToken: "refresh-token",
    },
  },

  refreshToken: {
    credentials: {
      refreshToken: "newRefreshToken",
      accessToken: "newAccessToken",
    },
  },

  newsHome: {
    sections: [
      {
        artist: "ARTMS",
        type: "bar",
        contents: [],
      },
      {
        artist: "ARTMS",
        type: "banner",
        contents: [
          {
            id: 80,
            url: "https://twitter.com/official_artms/status/1740009651671015782",
            createdAt: "2023-12-28T08:01:23.660Z",
            label: "notice",
            order: 1,
            body: "OEC in US, Mexico, Japan!",
            imageUrl:
              "https://static.cosmo.fans/admin/uploads/01a3a715-3edc-4aac-b7a8-30e48e9bcd2e.jpg",
          },
          {
            id: 61,
            url: "https://www.melon.com/album/detail.htm?albumId=11376620",
            createdAt: "2023-12-15T07:03:27.735Z",
            label: "release",
            order: 2,
            body: "Stream 'The Carol 3.0' on Melon",
            imageUrl:
              "https://static.cosmo.fans/admin/uploads/e1285c2e-1000-49be-8351-c690fabf9156.png",
          },
          {
            id: 60,
            url: "https://open.spotify.com/track/4ggzfyKGny5dVjxPIgvQQO",
            createdAt: "2023-12-15T06:58:35.875Z",
            label: "release",
            order: 1,
            body: "Stream 'The Carol 3.0' on Spotify!",
            imageUrl:
              "https://static.cosmo.fans/admin/uploads/c26f640c-a033-42d0-b347-1bc73bfeaff8.png",
          },
        ],
      },
      {
        artist: "ARTMS",
        type: "feed",
        title: "Today’s Atmosphere",
        contents: [
          {
            id: 384,
            url: "https://www.instagram.com/official_artms/",
            createdAt: "2024-01-18T04:22:18.461Z",
            artist: "ARTMS",
            logoImageUrl: "https://static.cosmo.fans/assets/artms-logo.png",
            body: "Choerry's Photo Diary (˵ •̀ ᴗ - ˵ ) ✧",
            imageUrls: [
              "https://static.cosmo.fans/admin/uploads/b803546e-1dd8-41a4-ab9b-e38708a1b125.png",
            ],
          },
        ],
      },
      {
        artist: "ARTMS",
        type: "exclusive",
        title: "COSMO Exclusive",
        contents: [
          {
            id: 36,
            url: "https://www.youtube.com/watch?v=l6p8FDJqUj4",
            createdAt: "2023-10-23T03:18:18.595Z",
            title: "HeeJin 'Algorithm' (MV Ver.)",
            body: "#ARTMS #HeeJin #희진 #K #Algorithm",
            thumbnailImageUrl:
              "https://static.cosmo.fans/admin/uploads/86763077-0431-41af-af8f-aae1676402e8.jpg",
            nativeVideoUrl: "",
          },
        ],
      },
      {
        artist: "ARTMS",
        type: "event",
        title: "Event",
        contents: [],
      },
    ],
  },

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

  getSeasons: {
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

  getFilters: {
    sorts: [
      {
        title: "Newest",
        value: "newest",
      },
      {
        title: "Oldest",
        value: "oldest",
      },
      {
        title: "Lowest No.",
        value: "noAscending",
      },
      {
        title: "Highest No.",
        value: "noDescending",
      },
    ],
    filters: [
      {
        key: "artist",
        title: "Artist",
        type: "chip",
        values: [
          {
            title: "All",
            value: "",
            image: "",
          },
          {
            title: "ARTMS",
            value: "artms",
            image: "https://static.cosmo.fans/assets/artms-logo.png",
          },
          {
            title: "tripleS",
            value: "tripleS",
            image: "https://static.cosmo.fans/assets/triples-logo.png",
          },
        ],
      },
      {
        key: "member",
        title: "Member",
        type: "toggle",
        values: [
          {
            title: "SeoYeon",
            category: "tripleS",
            value: "SeoYeon",
            image:
              "https://static.cosmo.fans/uploads/assets/production/26b8c36c-ba00-4cd8-80cb-008fc6178b7f.jpg",
          },
          {
            title: "HeeJin",
            category: "artms",
            value: "HeeJin",
            image: "https://static.cosmo.fans/images/artms/HeeJin.jpg",
          },
          {
            title: "HyeRin",
            category: "tripleS",
            value: "HyeRin",
            image:
              "https://static.cosmo.fans/uploads/assets/production/3b27e220-5c6b-4cde-b054-8d813b8b1c7f.jpg",
          },
          {
            title: "HaSeul",
            category: "artms",
            value: "HaSeul",
            image: "https://static.cosmo.fans/images/artms/HaSeul.jpg",
          },
          {
            title: "JiWoo",
            category: "tripleS",
            value: "JiWoo",
            image:
              "https://static.cosmo.fans/uploads/assets/production/ae3733ea-4656-4b80-adc7-64f8cc6b21c4.jpg",
          },
          {
            title: "KimLip",
            category: "artms",
            value: "KimLip",
            image: "https://static.cosmo.fans/images/artms/KimLip.jpg",
          },
          {
            title: "ChaeYeon",
            category: "tripleS",
            value: "ChaeYeon",
            image:
              "https://static.cosmo.fans/uploads/assets/production/55bac628-912c-4b01-a41e-4a43564b62ac.jpg",
          },
          {
            title: "JinSoul",
            category: "artms",
            value: "JinSoul",
            image: "https://static.cosmo.fans/images/artms/JinSoul.jpg",
          },
          {
            title: "YooYeon",
            category: "tripleS",
            value: "YooYeon",
            image:
              "https://static.cosmo.fans/uploads/assets/production/a08408ed-ab70-44fc-a67a-0eb590d89a4d.jpg",
          },
          {
            title: "Choerry",
            category: "artms",
            value: "Choerry",
            image: "https://static.cosmo.fans/images/artms/Choerry.jpg",
          },
          {
            title: "SooMin",
            category: "tripleS",
            value: "SooMin",
            image:
              "https://static.cosmo.fans/uploads/assets/production/682ba6e8-2bc3-416d-af97-bafd14e0c104.png",
          },
          {
            title: "NaKyoung",
            category: "tripleS",
            value: "NaKyoung",
            image:
              "https://static.cosmo.fans/uploads/assets/production/57095ba6-8d2c-4d54-9304-d59a028cfa15.png",
          },
          {
            title: "YuBin",
            category: "tripleS",
            value: "YuBin",
            image:
              "https://static.cosmo.fans/uploads/assets/production/94a24bb1-eedd-40db-900a-e06101b4a46a.png",
          },
          {
            title: "Kaede",
            category: "tripleS",
            value: "Kaede",
            image:
              "https://static.cosmo.fans/uploads/assets/production/a0e28f1d-28ba-4a1b-b07f-e93560ca29ea.jpg",
          },
          {
            title: "DaHyun",
            category: "tripleS",
            value: "DaHyun",
            image:
              "https://static.cosmo.fans/uploads/assets/production/33490fd2-a1fc-4b41-a3ed-25805b1aa7d8.png",
          },
          {
            title: "Kotone",
            category: "tripleS",
            value: "Kotone",
            image:
              "https://static.cosmo.fans/uploads/assets/production/57a22810-be0c-442e-9bc3-7d6ad78aaeb6.png",
          },
          {
            title: "YeonJi",
            category: "tripleS",
            value: "YeonJi",
            image:
              "https://static.cosmo.fans/uploads/assets/production/a7074e54-c712-4e74-bd79-ab0419a2be3c.png",
          },
          {
            title: "Nien",
            category: "tripleS",
            value: "Nien",
            image:
              "https://static.cosmo.fans/uploads/assets/production/b54aac23-09ed-488b-bf19-a4f73668f53c.png",
          },
          {
            title: "SoHyun",
            category: "tripleS",
            value: "SoHyun",
            image:
              "https://static.cosmo.fans/uploads/assets/production/d1b35b05-26b6-470d-a81b-cd6fa31d31fb.png",
          },
          {
            title: "Xinyu",
            category: "tripleS",
            value: "Xinyu",
            image:
              "https://static.cosmo.fans/uploads/member-profile/tripleS/S15-ee88ebb6-cee8-4912-ae33-99cdb4f5adca.jpg",
          },
          {
            title: "Mayu",
            category: "tripleS",
            value: "Mayu",
            image:
              "https://static.cosmo.fans/uploads/member-profile/tripleS/S16-01a8c7ab-645e-4244-a690-aab37099da2f.jpg",
          },
          {
            title: "Lynn",
            category: "tripleS",
            value: "Lynn",
            image:
              "https://static.cosmo.fans/uploads/member-profile/tripleS/S17-66459e96-f494-4582-8edc-1c407f49f569.jpg",
          },
          {
            title: "JooBin",
            category: "tripleS",
            value: "JooBin",
            image:
              "https://static.cosmo.fans/uploads/member-profile/tripleS/S18-c752d659-6af5-43fa-8a9a-9e59e3d102a9.jpg",
          },
          {
            title: "HaYeon",
            category: "tripleS",
            value: "HaYeon",
            image:
              "https://static.cosmo.fans/uploads/member-profile/tripleS/S19-b79e5482-a254-11ee-827f-136633720eec.jpg",
          },
          {
            title: "ShiOn",
            category: "tripleS",
            value: "ShiOn",
            image:
              "https://static.cosmo.fans/uploads/member-profile/tripleS/S20-be898582-a254-11ee-8975-3fd0e15526bb.jpg",
          },
        ],
      },
      {
        key: "season",
        title: "Season",
        type: "chip",
        values: [
          {
            title: "Atom01",
            value: "Atom01",
          },
          {
            title: "Binary01",
            value: "Binary01",
          },
          {
            title: "Cream01",
            value: "Cream01",
          },
        ],
      },
      {
        key: "class",
        title: "Class",
        type: "chip",
        values: [
          {
            title: "First",
            value: "First",
          },
          {
            title: "Special",
            value: "Special",
          },
          {
            title: "Double",
            value: "Double",
          },
          {
            title: "ETC",
            value: "Welcome,Zero",
          },
        ],
      },
      {
        key: "on_offline",
        title: "On/Offline",
        type: "chip",
        values: [
          {
            title: "Z Online",
            value: "online",
          },
          {
            title: "A Offline",
            value: "offline",
          },
        ],
      },
      {
        key: "transferable",
        title: "Sendable Objekts",
        type: "toggle",
        values: [
          {
            title: "true",
            value: "true",
          },
          {
            title: "false",
            value: "false",
          },
        ],
      },
      {
        key: "gridable",
        title: "Gridable Objekts",
        type: "toggle",
        values: [
          {
            title: "true",
            value: "true",
          },
          {
            title: "false",
            value: "false",
          },
        ],
      },
    ],
  },

  getBySerial: {
    objekt: {
      collectionId: "Atom01 JiWoo 100Z",
      season: "Atom01",
      member: "JiWoo",
      collectionNo: "100Z",
      class: "Welcome",
      artists: ["tripleS"],
      thumbnailImage:
        "https://imagedelivery.net/qQuMkbHJ-0s6rwu8vup_5w/bd31d000-fa7b-4518-dd27-58cde1faf200/thumbnail",
      frontImage:
        "https://imagedelivery.net/qQuMkbHJ-0s6rwu8vup_5w/bd31d000-fa7b-4518-dd27-58cde1faf200/3x",
      backImage:
        "https://imagedelivery.net/qQuMkbHJ-0s6rwu8vup_5w/78f14332-1f28-4745-d49a-06684a8d4f00/3x",
      accentColor: "#F1F2F2",
      backgroundColor: "#F1F2F2",
      textColor: "#000000",
      comoAmount: 1,
      transferableByDefault: true,
      tokenId: "1",
      tokenAddress: "0xA4B37bE40F7b231Ee9574c4b16b7DDb7EAcDC99B",
      objektNo: 1,
      transferable: false,
    },
    isClaimed: true,
  },

  gasStation: {
    safeLow: {
      maxFee: 221.247951993,
      maxPriorityFee: 30,
    },
    standard: {
      maxFee: 221.425998919,
      maxPriorityFee: 30.178046926,
    },
    fast: {
      maxFee: 235.580669867,
      maxPriorityFee: 44.332717874,
    },
    estimatedBaseFee: 191.247951993,
    blockTime: 2,
    blockNumber: 52509975,
  },
};
