// // const { test, expect, request } = require('@playwright/test');
// // const fs = require('fs');

// // test('GET /Patient/{id} - fetch patient record', async () => {
// //   // Load token
// //   const tokenData = JSON.parse(fs.readFileSync('token.json', 'utf8'));
// //   const accessToken = tokenData.access_token;

// //   // Create API context
// //   const context = await request.newContext({
// //     baseURL: 'https://fhirapi-dev.healthpartnersplans.com/fhir-request/Patient/', // ← Replace with your actual base URL
// //     extraHTTPHeaders: {
// //       'Authorization': `Bearer ${accessToken}`,
// //       'Accept': 'application/fhir+json'
// //     }
// //   });

// //   // Make the GET request for a patient ID
// //   const patientId = '327757'; // Replace with a real or test patient ID
// //   const response = await context.get(`/Patient/${patientId}`);

// //   // Assertions
// // //   expect(response.status()).toBe(200);

// // //   const body = await response.json();
// // //   expect(body.resourceType).toBe('Patient');
// // //   expect(body.id).toBe(patientId);
// //   console.log('📥 Status Code:', response.status());

// // //   console.log('✅ Patient record retrieved:', body);
// // });

// // const { test, expect, request } = require('@playwright/test');
// // const fs = require('fs');

// // test('GET /Patient/{id} - fetch patient record', async () => {
// //   // Load token
// //   const tokenData = JSON.parse(fs.readFileSync('token.json', 'utf8'));
// //   const accessToken = tokenData.access_token;
// //   console.log('🔐 Access Token:', accessToken);

// //   // Create API context
// //   const context = await request.newContext({
// //     baseURL: 'https://fhirapi-dev.healthpartnersplans.com/fhir-request/Patient/', // Issue is likely here
// //     extraHTTPHeaders: {
// //       'Authorization': `Bearer ${accessToken}`,
// //       'Accept': 'application/fhir+json'
// //     }
// //   });
// //    console.log('🔐 patient ---------=========================================:');

// //   const patientId = '327757';
// //      console.log('🔐 patient ---------=========hyhyhyhyhyh================================:',context);

// //   const response = await context.get(`/Patient/${patientId}`); // 🚫 Incorrect path: /Patient/Patient/{id}
// //     console.log('🔐 patient ---------=========================================dfbdfd' );

// //   console.log('📥 Status Code:', response.status());
// // });
// // const { test, request } = require('@playwright/test');

// // test('GET /Patient/327757 - using Postman token', async () => {
// //   const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiI3ZDdlMmZjZS1kZGIwLTQ1YWUtYmM0Mi1mNTM3MmI4NDEwYTQiLCJpc3MiOiJodHRwczovL2hwcDEuYjJjbG9naW4uY29tLzBkN2E5ZDYyLWQwM2MtNGNmNS04NTBjLTMwNTEzNGE3OWFlMC92Mi4wLyIsImV4cCI6MTc0OTQ3NzI3MywibmJmIjoxNzQ5NDczNjczLCJvaWQiOiJhOGQzYmEwOS01NjA1LTQwMTItOTcxYS05OTdlYTE5M2VkZmUiLCJzdWIiOiJhOGQzYmEwOS01NjA1LTQwMTItOTcxYS05OTdlYTE5M2VkZmUiLCJnaXZlbl9uYW1lIjoiSnVsaWEiLCJmYW1pbHlfbmFtZSI6IkRvbmFsZHNvbiIsImV4dGVuc2lvbl9wYXRpZW50aWQiOiIzMjc3NTciLCJlbWFpbHMiOlsiYnJ1Y2V3YXluZXRlc3QxMjMrSnVsaWFAZ21haWwuY29tIl0sInRmcCI6IkIyQ18xX1BvcnRhbFJlZ2lzdHJhdGlvbiIsIm5vbmNlIjoiM2JhYWM2NDAxM2RjZTc3OGUzOWNjZjFmYjViMDkwMzFhNnNSemFXekQiLCJzY3AiOiJjZHJfYWxsX3VzZXJfYXV0aG9yaXRpZXMgcGF0aWVudCIsImF6cCI6IjdkN2UyZmNlLWRkYjAtNDVhZS1iYzQyLWY1MzcyYjg0MTBhNCIsInZlciI6IjEuMCIsImlhdCI6MTc0OTQ3MzY3M30.gjy8S7UmJqsw8jwbxTX2S46T02OFP8DqJ3XJspE352pHwxKnR1t5F8YHCzYQu4yh6nBHZKGOLTafjUnMsSjPUwvH5dwzsTljbvx6bOJUxrB9AfuQTWpqzfk4HYEtQIvi_sn2fN_r4bTy2c02WGJdwa6h4EakAR9wWqa6oVX8a-Xcz3rvE8ZVgNOMjOCEpv4hFa77acAhQFBbdquoVZ140GYZTr4KfmD5sNzYuT14CY7dD_6Y2_IrSNhdtujJljdU1s4RCliUQVp-yao7SLkbSOqCao6inDd7ahbDPPHM_hmtCj8CYjWkBR-BsA3I4XQiS3rd5KuOcUiJbpukGYMjvw'; // 🔥 USE the working one

// //   const context = await request.newContext({
// //     baseURL: 'https://fhirapi-dev.healthpartnersplans.com/fhir-request',
// //     extraHTTPHeaders: {
// //       Authorization: `Bearer ${token}`,
// //       Accept: 'application/fhir+json',
// //       'User-Agent': 'PostmanRuntime/7.44.0', // 👈 exact from Postman
// //       'Cache-Control': 'no-cache'
// //     }
// //   });

// //   const response = await context.get(`/Patient/327757`);
// //   console.log('📥 Status:', response.status());
// //   const body = await response.text();
// //   console.log('📄 Body:\n', body);
// // });
// import { test, expect, request } from '@playwright/test';
// import { readFile } from 'fs/promises';

// test('GET /Patient/{id} - fetch patient record', async () => {
//   const tokenData = JSON.parse(
//     await readFile(new URL('../../../token.json', import.meta.url), 'utf8')
//   );
//   const accessToken = tokenData.access_token;

//   const context = await request.newContext({
//     baseURL: 'https://fhirapi-dev.healthpartnersplans.com/fhir-request',
//     extraHTTPHeaders: {
//       Authorization: `Bearer ${accessToken}`,
//       Accept: 'application/fhir+json',
//     },
//   });

//   const patientId = '327757';
//   const response = await context.get(`/Patient/${patientId}`);
//   const contentType = response.headers()['content-type'] || '';
//   const rawText = await response.text();

//   if (!contentType.includes('json')) {
//     throw new Error('❌ Not a JSON response');
//   }

//   const body = JSON.parse(rawText);
//   console.log(JSON.stringify(body, null, 2));
//   expect(body.resourceType).toBe('Patient');
// });


import { test, expect, request } from '@playwright/test';

const baseURL = 'https://fhirapi-dev.healthpartnersplans.com/fhir'; // Changed base URL structure
const patientId = '327757';  // Ensure this is a valid patient ID
const bearerToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiI3ZDdlMmZjZS1kZGIwLTQ1YWUtYmM0Mi1mNTM3MmI4NDEwYTQiLCJpc3MiOiJodHRwczovL2hwcDEuYjJjbG9naW4uY29tLzBkN2E5ZDYyLWQwM2MtNGNmNS04NTBjLTMwNTEzNGE3OWFlMC92Mi4wLyIsImV4cCI6MTc0OTU0MDM3MSwibmJmIjoxNzQ5NTM2NzcxLCJvaWQiOiJhOGQzYmEwOS01NjA1LTQwMTItOTcxYS05OTdlYTE5M2VkZmUiLCJzdWIiOiJhOGQzYmEwOS01NjA1LTQwMTItOTcxYS05OTdlYTE5M2VkZmUiLCJnaXZlbl9uYW1lIjoiSnVsaWEiLCJmYW1pbHlfbmFtZSI6IkRvbmFsZHNvbiIsImV4dGVuc2lvbl9wYXRpZW50aWQiOiIzMjc3NTciLCJlbWFpbHMiOlsiYnJ1Y2V3YXluZXRlc3QxMjMrSnVsaWFAZ21haWwuY29tIl0sInRmcCI6IkIyQ18xX1BvcnRhbFJlZ2lzdHJhdGlvbiIsIm5vbmNlIjoiZWFlOTNjMzllZTcyZTBlZWI0MmI4OTBhZWJlNTg1MDEwN05OMTlqbUkiLCJzY3AiOiJjZHJfYWxsX3VzZXJfYXV0aG9yaXRpZXMgcGF0aWVudCIsImF6cCI6IjdkN2UyZmNlLWRkYjAtNDVhZS1iYzQyLWY1MzcyYjg0MTBhNCIsInZlciI6IjEuMCIsImlhdCI6MTc0OTUzNjc3MX0.fgS5sFGOrGgzS5zmRfB_Yojfxh59ztAf3IiiGqEOcxvRJmuijHM7894FrJPhRoapfGjFOcrhWXUKX6UhAt1enhOxrGJ5kJo1jjj8THmBP_-F1OnfIvLw4L2YZfAH6H9rt0D0a41j5I0luwo3OTDLRelAPPzBi4L5RRWEBprZ3pYQ-Um6mc90qkBSOtjfea8Kt8PMlhvD42tULPCxZ-5gMyqQ1vIX2FnRMcwpo1EBmmk_oHQYdDv4m6wChgbeDsaihbaZHtauiOiMvjYp0UmRXRT7RJ4QHC94veMaRmF8seT_neHlb5A2bb9zOmPgwAD2-2MGkn0g3BiTFrO83OYQxg';  // Ensure the token is valid

test('Get Patient Info', async () => {
  // Create an APIRequestContext to make HTTP requests
  const apiContext = await request.newContext({
    baseURL,  // Set the base URL to the corrected version
    headers: {
      Authorization: `Bearer ${bearerToken}`,  // Use the Bearer token for authorization
      Accept: 'application/fhir+json',  // Set Accept header for FHIR responses
    },
  });

  // Construct the full URL for the request
  const fullURL = `/Patient/${patientId}`;  // Check if this path is valid per documentation
  console.log(`Making GET request to: ${baseURL}${fullURL}`);

  // Make a GET request to fetch patient information
  const response = await apiContext.get(fullURL);

  // Log status code and response for debugging
  console.log(`Status Code: ${response.status()}`);
  const responseBody = await response.text();
  console.log(`Response Body: ${responseBody}`);

  // Handle unsuccessful requests
  if (!response.ok()) {
    console.error(`API request failed with status ${response.status()}`);
    throw new Error(`Failed to fetch patient data: ${response.status()}`);
  }

  // Check if the response is valid
  expect(response.ok()).toBeTruthy();  // Ensure status code is 2xx
  const data = await response.json();
  console.log('Patient Data:', data);
});
