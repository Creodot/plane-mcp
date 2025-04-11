# ✨ Plane.so MCP Server ✨

[![CI](https://github.com/Creodot/plane-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/Creodot/plane-mcp/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/YOUR_PACKAGE_NAME?label=npm%20package)](https://www.npmjs.com/package/YOUR_PACKAGE_NAME) <!-- Replace YOUR_PACKAGE_NAME if published -->
[![Node.js Version](https://img.shields.io/node/v/YOUR_PACKAGE_NAME.svg)](https://nodejs.org/) <!-- Replace YOUR_PACKAGE_NAME if published -->
[![TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![BiomeJS](https://img.shields.io/badge/Code%20Style-Biome-ffb043.svg)](https://biomejs.dev/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> A [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server acting as a bridge to the [Plane.so API](https://developers.plane.so/api-reference/introduction). 🚀

This server allows MCP clients (like AI assistants or other tools) to interact with Plane.so resources (initially Issues) through defined tools.

## 📚 Table of Contents

*   [Features](#-features)
*   [Prerequisites](#-prerequisites)
*   [Installation](#-installation)
*   [Configuration](#-configuration)
*   [Usage](#-usage)
    *   [Development](#development-%EF%B8%8F)
    *   [Testing](#-testing)
    *   [Linting and Formatting](#-linting-and-formatting)
*   [Contributing](#-contributing)
*   [Code of Conduct](#%EF%B8%8F-code-of-conduct)
*   [License](#-license)

## ⭐ Features

*   Provides MCP tools to interact with the Plane.so API.
*   Currently supports:
    *   ✅ `plane_get_issue`: Retrieve details of a specific issue.
    *   ✅ `plane_create_issue`: Create a new issue.
    *   ✅ `plane_update_issue`: Update an existing issue.
*   Uses standard I/O for communication (easily integrable with clients).
*   Configurable via environment variables.
*   Built with TypeScript.
*   Uses [Biome](https://biomejs.dev/) for lightning-fast formatting & linting.
*   Tested with [Vitest](https://vitest.dev/).

## ✅ Prerequisites

*   [Node.js](https://nodejs.org/) (v20 or higher recommended - see `engines` in `package.json`)
*   [npm](https://www.npmjs.com/)
*   A Plane.so account and an API Key (Get yours from [Plane Settings > API Tokens](https://app.plane.so/settings/api-tokens))

## 🛠️ Installation

1.  Clone the repository:
    ```bash
    # Replace with your fork or the main repo URL
    git clone https://github.com/Creodot/plane-mcp.git
    cd plane-mcp
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

## ⚙️ Configuration

Create a `.env` file in the root of the project and add your Plane.so API Key:

```dotenv
# .env
PLANE_API_KEY=your_plane_api_key_here

# Optional: Specify if you are using a self-hosted Plane instance
# PLANE_API_BASE_URL=https://your-self-hosted-plane.com/api/v1
```

🔑 Replace `your_plane_api_key_here` with your actual API key.

## 🚀 Usage

1.  **Build the project:**
    ```bash
    npm run build
    ```

2.  **Start the server:**
    ```bash
    npm start
    ```

The server will now be running and listening for MCP requests on standard input/output. Connect your MCP client!

### Development 🧑‍💻

To run the server in development mode with automatic rebuilding and restarting on file changes (thanks to `node --watch`):

```bash
npm run dev
```

### Testing 🧪

Run the full test suite:

```bash
npm test
```

Run tests in watch mode during development:

```bash
npm run test:watch
```

### Linting and Formatting ✨

Check for linting and formatting errors using Biome:

```bash
npm run lint
npm run format:check
```

Apply formatting and lint fixes automatically:

```bash
npm run format
```

(Note: Formatting is also automatically applied on commit via Husky and lint-staged!)

## 🙌 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to contribute, report bugs, or suggest features.

## 🤝 Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please review our [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details. 