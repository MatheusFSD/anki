# Anki UFF — GPMS, Redes & Projeto

Aplicativo web de flashcards com **repetição espaçada** (algoritmo SM-2, no estilo do Anki),
gerado a partir dos slides e listas de exercícios de três disciplinas da UFF.

**762 cartões**, organizados por matéria → aula. Algumas aulas também têm um **resumo em
linguagem simples**, com exemplos do dia a dia, na aba **Resumos** (veja [abaixo](#resumos-das-aulas)).

| Matéria | Código | Aulas | Cartões | Resumos |
|---|---|---|---|---|
| Gerência de Projetos e Manutenção de Software | TCC00363 | 17 | 358 | Aulas 8 a 14 |
| Redes de Computadores para Sistemas de Informação | TCC00359 | 12 | 256 | 8 aulas (slides) |
| Projeto de Software | TCC00338 | 4 | 148 | 4 (todas as aulas) |

## Como funciona

Cada cartão passa por estágios: **novo → aprendendo → revisão**. Ao responder, você escolhe:

| Botão | Efeito |
|---|---|
| **Errei** | volta ao início do aprendizado (1 min), reduz o fator de facilidade e reaparece nesta mesma sessão |
| **Difícil** | repete o passo (6 min) ou encurta o intervalo em 30% |
| **Bom** | avança um passo (10 min) ou multiplica o intervalo pelo fator de facilidade |
| **Fácil** | gradua direto para 4 dias ou estende o intervalo em 25% |

Passos de aprendizado: **1 min → 10 min → 1 dia → 6 dias → ×EF**.
Um cartão é considerado **maduro** quando o intervalo passa de 21 dias.

No computador dá para usar o teclado: **espaço/enter** revela e responde "Bom"; **1–4** dão a nota; **Esc** sai.

No celular há vibração leve ao responder, e o cartão sai deslizando — para o lado quando você erra,
para cima quando acerta. Quem tiver "reduzir movimento" ligado no sistema recebe a versão sem animações
(`prefers-reduced-motion`).

## Resumos das aulas

Dentro de uma matéria com resumos aparecem duas abas: **Baralhos** (as aulas e seus cartões) e
**Resumos** (a explicação da aula, para ler antes de estudar os cartões).

- Cada aula com resumo mostra o tempo estimado de leitura; na aba Baralhos ela ganha o botão
  **📖 Ler o resumo**
- O texto traz seções numeradas, tabelas e caixas de **exemplo simples** e **para guardar**
- No fim da leitura há um botão para **estudar os cartões daquela aula**
- **Esc** (ou a seta ‹) volta para a matéria, na mesma aba em que você estava
- Matérias sem nenhum resumo escrito não mostram as abas

Hoje há resumos das **aulas 8 a 14 de GPMS**: Git (aula 8), Gerência de Configuração (aulas 9, 10 e 11),
Manutenção de Software (aulas 12 e 13) e a **revisão da aula 14**, que é uma página de perguntas e respostas
com os 20 exercícios resolvidos (os slides trazem só os enunciados; as respostas são resolução própria).

Em **Redes** há resumo das 8 aulas de slides: aulas 1–3, 4–5, 6, 7, 8–10, 11–14, 15 e 16. As duas listas do
Kurose (caps. 1 e 2) e as listas de **Endereçamento** e de **Camada de rede** (exercícios 1 a 13, resolvidos) ficam só como cartões. Os resumos foram escritos a partir do texto dos slides de cada aula.

Em **Projeto de Software** há resumo das 4 aulas: **Arquitetura 1** (requisitos arquiteturais, cenários de
qualidade, ISO 25010, táticas), **Arquitetura 2** (estilos, trade-offs, visões 4+1, ADRs e o
`docs/arquitetura.md`), **SOLID 1** (revisão de OO e UML, SRP e OCP, com código Java) e **Exercícios**, uma
página de perguntas e respostas com os exercícios dos slides resolvidos (delivery, "E se…?", escolha de estilo,
trade-offs, ADR, SRP/OCP). Os slides trazem só os enunciados; as respostas são resolução própria, e o
código do exercício em duplas de SRP + OCP não estava no texto dos slides (usei um exemplo equivalente).
Trechos marcados como **complemento** vêm de pesquisa fora dos slides (ex.: o refinamento do SRP por "ator",
o formato de ADR de Nygard, a ordem de 2011 → 2023 da ISO 25010).

## Progresso (sem banco de dados)

O progresso é gravado em **JSON no `localStorage` do navegador**. Isso funciona sozinho, mas é
**por navegador** — estudar no celular não aparece no PC.

Para o progresso seguir você em qualquer navegador, o app pode **gravar o arquivo
`dados/progresso.json` no próprio repositório**, via API do GitHub.

### Por que precisa de token

O GitHub Pages é hospedagem **estática, somente leitura**: ele entrega arquivos, mas não existe
nada do lado do servidor que aceite uma escrita. Uma página publicada não consegue editar um
arquivo do próprio site — se conseguisse, qualquer visitante também conseguiria. Quem grava,
então, é a **API do GitHub**, que cria um commit — e ela exige autenticação.

### Como ligar

1. Em <https://github.com/settings/personal-access-tokens>, crie um **fine-grained token**:
   - **Repository access**: apenas este repositório
   - **Permissions → Repository permissions → Contents**: `Read and write`
2. No app, **⚙️ → Sincronizar com o GitHub**: preencha `MatheusFSD/anki` e cole o token
3. **Salvar e enviar**

Feito isso, em qualquer navegador basta abrir o app e colar os mesmos dados; ele baixa o
arquivo do repositório ao abrir e envia ao fim de cada sessão.

O token fica **apenas no `localStorage` daquele navegador** — nunca entra nos arquivos publicados.
Ainda assim, é uma credencial: não cole o token em nenhum arquivo do repositório, e revogue-o
em Settings se vazar. Como ele é fine-grained e limitado a um repositório, o estrago máximo é
alguém escrever nesse repositório.

### Como dois aparelhos convivem

Ao abrir e ao enviar, o app **funde** o que está no repositório com o que está no aparelho:

- **cartão presente nos dois** → vence o que foi revisado por último (campo `visto`)
- **cartão só de um lado** → é preservado
- **contagem diária** → fica o maior valor do dia, nunca a soma (assim refundir não infla o histórico)

Se o arquivo mudou no meio do caminho, o envio detecta o conflito, baixa de novo, funde e reenvia —
sem perder o que o outro aparelho fez. Para não gerar um commit por clique, o envio acontece
**ao fim da sessão** (ou 90 s depois da última resposta, ou no botão **Salvar e enviar**).

### Sem token

O app continua funcionando: guarda tudo no `localStorage` e apenas **lê** `dados/progresso.json`
ao abrir. Ou seja, dá para commitar um JSON exportado à mão e qualquer navegador vai lê-lo.

Em **⚙️ Ajustes** ainda há:

- **Exportar JSON** — baixa `anki-uff-progresso-AAAA-MM-DD.json` como backup
- **Importar JSON** — restaura um backup
- Limite de **cartões novos por dia** (10 / 20 / 40 / ∞) e tema **escuro / claro**

> ⚠️ Sem sincronização ligada, limpar os dados do site no navegador apaga o progresso.

## Publicar no GitHub Pages

```bash
cd caminho/para/anki
git init
git add .
git commit -m "Anki UFF: flashcards de GPMS e Redes"
git branch -M main
git remote add origin https://github.com/MatheusFSD/anki.git
git push -u origin main
```

Depois, no repositório: **Settings → Pages → Source: `Deploy from a branch` → `main` / `/ (root)`**.

O site fica em `https://matheusfsd.github.io/anki/` em cerca de um minuto.

No celular, use "Adicionar à tela de início" para abrir em tela cheia como um app.

O arquivo vazio **`.nojekyll`** desliga o processamento por Jekyll que o GitHub Pages faz por
padrão (ele ignora arquivos e pastas começados por `_` ou `.`), fazendo o Pages servir os arquivos
exatamente como estão.

## Visual

Mesma linguagem do [Xeque-Total](https://matheusfsd.github.io/xeque-total/): revista impressa —
papel creme, tinta `#251b10`, bordas de 3px, sombras chapadas sem desfoque que afundam no clique,
e textura de meio-tom. Fontes **Anton** (títulos) e **Oswald** (corpo), do Google Fonts.

Tem modo claro e escuro (⚙️ → Tema). Se as fontes não carregarem (offline), o app cai para a pilha
do sistema e continua funcionando.

## Rodar localmente

Basta abrir o `index.html` no navegador — não há build nem dependências além das fontes.

## Estrutura

```
index.html            estrutura da página
css/style.css         estilos (mobile first, tema claro/escuro)
js/data-gpms.js       358 cartões de GPMS
js/data-redes.js      256 cartões de Redes
js/data-projeto.js    148 cartões de Projeto de Software (Arquitetura, SOLID, exercícios)
js/resumos-gpms.js    resumos em linguagem simples das aulas de GPMS
js/resumos-redes.js   resumos em linguagem simples das aulas de Redes
js/resumos-projeto.js resumos em linguagem simples das aulas de Projeto de Software
js/sync.js            leitura/escrita do JSON no repositório (API do GitHub)
js/app.js             agendador SM-2, telas e persistência
dados/progresso.json  progresso sincronizado
.nojekyll             desliga o Jekyll no GitHub Pages
```

## Editar ou adicionar cartões

Os cartões ficam em `js/data-gpms.js`, `js/data-redes.js` e `js/data-projeto.js`:

```js
{q:"Pergunta em <b>HTML</b>", a:"Resposta em <b>HTML</b>", t:"Tópico"}
```

O `id` de cada cartão é derivado do **texto da pergunta**, então reordenar cartões ou aulas
preserva o progresso — mas **editar a pergunta** faz o cartão ser tratado como novo
(a resposta pode ser alterada à vontade). Tabelas, `<code>`, `<sup>` e `<br>` funcionam nas respostas.

### Adicionar um resumo

Em `js/resumos-gpms.js`, a chave é o `id` da aula em `data-gpms.js` (ex.: `"gpms-a9"`):

```js
"gpms-a9": {
  resumo: "Frase curta que aparece na lista da aba Resumos.",
  html: `<h3>1. Título da seção</h3><p>Texto…</p>
         <div class="ex">Exemplo simples…</div>
         <div class="dica">Algo para guardar…</div>`
}
```

O `html` aceita `<h3>`, `<h4>`, `<p>`, listas, `<table>`, `<code>` e `<pre>`. Dentro de um `<pre>`,
escreva a barra invertida em dobro (`\\`), por causa dos *template literals*. Para outra matéria,
crie um arquivo parecido e ligue-o em `app.js` e no `index.html` do mesmo jeito que `RESUMOS_GPMS`, `RESUMOS_REDES` e `RESUMOS_PROJETO`.
