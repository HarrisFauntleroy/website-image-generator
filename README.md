# Website Screenshot Generator

A simple Node.js server that generates website screenshots using Puppeteer.

[![CI Actions 🚀🤖](https://github.com/HarrisFauntleroy/website-image-generator/actions/workflows/ci.yml/badge.svg)](https://github.com/HarrisFauntleroy/website-image-generator/actions/workflows/ci.yml)[![Code Coverage 📊](https://github.com/HarrisFauntleroy/website-image-generator/actions/workflows/coverage.yml/badge.svg)](https://github.com/HarrisFauntleroy/website-image-generator/actions/workflows/coverage.yml)![GitHub commit activity](https://img.shields.io/github/commit-activity/w/HarrisFauntleroy/website-image-generator?style=flat)

<!-- ![Website Screenshot](https://website-image-generator.vercel.app/?url=https://google.com) -->

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
