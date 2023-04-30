const http = require('http');
const url = require('url');
const screenshot = require('./api/screenshot'); 

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  req.query = parsedUrl.query;

  console.log(`Request received: ${req.method} ${req.url}`);

  try {
    await screenshot(req, res);
  } catch (error) {
    console.error('Error generating screenshot:', error);

    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Internal Server Error');
  }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
