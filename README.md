# WDashboard

Dashboard administrativo em Next.js 16 (App Router), TypeScript, Tailwind CSS 4 e shadcn/ui.

Não tem backend: os dados e a autenticação são simulados e ficam guardados no `localStorage` do navegador.

## Como rodar

Requisitos: Node.js 26 (LTS) e npm. Com nvm: `nvm use`.

```bash
npm install
cp .env.example .env.local
make dev
```

Abra http://localhost:3000.

### Contas de demonstração

| Perfil | Email                  | Senha       |
| ------ | ---------------------- | ----------- |
| Admin  | `admin@dashboard.com`  | `admin123`  |
| User   | `user@dashboard.com`   | `user123`   |
| Viewer | `viewer@dashboard.com` | `viewer123` |

## Comandos

| Comando         | O que faz                                      |
| --------------- | ---------------------------------------------- |
| `make dev`      | Servidor de desenvolvimento                    |
| `make build`    | Build de produção                              |
| `make validate` | Formatação, lint e imports (Biome) e typecheck |
| `make clean`    | Apaga o `.next` e o cache                      |

Não há testes configurados.

## Funcionalidades

- **Login:** autenticação simulada com "lembrar-me" e redirecionamento conforme a sessão. A proteção das rotas é feita no cliente.
- **Dashboard:** KPIs com sparklines e indicadores de tendência, gráficos (Recharts) e ações rápidas.
- **Usuários:** cadastro completo (criar, editar e excluir), com paginação, ordenação, busca e filtros por cargo e status. Recusa emails duplicados, impede excluir o último admin e exporta a lista para Excel e PDF.
- **Arquivos:** upload, listagem e busca, com o status de cada arquivo.
- **Logs:** filtro por nível (error, warning, info, success) e busca por texto.
- **Perfil:** dados pessoais, avatar, troca de senha, preferências e histórico de atividade.
- **Interface:** tema light, dark ou do sistema; idiomas português e inglês (next-intl); paleta de comandos; layout responsivo. As preferências ficam salvas no `localStorage`.

## Stack

- Next.js 16, React e TypeScript 7
- Biome (lint e formatação)
- Tailwind CSS 4, shadcn/ui (Radix UI) e next-themes
- React Hook Form com Zod
- TanStack Query
- next-intl
- Recharts
- ExcelJS e jsPDF

## Estrutura

```
src/
├── app/          # rotas: login, dashboard/{users,files,logs,profile}
├── components/   # ui/ (shadcn) e componentes da aplicação
├── features/     # funcionalidades completas (users: components, hooks, services)
├── modules/      # auth e dashboard (providers e serviços simulados)
├── lib/          # utilitários, navegação, export Excel/PDF
├── hooks/        # hooks compartilhados
└── messages/     # traduções (en, pt)
```

Uma funcionalidade nova deve seguir o modelo de `src/features/users/`.
