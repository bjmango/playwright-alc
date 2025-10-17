import { Page } from 'playwright';

export class HelpBase {
  public readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    return;
  }
}
