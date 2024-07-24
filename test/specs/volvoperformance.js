const fs = require('fs');
const path = require('path');
const readline = require('readline');


describe('Performance Testing', () => {
  it('should capture page load metrics and Lighthouse results', async function () {
    this.timeout(60000); // Increase the timeout for this test

    const url = 'https://www.amazon.in/';

    // Dynamically import chai
    const { expect } = await import('chai');
    // Dynamically import chrome-launcher and lighthouse
    const chromeLauncher = await import('chrome-launcher');
    const lighthouse = await import('lighthouse');

    // Open the URL
    await browser.url(url);

    // Execute script to capture performance metrics
    const performanceTiming = await browser.execute(() => {
      return JSON.parse(JSON.stringify(window.performance.timing));
    });

    // Extract metrics
    const navigationStart = performanceTiming.navigationStart;
    const loadEventEnd = performanceTiming.loadEventEnd;
    const pageLoadTime = loadEventEnd - navigationStart;

    // Capture image load time
    const imageTiming = await browser.execute(() => {
      const image = document.querySelector('img'); // Adjust the selector to target the specific image
      if (image && image.complete) {
        return image.naturalWidth > 0 ? window.performance.now() - window.performance.timing.navigationStart : 0;
      }
      return 0;
    });
    const imageLoadTime = imageTiming ? imageTiming : 'Image not found or failed to load';

    // Run Lighthouse
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = { logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port };
    const runnerResult = await lighthouse.default(url, options);

    // Get Lighthouse performance metrics
    const lighthousePerformanceScore = runnerResult.lhr.categories.performance.score * 100;
    const lighthouseMetrics = runnerResult.lhr.audits;

    await chrome.kill();

    // Read HTML template
    const templatePath = path.join(__dirname, '..', '../Performance_report/template.html');
    let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholders with actual values
    htmlTemplate = htmlTemplate.replace('{{navigationStart}}', navigationStart);
    htmlTemplate = htmlTemplate.replace('{{loadEventEnd}}', loadEventEnd);
    htmlTemplate = htmlTemplate.replace('{{pageLoadTime}}', pageLoadTime);
    htmlTemplate = htmlTemplate.replace('{{imageLoadTime}}', imageLoadTime);
    htmlTemplate = htmlTemplate.replace('{{lighthousePerformanceScore}}', lighthousePerformanceScore);

    // Add Lighthouse metrics
    htmlTemplate = htmlTemplate.replace('{{firstContentfulPaint}}', lighthouseMetrics['first-contentful-paint'].displayValue);
    htmlTemplate = htmlTemplate.replace('{{speedIndex}}', lighthouseMetrics['speed-index'].displayValue);
    htmlTemplate = htmlTemplate.replace('{{largestContentfulPaint}}', lighthouseMetrics['largest-contentful-paint'].displayValue);
    htmlTemplate = htmlTemplate.replace('{{interactive}}', lighthouseMetrics['interactive'].displayValue);
    htmlTemplate = htmlTemplate.replace('{{totalBlockingTime}}', lighthouseMetrics['total-blocking-time'].displayValue);
    htmlTemplate = htmlTemplate.replace('{{cumulativeLayoutShift}}', lighthouseMetrics['cumulative-layout-shift'].displayValue);

    // Create the directory if it doesn't exist
    const reportDir = path.join(__dirname, '..', 'performance_reports');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir);
    }

    // Save the updated HTML report to a file
    const reportFilePath = path.join(reportDir, 'performance_report.html');
    fs.writeFileSync(reportFilePath, htmlTemplate, 'utf8');

    // Assertion to ensure page load time is within acceptable limits
    expect(pageLoadTime).to.be.below(5000); // example: ensure page load time is less than 5 seconds
  });
});
