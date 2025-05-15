export interface EnvConfig {
  baseUrl?: string;
  applicationManagedAccounts: {
    mainAccount: {
      email: string;
      privateDomain?: string;
      users?: {
        folderUser?: { email: string };
        [key: string]: { email: string } | undefined;
      };
      [key: string]: any;
    };
    freeSecondAccount?: {
      email: string;
      customerId?: string;
      survey?: {
        surveyId: string;
        surveyTitle: string;
      };
      [key: string]: any;
    };
    masterAccount?: { email: string };
    appleAccount?: { email: string };
    paginationAccount?: { email: string };
    folderManagementAccount?: { email: string; apiSecurityKey?: string };
    googlesheetIntegrationAccount?: { timezone?: string };
    [key: string]: any;
  };
  [key: string]: any;
}
