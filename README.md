# Eventos de escala

PWA para registrar eventos de escala, enviar os dados em tempo real para a planilha original do Google Sheets e consultar um relatorio mensal por mes.

## O que esta pronto

- formulario com os campos pedidos
- data atual preenchida automaticamente com calendario nativo
- lista de `Presente` mantida na sequencia exata informada
- campo extra quando `Evento = Outros`
- fluxo de `Atraso` com `Tempo` de 1 a 6 e `Valor` calculado em R$ 200,00 por unidade
- calculo automatico de `Devedor Resultado`
- fila offline com reenvio posterior
- botao de relatorio mensal no final do app
- relatorio mensal com opcao de escolher o mes e listar os lancamentos enviados pelo app
- manifest e service worker para uso como PWA
- script do Google Apps Script para gravar na planilha
- arquivo base da planilha para importar como Google Sheets

## Estrutura

- `index.html`: interface principal
- `styles.css`: visual responsivo
- `app.js`: regras do formulario, fila offline e envio
- `config.js`: URL do web app do Apps Script
- `google-apps-script/`: arquivos para o web app do Google Apps Script
- `scripts/build-sheet.mjs`: gera a planilha `.xlsx` base

## Como publicar no GitHub Pages

1. Suba estes arquivos para um repositorio.
2. Ative o GitHub Pages apontando para a branch principal.
3. Acesse a URL publicada e instale o PWA no celular ou computador.

## Como ligar com o Google Sheets

1. Use a planilha original `Eventos de escala - Respostas`.
2. Link da planilha original: `https://docs.google.com/spreadsheets/d/1k2drYJXGy51xWXsClnNLco7aS-RoKLB1zJg5r98Oxik/edit?usp=sharing`
3. Abra `Extensoes > Apps Script` dentro da planilha original.
4. Cole o conteudo de `google-apps-script/Code.gs`.
5. Salve e publique como `Implementar > Novo deployment > Aplicativo da Web`.
6. Em acesso, escolha quem pode usar conforme sua politica interna.
7. Copie a URL do web app publicado da planilha original e cole em `config.js` no campo `endpointUrl`.
8. Depois de publicar uma nova versao do Apps Script, atualize o PWA no GitHub se a URL mudar.
9. Se atualizar a estrutura da planilha original ou os campos enviados, recoloque o `Code.gs` atualizado e publique uma nova versao do web app.

Exemplo:

```js
window.APP_CONFIG = {
  endpointUrl: "https://script.google.com/macros/s/SEU_ID/exec",
  requestTimeoutMs: 15000,
  historyLimit: 10,
};
```

## Desenvolvimento local

O app e estatico. Para testar, basta servir a pasta com qualquer servidor local simples.
