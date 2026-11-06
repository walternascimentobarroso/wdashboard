# WDashboard

Admin dashboard built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and shadcn/ui.

There is no backend: data and authentication are mocked and stored in the browser's `localStorage`.

## Getting started

Requirements: Node.js 26 (LTS) and npm. With nvm: `nvm use`.

```bash
npm install
cp .env.example .env.local
make dev
```

Open http://localhost:3000.

### Demo accounts

| Role   | Email                  | Password    |
| ------ | ---------------------- | ----------- |
| Admin  | `admin@dashboard.com`  | `admin123`  |
| User   | `user@dashboard.com`   | `user123`   |
| Viewer | `viewer@dashboard.com` | `viewer123` |

## Commands

| Command         | What it does                                       |
| --------------- | -------------------------------------------------- |
| `make dev`      | Development server                                 |
| `make build`    | Production build                                   |
| `make validate` | Formatting, lint and imports (Biome) and typecheck |
| `make clean`    | Removes `.next` and the cache                      |

No tests are configured.

## Features

- **Login:** mocked authentication with "remember me" and session-based redirects. Route protection is client-side.
- **Dashboard:** KPIs with sparklines and trend indicators, charts (Recharts) and quick actions.
- **Users:** full CRUD (create, edit, delete) with pagination, sorting, search and filters by role and status. Rejects duplicate emails, prevents deleting the last admin, and exports the list to Excel and PDF.
- **Files:** upload, listing and search, with the status of each file.
- **Logs:** filter by level (error, warning, info, success) and text search.
- **Profile:** personal details, avatar, password change, preferences and activity history.
- **Interface:** light, dark or system theme; Portuguese and English (next-intl); command palette; responsive layout. Preferences are saved in `localStorage`.

## Stack

- Next.js 16, React and TypeScript 7
- Biome (lint and formatting)
- Tailwind CSS 4, shadcn/ui (Radix UI) and next-themes
- React Hook Form with Zod
- TanStack Query
- next-intl
- Recharts
- ExcelJS and jsPDF

## Structure

```
src/
├── app/          # routes: login, dashboard/{users,files,logs,profile}
├── components/   # ui/ (shadcn) and app components
├── features/     # complete features (users: components, hooks, services)
├── modules/      # auth and dashboard (providers and mock services)
├── lib/          # utilities, navigation, Excel/PDF export
├── hooks/        # shared hooks
└── messages/     # translations (en, pt)
```

New features should follow the `src/features/users/` pattern.
