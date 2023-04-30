const puppeteer = require('puppeteer');

async function getBrowserInstance() {
  console.debug('Launching browser instance');
  return puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
}

async function takeScreenshot(browser, url) {
  console.debug(`Taking screenshot of ${url}`);
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  return await page.screenshot({ type: 'png' });
}

async function generateWebsiteScreenshot(url) {
  const browser = await getBrowserInstance();
  const screenshot = await takeScreenshot(browser, url);
  await browser.close();
  return screenshot;
}

module.exports = async (req, res) => {
  const url = req.query.url || 'https://example.com';
  console.log(`Generating screenshot for URL: ${url}`);

  try {
    const screenshot = await generateWebsiteScreenshot(url);

    res.setHeader('Content-Type', 'image/png');
    // Update at least once a day.
    res.setHeader('Cache-Control', 'public, max-age=86400');

    console.log(`Sending screenshot for URL: ${url}`);
    res.send(screenshot);
    console.log(`Screenshot for URL: ${url} finished`);
  } catch (error) {
    console.error('Error generating screenshot:', error);

    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Internal Server Error');
  }
};
