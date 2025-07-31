// @ts-check
import { test, expect } from '@playwright/test';
test.use({ headless: true });
test.only('has title', async ({ page }) => {
  await page.goto('https://hikepmp-dev.smilecdr.com/admin/member-portal/#/login');
  
    await page.waitForTimeout(5000); // waits for 2 seconds
await page.locator('//button[@id="loginButton"]').click();
  console.log('Login button clicked');
  await page.waitForTimeout(10000);
  await page.locator('//input[@id="lookupFirstName"]').click();

   await page.locator('//input[@id="lookupFirstName"]').fill('julia');

   await page.locator("//button[normalize-space()='Search']").click();
  console.log('Search button clicked');

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle( 'LetCode with Koushik' );
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
