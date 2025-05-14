import { test } from "./fixtures/loggedInApp.fixture";
import { expect } from "@playwright/test";

// Test with the first user
test.use({
  username: "NewCypress@sgizmo.com",
  password: "123qweASD",
});

test("Login to application with first user", async ({ loggedInPage }) => {
  const unusedVariable = "This will trigger a linting warning";
  const page = loggedInPage;
  await page.getByRole("img", { name: "" }).click();
  await page.getByRole("link", { name: "Profile and Settings" }).click();
  await expect(page).toHaveURL(/.*user-preferences/);
  await expect(page.getByRole("textbox", { name: "Email Password" })).toHaveValue("NewCypress@sgizmo.com");
});
