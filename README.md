# Website Screenshot Generator

A simple Node.js server that generates website screenshots using Puppeteer.

## Installation

1. Clone this repository:
  
```bash
git clone https://github.com/yourusername/website-screenshot-generator.git
```

Install the dependencies:

```bash
cd website-screenshot-generator
yarn install
```

Run the server in development mode:

```bash
yarn dev
```

## Usage

Make a GET request to the server with the desired URL as a query parameter:

```bash
http://localhost:4000/api/screenshot?url=https://example.com
```

The server will respond with a PNG image of the requested website.

## License

MIT

![Website Screenshot](https://website-image-generator.vercel.app/?url=https://google.com)