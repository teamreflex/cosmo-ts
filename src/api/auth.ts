import { initUntypeable } from "untypeable";

const u = initUntypeable().pushArg<"GET" | "POST">();
export const router = u.router({
  "/auth/v1/signin": {
    POST: u.input<LoginPayload>().output<LoginResult>(),
  },

  "/auth/v1/refresh": {
    POST: u.input<RefreshPayload>().output<RefreshResult>(),
  },
});

export type LoginPayload = {
  channel: "email";
  email: string;
  accessToken: string;
};

export type LoginResult = {
  user: {
    id: number;
    email: string;
    nickname: string;
    address: string;
    profileImageUrl: string;
  };
  credentials: {
    accessToken: string;
    refreshToken: string;
  };
};

export type RefreshPayload = {
  refreshToken: string;
};

export type RefreshResult = {
  credentials: {
    refreshToken: string;
    accessToken: string;
  };
};
