import { Page } from '@playwright/test';

export class DashboardPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async title(): Promise<string> {
    return this.page.title();
  }
}
