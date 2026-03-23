# WDashboard Constitution

## Core Principles

### I. UI-First Development
The system MUST start with fully functional UI using mocked data. All UI MUST simulate real backend behavior including loading, error, and success states. No backend dependency should block UI development.

### II. Clean Architecture
The system MUST separate UI, services, and data layers. Components MUST NEVER be coupled directly with data sources. All cross-layer communication MUST go through defined interfaces.

### III. Modularity
The system MUST be divided into independent modules (auth, dashboard, users, files, logs, settings). Each module MUST be independently extendable or removable without breaking other modules.

### IV. Reusability
Components MUST be generic and reusable across projects. Business-specific logic MUST be avoided in the template. All components MUST be designed for multiple use cases.

### V. API Abstraction
All data access MUST go through a service layer. Mock implementations MUST follow the same contract as real APIs. No direct data access from UI components.

### VI. Scalability
The system MUST be ready to integrate with a real backend (FastAPI or similar). Architectural decisions MUST NOT block future backend integration. Mock-to-real transition MUST be seamless.

### VII. Developer Experience
Code MUST be easy to understand and extend. Consistent patterns MUST be used across modules. Clear documentation and examples MUST be provided.

### VIII. UI/UX Quality
Modern UI MUST be implemented using shadcn/ui and Tailwind. Loading states, empty states, and error states MUST be supported. Responsive design MUST be prioritized.

### IX. State Management
A scalable approach (React Query or similar) MUST be used. Prop drilling MUST be avoided. State MUST be loosely coupled and testable.

### X. Security Awareness
Even in mock mode, structure MUST reflect real auth flows (tokens, protected routes). Security patterns MUST be implemented from the start. No hardcoded credentials or insecure practices.

## Technology Stack

React with TypeScript for frontend development. Tailwind CSS for styling with shadcn/ui components. React Query for state management and API abstraction. Vite for build tooling and development server.

## Development Standards

All modules MUST follow the established directory structure. Components MUST be exported from index files. Services MUST implement consistent interfaces. Error handling MUST be standardized across all modules. Testing MUST be implemented at unit, integration, and contract levels.

## Governance

This constitution supersedes all other development practices. Amendments require documentation, team approval, and migration plan. All pull requests MUST verify compliance with these principles. Complexity deviations MUST be explicitly justified. Use this constitution as the primary guidance for all development decisions.

**Version**: 1.0.0 | **Ratified**: 2026-03-23 | **Last Amended**: 2026-03-23
