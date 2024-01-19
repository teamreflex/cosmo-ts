export type CosmoErrorResponse = {
  error: {
    message: string;
    details: string;
  };
};

export class CosmoError extends Error {
  constructor(reason: string) {
    super(reason);
  }
}

export class UnauthorizedError extends CosmoError {}
export class TokenExpiredError extends CosmoError {}
