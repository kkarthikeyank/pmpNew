// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   test.setTimeout(70000);
  
//   await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/login');
  
//   // Wait for the login button to be visible before clicking
//   const loginButton = page.getByRole('button', { name: 'Login' });
//   await loginButton.waitFor();
//   await loginButton.click();
  
//   // Fill in the username field
//   const usernameField = page.getByRole('textbox', { name: 'Username' });
//   await usernameField.waitFor();
//   await usernameField.fill('Julia');
  
//   // Fill in the password field
//   const passwordField = page.getByRole('textbox', { name: 'Password' });
//   await passwordField.waitFor();
//   await passwordField.fill('Batman123');
  
//   // Click the sign-in button
//   const signInButton = page.getByRole('button', { name: 'Sign in' });
//   await signInButton.waitFor();
//   await signInButton.click();


// await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/claims');

// await page.getByRole('textbox', { name: 'Claim Number' }).click();
// await page.getByRole('textbox', { name: 'Claim Number' }).fill('414656654');
// await page.getByRole('button', { name: 'Apply' }).click();
// });

import { test, expect } from '@playwright/test';
 
test('Claim Search Test', async ({ page }) => {
  test.setTimeout(70000);
 
  // Go to login page
  await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/login');
 
  // Wait and click login button
  const loginButton = page.getByRole('button', { name: 'Login' });
  await loginButton.waitFor({ state: 'visible' });
  await loginButton.click();
 
  // Wait and fill username
  const usernameField = page.getByRole('textbox', { name: 'Username' });
  await usernameField.waitFor({ state: 'visible' });
  await usernameField.fill('Julia');
 
  // Wait and fill password
 

  const passwordField = page.getByRole('textbox', { name: 'Password' });
  await passwordField.waitFor({ state: 'visible' });
  await passwordField.fill('Batman123');
 
  // Wait and click sign-in
  const signInButton = page.getByRole('button', { name: 'Sign in' });
  await signInButton.waitFor({ state: 'visible' });
  await signInButton.click();
 
  // Wait for navigation to complete after sign-in
  await page.waitForURL('**/dashboard', { timeout: 15000 }).catch(() => {}); // Optional: if there's a redirect
 
  // Navigate to claims pageay you’ll bay you’ll be getting jira access for the smile team. And once you get access you can put in a ticket for the portal admin access.e getting jira access for the smile team. And once you get access you can put in a ticket for the portal admin access.
  await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/claims');
 
  // Wait for Claim Number textbox to be visible
  const claimNumberField = page.getByRole('textbox', { name: 'Claim Number' });
  await claimNumberField.waitFor({ state: 'visible' });
  await claimNumberField.click();
  await claimNumberField.fill('414656654');
 
  // Click Apply
  const applyButton = page.getByRole('button', { name: 'Apply' });
  await applyButton.waitFor({ state: 'visible' });
  await applyButton.click();
 
  // Optionally verify some result
  // await expect(page.getByText('Expected Result')).toBeVisible();
});