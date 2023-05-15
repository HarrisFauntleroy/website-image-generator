import { Request, Response } from "express";
import { Browser, Page } from "puppeteer";

import BrowserService from "./browser";

class ScreenshotService {
  browserService: BrowserService;

  constructor(browserService: BrowserService) {
    console.log("ScreenshotService initialized");
    this.browserService = browserService;
  }

  async openPage(browser: Browser, url: string): Promise<Page> {
    console.log(`Opening page with URL: ${url}`);
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    console.log(`Page with URL: ${url} opened successfully`);
    return page;
  }

  async takeScreenshot(page: Page): Promise<string | Buffer> {
    console.log(`Taking screenshot`);
    const screenshot = await page.screenshot({ type: "png" });
    console.log(`Screenshot taken successfully`);
    return screenshot;
  }

  async generateWebsiteScreenshot(url: string): Promise<string | Buffer> {
    console.log(`Generating screenshot for URL: ${url}`);
    const browser = await this.browserService.getBrowserInstance();
    let screenshot;
    try {
      const page = await this.openPage(browser, url);
      screenshot = await this.takeScreenshot(page);
    } catch (error) {
      console.error("Error generating screenshot:", error);
      throw error;
    } finally {
      await this.browserService.closeBrowserInstance(browser);
    }
    console.log(`Screenshot generated successfully for URL: ${url}`);
    return screenshot;
  }

  handleScreenshotRequest = async (req: Request, res: Response) => {
    console.log("Received screenshot request");
    if (!req.query || typeof req.query.url !== "string") {
      console.error("Invalid URL provided");
      return res.status(400).send("Invalid URL provided");
    }
    const url = req.query.url;

    this.generateWebsiteScreenshot(url)
      .then((screenshot) => {
        console.log("Sending screenshot response");
        res.setHeader("Content-Type", "image/png");
        res.setHeader("Cache-Control", "public, max-age=86400");
        res.end(screenshot);
      })
      .catch((error) => {
        console.error("Error generating screenshot:", error);
        return res.status(500).send(`Internal Server Error: ${error.message}`);
      });
  };
}

export default ScreenshotService;
