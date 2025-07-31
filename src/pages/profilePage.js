// import { expect } from '@playwright/test';

// export class ProfilePage {
//   constructor(page) {
//     this.page = page;

//     // Locators for profile fields
//     this.nameLocator = page.locator('text=NAME Anna Queensister');
//     this.dobLocator = page.locator('text=DATE OF BIRTH 12-28-1991');
//     this.emailLocator = page.locator('#emailtext'); // Assuming it's the div with the email address
//     this.memberIdLocator = page.locator("div[data-id='benefitsCardMemberId']");
//     this.genderLocator = page.locator('text=GENDER Female');
//     this.addressLocator = page.locator('text=PO BOX 7, SKIPPACK, PA 19474');
//     this.phoneLocator = page.locator('text=Home:'); // You can add other phone fields as needed
//   }

//   // Dynamic wait for any element to be visible
//   async waitForElementToBeVisible(locator, timeout = 20000) {
//     try {
//       await locator.waitFor({ state: 'visible', timeout });
//     } catch (error) {
//       console.error(`⚠️ Failed to find element: ${locator}`);
//       throw error; // Re-throw error after logging
//     }
//   }

//   // Normalize the text by replacing multiple spaces with a single space and trimming it
//   normalizeText(text) {
//     return text.replace(/\s+/g, ' ').trim();
//   }

//   // Dynamic assertion for profile field with text normalization
//   async assertProfileField(locator, expectedText, timeout = 10000) {
//     await this.waitForElementToBeVisible(locator, timeout);
//     const text = await locator.textContent();
//     const normalizedText = this.normalizeText(text);
//     const normalizedExpectedText = this.normalizeText(expectedText);
    
//     console.log(`🟢 Found text: ${normalizedText}`);
//     expect(normalizedText).toBe(normalizedExpectedText); // Ensure the profile field matches the expected value
//     return normalizedText;
//   }

//   // Update Profile Information (for example, changing name or email)
//   async updateProfileField(locator, newText, timeout = 10000) {
//     await this.waitForElementToBeVisible(locator, timeout);
//     await locator.click(); // Click on the field to allow editing (if applicable)
//     await this.page.keyboard.press('Control+A'); // Select all text in the field
//     await this.page.keyboard.type(newText); // Type the new value
//     console.log(`🟢 Updated field to: ${newText}`);
//   }

//   // Get all Profile Data dynamically
//   async getProfileData() {
//     // Wait for all elements to be visible before fetching data
//     await Promise.all([
//       this.waitForElementToBeVisible(this.nameLocator),
//       this.waitForElementToBeVisible(this.dobLocator),
//       this.waitForElementToBeVisible(this.emailLocator),
//       this.waitForElementToBeVisible(this.memberIdLocator),
//       this.waitForElementToBeVisible(this.genderLocator),
//       this.waitForElementToBeVisible(this.addressLocator),
//       this.waitForElementToBeVisible(this.phoneLocator),
//     ]);

//     const profileData = {
//       name: await this.assertProfileField(this.nameLocator, 'NAME Anna Queensister'),
//       dob: await this.assertProfileField(this.dobLocator, 'DATE OF BIRTH 12-28-1991'),
//       email: await this.assertProfileField(this.emailLocator, 'testpr@mailinator.com'),
//       memberId: await this.assertProfileField(this.memberIdLocator, '850497966'),
//       gender: await this.assertProfileField(this.genderLocator, 'GENDER Female'),
//       address: await this.assertProfileField(this.addressLocator, 'PO BOX 7, SKIPPACK, PA 19474'),
//       phone: await this.assertProfileField(this.phoneLocator, 'Home:'),
//     };

//     return profileData;
//   }

//   // Method to print all profile data
//   async printProfileData() {
//     const profileData = await this.getProfileData();
//     console.log('🟢 Profile Data:', profileData);
//     return profileData;
//   }
// }


// import { expect } from '@playwright/test';

// export class ProfilePage {
//   constructor(page) {
//     this.page = page;
//     this.profileButton = page.getByTitle('Your profile and settings');
//     this.myProfileButton = page.getByLabel('My Profile');
//     this.nameLocator = page.locator('text=NAME');
//     this.dobLocator = page.locator('text=DATE OF BIRTH');
//     this.emailLocator = page.locator('text=EMAIL');
//     this.memberIdLocator = page.locator('text=MEMBER ID');
//     this.genderLocator = page.locator('text=GENDER');
//     this.addressLocator = page.locator('text=ADDRESS 1');
//     this.phoneHomeLocator = page.locator('#hometext');
//     this.phoneSecondaryLocator = page.locator('#secondarytext');
//     this.phoneCellLocator = page.locator('#celltext');
//     this.phoneWorkLocator = page.locator('#worktext');
//   }

//   // Dynamic wait for any element to be visible
//   async waitForElementToBeVisible(locator, timeout = 10000) {
//     await locator.waitFor({ state: 'visible', timeout });
//   }

//   // Dynamic assertion for profile load
//   async assertProfileLoaded(timeout = 15000) {
//     await this.waitForElementToBeVisible(this.nameLocator, timeout);
//     const nameText = await this.nameLocator.textContent();
//     console.log('🟢 Profile Name:', nameText?.trim());
//     return nameText?.trim();
//   }

//   // Get name dynamically with fallback to handle missing element
//   async getName() {
//     try {
//       await this.waitForElementToBeVisible(this.nameLocator, 10000);
//       const name = await this.nameLocator.textContent();
//       console.log('🟢 Name:', name?.trim());
//       return name?.trim();
//     } catch (error) {
//       console.warn('⚠️ Name not displayed for this user.');
//       return null;
//     }
//   }

//   // Get Date of Birth dynamically
//   async getDob() {
//     try {
//       await this.waitForElementToBeVisible(this.dobLocator, 10000);
//       const dob = await this.dobLocator.textContent();
//       console.log('🟢 Date of Birth:', dob?.trim());
//       return dob?.trim();
//     } catch (error) {
//       console.warn('⚠️ Date of Birth not displayed.');
//       return null;
//     }
//   }

//   // Get Email dynamically
//   async getEmail() {
//     try {
//       await this.waitForElementToBeVisible(this.emailLocator, 10000);
//       const email = await this.emailLocator.textContent();
//       console.log('🟢 Email:', email?.trim());
//       return email?.trim();
//     } catch (error) {
//       console.warn('⚠️ Email not displayed.');
//       return null;
//     }
//   }

//   // Get Member ID dynamically
//   async getMemberId() {
//     try {
//       await this.waitForElementToBeVisible(this.memberIdLocator, 10000);
//       const memberId = await this.memberIdLocator.textContent();
//       console.log('🟢 Member ID:', memberId?.trim());
//       return memberId?.trim();
//     } catch (error) {
//       console.warn('⚠️ Member ID not displayed.');
//       return null;
//     }
//   }

//   // Get Gender dynamically
//   async getGender() {
//     try {
//       await this.waitForElementToBeVisible(this.genderLocator, 10000);
//       const gender = await this.genderLocator.textContent();
//       console.log('🟢 Gender:', gender?.trim());
//       return gender?.trim();
//     } catch (error) {
//       console.warn('⚠️ Gender not displayed.');
//       return null;
//     }
//   }

//   // Get Address dynamically
//   async getAddress() {
//     try {
//       await this.waitForElementToBeVisible(this.addressLocator, 10000);
//       const address = await this.addressLocator.textContent();
//       console.log('🟢 Address:', address?.trim());
//       return address?.trim();
//     } catch (error) {
//       console.warn('⚠️ Address not displayed.');
//       return null;
//     }
//   }

//   // Get Phone Numbers dynamically
//   async getPhoneNumbers() {
//     try {
//       await this.waitForElementToBeVisible(this.phoneHomeLocator, 10000);
//       const phoneNumbers = {
//         home: await this.phoneHomeLocator.textContent(),
//         secondary: await this.phoneSecondaryLocator.textContent(),
//         cell: await this.phoneCellLocator.textContent(),
//         work: await this.phoneWorkLocator.textContent(),
//       };

//       console.log('🟢 Phone Numbers:', phoneNumbers);
//       return phoneNumbers;
//     } catch (error) {
//       console.warn('⚠️ Phone Numbers not displayed.');
//       return null;
//     }
//   }
// }

// import { expect } from '@playwright/test';


// export class ProfilePage {
//   constructor(page) {
//     this.page = page;
//     this.profileButton = page.getByTitle('Your profile and settings');
//     this.myProfileButton = page.getByLabel('My Profile');

//     // Dynamically generated locators for each profile field
//     this.nameLabel = page.locator('#nametext');
//     this.dob = page.locator('#date_of_birthtext');
//     this.email = page.locator('#emailtext');
//    this.gender = page.locator('#gendertext');       // 👈 New
//     // this.address = page.locator('#addresstext'); 
//     this.address = page.locator("//div[@class='row row-cols-1 row-cols-md-2 gy-4 mb-4']//div[1]//p[2]");

//     // Address Locators
//     // this.address = page.locator('[data-test="profile-address"]');

//     // Phone Numbers Locators
//     this.phoneHome = page.locator('[data-test="profile-phone-home"]');
//     this.phoneSecondary = page.locator('[data-test="profile-phone-secondary"]');
//     this.phoneCell = page.locator('[data-test="profile-phone-cell"]');
//     this.phoneWork = page.locator('[data-test="profile-phone-work"]');
//   }

//   // Wait for any element to become visible
//   async waitForElementToBeVisible(locator, timeout = 10000) {
//     await locator.waitFor({ state: 'visible', timeout });
//   }


 

//  // Action to check if the profile name is displayed

//  async checkProfileVisibility(timeout = 15000) {
//   try {
//     await this.waitForElementToBeVisible(this.nameLabel, timeout);
//     const nameText = await this.nameLabel.textContent();
//     console.log('🟢 Profile name is displayed:', nameText?.trim());
//     return nameText?.trim();
//   } catch (error) {
//     console.log('🔴 No profile displayed or error occurred:', error.message);
//     return null;
//   }
//  }
// //




// async checkDobVisibility(timeout = 15000) {
//   try {
//     await this.waitForElementToBeVisible(this.dob, timeout);
//     const dobText = await this.dob.textContent();
//     console.log('🟢 DOB is displayed:', dobText?.trim());
//     return dobText?.trim();
//   } catch (error) {
//     console.log('🔴 DOB not displayed or error occurred:', error.message);
//     return null;
//   }
// }

// async checkEmailVisibility(timeout = 15000) {
//   try {
//     const isVisible = await this.email.isVisible({ timeout });
//     if (isVisible) {
//       const emailText = await this.email.textContent();
//       console.log('🟢 Email is displayed:', emailText?.trim());
//       return emailText?.trim();
//     } else {
//       console.log('🔴 Email is not displayed.');
//       return null;
//     }
//   } catch (error) {
//     console.error('❌ Error checking Email visibility:', error.message);
//     return null;
//   }
// }

// async checkEmailVisibility(timeout = 15000) {
//   try {
//     const isVisible = await this.email.isVisible({ timeout });
//     if (isVisible) {
//       const emailText = await this.email.textContent();
//       console.log('🟢 Email is displayed:', emailText?.trim());
//       return emailText?.trim();
//     } else {
//       console.log('🔴 Email is not displayed.');
//       return null;
//     }
//   } catch (error) {
//     console.error('❌ Error checking Email visibility:', error.message);
//     return null;
//   }
// }

// async checkGenderVisibility(timeout = 15000) {
//   try {
//     const isVisible = await this.gender.isVisible({ timeout });
//     if (isVisible) {
//       const genderText = await this.gender.textContent();
//       console.log('🟢 Gender is displayed:', genderText?.trim());
//       return genderText?.trim();
//     } else {
//       console.log('🔴 Gender is not displayed.');
//       return null;
//     }
//   } catch (error) {
//     console.error('❌ Error checking Gender visibility:', error.message);
//     return null;
//   }
// }

// async checkAddressVisibility(timeout = 15000) {
//   try {
//     const isVisible = await this.address.isVisible({ timeout });
//     if (isVisible) {
//       const addressText = await this.address.textContent();
//       console.log('🟢 Address is displayed:', addressText?.trim());
//       return addressText?.trim();
//     } else {
//       console.log('🔴 Address is not displayed.');
//       return null;
//     }
//   } catch (error) {
//     console.error('❌ Error checking Address visibility:', error.message);
//     return null;
//   }

// }
// }
// ProfilePage.js
// import { expect } from '@playwright/test';
import { expect } from '@playwright/test';

// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.nameLabel = page.locator('#nametext');
    this.dob = page.locator('#date_of_birthtext');
    this.email = page.locator('#emailtext');
    this.gender = page.locator('#gendertext');
    // this.address = page.locator('#addresstext');
    this.address = page.locator('#addresstext').nth(0);
     this.profileIcon = page.getByTitle('Your profile and settings');
    this.profileLink = page.getByLabel('My Profile');
    this.printButton = page.getByRole('button', { name: 'Print' });

  }

async navigateToProfile() {
    await this.profileIcon.click();
    await this.profileLink.click();
  }

  async assertProfileNameVisible(timeout = 15000) {
    try {
      await expect(this.nameLabel).toBeVisible({ timeout });
      const text = await this.nameLabel.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
      console.log('🟢 Profile name is valid:', text.trim());
    } catch (error) {
      console.error('🔴 Profile name assertion failed:', error.message);
      throw error;
    }
  }

  async assertDobVisible(timeout = 15000) {
    try {
      await expect(this.dob).toBeVisible({ timeout });
      const text = await this.dob.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
      console.log('🟢 DOB is valid:', text.trim());
    } catch (error) {
      console.error('🔴 DOB assertion failed:', error.message);
      throw error;
    }
  }

  async assertEmailVisible(timeout = 15000) {
    try {
      await expect(this.email).toBeVisible({ timeout });
      const text = await this.email.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
      console.log('🟢 Email is valid:', text.trim());
    } catch (error) {
      console.error('🔴 Email assertion failed:', error.message);
      throw error;
    }
  }

  async assertGenderVisible(timeout = 15000) {
    try {
      await expect(this.gender).toBeVisible({ timeout });
      const text = await this.gender.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
      console.log('🟢 Gender is valid:', text.trim());
    } catch (error) {
      console.error('🔴 Gender assertion failed:', error.message);
      throw error;
    }
  }

  async assertAddressVisible(timeout = 15000) {
    try {
      await expect(this.address).toBeVisible({ timeout });
      const text = await this.address.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
      console.log('🟢 Address is valid:', text.trim());
    } catch (error) {
      console.error('🔴 Address assertion failed:', error.message);
      throw error;
    }
  }

//    async downloadProfileAsPdf(fileName = 'julia-health-notes.pdf') {
//     console.log(`📄 Clicking on Profile Print button...`);
//     await this.printButton.click();
//     await this.page.waitForTimeout(2000);

//     const fullPath = path.join(__dirname, '..', 'downloads', fileName);

//     try {
//       await this.page.waitForLoadState('networkidle');
//       await this.page.pdf({
//         path: fullPath,
//         format: 'A4',
//         printBackground: true,
//       });
//       console.log(`✅ Profile PDF saved: ${fullPath}`);

//       const base64 = fs.readFileSync(fullPath).toString('base64');
//       const base64Path = path.join(__dirname, '..', 'downloads', 'profile_base64.txt');
//       fs.writeFileSync(base64Path, base64);
//       console.log(`✅ Base64 saved: ${base64Path}`);
//     } catch (error) {
//       console.error(`❌ Profile PDF generation failed: ${error.message}`);
//     }
//   }
// }

// async downloadProfileAsPdf(fileName = 'profiledetails.pdf') {
//     console.log(`📄 Clicking Print button...`);
//     await this.printButton.click();
//     await this.page.waitForTimeout(2000);

//     const filePath = path.join(__dirname, '..', 'downloads', fileName);

//     try {
//       await this.page.waitForLoadState('networkidle');
//       await this.page.pdf({
//         path: filePath,
//         format: 'A4',
//         printBackground: true,
//       });
//       console.log(`✅ PDF saved: ${filePath}`);

//       // Return base64 data URL
//       const fileBuffer = fs.readFileSync(filePath);
//       const base64 = fileBuffer.toString('base64');
//       const dataUrl = `data:application/pdf;base64,${base64}`;
//       // console.log(`✅ Generated Base64 PDF link`);

//         await this.page.reload();
//     await this.page.waitForLoadState('networkidle');
//       return dataUrl;

//     } catch (error) {
//       console.error(`❌ PDF generation failed: ${error.message}`);
//       return null;
//     }
//   }

// // download the profile pdf working
async downloadProfileAsPdf(fileName = 'profiledetails.pdf') {
  console.log(`📄 Clicking Print button...`);
  await this.printButton.click();
  await this.page.waitForTimeout(2000);

  const filePath = path.join(__dirname, '..', 'downloads', fileName);

  try {
    // 🧹 Remove old PDF if it exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🗑️ Old PDF removed: ${filePath}`);
    }

    await this.page.waitForLoadState('networkidle');

    // 🖨️ Generate new PDF
    await this.page.pdf({
      path: filePath,
      format: 'A4',
      printBackground: true,
    });
    console.log(`✅ New PDF saved: ${filePath}`);

    // 🔁 Convert to base64
    const fileBuffer = fs.readFileSync(filePath);
    const base64 = fileBuffer.toString('base64');
    const dataUrl = `data:application/pdf;base64,${base64}`;

    // 🔄 Reload the page
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');

    return dataUrl;

  } catch (error) {
    console.error(`❌ PDF generation failed: ${error.message}`);
    return null;
  }
}

// Enhanced profile PDF download (same fix as notes page)
async downloadProfileAsPdf(fileName = 'profiledetails.pdf') {
  console.log(`📄 Generating Profile PDF directly...`);
  
  const filePath = path.join(__dirname, '..', 'downloads', fileName);

  try {
    // 🧹 Remove old PDF if it exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🗑️ Old PDF removed: ${filePath}`);
    }

    // 🌐 Wait for page to be ready (without clicking print button)
    try {
      await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch (networkError) {
      console.log(`⚠️ Network idle timeout, proceeding with PDF generation...`);
      await this.page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    }

    // 🖨️ Generate PDF directly (without print dialog)
    await this.page.pdf({
      path: filePath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      },
      preferCSSPageSize: true
    });
    
    console.log(`✅ Profile PDF saved successfully: ${filePath}`);

    // 🔁 Convert to base64
    const fileBuffer = fs.readFileSync(filePath);
    const base64 = fileBuffer.toString('base64');
    const dataUrl = `data:application/pdf;base64,${base64}`;

    // 🔄 Enhanced page reload with error handling
    try {
      await this.page.reload({ waitUntil: 'domcontentloaded', timeout: 20000 });
      await this.page.waitForLoadState('networkidle', { timeout: 15000 });
      console.log(`✅ Profile page reloaded successfully`);
    } catch (reloadError) {
      console.log(`⚠️ Profile page reload had issues but continuing: ${reloadError.message}`);
    }

    return dataUrl;

  } catch (error) {
    console.error(`❌ Profile PDF generation failed: ${error.message}`);
    
    // 🔧 Cleanup on error
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (cleanupError) {
      console.log(`⚠️ Cleanup error: ${cleanupError.message}`);
    }
    
    return null;
  }
}
}

