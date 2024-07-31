import { Config } from "../config";
import {
  CosmoBFFErrorResponse,
  CosmoError,
  CosmoErrorResponse,
  NotFoundError,
  TokenExpiredError,
  UnauthorizedError,
} from "../errors";

export class BaseAPI {
  constructor(protected config: Config) {}

  /**
   * Make a request to the API.
   */
  async request<T>(url: string, options: RequestInit = {}) {
    const response = await fetch(new URL(url, this.config.baseUrl), {
      ...options,
      headers: {
        ...options.headers,
        ...(this.config.accessToken
          ? { Authorization: `Bearer ${this.config.accessToken}` }
          : {}),
        ...(this.config.userAgent
          ? { "User-Agent": this.config.userAgent }
          : {}),
      },
    });

    if (response.ok === false) {
      try {
        if (url.includes("/bff/v1/")) {
          const body: CosmoBFFErrorResponse = await response.json();

          switch (response.status) {
            case 401:
              throw new UnauthorizedError(body.message);
            case 403:
              throw new TokenExpiredError(body.message);
            case 404:
              throw new NotFoundError(body.message);
          }
        } else {
          const body: CosmoErrorResponse = await response.json();

          switch (response.status) {
            case 401:
              throw new UnauthorizedError(body.error.details);
            case 403:
              throw new TokenExpiredError(body.error.message);
            case 404:
              throw new NotFoundError(body.error.message);
          }
        }
      } catch (err) {
        if (err instanceof CosmoError) {
          throw err;
        }

        throw new CosmoError(response.status, "unknown error");
      }
    }

    return response.json() as T;
  }
}
