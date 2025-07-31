// const { test } = require('@playwright/test');
// const { LoginPage } = require('../pages/LoginPage');
// const { ClaimsPage } = require('../pages/ClaimsPage');
// const { ProvidersPage } = require('../pages/ProvidersPage');

// test('Claim Search Test', async ({ page }) => {
//   test.setTimeout(70000);

//   const loginPage = new LoginPage(page);
//   const claimsPage = new ClaimsPage(page);
//   const providersPage = new ProvidersPage(page);

//   await loginPage.goto();
//   await loginPage.login('Julia', 'Batman123');

//   await claimsPage.goto();
//   await claimsPage.searchClaim('414656654');

//   await providersPage.goto();
//   await providersPage.searchProvider('aaron');
// });


import { test, expect } from '@playwright/test';

test('Login and click on Claims tab', async ({ page }) => {
  // Go to the login page
  await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/login');
  
  // Fill in login credentials
  await page.fill('input[name="username"]', 'Julia');  // Replace with the correct selector for the username field
  await page.fill('input[name="password"]', 'Batman123');  // Replace with the correct selector for the password field

  // Click the Sign-in button
  await page.click('button:has-text("Sign in")');

  // Wait for the page to load after login
  await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 });

  // Ensure the Claims tab is visible before clicking
  const claimsTab = await page.locator('#navLink-CLAIMS');
  await claimsTab.waitFor({ state: 'visible', timeout: 20000 });

  // Click the Claims tab
  await claimsTab.click();

  // Optionally, you can wait for some specific element to ensure the Claims page has fully loaded
  // For example, waiting for a claim-related element to appear after the tab is clicked:
  // await page.waitForSelector('selector-for-claims-page', { state: 'visible', timeout: 20000 });
});
