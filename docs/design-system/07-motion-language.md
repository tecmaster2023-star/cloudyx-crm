# 07 — Motion Language

> **Source of truth:** `app/globals.css` (tokens `--ease-*`, `--duration-*`, `--shadow-*`, classes `.cartao-*`), `lib/motion/` (o que precisa de JS), `app/design/lib/tokens.ts` → `MOTION` (o showcase).

## Filosofia

Motion no CloudyX CRM comunica duas coisas, e só duas:

1. **Continuidade espacial** — a interface não "aparece", ela se desloca da posição anterior para a atual.
2. **Materialidade** — um elemento que se pode pegar responde ao ponteiro; um que não se pode, não responde. A profundidade diz o que é clicável antes de o usuário clicar.

O que não comunica nenhuma das duas é decoração, e decoração sai.

**A régua que decide, e ela é uma pergunta sobre a pessoa do outro lado:** este é um sistema que alguém opera **oito horas por dia**. Movimento que encanta na primeira vez e irrita na milésima está errado, mesmo que a primeira vez seja linda. É por isso que a lista abaixo permite profundidade e 3D em **superfícies de exploração** (um card que se abre, um painel, uma tela de visão geral) e os proíbe em **superfícies de trabalho** (inbox, tabela, fila) — não porque o efeito seja pior lá, mas porque a mesma pessoa passa por ali 400 vezes num turno.

Quatro testes para cada animação:

1. **Posso explicar o que ela comunica em uma frase?** Se a resposta é "fica bonito", remove.
2. **A duração é proporcional à distância visual?** 8px de translate → 200ms; 100% de slide → 320ms+.
3. **A curva combina com o tipo de movimento?** Entrada suave (`ease-out`), saída firme (`ease-in`), inércia de ponteiro (damping, não bezier).
4. **Funciona com `prefers-reduced-motion: reduce`?** Sim, ou degrada para o mesmo destino sem o percurso.

---

## A luz é uma só

Todas as sombras deste sistema vêm de **uma fonte de luz no alto, levemente à frente**. Isso não é gosto: sombra sem convenção de luz é o que faz uma interface parecer colagem. Consequências, que valem como regra:

- Sombra nunca tem deslocamento horizontal (`x = 0`). Luz no alto, sombra reta abaixo.
- Elevação maior = sombra **mais difusa e mais deslocada para baixo**, nunca só mais escura.
- Toda elevação é composta de **três camadas**: contato (1–2px, quase opaca, cola o objeto na superfície), forma (média, define o volume) e ambiente (larga e fraca, dá o assentamento). Uma camada só é o que produz a "sombra de caixa de papelão".

No tema escuro a luz não some — a sombra é que deixa de funcionar como sinal, porque preto sobre preto não se vê. Lá a elevação é comunicada por **superfície mais clara** (`--color-surface-elevated`) mais uma sombra ainda mais difusa; nunca por sombra sozinha.

---

## Elevação — a escala

| Token | Onde vive | O que comunica |
|---|---|---|
| `--shadow-xs` | input, chip, badge | está no plano, mas destacado do fundo |
| `--shadow-sm` | card em repouso | é um objeto, não uma área |
| `--shadow-md` | card em hover, dropdown | saiu do plano, você pode pegar |
| `--shadow-lg` | popover, sheet | está por cima do conteúdo |
| `--shadow-xl` | modal | o resto do sistema parou |

**Não invente elevação intermediária.** Cinco degraus bastam para um CRM; o sexto existe para o autor, não para o usuário. Se um elemento precisa de "quase md", ele provavelmente é md.

---

## 5 tipos canônicos

### 1. Page transition

Quando navegação muda a view inteira (`/inbox` → `/kanban`).

Fade + 8px de subida, 320ms, `--ease-out`. **Sempre fade + transform** — fade puro vira flicker em monitor de baixa taxa.

### 2. Component enter/exit (modal/sheet)

Modal: `scale(0.985) → 1` + `translateY(8px) → 0` + fade. 320ms.
Sheet: `translateX(100%) → 0` + fade do backdrop. 320ms.
Backdrop entra **antes** do conteúdo (5–10ms de offset) — é o que faz a peça parecer vir de trás dele, e não junto.

### 3. Hover / press — a materialidade

```css
.cartao-interativo:hover  { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.cartao-interativo:active { transform: translateY(0);    box-shadow: var(--shadow-sm); }
```

- **Subir no hover, voltar no press.** O press tem de desfazer o hover, não aprofundá-lo: a mão empurra para baixo.
- Hover em 200ms, press em **120ms ou menos**. Press lento parece travamento, não clique.
- A borda muda junto com a sombra — as duas são a mesma informação ("isto é pegável") e por isso são a exceção à regra de duas propriedades.

### 4. Inclinação 3D (`.cartao-3d`)

Card que acompanha o ponteiro com rotação em dois eixos e um brilho especular que se move na direção oposta.

**Limites, e todos são obrigatórios:**

| Limite | Valor | Por quê |
|---|---|---|
| Rotação máxima | **6°** por eixo | acima disso o texto do card distorce e fica menos legível — o efeito passa a cobrar do conteúdo |
| Perspectiva | 900px+ | perspectiva curta exagera a distorção nas bordas |
| Ponteiro | só `(hover: hover) and (pointer: fine)` | em toque não existe hover: o card ficaria inclinado e preso após o tap |
| Superfície | só exploração | **proibido** em inbox, tabela, fila, lista densa — ver a régua das oito horas |
| Tamanho | ≥ 200×120px | card pequeno inclinado só treme |
| Reduced motion | sem rotação, sem brilho | resta o hover de elevação, que já comunica o mesmo |

**O brilho é um `radial-gradient` que segue o ponteiro**, não uma animação com vida própria. Ele existe porque rotação sem mudança de luz parece papel dobrando; com a luz acompanhando, parece superfície sólida girando sob uma lâmpada.

### 5. Coreografia de entrada (`.cascata`)

Lista/board que entra com cada item atrasado em **40ms**, teto de **8 itens** (320ms no total — o mesmo teto de uma page transition).

**Uma vez por montagem, e só.** Item que chega por scroll, refetch ou realtime entra **sem** atraso. O motivo é medido em produto, não em gosto: numa fila que atualiza sozinha, stagger transforma cada chegada em um evento visual, e o operador perde o único sinal que importa — o que de fato mudou.

---

## Curvas e durações

| Token | cubic-bezier | Onde |
|---|---|---|
| `--ease-out` | `(0.2, 0, 0, 1)` | hover, micro-feedback, entrada |
| `--ease-in-out` | `(0.25, 0.1, 0.25, 1)` | default de UI, fade, cor |
| `--ease-spring` | `(0.34, 1.56, 0.64, 1)` | pop pontual, confirmação de drag |

| Token | Valor | Quando |
|---|---|---|
| `--duration-fast` | 120ms | press, cor, borda |
| `--duration-base` | 200ms | hover, fade, elevação |
| `--duration-slow` | 320ms | page, modal, sheet, cascata inteira |

**Durações fora dessa tabela são proibidas em CSS.** Precisa de 250? Use 200. De 280? Use 320.

A exceção é a **inércia de ponteiro** (`.cartao-3d`), que não é duração e sim amortecimento: ela não tem começo nem fim, ela persegue um alvo que se move. Vive em JS com `duration: 0.4` de damping e não entra nesta tabela porque não é a mesma grandeza.

---

## GSAP — onde entra e onde é proibido

GSAP está instalado (`gsap@3.15`). Ele resolve uma classe estreita de problema, e **usá-lo fora dela é peso sem retorno**.

**Pode:**
- **Perseguir um alvo que se move** — a inclinação 3D. `gsap.quickTo` faz interpolação amortecida a 60fps sem alocar por frame; a mesma coisa em `requestAnimationFrame` à mão é código pior fazendo o mesmo.
- **Orquestrar sequência com dependência entre passos** — quando B começa a 60% de A. `Timeline` diz isso em uma linha; CSS diz em delays calculados à mão que quebram quando a duração muda.

**Não pode:**
- **Hover, press e foco.** São CSS, sempre. Eles têm de funcionar **antes de o JS carregar** — e é justamente no primeiro segundo que a pessoa passa o mouse. Um card que só fica pegável depois da hidratação é um card quebrado.
- **Substituir `transition` por tween** em mudança de estado simples. É mais código, mais bytes e mais uma coisa para dessincronizar do token.
- **ScrollTrigger.** Ver anti-patterns: scroll é fluido por natureza.

**Regra de carga:** GSAP entra por `import()` dinâmico, dentro do efeito que o usa. Nenhuma tela paga o download sem usar. O inbox — a tela mais quente do produto — não importa GSAP em nenhum caminho.

---

## `prefers-reduced-motion`

Sempre respeitar, e **degradar para o mesmo destino sem o percurso** — nunca para uma versão pior do produto.

- `.cartao-3d` → perde rotação e brilho, mantém elevação no hover.
- `.cascata` → todos os itens entram juntos, sem atraso.
- `.card-pulse` → anel estático em vez de animado (o card continua dizendo "mudei").
- Skeleton shimmer **pode ficar**: não causa enjoo de movimento e é a única indicação de que algo está vindo.

---

## Anti-patterns

❌ **Parallax decorativo.** Camadas em velocidades diferentes no scroll. Não comunica nem continuidade nem materialidade, e custa no dispositivo mais fraco.

❌ **Animação disparada por scroll de lista.** Scroll já é fluido; animar o que entra no viewport gasta CPU e esconde o que mudou de verdade.

❌ **Inclinação 3D em superfície de trabalho.** Inbox, tabela, fila. Ver a régua das oito horas.

❌ **Rotação 3D acima de 6°.** Passa a cobrar legibilidade pelo efeito.

❌ **Fade sem transform companheiro.** Flicker em monitor de baixa taxa.

❌ **`transition: all`.** Pega `width`/`height`, que são caras. Liste o que muda.

❌ **Sombra de uma camada só** para elevação média ou maior. Vira caixa de papelão.

❌ **Sombra com deslocamento horizontal.** A luz é uma só, e está no alto.

❌ **Mais de um elemento animado em estado de carregamento.** Skeleton **ou** spinner **ou** texto. Nunca os três.

❌ **Duração acima de 500ms em UI funcional.** Modal em 600ms parece travado.

❌ **Bounce alto** (`cubic-bezier(0.68, -0.55, 0.27, 1.55)`). O elemento "pula". O `1.56` do `--ease-spring` é o teto.

---

## O que mudou nesta revisão, e por quê

A versão anterior deste documento dizia que motion "não é decoração, não é celebração, não é modernidade" e listava 4 tipos canônicos, sem profundidade nem 3D. Ela foi escrita para um produto que se vendia como "soft-tech calmo".

O dono do produto pediu profundidade, inclinação 3D e efeitos de card. A doutrina foi **estendida, não abandonada**: a exigência de propósito continua (todo movimento comunica continuidade ou materialidade), o `prefers-reduced-motion` continua obrigatório, as durações continuam travadas, e os anti-patterns caros — parallax, animação em scroll — continuam proibidos.

O que entrou de novo é uma **fronteira**, e ela é a parte que importa mais que os efeitos: profundidade e 3D valem em **superfície de exploração**, nunca em **superfície de trabalho**. Sem essa linha, o pedido "deixe bonito" chegaria no inbox — a tela onde a mesma pessoa passa 400 vezes por turno —, e o efeito que encanta na demo é o que cansa no uso. A régua das oito horas é o que separa as duas.
