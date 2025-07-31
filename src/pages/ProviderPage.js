// pages/ProviderPage.js
import { expect } from '@playwright/test';

export class ProviderPage {
  constructor(page) {
    this.page = page;
    // Define locators
    this.providerTap = page.locator('#navLink-PROVIDERS');
    this.firstdoctortype = page.getByText('Doctor\'s Type');

        this.doctorsType = page.locator(`//div[normalize-space(text())="Doctor's Type"]`);
        this.firstdoctorname = page.getByText('Doctor\'s Name');

        this.doctorName = page.locator(`//div[normalize-space(text())="Doctor's Name"]`);

            this.firsthealthfacilities = page.getByText(' Health Facilities ');
        this.healthFacilities = page.locator(`//div[normalize-space(text())="Health Facilities"]`);

        this.doctorTypeTextbox = page.getByRole('textbox', { name: 'Enter a type of doctor or a' });
        this.doctorNameResults = page.locator("//span[contains(@class, 'provider-card-name')]");
        this.distancedropdown = page.locator("//button[@id='dropdownDistanceFilterButton']");
        this.distancemile = page.locator("//span[@class='provider-card-distance']");

        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.clearButton = page.getByText('Clear');
        this.zipCodeTextbox = page.getByRole('textbox', { name: 'ZIP Code' });
        this.doctorNameTextbox = page.getByRole('textbox', { name: "Enter a doctor's name" });
        this.healthFacilitiesTextbox = page.locator("//input[@id='providersFilterKeyWordSearchInput']");
        this.openplandropdown =page.locator("//button[@id='dropdownPlanFilterButton']")
                this.healthNameResults = page.locator("//span[contains(@class, 'provider-card-name')]");

        this.kidzPartnersButton = page.locator("//li[normalize-space()='KidzPartners']");
        this.healthPartnersButton = page.locator("//li[normalize-space()='Health Partners']");
         this.healthpartnersMedicare =page.locator("//li[normalize-space()='Health Partners Medicare']");
        // this.healthPartnersLabel = page.locator("//p[@aria-label='Health Partners']");
        // this.clearButton = page.getByText('Clear');

        // this.healthPartnersButton = page.locator("//button[@id='dropdownPlanFilterButton']");
        // this.kidzPartnersOption = page.getByText('KidzPartners');
        // this.healthFacilitiesOption = page.getByText('Health Facilities');
        // this.myDirectoryButton = page.getByRole('button', { name: 'My Directory' });
        // this.removeAllButton = page.getByRole('button', { name: 'Remove All' });
        this.logoutButton = page.locator("//button[@id='dropdownMenuProfile']");
        this.logoutButtonProfile = page.locator('#dropdownItemLogoutButton');
        this. specialtyLocator = page.locator("//p[starts-with(@data-id, 'PROVIDERS.SPECIALTY-')]").first();
        this.planLocator = page.locator("//p[@aria-label='Plan']/following-sibling::p[1]");
        this.directoryButton = page.locator(`//button[contains(@data-id, "directory-btn") and contains(normalize-space(), "Directory")]`);
        this.mydirectorysButton = page.locator('//button[@id="btn-my-directory"]');
        this.removeAllButton = page.locator(`//button[normalize-space()='Remove All']`);
        this.previousButton = page.locator(`//a[normalize-space()='Return to previous page']`);

  }

  // open the provider tab
  async openproviderTab () {
    // Ensure the provider tab is visible before clicking
    await this.page.waitForSelector('#navLink-PROVIDERS', { state: 'visible' });

    await this.providerTap.click();
    await this.page.waitForLoadState('networkidle');
  }

  // scenario : search for doctor type with keyword and plan and distance
async firstdoctortypeopen() {

  await this.firstdoctortype.waitFor({ state: 'visible', timeout: 30000 });  // Wait for the element to be visible

  // await this.page.waitForLoadState('networkidle', { timeout: 30000 });

    await this.firstdoctortype.click();
}
async selectDoctorType() {
// await this.page.waitForSelector('//div[normalize-space(text())="Doctor\'s Type"]', { state: 'visible' });

await this.doctorsType.click();
await this.page.waitForLoadState('networkidle', { timeout: 30000 });

}

async enterDoctorType(keyword) {
  await this.page.waitForLoadState('networkidle', { timeout: 1000 });

    await this.doctorTypeTextbox.fill(keyword);
  }

  // async enterDoctorName(name) {
  //   await this.doctorNameTextbox.fill(name);
  // }

  // async openPlanDropdown() {
  //   await this.openplandropdown.click();
  // }

  async selectPlan(planName) {
  await this.openplandropdown.click();
  await this.page.waitForLoadState('networkidle', { timeout: 30000 });

 const planOption = this.page.locator(`//li[normalize-space(.)='${planName}']`);
  await planOption.click();


}

async selectDistance(distance) {
    const trimmedDistance = distance.trim();

    // Click the dropdown to open options
    await this.distancedropdown.click();

    // Optional short wait if dropdown takes time to render
    // await this.page.waitForTimeout(500);
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });


    // Locator for the matching option using dynamic XPath
    const optionLocator = this.page.locator(`//li[normalize-space()='${trimmedDistance}']`);

    // Wait for the option to be visible
    await optionLocator.waitFor({ state: 'visible', timeout: 5000 });

    // Click the option
    await optionLocator.click();
  }
   
async  clickSearch() {
  await this.searchButton.click();
}

// Add this missing function after printSpecialtyIfExists()

// async printPlanIfExists() {
//   const isVisible = await this.planLocator.isVisible();
//   if (isVisible) {
//     const text = await this.planLocator.textContent();
//     console.log(`Plan: ${text}`);
//   } else {
//     console.log("No plan displayed.");
//   }
// }

async printPlanIfExists() {
  try {
    const count = await this.planLocator.count();
    
    if (count === 0) {
      console.log("No plan displayed.");
      return;
    }
    
    if (count === 1) {
      const text = await this.planLocator.textContent();
      console.log(`Plan: ${text?.trim()}`);
      return;
    }
    
    // Handle multiple elements
    console.log(`Found ${count} plan(s):`);
    for (let i = 0; i < count; i++) {
      const text = await this.planLocator.nth(i).textContent();
      console.log(`Plan ${i + 1}: ${text?.trim()}`);
    }
    
  } catch (error) {
    console.log(`⚠️ Error checking plan: ${error.message}`);
  }
}

// async printDistanceIfExists() {
//     const isVisible = await this.distancemile.isVisible();
//     if (isVisible) {
//       const text = await this.distancemile.textContent();
//       console.log(`distance for provider: ${text}`);
//     } else {
//       console.log("No provider displayed.");
//     }
//   }

async printDistanceIfExists() {
  try {
    const count = await this.distancemile.count();
    
    if (count === 0) {
      console.log("No provider displayed.");
      return;
    }
    
    if (count === 1) {
      const text = await this.distancemile.textContent();
      console.log(`distance for provider: ${text?.trim()}`);
      return;
    }
    
    // Handle multiple elements
    console.log(`Found ${count} provider distance(s):`);
    for (let i = 0; i < count; i++) {
      const text = await this.distancemile.nth(i).textContent();
      console.log(`Provider ${i + 1} distance: ${text?.trim()}`);
    }
    
  } catch (error) {
    console.log(`⚠️ Error checking distance: ${error.message}`);
  }
}


  

  async printSpecialtyIfExists() {
    const isVisible = await this.specialtyLocator.isVisible();
    if (isVisible) {
      const text = await this.specialtyLocator.textContent();
      console.log(`Specialty: ${text}`);
    } else {
      console.log("No specialty displayed.");
    }
  }

  // async printPlanIfExists() {
  //   const isVisible = await this.planLocator.isVisible();
  //   if (isVisible) {
  //     const text = await this.planLocator.textContent();
  //     console.log(`Plan: ${text}`);
  //   } else {
  //     console.log("No plan displayed.");
  //   }
  // }

   // Add these missing functions after the existing doctor type functions (around line 100)

// Missing function 1: Click Doctor Name option
async clickDoctorName() {

  console.log(` scenario : search for doctor name with keyword and plan `);
  await this.firstdoctorname.waitFor({ state: 'visible', timeout: 30000 });
  await this.firstdoctorname.click();
  console.log(`[INFO] Clicked Doctor's Name option`);
}

// Missing function 2: Select Doctor Name from dropdown
async selectDoctorName() {
  await this.doctorName.waitFor({ state: 'visible', timeout: 30000 });
  await this.doctorName.click();
  await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  console.log(`[INFO] Selected Doctor's Name search type`);
}

// Missing function 3: Search by Doctor Name
async searchByDoctorName(name) {
  await this.page.waitForLoadState('networkidle', { timeout: 1000 });
  await this.doctorNameTextbox.waitFor({ state: 'visible', timeout: 10000 });
  await this.doctorNameTextbox.fill(name);
  console.log(`[INFO] Entered doctor name: ${name}`);
}
   async selectDoctorPlan(planName) {
  await this.openplandropdown.click();
  await this.page.waitForLoadState('networkidle', { timeout: 30000 });

 const planOption = this.page.locator(`//li[normalize-space(.)='${planName}']`);
 await planOption.waitFor({ state: 'visible', timeout: 10000 });

  await planOption.click();
   console.log(`[INFO] Selected plan: ${planName}`);


}


async selectDistancedoctorname(distance) {
  console .log(`[INFO] Selected distance: ${distance}`);
    const trimmedDistance = distance.trim();

    // Click the dropdown to open options
    await this.distancedropdown.click();

    // Optional short wait if dropdown takes time to render
    // await this.page.waitForTimeout(500);

await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    // Locator for the matching option using dynamic XPath
    const optionLocator = this.page.locator(`//li[normalize-space()='${trimmedDistance}']`);

    // Wait for the option to be visible
    await optionLocator.waitFor({ state: 'visible', timeout: 5000 });

    // Click the option
    await optionLocator.click();
  }

// async printDistancedoctornameIfExists() {
//     const isVisible = await this.distancemile.isVisible();
//     if (isVisible) {
//       const text = await this.distancemile.textContent();
//       console.log(`distance for provider: ${text}`);
//     } else {
//       console.log("No provider displayed.");
//     }
//   }
async printDistancedoctornameIfExists() {
  try {
    await this.distancemile.waitFor({ state: 'visible', timeout: 5000 });
    const text = await this.distancemile.textContent();
    console.log(`distance for provider: ${text}`);
  } catch (e) {
    console.log("No provider displayed.");
  }
}



  async printdoctorNameIfExists() {
    const isVisible = await this.doctorNameResults.isVisible();
    if (isVisible) {
      const text = await this.doctorNameResults.textContent();
      console.log(`doctor: ${text}`);
    } else {
      console.log("No doctor displayed.");
    }
  }

  async printdoctorPlanIfExists() {
    const isVisible = await this.planLocator.isVisible();
    if (isVisible) {
      const text = await this.planLocator.textContent();
      console.log(`Plan: ${text}`);
    } else {
      console.log("No plan displayed.");
    }
  }

 // scenario : search for health facilities  name with keyword and plan and distance


  
  async clickhealthfacilities() {

     await this.firsthealthfacilities.click();
  }
  async selecthealthFacilities() {
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });

 await this.healthFacilities.waitFor({ state: 'visible', timeout: 10000 });

  await this.healthFacilities.click();

}

  async searchByHealthfacilities(name) {
    await this.healthFacilitiesTextbox.fill(name);

  }
   async selecthealthfacilitiesDoctorPlan(planName) {
  await this.openplandropdown.click();
  await this.page.waitForLoadState('networkidle', { timeout: 30000 });

 const planOption = this.page.locator(`//li[normalize-space(.)='${planName}']`);
 await planOption.waitFor({ state: 'visible', timeout: 10000 });

  await planOption.click();
   console.log(`[INFO] Selected plan: ${planName}`);


}


async selectDistancedoctornamehealth(distance) {
  console .log(`[INFO] Selected distance: ${distance}`);
    const trimmedDistance = distance.trim();

    // Click the dropdown to open options
    await this.distancedropdown.click();

    // Optional short wait if dropdown takes time to render
    // await this.page.waitForTimeout(500);

await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    // Locator for the matching option using dynamic XPath
    const optionLocator = this.page.locator(`//li[normalize-space()='${trimmedDistance}']`);

    // Wait for the option to be visible
    await optionLocator.waitFor({ state: 'visible', timeout: 5000 });

    // Click the option
    await optionLocator.click();
  }

// async printDistancedoctornameIfExists() {
//     const isVisible = await this.distancemile.isVisible();
//     if (isVisible) {
//       const text = await this.distancemile.textContent();
//       console.log(`distance for provider: ${text}`);
//     } else {
//       console.log("No provider displayed.");
//     }
//   }
async printDistancehealthIfExists() {
  try {
    await this.distancemile.waitFor({ state: 'visible', timeout: 5000 });
    const text = await this.distancemile.textContent();
    console.log(`distance for provider: ${text}`);
  } catch (e) {
    console.log("No provider displayed.");
  }
}



  async printdochealthNameResultstorNameIfExists() {
    const nameLocators = this.page.locator("//span[contains(@class, 'provider-card-name')]");
  const count = await nameLocators.count();

  if (count === 0) {
    console.log("No providers found.");
    return;
  }

  for (let i = 0; i < count; i++) {
    const text = await nameLocators.nth(i).textContent();
    console.log(`Provider ${i + 1}: ${text.trim()}`);
  }
  }

async printhealthfacilitesIfExists() {
  const locator = this.page.locator("//p[@aria-label='Plan']/following-sibling::p[1]").first();
  const isVisible = await locator.isVisible();
  
  if (isVisible) {
    const text = await locator.textContent();
    console.log(`Plan: ${text}`);
  } else {
    console.log("No plan displayed.");
  }
}


async logout() {
  // Ensure the dropdown menu button is visible and click it
  await expect(this.logoutButton).toBeVisible();  // Ensure the menu button is visible
  await this.logoutButton.click();  // Open the dropdown menu
  
  // Ensure the logout button in the dropdown is visible before clicking
  await expect(this.logoutButtonProfile).toBeVisible();  // Ensure logout button is visible
  await this.logoutButtonProfile.click();  // Perform the logout action
}

// scenario to my directory and remove all

// async firstdoctortypeopendirectory() {

//   await this.firstdoctortype.waitFor({ state: 'visible', timeout: 30000 });  // Wait for the element to be visible

//   // await this.page.waitForLoadState('networkidle', { timeout: 30000 });

//     await this.firstdoctortype.click();
// }
async selectDoctorTypedirectory() {
// await this.page.waitForSelector('//div[normalize-space(text())="Doctor\'s Type"]', { state: 'visible' });

await this.doctorsType.click();
await this.page.waitForLoadState('networkidle', { timeout: 30000 });


 }
// async clickDirectoryButton() {
//       await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

//   try {
//     // Use a more specific locator for the "Add to Directory" button
//     const addToDirectoryButton = this.page.locator('//button[@data-id="add-to-my-directory-btn-link"]');
    
//     // Check if the "Add to Directory" button exists and is visible
//     const count = await addToDirectoryButton.count();
    
//     if (count === 0) {
//       console.log(`⚠️ [INFO] Add to Directory button not found on page`);
//       return;
//     }
    
//     const isVisible = await addToDirectoryButton.isVisible({ timeout: 5000 });
    
//     if (isVisible) {
//       await addToDirectoryButton.click();
//       await this.page.waitForLoadState('networkidle', { timeout: 30000 });
//       console.log(`✅ [INFO] Add to Directory button clicked successfully`);
//     } else {
//       console.log(`⚠️ [INFO] Add to Directory button is not visible, skipping click`);
//     }
//   } catch (error) {
//     console.log(`⚠️ [INFO] Add to Directory button error: ${error.message}`);
//   }
// }
async clickDirectoryButton() {
  await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  try {
    const addToDirectoryButton = this.page.locator('//button[contains(@data-id, "directory-btn") and contains(normalize-space(), "Directory")]');
    const count = await addToDirectoryButton.count();

    if (count === 0) {
      console.log(`⚠️ [INFO] No "Add to Directory" buttons found`);
      return;
    }

    console.log(`📋 [INFO] Found ${count} "Add to Directory" buttons`);

    for (let i = 0; i < count; i++) {
      try {
        const button = addToDirectoryButton.nth(i);

        const isVisible = await button.isVisible({ timeout: 2000 });
        if (!isVisible) {
          console.log(`🚫 Button ${i + 1}: Not visible — skipping`);
          continue;
        }

        const isDisabled = await button.isDisabled();
        if (isDisabled) {
          console.log(`⛔ Button ${i + 1}: Already selected — skipping`);
          continue;
        }

        await button.click();
        await this.page.waitForLoadState('networkidle', { timeout: 30000 });
        console.log(`✅ Button ${i + 1}: Clicked successfully`);

      } catch (err) {
        console.log(`⚠️ Button ${i + 1}: Error — ${err.message}`);
      }
    }

  } catch (error) {
    console.log(`❌ [ERROR] ${error.message}`);
  }
}

async clickMyDirectoryButton() {
  console.log('🔍 Looking for My Directory button...');
  
  try {
    // ✅ Wait for page to be fully loaded first
    await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
    
    // ✅ Wait for the specific button with correct ID
    await this.mydirectorysButton.waitFor({ state: 'visible', timeout: 30000 });
    
    // ✅ Scroll to button if needed
    await this.mydirectorysButton.scrollIntoViewIfNeeded();
    
    // ✅ Wait a moment for any animations/loading
    await this.page.waitForTimeout(1000);
    
    // ✅ Click the button
    await this.mydirectorysButton.click();
    
    // ✅ Wait for navigation/action to complete
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    
    console.log('✅ My Directory button clicked successfully');
    
  } catch (error) {
    console.log(`❌ My Directory button error: ${error.message}`);
    
    // ✅ Debug: Check if button exists but not visible
    try {
      const buttonCount = await this.mydirectorysButton.count();
      console.log(`🔍 Debug: Found ${buttonCount} buttons with ID 'btn-my-directory'`);
      
      if (buttonCount > 0) {
        const isVisible = await this.mydirectorysButton.isVisible().catch(() => false);
        const isEnabled = await this.mydirectorysButton.isEnabled().catch(() => false);
        console.log(`🔍 Debug: Button visible: ${isVisible}, enabled: ${isEnabled}`);
      }
    } catch (debugError) {
      console.log(`⚠️ Debug error: ${debugError.message}`);
    }
  }
}
// async clickMyDirectoryButton() {
//   try {
//     // Ensure the My Directory button is visible before clicking
//     await this.mydirectorysButton.waitFor({ state: 'visible', timeout: 30000 });
    
//     await this.mydirectorysButton.click();
//     await this.page.waitForLoadState('networkidle', { timeout: 30000 });
//     console.log(`[INFO] Clicked My Directory button`);
//   } catch (error) {
//     console.log(`⚠️ [INFO] My Directory button not found or not clickable: ${error.message}`);
  
//   }
// }

// async clickRemoveAllButton() {
//    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

 
//       await this.removeAllButton.click();
  
//   }
async clickRemoveAllButton() {
  try {
    // Check if page is still available
    if (this.page.isClosed()) {
      console.log('❌ Page is closed, cannot perform remove all action');
      return;
    }

    // Wait for page to be ready
    await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 });

    // Try to find the Remove All button first
    await this.removeAllButton.waitFor({ state: 'visible', timeout: 15000 });

    // Scroll to the button using a safer approach
    await this.removeAllButton.scrollIntoViewIfNeeded({ timeout: 10000 });

    // Alternative: Use Playwright's built-in scrolling
    // await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Ensure button is clickable
    await this.removeAllButton.waitFor({ state: 'visible', timeout: 5000 });
    
    // Click the button
    await this.removeAllButton.click();
    
    console.log('✅ Remove All button clicked successfully');
    
    // Wait for action to complete
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });

  } catch (error) {
    console.log(`⚠️ [ERROR] Failed to click Remove All button: ${error.message}`);
    
  }}

//   async clickPreviousButton() {

//       await this.previousButton.click();
   
//   }

async clickPreviousButton() {
  try {
    // Check if page is still open
    if (this.page.isClosed()) {
      console.log('❌ Page is closed');
      return;
    }

    // Wait for button to be visible
    await this.previousButton.waitFor({ state: 'visible', timeout: 10000 });
    
    // Click the button
    await this.previousButton.click();
    
    console.log('✅ Previous button clicked');
    
    // Wait for page to load
    await this.page.waitForLoadState('networkidle', { timeout: 15000 });

  } catch (error) {
    console.log(`⚠️ Previous button error: ${error.message}`);
  }
}
 }
