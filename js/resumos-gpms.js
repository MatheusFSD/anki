/* GPMS — resumos das aulas, em linguagem simples (aba "Resumos").
   A chave é o id da aula em data-gpms.js.
   html: aceita <h3>, <h4>, <p>, <ul>/<ol>, <table>, <pre>, <code>,
         <div class="ex"> (exemplo simples) e <div class="dica"> (para guardar).
   Dentro de <pre>, barra invertida precisa ser escrita em dobro (\\). */
const RESUMOS_GPMS = {

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
}

};
