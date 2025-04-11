# Plane.so MCP Server

[![CI](https://github.com/Creodot/plane-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/Creodot/plane-mcp/actions/workflows/ci.yml)

This project provides a [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server that acts as a bridge to the [Plane.so API](https://developers.plane.so/api-reference/introduction). It allows MCP clients (like AI assistants or other tools) to interact with Plane.so resources (initially Issues) through defined tools.

## Features

*   Provides MCP tools to interact with the Plane.so API.
*   Currently supports:
    *   `plane_get_issue`: Retrieve details of a specific issue.
    *   `plane_create_issue`: Create a new issue.
    *   `plane_update_issue`: Update an existing issue.
*   Uses standard I/O for communication (easily integrable with clients).
*   Configurable via environment variables.
*   Built with TypeScript, using Biome for formatting/linting and Vitest for testing.

## Prerequisites

*   Node.js (v20 or higher recommended - see `engines` in `package.json`)
*   npm
*   A Plane.so account and an API Key (see [Plane API Docs](https://app.plane.so/settings/api-tokens))

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Creodot/plane-mcp.git
    cd plane-mcp
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

## Configuration

Create a `.env` file in the root of the project and add your Plane.so API Key:

```dotenv
# .env
PLANE_API_KEY=your_plane_api_key_here

# Optional: Specify if you are using a self-hosted Plane instance
# PLANE_API_BASE_URL=https://your-self-hosted-plane.com/api/v1
```

Replace `your_plane_api_key_here` with your actual API key from Plane.so settings.

## Usage

1.  **Build the project:**
    ```bash
    npm run build
    ```

2.  **Start the server:**
    ```bash
    npm start
    ```

The server will now be running and listening for MCP requests on standard input/output.

### Development

To run the server in development mode with automatic rebuilding and restarting on file changes:

```bash
npm run dev
```

### Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

### Linting and Formatting

Check for linting and formatting errors:

```bash
npm run lint
npm run format:check
```

Apply formatting fixes:

```bash
npm run format
```

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to contribute to this project.

## Code of Conduct

Please see [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for details on our code of conduct.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details. 