import { Page, Locator } from '@playwright/test';

export class CreateSurveyDialog {
  private readonly page: Page;
  private readonly surveyTitleInput: Locator;
  private readonly startBuildingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.surveyTitleInput = this.page.getByRole('textbox', { name: 'What would you like to name' });
    this.startBuildingButton = this.page.locator('[data-test="survey-start-building"]');
  }

  /**
   * Start building the survey
   * @param title The title of the survey
   * */
  async startBuilding(title: string): Promise<void> {
    await this.surveyTitleInput.fill(title);
    await this.startBuildingButton.click();
  }
}
