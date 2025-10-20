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

  async waitForRequest(urlPart: string): Promise<void> {
    await this.page.waitForRequest(request => request.url().includes(urlPart));
  }

  async waitForSeconds(seconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }
}
