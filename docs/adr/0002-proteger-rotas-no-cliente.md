# ADR 0002: Proteger rotas no cliente

- **Status:** Proposto
- **Data:** 2026-11-06
- **Decisores:** Walter Nascimento
- **Relacionados:** [ADR 0001](0001-usar-mock-localstorage-sem-backend.md)

> Decisão inferida do código. O contexto e os critérios abaixo são suposições que falta confirmar.

## Contexto e problema

As rotas de `/dashboard` só devem ser acessíveis a utilizadores autenticados. Como a sessão vive em localStorage ([ADR 0001](0001-usar-mock-localstorage-sem-backend.md)), o servidor não consegue ver se o utilizador está autenticado.

## Critérios de decisão

- A verificação tem de ler o estado que existe só no browser.
- (suposição) Não acrescentar camadas sem backend real por trás.

## Opções consideradas

1. Guard no layout cliente (`useAuth` + `router.replace('/login')`)
2. Middleware/proxy do Next.js com um cookie de sessão
3. Verificação em Server Components

## Decisão

Escolhemos o **guard no layout cliente**: `src/app/dashboard/layout.tsx` redireciona para `/login` quando `!isAuthenticated`. É a única opção compatível com uma sessão que só existe em localStorage.

### Consequências

- **Positivas:** simples, com um único ponto de controlo e coerente com o ADR 0001.
- **Negativas:** não é proteção de segurança; o HTML/JS das páginas chega ao browser antes do redirect, e pode haver um flash antes de redirecionar.
- **Riscos e mitigação:** com um backend real, a proteção passa a ter de existir no servidor. Este ADR deve ser substituído ao mesmo tempo que o 0001.

### Como validar

Rever quando o ADR 0001 for substituído, ou quando houver dados sensíveis servidos pelo servidor.

## Prós e contras das opções

### Guard no cliente

- **Prós:** trivial, sem infraestrutura.
- **Contras:** só protege a UX, não protege dados.

### Middleware/proxy com cookie

- **Prós:** bloqueia antes de renderizar.
- **Contras:** exige uma sessão em cookie, que o mock não tem.

### Server Components

- **Prós:** a proteção fica no servidor.
- **Contras:** o mesmo problema: o servidor não conhece a sessão.

## Links

- `src/app/dashboard/layout.tsx`
- `src/modules/auth/components/AuthProvider.tsx`
