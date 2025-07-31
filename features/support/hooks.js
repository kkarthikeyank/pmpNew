import { After, AfterAll } from '@cucumber/cucumber';
import { SimpleWorld } from './world.js';

// Clean up after all scenarios complete
AfterAll(async function () {
  console.log('🏁 All test cases completed - cleaning up...');
  await SimpleWorld.closeAll();
  console.log('✅ Cleanup completed');
});

// Optional: Screenshot on failure
After(async function (scenario) {
  if (scenario.result.status === 'FAILED' && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
    console.log('📸 Screenshot taken for failed scenario');
  }
});

// // hook.js

// // hooks.js

// // hooks.js
// // hooks.js

// import { Before, After, AfterAll } from '@cucumber/cucumber';
// import { LoginWorld } from './world.js';

// Before(async function(scenario) {
//   console.log(`\n🎬 Starting: ${scenario.pickle.name}`);
//   await this.initBrowser();
// });

// After(async function(scenario) {
//   if (scenario.result.status === 'FAILED') {
//     console.log(`❌ Failed: ${scenario.pickle.name}`);
    
//     // Take screenshot on failure
//     const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
//     const screenshot = await this.page.screenshot({ 
//       path: `screenshots/failed-${timestamp}.png`,
//       fullPage: true 
//     });
//     this.attach(screenshot, 'image/png');
//   } else {
//     console.log(`✅ Passed: ${scenario.pickle.name}`);
//   }
// });

// AfterAll(async function() {
//   await LoginWorld.cleanup();
//   console.log('🏁 All tests completed');
// });