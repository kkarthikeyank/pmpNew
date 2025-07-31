// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/login');
//   await page.getByRole('button', { name: 'Login' }).click();
//   await page.goto('https://hpp1.b2clogin.com/hpp1.onmicrosoft.com/b2c_1_portalregistration/oauth2/v2.0/authorize?client_id=7d7e2fce-ddb0-45ae-bc42-f5372b8410a4&redirect_uri=https%3A%2F%2Fhikepmp-dev.smilecdr.com%2Fmember-portal%2F&response_type=code&scope=openid%20profile%20offline_access%20https%3A%2F%2Fhpp1.onmicrosoft.com%2Ffhir%2Fpatient%20https%3A%2F%2Fhpp1.onmicrosoft.com%2Ffhir%2Fcdr_all_user_authorities&nonce=c712594db3a11385909be08076a5cc16b5Q4Y3ZoJ&state=582c7b2f5323bb64343024c12595467c44SJIumk6&code_challenge=AkITeYlk9aUIs2XFUjFZ8_BJbrAF_HPcDOSIAWK2akg&code_challenge_method=S256');
//   await page.getByRole('textbox', { name: 'Username' }).click();
//   await page.getByRole('textbox', { name: 'Username' }).fill('Julia');
//   await page.getByRole('textbox', { name: 'Password' }).click();
//   await page.getByRole('textbox', { name: 'Password' }).fill('Batman123');
//   await page.getByRole('button', { name: 'Sign in' }).click();
//   await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/dashboard');
// });

import { test, expect } from '@playwright/test';

test('Login and Dashboard Navigation', async ({ page }) => {
  // Set a default timeout for all actions in this test (optional)
  test.setTimeout(60000); // 60 seconds

  // Go to login page
  await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/login');

  // Wait for login button and click
  await page.getByRole('button', { name: 'Login' }).click();

  // Auto-navigation to the Microsoft login page will happen here
  // Wait for the username textbox to be visible
  await page.waitForSelector('input[name="username"]', { timeout: 10000 });

  // Fill credentials
  await page.getByRole('textbox', { name: 'Username' }).fill('Julia');
  await page.getByRole('textbox', { name: 'Password' }).fill('Batman123');

  // Sign in
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Wait for dashboard to appear
  await page.waitForURL('**/dashboard', { timeout: 15000 });

  // You can also check if dashboard is loaded properly
  await expect(page).toHaveURL(/.*dashboard/);
});
