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
  resumo: "A camada de transporte: canal lógico entre processos, sockets, portas, multiplexação, o UDP (cabeçalho e checksum), os princípios da transferência confiável de dados (ACK, NAK, número de sequência, temporizador, pipelining) e a introdução ao TCP.",
  html: `
<h3>1. O que a camada de transporte faz</h3>
<p>Ela provê um <b>canal lógico de comunicação entre processos</b> em sistemas finais diferentes. Para a aplicação, é como se os sistemas finais estivessem <b>diretamente conectados</b>, mesmo havendo roteadores e enlaces no meio.</p>
<ul>
<li>Os protocolos de transporte rodam <b>só nos sistemas finais</b> (os roteadores no meio não os executam).</li>
<li><b>Transmissor</b>: converte as mensagens da aplicação em <b>segmentos</b> e os entrega à camada de rede.</li>
<li><b>Receptor</b>: recebe os segmentos da camada de rede, <b>remonta as mensagens</b> e as entrega à aplicação.</li>
</ul>
<p>Existem diferentes protocolos de transporte, com diferentes tipos de serviço, e a aplicação usa o mais adequado ao seu propósito. Na Internet são dois: o <b>UDP</b> (<i>User Datagram Protocol</i>) e o <b>TCP</b> (<i>Transmission Control Protocol</i>).</p>

<h3>2. Transporte x Rede</h3>
<table>
<tr><th>Camada de rede</th><th>Camada de transporte</th></tr>
<tr><td>canal lógico entre <b>estações</b> (sistemas finais)<br>serviço de <b>melhor esforço</b>: não garante a entrega, a ordem nem a integridade dos dados dos segmentos (<b>serviço não confiável</b>)</td><td>canal lógico entre <b>processos</b> que rodam nos sistemas finais<br><b>depende</b> dos serviços da camada de rede e pode <b>estendê-los</b></td></tr>
</table>
<div class="ex">Um prédio com vários moradores: a camada de rede entrega a correspondência no <b>endereço do prédio</b>; a camada de transporte faz chegar à <b>pessoa certa</b> dentro dele.</div>
<p><b>Serviços mínimos</b> que o transporte acrescenta: <b>multiplexação e demultiplexação</b> (entre processos) e <b>verificação de integridade</b> (campos de detecção de erros no cabeçalho).</p>
<table>
<tr><th>UDP</th><th>TCP</th></tr>
<tr><td>só os serviços mínimos<br>entrega <b>não confiável e não ordenada</b></td><td>mais que o mínimo<br>entrega <b>confiável e ordenada</b>, <b>estabelecimento de conexão</b>, <b>controle de congestionamento</b> e <b>controle de fluxo</b></td></tr>
</table>
<div class="dica">Nenhum dos dois garante requisitos de <b>atraso</b> nem de <b>banda passante</b>.</div>

<h3>3. Processos e sockets</h3>
<p>Um <b>processo</b> é um programa em execução em um sistema final. No <b>mesmo</b> sistema, dois processos se comunicam por comunicação interprocessos definida pelo SO; em sistemas <b>diferentes</b>, trocam <b>mensagens</b> pela rede. O processo <b>cliente</b> inicia a comunicação; o <b>servidor</b> espera ser contatado. Em aplicações P2P, os sistemas finais executam os dois.</p>
<p>O processo envia e recebe mensagens pelo seu <b>socket</b>: uma <b>interface de software entre as camadas de aplicação e de transporte</b>, uma API (<i>Application Programming Interface</i>).</p>
<div class="ex">O processo é uma <b>casa</b> e o socket é a <b>porta</b>. Para enviar, a mensagem é empurrada pela porta, confiando na infraestrutura de transporte do outro lado dela para levá-la ao destinatário. Para receber, a mensagem passa pela porta e o receptor age sobre ela.</div>
<ul>
<li>O desenvolvedor controla <b>tudo do lado da camada de aplicação</b> e, na camada de transporte, só a <b>escolha do protocolo</b> e <b>alguns parâmetros</b> (como buffers). O resto é controlado pelo SO.</li>
<li>A <b>Socket API</b> surgiu no Unix BSD 4.1, em <b>1981</b>. Os sockets são criados, usados e liberados explicitamente pelas aplicações, baseados no paradigma cliente-servidor.</li>
<li>Dois tipos de serviço pela API: <b>datagrama não confiável</b> (UDP) e <b>fluxo de bytes confiável</b> (TCP).</li>
</ul>

<h3>4. Endereçando processos</h3>
<p>Uma interface de rede tem um identificador único (o <b>endereço IP</b> de 32 bits). Mas o IP da estação <b>não basta</b> para identificar o processo, porque <b>vários processos</b> podem rodar na mesma estação. O identificador inclui o <b>IP</b> e o <b>número de porta</b> do processo.</p>
<p>Exemplos de portas: servidor HTTP <b>80</b>; servidor de e-mail <b>25</b>. Para mandar uma mensagem HTTP ao servidor www.ic.uff.br, o destino é o IP <b>200.20.15.38</b> e a porta <b>80</b>.</p>

<h3>5. Multiplexação e demultiplexação</h3>
<ul>
<li><b>Multiplexação</b> (no emissor): recebe as mensagens de vários sockets, agrupa as de um mesmo socket e <b>adiciona um cabeçalho</b>.</li>
<li><b>Demultiplexação</b> (no receptor): identifica a qual processo pertence o segmento e o <b>encaminha ao socket correto</b>, com base nos campos do cabeçalho (IPs de origem e destino, portas de origem e destino).</li>
</ul>
<table>
<tr><th>Com UDP (sem conexão)</th><th>Com TCP (orientado à conexão)</th></tr>
<tr><td>Identificado por <b>IP de destino</b> (para chegar à máquina) + <b>porta de destino</b>. O sistema final verifica a porta de destino e entrega ao socket com aquele número.<br>Um socket <b>pode</b> receber segmentos de diferentes IPs/portas de origem. Só as informações do destino são usadas; a origem serve de <b>endereço de retorno</b>.</td><td>Identificado pela <b>quádrupla</b>: IP de origem, porta de origem, IP de destino, porta de destino.<br>Um socket <b>não pode</b> receber de origens diferentes: cada segmento vai para <b>um único</b> socket.<br>Um servidor sustenta <b>muitos sockets TCP simultâneos</b>, cada um com a sua quádrupla. Servidores Web têm um socket por conexão de cliente; com HTTP não persistente, um socket diferente para cada pedido.</td></tr>
</table>

<h3>6. UDP (<i>User Datagram Protocol</i>)</h3>
<p>Definido na <b>RFC 768</b>, é o protocolo de transporte <b>mínimo</b>: serviço de melhor esforço, em que os segmentos podem ser <b>perdidos</b> ou entregues <b>fora de ordem</b>. É <b>sem conexão</b>: não há <i>setup</i> entre remetente e receptor, e cada segmento é tratado independentemente.</p>
<p><b>Por que existe</b>, se é tão simples?</p>
<ul>
<li>elimina o estabelecimento de conexão (<b>menor latência</b>);</li>
<li>é simples: <b>não mantém estado</b> de conexão nem no remetente nem no receptor;</li>
<li>o <b>cabeçalho é reduzido</b>;</li>
<li>não tem controle de congestionamento: transmite <b>tão rápido quanto desejado (e possível)</b>.</li>
</ul>
<p><b>Quem usa</b>: aplicações multimídia (tolerantes a perdas e sensíveis à taxa de transmissão) e protocolos como <b>NFS</b> (servidor de arquivos remoto), <b>SNMP</b> (gerenciamento de rede, para reduzir o tempo de reação a um problema), <b>RIP</b> (roteamento) e <b>DNS</b> (para reduzir a latência da requisição de páginas Web), todos tipicamente sobre UDP. Telefonia na Internet e distribuição multimídia usam TCP ou UDP.</p>
<p><b>Confiabilidade sobre UDP</b>? É preciso <b>acrescentá-la na camada de aplicação</b>: recuperação de erro específica de cada aplicação.</p>
<h4>Formato do segmento</h4>
<p>O cabeçalho tem <b>8 bytes</b>, em 4 campos de 16 bits:</p>
<table>
<tr><th>Campo</th><th>Função</th></tr>
<tr><td>porta de origem</td><td>identifica o processo emissor</td></tr>
<tr><td>porta de destino</td><td>identifica o processo receptor</td></tr>
<tr><td>comprimento</td><td>tamanho do segmento UDP em bytes, <b>incluindo o cabeçalho</b></td></tr>
<tr><td>soma de verificação (checksum)</td><td>detecta erros</td></tr>
</table>
<p>Depois vêm os dados (a mensagem da aplicação).</p>
<h4>Checksum</h4>
<p>Serve para detectar “erros” no segmento transmitido (por exemplo, bits trocados).</p>
<ul>
<li><b>Transmissor</b>: trata o conteúdo do segmento como uma sequência de inteiros de <b>16 bits</b>, com o campo checksum zerado. Soma tudo (adição em <b>complemento de 1</b>) e põe o <b>complemento do valor da soma</b> no campo checksum do cabeçalho.</li>
<li><b>Receptor</b>: calcula a soma do segmento recebido, incluindo o checksum enviado. Se der <b>FFFF</b>, nenhum erro foi detectado; se não, <b>erro detectado</b>. Mesmo assim ainda pode haver erros (o checksum nem sempre pega tudo).</li>
</ul>
<div class="dica">Na soma, o “vai um” do bit mais significativo <b>é somado de volta</b> ao resultado. Exemplo: 1110011001100110 + 1101010101010101 dá um bit a mais; esse bit volta para o fim e o resultado é 1011101110111100, cujo complemento (0100010001000011) é o checksum.</div>

<h3>7. Princípios da transferência confiável de dados</h3>
<p>É um tema importante nas camadas de transporte, enlace etc., e está na lista dos <b>10 tópicos mais importantes</b> em redes. A <b>complexidade do protocolo</b> depende das características do canal não confiável. Um <b>canal confiável</b> é aquele em que nenhum dado é <b>corrompido</b>, nenhum é <b>perdido</b> e todos chegam em <b>ordem</b>. O protocolo de transferência confiável (por exemplo, o TCP) implementa esse canal sobre um canal que não é.</p>
<p>As primitivas usadas na descrição: <code>rdt_send()</code> (chamada pela camada de cima, passa os dados para o receptor), <code>udt_send()</code> (envia pacotes pelo canal não confiável), <code>rdt_rcv()</code> (chamada quando um pacote chega ao receptor) e <code>deliver_data()</code> (entrega os dados à camada superior).</p>
<h4>Canal com erros de bits</h4>
<ol>
<li><b>Detectar</b> o erro: soma de verificação (checksum).</li>
<li><b>Recuperar</b>: o receptor avisa o transmissor. <b>ACK</b> = “recebi corretamente”; <b>NAK</b> = “o pacote veio com erros”, e o transmissor <b>reenvia</b> ao receber um NAK.</li>
</ol>
<p>Detecção de erros + <b>mecanismos automáticos de repetição de requisição (ARQ)</b> resolvem esse canal.</p>
<h4>E se o próprio ACK/NAK for corrompido?</h4>
<p>O transmissor não sabe o que se passou no receptor, e não pode apenas retransmitir, pois pode gerar <b>pacotes duplicados</b>. A solução:</p>
<ul>
<li>o transmissor põe um <b>número de sequência</b> em cada pacote;</li>
<li>retransmite o último pacote se o ACK/NAK chegar com erro;</li>
<li>o receptor <b>descarta os duplicados</b> (não os entrega à aplicação) e aguarda a resposta.</li>
</ul>
<p>Esse é o protocolo <b>para-e-espera</b> (<i>stop-and-wait</i>): envia um pacote e espera. <b>Dois números de sequência (0 e 1) bastam.</b> O transmissor verifica se o ACK/NAK está corrompido; o receptor verifica se o pacote é duplicado. O receptor <b>não tem como saber</b> se o seu último ACK/NAK foi bem recebido pelo transmissor.</p>
<p><b>Sem NAK</b>: dá para fazer o mesmo só com ACKs. Em vez de NAK, o receptor manda ACK do <b>último pacote recebido sem erro</b>, com o número de sequência explícito. <b>ACKs duplicados</b> no transmissor têm o mesmo efeito do NAK: retransmitir o pacote atual.</p>
<h4>Canal com erros e perdas</h4>
<p>O canal também pode <b>perder</b> pacotes (dados ou ACKs). Checksum, número de sequência, ACKs e retransmissões ajudam, mas <b>não bastam</b>. O transmissor espera um tempo “razoável” pelo ACK e <b>retransmite se nada chegar nesse intervalo</b>. Isso exige um <b>temporizador</b>. Se o pacote (ou o ACK) só estiver atrasado, a retransmissão será duplicada, mas o número de sequência já cuida disso; o receptor deve informar o número de sequência do pacote que está reconhecendo.</p>
<div class="ex">Você manda uma mensagem e espera a resposta “visto”. Passado um tempo sem resposta, manda de novo. Se a primeira só estava atrasada, o destinatário vê o número da mensagem (“mensagem 7”) e ignora a repetida.</div>

<h3>8. Desempenho e paralelismo (<i>pipelining</i>)</h3>
<p>O para-e-espera é confiável, mas tem <b>problema de desempenho</b>. A <b>função utilidade</b> mede a fração do tempo em que o emissor está realmente ocupado enviando bits.</p>
<div class="ex">Enlace de <b>1 Gb/s</b>, retardo de <b>15 ms</b>, pacote de <b>1 KB</b>: um pacote de 1 KB é enviado a cada <b>30 ms</b>, uma vazão de <b>33 kB/s</b> num enlace de 1 Gb/s. O protocolo <b>limita o uso dos recursos físicos</b>.</div>
<p>A solução é o <b>paralelismo (<i>pipelining</i>)</b>: o transmissor envia <b>vários pacotes em sequência</b>, todos aguardando reconhecimento. Isso exige:</p>
<ul>
<li>aumentar a <b>faixa de números de sequência</b>;</li>
<li><b>armazenamento</b> (buffer) no transmissor e/ou no receptor.</li>
</ul>
<p>No exemplo dos slides, enviar três pacotes antes de esperar aumenta a utilização <b>por um fator de 3</b>.</p>

<h3>9. Introdução ao TCP</h3>
<ul>
<li>É <b>muito mais complexo</b> que o UDP (RFCs 793, 1122, 1323, 2018 e 2581; o UDP só tem a 768).</li>
<li><b>Orientado à conexão</b>: antes de transmitir há um <b>handshake</b>, em que os dois processos trocam segmentos para definir parâmetros.</li>
<li>É uma <b>conexão lógica</b>, diferente da comutação de circuitos: <b>não há caminho definido nem reserva de recursos</b>. Ela “só existe” nos sistemas finais; os elementos intermediários <b>não guardam estado</b>.</li>
<li><b>Ponto a ponto</b>: um transmissor e um receptor.</li>
<li><b>Full duplex</b>: fluxo de dados bidirecional na mesma conexão. O <b>MSS</b> é o tamanho máximo de segmento.</li>
<li><b>Controle de fluxo</b>: o receptor não será “afogado” pelo transmissor.</li>
<li><b>Controle de congestionamento</b>: evita a saturação dos enlaces da rede.</li>
</ul>
<div class="dica">Resumo: UDP = rápido e simples, sem garantias. TCP = conexão, confiabilidade, ordem, controle de fluxo e de congestionamento. Os dois usam <b>portas</b> para entregar ao processo certo.</div>
`
},


"redes-a1114": {
  resumo: "A camada de rede: encaminhamento x roteamento, modelos de serviço e melhor esforço, datagramas x circuitos virtuais, como é um roteador por dentro, o cabeçalho IPv4 campo a campo e a fragmentação.",
  html: `
<h3>1. O que a camada de rede faz</h3>
<p>Ela é responsável por três coisas:</p>
<ul>
<li><b>determinar o melhor caminho</b> para os pacotes: função dos <b>protocolos de roteamento</b>;</li>
<li><b>encaminhar</b> os pacotes até o destino: função do <b>protocolo IP</b>;</li>
<li><b>interconectar redes de tecnologias diferentes</b>: também função do IP.</li>
</ul>
<p>Os protocolos da camada de rede rodam <b>nos sistemas finais e nos roteadores</b>. No lado transmissor, <b>encapsulam os segmentos em datagramas</b>; no lado receptor, entregam os segmentos à camada de transporte. Os <b>roteadores examinam os campos de cabeçalho de todos os datagramas IP</b> que passam por eles.</p>
<p><b>Transparência sintática</b>: os pacotes vão da origem ao destino <b>sem que a rede modifique os dados</b>; só erros de transmissão os alteram.</p>

<h3>2. Encaminhamento x roteamento</h3>
<table>
<tr><th>Encaminhamento</th><th>Roteamento</th></tr>
<tr><td>“<b>Mover</b>” um pacote de uma <b>entrada</b> do roteador para a <b>saída apropriada</b>. Usa a <b>tabela de encaminhamento</b>: o valor no cabeçalho do pacote que chega indica a interface de saída.</td><td><b>Determinar a rota</b> que os pacotes seguem da fonte ao destino. É função dos <b>protocolos de roteamento</b>, que <b>constroem a tabela de encaminhamento</b>.</td></tr>
</table>
<div class="ex">Encaminhar é o carteiro olhar o endereço e escolher a porta de saída. Rotear é quem desenhou antes o mapa de rotas dos carteiros.</div>
<table>
<tr><th>Comutadores</th><th>Roteadores</th></tr>
<tr><td>mais <b>rápidos</b>, <b>menor custo</b>, <b>sem endereçamento hierárquico</b></td><td>mais <b>lentos</b>, <b>maior custo</b>, com <b>endereçamento hierárquico</b>, que <b>reduz o número de entradas</b> na tabela e <b>acelera a busca</b></td></tr>
</table>

<h3>3. Modelos de serviço</h3>
<p>Definem as características do transporte de pacotes <b>fim a fim</b>:</p>
<ul>
<li><b>Para pacotes individuais</b>: entrega garantida (o pacote chega ao destino); entrega garantida com <b>atraso limitado</b> (por exemplo, menos de 100 ms).</li>
<li><b>Para fluxos de pacotes</b>: entrega <b>ordenada</b>; <b>largura de banda mínima</b> garantida; <b><i>jitter</i> máximo</b> garantido; <b>serviços de segurança</b> (com uma chave secreta de sessão, o transmissor poderia cifrar o conteúdo de todos os pacotes ao destinatário).</li>
</ul>
<p>Na Internet há <b>um só protocolo, o IP</b>, e <b>um só serviço: o melhor esforço</b>.</p>
<h4>Melhor esforço</h4>
<ul>
<li>Os roteadores <b>se esforçam ao máximo</b> para entregar os pacotes, <b>sem distinção</b>.</li>
<li>Nós <b>simples e baratos</b>, <b>sem estado na rede</b>; cada pacote é encaminhado de forma independente dos outros.</li>
<li><b>Sem</b> reserva de recursos, recuperação de erros nem garantia de acesso.</li>
<li>O atraso depende do <b>tamanho da fila</b>; <b>sem garantia de entrega</b>: o pacote é descartado se a fila estiver cheia.</li>
</ul>
<p>Outras arquiteturas (como o ATM, com serviços CBR, VBR, ABR e UBR) ofereciam garantias diferentes de taxa, perdas, ordem e tempo. <b>Intserv e Diffserv</b> são extensões do melhor esforço da Internet.</p>

<h3>4. Datagramas x circuitos virtuais</h3>
<p>Em uma rede de comutação de pacotes, o serviço da camada de rede pode ser <b>não orientado à conexão</b> (<b>redes de datagramas</b>) ou <b>orientado à conexão</b> (<b>redes de circuitos virtuais</b>). É análogo ao do transporte, mas entre roteadores/sistemas finais, <b>sem escolha</b> (a rede oferece um tipo ou outro) e implementado <b>no núcleo da rede</b>.</p>
<h4>Datagramas</h4>
<ul>
<li>Serviço <b>não confiável</b>, <b>sem estabelecimento prévio de conexão</b>; os roteadores <b>não guardam estado</b> sobre conexões.</li>
<li>O <b>endereço de destino</b> é colocado no cabeçalho de cada pacote, e os pacotes são encaminhados por ele, em melhor esforço.</li>
<li>Dois pacotes entre o mesmo par origem-destino <b>podem seguir caminhos diferentes</b>.</li>
</ul>
<p><b>Encaminhamento por maior prefixo</b>: o endereço IP tem 32 bits, ou seja, 2<sup>32</sup> (cerca de 4 bilhões) de endereços. Uma entrada na tabela para cada um seria inviável, então se faz <b>agregação de endereços</b>: cada entrada vale para uma faixa, identificada por um prefixo, e vale o <b>prefixo mais longo que casar</b>.</p>
<table>
<tr><th>Prefixo</th><th>Interface de saída</th></tr>
<tr><td>11001000.00010111.00010</td><td>0</td></tr>
<tr><td>11001000.00010111.00011000</td><td>1</td></tr>
<tr><td>11001000.00010111.00011</td><td>2</td></tr>
<tr><td>caso contrário</td><td>3</td></tr>
</table>
<div class="ex">Endereço de destino <b>11001000 00010111 00010110 10100001</b>: começa com 11001000.00010111.00010, então vai pela <b>interface 0</b>. Endereço <b>11001000 00010111 00011000 10101010</b>: casa com .00011 e também com o prefixo mais longo .00011000, então vai pela <b>interface 1</b>.</div>
<h4>Circuitos virtuais (CV)</h4>
<p>Emulam uma rede de comutação de circuitos: o caminho se comporta como um circuito telefônico em desempenho e nas ações da rede. Funcionamento:</p>
<ol>
<li><b>estabelecimento de uma chamada</b> antes do envio de dados;</li>
<li>definição de <b>um caminho</b> seguido por todos os pacotes;</li>
<li>cada pacote carrega a <b>identificação do CV</b> (e não endereços de origem e destino);</li>
<li>cada roteador do caminho <b>mantém estado</b> de cada conexão que o atravessa, e pode <b>alocar recursos</b> (banda, buffers) ao CV.</li>
</ol>
<p>Um CV consiste de: o <b>caminho</b>; <b>números de CV</b>, um por enlace ao longo do caminho (menor complexidade de gerenciamento); e <b>entradas nas tabelas de repasse</b> dos roteadores. O <b>número do CV é trocado a cada enlace</b>, e o novo número vem da tabela de encaminhamento.</p>
<div class="ex">Tabela do roteador R1: pacote que chega pela interface 1 com CV 12 sai pela interface 3 com CV 22; chega pela 2 com CV 63, sai pela 1 com CV 18; e assim por diante. Isso é “informação de estado da conexão”.</div>
<p><b>Protocolos de sinalização</b> estabelecem, mantêm e destroem um CV. São usados em <b>ATM, frame-relay e X.25</b> e <b>não são usados na Internet convencional</b>. A sequência: 1) a origem inicia a chamada; 2) chega a chamada ao destino; 3) a chamada é aceita; 4) a conexão é completada; 5) começa o fluxo de dados; 6) os dados são recebidos.</p>
<table>
<tr><th>Característica</th><th>Circuito virtual</th><th>Datagrama</th></tr>
<tr><td>Estabelecimento de conexão</td><td>necessário</td><td>não necessário</td></tr>
<tr><td>Endereçamento</td><td>identificador do CV</td><td>endereços de fonte e destino</td></tr>
<tr><td>Estado</td><td>por conexão</td><td>sem estado</td></tr>
<tr><td>Roteamento</td><td>rota escolhida na conexão e seguida depois</td><td>cada pacote é “independente”</td></tr>
<tr><td>Falha de roteadores</td><td>todos os circuitos que passam por ele são encerrados</td><td>perda de pacotes durante a falha</td></tr>
<tr><td>Qualidade de serviço</td><td>mais fácil</td><td>difícil</td></tr>
<tr><td>Controle de congestionamento</td><td>mais fácil</td><td>difícil</td></tr>
</table>

<h3>5. Dentro de um roteador</h3>
<p>O roteador determina o caminho entre origem e destino (ação distribuída), <b>encaminha</b> pacotes e <b>interconecta redes distintas</b>. A cada pacote que chega, o endereço de destino é analisado: se for <b>igual ao de uma das interfaces do roteador</b>, o pacote é <b>processado</b> ali; caso contrário, é <b>encaminhado</b> a outro roteador pela interface mais indicada.</p>
<h4>Portas de entrada</h4>
<ul>
<li>Camada física (recepção de bits) e camada de enlace (por exemplo, Ethernet).</li>
<li><b>Comutação descentralizada</b>: dado o destino do datagrama, procura a porta de saída na <b>tabela de rotas guardada na memória da porta de entrada</b>.</li>
<li>Meta: completar o processamento na “<b>velocidade da linha</b>”. Se os datagramas chegam mais rápido que a taxa de envio à matriz de comutação, formam-se <b>filas</b>.</li>
</ul>
<h4>Três técnicas de comutação</h4>
<table>
<tr><th>Técnica</th><th>Como é</th><th>Limite</th></tr>
<tr><td><b>Por memória</b></td><td>roteadores da primeira geração; o pacote é copiado pelo processador (único) do sistema</td><td>velocidade limitada pela <b>largura de banda da memória</b>; duas travessias do barramento por datagrama</td></tr>
<tr><td><b>Por barramento</b></td><td>o datagrama vai da memória da porta de entrada à da porta de saída por um <b>barramento compartilhado</b></td><td><b>disputa (contenção)</b> pelo barramento; taxa limitada pela largura de banda do barramento</td></tr>
<tr><td><b>Por crossbar</b></td><td>interconecta n portas de entrada a n de saída com <b>2n barramentos</b></td><td>reduz a disputa, que passa a ser “por porta de saída”</td></tr>
</table>
<h4>Portas de saída e filas</h4>
<ul>
<li>As <b>filas</b> são necessárias quando os datagramas chegam do elemento de comutação mais rápido que a taxa de transmissão. Um <b>escalonador de pacotes</b> escolhe qual datagrama enfileirado será transmitido.</li>
<li><b>Fila na saída</b>: usa buffers quando a taxa de chegada pelo comutador excede a de transmissão de saída. Gera <b>retardo</b> e <b>perdas por transbordo</b> do buffer de saída.</li>
<li><b>Fila na entrada</b>: se o elemento de comutação for mais lento que a soma das portas de entrada. Há o <b>bloqueio de cabeça de fila</b>: o datagrama na frente impede os outros da mesma fila de avançarem. Também gera retardo e perdas por transbordo.</li>
</ul>
<div class="ex">Caixa de supermercado: a fila anda na velocidade do caixa. O “bloqueio de cabeça de fila” é o cliente da frente com carrinho cheio travando quem só tem uma coisa na mão.</div>

<h3>6. IP (<i>Internet Protocol</i>)</h3>
<p>Definido na <b>RFC 791</b>. É responsável pelo <b>encaminhamento de pacotes</b> (<b>não</b> pelo roteamento!) e pelo <b>endereçamento e identificação</b> de estações e roteadores (a semântica do endereço fica “sobrecarregada”). Na transmissão de um pacote por redes diferentes, o <b>cabeçalho IP permanece (origem A, destino B)</b> enquanto o cabeçalho de enlace (por exemplo, Ethernet) muda a cada rede.</p>
<h3>7. Cabeçalho IPv4</h3>
<p>Todos os campos têm <b>tamanho fixo</b>, exceto o de <b>opções</b>.</p>
<table>
<tr><th>Campo</th><th>Tamanho</th><th>O que é</th></tr>
<tr><td><b>Versão</b></td><td>4 bits</td><td>a atual é <b>4</b>; versão 5 = protocolo ST-2; versão 6 = “a próxima geração”; existem também versões 7 e 8</td></tr>
<tr><td><b>IHL</b> (comprimento do cabeçalho)</td><td>4 bits</td><td>em palavras de 32 bits; vai de <b>5</b> (sem opções) a <b>15</b>, ou seja, no máximo <b>40 bytes de opções</b></td></tr>
<tr><td><b>Tipo de serviço</b></td><td>8 bits</td><td>define a precedência e o tipo de roteamento desejado (usado para QoS); veja abaixo</td></tr>
<tr><td><b>Comprimento total</b></td><td>16 bits</td><td>do pacote, <b>incluindo o cabeçalho</b>; limita o pacote a <b>65.535 bytes</b></td></tr>
<tr><td><b>Identification</b>, <b>Flags</b>, <b>Fragment offset</b></td><td>16, 3 e 13 bits</td><td>usados na fragmentação (seção 8)</td></tr>
<tr><td><b>TTL</b> (tempo de vida)</td><td>8 bits</td><td>tempo máximo de vida do pacote na rede; veja abaixo</td></tr>
<tr><td><b>Protocol</b></td><td>8 bits</td><td>o programa para o qual o pacote é passado no destino</td></tr>
<tr><td><b>Header checksum</b></td><td>16 bits</td><td>proteção do <b>cabeçalho</b> contra erros</td></tr>
<tr><td><b>Endereços de origem e de destino</b></td><td>32 bits cada</td><td>identificam a fonte e o destino do pacote</td></tr>
</table>
<h4>Tipo de serviço</h4>
<ul>
<li><b>Precedence</b> (3 bits): a <b>prioridade</b> do pacote nas filas; valor maior = maior prioridade. A RFC 791 diz que só vale <b>dentro de uma rede</b>, o que evita abuso por usuários mal-intencionados.</li>
<li><b>Type of Service</b> (5 bits): útil quando há <b>várias rotas</b>; indica a rota com o melhor <b>D</b> (<i>delay</i>), <b>T</b> (<i>throughput</i>), <b>R</b> (<i>reliability</i>) ou <b>C</b> (<i>cost</i>). <b>Nunca se usa mais de um</b> ao mesmo tempo: é combinação ilegal.</li>
</ul>
<h4>TTL (<i>Time to Live</i>)</h4>
<ul>
<li>É o tempo máximo de vida do pacote na rede, em segundos. Um dos objetivos era saber que, depois do TTL máximo, <b>nenhum outro pacote daquela comunicação</b> ainda estaria em trânsito, evitando misturar pacotes de fluxos diferentes.</li>
<li>A RFC 791 diz que o roteador deve <b>sempre decrementar</b> o TTL antes de retransmitir: de 1, se o tempo gasto na fila e na transmissão for menor que 1 segundo, ou do número de segundos estimado.</li>
<li>Na prática, estimar esse tempo é difícil e o enlace dificilmente passa de 1 s, então a <b>maioria dos roteadores decrementa 1</b> por salto. Segundo os slides, se o TTL atinge o valor 1, o pacote deve ser <b>descartado</b>: sinal de que trafegou mais tempo que o devido. <b>Valor padrão: 64</b>.</li>
</ul>
<h4>Protocol</h4>
<table>
<tr><th>Número</th><th>Protocolo</th><th>Número</th><th>Protocolo</th></tr>
<tr><td>0</td><td>reservado</td><td>17</td><td><b>UDP</b></td></tr>
<tr><td>1</td><td><b>ICMP</b></td><td>29</td><td>ISO-TP4</td></tr>
<tr><td>2</td><td>IGMP</td><td>80</td><td>ISO-IP (CLNP)</td></tr>
<tr><td>4</td><td>IP em IP (encapsulação)</td><td>89</td><td><b>OSPF</b></td></tr>
<tr><td>6</td><td><b>TCP</b></td><td>255</td><td>reservado</td></tr>
</table>
<h4>Header checksum</h4>
<ul>
<li>Calculado como o <b>complemento a 1 da soma, em complemento a 1, de todas as palavras de 16 bits</b> do cabeçalho (com os bits do checksum em 0 e incluindo as opções).</li>
<li>Compromisso: <b>não protege</b> contra inserção de palavras zeradas nem contra inversão de palavras, mas é <b>simples de implementar</b>.</li>
<li>É <b>calculado a cada salto</b>: se a verificação falha, o pacote é <b>descartado</b>; se passa, o checksum é <b>recalculado</b> (porque o TTL foi decrementado).</li>
</ul>

<h3>8. Fragmentação e remontagem</h3>
<p>A fragmentação é necessária quando um roteador conecta <b>duas tecnologias de rede diferentes</b>, cada uma com um <b>tamanho máximo de pacote</b>. Exemplo: rede com muita perda pede pacotes pequenos; rede com pouca perda aceita pacotes grandes. Cada tipo de enlace tem sua <b>MTU</b> (<i>maximum transmission unit</i>: o maior quadro possível naquele enlace).</p>
<p>Um datagrama IP grande demais é <b>dividido</b> (um datagrama vira vários) e só é <b>remontado no destino final</b>. Os bits do cabeçalho IP servem para identificar e ordenar os fragmentos.</p>
<table>
<tr><th>Campo</th><th>Função</th></tr>
<tr><td><b>Identification</b> (16 bits)</td><td>junto com o endereço de origem, diz a qual pacote o fragmento pertence</td></tr>
<tr><td><b>Fragment offset</b> (13 bits)</td><td>posição do fragmento no pacote, em <b>palavras de 8 bytes</b></td></tr>
<tr><td><b>Flags</b> (3 bits)</td><td>bit 0 reservado; bit 1 <b>DF</b> (<i>don’t fragment</i>: o pacote não pode ser fragmentado); bit 2 <b>MF</b> (<i>more fragments</i>: ainda há fragmentos a receber)</td></tr>
</table>
<p>Cada fragmento tem um <b>cabeçalho completo</b>, igual ao do pacote original, exceto os campos de <b>comprimento</b>, <b>offset</b> e o bit <b>MF</b>.</p>
<div class="ex">Datagrama de <b>4000 bytes</b> e <b>MTU = 1500 bytes</b>. Descontando 20 bytes de cabeçalho, são <b>3980 bytes de dados</b>. Cada fragmento leva no máximo 1500 − 20 = <b>1480 bytes de dados</b>: o primeiro com offset 0 (MF = 1), o segundo com offset 1480/8 = <b>185</b> (MF = 1) e o terceiro com offset 370 e os 1020 bytes restantes (MF = 0). <b>O bit MF é sempre 1, exceto no último fragmento.</b></div>
<ul>
<li>Em caso de <b>nova fragmentação</b>, MF e offset são calculados em relação ao pacote <b>original</b>.</li>
<li>A remontagem só no destino é mais um exemplo de <b>complexidade apenas nas bordas</b>. O receptor deve <b>expirar</b> pacotes parcialmente remontados após certo tempo de espera (por exemplo, decrementando o TTL a cada segundo).</li>
<li>A fragmentação é <b>ineficiente com o TCP</b>: perder um fragmento implica <b>retransmitir o pacote inteiro</b>. Além disso, a <b>memória dos roteadores</b> pode ser desperdiçada guardando fragmentos antes de retransmiti-los.</li>
</ul>
<h4>Como evitar a fragmentação</h4>
<p>O TCP tem um mecanismo de <b>descoberta da MTU do caminho</b>: tenta diferentes tamanhos de pacote com o campo <b>DF = 1</b> e adota como MTU o <b>maior tamanho entregue</b>.</p>
<div class="dica">Roteamento = descobrir caminhos (tabela). Encaminhamento = usar a tabela, pacote a pacote. IP encaminha e endereça, mas <b>não roteia</b>; o roteamento é feito por outros protocolos.</div>
`
},


"redes-a15": {
  resumo: "Por que existe roteamento, o grafo de custos, os sistemas autônomos e os dois níveis de roteamento, o algoritmo de vetores de distância (Bellman-Ford) e seus problemas: bouncing effect, contagem até o infinito, split horizon.",
  html: `
<h3>1. Para que serve o roteamento</h3>
<p>Lembrando: a camada de rede determina o melhor caminho (<b>protocolos de roteamento</b>), encaminha os pacotes (<b>IP</b>) e interconecta redes diferentes (<b>IP</b>). O <b>protocolo de roteamento é quem constrói a tabela de encaminhamento</b>; o roteador usa o valor no cabeçalho do pacote para consultar essa tabela e escolher a interface de saída.</p>
<p>Uma rede conectada já basta para dois nós se comunicarem? Sim, por <b>inundação</b>: todos os nós enviam mensagens a todos os vizinhos até o destino ser alcançado. Mas isso <b>não é eficiente nem escalável</b>. O roteamento encaminha os dados ao destino <b>de maneira eficiente</b>: os protocolos encontram o caminho <b>ótimo (ou quase ótimo)</b>.</p>
<div class="ex">Procurar uma pessoa gritando o nome dela em todas as ruas da cidade (inundação) funciona, mas é um desperdício. Roteamento é perguntar o caminho certo.</div>

<h3>2. Algoritmos de roteamento</h3>
<p>Objetivo: descobrir o <b>caminho mais curto</b> (<i>shortest path</i>, SP) entre qualquer par de nós. Cada entrada da <b>tabela de roteamento</b> tem: o <b>destino</b> da rota, o <b>próximo salto</b> e a <b>métrica/custo</b>. Há duas famílias:</p>
<table>
<tr><th>Família</th><th>Algoritmo</th></tr>
<tr><td><b>Vetores de distância</b> (<i>Distance Vector</i>, DV)</td><td>Bellman-Ford</td></tr>
<tr><td><b>Estado do enlace</b> (<i>Link State</i>, LS)</td><td>Dijkstra</td></tr>
</table>
<p>Nesta aula, o foco é o <b>DV</b>.</p>
<h4>Abstração com grafos</h4>
<p>A rede vira um <b>grafo G = (N, E)</b>: N é o conjunto de roteadores (no exemplo: u, v, w, x, y, z) e E é o conjunto de enlaces, como (u,v), (u,x), (u,w), (v,x), (v,w), (x,w), (x,y), (w,y), (w,z), (y,z). Cada enlace tem um <b>custo</b> c(x, x′) (por exemplo, c(w,z) = 5). O custo pode ser 1, ou inversamente relacionado à banda. O <b>custo de um caminho</b> é a <b>soma</b> dos custos de seus enlaces: c(x<sub>1</sub>,x<sub>2</sub>) + c(x<sub>2</sub>,x<sub>3</sub>) + … + c(x<sub>p−1</sub>,x<sub>p</sub>).</p>

<h3>3. Sistemas autônomos</h3>
<p>Até aqui se supôs uma rede <b>homogênea</b>: todos os roteadores têm a mesma função e rodam os mesmos algoritmos. Isso é escalável? É gerenciável? <b>Não.</b></p>
<p>Em 1980, a Internet era a Arpanet mais enlaces de satélite (Satnet): <b>uma única rede</b>, rodando o GGP. Ela cresceu rapidamente, e surgiram problemas:</p>
<ul>
<li>mais complexidade de gerenciamento e administração;</li>
<li>atualizações de topologia mais frequentes;</li>
<li>diferentes implementações do GGP, o que dificultava implantar novas versões.</li>
</ul>
<p>É um <b>problema de escala</b>: é impossível guardar todos os destinos na tabela de rotas, e trocar tabelas de rotas <b>sobrecarrega os enlaces</b>. A solução foi dividir a Internet em <b>Sistemas Autônomos</b> (<b>AS</b>, <i>Autonomous System</i>). A Internet passou a ser um conjunto de ASes: uma “rede de redes”.</p>
<ul>
<li>Um AS é um <b>conjunto de roteadores e redes sob a mesma administração</b>.</li>
<li>Não há limites rígidos: pode ser <b>1 roteador</b> ligado à Internet, uma <b>rede corporativa</b> que une várias LANs por um backbone, ou o <b>conjunto de clientes de um ISP</b>.</li>
<li>Cada AS tem um <b>número de AS de 16 bits</b>, escrito em decimal e atribuído pelas autoridades de numeração da Internet (ICANN etc.).</li>
</ul>
<h4>Dois níveis de roteamento</h4>
<p>Dividir em ASes dá a cada rede um número menor de roteadores para administrar, <b>mas a conectividade global precisa continuar</b>: as entradas de roteamento de cada AS devem cobrir todos os destinos da Internet.</p>
<table>
<tr><th></th><th>Intradomínio</th><th>Interdomínio</th></tr>
<tr><td><b>Onde</b></td><td><b>dentro</b> de um AS</td><td><b>entre</b> ASes</td></tr>
<tr><td><b>Protocolo</b></td><td><b>IGP</b> (<i>Interior Gateway Protocol</i>): RIP, OSPF, IGRP, IS-IS…</td><td><b>EGP</b> (<i>Exterior Gateway Protocol</i>): GGP, EGP, BGP…</td></tr>
<tr><td><b>Objetivo</b></td><td><b>desempenho</b></td><td><b>política</b></td></tr>
</table>
<div class="dica">Dentro de casa, escolhe-se o caminho mais curto (desempenho). Entre empresas diferentes, as regras de quem passa por onde contam mais (política).</div>

<h3>4. Vetores de distância e a equação de Bellman-Ford</h3>
<p>Seja d<sub>x</sub>(y) o <b>custo do caminho de menor custo</b> entre x e y. A equação de Bellman-Ford diz:</p>
<p><b>d<sub>x</sub>(y) = min<sub>v</sub> { c(x,v) + d<sub>v</sub>(y) }</b>, onde o mínimo é tomado entre <b>todos os vizinhos v</b> de x.</p>
<div class="ex">No grafo dos slides, sabe-se que d<sub>v</sub>(z) = 5, d<sub>x</sub>(z) = 3 e d<sub>w</sub>(z) = 3. Então d<sub>u</sub>(z) = min { c(u,v) + d<sub>v</sub>(z), c(u,x) + d<sub>x</sub>(z), c(u,w) + d<sub>w</sub>(z) } = min { 2 + 5, 1 + 3, 5 + 3 } = <b>4</b>. O vizinho que leva ao custo mínimo (x) é o <b>próximo salto</b> no caminho mais curto, e vai para a tabela de encaminhamento.</div>
<h4>O algoritmo</h4>
<ul>
<li>D<sub>x</sub>(y) = <b>estimativa</b> do menor custo entre x e y.</li>
<li>O nó x sabe o custo para cada vizinho, c(x,v), e mantém seu <b>vetor de distâncias</b> D<sub>x</sub> = [D<sub>x</sub>(y) para todo y em N], além dos vetores de seus vizinhos.</li>
<li>Cada nó <b>envia periodicamente</b> seu vetor de distâncias estimadas aos vizinhos.</li>
<li>Quando x recebe um novo vetor de um vizinho, <b>atualiza o seu</b>: D<sub>x</sub>(y) ← min<sub>v</sub> { c(x,v) + D<sub>v</sub>(y) } para cada y em N.</li>
<li>Em condições mínimas, naturais, a estimativa D<sub>x</sub>(y) <b>converge</b> para o menor custo real d<sub>x</sub>(y).</li>
</ul>
<p>Características:</p>
<ul>
<li><b>Iterativo e assíncrono</b>: cada iteração local é causada por uma mudança no custo de um enlace local ou por uma mensagem de um vizinho (mudança no caminho de menor custo para algum destino). O nó espera uma dessas mudanças, <b>recalcula</b> sua tabela de distâncias e avisa os vizinhos se for necessário.</li>
<li><b>Distribuído</b>: cada nó avisa seus vizinhos <b>só quando muda</b> seu caminho de menor custo para algum destino; os vizinhos avisam os deles, se mudou.</li>
<li>Complexidade <b>O(nm)</b>, com n nós e m arestas.</li>
</ul>
<div class="ex">Exemplo dos slides, com todos os enlaces de custo 1. No começo cada roteador só conhece a si mesmo (distância 0). O roteador A envia o vetor (A = 0); quem recebe soma 1 (o custo do enlace) e anota A = 1 como uma entrada nova. Depois B e D enviam os deles, e outros roteadores atualizam. Em algumas rodadas os vetores trocados <b>não mudam mais nenhuma tabela</b>: o algoritmo <b>convergiu</b>.</div>
<h4>Falha de um enlace</h4>
<p>Se o enlace 1 falha, os dois roteadores nas pontas detectam e atualizam as tabelas: todos os nós alcançáveis por aquele enlace passam a estar a <b>distância infinita</b>. Eles enviam os novos vetores (por exemplo, B = inf), os vizinhos recalculam (só as rotas que dependiam do enlace mudam; D, por exemplo, passa a usar o enlace 3 para chegar a B) e o processo se repete até <b>convergir de novo</b>.</p>

<h3>5. Problemas do vetor de distâncias</h3>
<h4>Bouncing effect (efeito de ricochete)</h4>
<p>Todos os enlaces custam 1, exceto o enlace 5, que custa 10. O enlace 2 falha:</p>
<ol>
<li>B atualiza imediatamente a sua tabela (C fica inalcançável);</li>
<li>só que A ainda tem uma rota para C <b>passando por B</b> e envia o seu vetor com C = 3;</li>
<li>para B, 3 é menor que infinito, então B adota a rota: C = 4, <b>apontando para A</b>;</li>
<li>A recebe o vetor de B pelo mesmo enlace que usa para C e atualiza também. Forma-se um <b>loop de roteamento</b>: B aponta para A, que aponta para B.</li>
</ol>
<p>A cada rodada, os nós aumentam a métrica da rota para C em 2. Só quando a rota alternativa (pelo enlace 5, de custo 10) passa a ser melhor, o vetor vindo de C tem efeito em E (C = 11 &lt; 12) e o algoritmo converge. Resultado: <b>convergência lenta</b>.</p>
<h4>Contagem até o infinito</h4>
<p>O enlace 1 já falhou e a rede convergiu. Então o enlace 6 também falha, <b>separando a rede em duas</b>. Se D envia o seu vetor antes de A, tudo converge (A percebe que só D é alcançável). Mas se A envia primeiro, D atualiza a sua tabela e passa a achar que chega aos outros nós <b>por A</b>: forma-se um <b>loop entre A e D</b>. O processo se repete como no bouncing effect, mas como B, C e E estão <b>isolados</b> de A e D, a contagem continua <b>até o infinito</b>.</p>

<h3>6. Melhorias no algoritmo</h3>
<p>O bouncing effect e a contagem até o infinito <b>aumentam o tempo de convergência</b>. Duas melhorias: <b>split horizon</b> e <b>triggered updates</b>.</p>
<h4>Split horizon (horizonte dividido)</h4>
<p>Ideia: se A usa B para chegar a X, <b>não faz sentido B usar A</b> para chegar a X. Portanto, A <b>não deve anunciar a B uma rota para X</b>. Cada nó envia <b>vetores diferentes conforme o enlace de saída</b>: rotas que usam o enlace E como saída não são anunciadas no vetor enviado por E.</p>
<table>
<tr><th>Versão simples</th><th>Com <i>poisonous reverse</i> (retorno envenenado)</th></tr>
<tr><td>Os nós <b>omitem</b> do vetor os destinos alcançados pelo enlace no qual o vetor é enviado.</td><td>Os nós <b>incluem</b> esses destinos, mas com <b>distância infinita</b>.</td></tr>
</table>
<p>No exemplo da contagem até o infinito, com split horizon isso não acontece: A envia a D um vetor só com A = 0. O mecanismo <b>evita loops de dois saltos</b>, mas <b>não evita loops em certos cenários</b> (como o “contagem até o infinito (2)”, em que um vetor com D = inf chega a B mas se perde antes de chegar a C, por um erro de transmissão, e só B atualiza a sua tabela).</p>
<h4>Triggered updates (atualizações disparadas)</h4>
<p>Os slides só listam esta melhoria. A ideia usual é enviar o vetor <b>assim que uma rota muda</b>, sem esperar o próximo envio periódico, para espalhar a má notícia mais rápido.</p>
<div class="dica">DV: cada nó conta aos vizinhos o que sabe e confia no que eles contam (“boato de vizinho”). Funciona, mas pode criar loops e contagem até o infinito. Split horizon corta boa parte dos casos.</div>
`
},


"redes-a16": {
  resumo: "A camada de enlace: serviços salto a salto, quadros, endereços MAC, ARP e os elementos de interconexão (repetidor, hub, ponte, comutador) comparados com o roteador.",
  html: `
<h3>1. Rede x enlace</h3>
<p>Um caminho entre origem e destino é composto por <b>um ou mais enlaces</b> (<i>links</i>). A camada de rede decide o caminho (roteamento) e encaminha os pacotes (IP). Mas <b>como os dados são transmitidos em cada enlace</b>? É a camada de <b>enlace</b>.</p>
<ul>
<li>Os protocolos de enlace rodam em <b>todos os nós</b>, e <b>cada enlace pode ter um protocolo diferente</b>.</li>
<li>O serviço é <b>salto a salto</b>: transmitir pelo meio físico os datagramas vindos da camada de rede entre <b>nós adjacentes</b>.</li>
<li>Eles definem o <b>formato dos quadros</b> trocados entre os nós adjacentes e as <b>ações de cada nó</b> ao enviar e receber um quadro.</li>
<li>Um enlace é um canal de comunicação entre nós adjacentes. O pacote da camada 2 é o <b>quadro</b> (<i>frame</i>), que <b>encapsula o datagrama</b>.</li>
</ul>
<div class="ex">Pelo caminho A → roteador → B, o <b>cabeçalho IP</b> (A → B) continua o mesmo do começo ao fim, enquanto o <b>cabeçalho Ethernet</b> muda a cada enlace: em um quadro vai de A até o roteador; em outro, do roteador até B. É como a viagem de uma encomenda: a etiqueta final é a mesma, mas cada trecho tem sua nota de transporte.</div>

<h3>2. Serviços da camada de enlace</h3>
<p>Existe um <b>serviço básico</b> (levar o datagrama pelo enlace) e os protocolos podem oferecer outros:</p>
<table>
<tr><th>Serviço</th><th>O que é</th></tr>
<tr><td><b>Enquadramento</b> (<i>framing</i>)</td><td>delimitar onde o quadro começa e termina; <b>encapsular</b> o datagrama em um quadro com <b>cabeçalho e fim de quadro</b> (<i>trailer</i>)</td></tr>
<tr><td><b>Entrega confiável</b> entre nós adjacentes</td><td>parecida com a do transporte; <b>pouco usada em canais com baixa taxa de erros</b> (fibra óptica, alguns pares trançados) e <b>necessária em canais com muitos erros</b> (sem fio)</td></tr>
<tr><td><b>Controle de fluxo</b></td><td>compatibilizar as taxas de produção e consumo de quadros entre remetente e receptor</td></tr>
<tr><td><b>Detecção de erros</b></td><td>os erros vêm da <b>atenuação do sinal</b> e de <b>ruído</b>; o receptor detecta e sinaliza ao remetente para retransmitir, ou simplesmente <b>descarta</b> o quadro com erro</td></tr>
<tr><td><b>Correção de erros</b></td><td>o receptor <b>localiza e corrige</b> os erros <b>sem precisar de retransmissão</b></td></tr>
<tr><td><b>Half-duplex e full-duplex</b></td><td>no half-duplex o nó <b>não pode transmitir e receber ao mesmo tempo</b></td></tr>
<tr><td><b>Controle de acesso ao meio</b></td><td>necessário se o meio é compartilhado; usa os <b>endereços físicos (MAC)</b> nos cabeçalhos para identificar origem e destino dos quadros em enlaces multiponto</td></tr>
</table>
<p>Há dois tipos de canal:</p>
<ul>
<li><b>Ponto a ponto</b>: uma estação em cada extremidade (redes de acesso domiciliares, entre roteadores);</li>
<li><b>Difusão (<i>broadcast</i>)</b>: várias estações no mesmo canal, o que exige um <b>protocolo de controle de acesso ao meio</b> para coordenar as transmissões.</li>
</ul>
<h4>Por que confiabilidade e controle de fluxo nas duas camadas?</h4>
<p>Porque o <b>transporte</b> trabalha <b>fim a fim</b> e o <b>enlace</b> trabalha <b>salto a salto</b>.</p>

<h3>3. Onde a camada de enlace roda</h3>
<ul>
<li>É implementada em cada nó da rede, e cada um pode usar uma tecnologia diferente.</li>
<li>Fica no <b>adaptador</b> (NIC, <i>Network Interface Card</i>): placa Ethernet, cartão PCMCIA, cartão 802.11. O adaptador <b>também implementa a camada física</b>.</li>
<li>Liga-se ao barramento do sistema do nó (por exemplo, PCI) ou vem integrado à placa-mãe. É uma combinação de <b>hardware, software e firmware</b>.</li>
</ul>
<p><b>Comunicação entre adaptadores</b>: o lado transmissor <b>encapsula o datagrama em um quadro</b> e acrescenta bits de verificação de erro, transferência confiável, controle de fluxo etc.; o lado receptor <b>verifica erros</b>, <b>extrai o datagrama</b> e o passa ao nó receptor.</p>

<h3>4. Endereços MAC</h3>
<table>
<tr><th>Endereço IP</th><th>Endereço MAC (LAN, físico ou Ethernet)</th></tr>
<tr><td>32 bits; <b>camada de rede</b>; leva o datagrama até a <b>sub-rede IP de destino</b>; <b>hierárquico</b></td><td>normalmente 48 bits; leva o datagrama de uma interface até <b>outra interface fisicamente conectada</b> (na mesma rede); estrutura <b>linear</b></td></tr>
</table>
<ul>
<li>Representado por <b>12 dígitos hexadecimais</b> agrupados dois a dois, como <b>1A:2F:BB:76:09:AD</b>. Fica gravado na ROM do adaptador ou é configurado por software.</li>
<li>Cada adaptador da LAN tem um MAC <b>único</b>. O <b>endereço de broadcast</b> é <b>FF-FF-FF-FF-FF-FF</b>.</li>
<li>A alocação é gerenciada pelo <b>IEEE</b>: cada fabricante compra uma parte do espaço de endereços, o que garante a unicidade.</li>
<li><b>Portabilidade</b>: o MAC permite mover uma placa de uma LAN para outra. O IP hierárquico <b>não é portátil</b>: depende da sub-rede à qual o nó está ligado (exige, por exemplo, IP móvel).</li>
</ul>
<div class="ex">O MAC é como o <b>CPF</b>: acompanha você para qualquer lugar. O IP é como o <b>endereço postal (CEP)</b>: depende de onde você mora.</div>

<h3>5. ARP (<i>Address Resolution Protocol</i>)</h3>
<p>Descrito na <b>RFC 826</b>. Faz a tradução de <b>endereços IP para MAC</b> na maioria das redes IEEE 802 e é executado <b>dentro da sub-rede</b>. Cada nó (estação ou roteador) tem uma <b>tabela ARP</b> com <b>(endereço IP, endereço MAC, TTL)</b>. O TTL diz quando o mapeamento será esquecido (valor típico: <b>20 min</b>). A tabela é construída <b>automaticamente</b>.</p>
<h4>Na mesma rede</h4>
<ol>
<li>A quer enviar um datagrama a B e consulta a sua tabela ARP; se o MAC de B não estiver lá:</li>
<li>A <b>difunde (broadcast)</b> um pacote de <b>solicitação ARP</b> (<i>ARP Query</i>) com o IP de B, com MAC de destino FF-FF-FF-FF-FF-FF. <b>Todas as máquinas da LAN</b> recebem;</li>
<li>B reconhece o seu IP e <b>responde diretamente a A</b> (<i>ARP Reply</i>) com o seu MAC, em um quadro <b>unicast</b>;</li>
<li>A registra o par IP-MAC na tabela.</li>
</ol>
<ul>
<li>A informação é <b>“soft state”</b>: <b>expira</b> a menos que seja renovada.</li>
<li>Um nó pode responder a uma requisição com um MAC que conhece, <b>não necessariamente o do destino</b>.</li>
<li>O ARP é <b>plug-and-play</b>: os nós criam suas tabelas sem intervenção do administrador.</li>
</ul>
<h4>Entre redes diferentes (A → R → B)</h4>
<p>O roteador R tem <b>duas tabelas ARP</b>, uma para cada rede local.</p>
<ol>
<li>A cria o datagrama com IP de origem A e destino B.</li>
<li>A consulta a tabela de roteamento e obtém <b>R como próximo salto</b>.</li>
<li>A usa o ARP para obter o <b>MAC de R</b>.</li>
<li>A cria um quadro com MAC de destino = R e o datagrama A → B na carga útil, e o adaptador envia.</li>
<li>O adaptador de R recebe o quadro; R <b>remove o datagrama</b> do quadro Ethernet e vê que é destinado a B.</li>
<li>R consulta a tabela de roteamento e usa o ARP para obter o <b>MAC de B</b>.</li>
<li>R cria um quadro com o datagrama A → B e o adaptador de R o envia a B, que o recebe.</li>
</ol>
<p><b>Ferramentas</b>: o <b>tcpdump</b> mostra as mensagens (por exemplo, <i>arp who-has 192.168.99.254 tell 192.168.99.35</i> e a resposta <i>arp reply … is-at …</i>); o <b>arp</b> mostra a tabela ARP da estação; o <b>arping</b> é o “ping” da camada de enlace.</p>

<h3>6. Elementos de interconexão</h3>
<table>
<tr><th>Elemento</th><th>Nível</th><th>Como funciona</th></tr>
<tr><td><b>Repetidor</b></td><td>físico</td><td>poucas interfaces; <b>recebe, conforma</b> (recupera a forma do sinal original), <b>amplifica</b> e retransmite os bits de uma interface para todas as outras</td></tr>
<tr><td><b>Hub</b></td><td>físico</td><td>é um repetidor: repete os bits de uma porta para <b>todas as outras</b>. Os segmentos formam <b>um único domínio de colisão</b> (uma rede com CSMA/CD onde há colisão se duas estações transmitem ao mesmo tempo). Em geral <b>não conecta</b> segmentos com taxas diferentes.</td></tr>
<tr><td><b>Ponte (bridge)</b></td><td>enlace</td><td>poucas interfaces; usa o <b>MAC de destino</b> para <b>encaminhar e filtrar</b> quadros; <b>cada segmento é um domínio de colisão separado</b>; conecta segmentos de <b>taxas diferentes</b> e de <b>tipos diferentes</b></td></tr>
<tr><td><b>Comutador (switch)</b></td><td>enlace</td><td>ponte de <b>alto desempenho</b> e <b>mais interfaces</b>; hoje a maioria é usada em <b>acesso dedicado</b> (uma estação por domínio de colisão); usa o MAC de destino para encaminhar e filtrar; <b>full-duplex</b>; o quadro sai sempre pela mesma saída, decidida uma vez por todas</td></tr>
</table>
<p>No exemplo da figura de Tanenbaum: o hub forma <b>1 domínio de colisão</b>, a ponte, <b>2</b>, e o comutador, <b>8</b> (um por enlace).</p>
<h4>Ponte: filtragem, repasse e autoaprendizagem</h4>
<ul>
<li><b>Filtragem</b>: decidir se um quadro será repassado a alguma interface ou descartado.</li>
<li><b>Repasse</b>: determinar as interfaces para as quais o quadro deve ir e fazê-lo.</li>
</ul>
<p>Usa uma <b>tabela de comutação</b>:</p>
<ul>
<li>destino na tabela e <b>em outra interface</b>: transmite para a interface correspondente;</li>
<li>destino na tabela e <b>na mesma interface de onde veio</b>: <b>descarta</b>;</li>
<li>destino <b>fora da tabela</b>: transmite em <b>todas as interfaces, exceto aquela de onde veio</b> (inundação).</li>
</ul>
<p>A tabela é construída <b>automaticamente</b> (autoaprendizagem): cada quadro que passa é examinado e a ponte registra o <b>endereço de origem</b>, a <b>interface</b> por onde veio e o <b>tempo</b> do registro. Os registros <b>expiram</b> (afinal, uma estação pode mudar de lugar).</p>
<h4>Comutador: várias transmissões ao mesmo tempo</h4>
<p>As estações têm <b>conexão direta e dedicada</b> ao comutador, que armazena os quadros. Como o enlace é full-duplex e cada enlace é seu próprio domínio de colisão, <b>não há colisões</b> (o Ethernet é usado em cada enlace de entrada). Em um comutador de seis interfaces, A → A′ e B → B′ podem ocorrer <b>simultaneamente</b>; com hubs isso não é possível.</p>
<p><b>Tabela de comutação</b>: cada entrada tem <b>(endereço MAC da estação, interface para alcançá-la, carimbo de tempo)</b>. Parece uma tabela de roteamento, mas é construída por autoaprendizagem e <b>não por um protocolo de roteamento</b>: quando um quadro chega, o comutador “aprende” a localização do transmissor e registra o par transmissor/local (por exemplo, A está na interface 1, TTL 60). A tabela começa <b>vazia</b>.</p>
<p><b>Algoritmo ao receber um quadro</b>:</p>
<ol>
<li>registra o enlace associado à estação transmissora;</li>
<li>consulta a tabela com o MAC de destino;</li>
<li>se achou entrada: se o destino está <b>no segmento de onde veio o quadro</b>, descarta; senão, <b>repassa</b> na interface indicada;</li>
<li>se não achou: usa <b>inundação</b> (todas as interfaces, menos a de chegada).</li>
</ol>
<div class="ex">Três hubs ligados a um comutador. <b>C</b> manda um quadro para <b>D</b>: o comutador anota “C está na interface 1”; como D não está na tabela, <b>inunda</b> as interfaces 2 e 3; D recebe. Depois <b>D</b> responde a C: o comutador anota “D está na interface 2”; como C já está na tabela, encaminha o quadro <b>só pela interface 1</b>.</div>

<h3>7. Comutadores x roteadores</h3>
<p>Ambos são dispositivos <b>armazena-e-repassa</b>. A diferença está na camada:</p>
<table>
<tr><th>Roteador</th><th>Comutador</th></tr>
<tr><td>dispositivo da <b>camada de rede</b>; examina os cabeçalhos dessa camada; <b>mantém tabelas de roteamento</b> e implementa <b>algoritmos de roteamento</b>; escolhe a melhor saída no momento da decisão, pelo endereço do destinatário</td><td>dispositivo da <b>camada de enlace</b>; <b>mantém tabelas de comutação</b> e implementa <b>filtragem</b> e <b>algoritmos de aprendizagem</b></td></tr>
</table>
<div class="dica">Hub repete tudo para todo mundo. Ponte e comutador olham o MAC e aprendem onde cada estação está. Roteador olha o IP. Mnemônico das camadas: repetidor/hub = física; ponte/comutador = enlace; roteador = rede.</div>
`
},


/*__FIM__*/
};
