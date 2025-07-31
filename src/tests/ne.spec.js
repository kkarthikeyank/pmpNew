import { test, expect } from '@playwright/test';

const BASE_URL = 'https://hikepmp-dev.smilecdr.com/member-portal/#/login';

// Function to perform login attempt
async function attemptLogin(page, username, password) {
  await page.goto(BASE_URL);

  const loginButton = page.getByRole('button', { name: 'Login' });
  await loginButton.waitFor({ state: 'visible' });
  await loginButton.click();

  const usernameField = page.getByRole('textbox', { name: 'Username' });
  await usernameField.waitFor({ state: 'visible' });
  await usernameField.fill(username);

  const passwordField = page.getByRole('textbox', { name: 'Password' });
  await passwordField.waitFor({ state: 'visible' });
  await passwordField.fill(password);

  const signInButton = page.getByRole('button', { name: 'Sign in' });
  await signInButton.waitFor({ state: 'visible' });
  await signInButton.click();
}

test.describe('Negative Login Test Cases', () => {
  
  test('Invalid Username and Valid Password', async ({ page }) => {
    await attemptLogin(page, 'InvalidUser', 'Batman123');
    // await expect(page.getByText('Invalid username or password')).toBeVisible();
  });
  
  test('Valid Username and Invalid Password', async ({ page }) => {
    await attemptLogin(page, 'Julia', 'WrongPass123');
    await expect(page.getByText('Invalid username or password')).toBeVisible();
  });
  
  test('Invalid Username and Invalid Password', async ({ page }) => {
    await attemptLogin(page, 'FakeUser', 'FakePass');
    await expect(page.getByText('Invalid username or password')).toBeVisible();
  });
  
  test('Empty Username and Password Fields', async ({ page }) => {
    await attemptLogin(page, '', '');
    await expect(page.getByText('Username is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  });
  
  test('Only Username Filled, Password Empty', async ({ page }) => {
    await attemptLogin(page, 'Julia', '');
    await expect(page.getByText('Password is required')).toBeVisible();
  });
  
  test('Only Password Filled, Username Empty', async ({ page }) => {
    await attemptLogin(page, '', 'Batman123');
    await expect(page.getByText('Username is required')).toBeVisible();
  });
  
  test('Whitespace as Username and Password', async ({ page }) => {
    await attemptLogin(page, '    ', '    ');
    await expect(page.getByText('Invalid username or password')).toBeVisible();
  });
  
  test('SQL Injection Attempt', async ({ page }) => {
    await attemptLogin(page, "' OR 1=1 --", 'Batman123');
    await expect(page.getByText('Invalid username or password')).toBeVisible();
  });
  
  test('Excessively Long Username or Password', async ({ page }) => {
    const longString = 'a'.repeat(300);
    await attemptLogin(page, longString, longString);
    await expect(page.getByText('Invalid username or password')).toBeVisible();
  });
  
  test('Brute Force Prevention Check', async ({ page }) => {
    for (let i = 0; i < 5; i++) {
      await attemptLogin(page, 'Julia', 'WrongPass' + i);
    }
    await expect(page.getByText('Too many failed attempts')).toBeVisible();
  });
});
