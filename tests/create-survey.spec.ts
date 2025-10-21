import { expect } from '@playwright/test';
import { test } from '../fixtures/base';

/**
 * Override the user here to test with a specific user in test level.
 * for example: test.use({
 *   user: { email: 'cypressRolesDowngrade@sgizmo.com', password: process.env.DEFAULT_PASSWORD || '' },
 * });
 */

test.describe('Create Survey Suite', () => {
  test('Create Survey', async ({ pm }) => {
    await pm.onDashboardPage().goto();
    await pm.onSurveyDashboardPage().createNewSurvey();
    await pm.onCreateSurveyDialog().startBuilding('e2eTest_Survey');
    await pm.onSurveyBuilderPage().addQuestion();
    await pm
      .onInsertQuestionPanel()
      .addRadioButtonQuestion('What is your favorite color?', 'Red', 'Blue');
    await pm.onSurveyBuilderPage().insertPageAfterPageX(1);
    await pm.onSurveyBuilderPage().clickAddQuestionLinkOnPageX(2);
    await pm
      .onInsertQuestionPanel()
      .addRadioButtonQuestion('Select your hobbies', 'Reading', 'Traveling');
    const pageOne = await pm.onSurveyBuilderPage().surveyPageX(1);
    await expect(pageOne.getByText('What is your favorite color?')).toBeVisible();
    const pageTwo = await pm.onSurveyBuilderPage().surveyPageX(2);
    await expect(pageTwo.getByText('Select your hobbies')).toBeVisible();
  });
});
