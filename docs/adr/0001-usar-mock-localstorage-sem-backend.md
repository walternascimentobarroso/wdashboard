# ADR 0001: Usar mock em localStorage em vez de backend

- **Status:** Proposto
- **Data:** 2026-11-06
- **Decisores:** Walter Nascimento
- **Relacionados:** [ADR 0002](0002-proteger-rotas-no-cliente.md) · [ADR 0003](0003-usar-crud-generico-partilhado.md)

> Decisão inferida do código. O contexto e os critérios abaixo são suposições que falta confirmar.

## Contexto e problema

O dashboard precisa de autenticação e de dados persistentes (utilizadores, roles, perfil, preferências) para funcionar de ponta a ponta. Não existe API nem base de dados no repositório.

## Critérios de decisão

- (suposição) Poder desenvolver e demonstrar a UI sem infraestrutura.
- (suposição) Zero custo de alojamento e de setup.
- Manter a UI separada dos serviços, para que estes possam ser trocados por uma API real mais tarde.

## Opções consideradas

1. Mock em localStorage no cliente
2. API própria (route handlers do Next.js + base de dados)
3. BaaS (ex.: Supabase, Firebase)

## Decisão

Escolhemos **mock em localStorage**: a auth vive em `MockAuthService` e os dados em serviços de storage por feature, atrás de interfaces que a UI consome.

### Consequências

- **Positivas:** corre sem servidor nem credenciais; o setup é só `make dev`; os serviços são testáveis isoladamente.
- **Negativas:** não há segurança real (o token é gerado e guardado no browser); os dados existem por browser e perdem-se ao limpar o storage; não há multiutilizador.
- **Riscos e mitigação:** usar isto em produção por engano. A mitigação é manter os serviços atrás de interfaces (`CrudService`, `MockAuthService`) para que a troca seja local.

### Como validar

Rever no momento em que for preciso partilhar dados entre utilizadores ou dispositivos, ou ter autenticação real.

## Prós e contras das opções

### Mock em localStorage

- **Prós:** simples, offline, sem custo.
- **Contras:** nada é seguro nem partilhado.

### API própria

- **Prós:** dados e auth reais, com controlo total.
- **Contras:** obriga a ter base de dados, deploy e muito mais código.

### BaaS

- **Prós:** auth e dados reais com pouco código.
- **Contras:** dependência externa, contas e chaves, e possível custo.

## Links

- `src/modules/auth/services/auth.ts`
- `src/lib/local-crud.ts`
- `src/features/users/services/storage.ts`, `src/features/roles/services/storage.ts`
