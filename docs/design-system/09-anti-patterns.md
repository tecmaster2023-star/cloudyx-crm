# 09 — Anti-patterns

> **Quando em dúvida, consulte aqui antes de implementar.** Cada item tem o "por quê" curto.

Lista canônica do que **não fazer** no CloudyX CRM. Anti-patterns ficam aqui pra preservar identidade visual e evitar convergência ao padrão SaaS genérico.

---

## 1. ❌ Inter como font family

**Por quê:** ~70% dos SaaS atuais usam Inter. É correta, mas saturada. Diluição de marca.
**✅ Sim:** Atkinson Hyperlegible (display + body) + IBM Plex Mono (dados). Ver `03-typography.md`.

---

## 2. ❌ Geist Sans, Space Grotesk, ou qualquer Vercel-default

**Por quê:** mesma razão de Inter. Geist é a "nova Inter" de 2024–2025. Anti-genérico exige distância.
**✅ Sim:** Atkinson.

---

## 3. ❌ Gradient roxo/azul/rosa em hero ou primary button

**Por quê:** símbolo do "AI SaaS 2024". Datado e clichê.
**✅ Sim:** accent sólido (Cyan Ocean `#0891b2`). Profundidade vem de borda + sombra, não de gradient de marca.

**Ressalva, porque a regra é sobre DECORAÇÃO e não sobre a técnica:** o brilho
especular de `.cartao-3d` é um `radial-gradient` e continua permitido. Ele não
pinta a marca — ele modela a luz que a inclinação exige, e some quando o ponteiro
sai. Gradient proibido é o que decora uma superfície parada.

---

## 4. ❌ `bg-zinc-900` ou `bg-slate-900` em dark mode

**Por quê:** zinc/slate carregam matiz. A paleta é ACROMÁTICA (R=G=B) — qualquer tempero briga com a marca que o cliente traz.
**✅ Sim:** `bg: #0a0a0a` (o degrau 900 do cinza). Ver `02-palette-mono-cyan.md`.

---

## 5. ❌ Glassmorphism (`backdrop-filter: blur` em cards/sidebar)

**Por quê:** efeito decorativo que custa GPU, não comunica nada funcional, sai de moda. Mais task que valor.
**✅ Sim:** solid `surface` ou `surface-elevated` com `border-thin`.

---

## 6. ❌ `Sparkle` ou `Sparkles` icon pra IA

**Por quê:** clichê 2023–2024. Comunica "feature de marketing" mais que função.
**✅ Sim:** `Brain` (Phosphor duotone) pra "processamento", `MagicWand` pra "sugestão automática" raro. `Lightning` é reservado pra **shortcuts/templates do atendente**, não IA.

---

## 7. ❌ Lucide Icons (default shadcn)

**Por quê:** ~80% dos shadcn-based usam Lucide. Genérico por convergência.
**✅ Sim:** Phosphor com peso `duotone` default. Ver `05-iconography-phosphor.md`.

---

## 8. ❌ Accent como bg de toda a sidebar

**Por quê:** a sidebar é neutra (`surface` ou `surface-elevated`). Accent em área grande satura e cansa em 8h.
**✅ Sim:** sidebar `surface`, com hover `accent-soft` em items de nav, active `accent-soft` + text `accent`.

---

## 9. ❌ Animar tudo no mount da página (cascade decorativa)

**Por quê:** stagger pesado custa CPU, atrasa interatividade, e em retorno (após reload) vira ruído.
**✅ Sim:** stagger sutil **só** em primeiro carregamento (40–290ms delay), `prefers-reduced-motion` respeitado. Itens que entram via scroll/refetch sem animação.

---

## 10. ❌ `red-500` puro (#ef4444) pra error

**Por quê:** vermelho saturado em UI calma vira alarme. Quebra o tom soft-tech.
**✅ Sim:** `error: #b91c1c` (light) ou `#f87171` (dark). Ver `02-palette-mono-cyan.md`.

---

## 11. ❌ 3+ cards shadcn empilhados em grid 3-cols como "stats overview"

**Por quê:** padrão dashboard genérico. Cada card vira ruído de baixo signal-to-noise.
**✅ Sim:** se precisa stats overview, use **inline metrics** (texto grande + label, sem container) ou **1 card largo** com várias métricas dentro separadas por divider.

---

## 12. ❌ "Oops! Algo deu errado 😬"

**Por quê:** voz casual em momento crítico. Cliente perdeu dado, não quer hand-holding.
**✅ Sim:** "Não conseguimos completar essa ação. Tente novamente em instantes." Ver `08-voice-and-tone.md`.

---

## 13. ❌ Emoji em UI funcional (botão, toast, error, success)

**Por quê:** infantiliza voz, polui screenshots de debug, atrapalha screen readers.
**✅ Sim:** ícone Phosphor com cor semântica + texto sóbrio.

---

## 14. ❌ Exclamation marks em sucesso ("Salvo com sucesso!")

**Por quê:** celebração de evento mundano. Gera fadiga emocional ao longo do dia.
**✅ Sim:** "Salvo." (com ponto). Resolução é a recompensa.

---

## 15. ❌ Sombra de uma camada só, ou com deslocamento horizontal

**Por quê:** elevação de uma camada vira "caixa de papelão" — falta o contato que
cola o objeto na superfície e o ambiente que o assenta. E deslocamento horizontal
quebra a convenção de luz única (no alto, levemente à frente): duas sombras com
direções diferentes na mesma tela fazem a interface parecer colagem.
**✅ Sim:** três camadas (contato + forma + ambiente), `x = 0`. Ver `07-motion-language.md` § A luz é uma só.

**⚠️ ESTA REGRA ERA OUTRA, e a anterior VENCEU com a paleta.** Ela dizia: *"❌
sombras com preto puro `rgba(0,0,0,X)` — preto puro contra warm-bg vibra (gera
halo cinza); ✅ `rgba(20, 18, 14, X)`"*. O raciocínio estava certo **enquanto o
fundo era greige**: sombra neutra sobre fundo quente realmente vibra. Com a paleta
preto-e-branco não existe mais fundo quente para vibrar contra — o neutro do
sistema É o preto, e tingir a sombra passaria a ser a incoerência. O CSS foi
convertido para `rgba(0,0,0,X)` no commit da paleta; esta linha estava proibindo o
que o produto faz.

---

## 16. ❌ `#fff` puro como bg de página em light mode

**Por quê:** branco puro reflete demais em sessão longa, causa fadiga.
**✅ Sim:** `bg: #fafafa` (o degrau 50 do cinza). `surface` (cards) sim usa `#ffffff`
puro — é o contraste entre os dois que faz o card existir como objeto.

---

## 17. ❌ `border-radius: 0` em todos os controles ("flat brutalism")

**Por quê:** brutalist é uma direção válida, mas não combina com soft-tech calmo. Vira hostil em uso prolongado.
**✅ Sim:** `radius-xs` (4px) em controles, `radius-sm` (8px) em cards de lista. Radius 0 só em tabelas densas.

---

## 18. ❌ Tabs com background pill (`bg-accent-soft` no active)

**Por quê:** padrão tablets-iOS, ocupa visual demais em UI densa.
**✅ Sim:** underline-style — `border-bottom-color: accent` (2px) + `text-accent`. Ver `06-components.md`.

---

## 19. ❌ Spinner em botão sem desabilitar o botão

**Por quê:** clique duplo manda 2 requests. Bug clássico.
**✅ Sim:** `<Button disabled loading><CircleNotch /> Salvando.</Button>`

---

## 20. ❌ "Usuário não logado" / "Algo está errado" como mensagens

**Por quê:** vagas, não acionáveis, frustram.
**✅ Sim:** "Sua sessão expirou. **Entrar novamente.**" / "Não conseguimos buscar essa lista. Verifique sua conexão e tente de novo."

---

## 21. ❌ Tooltip em botão com label visível

**Por quê:** redundante. Tooltip é pra informação extra que não cabe no controle.
**✅ Sim:** tooltip só em icon-only buttons ou quando há atalho de teclado pra mostrar (`Buscar (⌘K)`).

---

## 22. ❌ Modal dentro de modal

**Por quê:** Z-stack confusa, foco perdido, anti-padrão de UX.
**✅ Sim:** se precisa segundo step, vire wizard dentro do mesmo modal, ou use Sheet → Dialog (1 nível só).

---

## 23. ❌ `transition: all`

**Por quê:** anima width/height (caras), perde controle de quais props transicionam.
**✅ Sim:** liste explicitamente — `transition: background 120ms, border-color 120ms`. Ver `07-motion-language.md`.

---

## 24. ❌ Texto centralizado em cards de dados

**Por quê:** centralizar quebra hierarquia de leitura ocidental (esquerda → direita). Aceitável só em empty states e CTAs heroicos.
**✅ Sim:** alinhamento à esquerda em title, body, value. Right-align só pra metas (timestamp, badge, value monetário).

---

## 25. ❌ `cursor: pointer` em containers não-clicáveis

**Por quê:** mente o usuário sobre affordance.
**✅ Sim:** `cursor: pointer` apenas em elementos com `onClick`. Card que tem subelementos clicáveis usa cursor `default`.

---

## 26. ❌ Inclinação 3D em superfície de trabalho

**Por quê:** a régua das oito horas. `.cartao-3d` vale onde a pessoa EXPLORA (um
card que se abre, um painel, uma visão geral). No inbox, na tabela e na fila ela
passa 400 vezes por turno, e o efeito que encanta na demo é o que cansa no uso.
**✅ Sim:** `.cartao-interativo` (elevação no hover) em qualquer lugar; `.cartao-3d`
só em exploração, e nunca abaixo de 200×120px. Ver `07-motion-language.md`.

---

## 27. ❌ Rotação 3D acima de 6°

**Por quê:** acima disso o texto do card distorce visivelmente — o efeito passa a
cobrar legibilidade do conteúdo que ele deveria valorizar.
**✅ Sim:** teto de 6° por eixo, perspectiva ≥ 900px.

---

## 28. ❌ Hover, press ou foco implementados em JS

**Por quê:** eles têm de funcionar ANTES de a hidratação terminar — e é no primeiro
segundo que a pessoa passa o mouse. Card que só fica pegável depois do JS é card
quebrado, e o defeito não aparece em dev (onde tudo já está carregado).
**✅ Sim:** CSS sempre. GSAP só onde CSS não alcança: perseguir alvo que se move
(inércia do ponteiro) e sequência com dependência entre passos.

## Como usar este doc

Antes de mergear PR de UI:

1. Pesquise o termo (`Ctrl+F`) que você está usando — se aparece como "❌", você está fazendo algo errado.
2. Se sua intuição diz "isso fica bonito", e o briefing não pediu — provavelmente é anti-pattern. Pause.
3. Se descobre um anti-pattern novo no produto, adicione aqui em PR — anti-patterns são o memory bank do design system.
