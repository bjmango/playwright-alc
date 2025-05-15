import { test } from "../../fixtures/loggedInInternal.fixture";
import { loadEnvConfig } from "../../../config/loadEnv";
import { writeFileSync } from "fs";

const envConfig = loadEnvConfig();
const username = envConfig.internalToolAccount?.email || "";
const password = process.env.DEFAULT_PASSWORD || "123qweASD";
const licensePermissionsPageUrl = envConfig.internalToolAccount?.licensePermissionsPageUrl || "";
const licenseTypes = [
  // "Collaborator",
  // "Professional",
  // "Full Access",
  "Stakeholder",
  "Full Access - Alchemer Workflow",
  "Professional - Alchemer Workflow",
];

test.use({ username, password });

test("Get license permissions", async ({ InternalLoggedInPage }) => {
  const page = InternalLoggedInPage;

  for (const licenseType of licenseTypes) {
    await page.goto(licensePermissionsPageUrl);
    await page.getByRole("combobox", { name: "View License:" }).selectOption(licenseType);

    // eslint-disable-next-line playwright/no-networkidle
    await page.waitForLoadState("networkidle");
    const rows = page.locator("form table tbody tr");
    const rowCount = await rows.count();
    console.log(`${licenseTypes} # of permissions: ${rowCount}`);
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
      const marketed = await row.locator("td").nth(8).locator("input[type=text]").inputValue();

      results.push({ feature, read, write, delete: del, run, quota, marketed });
    }

    writeFileSync(
      `${process.env.TEST_ENV}-license-permissions-${licenseType}.json`,
      JSON.stringify(results, null, 2)
    );

    // Add a basic assertion to ensure results were collected
    test.expect(results.length).toBeGreaterThan(0);
  }
});
