# Changelog

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
