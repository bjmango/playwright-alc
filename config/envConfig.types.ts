export interface EnvConfig {
  baseUrl: string;
  apiCallsBaseUrl: string;
  takeSurveyUrl: string;
  legacyUrl: string;
  msGatewayUrl: string;
  dashboardSpaUrl: string;
  trayToken: string;
  auth0ManagedAccounts: Record<string, Auth0ManagedAccount>;
  applicationManagedAccounts: Record<string, ApplicationManagedAccount>;
  internalToolAccount: InternalToolAccount;
}

export interface Auth0ManagedAccount {
  email?: string;
  name?: string;
  customerId?: string;
  userId?: string;
  apiKey?: string;
  apiSecurityKey?: string;
  privateDomain?: string;
  timezone?: string;
  datablock?: number;
  v_database?: string;
  variables?: {
    environment?: string;
    dataCenter?: string;
    [key: string]: unknown;
  };
  users?: Record<string, Partial<User>>;
  teamToImportTransferedSurveys?: Record<string, unknown>;
  notDeleteWorkflow?: Record<string, unknown>;
  surveyHasAllActions?: Record<string, unknown>;
  surveyTheme?: Record<string, unknown>;
  surveyHasBasicQuestions?: Record<string, unknown>;
  surveyHasIntermediateQuestions?: Record<string, unknown>;
  surveyHasAdvancedQuestions?: Record<string, unknown>;
  surveyHasEmailAction?: Record<string, unknown>;
  surveyHasNoEmailAction?: Record<string, unknown>;
  surveyToTransferHasEmailAction?: Record<string, unknown>;
  surveyToTransferHasNoEmailAction?: Record<string, unknown>;
  surveyFlagged?: Record<string, unknown>;
  surveySms?: Record<string, unknown>;
  sendSmsCampaign?: Record<string, unknown>;
  surveyFileUpload?: Record<string, unknown>;
  subAccounts?: SubAccount[];
}

export interface ApplicationManagedAccount {
  email?: string;
  name?: string;
  customerId?: string;
  userId?: string;
  apiKey?: string;
  apiSecurityKey?: string;
  privateDomain?: string;
  timezone?: string;
  datablock?: number;
  v_database?: string;
  trayToken?: string;
  ssoId?: string;
  microserviceClient?: {
    msUserName: string;
    msPassword: string;
    msScope: string;
  };
  users?: Record<string, Partial<User>>;
  filterIndividualResponses?: {
    surveyId: string;
  };
  surveyResponsesSurvey?: {
    surveyId: string;
  };
  notDeleteWorkflow?: {
    workflowId: string;
    stepId: string;
  };
  surveyHasAllActions?: {
    surveyId: string;
    surveyTitle: string;
  };
  surveyHasBasicQuestions?: {
    surveyId: string;
    surveyTitle: string;
  };
  surveyHasIntermediateQuestions?: {
    surveyId: string;
    surveyTitle: string;
  };
  surveyHasAdvancedQuestions?: {
    surveyId: string;
    surveyTitle: string;
  };
  surveyHasEmailAction?: {
    surveyId: string;
  };
  surveyHasNoEmailAction?: {
    surveyId: string;
  };
  surveyToTransferHasEmailAction?: {
    surveyId: string;
  };
  surveyToTransferHasNoEmailAction?: {
    surveyId: string;
  };
  teamToImportTransferedSurveys?: {
    teamId: string;
  };
  surveyFlagged?: {
    surveyId: string;
    surveyTitle: string;
  };
  surveySms?: {
    surveyId: string;
    surveyTitle: string;
  };
  sendSmsCampaign?: {
    organizationName: string;
  };
  surveyFileUpload?: {
    surveyId: string;
    surveyTitle: string;
    fileName: string;
    fileSize: string;
  };
  subAccounts?: SubAccount[];
  survey?: {
    surveyId: string;
    surveyTitle: string;
  };
  emailCampaignNotAuthorizedPermissionId?: string;
  surveyId?: string;
  surveyTitle?: string;
  surveyTakeingUrl?: string;
  googleSheetUrl?: string;
  surveyResponseUrl?: string;
  radioBtn1?: string;
  radioBtn2?: string;
  checkBox1?: string;
  checkBox2?: string;
  salesforceAuthenticationName?: string;
  salesforceBaseUrl?: string;
  salesforceClientId?: string;
  salesforceClientSecret?: string;
  salesforceUsername?: string;
  salesforcePassword?: string;
  trayInitUrl?: string;
  traySolutions?: string;
  userName?: string;
  groupNestingPermissionId?: string;
  workflowPermissionId?: string;
  integrationManagerPermissionId?: string;
  integrationSalesforcePermissionId?: string;
  integrationShopifyPermissionId?: string;
  integrationZendeskPermissionId?: string;
  integrationGladlyPermissionId?: string;
}

export interface User {
  email?: string;
  userId?: string;
  userName?: string;
  teamName?: string;
  teamId?: string;
  teamDescription?: string;
}

export interface SubAccount {
  id: string;
  license: string;
  email: string;
}

export interface InternalToolAccount {
  email: string;
  baseUrl: string;
  userId: string;
  licensePermissionsPageUrl: string;
  planPermissionsPageUrl: string;
}
