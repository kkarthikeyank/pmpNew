import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage.js'; // Path to your LoginPage class

test('Login with valid credentials', async ({ page }) => {
  // Initialize the LoginPage with the Playwright page object
  const loginPage = new LoginPage(page);

  // Navigate to the login page
  await loginPage.gotoLoginPage();

  // Perform the login with provided username and password
  await loginPage.login('Julia', 'Batman123');

  // Wait for the URL to change to the member portal after successful login
  await page.waitForURL('**/member-portal/**', { timeout: 180000 });

  // Assert that we are redirected to the member portal
  expect(page.url()).toContain('/member-portal/');
});


test('[@smoke]Login with incorrect username ', async ({ page }) => {
    // Initialize the LoginPage with the Playwright page object
    const loginPage = new LoginPage(page);
  
    // Navigate to the login page
    await loginPage.gotoLoginPage();
  
    // Attempt to log in with an incorrect username and correct password
    await loginPage.login('InvalidUsername', 'Batman123');
  
    // Wait for the error message to appear (assuming there's an error message on the page)
    const errorMessage = page.locator('text=Invalid username or password');  // Change this based on the actual error message selector
    await expect(errorMessage).toBeVisible();  // Assert that the error message is visible
  });
  