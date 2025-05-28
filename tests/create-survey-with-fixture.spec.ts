/**
 * This file demonstrates how to create a survey with a radio button question using @playwright/mcp
 *
 * To run this test with MCP, you would need the MCP server running and configured
 * For now, we'll use the standard Playwright test but formatted for MCP
 */

import { test as baseTest } from "./fixtures/loggedInApp.fixture";
import { expect } from "@playwright/test";

const surveyName = "MCP create a simple survey";

// Define the custom test with login credentials
const test = baseTest.extend({
  username: async ({ envConfig }, use) => {
    await use(envConfig.applicationManagedAccounts.mainAccount.email);
  },
  password: async ({}, use) => {
    await use("123qweASD");
  },
});

test.describe("Survey Creation with Radio Button Question", () => {
  test("should create a survey with a radio button question", async ({ loggedInPage: page }) => {
    // We're already logged in thanks to the fixture

    // 2. Click create new button to create a survey
    await page.getByRole("button", { name: "Create New", exact: true }).click();

    // 3. Enter survey name and leave team dropdown unchanged
    await page
      .getByRole("textbox", { name: "What would you like to name this Survey?" })
      .fill(surveyName);
    // We intentionally leave the team dropdown untouched

    // 4. Click Start Building button to create the survey
    await page.getByRole("button", { name: "Start Building" }).click();

    // Wait for the survey editor to load
    await page.waitForURL("**/builder/build*/id/**");

    // 5. Add a new question
    await page.getByRole("link", { name: "Question", exact: true }).click();

    // 6. Choose Radio Button question type
    await page.getByRole("menuitem", { name: "Radio Buttons" }).click();

    // Enter question text
    await page.locator("div.editor-field").first().fill("Radio button question");

    // Provide two options
    const optionInputs = await page
      .locator("input.sg-input-text")
      .filter({ hasText: "Option" })
      .all();
    await optionInputs[0].fill("mcp opt1");
    await optionInputs[1].fill("mcp opt2");

    // 7. Save the survey
    await page.getByRole("button", { name: "Save" }).click();

    // Verify the save was successful
    await expect(page.getByText("Survey saved successfully")).toBeVisible();

    // Additional verification - make sure our question appears in the builder
    const questionText = await page.locator("div.question-title").textContent();
    expect(questionText).toContain("Radio button question");

    // Verify both options are visible
    const optionTexts = await page.locator("div.option-text").allTextContents();
    expect(optionTexts).toContain("mcp opt1");
    expect(optionTexts).toContain("mcp opt2");
  });
});
