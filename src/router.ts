import { createTypeLevelClient } from "untypeable";
import { router as artistRouter } from "./api/artists";
import { router as userRouter } from "./api/user";

export const router = artistRouter.merge(userRouter);
const COSMO_ENDPOINT = "https://api.cosmo.fans";

export function createDefaultFetcher(token?: string) {
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
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };

    switch (method) {
      case "GET":
        resolvedPath += `?${new URLSearchParams(input as any)}`;
        break;
      case "POST":
        resolvedInit = {
          ...resolvedInit,
          body: JSON.stringify(input),
        };
    }

    return fetch(`${COSMO_ENDPOINT}${pathWithParams}`, resolvedInit).then(
      (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        return res.json();
      }
    );
  };
}

export const typedRouter = (
  fetcher: ReturnType<typeof createDefaultFetcher>
) => {
  return createTypeLevelClient<typeof router>(fetcher);
};
