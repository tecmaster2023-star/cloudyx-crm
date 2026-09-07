"use client";

/**
 * Envoltório de cliente que liga a inclinação 3D num filho de servidor.
 *
 * Existe para que telas como o `NavHub` continuem sendo Server Components: só
 * este nó atravessa a fronteira, e o conteúdo do card (que é o caro) segue
 * renderizado no servidor.
 *
 * ⚠️ SUPERFÍCIE DE EXPLORAÇÃO APENAS. Hub, painel, visão geral. Nunca inbox,
 * tabela ou fila — ver `docs/design-system/07-motion-language.md` § a régua das
 * oito horas, e o anti-pattern nº 26.
 *
 * A elevação e o hover NÃO dependem deste componente: eles são `.cartao-3d` +
 * `.cartao-interativo`, CSS puro, e funcionam antes de a hidratação terminar.
 * O que este nó acrescenta é só a inclinação — se o JS não chegar, o card
 * continua se comportando como card.
 */

import type { ReactNode } from "react";

import { useInclinacao3D } from "@/hooks/useInclinacao3D";
import { cn } from "@/lib/utils";

export function Cartao3D({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useInclinacao3D<HTMLDivElement>();

  return (
    <div ref={ref} className={cn("cartao-3d h-full", className)}>
      {children}
    </div>
  );
}
