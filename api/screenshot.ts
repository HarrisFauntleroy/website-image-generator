import { Browser, Page, launch } from 'puppeteer';

class ScreenshotService {
  async getBrowserInstance(): Promise<Browser> {
    console.debug('Launching browser instance');
    return launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }

  async closeBrowserInstance(browser: Browser): Promise<void> {
    console.debug('Closing browser instance');
    await browser.close();
  }

  async openPage(browser: Browser, url: string): Promise<Page> {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    return page;
  }

  async takeScreenshot(page: Page): Promise<Buffer> {
    return await page.screenshot({ type: 'png' });
  }

  async generateWebsiteScreenshot(url: string): Promise<Buffer> {
    const browser = await this.getBrowserInstance();
    let screenshot;
    try {
      const page = await this.openPage(browser, url);
      screenshot = await this.takeScreenshot(page);
    } catch (error) {
      console.error('Error generating screenshot:', error);
      throw error;
    } finally {
      await browser.close();
    }
    return screenshot;
  }
}

export default ScreenshotService;
