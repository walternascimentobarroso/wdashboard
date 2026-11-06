# ADR 0004: Usar Biome e TypeScript 7 nativo como tooling

- **Status:** Proposto
- **Data:** 2026-11-06
- **Decisores:** Walter Nascimento

> Decisão inferida do código. O contexto e os critérios abaixo são suposições que falta confirmar.

## Contexto e problema

O projeto precisa de lint, formatação, organização de imports e typecheck que corram depressa no `make validate`.

## Critérios de decisão

- (suposição) Velocidade de execução.
- (suposição) Uma só ferramenta e uma só config para lint e formatação.

## Opções consideradas

1. Biome + TypeScript 7 (nativo, em Go)
2. ESLint + Prettier + TypeScript 5.x (JS)

## Decisão

Escolhemos **Biome + TypeScript 7**: `biome.json` é a única config de lint e formatação; o typecheck é feito com `tsc --noEmit` do TS 7.

### Consequências

- **Positivas:** muito rápido e com menos dependências e configs.
- **Negativas:** o TS 7 não expõe a API JS antiga, por isso ferramentas que fazem `require('typescript')` não funcionam; o Biome tem menos regras e plugins do que o ecossistema ESLint (ex.: não há regras específicas de Next.js).
- **Riscos e mitigação:** uma ferramenta futura que precise da API do TS. A mitigação é verificar a compatibilidade antes de adotar.

### Como validar

Rever se for preciso uma regra de lint ou uma ferramenta que só existe para ESLint ou para a API JS do TypeScript.

## Prós e contras das opções

### Biome + TS 7

- **Prós:** velocidade, simplicidade.
- **Contras:** ecossistema menor e incompatibilidade com ferramentas que usam a API do TS.

### ESLint + Prettier + TS 5

- **Prós:** ecossistema enorme e maduro.
- **Contras:** mais lento, com mais configs e dependências.

## Links

- `biome.json`, `package.json`, `Makefile`
- [CLAUDE.md](../../CLAUDE.md), secção "Ferramentas"
