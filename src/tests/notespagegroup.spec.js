import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { NotesPage } from '../pages/notespage.js'; // <-- ✅ THIS is required

// import data from '../../data/testData.json' assert { type: 'json' };

import { readFileSync } from 'fs';
const data = JSON.parse(readFileSync(new URL('../../data/testData.json', import.meta.url)));


test.describe('Member Portal - Notes Flow', () => {
    let login;
    let notes;
    let page;


    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();

        login = new LoginPage(page);
        notes = new NotesPage(page);

        await login.gotoLoginPage();
        await login.login(data.user, data.password);

        await page.waitForURL('**/member-portal/**', { timeout: 180000 });

        // Save page instance to reuse in tests
        notes.page = page;

    }, { timeout: 180000 });

    test('Open Notes tab after login', async () => {
        await notes.openNotesTab();
         await notes.downloadhealthnotesPdf();


        // Validate that Notes page is displayed
        // await expect(notes.page.locator('text=Notes')).toBeVisible();


    });



        });
