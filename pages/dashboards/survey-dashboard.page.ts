import { Page, Locator } from '@playwright/test';

export class SurveyDashboardPage {
  private readonly page: Page;
  private readonly createSurveyButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createSurveyButton = this.page.getByRole('button', { name: 'Create New' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async createNewSurvey(): Promise<void> {
    await this.createSurveyButton.click();
  }
}
