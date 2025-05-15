import { test } from "../../fixtures/loggedInInternal.fixture";
import { loadEnvConfig } from "../../../config/loadEnv";
import { readFileSync } from "fs";
import { expect } from "node_modules/playwright/test";

const envConfig = loadEnvConfig();
const username = envConfig.internalToolAccount?.email || "";
const password = process.env.DEFAULT_PASSWORD || "123qweASD";
const planPermissionsPageUrl = envConfig.internalToolAccount?.planPermissionsPageUrl || "";
const planTypes = ["101:LicensedMulti"];

test.use({ username, password });

test.setTimeout(300_000);

test("Set Plan permissions", async ({ InternalLoggedInPage }) => {
  const page = InternalLoggedInPage;
  for (const planType of planTypes) {
    const targetPlanPermissionsFile = `us-plan-permissions-${planType}.json`;
    const permissions = JSON.parse(readFileSync(targetPlanPermissionsFile, "utf-8"));

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
    console.log(`${planType} # of permissions: ${rowCount}`);

    for (let i = 1; i < rowCount; i++) {
      const row = rows.nth(i);
      const featureCellText = await row.locator("td").nth(0).innerText();
      const feature = featureCellText.split("\n")[0].trim();
      type Permission = {
        feature: string;
        read: boolean;
        write: boolean;
        delete: boolean;
        run: boolean;
        quota: string;
        marketed: string;
      };

      const featurePermission: Permission | undefined = permissions.find(
        (permission: Permission) => permission.feature === feature
      );
      // console.log(featurePermission);
      /* eslint-disable playwright/no-conditional-in-test */
      if (!featurePermission) {
        console.log(`Feature permission not found for feature: ${feature}`);
        continue;
      } else {
        const readLocator = row.locator("td").nth(3).locator("input[type=checkbox]");
        await (featurePermission.read ? readLocator.check() : readLocator.uncheck());
        const writeLocator = row.locator("td").nth(4).locator("input[type=checkbox]");
        await (featurePermission.write ? writeLocator.check() : writeLocator.uncheck());
        const delLocator = row.locator("td").nth(5).locator("input[type=checkbox]");
        await (featurePermission.delete ? delLocator.check() : delLocator.uncheck());
        const runLocator = row.locator("td").nth(6).locator("input[type=checkbox]");
        await (featurePermission.run ? runLocator.check() : runLocator.uncheck());
        const quotaLocator = row.locator("td").nth(7).locator("input[type=text]");
        await quotaLocator.fill(featurePermission.quota);
      }
    }
    await page.getByRole("button", { name: /Update Feature Settings for/i }).click();
  }
});
