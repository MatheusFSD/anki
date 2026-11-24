/* Projeto de Software — resumos das aulas, em linguagem simples (aba "Resumos").
   A chave é o id da aula em data-projeto.js. Mesmo formato de resumos-gpms.js.
   Escritos a partir do texto dos slides (Arquitetura: aulas 1 e 2; SOLID: partes 1 e 2; Aula 9: Frameworks).
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

"proj-solid2": {
  resumo: "Os três princípios que faltavam do SOLID, com os exemplos da aula: substituição de Liskov (aves e documentos), segregação de interfaces (aves que voam) e inversão de dependência (lembrete de senha e banco de dados), mais LSP × ISP, o trade-off e os exercícios.",
  html: `
<h3>1. Onde estamos</h3>
<p>Na parte 1 vimos <b>S</b> (uma classe, um único motivo para mudar) e <b>O</b> (aberto para extensão, fechado para modificação). Hoje fecham-se as três letras que faltam. A pergunta de sempre continua: <b>o que podemos fazer para aumentar a qualidade do software?</b> A resposta dos princípios é buscar <b>alta coesão</b> (cada classe com um papel) e <b>baixo acoplamento</b> (classes que dependem pouco umas das outras).</p>
<table>
<tr><th></th><th>Princípio</th><th>Em uma frase</th><th>Pergunta que ajuda</th></tr>
<tr><td><b>L</b></td><td>Liskov Substitution (LSP)</td><td>subclasses podem substituir suas superclasses</td><td>posso trocar o filho pelo pai, sem surpresa?</td></tr>
<tr><td><b>I</b></td><td>Interface Segregation (ISP)</td><td>interfaces pequenas e específicas</td><td>a classe é obrigada a implementar algo que não usa?</td></tr>
<tr><td><b>D</b></td><td>Dependency Inversion (DIP)</td><td>dependa de abstrações, não de implementações</td><td>a regra de negócio conhece a ferramenta concreta?</td></tr>
</table>

<h3>2. L — Substituição de Liskov (LSP)</h3>
<p><b>Uma subclasse deve poder ser usada no lugar da superclasse sem causar efeitos inesperados.</b> Na figura da aula, o robô <b>Sam</b> faz café e seu filho <b>Eden</b> é um robô-filho. Se alguém pede café ao Eden e ele devolve <b>água</b>, ele quebrou a promessa do pai (errado). Se devolve um <b>cappuccino</b>, é café do mesmo jeito, só de um tipo específico (certo).</p>
<p>A definição formal, de Barbara Liskov, diz que uma propriedade demonstrável para os objetos de um tipo T deve continuar demonstrável para os objetos de qualquer subtipo de T. Em português simples: <b>o que vale para o pai também precisa valer para o filho</b>. A classe filha deve processar as mesmas solicitações e entregar o mesmo resultado (ou um resultado do mesmo tipo). Se não faz isso, foi alterada de forma fundamental.</p>
<div class="dica">Teste rápido: <b>“Posso trocar o filho pelo pai, sem surpresa?”</b> O objetivo é garantir consistência: o pai e as filhas são usados do mesmo jeito, sem erros.</div>

<h4>Exemplo 1 — Aves: o pinguim que não voa</h4>
<p><code>Ave</code> tem <code>voar()</code> e <code>bicar()</code>; <code>PicaPau</code> e <code>Pinguim</code> herdam dela. O pica-pau voa. O pinguim não, então sobrescreve <code>voar()</code> para lançar uma exceção. O código do cliente, que funcionava com qualquer ave, passa a quebrar:</p>
<pre>class Ave {
    void voar()  { /* ... */ }
    void bicar() { /* ... */ }
}
class PicaPau extends Ave { }
class Pinguim extends Ave {
    @Override
    void voar() {
        throw new UnsupportedOperationException("Pinguim nao voa");
    }
}
// cliente
for (Ave a : aves) a.voar();   // explode no primeiro pinguim</pre>
<p><b>Não posso usar o Pinguim no lugar da Ave sem quebrar o sistema.</b> A correção é fazer a hierarquia refletir <b>o que cada classe realmente consegue fazer</b>:</p>
<pre>class Ave { void bicar() { /* ... */ } }
class AveVoadora extends Ave { void voar() { /* ... */ } }
class PicaPau extends AveVoadora { }
class Pinguim extends Ave { }</pre>
<p>Quem precisa voar pede uma <code>AveVoadora</code>; quem só precisa de uma <code>Ave</code> aceita qualquer uma, inclusive o pinguim.</p>

<h4>Exemplo 2 — Documentos: o arquivo somente leitura</h4>
<p><code>Documento</code> tem <code>abrir()</code> e <code>salvar()</code>. <code>Projeto</code> tem vários documentos e os métodos <code>abrirTodos()</code> e <code>salvarTodos()</code>. O <code>DoctoSomenteLeitura</code> herda de <code>Documento</code>, mas não pode salvar:</p>
<pre>class DoctoSomenteLeitura extends Documento {
    @Override
    void salvar() {
        throw new UnsupportedOperationException(
                nome + " é somente leitura");
    }
}
class Projeto {
    private List&lt;Documento&gt; documentos;
    void salvarTodos() {
        // explode no primeiro somente leitura
        documentos.forEach(Documento::salvar);
    }
}</pre>
<p>Correção: <code>Documento</code> fica só com <code>abrir()</code>, e uma nova subclasse <code>DoctoEscrevivel</code> <b>acrescenta</b> <code>salvar()</code>. O <code>Projeto</code> passa a ter uma lista de <code>documentosEscreviveis</code> e <code>salvarTodos()</code> percorre apenas esses. Assim a herança <b>mantém a consistência e cumpre o “contrato”</b>.</p>
<pre>class Documento { void abrir() { /* ... */ } }
class DoctoEscrevivel extends Documento { void salvar() { /* ... */ } }
class Projeto {
    void salvarTodos() {
        documentosEscreviveis.forEach(DoctoEscrevivel::salvar);
    }
}</pre>

<h4>Como reconhecer uma violação do LSP</h4>
<table>
<tr><th>Sintoma no código</th><th>O que está acontecendo</th></tr>
<tr><td>filha lança <code>UnsupportedOperationException</code> num método herdado</td><td>ela recusa uma promessa do pai</td></tr>
<tr><td>método sobrescrito vazio, “não faz nada”</td><td>promete o que não cumpre</td></tr>
<tr><td>cliente com <code>instanceof</code> ou <code>if (tipo == ...)</code> para tratar algumas filhas à parte</td><td>a filha não é realmente substituível</td></tr>
<tr><td>filha muda o significado do que o pai faz</td><td>contrato alterado de forma fundamental</td></tr>
</table>
<div class="ex">Complemento (fora dos slides): o clássico <b>Quadrado × Retângulo</b>. Na matemática, todo quadrado é um retângulo; no código, se <code>Quadrado</code> herda de <code>Retangulo</code> e mudar a altura muda também a largura, um cliente que faz <code>setLargura(5)</code> e <code>setAltura(2)</code> esperando área 10 recebe 4. O LSP trata de <b>comportamento</b>, não do “é um” da vida real. A formulação mais precisa (projeto por contrato, de Bertrand Meyer) diz que a filha não pode exigir mais que o pai nem garantir menos.</div>

<h3>3. I — Segregação de Interfaces (ISP)</h3>
<p><b>Nenhum cliente deve ser forçado a depender de métodos que não usa.</b> (O slide também escreve: “um cliente não deve ser forçado a implementar uma interface que não usa”.) Na figura: uma lista de exercícios única para todos os robôs (girar, rotacionar os braços, mexer as antenas) faz o robô sem antenas reclamar. A correção são <b>três listas</b>, uma para cada tipo de robô.</p>
<p>Quando uma classe é obrigada a realizar ações que não lhe servem, há desperdício e podem surgir erros inesperados. Uma classe deve realizar apenas as ações necessárias ao seu papel; o resto sai dela ou vai para outro lugar. O objetivo é <b>dividir um conjunto de ações em grupos menores</b>, de modo que a classe execute apenas o que realmente precisa.</p>
<div class="dica">Dica da aula: <b>várias interfaces pequenas e coesas</b>, compostas conforme a necessidade.</div>

<h4>Exemplo — Aves que voam e aves que não voam</h4>
<p>Uma interface <code>Aves</code> tem <code>setLocalizacao</code>, <code>setAltitude</code> e <code>renderizar</code>. O <code>Papagaio</code> usa tudo. O <code>Pinguim</code> é obrigado a implementar <code>setAltitude</code>, mas não voa, e deixa o método vazio só para compilar:</p>
<pre>interface Aves {
    void setLocalizacao(int longitude, int latitude);
    void setAltitude(int altitude);
    void renderizar();
}
class Pinguim implements Aves {
    public void setLocalizacao(int lon, int lat) { }
    public void setAltitude(int altitude) {
        // Não faz nada... Pinguim não sabe voar
    }
    public void renderizar() { }
}</pre>
<p>Correção: separar a interface em duas. <code>Aves</code> fica com o que é de <b>todas</b> as aves e <code>AvesQueVoam</code> acrescenta o que é só de <b>algumas</b>.</p>
<pre>interface Aves {
    void setLocalizacao(int lon, int lat);
    void renderizar();
}
interface AvesQueVoam extends Aves {
    void setAltitude(int altitude);
}
class Papagaio implements AvesQueVoam { /* setLocalizacao, setAltitude, renderizar */ }
class Pinguim  implements Aves        { /* setLocalizacao, renderizar */ }</pre>
<p><b>Cada classe implementa só o que faz sentido.</b></p>
<div class="ex">Complemento (fora dos slides): uma interface “gorda” também obriga <b>todos os clientes e implementações a se rever</b> sempre que um método inútil para eles muda. O ISP nasceu quando Robert C. Martin trabalhou num sistema de impressoras da Xerox, em que uma classe que fazia tudo exigia recompilações constantes.</div>

<h3>4. LSP × ISP: parecem, mas não são iguais</h3>
<table>
<tr><th></th><th>LSP</th><th>ISP</th></tr>
<tr><td>Tipo de problema</td><td>de <b>herança</b></td><td>de <b>interface</b></td></tr>
<tr><td>O que está errado</td><td>a subclasse <b>quebra as funcionalidades</b> da superclasse</td><td>a interface é <b>grande demais</b></td></tr>
<tr><td>Sintoma</td><td><b>exceção</b> ao usar o filho como pai</td><td><b>métodos vazios</b> só para compilar</td></tr>
<tr><td>Exemplo da aula</td><td><code>Pinguim extends Ave</code> e <code>voar()</code> lança exceção</td><td><code>Pinguim implements Aves</code> e <code>setAltitude()</code> vazio</td></tr>
</table>
<p>O mesmo pinguim aparece nos dois porque a solução é parecida: <b>separar o que é de todos do que é só de alguns</b>.</p>

<h3>5. D — Inversão de Dependência (DIP)</h3>
<p><b>As entidades devem depender de abstrações, não de implementações.</b> Na figura, um robô que corta pizza com “o <b>meu</b> braço-cortador” fica preso àquela ferramenta; o robô que corta pizza com “<b>qualquer ferramenta</b> que me derem” depende só de um encaixe.</p>
<p>O princípio tem duas partes: <b>(1)</b> módulos de alto nível não devem depender de módulos de baixo nível; ambos devem depender de abstrações. <b>(2)</b> Abstrações não devem depender de detalhes; os detalhes é que devem depender das abstrações.</p>
<table>
<tr><th>Termo</th><th>O que é</th><th>No exemplo do lembrete</th></tr>
<tr><td><b>Alto nível</b></td><td>a classe que executa uma ação por meio de uma ferramenta</td><td><code>LembreteSenha</code></td></tr>
<tr><td><b>Baixo nível</b></td><td>a ferramenta que executa a ação</td><td><code>ConexaoMySql</code></td></tr>
<tr><td><b>Abstração</b></td><td>a interface que conecta as duas classes</td><td><code>ConexaoBDInterface</code></td></tr>
<tr><td><b>Detalhes</b></td><td>a forma como a ferramenta funciona</td><td>o jeito de falar com MySQL ou Oracle</td></tr>
</table>
<div class="dica">Dica da aula: <b>o que dá valor ao sistema?</b> (pode ser alto nível). <b>O que pode mudar?</b> (pode ser baixo nível). O objetivo é reduzir a dependência do alto nível em relação ao baixo nível, por meio de uma interface.</div>

<h4>Exemplo — Lembrete de senha e banco de dados, passo a passo</h4>
<p><b>Passo 1 — o problema.</b> A classe cria a ferramenta sozinha. “<code>new</code> dentro da classe = dependência do MySQL”:</p>
<pre>public class LembreteSenha {
    private ConexaoBD conexao;
    public LembreteSenha() {
        this.conexao = new ConexaoMySql();   // preso ao MySQL
    }
    // faz alguma coisa com a conexao
}</pre>
<p>Consequências: para <b>reaproveitar</b> a classe em outro sistema só se houver MySQL; para <b>testar</b> é preciso um MySQL de verdade; para <b>trocar o banco</b> é preciso editar a classe.</p>
<p><b>Passo 2 — injetar pelo construtor.</b> A classe passa a receber a ferramenta pronta. Melhora, mas o tipo ainda é <code>ConexaoMySql</code>, então trocar o banco continua exigindo editar a classe:</p>
<pre>public LembreteSenha(ConexaoMySql conexao) {
    this.conexao = conexao;
}</pre>
<p><b>Passo 3 — injetar uma abstração.</b> A classe de alto nível só conhece a interface e “não sabe qual banco há por trás”; os detalhes passam a implementar a interface:</p>
<pre>class LembreteSenha {
    private ConexaoBDInterface conexao;
    public LembreteSenha(ConexaoBDInterface conexao) {
        this.conexao = conexao;
    }
    // não sabe qual banco há por trás
}

interface ConexaoBDInterface { void executa(String sql); }
class ConexaoMySql  implements ConexaoBDInterface { /* ... */ }
class ConexaoOracle implements ConexaoBDInterface { /* ... */ }</pre>
<p><b>Passo 4 — quem monta os objetos escolhe a implementação</b>, e para testes entra um falso, sem banco nenhum:</p>
<pre>new LembreteSenha(new ConexaoMySql());
new LembreteSenha(new ConexaoOracle());

// Para testes: um falso, sem banco nenhum
ConexaoBDInterface falsa =
        sql -&gt; System.out.println("[FAKE] " + sql);
new LembreteSenha(falsa).enviar("rebeca");</pre>
<p>No diagrama final, <code>LembreteSenha</code> aponta para a interface e <code>ConexaoMySql</code>, <code>ConexaoOracle</code> e <code>Fake</code> também apontam para ela: <b>os detalhes passam a apontar para a abstração</b>. Por isso se chama “inversão”: antes a seta ia do alto nível para o baixo nível; agora o baixo nível também depende da interface.</p>
<div class="ex">Pense numa tomada: o abajur (alto nível) depende do <b>padrão da tomada</b> (a interface), não da usina de energia. A usina pode mudar (hidrelétrica, solar), e o abajur continua funcionando. Para testar o abajur, basta um gerador de brinquedo que respeite o mesmo padrão.</div>
<div class="ex">Complemento (fora dos slides): <b>DIP</b> é o princípio; <b>injeção de dependência</b> é uma técnica para praticá-lo (receber a dependência de fora, pelo construtor, por método ou por atributo); <b>inversão de controle</b> é a ideia mais ampla em que outra coisa (um framework ou contêiner) monta e chama os objetos — assunto da Aula 9.</div>

<h3>6. SOLID é um trade-off</h3>
<p>Toda prática tem um custo, então vale avaliar antes de aplicar sempre.</p>
<table>
<tr><th>Ganhos</th><th>Custos</th></tr>
<tr><td>mudar sem efeito cascata<br>reusar e testar classes isoladas<br>entender e evoluir o código</td><td>mais classes e mais interfaces<br>mais indireção para navegar<br>excesso de engenharia em sistema pequeno</td></tr>
</table>
<ul>
<li>Os princípios contribuem para a qualidade por buscarem <b>alta coesão e baixo acoplamento</b>;</li>
<li>decisões de design têm <b>trade-off</b> (mais flexibilidade custa mais complexidade): um design bom <b>depende do contexto</b>;</li>
<li>é difícil acertar de primeira; em geral o código melhora <b>refatorando e avaliando as mudanças</b>.</li>
</ul>
<p><b>Reflexão da aula:</b> qual foi o último código que você teve medo de alterar, e por quê? Qual o custo de aplicar um princípio cedo demais ou tarde demais? Como você saberia, na prática, que um design está bom?</p>

<h3>7. Praticando</h3>
<h4>Exercício em sala: LSP + ISP + DIP (a loja)</h4>
<p>No sistema da loja, o <b>cancelamento do pedido</b> exige <b>estorno do pagamento</b> e <b>aviso ao cliente</b>. A atividade pede resolver no nível conceitual: sublinhar o problema no código, responder e desenhar a solução. O código do exercício não aparece no texto dos slides; abaixo vai uma <b>resolução própria</b> com um código equivalente.</p>
<pre>// ANTES: alto nível preso a ferramentas concretas
class Pedido {
    void cancelar() {
        new GatewayCartao().estornar(this);   // DIP: new dentro
        new EmailSmtp().enviar(cliente);      // DIP: new dentro
    }
}

// DEPOIS: depende de abstrações pequenas (ISP), injetadas (DIP)
interface Estornavel { void estornar(Pedido p); }
interface Notificador { void avisar(Cliente c, String msg); }

class CancelamentoPedido {
    private final Estornavel pagamento;
    private final Notificador notificador;
    CancelamentoPedido(Estornavel pagamento, Notificador notificador) {
        this.pagamento = pagamento;
        this.notificador = notificador;
    }
    void cancelar(Pedido p) {
        pagamento.estornar(p);
        notificador.avisar(p.getCliente(), "Pedido cancelado");
    }
}</pre>
<table>
<tr><th>Princípio</th><th>Como aparece na resolução</th></tr>
<tr><td><b>DIP</b></td><td>o cancelamento depende de <code>Estornavel</code> e <code>Notificador</code>, não de <code>GatewayCartao</code> nem de <code>EmailSmtp</code>; no teste entram falsos</td></tr>
<tr><td><b>ISP</b></td><td>duas interfaces pequenas, em vez de uma “<code>ServicosDaLoja</code>” com tudo misturado</td></tr>
<tr><td><b>LSP</b></td><td>todo meio de pagamento que implementa <code>Estornavel</code> (cartão, Pix…) deve estornar sem lançar exceção; se algum não puder, não deve prometer estornar</td></tr>
</table>

<h4>Trabalho em grupo, Fase 2 — Checkpoint 2: refatoração SOLID (03/11)</h4>
<p>Cada integrante encontra <b>pelo menos uma violação</b> de um princípio SOLID no código do agregado ou módulo sob sua responsabilidade e a corrige; o grupo, somado, cobre <b>pelo menos três princípios diferentes</b>. O código “antes” precisa estar em um commit anterior a 06/10; a alternativa é uma <b>mudança de requisito plausível</b>, descrita no documento, que exponha a violação (por exemplo, uma nova regra de negócio que obrigaria a modificar uma classe existente, ferindo o aberto-fechado). Em <code>docs/solid.md</code>, cada integrante registra:</p>
<ul>
<li>o princípio violado e o trecho de código, com o hash do commit “antes”;</li>
<li>o problema concreto (que mudança ficava difícil, ou que responsabilidades estavam misturadas);</li>
<li>a refatoração, com o hash do commit “depois” (do próprio autor);</li>
<li>como os testes garantiram que o comportamento não mudou;</li>
<li>o custo da refatoração (mais classes, mais indireção) e por que ele compensa.</li>
</ul>

<h4>Seminário Padrões GoF</h4>
<p>Cada grupo recebe <b>dois padrões GoF por sorteio</b> e faz um vídeo de até <b>15 minutos</b>, com os integrantes aparecendo e falando, mais os slides. A entrega é <b>online</b>, pelo Classroom, até 05/11/2026 (o slide escreve “29h59”, provavelmente 23h59); cada aluno submete o material individualmente, ainda que igual ao da equipe.</p>

<h3>8. Pegadinhas</h3>
<ul>
<li><b>LSP não é “é um” da vida real:</b> quadrado “é um” retângulo na geometria, mas pode não ser substituível no código. O que vale é o comportamento;</li>
<li><b>ISP não manda criar uma interface por método:</b> a ideia é grupos <b>coesos</b> e pequenos, compostos conforme a necessidade;</li>
<li><b>DIP não exige interface para tudo:</b> só compensa onde a ferramenta pode mudar ou onde se quer testar sem a real. Para uma classe estável e simples, é excesso de engenharia;</li>
<li><b>Injetar não é o mesmo que inverter:</b> receber um <code>ConexaoMySql</code> pelo construtor é injeção, mas ainda depende do detalhe. A inversão só acontece quando o tipo recebido é a <b>abstração</b>.</li>
</ul>
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

"proj-a9": {
  resumo: "O que é um framework (aplicação quase completa), características, exemplos de back-end e front-end, tipos (suporte, aplicação e domínio), classificação em caixa-branca, preta e cinza, framework × biblioteca (inversão de controle), × padrões de projeto, custo-benefício, hot spots e frozen spots e como construir um.",
  html: `
<h3>1. O que é um framework</h3>
<p>Um framework é uma <b>aplicação semi-completa reutilizável</b> que, quando <b>especializada</b>, produz aplicações personalizadas. Também se diz que é um conjunto de classes que representam um <b>projeto abstrato</b> para uma <b>família de problemas relacionados</b>. E o ponto principal: ele dá não só <b>reúso de código-fonte</b>, mas também <b>reúso do projeto</b> (a estrutura da solução, quais classes existem e como colaboram).</p>
<p>A aula resume como “uma aplicação <b>QUASE</b> completa”: o seu trabalho é <b>prover os pedaços que faltam</b>, específicos da sua aplicação, criando <b>subclasses</b> derivadas das <b>classes abstratas</b> do framework. No diagrama do slide, uma linha tracejada separa a camada <b>Framework</b> (classes abstratas) da camada <b>Application</b> (classes concretas como <code>WorkOrder</code> e <code>Pothole</code>, que estendem as do framework).</p>
<div class="ex">Pense numa casa pré-moldada: paredes, telhado e encanamento já vêm prontos e encaixam de um jeito definido. Você escolhe o que muda (cor, portas, cômodos). Uma biblioteca seria uma caixa de ferramentas soltas; o framework já traz a planta e o esqueleto da obra.</div>
<p>Frameworks resolvem um conjunto particular de problemas, adaptados a contextos específicos, e podem entregar um projeto ótimo para a aplicação. A figura “Framework Scrum” do slide mostra o <b>Scrum</b> (Product Owner, Scrum Master, Scrum Team; Product Backlog → Sprint Planning → Sprint Backlog → Sprint de 1 a 4 semanas com Daily Scrum de 24h → Sprint Review → Entrega → Retrospectiva) como exemplo da palavra “framework”, mas ali é um framework de <b>processo</b>. O resto da aula trata de frameworks de <b>software</b>.</p>

<h3>2. Características básicas</h3>
<table>
<tr><th>Característica</th><th>Por quê</th></tr>
<tr><td><b>Reusável</b></td><td>é o propósito final; para ser reusável precisa ser <b>usável</b>: bem documentado e fácil de usar</td></tr>
<tr><td><b>Extensível</b></td><td>contém funcionalidade <b>abstrata</b> (sem implementação) que precisa ser completada</td></tr>
<tr><td><b>De uso seguro</b></td><td>o desenvolvedor da aplicação <b>não pode destruir</b> o framework</td></tr>
<tr><td><b>Eficiente</b></td><td>é usado em muitas situações, e algumas exigem desempenho</td></tr>
<tr><td><b>Completo</b></td><td>deve cobrir o <b>domínio do problema</b> pretendido</td></tr>
</table>

<h3>3. Exemplos de frameworks</h3>
<p>A figura da aula cita Spring Boot, jQuery, Corona, Flutter, Material Design, Ionic, React, Angular, Cordova e Bootstrap: há frameworks de back-end, de front-end e de aplicações móveis. Os detalhados nos slides:</p>
<table>
<tr><th>Framework</th><th>Tipo</th><th>O que é</th></tr>
<tr><td><b>Spring</b></td><td>back-end (Java)</td><td>open source, baseado em <b>inversão de controle (IoC)</b> e <b>injeção de dependência</b>; um contêiner instancia as classes e define as dependências por arquivo de configuração XML; módulos de Web, persistência, acesso remoto e programação orientada a aspectos</td></tr>
<tr><td><b>Django</b></td><td>back-end (Python)</td><td>web, prático e rápido, padrão <b>model-template-view (MTV)</b>, princípio <b>DRY</b> (Don’t Repeat Yourself)</td></tr>
<tr><td><b>Express.js</b></td><td>back-end (Node.js/JavaScript)</td><td>web e <b>criação de APIs</b></td></tr>
<tr><td><b>ASP.NET</b></td><td>back-end (.NET)</td><td>aplicativos web em C#, F# ou Visual Basic.NET, integrado ao .NET Framework</td></tr>
<tr><td><b>Laravel</b></td><td>back-end</td><td>web com padrão <b>MVC</b>; autenticação e autorização integradas, sintaxe simples, sistema modular com gerenciador de dependências, acesso a bancos relacionais e utilitários</td></tr>
<tr><td><b>AngularJS</b></td><td>front-end</td><td>mantido pelo Google, ajuda a executar <b>single-page applications</b>, construído sob o padrão <b>MVVM</b></td></tr>
<tr><td><b>Vue.js</b></td><td>front-end</td><td>interfaces de usuário e single-page applications; arquitetura que pode ser adotada de forma <b>incremental</b>, com renderização declarativa e composição de componentes</td></tr>
<tr><td><b>Bootstrap</b></td><td>front-end</td><td>nasceu no Twitter; componentes com HTML, CSS e JavaScript, para sites amigáveis e <b>responsivos</b> (o layout se ajusta ao dispositivo)</td></tr>
<tr><td><b>Ember.js</b></td><td>front-end</td><td>baseado em MVVM; permite aplicações móveis e desktop</td></tr>
</table>

<h3>4. Tipos de framework</h3>
<table>
<tr><th>Tipo</th><th>Também chamado</th><th>O que oferece</th><th>Exemplo</th></tr>
<tr><td><b>Suporte</b></td><td>—</td><td>serviços de nível de <b>sistema operacional</b> (acesso a arquivos, computação distribuída, device drivers); <b>são raros</b></td><td>drivers de dispositivo</td></tr>
<tr><td><b>Aplicação</b></td><td>horizontal</td><td>conhecimento aplicável a <b>vários tipos de aplicações</b>, sem depender do domínio; resolve <b>uma parte</b> do problema</td><td>framework de interface gráfica (GUI)</td></tr>
<tr><td><b>Domínio</b></td><td>vertical ou especialista</td><td>conhecimento de um <b>domínio particular</b>; resolve <b>boa parte</b> da aplicação</td><td>aplicações de controle financeiro</td></tr>
</table>
<table>
<tr><th></th><th>Horizontais</th><th>Verticais</th></tr>
<tr><td>Generalidade</td><td>mais genéricos</td><td>resolvem problemas específicos</td></tr>
<tr><td>Usados em</td><td>variedade de projetos</td><td>um domínio particular</td></tr>
<tr><td>Ligados a</td><td>tecnologia</td><td>domínio de aplicação</td></tr>
<tr><td>Imagem da aula</td><td><b>canivete suíço</b> (serve a Saúde, Transações, Interface Gráfica…)</td><td><b>chave de fenda</b> (serve a Hospital, Convênio, Consultório)</td></tr>
</table>

<h3>5. Classificação: caixa-branca, caixa-preta e caixa-cinza</h3>
<p>Quanto a <b>como o framework é usado</b>:</p>
<table>
<tr><th></th><th>Caixa-branca</th><th>Caixa-preta</th><th>Caixa-cinza</th></tr>
<tr><td>Como reusa</td><td>estende por <b>subclasses</b> com sobrescrita de métodos (métodos gancho, <i>hook methods</i>)</td><td>usa o que já existe: <b>configuração, composição</b> ou interfaces para os componentes</td><td>meio-termo: acesso parcial, como um usuário padrão; o profissional precisa explorar as informações ativamente</td></tr>
<tr><td>Parte interna</td><td>visível; é preciso entender os <b>detalhes</b></td><td>não pode ser vista nem alterada; basta a <b>interface</b></td><td>parcialmente disponível</td></tr>
<tr><td>Fácil de…</td><td><b>projetar</b></td><td><b>usar</b></td><td>comum em aplicações Web (foco em aspectos da rede)</td></tr>
</table>
<div class="ex">Branca: você abre o motor do carro e troca peças (sabe como funciona). Preta: você só gira a chave e usa o painel. Cinza: você tem o painel e alguns relatórios do computador de bordo, mas precisa ir atrás deles.</div>

<h3>6. Framework × biblioteca</h3>
<p>A diferença está em <b>quem chama quem</b>. Numa <b>biblioteca</b>, <b>você chama</b> as funções, quando e como quiser. Num <b>framework</b>, <b>ele chama o seu código</b>. E o framework <b>contém</b> bibliotecas. Isso é a <b>inversão de controle</b>, resumida no <b>Princípio de Hollywood</b>: <i>“don’t call us, we’ll call you”</i> (não nos ligue, nós ligamos para você).</p>
<table>
<tr><th></th><th>Biblioteca</th><th>Framework</th></tr>
<tr><td>Quem chama</td><td>seu código chama a biblioteca</td><td>o framework chama seu código</td></tr>
<tr><td>Fluxo de controle</td><td>não pré-definido (é seu)</td><td>controlado pelo framework</td></tr>
<tr><td>Interação entre objetos</td><td>não pré-definida</td><td>definida pelo framework</td></tr>
<tr><td>Comportamento padrão</td><td>não tem</td><td>tem (<i>default</i>)</td></tr>
<tr><td>Personalização</td><td>o cliente instancia classes</td><td>por subclasses (ou configuração)</td></tr>
</table>
<pre>// Biblioteca: você decide quando chamar
int maior = Math.max(a, b);

// Framework (estilo Spring): você só preenche o pedaço que falta;
// o framework decide quando chamar, a cada requisição HTTP
@RestController
class PedidoController {
    @GetMapping("/pedidos")
    List&lt;Pedido&gt; listar() { return servico.todos(); }
}</pre>
<div class="dica">Pergunta para decidir: <b>quem controla o fluxo?</b> Se é o seu código, é biblioteca; se é o código de outra pessoa que chama o seu, é framework.</div>

<h3>7. Framework × padrões de projeto</h3>
<table>
<tr><th></th><th>Framework</th><th>Padrão de projeto</th></tr>
<tr><td>Tamanho</td><td><b>maior</b>, um “pedaço” de software</td><td>elemento arquitetural <b>menor</b>, poucas classes</td></tr>
<tr><td>Natureza</td><td><b>concreto</b>: tem código e implementação</td><td><b>abstrato</b>: uma solução ou ideia</td></tr>
<tr><td>Domínio</td><td>específico em relação ao domínio</td><td>menos especializado, agnóstico em relação ao domínio</td></tr>
<tr><td>Relação</td><td>usa <b>diversos</b> padrões (ex.: IoC no Spring, MVC no Laravel, MTV no Django)</td><td>soluções reutilizáveis para problemas recorrentes; organização do código; boas práticas; padronização</td></tr>
</table>

<h3>8. Framework vale a pena?</h3>
<table>
<tr><th>Benefícios</th><th>Custos</th></tr>
<tr><td>reúso de código e de projeto<br>aproveita a experiência de especialistas do domínio<br>menos manutenção (aplicações com menos código)<br>mais produtividade (foco no que é específico)<br>economia a longo prazo</td><td>mais esforço de construção e aprendizado<br>programas mais difíceis de depurar<br>exige documentação de manutenção e apoio<br>pode ser difícil achar um para alguns domínios</td></tr>
</table>
<div class="ex">Vários projetos parecidos e equipe com tempo de aprender: o framework tende a compensar. Um protótipo pequeno e descartável em que ninguém conhece a ferramenta: o custo de aprendizado pode superar o ganho. A aula fecha dizendo que <b>não existe um melhor framework</b>.</div>

<h3>9. Hot spots e frozen spots</h3>
<ul>
<li><b>Hot spots</b> (ou <i>hooks</i>): partes <b>projetadas para serem extensíveis</b>, que se adaptam às necessidades de cada aplicação;</li>
<li><b>Frozen spots</b>: partes <b>fixas</b> em todas as instanciações, com a infraestrutura comum a todas as aplicações; podem coordenar as chamadas aos hot spots.</li>
</ul>
<p>A combinação dos dois define a <b>arquitetura</b> do framework, e por isso é preciso <b>fronteiras bem definidas</b> entre o que muda e o que não muda.</p>
<pre>// Frozen spot: o "molde" do framework, que ninguém altera
abstract class ProcessadorDePedido {
    public final void processar(Pedido p) {
        validar(p);
        cobrar(p);          // hot spot (gancho)
        notificar(p);       // hot spot (gancho)
    }
    protected void validar(Pedido p) { /* comportamento padrão */ }
    protected abstract void cobrar(Pedido p);
    protected abstract void notificar(Pedido p);
}

// Sua aplicação preenche os hot spots
class ProcessadorLojaX extends ProcessadorDePedido {
    protected void cobrar(Pedido p)    { /* cartão, Pix... */ }
    protected void notificar(Pedido p) { /* e-mail, SMS... */ }
}</pre>
<div class="ex">Complemento (fora dos slides): o exemplo acima é o padrão <b>Template Method</b>. O método <code>processar</code> é o frozen spot (o fluxo fixo) e <code>cobrar</code> e <code>notificar</code> são os hot spots (ganchos) que você sobrescreve num framework caixa-branca.</div>

<h3>10. Construindo frameworks</h3>
<p>Os slides citam o artigo <i>“Evolving Frameworks: A Pattern Language for Developing Object-Oriented Frameworks”</i> (Don Roberts e Ralph Johnson, Universidade de Illinois). A ideia é que o framework <b>evolui</b>, não nasce pronto:</p>
<table>
<tr><th>Passo</th><th>O que fazer</th><th>Por quê</th></tr>
<tr><td>1</td><td>Crie <b>algumas aplicações</b> que o framework pretende ajudar</td><td>frameworks são abstrações, e as pessoas generalizam a partir de exemplos concretos</td></tr>
<tr><td>2</td><td>Construa um <b>framework caixa-branca</b></td><td>generalize e use herança para especializar quando necessário</td></tr>
<tr><td>3</td><td>Crie uma <b>biblioteca de componentes</b></td><td>vá adicionando componentes à medida que constrói aplicações</td></tr>
<tr><td>4</td><td>Identifique os <b>hot spots</b> e construa <b>objetos plugáveis</b></td><td>separe o que não muda do que muda; subclasses adaptáveis e parametrizáveis</td></tr>
<tr><td>5</td><td><b>Refatore</b> para granularidades mais finas</td><td>continue quebrando objetos até não fazer mais sentido</td></tr>
<tr><td>6</td><td>Chegue ao <b>framework caixa-preta</b></td><td>use <b>composição</b> para combinar os componentes</td></tr>
</table>

<h3>11. Resumindo e ligação com SOLID</h3>
<ul>
<li>Frameworks incorporam <b>muito conhecimento</b> sobre o problema do domínio;</li>
<li>são <b>difíceis de desenvolver</b>, mas podem <b>acelerar</b> o desenvolvimento;</li>
<li><b>escolher e usar</b> frameworks adequados é uma habilidade importante;</li>
<li><b>não existe um melhor framework</b>.</li>
</ul>
<div class="dica">Ligação com a aula de SOLID 2 (fora dos slides): a inversão de controle é o <b>DIP em escala grande</b> (o framework, de alto nível, depende de abstrações que o seu código implementa; o Spring faz a injeção de dependência por você). Hot spots e frozen spots lembram o <b>OCP</b>: aberto para extensão nos ganchos, fechado para modificação no resto.</div>
`
},
};
