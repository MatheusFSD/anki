/* Redes — resumos das aulas, em linguagem simples (aba "Resumos").
   A chave é o id da aula em data-redes.js. Mesmo formato de resumos-gpms.js.
   Escritos a partir do texto dos slides de cada aula. */
const RESUMOS_REDES = {

"redes-a123": {
  resumo: "Protocolos e camadas, os modelos OSI e TCP/IP, encapsulamento, tipos de rede (PAN, LAN, MAN, WAN), topologias, a visão de componentes e de serviços da Internet e como ela nasceu.",
  html: `
<h3>1. Protocolo: a “língua” combinada</h3>
<p>Para duas pessoas se comunicarem, basta um <b>canal</b> entre elas. Para <b>se entenderem</b>, precisam também de uma <b>linguagem comum</b>. Em redes, essa linguagem é o <b>protocolo de comunicação</b>: o conjunto de regras e procedimentos que define a comunicação entre duas ou mais entidades. Ele define:</p>
<ul>
<li>o <b>formato e a ordem</b> das mensagens trocadas;</li>
<li>as <b>ações</b> tomadas ao receber e/ou transmitir uma mensagem;</li>
<li>as ações tomadas em <b>outros eventos</b>.</li>
</ul>
<div class="ex">Pergunta humana: “Que horas são?” → resposta “9:30h”. Pergunta de rede: o cliente manda uma requisição TCP, o servidor responde, o cliente pede com <i>Get http://…</i> e recebe o arquivo. Nos dois casos há uma ordem combinada: pedir, responder, entregar.</div>
<p>Quando a comunicação precisa ser mais que “apenas” funcionar, as exigências crescem: <b>confiável e sem falhas</b> (“Falei oi! Você falou algo?”), <b>com qualidade</b>, <b>segura</b> (ninguém além do destino lê a mensagem), <b>em grupo</b>… Quanto mais requisitos, <b>mais complexo</b> fica o sistema.</p>

<h3>2. Arquitetura em camadas</h3>
<p>Para <b>reduzir a complexidade</b> do projeto, a rede é dividida em camadas. Cada camada <b>presta um serviço às camadas de cima</b> e “esconde” delas como o serviço é implementado. O resultado é uma <b>pilha de camadas</b>, e o número, o nome e a função das camadas <b>podem ser diferentes em cada rede</b>.</p>
<p>Por que isso ajuda?</p>
<ul>
<li>A <b>estrutura explícita</b> mostra as partes do sistema e como se relacionam;</li>
<li>a <b>modularização</b> facilita a manutenção e a atualização;</li>
<li>mudar a implementação do serviço de uma camada é <b>transparente</b> para o resto do sistema.</li>
</ul>
<div class="ex">Você manda uma encomenda pelos Correios. Se eles trocarem o caminhão por um trem, nada muda para você: o serviço “a encomenda chega” é o mesmo.</div>
<table>
<tr><th>Termo</th><th>O que é</th></tr>
<tr><td><b>Entidades pares</b></td><td>as camadas de mesmo nível (camada N) em sistemas diferentes; elas se comunicam por um <b>protocolo</b></td></tr>
<tr><td><b>Protocolo da camada N</b></td><td>as regras que as entidades pares da camada N usam entre si</td></tr>
<tr><td><b>Interface</b></td><td>entre duas camadas vizinhas <b>do mesmo sistema</b>: define as primitivas e os serviços que a camada de baixo oferece à de cima</td></tr>
<tr><td><b>Arquitetura de rede</b></td><td>o conjunto de camadas e protocolos</td></tr>
<tr><td><b>Pilha de protocolos</b></td><td>a lista de protocolos usados por um sistema</td></tr>
</table>
<div class="dica">Protocolo é “conversa para o lado” (mesma camada, máquinas diferentes). Interface é “conversa para cima/baixo” (camadas vizinhas, mesma máquina).</div>

<h3>3. Comunicação multicamadas (a analogia do fax)</h3>
<p>Um chefe em um local A quer mandar a mensagem “Welcome” para um local B. Um <b>tradutor</b> escreve a versão no idioma combinado e anota “L: english”. Uma <b>secretária</b> junta o número do <b>fax</b> do destino e envia. No local B, a secretária lê o fax, o tradutor lê o idioma e entrega a mensagem pronta.</p>
<p>Cada camada <b>acrescenta uma informação de controle</b> (um cabeçalho) que só a camada correspondente do outro lado vai ler. É a ideia do encapsulamento, logo adiante.</p>

<h3>4. Os dois modelos</h3>
<h4>OSI (<i>Open Systems Interconnection</i>)</h4>
<p>Proposto pela <b>ISO</b> na década de 70. Tem <b>sete camadas</b>: 1 Física, 2 Enlace, 3 Rede, 4 Transporte, 5 Sessão, 6 Apresentação, 7 Aplicação.</p>
<ul>
<li><b>Prós</b>: é bastante geral e continua válido até hoje.</li>
<li><b>Contras</b>: os protocolos associados a ele são raramente usados.</li>
<li><b>Críticas</b>: <b>complexidade</b> (cada camada deve cumprir sua função antes de passar os dados à seguinte); <b>rigidez</b> (camadas diferentes não devem compartilhar informações); <b>serviços repetidos</b> em camadas diferentes (por exemplo, correção de erros).</li>
</ul>
<h4>TCP/IP</h4>
<p>Surgiu na década de 80, com <b>cinco (ou quatro) camadas</b>: Física, Enlace, Rede, Transporte e Aplicação. Seus protocolos são <b>amplamente usados</b>; o contra é que as camadas são mais “restritas” que as do OSI.</p>
<div class="dica">OSI é só um <b>modelo de referência</b>. O TCP/IP <b>define os protocolos</b> de cada camada.</div>
<table>
<tr><th>Camada</th><th>Função</th><th>Unidade de dados</th><th>Exemplos</th></tr>
<tr><td><b>Aplicação</b></td><td>suporte às aplicações de rede</td><td>mensagem</td><td>HTTP, SMTP, FTP</td></tr>
<tr><td><b>Transporte</b></td><td>comunicação <b>fim a fim</b>: transferência de dados entre os sistemas finais</td><td>segmento</td><td>TCP, UDP</td></tr>
<tr><td><b>Rede</b></td><td>encaminhamento e roteamento</td><td>datagrama</td><td>IP</td></tr>
<tr><td><b>Enlace</b></td><td>comunicação <b>salto a salto</b>: transferência entre elementos de rede vizinhos</td><td>quadro</td><td>Ethernet, PPP, WiFi</td></tr>
<tr><td><b>Física</b></td><td>transmissão dos bits “no fio”; modulação e codificação</td><td>bits</td><td>—</td></tr>
</table>

<h3>5. Encapsulamento</h3>
<p>Na origem, a mensagem da aplicação desce a pilha e <b>cada camada coloca seu cabeçalho</b>:</p>
<ol>
<li>Transporte: junta o cabeçalho H<sub>T</sub> à mensagem M e forma o <b>segmento</b>.</li>
<li>Rede: junta H<sub>R</sub> e forma o <b>datagrama</b>.</li>
<li>Enlace: junta H<sub>E</sub> (e um final T, <i>trailer</i>) e forma o <b>quadro</b>.</li>
<li>Física: manda os bits.</li>
</ol>
<p>No caminho, os equipamentos intermediários só abrem até onde precisam: o <b>comutador (switch)</b> trabalha até a camada de <b>enlace</b>; o <b>roteador</b> vai até a camada de <b>rede</b>. No destino, o caminho é inverso: cada camada tira o seu cabeçalho e entrega o restante para cima, até a aplicação receber a mensagem M.</p>
<div class="ex">É como enviar uma carta: você escreve a mensagem (M), coloca num envelope com o endereço (H<sub>R</sub>), e a transportadora coloca esse envelope numa caixa com a etiqueta do próximo trecho (H<sub>E</sub>). Quem recebe vai abrindo, da caixa para o envelope.</div>

<h3>6. Redes de computadores e seus usos</h3>
<p>Definições vistas: uma rede é um <b>conjunto de computadores autônomos interconectados por uma única tecnologia</b>; também é um <b>sistema de comunicação</b> que interconecta computadores, terminais e periféricos. A <b>Internet é uma rede de redes</b>.</p>
<ul>
<li><b>Aplicações comerciais</b>: compartilhar recursos físicos e informações, comunicação entre usuários, comércio eletrônico.</li>
<li><b>Aplicações domésticas</b>: as mesmas, mais entretenimento.</li>
<li><b>Usuários móveis</b>: escritório portátil e aplicações militares.</li>
</ul>

<h3>7. Classificação por extensão geográfica</h3>
<table>
<tr><th>Tipo</th><th>Alcance</th><th>Características</th><th>Exemplo</th></tr>
<tr><td><b>PAN</b> (pessoal)</td><td>distâncias muito pequenas, uma única pessoa</td><td>—</td><td>Bluetooth</td></tr>
<tr><td><b>LAN</b> (local)</td><td>um prédio ou conjunto de prédios</td><td>geralmente de uma mesma organização; taxa da ordem de Mbps; atrasos de propagação pequenos</td><td>Ethernet</td></tr>
<tr><td><b>MAN</b> (metropolitana)</td><td>uma cidade</td><td>—</td><td>rede baseada em TV a cabo</td></tr>
<tr><td><b>WAN</b> (longa distância)</td><td>um país ou continente</td><td>comutadores de pacotes ligados por enlaces dedicados; taxas em geral <b>menores</b> e atrasos <b>maiores</b> que nas LANs</td><td>ATM</td></tr>
</table>
<p>Nas WANs ainda se distinguem as redes <b>domiciliares e corporativas</b>, as <b>redes de acesso</b> e as <b>redes backbone</b>.</p>

<h3>8. Topologias</h3>
<p>Topologia é a <b>estrutura física de interligação</b> dos equipamentos. Cada uma tem implicações diferentes de <b>custo, confiabilidade e alcance</b>. As mais comuns: malha, estrela, anel, barramento e híbridas.</p>
<table>
<tr><th>Topologia</th><th>Como é</th><th>Vantagens</th><th>Desvantagens</th></tr>
<tr><td><b>Malha completa</b></td><td>cada estação ligada a todas as outras</td><td>sem compartilhamento do meio; sem decisão de roteamento</td><td>muitas ligações (custo)</td></tr>
<tr><td><b>Malha irregular</b></td><td>a mais geral: cada estação liga-se a um número variável de outras</td><td>interconexão ajustável ao tráfego; escolhe por onde enviar, evitando congestionamento</td><td>exige decisão de roteamento</td></tr>
<tr><td><b>Estrela</b></td><td>todas as estações ligadas a um nó central, que decide o roteamento</td><td>boa quando o fluxo é centralizado</td><td>confiabilidade depende do nó central; ruim se o fluxo não é centralizado</td></tr>
<tr><td><b>Anel</b></td><td>mensagens circulam de nó em nó até o destino; cada nó reconhece o próprio endereço e copia o que é seu</td><td>boa com fluxo não centralizado; sem roteamento; sem armazenamento intermediário, então melhor atraso e vazão</td><td>precisa de mecanismo de acesso ao meio compartilhado; depende da confiabilidade de cada nó (que funciona como repetidor)</td></tr>
<tr><td><b>Barramento</b></td><td>mensagens transferidas sem participação dos nós intermediários; todas as estações “escutam” e reconhecem o próprio endereço</td><td>sem roteamento; sem armazenamento intermediário</td><td>precisa de mecanismo de acesso ao meio compartilhado</td></tr>
</table>
<ul>
<li>A <b>malha</b> é usada principalmente em redes de <b>longa distância</b>. Em LANs quase não se usa: o custo do meio físico é pequeno, e a decisão de roteamento e o armazenamento a cada nó aumentam o custo e o atraso e diminuem a vazão.</li>
<li><b>Estrela, anel e barramento</b> são usadas principalmente em <b>redes locais</b>.</li>
<li>Existem ainda as <b>híbridas</b>: anel-estrela, barramento-estrela, estrela-anel, árvore de barramentos.</li>
</ul>

<h3>9. O que é a Internet</h3>
<p>Nos anos 2000 já passava de <b>100 mil roteadores</b>. É uma rede que interconecta <b>tudo</b>: computadores pessoais, mainframes, portáteis, celulares, sensores e até eletrodomésticos (a geladeira conectada).</p>
<h4>Visão dos componentes</h4>
<ul>
<li><b>Estações (hosts) ou sistemas finais</b>: rodam as aplicações de rede.</li>
<li><b>Enlaces (links)</b>: fibra, cobre, rádio, satélite; medidos pela <b>taxa de transmissão</b> (largura de banda, <i>bandwidth</i>).</li>
<li><b>Roteadores (comutadores de pacotes)</b>: encaminham pacotes pela rede.</li>
<li><b>Provedores de serviço (ISPs)</b>: local, regional etc.</li>
</ul>
<h4>Visão dos serviços</h4>
<p>A Internet é uma <b>infraestrutura de comunicação que provê serviços a aplicações distribuídas</b> (Web, e-mail, jogos, mensagens instantâneas, VoIP, compartilhamento de arquivos). A aplicação só precisa seguir um conjunto de regras. Os serviços oferecidos são dois: transferência <b>confiável</b> de dados da origem ao destino e transferência “<b>melhor esforço</b>” (não confiável).</p>
<h4>Estrutura</h4>
<ul>
<li><b>Borda</b>: aplicações, sistemas finais e redes de acesso.</li>
<li><b>Núcleo</b>: roteadores e a rede de redes.</li>
</ul>

<h3>10. Como tudo começou</h3>
<ol>
<li><b>Outubro de 1957</b>: os soviéticos lançam o <b>Sputnik I</b>, primeiro satélite artificial da Terra.</li>
<li><b>1958</b>: o presidente Eisenhower cria a <b>ARPA</b> (<i>Advanced Research Projects Agency</i>), voltada a um sistema de defesa antimísseis e à detecção de testes de bombas nucleares.</li>
<li><b>1964</b>: Licklider, Kleinrock, Baran e Roberts propõem interconectar computadores para “acessar dados e programas de qualquer lugar e de maneira fácil e rápida”, com <b>topologia distribuída</b> (uma bomba não anularia a comunicação) e <b>comutação de pacotes</b>.</li>
</ol>
<div class="ex">Comutação de pacotes: a mensagem é <b>dividida em pacotes</b>, cada pacote é <b>encaminhado</b> (podendo seguir caminhos redundantes diferentes) e a mensagem é <b>remontada no destino</b>. Como mandar um livro em várias cartas: cada carta pode ir por uma rota, e o destinatário monta o livro quando todas chegam.</div>
`
},


"redes-a45": {
  resumo: "O que são aplicações de rede, as arquiteturas cliente-servidor, CDN, P2P e híbrida, o que cada aplicação exige da rede, TCP x UDP e o HTTP em detalhe: conexões, mensagens, métodos, códigos, cookies e caches.",
  html: `
<h3>1. Aplicações de rede</h3>
<p>Aplicações são <b>programas que executam em sistemas finais diferentes e se comunicam pela rede</b>. Exemplo: o servidor Web conversa com o navegador. O que mudou nos últimos tempos foi o <b>número e a variedade</b>: antes eram poucas aplicações, hoje são muitas e com requisitos bem diferentes.</p>
<p>Dois pontos importantes:</p>
<ul>
<li>os dispositivos do <b>núcleo</b> da rede <b>não executam</b> aplicações de usuário;</li>
<li>como as aplicações ficam só nos sistemas finais, o desenvolvimento e a disseminação são <b>rápidos</b>.</li>
</ul>

<h3>2. Arquiteturas de aplicação</h3>
<p>Três arquiteturas básicas: <b>cliente-servidor</b>, <b>par a par (P2P)</b> e <b>híbrida</b>.</p>

<h4>Cliente-servidor</h4>
<table>
<tr><th>Servidor</th><th>Cliente</th></tr>
<tr><td>nó “especial”, tem algum serviço de interesse<br>recebe as requisições<br>está <b>sempre ligado</b><br>tem <b>endereço conhecido</b>, por isso é facilmente alcançável</td><td>faz requisições ao servidor<br>não precisa estar sempre ligado<br>o endereço pode ser <b>dinâmico</b><br>não se comunica diretamente com outros clientes</td></tr>
</table>
<p>O problema aparece quando todos pedem a mesma coisa. Na distribuição de vídeo, por exemplo, há <b>um fluxo por usuário</b>: mais usuários e mais qualidade exigem mais banda e <b>aumentam o custo do provedor</b>. A comunicação ponto a ponto fica inadequada.</p>
<div class="ex">Uma única padaria atendendo o bairro inteiro: a fila só cresce. A solução é abrir filiais perto das casas, e é essa a ideia das CDNs.</div>

<h4>Redes de distribuição de conteúdo (CDN)</h4>
<p>Tornam o modelo cliente-servidor mais <b>eficiente e escalável</b>. Há um conjunto de <b>servidores auxiliares</b>, espalhados geograficamente e em diferentes backbones, que <b>replicam o conteúdo</b> do servidor de origem. O pedido do cliente é <b>reencaminhado ao servidor auxiliar mais próximo</b>, o que dá maior taxa de transferência e menor latência, <b>de forma transparente</b> para o cliente.</p>
<ul>
<li><b>Desafios</b>: encaminhar a requisição, escolher o servidor de réplica, replicar o conteúdo.</li>
<li><b>Desvantagem</b>: a eficiência depende do número de servidores auxiliares, ou seja, <b>custo alto</b>.</li>
<li><b>Exemplo</b>: a Akamai, com 360 mil servidores em 135 países.</li>
</ul>

<h4>Par a par (P2P)</h4>
<p>Há comunicação <b>direta entre sistemas finais</b> (na versão “pura”). Os participantes <b>colaboram</b> para o funcionamento e a manutenção do sistema, <b>compartilhando recursos</b> (banda, processamento, armazenamento). <b>Quanto mais participantes, maior a capacidade</b>: é a escalabilidade.</p>
<p>O problema é o <b>gerenciamento</b>: não há elemento dedicado, então não há garantia de continuidade do serviço, e os pares ficam conectados de forma intermitente e mudam de endereço IP.</p>
<p><b>Desafios do P2P</b>:</p>
<ol>
<li><b>Compatibilidade com os ISPs</b>: muda o perfil do tráfego, porque “clientes passam a ser servidores”.</li>
<li><b>Segurança</b>: o sistema é altamente distribuído e o usuário tem o controle “nas mãos”.</li>
<li><b>Incentivos à cooperação</b>: os usuários precisam compartilhar seus recursos voluntariamente.</li>
</ol>

<h4>Híbrida</h4>
<p>Mistura P2P com <b>servidores auxiliares</b> (exemplos: Skype, BitTorrent).</p>
<ul>
<li><b>Skype</b>: aplicação P2P de voz sobre IP. Um <b>servidor</b> ajuda a localizar o endereço do parceiro; a <b>conversa é direta</b>, de cliente para cliente.</li>
<li><b>Mensagem instantânea</b>: a conversa é direta, mas a <b>localização e a detecção de presença são centralizadas</b>. Ao ficar online, o usuário registra seu IP no servidor central, e consulta o servidor para achar o IP dos contatos.</li>
</ul>
<div class="dica">Híbrida = o servidor serve de “lista telefônica”; a conversa em si é de cliente para cliente.</div>

<h3>3. O que as aplicações exigem da rede</h3>
<ul>
<li><b>Transferência confiável de dados</b>: algumas toleram perdas (áudio e vídeo não codificados), outras exigem 100% (transferência de arquivos, e-mail, SSH).</li>
<li><b>Largura de banda</b>: algumas exigem um <b>mínimo</b> para funcionar (multimídia); outras se adaptam à banda disponível, as <b>aplicações elásticas</b> (Web, e-mail, arquivos).</li>
<li><b>Segurança</b>: autenticação, controle de acesso, integridade, não repúdio e confidencialidade.</li>
</ul>
<table>
<tr><th>Aplicação</th><th>Perda</th><th>Banda</th><th>Atraso</th></tr>
<tr><td>Transferência de arquivos</td><td>sem perdas</td><td>elástica</td><td>tolerante</td></tr>
<tr><td>E-mail</td><td>sem perdas</td><td>elástica</td><td>tolerante</td></tr>
<tr><td>Web</td><td>sem perdas</td><td>elástica</td><td>tolerante</td></tr>
<tr><td>Áudio/vídeo em tempo real</td><td>tolerante</td><td>vídeo: 10 kb–5 Mb; áudio: 5 kb–1 Mb</td><td>centenas de ms</td></tr>
<tr><td>Áudio/vídeo gravado</td><td>tolerante</td><td>idem</td><td>poucos segundos</td></tr>
<tr><td>Jogos interativos</td><td>tolerante</td><td>até 10 kbps</td><td>centenas de ms</td></tr>
<tr><td>Mensagens instantâneas</td><td>sem perdas</td><td>elástica</td><td>sim/não</td></tr>
</table>

<h3>4. Serviços da camada de transporte</h3>
<table>
<tr><th>TCP</th><th>UDP</th></tr>
<tr><td><b>Orientado a conexão</b>: troca mensagens de controle antes das mensagens da aplicação<br><b>Transporte confiável</b> entre os processos emissor e receptor<br><b>Controle de fluxo</b>: o emissor não sobrecarrega o receptor<br><b>Controle de congestionamento</b>: a taxa de envio depende da carga da rede<br>Não oferece garantias de tempo nem de banda mínima</td><td>Transferência <b>não confiável</b> entre os processos<br><b>Não provê</b>: estabelecimento de conexão, confiabilidade, controle de fluxo, controle de congestionamento, nem garantias de tempo ou de banda mínima</td></tr>
</table>
<table>
<tr><th>Aplicação</th><th>Protocolo de aplicação</th><th>Transporte</th></tr>
<tr><td>E-mail</td><td>SMTP</td><td>TCP</td></tr>
<tr><td>Acesso remoto</td><td>Telnet, SSH</td><td>TCP</td></tr>
<tr><td>Web</td><td>HTTP</td><td>TCP</td></tr>
<tr><td>Transferência de arquivos</td><td>FTP</td><td>TCP</td></tr>
<tr><td>Distribuição multimídia</td><td>HTTP, RTP</td><td>TCP ou UDP</td></tr>
<tr><td>Telefonia na Internet</td><td>SIP, RTP, proprietário (Skype)</td><td>tipicamente UDP</td></tr>
</table>

<h3>5. Protocolos da camada de aplicação</h3>
<p>Um protocolo de aplicação define:</p>
<ul>
<li>os <b>tipos de mensagem</b> trocadas (requisição e resposta);</li>
<li>a <b>sintaxe</b>: os campos presentes e como são identificados;</li>
<li>a <b>semântica</b>: o significado da informação de cada campo;</li>
<li>as <b>regras</b> de quando os processos enviam e respondem às mensagens.</li>
</ul>
<p>Podem ser de <b>domínio público</b> (em geral definidos em <b>RFCs</b>, documentos sob responsabilidade do <b>IETF</b>; os <i>drafts</i> são versões ainda em aberto) ou <b>proprietários</b> (código fechado, como o Skype).</p>

<h3>6. HTTP: conceitos</h3>
<p>Uma página Web é feita de <b>objetos</b> (um arquivo HTML, uma imagem JPEG, um applet Java, um áudio…). Há um <b>arquivo-base HTML</b> que referencia vários objetos, e cada objeto é endereçável por uma <b>URL</b>.</p>
<pre>www.ic.uff.br/~igor/cursos/index.html
\\_________/ \\_____________________/
 hospedeiro      caminho</pre>
<p>O HTTP é o protocolo da navegação Web, no modelo <b>cliente-servidor</b>: o cliente é o <b>navegador</b> (pede, recebe e visualiza objetos); o servidor Web (por exemplo, o Apache) envia objetos em resposta aos pedidos.</p>
<p>Ele usa o <b>TCP</b>:</p>
<ol>
<li>o cliente inicia uma conexão TCP com o servidor, geralmente na <b>porta 80</b>;</li>
<li>o servidor aceita a conexão;</li>
<li>navegador e servidor trocam mensagens HTTP;</li>
<li>o servidor encerra a conexão.</li>
</ol>
<p>É um protocolo <b>sem estado</b>: o servidor <b>não guarda informação</b> sobre pedidos anteriores. Se o mesmo objeto for pedido de novo, é reenviado. Por que assim? Protocolos com estado são complexos: é preciso guardar o passado (consome memória) e, se cliente ou servidor cair, as visões de “estado” podem ficar inconsistentes.</p>
<div class="ex">Um garçom sem memória: cada vez que você chama, ele pergunta tudo de novo. Simples para ele, trabalhoso para você, e é aí que entram os cookies.</div>

<h3>7. Conexões não persistentes e persistentes</h3>
<h4>Não persistente</h4>
<p>Uma requisição/resposta por conexão TCP. Para abrir <b>www.ic.uff.br</b>:</p>
<ol>
<li>o cliente inicia a conexão TCP com o servidor, na porta 80 (SYN, SYN+ACK, ACK: <b>three-way handshake</b>);</li>
<li>o cliente envia o pedido HTTP pela conexão, indicando o objeto desejado (<i>index.html</i>);</li>
<li>o servidor monta a resposta com o objeto e a envia;</li>
<li>o servidor encerra a conexão (FIN/ACK);</li>
<li>o cliente recebe o HTML e visualiza. Ao analisá-lo, encontra imagens JPEG referenciadas e <b>repete os passos de 1 a 5 para cada objeto</b>.</li>
</ol>
<p><b>Tempo de resposta</b> (entre pedir e receber um objeto) = 1 RTT para abrir a conexão TCP + 1 RTT para o pedido HTTP e a volta dos primeiros bytes + tempo de transmissão do arquivo. Ou seja, <b>2 RTT + tempo de transmissão</b>.</p>
<ul>
<li><b>Prós</b>: os navegadores costumam abrir conexões TCP <b>paralelas</b> para buscar os objetos referenciados.</li>
<li><b>Contras</b>: exige <b>2 RTTs por objeto</b> e o sistema operacional aloca recursos do hospedeiro para cada conexão.</li>
</ul>
<h4>Persistente</h4>
<p>Presente no <b>HTTP/1.1</b>. O servidor <b>deixa a conexão aberta</b> depois da resposta; as mensagens seguintes entre os mesmos cliente e servidor usam essa conexão. O cliente envia os pedidos <b>assim que encontra</b> um objeto referenciado. Pode bastar <b>um RTT</b> para todos os objetos.</p>
<div class="dica">Não persistente: abrir e fechar a porta a cada objeto. Persistente: deixar a porta aberta e passar todos os objetos por ela.</div>

<h3>8. Mensagens HTTP</h3>
<p>São dois tipos, <b>requisição</b> e <b>resposta</b>, ambos em <b>ASCII</b> (legível por pessoas).</p>
<h4>Requisição</h4>
<pre>GET /somedir/page.html HTTP/1.0
Host: www.someschool.edu
User-agent: Mozilla/4.0
Connection: close
Accept-language: fr
(linha em branco = fim)</pre>
<p>A primeira linha é a <b>linha da requisição</b>; as seguintes são <b>linhas de cabeçalho</b>; um <b>CR/LF extra</b> (linha em branco) indica o fim da mensagem.</p>
<p>A linha da requisição traz o <b>método</b>, o recurso e a versão. Os métodos determinam o que o servidor deve fazer com a URL. O HTTP/1.1 tem <b>oito</b> (RFC 2616): <b>GET</b>, <b>HEAD</b>, <b>POST</b>, <b>PUT</b>, <b>DELETE</b>, <b>TRACE</b>, <b>OPTIONS</b> e <b>CONNECT</b>. O GET pede um recurso, como um arquivo (<code>GET /index.html HTTP/1.1</code>, com <code>Host: www.ic.uff.br</code>).</p>
<h4>Envio de formulários</h4>
<ul>
<li><b>Método POST</b>: o conteúdo vai no <b>corpo</b> da mensagem.</li>
<li><b>Método URL</b>: usa o <b>GET</b>, e o conteúdo vai no <b>campo da URL</b>, como em <code>www.somesite.com/animalsearch?key=monkeys&amp;max=10</code>.</li>
</ul>
<h4>Resposta</h4>
<pre>HTTP/1.1 200 OK
Connection close
Date: Thu, 06 Aug 1998 12:00:15 GMT
Server: Apache/1.3.0 (Unix)
Last-Modified: Mon, 22 Jun 1998 ...
Content-Length: 6821
Content-Type: text/html

dados dados dados ...</pre>
<p>A primeira linha é a <b>linha de status</b>; depois vêm as <b>linhas de cabeçalho</b>; no fim, os <b>dados</b> (o arquivo HTML pedido).</p>
<p>A linha de status tem protocolo, <b>código</b> e frase. Códigos típicos:</p>
<table>
<tr><th>Código</th><th>Significado</th></tr>
<tr><td><b>200 OK</b></td><td>sucesso; o objeto pedido vem nesta mensagem</td></tr>
<tr><td><b>301 Moved Permanently</b></td><td>o objeto mudou de lugar; a nova localização vem no campo <i>Location:</i></td></tr>
<tr><td><b>400 Bad Request</b></td><td>o servidor não entendeu a requisição</td></tr>
<tr><td><b>404 Not Found</b></td><td>o documento pedido não está neste servidor</td></tr>
<tr><td><b>505 HTTP Version Not Supported</b></td><td>o servidor não usa essa versão do HTTP</td></tr>
</table>

<h3>9. GET condicional</h3>
<p>Objetivo: <b>não reenviar um objeto</b> que o cliente (no cache) já tem na versão atual. O cache indica a data da sua cópia no pedido: <code>If-modified-since: &lt;data&gt;</code>. O servidor responde:</p>
<ul>
<li>se a cópia está atual: <b>304 Not Modified</b>, sem o objeto;</li>
<li>se o objeto foi modificado: <b>200 OK</b> com o objeto.</li>
</ul>

<h3>10. Cookies</h3>
<p>Uma maneira de <b>guardar estado</b> sobre um protocolo sem estado, usada por quase todos os sites. São <b>quatro componentes</b>:</p>
<ol>
<li>uma linha de cabeçalho do cookie na <b>resposta</b> HTTP (<i>Set-cookie</i>);</li>
<li>uma linha de cabeçalho do cookie no <b>pedido</b> HTTP;</li>
<li>um <b>arquivo de cookies</b> na estação do usuário, gerenciado pelo navegador;</li>
<li>um <b>banco de dados de retaguarda</b> no site.</li>
</ol>
<div class="ex">Suzana acessa sempre do mesmo PC e visita pela primeira vez um site de comércio eletrônico. Quando o primeiro pedido chega, o site cria uma <b>ID única</b> (digamos, 1678) e uma entrada para ela no banco de dados. Na resposta vai <i>Set-cookie: 1678</i>; o navegador guarda isso no arquivo de cookies (junto aos de outros sites, como ebay: 8734). Nos pedidos seguintes ela manda <i>cookie: 1678</i> e o site faz a ação específica para ela, mesmo uma semana depois.</div>
<p>Cookies servem para <b>autorização</b>, <b>carrinhos de compra</b>, <b>sugestões</b> e <b>estado da sessão</b> (como o webmail). Como manter estado: os pontos finais do protocolo mantêm o estado no transmissor/receptor em várias transações, ou os cookies fazem as mensagens HTTP carregarem o estado.</p>
<p><b>Privacidade</b>: os cookies permitem que os sites aprendam muito sobre você, especialmente se você fornece nome e e-mail.</p>

<h3>11. Web caches (proxies)</h3>
<p>Meta: <b>atender o pedido do cliente sem envolver o servidor de origem</b>.</p>
<ol>
<li>O usuário configura o navegador para acessar a Web <b>via proxy</b> (também existem proxies transparentes).</li>
<li>O navegador envia todos os pedidos HTTP ao proxy.</li>
<li>Se o objeto está no cache do proxy, ele <b>responde imediatamente</b>.</li>
<li>Senão, o proxy pede o objeto ao servidor de origem e depois o devolve ao cliente.</li>
</ol>
<p>O cache atua como <b>cliente e servidor</b> ao mesmo tempo, e é tipicamente instalado por um ISP (universidade, empresa, ISP residencial). Serve para <b>reduzir o tempo de resposta</b> e <b>reduzir o tráfego no canal de acesso</b> da instituição. O desempenho depende da <b>taxa de acerto</b> (<i>hit ratio</i>).</p>
<div class="dica">Cache de proxy = o armário de itens mais pedidos na portaria: se o item está lá, ninguém precisa ir até o depósito.</div>
`
},


"redes-a6": {
  resumo: "Como o e-mail viaja pela Internet (agentes de usuário, servidores, SMTP, POP3 e IMAP) e como o DNS traduz nomes em endereços IP, com a hierarquia de servidores, o cache e os registros.",
  html: `
<h3>1. O sistema de correio da Internet</h3>
<p>O e-mail tem quatro componentes:</p>
<table>
<tr><th>Componente</th><th>Papel</th></tr>
<tr><td><b>Agente de usuário (AU)</b></td><td>é o programa do usuário: permite <b>ler, responder, encaminhar, salvar e editar</b> mensagens (Outlook, Eudora, Thunderbird, Mutt)</td></tr>
<tr><td><b>Servidor de correio</b> (agente de transferência de mensagens)</td><td><b>armazena</b> as mensagens e se comunica com outros servidores para transferi-las</td></tr>
<tr><td><b>SMTP</b></td><td>protocolo que <b>transfere mensagens entre servidores</b> de correio</td></tr>
<tr><td><b>Protocolo de acesso ao correio</b></td><td>traz as mensagens do servidor de correio até o agente de usuário</td></tr>
</table>
<div class="ex">Alice escreve para <b>bob@someschool.edu</b>:
<ol>
<li>Alice usa o AU para compor a mensagem;</li>
<li>o AU manda a mensagem ao <b>servidor de correio dela</b>, onde ela entra na <b>fila</b> de mensagens;</li>
<li>o lado cliente do SMTP abre uma <b>conexão TCP</b> com o servidor de correio de Bob;</li>
<li>o cliente SMTP envia a mensagem de Alice pela conexão;</li>
<li>o servidor de Bob coloca a mensagem na <b>caixa de entrada</b> dele;</li>
<li>Bob chama o AU dele para ler a mensagem.</li>
</ol></div>

<h3>2. SMTP (<i>Simple Mail Transfer Protocol</i>)</h3>
<ul>
<li>Descrito na <b>RFC 2821</b>; usa <b>TCP, porta 25</b>.</li>
<li>A comunicação é entre um <b>cliente SMTP</b> (transmissor) e um <b>servidor SMTP</b> (receptor).</li>
<li>As mensagens vão em <b>ASCII de 7 bits</b>; para 8 bits usa-se extensão ou codificação.</li>
<li>Usa <b>conexões persistentes</b> e reconhece o fim da mensagem por <b>CRLF.CRLF</b>.</li>
<li>Funciona por <b>comandos</b> entre servidores: <b>HELO</b>, <b>MAIL FROM</b>, <b>RCPT TO</b>, <b>DATA</b>, <b>QUIT</b>, <b>VRFY</b>.</li>
</ul>
<h4>Exemplo de interação (<code>telnet servidor.br 25</code>)</h4>
<pre>S: 220 servidor.br
C: HELO cliente.br
S: 250 Hello cliente.br, pleased to meet you
C: MAIL FROM: &lt;usuario@cliente.br&gt;
S: 250 usuario@cliente.br... Sender ok
C: RCPT TO: &lt;usuario@servidor.br&gt;
S: 250 usuario@servidor.br ... Recipient ok
C: DATA
S: 354 Enter mail, end with "." on a line by itself
C: From: usuario@cliente.br
C: To: usuario@servidor.br
C: Subject: Teste
C:
C: Teste de envio de correio.
C: .
S: 250 Message accepted for delivery
C: QUIT
S: 221 servidor.br closing connection</pre>
<p>(S = servidor, C = cliente.) Leia como uma conversa de balcão: o servidor se apresenta, o cliente diz quem é, de quem vem a mensagem, para quem vai, e então manda o conteúdo, terminando com um ponto sozinho em uma linha.</p>

<h3>3. Como é feita a mensagem</h3>
<p>O correio eletrônico é formado por:</p>
<ul>
<li><b>Envelope</b>: encapsula a mensagem e traz as informações necessárias para o <b>transporte</b>;</li>
<li><b>Mensagem</b>: <b>cabeçalho</b> (campos como <i>To:</i>, <i>From:</i>, <i>Subject:</i>, <i>Received:</i>), uma <b>linha em branco</b> e o <b>corpo</b>, que só diz respeito ao destinatário.</li>
</ul>
<pre>Received: from cliente.br by servidor.br; 16 Jul 06 10:30:01 GMT
Received: from maquina.cliente.br by cliente.br; 16 Jul 06 10:29:58 GMT
From: usuario@cliente.br
To: usuario@servidor.br
Subject: Teste

Teste de envio de correio.</pre>
<div class="dica">Envelope = o que o correio usa para entregar. Cabeçalho + corpo = a carta dentro dele.</div>

<h3>4. SMTP x HTTP</h3>
<table>
<tr><th></th><th>HTTP</th><th>SMTP</th></tr>
<tr><td>Direção</td><td><b>pull</b> (o cliente recupera)</td><td><b>push</b> (o emissor envia)</td></tr>
<tr><td>Objetos</td><td>cada objeto vai na <b>sua própria</b> mensagem de resposta</td><td>vários objetos vão em <b>uma só</b> mensagem de múltiplas partes (<b>MIME</b>)</td></tr>
</table>
<p>Os dois têm interação <b>comando/resposta</b> e <b>códigos de status em ASCII</b>.</p>

<h3>5. Protocolos de acesso ao correio</h3>
<p>O SMTP só faz a <b>entrega e o armazenamento no servidor do receptor</b>. Para o usuário recuperar as mensagens de lá, é preciso outro protocolo:</p>
<ul>
<li><b>POP3</b> (<i>Post Office Protocol</i>, RFC 1939): tem fase de <b>autorização</b> (agente e servidor) e fase de <b>transação</b>.</li>
<li><b>IMAP</b> (<i>Internet Mail Access Protocol</i>, RFC 1730): tem <b>mais comandos</b> (é mais complexo) e permite <b>manusear mensagens armazenadas no servidor</b>.</li>
<li><b>HTTP</b>: usado em Hotmail, Yahoo! Mail e outros webmails.</li>
</ul>
<h4>POP3 na prática</h4>
<p>Na <b>autorização</b>, o cliente declara o nome (<code>user</code>) e a senha (<code>pass</code>) e o servidor responde <b>+OK</b> ou <b>-ERR</b>. Na <b>transação</b>, o cliente usa:</p>
<ul>
<li><code>list</code>: lista os números das mensagens;</li>
<li><code>retr</code>: recupera uma mensagem pelo número;</li>
<li><code>dele</code>: apaga uma mensagem;</li>
<li><code>quit</code>: encerra.</li>
</ul>
<table>
<tr><th>POP3</th><th>IMAP</th></tr>
<tr><td>No exemplo dos slides usa o modo <b>“download e delete”</b>: depois de baixar, apaga do servidor. Bob não pode reler as mensagens se mudar de cliente.<br>Existe também o <b>“download e mantenha”</b>: copia as mensagens em clientes diferentes.<br><b>Não mantém estado</b> entre conexões.</td><td>Mantém <b>todas as mensagens em um único lugar</b>: o servidor.<br>Permite <b>organizar em pastas</b>.<br><b>Mantém o estado</b> do usuário entre sessões (nomes das pastas e o mapeamento entre IDs das mensagens e pastas).</td></tr>
</table>

<h3>6. O problema de segurança do SMTP</h3>
<p>O SMTP <b>assume entidades confiáveis</b> e não tem mecanismo de autenticação, então <b>spammers</b> podem fazer uma mensagem parecer ter vindo de qualquer endereço. A “solução” é a extensão <b>SMTP-AUTH</b> (RFC 2554), que permite a identificação real do remetente: em vez de <code>HELO</code> o cliente usa <code>EHLO</code> e então <code>auth login</code>, com usuário e senha.</p>
<p>Só que isso <b>autentica o usuário</b> que envia: um usuário autenticado ainda pode <b>falsificar o remetente do envelope ou o campo From:</b> da mensagem.</p>

<h3>7. DNS: por que ele existe</h3>
<p>Uma pessoa tem várias identificações (nome, RG, CPF, carteira de motorista…), cada uma boa para um uso. Na Internet é igual:</p>
<table>
<tr><th>Identificador</th><th>Características</th></tr>
<tr><td><b>Endereço IP</b> (ex.: 200.20.15.38)</td><td>conjunto de bits, tamanho fixo, estrutura hierárquica; <b>bom para a máquina</b>, pouco intuitivo para pessoas</td></tr>
<tr><td><b>Nome</b> (ex.: www.ic.uff.br)</td><td>tamanho variável, intuitivo; <b>bom para o ser humano</b></td></tr>
</table>
<p>O <b>DNS</b> (<i>Domain Name System</i>) faz o <b>mapeamento entre nomes de domínio e endereços IP</b> (e também o inverso: o DNS reverso). Ele é composto por:</p>
<ul>
<li>uma <b>base de dados distribuída</b> entre vários servidores, organizada de forma hierárquica;</li>
<li>um <b>protocolo da camada de aplicação</b>, pelo qual os nós se comunicam para resolver nomes. É mais um exemplo do princípio da Internet de pôr a <b>complexidade na borda</b> da rede.</li>
</ul>
<h4>Serviços do DNS</h4>
<ul>
<li><b>Traduz</b> um nome para um endereço IP.</li>
<li><b>Apelidos</b> (<i>aliasing</i>) para servidores, estações, roteadores: mapeia nomes canônicos e apelidos.</li>
<li><b>Distribuição de carga</b>: vários endereços IP mapeados a um só nome (por exemplo, servidores Web replicados).</li>
</ul>
<h4>Por que não uma base centralizada?</h4>
<ul>
<li><b>Ponto único de falha</b>: se cair, ninguém resolve nomes;</li>
<li><b>volume de tráfego</b>: todas as requisições e respostas num só lugar;</li>
<li><b>distância</b>: usuários longe do servidor têm maior tempo de resposta;</li>
<li><b>manutenção</b>: uma base gigante seria difícil de manter.</li>
</ul>
<p>Resumindo: <b>não é escalável</b>. Por isso a base é distribuída e hierárquica.</p>

<h3>8. A hierarquia de servidores</h3>
<table>
<tr><th>Nível</th><th>Quem é</th></tr>
<tr><td><b>Servidores raiz</b></td><td>consultados pelos servidores locais que <b>não conseguem resolver</b> o nome. Procuram o servidor oficial se o mapeamento é desconhecido, obtêm a tradução e a devolvem ao servidor local. São <b>13 no mundo</b> (10 só nos EUA); cada um pode ter várias <b>réplicas</b> espalhadas.</td></tr>
<tr><td><b>Servidores TLD</b> (<i>Top-level Domain</i>)</td><td>cuidam de domínios como com, org, net, edu e de todos os <b>domínios de país</b> (br, uk, fr, ca, jp). A Network Solutions mantém o .com (monopólio até 1999); o <b>NIC.br</b> (Registro.br) mantém o .br.</td></tr>
<tr><td><b>Servidores oficiais</b> (<i>authoritative</i>)</td><td>os das organizações: guardam os mapeamentos <b>oficiais</b> entre nomes e IPs, inclusive de outros servidores da organização (Web, correio). Podem ser mantidos pela organização ou pelo provedor.</td></tr>
<tr><td><b>Servidor de nomes local</b></td><td>não pertence necessariamente à hierarquia; cada provedor (ISP residencial, empresa, universidade) tem o seu, também chamado de servidor de nomes <b>padrão</b>. A estação pergunta <b>primeiro a ele</b>, e ele atua como intermediário: <b>é ele quem consulta os outros</b>.</td></tr>
</table>
<div class="ex">O cliente quer acessar <b>amazon.com</b>. O servidor local pergunta ao <b>raiz</b>, que indica o servidor <b>.com</b>; este indica o servidor <b>amazon.com</b>, que responde o IP de www.amazon.com. É como perguntar na portaria do condomínio: “não sei, mas o bloco C sabe; no bloco C, o andar 3 sabe; no andar 3, o apartamento tal te atende”.</div>

<h3>9. Consulta iterativa e recursiva</h3>
<p>No exemplo dos slides, a estação <b>cis.poly.edu</b> quer o IP de <b>gaia.cs.umass.edu</b>. Ela pergunta ao seu servidor local, <b>dns.poly.edu</b>.</p>
<table>
<tr><th>Consulta iterativa</th><th>Consulta recursiva</th></tr>
<tr><td>O servidor consultado responde com o <b>nome de outro servidor</b> para contato: “não conheço este nome, mas pergunte para esse servidor”. O servidor local vai perguntando, um por vez: raiz, TLD, oficial (dns.cs.umass.edu).</td><td><b>Transfere a responsabilidade</b> da resolução para o servidor contatado, que consulta o próximo e devolve a resposta pronta. Gera <b>maior carga nos servidores de maior altura</b> (os de cima da hierarquia).</td></tr>
</table>

<h3>10. Cache</h3>
<p>Quando qualquer servidor aprende um mapeamento, ele o <b>guarda em cache local</b>, evitando consultar servidores de maior “altura”. As entradas têm <b>temporização</b>: somem depois de um tempo, geralmente <b>2 dias</b>. Como os servidores TLD ficam em geral no cache dos servidores locais, os <b>servidores raiz acabam sendo pouco visitados</b>.</p>

<h3>11. Registros e mensagens do DNS</h3>
<p>A base é feita de <b>registros de recursos (RR)</b> no formato <b>(nome, valor, tipo, TTL)</b>; o significado de nome e valor depende do tipo.</p>
<table>
<tr><th>Tipo</th><th>Nome</th><th>Valor</th></tr>
<tr><td><b>A</b></td><td>nome de uma estação</td><td>o seu endereço IP</td></tr>
<tr><td><b>NS</b></td><td>um domínio (ex.: ic.uff.br)</td><td>o servidor oficial de nomes daquele domínio</td></tr>
<tr><td><b>CNAME</b></td><td>o “apelido” (alias)</td><td>o nome canônico (verdadeiro)</td></tr>
<tr><td><b>MX</b></td><td>um domínio</td><td>o nome do servidor de correio do domínio</td></tr>
</table>
<p>O DNS é baseado em mensagens de <b>pedido e resposta</b>, que têm o <b>mesmo formato</b>. No exemplo do comando <code>host -v www.ic.uff.br</code> a resposta vem em seções:</p>
<ul>
<li><b>QUESTION</b>: a pergunta (<i>www.ic.uff.br</i>, tipo A);</li>
<li><b>ANSWER</b>: a resposta (www.ic.uff.br é um <b>CNAME</b> para tangerina.ic.uff.br, que é <b>A</b> 200.20.15.38);</li>
<li><b>AUTHORITY</b>: os servidores oficiais (registros <b>NS</b> de ic.uff.br);</li>
<li><b>ADDITIONAL</b>: os IPs (registros <b>A</b>) desses servidores oficiais.</li>
</ul>
<div class="dica">Resolver nome → IP: o servidor local pergunta; os raiz, TLD e oficial respondem. Cache evita repetir a viagem. Registro A = nome → IP; CNAME = apelido → nome verdadeiro; MX = servidor de e-mail; NS = quem manda no domínio.</div>
`
},


"redes-a7": {
  resumo: "Como funcionam os sistemas par a par (P2P): por que escalam, o problema da busca (diretório central, hierarquia, DHT), o Pastry, o BitTorrent com seu olho por olho e o Skype com super-nós.",
  html: `
<h3>1. Duas formas de pensar a rede</h3>
<table>
<tr><th>Rede orientada ao usuário</th><th>Rede orientada ao conteúdo</th></tr>
<tr><td>um usuário quer <b>contatar outro usuário</b><br>exemplos: acesso a terminal remoto (telnet), transferência de arquivos (FTP), correio eletrônico (SMTP)</td><td>um usuário quer <b>acessar um serviço ou dado específico</b>; <b>não importa em que estação</b> ele está<br>exemplos: sistemas par a par (BitTorrent) e redes de distribuição de conteúdo (Akamai)</td></tr>
</table>
<div class="ex">Orientada ao usuário: ligar para um número de telefone. Orientada ao conteúdo: procurar “a receita do bolo X” sem se importar em qual site ela está.</div>

<h3>2. O que é um sistema par a par</h3>
<p>Os participantes <b>colaboram</b> para o funcionamento e a manutenção do sistema, <b>compartilhando recursos</b>. Há duas versões:</p>
<ul>
<li><b>Pura</b>: comunicação direta entre sistemas finais;</li>
<li><b>Híbrida</b>: usa <b>servidores auxiliares</b> (exemplos: Skype, BitTorrent).</li>
</ul>
<p>Usos típicos: <b>compartilhamento de arquivos</b> (Napster, Gnutella, Emule, Limewire, BitTorrent) e <b>distribuição de conteúdo multimídia</b>, em áudio (Skype) e vídeo (SopCast, PPLive, PPStream, Joost).</p>
<h4>Escalabilidade: cliente-servidor x P2P</h4>
<p>O gráfico dos slides compara o <b>tempo para que todos os usuários recebam uma cópia de um arquivo</b>. No cliente-servidor, o tempo <b>cresce</b> conforme chegam mais usuários, porque o servidor precisa enviar uma cópia para cada um. No P2P ele <b>cresce bem menos</b>, porque cada novo participante que recebe o arquivo também passa a enviá-lo aos outros.</p>
<div class="ex">Cliente-servidor: um professor tirando cópia para a turma inteira, uma por uma. P2P: cada aluno que recebe a cópia já tira uma para o colega ao lado.</div>

<h3>3. Compartilhamento de arquivos: a ideia básica</h3>
<ol>
<li>Um par quer um arquivo (uma música, um vídeo, um programa).</li>
<li>O primeiro passo é <b>encontrar quem o tem</b>: é a <b>busca</b>.</li>
<li>Obtém-se uma <b>lista de parceiros</b>.</li>
<li>Escolhe-se um parceiro, que envia o arquivo.</li>
<li>Durante a recepção, o par também pode <b>enviar outros arquivos</b> a quem interessar. Um par é <b>cliente e servidor temporário</b> ao mesmo tempo.</li>
</ol>
<div class="ex">Alice abre o cliente P2P no notebook e pede “Hey Jude”. A aplicação mostra a lista de parceiros que têm a música. Alice escolhe o <b>Bob</b>, e o arquivo é copiado do PC de Bob para o notebook dela. Enquanto baixa, outros usuários podem estar pegando arquivos do computador de Alice.</div>
<p>O <b>problema crítico</b> é a <b>busca por arquivos</b>.</p>

<h3>4. Busca: como construir o índice</h3>
<p>O <b>índice</b> registra dinamicamente as <b>localizações dos arquivos</b> compartilhados pelos pares: os pares informam ao índice o que possuem, e consultam o índice para descobrir onde encontrar os arquivos. Há três jeitos de construí-lo.</p>
<h4>Diretório centralizado (Napster)</h4>
<ol>
<li>Quando um parceiro se conecta, informa ao <b>servidor de diretório central</b> o seu <b>endereço IP</b> e o seu <b>conteúdo</b>;</li>
<li>Alice consulta o servidor sobre “Hey Jude”;</li>
<li>Alice pede o arquivo diretamente a Bob.</li>
</ol>
<p>Problemas: <b>ponto único de falha</b>, <b>gargalo de desempenho</b> e <b>violação de direitos autorais</b>. Repare: a <b>transferência do arquivo é descentralizada</b>, mas a <b>busca é altamente centralizada</b>.</p>
<h4>Hierarquia (exemplo: Gnutella)</h4>
<p>O conhecimento da localização dos arquivos é <b>distribuído entre os pares</b>, e nenhum par conhece a localização de todos os arquivos.</p>
<ul>
<li>Cada par é um <b>líder de grupo</b> ou está ligado a um líder, por uma <b>conexão TCP</b>; alguns líderes também têm conexões TCP entre si.</li>
<li>O líder mantém o <b>registro do conteúdo de todos os seus filhos</b>.</li>
<li>Os líderes <b>só conhecem parte</b> da localização dos arquivos.</li>
</ul>
<h4>Tabelas hash distribuídas (DHT)</h4>
<p>A informação é um par <b>(chave, valor)</b>. Exemplos: (1980, Igor); (Led Zeppelin IV, 192.168.2.1). Os pares <b>buscam pela chave</b> e a DHT devolve o valor associado; também podem <b>inserir</b> pares (chave, valor). As chaves vêm de uma <b>função hash</b>, que dá <b>identificação única</b> (pouca chance de colisão), <b>tamanho fixo</b> e <b>espalhamento</b> (distribui a carga). Algumas funções ainda garantem que não dá para voltar do hash à informação original.</p>
<p><b>Identificadores</b>: cada par recebe um número inteiro de <b>n bits</b>, entre 0 e 2<sup>n</sup>−1, e cada chave também é um inteiro nesse intervalo (por exemplo, chave = h(“Led Zeppelin IV”)).</p>
<p><b>Quem guarda cada chave?</b> A regra: o par com o <b>identificador mais próximo</b> do da chave, entendido como o <b>sucessor imediato</b>.</p>
<div class="ex">Com n = 4 (identificadores de 0 a 15) e pares 1, 3, 4, 5, 8, 10, 12, 14: a <b>chave 13</b> fica com o par <b>14</b>; a <b>chave 15</b> “dá a volta” e fica com o par <b>1</b>.</div>
<h4>DHT circular</h4>
<p>Cada par conhece só o <b>sucessor imediato</b> e o <b>antecessor</b>, formando uma <b>rede sobreposta</b> (<i>overlay</i>). Para achar o responsável, a pergunta (“quem é responsável pela chave 1110?”) passa de par em par até chegar a quem é o sucessor imediato: <b>O(N)</b> mensagens, em média, com N pares.</p>
<p><b>Com atalhos</b>: cada par sabe o endereço do antecessor, do sucessor e de <b>alguns outros pares</b>. Isso reduz o número de mensagens de O(N) para <b>O(log N)</b>. No exemplo dos slides, achar o responsável por uma chave leva <b>6 mensagens sem atalhos e 2 com atalhos</b>.</p>

<h3>5. Exemplo de DHT: Pastry</h3>
<ul>
<li>Cada nó recebe um identificador de <b>128 bits</b>, obtido por função hash do <b>endereço IP</b> ou da <b>chave pública</b> do nó. Os identificadores ficam uniformemente distribuídos.</li>
<li>Cada objeto tem uma chave de 128 bits.</li>
<li>Dada uma mensagem e uma chave, a mensagem é encaminhada ao nó com identificador <b>numericamente mais próximo</b> da chave.</li>
<li>O Pastry <b>estima a proximidade</b> entre os nós: cada nó mede sua distância até outro nó de IP conhecido, para que a rede sobreposta tenha caminhos <b>próximos aos da camada de rede</b>. A distância pode ser o <b>número de saltos</b> (traceroute), o <b>tempo de ida e volta</b> (ping) ou a <b>vazão</b> (par de pacotes).</li>
</ul>

<h3>6. BitTorrent</h3>
<p>Ponto-chave: os arquivos são <b>divididos em pedaços</b> (de <b>256 KB</b>) espalhados pelos pares. Vocabulário:</p>
<table>
<tr><th>Termo</th><th>Significado</th></tr>
<tr><td><b>Torrent</b> ou <b>enxame</b> (<i>swarm</i>)</td><td>o grupo de pares que trocam pedaços de um arquivo</td></tr>
<tr><td><b>Tracker</b> (rastreador)</td><td>registra os pares participantes de um torrent</td></tr>
<tr><td><b>Arquivo .torrent</b></td><td>traz o endereço do tracker; como obtê-lo está <b>fora do escopo do protocolo</b></td></tr>
<tr><td><b>Seeder</b> (semeador)</td><td>par que tem <b>todos</b> os pedaços do arquivo</td></tr>
<tr><td><b>Leecher</b> (sanguessuga)</td><td>par que ainda está <b>baixando</b> pedaços</td></tr>
</table>
<p>A vantagem é <b>reduzir a complexidade da busca</b>: quem quer o arquivo já chega com o .torrent. Como um nó N entra:</p>
<ol>
<li>obtém o arquivo <b>.torrent</b>, que traz o endereço do tracker;</li>
<li>se <b>registra no tracker</b>;</li>
<li>o tracker envia uma <b>lista de possíveis vizinhos</b> (A, B, C, D);</li>
<li>N escolhe <b>aleatoriamente</b> um subconjunto e envia mensagens para estabelecer a vizinhança; se a resposta for positiva, os enlaces são criados e os nós viram vizinhos.</li>
</ol>
<p><b>Troca de pedaços</b>:</p>
<ul>
<li>o recém-chegado <b>não tem nenhum pedaço</b>, mas acumula com o tempo; enquanto baixa, <b>também envia</b> pedaços a outros;</li>
<li>a troca é feita <b>somente entre os pares</b>;</li>
<li>periodicamente, o par (Alice) recebe de seus vizinhos <b>a lista de pedaços que eles possuem</b> (um mapa);</li>
<li>Alice pede os pedaços que ainda não tem, <b>os mais raros primeiro</b>;</li>
<li>o pedaço recebido é guardado no buffer.</li>
</ul>
<p>O problema: pares <b>entram e saem</b> do enxame. Ao obter o arquivo inteiro, o par pode sair (<b>egoisticamente</b>) ou permanecer (<b>altruisticamente</b>).</p>
<h4>Olho por olho (<i>tit-for-tat</i>)</h4>
<ul>
<li>Cada par tem <b>até 4 vizinhos</b>, e os pedaços são trocados só entre eles.</li>
<li>Um par só deve continuar enviando pedaços aos vizinhos que <b>mais enviam</b> pedaços a ele.</li>
<li>Os vizinhos são <b>reavaliados a cada 10 s</b>, conforme o número de pedaços recebidos.</li>
<li>O vizinho que <b>menos envia</b> (o pior) é <b>substituído a cada 30 s</b>: o par escolhe outro <b>aleatoriamente</b> e começa a enviar pedaços a ele. É a <b>seleção otimista</b> (<i>optimistically unchoke</i>), porque não se sabe se o novo será melhor que o atual pior.</li>
</ul>
<p>Alice seleciona Bob de forma otimista; Alice se torna um dos quatro melhores provedores de Bob, e Bob age da mesma forma, tornando-se um dos quatro melhores de Alice. Com <b>taxa de upload mais alta</b>, o par pode achar <b>melhores parceiros de troca</b> e obter o arquivo mais rápido.</p>
<p>Problemas que sobram: e se o novo vizinho enviar menos que o atual pior? E se for um <b>caroneiro</b> (<i>free-rider</i>), que só recebe e não envia nada?</p>
<div class="ex">Troca de figurinhas: você continua dando figurinhas para quem mais te dá. De vez em quando testa um desconhecido, na esperança de que ele seja um bom parceiro. Quem só recebe e nunca dá é o caroneiro.</div>

<h3>7. Skype</h3>
<ul>
<li>É um <b>protocolo proprietário</b> da camada de aplicação; o funcionamento foi <b>estimado por engenharia reversa</b>.</li>
<li>A <b>comunicação entre os usuários é P2P</b>.</li>
<li>O <b>índice</b>, que mapeia nomes de usuários em endereços IP, é um <b>overlay hierárquico distribuído</b> pelos <b>super-nós (SNs)</b>. Há clientes Skype (SC), super-nós e um servidor de login.</li>
</ul>
<p><b>O problema do NAT</b>: quando Alice e Bob estão atrás de NATs, o NAT <b>impede que um par externo inicie uma chamada</b> com um par interno. A solução é usar um <b>intermediário (relay)</b>, escolhido por meio dos SNs de Alice e de Bob. Cada par inicia a sessão com o intermediário, e eles se comunicam através dele.</p>
<div class="dica">P2P: quem baixa também envia. Busca por diretório central = simples, mas frágil. Hierarquia = busca em grupos. DHT = busca por chave, em O(log N) com atalhos. BitTorrent evita a busca com o tracker e usa olho por olho para incentivar a cooperação.</div>
`
},


"redes-a8910": {
  resumo: "Camada de transporte: portas e sockets, multiplexação, UDP (cabeçalho e checksum), como construir um canal confiável sobre um canal que erra e perde (ACK, número de sequência, temporizador, paralelismo) e as características do TCP.",
  html: `
<h3>1. O que a camada de transporte faz</h3>
<p>Cria um <b>canal lógico de comunicação entre processos</b> em sistemas finais diferentes: para a aplicação, parece que as duas pontas estão ligadas diretamente (<b>fim-a-fim</b>). Os protocolos de transporte rodam <b>só nos sistemas finais</b>: quem envia converte as mensagens em <b>segmentos</b> e os entrega à rede; quem recebe remonta as mensagens e as entrega à aplicação.</p>
<table>
<tr><th>Transporte</th><th>Rede</th></tr>
<tr><td>canal lógico entre <b>processos</b></td><td>canal lógico entre <b>estações</b></td></tr>
<tr><td>usa e pode estender os serviços da rede</td><td>entrega de <b>melhor esforço</b>: não garante entrega, ordem nem integridade</td></tr>
</table>
<p><b>Serviços mínimos</b> do transporte: estender a entrega de “entre sistemas finais” para “entre processos” (<b>multiplexação e demultiplexação</b>) e <b>verificar integridade</b> (campos de detecção de erros no cabeçalho).</p>
<table>
<tr><th>UDP</th><th>TCP</th></tr>
<tr><td>só os serviços mínimos: entrega não confiável e fora de ordem</td><td>entrega <b>confiável e ordenada</b>, conexão, controle de congestionamento e de fluxo</td></tr>
</table>
<div class="dica">Nenhum dos dois garante <b>atraso máximo</b> nem <b>banda mínima</b>.</div>

<h3>2. Socket e porta</h3>
<p>O <b>socket</b> é a interface de software entre a aplicação e o transporte, a “API da rede”. O processo manda e recebe mensagens pelo seu socket.</p>
<div class="ex">O processo é uma casa e o socket é a porta: quem envia empurra a mensagem pela porta e confia na infraestrutura do outro lado para levá-la ao destinatário.</div>
<p>A API de sockets nasceu no Unix BSD 4.1, em 1981; os sockets são criados, usados e liberados <b>explicitamente</b> pela aplicação, no paradigma cliente-servidor, com dois serviços: <b>datagrama não confiável (UDP)</b> e <b>fluxo de bytes confiável (TCP)</b>. O programador controla tudo do lado da aplicação, mas pouco do lado do transporte (escolhe o protocolo e alguns parâmetros).</p>
<p>O IP <b>não basta</b> para identificar um processo, porque várias aplicações rodam na mesma máquina. O identificador completo é <b>IP + número de porta</b>. Ex.: HTTP em www.ic.uff.br é o IP 200.20.15.38, porta 80; servidor de e-mail, porta 25.</p>

<h3>3. Multiplexação e demultiplexação</h3>
<ul>
<li><b>Multiplexação</b> (quem envia): junta mensagens de vários sockets e acrescenta um cabeçalho.</li>
<li><b>Demultiplexação</b> (quem recebe): usa o cabeçalho para entregar o segmento ao <b>socket certo</b>.</li>
</ul>
<table>
<tr><th></th><th>UDP (sem conexão)</th><th>TCP (com conexão)</th></tr>
<tr><td><b>Identifica o socket por</b></td><td><b>IP de destino + porta de destino</b></td><td>a <b>quádrupla</b>: IP de origem, porta de origem, IP de destino, porta de destino</td></tr>
<tr><td><b>Um socket recebe de origens diferentes?</b></td><td><b>Sim</b>; a origem serve só de endereço de retorno</td><td><b>Não</b>; cada segmento vai para um socket específico</td></tr>
</table>
<p>Por isso um servidor Web tem <b>um socket TCP por conexão</b> de cliente (e, em HTTP não persistente, um por pedido).</p>

<h3>4. UDP</h3>
<p>Definido na RFC 768: o transporte mínimo, de melhor esforço. Segmentos podem se perder ou chegar fora de ordem. É <b>sem conexão</b>: cada segmento é tratado de forma independente.</p>
<p><b>Por que existe?</b> (1) não tem estabelecimento de conexão, logo <b>menor latência</b>; (2) é simples, sem estado de conexão; (3) <b>cabeçalho pequeno (8 bytes)</b>; (4) <b>sem controle de congestionamento</b>: pode enviar o mais rápido que quiser.</p>
<p>Formato: cabeçalho de 8 bytes com 4 campos de 16 bits, seguido dos dados.</p>
<pre>Porta origem | Porta destino
Comprimento  | Checksum
Dados da aplicação</pre>
<p>O <b>comprimento</b> é em bytes, cabeçalho incluído. Usado por DNS, SNMP, RIP, NFS e por multimídia (tolerante a perdas, sensível à taxa). Se a aplicação precisa de confiabilidade sobre UDP, ela mesma tem de acrescentá-la.</p>
<h4>Checksum</h4>
<p>Detecta erros (bits trocados). Quem envia trata o segmento como inteiros de 16 bits, zera o campo checksum, <b>soma em complemento de 1</b> (o transbordo do bit mais alto é somado de volta) e grava o <b>complemento</b> da soma. Quem recebe soma tudo, incluindo o checksum: se der <b>FFFF</b>, nenhum erro foi detectado.</p>
<div class="ex">Duas palavras: 1234 e F0F0 (em hexadecimal). A soma é 10324; o “vai-um” volta para o início e dá 0325. O complemento é <b>FCDA</b>, que vai no campo checksum. O receptor soma 1234 + F0F0 + FCDA = 1FFFE; com o “vai-um”, FFFF. Tudo certo.</div>
<div class="dica">Dar FFFF não prova que não houve erro: <b>ainda pode haver</b> erros (por exemplo, dois erros que se compensam).</div>

<h3>5. Construindo um canal confiável</h3>
<p>Um <b>canal confiável</b> não corrompe, não perde e entrega <b>em ordem</b>. Um protocolo de transferência confiável (rdt) o constrói sobre um canal não confiável; quanto pior o canal, mais complexo o protocolo. As primitivas são <code>rdt_send()</code> (a aplicação entrega dados), <code>udt_send()</code> (envia pelo canal ruim), <code>rdt_rcv()</code> (chega um pacote) e <code>deliver_data()</code> (entrega à camada de cima).</p>
<h4>Passo a passo, da versão simples à completa</h4>
<table>
<tr><th>Problema</th><th>Solução</th></tr>
<tr><td><b>Bits trocados</b></td><td><b>Detectar</b> com checksum e <b>recuperar</b> com ACK (recebi certo) e NAK (veio com erro, reenvie). É o mecanismo ARQ</td></tr>
<tr><td><b>ACK/NAK corrompido</b></td><td>O emissor não sabe o que houve; se reenviar às cegas, cria duplicatas. Então: <b>número de sequência</b> em cada pacote; reenviar o último se o ACK/NAK vier com erro; o receptor <b>descarta duplicatas</b>. No pare-e-espere bastam os números 0 e 1</td></tr>
<tr><td><b>Sem NAK</b></td><td>O receptor manda ACK do <b>último pacote recebido certo</b>, com o número de sequência. ACK duplicado no emissor equivale a um NAK: reenvia</td></tr>
<tr><td><b>Perda de pacote ou ACK</b></td><td>O emissor espera um tempo razoável e reenvia: precisa de um <b>temporizador</b>. Se o pacote só estava atrasado, a retransmissão vira duplicata, mas o número de sequência resolve</td></tr>
</table>
<div class="ex">Você manda um áudio e a pessoa responde “ok”. Se o “ok” não chega, você manda de novo (temporizador). Ela recebe duas vezes o mesmo áudio e percebe pelo número da mensagem que é repetido (sequência), e ignora a cópia.</div>

<h3>6. O problema do pare-e-espere e o paralelismo</h3>
<p>No pare-e-espere o emissor envia <b>um pacote e espera o ACK</b>. Fica confiável, mas lento.</p>
<div class="ex">Enlace de 1 Gb/s, retardo de 15 ms em cada sentido e pacote de 1 KB: um pacote sai a cada 30 ms, o que dá só cerca de <b>33 kB/s</b> num enlace de 1 Gb/s. Transmitir o pacote leva apenas uns 8 µs, ou seja, o emissor passa cerca de 0,027% do tempo realmente enviando bits.</div>
<p>A saída é o <b>paralelismo (pipelining)</b>: enviar <b>vários pacotes em sequência</b> sem esperar cada ACK. Exige ampliar a faixa de números de sequência e ter <b>buffers</b> no emissor e/ou receptor. No exemplo da aula, a utilização sobe por um fator de 3.</p>

<h3>7. TCP</h3>
<p>Muito mais complexo que o UDP (RFCs 793, 1122, 1323, 2018 e 2581; o UDP tem só a 768). Características:</p>
<ul>
<li><b>Orientado à conexão</b>: antes dos dados há um <b>handshake</b> para definir parâmetros. A conexão é <b>lógica</b>, diferente da comutação de circuitos: sem caminho definido, sem reserva de recursos; só existe <b>nos sistemas finais</b> (os intermediários não guardam estado).</li>
<li><b>Ponto-a-ponto</b>: um emissor e um receptor.</li>
<li><b>Full duplex</b>: dados nos dois sentidos na mesma conexão.</li>
<li><b>MSS</b>: tamanho máximo de segmento.</li>
<li><b>Controle de fluxo</b>: o emissor não “afoga” o receptor.</li>
<li><b>Controle de congestionamento</b>: evita saturar os enlaces da rede.</li>
</ul>
`
},

"redes-a1114": {
  resumo: "Camada de rede: encaminhar × rotear, circuito virtual × datagrama, o que há dentro de um roteador, regra do maior prefixo, o cabeçalho IP campo a campo (TTL, protocolo, checksum) e a fragmentação, com o exercício de 4000 bytes e MTU 1500.",
  html: `
<h3>1. O que a camada de rede faz</h3>
<ul>
<li>Determinar o <b>melhor caminho</b> dos pacotes: função dos <b>protocolos de roteamento</b>.</li>
<li><b>Encaminhar</b> os pacotes até o destino: função do <b>IP</b>.</li>
<li><b>Interconectar</b> redes de tecnologias diferentes: função do <b>IP</b>.</li>
</ul>
<p>Seus protocolos rodam nos sistemas finais <b>e nos roteadores</b>.</p>
<table>
<tr><th>Encaminhamento</th><th>Roteamento</th></tr>
<tr><td>mover o pacote de uma <b>entrada</b> do roteador para a <b>saída</b> apropriada</td><td>determinar a <b>rota</b> da origem ao destino</td></tr>
<tr><td>função do protocolo <b>IP</b></td><td>função dos protocolos de roteamento, que constroem a <b>tabela de encaminhamento</b></td></tr>
</table>
<div class="ex">Roteamento é planejar a viagem no mapa; encaminhamento é, em cada cruzamento, escolher a saída. O plano alimenta as escolhas.</div>
<p><b>Transparência sintática</b>: os pacotes vão da origem ao destino <b>sem que a rede modifique os dados</b>; só erros de transmissão os alteram.</p>
<table>
<tr><th>Comutadores</th><th>Roteadores</th></tr>
<tr><td>mais rápidos, mais baratos</td><td>mais lentos, mais caros</td></tr>
<tr><td>sem endereçamento hierárquico</td><td><b>endereçamento hierárquico</b>: menos entradas na tabela e busca mais rápida</td></tr>
</table>

<h3>2. Modelos de serviço e melhor esforço</h3>
<p>Os <b>modelos de serviço</b> definem como os pacotes são transportados fim-a-fim (entrega garantida, ordenada, banda mínima, jitter máximo, segurança…). Na Internet há <b>só o IP</b>, com <b>um serviço: melhor esforço</b>. (Intserv e Diffserv são extensões dele.)</p>
<p>No <b>melhor esforço</b> os roteadores fazem o que podem, sem distinção: nós simples e baratos, <b>sem estado na rede</b>; cada pacote é encaminhado <b>independente</b> dos outros; sem reserva de recursos, recuperação de erros ou garantia de acesso; o atraso depende do <b>tamanho da fila</b>; e o pacote é <b>descartado se a fila estiver cheia</b>.</p>

<h3>3. Circuito virtual × datagrama</h3>
<table>
<tr><th></th><th>Circuito virtual</th><th>Datagrama</th></tr>
<tr><td><b>Conexão</b></td><td>é necessário estabelecer</td><td>não é necessário</td></tr>
<tr><td><b>Endereçamento</b></td><td>identificador do CV</td><td>endereços de origem e destino</td></tr>
<tr><td><b>Estado</b></td><td>por conexão</td><td>sem estado</td></tr>
<tr><td><b>Roteamento</b></td><td>rota escolhida na conexão e seguida depois</td><td>cada pacote “independente”</td></tr>
<tr><td><b>Falha de roteadores</b></td><td>todos os circuitos que passam por ele caem</td><td>perda de pacotes durante a falha</td></tr>
<tr><td><b>Qualidade de serviço e congestionamento</b></td><td>mais fáceis</td><td>difíceis</td></tr>
</table>
<p><b>Rede de datagramas</b> (a Internet): serviço não confiável e sem conexão; roteadores não guardam estado; encaminha-se pelo <b>endereço de destino</b>; dois pacotes do mesmo par origem-destino <b>podem seguir caminhos diferentes</b>.</p>
<p><b>Circuito virtual</b>: um caminho, números de CV (<b>um por enlace</b>, trocados a cada salto pela tabela) e entradas nas tabelas de cada roteador. Os pacotes carregam o número do CV em vez dos endereços; cada roteador guarda estado por conexão e pode reservar banda e buffers. <b>Protocolos de sinalização</b> estabelecem, mantêm e encerram o CV (ATM, frame-relay, X.25), mas <b>não são usados na Internet convencional</b>.</p>

<h3>4. Regra do maior prefixo</h3>
<p>Um IP tem 32 bits: cerca de 4 bilhões de endereços, o que tornaria inviável uma entrada por endereço. Faz-se <b>agregação por prefixos</b> e escolhe-se a entrada <b>com o prefixo mais longo que casa</b> com o destino.</p>
<table>
<tr><th>Prefixo</th><th>Interface</th></tr>
<tr><td>11001000.00010111.00010</td><td>0</td></tr>
<tr><td>11001000.00010111.00011000</td><td>1</td></tr>
<tr><td>11001000.00010111.00011</td><td>2</td></tr>
<tr><td>caso contrário</td><td>3</td></tr>
</table>
<p>Um destino que começa com <code>11001000.00010111.00011000</code> casa com as linhas 2 e 3 da tabela; vale a <b>mais longa</b> (a de 24 bits), então vai pela <b>interface 1</b>. Um destino com <code>11001000.00010111.00010110…</code> vai pela interface 0.</p>
<div class="ex">Como endereço de rua: “Brasil” casa com todo endereço do país, “Brasil, Niterói” é mais específico. Entre as duas regras, vale a mais específica.</div>

<h3>5. Dentro do roteador</h3>
<p>O roteador decide o caminho (de forma distribuída), encaminha e interconecta redes. Ao chegar um pacote, olha-se o destino: se for o de uma de suas interfaces, é processado; senão, é encaminhado.</p>
<p><b>Porta de entrada</b>: recebe os bits (física), trata o enlace (ex.: Ethernet) e faz a <b>comutação descentralizada</b>: procura a porta de saída na tabela que está na própria porta. A meta é trabalhar na <b>velocidade da linha</b>; se os datagramas chegam mais rápido, formam-se filas.</p>
<table>
<tr><th>Técnica de comutação</th><th>Como é</th><th>Limite</th></tr>
<tr><td><b>Por memória</b> (1ª geração)</td><td>o processador copia o pacote</td><td>banda da memória; duas travessias do barramento por datagrama</td></tr>
<tr><td><b>Por barramento</b></td><td>da porta de entrada à de saída por um barramento compartilhado</td><td>disputa pelo barramento</td></tr>
<tr><td><b>Por crossbar</b></td><td>reduz a disputa; 2n barramentos ligam n entradas a n saídas</td><td>—</td></tr>
</table>
<ul>
<li><b>Filas na saída</b>: acontecem quando a taxa de chegada pelo comutador excede a de transmissão de saída; geram <b>atraso e perdas</b> por estouro do buffer. Um escalonador escolhe qual datagrama enviar.</li>
<li><b>Filas na entrada</b>: se o comutador é mais lento que a soma das entradas. Surge o <b>bloqueio de cabeça de fila (HOL)</b>: o datagrama na frente impede os de trás de avançar.</li>
</ul>

<h3>6. O protocolo IP e seu cabeçalho</h3>
<p>RFC 791. É responsável pelo <b>encaminhamento</b> (não pelo roteamento!) e pelo <b>endereçamento</b> de estações e roteadores (o endereço diz quem e onde: semântica sobrecarregada). Todos os campos do cabeçalho têm tamanho fixo, exceto as opções.</p>
<table>
<tr><th>Campo</th><th>O que é</th></tr>
<tr><td><b>Versão</b> (4 bits)</td><td>4 é a atual; 5 era o ST-2; 6, “a próxima geração”</td></tr>
<tr><td><b>IHL</b> (4 bits)</td><td>tamanho do cabeçalho em palavras de 32 bits: de 5 (sem opções) a 15, ou seja, até 40 bytes de opções</td></tr>
<tr><td><b>Comprimento total</b> (16 bits)</td><td>pacote inteiro; limita-o a 65.535 bytes</td></tr>
<tr><td><b>Tipo de serviço</b> (8 bits)</td><td>usado para QoS: <b>Precedence</b> (3 bits) é a prioridade na fila, válida só dentro de uma rede; <b>Type of Service</b> (5 bits) indica a rota com melhor D (atraso), T (vazão), R (confiabilidade) ou C (custo), sem usar mais de um ao mesmo tempo</td></tr>
<tr><td><b>TTL</b> (8 bits)</td><td>tempo de vida máximo (padrão 64). Cada roteador decrementa; na prática, de 1 por salto. Quando chega ao fim, o pacote é <b>descartado</b></td></tr>
<tr><td><b>Protocol</b> (8 bits)</td><td>a quem entregar o pacote no destino: 1 ICMP · 2 IGMP · 4 IP em IP · <b>6 TCP</b> · <b>17 UDP</b> · 29 ISO-TP4 · 80 ISO-IP · 89 OSPF</td></tr>
<tr><td><b>Header Checksum</b> (16 bits)</td><td>protege <b>só o cabeçalho</b> (complemento de 1 da soma em complemento de 1 das palavras de 16 bits)</td></tr>
</table>
<p>O checksum é simples, mas não protege contra inserção de palavras zeradas ou inversão de palavras. Ele é <b>recalculado a cada salto</b>: se a verificação falha, o pacote é descartado; se passa, recalcula-se, porque o TTL mudou.</p>

<h3>7. Fragmentação</h3>
<p>Um roteador liga redes diferentes, e cada tecnologia tem um tamanho máximo de pacote, a <b>MTU</b>. Um datagrama grande é <b>fragmentado</b> dentro da rede e <b>remontado só no destino final</b> (mais um caso de complexidade nas bordas).</p>
<table>
<tr><th>Campo</th><th>Função</th></tr>
<tr><td><b>Identification</b> (16 bits)</td><td>com o endereço de origem, diz a qual pacote o fragmento pertence</td></tr>
<tr><td><b>Fragment Offset</b> (13 bits)</td><td>posição do fragmento, em <b>palavras de 8 bytes</b></td></tr>
<tr><td><b>Flags</b> (3 bits)</td><td>bit 0 reservado; bit 1 <b>DF</b> (don’t fragment); bit 2 <b>MF</b> (more fragments)</td></tr>
</table>
<p>O bit <b>MF é 1 em todos os fragmentos, exceto no último</b>. Cada fragmento tem um cabeçalho completo, igual ao original, exceto comprimento, offset e MF.</p>
<h4>Exercício clássico: 4000 bytes, MTU de 1500</h4>
<p>O cabeçalho tem 20 bytes, então sobram 3980 bytes de dados. Cada fragmento leva no máximo <b>1480 bytes de dados</b> (múltiplo de 8).</p>
<table>
<tr><th>Fragmento</th><th>Dados</th><th>Comprimento total</th><th>Offset</th><th>MF</th></tr>
<tr><td>1</td><td>1480</td><td>1500</td><td>0</td><td>1</td></tr>
<tr><td>2</td><td>1480</td><td>1500</td><td>1480 / 8 = 185</td><td>1</td></tr>
<tr><td>3</td><td>1020</td><td>1040</td><td>2960 / 8 = 370</td><td>0</td></tr>
</table>
<p>Todos com o mesmo Identification. Quem remonta precisa “expirar” os pacotes parcialmente remontados após um tempo de espera.</p>
<div class="dica">A fragmentação é <b>ineficiente</b>: com TCP, perder um fragmento obriga a retransmitir o pacote inteiro, e os roteadores gastam memória guardando fragmentos. Para evitá-la, o TCP faz a <b>descoberta da MTU do caminho</b> (Path MTU Discovery): tenta tamanhos diferentes com <b>DF = 1</b> e usa o maior que passar.</div>
`
},

"redes-a15": {
  resumo: "Roteamento: o que a tabela guarda, vetores de distância e a equação de Bellman-Ford (com exemplo calculado), a divisão da Internet em sistemas autônomos, IGP × EGP e os problemas do algoritmo (bouncing, contagem até o infinito) com split horizon.",
  html: `
<h3>1. Por que precisamos de roteamento</h3>
<p>Uma rede conectada já permitiria a comunicação por <b>inundação</b>: cada nó repete a mensagem a todos os vizinhos até chegar ao destino. Mas isso não é eficiente nem escalável. O roteamento leva os dados ao destino de forma eficiente, pelo caminho <b>ótimo ou quase ótimo</b>.</p>
<p>O objetivo é achar o <b>caminho mais curto</b> entre qualquer par de nós. A <b>tabela de roteamento</b> tem, em cada entrada: <b>destino</b>, <b>próximo salto</b> e <b>métrica/custo</b>.</p>
<table>
<tr><th>Tipo de protocolo</th><th>Algoritmo</th></tr>
<tr><td><b>Vetores de Distância</b> (Distance Vector, DV)</td><td>Bellman-Ford</td></tr>
<tr><td><b>Estado do Enlace</b> (Link State, LS)</td><td>Dijkstra</td></tr>
</table>
<p>Nesta aula o detalhe é o de vetores de distância; o de estado do enlace foi só apresentado.</p>

<h3>2. A rede como grafo</h3>
<p>G = (N, E): N são os roteadores e E os enlaces. O custo do enlace <b>c(x, x’)</b> pode ser 1 (contagem de saltos) ou inversamente relacionado à banda. O custo de um caminho é a <b>soma</b> dos custos dos seus enlaces.</p>

<h3>3. Equação de Bellman-Ford</h3>
<pre>dx(y) = min  { c(x,v) + dv(y) }
         v</pre>
<p>O custo do menor caminho de x até y é o <b>mínimo, entre todos os vizinhos v de x</b>, de “custo até o vizinho + custo do vizinho até y”. O vizinho que dá o mínimo é o <b>próximo salto</b>, e isso gera a tabela de encaminhamento.</p>
<div class="ex">Dados: dv(z) = 5, dx(z) = 3, dw(z) = 3, c(u,v) = 2, c(u,x) = 1, c(u,w) = 5. Qual o custo de u até z?<br>du(z) = min { 2+5, 1+3, 5+3 } = min { 7, 4, 8 } = <b>4</b>, pelo vizinho <b>x</b> (o próximo salto de u para z).<br>Em linguagem de gente: é como escolher o amigo cujo “custo para chegar até ele mais o que ele diz que falta” seja o menor.</div>

<h3>4. Vetores de distância na prática</h3>
<p>Cada nó x mantém: <b>Dx(y)</b>, a estimativa do menor custo até cada destino y (seu <b>vetor de distâncias</b>); o <b>custo para cada vizinho</b> c(x,v); e os <b>vetores dos vizinhos</b> Dv. Cada nó envia periodicamente seu vetor aos vizinhos e, ao receber um novo, atualiza o seu pela equação de B-F. Sob condições mínimas e naturais, as estimativas <b>convergem</b> para o menor custo real.</p>
<ul>
<li><b>Iterativo e assíncrono</b>: cada passo local é causado por uma mudança no custo de um enlace local ou por uma mensagem de vizinho avisando que mudou um caminho.</li>
<li><b>Distribuído</b>: cada nó só avisa os vizinhos quando muda o <b>seu</b> caminho de menor custo para algum destino.</li>
</ul>
<p>Ciclo de cada nó: <b>espera → recalcula a tabela → se mudou, avisa os vizinhos</b>. Complexidade O(nm), com n nós e m arestas.</p>

<h3>5. Sistemas Autônomos (AS)</h3>
<p>Em 1980 a Internet era <b>uma rede só</b> (Arpanet + Satnet, rodando o GGP). Com o crescimento veio o problema de escala: gerenciamento complexo, atualizações de topologia frequentes, implementações diferentes do GGP dificultando versões novas, impossibilidade de guardar todos os destinos numa tabela e troca de tabelas sobrecarregando os enlaces.</p>
<p>A solução: dividir a Internet em <b>Sistemas Autônomos</b>, conjuntos de roteadores e redes <b>sob a mesma administração</b>. Não há limites rígidos: pode ser um roteador ligado à Internet, uma rede corporativa com várias LANs, os clientes de um ISP… Cada AS tem um <b>número de 16 bits</b> atribuído pelas autoridades de numeração (ICANN etc.). A Internet passa a ser um <b>conjunto de ASes</b>.</p>
<table>
<tr><th>Intradomínio</th><th>Interdomínio</th></tr>
<tr><td><b>dentro</b> de um AS</td><td><b>entre</b> ASes</td></tr>
<tr><td><b>IGP</b> (Interior Gateway Protocol): RIP, OSPF, IGRP, IS-IS</td><td><b>EGP</b> (Exterior Gateway Protocol): GGP, EGP, <b>BGP</b></td></tr>
<tr><td>objetivo: <b>desempenho</b></td><td>objetivo: <b>política</b></td></tr>
</table>
<div class="dica">A conectividade global tem de se manter: as entradas de roteamento de cada AS precisam cobrir <b>todos os destinos da Internet</b>.</div>

<h3>6. Quando algo quebra: bouncing e contagem até o infinito</h3>
<p>O DV tem um ponto fraco: <b>notícia ruim viaja devagar</b>.</p>
<ul>
<li><b>Bouncing effect</b>: quando um enlace falha, os nós ainda propagam <b>rotas antigas</b>. A cada rodada de troca de vetores, eles aumentam a métrica até o destino inalcançável (de 2 em 2, no exemplo) e “quicam” entre si até o algoritmo finalmente convergir. Resultado: <b>convergência lenta</b>.</li>
<li><b>Contagem até o infinito</b>: se a falha separa a rede em duas partes, pode se formar um <b>loop</b>. Se D gerar o vetor antes de A, A percebe que tudo, exceto D, ficou inalcançável e converge. Se A enviar primeiro, D atualiza com uma rota que passa por A, que por sua vez passa por D: <b>loop entre A e D</b>. A contagem sobe sem parar, porque os nós do outro lado estão isolados. Resultado: convergência muito lenta.</li>
</ul>
<div class="ex">Dois vizinhos que, depois de uma queda, ficam passando a bola um ao outro: “eu chego lá passando por você” / “eu chego lá passando por você”. Cada volta soma mais um ao custo, mas ninguém chega a lugar nenhum.</div>

<h3>7. As melhorias: split horizon e triggered updates</h3>
<p>Duas melhorias atacam esses dois problemas: <b>split horizon</b> e <b>triggered updates</b> (atualizações disparadas por <b>evento</b>, e não só periódicas).</p>
<p><b>Split horizon</b>: se A usa B para chegar a X, não faz sentido B usar A para chegar a X; logo A <b>não deve anunciar a B</b> a rota para X. Cada nó envia vetores <b>diferentes</b> conforme o enlace de saída: as rotas que saem por E <b>não são anunciadas por E</b>. No exemplo, “A envia o DV para D somente com A = 0”, e o loop não se forma.</p>
<table>
<tr><th>Split horizon simples</th><th>Poisonous reverse</th></tr>
<tr><td>os nós <b>omitem</b> do vetor os destinos alcançados pelo enlace em que ele é enviado</td><td>os nós <b>incluem</b> esses destinos, mas com <b>distância infinita</b></td></tr>
</table>
<div class="dica">Limitação: o mecanismo evita loops de <b>dois saltos</b>, mas não todos. Por exemplo, se um vetor enviado por E chega a B mas não chega a C por erro de transmissão, só B atualiza a tabela e o loop pode se formar.</div>
`
},

"redes-a16": {
  resumo: "Camada de enlace: serviços do enlace, endereço MAC × IP, ARP (dentro da rede e entre redes), e os equipamentos hub, ponte e comutador, com tabela de comutação, autoaprendizagem e domínios de colisão.",
  html: `
<h3>1. O que a camada de enlace faz</h3>
<p>Transmite sobre o meio físico, <b>salto a salto</b>, os datagramas vindos da camada de rede. Define o <b>formato dos quadros</b> trocados entre nós adjacentes e o que cada nó faz ao enviar e receber. Um <b>enlace</b> é um canal entre nós adjacentes; o pacote desta camada é o <b>quadro</b>, que encapsula o datagrama. Os protocolos rodam em <b>todos os nós</b>, e cada enlace pode usar um protocolo diferente.</p>
<h4>Serviços possíveis</h4>
<ul>
<li><b>Enquadramento</b>: delimitar onde o quadro começa e termina, acrescentando cabeçalho e fim de quadro (<i>trailer</i>).</li>
<li><b>Entrega confiável</b> entre vizinhos: pouco usada em canais de baixa taxa de erro (fibra, alguns pares trançados) e necessária onde há muitos erros, como em <b>canais sem fio</b>.</li>
<li><b>Controle de fluxo</b>: ajustar a produção e o consumo de quadros.</li>
<li><b>Detecção de erros</b> (atenuação e ruído): o receptor descarta o quadro ou pede reenvio.</li>
<li><b>Correção de erros</b>: o receptor localiza e corrige <b>sem retransmissão</b>.</li>
<li>Transmissão <b>half-duplex ou full-duplex</b>.</li>
<li><b>Controle de acesso ao meio</b>.</li>
</ul>
<table>
<tr><th>Ponto-a-ponto</th><th>Difusão (broadcast)</th></tr>
<tr><td>uma estação em cada ponta (acesso domiciliar, enlace entre roteadores)</td><td>várias estações no mesmo canal: precisa de um protocolo para coordenar as transmissões (<b>MAC</b>, controle de acesso ao meio)</td></tr>
</table>
<p><b>Por que confiabilidade e controle de fluxo existem em duas camadas?</b> Porque atuam em escopos diferentes: o <b>transporte</b> é <b>fim-a-fim</b> (processo a processo) e o <b>enlace</b> é <b>salto-a-salto</b> (entre vizinhos). O enlace corrige localmente e mais rápido; o transporte garante a entrega correta para a aplicação mesmo que algum salto falhe.</p>
<p>A camada é implementada <b>no adaptador</b> (NIC: placa Ethernet, cartão 802.11…), que também implementa a camada física, conecta-se ao barramento do nó ou à placa-mãe e mistura hardware, software e firmware. Quem envia encapsula o datagrama e acrescenta bits de verificação; quem recebe verifica, extrai o datagrama e o entrega.</p>

<h3>2. Endereço MAC × endereço IP</h3>
<p>O <b>MAC</b> (também endereço LAN, físico ou Ethernet) leva o datagrama de uma interface a outra <b>ligada fisicamente na mesma rede</b>. Tem <b>48 bits</b> (12 dígitos hexadecimais, como <code>1A:2F:BB:76:09:AD</code>), fica gravado na ROM do adaptador (ou é configurado por software) e é <b>único</b> na LAN. O de <b>broadcast</b> é <code>FF:FF:FF:FF:FF:FF</code>. O IEEE gerencia a alocação: o fabricante compra uma faixa, o que garante a unicidade.</p>
<table>
<tr><th>MAC</th><th>IP</th></tr>
<tr><td>48 bits; estrutura <b>linear</b></td><td>32 bits; <b>hierárquico</b></td></tr>
<tr><td><b>portável</b>: dá para levar a placa de uma LAN para outra</td><td><b>não portátil</b>: depende da sub-rede em que o nó está</td></tr>
<tr><td>analogia: o número do <b>CPF</b></td><td>analogia: o <b>endereço postal</b> (CEP)</td></tr>
</table>

<h3>3. ARP: do IP ao MAC</h3>
<p>O <b>Address Resolution Protocol</b> (RFC 826) traduz IP em MAC na maioria das redes IEEE 802 e <b>só funciona dentro da sub-rede</b>. Cada nó tem uma <b>tabela ARP</b> com <b>(IP, MAC, TTL)</b>, construída automaticamente; o TTL típico é de <b>20 min</b>.</p>
<h4>Destino na mesma rede</h4>
<ol>
<li>A quer enviar a B, mas o MAC de B não está na sua tabela ARP.</li>
<li>A difunde uma <b>consulta ARP</b> com o IP de B, com MAC de destino <code>FF-FF-FF-FF-FF-FF</code>.</li>
<li>Todas as máquinas da LAN recebem.</li>
<li>B responde a A com seu MAC (<b>ARP Reply</b>), em quadro <b>unicast</b>.</li>
<li>A registra em sua tabela.</li>
</ol>
<div class="ex">Alguém grita na sala “quem é o fulano?” (broadcast). Só o fulano responde diretamente a você (unicast), e você anota o rosto dele na sua caderneta (tabela ARP), que será apagada depois de um tempo.</div>
<p>O ARP é <b>soft state</b> (a informação “vai embora” se não for renovada) e <b>plug-and-play</b> (os nós montam suas tabelas sem o administrador).</p>
<h4>Destino em outra rede (A → B, passando pelo roteador R)</h4>
<p>R tem <b>duas tabelas ARP</b>, uma para cada rede. A consulta sua tabela de roteamento, vê que o próximo salto é R, usa o ARP para obter o MAC de R e envia o quadro. R retira o datagrama, vê que é para B, consulta sua tabela de roteamento, obtém o MAC de B por ARP e envia um novo quadro.</p>
<table>
<tr><th>Trecho</th><th>IP de origem</th><th>IP de destino</th><th>MAC de destino</th></tr>
<tr><td>A → R</td><td>A</td><td>B</td><td><b>R</b></td></tr>
<tr><td>R → B</td><td>A</td><td>B</td><td><b>B</b></td></tr>
</table>
<div class="dica">Guarde: o <b>IP</b> de origem e destino <b>não muda</b> ao longo do caminho; o <b>MAC</b> muda a <b>cada salto</b>.</div>
<p>Ferramentas: <b>tcpdump</b> (mostra o tráfego ARP: <i>arp who-has … tell …</i> e <i>arp reply … is-at …</i>), <b>arp</b> (mostra a tabela ARP) e <b>arping</b> (o “ping da camada de enlace”).</p>

<h3>4. Hub, ponte e comutador</h3>
<table>
<tr><th>Equipamento</th><th>Camada</th><th>O que faz</th></tr>
<tr><td><b>Repetidor</b></td><td>física</td><td>poucas interfaces; recebe, <b>recupera a forma do sinal</b>, amplifica e retransmite os bits para todas as outras</td></tr>
<tr><td><b>Hub</b></td><td>física</td><td>um repetidor que repete os bits de uma porta para todas as outras; os segmentos formam <b>um único domínio de colisão</b>; em geral não liga segmentos de taxas diferentes</td></tr>
<tr><td><b>Ponte</b> (bridge)</td><td>enlace</td><td>poucas interfaces; usa o <b>MAC de destino</b> para encaminhar e filtrar; <b>cada segmento é um domínio de colisão separado</b>; liga taxas e redes diferentes</td></tr>
<tr><td><b>Comutador</b> (switch)</td><td>enlace</td><td>uma ponte de <b>alto desempenho e muitas interfaces</b>; hoje, em geral, <b>uma estação por domínio de colisão</b>; pode trabalhar em <b>full-duplex</b></td></tr>
</table>
<p><b>Domínio de colisão</b>: uma rede com CSMA/CD em que haverá colisão se duas estações transmitirem ao mesmo tempo. Considerando 8 estações:</p>
<table>
<tr><th>Equipamento</th><th>Domínios de colisão</th></tr>
<tr><td>Hub</td><td><b>1</b></td></tr>
<tr><td>Ponte (2 interfaces)</td><td><b>2</b></td></tr>
<tr><td>Comutador (8 interfaces)</td><td><b>8</b></td></tr>
</table>
<div class="ex">Hub: uma sala onde todos conversam ao mesmo tempo e só um consegue ser ouvido. Comutador: cada pessoa tem uma linha direta com o telefonista, e vários pares podem conversar ao mesmo tempo, sem colisão.</div>

<h3>5. Como a ponte e o comutador decidem</h3>
<p>Duas capacidades: <b>filtragem</b> (decidir se o quadro é repassado ou descartado) e <b>repasse</b> (decidir para quais interfaces ele vai). Usam a <b>tabela de comutação</b>, com 3 regras:</p>
<ol>
<li>Destino <b>na tabela</b> e em <b>outra</b> interface → transmite para essa interface.</li>
<li>Destino na tabela e na <b>mesma</b> interface de onde veio → <b>descarta</b>.</li>
<li>Destino <b>não está</b> na tabela → transmite por <b>todas as interfaces, exceto a de origem</b> (inundação).</li>
</ol>
<h4>Autoaprendizagem</h4>
<p>A tabela se monta sozinha: cada quadro que passa é examinado, e entram na tabela o <b>endereço de origem</b>, a <b>interface</b> de onde veio e o <b>horário</b>. Os registros <b>expiram</b>, pois uma estação pode mudar de lugar. Assim o comutador “aprende” onde está cada transmissor.</p>
<div class="ex">C envia um quadro para D. O comutador anota “C está na interface 1”. Como D ainda não está na tabela, ele encaminha para as outras interfaces (2 e 3) e D recebe. Quando D responde, o comutador anota “D está na interface 2” e, como C já está na tabela, envia o quadro <b>só pela interface 1</b>: transmissão seletiva.</div>
<p>Com o comutador, as estações têm conexão direta e dedicada a ele, que armazena quadros. Usa-se o Ethernet em cada enlace, mas <b>sem colisões</b>, pois cada enlace é um domínio de colisão em full-duplex. Assim, A→A’ e B→B’ acontecem <b>ao mesmo tempo</b>, o que não é possível com hubs.</p>
<h4>Comutadores × roteadores</h4>
<table>
<tr><th></th><th>Roteador</th><th>Comutador</th></tr>
<tr><td><b>Camada</b></td><td>rede</td><td>enlace</td></tr>
<tr><td><b>Tabela</b></td><td>de roteamento</td><td>de comutação</td></tr>
<tr><td><b>Algoritmos</b></td><td>de roteamento</td><td>de filtragem e de aprendizagem</td></tr>
</table>
`
}

/*__FIM__*/
};
