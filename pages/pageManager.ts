import { Page } from '@playwright/test';
import { LoginSpaPage } from './loginSpa.page';
import { LegacyLoginPage } from './loginLegacy.page';
import { DashboardPage } from './dashboard.page';

export class PageManager {
  private readonly page: Page;
  private readonly loginSpaPage: LoginSpaPage;
  private readonly legacyLoginPage: LegacyLoginPage;
  private readonly dashboardPage: DashboardPage;

  constructor(page: Page) {
    this.page = page;
    this.loginSpaPage = new LoginSpaPage(this.page);
    this.legacyLoginPage = new LegacyLoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
  }

  onLoginSpaPage(): LoginSpaPage {
    return this.loginSpaPage;
  }

  onLegacyLoginPage(): LegacyLoginPage {
    return this.legacyLoginPage;
  }

  onDashboardPage(): DashboardPage {
    return this.dashboardPage;
  }
}
