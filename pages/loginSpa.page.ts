import { Locator, Page } from '@playwright/test';
import { HelpBase } from 'utils/helpBase';

export class LoginSpaPage extends HelpBase {
  private readonly emailInput: Locator;
  private readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = this.page.getByRole('textbox', { name: 'Enter your email address' });
    this.continueButton = this.page.getByRole('button', { name: 'Continue' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async typeInEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.continueButton.click();
  }
}
