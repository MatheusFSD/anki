/* GPMS — resumos das aulas, em linguagem simples (aba "Resumos").
   A chave é o id da aula em data-gpms.js.
   html: aceita <h3>, <h4>, <p>, <ul>/<ol>, <table>, <pre>, <code>,
         <div class="ex"> (exemplo simples) e <div class="dica"> (para guardar).
   Dentro de <pre>, barra invertida precisa ser escrita em dobro (\\). */
const RESUMOS_GPMS = {

"gpms-a8": {
  resumo: "Git do zero: repositório, staging area, commit, histórico, ramos, merge com conflito, repositórios remotos (pull, push, clone) e os jeitos de uma equipe usar o Git.",
  html: `
<h3>1. Recapitulando: por que Gerência de Configuração</h3>
<p>A <b>Gerência de Configuração (GC)</b> existe para <b>controlar a evolução</b> do software (Susan Dart, 1991): saber o que mudou, quando, por quem e por quê. Os benefícios (menos retrabalho, memória da organização, trilha de auditoria etc.) estão listados no resumo da Aula 9.</p>
<p>A GC tem história própria:</p>
<table>
<tr><th>Época</th><th>O que acontecia</th></tr>
<tr><td><b>Anos 50</b></td><td>GC para produzir aviões de guerra e naves espaciais</td></tr>
<tr><td><b>Anos 60 e 70</b></td><td>Surge a GC de <b>software</b> (GCS), ainda com foco militar e aeroespacial</td></tr>
<tr><td><b>Anos 80 e 90</b></td><td>Surgem as primeiras <b>normas internacionais</b> (MIL, EIA, IEEE, ISO…) e empresas comuns passam a usar</td></tr>
</table>
<p>Por que controlar <b>versões</b> dos artefatos? Por dois motivos: <b>evolução</b> (o artefato muda com o tempo) e <b>colaboração</b> (várias pessoas mexem nele).</p>
<div class="ex">Trabalho em grupo: a <b>evolução</b> é lembrar como estava o texto na semana passada; a <b>colaboração</b> é três pessoas escreverem no mesmo texto sem uma apagar o que a outra fez. O controle de versões resolve os dois.</div>

<h3>2. Git e GitHub: não são a mesma coisa</h3>
<ul>
<li><b>Git</b>: a ferramenta de controle de versões, que roda na sua máquina.</li>
<li><b>GitHub, GitLab e Bitbucket</b>: serviços que hospedam repositórios Git na internet e acrescentam recursos (issues, pull requests…).</li>
</ul>
<p>Para instalar: no Linux (Debian/Ubuntu) <code>sudo apt install git</code>; no Windows, <b>gitforwindows.org</b>; no Mac, <code>brew install git</code>. Para pedir ajuda: <code>git help</code> (geral) ou <code>git help &lt;comando&gt;</code>.</p>

<h3>3. Configurando o Git</h3>
<p>Antes de tudo, diga ao Git quem você é, para que cada alteração leve o seu nome:</p>
<pre>git config --global user.name
  &lt;seu nome&gt;
git config --global user.email
  &lt;seu email&gt;</pre>
<table>
<tr><th>Nível</th><th>Vale para…</th></tr>
<tr><td><code>--system</code></td><td>o sistema inteiro</td></tr>
<tr><td><code>--global</code></td><td>o usuário logado</td></tr>
<tr><td><code>--local</code></td><td>só o repositório do projeto</td></tr>
</table>
<div class="dica">Se o mesmo item é configurado em mais de um nível, a lista do slide vai do mais geral (<i>system</i>) ao mais específico (<i>local</i>). Na prática, o repositório pode ter uma configuração só dele.</div>

<h3>4. O primeiro commit</h3>
<p>O <b>repositório</b> é o lugar onde ficam as versões e o histórico dos artefatos monitorados. Crie um e veja o estado:</p>
<pre>$ git init suaveintro
$ git status</pre>
<p>Se você criar o arquivo <code>programa.py</code>, o <code>git status</code> mostra que ele é <b>não rastreado</b>: está só no <b>espaço de trabalho</b>, ainda não tem versão no repositório.</p>
<p>Para guardar a primeira versão, o arquivo passa por três lugares:</p>
<pre> espaço de trabalho
      | git add
      v
 staging area
      | git commit
      v
 repositório</pre>
<ul>
<li><b>Staging area</b>: a “bandeja” dos arquivos que você pretende enviar. <code>git add programa.py</code> coloca o arquivo nela: ainda não está no repositório, mas está pronto.</li>
<li><b>Commit</b>: <code>git commit -m "mensagem"</code> envia o que está na bandeja para o repositório, criando uma versão.</li>
</ul>
<div class="ex">Pense em despachar uma encomenda: o arquivo na sua mesa é o espaço de trabalho; colocar na caixa é o <code>add</code>; fechar a caixa e levar ao correio, com uma etiqueta descrevendo o conteúdo, é o <code>commit -m</code>.</div>

<h3>5. Versões e histórico</h3>
<h4>Como cada ferramenta numera os commits</h4>
<table>
<tr><th>Ferramenta</th><th>Identificador do commit</th></tr>
<tr><td>CVS</td><td>número sequencial <b>por arquivo</b></td></tr>
<tr><td>Subversion</td><td>número sequencial <b>por repositório</b></td></tr>
<tr><td>Git e Mercurial</td><td>um <b>hash</b></td></tr>
</table>
<h4>Olhando o histórico</h4>
<ul>
<li><code>git log</code>: histórico do repositório local (com <code>--graph</code> ele desenha os ramos).</li>
<li><code>git show</code>: mostra um commit.</li>
<li><code>git diff</code>: compara o espaço de trabalho com a staging area ou com uma versão do repositório.</li>
</ul>
<pre>print("hello")      &lt;- versão 1
print("world")      &lt;- trocou
$ git add .
$ git commit -m
  "adiciona palavra world"
$ git log --graph</pre>
<h4>Apelidos e rótulos</h4>
<ul>
<li><b>HEAD</b>: a versão base do seu espaço de trabalho (“onde você está”).</li>
<li><b>master</b> ou <b>main</b>: o ramo principal.</li>
<li><b>Tags</b>: rótulos em versões especiais. <code>git tag</code> lista; <code>git tag v1.0</code> cria sobre o HEAD (ou sobre um commit informado); <code>git tag -d v1.0</code> remove.</li>
</ul>
<p>Os três tipos de versão (revisão, variante e cooperação) já foram vistos na Aula 9; a Aula 8 os usa para explicar por que um repositório precisa de ramos.</p>

<h3>6. Ramos e merge</h3>
<p>Um <b>ramo</b> é uma linha de desenvolvimento paralela. Para que servem (corrigir bug sem mexer na principal, separar projetos, manter versões alternativas, colaborar) está no resumo da Aula 10. Os comandos:</p>
<table>
<tr><th>Comando</th><th>O que faz</th></tr>
<tr><td><code>git branch --all -v</code></td><td>lista os ramos</td></tr>
<tr><td><code>git branch &lt;nome&gt;</code></td><td>cria um ramo a partir do HEAD</td></tr>
<tr><td><code>git branch -d &lt;nome&gt;</code></td><td>remove um ramo</td></tr>
<tr><td><code>git checkout &lt;ramo ou commit&gt;</code></td><td>troca a versão base do espaço de trabalho</td></tr>
<tr><td><code>git merge &lt;ramo&gt;</code></td><td>combina um ramo com o ramo corrente</td></tr>
</table>
<h4>Quando o merge dá conflito</h4>
<p>Se os dois ramos mudaram o mesmo trecho, o Git não sabe qual vale e <b>marca o arquivo</b>:</p>
<pre>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
print("hello world!")
=======
palavras = ["hello",
            "world"]
print(" ".join(palavras))
&gt;&gt;&gt;&gt;&gt;&gt;&gt; palavras</pre>
<p>Acima do <code>=======</code> está a versão do ramo em que você está (HEAD); abaixo, a do ramo que você está trazendo. Você <b>edita o arquivo</b>, apaga as marcas e deixa o resultado que quer; depois faz <code>git add</code> do arquivo e <code>git commit -m "Merge entre master e palavras"</code>.</p>
<div class="ex">Dois colegas reescreveram a mesma frase de um trabalho, cada um do seu jeito. O Git mostra as duas versões lado a lado e pede: “decidam”. Quem resolve é uma pessoa.</div>

<h3>7. Repositórios remotos</h3>
<p>Até aqui tudo estava na sua máquina. Para compartilhar, usa-se um <b>repositório remoto</b> (por exemplo, no GitHub).</p>
<table>
<tr><th>Comando</th><th>O que faz</th></tr>
<tr><td><code>git remote -v</code></td><td>lista os remotos cadastrados</td></tr>
<tr><td><code>git remote add &lt;nome&gt; &lt;url&gt;</code></td><td>cadastra um remoto</td></tr>
<tr><td><code>git remote remove &lt;nome&gt;</code></td><td>remove um remoto</td></tr>
<tr><td><code>git pull</code></td><td>atualiza o seu repositório local e o espaço de trabalho com o que está no remoto</td></tr>
<tr><td><code>git push</code></td><td>envia o seu repositório local para o remoto</td></tr>
<tr><td><code>git clone &lt;url&gt;</code></td><td>cria um repositório local copiando o histórico do remoto e define o <b>origin</b> como remoto</td></tr>
</table>
<div class="dica">Guarde a direção: <b>pull</b> traz, <b>push</b> leva, <b>clone</b> é a primeira cópia inteira. Também existem interfaces gráficas, como o SourceTree, que fazem tudo isso com cliques.</div>

<h3>8. Um pouco de história e as formas de usar o Git</h3>
<table>
<tr><th>Época</th><th>Tipo</th><th>Exemplos</th></tr>
<tr><td>Anos 70/80</td><td>Sistemas <b>locais</b></td><td>SCCS (1972), RCS (1982)</td></tr>
<tr><td>Anos 80/90</td><td><b>Cliente-servidor</b></td><td>CVS (1986), Subversion (2000)</td></tr>
<tr><td>Anos 2000</td><td><b>Peer-to-peer</b></td><td>Git (2005), Mercurial (2005)</td></tr>
</table>
<p>Mesmo sendo peer-to-peer, as equipes costumam combinar um <b>workflow</b> conforme o projeto:</p>
<ul>
<li><b>Individual</b>: só você usa o repositório.</li>
<li><b>Cliente-servidor</b>: todos enviam para um repositório central.</li>
<li><b>Gerente de integração</b> (fork + pull request): cada um trabalha na sua cópia e pede para o gerente integrar. Exemplo: github.com/nodejs/node.</li>
<li><b>Ditador/tenentes</b> (pull request em cascata): os pedidos passam por uma hierarquia até chegar ao responsável final. Exemplo: github.com/torvalds/linux.</li>
</ul>

<h3>9. Para o trabalho (Rodada 1)</h3>
<p>A Rodada 1 (Planejamento) pede:</p>
<ol>
<li><b>Documento de Visão</b> do produto.</li>
<li><b>Escopo do produto</b> (requisitos) e <b>escopo do projeto</b> (EAP).</li>
<li><b>Papéis</b> definidos no grupo.</li>
<li><b>Estimativas de esforço</b> (Planning Poker sobre os pacotes de trabalho da EAP).</li>
<li><b>Custo, orçamento e cronograma</b> (Gantt).</li>
<li><b>Análise de riscos completa</b>: listagem, probabilidade × impacto, priorização por exposição, planos de contenção e de contingência.</li>
<li><b>Dados de monitoramento e controle</b> já disponíveis: burndown dentro de cada iteração e Análise de Valor Agregado ao final de cada uma.</li>
<li><b>Demonstração (v1)</b> da versão parcial do produto.</li>
</ol>
`
},

"gpms-a9": {
  resumo: "O que é GC, os 5 processos, controle de versões (tipos, topologias, armazenamento, colaboração) e controle de modificações — com exemplos do dia a dia.",
  html: `
<h3>1. A ideia central</h3>
<p>Software muda o tempo todo: aparece um bug, o cliente pede uma tela nova, a lei muda. A <b>Gerência de Configuração (GC)</b> é a disciplina que <b>controla essa evolução</b>, para que ninguém perca trabalho, todos saibam <b>o que mudou, quando, por quem e por quê</b>, e a versão entregue seja confiável.</p>
<p>A definição clássica é de <b>Susan Dart (1991)</b>: “disciplina para o controle da evolução de sistemas de software”. Ela é mais forte no <b>desenvolvimento</b> e na <b>liberação</b>, e vai perdendo força na implantação e na produção.</p>
<div class="ex">Sabe aquele trabalho em grupo com <code>trabalho_final.docx</code>, <code>trabalho_final_v2.docx</code> e <code>trabalho_final_AGORA_vai.docx</code>? Ninguém sabe qual é a certa, e quando duas pessoas editam a mesma cópia, uma sobrescreve a outra. A GC existe para acabar com essa bagunça.</div>

<h4>O que a GC faz, em 4 verbos</h4>
<ol>
<li><b>Identifica</b> e documenta o que vai ser controlado (cada artefato).</li>
<li><b>Controla</b> as alterações feitas nesses artefatos.</li>
<li><b>Guarda e relata</b> o que foi alterado e em que estágio está.</li>
<li><b>Verifica</b> se o resultado atende ao que foi especificado.</li>
</ol>

<h4>Por que vale a pena</h4>
<ul>
<li>Mais produtividade, menos retrabalho e menos erros.</li>
<li>Mais disciplina no processo de desenvolvimento.</li>
<li><b>Memória da organização</b>: o conhecimento fica no repositório, não só na cabeça de quem saiu da empresa.</li>
<li>Dados para medir o processo (por exemplo, o esforço gasto).</li>
<li><b>Trilha de auditoria</b>: dá para saber por que, quando e por quem um artefato foi alterado.</li>
<li>Ajuda quem gerencia o projeto e garante um ambiente estável para desenvolver.</li>
</ul>

<h3>2. Onde ficam os artefatos: o repositório</h3>
<p>Toda metodologia de engenharia de software faz a mesma coisa: pega um artefato (requisito, modelo, código…), melhora e devolve melhorado. Esses artefatos precisam morar em algum lugar seguro: o <b>repositório</b>.</p>
<ul>
<li>Permite <b>guardar, buscar e recuperar</b> versões.</li>
<li>É o <b>ponto de referência</b>: “a versão oficial está lá”.</li>
<li>Aumenta a <b>memória organizacional</b>.</li>
</ul>
<div class="ex">O repositório do seu trabalho no GitHub: lá estão o código, o cronograma, o burndown… e o histórico de cada alteração.</div>

<h3>3. As três peças de um sistema de GC</h3>
<table>
<tr><th>Peça</th><th>O que faz</th><th>Exemplo hoje</th></tr>
<tr><td><b>Controle de modificações</b></td><td>Recebe e organiza os <b>pedidos</b> de mudança</td><td>GitHub Issues, Jira</td></tr>
<tr><td><b>Controle de versões</b></td><td>Guarda os artefatos e o <b>histórico</b> de cada um</td><td>Git</td></tr>
<tr><td><b>Construção e release</b></td><td>Transforma os artefatos no <b>produto pronto</b> para entrega</td><td>Make, Maven, MSBuild</td></tr>
</table>
<div class="ex">App de delivery de pizza.<br>(1) O cliente pede “quero pagar com Pix” → vira uma <b>solicitação</b> (controle de modificações).<br>(2) Uma pessoa programa a mudança e a nova versão do código é guardada (controle de versões).<br>(3) O build gera o app novo e ele é entregue (construção e release).<br>(4) Os usuários usam e pedem novas melhorias… e o ciclo recomeça.</div>
<p>O artigo de Dart organiza isso em camadas: os <b>sistemas</b> são as ferramentas (as três peças acima), os <b>processos</b> são as atividades (os cinco da seção 4) e o <b>espaço de trabalho</b> é o ambiente de desenvolvimento onde tudo acontece.</p>

<h4>Três pontos de vista (perspectivas)</h4>
<ul>
<li><b>Integração</b>: quem olha o ambiente de desenvolvimento <b>completo</b>, com todas as ferramentas juntas.</li>
<li><b>Gerencial</b>: quem acompanha o <b>processo e as mudanças</b> (“quantos pedidos estão pendentes?”).</li>
<li><b>Desenvolvimento</b>: o <b>desenvolvedor individual</b>, com sua cópia de trabalho e suas versões.</li>
</ul>

<h3>4. Os cinco processos de GC</h3>
<table>
<tr><th>Processo</th><th>A pergunta que responde</th></tr>
<tr><td><b>Identificação</b></td><td>O que vamos controlar e como vamos chamar cada coisa?</td></tr>
<tr><td><b>Controle</b></td><td>Esta mudança pode ser feita? Quem aprova?</td></tr>
<tr><td><b>Contabilização (relato)</b></td><td>Qual é a situação de cada item agora?</td></tr>
<tr><td><b>Auditoria / avaliação</b></td><td>Foi feito do jeito certo?</td></tr>
<tr><td><b>Liberação</b></td><td>Qual conjunto de versões vira a entrega oficial?</td></tr>
</table>

<h4>Identificação: escolher o que controlar</h4>
<p>Aqui se define o que é um <b>Item de Configuração (IC)</b>: qualquer pedaço de hardware ou software que será controlado <b>como uma coisa só</b>. Pode ser produto do projeto ou de processo: plano de GC, requisitos, modelos, código-fonte… Também se define o <b>esquema de nomes e números</b> (por exemplo, <code>v1.2.0</code>), para identificar cada IC sem ambiguidade, e como descrevê-lo, física e funcionalmente.</p>
<p>Um ponto importante é a <b>granularidade</b>: o tamanho da peça controlada. Pode ser um sistema inteiro (grossa), um arquivo (média) ou uma linha (fina). Quanto mais fina, mais detalhe você tem — e mais ferramenta precisa para dar conta.</p>
<div class="ex">Controlar a “pasta do projeto inteira” como uma coisa só é granularidade grossa. O Git controla cada arquivo e enxerga cada linha de texto dentro dele: granularidade fina.</div>

<h4>Controle: mudar com ordem</h4>
<ol>
<li><b>Solicitar</b> a alteração.</li>
<li><b>Analisar</b> o pedido. Se for <b>aprovado</b>, o responsável implementa e submete o resultado à análise. Se <b>não</b> for, o item volta a ficar liberado para que outras pessoas possam pedir alterações.</li>
<li><b>Implementar</b> a alteração.</li>
<li><b>Verificar</b> o item alterado.</li>
</ol>

<h4>Contabilização (relato): manter todos informados</h4>
<p>Registra e reporta a situação dos itens para quem precisa saber: <b>quem mudou</b> o item, <b>quem está mudando</b> agora, <b>quando</b>, <b>o que será afetado</b> e <b>por quê</b>. A informação precisa estar à mão rapidamente.</p>
<div class="ex">No GitHub, a aba <b>Commits</b> mostra quem mudou o quê e quando, e a aba <b>Issues</b> mostra o que está aberto ou fechado.</div>

<h4>Auditoria: conferir se foi feito direito</h4>
<p>Visa garantir que as alterações foram implementadas corretamente. Hoje isso é, em boa parte, automático:</p>
<ul>
<li><b>CI/CD</b> (Jenkins, GitHub Actions): um robô roda verificações a cada alteração.</li>
<li><b>Infraestrutura como código</b> (Terraform, Ansible): a “configuração” passou a incluir também os servidores e sua conformidade.</li>
<li><b>Segurança</b>: procurar vulnerabilidades no código e nas dependências.</li>
<li><b>Regulatória</b> (compliance) e outras necessidades do projeto.</li>
</ul>
<div class="ex">Você dá um <code>push</code> e um robô do GitHub Actions roda os testes. Se falhar, a alteração não passa. Isso já é uma auditoria automática.</div>

<h4>Liberação: montar e entregar a versão oficial</h4>
<p>Controla a entrega do produto e da documentação. O conceito central é o <b>baseline</b>: uma “foto oficial” de quais itens, em quais versões, compõem a entrega.</p>
<ul>
<li><b>Criar o baseline</b>: identificar os ICs e suas versões, descrever o baseline e as <b>diferenças</b> em relação aos anteriores.</li>
<li><b>Entregar o baseline</b>: selecionar, <b>empacotar</b> e entregar a quem vai receber.</li>
</ul>

<h3>5. Controle de versões</h3>
<h4>O que é uma “versão”? Três sabores</h4>
<table>
<tr><th>Tipo</th><th>Ideia</th><th>Exemplo simples</th></tr>
<tr><td><b>Revisão</b></td><td>Uma versão evolui a partir da outra e a anterior é <b>descontinuada</b></td><td>As gerações do iMac (1998–2013). Ou: o relatório v1 virou v2 e ninguém mais usa a v1</td></tr>
<tr><td><b>Variante</b></td><td>Versões que existem <b>ao mesmo tempo</b>, com variações paralelas</td><td>Honda Civic <i>hatchback</i>, <i>sedan</i> e <i>coupe</i>. Ou: o mesmo app em Android e iOS</td></tr>
<tr><td><b>Cooperação</b> (rascunho)</td><td>Partindo de uma <b>base comum</b>, cada um faz sua mudança para <b>juntar depois</b></td><td>João põe óculos, Maria põe barba e Pedro põe cartola no mesmo desenho; depois juntam tudo</td></tr>
</table>

<h4>O que é versionado</h4>
<p>Diretórios e arquivos. Um <b>arquivo de texto</b> (como código) é visto como uma lista de <b>linhas</b>: o sistema entende o que mudou e consegue juntar mudanças. Um <b>arquivo binário</b> (imagem, <code>.docx</code>, <code>.pdf</code>) é uma caixa-preta: o sistema nem tenta entender o que há dentro e <b>não faz diff nem merge</b>.</p>
<div class="dica">Prefira texto (código, Markdown) a binários sempre que puder. Dois colegas que mexem no mesmo <code>.docx</code> ao mesmo tempo vão precisar juntar as mudanças na mão.</div>

<h4>Para que servem as versões</h4>
<ul>
<li><b>Sincronizar equipes</b>: todo mundo parte do mesmo ponto.</li>
<li><b>Reproduzir configurações passadas</b>: “o bug só acontece na v1.2? Vou voltar a ela”.</li>
<li><b>Explorar possibilidades</b>: testar uma ideia sem medo de estragar o que funciona.</li>
<li><b>Segregar desenvolvedores</b>: cada um trabalha isolado.</li>
<li><b>Customizar produtos</b> (Linha de Produto de Software, LPS): variações do mesmo produto.</li>
<li><b>Rastrear a introdução de bugs</b> (<i>bisect</i>): se funcionava na segunda e quebrou na sexta, testa-se a quarta; depois a terça ou a quinta… até achar a alteração culpada.</li>
<li><b>Entender a evolução do software</b> (MSR, <i>Mining Software Repositories</i>): minerar o histórico para estudar como o software mudou.</li>
<li><b>Auditar mudanças</b> (<i>annotate</i>; no Git, <code>git blame</code>): ver quem escreveu cada linha.</li>
</ul>

<h4>Topologias: um servidor ou vários repositórios?</h4>
<table>
<tr><th></th><th>Centralizada</th><th>Distribuída</th></tr>
<tr><td><b>Repositórios</b></td><td>Um só, no servidor; cada pessoa tem apenas uma cópia de trabalho</td><td>Um repositório completo para cada desenvolvedor, com área de trabalho acoplada</td></tr>
<tr><td><b>Commit e update</b></td><td>Acontecem entre cliente e <b>servidor</b></td><td>Acontecem <b>localmente</b>; <i>push</i> e <i>pull</i> sincronizam</td></tr>
<tr><td><b>Exemplo</b></td><td>SVN</td><td>Git</td></tr>
</table>
<div class="ex">Centralizada é uma biblioteca com um único exemplar do livro. Distribuída é cada aluno ter uma cópia completa do livro: anota o que quiser em casa e, depois, combina as anotações com as dos colegas.</div>

<h4>Armazenamento: como guardar 100 versões de um arquivo?</h4>
<p><b>Completo</b>: guarda uma cópia inteira de cada versão. Recuperar é rápido, mas ocupa muito espaço. <b>Por diferenças (deltas)</b>: guarda só “o que mudou”, e qualquer versão é refeita aplicando os deltas sobre uma versão base. Ocupa pouco, mas dá trabalho (processamento) para reconstruir.</p>
<div class="ex">Um arquivo de 1.000 linhas em que cada versão muda 5 linhas. Com 100 versões, o armazenamento completo guarda 100 × 1.000 = <b>100.000</b> linhas; com deltas, cerca de 1.000 + 99 × 5 ≈ <b>1.500</b>.</div>
<pre>Completo  [v1] [v2] [v3]
Forward   [v1] d1-&gt;2 d2-&gt;3
Reverse   d2-&gt;1 d3-&gt;2 [v3]
In-line   blocos + ponteiros</pre>
<p>Lendo o desenho: <code>[v1]</code> é uma versão inteira e <code>d1-&gt;2</code> é o delta que leva da v1 à v2. No forward, a v3 sai de v1 + dois deltas; no reverse, a v1 sai de v3 + dois deltas.</p>
<ul>
<li><b>Forward</b>: guarda a <b>primeira</b> versão inteira e os deltas para frente. Guardar uma versão nova é barato (só calcula o último delta), mas a versão mais <b>recente</b> exige reconstrução.</li>
<li><b>Reverse</b>: guarda a <b>última</b> versão inteira e os deltas para trás. A versão mais recente (a mais usada) vem pronta; as <b>antigas</b> exigem reconstrução.</li>
<li><b>In-line</b>: elimina dados repetidos na hora de guardar, trocando-os por <b>ponteiros</b> para blocos já existentes. Economiza espaço, mas gasta mais processamento para detectar as repetições.</li>
</ul>

<h4>Colaboração: e se duas pessoas mexerem no mesmo arquivo?</h4>
<table>
<tr><th>Controle</th><th>Como funciona</th><th>Prós e contras</th></tr>
<tr><td><b>Pessimista</b></td><td>Só <b>um</b> desenvolvedor edita o item por vez (ele é “travado”)</td><td>✅ zero custo de junção<br>❌ nenhum paralelismo</td></tr>
<tr><td><b>Otimista</b></td><td><b>Vários</b> editam ao mesmo tempo e juntam depois</td><td>✅ paralelismo<br>❌ junção custosa em itens complexos (ex.: binários)</td></tr>
<tr><td><b>Otimista com percepção</b></td><td>Como o otimista, mas todos <b>veem quem está mexendo</b> no item</td><td>⚖️ bom equilíbrio entre os dois</td></tr>
</table>
<div class="ex"><b>Pessimista</b>: uma única chave da sala; quem está com ela edita e os outros esperam (Visual SourceSafe).<br><b>Otimista</b>: cada um edita a sua cópia e depois junta (Git).<br><b>Com percepção</b>: o Google Docs, em que dá para ver o cursor colorido de quem está editando.</div>

<h4>Consulta: perguntando ao histórico</h4>
<ul>
<li><b>Por artefato</b>: “mostre as versões do arquivo X” (ex.: Arquivo 5 → versões 1, 2 e 4).</li>
<li><b>Por modificação</b>: “o que mudou naquela alteração?” (ex.: Modificação 4 → arquivos 2, 5 e 7).</li>
</ul>
<p>Cada modificação gera uma nova versão do repositório inteiro (versão 0, 1, 2…). Dentro dela, só alguns arquivos mudam; os outros continuam na versão que já tinham.</p>
<div class="ex">No Git, o histórico de um arquivo (<code>git log arquivo</code>) é a consulta por artefato; ver o que um commit mudou (<code>git show</code>) é a consulta por modificação.</div>

<h3>6. Controle de modificações</h3>
<p>Primeiro, uma distinção: a <b>gestão de mudança</b> (nível organizacional) decide <b>se</b> a mudança deve acontecer; o <b>controle de modificações</b> (nível técnico) <b>executa</b> a mudança nos artefatos, se ela for aprovada.</p>

<h4>As 7 atividades, com um exemplo</h4>
<p>Voltando à pizzaria: o cliente quer pagar com Pix.</p>
<ol>
<li><b>Solicitação</b>: o pedido é registrado (uma <i>issue</i>). Pode pedir manutenção <b>corretiva</b> (consertar bug), <b>evolutiva</b> (função nova — é o caso do Pix), <b>adaptativa</b> (adaptar a um novo ambiente) ou <b>preventiva</b> (evitar problemas futuros).</li>
<li><b>Classificação</b>: define a prioridade em relação aos outros pedidos (críticos, fatais, não fatais, cosméticos). O critério deve estar no plano de GC.</li>
<li><b>Análise de impacto</b>: estima esforço, cronograma e custo e propõe como implementar (“2 semanas, mexe em 3 módulos”). Se não há chance de aprovação, pode rejeitar logo, poupando custo.</li>
<li><b>Avaliação</b>: o <b>Comitê de Controle da Configuração (CCC)</b> decide, com base no laudo da análise: <b>implementar, rejeitar ou postergar</b>.</li>
<li><b>Implementação</b>: se aprovado, alguém programa, seguido de <b>testes de unidade</b>.</li>
<li><b>Verificação</b>: confere se ficou como a proposta da análise, com <b>testes de sistema</b>.</li>
<li><b>Atualização da baseline</b>: nasce uma nova baseline; ela pode ou não ser liberada ao cliente, conforme a importância e questões de marketing.</li>
</ol>
<p>Durante todas as etapas, a <b>contabilização</b> vai registrando o que acontece (seção 8).</p>

<h4>Testes que aparecem aqui</h4>
<ul>
<li><b>Tipos</b>: funcionalidade, usabilidade, performance, segurança.</li>
<li><b>Níveis</b>: unidade, integração, sistema, aceitação (visão do cliente).</li>
<li><b>Técnicas</b>: funcional (<i>black-box</i>: só olha entradas e saídas) e estrutural (<i>white-box</i>: olha o código por dentro).</li>
</ul>

<h4>Por que as mudanças acontecem</h4>
<ul>
<li>Novos negócios ou condições de mercado mudam requisitos e regras de negócio.</li>
<li>Novas necessidades dos interessados (dados, funcionalidades, serviços).</li>
<li>Reorganização, crescimento ou redução da empresa mudam prioridades e equipe.</li>
<li>Restrições de orçamento ou de planejamento redefinem o produto.</li>
<li>Manutenção corretiva (defeitos) e preventiva (evitar problemas).</li>
</ul>

<h4>Dois casos especiais</h4>
<p><b>Correção emergencial.</b> Quando o sistema caiu, não dá para esperar o processo formal: pode-se criar um ramo e corrigir direto. Mas esse ramo precisa ser <b>unido à linha principal</b> depois, e esse procedimento deve estar escrito no processo.</p>
<p><b>Defeitos.</b> Corrigir um bug é tratar o <b>sintoma</b>. A <b>análise de causa</b> busca por que ele nasceu (falta de treinamento, padrão ruim, ferramenta inadequada) para evitar os próximos.</p>
<div class="ex">O app caiu na hora do almoço: a pessoa corrige no ramo de emergência, sem formulário nenhum, e depois o fix é unido à principal. Na reunião seguinte, a equipe descobre que o bug veio de um teste que ninguém rodava e passa a rodá-lo automaticamente. Isso é análise de causa.</div>

<h3>7. Baseline: a “foto oficial”</h3>
<p>Uma <b>baseline</b> é uma configuração <b>revisada e aprovada</b> que serve de base para a próxima etapa e <b>só pode ser alterada por um processo formal</b>. Costuma ser criada no fim de cada fase: análise (<i>functional</i>), projeto (<i>allocated</i>) e implementação (<i>product</i>).</p>
<table>
<tr><th>Antes da baseline</th><th>Depois da baseline</th></tr>
<tr><td>Informal</td><td>Formal</td></tr>
<tr><td>Sem requisição, aprovação ou verificação</td><td>Com requisição, aprovação e verificação</td></tr>
<tr><td>Ágil e ad-hoc</td><td>Burocrático, planejado e controlado</td></tr>
</table>
<div class="ex">Trabalho da faculdade: antes de enviar, você edita livremente (pré-baseline). Depois de enviado ao professor, qualquer mudança exige pedir e justificar (pós-baseline).</div>
<p>O desafio é <b>quando</b> criar a baseline: cedo demais gera burocracia; tarde demais gera bagunça. É um equilíbrio entre controle e burocracia.</p>

<h3>8. Contabilização: o histórico vira informação</h3>
<p>Guarda as informações geradas pelas outras funções e permite consultá-las: <b>estado atual</b> de cada item (liberado, em alteração, bloqueado), <b>histórico</b> de versões, pedidos de mudança (abertos, aprovados, rejeitados, pendentes), <b>quem fez o quê e quando</b>, <b>o que compõe cada baseline</b> e os resultados das auditorias.</p>
<p>Com esses dados dá para responder perguntas de gestão:</p>
<ul>
<li>Quantos pedidos são rejeitados e por quê?</li>
<li>Quais artefatos mudam mais? (pode indicar requisitos instáveis)</li>
<li>Quanto tempo leva do pedido até a aprovação?</li>
<li>Quais fases geram mais retrabalho?</li>
<li>Qual deve ser o custo de projetos futuros?</li>
</ul>
<div class="ex">Se um módulo parecido teve 30 mudanças no projeto passado, você já sabe que este provavelmente também vai dar trabalho de manutenção e pode reservar tempo para isso. O <b>Bugzilla</b> é um exemplo de ferramenta que mostra esses números em lista e em gráfico.</div>

<h3>9. Ferramentas</h3>
<table>
<tr><th></th><th>Controle de modificações</th><th>Construção e liberação</th></tr>
<tr><td><b>Livres</b></td><td>Bugzilla, Mantis, Redmine, Trac, GitLab (parcialmente)</td><td>Ant, NAnt, Make, Maven, Rake</td></tr>
<tr><td><b>Comerciais</b></td><td>GitHub, GitLab, ClearQuest, JIRA, Synergy/Change, TeamTrack, Azure DevOps Server</td><td>ClearMake, MSBuild, Synergy/CM Object Make</td></tr>
</table>

<h3>10. Para o trabalho (Rodada 2)</h3>
<p>A Rodada 2 (Execução e Configuração) deve apresentar:</p>
<ol>
<li>O <b>controle de versões</b> usado (ex.: Git) e a <b>estratégia de ramificação</b> adotada.</li>
<li>O <b>controle de modificações</b> (ex.: GitHub Issues), com o <b>endereço do repositório</b>, que deve ter <b>todos os artefatos</b> produzidos até agora.</li>
<li>Os dados de monitoramento e controle atualizados (<b>burndown</b> e <b>EVM</b> acumulados).</li>
<li>Escopo, cronograma e riscos atualizados, se mudaram desde a Rodada 1, <b>com justificativa</b>.</li>
<li>Uma <b>demonstração (v2)</b> da versão parcial do produto.</li>
</ol>
<div class="dica">Na aula foi mostrada a aba <b>Insights → Pulse</b> dos repositórios da turma (commits, PRs e issues da semana). Repositório parado aparece nesse painel. Commite com frequência e ligue cada alteração a uma issue.</div>
`
},

"gpms-a10": {
  resumo: "Ramos, as 8 estratégias de ramificação, merges (2-way × 3-way), diff e patch, e os cenários Klapaucius (cascata) e Rosebud (GitFlow).",
  html: `
<h3>1. Onde estamos</h3>
<p>Na aula anterior vimos <b>o que é uma versão</b> e como o controle de versões guarda o histórico. Agora a pergunta é: <b>como organizar versões que andam em paralelo?</b> A resposta são os <b>ramos (branches)</b> e as <b>estratégias de ramificação</b>.</p>
<p>A aula também revisou as três peças de um sistema de GC — <b>controle de versões</b>, <b>controle de modificações</b> (com os 7 passos que estão no resumo da Aula 9) e <b>construção e release</b>.</p>

<h3>2. O que é um ramo (branch)</h3>
<p>Um <b>ramo</b> é uma linha de desenvolvimento paralela, que se afasta da principal. Ele dá <b>isolamento</b>: você trabalha à vontade sem atrapalhar os outros nem quebrar o que já funciona. Normalmente, depois, o ramo é <b>unido de volta</b> à linha principal (merge) — e quanto mais tempo ele ficou isolado, mais complicada é essa união.</p>
<pre>main     *-------------*----&gt;
          \\           /
bugfix      *----*----*</pre>
<div class="ex">Você tem o caderno oficial da turma. Antes de mexer, tira uma cópia da página, rabisca nela (o ramo) e, se ficou bom, copia de volta para o caderno oficial (o merge).</div>

<h4>Ramo × espaço de trabalho</h4>
<table>
<tr><th></th><th>Ramo</th><th>Espaço de trabalho</th></tr>
<tr><td><b>Quem vê</b></td><td>Compartilhado com outras pessoas</td><td>Isolado, só seu</td></tr>
<tr><td><b>Onde mora</b></td><td>No servidor</td><td>No seu computador (cliente)</td></tr>
<tr><td><b>Duração</b></td><td>Histórico: fica registrado</td><td>Momentâneo</td></tr>
</table>

<h4>Para que usar ramos</h4>
<ul>
<li><b>Corrigir bugs e implementar funcionalidades</b> sem mexer na principal.</li>
<li><b>Separar projetos</b>: um ramo <i>site</i> ao lado do código principal.</li>
<li><b>Manter versões alternativas</b>: Sedan e Hatchback, com mudanças comuns <b>propagadas</b> entre eles.</li>
<li><b>Suportar versões antigas</b>: ramos 1.x e 2.x continuam recebendo correções enquanto a principal avança.</li>
<li><b>Colaborar</b>: um ramo por pessoa (<i>maria</i>, <i>pedro</i>), que depois voltam para a principal.</li>
<li><b>Colaborar com as cópias de cada um</b>: ramos como <i>maria/master</i> e <i>pedro/master</i>, que acompanham o trabalho de cada colega.</li>
</ul>

<h3>3. Estratégias de ramificação</h3>
<p>Uma estratégia é um <b>combinado de equipe</b> sobre quando abrir ramos, como nomeá-los e para onde eles voltam. Não existe a melhor: cada uma tem um <b>foco</b> (para que situação serve) e uma <b>dificuldade</b> (o preço que se paga).</p>

<h4>Sequencial (manutenção em série)</h4>
<p>O <b>ramo principal</b> concentra toda a evolução. Só nascem ramos pequenos e pontuais para <b>corrigir bugs de uma release específica</b>; as correções voltam para a principal. É considerada a <b>estratégia básica</b>.</p>
<ul>
<li><b>Foco</b>: desenvolvimento in-house, um único ambiente rodando, cliente único (ex.: aplicações Web).</li>
<li><b>Dificuldade</b>: manter várias liberações em paralelo.</li>
</ul>
<div class="ex">O site da padaria do bairro: só existe a versão que está no ar. Apareceu um bug? Abre-se um ramo curto, corrige-se e volta para a principal.</div>

<h4>Cascata (releases paralelas)</h4>
<p>Cada <b>versão do produto</b> é um ramo. A nova geração nasce quando a anterior já está <b>estabilizando</b>, e as correções “descem” de uma versão para as seguintes.</p>
<ul>
<li><b>Foco</b>: propagar correções. Um bug corrigido na 1.0 precisa ser levado (<i>cherry-pick</i>) para a Rel. 2. É o modelo clássico de produtos em que clientes diferentes rodam versões diferentes.</li>
<li><b>Dificuldade</b>: quanto mais versões ativas, mais trabalho de sincronização.</li>
</ul>
<div class="ex">O Ubuntu mantém várias versões ao mesmo tempo (20.04, 22.04, 24.04). Uma falha de segurança achada em uma delas costuma existir nas outras, então a correção tem de ser levada a cada versão. <i>Cherry-pick</i> é pegar <b>só aquele commit</b> e aplicá-lo em outro ramo.</div>

<h4>Por desenvolvedor</h4>
<p>Cada pessoa tem sua <b>branch pessoal</b>. A principal só recebe algo quando a pessoa <b>sincroniza (push/pull)</b>. O merge vai nos dois sentidos: você puxa o que os colegas fizeram e depois empurra o seu.</p>
<ul>
<li><b>Foco</b>: isolar o trabalho individual e separar os ambientes de desenvolvimento.</li>
<li><b>Dificuldade</b>: maior chance de conflito de merge (<i>integration hell</i>).</li>
</ul>
<div class="ex">Dois colegas editam o mesmo trabalho, cada um na sua cópia, por duas semanas. Na hora de juntar, descobrem que mexeram nos mesmos trechos.</div>

<h4>Por subsistema</h4>
<p>Existe uma <b>hierarquia de ramos</b>: <b>módulos</b> se integram a <b>subsistemas</b>, que se integram ao <b>produto</b>.</p>
<ul>
<li><b>Foco</b>: projetos grandes, com componentes semi-independentes e equipes diferentes cuidando de cada parte.</li>
<li><b>Dificuldade</b>: uma mudança num módulo de “baixo nível” leva várias etapas até chegar ao produto.</li>
</ul>
<div class="ex">Num app de banco, a equipe do Pix entrega o módulo ao subsistema de pagamentos, que entrega ao app final. Um ajuste pequeno no módulo precisa subir dois degraus antes de chegar ao usuário. (O slide ilustra com um avião.)</div>

<h4>Por solicitação (modificação)</h4>
<p>O <b>ramo principal fica estável</b>. Cada solicitação de mudança (<i>issue</i>, ticket) ganha <b>seu próprio ramo</b>.</p>
<ul>
<li><b>Foco</b>: rastreabilidade total — toda alteração no código tem um ticket, bug report ou requisito correspondente.</li>
<li><b>Dificuldade</b>: muitos ramos abertos ao mesmo tempo geram conflitos de merge e ramos “abandonados”.</li>
</ul>
<div class="ex">A issue nº 12 diz “botão de salvar não funciona”. Você cria o ramo <code>issue-12</code>, corrige, abre um pull request que cita a issue e, ao concluir, a issue é fechada.</div>

<h4>Por customização (release por cliente)</h4>
<p>A <b>principal</b> (a linha de produto) evolui com funcionalidades genéricas e lança <b>versões base</b> (1.0, 2.0, 3.0). A partir delas, cada cliente tem um <b>ramo de customização</b> com seus ajustes.</p>
<ul>
<li><b>Foco</b>: ter um produto base compartilhado, com variações sob demanda.</li>
<li><b>Dificuldade</b>: os ramos dos clientes <b>divergem</b> da base com o tempo, pois cada um acumula um “delta” próprio, e fica difícil receber as evoluções novas.</li>
</ul>
<div class="ex">Um sistema de gestão vendido a vários clientes: o banco A pede um campo extra, a rede B pede outro relatório. Cada um fica com seu ramo. É o caso de produtos como os da SAP, mostrados no slide.</div>

<h4>GitFlow</h4>
<p>Modelo de Vincent Driessen (2010) para times com <b>ciclos de release bem definidos</b>.</p>
<table>
<tr><th>Ramo</th><th>Nasce de</th><th>Volta para</th><th>Para quê</th></tr>
<tr><td><b>main</b> (master)</td><td>—</td><td>—</td><td>Sempre <b>estável</b>, pronta para produção; cada versão ganha uma tag</td></tr>
<tr><td><b>develop</b></td><td>main</td><td>—</td><td>Integração contínua do trabalho em andamento</td></tr>
<tr><td><b>feature</b></td><td>develop</td><td>develop</td><td>Uma funcionalidade; ramo curto</td></tr>
<tr><td><b>release</b></td><td>develop</td><td>main e develop</td><td>Estabilizar a versão antes de ir para a main</td></tr>
<tr><td><b>hotfix</b></td><td>main</td><td>main e develop</td><td>Correção urgente em produção</td></tr>
</table>
<ul>
<li><b>Foco</b>: times com ciclos de release bem definidos.</li>
<li><b>Dificuldade</b>: pressupõe <b>uma única versão em produção por vez</b> e exige mais disciplina.</li>
</ul>
<div class="ex">Pense num restaurante. A <b>main</b> é o salão (o que o cliente come). A <b>develop</b> é a cozinha de testes. Cada prato novo em teste é uma <b>feature</b>. O ensaio do cardápio novo é a <b>release</b>. E acertar o sal de um prato que já está no salão, sem esperar o cardápio novo, é o <b>hotfix</b>.</div>

<h4>GitHub Flow</h4>
<p>Só existe <b>um ramo principal</b> (main), sempre “deployável”. Todo trabalho novo ganha um <b>ramo (ou fork)</b> a partir dela. <b>Não há</b> develop nem release.</p>
<ol>
<li>Cria um ramo a partir da main.</li>
<li>Faz commits.</li>
<li>Abre um <b>pull request</b>: a equipe revisa e a CI roda os testes.</li>
<li>Faz o <b>merge</b> na main; ela já pode ir para produção.</li>
</ol>
<ul>
<li><b>Foco</b>: simplicidade e velocidade; <b>deploy contínuo</b>.</li>
<li><b>Dificuldade</b>: exige maturidade em <b>testes automatizados e CI</b>.</li>
</ul>

<h4>Versão com fork</h4>
<p>Quando você <b>não</b> tem acesso de escrita ao repositório principal (típico de projetos abertos), o fluxo ganha um passo: <b>fork</b> (a sua cópia no servidor) → <b>clone local</b> → (ramo opcional) → <b>push</b> para o seu fork, onde roda a CI → <b>pull request</b> para o repositório principal. De vez em quando você faz <b>pull</b> do principal para não ficar defasado.</p>
<div class="dica">No PDF, esse slide aparece com o título “Subsistema”, mas o desenho é o do fluxo de fork e pull request, associado ao SaaS.</div>

<h4>As 8 estratégias lado a lado</h4>
<table>
<tr><th>Estratégia</th><th>Ideia em uma linha</th><th>Dificuldade</th></tr>
<tr><td><b>Sequencial</b></td><td>Principal evolui; ramos curtos só para corrigir releases</td><td>Várias liberações em paralelo</td></tr>
<tr><td><b>Cascata</b></td><td>Um ramo por versão do produto</td><td>Sincronizar correções entre versões</td></tr>
<tr><td><b>Desenvolvedor</b></td><td>Um ramo por pessoa</td><td>Conflitos de merge</td></tr>
<tr><td><b>Subsistema</b></td><td>Módulos → subsistemas → produto</td><td>Mudança demora a chegar ao produto</td></tr>
<tr><td><b>Solicitação</b></td><td>Um ramo por ticket</td><td>Muitos ramos abertos e abandonados</td></tr>
<tr><td><b>Customização</b></td><td>Um ramo por cliente</td><td>Ramos divergem da base</td></tr>
<tr><td><b>GitFlow</b></td><td>main + develop + feature/release/hotfix</td><td>Uma só versão em produção; disciplina</td></tr>
<tr><td><b>GitHub Flow</b></td><td>Só a main, com ramos curtos e pull requests</td><td>Exige testes e CI maduros</td></tr>
</table>

<h3>4. Mudança de paradigma: pacote × serviço</h3>
<p>O melhor jeito de ramificar depende de <b>como o software chega ao usuário</b>.</p>
<table>
<tr><th>Software empacotado (COTS)</th><th>Software como serviço (SaaS)</th></tr>
<tr><td>Versões mais <b>estáveis</b>, com vida longa na casa do cliente</td><td>Uma única versão rodando, a sua, com <b>deploy automatizado e reversível</b></td></tr>
<tr><td><b>Propagação manual</b> e correção explícita (cherry-pick para cada versão)</td><td>Boa <b>cobertura de testes</b> (integração, sistema…) para integrar o tempo todo</td></tr>
<tr><td>Integração como <b>um evento</b>, em momentos definidos</td><td>Cada merge pode ir para produção (como no GitHub Flow)</td></tr>
<tr><td>Ênfase em <b>controle e rastreabilidade</b></td><td>—</td></tr>
</table>
<div class="ex">Se você instala o software com um pendrive (Cenário 1, mais abaixo), não consegue consertar todos os clientes de uma vez: precisa manter ramos de versões antigas e levar cada correção até eles. Num site que só você hospeda, basta corrigir uma vez, fazer o deploy e, se der errado, reverter.</div>
<div class="dica">Dica do slide: <b>tem que fazer sentido para o projeto</b>. Não existe estratégia certa em abstrato.</div>

<h3>5. Juntando o trabalho: merge e conflito</h3>
<h4>Quando dá tudo certo</h4>
<div class="ex">No desenho da aula, João põe <b>óculos</b>, Maria acrescenta a <b>barba</b> e Pedro põe a <b>cartola</b>. Cada um parte da última versão e mexe num ponto diferente, então tudo se acumula: o rosto final tem óculos, barba e cartola. Sem conflito.</div>

<h4>Quando dá conflito</h4>
<p>O <b>conflito</b> acontece quando <b>duas pessoas alteram o mesmo ponto de jeitos diferentes</b>: João e Paulo mudam os óculos, cada um à sua maneira. A ferramenta não sabe qual vale, e <b>uma pessoa precisa decidir</b> o resultado.</p>
<div class="dica">Quanto mais tempo um ramo fica aberto sem sincronizar com a principal, mais linhas serão modificadas dos dois lados e <b>mais conflitos</b> aparecem. Por isso: ramos curtos e sincronizações frequentes.</div>

<h4>2-way × 3-way merge</h4>
<p>O <b>2-way merge</b> compara só as <b>duas versões</b> a serem unidas. Ele não sabe quem mudou o quê.</p>
<table>
<tr><th>Lado A</th><th>Lado B</th><th>O problema</th></tr>
<tr><td><code>ABC</code><br><code>DEF</code><br><code>GHI</code></td><td><code>JKL</code><br><code>DEF</code></td><td>Linha 1: <b>ABC ou JKL?</b><br>Linha 3: <code>GHI</code> foi <b>acrescentada</b> por A ou <b>apagada</b> por B?</td></tr>
</table>
<p>O <b>3-way merge</b> olha também o <b>ancestral comum</b>, e aí fica claro quem alterou o quê:</p>
<table>
<tr><th>Ancestral</th><th>Lado A</th><th>Lado B</th><th>Resultado</th></tr>
<tr><td><code>JKL</code><br><code>DEF</code><br><code>GHI</code></td><td><code>ABC</code><br><code>DEF</code><br><code>GHI</code></td><td><code>JKL</code><br><code>DEF</code></td><td><code>ABC</code><br><code>DEF</code></td></tr>
</table>
<p>A trocou <code>JKL</code> por <code>ABC</code>; B apagou <code>GHI</code>. Como cada um mexeu num ponto diferente, o resultado sai sozinho. A regra é simples: <b>se só um lado mudou um trecho, vale a mudança dele</b>; se <b>os dois</b> mudaram o mesmo trecho de forma diferente, é <b>conflito</b>.</p>
<p>Para resolver conflitos você pode usar o <b>merge editor do VS Code</b> (mostra <i>Current</i>, <i>Incoming</i> e o <i>Result</i>) ou um cliente gráfico como o <b>GitKraken</b>.</p>

<h3>6. Diff e patch</h3>
<p>Duas operações que ajudam a <b>guardar, transferir e compreender versões</b>:</p>
<ul>
<li><b>Diff</b>: a <b>diferença</b> entre duas versões (o que entrou e o que saiu).</li>
<li><b>Patch</b>: <b>aplicar</b> um diff a uma versão para obter a outra.</li>
</ul>
<div class="ex">No desenho da aula, a versão com barba comparada com a versão com cartola dá o diff “<b>+ cartola, − barba</b>”. Aplicando esse patch na versão com barba, você chega à versão com cartola. Em texto:</div>
<pre>- cafe com leite
+ cafe preto</pre>
<p>É essa visão que o GitHub mostra no pull request, na aba <i>Files changed</i>.</p>

<h3>7. GitPaper: os dois cenários resolvidos</h3>
<p>Na dinâmica, cada pessoa recebeu um papel com uma ação do Git (<b>commit, branch, merge, hotfix, release, deploy</b>) e colou no quadro no evento certo, montando o diagrama. Dá para refazer sozinho: leia o evento e diga qual ação ele representa.</p>

<h4>Cenário 1 — Klapaucius (folha de pagamento): Cascata</h4>
<p>Um sistema de folha de pagamento para mais de 40 hospitais. Cada unidade instala o sistema <b>nos próprios servidores</b> (via pendrive) e só atualiza quando o contrato prevê. Time de 8 pessoas, uma release por quadrimestre.</p>
<table>
<tr><th>Quando</th><th>O que aconteceu</th><th>Ação no Git</th></tr>
<tr><td>Janeiro</td><td>Kickoff: “projeto iniciado”</td><td><b>commit</b> inicial na main</td></tr>
<tr><td>Abril</td><td>Versão 1.0 pronta; ninguém commita nela enquanto testa</td><td><b>branch</b> <code>rel/1.0</code> (congela o estado)</td></tr>
<tr><td>Maio</td><td>“Aprovado para produção”; instaladores nos pendrives</td><td><b>release/deploy</b> da v1.0</td></tr>
<tr><td>Junho</td><td>INSS calculado errado; o pagamento sai hoje</td><td><b>hotfix</b> na <code>rel/1.0</code>, depois <b>merge → main</b></td></tr>
<tr><td>Julho</td><td>Começa a 2.0, mas parte dos clientes segue na 1.0</td><td>commits na main + <b>branch</b> <code>rel/2.0</code></td></tr>
<tr><td>Outubro</td><td>2.0 aprovada; 18 unidades seguem na 1.0</td><td><b>release/deploy</b> da v2.0; <b>merges</b> de <code>rel/1.0</code> e <code>rel/2.0</code> → main</td></tr>
</table>
<p><b>Por que cascata?</b> Os clientes rodam versões diferentes ao mesmo tempo, então cada release vira um ramo que continua vivo recebendo correções. <b>O preço</b>: quanto mais versões ativas, mais trabalho para sincronizar as correções.</p>
<div class="ex">O hotfix do INSS foi feito no ramo da 1.0 e não na main porque a main já tinha código <b>instável</b> da 2.0. Corrigir a partir dela levaria código não testado para quem está em produção.</div>

<h4>Cenário 2 — Rosebud (app de gestão de projetos): GitFlow</h4>
<p>Uma startup com deploy <b>a cada quinzena</b> e equipe que cresce de 4 a 15 pessoas. A regra da CTO: <b>ninguém commita direto no que vai para produção</b>, e todo trabalho novo entra primeiro num lugar só.</p>
<table>
<tr><th>Quando</th><th>O que aconteceu</th><th>Ação no Git</th></tr>
<tr><td>Semana 1</td><td>Regra: nada direto em produção; trabalho novo entra num lugar só</td><td><b>commit</b> inicial na main + ramo <b>develop</b></td></tr>
<tr><td>Semana 3</td><td>Painel de relatórios: vai demorar e quebrar coisas</td><td><b>branch</b> <code>feature/painel</code> a partir da develop</td></tr>
<tr><td>Duas semanas depois</td><td>Pull request revisado, testado e aprovado</td><td><b>merge</b> da feature na develop</td></tr>
<tr><td>Fim do mês</td><td>Hora de preparar a 2.0, sem parar o time nem aceitar features novas nos testes</td><td><b>branch</b> <code>release/2.0</code> a partir da develop</td></tr>
<tr><td>Terça, 14h32</td><td>Produção caiu: ninguém consegue fazer login</td><td><b>hotfix</b>: ramo <code>hotfix/login</code> a partir da main (a produção é a 1.x)</td></tr>
<tr><td>Quinta, 11h17</td><td>Bug corrigido; 2.0 passou nos testes finais; sobe hoje</td><td>hotfix → <b>main e develop</b>; release → develop e <b>main</b> com tag v2.0 (<b>deploy</b>)</td></tr>
</table>
<p><b>Por que GitFlow?</b> Há uma única versão em produção, ciclos de release definidos e um papel claro para cada ramo. O hotfix chegou à produção em 40 minutos e a develop não precisou parar.</p>
<div class="dica">Comparando os hotfixes: na <b>cascata</b>, a correção nasce no ramo da release em produção e precisa ser levada às outras versões mantidas; no <b>GitFlow</b>, ela nasce da main (a única versão em produção) e volta para main e develop.</div>

<h3>8. Para o trabalho (Rodada 2)</h3>
<p>Os itens exigidos na Rodada 2 estão no resumo da Aula 9. Para a parte da <b>estratégia de ramificação</b>, pergunte-se:</p>
<ul>
<li>Quantas versões vão estar em uso ao mesmo tempo? (uma só → Sequencial ou GitHub Flow; várias → Cascata)</li>
<li>Há clientes com ajustes próprios? (Customização)</li>
<li>Quantas pessoas trabalham em paralelo, e em partes bem separadas? (Desenvolvedor, Subsistema)</li>
<li>Você precisa ligar cada alteração a um ticket? (Solicitação, usando as Issues)</li>
<li>O time tem testes automatizados e CI? (GitHub Flow) Há ciclos de release definidos? (GitFlow)</li>
</ul>
<div class="dica">A dica do slide vale aqui: <b>tem que fazer sentido para o projeto!</b> Escolha a estratégia mais simples que resolva o seu caso e justifique a escolha na apresentação.</div>
`
},

"gpms-a11": {
  resumo: "A última parte do caminho: colocar em produção. DevOps, release × configuração, integração contínua, entrega × deployment contínuo, como escolher a estratégia de ramificação, commits, pull requests, code review e milestones.",
  html: `
<h3>1. Onde estamos no projeto</h3>
<p>Já temos processo, requisitos, projeto e arquitetura, testes com boa cobertura e gerenciamento. Falta a <b>última parte: colocar em produção</b>, ou seja, <b>implantar o sistema</b>. Porque, como diz o slide, “para agregar valor, alguém tem que usar!”.</p>

<h3>2. Dev × Ops e o DevOps</h3>
<p>Antigamente havia dois grupos separados, quase sem conversa:</p>
<table>
<tr><th>Dev</th><th>Ops</th></tr>
<tr><td>Departamento de Sistemas / Desenvolvimento: desenvolvedores, programadores, analistas, arquitetos</td><td>Departamento de Suporte / Operações: administradores de rede e de bancos de dados, técnicos de suporte e de infraestrutura</td></tr>
</table>
<div class="ex">O programa funciona no computador do desenvolvedor. Quando vai para o servidor, quebra. O Dev diz “o problema é o seu servidor”; o Ops responde “o problema é o seu código”. Esse é o <b>jogo de empurra</b>.</div>
<p>A ideia central do <b>DevOps</b> é <b>aproximar Dev e Ops</b>, com dois objetivos:</p>
<ol>
<li><b>Passagem de bastão bem-sucedida</b>: a implantação começa o quanto antes e é automatizada.</li>
<li><b>Acabar com o jogo de empurra</b>.</li>
</ol>
<div class="dica">DevOps <b>não</b> é um profissional novo que faz tudo. É uma <b>aproximação</b> entre desenvolvimento e operações para a implantação ser mais ágil e menos traumática.</div>
<table>
<tr><th>Princípios</th><th>Práticas</th></tr>
<tr><td>Aproximar Devs e Ops desde o início<br>Adotar princípios ágeis na implantação<br>Transformar implantações em um <b>não-evento</b><br>Implantar (partes do) sistema <b>todos os dias</b><br>Automatizar a implantação</td><td>Controle de versões<br>Integração contínua<br>Estratégias de branch<br>Deployment contínuo<br>Feature flags</td></tr>
</table>
<h4>6 recomendações para automatizar a implantação</h4>
<ol>
<li>Crie um processo <b>repetível e confiável</b> de entrega.</li>
<li><b>Automatize</b> tudo que for possível.</li>
<li>Mantenha tudo em <b>controle de versões</b>.</li>
<li>Se um passo causa dor, <b>faça-o com mais frequência</b> e o quanto antes.</li>
<li><b>Concluído</b> significa <b>pronto para entrega</b>.</li>
<li><b>Todos</b> são responsáveis pela entrega.</li>
</ol>
<div class="ex">Se subir uma versão é um sufoco, a tentação é fazer isso o mínimo possível. A regra 4 manda o contrário: suba toda hora. Subir todo dia obriga a automatizar, e com o processo automático a dor some.</div>

<h3>3. Releases</h3>
<p>O <b>gerenciamento de releases</b> é a descrição de <b>como construir, liberar e entregar</b> o sistema. Ela existe em linguagem natural (conhecimento) e em linguagem computacional (automação), fica sob gerência de configuração e define quando o processo pode ser desviado temporariamente.</p>
<div class="dica">Cuidado com releases curtas demais: a necessidade de lançar rápido, somada a testes manuais e equipe pequena, deixa a cobertura de testes baixa. Isso gera defeitos no produto final, que geram pedidos de correção, que pedem novas releases… um <b>círculo vicioso</b>.</div>
<h4>Configuração × release</h4>
<table>
<tr><th></th><th>Configuração</th><th>Release</th></tr>
<tr><td><b>O que é</b></td><td>conjunto de versões de ICs, com <b>uma versão por IC</b></td><td>uma configuração que passou por <b>processo adicional</b></td></tr>
<tr><td><b>Exemplo</b></td><td>login v2.3, relatórios v1.7, banco v45, autenticação v3.1.2</td><td>essa mesma configuração, depois de testada, aprovada e entregue como “v2.0”</td></tr>
<tr><td><b>Traz</b></td><td>um retrato coerente do sistema</td><td>intenção de entrega, verificação formal, identidade pública e compromisso de suporte</td></tr>
</table>
<p>Quando a configuração passa em todos os testes e está pronta para o cliente, ela vira um <b>Release Candidate</b>. Se aprovada, recebe um nome (“v2.0”) e é entregue a alguém de fora da equipe: aí sim é uma <b>release</b>.</p>

<h3>4. Integração contínua (CI)</h3>
<p>Segundo Martin Fowler, o único pré-requisito para um desenvolvedor lançar suas alterações na versão principal é <b>conseguir executar perfeitamente o código</b>, passando pelos testes do build. O fluxo: atualiza a cópia de trabalho, resolve conflitos, gera o build na máquina local; se passar, libera.</p>
<p>Antigamente eram comuns as <b>feature branches</b> longas. Depois de uns 40 dias isolada, a branch voltava e dava o <b>integration hell</b>: conflitos por todo lado.</p>
<div class="ex">Cada colega escreve um capítulo do trabalho por 40 dias, sem ler o do outro. Na hora de juntar, os capítulos se contradizem e cada um usa um estilo. Se juntassem todo dia, os problemas apareceriam pequenos.</div>
<p><b>Integração Contínua</b>: os membros da equipe <b>integram o trabalho com frequência</b> (em geral, pelo menos uma vez por dia) e <b>cada integração é verificada por um build automatizado, com testes</b>, para achar erros de integração o mais cedo possível. É uma prática do <b>XP</b>. Não há consenso sobre a frequência, mas a maioria dos autores recomenda <b>pelo menos 1 vez por dia</b>. Pode incluir build automatizado, testes automatizados e programação em pares.</p>
<p>No <b>GitHub Actions</b> você configura o fluxo; ele roda a cada alteração e gera um <b>log</b>. Passou? Pode confirmar. Falhou? Leia o log, corrija e tente de novo antes de integrar.</p>

<h3>5. Entrega × deployment contínuo</h3>
<table>
<tr><th></th><th>Entrega contínua</th><th>Deployment contínuo</th></tr>
<tr><td><b>Todo commit…</b></td><td><b>pode</b> entrar em produção imediatamente</td><td>que chega no master <b>entra</b> em produção, em questão de horas</td></tr>
<tr><td><b>Quem decide?</b></td><td>uma <b>autoridade externa</b> decide quando liberar aos usuários</td><td>ninguém precisa decidir: é automático</td></tr>
</table>
<p>Para fixar: <b>deployment</b> é liberar uma versão para os <b>usuários</b>; <b>delivery</b> é liberar uma versão para ser <b>objeto de deployment</b>. Em ambos, os desenvolvedores programam como se tudo fosse para produção.</p>
<h4>Ciclos de release reais</h4>
<ul>
<li><b>Chrome</b>: uma release a cada <b>4 semanas</b>.</li>
<li><b>Facebook (Android)</b>: a cada <b>8 semanas</b>, no estudo citado.</li>
<li><b>Eclipse</b>: <b>uma por ano</b> até 2019.</li>
</ul>

<h3>6. Como escolher a estratégia de ramificação</h3>
<p>As estratégias estão no resumo da Aula 10. Quatro perguntas ajudam a escolher:</p>
<ol>
<li>Quantas <b>versões</b> precisam estar em produção ao mesmo tempo?</li>
<li>Com que <b>frequência</b> o software deve chegar ao usuário?</li>
<li>Qual a <b>maturidade, tamanho e organização</b> do time?</li>
<li>Qual o <b>perfil de risco e de regulamentação</b> do projeto?</li>
</ol>
<div class="dica">Tem que <b>fazer sentido para o projeto</b>. As mesmas perguntas servem para justificar a escolha na Rodada 2.</div>

<h3>7. Controle de modificações no GitHub</h3>
<p>As 7 atividades do controle de modificações (solicitação, classificação, análise de impacto, avaliação, implementação, verificação, atualização da baseline) estão no resumo da Aula 9. Aqui elas ganham ferramentas do GitHub.</p>
<h4>Mensagem de commit</h4>
<p>O slide sugere o modelo:</p>
<pre>&lt;tipo&gt; [issue]: &lt;descrição&gt;</pre>
<ul>
<li><b>Tipo</b>: fix, feat, build, ci, refactor, test…</li>
<li><b>Issue</b>: o número da issue no GitHub.</li>
<li><b>Descrição</b>: no presente do imperativo, em inglês. Teste: “If this commit is accepted, it will <i>Implement fizzbuzz</i>”.</li>
</ul>
<div class="ex">fix [#12]: handle empty cart on checkout<br>feat [#15]: add Pix payment</div>
<h4>Pull request (verificação da modificação)</h4>
<p>O <b>pull request</b> serve para a mudança ser <b>inspecionada antes de ser integrada</b>. Pode ser criado de duas formas: pela forma completa, selecionando a versão para comparar, ou a partir de um <b>push recente</b>. Um pull request <b>é uma issue</b>, dá para ver o que mudou (o que entrou e o que saiu) e, na atualização da baseline, a issue é <b>fechada</b>.</p>
<h4>Code review: quem revisa o código?</h4>
<table>
<tr><th>#</th><th>Estratégia</th></tr>
<tr><td>1</td><td>Sem revisão</td></tr>
<tr><td>2</td><td>Humanos revisam tudo</td></tr>
<tr><td>3</td><td>IAs revisam tudo</td></tr>
<tr><td>4</td><td>Humanos revisam as revisões feitas por IA</td></tr>
<tr><td>5</td><td><b>Triagem por impacto</b>: baixo risco sem revisão humana; alto risco, com</td></tr>
<tr><td>6</td><td>Revisar <b>plano, testes e esquema do banco</b>, não a implementação (olhar o “antes” e o “depois”)</td></tr>
<tr><td>7</td><td><b>Produzir menos código</b>: PRs menores, mais fáceis de revisar</td></tr>
</table>
<p>Antes de decidir, o slide manda lembrar <b>por que</b> revisamos código.</p>
<h4>Contabilização: milestones</h4>
<p>Os <b>milestones</b> do GitHub agrupam issues em torno de um marco. Você cria o milestone, marca as issues que pertencem a ele e a lista mostra o andamento. Alimentam o <b>monitoramento e controle</b> do projeto.</p>
<div class="ex">Um milestone por iteração: “Sprint 1”. As issues marcadas nele são o que se compromete a entregar. Quantas já foram fechadas diz como a iteração anda.</div>

<h3>8. Para o trabalho e a próxima aula</h3>
<p>Os itens da Rodada 2 estão no resumo da Aula 9. A <b>próxima aula é de dúvidas sobre a Rodada 2</b>.</p>
`
},

"gpms-a12": {
  resumo: "Por que a manutenção custa tanto, o que ela é, as 8 Leis de Lehman, manutenibilidade e os tipos de manutenção (emergencial, corretiva, preventiva, adaptativa, perfectiva), com exemplos e o papel da IA.",
  html: `
<h3>1. Por que falar de manutenção</h3>
<p>Perguntas do início da aula: por quanto tempo uma equipe tem que manter o que já existe? Que casos famosos vêm à cabeça (sistemas que pararam, vazaram dados ou custaram milhões)? Quanto do trabalho de um dev é código novo?</p>
<table>
<tr><th>Número</th><th>Fonte</th></tr>
<tr><td><b>90%</b> do custo total do software é manutenção</td><td>Erlikh (2000)</td></tr>
<tr><td><b>60%</b> do esforço total</td><td>Pressman (1997)</td></tr>
<tr><td><b>US$ 70 bi</b> por ano nos EUA</td><td>Edelstein (1993)</td></tr>
<tr><td><b>250 bilhões</b> de linhas de código em manutenção</td><td>Sommerville (2000)</td></tr>
</table>
<h4>E a dívida técnica?</h4>
<ul>
<li><b>42%</b> do tempo dos desenvolvedores vai para dívida técnica e código ruim: 13,5 h + 3,8 h de uma semana de cerca de 41 h (Stripe/Harris Poll, 2018).</li>
<li><b>US$ 2,41 tri</b>: custo estimado da baixa qualidade de software nos EUA.</li>
<li><b>US$ 1,52 tri</b>: dívida técnica acumulada nos EUA, o maior obstáculo para mudar código existente (CISQ, 2022).</li>
</ul>
<div class="ex">Dívida técnica é como não lavar a louça: no começo, economiza tempo; com o tempo, a pia fica tão cheia que cozinhar leva o dobro. O “juro” é o tempo extra a cada mudança no código.</div>
<div class="dica">Só <b>21%</b> do esforço de manutenção vai para <b>corrigir erros</b> (Bennett e Rajlich, 2000). Mesmo um sistema de qualidade precisa de manutenção: novas leis, novos requisitos, ficar mais fácil de entender e manter.</div>

<h3>2. O que é manutenção de software</h3>
<p>É o processo de <b>modificar o software depois de entregue</b> para corrigir falhas, melhorar desempenho ou outros atributos, ou adaptá-lo a mudanças no ambiente (IEEE; ISO/IEC 14764). Vai além de corrigir bug: inclui entender código, implementar funcionalidades, refatorar e modernizar linguagens e bibliotecas.</p>
<div class="ex">Um carro não para de precisar de cuidado depois que sai da loja: troca de óleo (corretiva/preventiva), mudança para um novo combustível exigido por lei (adaptativa), som novo (perfectiva). Software que não evolui <b>perde valor</b> porque o mundo, os usuários e as dependências mudam.</div>
<p>Manutenção é uma <b>disciplina</b> da Engenharia de Software, com normas (IEEE 1219, de 1993 e substituída em 2010; ISO/IEC 14764, atualizada em 2006), com processo (pedido de modificação, análise, implementação, testes, entrega) e com tópicos próprios: compreensão de código, refatoração, engenharia reversa, reengenharia, dívida técnica e gerência de configuração.</p>
<h4>Linha do tempo</h4>
<table>
<tr><th>Ano</th><th>Marco</th></tr>
<tr><td>1968</td><td>Conferência da OTAN: “engenharia de software” e “crise do software”</td></tr>
<tr><td>1974</td><td>Lehman formula a 1ª lei da evolução (até 1996, serão 8)</td></tr>
<tr><td>1976</td><td>Swanson: corretiva, adaptativa e perfectiva</td></tr>
<tr><td>1978–80</td><td>Lientz e Swanson: survey com 487 organizações mostra o peso da manutenção</td></tr>
<tr><td>1993</td><td>IEEE 1219; depois ISO/IEC 14764 (1999 e 2006), com 4 tipos</td></tr>
<tr><td>1999–2000</td><td>Refactoring (Fowler) e o bug do milênio (Y2K)</td></tr>
<tr><td>2009+</td><td>DevOps, integração e entrega contínuas</td></tr>
<tr><td>2022+</td><td>LLMs, assistentes e agentes de código na manutenção</td></tr>
</table>

<h3>3. As Leis de Lehman (da evolução do software)</h3>
<table>
<tr><th>#</th><th>Lei</th><th>Em palavras simples</th></tr>
<tr><td>1</td><td><b>Mudança contínua</b> (1974)</td><td>Se não for adaptado, o software fica cada vez menos satisfatório. Ex.: o app do banco precisa acompanhar o Pix.</td></tr>
<tr><td>2</td><td><b>Complexidade crescente</b> (1974)</td><td>Cada remendo emaranha o código; se ninguém reduzir, só piora.</td></tr>
<tr><td>3</td><td><b>Autorregulação</b> (1974)</td><td>A evolução tem um ritmo estável; as métricas de release ficam em torno de tendências.</td></tr>
<tr><td>4</td><td><b>Conservação da estabilidade organizacional</b> (1978)</td><td>A taxa de trabalho efetiva fica quase constante, <b>independente do número de pessoas</b>. Lembra a Lei de Brooks.</td></tr>
<tr><td>5</td><td><b>Conservação da familiaridade</b> (1978)</td><td>Todos precisam dominar o sistema, então cada release muda só um pouco.</td></tr>
<tr><td>6</td><td><b>Crescimento contínuo</b> (1991)</td><td>Tem que ganhar funções para manter os usuários satisfeitos.</td></tr>
<tr><td>7</td><td><b>Qualidade em declínio</b> (1996)</td><td>Software que não recebe as mudanças necessárias se deprecia.</td></tr>
<tr><td>8</td><td><b>Sistema de feedback</b> (1996)</td><td>A evolução é um sistema de feedback com vários laços e vários agentes.</td></tr>
</table>
<p>Ligando as leis: a <b>mudança contínua</b> provoca <b>crescimento contínuo</b> e <b>complexidade crescente</b>; a complexidade, se ninguém cuida, provoca <b>declínio da qualidade</b> — e tudo isso afeta a <b>satisfação dos usuários</b>.</p>

<h3>4. Manutenibilidade</h3>
<p>Você pode passar mais tempo <b>lendo</b> código do que escrevendo, e mais tempo corrigindo do que criando. Por isso a manutenção também é uma <b>qualidade do software</b>: a <b>manutenibilidade</b> é o grau de eficácia e eficiência com que o software pode ser <b>modificado, corrigido ou aprimorado</b> (família ISO 25000). Suas subcaracterísticas respondem a perguntas simples:</p>
<table>
<tr><th>Subcaracterística</th><th>Pergunta</th></tr>
<tr><td><b>Modularidade</b></td><td>Tem interfaces bem definidas?</td></tr>
<tr><td><b>Reusabilidade</b></td><td>É fácil de reusar?</td></tr>
<tr><td><b>Analisabilidade</b></td><td>É fácil de entender?</td></tr>
<tr><td><b>Modificabilidade</b></td><td>É fácil de modificar?</td></tr>
<tr><td><b>Testabilidade</b></td><td>É fácil de testar?</td></tr>
</table>
<h4>Quando começa a manutenção?</h4>
<p><b>Depois da primeira release, tudo passa a ser manutenção</b>. “Programmers are constantly in maintenance mode” (The Pragmatic Programmer). Na prática, desenvolvimento, release e manutenção se <b>sobrepõem</b>: enquanto a versão 1 está em manutenção, a 2 está em desenvolvimento.</p>

<h3>5. Os tipos de manutenção</h3>
<pre>Manutenção
 |-- Correção
 |    |-- Emergencial
 |    |-- Corretiva
 |    '-- Preventiva
 '-- Evolução
      |-- Adaptativa
      '-- Perfectiva</pre>
<table>
<tr><th>Tipo</th><th>Característica</th><th>Exemplo simples</th></tr>
<tr><td><b>Emergencial</b></td><td>Não programada; mantém o sistema funcionando <b>temporariamente</b>; exige uma corretiva depois</td><td>O login caiu: um remendo rápido para voltar ao ar</td></tr>
<tr><td><b>Corretiva</b></td><td><b>Reativa</b>; corrige o problema reportado e faz o software voltar a atender aos requisitos</td><td>O remendo é substituído pela correção de verdade</td></tr>
<tr><td><b>Preventiva</b></td><td><b>Pró-ativa</b>; corrige problemas <b>latentes</b></td><td>Discord: o banco escolhido em 2017 passou a falhar com trilhões de mensagens</td></tr>
<tr><td><b>Adaptativa</b></td><td>Mantém o software usável após mudanças no <b>ambiente</b></td><td>CNPJ alfanumérico da Receita Federal</td></tr>
<tr><td><b>Perfectiva</b> (evolutiva)</td><td>Provê melhorias ao usuário e melhora atributos de qualidade</td><td>Adicionar exportação em PDF a pedido do cliente</td></tr>
</table>
<div class="dica">Quanto mais sucesso um software faz, mais bugs ele tende a ter: mais usuários, mais usos, mais pedidos.</div>

<h3>6. Manutenção com IA</h3>
<p>O primeiro prompt do ChatGPT (nov. 2022) foi corrigir um bug, e um survey com 132 engenheiros da Anthropic (ago. 2025) mostra várias tarefas ligadas à manutenção. Os desafios:</p>
<ul>
<li><b>Quem vai revisar</b> este código?</li>
<li><b>Quem vai manter</b> este código?</li>
<li><b>Dívida cognitiva</b>: a IA gera mais código do que somos capazes de entender.</li>
</ul>

<h3>7. Exercício em sala e Rodada 3</h3>
<p><b>Exercício</b>: cada grupo pensa, no <b>seu projeto</b>, em cenários em que cada tipo de manutenção poderia ocorrer e entrega a <b>raiz do problema</b> e uma <b>possível solução</b>.</p>
<p>A <b>Rodada 3 (Entrega Final)</b> pede: demonstração (v3) da versão final; dificuldades e decisões técnicas e de processo; histórico completo de versões; todos os dados de monitoramento e controle (burndown e EVM de todas as iterações); retrospectiva final do grupo; registro de participação individual. A entrega é <b>documento consolidado + v3 do produto + vídeo de apresentação</b>.</p>
<p>A <b>próxima aula</b> trata de refatoração, engenharia reversa e reengenharia, e boas práticas.</p>
`
},

"gpms-a13": {
  resumo: "Classificando casos reais de manutenção, refatoração, engenharia reversa e reengenharia, código limpo (nomes, estilo, números mágicos), documentação e código flexível a mudanças.",
  html: `
<h3>1. Exercício: classifique o tipo de manutenção</h3>
<p>A aula começou com 10 casos reais para classificar nos cinco tipos (emergencial, corretiva, preventiva, adaptativa e perfectiva):</p>
<table>
<tr><th>Caso</th><th>Tipo</th></tr>
<tr><td>Suporte ao Python 3.14 e fim do suporte ao 3.8 (psf/requests)</td><td><b>Adaptativa</b></td></tr>
<tr><td>Corrigir falha ao rodar em Python sem o módulo ssl</td><td><b>Corretiva</b></td></tr>
<tr><td>Atualização automática (Dependabot) de uma action do CI</td><td><b>Preventiva ou adaptativa</b> *</td></tr>
<tr><td>Atualizar as regras do Makefile</td><td><b>Preventiva ou perfectiva</b></td></tr>
<tr><td>Equifax: aplicar o patch do Apache Struts</td><td><b>Corretiva</b></td></tr>
<tr><td>Migrar de Python 2 para 3 após o fim do suporte (jan/2020)</td><td><b>Adaptativa</b></td></tr>
<tr><td>Exportar PDF no relatório mensal, a pedido do cliente</td><td><b>Perfectiva</b></td></tr>
<tr><td>Remover código morto (Power Peg, Knight)</td><td><b>Preventiva</b></td></tr>
<tr><td>Otimizar a consulta SQL que leva 8 s</td><td><b>Perfectiva</b></td></tr>
<tr><td>Refatorar a classe Pedido (2.000 linhas) antes de nova regra</td><td><b>Preventiva ou perfectiva</b></td></tr>
</table>
<div class="dica">* A classificação do caso 3 é minha leitura (evita problemas futuros e acompanha o ambiente); o texto do slide ficou ilegível. Onde há “ou”, o que decide é a <b>intenção</b> da mudança.</div>

<h3>2. Refatoração</h3>
<p><b>Refatoração</b> é uma mudança na <b>estrutura interna</b> do software para torná-lo mais fácil de entender ou modificar, <b>sem alterar o comportamento externo</b> (Martin Fowler). É a forma de pagar a <b>dívida técnica</b>.</p>
<div class="ex">Arrumar o guarda-roupa: as roupas são as mesmas e você veste a mesma coisa de manhã, mas agora acha tudo rápido. O comportamento externo não mudou; a estrutura interna, sim.</div>
<h4>Quando refatorar: a Regra dos Três</h4>
<ol>
<li><b>Primeira vez</b> que você faz algo: simplesmente faça.</li>
<li><b>Segunda vez</b> que faz algo parecido: sinta repulsa por repetir, mas faça de novo.</li>
<li><b>Terceira vez</b>: comece a refatorar.</li>
</ol>
<div class="ex">Você copiou a validação de CPF em uma tela. Copiou em outra, a contragosto. Na terceira tela, pare e extraia uma função <code>validarCpf()</code> usada pelas três.</div>
<p>Exemplo do slide: o AntennaPod era, em nov./2020, uma <i>Big Ball of Mud</i> (dependências circulares por todo lado); em maio/2024 já tinha a estrutura do código modernizada.</p>
<h4>Como refatorar</h4>
<p>Há um <b>catálogo com mais de 70 refatorações</b> (refactoring.com/catalog), disponíveis nas principais IDEs. Algumas: <b>Rename</b> Method/Field, <b>Remove Dead Code</b>, <b>Encapsulate</b> Field, <b>Move</b> Method/Field, <b>Extract</b> Method, <b>Pull Up</b> e <b>Push Down</b> Method/Field, <b>Replace Conditional With Polymorphism</b>.</p>
<h4>Refatoração × otimização</h4>
<table>
<tr><th></th><th>Refatoração</th><th>Otimização</th></tr>
<tr><td><b>Muda o comportamento?</b></td><td>Não</td><td>Não</td></tr>
<tr><td><b>Mexe nas estruturas internas?</b></td><td>Sim</td><td>Sim</td></tr>
<tr><td><b>Objetivo</b></td><td>Facilitar o entendimento e baratear alterações</td><td>Melhorar o desempenho</td></tr>
<tr><td><b>Efeito colateral</b></td><td>—</td><td>Pode deixar o código mais difícil de manter</td></tr>
</table>

<h3>3. Engenharia reversa e sistemas legados</h3>
<p>Sistemas legados costumam ter documentação desatualizada ou inexistente. A <b>engenharia reversa</b> gera a <b>documentação a partir do código</b>: requisitos, diagramas de casos de uso, de sequência, de transição de estados e de classes. A maioria das ferramentas CASE profissionais faz isso, em níveis diferentes.</p>
<div class="ex">É como desenhar a planta de uma casa que já foi construída sem projeto: você percorre os cômodos e anota.</div>
<div class="dica">Legado <b>não</b> é sinônimo de irrelevante. O <b>COBOL</b> (1959) é compilado, de alto nível e legível, e continua sustentando sistemas importantes (a aula citou os bancos dos EUA).</div>

<h3>4. Reengenharia</h3>
<h4>Por que migrar: obsolescência tecnológica</h4>
<p>Com o tempo, a tecnologia envelhece: mainframe vira PC/cluster, COBOL e NATURAL viram Java e Python, DB2 e ADABAS viram Oracle, MySQL e PostgreSQL. Os motivos para migrar:</p>
<ul>
<li><b>Alto custo</b> para manter a tecnologia antiga.</li>
<li>Dificuldade de <b>encontrar profissionais</b> capacitados.</li>
<li>Dificuldade de <b>adaptar às demandas atuais</b> (móvel, web…).</li>
</ul>
<h4>O que é e quais os benefícios</h4>
<p><b>Reengenharia</b> é <b>reconstruir o sistema</b> para melhorar desempenho, manutenibilidade, segurança, estrutura e entendimento, documentação. Na engenharia, vai-se da especificação ao sistema novo; na reengenharia, parte-se de um <b>sistema existente</b>, que é compreendido e transformado.</p>
<table>
<tr><th>Benefício</th><th>Como</th></tr>
<tr><td><b>Reduzir a complexidade</b></td><td>Portar para nova plataforma, melhorar performance, extrair modelos, explorar novas tecnologias, reduzir dependências</td></tr>
<tr><td><b>Reduzir riscos</b></td><td>Desenvolver o sistema do zero é arriscado (erros de especificação, problemas no desenvolvimento)</td></tr>
<tr><td><b>Reduzir custos</b></td><td>Pode custar bem menos que reescrever; ferramentas automatizam parte do trabalho</td></tr>
</table>
<h4>Custo-benefício</h4>
<p>Compara-se <b>quantitativamente</b>: manter como está (custo de suporte + manutenção, $$$$$) contra aplicar reengenharia (custo da reengenharia + suporte + manutenção, $$). Compensa quando o sistema tem <b>vida longa e pouca manutenibilidade</b>.</p>
<p><b>Quando aplicar</b>: documentação obsoleta (ou inexistente); desenvolvedores saíram; conhecimento limitado do sistema; muito tempo para fazer mudanças; correção de defeitos frequente; problemas de manutenção constantes.</p>
<h4>As 5 etapas</h4>
<ol>
<li><b>Análise de inventário</b>: priorizar as aplicações candidatas e alocar recursos.</li>
<li><b>Reestruturação da documentação</b>: não fazer nada, documentar só as mudanças ou documentar o mínimo necessário.</li>
<li><b>Engenharia reversa</b>: extrair informação do código (dados, processamento, interface).</li>
<li><b>Reestruturação de código e dados</b>: melhora a qualidade <b>sem alterar a arquitetura</b>.</li>
<li><b>Engenharia avante</b>: recupera o projeto, adiciona funcionalidades e <b>modifica a arquitetura</b>, gerando uma nova configuração do sistema.</li>
</ol>

<h3>5. Código limpo</h3>
<h4>Entender custa caro</h4>
<p>Num bloco de 100 linhas: implementar leva 3 h; mais 1 h para deixá-lo muito legível; a compreensão por outro dev cai de 30 para 27 min. No sistema inteiro, 1 milhão de linhas são cerca de <b>10 mil blocos</b>; metade recebe manutenção: 5 mil blocos × 12 h = <b>60 mil horas, cerca de 7 anos</b>.</p>
<div class="dica">Ler &gt; escrever. Você escreve o código uma vez e ele é lido por vários devs, por anos. Vale dar mais trabalho agora para facilitar a leitura depois.</div>
<h4>Estilo: guia, linter e formatador</h4>
<table>
<tr><th>Ferramenta</th><th>O que faz</th><th>Exemplos</th></tr>
<tr><td><b>Guia de estilo</b></td><td>Regras de nomes, formatação e práticas</td><td>Google Java Style, PEP 8, Airbnb JS, PSR-12 (o TCC segue a ABNT)</td></tr>
<tr><td><b>Linter</b></td><td>Checa o estilo automaticamente e aponta violações</td><td>CheckStyle (Java)</td></tr>
<tr><td><b>Formatador</b></td><td>Corrige o formato sozinho</td><td>Prettier, Black, autopep8, clang-format, gofmt</td></tr>
</table>
<h4>Clareza nos nomes</h4>
<ul>
<li>Use <b>palavras de dicionário</b>: <code>s</code> vira <code>saldo</code>.</li>
<li>Só abreviaturas muito conhecidas (getURL, ServidorHTTP).</li>
<li><b>Quanto maior o escopo, maior o nome</b>: <code>i</code> num for; <code>taxaRetencaoClientesVIP</code> em escopo global.</li>
<li><b>Classes</b> são substantivos (ListaEncadeada); evite genéricos como Resultado ou Gerenciador.</li>
<li><b>Funções</b> começam com verbo (calcularFrete); booleanas explícitas (isAvailable, hasNext).</li>
<li><b>Evite negações</b>: troque <code>isNotEmpty</code> por <code>hasElements</code>.</li>
</ul>
<h4>Números mágicos e nomes inconsistentes</h4>
<pre>// ruim
if (peso &lt;= 1.5)
  frete = 0.315 * peso;

// melhor
LIMITE_PESO = 1.5
FRETE_BASICO = 0.315
if (peso &lt;= LIMITE_PESO)
  frete = FRETE_BASICO * peso;</pre>
<p>Quem lê <code>1.5</code> não sabe o que significa; <code>LIMITE_PESO</code> diz tudo e só precisa ser alterado em um lugar. Também evite <b>a mesma entidade com nomes diferentes</b> (na UFF, <i>Aluno</i> e <i>Estudante</i>; no iFood, <i>Restaurante</i> e <i>Estabelecimento</i>): escolha um e use sempre.</p>
<h4>Outras dicas</h4>
<ul>
<li><b>Coesão e acoplamento</b>: funções coesas, com poucos parâmetros e sem <i>flags</i>.</li>
<li><b>Command–Query Separation</b>: uma função é um <b>comando</b> ou uma <b>consulta</b>, nunca os dois.</li>
<li><b>Erros</b>: sem <code>catch</code> vazio; trate ou falhe rápido.</li>
</ul>

<h3>6. Documentação</h3>
<p>Linguagem natural é mais fácil de entender que um trecho de código, e o código <b>não se documenta sozinho</b>. Existem geradores de documentação (javadoc, Sphinx/pydoc, JSDoc, Doxygen, rustdoc). O slide cita Ousterhout: gastar um pouco de tempo extra (cerca de 10%) em bons comentários compensa. Comente para três públicos: <b>quem vai chamar</b> seu código (usuários da API), <b>quem vai mantê-lo</b> e as <b>LLMs</b> que vão gerar código chamando sua API.</p>
<table>
<tr><th>Tipo de comentário</th><th>Para quê</th></tr>
<tr><td><b>Públicos</b></td><td>API, interface, referência: classes, métodos e atributos; para quem chama</td></tr>
<tr><td><b>Privados</b></td><td>Implementação, inline: decisões e casos de borda; para quem mantém</td></tr>
<tr><td><b>Licenças</b></td><td>Cabeçalho do arquivo (MIT, Apache…) com copyright e termos de uso</td></tr>
<tr><td><b>TODO / FIXME</b></td><td>Com parcimônia; declaram <b>dívida técnica</b> (<i>self-admitted technical debt</i>)</td></tr>
</table>
<p>No Google, todo arquivo tem comentário de arquivo e toda classe e método públicos têm comentário.</p>
<h4>O que escrever</h4>
<ul>
<li><b>Método</b>: 1 ou 2 frases do que faz, parâmetros, pré-condições, valor de retorno, exceções, efeitos colaterais e <b>exemplos de uso</b>. Ex.: <code>"hamburger".substring(4, 8)</code> retorna <code>"urge"</code>.</li>
<li><b>Atributo</b>: a <b>unidade</b> e os <b>valores especiais</b>. Ex.: timeout em milissegundos; zero significa infinito.</li>
<li><b>Classe</b>: <b>propósito + exemplo de uso</b>. Ex.: Stack é uma estrutura LIFO.</li>
<li><b>Decisões</b>: registre o porquê. Ex.: “percorre cada string 16 vezes, mas são só 25 strings, então é rápido o bastante”. Evita que alguém refaça à toa.</li>
</ul>
<h4>Anti-padrões</h4>
<ul>
<li><b>Ruído</b>: repetir o óbvio (<code>// Cria um ArrayList</code> antes de criar um ArrayList).</li>
<li><b>Parafrasear o código</b>: narrar o algoritmo linha a linha é só mais manutenção.</li>
<li><b>Muleta de função grande</b>: em vez de <code>// calcula descontos</code>, <code>// calcula impostos</code>, <b>extraia funções</b> com bons nomes: <code>calcularDescontos()</code>, <code>calcularImpostos()</code>, <code>calcularFrete()</code>.</li>
</ul>

<h3>7. Código flexível a mudanças</h3>
<table>
<tr><th>Característica</th><th>Significa</th></tr>
<tr><td><b>Baixo acoplamento</b></td><td>Alterar uma classe ou módulo não obriga a reescrever vários outros</td></tr>
<tr><td><b>Alta coesão</b></td><td>Cada componente tem uma responsabilidade única e clara</td></tr>
<tr><td><b>Abstrações e interfaces</b></td><td>Depender de contratos, não de implementações; facilita trocar tecnologias, bancos ou regras de negócio</td></tr>
<tr><td><b>Legibilidade</b></td><td>Novos devs entendem rápido e alteram com segurança</td></tr>
</table>
<p>Boas práticas para chegar lá: princípios <b>SOLID</b> (responsabilidade única, inversão de dependência), <b>arquitetura modular</b> (blocos reutilizáveis, atualizados ou substituídos isoladamente) e <b>testes automatizados</b> (dão confiança para refatorar sem medo de introduzir bugs).</p>
<div class="ex">Uma tomada padrão: você troca o aparelho sem mexer na parede, porque os dois dependem do <b>contrato</b> (o formato da tomada), não um do outro. É a ideia de depender de interfaces.</div>
<p>Livro gratuito, em português, com exemplos práticos: <b>manutencaosoftware.org</b>.</p>

<h3>8. Para o trabalho (Rodada 3)</h3>
<p>Os itens da Rodada 3 (entrega final) estão no resumo da Aula 12.</p>
`
},

"gpms-a14": {
  resumo: "Os 20 exercícios da revisão de GC e Manutenção, cada um com o enunciado e a resposta explicada: controle de versão, grafo de commits, merge, itens de configuração, solicitações de mudança, tipos de manutenção, Leis de Lehman e manutenibilidade.",
  html: `
<h3>Sobre esta página</h3>
<p>A Aula 14 é de <b>exercícios e revisão</b>. O slide traz só os <b>enunciados</b>; aqui cada pergunta vem seguida da resposta, explicada com a matéria das aulas 8 a 13.</p>
<div class="dica">As respostas são uma <b>resolução própria</b>, não o gabarito da professora. Nas questões abertas (e na do grafo do Git, em que a tag 2.0 já existe) deixei marcado o raciocínio, para você comparar com o que for dito em aula.</div>

<h3>Parte 1 — Gerência de Configuração</h3>

<h4>Questão 1</h4>
<p><i>Qual é a diferença entre um sistema de controle de versão distribuído e um centralizado?</i></p>
<table>
<tr><th></th><th>Centralizado</th><th>Distribuído</th></tr>
<tr><td><b>Repositórios</b></td><td>Um só, no servidor; cada pessoa tem uma cópia de trabalho</td><td>Um repositório completo por desenvolvedor, com área de trabalho acoplada</td></tr>
<tr><td><b>Commit e update</b></td><td>Entre cliente e <b>servidor</b></td><td><b>Localmente</b>; troca por clone, pull e push</td></tr>
<tr><td><b>Exemplos</b></td><td>CVS, Subversion</td><td>Git, Mercurial</td></tr>
</table>
<div class="ex">Centralizado é uma biblioteca com um único exemplar do livro. Distribuído é cada aluno ter uma cópia completa, anotar em casa e combinar as anotações depois.</div>

<h4>Questão 2 — Verdadeiro ou falso</h4>
<p><i>a) Um sistema de versionamento baseado em lock (bloqueio) é ideal para equipes grandes, onde múltiplos desenvolvedores trabalham simultaneamente nos mesmos arquivos.</i></p>
<p><b>Falso.</b> O lock é o controle <b>pessimista</b>: só um desenvolvedor mexe no item por vez. Não há conflito, mas <b>não há paralelismo</b>, justamente o que uma equipe grande precisa. Para isso serve o controle <b>otimista</b> (Git).</p>
<p><i>b) A auditoria de configuração de software inclui a verificação de que todos os itens de configuração estão corretamente identificados e que todas as mudanças foram corretamente implementadas e documentadas.</i></p>
<p><b>Verdadeiro.</b> A auditoria existe para <b>assegurar que as alterações foram implementadas corretamente</b> e que a configuração está em conformidade e íntegra.</p>
<p><i>c) O uso de tags no controle de versão permite marcar pontos específicos no histórico de commits, facilitando a identificação de versões específicas do software.</i></p>
<p><b>Verdadeiro.</b> Tag é um rótulo sobre um commit (<code>git tag v1.0</code>), para achar uma versão sem decorar o hash.</p>
<p><i>d) Como o git mantém histórico de qual branch estava ativo quando o commit é realizado, a estratégia de ramificação de solicitação de modificação permite identificar qual solicitação deu origem a cada funcionalidade do sistema.</i></p>
<p><b>Falso.</b> O Git <b>não guarda</b> em que branch o commit foi feito. Um ramo é só um rótulo que aponta para um commit, e desaparece do histórico quando é apagado. A rastreabilidade por solicitação vem de <b>citar a issue na mensagem do commit e no pull request</b> (<code>fix [#12]: …</code>).</p>
<p><i>e) O processo de integração contínua exige que o sistema seja compilado e testado continuamente com uma frequência bem definida. Por exemplo: uma vez ao dia.</i></p>
<p><b>Falso.</b> A CI pede que se <b>integre com frequência</b> e que <b>cada integração</b> passe por build e testes automatizados. Não há frequência fixa exigida: “pelo menos uma vez por dia” é a recomendação da maioria dos autores, não uma regra.</p>

<h4>Questão 3</h4>
<p><i>Qual operação de controle de versão é a mais apropriada em cada situação?</i></p>
<table>
<tr><th>Situação</th><th>Operação</th></tr>
<tr><td>a) Verificar se há mudanças no espaço de trabalho</td><td><code>git status</code> (e <code>git diff</code> para ver o conteúdo)</td></tr>
<tr><td>b) Obter atualizações de um repositório remoto</td><td><code>git pull</code> (<code>git fetch</code> só baixa, sem integrar)</td></tr>
<tr><td>c) Carregar versão específica para o espaço de trabalho</td><td><code>git checkout &lt;commit, ramo ou tag&gt;</code></td></tr>
<tr><td>d) Criar um nome amigável para uma versão</td><td><code>git tag &lt;nome&gt;</code></td></tr>
<tr><td>e) Verificar mudanças entre duas versões</td><td><code>git diff &lt;versão1&gt; &lt;versão2&gt;</code></td></tr>
</table>

<h4>Questão 4 — O grafo do Git</h4>
<p><i>Dado o repositório abaixo, qual o resultado das operações 1 a 13?</i></p>
<pre>A-B-C-E-G-H-I   main
   \   /
    D-F-J       1.x</pre>
<p>Tags: <b>1.0</b> em B, <b>1.1</b> em D, <b>1.2</b> em F, <b>1.3</b> em J, <b>2.0</b> em G. O commit G é o <b>merge</b> de E e F. O ramo <b>main</b> aponta para I e o <b>1.x</b> para J.</p>
<table>
<tr><th>#</th><th>Operação</th><th>Resultado</th></tr>
<tr><td>1</td><td><code>checkout 1.x</code></td><td>HEAD em <b>J</b>, no ramo 1.x</td></tr>
<tr><td>2</td><td><code>commit</code></td><td>novo commit <b>K</b> (pai J); 1.x passa para K</td></tr>
<tr><td>3</td><td><code>checkout main</code></td><td>HEAD em <b>I</b></td></tr>
<tr><td>4</td><td><code>commit</code></td><td>novo commit <b>L</b> (pai I); main passa para L</td></tr>
<tr><td>5</td><td><code>merge 1.x</code></td><td><b>merge commit M</b>, com dois pais (L e K); main passa para M. Não é <i>fast-forward</i>, pois os ramos divergiram</td></tr>
<tr><td>6</td><td><code>tag 2.0</code></td><td>⚠️ <b>erro</b>: a tag 2.0 já existe (em G) e o Git não cria duas tags com o mesmo nome</td></tr>
<tr><td>7</td><td><code>commit</code></td><td><b>N</b> (pai M); main passa para N</td></tr>
<tr><td>8</td><td><code>branch feature</code></td><td>cria <b>feature</b> em N. O HEAD <b>continua em main</b></td></tr>
<tr><td>9</td><td><code>commit</code></td><td><b>O</b> (pai N), na main; main passa para O e feature fica em N</td></tr>
<tr><td>10</td><td><code>checkout 2.0</code></td><td>HEAD em <b>G</b> (tag), “destacado”</td></tr>
<tr><td>11</td><td><code>branch 2.x</code></td><td>cria <b>2.x</b> em G</td></tr>
<tr><td>12</td><td><code>checkout 2.x</code></td><td>HEAD passa a estar no ramo 2.x</td></tr>
<tr><td>13</td><td><code>commit</code></td><td><b>P</b> (pai G); 2.x passa para P</td></tr>
</table>
<p><b>Estado final</b>: main → O · feature → N · 1.x → K · 2.x → P · HEAD em 2.x · tags nos mesmos lugares (1.0 B, 1.1 D, 1.2 F, 1.3 J, 2.0 G).</p>
<div class="dica">Dois detalhes que costumam cair: <code>git branch</code> <b>não troca</b> de ramo (só cria); e o ramo 2.x nasce em G porque a tag 2.0 continuou em G. A tag só andaria até M se alguém forçasse (<code>-f</code>), o que não se faz com tag de versão publicada. Para marcar M, o certo seria uma tag nova, como 2.1.</div>

<h4>Questão 5 — Revisão, variante ou cooperação</h4>
<p><i>Z é um programa open-source na versão 1.0.5 e tem uma versão mais simples, Z lite, para dispositivos embarcados.</i></p>
<table>
<tr><th>Caso</th><th>Tipo</th><th>Por quê</th></tr>
<tr><td>a) Pull request no repositório de Z</td><td><b>Cooperação</b></td><td>modificação feita a partir de uma versão base, para ser <b>combinada depois</b></td></tr>
<tr><td>b) Lançamento da 1.1.0 de Z</td><td><b>Revisão</b></td><td>evolui a partir da 1.0.5, com intenção de substituí-la</td></tr>
<tr><td>c) Lançamento da 1.1.1 de Z</td><td><b>Revisão</b></td><td>evolui a partir da 1.1.0</td></tr>
<tr><td>d) Lançamento da 1.1.1 de Z lite</td><td><b>Variante</b></td><td>existe <b>ao mesmo tempo</b> que o Z completo, em paralelo, para outro contexto</td></tr>
</table>

<h4>Questão 6 — Alice e Bob</h4>
<p>A versão base é:</p>
<pre>def f(a):
    return a + 1
x = f(1)
print(x)</pre>
<p><b>Alice</b> acrescenta, no fim, <code>y = f(x)</code> e <code>print(y)</code>. <b>Bob</b> renomeia a função para <code>incrementa</code> e atualiza a chamada.</p>
<p><i>a) Qual foi a intenção de cada alteração?</i></p>
<ul>
<li><b>Alice</b>: acrescentar um comportamento novo (calcular e imprimir um segundo valor): uma <b>evolução</b> (manutenção perfectiva).</li>
<li><b>Bob</b>: renomear a função para um nome mais descritivo, <b>sem mudar o comportamento</b>: uma <b>refatoração</b> (<i>Rename Method</i>).</li>
</ul>
<p><i>b) Há conflito físico nas alterações?</i></p>
<p><b>Não.</b> Bob mexeu na linha da definição e na da chamada; Alice só <b>acrescentou linhas no fim</b>. Nenhuma linha foi alterada pelos dois, então o Git funde sozinho. Mas existe um <b>conflito lógico</b>: a linha nova de Alice chama <code>f</code>, que Bob renomeou, e o programa passa a dar <code>NameError</code>.</p>
<div class="ex">Dois colegas editam o mesmo trabalho: um troca o nome do capítulo 2 e o outro escreve, no fim, “como vimos no capítulo 2 (Introdução)”. O texto junta sem problema, mas a referência fica errada. Conflito físico é de texto; conflito lógico é de significado.</div>
<p><i>c) Faça um merge correto das mudanças.</i></p>
<pre>def incrementa(a):
    return a + 1
x = incrementa(1)
print(x)
y = incrementa(x)
print(y)</pre>
<p>Saída: <b>2</b> e depois <b>3</b>. A linha de Alice teve de ser <b>ajustada à mão</b> para usar o nome novo.</p>

<h4>Questão 7 — O que versionar em um jogo</h4>
<p>Regra: versione o que <b>as pessoas escrevem ou criam</b>; não o que é <b>gerado</b> e pode ser refeito.</p>
<table>
<tr><th>Artefato</th><th>Versionar?</th><th>Por quê</th></tr>
<tr><td>classDiagram.uml</td><td><b>Sim</b></td><td>modelo de projeto; evolui junto com o código</td></tr>
<tr><td>assets/model.stl</td><td><b>Sim</b></td><td>criado à mão, não é gerado. É binário (sem diff/merge); se for grande, usar Git LFS</td></tr>
<tr><td>src/game.py</td><td><b>Sim</b></td><td>código-fonte</td></tr>
<tr><td>src/game.pyc</td><td><b>Não</b></td><td>bytecode <b>gerado</b> a partir do .py; muda sempre e gera conflitos inúteis</td></tr>
<tr><td>tests/test_game.py</td><td><b>Sim</b></td><td>os testes fazem parte do produto</td></tr>
<tr><td>Pipfile</td><td><b>Sim</b></td><td>descreve as dependências</td></tr>
<tr><td>Pipfile.lock</td><td><b>Sim</b></td><td>trava as versões exatas, para o build ser reprodutível</td></tr>
<tr><td>game.exe</td><td><b>Não</b></td><td>produto de build; vai para <b>release</b>/artefatos da CI, não para o repositório de código</td></tr>
</table>

<h4>Questão 8 — O fluxo de uma solicitação de mudança</h4>
<p><i>Ordene: (i) implementar a mudança, (ii) registrar a SM, (iii) decisão do CCB, (iv) analisar o impacto, (v) verificar/testar e atualizar a baseline, (vi) fechar a SM.</i></p>
<p><b>(ii) → (iv) → (iii) → (i) → (v) → (vi)</b></p>
<ol>
<li><b>Registrar</b> a SM (a classificação de prioridade também entra aqui).</li>
<li><b>Analisar o impacto</b>: esforço, cronograma, custo e proposta de implementação.</li>
<li><b>Decisão do CCB</b> (Comitê de Controle da Configuração): implementar, rejeitar ou postergar.</li>
<li><b>Implementar</b> a mudança, com testes de unidade.</li>
<li><b>Verificar/testar</b> (testes de sistema) e <b>atualizar a baseline</b>.</li>
<li><b>Fechar</b> a SM.</li>
</ol>
<div class="dica">A lógica: ninguém implementa antes de a mudança ser <b>aprovada</b>, e ninguém aprova sem saber o <b>impacto</b>.</div>

<h4>Questão 9 — Exportar o relatório em PDF</h4>
<p><i>Além da implementação, liste quatro itens de configuração que a análise de impacto deve considerar.</i></p>
<ol>
<li><b>Requisitos/especificação</b> do relatório (documento de requisitos ou histórias de usuário).</li>
<li><b>Testes</b>: casos de teste e testes automatizados da exportação.</li>
<li><b>Descritor de dependências</b> (ex.: Pipfile/lock), pois provavelmente entra uma biblioteca de PDF, com versão e licença.</li>
<li><b>Documentação do usuário</b>: manual ou ajuda sobre como exportar.</li>
</ol>
<p>Também poderiam entrar scripts de build e de implantação, diagramas de projeto e a configuração do ambiente. A análise ainda estima o impacto em <b>esforço, cronograma e custo</b>.</p>

<h4>Questão 10</h4>
<p><i>Qual a diferença entre uma solicitação de mudança e um relato de defeito? Dê um exemplo de cada.</i></p>
<table>
<tr><th></th><th>Solicitação de mudança</th><th>Relato de defeito</th></tr>
<tr><td><b>O que é</b></td><td>Pedido para <b>alterar</b> o sistema: funcionalidade nova, melhoria, adaptação</td><td>Aviso de que o sistema <b>não faz o que já deveria</b> fazer</td></tr>
<tr><td><b>Exemplo</b></td><td>“Exportar o relatório mensal em PDF”</td><td>“O app fecha com erro ao enviar o formulário vazio”</td></tr>
</table>
<p>Corrigir o defeito é tratamento do <b>sintoma</b>; é preciso achar a <b>causa raiz</b>. No GitHub, os dois viram <i>issues</i>, diferenciadas por rótulos (por exemplo, <i>bug</i> e <i>enhancement</i>).</p>

<h3>Parte 2 — Manutenção de Software</h3>

<h4>Questão 1 — O produto popular cheio de bugs</h4>
<p><i>Uma empresa lançou um produto que ganhou popularidade, mas logo os clientes relataram bugs e problemas de desempenho. A empresa decidiu focar em corrigi-los o mais rápido possível.</i></p>
<p><i>a) Que tipo de manutenção está sendo realizada?</i> <b>Corretiva</b>: é reativa e corrige os problemas reportados. Se fossem só remendos temporários para manter o sistema no ar, seria <b>emergencial</b>.</p>
<p><i>b) Que outros tipos poderiam ser necessários no futuro? Justifique.</i></p>
<ul>
<li><b>Perfectiva</b>: produto popular recebe pedidos de funcionalidades e melhorias; melhorar o desempenho de forma planejada também é perfectiva.</li>
<li><b>Adaptativa</b>: o ambiente muda (sistemas operacionais, navegadores, bibliotecas, leis) e o software precisa continuar usável.</li>
<li><b>Preventiva</b>: refatorar, atualizar dependências e corrigir problemas latentes antes de virarem falhas, reduzindo a dívida técnica criada pela pressa.</li>
<li><b>Emergencial</b>: quando algo parar em produção de repente.</li>
</ul>
<p>A justificativa vem das <b>Leis de Lehman</b>: o software precisa de mudança e crescimento contínuos, e sem cuidado a complexidade cresce e a qualidade declina. E quanto mais sucesso, mais usos e mais bugs.</p>

<h4>Questão 2 — Verdadeiro ou falso</h4>
<p><i>a) A manutenção adaptativa é realizada exclusivamente para corrigir erros e falhas descobertos após a implementação do software.</i></p>
<p><b>Falso.</b> Corrigir erros é a <b>corretiva</b>. A adaptativa mantém o software usável após <b>mudanças no ambiente</b> (ex.: o CNPJ alfanumérico).</p>
<p><i>b) A manutenção perfectiva é realizada para adicionar novas funcionalidades ou melhorar as funcionalidades existentes no software.</i></p>
<p><b>Verdadeiro.</b> Perfectiva (evolutiva) provê melhorias ao usuário e melhora atributos de qualidade.</p>
<p><i>c) A manutenção preventiva geralmente é menos custosa do que a corretiva, pois evita problemas antes que se tornem sérios.</i></p>
<p><b>Verdadeiro</b> (“geralmente”). A preventiva é pró-ativa e trata o problema ainda pequeno e planejado; a corretiva chega com o problema em produção. O caso Knight (código morto que custou US$ 440 milhões) mostra o preço de não prevenir.</p>
<p><i>d) A manutenção de software não inclui atividades relacionadas à documentação, já que estas são realizadas apenas durante o desenvolvimento inicial.</i></p>
<p><b>Falso.</b> Manter o software inclui manter a documentação: atualizá-la a cada mudança, reestruturá-la e gerá-la por engenharia reversa na reengenharia. Documentação desatualizada é a marca dos sistemas legados.</p>

<h4>Questão 3</h4>
<p><i>Os testes estão falhando e o arquivo src/game.pyc foi incluído na configuração. Qual(is) auditoria(s) encontra(m) esses problemas? Por quê?</i></p>
<ul>
<li><b>Testes falhando</b> → a <b>auditoria automatizada (CI/CD)</b>: o build com testes roda a cada integração e acusa a falha.</li>
<li><b>.pyc na configuração</b> → a <b>auditoria de conformidade e integridade</b> da configuração, que confere se os itens estão corretamente identificados e se a configuração contém só o que deveria. O <code>.pyc</code> é um arquivo <b>gerado</b>, não deveria ser item de configuração.</li>
</ul>

<h4>Questão 4 — Qual o tipo de manutenção</h4>
<table>
<tr><th>Situação</th><th>Tipo</th><th>Por quê</th></tr>
<tr><td>a) Adição de funcionalidade ao sistema</td><td><b>Perfectiva</b></td><td>melhoria para o usuário</td></tr>
<tr><td>b) Ajuste para funcionar com versão beta de biblioteca que será lançada no futuro</td><td><b>Adaptativa</b></td><td>acompanha mudança no ambiente, mesmo antecipada</td></tr>
<tr><td>c) Reiniciar servidor que parou repentinamente</td><td><b>Emergencial</b></td><td>não programada; mantém o sistema no ar temporariamente</td></tr>
<tr><td>d) Corrigir bug para a próxima atualização planejada</td><td><b>Corretiva</b></td><td>reativa, corrige problema reportado (e é programada)</td></tr>
<tr><td>e) Corrigir <i>memory leak</i> com potencial de causar bugs</td><td><b>Preventiva</b></td><td>problema latente, tratado antes de virar falha</td></tr>
</table>

<h4>Questão 5</h4>
<ul>
<li><b>a) Melhorar o desempenho:</b> <b>perfectiva</b> (melhora um atributo de qualidade).</li>
<li><b>b) Eliminar uma falha de segurança:</b> <b>corretiva</b>, pois corrige uma falha existente (como o patch do Struts no caso Equifax). Se for achada e tratada antes de qualquer problema, pode ser <b>preventiva</b>.</li>
<li><b>c) Desempenho e segurança são exemplos de:</b> <b>requisitos não funcionais</b> (atributos de qualidade). Dizem <i>como</i> o sistema deve se comportar, não <i>o que</i> ele faz.</li>
</ul>

<h4>Questão 6</h4>
<p><i>Os custos de manutenção podem alcançar 80% dos custos totais de um projeto de software durante o seu ciclo de vida. Por que esse valor é tão alto?</i></p>
<ul>
<li>O software <b>vive anos</b> depois da entrega; a maior parte da vida é operação e manutenção.</li>
<li>O mundo <b>muda</b> (leis, plataformas, bibliotecas, requisitos): <b>mudança contínua</b> e <b>crescimento contínuo</b>, nas Leis de Lehman.</li>
<li>A <b>complexidade cresce</b> e a <b>qualidade declina</b> se ninguém cuida: dívida técnica.</li>
<li><b>Entender código custa caro</b>: ler &gt; escrever, documentação ruim, equipe que muda.</li>
<li>Só cerca de 21% do esforço é correção de erros; o resto é adaptar, evoluir e prevenir.</li>
<li>Sucesso gera mais usuários, mais usos e mais pedidos.</li>
</ul>
<div class="dica">Números da aula: manutenção é 90% do custo total (Erlikh) ou 60% do esforço (Pressman); 42% do tempo dos desenvolvedores vai para dívida técnica e código ruim.</div>

<h4>Questão 7</h4>
<p><i>Existem sistemas importantes que sofrem pouquíssima manutenção (e que continuam sendo usados)?</i></p>
<p><b>Sim, mas são exceções</b>, e dependem de condições: <b>requisitos estáveis</b> e <b>ambiente congelado ou isolado</b> (ex.: firmware de equipamento, controladores industriais, software de bordo), ou programas pequenos, maduros e bem definidos (utilitários básicos de linha de comando).</p>
<p>Mesmo assim, se o ambiente mudar (hardware, sistema operacional, segurança), a falta de manutenção vira risco: pelas Leis de Lehman, o software que não se adapta fica menos satisfatório e perde qualidade. E sistemas legados importantes, como os de COBOL, continuam em uso <i>porque</i> são mantidos.</p>

<h4>Questão 8</h4>
<p><i>Diferencie engenharia reversa, refatoração e reengenharia.</i></p>
<table>
<tr><th>Conceito</th><th>O que faz</th><th>Muda o sistema?</th></tr>
<tr><td><b>Engenharia reversa</b></td><td>Extrai informação do código existente para <b>gerar documentação e modelos</b> (casos de uso, classes, sequência…)</td><td>Não; serve para <b>entender</b></td></tr>
<tr><td><b>Refatoração</b></td><td>Muda a <b>estrutura interna</b> para facilitar o entendimento e a modificação, <b>sem alterar o comportamento externo</b></td><td>Só por dentro</td></tr>
<tr><td><b>Reengenharia</b></td><td><b>Reconstrói ou transforma</b> um sistema existente: compreensão (engenharia reversa) + reestruturação + engenharia avante; pode mudar a arquitetura, a plataforma e acrescentar funcionalidades</td><td>Sim, de forma ampla</td></tr>
</table>
<div class="ex">Casa antiga. <b>Engenharia reversa</b>: desenhar a planta do que já existe. <b>Refatoração</b>: reorganizar os móveis, sem derrubar paredes. <b>Reengenharia</b>: uma reforma grande, com troca de instalações e, se preciso, de planta.</div>

<h4>Questão 9 — Leis de Lehman</h4>
<table>
<tr><th>Enunciado</th><th>Lei</th></tr>
<tr><td>a) Sem esforço para reduzi-la, a complexidade aumenta com as mudanças</td><td><b>Complexidade crescente</b> (2ª)</td></tr>
<tr><td>b) O sistema precisa se adaptar continuamente ou se torna cada vez menos útil</td><td><b>Mudança contínua</b> (1ª)</td></tr>
<tr><td>c) Funcionalidades precisam crescer para manter a satisfação dos usuários</td><td><b>Crescimento contínuo</b> (6ª)</td></tr>
<tr><td>d) A qualidade parece diminuir, a menos que o sistema seja adaptado ao ambiente</td><td><b>Qualidade em declínio</b> (7ª)</td></tr>
</table>

<h4>Questão 10</h4>
<p><i>Cite quatro fatores que afetam a manutenibilidade de um sistema e, para cada um, uma ação que a melhora.</i></p>
<table>
<tr><th>Fator</th><th>Ação que melhora</th></tr>
<tr><td><b>Modularidade</b></td><td>Dividir em módulos com <b>interfaces bem definidas</b> e baixo acoplamento</td></tr>
<tr><td><b>Analisabilidade</b> (é fácil de entender?)</td><td><b>Código limpo</b>: nomes claros, funções pequenas, sem números mágicos; documentação atualizada</td></tr>
<tr><td><b>Modificabilidade</b></td><td>Baixo acoplamento, alta coesão e <b>abstrações/interfaces</b> (princípios SOLID)</td></tr>
<tr><td><b>Testabilidade</b></td><td><b>Testes automatizados</b>, que dão segurança para mudar e refatorar</td></tr>
</table>
<p>Vale citar também a <b>reusabilidade</b>: extrair funções e componentes reutilizáveis em vez de duplicar código.</p>
`
}

};
