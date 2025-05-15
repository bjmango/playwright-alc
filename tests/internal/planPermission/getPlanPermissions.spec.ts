import { test, expect } from "../../fixtures/loggedInInternal.fixture";
import { loadEnvConfig } from "../../../config/loadEnv";
import { writeFileSync } from "fs";

const envConfig = loadEnvConfig();
const username = envConfig.internalToolAccount?.email || "";
const password = process.env.DEFAULT_PASSWORD || "123qweASD";
const planPermissionsPageUrl = envConfig.internalToolAccount?.planPermissionsPageUrl || "";
const planTypes = ["101:LicensedMulti"];

test.use({ username, password });

test("Get Plan permissions", async ({ InternalLoggedInPage }) => {
  const page = InternalLoggedInPage;

  for (const planType of planTypes) {
    await page.goto(planPermissionsPageUrl);
    await page.getByRole("combobox", { name: "View Plan Level:" }).selectOption(planType);
    const currentPlan = page
      .getByRole("combobox", { name: "View Plan Level:" })
      .locator("option", { hasText: planType });
    await expect(currentPlan).toHaveAttribute("selected", "selected");

    // eslint-disable-next-line playwright/no-networkidle
    await page.waitForLoadState("networkidle");
    const rows = page.locator("form table tbody tr");
    const rowCount = await rows.count();
    console.log(`${planTypes} # of permissions: ${rowCount}`);
    const results = [];

    for (let i = 1; i < rowCount; i++) {
      const row = rows.nth(i);
      const featureCellText = await row.locator("td").nth(0).innerText();
      const feature = featureCellText.split("\n")[0].trim();
      // console.log(feature);

      const read = await row.locator("td").nth(3).locator("input[type=checkbox]").isChecked();
      const write = await row.locator("td").nth(4).locator("input[type=checkbox]").isChecked();
      const del = await row.locator("td").nth(5).locator("input[type=checkbox]").isChecked();
      const run = await row.locator("td").nth(6).locator("input[type=checkbox]").isChecked();
      const quota = await row.locator("td").nth(7).locator("input[type=text]").inputValue();

      results.push({ feature, read, write, delete: del, run, quota });
    }

    writeFileSync(
      `${process.env.TEST_ENV}-plan-permissions-${planType}.json`,
      JSON.stringify(results, null, 2)
    );

    // Add a basic assertion to ensure results were collected
    test.expect(results.length).toBeGreaterThan(0);
  }
});
