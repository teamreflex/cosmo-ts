import { http, HttpResponse } from "msw";
import json from "./mocks.json";

const cosmo = (path: string) => `https://api.cosmo.fans${path}`;

// default handlers
export const handlers = [
  // #region Artist
  http.get(cosmo("/bff/v3/artists"), () =>
    HttpResponse.json(json.getArtistsBff)
  ),
  http.get(cosmo("/bff/v3/artists/*"), () =>
    HttpResponse.json(json.getArtistBff)
  ),
  http.get(cosmo("/bff/v1/artist"), () =>
    HttpResponse.json(json.getArtistBffV1)
  ),
  // #endregion

  // #region User
  http.get(cosmo("/user/v1/me"), () => HttpResponse.json(json.getUser)),
  http.get(cosmo("/user/v1/search"), () => HttpResponse.json(json.search)),
  http.get(cosmo("/user/v1/by-nickname/*"), () =>
    HttpResponse.json(json.byNickname)
  ),
  http.put(cosmo("/user/v1/me/device-profile"), () =>
    HttpResponse.json(undefined, { status: 204 })
  ),
  http.get(cosmo("/bff/v1/users/me"), () => HttpResponse.json(json.getUserBFF)),
  // #endregion

  // #region Auth
  http.post(cosmo("/auth/v1/signin"), () => HttpResponse.json(json.login)),
  http.post(cosmo("/auth/v1/refresh"), () =>
    HttpResponse.json(json.refreshToken)
  ),
  // #endregion

  // #region News
  http.get(cosmo("/news/v1"), () => HttpResponse.json(json.newsHome)),
  http.get(cosmo("/news/v1/feed"), () => HttpResponse.json(json.newsFeed)),
  http.get(cosmo("/news/v1/exclusive"), () =>
    HttpResponse.json(json.newsExclusive)
  ),
  http.get(cosmo("/bff/v1/news/feed"), () =>
    HttpResponse.json(json.newsFeedBff)
  ),
  // #endregion

  // #region Season
  http.get(cosmo("/season/v2/*"), () => HttpResponse.json(json.getSeasons)),
  // #endregion

  // #region Objekt
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
    HttpResponse.json(undefined, { status: 201 })
  ),
  http.post(cosmo("/lenticular/v1"), () =>
    HttpResponse.json(undefined, { status: 201 })
  ),
  http.delete(cosmo("/lenticular/v1/*"), () =>
    HttpResponse.json(undefined, { status: 204 })
  ),
  http.get(cosmo("/objekt/v1/token/*"), () => HttpResponse.json(json.token)),
  // #endregion

  // #region Rewards
  http.get(cosmo("/bff/v1/event-rewards"), () =>
    HttpResponse.json(json.rewardsList)
  ),
  http.get(cosmo("/bff/v1/check-event-rewards"), () =>
    HttpResponse.json(json.rewardsCheck)
  ),
  http.post(cosmo("/bff/v1/event-rewards"), () =>
    HttpResponse.json(undefined, { status: 204 })
  ),
  // #endregion

  // #region Grid
  http.get(cosmo("/grid/v3/*/status"), () =>
    HttpResponse.json(json.gridArtistStatus)
  ),
  http.get(cosmo("/grid/v3/*/edition"), () =>
    HttpResponse.json(json.gridEditions)
  ),
  http.get(cosmo("/grid/v2/edition/*"), () =>
    HttpResponse.json(json.gridEditionList)
  ),
  http.get(cosmo("/grid/v1/*/status"), () =>
    HttpResponse.json(json.gridStatus)
  ),
  http.post(cosmo("/grid/v1/*/complete"), () =>
    HttpResponse.json(undefined, { status: 204 })
  ),
  http.post(cosmo("/grid/v1/*/claim-reward"), () =>
    HttpResponse.json(json.gridClaim)
  ),
  // #endregion

  // #region Legacy
  http.get(cosmo("/artist/v1"), () => HttpResponse.json(json.getArtists)),
  http.get(cosmo("/artist/v1/*"), () => HttpResponse.json(json.getArtist)),
  // #endregion
];

// authorization handlers
export const unauthorizedHandler = http.all(cosmo("/*"), () =>
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
export const unauthorizedBffHandler = http.all(cosmo("/*"), () =>
  HttpResponse.json(
    {
      code: "asdf",
      message: "Sorry, your username or password was entered Incorrectly",
    },
    { status: 401 }
  )
);

// misc states
export const gridClaimError = http.post(cosmo("/grid/v1/*/claim-reward"), () =>
  HttpResponse.json(
    {
      error: {
        message: "not completed yet",
        name: "Error",
        payload: {},
        status: 400,
      },
    },
    { status: 400 }
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
