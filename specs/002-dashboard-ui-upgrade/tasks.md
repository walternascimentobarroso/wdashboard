---
description: 'Task list for Dashboard UI Upgrade implementation'
---

# Tasks: Dashboard UI Upgrade

**Input**: Design documents from `/specs/002-dashboard-ui-upgrade/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: UI testing tasks included for critical user interactions

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `app/`, `components/`, `lib/` at repository root
- **Modules**: `modules/` for existing functionality
- **Services**: `services/` for API layer (unchanged)

---

## Phase 1 — UI Setup

**Purpose**: Install and configure shadcn/ui components and theme system

- [ ] T001 Install shadcn/ui components (card, button, dialog, sheet, scroll-area, separator, avatar, dropdown-menu, skeleton, badge, tooltip)
- [ ] T002 [P] Update tailwind.config.ts with shadcn/ui color palette and configuration
- [ ] T003 [P] Add glass effect utility classes to app/globals.css
- [ ] T004 [P] Install next-themes package for theme management
- [ ] T005 [P] Update components.json with shadcn/ui component configurations

---

## Phase 2 — Layout

**Purpose**: Create new layout components while preserving existing pages

- [ ] T006 Create DashboardLayout wrapper component in components/layout/DashboardLayout.tsx
- [ ] T007 [P] Create Header component in components/layout/Header.tsx
- [ ] T008 [P] Create Sidebar placeholder component in components/layout/Sidebar.tsx
- [ ] T009 [P] Add responsive layout hook in lib/use-responsive.ts
- [ ] T010 [P] Wrap existing dashboard pages with DashboardLayout
- [ ] T011 Test layout changes maintain existing functionality

---

## Phase 3 — Sidebar (Collapsible)

**Purpose**: Implement collapsible sidebar with mini state and persistence

- [ ] T012 Build complete Sidebar component with collapse/expand functionality in components/layout/Sidebar.tsx
- [ ] T013 [P] Add collapse toggle button with smooth transitions
- [ ] T014 [P] Implement mini sidebar (icons only) state
- [ ] T015 [P] Add tooltips for collapsed sidebar icons
- [ ] T016 [P] Implement sidebar state persistence in localStorage
- [ ] T017 Create navigation configuration in lib/navigation.ts
- [ ] T018 Test sidebar toggle functionality and state persistence

---

## Phase 4 — Dark Mode

**Purpose**: Implement theme system with light/dark/system support

- [ ] T019 Create ThemeProvider wrapper in components/theme/ThemeProvider.tsx
- [ ] T020 [P] Create ThemeToggle component in components/theme/ThemeToggle.tsx
- [ ] T021 [P] Add theme toggle button to Header component
- [ ] T022 [P] Implement system preference detection
- [ ] T023 [P] Implement theme preference persistence in localStorage
- [ ] T024 Ensure all components support dark mode styling
- [ ] T025 Test theme switching across all dashboard pages

---

## Phase 5 — Glass Effect

**Purpose**: Add subtle glassmorphism effects to cards and dialogs

- [ ] T026 Create glass effect utility classes in app/globals.css
- [ ] T027 [P] Extend Card component with glass variant in components/ui/card.tsx
- [ ] T028 [P] Extend Dialog component with glass variant in components/ui/dialog.tsx
- [ ] T029 [P] Apply glass effects to dashboard cards
- [ ] T030 Verify glass effects maintain readability in both themes

---

## Phase 6 — Component Migration

**Purpose**: Replace existing UI with shadcn equivalents while preserving logic

- [ ] T031 [P] Migrate Charts module components to shadcn Card wrapper
- [ ] T032 [P] Migrate Files module components to shadcn Table and Button
- [ ] T033 [P] Migrate Logs module components to shadcn ScrollArea and Input
- [ ] T034 [P] Migrate Auth module components to shadcn Form and Avatar
- [ ] T035 Validate no business logic is broken during migration
- [ ] T036 Test all migrated components maintain original functionality

---

## Phase 7 — Responsive Sidebar

**Purpose**: Convert sidebar to mobile drawer for small screens

- [ ] T037 [P] Implement mobile drawer using shadcn Sheet component
- [ ] T038 [P] Add responsive behavior to DashboardLayout
- [ ] T039 [P] Add mobile menu toggle to Header component
- [ ] T040 Implement touch-friendly interactions for mobile drawer
- [ ] T041 Test mobile drawer functionality on different screen sizes

---

## Phase 8 — QA

**Purpose**: Final testing and validation of all features

- [ ] T042 Test light mode functionality across all components
- [ ] T043 Test dark mode functionality across all components
- [ ] T044 Test sidebar collapse/expand states and persistence
- [ ] T045 Test glass effects readability and visual consistency
- [ ] T046 Test mobile drawer behavior and touch interactions
- [ ] T047 Validate responsive behavior across all breakpoints
- [ ] T048 Fix any visual inconsistencies found during testing
- [ ] T049 Performance testing (sidebar toggle <200ms, theme switch <300ms)
- [ ] T050 Final accessibility validation and compliance check

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (UI Setup)**: No dependencies - can start immediately
- **Phase 2 (Layout)**: Depends on Phase 1 completion
- **Phase 3 (Sidebar)**: Depends on Phase 2 completion
- **Phase 4 (Dark Mode)**: Depends on Phase 2 completion
- **Phase 5 (Glass Effect)**: Depends on Phase 4 completion
- **Phase 6 (Component Migration)**: Depends on Phase 2 completion
- **Phase 7 (Responsive)**: Depends on Phase 3 completion
- **Phase 8 (QA)**: Depends on all previous phases completion

### Parallel Opportunities

- **Phase 1**: All tasks marked [P] can run in parallel
- **Phase 2**: All tasks marked [P] can run in parallel
- **Phase 6**: Component migration tasks can run in parallel
- **Phase 8**: Testing tasks can run in parallel

### Implementation Strategy

#### MVP First (Core Features Only)

1. Complete Phase 1: UI Setup
2. Complete Phase 2: Layout
3. Complete Phase 3: Sidebar
4. Complete Phase 4: Dark Mode
5. **STOP and VALIDATE**: Test core functionality independently
6. Deploy/demo if ready

#### Incremental Delivery

1. Phase 1-4 → Foundation ready
2. Add Phase 3: Sidebar → Test independently → Deploy/Demo
3. Add Phase 4: Dark Mode → Test independently → Deploy/Demo
4. Add Phase 5: Glass Effects → Test independently → Deploy/Demo
5. Add Phase 6: Component Migration → Test independently → Deploy/Demo
6. Add Phase 7: Mobile Responsive → Test independently → Deploy/Demo
7. Phase 8: QA → Final validation → Production ready

---

## Notes

- Each task is small and testable independently
- Layout changes wrapped to avoid breaking existing pages
- Component migration preserves all business logic
- State management uses localStorage with error handling
- All changes maintain backward compatibility
- Test after each phase before proceeding to next
