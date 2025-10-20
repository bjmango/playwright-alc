import { Page, Locator } from '@playwright/test';
import { HelpBase } from 'utils/help-base';

export class InsertQuestionPanel extends HelpBase {
  private readonly questionTypeDropdown: Locator;
  private readonly radioButtonQuestionMenuItem: Locator;
  private readonly questionTitleInput: Locator;
  private readonly option1Input: Locator;
  private readonly option2Input: Locator;
  private readonly saveQuestionButton: Locator;

  constructor(page: Page) {
    super(page);
    this.questionTypeDropdown = this.page.getByRole('button', { name: 'Radio Buttons' });
    this.radioButtonQuestionMenuItem = this.page.getByRole('menuitem', { name: 'Radio Buttons' });
    this.questionTitleInput = this.page
      .locator('iframe[title="Rich Text Editor, question-title"]')
      .contentFrame()
      .locator('body');
    this.option1Input = this.page.getByRole('textbox', { name: 'Option 1' });
    this.option2Input = this.page.getByRole('textbox', { name: 'Option 2' });
    this.saveQuestionButton = this.page.getByRole('button', { name: 'Save Question', exact: true });
  }

  async addRadioButtonQuestion(
    questionText: string,
    option1: string,
    option2: string
  ): Promise<void> {
    await this.questionTypeDropdown.click();
    await this.radioButtonQuestionMenuItem.click();
    await this.questionTitleInput.fill(questionText);
    await this.option1Input.fill(option1);
    await this.option2Input.fill(option2);
    await this.saveQuestionButton.click({ force: true });
    // Wait for the question to appear in the survey builder UI after saving
    await this.page
      .getByText(questionText, { exact: false })
      .waitFor({ state: 'visible', timeout: 15000 });
  }
}
