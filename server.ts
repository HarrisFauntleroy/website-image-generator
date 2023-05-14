import express from 'express';
import ScreenshotService from './api/screenshot';
import BrowserService from './api/browser';

const app = express();
const browserService = new BrowserService();
const screenshotService = new ScreenshotService(browserService);

app.get('/', (_req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Welcome to our screenshot service!</h1>
        <p>Usage: screenshot?url=URL</p>
        <p>Example: "http://localhost:4000/screenshot?url=https://google.com" </p>
        <img src="http://localhost:4000/screenshot?url=https://google.com" />
      </body>
    </html>
    `);
});

app.get('/screenshot', screenshotService.handleScreenshotRequest);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

