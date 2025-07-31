// import { test, expect } from '@playwright/test';

// test('Claim Search Test', async ({ page }) => {
   
//    await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/login');
//    await page.locator('[data-testid="loginButton"]').click();
//    await page.locator('[data-testid="UserId"]').fill('julia');
//    await page.locator('[data-testid="Password"]').fill('Batman123');
//    await page.locator('[data-testid="next"]').click();

    
// });


import { test, expect } from '@playwright/test';

test('Claim Search Test', async ({ page }) => {
   // Navigate to the login page
   await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/login') ;  
   await page.getByRole('button', { name: 'Login' }).click(); 
   await page.locator('//input[@id="UserId"]').click();                                                                                           
   // await page.getByRole('textbox', { name: 'Username' }).click();
   //  await page.getByRole('textbox', { name: 'Username' }).fill('Julia');
   // Fill in the login credentials and submit
   // await page.locator('[data-testid="UserId"]').fill('julia');
   await page.locator('//input[@id="UserId"]').fill('julia');
   await page.locator('//input[@id="UserId"]').click();                                                                                           
   await page.locator('//input[@id="password"]').click();

   await page.locator('//input[@id="password"]').fill('Batman123');

   // await page.locator('//button[@id="next"]').click();
   // Wait for navigation or some element indicating successful login
   // getByRole('button', { name: 'Sign in' }).click();
   await page.getByRole('button', { name: 'Sign in' }).click();

   // Optional: wait for 2 seconds to observe the login process
   await page.waitForURL('https://hikepmp-dev.smilecdr.com/member-portal/#/dashboard', { timeout: 10000 });

   // Verify successful login (optional)
   // await expect(page.locator('[data-testid="dashboardElement"]')).toBeVisible();
});



