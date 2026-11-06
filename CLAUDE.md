# CLAUDE.md

Dashboard admin em Next.js 16 (App Router) + TypeScript 7 + Tailwind 4 + shadcn/ui (Radix). Sem backend: dados e autenticação são mock (localStorage).

## Comandos

- `make dev` — servidor de desenvolvimento
- `make validate` — Biome (format + lint + imports) + typecheck (correr antes de dar uma tarefa por concluída)
- `npm run build` — build de produção
- Não há testes configurados.

## Ferramentas

- Lint e formatação só com Biome (`biome.json`); não há ESLint nem Prettier.
- TypeScript 7 (nativo, em Go): o pacote `typescript` não expõe a API JS antiga, por isso ferramentas que fazem `require('typescript')` não funcionam.

## Estrutura

Todo o código fica em `src/` (alias `@/*` → `./src/*`); a raiz guarda apenas configuração.

- `app/` — rotas (`dashboard/{users,files,logs,profile}`, `login`); `providers.tsx` junta tema, i18n e auth.
- `components/ui/` — primitivas shadcn; reutilizar antes de criar componentes novos.
- `components/{layout,dashboard,charts,profile,theme,shared}/` — componentes de aplicação.
- `features/users/` — CRUD de utilizadores (components, hooks, services, data). Modelo a seguir para features novas.
- `modules/auth/` — `AuthProvider`/`useAuth` e serviço mock; a proteção de rotas é feita no cliente.
- `lib/` — utilitários (`cn`, navegação, export Excel/PDF em `lib/export/`, locale).
- `messages/` — traduções next-intl; todo o texto visível passa por elas.

## Regras do projeto

Princípios do projeto:

- Não partir funcionalidade existente nem refatorar fora do âmbito.
- Cores só via design tokens (sem hex hardcoded); suportar light/dark/system.
- Preferências (tema, sidebar) persistem em localStorage.
- Manter separação UI / services / modules.
- Glassmorphism apenas em cards e dialogs.
- **Limpeza ao passar:** sempre que editares um ficheiro, remove nele o código morto — imports, variáveis, funções, componentes e exports sem uso, código comentado e logs de debug. Antes de apagar um export, confirma com grep em `src/` que ninguém o importa. A limpeza fica restrita aos ficheiros já tocados pela tarefa.

## Verificação visual

O MCP do Playwright fica em escopo local (fora do repo); para configurar numa máquina nova: `claude mcp add playwright --scope local -- npx @playwright/mcp@latest`. Usa-o para navegar no app (`make dev`) e validar mudanças de UI com screenshots em light e dark.

## Fluxo de specs

Specs novas usam as skills `spec`, `build` e `review-spec`.

Decisões de arquitetura ficam em `docs/adr/`. Consulta-as com `/adr-manager` antes de mudar algo estrutural. Os ADRs novos criam-se com a skill `adr`.

## Execução de planos

Ao executar um plano aprovado (incluindo `build` de uma spec), o objetivo é terminar o mais rápido possível: divide-o no máximo de subtarefas pequenas e independentes e corre-as em paralelo com subagents sempre que possível. Este pedido vale como autorização explícita para usar subagents na execução de planos. As subtarefas que dependem umas das outras correm em sequência, e duas subtarefas nunca editam o mesmo ficheiro ao mesmo tempo. No fim, corre `make validate` uma vez sobre o resultado completo.
