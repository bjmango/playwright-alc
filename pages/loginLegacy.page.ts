import { Locator, Page } from '@playwright/test';
import { HelpBase } from 'utils/helpBase';

export class LegacyLoginPage extends HelpBase {
  private readonly userEmail: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.userEmail = this.page.locator('[name="USERNAME"]');
    this.passwordInput = this.page.locator('#password');
    this.loginButton = this.page.getByRole('button', { name: 'Log In' });
  }

  async legacyLogin(password: string): Promise<void> {
    await this.passwordInput.fill(password);
    console.log(`legacy login call with ${this.userEmail} and ${password}`);
    await this.loginButton.click();
    await this.waitForNetworkIdle();
  }
}
