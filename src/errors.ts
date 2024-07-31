export type CosmoErrorResponse = {
  error: {
    message: string;
    details?: string;
    name: string;
    payload: {};
    status: number;
  };
};

export type CosmoBFFErrorResponse = {
  code: number;
  message: string;
};

export class CosmoError extends Error {
  constructor(public code: number, message: string) {
    super(message);
  }
}

export class UnauthorizedError extends CosmoError {
  constructor(message?: string) {
    super(401, message ?? "unauthorized");
  }
}
export class TokenExpiredError extends CosmoError {
  constructor(message?: string) {
    super(403, message ?? "token expired");
  }
}

export class NotFoundError extends CosmoError {
  constructor(message?: string) {
    super(404, message ?? "not found");
  }
}

export class AccessTokenMissing extends CosmoError {
  constructor() {
    super(401, "A valid access token is required for this endpoint.");
  }
}
