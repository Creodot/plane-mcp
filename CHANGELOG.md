# Changelog

## [0.2.1] - 2025-04-12

### Refacto
Update project structure and dependencies for Plane MCP server. Bump version to 0.2.0, change main entry point to 'dist/src/index.js', and enhance build scripts with 'tsc-alias'. Introduce new environment configuration file for better management of API keys and workspace slugs. Refactor services and tools to utilize the new configuration, improving code clarity and maintainability. Update README for repository cloning instructions. Add new dependencies and update existing ones in package.json and package-lock.json.

## [0.2.0] - 2025-04-12

### Added
- Added project management capabilities based on Plane API:
  - List, Get, Create, Update, Delete projects.
  - Defined TypeScript types (`Project`, `CreateProjectPayload`, `UpdateProjectPayload`) in `src/types/project.types.ts`.
  - Defined Zod schemas (`ProjectIdentifierSchema`, `CreateProjectToolSchema`, etc.) in `src/schemas/project.schemas.ts`.
  - Implemented `ProjectService` in `src/services/project.service.ts` for API interactions.
  - Registered MCP tools (`plane_list_projects`, `plane_get_project`, etc.) in `src/tools/project.tools.ts`.
  - Added unit tests for `ProjectService` in `tests/project-service.test.ts`.


## [0.1.1] - 2025-04-12

### Refacto
Refactor and enhance the project structure by updating biome.json for improved formatting options, adding a CHANGELOG.md for version tracking, and implementing a new issue management service with comprehensive issue handling capabilities. This includes creating, retrieving, and updating issues, along with necessary schemas and types for better type safety and clarity. Additionally, remove deprecated files and streamline tool registration for issue management.

## [0.0.1] - 2025-04-12
### Added
- Initial release.
