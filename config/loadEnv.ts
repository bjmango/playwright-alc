import * as fs from "fs";
import * as path from "path";
import { EnvConfig } from "./envConfig.types";

export function loadEnvConfig(): EnvConfig {
  const env = process.env.TEST_ENV || "us";
  const configPath = path.resolve(__dirname, `./env.${env}.json`);
  return JSON.parse(fs.readFileSync(configPath, "utf-8"));
}
