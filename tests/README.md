# Integration Tests for Plane-MCP

This folder contains unit and integration tests to verify that the Plane API endpoints are working correctly.

## Types of Tests

1. **Unit Tests**: These tests verify the behavior of services using mocks.
   - `project-service.test.ts`
   - `issue-service.test.ts`

2. **Integration Tests**: These tests call the actual Plane API endpoints to verify their functionality.
   - `integration/project.endpoints.test.ts`
   - `integration/issue.endpoints.test.ts`

## Usage

### Run All Tests

```bash
npm test
```

### Run Only Integration Tests

```bash
npm run test:integration
```

### Quickly Check All Endpoints

The `check-endpoints.ts` script allows you to quickly verify if all endpoints are working correctly:

```bash
npm run check:endpoints
```

This script will automatically create and delete test projects and issues to verify the API functionality.

## API Issue Detection

If an endpoint isn't working, the `check-endpoints.ts` script will display detailed information about the error. This will help you more easily identify issues related to:

- Payload structure
- Missing information
- Authentication problems
- Server-side API changes

## Debugging

For more detailed debugging, you can examine individual integration tests. For example, to debug issues specifically related to issues:

```bash
npx vitest run tests/integration/issue.endpoints.test.ts
```

To increase the timeout (default is 5 seconds):

```bash
npx vitest run tests/integration/issue.endpoints.test.ts --timeout=10000
``` 