// // utils/auth.js
// export async function getBearerToken(request) {
//   const response = await request.post('https://yourapi.com/auth/login', {
//     data: {
//       username: 'Julia',
//       password: 'Batman123',
//     },
//   });

//   const responseBody = await response.json();
//   const token = responseBody.token || responseBody.access_token;

//   return token;
// }


const { test, expect } = require('@playwright/test');
const fs = require('fs');
require('dotenv').config();

const AutomationLogger = {
  info: (msg) => console.log('INFO:', msg),
  error: (msg) => console.error('ERROR:', msg),
};

test('Login and extract access token from sessionStorage', async ({ page }) => {
  const request_id = 'REQ-' + Date.now();

  // Step 1: Go to login page
  await page.goto(process.env.LOGIN_URL);

  // Step 2: Fill credentials
  await page.fill('#username', process.env.USERNAME); // Replace with real selector
  await page.fill('#password', process.env.PASSWORD); // Replace with real selector

  // Step 3: Submit login
  await page.click('button[type="submit"]'); // Replace with real selector

  // Step 4: Wait for login to complete
  await page.waitForNavigation(); // Or use waitForSelector if more reliable

  // Step 5: Get access token from sessionStorage
  const accessToken = await page.evaluate(() => {
    const mainItem = sessionStorage.getItem('main');
    if (mainItem) {
      try {
        const parsed = JSON.parse(mainItem);
        return parsed.authnResult?.access_token || null;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Step 6: Save token to file
  if (accessToken) {
    fs.writeFileSync('accessToken.json', JSON.stringify({ token: accessToken }, null, 2), 'utf8');
    AutomationLogger.info(`${request_id} - AccessToken saved successfully.`);
  } else {
    AutomationLogger.error(`${request_id} - AccessToken not found.`);
  }

  expect(accessToken).not.toBeNull(); // Optional check
});
