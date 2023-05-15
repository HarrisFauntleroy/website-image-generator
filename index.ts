import { config } from "dotenv";
import express from "express";

import BrowserService from "./api/browser";
import ScreenshotService from "./api/screenshot";

config();

const app = express();
const browserService = new BrowserService();
const screenshotService = new ScreenshotService(browserService);

const isProduction = process.env.NODE_ENV === "production";
const HOSTNAME = isProduction
  ? "https://monkfish-app-ih5xa.ondigitalocean.app"
  : "http://localhost:4000";

const PORT = process.env.PORT || 4000;

app.get("/", (_req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Welcome to our screenshot service!</h1>
        <p>Usage: screenshot?url=<URL></p>
        <p>Example: "${HOSTNAME}/screenshot?url=https://google.com" </p>
        <img src="${HOSTNAME}/screenshot?url=https://google.com" />
      </body>
    </html>
    `);
});

app.get("/screenshot", screenshotService.handleScreenshotRequest);

app.listen(PORT, () => {
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Server listening on port ${PORT}`);
  console.log(`Try it out: ${HOSTNAME}/screenshot?url=https://google.com`);
});
