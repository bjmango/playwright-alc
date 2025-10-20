import { Page, Locator } from '@playwright/test';
import { HelpBase } from 'utils/help-base';

export class SurveyBuilderPage extends HelpBase {
  private readonly questionButton: Locator;

  constructor(page: Page) {
    super(page);
    this.questionButton = this.page.getByRole('link', { name: 'Question', exact: true });
  }

  async goto(url: string = '/'): Promise<void> {
    await this.page.goto(url);
  }

  async addQuestion(): Promise<void> {
    await this.questionButton.click();
  }

  async insertPageAfterPageX(pageNumber: number): Promise<void> {
    // Try to find the insert-page-container for the given page
    const containers = await this.page
      .locator('.insert-page-container.text-center.can-merge')
      .count();
    if (containers > 0 && pageNumber - 1 < containers) {
      const insertPageContainer = this.page
        .locator('.insert-page-container.text-center.can-merge')
        .nth(pageNumber - 1);
      const addPageButton = insertPageContainer.getByRole('link', {
        name: ' Add Page',
        exact: true,
      });
      await addPageButton.click({ timeout: 60000 });
    } else {
      // Fallback: click the global Add Page button if present
      const globalAddPage = this.page.getByRole('link', { name: ' Add Page', exact: true });
      if (await globalAddPage.isVisible()) {
        await globalAddPage.click({ timeout: 60000 });
      } else {
        throw new Error('No Add Page button found to insert a new page.');
      }
    }
  }

  async surveyPageX(pageNumber: number): Promise<Locator> {
    return this.page.locator('.survey-canvas section').nth(pageNumber - 1);
  }
  /**
   *
   * @param pageNumber - the page number
   */
  async clickAddQuestionLinkOnPageX(pageNumber: number): Promise<void> {
    const surveyPage = await this.surveyPageX(pageNumber);
    const questionLink = surveyPage.getByRole('link', { name: 'Question', exact: true });
    await questionLink.click();
  }
}
