import { test, expect } from "../../fixtures/loggedInInternal.fixture";
import { loadEnvConfig } from "../../../config/loadEnv";
import { writeFileSync } from "fs";

const envConfig = loadEnvConfig();
const username = envConfig.internalToolAccount?.email || "";
const password = process.env.DEFAULT_PASSWORD || "123qweASD";
const planPermissionsPageUrl = envConfig.internalToolAccount?.planPermissionsPageUrl || "";
const planTypes = [
  "2:Personal",
  "4:Team Edition",
  "6:Dedicated",
  "7:SurveyGizmo",
  "8:SGLite",
  "12:Premier",
  "13:EnterprisePlus",
  "99:Free",
  "100:LicensedSingle",
  "101:LicensedMulti",
  "102:LicensedOEM",
];

test.use({ username, password });

test("Get Plan permissions", async ({ InternalLoggedInPage }) => {
  const page = InternalLoggedInPage;

  for (const planType of planTypes) {
    await page.goto(planPermissionsPageUrl);
    await page.getByRole("combobox", { name: "View Plan Level:" }).selectOption(planType);
    // eslint-disable-next-line playwright/no-networkidle
    await page.waitForLoadState("networkidle");
    const currentPlan = page.getByRole("option", { name: planType, exact: true });
    await expect(currentPlan).toHaveAttribute("selected", "selected");

    const rows = page.locator("form table tbody tr");
    const rowCount = await rows.count();
    console.log(`${planType} # of permissions: ${rowCount}`);
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
      `permissions/${process.env.TEST_ENV}-plan-permissions-${planType}.json`,
      JSON.stringify(results, null, 2)
    );

    // Add a basic assertion to ensure results were collected
    test.expect(results.length).toBeGreaterThan(0);
  }
});
