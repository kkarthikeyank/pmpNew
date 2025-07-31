import { setWorldConstructor, World } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';

// Global variables for single session
let sharedBrowser = null;
let sharedContext = null;
let sharedPage = null;
let isLoggedIn = false;

class SimpleWorld extends World {
  constructor(options) {
    super(options);
    // Share the same browser/page across all scenarios
    this.browser = sharedBrowser;
    this.context = sharedContext;
    this.page = sharedPage;
  }

  async initBrowser() {
    // Only create browser once
    if (!sharedBrowser) {
      console.log('🚀 Creating single browser session...');
      
      sharedBrowser = await chromium.launch({ 
        headless: false,
        slowMo: 500,
        args: ['--start-maximized']
      });
      
      sharedContext = await sharedBrowser.newContext({
        viewport: null // Use full screen
      });
      
      sharedPage = await sharedContext.newPage();
      
      // Assign to instance
      this.browser = sharedBrowser;
      this.context = sharedContext;
      this.page = sharedPage;
      
      console.log('✅ Single browser session created');
    } else {
      console.log('♻️ Reusing existing browser session');
      // Assign existing instances
      this.browser = sharedBrowser;
      this.context = sharedContext; 
      this.page = sharedPage;
    }
  }

  async loginOnce() {
    // Only login once for all test cases
    if (!isLoggedIn) {
      console.log('🔐 Performing one-time login...');
      isLoggedIn = true;
      return true; // Indicates login is needed
    } else {
      console.log('♻️ Already logged in, skipping login');
      return false; // Indicates login not needed
    }
  }

  static async closeAll() {
    console.log('🧹 Closing shared browser session...');
    if (sharedPage) await sharedPage.close();
    if (sharedContext) await sharedContext.close();
    if (sharedBrowser) await sharedBrowser.close();
    
    // Reset globals
    sharedBrowser = null;
    sharedContext = null;
    sharedPage = null;
    isLoggedIn = false;
  }
}

setWorldConstructor(SimpleWorld);
export { SimpleWorld };


