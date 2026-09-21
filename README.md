# Anki UFF — GPMS & Redes

Aplicativo web de flashcards com **repetição espaçada** (algoritmo SM-2, no estilo do Anki),
gerado a partir dos slides e listas de exercícios de duas disciplinas da UFF.

**412 cartões**, organizados por matéria → aula.

| Matéria | Código | Aulas | Cartões |
|---|---|---|---|
| Gerência de Projetos e Manutenção de Software | TCC00363 | 10 | 177 |
| Redes de Computadores para Sistemas de Informação | TCC00359 | 10 | 235 |

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
js/data-gpms.js       177 cartões de GPMS
js/data-redes.js      235 cartões de Redes
js/sync.js            leitura/escrita do JSON no repositório (API do GitHub)
js/app.js             agendador SM-2, telas e persistência
dados/progresso.json  progresso sincronizado
.nojekyll             desliga o Jekyll no GitHub Pages
```

## Editar ou adicionar cartões

Os cartões ficam em `js/data-gpms.js` e `js/data-redes.js`:

```js
{q:"Pergunta em <b>HTML</b>", a:"Resposta em <b>HTML</b>", t:"Tópico"}
```

O `id` de cada cartão é derivado do **texto da pergunta**, então reordenar cartões ou aulas
preserva o progresso — mas **editar a pergunta** faz o cartão ser tratado como novo
(a resposta pode ser alterada à vontade). Tabelas, `<code>`, `<sup>` e `<br>` funcionam nas respostas.
