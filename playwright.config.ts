import { defineConfig, devices } from "@playwright/test";

import { loadEnvConfig } from "./config/loadEnv"; // Adjust the path as needed

const envConfig = loadEnvConfig();
export default defineConfig({
  // fullyParallel: true,
  // forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: typeof envConfig.baseUrl === "string" ? envConfig.baseUrl : undefined,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
