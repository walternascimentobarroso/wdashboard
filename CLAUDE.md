# CLAUDE.md

Dashboard admin em Next.js 16 (App Router) + TypeScript + Tailwind 3 + shadcn/ui (Radix). Sem backend: dados e autenticação são mock (localStorage).

## Comandos

- `make dev` — servidor de desenvolvimento
- `make validate` — format + lint + typecheck + jscpd (correr antes de dar uma tarefa por concluída)
- `npm run build` — build de produção
- Não há testes configurados: `make test` falha (não existe script `test`).

## Estrutura

- `app/` — rotas (`dashboard/{users,files,logs,profile}`, `login`); `providers.tsx` junta tema, i18n, React Query e auth.
- `components/ui/` — primitivas shadcn; reutilizar antes de criar componentes novos.
- `components/{layout,dashboard,charts,profile,theme,shared}/` — componentes de aplicação.
- `features/users/` — CRUD de utilizadores (components, hooks, services, data). Modelo a seguir para features novas.
- `modules/{auth,dashboard}/` — `AuthProvider`/`useAuth` e serviços mock.
- `lib/` — utilitários (`cn`, navegação, export Excel/PDF em `lib/export/`, locale).
- `messages/` — traduções next-intl; todo o texto visível passa por elas.
- `proxy.ts` — substitui o `middleware.ts` (Next 16); a proteção de rotas é feita no cliente.

## Regras do projeto

Seguir `.specify/memory/constitution.md`. Em resumo:

- Não partir funcionalidade existente nem refatorar fora do âmbito.
- Cores só via design tokens (sem hex hardcoded); suportar light/dark/system.
- Preferências (tema, sidebar) persistem em localStorage.
- Manter separação UI / services / modules.
- Glassmorphism apenas em cards e dialogs.

## Fluxo de specs

Specs vivem em `specs/NNN-nome/` (Spec Kit: `.specify/`, comandos em `.windsurf/workflows/`). Documentação de decisões e migrações em `docs/`.
