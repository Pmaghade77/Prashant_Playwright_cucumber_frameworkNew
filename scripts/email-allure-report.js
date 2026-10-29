
const { chromium } = require('@playwright/test');
const nodemailer = require('nodemailer');

async function main() {
  const reportUrl =
    'https://pmaghade77.github.io/Prashant_Playwright_cucumber_frameworkNew/';

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1
  });

  try {
    await page.goto(reportUrl, {
      waitUntil: 'networkidle',
      timeout: 120000
    });

    // Allow the Allure dashboard to finish rendering.
    await page.waitForTimeout(5000);

    await page.screenshot({
      path: 'allure-report-screenshot.png',
      fullPage: true
    });

    const status = process.env.TEST_STATUS || 'UNKNOWN';
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_APP_PASSWORD
      }
    });

    await transporter.sendMail({
      from: `"Playwright CI" <${process.env.MAIL_USERNAME}>`,
      to: process.env.MAIL_USERNAME,
      subject: `Playwright Cucumber Report - ${status}`,
      text: `Test status: ${status}\nThe full-page Allure report screenshot is embedded in this email.`,
      html: `
        <h2>Playwright Cucumber Test Report</h2>
        <p><strong>Test status:</strong> ${status}</p>
        <p>Full-page screenshot of the Allure report:</p>
        <img
          src="cid:allureReport"
          alt="Full-page Allure report screenshot"
          style="width:100%;max-width:1200px;height:auto;"
        />
      `,
      attachments: [
        {
          filename: 'allure-report-screenshot.png',
          path: 'allure-report-screenshot.png',
          cid: 'allureReport'
        }
      ]
    });

    console.log('Allure screenshot email sent successfully.');
  } finally {
    await browser.close();
  }
}

main().catch(error => {
  console.error('Failed to capture or email the Allure report:', error);
  process.exitCode = 1;
});
