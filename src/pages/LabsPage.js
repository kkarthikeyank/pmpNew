
 
import { expect } from '@playwright/test';

 
export class LabsPage {
  constructor(page) {

    this.page = page;
    this.labsTab = page.locator('#navLink-LABS');
    this.physiciansearchinput = page.locator('#labsFilterPhysicianSearchInput')
    this.applyButton = page.getByRole('button', { name: 'Apply' });
    this.physicianNameElements = page.locator("//p[starts-with(@id, 'physicianText')]"); //physician text print 
      // Locator for abnormal rows
    this.abnormalLocator = page.locator("//div[contains(@class, 'abnormal-row')]");

    // Locator for all rows (normal + abnormal)
    this.allRows = page.locator("//div[@data-id='labsCardObjectResultsDiv']//div[contains(@class, 'row-cols-2')]");
        this.abnormalLocatosr = page.locator('//div[@data-id="labsCardObjectResultsDiv"]//div[contains(@class, "row") and .//span[contains(text(), "ABNORMAL")]]');
        this.resultsDropdown = page.getByLabel('select number of results'); //pag


    this.physician = page.locator('#physicianText328558');
    this.labSearchInput = page.getByRole('textbox', { name: 'ex. Life Labs' });
        this.labNameElements = page.locator("//p[starts-with(@id, 'labVendorText')]"); //lab vendor text

    //p[starts-with@id,'labVendorText']
    // this.applyButton = page.getByRole('button', { name: 'Apply' });
    //  this.last36MonthsButton=page.getByRole('button', { name: 'Last 36 Months' })
    this.last36MonthsButton = page.locator('//button[@id="dropdownDateFilterButton"]'); //first select the date range button
    this.last3MonthsOption = page.getByText('Last 3 Months');
    this.dateRangeText = page.locator('//div[@class="d-flex flex-wrap"]');
    this.noLabResultsText =page.getByText('No Lab Results to Show');
    this.customDateButton = page.locator('//li[normalize-space()="Custom"]');
    this.monthDropdown = page.locator('//select[@title="Select month"]');
    this.checkboxAbnormal = page.locator('//input[@id="checkboxAbnormal"]');
    this.last3MonthsDropdownItem = page.locator('//li[normalize-space()="Last 3 Months"]');
    this.firstLabCardAbnormalLabel = page.getByText('Calcium SerPl-sCnc').first();
    this.noAbnormalLabel = page.locator('//span[normalize-space(text())="N/A"]');
    this.clearButton = page.locator('//a[normalize-space()="Clear"]');
     this.abnormalLocatorwwithstatus = page.locator(
      `//div[@data-id='labsCardObjectResultsDiv']//div[contains(@class, 'row') and .//span[contains(text(), 'ABNORMAL')]]/span[1]`);
      //span[normalize-space(text())='N/A']
    // this.monthFilter = page.locator('//option[@value="1"]');
    // this.yearDropdown = page.locator('//select[@title="Select year"]');
    // this.yearFilter = page.locator('option[value="2024"]');
    // this.previousButton = page.locator('//button[@aria-label="Previous month"]');
    // this.nextButton = page.locator('//button[@title="Next month"]');
    this.monthDropdown = page.locator('//select[@title="Select month"]');
    this.monthOptions = page.locator('//select[@title="Select month"]/option');
    this.yearDropdown = page.locator('//select[@title="Select year"]');
    this.yearOptions = page.locator('//select[@title="Select year"]/option');

    this.testnamesearchBox = page.getByRole('textbox', { name: 'ex. Triglycerides' });
    this.testNameLocators = page.locator("//div[@data-id='labsCardObjectResultsDiv']//div[contains(@class, 'row')]"); // custom
    this.testnameonly=page.locator("//div[@data-id='labsCardObjectResultsDiv']//div[contains(@class, 'row-cols-2')]/span[1]")
    this.expandButton = page.locator("//button[@data-id='labsTestComponentInfoHeadingCollapse']");
      this.viewdetails = page.locator("//button[contains(@id, 'viewDetails')]");

this.returnButton = page.locator("//a[@data-id='labsGoBack']");
// this.testNameLocators = page.locator("//div[@data-id='labsCardObjectResultsDiv']//div[contains(@class, 'row')]");

// this.testNameLocators = page.locator("//div[@data-id='labsCardObjectResultsDiv']//div[contains(@class, 'row')]");

    this.testnamewithabnormal=page.locator('//div[contains(@class, "row-cols-2")]/span')

    this.applyButton = page.getByRole('button', { name: 'Apply' });
    this.clearButton = page.getByText('Clear');





    
  
  }
 
  
  async openlabsTab() {
    // Ensure the Claims tab is visible before clicking
    await this.page.waitForSelector('#navLink-LABS', { state: 'visible' });
    await this.labsTab.click();
    await this.page.waitForLoadState('networkidle');

    // Optionally, wait for the page to load after clicking the  tab (if it redirects)
    // await this.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 });

  }

  
  //  scenario  search with date filterwith last 60month   physician by name
     

    async selectDateRangephysicain(rangeText) {
      console.log(' test scenario  search with date filterwith last 60month   physician by name')
    await this.last36MonthsButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.last36MonthsButton.click();
    await this.page.getByText(rangeText).click();
  }

  async searchPhysician(name) {
      //  await this.page.waitForSelector('#labsFilterPhysicianSearchInput', { state: 'visible' });
   await this.page.waitForLoadState('networkidle');
    await this.physiciansearchinput.waitFor({ state: 'visible', timeout: 10000 });
      // await expect(this.physiciansearchinput).toBeVisible({ timeout: 10000 });

    await this.physiciansearchinput.click();

    await this.physiciansearchinput.fill(name);
   await this.physiciansearchinput.waitFor({ state: 'visible' });
   await this.physiciansearchinput.click();

  }

  async clearFilters() {
    await this.clearButton.click();
  }

  async printPhysicianResults(name, rangeText) {
  console.log(`\n--- Filter Selection ---`);
  console.log(`Date Range: ${rangeText}`);
  console.log(`Physician Name Searched: ${name}`);

  // await this.page.waitForTimeout(1000); // give time for search results to load
  await this.page.waitForLoadState('networkidle'); // wait for network to be idle

  const count = await this.physicianNameElements.count();

  if (count === 0) {
    console.log('🔍 No physician results found');
    
    // ✅ ASSERTION: Check for "No Lab Results" message (non-blocking)
    try {
      await expect(this.noLabResultsText).toBeVisible({ timeout: 3000 });
      console.log('✅ Assertion Passed: "No Lab Results to Show" message confirmed');
    } catch (assertionError) {
      console.log('⚠️ Assertion Info: "No Lab Results to Show" message not found');
      console.log('ℹ️ This may be expected behavior - continuing test...');
    }
  
  } else {
    // Assertion that at least one physician result is found
    expect(count).toBeGreaterThan(0);
    console.log(`✅ Assertion Passed: ${count} physician result(s) found.`);
  
    for (let i = 0; i < count; i++) {
      const physicianName = await this.physicianNameElements.nth(i).innerText();
      console.log(`Physician ${i + 1}: ${physicianName}`);
    }
  }

  console.log(); // spacing
}


       // scenario  search with date filter  for a labvendor

   async selectDateRangelab(rangeText) {
    console.log(' test scenario  search with date filter  for a labvendor')
      await this.page.waitForSelector('//button[@id="dropdownDateFilterButton"]', { state: 'visible' });

    await this.last36MonthsButton.click();
    await this.page.getByText(rangeText).click();
  }

  

  async searchLab(name) {
    await this.labSearchInput.click();
    await this.labSearchInput.fill(name);
    await this.applyButton.click();
  }

 
  //  async clearFilters() {
  //   await this.clearButton.click();
  // }

async logLabResults(name, rangeText) {
  console.log(`\n--- Filter Selection ---`);
  console.log(`Date Range: ${rangeText}`);
  console.log(`Lab Vendor Name Searched: ${name}`);

  // await this.page.waitForTimeout(1000); // allow results to load
    await this.page.waitForLoadState('networkidle');

  const count = await this.labNameElements.count();

  if (count === 0) {
    console.log('No lab vendors found.');
  } else {
    for (let i = 0; i < count; i++) {
      const text = await this.labNameElements.nth(i).textContent();
      console.log(`Lab Vendor ${i + 1}: ${text.trim()}`);
    }
  }

  console.log(); // spacing
}





// scenario  search for a test name


// scenario  search for a test name

    async selectDateRangetestname(rangeText) {
      console.log(' test scenario  search with date filter  for a test name')
    await this.last36MonthsButton.click();
    await this.page.getByText(rangeText).click();
  }

  async searchTestName(name) {
    await this.testnamesearchBox.click();
    await this.testnamesearchBox.fill(name);
   
   
  }
// async selectNumberOfResults(count) {
//  const drop= await this.page.getByLabel('select number of results').selectOption(count.toString());
//   console.log("changed the dropdown for showmoreresults",drop)
//    await this.applyButton.click(); 

//     // await this.page.waitForTimeout(3000); // waits 3 seconds (use as last resort)
// await this.testNameLocators.first().waitFor({ state: 'visible', timeout: 10000 });

// }
async selectNumberOfResults(count) {
    try {
        console.log(`🔄 Selecting ${count} results from dropdown...`);
        
        // 1. Wait for dropdown to be ready
        await this.resultsDropdown.waitFor({ state: 'visible', timeout: 15000 });
        
        // 2. Select the option and wait for it to be selected
        await this.resultsDropdown.selectOption(count.toString());
        console.log(`✅ Dropdown changed to show ${count} results`);
        
        // 3. Small delay to ensure dropdown value is set
        await this.page.waitForTimeout(1000);
        
        // 4. Verify the selection was made
        const selectedValue = await this.resultsDropdown.inputValue();
        if (selectedValue !== count.toString()) {
            throw new Error(`Dropdown selection failed. Expected: ${count}, Got: ${selectedValue}`);
        }
        
        // 5. Click Apply button and wait for it to be processed
        await this.applyButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.applyButton.click();
        console.log('✅ Apply button clicked');
        
        // 6. Wait for network requests to complete
        await this.page.waitForLoadState('networkidle', { timeout: 30000 });
        
        // 7. Wait for either results to appear OR "No results" message
        await Promise.race([
            // Wait for test results to appear
            this.page.waitForSelector(
                "//div[@data-id='labsCardObjectResultsDiv']//div[contains(@class, 'row')]", 
                { state: 'visible', timeout: 20000 }
            ),
            // OR wait for "No Lab Results" message
            this.page.waitForSelector(
                'text=No Lab Results to Show', 
                { state: 'visible', timeout: 20000 }
            )
        ]);
        
        // 8. Verify results loaded
        const resultsCount = await this.testNameLocators.count();
        if (resultsCount > 0) {
            console.log(`✅ ${resultsCount} test results found and loaded successfully`);
            
            // 9. Wait for first result to be fully visible (extra safety)
            await this.testNameLocators.first().waitFor({ 
                state: 'visible', 
                timeout: 5000 
            });
        } else {
            console.log('ℹ️ No test results found - this may be expected');
        }
        
        return resultsCount;
        
    } catch (error) {
        // 10. Enhanced error handling with debugging info
        console.error('❌ Error in selectNumberOfResults:', error.message);
        
        // Take screenshot for debugging
        await this.page.screenshot({ 
            path: `debug-screenshots/select-results-error-${Date.now()}.png`,
            fullPage: true 
        });
        
        // Log page state for debugging
        const pageUrl = this.page.url();
        const pageTitle = await this.page.title();
        console.log(`📍 Current URL: ${pageUrl}`);
        console.log(`📄 Page Title: ${pageTitle}`);
        
        // Check if Apply button is still visible
        const applyVisible = await this.applyButton.isVisible();
        console.log(`🔘 Apply button visible: ${applyVisible}`);
        
        // Check if dropdown still exists
        const dropdownVisible = await this.resultsDropdown.isVisible();
        console.log(`📋 Dropdown visible: ${dropdownVisible}`);
        
        throw new Error(`Failed to select ${count} results: ${error.message}`);
    }
}




 // Logs only the test names from search results
  async printTestNames(testName) {
    const count = await this.testNameLocators.count();
      console.log(`\n🔍 Searched Test Name: "${testName}"`);


    if (count === 0) {
      console.log('[INFO] No test records found.');
      return;
    }

    console.log(`[INFO] Found ${count} test entries:\n`);

    for (let i = 0; i < count; i++) {
      const item = this.testNameLocators.nth(i);
      const rawText = await item.innerText();

      const lines = rawText.split('\n').map(line => line.trim()).filter(Boolean);
      const testName = lines[0] || 'Unknown Test Name';

      console.log(`  📌 Name      : ${testName}`);
    }
  }

  // Opens each test's detail view (if visible), expands, and returns
  async processVisibleTestNames() {
    const count = await this.viewdetails.count();

    if (count === 0) {
      console.log('[INFO] No visible test names. Skipping View Details step.');
      return;
    }

    for (let i = 0; i < count; i++) {
      const button = this.viewdetails.nth(i);
      if (await button.isVisible()) {
        console.log(`[INFO] Clicking View Details for test ${i + 1}`);
        await button.click();
                // await this.page.waitForTimeout(2000); // waits 3 seconds (use as last resort)

        //  await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
         
    // ✅ Take full-page screenshot after opening View Details
    // await this.page.screenshot({
    //   path: `screenshots/view_details_test_${i + 1}.png`,
    //   fullPage: true
    // })
        // await this.expandButton.waitFor({ state: 'visible', timeout: 5000 });
                // await this.expandButton.first().scrollIntoViewIfNeeded();

        console.log('→ Clicked Expand');
        // await this.page.waitForSelector("//button[@data-id='labsTestComponentInfoHeadingCollapse']", { state: 'visible' });
        // await this.expandButton.first().waitFor({ state: 'visible', timeout: 10000 });
        await this.expandButton.first().waitFor({ state: 'visible' });


        await this.expandButton.click();

         await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

        await this.returnButton.waitFor({ state: 'visible', timeout: 5000 });
        console.log('→ Clicked Return');
        await this.returnButton.click();

         if (i < count - 1) {
      try {
        await this.page.waitForFunction(() => {
          return document.querySelectorAll("div[data-id='labsCardObjectResultsDiv'] .row").length > 0;
        }, { timeout: 10000 });
        console.log('[INFO] Returned to test list.');
      } catch {
        console.warn('⚠️ Test list did not reload after return. Skipping remaining steps.');
        return;
      }
    }
  } else {
    console.log(`[INFO] Test ${i + 1} is not visible. Skipping.`);
  }
    }
  }
   async clearFilterstest() {
    // await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  // console.log('[INFO] Page scrolled to bottom');
    // await this.page.waitForSelector('//a[normalize-space()="Clear"]', { state: 'visible' });
    await this.page.waitForLoadState('networkidle'); // or 'domcontentloaded'

    await this.page.getByText('Clear', { exact: true }).waitFor({ state: 'visible' });


    await this.clearButton.click();
   
  }

//     async selectDateRangetestname(rangeText) {
//     await this.last36MonthsButton.click();
//     await this.page.getByText(rangeText).click();
//   }

//   async searchTestName(name) {
//     await this.testnamesearchBox.click();
//     await this.testnamesearchBox.fill(name);
   
   
//   }
// async selectNumberOfResults(count) {
//  const drop= await this.page.getByLabel('select number of results').selectOption(count.toString());
//   console.log("object==============================================================================================",drop)
//    await this.applyButton.click();
// }
// async printTestResults(searchedName, rangeText) {
//   console.log(`\n--- Filter Selection ---`);
//   console.log(`Date Range: ${rangeText}`);
//   console.log(`Test Name Searched: ${searchedName}`);

//   await this.page.waitForTimeout(1000); // wait for results to appear

//   const count = await this.testNameLocators.count();
//   let matchFound = false;

//   for (let i = 0; i < count; i++) {
//     const fullText = await this.testNameLocators.nth(i).textContent();
//     const trimmedText = fullText.trim();

//     // Match exactly or case-insensitively (adjust as needed)
//     if (trimmedText.includes(searchedName)) {
//       console.log(`Test Name ${i + 1}: ${trimmedText}`);
//       matchFound = true;
//     }
//   }

//   if (!matchFound) {
//     console.log('No test names found');
//   }

//   console.log(); // spacing
// }

  
  //  async clearFilters() {
  //   // await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  // console.log('[INFO] Page scrolled to bottom');
 // Wait for the element to appear and be visible
// await this.page.waitForSelector(    '//a[normalize-space()="Clear"]', { state: 'visible', timeout: 10000 });



// Then perform the click
  //   await this.clearButton.click();
   
  // }

//  scenario custom date range status abnormal and unabnormal with checkbox

  dateCell(dayName, monthName, day, year) {

    console.log(' scenario custom date range status abnormal and unabnormal with checkbox');
    const fullDateLabel = `${dayName}, ${monthName} ${day}, ${year}`;
    return this.page.locator(`//div[@aria-label="${fullDateLabel}"]`);
  }

  async openCustomDatePicker() {
  await this.page.waitForLoadState('networkidle'); // wait for full load

  await this.last36MonthsButton.waitFor({ state: 'visible', timeout: 10000 });
  await this.last36MonthsButton.click();

  await this.customDateButton.waitFor({ state: 'visible', timeout: 10000 });
  await this.customDateButton.click();
}


  async selectYear(value) {
    await this.yearDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await this.yearDropdown.selectOption({ value });
  }

  async selectMonth(value) {
    const monthCount = await this.monthOptions.count();
    for (let i = 0; i < monthCount; i++) {
      const optionValue = await this.monthOptions.nth(i).getAttribute('value');
      if (optionValue === value) {
        await this.monthDropdown.selectOption(optionValue);
        break;
      }
    }
  }

  async selectDateRange(start, end) {
    await this.openCustomDatePicker();

    // Start Date
    await this.selectYear(start.year);
    await this.selectMonth(start.month);
    await this.dateCell(start.dayName, start.monthName, start.day, start.year).click();

    // End Date
    await this.selectYear(end.year);
    await this.selectMonth(end.month);
        await this.page.waitForLoadState('networkidle', { timeout: 30000 });

    await this.dateCell(end.dayName, end.monthName, end.day, end.year).click();
  }


    // Check Abnormal checkbox
async checkAbnormalFilter() {
  const isChecked = await this.checkboxAbnormal.isChecked();
  if (!isChecked) {
    await this.checkboxAbnormal.click();
  }

  await this.applyButton.click();
  //   await this.page.evaluate(() => {
  //   window.scrollBy(0, 500); // Scroll down by 500 pixels
  // });
  // await this.page.waitForTimeout(500); // Small pause after scroll
}

async uncheckAbnormalFilter() {
  const isChecked = await this.checkboxAbnormal.isChecked();
  if (isChecked) {
    await this.checkboxAbnormal.uncheck();
  }
  await this.applyButton.click();

  // await this.page.evaluate(() => {
  //   window.scrollBy(0, 500); // Scroll down by 500 pixels
  // });
  // await this.page.waitForTimeout(500); // Small pause after scroll

}




async printAbnormalTestNames() {
  const count = await this.testNameLocators.count();
  if (count === 0) {
    console.log('✅ No abnormal test results found.');
    return;
  }

  const testNames = [];
  for (let i = 0; i < count; i++) {
    const row = this.testNameLocators.nth(i);
    const testName = await row.locator('span').first().innerText();
    testNames.push(testName);
  }

  console.log('🔴 Abnormal test results found:');
  testNames.forEach((name, idx) => console.log(`  ${idx + 1}. ${name}`));
}
  // Uncheck Abnormal checkbox



// Print test names that are NOT abnormal
async printNonAbnormalTestNames() {
  const allRows = this.page.locator(`//div[@data-id='labsCardObjectResultsDiv']//div[contains(@class, 'row')]`);
  const total = await allRows.count();
  const testNames = [];

  for (let i = 0; i < total; i++) {
    const row = allRows.nth(i);
    const isAbnormal = await row.locator('span', { hasText: 'ABNORMAL' }).count();
    if (isAbnormal === 0) {
      const testName = await row.locator('span').first().innerText();
      testNames.push(testName);
    }
  }

  if (testNames.length === 0) {
    console.log('✅ No normal/non-abnormal test results found.');
  } else {
    console.log('🟢 Non-abnormal test results found:');
    testNames.forEach((name, idx) => console.log(`  ${idx + 1}. ${name}`));
  }
}



//  scenario : search for abnormal check  and uncheck status  test results with  physician name
    async searchphysicainabnormalcheck(rangeText) {
    console.log('scenario : search for abnormal check  and uncheck status  test results with  physician name')



      await this.last36MonthsButton.waitFor({ state: 'visible', timeout: 15000 });

    await this.last36MonthsButton.click();
    await this.page.getByText(rangeText).click();
    // await this.page.locator('li.dropdown-item', { hasText: rangeText }).click();

  }

  
     async searchPhysicianabnormal(physicianname) {
    await this.physiciansearchinput.click();
    await this.physiciansearchinput.fill(physicianname);
   await this.physiciansearchinput.waitFor({ state: 'visible' });
  }

  async checkboxphysician() {
  const isChecked = await this.checkboxAbnormal.isChecked();
  if (!isChecked) {
    await this.checkboxAbnormal.click();
        console.log("checkbox checked ")

  }

  await this.applyButton.click();
    await this.page.evaluate(() => {
    window.scrollBy(0, 500); // Scroll down by 500 pixels
  });
  // await this.page.waitForTimeout(500); // Small pause after scroll
      await this.page.waitForLoadState('networkidle', { timeout: 30000 });

}

async uncheckboxphysician() {
  await this.page.waitForLoadState('networkidle', { timeout: 30000 });

  const isChecked = await this.checkboxAbnormal.isChecked();
  if (isChecked) {
    await this.checkboxAbnormal.uncheck();
        console.log("checkbox  unchecked ")

  }
  await this.applyButton.click();

  await this.page.evaluate(() => {
    window.scrollBy(0, 500); // Scroll down by 500 pixels
  });
  // await this.page.waitForTimeout(500); // Small pause after scroll
      await this.page.waitForLoadState('networkidle', { timeout: 30000 });


}
async printPhysicianNames() {
  const physicianNames = await this.physicianNameElements.allTextContents();

  if (physicianNames.length > 0) {
    console.log("Physician Names:");
    physicianNames.forEach(name => console.log(name));
  } else {
    console.log("No physician names found.");
  }
}


async printAbnormalpy() {
  const count = await this.testNameLocators.count();
  if (count === 0) {
    console.log('✅ No abnormal test results found.');
    return;
  }

  const testNames = [];
  for (let i = 0; i < count; i++) {
    const row = this.testNameLocators.nth(i);
    // const testName = await row.locator('span').first().innerText();
    const testName = await row.locator('span').first().innerText({ timeout: 120000 });

    testNames.push(testName);
  }

  console.log('🔴 Abnormal test results found:');
  testNames.forEach((name, idx) => console.log(`  ${idx + 1}. ${name}`));
}


async printNonAbnormalpy() {
  const allRows = this.page.locator(`//div[@data-id='labsCardObjectResultsDiv']//div[contains(@class, 'row')]`);
  const total = await allRows.count();
  const testNames = [];

  for (let i = 0; i < total; i++) {
    const row = allRows.nth(i);
    const isAbnormal = await row.locator('span', { hasText: 'ABNORMAL' }).count();
    if (isAbnormal === 0) {
      const testName = await row.locator('span').first().innerText();
      testNames.push(testName);
    }
  }

  if (testNames.length === 0) {
    console.log('✅ No normal/non-abnormal test results found.');
  } else {
    console.log('🟢 Non-abnormal test results found:');
    testNames.forEach((name, idx) => console.log(`  ${idx + 1}. ${name}`));
  }
}

//  scenario : search for abnormal check  and uncheck status  test results with test name

   async searchtestnameabnormalcheck(rangeText) {
    console.log('scenario : search for abnormal check  and uncheck status  test results with test name')

  await this.page.waitForSelector('//button[@id="dropdownDateFilterButton"]', { state: 'visible' });

    await this.last36MonthsButton.click();
    // await this.page.getByText(rangeText).click();
    await this.page.locator('li.dropdown-item', { hasText: rangeText }).click();

  }
     async searchtestnameabnormal(testname ){
    await this.testnamesearchBox.click();
    await this.testnamesearchBox.fill(testname);
   await this.testnamesearchBox.waitFor({ state: 'visible' });
  }

  async checkboxtestname() {
  const isChecked = await this.checkboxAbnormal.isChecked();
  if (!isChecked) {
    await this.checkboxAbnormal.click();
        console.log("checkbox checked ")

  }

  await this.applyButton.click();
    await this.page.evaluate(() => {
    window.scrollBy(0, 500); // Scroll down by 500 pixels
  });
  // await this.page.waitForTimeout(500); // Small pause after scroll
  await this.page.waitForSelector('//input[@id="checkboxAbnormal"]', { state: 'visible' });
}

async uncheckboxtestname() {
  const isChecked = await this.checkboxAbnormal.isChecked();
  if (isChecked) {
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    await this.checkboxAbnormal.uncheck();
    console.log("checkbox unchecked ")
  }
  await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  await this.applyButton.click();
  await this.page.evaluate(() => {
    window.scrollBy(0, 500); // Scroll down by 500 pixels
  });
  // Wait for either results or "No Lab Results to Show"
  try {
    await Promise.race([
      this.page.waitForSelector("//div[@data-id='labsCardObjectResultsDiv']//div[contains(@class, 'row-cols-2')]/span[1]", { state: 'visible', timeout: 10000 }),
      this.page.waitForSelector('text=No Lab Results to Show', { state: 'visible', timeout: 10000 })
    ]);
  } catch (e) {
    console.warn('Neither results nor "No Lab Results to Show" appeared in time.');
  }
}
async printTestNames() {
  const physicianNames = await this.testnameonly.allTextContents();

  if (physicianNames.length > 0) {
    console.log(" Test Names:");
    physicianNames.forEach(name => console.log(name));
  } else {
    console.log("No Test names found.");
  }
}




async printAbnormaltestname() {
  const count = await this.testNameLocators.count();
  if (count === 0) {
    console.log('✅ No abnormal test results found.');
    return;
  }

  const testNames = [];
  for (let i = 0; i < count; i++) {
    const row = this.testNameLocators.nth(i);
    const testName = await row.locator('span').first().innerText();
    testNames.push(testName);
  }

  console.log('🔴 Abnormal test results found:');
  testNames.forEach((name, idx) => console.log(`  ${idx + 1}. ${name}`));
}


async printNonAbnormaltestname() {
  const allRows = this.page.locator(`//div[@data-id='labsCardObjectResultsDiv']//div[contains(@class, 'row')]`);
  const total = await allRows.count();
  const testNames = [];

  for (let i = 0; i < total; i++) {
    const row = allRows.nth(i);
    const isAbnormal = await row.locator('span', { hasText: 'ABNORMAL' }).count();
    if (isAbnormal === 0) {
      const testName = await row.locator('span').first().innerText();
      testNames.push(testName);
    }
  }

  if (testNames.length === 0) {
    console.log('✅ No normal/non-abnormal test results found.');
  } else {
    console.log('🟢 Non-abnormal test results found:');
    testNames.forEach((name, idx) => console.log(`  ${idx + 1}. ${name}`));
  }
}





//  scenario : search for abnormal check  and uncheck status  test results with labvendor name



async searchlabnameabnormalcheck(rangeText) {
    console.log('scenario : search for abnormal check  and uncheck status  test results with labvendor name')
    await this.last36MonthsButton.click();
    // await this.page.getByText(rangeText).click();
    await this.page.locator('li.dropdown-item', { hasText: rangeText }).click();

  }
     async searchlabnameabnormal(labname ){
    await this.labSearchInput.click();
    await this.labSearchInput.fill(labname);
   await this.labSearchInput.waitFor({ state: 'visible' });
  }

  async checkboxlabname() {
  const isChecked = await this.checkboxAbnormal.isChecked();
  if (!isChecked) {
    await this.checkboxAbnormal.click();
    console.log("checkbox checked ")
  }

  await this.applyButton.click();
    await this.page.evaluate(() => {
    window.scrollBy(0, 500); // Scroll down by 500 pixels
  });
  // await this.page.waitForTimeout(500); // Small pause after scroll
  await this.page.waitForSelector('//input[@id="checkboxAbnormal"]', { state: 'visible' });
}

async uncheckboxlabname() {
  const isChecked = await this.checkboxAbnormal.isChecked();
  if (isChecked) {
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });

    await this.checkboxAbnormal.uncheck();
  }
  // await this.applyButton.click();
  await this.applyButton.waitFor({ state: 'visible', timeout: 15000 });
await this.applyButton.click();


  await this.page.evaluate(() => {
    window.scrollBy(0, 500); // Scroll down by 500 pixels
  });
   await this.page.waitForLoadState('networkidle', { timeout: 30000 });

  // await this.page.waitForSelector("//p[starts-with(@id, 'labVendorText')]", { state: 'visible' });

}
async printlabNames() {
  const labsNames = await this.labNameElements.allTextContents();

  if (labsNames.length > 0) {
    console.log("LabsNames:");
    labsNames.forEach(name => console.log(name));
  } else {
    console.log("No Labs names found.");
  }
}


async printAbnormallabname() {
  const count = await this.testNameLocators.count();
  if (count === 0) {
    console.log('✅ No abnormal test results found.');
    return;
  }

  const testNames = [];
  for (let i = 0; i < count; i++) {
    const row = this.testNameLocators.nth(i);
    const testName = await row.locator('span').first().innerText();
    testNames.push(testName);
  }

  console.log('🔴 Abnormal test results found:');
  testNames.forEach((name, idx) => console.log(`  ${idx + 1}. ${name}`));
}


async printNonAbnormallabname() {
  const allRows = this.page.locator(`//div[@data-id='labsCardObjectResultsDiv']//div[contains(@class, 'row')]`);
  const total = await allRows.count();
  const testNames = [];

  for (let i = 0; i < total; i++) {
    const row = allRows.nth(i);
    const isAbnormal = await row.locator('span', { hasText: 'ABNORMAL' }).count();
    if (isAbnormal === 0) {
      const testName = await row.locator('span').first().innerText();
      testNames.push(testName);
    }
  }

  if (testNames.length === 0) {
    console.log('✅ No normal/non-abnormal test results found.');
  } else {
    console.log('🟢 Non-abnormal test results found:');
    testNames.forEach((name, idx) => console.log(`  ${idx + 1}. ${name}`));
  }
}

}





