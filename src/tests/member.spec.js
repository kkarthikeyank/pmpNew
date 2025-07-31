import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/login');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Julia');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Batman123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  // await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/dashboard');
  await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/dashboard', { timeout: 60000 });

  // await page.getByRole('link', { name: 'navbarLinkIcon Provider' }).click();
  await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/providers',{ timeout: 60000 });
  // await page.getByRole('link', { name: 'navbarLinkIcon Provider' }).click();
  await page.getByText('Doctor\'s Type').click();
  await page.getByText('Doctor\'s Name').click();
  await page.getByText('Health Facilities').click();
  await page.getByRole('link', { name: 'navbarLinkIcon Claims' }).click();
  await page.getByRole('link', { name: 'navbarLinkIcon Labs' }).click();
  await page.getxpath("//span[normalize-space()='Home']").click();
});

