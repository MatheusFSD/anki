/* Redes — resumos das aulas, em linguagem simples (aba "Resumos").
   A chave é o id da aula em data-redes.js. Mesmo formato de resumos-gpms.js.
   Escritos a partir dos cartões de cada aula (que vieram dos slides). */
const RESUMOS_REDES = {

"redes-a123": {
  resumo: "O que é um protocolo, por que a rede é dividida em camadas, os modelos OSI e TCP/IP, o encapsulamento, os tipos de rede (PAN, LAN, MAN, WAN), as topologias, os componentes da Internet e como ela nasceu.",
  html: `
<h3>1. Protocolo: a “língua” combinada</h3>
<p>Para duas entidades se comunicarem e se entenderem, precisam de duas coisas: um <b>canal</b> entre elas e uma <b>linguagem comum</b>. Essa linguagem é o <b>protocolo de comunicação</b>: um conjunto de regras e procedimentos que define:</p>
<ul>
<li>o <b>formato e a ordem</b> das mensagens trocadas;</li>
<li>as <b>ações</b> tomadas ao enviar ou receber uma mensagem;</li>
<li>as ações tomadas em <b>outros eventos</b>.</li>
</ul>
<div class="ex">Uma ligação telefônica já segue um protocolo: você disca, o outro diz “alô”, vocês se identificam, conversam e se despedem. Se ninguém atende, também há regra: tentar de novo depois. Quanto mais exigências (confiabilidade, qualidade, segurança, falar em grupo), mais complexo o sistema fica.</div>

<h3>2. Por que dividir em camadas</h3>
<p>Para <b>reduzir a complexidade</b>. Com camadas, as partes e suas relações ficam explícitas, a manutenção é mais fácil e <b>mudar a implementação de uma camada é transparente para o resto</b>. Cada camada presta um serviço à de cima e “esconde” como o faz.</p>
<div class="ex">Você entrega uma encomenda no balcão dos Correios. Se eles trocarem o caminhão pelo trem, nada muda para você: só importa o serviço “a encomenda chega”.</div>
<p>O número, o nome e a função das camadas <b>podem variar</b> de uma rede para outra.</p>
<table>
<tr><th>Termo</th><th>O que é</th></tr>
<tr><td><b>Protocolo</b></td><td>regras usadas por entidades <b>pares</b> (a mesma camada N em sistemas diferentes) para conversar</td></tr>
<tr><td><b>Interface</b></td><td>primitivas e serviços que uma camada oferece à <b>camada de cima, no mesmo sistema</b></td></tr>
<tr><td><b>Arquitetura de rede</b></td><td>o conjunto de camadas e protocolos</td></tr>
<tr><td><b>Pilha de protocolos</b></td><td>a lista de protocolos usados por um sistema</td></tr>
</table>

<h3>3. Modelo OSI</h3>
<p>Proposto pela <b>ISO</b> na década de 70 (<i>Open Systems Interconnection</i>), tem <b>7 camadas</b>: 1 Física, 2 Enlace, 3 Rede, 4 Transporte, 5 Sessão, 6 Apresentação, 7 Aplicação.</p>
<ul>
<li><b>Pró</b>: bastante geral e continua válido até hoje.</li>
<li><b>Contra</b>: os protocolos associados ao OSI são raramente usados.</li>
<li><b>Críticas</b>: complexidade (cada camada precisa cumprir sua função antes de encaminhar), rigidez (camadas diferentes não deveriam compartilhar informação) e serviços repetidos em várias camadas (ex.: correção de erros).</li>
</ul>

<h3>4. Modelo TCP/IP</h3>
<p>Surgiu na década de 80, com <b>cinco (ou quatro) camadas</b>. A grande diferença: seus <b>protocolos são amplamente usados</b>, embora as camadas sejam mais “restritas” que as do OSI.</p>
<div class="dica">O OSI é só um <b>modelo de referência</b>; o TCP/IP <b>define os protocolos</b> de cada camada.</div>
<table>
<tr><th>Camada</th><th>Função</th><th>PDU</th><th>Exemplos</th></tr>
<tr><td><b>Aplicação</b></td><td>suporte a aplicações de rede</td><td>mensagem</td><td>HTTP, SMTP, FTP</td></tr>
<tr><td><b>Transporte</b></td><td>comunicação <b>fim-a-fim</b> entre sistemas finais</td><td>segmento</td><td>TCP, UDP</td></tr>
<tr><td><b>Rede</b></td><td>encaminhamento e roteamento</td><td>datagrama</td><td>IP</td></tr>
<tr><td><b>Enlace</b></td><td>comunicação <b>salto-a-salto</b> entre vizinhos</td><td>quadro</td><td>Ethernet, PPP, WiFi</td></tr>
<tr><td><b>Física</b></td><td>transmitir os bits “no fio” (modulação e codificação)</td><td>bits</td><td>—</td></tr>
</table>
<p>PDU é a unidade de dados daquela camada.</p>

<h3>5. Encapsulamento</h3>
<p>Cada camada <b>acrescenta o seu cabeçalho</b> à unidade que veio de cima. No destino, cada camada tira (desencapsula) o cabeçalho correspondente.</p>
<pre>mensagem    M
segmento    Ht M
datagrama   Hr Ht M
quadro      He Hr Ht M</pre>
<p>(Ht = cabeçalho de transporte, Hr = de rede, He = de enlace.) Os <b>roteadores</b> processam até a camada de <b>rede</b>; os <b>comutadores</b>, até a de <b>enlace</b>.</p>
<div class="ex">Uma carta dentro de um envelope, dentro de um malote, dentro de um caminhão: cada etapa do caminho só abre o nível que lhe interessa.</div>

<h3>6. Tipos de rede</h3>
<p>Uma <b>rede de computadores</b> é um conjunto de computadores autônomos interconectados; a Internet é uma <b>rede de redes</b>. Por extensão geográfica:</p>
<table>
<tr><th>Tipo</th><th>Alcance</th><th>Exemplo</th></tr>
<tr><td><b>PAN</b></td><td>muito pequeno, para uma só pessoa</td><td>Bluetooth</td></tr>
<tr><td><b>LAN</b></td><td>um prédio ou conjunto de prédios</td><td>Ethernet</td></tr>
<tr><td><b>MAN</b></td><td>uma cidade</td><td>rede baseada na TV a cabo</td></tr>
<tr><td><b>WAN</b></td><td>um país ou continente</td><td>ATM</td></tr>
</table>
<table>
<tr><th>LAN</th><th>WAN</th></tr>
<tr><td>pequenas distâncias; em geral de uma organização</td><td>distâncias muito grandes</td></tr>
<tr><td>taxas da ordem de Mbps</td><td>em geral, taxas menores que as das LANs</td></tr>
<tr><td>pequenos atrasos de propagação</td><td>atrasos de propagação maiores</td></tr>
<tr><td>—</td><td>comutadores de pacotes interligados por enlaces dedicados</td></tr>
</table>

<h3>7. Topologias</h3>
<p>As mais comuns são <b>malha</b> (completa ou irregular), <b>estrela</b>, <b>anel</b>, <b>barramento</b> e <b>híbridas</b> (anel-estrela, barramento-estrela, estrela-anel, árvore de barramentos). Cada uma pesa diferente em custo, confiabilidade e alcance.</p>
<table>
<tr><th>Topologia</th><th>Como é</th><th>Vantagens</th><th>Desvantagens</th></tr>
<tr><td><b>Malha completa</b></td><td>cada estação ligada a todas as outras</td><td>sem meio compartilhado; sem decisão de roteamento</td><td>enorme quantidade de ligações: custo</td></tr>
<tr><td><b>Malha irregular</b></td><td>a mais geral: cada estação liga-se a um número variável de outras</td><td>dá para montar conforme o tráfego e fugir de congestionamento</td><td>exige decisão de roteamento</td></tr>
<tr><td><b>Estrela</b></td><td>todas ligadas a um nó central, que decide o roteamento</td><td>boa se o fluxo é centralizado</td><td>depende do nó central (confiabilidade)</td></tr>
<tr><td><b>Anel</b></td><td>mensagens circulam nó a nó; cada um copia o que é seu</td><td>sem roteamento; sem armazenamento intermediário (bom atraso e vazão)</td><td>precisa controlar o acesso ao meio; confiabilidade depende de cada nó (são repetidores)</td></tr>
<tr><td><b>Barramento</b></td><td>todas “escutam” o mesmo meio</td><td>sem roteamento; sem armazenamento intermediário</td><td>precisa controlar o acesso ao meio compartilhado</td></tr>
</table>
<div class="dica">A <b>malha</b> aparece em <b>WANs</b> e não em LANs: em rede local o meio físico é barato, e decidir por onde mandar cada mensagem e guardá-la em cada nó intermediário aumentaria o custo e o atraso. Estrela e barramento são usadas principalmente em <b>LANs</b>.</div>

<h3>8. Componentes da Internet</h3>
<ul>
<li><b>Estações (hosts)</b> ou sistemas finais: rodam as aplicações.</li>
<li><b>Enlaces</b>: fibra, cobre, rádio, satélite; medidos pela taxa de transmissão (largura de banda).</li>
<li><b>Roteadores</b> (comutadores de pacotes): encaminham os pacotes.</li>
<li><b>Provedores (ISPs)</b>: local, regional e backbone.</li>
</ul>
<p>A <b>borda</b> é formada pelas aplicações, sistemas finais e redes de acesso; o <b>núcleo</b> são os roteadores, a “rede de redes”. O princípio da Internet: <b>complexidade na borda, núcleo simples</b>.</p>
<p>A Internet oferece às aplicações dois serviços: transferência <b>confiável</b> de dados e transferência de <b>melhor esforço</b> (não confiável). Qualquer aplicação distribuída (Web, e-mail, jogos, mensagens, VoIP, compartilhamento de arquivos) só precisa seguir as regras.</p>

<h3>9. Como a Internet começou</h3>
<table>
<tr><th>Quando</th><th>O que aconteceu</th></tr>
<tr><td>Out/1957</td><td>Os soviéticos lançam o Sputnik I, primeiro satélite artificial</td></tr>
<tr><td>1958</td><td>Em reação, Eisenhower cria a <b>ARPA</b> (defesa antimísseis e detecção de testes nucleares)</td></tr>
<tr><td>1964</td><td>Licklider, Kleinrock, Baran e Roberts propõem interconectar computadores para acessar dados e programas de qualquer lugar, com <b>topologia distribuída</b> (uma bomba não anularia a comunicação) e <b>comutação de pacotes</b></td></tr>
</table>
<p>Na <b>comutação de pacotes</b>, a mensagem é dividida em pacotes, encaminhada e remontada no destino, o que permite <b>caminhos redundantes</b>.</p>
`
},

"redes-a45": {
  resumo: "Como as aplicações de rede se organizam (cliente-servidor, CDN, P2P, híbrida), o que pedem ao transporte, TCP × UDP e o HTTP por dentro: conexões, mensagens, métodos, códigos de status, cookies e cache.",
  html: `
<h3>1. Onde as aplicações rodam</h3>
<p>As aplicações de rede executam <b>nos sistemas finais</b> e conversam pela rede. Os dispositivos do <b>núcleo</b> não rodam aplicações de usuário. Isso é bom: concentrar as aplicações nas pontas permite desenvolver e espalhar novos serviços rapidamente.</p>

<h3>2. Arquiteturas de aplicação</h3>
<p>Há três: <b>cliente-servidor</b>, <b>par-a-par (P2P)</b> e <b>híbrida</b>.</p>
<table>
<tr><th>Servidor</th><th>Cliente</th></tr>
<tr><td>nó “especial” que tem o serviço</td><td>faz as requisições</td></tr>
<tr><td>recebe requisições</td><td>não precisa estar sempre ligado</td></tr>
<tr><td><b>sempre ligado</b></td><td>endereço pode ser dinâmico</td></tr>
<tr><td>endereço conhecido e fácil de alcançar</td><td>não fala diretamente com outros clientes</td></tr>
</table>
<h4>O limite do cliente-servidor: o vídeo</h4>
<p>É ponto-a-ponto: <b>um fluxo de vídeo por usuário</b>. Mais usuários e mais qualidade exigem mais banda e custam mais ao provedor: o modelo deixa de servir.</p>
<h4>CDN: a saída</h4>
<p>As <b>Content Distribution Networks</b> tornam o cliente-servidor mais eficiente e escalável. São <b>servidores auxiliares espalhados geograficamente</b> que <b>replicam o conteúdo</b> do servidor de origem e redirecionam a requisição para a <b>réplica mais próxima</b> do cliente (mais taxa, menos latência). Tudo <b>transparente</b> para o cliente.</p>
<ul>
<li><b>Desafios</b>: encaminhar a requisição, escolher a réplica, replicar o conteúdo.</li>
<li><b>Desvantagem</b>: a eficiência depende do número de servidores, logo, custo alto. Ex.: Akamai, com 360 mil servidores em 135 países.</li>
</ul>
<h4>P2P e híbrida</h4>
<p><b>Pura</b>: comunicação direta entre sistemas finais. <b>Híbrida</b>: usa servidores auxiliares (Skype, BitTorrent). Os participantes <b>colaboram</b> compartilhando banda, processamento e armazenamento: <b>mais participantes, mais capacidade</b> (escalabilidade).</p>
<ul>
<li><b>Problemas de gerência</b>: não há elemento dedicado, então não há garantia de continuidade; os pares ficam conectados de forma intermitente e mudam de IP.</li>
<li><b>Exemplo híbrido</b>: no Skype a <b>localização</b> do parceiro é feita por servidor, mas a <b>conversa</b> é direta. Na mensagem instantânea, cada usuário registra seu IP no servidor central ao ficar online e o consulta para achar os contatos.</li>
<li><b>3 desafios do P2P</b>: ser compatível com os interesses dos ISPs (o tráfego muda: “clientes viram servidores”), <b>segurança</b> (altamente distribuído) e <b>incentivos à cooperação</b> (o usuário compartilha por vontade própria).</li>
</ul>

<h3>3. O que a aplicação precisa do transporte</h3>
<ul>
<li><b>Confiabilidade</b>: áudio e vídeo toleram perdas; arquivos, e-mail e SSH exigem 100%.</li>
<li><b>Largura de banda</b>: multimídia exige um mínimo; Web, e-mail e arquivos são <b>elásticos</b> (se adaptam).</li>
<li><b>Atraso</b> (temporização).</li>
<li><b>Segurança</b>: autenticação, controle de acesso, integridade, não-repúdio, confidencialidade.</li>
</ul>
<table>
<tr><th>Aplicação</th><th>Perda</th><th>Banda</th><th>Atraso</th></tr>
<tr><td>Transferência de arquivos</td><td>sem perdas</td><td>elástica</td><td>tolerante</td></tr>
<tr><td>E-mail</td><td>sem perdas</td><td>elástica</td><td>tolerante</td></tr>
<tr><td>Web</td><td>sem perdas</td><td>elástica</td><td>tolerante</td></tr>
<tr><td>Áudio/vídeo em tempo real</td><td>tolerante</td><td>vídeo 10 kb–5 Mb; áudio 5 kb–1 Mb</td><td>centenas de ms</td></tr>
<tr><td>Áudio/vídeo gravado</td><td>tolerante</td><td>idem</td><td>poucos segundos</td></tr>
<tr><td>Jogos interativos</td><td>tolerante</td><td>até 10 kbps</td><td>centenas de ms</td></tr>
<tr><td>Mensagens instantâneas</td><td>sem perdas</td><td>elástica</td><td>sim/não (?)</td></tr>
</table>

<h3>4. TCP × UDP e quem usa o quê</h3>
<table>
<tr><th>TCP</th><th>UDP</th></tr>
<tr><td>orientado a conexão (mensagens de controle antes dos dados)</td><td>sem conexão</td></tr>
<tr><td>transporte <b>confiável</b> entre processos</td><td>transferência <b>não confiável</b></td></tr>
<tr><td>controle de <b>fluxo</b></td><td>sem controle de fluxo</td></tr>
<tr><td>controle de <b>congestionamento</b></td><td>sem controle de congestionamento</td></tr>
</table>
<div class="dica">Nenhum dos dois dá garantias de <b>tempo</b> nem de <b>banda mínima</b>.</div>
<table>
<tr><th>Aplicação</th><th>Protocolo</th><th>Transporte</th></tr>
<tr><td>E-mail</td><td>SMTP</td><td>TCP</td></tr>
<tr><td>Acesso remoto</td><td>Telnet, SSH</td><td>TCP</td></tr>
<tr><td>Web</td><td>HTTP</td><td>TCP</td></tr>
<tr><td>Transferência de arquivos</td><td>FTP</td><td>TCP</td></tr>
<tr><td>Multimídia</td><td>HTTP, RTP</td><td>TCP ou UDP</td></tr>
<tr><td>Telefonia na Internet</td><td>SIP, RTP, proprietário (Skype)</td><td>tipicamente UDP</td></tr>
</table>

<h3>5. Protocolo da camada de aplicação</h3>
<p>Define os <b>tipos de mensagem</b> (requisição, resposta), a <b>sintaxe</b> (campos e como se identificam), a <b>semântica</b> (o que cada campo significa) e as <b>regras</b> de quando enviar e responder. Pode ser de <b>domínio público</b> (definido em <b>RFCs</b> do IETF; <i>drafts</i> são versões ainda abertas) ou <b>proprietário</b> (código fechado, ex.: Skype).</p>

<h3>6. HTTP</h3>
<p>Uma página Web tem um <b>arquivo-base HTML</b> que referencia vários <b>objetos</b> (imagens, áudio, applets…); cada um é endereçável por uma <b>URL</b>: nome do hospedeiro + nome do caminho, como em <code>www.ic.uff.br/~igor/cursos/index.html</code>.</p>
<p>O HTTP é cliente/servidor (navegador × servidor) e usa <b>TCP, geralmente na porta 80</b>: o cliente abre a conexão, o servidor aceita, trocam mensagens e o servidor fecha.</p>
<h4>Sem estado</h4>
<p>O servidor <b>não guarda nada</b> sobre pedidos anteriores: se você pede o mesmo objeto de novo, ele é reenviado. É de propósito: guardar estado é complexo (memória) e, se cliente ou servidor caírem, as visões do estado podem ficar inconsistentes.</p>
<h4>Conexão persistente × não persistente</h4>
<table>
<tr><th>Não persistente</th><th>Persistente (HTTP/1.1)</th></tr>
<tr><td>uma requisição/resposta por conexão TCP</td><td>várias requisições/respostas na mesma conexão</td></tr>
<tr><td>2 RTTs por objeto + SO aloca recursos a cada conexão</td><td>pode bastar 1 RTT para todos os objetos referenciados</td></tr>
<tr><td>navegadores abrem conexões paralelas</td><td>o servidor deixa a conexão aberta</td></tr>
</table>
<p>No não persistente, o tempo de resposta é <b>2 RTT + tempo de transmissão do arquivo</b>: 1 RTT para o handshake do TCP e 1 RTT para o pedido e os primeiros bytes da resposta.</p>
<div class="ex">Com RTT de 50 ms e um arquivo que leva 10 ms para transmitir: 2 × 50 + 10 = <b>110 ms</b> por objeto. Numa página com 10 objetos sem paralelismo, isso se repete 10 vezes; com conexão persistente, o custo do handshake só aparece uma vez.</div>
<h4>Mensagem de requisição (texto ASCII)</h4>
<pre>GET /somedir/page.html
    HTTP/1.0
Host: www.someschool.edu
User-agent: Mozilla/4.0
Connection: close
Accept-language: fr
(linha em branco)</pre>
<p>A primeira linha é a <b>linha da requisição</b>; as demais são <b>cabeçalhos</b>; a linha em branco (CR LF) marca o fim.</p>
<p><b>Métodos do HTTP/1.1</b> (RFC 2616): GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS e CONNECT. Dizem o que o servidor deve fazer com a URL. O <b>GET</b> pede um recurso.</p>
<h4>GET condicional e formulários</h4>
<ul>
<li><b>GET condicional</b>: o cache manda <code>If-modified-since: &lt;data&gt;</code>. Se a cópia está atual, o servidor responde <b>304 Not Modified</b> (sem o objeto); se mudou, <b>200 OK</b> com o objeto.</li>
<li><b>Formulários</b>: com <b>POST</b> o conteúdo vai no <b>corpo</b> da mensagem; com GET ele vai na <b>URL</b>, como em <code>…/animalsearch?key=monkeys&amp;max=10</code>.</li>
</ul>
<h4>Mensagem de resposta e códigos de status</h4>
<pre>HTTP/1.1 200 OK
Connection: close
Date: ...
Server: Apache/1.3.0
Last-Modified: ...
Content-Length: 6821
Content-Type: text/html

(dados: o arquivo HTML)</pre>
<table>
<tr><th>Código</th><th>Significado</th></tr>
<tr><td><b>200 OK</b></td><td>sucesso; o objeto vem nesta mensagem</td></tr>
<tr><td><b>301 Moved Permanently</b></td><td>o objeto mudou; a nova localização está em <code>Location:</code></td></tr>
<tr><td><b>400 Bad Request</b></td><td>o servidor não entendeu o pedido</td></tr>
<tr><td><b>404 Not Found</b></td><td>o documento não está neste servidor</td></tr>
<tr><td><b>505 HTTP Version Not Supported</b></td><td>versão do HTTP não usada por este servidor</td></tr>
</table>

<h3>7. Cookies</h3>
<p>Como o HTTP não guarda estado, os <b>cookies</b> guardam estado dentro das próprias mensagens. São <b>4 componentes</b>: (1) a linha <code>Set-cookie:</code> na resposta, (2) a linha <code>cookie:</code> no pedido seguinte, (3) o arquivo do cookie na máquina do usuário, gerenciado pelo navegador, e (4) um banco de dados de retaguarda no site.</p>
<p>Servem para autorização, carrinho de compras, sugestões e estado da sessão (webmail). O custo é a <b>privacidade</b>: os sites aprendem muito sobre você.</p>
<div class="ex">Você põe um produto no carrinho e navega para outra página: sem cookie, o servidor não saberia que é você de novo. Com o cookie, seu navegador devolve o “número da sua sessão” a cada pedido.</div>

<h3>8. Cache Web (proxy)</h3>
<p>Meta: atender o cliente <b>sem envolver o servidor de origem</b>. O cliente manda tudo ao proxy; se o objeto está no cache, ele devolve na hora; se não, busca na origem e depois devolve. O cache é <b>cliente e servidor ao mesmo tempo</b> e costuma ser instalado por um ISP (universidade, empresa, provedor residencial). Vantagem: menos tempo de resposta e menos tráfego no canal de acesso. O ganho depende da <b>taxa de acerto</b> (<i>hit ratio</i>).</p>
`
},

"redes-a6": {
  resumo: "Como funciona o e-mail (agentes, servidores, SMTP, POP3, IMAP) e como o DNS traduz nomes em endereços IP: hierarquia de servidores, cache, consultas iterativas e recursivas e os registros de recurso.",
  html: `
<h3>1. O sistema de correio da Internet</h3>
<p>São <b>4 componentes</b>:</p>
<ol>
<li><b>Agentes de usuário (AU)</b>: ler, responder, encaminhar, salvar e editar (Outlook, Thunderbird, Mutt).</li>
<li><b>Servidores de correio</b> (agentes de transferência): guardam e transferem as mensagens.</li>
<li><b>SMTP</b>: leva a mensagem <b>entre servidores</b>.</li>
<li><b>Protocolos de acesso</b>: levam a mensagem <b>do servidor até o AU</b>.</li>
</ol>
<h4>Alice envia uma mensagem a Bob</h4>
<ol>
<li>Alice compõe a mensagem para bob@someschool.edu no seu AU.</li>
<li>O AU a envia ao servidor de Alice, que a coloca numa <b>fila</b>.</li>
<li>O cliente SMTP abre uma <b>conexão TCP</b> com o servidor de Bob.</li>
<li>Envia a mensagem pela conexão.</li>
<li>O servidor de Bob a coloca na <b>caixa de entrada</b> dele.</li>
<li>Bob abre seu AU e lê.</li>
</ol>
<div class="ex">É o correio de papel: você põe a carta na caixa (AU → servidor), o carteiro leva até a agência do destino (SMTP) e o destinatário busca na sua caixa postal (POP/IMAP).</div>

<h3>2. SMTP</h3>
<ul>
<li>RFC 2821; usa <b>TCP, porta 25</b>.</li>
<li>Mensagens em <b>ASCII de 7 bits</b> (para 8 bits usa-se extensão ou codificação).</li>
<li>Há um cliente SMTP (quem envia) e um servidor SMTP (quem recebe).</li>
<li>Usa <b>conexões persistentes</b> e reconhece o fim da mensagem por <code>CRLF.CRLF</code>.</li>
</ul>
<p>Comandos principais: <b>HELO</b> (ou EHLO), <b>MAIL FROM</b>, <b>RCPT TO</b>, <b>DATA</b>, <b>QUIT</b>, <b>VRFY</b>. Uma conversa típica (<code>telnet servidor.br 25</code>), em que S é o servidor e C o cliente:</p>
<pre>S: 220 servidor.br
C: HELO cliente.br
S: 250 Hello cliente.br
C: MAIL FROM:&lt;a@cliente.br&gt;
S: 250 Sender ok
C: RCPT TO:&lt;b@servidor.br&gt;
S: 250 Recipient ok
C: DATA
S: 354 Enter mail
C: Subject: Teste
C: (linha em branco)
C: Teste de envio.
C: .
S: 250 Message accepted
C: QUIT
S: 221 closing connection</pre>
<p><b>Estrutura do e-mail</b>: um <b>envelope</b> (informação para o transporte) e a <b>mensagem</b>, formada por cabeçalho (<code>To:</code>, <code>From:</code>, <code>Subject:</code>, <code>Received:</code>), uma linha em branco e o corpo. O corpo só interessa ao destinatário.</p>
<h4>SMTP × HTTP</h4>
<table>
<tr><th></th><th>HTTP</th><th>SMTP</th></tr>
<tr><td><b>Direção</b></td><td><b>pull</b> (recupera)</td><td><b>push</b> (envia)</td></tr>
<tr><td><b>Em comum</b></td><td colspan="2">interação comando/resposta e códigos de status em ASCII</td></tr>
<tr><td><b>Objetos</b></td><td>cada objeto na sua própria resposta</td><td>vários objetos numa só mensagem de múltiplas partes (MIME)</td></tr>
</table>

<h3>3. Protocolos de acesso ao correio</h3>
<p>O SMTP só <b>entrega e guarda</b> no servidor do destinatário. Para o usuário ler:</p>
<ul>
<li><b>POP</b> (RFC 1939): autorização e transferência.</li>
<li><b>IMAP</b> (RFC 1730): mais comandos (mais complexo) e manuseio das mensagens no servidor.</li>
<li><b>HTTP</b>: webmails (Hotmail, Yahoo! Mail…).</li>
</ul>
<p><b>POP3</b> tem duas fases. <b>Autorização</b>: <code>user</code> e <code>pass</code> (respostas <code>+OK</code> ou <code>-ERR</code>). <b>Transação</b>: <code>list</code> (lista os números), <code>retr</code> (recupera), <code>dele</code> (apaga), <code>quit</code>.</p>
<table>
<tr><th>POP3</th><th>IMAP</th></tr>
<tr><td>“baixa e apaga”: se Bob mudar de cliente, não relê as mensagens</td><td>deixa tudo <b>no servidor</b>; não precisa baixar tudo</td></tr>
<tr><td>“baixa e mantém”: copia em clientes diferentes</td><td>permite organizar em <b>pastas</b></td></tr>
<tr><td>não guarda estado entre conexões</td><td><b>guarda o estado</b> entre sessões (pastas e mapeamento mensagens → pastas)</td></tr>
</table>
<div class="dica">Segurança: o SMTP <b>confia em todo mundo</b> e não tem autenticação, então spammers fazem a mensagem parecer vinda de qualquer endereço. A “solução” é o <b>SMTP-AUTH</b> (RFC 2554), que identifica o remetente de verdade; mas um usuário autenticado ainda pode falsificar o remetente do envelope ou o campo <code>From:</code>.</div>

<h3>4. DNS: por que existe</h3>
<p>Máquinas têm dois identificadores: o <b>endereço IP</b> (ex.: 200.20.15.38: bits, tamanho fixo, hierárquico, bom para a máquina) e o <b>nome</b> (ex.: www.ic.uff.br: tamanho variável, bom para o humano). O <b>Domain Name System</b> faz o mapeamento nos dois sentidos (inclusive o DNS reverso).</p>
<div class="ex">É a agenda do celular: você procura “Ana” e a agenda sabe o número. O DNS é a agenda da Internet, só que espalhada por milhares de servidores.</div>
<p>O DNS é uma <b>base de dados distribuída e hierárquica</b> mais um <b>protocolo de aplicação</b> para os servidores se consultarem (mais um caso de “complexidade na borda”). Oferece:</p>
<ul>
<li>tradução de <b>nome → IP</b>;</li>
<li><b>apelidos</b> (aliasing): nome canônico e apelidos;</li>
<li><b>distribuição de carga</b>: vários IPs para um mesmo nome (servidores Web replicados).</li>
</ul>
<p>Por que <b>não</b> uma base centralizada? Não escalaria: <b>ponto único de falha</b>, volume de tráfego, <b>distância</b> até o usuário (mais tempo de resposta) e manutenção.</p>

<h3>5. A hierarquia de servidores</h3>
<table>
<tr><th>Nível</th><th>Quem é</th></tr>
<tr><td><b>Raiz</b></td><td>13 no mundo (10 só nos EUA), cada um com várias réplicas; consultados por servidores locais que não resolvem o nome. Com o cache dos TLDs, quase não são visitados</td></tr>
<tr><td><b>TLD</b> (domínio de topo)</td><td>com, org, net, edu e os domínios de países (br, uk, fr, ca, jp). O NIC.br mantém o .br</td></tr>
<tr><td><b>Oficiais</b> (authoritative)</td><td>servidores das organizações, com os mapeamentos oficiais (inclusive de Web e correio); mantidos pela organização ou pelo provedor</td></tr>
<tr><td><b>Local</b> (padrão)</td><td>não pertence necessariamente à hierarquia; cada ISP, empresa ou universidade tem um. Recebe a consulta da estação e <b>consulta os demais por ela</b></td></tr>
</table>
<h4>Consulta iterativa × recursiva</h4>
<ul>
<li><b>Iterativa</b>: o servidor responde “não conheço, pergunte àquele”. Quem corre atrás é o solicitante (o servidor local).</li>
<li><b>Recursiva</b>: a responsabilidade de resolver passa ao servidor contatado. ⚠️ Gera <b>mais carga nos servidores mais altos</b> da hierarquia.</li>
</ul>
<div class="ex">Você pergunta o caminho a alguém. Resposta iterativa: “não sei, pergunte na padaria”. Resposta recursiva: “espera, eu pergunto por você e já volto”.</div>
<p><b>Cache</b>: quando um servidor aprende um mapeamento, guarda localmente, e evita consultar servidores mais altos. As entradas têm <b>TTL</b> e somem depois de um tempo (geralmente 2 dias).</p>

<h3>6. Registros de recurso (RR)</h3>
<p>A base é feita de registros no formato <b>(nome, valor, tipo, TTL)</b>:</p>
<table>
<tr><th>Tipo</th><th>Nome</th><th>Valor</th></tr>
<tr><td><b>A</b></td><td>nome de uma estação</td><td>seu endereço IP</td></tr>
<tr><td><b>NS</b></td><td>domínio (ex.: ic.uff.br)</td><td>servidor oficial desse domínio</td></tr>
<tr><td><b>CNAME</b></td><td>apelido (alias)</td><td>nome canônico (verdadeiro)</td></tr>
<tr><td><b>MX</b></td><td>domínio</td><td>nome do servidor de correio do domínio</td></tr>
</table>
<p>Lendo a saída de <code>host -v www.ic.uff.br</code>:</p>
<pre>www.ic.uff.br  CNAME
  tangerina.ic.uff.br
tangerina.ic.uff.br  A
  200.20.15.38</pre>
<p>Ou seja, <b>www.ic.uff.br é apelido (CNAME)</b> de tangerina.ic.uff.br, cujo registro A aponta para 200.20.15.38. A seção AUTHORITY lista os servidores NS do domínio e a ADDITIONAL traz os IPs deles. Pedido e resposta DNS têm o mesmo formato.</p>
`
},

"redes-a7": {
  resumo: "Sistemas par-a-par: por que escalam, as três formas de montar o índice (diretório central, hierarquia, DHT), como o BitTorrent distribui arquivos (tracker, rarest first, tit-for-tat) e como o Skype atravessa o NAT.",
  html: `
<h3>1. Rede orientada ao usuário × ao conteúdo</h3>
<ul>
<li><b>Orientada ao usuário</b>: um usuário quer falar com <b>outro usuário</b> (telnet, FTP, SMTP).</li>
<li><b>Orientada ao conteúdo</b>: quer-se um <b>dado ou serviço</b>, e não importa em que máquina ele está (P2P como o BitTorrent, redes de distribuição como a Akamai).</li>
</ul>

<h3>2. Por que o P2P escala</h3>
<p>No cliente-servidor, o tempo para <b>todos</b> receberem uma cópia cresce <b>linearmente</b> com o número de usuários: o servidor é o gargalo. No P2P, <b>cada par que baixa também passa a servir</b>, então a capacidade total cresce junto com o número de participantes.</p>
<div class="ex">Um professor entrega a mesma apostila a 100 alunos, um por vez: quanto mais alunos, mais tempo. Se cada aluno que já recebeu passa a entregar cópias aos outros, a fila acaba bem mais rápido.</div>
<p>A ideia básica dos primeiros sistemas de compartilhamento: um par quer um arquivo → <b>busca</b> quem o tem (recebe uma lista) → escolhe um parceiro para enviar → enquanto recebe, também envia a quem interessar. <b>Um par é cliente e servidor temporário.</b> O problema crítico é a <b>busca</b>.</p>

<h3>3. O índice: como saber onde está cada arquivo</h3>
<p>O <b>índice</b> registra dinamicamente a localização dos arquivos compartilhados. Os pares informam o que têm e consultam para achar o que querem. A grande pergunta é <b>como construí-lo</b>.</p>
<table>
<tr><th>Abordagem</th><th>Como funciona</th><th>Problemas</th></tr>
<tr><td><b>Diretório centralizado</b> (Napster)</td><td>o par conecta e informa IP e conteúdo ao servidor central; Alice pergunta pela música “Hey Jude” ao servidor e pede o arquivo direto a Bob</td><td>ponto único de falha, gargalo, violação de direitos autorais. A <b>transferência</b> é descentralizada, mas a <b>busca</b> é centralizada</td></tr>
<tr><td><b>Hierarquia</b> (Gnutella)</td><td>cada par é líder de grupo ou pertence a um; TCP entre o par e seu líder e entre alguns líderes. O líder registra o conteúdo de todos os seus “filhos”</td><td>nenhum par conhece a localização de todos os arquivos, só parte</td></tr>
<tr><td><b>DHT</b></td><td>tabela hash distribuída (veja abaixo)</td><td>—</td></tr>
</table>

<h3>4. DHT: tabela hash distribuída</h3>
<p>A informação é guardada como pares <b>(chave, valor)</b>, por exemplo <code>(Led Zeppelin IV, 192.168.2.1)</code>. Os pares <b>buscam pela chave</b> e a DHT devolve o valor; também podem <b>inserir</b> pares.</p>
<p>As chaves vêm de uma <b>função hash</b>, que dá: pequena chance de colisão (identificação única), <b>tamanho fixo</b>, espalhamento (distribui a carga) e, em algumas, impossibilidade de voltar à informação original.</p>
<p>Cada par recebe um <b>identificador inteiro</b> em [0, 2<sup>n</sup>−1] (n bits), e cada chave também, pelo mesmo hash. Regra: a chave fica com o par de identificador <b>mais próximo, o sucessor imediato</b>.</p>
<div class="ex">Com n = 4 (identificadores de 0 a 15) e pares {1, 3, 4, 5, 8, 10, 12, 14}: a chave <b>13</b> fica com o par <b>14</b>; a chave <b>15</b> “dá a volta” e fica com o par <b>1</b>.</div>
<h4>Circular e com atalhos</h4>
<ul>
<li><b>DHT circular</b>: cada par conhece só o <b>sucessor e o antecessor</b>, formando um anel (rede sobreposta, <i>overlay</i>). Resolver uma busca custa <b>O(N)</b> mensagens em média.</li>
<li><b>Com atalhos</b>: cada par também conhece alguns outros. Isso reduz para <b>O(log N)</b> (no exemplo da aula, de 6 mensagens para 2).</li>
<li><b>Pastry</b>: sistema recomendado para montar a rede sobreposta; estima a <b>proximidade</b> entre nós (saltos por traceroute, tempo de ida e volta por ping, vazão) para o overlay ficar próximo da rede real. Cada nó tem um identificador de 128 bits (hash do IP ou da chave pública) e a mensagem vai ao nó numericamente mais próximo da chave.</li>
</ul>

<h3>5. BitTorrent</h3>
<p>Ponto-chave: o arquivo é <b>dividido em pedaços</b> (de 256 KB) espalhados pelos pares. Isso reduz a complexidade da busca.</p>
<ul>
<li><b>Torrent (enxame, <i>swarm</i>)</b>: grupo de pares trocando pedaços de um arquivo.</li>
<li><b>Tracker</b>: registra os pares do torrent. Seu endereço vem no arquivo <b>.torrent</b>; como obtê-lo está fora do protocolo.</li>
</ul>
<p><b>Entrada no enxame</b>: (1) o nó obtém o .torrent; (2) registra-se no tracker; (3) recebe uma lista de possíveis vizinhos; (4) escolhe um subconjunto ao acaso; (5) pede para ser vizinho; (6) se aceito, o enlace é criado.</p>
<ul>
<li><b>Seeders</b> (semeadores): têm todos os pedaços.</li>
<li><b>Leechers</b> (sanguessugas): ainda estão baixando; mesmo assim já enviam os pedaços que têm.</li>
</ul>
<h4>Quais pedaços pedir: o mais raro primeiro</h4>
<p>Periodicamente o par recebe dos vizinhos o <b>mapa de pedaços</b> que eles têm e pede primeiro os <b>mais raros</b> (<i>rarest first</i>), para maximizar a disponibilidade no enxame.</p>
<h4>Olho por olho (tit-for-tat)</h4>
<ul>
<li>Cada par tem <b>até 4 vizinhos</b>; os pedaços só são trocados entre vizinhos.</li>
<li>Um par só continua enviando a quem <b>mais envia a ele</b>.</li>
<li>Reavaliação <b>a cada 10 s</b>; o <b>pior</b> vizinho é trocado <b>a cada 30 s</b>.</li>
<li>O par escolhe ao acaso outro par e começa a enviar: <b>seleção otimista</b> (<i>optimistically unchoke</i>), pois não sabe se o novo será melhor.</li>
</ul>
<div class="dica">Com mais velocidade de <b>upload</b>, o par encontra parceiros melhores e baixa mais rápido: quem dá, recebe.</div>
<p><b>O que ainda falha</b>: o novo vizinho pode enviar menos que o pior atual; pode ser um <b>caroneiro</b> (<i>free-rider</i>: só recebe); e os pares entram e saem quando quiserem, e quem termina o download pode sair egoisticamente ou ficar como seeder.</p>

<h3>6. Skype</h3>
<ul>
<li>Protocolo <b>proprietário</b> da aplicação (funcionamento estimado por engenharia reversa); a comunicação entre usuários é <b>P2P</b>.</li>
<li><b>Overlay hierárquico com super-nós</b> (SNs): o índice, que mapeia nomes de usuário em IPs, fica distribuído entre os SNs; há também um servidor de login.</li>
<li><b>Problema do NAT</b>: ele impede que um par de fora inicie uma chamada com um par de dentro. <b>Solução</b>: <b>intermediários (relays)</b>, escolhidos via os SNs de Alice e de Bob; cada par inicia a sessão com o relay e a conversa atravessa os dois NATs por ele.</li>
</ul>
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
