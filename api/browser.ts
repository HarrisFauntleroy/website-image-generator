import { Browser, launch } from "puppeteer";

class BrowserService {
  async getBrowserInstance(): Promise<Browser> {
    console.debug("Launching browser instance");
    return await launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    })
      .then((browser) => {
        console.debug("Browser instance launched");
        return browser;
      })
      .catch((error) => {
        console.error("Error launching browser instance:", error);
        throw error;
      });
  }

  async closeBrowserInstance(browser: Browser): Promise<void> {
    console.debug("Closing browser instance");
    await browser
      .close()
      .then(() => {
        console.debug("Browser instance closed");
      })
      .catch((error) => {
        console.error("Error closing browser instance:", error);
        throw error;
      });
  }
}

export default BrowserService;
