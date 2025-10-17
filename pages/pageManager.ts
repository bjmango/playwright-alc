import { Page } from '@playwright/test';
import { LoginSpaPage } from './loginSpa.page';
import { LegacyLoginPage } from './loginLegacy.page';
import { DashboardPage } from './dashboard.page';

export class PageManager {
  private page: Page;
  private loginSpaPage: LoginSpaPage;
  private legacyLoginPage: LegacyLoginPage;
  private dashboardPage: DashboardPage;

  constructor(page: Page) {
    this.page = page;
    this.loginSpaPage = new LoginSpaPage(page);
    this.legacyLoginPage = new LegacyLoginPage(page);
    this.dashboardPage = new DashboardPage(page);
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
