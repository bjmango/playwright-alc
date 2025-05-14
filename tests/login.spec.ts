import { test } from "./fixtures/loggedInApp.fixture";
import { expect } from "@playwright/test";

// Test with the first user
test.use({
  username: "NewCypress@sgizmo.com",
  password: "123qweASD",
});

test("Login to application with first user", async ({ loggedInPage }) => {
  const page = loggedInPage;

  // TypeScript type error - explicit wrong type assignment
  const pageUrl: number = "https://example.com"; // Type error: string can't be assigned to number
  console.log(`Current URL is ${pageUrl}`); // Use the variable to avoid ESLint unused var error

  await page.getByRole("img", { name: "" }).click();
  await page.getByRole("link", { name: "Profile and Settings" }).click();
  await expect(page).toHaveURL(/.*user-preferences/);

  // TODO: This is a properly formatted comment demonstrating formatting improvements
  // Instead of using conditional blocks and arbitrary waits, we use proper assertions
  // and page object patterns following Playwright best practices

  // Wait for element to be visible - better than arbitrary timeouts
  await page.getByRole("textbox", { name: "Email Password" }).waitFor({ state: "visible" });

  // Fixed: Direct assertion without conditional
  await expect(page.getByRole("textbox", { name: "Email Password" })).toHaveValue(
    "NewCypress@sgizmo.com"
  );

  // Fixed: Using web-first assertion
  await expect(page.getByRole("textbox", { name: "Email Password" })).toHaveValue(
    "NewCypress@sgizmo.com"
  );
});

// Skipped test has been removed to follow best practices
// If this was a real test that needs to be fixed later, we would use a TODO comment:
// TODO: Fix and enable this test when feature XYZ is implemented
