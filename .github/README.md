# GitHub Actions for Plane-MCP

This folder contains the GitHub Actions workflows configured for this project.

## Secret Configuration

For integration tests to work correctly on GitHub Actions, you need to configure the following secrets in your GitHub repository settings:

- `TEST_PLANE_TOKEN_API`: Your Plane.so API key for testing
- `TEST_PLANE_WORKSPACE_SLUG`: Your Plane.so workspace slug (e.g., "your-organization")

### How to Configure Secrets

1. Go to your GitHub repository
2. Navigate to "Settings" > "Secrets and variables" > "Actions"
3. Click on "New repository secret"
4. Add the two secrets mentioned above

## Available Workflows

### test-endpoints.yml

This workflow tests the Plane API endpoints. It is triggered in the following cases:

- When pushing to main/master branches
- When creating a pull request to main/master
- Manually via the GitHub Actions interface
- Automatically every day at midnight (00:00 UTC)

It runs two jobs:

1. **unit-tests**: Runs all unit tests
2. **integration-tests**: Runs integration tests and the endpoint verification script

## Manual Execution

To manually run tests via GitHub Actions:

1. Go to the "Actions" tab of your repository
2. Select the "Test API Endpoints" workflow in the sidebar
3. Click on "Run workflow"
4. Choose the branch on which to run the tests
5. Click on "Run workflow" 