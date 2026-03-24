---
trigger: always_on
---
# Next.js Architecture & Code Splitting Rules

- **Component Size Limit**: Aim to keep components under 200 lines. If a component exceeds this, proactively suggest splitting it into smaller sub-components or extracting logic into Custom Hooks.
- **Atomic Componentization**: Always prefer creating small, reusable components in `@/components/ui` for repetitive UI patterns (buttons, inputs, cards).
- **Logical Extraction**: Complex state management or side effects should be moved to dedicated files in `@/hooks/` to keep the UI layer clean.
- **Next.js App Router Optimization**:
    - Keep pages as **Server Components** by default.
    - Extract interactive elements into smaller **Client Components** ("use client") to minimize the JS bundle sent to the browser.
    - Large libraries (e.g., charts, heavy editors) must be loaded via `next/dynamic`.
- **File Organization**:
    - Route-specific components: Place in a local `_components` folder within the route directory.
    - Shared components: Place in `@/components`.
- **Single Responsibility Principle**: Each file should export one primary component. Avoid "God Files" that manage layout, data fetching, and multiple UI sections simultaneously.
