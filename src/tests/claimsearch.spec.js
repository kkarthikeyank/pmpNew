

import { test, expect } from '@playwright/test';

// import dotenv from 'dotenv';
// dotenv.config({ path: './env/.env.stage' });
// dotenv.config({ path: './env/.env.prod' });



import { LoginPage } from '../pages/LoginPage.js';

import { readFileSync } from 'fs';
const data = JSON.parse(readFileSync(new URL('../../data/testData.json', import.meta.url)));


import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/profilePage.js';

import { ClaimsPage } from '../pages/ClaimsPage.js'; // <-- ✅ THIS is required
import { LabsPage } from '../pages/LabsPage.js'; // <-- ✅ THIS is required
import { NotesPage } from '../pages/notespage.js'; // <-- ✅ THIS is required
import { ProviderPage } from '../pages/ProviderPage.js';

import { sendAllPDFsByEmail } from '../utils/emailHelper.js';

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test('Login with valid credentials', async ({ page }) => {
   test.setTimeout(200000);

  //  await sleep(5000);  // Wait for 2 seconds before starting the test

  // console.log('Login URL:', process.env.LOGIN_URL);  // Should print the URL or be undefined if not set
  // console.log('Username:', process.env.NAME);  // Log the name from env
  // console.log('Password:', process.env.PASSWORD);  // Log the password from env


  const login = new LoginPage(page);

  await login.gotoLoginPage();
  // await login.login('Julia', 'Batman123');
  await login.login(data.user, data.password);


  // await login.login('Anna', 'test@123Example?');
  // await login.login(process.env.USERNAME, process.env.PASSWORD);
  // await login.login(process.env.NAME, process.env.PASSWORD);




  await page.waitForURL('**/member-portal/**', { timeout: 180000 });
  // await page.waitForLoadState('networkidle');

  const dashboardPage = new DashboardPage(page);



  // Assert login success with dynamic wait
  const welcomeMessage = await dashboardPage.assertLoginSuccess();
  expect(welcomeMessage).toContain('Welcome');

  // Dynamically get and validate Member ID if present
  const memberId = await dashboardPage.getMemberId();
  if (memberId) {
    // If Member ID is present, validate the content format
    expect(memberId).toMatch(/\w+/);  // Ensure the ID is a valid alphanumeric string
  } else {
    console.warn('⚠️ Member ID is optional for this user.');
  }

// scenario  Click on the "Claims YTD" link
await dashboardPage.openUsageSection();
  await dashboardPage.openClaims();

  for  (const claimsytdyears of data.claimsytdyears) {
    await dashboardPage.selectYear(claimsytdyears);
  }

  await dashboardPage.goBack();


  const profilePage = new ProfilePage(page);

  // await page.getByTitle('Your profile and settings').click();
  // await page.getByLabel('My Profile').click();

  // const profileName = await profilePage.checkProfileVisibility();
  // const dob = await profilePage.checkDobVisibility();
  // const email = await profilePage.checkEmailVisibility();
  // const gender = await profilePage.checkGe

  // const address = await profilePage.checkAddressVisibility();
   await profilePage.navigateToProfile();

  await profilePage.assertProfileNameVisible();
  await profilePage.assertDobVisible();
  await profilePage.assertEmailVisible();
  await profilePage.assertGenderVisible();
  await profilePage.assertAddressVisible();

   // Download PDF using POM

await profilePage.downloadProfileAsPdf();
  // const base64Link = await profilePage.downloadProfileAsPdf();
   // console.log('📎 Base64 PDF Link:\n', base64Link);

  // Send all PDFs by email
    await sendAllPDFsByEmail();

  const claims = new ClaimsPage(page);

  await claims.openClaimsTab();

  // scenario Filter by claim number and print claims

  
  // for (const filter of data.claimsDateFilter) {
  //   await claims.filterAndPrintClaims(filter);
  // }
//working
for (const filter of data.claimsDateFilter) {
  await claims.filterAndPrintClaimsByLabel(filter.label, filter.resultsSelectOption);
// Trigger dropdown > Download PDF
  const pdfBase64Link = await claims.downloadProfileAsPdf(`claims-${filter.label}.pdf`);

  if (pdfBase64Link) {
    console.log(`📎 Base64 PDF Link for ${filter.label}:\n${pdfBase64Link}`);
  }
}



//   for (const { label, claimNumber } of data.claimsNumberSearch) {
//   await claims.searchclaimnumber(label, claimNumber);
// }

  for (const { label, claimNumber } of data.claimsNumberSearch) {
    await claims.searchClaimNumber(label, claimNumber);
  }


  // // scenario custom date range by claim status and print claims
  for (const viewclaim of data.customDateRanges) {
    await claims.filterByCustomDateRangeAndPrintClaims(viewclaim.fromDate, viewclaim.toDate);

  }

  //  scenario filter result provider and payee , diagnosis check and uncheck 

  // for (const testCase of data.FiltersList) {
  //   await claims.filterByDateRange(testCase.dateRange);
  //   await claims.applyFilters(testCase);
  //   await claims.printResults();
  //   await claims.uncheckFilters(testCase);
  // }

  for (const testCase of data.FiltersList) {
  const filterApplied = await claims.filterByDateRange(testCase.dateRange);
  
  if (!filterApplied) {
    console.log(`[INFO] Skipping test case for date range: ${testCase.dateRange}`);
    continue; // Skip to next iteration
  }

  await claims.applyFilters(testCase);
  await claims.printResults();
  await claims.uncheckFilters(testCase);
}





  // for (const testCase of data.FiltersList) {
  //    const testCase =  await claims.filterByDateRange(testCase.dateRange);

  //     await claims. clickFilterResultsIfVisible();
  //   await claims.applyFilters(testCase);
  //   await claims.printResults();

  //   await claims.uncheckFilters(testCase);
  // }
//   for (const testCase of data.FiltersList) {
//   // Use testCase normally without types

//   const filterApplied = await claims.filterByDateRange(testCase.dateRange);



//   await claims.applyFilters(testCase);
//   await claims.printResults();


//   await claims.uncheckFilters(testCase);
// }

  
// for (const testCase of data.FiltersList) {
//   await claims.runFilterScenario(testCase.dateRange, testCase);
// }
    await sendAllPDFsByEmail(); // Send all PDFs by email after claims tests and console logs

 


  const labs = new LabsPage(page);
  // Open the Labs tab
  await labs.openlabsTab();

  //  scenario  search with date filterwith last 60month   physician by name

  for (const physicians of data.PhysicianSearchCases) {
    const name = physicians.physicianName;
    const rangeText = physicians.dateRange;
    await labs.selectDateRangephysicain(physicians.dateRange);
    await labs.searchPhysician(physicians.physicianName);
    await labs.printPhysicianResults(name, rangeText); // ✅ pass them here

    await labs.clearFilters();
  }
  // scenario  search with date filter  for a labvendor

  for (const labsrecord of data.LabSearchCases) {

    const name = labsrecord.labName;
    const rangeText = labsrecord.dateRange;


    await labs.selectDateRangelab(labsrecord.dateRange);
    await labs.searchLab(labsrecord.labName);
    await labs.logLabResults(name, rangeText); // ✅ pass values here

    await labs.clearFilters();

  }

  // scenario  search for a test name
   
  for (const testrecord of data.TestNameCases) {
    const testName = testrecord.testName;
    const rangeText = testrecord.dateRange;
    const showresultsdropdown = testrecord.showresultsdropdown;
     console.log(`\n============================`);
  console.log(`📅 Date Range Filter: ${rangeText}`);
  console.log(`🔍 Searched Test Name: "${testName}"`);

    await labs.selectDateRangetestname(rangeText);
    await labs.searchTestName(testName);
    // await labs.selectNumberOfResults(10);
      await labs.selectNumberOfResults( showresultsdropdown); // now dynamic from JSON
              await labs.printTestNames(testName);

         await labs.processVisibleTestNames();


    await labs.clearFilterstest();
  }

 

  //  scenario custom date range status abnormal and unabnormal with checkbox

  for (const [index, range] of data.labsCustomDateRange.entries()) {
    console.log(`\n📅 Checking date range #${index + 1}: ${range.startDate.monthName} ${range.startDate.day}, ${range.startDate.year} → ${range.endDate.monthName} ${range.endDate.day}, ${range.endDate.year}`);

    await labs.selectDateRange(range.startDate, range.endDate);
    console.log('☑️ Checkbox: Selected (Abnormal)');

    await labs.checkAbnormalFilter();
    await labs.printAbnormalTestNames();

    // Step 2: Uncheck and view all other results
    console.log('⬜ Checkbox: Unselected (Abnormal)');

    await labs.uncheckAbnormalFilter();
    await labs.printNonAbnormalTestNames();
  }

  // Step 1: Apply custom date range

  // for (const { dateRange, physicianName } of data.PhysicianSearchCaseswithabnormal) {
  //   console.log(`Running test for Physician: ${physicianName}, Date Range: ${dateRange}`);


  //   await labs.runAbnormalTestFlow(dateRange, physicianName);


  // }
  // scenario : search for abnormal check  and uncheck status  test results with physician name
  for (const item of data.PhysicianSearchCaseswithabnormal) {
    console.log(`Added search physician '${item.physicianName}' and months filter '${item.dateRange}'`);

    await labs.searchphysicainabnormalcheck(item.dateRange);
    await labs.searchPhysicianabnormal(item.physicianName);
    await labs.checkboxphysician();
    await labs.printAbnormalpy();
    await labs.printPhysicianNames();



    await labs.uncheckboxphysician();
    await labs.printNonAbnormalpy();
    await labs.printPhysicianNames();





  }
  // await labs.searchphysicainabnormalcheck(dateRange);
  // await labs.searchPhysicianabnormal(physicianName);
  // await labs.checkboxphysician();
  // await labs.uncheckboxphysician();

  //  scenario : search for abnormal check  and uncheck status  test results with test name


  for (const item of data.TestnameSearchCaseswithabnormal) {
    // const { dateRange, TestName } = item;

    console.log(`Running test for testnamesearch : ${item.TestName}, Date Range: ${item.dateRange}`);


    await labs.searchtestnameabnormalcheck(item.dateRange);
    await labs.searchtestnameabnormal(item.TestName);
    await labs.checkboxtestname();
    await labs.printTestNames();
    await labs.printAbnormaltestname();



    await labs.uncheckboxtestname();
    await labs.printNonAbnormaltestname();
    await labs.printTestNames();


  }

  //  scenario : search for abnormal check  and uncheck status  test results with labvendor name


  for (const item of data.labvendorSearchCaseswithabnormal) {
    console.log(`Running test for labsvendor search  : ${item.labsname}, Date Range: ${item.dateRange}`);
    // const { dateRange, labsname  } = item;


    await labs.searchlabnameabnormalcheck(item.dateRange);
    await labs.searchlabnameabnormal(item.labsname);
    await labs.checkboxlabname();
    await labs.printlabNames();
    await labs.printAbnormaltestname();



    await labs.uncheckboxlabname();
    await labs.printNonAbnormallabname();
    await labs.printlabNames();




  }
        await sendAllPDFsByEmail();


    const notes = new NotesPage(page);
  // Open the Notes tab
     await notes.openNotesTab();
await notes.downloadhealthnotesPdf();

   await sendAllPDFsByEmail();

     const provider = new ProviderPage(page);

  // open the Provider tab
  await provider.openproviderTab();
  // scenario : search for doctor type with keyword and plan and distance
  await provider.selectDoctorType();
  await provider.enterDoctorType(data.DoctorSearch.doctorTypeTextbox.keywordSearch);
  await provider.selectPlan(data.DoctorSearch.planOptions.selected);
  await provider.selectDistance(data.distanceOptions.selectedmiles);
  await provider.clickSearch();
  await provider.printSpecialtyIfExists();
  await provider.printPlanIfExists();
  await provider.printDistanceIfExists();
     await provider.clickDirectoryButton();
   await provider.clickMyDirectoryButton();
   await provider.clickRemoveAllButton();
   await provider.clickPreviousButton();



  // scenario : search for doctor name with keyword and plan
  for (const testCase of data.DoctorNameSearch) {
    const name = testCase.doctorNameTextbox.keywordSearch;
    const selectedPlan = testCase.planOptions.selected;
    const selectedDistance = testCase.distance.choosemiles;

    await provider.clickDoctorName();        // ✅ Now available
await provider.selectDoctorName();       // ✅ Now available  
await provider.searchByDoctorName(name); // ✅ Now available
await provider.selectDoctorPlan(selectedPlan);
await provider.selectDistancedoctorname(selectedDistance);
await provider.printdoctorPlanIfExists();
await provider.printdoctorNameIfExists();
await provider.printDistancedoctornameIfExists();

    // await provider.clickDoctorName();
    // await provider.selectDoctorName();
    // await provider.searchByDoctorName(name);
    // await provider.selectDoctorPlan(selectedPlan);
    // await provider.selectDistancedoctorname(selectedDistance);
    // await provider.printdoctorPlanIfExists();
    // await provider.printdoctorNameIfExists();
    // await provider.printDistancedoctornameIfExists();
    // await provider.clearButton.click();
    console.log(`[INFO] Cleared input for next search\n`);
  }

   // scenario : search for health facilities  name with keyword and plan and distance

  for (const testCase of data.healthfacilitiesSearch) {
    const name = testCase.healthNameTextbox.keywordSearch;
    const selectedPlan = testCase.planOptions.selected;
    const selectedDistance = testCase.distance.choosemiles;

    console.log(`\n[INFO] Running test case with: Name="${name}", Plan="${selectedPlan}", Distance="${selectedDistance}"`);

    await provider.clickhealthfacilities();
    await provider.selecthealthFacilities();
    await provider.searchByHealthfacilities(name);
    await provider.selecthealthfacilitiesDoctorPlan(selectedPlan);
    await provider.selectDistancedoctornamehealth(selectedDistance);

    // await provider.printDistancehealthIfExists();
    await provider.printdochealthNameResultstorNameIfExists();
    await provider.printhealthfacilitesIfExists();

    await provider.clearButton.click();
    console.log(`[INFO] Cleared input for next search\n`);
  }

     await sendAllPDFsByEmail();

   
  await provider.logout();

  await expect(page).toHaveURL('https://hikepmp-dev.smilecdr.com/member-portal/#/login'); // Replace with the actual login URL
  console.log('User logged out successfully.');
    180000 // ⏱️ Extended timeout (3 minutes)

});