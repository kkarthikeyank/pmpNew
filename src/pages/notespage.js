import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class NotesPage {
  constructor(page) {
        this.page = page;
        this.notesTab = page.locator('//a[@id="navLink-HEALTH_NOTES"]');
         this.pdfDownloadButton = page.locator("//div[@class='fixed-bottom d-flex flex-row justify-content-end me-4 pb-5 gap-3']//div//button[@id='btn-print']");

    
  }



  async openNotesTab() {
    // Ensure the Notes tab is visible before clicking
    await this.notesTab.click();
    await this.page.waitForLoadState('networkidle');

    // Optionally, wait for the page to load after clicking the  tab (if it redirects)
    // await this.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 });

  }
  
//   async downloadhealthnotesPdf(fileName = 'healthnotes.pdf') {
//     console.log(`📄 Clicking Print button...`);
//        await sleep(8000);  // Wait for 2 seconds before starting the test
// await this.page.waitForLoadState('networkidle'); // Ensure the page is fully loaded
// await this.page.waitForSelector("//div[@class='fixed-bottom d-flex flex-row justify-content-end me-4 pb-5 gap-3']//div//button[@id='btn-print']", { state: 'visible', timeout: 10000 });
//     await this.pdfDownloadButton.scrollIntoViewIfNeeded();  // Scroll the button into view
   
//   //  await this.pdfDownloadButton.click();
//       await this.pdfDownloadButton.click({ timeout: 20000 });  // Increased timeout

//     await this.page.waitForTimeout(2000);
  
//     const filePath = path.join(__dirname, '..', 'downloads', fileName);
  
//     try {
//       // 🧹 Remove old PDF if it exists
//       if (fs.existsSync(filePath)) {
//         fs.unlinkSync(filePath);
//         console.log(`🗑️ Old PDF removed: ${filePath}`);
//       }
  
//       await this.page.waitForLoadState('networkidle');
  
//       // 🖨️ Generate new PDF
//       await this.page.pdf({
//         path: filePath,
//         format: 'A4',
//         printBackground: true,
//       });
//       console.log(`✅ New PDF saved: ${filePath}`);
  
//       // 🔁 Convert to base64
//       const fileBuffer = fs.readFileSync(filePath);
//       const base64 = fileBuffer.toString('base64');
//       const dataUrl = `data:application/pdf;base64,${base64}`;
  
//       // 🔄 Reload the page
//       await this.page.reload();
//       await this.page.waitForLoadState('networkidle');
  
//       return dataUrl;
  
//     } catch (error) {
//       console.error(`❌ PDF generation failed: ${error.message}`);
//       return null;
//     }
//   }


  async downloadhealthnotesPdf(fileName = 'healthnotes.pdf') {
    console.log(`📄 Starting PDF generation...`);
    await sleep(8000);  // Wait for 8 seconds before starting the test
    await this.page.waitForLoadState('networkidle'); // Ensure the page is fully loaded
   
    const filePath = path.join(__dirname, '..', 'downloads', fileName);
   
    try {
      // 🧹 Remove old PDF if it exists
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Old PDF removed: ${filePath}`);
      }
 
      // Wait for the content to be ready
      await this.page.waitForTimeout(2000);
     
      console.log(`📄 Generating PDF directly without clicking print button...`);
     
      // 🖨️ Generate PDF directly using page.pdf() method
      await this.page.pdf({
        path: filePath,
        format: 'A4',
        printBackground: true,
        margin: {
          top: '0.5in',
          right: '0.5in',
          bottom: '0.5in',
          left: '0.5in'
        }
      });
     
      console.log(`✅ PDF saved successfully: ${filePath}`);
 
      // 🔁 Convert to base64
      const fileBuffer = fs.readFileSync(filePath);
      const base64 = fileBuffer.toString('base64');
      const dataUrl = `data:application/pdf;base64,${base64}`;
 
      return dataUrl;
 
    } catch (error) {
      console.error(`❌ PDF generation failed: ${error.message}`);
     
      // Fallback: Try clicking the print button if direct PDF generation fails
      try {
        console.log(`🔄 Fallback: Attempting to use print button...`);
       
        // Wait for button to be present and visible
        await this.page.waitForSelector("//div[@class='fixed-bottom d-flex flex-row justify-content-end me-4 pb-5 gap-3']//div//button[@id='btn-print']", {
          state: 'visible',
          timeout: 10000
        });
       
        // Scroll the button into view
        await this.pdfDownloadButton.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
       
        // Listen for the print dialog and handle it
        this.page.on('dialog', async dialog => {
          console.log(`� Dialog detected: ${dialog.type()}`);
          await dialog.dismiss(); // Dismiss any dialogs that might appear
        });
       
        // Click the print button
        await this.pdfDownloadButton.click({ timeout: 5000 });
        console.log(`✅ Print button clicked`);
       
        // Wait a moment for any print dialog to appear and be handled
        await this.page.waitForTimeout(3000);
       
        // Try to generate PDF again
        await this.page.pdf({
          path: filePath,
          format: 'A4',
          printBackground: true,
          margin: {
            top: '0.5in',
            right: '0.5in',
            bottom: '0.5in',
            left: '0.5in'
          }
        });
       
        console.log(`✅ Fallback PDF saved: ${filePath}`);
       
        const fileBuffer = fs.readFileSync(filePath);
        const base64 = fileBuffer.toString('base64');
        const dataUrl = `data:application/pdf;base64,${base64}`;
       
        return dataUrl;
       
      } catch (fallbackError) {
        console.error(`❌ Both PDF generation methods failed: ${fallbackError.message}`);
        return null;
      }
    }
  }
}
