const puppeteer = require('puppeteer');

async function downloadFile(url, downloadPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set the download behavior
  await page._client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: downloadPath,
  });

  await page.goto(url, {waitUntil: 'networkidle2'});

  // You might need to interact with the page here, e.g., click a download button.
  // Example: await page.click('#downloadButton');

  await browser.close();
}

// Use process.argv to pass command line arguments to this script
const url = process.argv[2];
const downloadPath = process.argv[3];

downloadFile(url, downloadPath).then(() => console.log('Download completed'));
