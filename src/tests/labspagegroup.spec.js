import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { LabsPage } from '../pages/LabsPage.js';
// import data from '../../data/testData.json' assert { type: 'json' };

import { readFileSync } from 'fs';
const data = JSON.parse(readFileSync(new URL('../../data/testData.json', import.meta.url)));


test.describe('Member Portal - Labs Flow', () => {
    let login;
    let labs;
    let page;


    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();

        login = new LoginPage(page);
        labs = new LabsPage(page);

        await login.gotoLoginPage();
        await login.login(data.user, data.password);

        await page.waitForURL('**/member-portal/**', { timeout: 180000 });

        // Save page instance to reuse in tests
        labs.page = page;

    }, { timeout: 180000 });

    test('Open Labs tab after login', async () => {
        await labs.openlabsTab();

        // Validate that Labs page is displayed
        // await expect(labs.page.locator('text=Labs')).toBeVisible();


    });

    //  scenario  search with date filterwith last 60month   physician by name
    test('search with date filterwith last  physician by name', async () => {
        for (const physicians of data.PhysicianSearchCases) {
            const name = physicians.physicianName;
            const rangeText = physicians.dateRange;
            await labs.selectDateRangephysicain(physicians.dateRange);
            await labs.searchPhysician(physicians.physicianName);
            await labs.printPhysicianResults(name, rangeText); // ✅ pass them here

            await labs.clearFilters();
        }


    });
    test.skip('search with lab vendor  name search', async () => {
        for (const labsrecord of data.LabSearchCases) {

            const name = labsrecord.labName;
            const rangeText = labsrecord.dateRange;


            await labs.selectDateRangelab(labsrecord.dateRange);
            await labs.searchLab(labsrecord.labName);
            await labs.logLabResults(name, rangeText); // ✅ pass values here

            await labs.clearFilters();

        }

    });



    test.skip('search with testname ', async () => {

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
       
       
           await labs.clearFilters();
         }

    });

    test.skip('Search and log lab results for multiple test cases', async () => {
        for (const testrecord of data.TestNameCases) {
            console.log(`\n🔍 Searching for "${testrecord.testName}" in "${testrecord.dateRange}" range`);
            await labs.selectDateRangelab(testrecord.dateRange);
            await labs.searchLab(testrecord.testName);
            await labs.logLabResults();
            await labs.clearFilters();
        }
    });

    test.skip('Check abnormal test names for multiple date ranges', async () => {
        for (const [index, range] of data.labsCustomDateRange.entries()) {
            console.log(`\n📅 Checking date range #${index + 1}: ${range.startDate.monthName} ${range.startDate.day}, ${range.startDate.year} → ${range.endDate.monthName} ${range.endDate.day}, ${range.endDate.year}`);

            await labs.selectDateRange(range.startDate, range.endDate);
            console.log('☑️ Checkbox: Selected (Abnormal)');

            await labs.checkAbnormalFilter();
            await labs.printAbnormalTestNames();

            console.log('⬜ Checkbox: Unselected (Abnormal)');

            await labs.uncheckAbnormalFilter();
            await labs.printNonAbnormalTestNames();
        }
    });
    test.skip('Check abnormal check and uncheck  physician name', async () => {

        for (const item of data.PhysicianSearchCaseswithabnormal) {
            console.log(`Added search physician '${item.physicianName}' and months filter '${item.dateRange}'`);

            await labs.searchphysicainabnormalcheck(item.dateRange);
            await labs.searchPhysicianabnormal(item.physicianName);

            await labs.checkboxphysician();
            await labs.printAbnormalpy();
                 await labs.  printPhysicianNames();




            await labs.uncheckboxphysician();
            await labs.printNonAbnormalpy();
                 await labs.  printPhysicianNames();




        }
    }
    );

    test.skip('Check abnormal check and uncheck testname search  ', async () => {
             for (const item of data.TestnameSearchCaseswithabnormal) {
              // const { dateRange, TestName } = item;

    console.log(`Running test for testnamesearch : ${item.TestName}, Date Range: ${item.dateRange}`);


           await labs.searchtestnameabnormalcheck(item.dateRange);
      await labs.searchtestnameabnormal(item.TestName);
        await labs.checkboxtestname();
       await labs. printTestNames();
     await labs.  printAbnormaltestname();
          


  await labs.uncheckboxtestname();
      await labs.printNonAbnormaltestname();
           await labs.  printTestNames();


  }

    //    for (const item of data.TestnameSearchCaseswithabnormal) {
    //       const { dateRange, TestName } = item;

    //        console.log(`Running test for testnamesearch : ${TestName}, Date Range: ${dateRange}`);
       
       
    //               await labs.searchtestnameabnormalcheck(item.dateRange);
    //          await labs.searchtestnameabnormal(item.TestName);
    //            await labs.checkboxtestname();
    //           await labs. printTestNames();
    //         await labs.  printAbnormaltestname();
                 
       
       
    //      await labs.uncheckboxtestname();
    //          await labs.printNonAbnormaltestname();
    //               await labs.  printTestNames();
       
       
    //      }

    });

    test.skip('Check abnormal check and uncheck labvendor  search  ', async () => {

         for (const item of data.labvendorSearchCaseswithabnormal) {
    console.log(`Running test for labsvendor search  : ${item.labsname}, Date Range: ${item.dateRange}`);
                          // const { dateRange, labsname  } = item;


    await labs.searchlabnameabnormalcheck(item.dateRange);
          await labs.searchlabnameabnormal(item.labsname);
            await labs.checkboxlabname();
       await labs. printlabNames();
     await labs.  printAbnormaltestname();
          


  await labs.uncheckboxlabname();
      await labs.printNonAbnormallabname();
           await labs.  printlabNames();




  }

    });




});