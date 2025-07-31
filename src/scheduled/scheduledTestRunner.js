// // scheduled/scheduledTestRunner.js
// import cron from 'node-cron';
// import { exec } from 'child_process';
// // import { sendAllPDFsByEmail } from '../src/utils/emailHelper.js';
//                                   import { sendAllPDFsByEmail } from '../utils/emailHelper.js';

// const job = cron.schedule('50 10 * * *', () => {
//   console.log('🧪 Running Playwright test at 10:50 AM...');
//   exec('npx playwright test src/tests/claimsearch.spec.js --project=chromium --headed', (error, stdout, stderr) => {
//     if (error) return console.error('❌ Error:', error);

//     console.log(stdout,stderr);
//     sendAllPDFsByEmail().then(() => {
//       console.log('📧 Email sent');
//       job.stop();
//     });
//   });
// });
// scheduled/scheduledTestRunner.js
import cron from 'node-cron';
import { exec } from 'child_process';
import { sendAllPDFsByEmail } from '../utils/emailHelper.js'; // ✅ adjust path if needed

// ⏰ Schedule test run for 11:00 AM every day
const job = cron.schedule('00 11 * * *', () => {
  console.log('🧪 Running Playwright test at 10:30 AM...');

  exec('npx playwright test src/tests/claimsearch.spec.js --project=chromium --headed', (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Error:', error.message);
      job.stop();
      return;
    }

    console.log('✅ Playwright Test Output:\n', stdout);

    sendAllPDFsByEmail().then(() => {
      console.log('📧 Email sent after test run.');
      job.stop(); // 🛑 Stop after one execution
    });
  });
});
