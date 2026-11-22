/* Projeto de Software — resumos das aulas, em linguagem simples (aba "Resumos").
   A chave é o id da aula em data-projeto.js. Mesmo formato de resumos-gpms.js.
   Escritos a partir do texto dos slides (Arquitetura: aulas 1 e 2; SOLID: parte 1).
   Trechos marcados como "complemento" vêm de pesquisa fora dos slides. */
const RESUMOS_PROJETO = {

"proj-arq1": {
  resumo: "O que é arquitetura de software, as três perguntas que ela responde, as visões 4+1, como se projeta (requisitos → projeto → validação), a bola de lama, requisitos e cenários de qualidade, ISO 25010, RNF × requisito arquitetural e táticas.",
  html: `
<h3>1. O que é arquitetura de software</h3>
<p>Os autores clássicos (Shaw e Garlan, 1994; Garlan e Perry, 1995; Clements et al., 2010; Bass, Clements e Kazman, 2012; a norma ISO/IEC/IEEE 42010, 2011) escrevem de jeitos diferentes, mas todos falam de três coisas: os <b>elementos</b> do sistema, as <b>relações</b> entre eles e os <b>princípios ou decisões</b> que guiam o projeto e a evolução. A definição mais enxuta é a de Clements: <b>“uma divisão prudente do todo em partes, com relações específicas entre as partes”</b>.</p>
<p>Na prática, a aula usa duas definições:</p>
<ul>
<li><b>Projeto em alto nível</b>: o foco sai das classes e vai para unidades maiores (módulos, componentes, camadas, serviços), mas só as que importam para os objetivos do sistema;</li>
<li><b>As decisões mais importantes</b>: aquelas tão importantes que, uma vez tomadas, dificilmente podem ser revertidas.</li>
</ul>
<div class="dica">Ralph Johnson resume: <i>“Architecture is about the important stuff. Whatever that is.”</i> O que é “importante” depende do sistema.</div>
<h4>Verdadeiro ou falso: o banco de dados é sempre um componente da arquitetura?</h4>
<p><b>Falso.</b> Num <b>sistema de informações</b> a persistência é central, então entra na arquitetura. Num sistema de <b>diagnóstico de doenças com IA</b> ela existe, mas é simples e secundária para o objetivo: não entra.</p>

<h3>2. Três perguntas, várias visões</h3>
<p>Uma arquitetura responde: <b>(1)</b> quais são os principais componentes? <b>(2)</b> como eles se comunicam? <b>(3)</b> quais foram as principais decisões técnicas?</p>
<p>Como um sistema tem muitos públicos, a arquitetura tem <b>várias visões</b> (modelo <b>4+1</b>, de Kruchten):</p>
<table>
<tr><th>Visão</th><th>Mostra</th></tr>
<tr><td><b>Lógica</b></td><td>os principais elementos e como se relacionam</td></tr>
<tr><td><b>Desenvolvimento</b></td><td>como o código se organiza em módulos e pacotes</td></tr>
<tr><td><b>Processo</b></td><td>o sistema em execução: concorrência, desempenho</td></tr>
<tr><td><b>Física</b></td><td>onde cada parte roda: servidores, rede, implantação</td></tr>
<tr><td><b>+1 Cenários</b></td><td>casos de uso que ligam e validam as outras visões</td></tr>
</table>
<div class="ex">Numa casa, o cliente olha a fachada e o arquiteto olha a planta. Num sistema, o cliente vê as telas e o arquiteto vê a estrutura.</div>
<p>Na aula de hoje se desenha uma visão <b>estrutural de alto nível</b>, próxima da visão lógica. A <b>notação</b> pode ser formal (UML: diagrama de componentes ou de pacotes) ou informal, mas <b>informal exige legenda</b>: o que significa cada caixa, linha e cor. O nível de detalhe é: componentes principais, como se comunicam e com o que se integram. Sistema pequeno não precisa ser desenhado como vários serviços na nuvem.</p>

<h3>3. Como se projeta uma arquitetura</h3>
<table>
<tr><th>Etapa</th><th>O que acontece</th></tr>
<tr><td><b>1. Estabelecer os requisitos arquiteturais</b></td><td>qualidade, restrições e requisitos funcionais</td></tr>
<tr><td><b>2. Projetar a arquitetura</b></td><td>táticas, estilos e componentes</td></tr>
<tr><td><b>3. Validar a arquitetura</b></td><td>cenários, protótipos e perguntas “E se…?”</td></tr>
</table>
<p>Há dois laços: a <b>validação leva a ajustes</b> no projeto e o <b>projeto revela novos requisitos</b>. No Exercício 1 (desenhar o app de delivery) começamos pelo meio, <b>de propósito</b>: desenhar sem os requisitos, para depois ver o que muda.</p>

<h3>4. Por que importa: alicerce e bola de lama</h3>
<p>Arquitetura é como um <b>alicerce</b>: são as decisões que custam caro para mudar. Dá para trocar depois? Dá, mas é caro (linguagem e banco de dados também são decisões arquiteturais; há sistemas críticos que ainda rodam em COBOL). É definida uma vez só? <b>Não</b>: as decisões são feitas, desfeitas e revistas ao longo de toda a vida do software.</p>
<p>Sem arquitetura, qualquer módulo passa a depender de qualquer outro: é a <b>grande bola de lama</b>. O exemplo é um sistema bancário real: de <b>2,5 para 25 milhões</b> de linhas desde o fim dos anos 90; o tempo para um engenheiro novo aprender o sistema foi de <b>3 para 7 meses</b> em cinco anos; as correções de bugs <b>introduziam bugs novos</b>. Documentação detalhada, revisão de código e programação em pares <b>não resolveram</b>.</p>

<h3>5. Requisitos arquiteturais</h3>
<p>Quatro fontes alimentam os requisitos arquiteturais: <b>atributos de qualidade</b>, <b>requisitos funcionais</b>, <b>requisitos dos stakeholders</b> e <b>restrições</b>. Eles <b>inspiram ou demandam</b> as decisões arquiteturais. Restrição também é requisito arquitetural: “4 pessoas, 6 meses, orçamento limitado” ou “usar Python, Flask e SQLAlchemy” limitam as opções.</p>
<div class="ex"><b>Check-in dos treinos.</b> Requisito funcional: cada horário aceita até 20 alunos; depois, lista de espera. Requisitos arquiteturais derivados: <b>integridade</b> (nunca mais de 20 confirmados, mesmo com pedidos simultâneos) e <b>fila</b> (excedentes na ordem de chegada). Táticas: controle de concorrência (transação com bloqueio) e uma tabela ordenada pelo horário da tentativa.</div>
<p><b>Cuidado com dois erros:</b> “suportar múltiplos alunos ao mesmo tempo <b>sem degradação</b>” não tem medida (quantos? em quanto tempo?); e “isolar a lógica de check-in num componente” é uma <b>decisão</b> de projeto, não um requisito.</p>

<h3>6. O cenário de qualidade</h3>
<p>Para escrever um requisito de qualidade verificável: <b>“Quando [algo acontece], em [tal condição], o sistema deve [reagir assim], medido por [um número]”</b>. A versão completa tem <b>seis partes</b>:</p>
<table>
<tr><th>Parte</th><th>O que é</th><th>Exemplo</th></tr>
<tr><td><b>Fonte</b></td><td>quem/o que provoca</td><td>falha interna</td></tr>
<tr><td><b>Estímulo</b></td><td>o que acontece</td><td>um servidor para de responder</td></tr>
<tr><td><b>Ambiente</b></td><td>condição do sistema</td><td>pico, 5h–9h</td></tr>
<tr><td><b>Artefato</b></td><td>parte afetada</td><td>serviço de check-in</td></tr>
<tr><td><b>Resposta</b></td><td>o que o sistema faz</td><td>continua atendendo pelo outro servidor</td></tr>
<tr><td><b>Medida da resposta</b></td><td>como saber se deu certo</td><td>99,9% de disponibilidade na janela</td></tr>
</table>
<div class="dica">Pedido do stakeholder: “disponível para os atletas todos os dias às 6h”. Requisito arquitetural: <b>99,9% de disponibilidade entre 5h e 9h</b>, com tolerância a falhas e recuperação automática. A <b>medida</b> separa um requisito verificável de “o sistema deve ser rápido”.</div>

<h3>7. ISO/IEC 25010:2023, o vocabulário da qualidade</h3>
<p>A norma lista <b>nove características</b>, cada uma com subcaracterísticas:</p>
<table>
<tr><th>Característica</th><th>Subcaracterísticas</th></tr>
<tr><td><b>Adequação funcional</b></td><td>completude, corretude, funcionalidade apropriada</td></tr>
<tr><td><b>Eficiência de desempenho</b></td><td>comportamento no tempo, utilização de recursos, capacidade</td></tr>
<tr><td><b>Compatibilidade</b></td><td>coexistência, interoperabilidade</td></tr>
<tr><td><b>Capacidade de interação</b></td><td>reconhecibilidade, apreensibilidade, operabilidade, proteção contra erros, engajamento, inclusividade, assistência ao usuário, autodescritividade</td></tr>
<tr><td><b>Confiabilidade</b></td><td>ausência de falhas, <b>disponibilidade</b>, tolerância a falhas, recuperabilidade</td></tr>
<tr><td><b>Segurança</b></td><td>confidencialidade, <b>integridade</b>, não repúdio, responsabilização, autenticidade, resistência</td></tr>
<tr><td><b>Manutenibilidade</b></td><td>modularidade, reusabilidade, analisabilidade, <b>modificabilidade</b>, <b>testabilidade</b></td></tr>
<tr><td><b>Flexibilidade</b></td><td>adaptabilidade, <b>escalabilidade</b>, instalabilidade, substituibilidade</td></tr>
<tr><td><b>Segurança física (safety)</b></td><td>restrição operacional, identificação de riscos, falha segura, alerta de perigo, integração segura</td></tr>
</table>
<div class="dica"><b>Complemento (pesquisa):</b> em relação à versão de 2011, “capacidade de interação” ocupa o lugar de usabilidade, “flexibilidade” o de portabilidade, e “segurança física” é nova. Para a prova, o que a professora mostrou é a lista acima.</div>

<h3>8. Requisito arquitetural × requisito não funcional</h3>
<p>O <b>RNF</b> classifica pelo <b>tipo</b> (como o sistema deve ser, não o que faz). O <b>requisito arquitetural</b> classifica pelo <b>impacto</b> (influencia a estrutura). Os dois eixos se cruzam:</p>
<table>
<tr><th></th><th>Afeta a arquitetura</th><th>Não afeta</th></tr>
<tr><td><b>Não funcional</b></td><td>“Disponível 99,9% entre 5h e 9h”</td><td>“Cores suaves e fontes grandes”</td></tr>
<tr><td><b>Funcional</b></td><td>“Avisar o aluno assim que uma vaga for liberada”</td><td>“Gerar o relatório mensal de frequência”</td></tr>
</table>
<div class="dica"><b>Teste prático:</b> “se esse requisito mudasse, a estrutura do sistema mudaria?” Se sim, é arquitetural. A <b>medida</b> decide: “responder em 2 s com 20 usuários” não é arquitetural; “…com 1 milhão de usuários” é.</div>

<h3>9. Táticas arquiteturais</h3>
<p>Uma <b>tática</b> é uma estratégia conhecida e reutilizável para melhorar <b>um atributo de qualidade</b>, <b>sem dizer qual tecnologia usar</b>. A cadeia é: atributo → <b>tática</b> → decisão concreta → tecnologia. Exemplo: disponibilidade → redundância ativa → dois servidores com balanceamento de carga → um balanceador de um provedor de nuvem.</p>
<table>
<tr><th>Atributo</th><th>Táticas</th></tr>
<tr><td><b>Desempenho</b></td><td>manter cópias dos dados (cache), controlar a demanda, introduzir concorrência, aumentar recursos</td></tr>
<tr><td><b>Disponibilidade</b></td><td>detectar falhas, redundância ativa ou passiva, recuperar-se de falhas, degradação controlada</td></tr>
<tr><td><b>Modificabilidade</b></td><td>encapsular, usar intermediários, aumentar a coesão, adiar decisões de vínculo</td></tr>
<tr><td><b>Testabilidade</b></td><td>controlar e observar o estado, limitar a complexidade</td></tr>
<tr><td><b>Segurança</b></td><td>resistir a ataques, detectar ataques, reagir e recuperar-se</td></tr>
<tr><td><b>Usabilidade</b></td><td>apoiar a iniciativa do usuário (desfazer, cancelar), apoiar a iniciativa do sistema</td></tr>
</table>
<div class="dica"><b>Tática ou tecnologia?</b> Teste: “se eu trocar a tecnologia, isso continua valendo?” Se sim, é tática. Cache é tática; Redis, NoSQL e RabbitMQ são tecnologia. Para 20 vagas, um NoSQL ou uma fila seria <b>excesso de engenharia</b>: a tecnologia vem por último.</div>
<p><b>Toda tática tem custo:</b> o cache pode ficar desatualizado; a redundância custa caro mesmo com o reserva parado; intermediários trazem mais indireção e mais código. Escolher entre ganhos e custos é um <b>trade-off</b>, e um <b>estilo arquitetural é um pacote de táticas</b> (tema da aula 2).</p>

<h3>10. Os exercícios da aula</h3>
<ul>
<li><b>Exercício 1</b>: desenhar os principais componentes do app de delivery (cidade média; clientes pedem, restaurantes preparam, entregadores levam), com setas e legenda, guiando-se pelas três perguntas.</li>
<li><b>Exercício 2</b>: a partir das falas do dono, do restaurante, do cliente e do financeiro (e das restrições), escolher três requisitos arquiteturais com medida, uma tática para cada, redesenhar e marcar onde cada tática aparece.</li>
<li><b>Validação “E se…?”</b>: pagamento fora do ar; pico cinco vezes maior; troca do serviço de mapas. Muitas caixas afetadas por uma mudança simples indicam <b>acoplamento</b>.</li>
</ul>
<p>As resoluções estão na aula <b>Exercícios</b>.</p>
`
},

"proj-arq2": {
  resumo: "Correção dos exercícios, escolha de estilos arquiteturais (hexagonal e os oito estilos do sorteio), o caso Tanenbaum × Torvalds, pontos de sensibilidade, trade-off e risco, visões 4+1, ADRs e o docs/arquitetura.md com evidências.",
  html: `
<h3>1. O que a turma errou nos exercícios</h3>
<p>A turma acertou o <b>identificador único</b> contra cobrança dupla, a <b>fila de reenvio</b> ao restaurante e boas medidas (2 s no pico, reenvio em até 30 s, zero cobranças duplicadas). Quatro correções:</p>
<h4>1) Componente não é passo de processo</h4>
<p>Muitos desenharam <b>comportamento</b> (Login → Pedido → Pagamento → Entrega). A arquitetura mostra <b>estrutura</b>: Interface → módulos (Pedidos, Pagamentos, Entregas) → Banco de dados, mais o <b>provedor de pagamento externo</b>. Incluam <b>usuários</b>, <b>sistemas externos</b> e <b>legenda</b>.</p>
<div class="ex">A resposta-modelo do delivery: cliente, restaurante e motoboy usam <b>apps</b>; os apps falam com uma <b>API de entrada</b> do backend; dentro dele ficam os módulos <b>Catálogo, Pagamentos, Pedidos e Entregas</b>; há um <b>banco de dados</b> e dois sistemas externos (provedor de pagamento e serviço de mapas).</div>
<h4>2) Faltou o requisito entre a fala e a tática</h4>
<table>
<tr><th>Fala do stakeholder</th><th>Requisito arquitetural</th><th>Tática</th></tr>
<tr><td>“Preciso receber o pedido na hora, mesmo quando a internet da cozinha falha.”</td><td>o restaurante recebe o pedido em até 30 s depois que a conexão volta</td><td>fila local: armazenar e reenviar</td></tr>
</table>
<p>Sem o requisito não dá para <b>verificar o resultado</b> nem <b>comparar outras soluções</b>. Desempenho e disponibilidade pedem número; “nunca cobrar duas vezes” já é verificável.</p>
<h4>3) Tática não é tecnologia</h4>
<table>
<tr><th>Apareceu</th><th>O que é</th><th>Seria melhor</th></tr>
<tr><td>Nuvem</td><td>tecnologia</td><td>redundância</td></tr>
<tr><td>API de mapa</td><td>tecnologia</td><td>intermediário para o serviço de mapas</td></tr>
<tr><td>Redundância ativa para desempenho</td><td>tática de disponibilidade</td><td>cache, aumentar recursos</td></tr>
<tr><td>Mensageria contra cobrança dupla</td><td>não resolve sozinha</td><td>identificador único por pagamento</td></tr>
<tr><td>Cobrança duplicada como segurança</td><td>atributo errado</td><td>integridade dos dados</td></tr>
</table>
<h4>4) Restrições também decidem</h4>
<p><b>Desenho A</b>: balanceador de carga, API gateway, orquestrador e um serviço separado por função. <b>Desenho B</b>: um backend único em módulos, com um worker e uma fila para o que não é urgente. Qual cabe em <b>4 pessoas, 6 meses e orçamento limitado</b>? O B. Responder isso é <b>escolher um estilo</b>.</p>

<h3>2. Passo 2: escolher estilos e padrões</h3>
<p>Os requisitos arquiteturais são a <b>entrada</b> do projeto; para projetar é preciso <b>selecionar estilos e padrões arquiteturais</b> e <b>alocar os componentes</b>. O resultado são as <b>visões arquiteturais</b> e o <b>documento da arquitetura</b>.</p>
<div class="ex"><b>Tanenbaum × Torvalds.</b> Em 1992, Andrew Tanenbaum (criador do Minix) disse que o Linux já nascia obsoleto por ter <b>kernel monolítico</b>; ele defendia <b>microkernels</b>. Torvalds respondia: menos sobrecarga, mais eficiência. Os microkernels são mais fáceis de depurar e manter, mas têm <b>overhead de comunicação</b>. Em 2009 Torvalds admitiu: “não somos mais o kernel simples, pequeno e hiper-eficiente… nosso kernel está ficando grande e inchado”. (A conversa dos slides é <b>simulada</b>.)</div>
<div class="dica">Decisões arquiteturais podem levar <b>anos</b> para mostrar seus efeitos. Por isso escolher um estilo é escolher um <b>trade-off</b>.</div>

<h3>3. Estilos (ou padrões) arquiteturais</h3>
<p>Um <b>estilo</b> é uma família de sistemas com a mesma organização estrutural: um <b>vocabulário de componentes e conectores</b> e as <b>restrições</b> de como combiná-los. Na prática, é <b>um pacote de táticas já testadas juntas</b>. Alguns autores distinguem estilo e padrão; no curso, não se faz distinção.</p>

<h3>4. Arquitetura hexagonal (ports &amp; adapters)</h3>
<p>A lógica de negócio fica <b>no centro</b>. O mundo externo conversa com ela por <b>portas</b>, através de <b>adaptadores</b>:</p>
<ul>
<li><b>Adaptadores primários (driving)</b> acionam a aplicação: a API, o console, os scripts de teste;</li>
<li><b>Núcleo e portas</b>: o domínio e as interfaces que o núcleo define (porta de entrada = os casos de uso; porta de saída = o que o núcleo precisa do mundo externo, como guardar dados);</li>
<li><b>Adaptadores secundários (driven)</b> são acionados pela aplicação: banco, fila de mensagens, serviços HTTP externos.</li>
</ul>
<p>Um adaptador <b>traduz uma tecnologia</b> (REST, GraphQL, gRPC, SQL) para uma porta. Trocar a tecnologia é trocar <b>só o adaptador</b>; o domínio não muda.</p>
<div class="ex">No delivery: portas de entrada (fazer pedido, confirmar, atualizar entrega); domínio (Pedido, Pagamento, Entrega, Catálogo); portas de saída (guardar dados, cobrar, localizar). Adaptadores REST, WebSocket e de teste na entrada; SQL, pagamento e mapas na saída. Trocar o banco ou o provedor de pagamento muda <b>um adaptador</b>.</div>
<p><b>Nas cinco perguntas:</b> favorece <b>testabilidade e modificabilidade</b>; prejudica a <b>simplicidade</b> (mais classes, mapeamento duplicado); táticas: encapsular, intermediários, adiar vínculos, controlar o estado para testar; <b>não usar</b> em sistemas quase só de cadastro, protótipos descartáveis ou com poucas regras de negócio.</p>

<h3>5. Síntese dos estilos</h3>
<p>Cada grupo apresenta um estilo em 2 a 3 minutos respondendo: como funciona (uma frase e um desenho), o que favorece e prejudica, que táticas reúne, onde caberia no delivery e quando <b>não</b> usar.</p>
<table>
<tr><th>Estilo</th><th>Ideia</th><th>Favorece</th><th>Prejudica</th></tr>
<tr><td><b>Tubos e filtros</b></td><td>cadeia de etapas independentes</td><td>reuso e recombinação das etapas</td><td>interatividade; custo de passar dados</td></tr>
<tr><td><b>Publisher/Subscriber</b></td><td>quem publica não conhece quem assina</td><td>baixo acoplamento, extensibilidade</td><td>rastrear o fluxo; garantias de entrega</td></tr>
<tr><td><b>Cliente/Servidor</b></td><td>servidor central atende clientes</td><td>centralização, gestão, segurança</td><td>servidor como gargalo e ponto único de falha</td></tr>
<tr><td><b>Camadas</b></td><td>pilha em que cada camada usa a de baixo</td><td>modificabilidade, separação de responsabilidades</td><td>desempenho (chamadas atravessam camadas)</td></tr>
<tr><td><b>MVC</b></td><td>modelo, visão e controlador</td><td>separação entre interface e dados</td><td>complexidade em telas simples</td></tr>
<tr><td><b>Microsserviços</b></td><td>serviços pequenos, implantados à parte</td><td>escalar e implantar cada parte separadamente</td><td>complexidade operacional, latência, consistência</td></tr>
<tr><td><b>SOA</b></td><td>serviços reutilizáveis integrados</td><td>reuso e integração entre sistemas</td><td>governança; sobrecarga de comunicação</td></tr>
<tr><td><b>Mensageria (eventos)</b></td><td>comunicação assíncrona por mensagens</td><td>desacoplamento no tempo, tolerância a falhas</td><td>consistência eventual; depuração</td></tr>
</table>
<div class="dica">A coluna “Ideia” é um complemento breve; as colunas “Favorece” e “Prejudica” são as da síntese da professora.</div>

<h3>6. Qual estilo você escolheria?</h3>
<p>Mais de uma resposta pode estar certa: <b>justifique pelos atributos de qualidade</b>.</p>
<table>
<tr><th>Cenário</th><th>Estilo provável e por quê</th></tr>
<tr><td>Sistema de notícias: editores publicam por categoria; leitores se inscrevem</td><td><b>Publisher/Subscriber</b>: baixo acoplamento e extensibilidade</td></tr>
<tr><td>Loja virtual com picos (Black Friday); catálogo, carrinho e pagamento com cargas diferentes</td><td><b>Microsserviços</b>: escala só o que está sob carga (custo: complexidade operacional)</td></tr>
<tr><td>Editor de imagens em que o usuário encadeia operações na ordem que quiser</td><td><b>Tubos e filtros</b>: cada operação é um filtro recombinável</td></tr>
<tr><td>Sensores enviam dados a uma central que analisa e dispara alertas</td><td><b>Mensageria/eventos</b> (ou pub/sub): desacoplamento no tempo e tolerância a falhas</td></tr>
</table>

<h3>7. Três conceitos para analisar uma arquitetura</h3>
<table>
<tr><th>Conceito</th><th>Definição</th><th>Exemplo da aula</th></tr>
<tr><td><b>Ponto de sensibilidade</b></td><td>decisão que afeta um atributo de qualidade</td><td>o tempo de vida do cache afeta o desempenho</td></tr>
<tr><td><b>Ponto de trade-off</b></td><td>decisão que melhora um atributo e piora outro</td><td>separar o domínio do ORM: mais testabilidade, menos simplicidade</td></tr>
<tr><td><b>Risco</b></td><td>decisão que pode comprometer um atributo</td><td>um único servidor de banco: se cair, tudo para</td></tr>
</table>
<h4>Exemplo: hexagonal × microsserviços no delivery</h4>
<table>
<tr><th>Atributo</th><th>Hexagonal (um backend em módulos)</th><th>Microsserviços (um por módulo)</th></tr>
<tr><td>Escalabilidade no pico</td><td>− escala o sistema inteiro junto</td><td>+ escala só pedidos e pagamentos</td></tr>
<tr><td>Disponibilidade</td><td>− uma falha grave pode parar tudo</td><td>+ a falha fica contida num serviço</td></tr>
<tr><td>Simplicidade de operação</td><td>+ um só sistema para implantar e monitorar</td><td>− vários serviços, rede e monitoramento</td></tr>
<tr><td>Consistência dos dados</td><td>+ uma transação num único banco</td><td>− dados espalhados, consistência eventual</td></tr>
<tr><td>Restrições (4 pessoas, 6 meses)</td><td>+ cabe</td><td>− dificilmente cabe</td></tr>
</table>
<p><b>Ponto de trade-off:</b> separar em serviços (mais escalabilidade e isolamento de falhas, menos simplicidade e consistência). <b>Risco:</b> o pagamento ser confirmado e o pedido não, se a comunicação entre serviços falhar. No trabalho, a <b>seção 4</b> pede pelo menos <b>dois pontos de trade-off e um risco</b>.</p>

<h3>8. Documentar: visões arquiteturais</h3>
<p>Uma <b>visão</b> é uma representação de um conjunto de elementos do sistema e das relações entre eles. As visões importantes dependem da finalidade: <b>o que o arquiteto precisa comunicar, e para quem</b>. Documentar uma arquitetura é documentar as visões relevantes e, depois, o que vale para mais de uma visão.</p>
<table>
<tr><th>Visão (4+1, Kruchten 1995)</th><th>Na loja virtual com microsserviços</th><th>Público</th></tr>
<tr><td><b>Lógica</b></td><td>serviços de catálogo, carrinho, pagamento, pedido e notificação</td><td>desenvolvedores e arquitetos</td></tr>
<tr><td><b>Processo</b></td><td>REST e mensagens; pagamento assíncrono</td><td>backend e infraestrutura</td></tr>
<tr><td><b>Desenvolvimento</b></td><td>repositórios separados, um time por serviço, CI</td><td>equipe de desenvolvimento</td></tr>
<tr><td><b>Física</b></td><td>um container por serviço, API gateway, um banco por serviço</td><td>operações</td></tr>
<tr><td><b>Cenários</b></td><td>“usuário finaliza a compra”; “pagamento falha e o pedido é cancelado”</td><td>todos</td></tr>
</table>
<div class="dica">No checkpoint, o diagrama geral da <b>seção 3</b> corresponde às visões <b>lógica e de desenvolvimento</b>, em alto nível. O fluxo de passos que muitos desenharam está mais perto da visão de <b>processo</b> e dos <b>cenários</b>.</div>

<h3>9. ADR: registrar uma decisão de arquitetura</h3>
<p>Um <b>ADR</b> é um documento curto que registra <b>uma única decisão</b>: o contexto, o que foi decidido, as alternativas e as consequências. Serve porque, daqui a seis meses, ninguém lembra por que o domínio não importa o ORM. <b>Não se edita</b>: se a decisão mudar, escreve-se um novo ADR que substitui o anterior.</p>
<pre># 0001 — Manter o domínio independente do ORM
Status: aceito (Fase 1)

## Contexto
As regras de negócio precisam ser testadas sem banco de dados.

## Decisão
Mapeamento imperativo em adapters/orm.py; domain/ não importa o SQLAlchemy.

## Alternativas consideradas
Modelo declarativo (herdar de Base): menos código, mas acopla o domínio ao ORM.

## Consequências
+ Testes de domínio rápidos, sem banco.
− orm.py repete a estrutura das classes.</pre>
<p><b>No Backstage</b> (portal open source do Spotify), os ADRs são públicos: <b>nunca são apagados</b> (a decisão antiga é marcada como substituída, com link para a nova), <b>passam por revisão</b> (cada ADR novo é um pull request) e <b>partem de um modelo</b>. <b>No checkpoint:</b> cada integrante é autor de pelo menos um ADR em <code>docs/adr/</code>; decisões da Fase 1 valem; as <b>consequências</b> são o trade-off.</p>
<div class="dica"><b>Complemento (pesquisa):</b> o formato foi popularizado por Michael Nygard (2011), com os campos título, status, contexto, decisão e consequências; o status costuma ser proposto, aceito, descontinuado ou substituído.</div>

<h3>10. O <code>docs/arquitetura.md</code> e as evidências</h3>
<table>
<tr><th>Seção</th><th>Pergunta-guia</th></tr>
<tr><td><b>1. Escopo</b></td><td>o que o sistema faz e para quem?</td></tr>
<tr><td><b>2. Requisitos</b></td><td>quais três atributos mais importam, em que ordem, e como saber se foram atendidos? Restrições e objetivos?</td></tr>
<tr><td><b>3. Arquitetura atual</b></td><td>que estilo e padrões, e onde estão no código?</td></tr>
<tr><td><b>4. Trade-offs</b></td><td>o que ganha e perde em cada atributo? Pontos de trade-off e riscos?</td></tr>
<tr><td><b>5. Alternativa</b></td><td>outra arquitetura seria melhor para este domínio? Qual escolheriam hoje?</td></tr>
<tr><td><b>6. Evidências</b></td><td>que dados do repositório sustentam a análise?</td></tr>
<tr><td><b>ADRs</b></td><td>que decisões importantes foram tomadas, e por quê?</td></tr>
</table>
<p>Como medir as <b>evidências</b> (citar o hash do commit ou o resultado do comando):</p>
<table>
<tr><th>Afirmação</th><th>Como medir</th></tr>
<tr><td>Adicionar um caso de uso mudou N arquivos</td><td><code>git show --stat &lt;hash&gt;</code></td></tr>
<tr><td>Testes unitários muito mais rápidos que os e2e</td><td><code>time pytest tests/unit</code> e <code>time pytest tests/e2e</code></td></tr>
<tr><td>O mapeamento custa N linhas</td><td><code>wc -l src/&lt;pacote&gt;/adapters/orm.py</code></td></tr>
<tr><td>O domínio não depende do ORM</td><td><code>grep -rn sqlalchemy src/&lt;pacote&gt;/domain/</code></td></tr>
<tr><td>Quem mudou um arquivo, e quando</td><td><code>git log --oneline -- &lt;arquivo&gt;</code></td></tr>
</table>
`
},
"proj-solid1": {
  resumo: "Por que SOLID, revisão de coesão, acoplamento e UML, a origem dos princípios, e os dois primeiros em detalhe: responsabilidade única (SRP) e aberto-fechado (OCP), com os exemplos do Pedido e do Envio e o trade-off de aplicá-los.",
  html: `
<h3>1. Por que estudar SOLID</h3>
<p>Você já <b>mudou uma coisa e quebrou outra</b>? Teve <b>medo de mexer</b> num código que funciona? Tentou <b>reaproveitar uma classe</b> e não conseguiu? Isso acontece porque <b>tudo muda o tempo todo</b> (requisitos, regras de negócio, tecnologias) e <b>mudar pode custar caro</b>: às vezes uma alteração gera efeito cascata e retrabalho. A pergunta da aula é: <b>o que podemos fazer para aumentar a qualidade do software?</b></p>
<p>Nas aulas de Arquitetura olhamos as caixas grandes (pacotes e serviços) e o teste do “e se…”: se esse requisito mudasse, a <b>estrutura</b> mudaria? Hoje descemos <b>para dentro de um pacote</b>, onde ficam as <b>classes e as relações entre elas</b>. A pergunta é a mesma, em outra escala: se esse requisito mudasse, <b>quantas classes eu editaria</b>? E a <b>bola de lama</b> também pode acontecer dentro de um módulo.</p>

<h3>2. Revisão de orientação a objetos</h3>
<p>Os conceitos revistos: classes, objetos, atributos, métodos, abstração, encapsulamento, relacionamentos e herança, polimorfismo, <b>modularidade, coesão e acoplamento</b>. Os três últimos são o foco. A regra geral (livro de Booch): o sistema deve ser composto de objetos <b>altamente coesos e fracamente acoplados</b>.</p>
<table>
<tr><th>Conceito</th><th>Ideia</th><th>Perguntas</th></tr>
<tr><td><b>Coesão</b></td><td>uma classe deve ter <b>uma única função</b>, oferecer um único serviço (vale também para funções, métodos e pacotes)</td><td>a classe faz coisas que pertencem a ela? Qual o propósito? (ex.: <code>Pedido</code> calcula o total do pedido)</td></tr>
<tr><td><b>Acoplamento</b></td><td>nenhuma classe é uma ilha: classes dependem umas das outras; importa a <b>qualidade</b> do acoplamento (aceitável × ruim)</td><td>quanto uma classe depende de outra? Mudar uma obriga a mudar a outra? (ex.: <code>Envio</code> conhece “terrestre” e “aéreo”)</td></tr>
</table>
<div class="ex">Uma cozinha com um cozinheiro para cada coisa (coesão) e que não precisa de uma receita nova a cada vez que muda o prato do cliente (acoplamento fraco) é mais fácil de manter que uma pessoa que faz tudo e cujos movimentos dependem de todos os outros.</div>

<h3>3. Revisão de UML</h3>
<table>
<tr><th>Elemento</th><th>Significa</th><th>Exemplo</th></tr>
<tr><td><b>Classe</b></td><td><code>- atributo</code>, <code>+ método()</code></td><td><code>Pedido</code></td></tr>
<tr><td><b>Herança</b></td><td>“<b>é um</b>”</td><td><code>PicaPau</code> é uma <code>Ave</code></td></tr>
<tr><td><b>Implementa</b></td><td>“<b>cumpre o contrato</b>” (seta tracejada)</td><td><code>Aéreo</code> implementa a interface <code>Envio</code></td></tr>
<tr><td><b>Agregação</b></td><td>“<b>tem um</b>” (losango)</td><td><code>Pedido</code> tem um <code>Envio</code></td></tr>
</table>
<p>Perguntas da professora para pensar: qual a diferença entre “é um” e “tem um”? Em Java, uma classe herda de duas classes? <b>Não.</b> E implementa duas interfaces? <b>Sim.</b> E o que uma subclasse “promete” ao herdar? Promete cumprir o <b>contrato da superclasse</b>: poder ser usada onde a superclasse é esperada (ideia do <b>L</b>, na parte 2).</p>

<h3>4. O que é SOLID</h3>
<p>SOLID é um acrônimo de <b>cinco princípios</b> para facilitar a <b>compreensão, o desenvolvimento e a manutenção</b> de software. Foram introduzidos por <b>Robert C. Martin</b> (“Uncle Bob”) no artigo de <b>2000</b> <i>“Design Principles and Design Patterns”</i>, também chamados de <i>“Principles of Object Oriented Class Design”</i>; o acrônimo veio depois, por <b>Michael Feathers</b>.</p>
<table>
<tr><th></th><th>Princípio</th><th>Em uma frase</th></tr>
<tr><td><b>S</b></td><td>Single Responsibility (SRP)</td><td>uma classe, um único motivo para mudar</td></tr>
<tr><td><b>O</b></td><td>Open-Closed (OCP)</td><td>aberto para extensão, fechado para modificação</td></tr>
<tr><td><b>L</b></td><td>Liskov Substitution (LSP)</td><td>subclasses podem substituir suas superclasses</td></tr>
<tr><td><b>I</b></td><td>Interface Segregation (ISP)</td><td>interfaces pequenas e específicas</td></tr>
<tr><td><b>D</b></td><td>Dependency Inversion (DIP)</td><td>dependa de abstrações, não de implementações</td></tr>
</table>
<p>Esta aula (parte 1) cobre <b>S</b> e <b>O</b>; <b>L, I e D</b> ficam para a parte 2.</p>

<h3>5. S — Responsabilidade Única (SRP)</h3>
<p><b>Uma classe deve ter um e apenas um motivo para mudar</b>, ou seja, apenas uma função. A figura da aula: um robô que diz “sou chef, jardineiro, pintor e motorista” (ruim) × quatro robôs, cada um com uma função (bom).</p>
<ul>
<li><b>Problema:</b> com muitas responsabilidades, cresce a chance de <b>bugs</b>, porque mexer numa responsabilidade pode afetar as outras sem você perceber;</li>
<li><b>Objetivo:</b> <b>separar comportamentos</b>, para que um bug vindo de uma alteração não afete comportamentos não relacionados;</li>
<li><b>Dica:</b> pense em <b>quem pede a mudança</b>: regra de negócio, layout ou banco de dados.</li>
</ul>
<h4>Exemplo: o Pedido que faz tudo</h4>
<p>A classe <code>Pedido</code> com os métodos <i>calcularTotalPedido, getItens, getQtdItens, adicionaItem, removeItem, imprimePedido, exibePedido, buscaPedido, salvaPedido, atualizaPedido e apagaPedido</i> tem <b>três motivos para mudar</b>:</p>
<table>
<tr><th>Regra de negócio</th><th>Apresentação</th><th>Persistência</th></tr>
<tr><td>calcularTotalPedido, getItens, getQtdItens, adicionaItem, removeItem</td><td>imprimePedido, exibePedido</td><td>buscaPedido, salvaPedido, atualizaPedido, apagaPedido</td></tr>
</table>
<p>Solução: três classes — <code>Pedido</code>, <code>VisualizadorPedido</code> e <code>PedidoRepositório</code> — as duas últimas dependendo de <code>Pedido</code>. <b>Cada classe muda por um único motivo.</b></p>
<pre>class Pedido {                       // regra de negócio
    float calcularTotalPedido() { ... }
    List&lt;Item&gt; getItens() { ... }
    void adicionaItem(Item i) { ... }
    void removeItem(Item i) { ... }
}
class PedidoRepositorio {            // persistência
    Pedido busca(int id) { ... }
    void salva(Pedido p) { ... }
    void atualiza(Pedido p) { ... }
    void apaga(Pedido p) { ... }
}
class VisualizadorPedido {           // apresentação
    void imprime(Pedido p) { ... }
    void exibe(Pedido p) { ... }
}</pre>
<div class="dica"><b>Complemento (pesquisa):</b> mais tarde Martin reformulou o SRP: uma classe deve responder a <b>um único ator</b> (o grupo de pessoas que pede a mudança). É o mesmo espírito da dica da professora: “juntar o que muda pelo mesmo motivo e separar o que muda por motivos diferentes”. Atenção: SRP <b>não</b> é “uma classe com um único método”.</div>

<h3>6. O — Aberto-Fechado (OCP)</h3>
<p><b>Entidades devem estar abertas para extensão, mas fechadas para modificação.</b> A figura: um robô que sabe cortar vira “agora corto e pinto” <b>acrescentando</b> a função de pintar, sem perder a de cortar.</p>
<ul>
<li><b>Razão:</b> mudar o comportamento atual de uma classe <b>afeta todos os sistemas que a utilizam</b>; para ela fazer mais, o ideal é <b>adicionar</b> funcionalidades, não modificar as já implementadas;</li>
<li><b>Objetivo:</b> <b>estender</b> o comportamento sem alterar o existente, evitando falhas nos locais onde a classe é usada;</li>
<li><b>Dica:</b> código que <b>já funciona e foi testado</b> não precisa ser editado.</li>
</ul>
<h4>Exemplo: o custo de envio</h4>
<pre>public float getCustoEnvio() {
    if (this.envio.equals("terrestre")) {
        // grátis para pedidos grandes
        if (this.calculaTotalPedido() &gt; 100) {
            return 0.0f;
        }
        // R$1,50 por quilo, mínimo de R$10,00
        return Math.max(10, this.calcularPesoTotal() * 1.5f);
    }
    if (this.envio.equals("aereo")) {
        // R$3,00 por quilo, mínimo de R$30,00
        return Math.max(30, this.calcularPesoTotal() * 3);
    }
    throw new IllegalStateException("Envio desconhecido");
}</pre>
<p><b>O que há de errado?</b> O <code>Pedido</code> conhece cada tipo de envio. E se surgir o <b>envio expresso</b>? Seria mais um <code>if</code>, <b>editando</b> a classe (e arriscando os tipos que já funcionam). É acoplamento ruim.</p>
<p><b>Como corrigir:</b> uma <b>interface</b> <code>Envio</code> com <code>getCustoEnvio(Pedido)</code> e <code>getDataEnvio(Pedido)</code>, e uma classe por tipo. O <code>Pedido</code> só delega:</p>
<pre>interface Envio {
    float getCustoEnvio(Pedido pedido);
    Date getDataEnvio(Pedido pedido);
}

class Terrestre implements Envio {
    public float getCustoEnvio(Pedido pedido) {
        // Envio terrestre grátis para grandes pedidos
        if (pedido.calculaTotalPedido() &gt; 100) return 0.0f;
        // R$1,5 por quilo, mas R$10,00 de mínimo
        return Math.max(10, pedido.calcularPesoTotal() * 1.5f);
    }
    // getDataEnvio ...
}

class Pedido {
    private Envio envio;
    public void setEnvio(Envio e) { this.envio = e; }
    public float getCustoEnvio() {
        return envio.getCustoEnvio(this);   // só delega
    }
}</pre>
<div class="ex">Novo tipo de envio = <b>nova classe</b> <code>Expresso</code> que implementa <code>Envio</code>. O <code>Pedido</code> <b>não muda</b>. Como uma tomada: você liga um aparelho novo sem abrir a parede.</div>
<p>Repare no que aconteceu: o <code>Pedido</code> passou a depender de uma <b>abstração</b> (a interface), e o polimorfismo escolhe a implementação. Esse é o primeiro passo rumo ao <b>D</b>.</p>

<h3>7. SOLID é um trade-off</h3>
<p>“Toda prática tem um custo: vale avaliar antes de aplicar sempre.”</p>
<table>
<tr><th>Ganhos</th><th>Custos</th></tr>
<tr><td>mudar <b>sem efeito cascata</b></td><td>mais classes e mais interfaces</td></tr>
<tr><td><b>reusar e testar</b> classes isoladas</td><td>mais indireção para navegar</td></tr>
<tr><td><b>entender e evoluir</b> o código</td><td><b>excesso de engenharia</b> em sistema pequeno</td></tr>
</table>
<div class="dica">Mesma lógica da aula 2 de Arquitetura: escolher uma tática ou um estilo é escolher um <b>trade-off</b>. Aplique SOLID onde há <b>variação real</b> ou <b>dor de mudança</b>, não por reflexo.</div>

<h3>8. Sinais de que há violação (complemento)</h3>
<ul>
<li><b>SRP:</b> uma classe “que faz tudo”; métodos de áreas diferentes (regra, tela, banco) juntos; mudanças de assuntos diferentes caindo sempre no mesmo arquivo;</li>
<li><b>OCP:</b> cadeias de <code>if/else</code> ou <code>switch</code> <b>por tipo</b>; cada nova variação obriga a editar uma classe antiga; uma mudança simples que mexe em muitas classes.</li>
</ul>
<p>Na parte 2: <b>L</b> (subclasse substitui a superclasse), <b>I</b> (interfaces pequenas) e <b>D</b> (depender de abstrações).</p>
`
},

"proj-ex": {
  resumo: "Exercícios resolvidos das aulas de Arquitetura (delivery: requisitos, táticas, redesenho, E se…, estilos, trade-offs, ADR) e de SOLID (SRP e OCP: Pedido, Envio e um exercício de Funcionário). As respostas são resolução própria.",
  html: `
<h3>Sobre esta página</h3>
<p>Os slides trazem os <b>enunciados</b> dos exercícios; aqui cada um vem com uma resposta explicada, usando a matéria das três aulas.</p>
<div class="dica">As respostas são uma <b>resolução própria</b>, não o gabarito das professoras. Em Arquitetura há mais de uma solução certa: compare o <b>raciocínio</b> (requisito com medida → tática → onde aparece no desenho). O código do exercício em duplas de SRP + OCP (“uma empresa gerencia seus funcionários com este código”) <b>não está no texto dos slides</b>; usei um exemplo equivalente.</div>

<h3>Parte 1 — Arquitetura (app de delivery)</h3>
<p><i>Uma versão de um app como o iFood para uma cidade média: clientes pedem, restaurantes preparam, entregadores levam. Restrições: 4 desenvolvedores, 6 meses, orçamento limitado.</i></p>

<h4>Exercício 1 — Desenhe os principais componentes</h4>
<p>Guia: quais componentes? como se comunicam? quais as decisões técnicas principais? Uma resposta possível (visão estrutural de alto nível):</p>
<table>
<tr><th>Elemento</th><th>Tipo na legenda</th><th>Liga-se a</th></tr>
<tr><td>Cliente, Restaurante, Motoboy</td><td>usuário</td><td>seus apps</td></tr>
<tr><td>Apps do cliente, do restaurante e do motoboy</td><td>interface</td><td>API de entrada</td></tr>
<tr><td>API (entrada)</td><td>interface</td><td>os módulos</td></tr>
<tr><td>Catálogo, Pedidos, Pagamentos, Entregas</td><td>módulo de negócio</td><td>banco; Pagamentos → provedor; Entregas → mapas</td></tr>
<tr><td>Banco de dados</td><td>armazenamento</td><td>—</td></tr>
<tr><td>Provedor de pagamento; Serviço de mapas</td><td>sistema externo</td><td>—</td></tr>
</table>
<p>Decisão técnica principal: <b>um backend único em módulos</b> (cabe em 4 pessoas e 6 meses). <b>Legenda:</b> usuário, interface, módulo de negócio, armazenamento, sistema externo, seta = “usa/depende de”. Erro a evitar: desenhar o <b>fluxo</b> (Login → Pedido → Pagamento → Entrega) em vez da estrutura.</p>

<h4>Exercício 2 — Três requisitos arquiteturais, com medida e táticas</h4>
<table>
<tr><th>Fala</th><th>Requisito arquitetural (com medida)</th><th>Atributo</th><th>Táticas</th></tr>
<tr><td><b>Dono:</b> “No almoço e no jantar, os pedidos triplicam. Ninguém pode ficar esperando o app carregar.”</td><td>com 3× pedidos no pico, as telas principais carregam em até <b>2 s</b> para <b>95%</b> das requisições</td><td>desempenho, escalabilidade</td><td>cache do cardápio; aumentar recursos; concorrência (worker); controlar a demanda</td></tr>
<tr><td><b>Restaurante:</b> “Preciso receber o pedido na hora, mesmo quando a internet da cozinha falha.”</td><td>após a conexão voltar, o restaurante recebe os pedidos pendentes em até <b>30 s</b>, sem perder nenhum</td><td>disponibilidade, recuperabilidade</td><td>detectar falhas; fila local (armazenar e reenviar)</td></tr>
<tr><td><b>Cliente:</b> “Quero ver onde o entregador está.”</td><td>posição do entregador com atraso de no máximo <b>10 s</b> durante a entrega</td><td>desempenho, modificabilidade</td><td>intermediário para o serviço de mapas; degradação controlada (última posição conhecida)</td></tr>
<tr><td><b>Financeiro:</b> “Um pedido nunca pode ser cobrado duas vezes.”</td><td><b>0</b> cobranças duplicadas por pedido, mesmo com retentativa ou falha de rede</td><td>integridade (segurança, ISO 25010)</td><td>identificador único por pagamento (idempotência); transação</td></tr>
</table>
<div class="dica">Atenção ao erro comum: <b>“API de mapa”</b>, <b>“nuvem”</b> e <b>“mensageria”</b> são tecnologia, não tática. “Cobrança duplicada” é <b>integridade</b>, não segurança contra ataque.</div>
<p>Escolhi três requisitos para o enunciado e deixei o quarto (cliente) também resolvido para treino.</p>

<h4>Passos 3 e 4 — A arquitetura mudou? Marque onde cada tática aparece</h4>
<ul>
<li><b>Cache</b> dentro do módulo Catálogo (desempenho);</li>
<li><b>Fila local + reenvio</b> entre Pedidos e o restaurante (disponibilidade);</li>
<li><b>Adaptador de mapas</b> entre Entregas e o serviço externo (modificabilidade);</li>
<li><b>Identificador único</b> em Pagamentos, antes de chamar o provedor (integridade);</li>
<li>um <b>worker</b> para o que não é urgente.</li>
</ul>

<h4>Validação “E se…?”</h4>
<table>
<tr><th>Pergunta</th><th>Caixas afetadas</th><th>O que a arquitetura deve fazer</th></tr>
<tr><td>… o serviço de <b>pagamento</b> ficar fora do ar?</td><td>Pagamentos (e seu adaptador); Pedidos fica “aguardando pagamento”</td><td>degradação controlada; fila de retentativa; id único para não cobrar duas vezes. Catálogo e Entregas não deveriam parar.</td></tr>
<tr><td>… o <b>pico</b> for 5× maior que o previsto?</td><td>API, Catálogo, Pedidos e o banco (gargalo provável)</td><td>reforçar cache, replicar o backend, mover o não urgente para o worker/fila. Se o banco único não aguentar: <b>risco</b> a registrar.</td></tr>
<tr><td>… trocarmos o <b>serviço de mapas</b>?</td><td>só o adaptador de mapas</td><td>se Entregas, API e apps chamassem o fornecedor direto, muitas caixas mudariam: <b>acoplamento</b>.</td></tr>
</table>

<h4>Qual estilo você escolheria?</h4>
<table>
<tr><th>Cenário</th><th>Resposta e justificativa</th></tr>
<tr><td>1. Notícias por categoria, leitores se inscrevem</td><td><b>Publisher/Subscriber</b>: baixo acoplamento, extensibilidade (nova categoria sem mexer no resto)</td></tr>
<tr><td>2. Loja virtual com pico de Black Friday</td><td><b>Microsserviços</b>: escala só o catálogo/carrinho sob carga e isola falhas; custo: complexidade operacional. Alternativa para equipe pequena: backend modular com cache e fila</td></tr>
<tr><td>3. Editor de imagens com operações encadeadas</td><td><b>Tubos e filtros</b>: cada operação é um filtro recombinável</td></tr>
<tr><td>4. Sensores → central → alertas</td><td><b>Mensageria/eventos</b> (ou pub/sub): desacoplamento no tempo e tolerância a falhas; cliente/servidor deixaria a central como ponto único de falha</td></tr>
</table>
<p>E para o <b>delivery</b> (4 pessoas, 6 meses): <b>backend único em módulos, hexagonal, com worker e fila</b>. Ganha testabilidade e modificabilidade; perde escalabilidade por módulo e isolamento de falhas.</p>

<h4>3 minutos — Um trade-off do delivery</h4>
<table>
<tr><th>Decisão</th><th>Melhora</th><th>Piora</th><th>Risco</th></tr>
<tr><td>Fila para o restaurante</td><td>disponibilidade</td><td>simplicidade; pedido pode chegar atrasado</td><td>reenvio e pedido preparado duas vezes sem id único</td></tr>
<tr><td>Cache do cardápio</td><td>desempenho no pico</td><td>consistência (dado desatualizado)</td><td>pedido feito com preço antigo</td></tr>
<tr><td>Adaptador de pagamento</td><td>modificabilidade e testabilidade</td><td>simplicidade (mais classes)</td><td>mapeamento entre modelos mal feito</td></tr>
<tr><td>Separar em serviços</td><td>escalabilidade, isolamento de falhas</td><td>simplicidade, consistência</td><td>pagamento confirmado e pedido não</td></tr>
</table>

<h4>Reescrever requisitos fracos</h4>
<table>
<tr><th>Fraco</th><th>Verificável (cenário em seis partes)</th></tr>
<tr><td>“O app deve ser rápido.”</td><td><b>Fonte</b>: cliente · <b>Estímulo</b>: abre o cardápio · <b>Ambiente</b>: pico do almoço (3×) · <b>Artefato</b>: Catálogo · <b>Resposta</b>: exibe o cardápio · <b>Medida</b>: até 2 s para 95% das aberturas</td></tr>
<tr><td>“Suportar vários alunos ao mesmo tempo sem degradação.”</td><td>quando N alunos fazem check-in no mesmo segundo, o sistema confirma no máximo 20 por horário e responde em até X s, medido por 0 vagas excedidas</td></tr>
</table>

<h4>ADR de exemplo — fila local para o restaurante</h4>
<pre># 0002 — Fila local para reenviar pedidos ao restaurante
Status: aceito

## Contexto
A internet da cozinha falha; o pedido deve chegar em até 30 s depois que a conexão volta.

## Decisão
Guardar o pedido numa fila local e reenviar até receber confirmação.

## Alternativas consideradas
Tentar uma vez e avisar o cliente: simples, mas perde pedidos.

## Consequências
+ Nenhum pedido se perde.
− Um componente a mais para manter; o pedido pode chegar atrasado;
  exige identificador único para evitar duplicidade.</pre>

<h3>Parte 2 — SOLID (SRP e OCP)</h3>

<h4>Exercício 1 — “O que há de errado aqui?” (classe Pedido)</h4>
<p>A classe mistura <b>regra de negócio</b>, <b>apresentação</b> e <b>persistência</b>: tem três motivos para mudar (negócio, layout, banco). Um bug ao mexer no banco pode afetar o cálculo do total sem que ninguém perceba. A divisão (SRP) está na aula <b>SOLID 1</b>: <code>Pedido</code>, <code>VisualizadorPedido</code> e <code>PedidoRepositório</code>.</p>

<h4>Exercício 2 — O custo de envio (OCP)</h4>
<p>O <code>getCustoEnvio()</code> usa um <code>if</code> por tipo de envio dentro do <code>Pedido</code>. Para incluir o <b>envio expresso</b>, seria preciso editar a classe. Correção: interface <code>Envio</code>; <code>Terrestre</code>, <code>Aereo</code> e <code>Expresso</code> a implementam; o <code>Pedido</code> delega. <b>Novo tipo = nova classe; o Pedido não muda.</b> Em UML: <code>Pedido</code> ◇→ <code>Envio</code>; as três classes ⇢▷ <code>Envio</code>.</p>

<h4>Exercício em duplas (SRP + OCP) — exemplo equivalente: Funcionário</h4>
<p>Uma empresa gerencia seus funcionários com este código:</p>
<pre>class Funcionario {
    String nome; String cargo; double salarioBase;

    double calcularSalario() {                    // regra de negócio
        if (cargo.equals("gerente"))   return salarioBase * 1.4;
        if (cargo.equals("vendedor"))  return salarioBase + comissao();
        if (cargo.equals("estagiario")) return salarioBase;
        throw new IllegalStateException("Cargo desconhecido");
    }
    String gerarRelatorioHtml() {                 // apresentação
        return "&lt;tr&gt;&lt;td&gt;" + nome + "&lt;/td&gt;&lt;td&gt;" + calcularSalario() + "&lt;/td&gt;&lt;/tr&gt;";
    }
    void salvarNoBanco() { /* INSERT ... */ }     // persistência
}</pre>
<p><b>a) Sublinhe e responda: quais as responsabilidades?</b> Três: regra de negócio (salário), apresentação (HTML) e persistência (banco). Quem pede cada mudança: RH/financeiro, quem cuida do layout e quem cuida dos dados.</p>
<p><b>b) Qual violação de OCP?</b> O <code>if</code> por cargo em <code>calcularSalario()</code>: <b>cada novo cargo</b> obriga a editar <code>Funcionario</code> e arrisca quebrar os existentes.</p>
<p><b>c) Desenhe a solução:</b></p>
<pre>interface PoliticaSalarial { double calcular(Funcionario f); }

class Gerente    implements PoliticaSalarial { ... }   // salarioBase * 1.4
class Vendedor   implements PoliticaSalarial { ... }   // salarioBase + comissao
class Estagiario implements PoliticaSalarial { ... }   // salarioBase

class Funcionario {                       // só dados + regra de negócio
    private PoliticaSalarial politica;
    double calcularSalario() { return politica.calcular(this); }
}
class FuncionarioRepositorio { void salvar(Funcionario f) { ... } }
class RelatorioFuncionario   { String gerarHtml(Funcionario f) { ... } }</pre>
<p>Resultado: <b>SRP</b> (três classes, um motivo cada) e <b>OCP</b> (novo cargo = nova classe que implementa <code>PoliticaSalarial</code>).</p>

<h4>Qual princípio está sendo violado?</h4>
<table>
<tr><th>Situação</th><th>Princípio</th><th>Por quê</th></tr>
<tr><td><code>Relatorio</code> com <code>if (formato == pdf) … else if (csv)</code></td><td><b>OCP</b></td><td>novo formato = editar a classe → interface <code>Formatador</code></td></tr>
<tr><td><code>Usuario</code> que valida, grava no banco e envia e-mail</td><td><b>SRP</b></td><td>três motivos para mudar</td></tr>
<tr><td><code>Desconto</code> com <code>switch</code> por tipo de cliente</td><td><b>OCP</b></td><td>novo tipo = novo case → interface <code>Desconto</code></td></tr>
<tr><td><code>Fatura</code> que calcula imposto e desenha a tela</td><td><b>SRP</b></td><td>regra fiscal e apresentação juntas</td></tr>
</table>
<div class="dica">Regra prática: <b>if/switch por tipo</b> → OCP; <b>métodos de “áreas” diferentes na mesma classe</b> → SRP.</div>

<h4>Teste do “e se…” nas classes</h4>
<p><b>A alíquota do imposto mudou: quantas classes editar?</b> Num bom projeto, <b>uma</b> (a da regra de negócio). Se for preciso mexer em tela, banco e mais classes, há responsabilidades misturadas e/ou <b>acoplamento ruim</b> — o mesmo sinal que, na arquitetura, aparece como muitas caixas afetadas por uma mudança simples.</p>

<h4>Pegadinhas e quando não aplicar</h4>
<ul>
<li><b>SRP ≠ “um método por classe”:</b> é um único <b>motivo para mudar</b>;</li>
<li><b>OCP ≠ “nunca editar”:</b> bugs e mudanças na mesma regra ainda exigem edição; o OCP trata de <b>acrescentar variações</b> sem mexer no que funciona;</li>
<li><b>SOLID é trade-off:</b> em sistema pequeno ou protótipo, se só existe um tipo de envio e nada indica outros, a interface é <b>excesso de engenharia</b> (mais classes, mais indireção). Aplique onde há variação real ou dor de mudança.</li>
</ul>
`
},
};
