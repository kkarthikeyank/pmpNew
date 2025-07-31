// import { test, expect } from '@playwright/test';

// test('Claim Search Test', async ({ page }) => {
   
//    await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/login');
//     await page.getByRole('button', { name: 'Login' }).click();
//     await page.getByRole('textbox', { name: 'Username' }).click();
//     await page.getByRole('textbox', { name: 'Username' }).fill('Julia');
//     await page.getByRole('textbox', { name: 'Password' }).click();
   
//     await page.getByRole('textbox', { name: 'Password' }).fill('Batman123');
//     await page.getByRole('button', { name: 'Sign in' }).click();
//     await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/dashboard');
//     await page.getByRole('link', { name: 'Claims', exact: true }).click();
//     await page.getByRole('textbox', { name: 'Claim Number' }).click();
  
   
//     await page.getByRole('radio', { name: 'Last 60 Months' }).check();
//     await page.getByRole('button', { name: 'Done' }).click();
//     await page.getByRole('textbox', { name: 'Claim Number' }).click();
//     await page.getByRole('textbox', { name: 'Claim Number' }).fill('144111');
//     await page.getByRole('button', { name: 'Apply' }).click();
//     await page.getByRole('button', { name: 'View Details' }).click();
//     await page.getByText('Return to previous page').click();
//     await page.getByRole('button', { name: 'Download Summary by Filter' }).click();
//     await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/claims');
// });
    

// import { test, expect } from '@playwright/test';

// test('Claim Search Test', async ({ page }) => {
   
//     await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/login');
//     await page.getByRole('button', { name: 'Login' }).click();
//     await page.getByRole('textbox', { name: 'Username' }).fill('Julia');
//     await page.getByRole('textbox', { name: 'Password' }).fill('Batman123');
//     await page.getByRole('button', { name: 'Sign in' }).click();

//     // Wait for dashboard to load before proceeding
//     await page.waitForURL(/dashboard/);

//     // Wait for "Claims" link to be visible and click it
//     await page.waitForSelector('text=Claims', { timeout: 10000 });
//     await page.getByRole('link', { name: 'Claims', exact: true }).click();

//     await page.getByRole('textbox', { name: 'Claim Number' }).click();
//     await page.getByRole('radio', { name: 'Last 60 Months' }).check();
//     await page.getByRole('button', { name: 'Done' }).click();
//     await page.getByRole('textbox', { name: 'Claim Number' }).fill('144111');
//     await page.getByRole('button', { name: 'Apply' }).click();
//     await page.getByRole('button', { name: 'View Details' }).click();
//     await page.getByText('Return to previous page').click();
//     await page.getByRole('button', { name: 'Download Summary by Filter' }).click();
// });


// import { test, expect } from '@playwright/test';

// test('Claim Search Test', async ({ page }) => {

//     await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/login');

//     await page.getByRole('button', { name: 'Login' }).click();
//     await page.getByRole('textbox', { name: 'Username' }).fill('Julia');
//     await page.getByRole('textbox', { name: 'Password' }).fill('Batman');
//     await page.getByRole('button', { name: 'Sign in' }).click();

//     // Ensure login was successful
//     await expect(page).toHaveURL(/dashboard/);

//     // Navigate to Claims section
//     await page.getByRole('link', { name: 'Claims', exact: true }).click();
//     await expect(page).toHaveURL(/claims/);

//     // Select date range
//     await page.getByRole('button', { name: '-01-2024 - 04-01-2025' }).click();
//     await page.getByRole('listitem').filter({ hasText: 'Custom' }).click();
//     await page.getByRole('button', { name: 'Done' }).click();

//     // Select filter option
//     await page.getByRole('radio', { name: 'Last 60 Months' }).check();
//     await page.getByRole('button', { name: 'Done' }).click();

//     // Search for claim number
//     await page.getByRole('textbox', { name: 'Claim Number' }).fill('144111');
//     await page.getByRole('button', { name: 'Apply' }).click();

//     // Ensure results are displayed
//     await expect(page.locator('table')).toBeVisible();

//     // View claim details and return
//     await page.getByRole('button', { name: 'View Details' }).click();
//     await expect(page.getByText('Claim Details')).toBeVisible();
//     await page.getByText('Return to previous page').click();

//     // Download summary
//     await page.getByRole('button', { name: 'Download Summary by Filter' }).click();

//     // Navigate back to claims
//     await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/claims');
// });
import { test, expect } from '@playwright/test';

test('Claim Search Test', async ({ page }) => {
    try {
        await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/login');
        
        // Wait for Login button and click it
        await page.getByRole('button', { name: 'Login' }).waitFor({ state: 'visible', timeout: 10000 });
        await page.getByRole('button', { name: 'Login' }).click();
        
        // Fill in login details
        await page.getByRole('textbox', { name: 'Username' }).fill('Julia');
        await page.getByRole('textbox', { name: 'Password' }).fill('Batman123');
        
        // Click Sign in
        await page.getByRole('button', { name: 'Sign in' }).click();
        
        // Wait until redirected to the dashboard
        await page.waitForURL(/dashboard/, { timeout: 15000 });

        // Ensure the "Claims" link is visible before clicking
        await page.getByRole('link', { name: 'Claims', exact: true }).waitFor({ state: 'visible', timeout: 10000 });
        await page.getByRole('link', { name: 'Claims', exact: true }).click();

        // Wait for Claim Number input and click it
        const claimInput = page.getByRole('textbox', { name: 'Claim Number' });
        await claimInput.waitFor({ state: 'visible', timeout: 10000 });
        await claimInput.click();

        // Select "Last 60 Months" radio button
        const radioButton = page.getByRole('radio', { name: 'Last 60 Months' });
        await radioButton.waitFor({ state: 'visible', timeout: 10000 });
        await radioButton.check();

        // Click Done
        await page.getByRole('button', { name: 'Done' }).click();

        // Fill Claim Number and Apply filter
        await claimInput.fill('144111');
        await page.getByRole('button', { name: 'Apply' }).click();

        // Wait for "View Details" button and click it
        await page.getByRole('button', { name: 'View Details' }).waitFor({ state: 'visible', timeout: 10000 });
        await page.getByRole('button', { name: 'View Details' }).click();

        // Return to the previous page
        await page.getByText('Return to previous page').click();

        // Download Summary by Filter
        const downloadButton = page.getByRole('button', { name: 'Download Summary by Filter' });
        await downloadButton.waitFor({ state: 'visible', timeout: 10000 });
        await downloadButton.click();

    } catch (error) {
        console.error("Test failed due to error: ", error);
    }
});

