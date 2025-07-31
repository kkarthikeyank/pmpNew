import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { ProviderPage } from '../pages/ProviderPage.js';

// import data from '../../data/testData.json' assert { type: 'json' };

import { readFileSync } from 'fs';
const data = JSON.parse(readFileSync(new URL('../../data/testData.json', import.meta.url)));


test.describe('Member Portal - Labs Flow', () => {
    let login;
    let provider;
    let page;


    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();

        login = new LoginPage(page);
        provider = new ProviderPage(page);

        await login.gotoLoginPage();
        await login.login(data.user, data.password);

        await page.waitForURL('**/member-portal/**', { timeout: 180000 });

        // Save page instance to reuse in tests
        provider.page = page;

    }, { timeout: 180000 });

    test(' @smoke Open Labs tab after login', async () => {
        await provider.openproviderTab();




    });
    test('   scenario : search for doctor type with keyword and plan ', async () => {
        // scenario : search for doctor type with keyword and plan
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

   

    });


    test.skip('  scenario : search for doctor name with keyword and plan ', async () => {
        // scenario : search for doctor name with keyword and plan
        for (const testCase of data.DoctorNameSearch) {
            const name = testCase.doctorNameTextbox.keywordSearch;
            const selectedPlan = testCase.planOptions.selected;
            const selectedDistance = testCase.distance.choosemiles;

            await provider.clickDoctorName();
            await provider.selectDoctorName();
            await provider.searchByDoctorName(name);
            await provider.selectDoctorPlan(selectedPlan);
            await provider.selectDistancedoctorname(selectedDistance);
            await provider.printdoctorPlanIfExists();
            await provider.printdoctorNameIfExists();
            await provider.printDistancedoctornameIfExists();
            await provider.clearButton.click();
            console.log(`[INFO] Cleared input for next search\n`);
        }

    });



    // scenario : search for health facilities  name with keyword and plan and distance

    test.skip('  scenario : search for  health facilities with keyword and plan ', async () => {

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

    });


});