import { test, expect } from "@playwright/test";

test.skip("switch between two users in one test", async ({ browser }) => {
  // Context for User A
  const contextA = await browser.newContext();
  const pageUserA = await contextA.newPage();
  const userA = "NewCypress@sgizmo.com";
  const password = "123qweASD";
  await pageUserA.goto("/");
  await pageUserA.getByRole("textbox", { name: "Email" }).fill(userA);
  await pageUserA.getByRole("button", { name: "Continue" }).click();
  await pageUserA.getByRole("textbox", { name: "••••••••" }).fill(password);
  await pageUserA.getByRole("button", { name: "Log In" }).click();
  // Ensure login was successful
  await expect(pageUserA).toHaveTitle(/Alchemer - Dashboard/);
  await pageUserA.getByRole("img", { name: "" }).click();
  await pageUserA.getByRole("link", { name: "Profile and Settings" }).click();
  await expect(pageUserA).toHaveURL(/.*user-preferences/);
  await expect(pageUserA.getByRole("textbox", { name: "Email Password" })).toHaveValue(userA);

  // Context for User B
  const contextB = await browser.newContext();
  const pageUserB = await contextB.newPage();
  const userB = "cypressFolders@alchemer.com";
  await pageUserB.goto("/");
  await pageUserB.getByRole("textbox", { name: "Email" }).fill(userB);
  await pageUserB.getByRole("button", { name: "Continue" }).click();
  await pageUserB.getByRole("textbox", { name: "••••••••" }).fill(password);
  await pageUserB.getByRole("button", { name: "Log In" }).click();
  await pageUserB.getByRole("link", { name: "Continue" }).first().click();
  // Ensure login was successful
  await expect(pageUserB).toHaveTitle(/Alchemer - Dashboard/);
  await pageUserB.getByRole("img", { name: "" }).click();
  await pageUserB.getByRole("link", { name: "Profile and Settings" }).click();
  await expect(pageUserB).toHaveURL(/.*user-preferences/);
  await expect(pageUserB.getByRole("textbox", { name: "Email Password" })).toHaveValue(userB);

  // Do stuff with both users

  // Clean up
  await contextA.close();
  await contextB.close();
});
