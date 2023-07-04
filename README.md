# Website Screenshot Generator

A simple Node.js server that generates website screenshots using Puppeteer.

[![CI Actions 🚀🤖](https://github.com/HarrisFauntleroy/website-image-generator/actions/workflows/ci.yml/badge.svg)](https://github.com/HarrisFauntleroy/website-image-generator/actions/workflows/ci.yml)[![Code Coverage 📊](https://github.com/HarrisFauntleroy/website-image-generator/actions/workflows/coverage.yml/badge.svg)](https://github.com/HarrisFauntleroy/website-image-generator/actions/workflows/coverage.yml)![GitHub commit activity](https://img.shields.io/github/commit-activity/w/HarrisFauntleroy/website-image-generator?style=flat)

<!-- ![Website Screenshot](https://website-image-generator.vercel.app/?url=https://google.com) -->

---

## Local Development

Here's how you can set up Fn Fitness in your local dev environment:

### Requirements

- Node >= 14
- Docker (for running Postgres, Redis, etc.) 🐳

Node is managed using Node Version Manager

<a href="https://github.com/nvm-sh/logos"><img alt="nvm project logo" src="https://raw.githubusercontent.com/nvm-sh/logos/HEAD/nvm-logo-color.svg" height="50" /></a>

```sh
# Update node version
nvm use <version>
```

## Installation

**Yarn**

```sh
# Install dependencies
yarn
```

### Commands

```sh
# Start development server
yarn dev
```

## Usage

```sh
# Make a GET request to the server with the desired URL as a query parameter:
http://localhost:4000/api/screenshot?url=https://example.com
```

The server will respond with a PNG image of the requested website.

---

<!-- LICENSE -->

## **License** ⚖️

Distributed under the MIT License. See `LICENSE` for more information.

---

<!-- DISCLAIMER -->

## **Disclaimer** 🚨

This software is currently a work in progress and is considered in ALPHA state. Features will appear and disappear, APIs will be changed, bugs will be introduced, your feedback is always welcome! 🚧
