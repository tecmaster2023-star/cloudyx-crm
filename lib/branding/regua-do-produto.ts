/**
 * A régua do design system, congelada em módulo — a fonte da derivação em RUNTIME.
 *
 * POR QUE ESTE ARQUIVO EXISTE, e não um `readFileSync("app/globals.css")`:
 *
 * A imagem de produção é `output: "standalone"` (next.config.ts) e o Dockerfile
 * copia para o runner apenas `.next/standalone`, `.next/static` e `public/`. O
 * `app/globals.css` NÃO existe no contêiner que o self-hoster roda. Um
 * `readFileSync` no caminho de render do `app/layout.tsx` daria ENOENT — 500 em
 * todas as telas, na VPS de quem a feature existe para servir, e verde em dev,
 * em teste e na Vercel. É o mesmo modo de falha que `lib/branding.ts` documenta
 * para o `NEXT_PUBLIC_*`.
 *
 * A separação também é a certa conceitualmente: a RÉGUA é do produto e nasce
 * congelada no build; a COR é da instalação e só existe em runtime. Só a segunda
 * precisa ser lida do ambiente.
 *
 * ESTE ARQUIVO É GERADO. Não edite à mão: ele é o `extrairRegua()` aplicado ao
 * `app/globals.css`. `tests/unit/branding-regua-do-produto.test.ts` compara os
 * dois a cada run e imprime o literal novo na mensagem de falha — mexeu na
 * paleta, o teste reprova e entrega o texto para colar aqui.
 */

import type { Regua } from "./contraste";

export const REGUA_DO_PRODUTO: Regua = {
  "rampaDoProduto": [
    "#edf7fb",
    "#d8f0f9",
    "#b3e2f3",
    "#81cee8",
    "#47bbde",
    "#0ca8cd",
    "#0891b2",
    "#17718a",
    "#195a6d",
    "#1a4a58",
    "#042029"
  ],
  "claro": {
    "nome": "claro",
    "base": [
      {
        "chave": "--color-bg",
        "hex": "#fafafa"
      },
      {
        "chave": "--color-surface",
        "hex": "#ffffff"
      },
      {
        "chave": "--color-surface-elevated",
        "hex": "#f5f5f5"
      }
    ],
    "tingidas": [
      {
        "chave": "--color-accent-soft",
        "fonte": {
          "tipo": "grau",
          "indice": 1,
          "alfa": 1
        }
      }
    ],
    "papeis": [
      {
        "token": "--color-accent",
        "tipo": "componente",
        "fonte": {
          "tipo": "grau",
          "indice": 7,
          "alfa": 1
        },
        "contra": null
      },
      {
        "token": "--color-accent-fg",
        "tipo": "texto",
        "fonte": {
          "tipo": "frenteCalculada",
          "sobre": {
            "tipo": "grau",
            "indice": 7,
            "alfa": 1
          }
        },
        "contra": [
          {
            "tipo": "grau",
            "indice": 7,
            "alfa": 1
          }
        ]
      },
      {
        "token": "--color-accent-hover",
        "tipo": "componente",
        "fonte": {
          "tipo": "grau",
          "indice": 8,
          "alfa": 1
        },
        "contra": null
      },
      {
        "token": "--ring",
        "tipo": "componente",
        "fonte": {
          "tipo": "grau",
          "indice": 7,
          "alfa": 1
        },
        "contra": null
      },
      {
        "token": "::selection/color",
        "tipo": "texto",
        "fonte": {
          "tipo": "grau",
          "indice": 10,
          "alfa": 1
        },
        "contra": [
          {
            "tipo": "grau",
            "indice": 2,
            "alfa": 1
          }
        ]
      },
      {
        "token": ":focus-visible/outline",
        "tipo": "componente",
        "fonte": {
          "tipo": "grau",
          "indice": 7,
          "alfa": 1
        },
        "contra": null
      }
    ],
    "semanticas": [
      {
        "nome": "success",
        "hex": "#15803d"
      },
      {
        "nome": "warning",
        "hex": "#b45309"
      },
      {
        "nome": "error",
        "hex": "#b91c1c"
      },
      {
        "nome": "info",
        "hex": "#1d4ed8"
      }
    ],
    "neutros": [
      "#fafafa",
      "#f5f5f5",
      "#e5e5e5",
      "#d4d4d4",
      "#a3a3a3",
      "#737373",
      "#525252",
      "#404040",
      "#262626",
      "#171717",
      "#0a0a0a"
    ],
    "indices": {
      "accent": 7,
      "hover": 8,
      "soft": 1
    },
    "alfaDoSoft": 1
  },
  "escuro": {
    "nome": "escuro",
    "base": [
      {
        "chave": "--color-bg",
        "hex": "#0a0a0a"
      },
      {
        "chave": "--color-surface",
        "hex": "#141414"
      },
      {
        "chave": "--color-surface-elevated",
        "hex": "#1f1f1f"
      }
    ],
    "tingidas": [
      {
        "chave": "--color-accent-soft",
        "fonte": {
          "tipo": "literal",
          "hex": "#47bbde",
          "alfa": 0.16
        }
      }
    ],
    "papeis": [
      {
        "token": "--color-accent",
        "tipo": "componente",
        "fonte": {
          "tipo": "grau",
          "indice": 4,
          "alfa": 1
        },
        "contra": null
      },
      {
        "token": "--color-accent-fg",
        "tipo": "texto",
        "fonte": {
          "tipo": "frenteCalculada",
          "sobre": {
            "tipo": "grau",
            "indice": 4,
            "alfa": 1
          }
        },
        "contra": [
          {
            "tipo": "grau",
            "indice": 4,
            "alfa": 1
          }
        ]
      },
      {
        "token": "--color-accent-hover",
        "tipo": "componente",
        "fonte": {
          "tipo": "grau",
          "indice": 3,
          "alfa": 1
        },
        "contra": null
      },
      {
        "token": "--ring",
        "tipo": "componente",
        "fonte": {
          "tipo": "grau",
          "indice": 4,
          "alfa": 1
        },
        "contra": null
      },
      {
        "token": "[data-theme=\"dark\"] ::selection/color",
        "tipo": "texto",
        "fonte": {
          "tipo": "grau",
          "indice": 0,
          "alfa": 1
        },
        "contra": [
          {
            "tipo": "grau",
            "indice": 7,
            "alfa": 1
          }
        ]
      },
      {
        "token": "[data-theme=\"dark\"] :focus-visible/outline-color",
        "tipo": "componente",
        "fonte": {
          "tipo": "grau",
          "indice": 4,
          "alfa": 1
        },
        "contra": null
      }
    ],
    "semanticas": [
      {
        "nome": "success",
        "hex": "#4ade80"
      },
      {
        "nome": "warning",
        "hex": "#fbbf24"
      },
      {
        "nome": "error",
        "hex": "#f87171"
      },
      {
        "nome": "info",
        "hex": "#60a5fa"
      }
    ],
    "neutros": [
      "#fafafa",
      "#ededed",
      "#d4d4d4",
      "#a3a3a3",
      "#737373",
      "#404040",
      "#262626",
      "#1f1f1f",
      "#141414",
      "#0a0a0a",
      "#050505"
    ],
    "indices": {
      "accent": 4,
      "hover": 3,
      "soft": null
    },
    "alfaDoSoft": 0.16
  }
} as const;
