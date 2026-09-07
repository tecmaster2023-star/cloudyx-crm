# 02 — Paleta Mono + Cyan Ocean

> **Source of truth:** `app/globals.css` (blocos `:root`, `[data-theme="light"]`, `[data-theme="dark"]`).
> O `app/design/lib/tokens.ts` → `PALETTES.monoCyan` é o espelho do showcase; divergiu, o CSS está certo.

## Filosofia da paleta

**Preto e branco, com uma cor.** Os neutros são cinza puro (`R = G = B`); a única cor do sistema é um cyan oceânico. Não é minimalismo por estética — é uma regra de leitura:

- **Cor significa alguma coisa.** Numa interface acromática, tudo que tem cor é ação, estado ou alerta. O olho aprende isso em minutos e para de varrer.
- **Neutro sem tempero não briga com marca nenhuma.** O produto é white-label: greige quente conflitava com a marca de qualquer cliente que não fosse quente. Cinza puro aceita cyan, roxo, laranja ou o que o cliente trouxer.
- **Funcional em monitor 8h/dia.** Fundo nunca é `#ffffff` puro (reflete demais em sessão longa) nem `#000000` puro (halo em texto claro).

A paleta tem **dois temas desenhados independentemente**, não invertidos.

## A rampa é DERIVADA, não escolhida

As onze paradas do accent saem de `rampaDeSemente("#0891b2")` — o mesmo algoritmo que gera a rampa de um cliente que escolhe a cor dele. Isso não é detalhe de implementação: é o que faz a régua de contraste do produto significar a mesma coisa para nós e para quem compra a marca própria.

`tests/unit/branding-rampa.test.ts` reprova se o CSS divergir da derivação em mais de **2/255 por canal**. Colar uma escala pronta (a do Tailwind, por exemplo) reprova — foi medido, com distância de até 119/255.

```bash
# a rampa em vigor, sem confiar nesta página
grep -A 11 'color-accent-50' app/globals.css | head -12
```

---

## Light theme

| Papel | Token | Hex |
|---|---|---|
| Fundo da página | `--color-bg` | `#fafafa` |
| Superfície (card) | `--color-surface` | `#ffffff` |
| Superfície elevada | `--color-surface-elevated` | `#f5f5f5` |
| Texto | `--color-text` | `#171717` |
| Texto secundário | `--color-text-muted` | `#525252` |
| Texto sutil | `--color-text-subtle` | `#737373` |
| Borda | `--color-border` | `#e5e5e5` |
| Borda forte | `--color-border-strong` | `#d4d4d4` |

**Accent (Cyan Ocean):**

| Parada | Hex | Onde |
|---|---|---|
| 50 | `#edf7fb` | fundo de faixa muito suave |
| 100 | `#d8f0f9` | `--color-accent-soft` — chip, badge, hover de item |
| 200 | `#b3e2f3` | borda de chip |
| 300 | `#81cee8` | — |
| 400 | `#47bbde` | accent do tema **escuro** |
| 500 | `#0ca8cd` | — |
| **600** | **`#0891b2`** | **a semente**; tinta de realce, ícone sobre suave |
| **700** | **`#17718a`** | **`--color-accent`** — botão primário, link, anel de foco |
| 800 | `#195a6d` | `--color-accent-hover` |
| 900 | `#1a4a58` | — |
| 950 | `#042029` | texto sobre suave |

**Por que o accent de repouso é o 700 e não o 600, que é a semente:** medido, o rótulo branco sobre o 600 dá **3,68:1** — abaixo do piso 4,5 de texto. O botão mais usado do produto ficaria reprovado pela régua do próprio sistema. No 700 o rótulo mede 5,58 e o accent contra o fundo sobe de 3,53 para 5,34, o que também o torna seguro como texto de link. A semente continua em uso na parada 600 e continua sendo de onde a rampa inteira nasce.

## Dark theme

| Papel | Token | Hex |
|---|---|---|
| Fundo | `--color-bg` | `#0a0a0a` |
| Superfície | `--color-surface` | `#141414` |
| Superfície elevada | `--color-surface-elevated` | `#1f1f1f` |
| Texto | `--color-text` | `#fafafa` |
| Texto secundário | `--color-text-muted` | `#a3a3a3` |
| Borda | `--color-border` | `#262626` |
| Accent | `--color-accent` | `#47bbde` (parada 400) |
| Rótulo sobre accent | `--color-accent-fg` | `#0a0a0a` |
| Accent suave | `--color-accent-soft` | `rgba(71, 187, 222, 0.16)` |

No escuro o accent **sobe** a rampa (400, não 700): sobre fundo quase preto, a parada escura desapareceria. E o rótulo inverte para escuro, porque o cyan claro é a superfície agora.

`--color-accent-soft` do escuro é **translúcido**, e por isso compõe sobre cada base — as três razões diferem, e a régua mede as três. É o par mais justo do tema escuro.

## Estados

Continuam **coloridos** de propósito: numa interface acromática, verde/âmbar/vermelho/azul são função, não marca. Um erro em cinza não se lê.

| Estado | Light | Dark |
|---|---|---|
| success | `#15803d` | `#4ade80` |
| warning | `#b45309` | `#fbbf24` |
| error | `#b91c1c` | `#f87171` |
| info | `#1d4ed8` | `#60a5fa` |

O **info é azul, não cyan**, e a distância é deliberada: info em cyan se confundiria com "isto é uma ação".

## Contraste — medido, não estimado

| Combinação | Razão | Nível |
|---|---|---|
| `text` `#171717` sobre `bg` `#fafafa` | **17,18:1** | AAA |
| `text-muted` `#525252` sobre `bg` | **7,49:1** | AAA |
| `text-subtle` `#737373` sobre `bg` | **4,54:1** | AA (só label/timestamp) |
| `accent` `#17718a` sobre `bg` | **5,34:1** | AA |
| rótulo `#ffffff` sobre `accent` | **5,58:1** | AA |
| `accent-700` sobre `accent-soft` | **4,71:1** | AA |
| `error` `#b91c1c` sobre `bg` | **6,20:1** | AA+ |
| Dark: `text` sobre `bg` | **18,97:1** | AAA |
| Dark: `accent` `#47bbde` sobre `bg` | **8,89:1** | AAA |

Para remedir sem confiar nesta tabela:

```bash
pnpm exec vitest run tests/unit/branding-contraste.test.ts
```

**Pisos:** prosa e body → AAA. Texto de UI 14px+ → AA (4,5). Elemento não-textual (borda, ícone, **anel de foco**) → 3,0.

⚠️ **`text-subtle` fica em 4,54 — a margem é de 0,04.** Ele serve a label, timestamp e helper, nunca a prosa. Escurecer o fundo um degrau o derruba.

## Anti-padrões

❌ **Neutro tingido.** Se o hex não tem `R = G = B`, não é neutro deste sistema. Nada de zinc, slate, stone ou greige.

❌ **Accent como fundo de área grande.** Sidebar, header, painel inteiro. Cyan saturado em área grande cansa em 8h. Accent é ação, e ação é pontual.

❌ **Accent em texto de leitura longa.** Corpo de mensagem, descrição, prosa — tudo `text`.

❌ **`#ffffff` como fundo de página no claro.** Reflete demais em sessão longa. O fundo é `#fafafa`; `#ffffff` é a superfície do card, e é o contraste entre os dois que faz o card existir.

❌ **Importar cor fora dos estados.** Roxo, rosa, laranja não fazem parte. Tag de usuário usa as paradas do cinza mais o accent; gráfico com categorias abre RFC.

❌ **Trocar a semente editando o CSS.** A cor da instalação é configuração (`APP_ACCENT_HEX`, ou a tela de Marca), não código. Ver `docs/white-label.md`.

## Acessibilidade — visão de cor

Cyan é mais seguro que o verde que ele substituiu, e a razão é o canal:

- **Deuteranopia e protanopia** (~8% dos homens): o canal azul é preservado, então o cyan continua distinto do `error` (vermelho) e do `warning` (âmbar). O verde da paleta anterior colidia com essas duas.
- **Tritanopia** (azul-amarelo, rara): aqui o cyan é o caso pior — ele desloca para um cinza-esverdeado e a distância para o `info` encolhe. É a razão de o `info` ser azul-escuro e não outro cyan.

**Em todos os casos, nunca dependa só de cor.** Estado leva ícone + cor + rótulo. Um SLA vencido tem cor `error`, ícone `Warning` e o texto "Vencido há 2h" — quem não distingue a cor lê os outros dois.
