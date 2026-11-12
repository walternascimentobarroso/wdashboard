# Stack

Dashboard admin sem backend: dados e autenticação são mock (localStorage).

## Base

| Área      | Tecnologia                                                |
| --------- | --------------------------------------------------------- |
| Runtime   | Node.js ≥ 26 (ESM)                                        |
| Framework | Next.js 16 (App Router)                                   |
| UI        | React 19                                                  |
| Linguagem | TypeScript 7 (compilador nativo em Go)                    |
| Estilos   | Tailwind CSS 4 (`@tailwindcss/postcss`), `tw-animate-css` |

## Interface

| Área            | Tecnologia                                                                               |
| --------------- | ---------------------------------------------------------------------------------------- |
| Componentes     | shadcn/ui sobre Radix (`radix-ui`), `class-variance-authority`, `clsx`, `tailwind-merge` |
| Ícones          | `lucide-react`                                                                           |
| Tema            | `next-themes` (light/dark/system)                                                        |
| Command palette | `cmdk`                                                                                   |
| Notificações    | `sonner`                                                                                 |
| Gráficos        | `recharts`                                                                               |
| Tabelas         | `@tanstack/react-table`                                                                  |

## Dados e formulários

| Área         | Tecnologia                                           |
| ------------ | ---------------------------------------------------- |
| Formulários  | `react-hook-form` + `@hookform/resolvers`            |
| Validação    | `zod` 4                                              |
| i18n         | `next-intl` (textos em `src/messages/`)              |
| Export       | `exceljs` (Excel), `jspdf` + `jspdf-autotable` (PDF) |
| Persistência | localStorage (mock)                                  |

## Ferramentas

| Área                      | Tecnologia                                   |
| ------------------------- | -------------------------------------------- |
| Lint, formatação, imports | Biome 2 (`biome.json`) — sem ESLint/Prettier |
| Typecheck                 | `tsc --noEmit`                               |
| Testes                    | `node --test` nativo (`src/**/*.test.ts`)    |
| Atalhos                   | `Makefile` (`make dev`, `make validate`)     |
| Verificação visual        | Playwright MCP (escopo local)                |

## Forma de trabalhar

- Specs com as skills `spec` → `build` → `review-spec` (`specs/`).
- Decisões de arquitetura em `docs/adr/` (skills `adr` e `adr-manager`).
- `make validate` antes de dar uma tarefa por concluída.
