import { expect } from '@playwright/test';
// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// pages/ClaimsPage.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ClaimsPage {
  constructor(page) {

    this.page = page;
    this.claimsTab = this.page.locator('#navLink-CLAIMS');

    // let id = 'dropdownDateFilterButton';
this.dateFilterButton = page.locator('//button[@id="dropdownDateFilterButton"]');

    this.claimNumberLocator = page.locator("//p[@data-id='claimsCardClaimNumber']");

    // this.dateFilterButton = page.locator("//button[@id='dropdownDateFilterButton']"); //div[contains(text(),'Claims')]
    // const dateFilterButton = page.locator('#dropdownDateFilterButton');
    // this . dateFilterButton = page.locator("//button[@id='dropdownDateFilterButton']"); 
    // this.openSummaryPrintTopBtn = page.locator('#openSummaryPrintTopBtn');
    // this.printPreviewContainer = page.locator('#printPreviewContent'); // Update this to your actual selector



    // this.last60MonthsRadio = page.getByRole('radio', { name: 'Last 60 Months' });
    this.last60MonthsRadio = page.locator("//input[@id='LAST_60_MONTHSradio']"); 
    this.filterResultsButton = page.locator("//span[normalize-space()='Filter Results']"); // Button to open filter panel
        this .filterresultButtondisabled = page.locator('button:has-text("Filter Results"):disabled');

    this.applyFiltersButton = page.locator("//button[@id='applyFilterClaims']"); // Button to apply filters
    this.clearFiltersButton = page.locator("#claimsClearFilter");
    this.applyClearButton = page.getByLabel('Filter Results').getByText('Apply Clear');
    this.closeButton = page.getByRole('button', { name: 'Close' });
    this.selectedpayee = page.locator("//div[normalize-space()='Integra Partners Llc']");
    this.selectedprovider = page.locator("//div[normalize-space()='Nicole Koepke']");
    this.monthsdateverify = page.locator("//div[@class='flex-fill']");

    //button[@id='applyFilterClaims']
    this.doneButton = page.getByRole('button', { name: 'Done' });
    this.showresultsButton = page.locator("//button[@id='showResultsButton']"); // Button to show results after applying filters
        this.resultsDropdown = page.locator('#pagination select'); // Example for dropdown
        this.printButton = page.locator('#openSummaryPrintTopBtn');



    this.viewDetailsButton = page.locator("//button[@tabindex='0' and text()=' View Details ']"); // Button to open claim details
    this.totalclaimbill = page.locator("total_claim_charge_billedtext");
    this.returnButton = page.getByText('Return to previous page');
    this.claimNumberInput = page.getByRole('textbox', { name: 'Claim Number' });
    this.applyButton = page.getByRole('button', { name: 'Apply' });
    this.clearButton = page.getByRole('button', { name: 'Clear' });
    this.noClaimsMessage = page.locator('#noInformation');


    this.dateFilterButton1 = page.locator("//button[@id='dropdownDateFilterButton']");

    //   this.customRadio = page.getByRole('radio', { name: 'Custom' });
    //   this.fromDate =  page.locator(`//div[contains(text(),'11')]`);

    //   this.toDateButton = page.locator(`//div[contains(text(),'29')]`);  
    //   this.noResultsText = page.getByText('No matching results were');


    //
    // Adding new locators for custom date filter

    this.customRadio = page.getByRole('radio', { name: 'Custom' });
    this.fromDateInput = page.locator('#dpFromDateInput'); // Custom From Date Input
    this.toDateInput = page.locator('#dpToDateInput'); // Custom To Date Input
    this.noResultsText = page.getByText('No matching results were');
    //  this.doneButton = this.page.getByRole('button', { name: 'Done' });
    this.noResultsText = page.getByText('No matching results were');
    this.providerBlocks = page.locator('form-check-input me-2'); // All provider blocks
      this.providerResults = page.locator("//p[@data-id='claimsCardPhysicianText']");
    this.payeeResults = page.locator("//p[@data-id='claimsCardLabVendorText']");
    this.claimsexpect= page.locator("//div[@id='noInformation']"); // Locator for claim numbers


  }



  // open claims tab
  async openClaimsTab() {
    // Ensure the Claims tab is visible before clicking
   
    await this.page.waitForLoadState('networkidle');
    await this.claimsTab.waitFor({ state: 'visible', timeout: 20000 });
    await this.claimsTab.click();

    // Optionally, wait for the page to load after clicking the Claims tab (if it redirects)
    // await this.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 });
  }
// ClaimsPage.js




  //  scenario filter result provider and payee , diagnosis check and uncheck 


async filterByDateRange(dateRange) {
  console.log(`//  scenario filter result provider and payee , diagnosis check and uncheck`);
  await this.dateFilterButton.click();
  await this.page.getByText(dateRange).click();
  await this.doneButton.click();

  try {
    await this.filterResultsButton.waitFor({ state: 'visible', timeout: 30000 });
    if (await this.filterResultsButton.isEnabled()) {
      await this.filterResultsButton.click();
      return true; // success
    } else {
      console.warn(`[WARN] Filter results button is visible but not enabled for ${dateRange}`);
      return false; // fail
    }
  } catch (error) {
    console.warn(`[WARN] Filter results button not visible for ${dateRange}, skipping further steps.`);
    return false; // fail
  }
}



async _checkCheckboxByLabel(labelText) {
  const checkboxXPath = `//div[contains(@class, 'form-check')]//div[contains(text(), "${labelText}")]/preceding-sibling::div//input[@type='checkbox']`;
  try {
    const checkbox = await this.page.waitForSelector(`xpath=${checkboxXPath}`, { timeout: 5000 });
    const isChecked = await checkbox.isChecked();
    if (!isChecked) {
      await checkbox.check();
      console.log(`[INFO] Checked: ${labelText}`);
    } else {
      console.log(`[INFO] Already checked: ${labelText}`);
    }
    return true;
  } catch {
    console.log(`[WARN] Not found: ${labelText}`);
    return false;
  }
}

async applyFilters(filters) {
  let anyApplied = false;

  for (const group of ['providers', 'payees', 'diagnoses']) {
    if (filters[group]?.length > 0) {
      for (const item of filters[group]) {
        const result = await this._checkCheckboxByLabel(item);
        if (result) anyApplied = true;
      }
    }
  }

  if (anyApplied) {
    await this.applyFiltersButton.click();
    // await this.page.waitForTimeout(1000); // Wait for results to render
          await this.page.waitForLoadState('networkidle');

    console.log('[INFO] Filters applied');
  } else {
    console.log('[WARN] No filters selected — skipping apply');
  }


  await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  console.log('[INFO] Page scrolled to bottom');

  await this.filterResultsButton.waitFor({ state: 'visible' });
  // await this.page.waitForTimeout(1000);
      await this.page.waitForLoadState('networkidle');
  
  await this.filterResultsButton.click();
        await this.page.waitForLoadState('networkidle');

}

async printResults() {
  const providerCount = await this.providerResults.count();
  if (providerCount === 0) {
    console.log('[INFO] No providers found');
  } else {
    for (let i = 0; i < providerCount; i++) {
      const name = await this.providerResults.nth(i).innerText();
      console.log(`[PROVIDER ${i + 1}]: ${name}`);
    }
  }

  const payeeCount = await this.payeeResults.count();
  if (payeeCount === 0) {
    console.log('[INFO] No payees found');
  } else {
    for (let i = 0; i < payeeCount; i++) {
      const name = await this.payeeResults.nth(i).innerText();
      console.log(`[PAYEE ${i + 1}]: ${name}`);
    }
  }
}

async uncheckFilters(filters) {
  const tryUncheck = async (label, name) => {
    const checkboxXPath = `//div[contains(@class, 'form-check')]//div[contains(text(), "${name}")]/preceding-sibling::div//input[@type='checkbox']`;
    const checkboxLocator = this.page.locator(`xpath=${checkboxXPath}`);

    const isVisible = await checkboxLocator.isVisible().catch(() => false);
    if (!isVisible) {
      console.warn(`[WARN] ${label} not found: ${name}`);
      return;
    }

    const isChecked = await checkboxLocator.isChecked();
    if (isChecked) {
      await checkboxLocator.scrollIntoViewIfNeeded();
      await checkboxLocator.waitFor({ state: 'visible', timeout: 5000 });
      
      await checkboxLocator.uncheck();
      console.log(`[INFO] Unchecked ${label}: ${name}`);
    } else {
      console.log(`[DEBUG] ${label} not checked: ${name}`);
    }
  };

  for (const name of filters.providers || []) {
    await tryUncheck('provider', name);
  }

  for (const name of filters.payees || []) {
    await tryUncheck('payee', name);
  }

  for (const name of filters.diagnoses || []) {
    await tryUncheck('diagnosis', name);
  }

  await this.applyFiltersButton.click();
  console.log('[INFO] Unchecked filters applied');
  await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  console.log('[INFO] Page scrolled to bottom');
}



  //  scenario Filter by date range and print claims with download as PDF


//   async filterAndPrintClaims(filter) {
//     const { label, filterId, resultsSelectOption } = filter;

//     console.log(`Filtering by: ${label}`);
//     await this.page.locator('text=Loading...').waitFor({ state: 'detached', timeout: 10000 });

//     await this.dateFilterButton.waitFor({ state: 'visible', timeout: 10000 });
//     await this.dateFilterButton.click();

//     const radioLocator = this.page.locator(`//input[@id='${filterId}']`);
//     await radioLocator.waitFor({ state: 'visible', timeout: 5000 });
//     await radioLocator.check();

//     await this.doneButton.click();

//     if (await this.showresultsButton.isVisible()) {
//         await this.showresultsButton.scrollIntoViewIfNeeded();

//     const res=  await this.showresultsButton.click();
//       console.log(`Show Results button clicked for filter: ${res}`);
//     }

//     if (resultsSelectOption) {
//   try {
//     await this.page.waitForFunction(
//       (sel) => {
//         const el = document.querySelector(sel);
//         return el && !el.disabled;
//       },
//       '#pagination select',
//       { timeout: 10000 }
//     );
//      const selected = await this.resultsDropdown.selectOption(resultsSelectOption);
//     console.log(`✅ Results dropdown selection applied. Selected value: ${selected}`);

//   } catch (e) {
//     console.warn(`Dropdown not enabled for filter "${label}". Skipping selectOption and continuing...`);
//   }
// }


//     await this.page.waitForTimeout(3000);

//     const claims = await this.claimNumberLocator.all();
//     if (claims.length === 0) {
//       console.log(`No claims found for ${label}`);
//     } else {
//       console.log(`Claims found for ${label}:`);
//       for (const claim of claims) {
//         const text = await claim.textContent();
//         console.log(`Claim Number: ${text?.trim()}`);
//       }
//     }
//   }
async filterAndPrintClaimsByLabel(label, resultsSelectOption = null) {

  console.log(`//  scenario Filter by date range and print claims with download as PDF`);
  const cleanLabel = label.trim();
 
  console.log(`Filtering by: ${cleanLabel}`);
 
  // Wait for loading spinner to disappear
  await this.page.locator('text=Loading...').waitFor({ state: 'detached', timeout: 10000 });
 
  // Open date filter popup/dropdown
  await this.dateFilterButton.waitFor({ state: 'visible', timeout: 10000 });
  await this.dateFilterButton.click();
 
  // Dynamically find the <label> element containing the filter label text
  const labelLocator = this.page.locator(`label:has-text("${cleanLabel}")`);
  await labelLocator.waitFor({ state: 'visible', timeout: 5000 });
 
  // Get the 'for' attribute value, which is the id of the related input
  const filterId = await labelLocator.getAttribute('for');
  if (!filterId) {
    console.log(`❌ Could not find filter input associated with label: ${cleanLabel}`);
    return;
  }
 
  // Find the input radio by id and check it
  const radioLocator = this.page.locator(`input#${filterId}`);
  await radioLocator.waitFor({ state: 'visible', timeout: 5000 });
  await radioLocator.check();
 
  // Confirm filter selection
  await this.doneButton.click();
 
  // If "Show Results" button is visible, click it
  if (await this.showresultsButton.isVisible()) {
    await this.showresultsButton.scrollIntoViewIfNeeded();
    await this.showresultsButton.click();
    console.log(`Show Results button clicked for filter: ${cleanLabel}`);
  }
 
  // If resultsSelectOption is provided, select it in dropdown if enabled
  if (resultsSelectOption) {
    try {
      await this.page.waitForFunction(
        (sel) => {
          const el = document.querySelector(sel);
          return el && !el.disabled;
        },
        '#pagination select',
        { timeout: 10000 }
      );
      const selected = await this.resultsDropdown.selectOption(resultsSelectOption);
      console.log(`✅ Results dropdown selection applied. Selected value: ${selected}`);
    } catch (e) {
      console.warn(`Dropdown not enabled for filter "${cleanLabel}". Skipping selectOption and continuing...`);
    }
  }
 
//   // Wait for results to load (better to replace with smart wait if possible)
//   await this.page.waitForLoadState('networkidle');
// // await this.page.waitForTimeout(3000);
// ✅ Smart wait for at least one claim to appear
try {
  await this.claimNumberLocator.first().waitFor({ state: 'visible', timeout: 10000 });
} catch {
  console.warn(`⚠️ No claims visible for ${cleanLabel} — maybe delayed or not loaded`);
}
 
 
  // Fetch all claims found
  const claims = await this.claimNumberLocator.all();
  if (claims.length === 0) {
    console.log(`No claims found for ${cleanLabel}`);
  } else {
    console.log(`Claims found for ${cleanLabel}:`);
    for (const claim of claims) {
      const text = await claim.textContent();
      console.log(`Claim Number: ${text?.trim()}`);
    }
  }
}
  




  // your filterAndPrintClaimsByLabel() goes here...

// async downloadProfileAsPdf(fileName = 'claims.pdf') {
//   console.log(`📄 Attempting to download PDF: ${fileName}`);

//   const filePath = path.join(__dirname, '..', 'downloads', fileName);

//   try {
//     // Check if the print button exists and is visible within 5s
//     const isVisible = await this.printButton.isVisible({ timeout: 5000 }).catch(() => false);

//     if (!isVisible) {
//       console.warn('⚠️ Print button not visible. Skipping PDF generation.');
//       return null;
//     }

//     // Check if the button is enabled using page.evaluate
//     const isEnabled = await this.page.evaluate(() => {
//       const btn = document.querySelector('#openSummaryPrintTopBtn');
//       return btn && !btn.disabled;
//     });

//     if (!isEnabled) {
//       console.warn('⚠️ Print button is disabled. Skipping PDF generation.');
//       return null;
//     }

//     // Proceed with click and PDF generation
//     await this.printButton.click();
//     await this.page.waitForTimeout(2000);
//     await this.page.waitForLoadState('networkidle');

//     await this.page.pdf({
//       path: filePath,
//       format: 'A4',
//       printBackground: true,
//     });

//     console.log(`✅ PDF saved: ${filePath}`);

//     const fileBuffer = fs.readFileSync(filePath);
//     const base64 = fileBuffer.toString('base64');
//     const dataUrl = `data:application/pdf;base64,${base64}`;
//      // 🔄 Reload the page after saving PDF
//     await this.page.reload();
//     await this.page.waitForLoadState('networkidle');
//     return dataUrl;
//   } catch (error) {
//     console.error(`❌ PDF generation failed: ${error.message}`);
//     return null;
//   }
// }

async downloadProfileAsPdf(fileName = 'claims.pdf') {
  console.log(`📄 Attempting to download PDF: ${fileName}`);

  const filePath = path.join(__dirname, '..', 'downloads', fileName);

  try {
    // Check if the print button exists and is visible within 5s
    const isVisible = await this.printButton.isVisible({ timeout: 5000 }).catch(() => false);

    if (!isVisible) {
      console.warn('⚠️ Print button not visible. Skipping PDF generation.');
      return null;
    }

    // Check if the button is enabled using page.evaluate
    const isEnabled = await this.page.evaluate(() => {
      const btn = document.querySelector('#openSummaryPrintTopBtn');
      return btn && !btn.disabled;
    });

    if (!isEnabled) {
      console.warn('⚠️ Print button is disabled. Skipping PDF generation.');
      return null;
    }

    // Proceed with click and PDF generation
    await this.printButton.click();
    await this.page.waitForTimeout(2000);
    await this.page.waitForLoadState('networkidle');

    await this.page.pdf({
      path: filePath,
      format: 'A4',
      printBackground: true,
    });

    console.log(`✅ PDF saved: ${filePath}`);

    const fileBuffer = fs.readFileSync(filePath);
    const base64 = fileBuffer.toString('base64');
    const dataUrl = `data:application/pdf;base64,${base64}`;

    // 🔄 Reload the page after saving PDF
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');

    return dataUrl;

  } catch (error) {
    console.error(`❌ PDF generation failed: ${error.message}`);
    return null;
  }
}


  // senario  search by claim number with date range filter 
// async searchClaimNumber(label, claimNumber) {
//   console.log(`🔍 Simple claim search: ${claimNumber} in ${label}`);

//   // Step 1: Select dropdown
//   await this.dateFilterButton.click();
//   await this.page.getByText(label).click();
  
//   // Step 2: Click done button
//   await this.doneButton.click();
  
//   // Step 3: Search claim number
//   await this.claimNumberInput.fill(claimNumber);
//   await this.applyButton.click();
  
//   await this.page.waitForLoadState('networkidle');
//     await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

//   await this.page.waitForTimeout(1000);
//   // Check results
//   const claims = await this.claimNumberLocator.all();
  
//   if (claims.length > 0) {
//     console.log(`✅ Claims displayed for ${claimNumber}`);
//     for (const claim of claims) {
//       const text = await claim.textContent();
//       console.log(`→ ${text?.trim()}`);
//     }
//   } else {
//     console.log(`❌ No claims found for ${claimNumber}`);
//   }

//   await this.clearButton.click();


  async searchClaimNumber(label, claimNumber) {
    console.log(`// senario  search by claim number with date range filter`);
    const cleanLabel = label.trim();

    console.log(`→ Filtering by: ${cleanLabel}`);

    await this.page.locator('text=Loading...').waitFor({ state: 'detached', timeout: 10000 });

    await this.dateFilterButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.dateFilterButton.click();

    // Dynamically find filter radio input by label text
    const labelLocator = this.page.locator(`label:has-text("${cleanLabel}")`);
    await labelLocator.waitFor({ state: 'visible', timeout: 5000 });

    const filterId = await labelLocator.getAttribute('for');
    if (!filterId) {
      console.log(`❌ Could not find filter input associated with label: ${cleanLabel}`);
      return;
    }

    const radioLocator = this.page.locator(`input#${filterId}`);
    await radioLocator.waitFor({ state: 'visible', timeout: 5000 });
    await radioLocator.check();

    await this.doneButton.click();

    // Search by claim number
    console.log(`→ Searching for Claim Number: ${claimNumber}`);
      // Wait for page to finish loading, or loader to disappear
  await this.page.waitForLoadState('networkidle'); // wait until network quiet
    // await this.claimNumberInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.claimNumberInput.click();
    await this.claimNumberInput.fill('');
    await this.claimNumberInput.fill(claimNumber);
    await this.applyButton.click();


    // await this.page.waitForTimeout(3000);
    await this.page.waitForLoadState('networkidle');
    // await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForTimeout(1000);

    const claims = await this.claimNumberLocator.all();
    if (claims.length === 0) {
      console.log(`❌ No claims found for ${cleanLabel}: ${claimNumber}`);
    } else {
      console.log(`✅ Claims found for ${cleanLabel}: ${claimNumber}`);
      for (const claim of claims) {
        const text = await claim.textContent();
        console.log(`→ Claim Number: ${text?.trim()}`);
      }
    }

    await this.clearButton.click();
  }



  // async searchclaimnumber(label, claimNumber) {



  // scenario  Filter by custom date range and print claims


  async filterByCustomDateRangeAndPrintClaims(fromDate, toDate) {
  console.log('📘 Scenario: Filter by custom date range and print claims');
  console.log(`→ Applying date range: ${fromDate} to ${toDate}`);

  let claims = [];
  let claimCount = 0;

  try {
    // Open date filter panel
    await this.dateFilterButton.waitFor({ state: 'visible', timeout: 20000 });
    await this.dateFilterButton.click();

    // Fill in date inputs
    await this.fromDateInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.toDateInput.waitFor({ state: 'visible', timeout: 10000 });

    await this.fromDateInput.click();
    await this.fromDateInput.selectText();
    await this.fromDateInput.fill(fromDate);

    await this.toDateInput.click();
    await this.toDateInput.selectText();
    await this.toDateInput.fill(toDate);

    // Apply the date filter
    await this.page.waitForTimeout(1000); // small wait for UI stability
    await this.doneButton.click();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });

    // Wait for verification
    await this.page.waitForTimeout(2000);
    try {
      await this.monthsdateverify.waitFor({ state: 'visible', timeout: 10000 });
      const dateText = await this.monthsdateverify.textContent();
      if (dateText?.trim()) {
        console.log(`✅ Date filter applied: ${dateText.trim()}`);
      }
    } catch {
      console.log(`⚠️ Date verification element not found, proceeding...`);
    }

    // Retrieve claims
    claims = await this.viewDetailsButton.all();
    claimCount = claims.length;

    if (claimCount === 0) {
      console.log(`❌ No claims found for ${fromDate} to ${toDate}`);

      // Validate 'no results' message
      await expect(this.noClaimsMessage).toBeVisible();
      await expect(this.noClaimsMessage).toHaveText('No matching results were found.');
       console.log(`Assertion passed: 'No matching results were found.' message is visible.`);
      // Clear filter after no results
      await this.clearButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.clearButton.click();
      console.log(`🧹 Cleared filters after no results.`);
    } else {
      console.log(`✅ Claims found for ${fromDate} to ${toDate}`);
      console.log(`→ Total claims: ${claimCount}`);

      for (let i = 0; i < claimCount; i++) {
        await this.openClaimDirectly(claims[i], i + 1);
      }

      await this.clearButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.clearButton.click();
      console.log(`🧹 Cleared filters after viewing all claims.`);
    }

  } catch (error) {
    console.error(`❌ Error during date filter operation: ${error.message}`);
    throw error;
  }
}

async openClaimDirectly(claimLocator, claimIndex) {
  console.log(`→ Opening claim ${claimIndex}...`);

  try {
    await claimLocator.waitFor({ state: 'visible', timeout: 10000 });
    await claimLocator.click();
  } catch {
    console.error(`❌ Could not open claim ${claimIndex}`);
    return;
  }

  try {
    await this.page.waitForSelector('text=Claim Details', { timeout: 30000 });
    console.log(`✅ Claim ${claimIndex} details loaded.`);
  } catch {
    console.error(`❌ Claim ${claimIndex} details did not load.`);
    return;
  }

  await this.returnButton.waitFor({ state: 'visible', timeout: 30000 });
  await this.returnButton.click();
  console.log(`↩️ Returned from claim ${claimIndex} details.`);
  await this.page.waitForLoadState('networkidle');
}

}
 
//   async filterByCustomDateRangeAndPrintClaims(fromDate, toDate) {
//     console.log('scenario  Filter by custom date range and print claims');
//     console.log(`→ Applying custom date range: ${fromDate} to ${toDate}`);

//     let claims = [];
//     let claimCount = 0;

//     try {
// //       await this.dateFilterButton.waitFor({ state: 'visible', timeout: 20000 });
//       await this.dateFilterButton.click();
      
//       // Wait for date inputs to be visible
//       await this.fromDateInput.waitFor({ state: 'visible', timeout: 10000 });
//       await this.toDateInput.waitFor({ state: 'visible', timeout: 10000 });
      
//       // Clear and fill date inputs with better handling
//       await this.fromDateInput.click();
//       await this.fromDateInput.selectText();
//       await this.fromDateInput.fill(fromDate);
      
//       await this.toDateInput.click();
//       await this.toDateInput.selectText();
//       await this.toDateInput.fill(toDate);
      
//       // Small wait before clicking done
//       await this.page.waitForTimeout(1000);
      
//       // Click done and wait for page to load
//       await this.doneButton.click();
//       await this.page.waitForLoadState('networkidle', { timeout: 30000 });
      
//       // Wait for any indication that the filter was applied
//       await this.page.waitForTimeout(2000);
      
//       // Check if monthsdateverify element exists, if not skip it
//       try {
//         await this.monthsdateverify.waitFor({ state: 'visible', timeout: 10000 });
//         const dateText = await this.monthsdateverify.textContent();
//         if (dateText?.trim()) {
//           console.log(`✅ Date filter verified: ${dateText.trim()}`);
//         }
//       } catch (error) {
//         console.log(`⚠️ Date verification element not found, checking for claims directly...`);
        
//         // Alternative: Wait for claims area to be updated
//         try {
//           await this.page.waitForSelector('[data-testid="claims"], .claims-content, #claims-container', { 
//             timeout: 10000 
//           });
//           console.log(`✅ Claims area found after date filter`);
//         } catch (altError) {
//           console.log(`ℹ️ Proceeding to check for claims...`);
//         }
//       }

//       claims = await this.viewDetailsButton.all(); // get all claim buttons
//       claimCount = claims.length;


//       if (claimCount === 0) {
//   console.log(`❌ No claims found for range ${fromDate} to ${toDate}`);

//   // ✅ Assertion: Confirm 'no matching results' message
//   await expect(this.noClaimsMessage).toBeVisible();
//   await expect(this.noClaimsMessage).toHaveText('No matching results were found');

//   // ✅ Still clear filters so next tests are not impacted
//   await this.clearButton.waitFor({ state: 'visible', timeout: 10000 });
//   await this.clearButton.click();
//   console.log(`🧹 Cleared filters after no results.`);

//   // ✅ Continue test (don't return)
// } else {
//   console.log(`✅ Claims found for range ${fromDate} to ${toDate}:`);
//   console.log(`→ Number of claim elements: ${claimCount}`);

//   for (let i = 0; i < claimCount; i++) {
//     await this.openClaimDirectly(claims[i], i + 1);
//   }

//   await this.clearButton.waitFor({ state: 'visible', timeout: 10000 });
//   await this.clearButton.click();
//   console.log(`🧹 Cleared filters after viewing all claims.`);
// }


//   //     if (claimCount === 0) {
//   //       console.log(`❌ No claims found for range ${fromDate} to ${toDate}`);
//   //       return;
//   //     }

//   //     console.log(`✅ Claims found for range ${fromDate} to ${toDate}:`);
//   //     console.log(`→ Number of claim elements: ${claimCount}`);
//   //   } catch (error) {
//   //     console.error(`❌ Error applying custom date range: ${error.message}`);
//   //     throw error;
//   //   }

//   //   for (let i = 0; i < claimCount; i++) {
//   //     await this.openClaimDirectly(claims[i], i + 1);
//   //   }

//   //   // Clear filters after viewing all claims

//   //   await this.clearButton.waitFor({ state: 'visible', timeout: 10000 });
//   //   await this.clearButton.click();
//   //   console.log(`🧹 Cleared filters after viewing all claims.`);
//   // }

//   async openClaimDirectly(claimLocator, claimIndex) {
//     console.log(`→ Opening claim ${claimIndex}...`);

//     try {
//       await claimLocator.waitFor({ state: 'visible', timeout: 10000 });
//       await claimLocator.click();
//     } catch (e) {
//       console.error(`❌ Could not open claim ${claimIndex}`);
//       return;
//     }

//     try {
//       await this.page.waitForSelector('text=Claim Details', { timeout: 30000 });
//       console.log(`✅ Claim ${claimIndex} details page opened.`);
//     } catch (e) {
//       console.error(`❌ Claim ${claimIndex} details did not load in time.`);
//       return;
//     }

//     await this.returnButton.waitFor({ state: 'visible', timeout: 30000 });
//     await this.returnButton.click();
//     console.log(`↩️ Returned to previous page after Claim ${claimIndex}.`);

//     await this.page.waitForLoadState('networkidle');
//   }
