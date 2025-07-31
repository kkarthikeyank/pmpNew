// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pages/LoginPage.js';
// import { DashboardPage } from '../pages/DashboardPage.js';
// import { ClaimsPage } from '../pages/ClaimsPage.js';
// import { LabsPage } from '../pages/LabsPage.js';
// import { ProvidersPage } from '../pages/ProvidersPage.js';
// import { TIMEOUTS, CREDENTIALS } from '../utils/constants.js';

// test('SmileCDR Member Portal Workflow', async ({ page }) => {
//   const login = new LoginPage(page);
//   const dashboard = new DashboardPage(page);
//   const claims = new ClaimsPage(page);
//   const labs = new LabsPage(page);
//   const providers = new ProvidersPage(page);

//   await login.login(CREDENTIALS.username, CREDENTIALS.password);
//   await dashboard.selectMember();

//   await claims.viewClaims();
//   await labs.searchLabs();
//   await providers.exploreProviders();
// });
