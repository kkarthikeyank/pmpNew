import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/login');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Julia');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Batman123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/dashboard');
  //  await page.locator("//span[normalize-space()='Home']").click();

  // await page.getByRole('link', { name: 'navbarLinkIcon Claims' }).click();
  await page.locator("//span[normalize-space()='Claims']").click();

  await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/claims');
  // await page.getByLabel('Claims - Member Portal').click();
});





