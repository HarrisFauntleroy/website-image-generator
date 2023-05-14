import { Browser, Page } from 'puppeteer';
import BrowserService from './browser';
import { Request, Response } from 'express';

class ScreenshotService {
  browserService: BrowserService;

  constructor(browserService: BrowserService) {
    this.browserService = browserService;
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
    const browser = await this.browserService.getBrowserInstance();
    let screenshot;
    try {
      const page = await this.openPage(browser, url);
      screenshot = await this.takeScreenshot(page);
    } catch (error) {
      console.error('Error generating screenshot:', error);
      throw error;
    } finally {
      await this.browserService.closeBrowserInstance(browser);
    }
    return screenshot;
  }

  handleScreenshotRequest = async (req: Request, res: Response) => {
    if (!req.query || typeof req.query.url !== 'string') {
      return res.status(400).send('Invalid URL provided');
    }
    const url = req.query.url;

    this.generateWebsiteScreenshot(url)
      .then((screenshot) => {
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.end(screenshot);
      })
      .catch((error) => {
        console.error('Error generating screenshot:', error);
        return res.status(500).send(`Internal Server Error: ${error.message}`);
      });
  }
}

export default ScreenshotService;
