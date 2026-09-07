/**
 * Inclinação 3D que persegue o ponteiro.
 *
 * ── Por que existe JS aqui, se o resto da camada é CSS ────────────────────
 *
 * CSS não sabe onde o ponteiro está. É a única coisa que falta — e é só isso
 * que este arquivo faz: lê a posição, converte em duas rotações e escreve
 * duas custom properties. Quem anima é o compositor, como no resto do sistema.
 *
 * Hover, press e foco NÃO passam por aqui, e a regra está na doutrina: eles
 * têm de funcionar antes de a hidratação terminar. Um card que só fica pegável
 * depois do JS é um card quebrado, e o defeito nunca aparece em dev — onde
 * tudo já está carregado.
 *
 * ── Por que GSAP, e por que carregado assim ──────────────────────────────
 *
 * O ponteiro é um alvo que se MOVE. Escrever a rotação crua a cada
 * `pointermove` produz um movimento preso ao mouse, que denuncia o truque;
 * o que dá sensação de massa é perseguir o alvo com amortecimento.
 * `gsap.quickTo` faz exatamente isso a 60fps sem alocar por frame — a mesma
 * coisa à mão é um `requestAnimationFrame` com interpolação pior.
 *
 * O import é DINÂMICO, dentro do efeito. Nenhuma tela paga o download sem
 * usar, e o inbox — a tela mais quente do produto — não chega aqui.
 *
 * ── Degradação, e ela é obrigatória ──────────────────────────────────────
 *
 * Se o GSAP não carregar (rede ruim, bloqueio), a inclinação simplesmente não
 * acontece: o card continua com elevação no hover, que é CSS puro. Nada trava
 * e nada some. É por isso que o `import()` não tem `catch` que relance.
 */

/** Teto de rotação por eixo, em graus.
 *
 * 6 e não 10 ou 15: acima disso o texto DENTRO do card distorce o bastante
 * para custar legibilidade — o efeito passa a cobrar do conteúdo que ele
 * deveria valorizar. A doutrina fixa este número, e
 * `docs/design-system/09-anti-patterns.md` nº 27 o repete como anti-pattern.
 */
export const GRAUS_MAX = 6;

/** Amortecimento da perseguição, em segundos.
 *
 * Não entra na tabela de durações do design system de propósito: aquela
 * tabela governa transições, que têm começo e fim. Isto é damping — persegue
 * um alvo que se move e não termina enquanto o ponteiro não sai.
 */
const AMORTECIMENTO = 0.4;

export type ControleDeInclinacao = { destruir: () => void };

/**
 * Liga a inclinação num elemento. Devolve o desligador.
 *
 * Não faz nada (e devolve um desligador inerte) quando o ambiente não
 * comporta: sem ponteiro fino, com movimento reduzido, ou fora do browser.
 * Checar aqui, e não no chamador, é o que impede a regra de se perder no
 * quinto lugar que usar isto.
 */
export function ligarInclinacao(el: HTMLElement): ControleDeInclinacao {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return { destruir: () => {} };
  }

  const pontiagudo = window.matchMedia("(hover: hover) and (pointer: fine)");
  const calmo = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!pontiagudo.matches || calmo.matches) return { destruir: () => {} };

  let vivo = true;
  let limpar: (() => void) | undefined;

  void (async () => {
    let gsap: typeof import("gsap").gsap;
    try {
      ({ gsap } = await import("gsap"));
    } catch {
      // Sem GSAP o card mantém a elevação do CSS. Silêncio é a degradação
      // correta: um erro aqui não muda nada que o usuário possa resolver.
      return;
    }
    if (!vivo) return;

    const paraX = gsap.quickTo(el, "--rx", { duration: AMORTECIMENTO, ease: "power2.out" });
    const paraY = gsap.quickTo(el, "--ry", { duration: AMORTECIMENTO, ease: "power2.out" });
    const paraBrilhoX = gsap.quickTo(el, "--brilho-x", { duration: AMORTECIMENTO, ease: "power2.out" });
    const paraBrilhoY = gsap.quickTo(el, "--brilho-y", { duration: AMORTECIMENTO, ease: "power2.out" });

    const mover = (ev: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      // -0,5 a 0,5 a partir do centro.
      const px = (ev.clientX - r.left) / r.width - 0.5;
      const py = (ev.clientY - r.top) / r.height - 0.5;
      // O eixo X gira com o movimento VERTICAL, e invertido: puxar o mouse
      // para baixo tem de baixar a borda de baixo. Sem o sinal negativo o
      // card gira contra a mão e a sensação é de espelho.
      paraX(-py * 2 * GRAUS_MAX);
      paraY(px * 2 * GRAUS_MAX);
      paraBrilhoX(px * 100 + 50);
      paraBrilhoY(py * 100 + 50);
    };

    const entrar = () => {
      el.dataset.inclinando = "true";
      gsap.to(el, { "--brilho-forca": 1, duration: 0.2, ease: "power2.out" });
    };

    const sair = () => {
      delete el.dataset.inclinando;
      gsap.to(el, {
        "--rx": 0,
        "--ry": 0,
        "--brilho-forca": 0,
        duration: 0.32,
        ease: "power2.out",
      });
    };

    el.addEventListener("pointerenter", entrar);
    el.addEventListener("pointermove", mover);
    el.addEventListener("pointerleave", sair);

    limpar = () => {
      el.removeEventListener("pointerenter", entrar);
      el.removeEventListener("pointermove", mover);
      el.removeEventListener("pointerleave", sair);
      // Mata os tweens deste alvo: sem isto, um tween em voo continua
      // escrevendo custom property num nó que o React já desmontou.
      gsap.killTweensOf(el);
      delete el.dataset.inclinando;
    };
  })();

  return {
    destruir: () => {
      vivo = false;
      limpar?.();
    },
  };
}
