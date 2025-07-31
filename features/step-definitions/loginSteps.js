import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../src/pages/LoginPage.js';
import { expect } from '@playwright/test';
import { readFileSync } from 'fs';

// Safe JSON import
const data = JSON.parse(readFileSync(new URL('../../data/testData.json', import.meta.url)));

let loginPage;

Given('I am on the login page', async function () {
  loginPage = new LoginPage(this.page);
  console.log('🌐 Navigating to login page...');
  await loginPage.gotoLoginPage();
  console.log('✅ Login page loaded successfully');
});

When('I login with {string} and {string}', async function (username, password) {
  console.log(`🔐 Attempting login with username: ${username}`);
  await loginPage.login(username, password);
  console.log('📝 Login credentials submitted');
});

When('I login with valid credentials', async function () {
  console.log(`🔐 Logging in with valid credentials: ${data.user}`);
  await loginPage.login(data.user, data.password);
  console.log('📝 Login with valid credentials completed');
});

Then('I should be logged in successfully', async function () {
  console.log('✅ Verifying successful login...');
  
  // Wait for successful navigation to member portal
  await this.page.waitForURL('**/member-portal/**', { timeout: 180000 });
  
  // Verify we're on the dashboard/member portal
  expect(this.page.url()).toContain('member-portal');
  
  console.log('🎉 Login successful - Redirected to member portal');
});

Then('I should see login error', async function () {
  console.log('❌ Verifying login error...');
  
  // Wait for error message or check we're still on login page
  const currentUrl = this.page.url();
  expect(currentUrl).toContain('login');
  
  // You can add specific error message checks here
  // await expect(this.page.locator('.error-message')).toBeVisible();
  
  console.log('⚠️ Login error verified - Still on login page');
});