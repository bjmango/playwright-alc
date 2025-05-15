import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto("/");
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.getByRole("textbox", { name: "Email" }).fill(username);
    await this.page.getByRole("button", { name: "Continue" }).click();
    await this.page.getByRole("textbox", { name: "••••••••" }).fill(password);
    await this.page.getByRole("button", { name: "Log In" }).click();
  }
}
