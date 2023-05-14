import express from 'express';
import validUrl from 'valid-url';
import ScreenshotService from './api/screenshot';

const app = express();
const screenshotService = new ScreenshotService();

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

app.get('/screenshot', async (req, res) => {
  const url = req.query.url as string;

  if (!isValidUrl(url)) {
    return res.status(400).send('Invalid URL provided');
  }

  try {
    const screenshot = await screenshotService.generateWebsiteScreenshot(url);
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.end(screenshot);
  } catch (error) {
    console.error('Error generating screenshot:', error);
    return res.status(500).send('Internal Server Error');
  }
});

function isValidUrl(url: string) {
  return !!validUrl.isUri(url);
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

