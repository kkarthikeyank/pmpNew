

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// import dotenv from 'dotenv';

// Load environment variables

// Resolve __dirname equivalent in ES modules


test('Login and extract access token from sessionStorage', async ({ page }) => {
  await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/login');

  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Julia');
  await page.getByRole('textbox', { name: 'Password' }).fill('Batman123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.waitForLoadState('networkidle');

  const accessToken = await page.evaluate(() => {
    const mainItem = sessionStorage.getItem('main');
    if (!mainItem) return null;
    try {
      const parsed = JSON.parse(mainItem);
      return parsed.authnResult?.access_token || null;
    } catch {
      return null;
    }
  });

  if (accessToken) {
    const tokenPath = path.resolve(__dirname, '../../../token.json');
    fs.writeFileSync(tokenPath, JSON.stringify({ access_token: accessToken }, null, 2));
    console.log('✅ Access token saved to token.json');
  } else {
    console.error('❌ AccessToken not found or invalid sessionStorage structure.');
  }

  expect(accessToken).not.toBeNull();
});
