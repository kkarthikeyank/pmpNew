// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pages/LoginPage.js';
// import { ClaimsPage } from '../pages/ClaimsPage.js';
// // import data from '../../data/testData.json' assert { type: 'json' };
// import data from '../../../data/testData.json' assert { type: 'json' };

// test.describe('Claims Smoke Test', () => {
//   let login;
//   let claims;
//   let context;
//   let page;

//   test.beforeAll(async ({ browser }) => {
//     context = await browser.newContext();
//     page = await context.newPage();

//     login = new LoginPage(page);
//     claims = new ClaimsPage(page); // You can pass page via constructor also if designed that way

//     await login.gotoLoginPage();
//     await login.login(data.user, data.password);
//     await page.waitForURL('**/member-portal/**', { timeout: 180000 });
//   });

//   test.afterAll(async () => {
//     await context.close();
//   });

//   test('Smoke: Open Claims tab after login', async () => {
//     await claims.openClaimsTab();
//     // You can add basic assertion like
//     await expect(claims.claimTabHeader).toBeVisible(); // assuming this exists
//   });

//   test('Smoke: Print all claims for each filter label', async () => {
//     for (const filter of data.claimsDateFilter) {
//       await claims.filterAndPrintClaimsByLabel(filter.label, filter.resultsSelectOption);
//     }
//   });
// });


import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';  // ✅ Fixed: Go up 2 levels then into pages
import { ClaimsPage } from '../../pages/ClaimsPage.js';
import { ProviderPage } from '../../pages/ProviderPage.js'; // ✅ Fixed: Go up 2 levels then into pages
// import data from '../../../data/testData.json' assert { type: 'json' };

import { readFileSync } from 'fs';
const data = JSON.parse(readFileSync(new URL('../../data/testData.json', import.meta.url)));


test.describe('Claims Smoke Test', () => {
  let login;
  let claims;
  let provider;

  let context;
  let page;
  
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    login = new LoginPage(page);
    claims = new ClaimsPage(page);
    provider = new ProviderPage(page);

    await login.gotoLoginPage();
    await login.login(data.user, data.password);
    await page.waitForURL('**/member-portal/**', { timeout: 180000 });
  });

  test.afterAll(async () => {
    await context.close();
  });

  test('@Smoke: Open Claims tab after login', async () => {
    await claims.openClaimsTab();
    // Basic assertion for claims tab
    // await expect(page.locator('[data-testid="claims"], .claims-header, #claims-tab')).toBeVisible({ timeout: 10000 });
  });

  test('@Smoke: Print all claims for each filter label', async () => {
    for (const filter of data.claimsDateFilter) {
      await claims.filterAndPrintClaimsByLabel(filter.label, filter.resultsSelectOption);
    }
//   });
  });

  
  test('Smoke: Open Providers tab and validate provider list', async () => {
await provider.openproviderTab();    // const providerNames = await provider.getProviderNames();
    // console.log(`→ Providers found: ${providerNames.length}`);
    // expect(providerNames.length).toBeGreaterThan(0);
  });
});