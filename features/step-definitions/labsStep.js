
// import data from '../../data/testData.json' assert { type: 'json' };
// import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
// import { expect } from '@playwright/test';   // <-- add this import
// import { LoginPage } from '../../src/pages/LoginPage.js';
// import { LabPage } from '../../src/pages/LabsPage.js';

// setDefaultTimeout(70000);

// let page;
// let login;
// let LabPage;

// Given('I am logged in with valid credentials', async function () {
//   page = this.page;  // cucumber-playwright injects page context
//   login = new LoginPage(page);
// Labs= new LabPage(page);

//   await login.gotoLoginPage();
//   await login.login(data.user, data.password);

//   await page.waitForURL('**/member-portal/**', { timeout: 180000 });
// });

// When('I open the Labs tab', async function () {
//   await Labs.openlabsTab();
// });




// When('I select {string} in the date range filter', async (dateRange) => {
//   await labs.selectDateRangephysicain(dateRange);
// });

// When('I search for physician {string}', async (physicianName) => {
//   await labs.searchPhysician(physicianName);
// });

// Then('I should see physician results for {string} and {string}', async (physicianName, dateRange) => {
//   await labs.printPhysicianResults(physicianName, dateRange);
//   await labs.clearFilters();
//   });

// Import JSON data properly
// import data from '../../data/testData.json' assert { type: 'json' };
import { readFileSync } from 'fs';
const data = JSON.parse(readFileSync(new URL('../../data/testData.json', import.meta.url)));


// Cucumber + Playwright dependencies
import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

// Page Object imports
import { LoginPage } from '../../src/pages/LoginPage.js';
import { LabsPage } from '../../src/pages/LabsPage.js'; // POM for Labs tab

setDefaultTimeout(70000); // Set default step timeout

// Declare shared variables
let page;
let login;
let labs; // ✅ Renamed from LabPage to labs (to avoid name clash)

Given('I am logged in with valid credential', async function () {
  page = this.page; // Injected by cucumber-playwright
  login = new LoginPage(page);
  labs = new LabsPage(page); // ✅ Correct naming to avoid redeclaration

  await login.gotoLoginPage();
  await login.login(data.user, data.password);
  await page.waitForURL('**/member-portal/**', { timeout: 180000 });
});

When('I open the Labs tab', async function () {
  await labs.openlabsTab();
});

When('I select {string} in the date range filter', async function (dateRange) {
  await labs.selectDateRangephysicain(dateRange);
});

When('I search for physician {string}', async function (physicianName) {
  await labs.searchPhysician(physicianName);
});

Then('I should see physician results for {string} and {string}', async function (physicianName, dateRange) {
  await labs.printPhysicianResults(physicianName, dateRange);
  await labs.clearFilters();
});



When('I select {string} in the lab date range filter', async function (dateRange) {
  await labs.selectDateRangelab(dateRange);
});

When('I search for lab vendor {string}', async function (labName) {
  await labs.searchLab(labName);
});

Then('I should see lab results for {string} and {string}', async function (labName, dateRange) {
  await labs.logLabResults(labName, dateRange);
  await labs.clearFilters();
});


Then('I clear the filters', async function () {
  await labs.clearFilters();
});