import { createTypeLevelClient } from "untypeable";
import { CosmoUnauthenticatedError, HTTPError } from "./error";
import { router as artistRouter } from "./api/artists";
import { router as userRouter } from "./api/user";
import { router as authRouter } from "./api/auth";
import { router as newsRouter } from "./api/news";
import { router as seasonRouter } from "./api/season";

export type FetcherOptions = {
  accessToken?: string;
  maxRetries?: number;
};

const COSMO_ENDPOINT = "https://api.cosmo.fans";

export const router = artistRouter
  .merge(userRouter)
  .merge(authRouter)
  .merge(newsRouter)
  .merge(seasonRouter);

export function createDefaultFetcher(options: FetcherOptions = {}) {
  return (path: string, method: "GET" | "POST", input = {}) => {
    const pathWithParams = path.replace(
      /:([a-zA-Z0-9_]+)/g,
      (_, key) => input[key]
    );

    let resolvedPath = pathWithParams;
    let resolvedInit: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(options.accessToken
          ? { Authorization: `Bearer ${options.accessToken}` }
          : {}),
      },
    };

    switch (method) {
      case "GET":
        resolvedPath += `?${new URLSearchParams(input)}`;
        break;
      case "POST":
        resolvedInit = {
          ...resolvedInit,
          body: JSON.stringify(input),
        };
    }

    return makeFetch(
      `${COSMO_ENDPOINT}${pathWithParams}`,
      resolvedInit,
      0,
      options.maxRetries ?? 3
    );
  };
}

function makeFetch(
  url: string,
  init: RequestInit,
  currentRetry: number,
  maxRetries: number
) {
  try {
    return fetch(url, init).then((res) => {
      // success with body
      if (res.status === 200) {
        return res.json();
      }
      // success without body
      if (res.status >= 201 && res.status < 300) {
        return true;
      }
      // unauthenticated or unauthorized
      if (res.status >= 400 && res.status < 403) {
        throw new CosmoUnauthenticatedError();
      }
      // default
      throw new HTTPError(res.statusText);
    });
  } catch (err) {
    if (currentRetry <= maxRetries) {
      return makeFetch(url, init, currentRetry + 1, maxRetries);
    }

    throw err;
  }
}

export const typedRouter = (
  fetcher: ReturnType<typeof createDefaultFetcher>
) => {
  return createTypeLevelClient<typeof router>(fetcher);
};
