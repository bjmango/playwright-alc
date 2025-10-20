import { Page } from '@playwright/test';
import { LoginSpaPage } from './login/login-landing.page';
import { LegacyLoginPage } from './login/login-legacy.page';
import { DashboardPage } from './dashboards/dashboard.page';
import { CreateSurveyDialog } from './dashboards/survey-dashboard-create-survey.dialog';
import { SurveyDashboardPage } from './dashboards/survey-dashboard.page';
import { SurveyBuilderPage } from './survey-builder/survey-builder.page';
import { InsertQuestionPanel } from './survey-builder/survey-builder-insert-question.panel';
export class PageManager {
  private readonly page: Page;
  private readonly loginSpaPage: LoginSpaPage;
  private readonly legacyLoginPage: LegacyLoginPage;
  private readonly dashboardPage: DashboardPage;
  private readonly surveyDashboardPage: SurveyDashboardPage;
  private readonly createSurveyDialog: CreateSurveyDialog;
  private readonly surveyBuilderPage: SurveyBuilderPage;
  private readonly insertQuestionPanel: InsertQuestionPanel;

  constructor(page: Page) {
    this.page = page;
    this.loginSpaPage = new LoginSpaPage(this.page);
    this.legacyLoginPage = new LegacyLoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.surveyDashboardPage = new SurveyDashboardPage(this.page);
    this.createSurveyDialog = new CreateSurveyDialog(this.page);
    this.surveyBuilderPage = new SurveyBuilderPage(this.page);
    this.insertQuestionPanel = new InsertQuestionPanel(this.page);
  }

  async goto(url: string = '/'): Promise<void> {
    await this.page.goto(url);
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

  onSurveyDashboardPage(): SurveyDashboardPage {
    return this.surveyDashboardPage;
  }

  onCreateSurveyDialog(): CreateSurveyDialog {
    return this.createSurveyDialog;
  }

  onSurveyBuilderPage(): SurveyBuilderPage {
    return this.surveyBuilderPage;
  }

  onInsertQuestionPanel(): InsertQuestionPanel {
    return this.insertQuestionPanel;
  }
}
