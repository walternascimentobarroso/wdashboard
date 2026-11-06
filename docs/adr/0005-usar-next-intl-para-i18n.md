# ADR 0005: Usar next-intl para internacionalização

- **Status:** Proposto
- **Data:** 2026-11-06
- **Decisores:** Walter Nascimento

> Decisão inferida do código. O contexto e os critérios abaixo são suposições que falta confirmar.

## Contexto e problema

A UI existe em inglês e português (`src/messages/en.json`, `pt.json`). Todo o texto visível tem de ser traduzível e o idioma tem de poder ser trocado pelo utilizador.

## Critérios de decisão

- (suposição) Integração com o App Router do Next.js.
- Todo o texto visível passa por ficheiros de mensagens ([CLAUDE.md](../../CLAUDE.md)).

## Opções consideradas

1. next-intl
2. react-i18next / i18next
3. Dicionário próprio (objeto + hook)

## Decisão

Escolhemos **next-intl**, com `NextIntlClientProvider` em `src/app/providers.tsx`. O locale é resolvido em `src/lib/` (locale do browser).

### Consequências

- **Positivas:** feito para o App Router; suporta pluralização e formatação de datas e números.
- **Negativas:** cada texto novo obriga a editar os dois ficheiros JSON; uma chave em falta só aparece em runtime.
- **Riscos e mitigação:** os JSON podem ficar com chaves diferentes entre si. A mitigação é rever as duas línguas em cada PR que mexa em texto.

### Como validar

Rever se forem precisas mais línguas com URLs por locale, ou se a manutenção das chaves se tornar um problema.

## Prós e contras das opções

### next-intl

- **Prós:** nativo para Next.js, leve.
- **Contras:** liga o projeto ao Next.js.

### i18next

- **Prós:** muito popular, com muitos plugins.
- **Contras:** setup mais pesado no App Router.

### Dicionário próprio

- **Prós:** zero dependências.
- **Contras:** reimplementar pluralização e formatação.

## Links

- `src/app/providers.tsx`
- `src/messages/en.json`, `src/messages/pt.json`
- `src/components/LanguageSwitcher.tsx`
