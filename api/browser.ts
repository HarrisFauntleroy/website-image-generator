import { Browser, launch } from 'puppeteer';

class BrowserService {
  async getBrowserInstance(): Promise<Browser> {
    console.debug('Launching browser instance');
    return await launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }
  
  async closeBrowserInstance(browser: Browser): Promise<void> {
    console.debug('Closing browser instance');
    await browser.close();
  }
  
}

export default BrowserService;
