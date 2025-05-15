import { test as base } from "@playwright/test";
import { loadEnvConfig } from "../../config/loadEnv";
import { EnvConfig } from "../../config/envConfig.types";

export const test = base.extend<{
  envConfig: EnvConfig;
}>({
  envConfig: async ({}, use: (config: EnvConfig) => Promise<void>) => {
    const config: EnvConfig = loadEnvConfig();
    await use(config);
  },
});

export { expect, Page } from "@playwright/test";
