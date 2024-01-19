import { defineConfig } from "vite";
import { UserConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: "./tests/setup.ts",
  },
} as UserConfig);
