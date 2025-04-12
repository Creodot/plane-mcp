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

*   [For Users](#-for-users)
    *   [Available Tools](#-available-tools)
    *   [Prerequisites](#-prerequisites)
    *   [Installation](#-installation)
    *   [Configuration](#-configuration)
    *   [Usage](#-usage)
    *   [Examples](#-examples)
    *   [Security Considerations](#-security-considerations)
*   [For Developers](#-for-developers)
    *   [Development](#development-%EF%B8%8F)
    *   [Project Structure](#-project-structure)
    *   [Validation and Error Handling](#-validation-and-error-handling)
    *   [Adding New Tools](#-adding-new-tools)
    *   [Testing](#-testing)
    *   [Linting and Formatting](#-linting-and-formatting)
    *   [Contributing](#-contributing)
    *   [Code of Conduct](#%EF%B8%8F-code-of-conduct)
*   [License](#-license)

## 👤 For Users

This section provides information for users who want to install and run the Plane.so MCP server to connect it with their MCP client (e.g., Cursor, Claude App).

### ⭐ Available Tools

The server exposes the following tools to interact with the Plane.so API. Tool names use underscores (e.g., `plane_get_issue`).

#### `plane_get_issue`

Retrieves details of a specific issue.

**Parameters:**

*   `project_id` (string, required): ID of the project containing the issue.
*   `issue_id` (string, required): ID of the issue to retrieve.

**Example:**

```json
{
  "project_id": "your_project_id_here",
  "issue_id": "your_issue_id_here"
}
```

#### `plane_create_issue`

Creates a new issue in a specified project.

**Parameters:**

*   `project_id` (string, required): ID of the project where the issue should be created.
*   `name` (string, required): Title of the issue.
*   `description_html` (string, optional): HTML description of the issue (Plane API often requires this format).
*   `priority` (string, optional): Priority of the issue ("urgent", "high", "medium", "low", "none").
*   `state_id` (string, optional): ID of the state for this issue.
*   `assignees` (array<string>, optional): Array of user IDs to assign to this issue.

**Example:**

```json
{
  "project_id": "your_project_id_here",
  "name": "New Feature Request",
  "description_html": "<p>Details about the new feature.</p>",
  "priority": "medium"
}
```

#### `plane_update_issue`

Updates an existing issue in a project.

**Parameters:**

*   `project_id` (string, required): ID of the project containing the issue.
*   `issue_id` (string, required): ID of the issue to update.
*   `name` (string, optional): Updated title of the issue.
*   `description_html` (string, optional): Updated HTML description of the issue.
*   `priority` (string, optional): Updated priority of the issue.
*   `state_id` (string, optional): Updated state ID of the issue.
*   `assignees` (array<string>, optional): Updated array of user IDs assigned to this issue.

**Example:**

```json
{
  "project_id": "your_project_id_here",
  "issue_id": "your_issue_id_here",
  "priority": "high",
  "assignees": ["user_id_1"]
}
```

### ✅ Prerequisites

*   [Node.js](https://nodejs.org/) (v20 or higher recommended)
*   [npm](https://www.npmjs.com/)
*   A Plane.so account and an API Key -> Workspace Icon (top left) -> Settings -> API Tokens -> Add API Token
*   Plane.so Workspace slug -> `https://app.plane.so/{workspace_slug}/` (Replace `{workspace_slug}` with your actual workspace slug)

### 🛠️ Installation

```bash
npm install
```

### 🚀 Usage

The server will start and listen for requests on its standard input (stdin) and send responses to its standard output (stdout). You need to configure your MCP client (like Cursor, Claude App, etc.) to launch this server process when needed.

For more details on the Model Context Protocol, visit [modelcontextprotocol.io](https://modelcontextprotocol.io/).

### ✨ Examples

Here are some example prompts you could give your AI assistant (once the server is configured in it):

*   "Get the details for issue `BUG-123` in the `WebApp` project."
*   "Create a new high-priority issue in the `API` project titled 'Refactor authentication module' with the description 'Need to update the auth library.'"
*   "Update issue `FEAT-45` in the `Design` project and assign it to `user_abc`."

Your assistant will use the appropriate tools (`plane_get_issue`, `plane_create_issue`, `plane_update_issue`) and likely ask for your confirmation before making changes.

### 🛡️ Security Considerations

*   **API Key Security:** Your `PLANE_API_KEY` stored in the `.env` file grants access to your Plane.so workspace. Keep this file secure and never commit it to version control.
*   **Permissions:** Ensure the API key used has the necessary permissions within Plane.so to perform the actions required by the tools (e.g., read issues, create issues, update issues).
*   **User Approval:** Most MCP clients will require your explicit approval before executing actions that modify data (like creating or updating issues), providing a safety layer.

---

## 🧑‍💻 For Developers

This section is for developers who want to contribute to the project, run tests, or use the development environment.

### Development 🧑‍💻

```bash
npm run dev
```

### Project Structure 📂

The project follows a domain-driven organization:

```
src/
├── configs/         # Environment and configuration
├── plane-client.js  # API client wrapper
├── schemas/         # Zod validation schemas
│   ├── tools.schema.ts    # Common tool schemas and utilities
│   ├── project.schema.ts  # Project-specific schemas 
│   └── issue.schema.ts    # Issue-specific schemas
├── services/        # Service layer for API interactions
│   ├── project.service.ts
│   └── issue.service.ts
├── tools/           # MCP tool definitions and handlers
│   ├── index.ts           # Tool registration
│   ├── project.tools.ts   # Project tool definitions
│   └── issue.tools.ts     # Issue tool definitions
└── types/           # TypeScript type definitions
```

### Validation and Error Handling ✅

The project uses Zod for comprehensive validation:

1. **Schema Definition**: Domain-specific schemas are defined in `src/schemas/`
2. **Schema Validation**: The `validateWithSchema` utility ensures consistent validation
3. **Error Handling**: Custom `ValidationError` class for structured error reporting

Example of using validation:

```typescript
// In a service method
const validData = validateWithSchema(MySchema, inputData);
// validData is now correctly typed and validated
```

### Adding New Tools 🔧

To add a new tool:

1. Define the tool interface in the appropriate domain file (e.g., `src/tools/issue.tools.ts`)
2. Add validation schemas in the domain schema file (e.g., `src/schemas/issue.schema.ts`)
3. Implement the service method in the service file (e.g., `src/services/issue.service.ts`)
4. Register the tool in `src/tools/index.ts`

### Testing 🧪

The project includes multiple types of tests:

#### Unit Tests

Run unit tests (fast, no API calls):

```bash
npm run test:unit
```

#### Integration Tests

These tests make real API calls, so they need API credentials:

1. Create a `.env.test` file with:
```
API_KEY=your_plane_api_key
WORKSPACE_SLUG=your_workspace_slug
```

2. Run integration tests:
```bash
npm run test:local
```

3. Quick endpoint check:
```bash
npm run check:local
```

#### Pre-commit Hooks

The pre-commit hooks only run linting and formatting, not tests. This ensures:
- Faster commits
- No API call requirements during development
- No need for API credentials during regular development

When you want to run tests manually:
```bash
# Unit tests only
npm run test:unit

# All tests including integration (needs API credentials)
npm test
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

### 🙌 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to contribute, report bugs, or suggest features.

### 🤝 Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please review our [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details. 