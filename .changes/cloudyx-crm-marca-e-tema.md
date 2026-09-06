---
impacto: exige_acao
secao: alterado
titulo: O sistema passa a se chamar CloudyX CRM, em preto e branco com destaque cyan
---

O produto foi renomeado para **CloudyX CRM** e repintado: fundo e neutros em
cinza puro (preto e branco), com uma única cor de destaque — um cyan oceânico
(`#0891b2`) que pinta botão, link, anel de foco e o que estiver em ação.

Nada disso mexe na marca que **você** configurou. Quem já tinha nome, logo e cor
próprios em `Configurações › Marca` ou em `/admin/marca` continua vendo os seus
— o banco manda sobre o padrão do produto, como sempre mandou. O que mudou é o
que aparece quando **nenhuma** marca está configurada.

As cores de pessoa da agenda mudaram junto, e não por gosto: o sistema veta a
faixa de cor do destaque para que a cor de uma pessoa nunca seja confundida com
a cor de um estado do sistema. Como o destaque saiu do verde para o cyan, duas
trilhas caíram dentro da faixa vetada e foram movidas.

## Requer atenção

Esta versão troca identificadores técnicos. Instalação **nova** não precisa de
nada — o instalador já escreve tudo com os nomes novos. Quem está migrando de
uma instalação DeskcommCRM existente precisa saber de quatro coisas:

1. **Todo mundo é deslogado uma vez.** O cookie de sessão mudou de nome
   (`sb-deskcomm-auth` → `sb-cloudyx-auth`). Basta entrar de novo; nenhum dado
   é perdido.

2. **As imagens Docker mudaram de nome.** `deskcommcrm`, `deskcomm-worker` e
   `deskcomm-scheduler` viraram `cloudyxcrm`, `cloudyx-worker` e
   `cloudyx-scheduler`. Se o seu `.env` tem `APP_IMAGE`, `WORKER_IMAGE` ou
   `SCHEDULER_IMAGE` fixados à mão, atualize as três — e as três juntas, nunca
   pela metade.

3. **Os webhooks de saída mudaram o nome do cabeçalho.** `X-Deskcomm-Event` e
   `X-Deskcomm-Signature` viraram `X-CloudyX-Event` e `X-CloudyX-Signature`.
   Quem recebe os seus webhooks e confere a assinatura pelo nome exato precisa
   ser avisado: o payload continua chegando, mas o receptor deixa de reconhecê-lo
   **sem dar erro**. O webhook de entrada mudou junto (`x-cloudyx-signature`).

4. **Os eventos já criados no Google Agenda deixam de ser reconhecidos.** O
   sistema marca os compromissos que ele mesmo criou com um sufixo próprio, e
   esse sufixo mudou. Compromissos criados antes da atualização passam a parecer
   externos — o sintoma é horário aparecendo como ocupado sem um compromisso
   correspondente no CRM.

Quem administra uma instalação e usa MCP (Claude Desktop e afins) também precisa
reapontar a conexão: o servidor mudou de nome (`deskcomm-crm` → `cloudyx-crm`).
