// 📁 src/utils/emailHelper.js
import nodemailer from 'nodemailer';

import fs from 'fs';
import path from 'path';

  // 🔐 Optional: Capture all console logs
let consoleLogs = '';

const originalConsoleLog = console.log;
console.log = (...args) => {
  const msg = args.join(' ');
  consoleLogs += msg + '\n';
  originalConsoleLog(...args); // still show logs in terminal
};

export async function sendAllPDFsByEmail() {
  const downloadsPath = path.join('src', 'downloads');
  const pdfFiles = fs.readdirSync(downloadsPath).filter(file => file.endsWith('.pdf'));

  const attachments = pdfFiles.map(file => ({
    filename: file,
    path: path.join(downloadsPath, file),
  }));
   
  // ✅ Add logs.txt to attachments
  attachments.push({
    filename: 'logs.txt',
    content: consoleLogs,
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'karthigksamy@gmail.com',
      pass: 'ovny zuuj epmv dtvs', // App password from Gmail
    },
  });

  const mailOptions = {
    from: 'karthigksamy@gmail.com',
    to: 'karthikmuthu20k@gmail.com',
    subject: '📎 PDFs from PMP Tests',
    text: 'All the PDFs generated from the automation scripts are attached.',
    attachments,
  };
   
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
  } catch (err) {
    console.error('❌ Error sending email:', err);
  }
}
