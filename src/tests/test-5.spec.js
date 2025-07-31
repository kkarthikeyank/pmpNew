import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/login');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('https://hpp1.b2clogin.com/hpp1.onmicrosoft.com/b2c_1_portalregistration/oauth2/v2.0/authorize?client_id=7d7e2fce-ddb0-45ae-bc42-f5372b8410a4&redirect_uri=https%3A%2F%2Fhikepmp-dev.smilecdr.com%2Fmember-portal%2F&response_type=code&scope=openid%20profile%20offline_access%20https%3A%2F%2Fhpp1.onmicrosoft.com%2Ffhir%2Fpatient%20https%3A%2F%2Fhpp1.onmicrosoft.com%2Ffhir%2Fcdr_all_user_authorities&nonce=0fbac3ede5c39da3a64f51cdc7fbb3d855qCgv4BK&state=3bd511afbe215712bab51de5b0ac562f47cfwXmLe&code_challenge=UJAcd5_qkutj50joEdNDkw5SycVMCRtOHh_mDwiL9s4&code_challenge_method=S256');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Julia');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Batman123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/dashboard');
  await page.getByText('Healthchoices Maternity&child').click();
  await page.getByText('850497953').click();
  await page.getByText('julia donaldson', { exact: true }).click();
  await page.getByRole('link', { name: 'navbarLinkIcon Claims' }).click();
  await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/claims');
  await page.getByRole('button', { name: '-08-2024 - 04-08-2025' }).click();
  await page.getByRole('radio', { name: 'Last 60 Months' }).check();
  await page.getByRole('button', { name: 'Done' }).click();
  await page.locator('#viewDetails144111').click();
  await page.getByText('Return to previous page').click();
  await page.getByRole('textbox', { name: 'Claim Number' }).click();
  await page.getByRole('textbox', { name: 'Claim Number' }).fill('144111');
  await page.getByRole('button', { name: 'Apply' }).click();
  await page.getByRole('button', { name: 'Clear' }).click();
  await page.getByRole('button', { name: '-08-2024 - 04-08-2025' }).click();
  await page.getByRole('radio', { name: 'Custom' }).check();
  await page.locator('#dpFromDateInput').click();
  await page.getByLabel('Tuesday, April 1,').getByText('1').click();
  await page.getByRole('button', { name: 'Select To Date' }).click();
  await page.getByLabel('Wednesday, April 30,').getByText('30').click();
  await page.getByRole('button', { name: 'Done' }).click();
  await page.getByText('No matching results were').click();
  await page.getByRole('link', { name: 'navbarLinkIcon Labs' }).click();
  await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/labs');

  await page.getByRole('textbox', { name: 'ex. Life Labs' }).click();
  await page.getByRole('textbox', { name: 'ex. Life Labs' }).fill('Precision Labs');
  await page.getByRole('button', { name: 'Apply' }).click();
  await page.getByText('Clear').click();
  await page.locator('form[name="filterFormGroup"] div').filter({ hasText: 'Abnormal' }).nth(2).click();
  await page.getByRole('checkbox', { name: 'Checkbox for Abnormal' }).check();
  await page.getByRole('button', { name: 'Apply' }).click();
  await page.getByRole('link', { name: 'navbarLinkIcon Provider' }).click();
  await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/providers');
  await page.getByText('Doctor\'s Type').click();
  await page.locator("//button[@id='dropdownPlanFilterButton']").click();

  await page.getByText('KidzPartners').click();
  // await page.getByText('No matching results were').click();
  await expect(page.getByText('No matching results were')).toBeVisible();

  await page.getByText('Clear').click();
  await page.locator('div:nth-child(3) > app-provider-search-card > .card > .card-footer').click();
  await page.locator('[id="\\35 5641compare"]').check();
  await page.getByRole('checkbox', { name: 'Compare with other providers' }).check();
  await page.getByRole('button', { name: 'Compare providers (2)' }).click();
  await page.getByRole('heading', { name: 'Compare Providers' }).click();
  await page.getByText('Return to previous page').click();
  await page.getByRole('button', { name: 'My Directory' }).click();
  await page.locator('[id="\\35 5641"]').getByRole('button', { name: 'View details' }).click();
  await page.getByText('Return to previous page').click();
  await page.getByRole('button', { name: 'My Directory' }).click();
  await page.getByRole('button', { name: 'Remove All' }).click();
  await page.getByText('No matching results were').click();
});

// import { test, expect } from '@playwright/test';

// test('SmileCDR Member Portal E2E Test', async ({ page }) => {
//   const SHORT_TIMEOUT = 1000;

//   // Step 1: Go to login page
//   await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/login');
//   await page.waitForTimeout(SHORT_TIMEOUT);

//   // Step 2: Click Login to redirect to Azure B2C
//   await page.getByRole('button', { name: 'Login' }).click();
//   await page.waitForTimeout(SHORT_TIMEOUT);

//   // Step 3: Login using credentials
//   await page.getByRole('textbox', { name: 'Username' }).fill('Julia');
//   await page.getByRole('textbox', { name: 'Password' }).fill('Batman123');
//   await page.getByRole('button', { name: 'Sign in' }).click();
//   // await page.waitForTimeout(SHORT_TIMEOUT);

//   // Step 4: Open dashboard
//   await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/dashboard');
//   // await page.waitForTimeout(SHORT_TIMEOUT);

//   // Step 5: Select patient and access their data
//   await page.getByText('Healthchoices Maternity&child').click();
//   await page.waitForTimeout(SHORT_TIMEOUT);
//   await page.getByText('850497953').click();
//   await page.waitForTimeout(SHORT_TIMEOUT);
//   await page.getByText('julia donaldson', { exact: true }).click();
//   await page.waitForTimeout(SHORT_TIMEOUT);

//   // Step 6: Go to Claims section
//   await page.getByRole('link', { name: 'navbarLinkIcon Claims' }).click();
//   await page.waitForTimeout(SHORT_TIMEOUT);

//   // Step 7: Filter claims - Last 60 months
//   await page.getByRole('button', { name: '-08-2024 - 04-08-2025' }).click();
//   await page.getByRole('radio', { name: 'Last 60 Months' }).check();
//   await page.getByRole('button', { name: 'Done' }).click();
//   await page.waitForTimeout(SHORT_TIMEOUT);

//   // Step 8: View and return from claim details
//   await page.locator('#viewDetails144111').click();
//   await page.getByText('Return to previous page').click();
//   await page.waitForTimeout(SHORT_TIMEOUT);

//   // Step 9: Search claim number
//   await page.getByRole('textbox', { name: 'Claim Number' }).fill('144111');
//   await page.getByRole('button', { name: 'Apply' }).click();
//   await page.getByRole('button', { name: 'Clear' }).click();
//   await page.waitForTimeout(SHORT_TIMEOUT);

//   // Step 10: Apply custom date range
//   await page.getByRole('button', { name: '-08-2024 - 04-08-2025' }).click();
//   await page.getByRole('radio', { name: 'Custom' }).check();
//   await page.locator('#dpFromDateInput').click();
//   await page.getByLabel('Tuesday, April 1,').getByText('1').click();
//   await page.getByRole('button', { name: 'Select To Date' }).click();
//   await page.getByLabel('Wednesday, April 30,').getByText('30').click();
//   await page.getByRole('button', { name: 'Done' }).click();
//   await page.getByText('No matching results were').click();
//   await page.waitForTimeout(SHORT_TIMEOUT);

//   // Step 11: Navigate to Labs and filter
//   await page.getByRole('link', { name: 'navbarLinkIcon Labs' }).click();
//   await page.getByRole('textbox', { name: 'ex. Life Labs' }).fill('Precision Labs');
//   await page.getByRole('button', { name: 'Apply' }).click();
//   await page.getByText('Clear').click();
//   await page.locator('form[name="filterFormGroup"] div').filter({ hasText: 'Abnormal' }).nth(2).click();
//   await page.getByRole('checkbox', { name: 'Checkbox for Abnormal' }).check();
//   await page.getByRole('button', { name: 'Apply' }).click();
//   await page.waitForTimeout(SHORT_TIMEOUT);

//   // Step 12: Go to Providers
//   await page.getByRole('link', { name: 'navbarLinkIcon Provider' }).click();
//   await page.waitForTimeout(SHORT_TIMEOUT);

//   // Step 13: Apply filters on providers
//   await page.getByText('Doctor\'s Type').click();
//   for (let i = 0; i < 6; i++) {
//     await page.getByRole('button', { name: 'Health Partners' }).click();
//   }
//   await page.getByText('KidzPartners').click();
//   await page.getByText('No matching results were').click();
//   await page.getByText('Clear').click();
//   await page.waitForTimeout(SHORT_TIMEOUT);

//   // Step 14: Compare providers
//   await page.locator('div:nth-child(3) > app-provider-search-card > .card > .card-footer').click();
//   await page.locator('[id="\\35 5641compare"]').check();
//   await page.getByRole('checkbox', { name: 'Compare with other providers' }).check();
//   await page.getByRole('button', { name: 'Compare providers (2)' }).click();
//   await page.getByRole('heading', { name: 'Compare Providers' }).click();
//   await page.getByText('Return to previous page').click();
//   await page.waitForTimeout(SHORT_TIMEOUT);

//   // Step 15: Use My Directory
//   await page.getByRole('button', { name: 'My Directory' }).click();
//   await page.locator('[id="\\35 5641"]').getByRole('button', { name: 'View details' }).click();
//   await page.getByText('Return to previous page').click();
//   await page.getByRole('button', { name: 'My Directory' }).click();
//   await page.getByRole('button', { name: 'Remove All' }).click();
//   await page.getByText('No matching results were').click();
//   await page.waitForTimeout(SHORT_TIMEOUT);
// });
