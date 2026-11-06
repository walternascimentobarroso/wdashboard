# ADR 0003: Usar CRUD genérico partilhado entre features

- **Status:** Proposto
- **Data:** 2026-11-06
- **Decisores:** Walter Nascimento
- **Relacionados:** [ADR 0001](0001-usar-mock-localstorage-sem-backend.md)

> Decisão inferida do código. O contexto e os critérios abaixo são suposições que falta confirmar.

## Contexto e problema

Com a feature `roles` a juntar-se a `users`, as duas precisavam da mesma lista com filtros, ordenação, paginação, ações por linha, confirmação de delete e export. Duplicar isso em cada feature multiplica o código e os bugs.

## Critérios de decisão

- Uma feature nova de CRUD deve custar pouco código.
- (suposição) Ter comportamento consistente entre tabelas.
- Manter a separação UI / services ([CLAUDE.md](../../CLAUDE.md)).

## Opções consideradas

1. Camada genérica: `createLocalCrud` (serviço) + `useCrudList` (estado) + `components/shared/data-table/` (UI)
2. Copiar e adaptar o código de `users` em cada feature
3. Biblioteca de admin pronta (ex.: react-admin, Refine)

## Decisão

Escolhemos a **camada genérica**. Cada feature fornece só o modelo, a validação, os filtros e as colunas.

### Consequências

- **Positivas:** as features novas ficam pequenas; um bug corrigido num sítio fica corrigido em todos; a troca para uma API real faz-se implementando `CrudService`.
- **Negativas:** a abstração tem de servir todos os casos; uma feature com necessidades muito diferentes pode ficar forçada. O `service` e o `matches` têm de ser estáveis (definidos ao nível do módulo).
- **Riscos e mitigação:** a abstração pode crescer com opções para cada caso especial. A mitigação é preferir código específico na feature a acrescentar opções ao genérico.

### Como validar

Uma terceira feature de CRUD deve caber sem alterar a camada genérica. Se não couber, rever.

## Prós e contras das opções

### Camada genérica

- **Prós:** DRY, consistente.
- **Contras:** a abstração tem custo de entendimento.

### Copiar por feature

- **Prós:** cada feature é independente.
- **Contras:** duplicação e divergência ao longo do tempo.

### Biblioteca de admin

- **Prós:** muita funcionalidade pronta.
- **Contras:** dependência pesada e conflito com shadcn/ui e o design próprio.

## Links

- `src/lib/local-crud.ts`
- `src/hooks/useCrudList.ts`
- `src/components/shared/data-table/`
- `src/features/users/`, `src/features/roles/`
