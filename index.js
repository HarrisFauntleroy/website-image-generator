const http = require('http');
const url = require('url');
const screenshot = require('./api/screenshot');

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  req.query = parsedUrl.query;

  if (!req.url) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('OK');
    return;
  }

  console.log(`Request received: ${req.method} ${req.url}`);

  await screenshot(req, res);
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
