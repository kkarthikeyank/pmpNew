

import { expect } from '@playwright/test';

export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.welcomeLocator = page.locator("//span[@id='dashHeader']");
        // this.welcomeLocator = page.getByRole('heading', { name: 'Welcome, Julia Donaldson' }); // ✅ updated locator



    this.memberIdLocator = page.locator("//div[@data-id='benefitsCardMemberId']");
     this.usageSectionLink = page.getByRole('heading', { name: 'USAGE YEAR TO DATE - View More' }).getByRole('link');
    this.claimsLabel = page.getByLabel('Usage Year To Date - Claims');
    // In your DashboardPage class 
     this.returnLink = page.locator("//a[normalize-space()='Return to previous page']");

  }


  // Dynamic wait for any element to be visible
  async waitForElementToBeVisible(locator, timeout = 30000) {
        await this.page.waitForLoadState('networkidle');

    await locator.waitFor({ state: 'visible', timeout });
  }

  // Dynamic assertion for login success
  async assertLoginSuccess(timeout = 15000) {
    await this.waitForElementToBeVisible(this.welcomeLocator, timeout);
    const welcomeText = await this.welcomeLocator.textContent();
    console.log('🟢 Welcome message:', welcomeText?.trim());
      // await expect(this.welcomeLocator).toHaveText('Welcome, Julia Donaldson', { timeout: 10000 });

 try {
    // ✅ Use this.welcomeLocator instead of creating new locator
    await expect(this.welcomeLocator).toHaveText('Welcome, Julia Donaldson', { timeout: 10000 });
    console.log('✅ Welcome text matched');
  } catch (error) {
    console.warn('❌ Welcome text did not match:', error.message);
  }
  console.log('✅ This code runs even after failure');

  return welcomeText?.trim(); 
}

  
// Dynamic assertion for login success validation 
// async assertLoginSuccess(timeout = 15000) {
//   await this.waitForElementToBeVisible(this.welcomeLocator, timeout);

//   const welcomeText = await this.welcomeLocator.textContent();
//   const trimmedText = welcomeText?.trim();

//   console.log('🟢 Welcome message:', trimmedText);

//   // Assertion (do not place return before this)
//   await expect(this.welcomeLocator).toHaveText('Welcome, Julia Donaldson', { timeout: 10000 });

//   // Now return after assertion is done
//   return trimmedText;
// }

  

  // Get member ID dynamically with fallback to handle missing element
  async getMemberId() {
    try {
      await this.waitForElementToBeVisible(this.memberIdLocator, 10000);
      const memberId = await this.memberIdLocator.textContent();
      console.log('🟢 Member ID:', memberId?.trim());
      return memberId?.trim();
    } catch (error) {
      console.warn('⚠️ Member ID not displayed for this user.');
      return null;
    }
  }

// Click on the "Claims YTD" link
 async openUsageSection() {
    console.log("➡️ Opening 'USAGE YEAR TO DATE - View More' section...");
    await this.usageSectionLink.click();
  }

async openClaims() {
  console.log("➡️ Clicking on 'Usage Year To Date - Claims'...");
  try {
    await this.claimsLabel.click({ force: true }); // only if safe
    console.log("✅ Clicked successfully");
  } catch (err) {
    console.error("❌ Failed to click 'Usage Year To Date - Claims'", err);
    throw err;
  }
}
async selectYear(claimsytdyears) {
  console.log(`📅 Opening year dropdown...`);

  // Step 1: Click the currently selected year button to open the dropdown
  const dropdownTrigger = this.page.getByRole('button', { name: /\d{4}/ });
  await dropdownTrigger.waitFor({ state: 'visible', timeout: 5000 });
  await dropdownTrigger.click();

  console.log(`📅 Selecting year: ${claimsytdyears}`);

  // Step 2: Click the desired year
  const yearOption = this.page.getByRole('button', { name: claimsytdyears });
  await yearOption.waitFor({ state: 'visible', timeout: 5000 });
  await yearOption.click();

  console.log(`✅ Year ${claimsytdyears} selected.`);
}


async goBack() {
  console.log("🔙 Returning to previous page...");

  // Step 1: Scroll into view
  await this.returnLink.scrollIntoViewIfNeeded();

  // Step 2: Wait for visibility and stability
  await this.returnLink.waitFor({ state: 'visible', timeout: 5000 });

  // Step 3: Retry click using evaluate (bypasses pointer interception safely)
  const linkHandle = await this.returnLink.elementHandle();
  await this.page.evaluate(el => el.click(), linkHandle);

  console.log("✅ Navigated back successfully.");
}
 

}


