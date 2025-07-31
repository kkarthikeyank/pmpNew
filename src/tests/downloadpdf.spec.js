// import { test } from '@playwright/test';

// test.only('test', async ({ page }) => {

//     await page.route('**/*', route => {
       
//         if (route.request().url().startsWith("https://googleads.")) {
//             //console.log('Blocked ad request:', route.request().url());
//             route.abort();
//         } else {
//             route.continue();   
//         }
//     });

//     // Navigate to the page containing the PDF link
//     await page.goto('https://www.sampledocs.in/BrowseFile/DummyFiles/pdf');

//     // Selector for the element to which you want to add a new attribute
//     const elementSelector = "a[href*='SampleDocs-sample-pdf']";

//     await page.evaluate((selector) => {
        
//         // Find the element using the provided selector
//         const element = document.querySelector(selector);

//         if (element) {
//             // By adding this new "download" attribute we can directly download the pdf instead of opening in preview
//             element.setAttribute('download','sample');
//         } else {
//             console.error('Element not found.');
//         }
//     }, elementSelector);

//     await page.waitForTimeout(1000);

//   const downloadPromise = page.waitForEvent('download'); 
//   await page.locator(elementSelector).first().click();
//   const download = await downloadPromise;

//   await download.saveAs(download.suggestedFilename());
    
// });


// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/login');
//   await page.getByRole('button', { name: 'Login' }).click();
//   await page.getByRole('textbox', { name: 'Username' }).click();
//   await page.getByRole('textbox', { name: 'Username' }).fill('julia');
//   await page.getByRole('textbox', { name: 'Password' }).click();
//   await page.getByRole('textbox', { name: 'Password' }).fill('Batman123');
//   await page.getByRole('button', { name: 'Sign in' }).click();
//     await page.waitForTimeout(5000); // waits for 5 seconds to ensure the page loads completely
//   await page.getByTitle('Your profile and settings').click();
//   await page.getByLabel('My Profile').click();
//   await page.getByRole('button', { name: 'Print' }).click();
// });



import { test, expect } from '@playwright/test';

test.only('Download PDF after login', async ({ page }) => {
  // Optional: Block ad or tracking requests (cleaner/faster)
  await page.route('**/*', route => {
    if (route.request().url().startsWith("https://googleads.")) {
      route.abort();
    } else {
      route.continue();
    }
  });

  // Step 1: Go to login page
  await page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/login');
    await page.getByRole('button', { name: 'Login' }).click();


  // Step 2: Perform login
    await page.getByRole('textbox', { name: 'Username' }).click();

  await page.getByRole('textbox', { name: 'Username' }).fill('julia');
    await page.getByRole('textbox', { name: 'Password' }).click();

  await page.getByRole('textbox', { name: 'Password' }).fill('Batman123');

  await page.getByRole('button', { name: 'Sign in' }).click();

  // Step 3: Wait for page to load fully
  await page.waitForTimeout(5000);

  // Step 4: Navigate to profile page
  await page.getByTitle('Your profile and settings').click();
  await page.getByLabel('My Profile').click();

  // Step 5: Click Print button (opens printable view)
  await page.getByRole('button', { name: 'Print' }).click();

  // Step 6: Wait a moment for print page or preview to render
  await page.waitForTimeout(2000);

  // Step 7: Download PDF from current page (uses page.pdf)
  await page.pdf({
    path: 'julia-health-notes.pdf',
    format: 'A4',
    printBackground: true
  });

  console.log('✅ PDF downloaded: julia-health-notes.pdf');


  
});
