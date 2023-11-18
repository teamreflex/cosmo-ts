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
  return (path: string, method: "GET" | "POST", input: ValidInput = {}) => {
    const pathWithParams = path.replace(/:([a-zA-Z0-9_]+)/g, (_, key) =>
      input[key].toString()
    );

    let resolvedPath = pathWithParams;
    let init: RequestInit = {
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
        const params = parseParams(path, input);
        resolvedPath += `?${params.toString()}`;
        break;
      case "POST":
        init = {
          ...init,
          body: JSON.stringify(input),
        };
    }

    return makeFetch(
      `${COSMO_ENDPOINT}${resolvedPath}`,
      init,
      0,
      options.maxRetries ?? 3
    );
  };
}

type ValidInput = Record<string, string | number | boolean>;

/**
 * Prevent any path replacements from also being in the query string.
 */
function parseParams(path: string, input: ValidInput): URLSearchParams {
  const params = new URLSearchParams();

  // get clean path params
  const segments = (path.match(/:(\w+)/g) ?? []).map((s: string) => s.slice(1));

  // add any inputs that don't exist as path params, into query params
  for (const [key, value] of Object.entries(input)) {
    if (segments.includes(key) || value === undefined) {
      continue;
    }
    params.set(key, value.toString());
  }

  return params;
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
    const isRetryable = err instanceof HTTPError;
    if (isRetryable && currentRetry <= maxRetries) {
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
