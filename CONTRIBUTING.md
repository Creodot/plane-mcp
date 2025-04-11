# Contributing to Plane.so MCP Server

First off, thank you for considering contributing! We appreciate your time and effort.

This document provides guidelines for contributing to this project. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [INSERT CONTACT METHOD].

## How Can I Contribute?

### Reporting Bugs

*   **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/YOUR_USERNAME/plane-mcp-server/issues).
*   If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/YOUR_USERNAME/plane-mcp-server/issues/new). Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.
*   Use the "Bug Report" issue template if available.

### Suggesting Enhancements

*   Open a new issue using the "Feature Request" template.
*   Explain the enhancement you are suggesting and why it would be beneficial.
*   Provide details on the use case and potential implementation ideas.

### Pull Requests

1.  Fork the repository and create your branch from `develop` (or `main` if `develop` doesn't exist yet).
2.  If you've added code that should be tested, add tests.
3.  If you've changed APIs, update the documentation.
4.  Ensure the test suite passes (`npm test`).
5.  Make sure your code lints and formats correctly (`npm run lint` and `npm run format`).
6.  Issue that pull request!

#### Commit Messages

Please follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for your commit messages. This helps in automating changelog generation and versioning.
Examples:
*   `feat: add tool for listing projects`
*   `fix: handle API rate limits in plane-client`
*   `docs: update README with configuration details`
*   `test: add unit tests for issue service`
*   `refactor: simplify tool registration logic`
*   `chore: update dependencies`

## Development Setup

1.  Fork and clone the repository.
2.  Install dependencies: `npm install`
3.  Create a `.env` file (see [Configuration](#configuration) in README.md).
4.  Run in development mode: `npm run dev`

## Styleguides

*   We use [BiomeJS](https://biomejs.dev/) for formatting and linting. Configuration is in `biome.json`.
*   Use `npm run format` to format your code before committing.
*   Use `npm run lint` to check for linting errors.

## Any questions?

Feel free to open an issue if you have questions about contributing or setting up the development environment. 