import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load .env file
dotenv.config();

// Define the environment configuration required by playwright.config.ts
interface EnvConfig {
  baseUrl?: string;
  applicationManagedAccounts?: {
    mainAccount: {
      email: string;
    };
  };
  timeout?: number;
  // Add other properties as needed
}

// Declare global type augmentation
declare global {
  var envConfig: EnvConfig;
}

let jsonConfig: EnvConfig = {};

// Choose environment
const ENV = process.env.TEST_ENV || '';

try {
  const configPath = path.join(__dirname, 'configs', `${ENV}.json`);
  if (fs.existsSync(configPath)) {
    const configData = fs.readFileSync(configPath, 'utf8');
    jsonConfig = JSON.parse(configData);
  } else {
    console.warn(`Configuration file not found at ${configPath}. Using defaults.`);
  }
} catch (error) {
  console.error('Failed to load configuration:', error);
}
global.envConfig = jsonConfig;

export default defineConfig({
  // fullyParallel: true,
  // forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 30_000,
  use: {
    baseURL: jsonConfig.baseUrl,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
