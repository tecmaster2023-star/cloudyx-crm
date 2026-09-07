"use client";

/**
 * A inclinação 3D como ref de React.
 *
 * Uso:
 *
 *   const ref = useInclinacao3D<HTMLDivElement>();
 *   <article ref={ref} className="cartao-3d cartao-interativo">…</article>
 *
 * A classe `cartao-3d` é obrigatória — é ela que traz a perspectiva, o brilho
 * e as guardas de toque e de movimento reduzido. Este hook só alimenta as
 * custom properties que ela consome.
 *
 * ⚠️ ONDE NÃO USAR, e isto é lei e não gosto: superfície de TRABALHO. Inbox,
 * tabela, fila. A régua está em `docs/design-system/07-motion-language.md` — o
 * operador passa por aquelas telas 400 vezes num turno, e o efeito que encanta
 * na demo é o que cansa no uso. Vale em superfície de EXPLORAÇÃO: um card que
 * se abre, um painel, uma visão geral.
 */

import { useEffect, useRef } from "react";

import { ligarInclinacao } from "@/lib/motion/inclinacao";

export function useInclinacao3D<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const controle = ligarInclinacao(el);
    return () => controle.destruir();
  }, []);

  return ref;
}
