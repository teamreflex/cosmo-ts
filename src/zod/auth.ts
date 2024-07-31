import { z } from "zod";

export const signInSchema = z.object({
  channel: z.literal("email"),
  email: z.string(),
  accessToken: z.string(),
});
