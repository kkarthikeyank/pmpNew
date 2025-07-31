//  import { test, expect } from '@playwright/test';

//  test('test', async ({ page }) => {

//   export default test({
//     timeout: 60000,

// //   await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/login');
// //   await page.getByRole('button', { name: 'Login' }).click();
// //   await page.getByRole('textbox', { name: 'Username' }).click();
// //   await page.getByRole('textbox', { name: 'Username' }).fill('Julia');
// //   await page.getByRole('textbox', { name: 'Password' }).click();
// //   await page.getByRole('textbox', { name: 'Password' }).fill('Batman123');
// //   await page.getByRole('button', { name: 'Sign in' }).click();
// //   await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/dashboard');
// //   await page.getByLabel('Welcome, Julia Donaldson').click();
// // 
// // await page.getByRole('link', { name: 'Profile' }).click();
// // await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/dashboard');
// // await page.getByRole('link', { name: 'Claims', exact: true }).click();


// await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/login');
// await page.getByRole('button', { name: 'Login' }).click();
// await page.getByRole('textbox', { name: 'Username' }).click();
// await page.getByRole('textbox', { name: 'Username' }).fill('Julia');
// await page.getByRole('textbox', { name: 'Password' }).click();
// await page.getByRole('textbox', { name: 'Password' }).fill('Batman123');
// await page.getByRole('button', { name: 'Sign in' }).click();
// await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/dashboard');
// await page.getByRole('link', { name: 'Claims', exact: true }).click();
// });


import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(70000);
  
 
  
  // Wait for the login button to be visible before clicking
  const loginButton = page.getByRole('button', { name: 'Login' });
  await loginButton.waitFor();
  await loginButton.click();
  
  // Fill in the username field
  const usernameField = page.getByRole('textbox', { name: 'Username' });
  await usernameField.waitFor();
  await usernameField.fill('Julia');
  
  // Fill in the password field
  const passwordField = page.getByRole('textbox', { name: 'Password' });
  await passwordField.waitFor();
  await passwordField.fill('Batman123');
  
  // Click the sign-in button
  const signInButton = page.getByRole('button', { name: 'Sign in' });
  await signInButton.waitFor();
  await signInButton.click();
  
  // Wait for navigation to the dashboard
  await page.waitForURL('https://hikepmp-dev.smilecdr.com/member-portal/#/dashboard');
  
  // Click the 'Claims' link
  const claimsLink = page.getByRole('link', { name: 'Claims', exact: true });
  await claimsLink.waitFor();
  await claimsLink.click();

  await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/claims');

 
});