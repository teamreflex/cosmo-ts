import { http, HttpResponse } from "msw";
import json from "./mocks.json";

const cosmo = (path: string) => `https://api.cosmo.fans${path}`;

// default handlers
export const handlers = [
  // artist
  http.get(cosmo("/artist/v1"), () => HttpResponse.json(json.getArtists)),
  http.get(cosmo("/artist/v1/*"), () => HttpResponse.json(json.getArtist)),
  http.get(cosmo("/bff/v1/artist"), () => HttpResponse.json(json.getArtistBff)),

  // user
  http.get(cosmo("/user/v1/me"), () => HttpResponse.json(json.getUser)),
  http.get(cosmo("/user/v1/search"), () => HttpResponse.json(json.search)),
  http.get(cosmo("/user/v1/by-nickname/*"), () =>
    HttpResponse.json(json.byNickname)
  ),

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
  http.post(cosmo("/objekt/v1/by-serial/*/claim"), () =>
    HttpResponse.json(json.claimBySerial)
  ),
  http.get(cosmo("/objekt/v1/token/*"), () => HttpResponse.json(json.token)),
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
