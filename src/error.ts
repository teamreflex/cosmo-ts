export class CosmoUnauthenticatedError extends Error {
  constructor() {
    super("Cosmo: User is not authenticated.");
  }
}

export class HTTPError extends Error {}

export type CosmoJsonError = {
  error: {
    message: string;
    details: string;
  };
};
