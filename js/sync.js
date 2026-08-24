/* ============================================================
   Sincronização do progresso com um arquivo JSON do repositório.

   Por que existe: o GitHub Pages serve arquivos, mas não aceita
   escrita. Para que "as interações editem o JSON que está no
   repositório", quem grava é a API do GitHub (Contents API), que
   cria um commit no arquivo. O token fica só no localStorage
   deste navegador — nunca é publicado junto com o site.

   Sem token configurado, o app apenas LÊ o arquivo do repositório
   como semente e continua guardando tudo no localStorage.
   ============================================================ */

const SYNC = (() => {

  const CONF_KEY = "ankiuff.sync.v1";
  const CAMINHO_PADRAO = "dados/progresso.json";
  const API = "https://api.github.com";

  let conf = carregarConf();
  let ctx = null;              // { get, replace, onChange }
  let sha = null;              // sha do arquivo remoto (para o PUT)
  let sujo = false;
  let ocupado = false;
  let timer = null;
  let ultimo = conf.ultimo || null;

  function carregarConf(){
    try{
      return Object.assign(
        { repo:"", token:"", branch:"main", caminho:CAMINHO_PADRAO, ultimo:null },
        JSON.parse(localStorage.getItem(CONF_KEY) || "{}")
      );
    }catch(e){
      return { repo:"", token:"", branch:"main", caminho:CAMINHO_PADRAO, ultimo:null };
    }
  }
  function gravarConf(){
    conf.ultimo = ultimo;
    try{ localStorage.setItem(CONF_KEY, JSON.stringify(conf)); }catch(e){}
  }

  const ativo = () => !!(conf.repo && conf.token);

  /* ---------- base64 com UTF-8 correto ---------- */
  function b64enc(txt){
    const bytes = new TextEncoder().encode(txt);
    let bin = "";
    const passo = 0x8000;
    for (let i = 0; i < bytes.length; i += passo)
      bin += String.fromCharCode.apply(null, bytes.subarray(i, i + passo));
    return btoa(bin);
  }
  function b64dec(b64){
    const bin = atob(String(b64).replace(/\s/g, ""));
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  /* ---------- fusão de dois progressos ----------
     Regra por cartão: vence o que foi visto por último.
     Regra do log diário: vence o maior valor do dia (idempotente,
     para que refundir os mesmos dados não infle o histórico).     */
  function fundir(a, b){
    const out = {
      version: 1,
      criado: menorData(a.criado, b.criado),
      atualizado: maiorData(a.atualizado, b.atualizado),
      cards: {},
      log: {}
    };
    const ids = new Set([...Object.keys(a.cards || {}), ...Object.keys(b.cards || {})]);
    for (const id of ids){
      const x = (a.cards || {})[id], y = (b.cards || {})[id];
      if (!x){ out.cards[id] = y; continue; }
      if (!y){ out.cards[id] = x; continue; }
      out.cards[id] = (y.visto || 0) > (x.visto || 0) ? y : x;
    }
    const dias = new Set([...Object.keys(a.log || {}), ...Object.keys(b.log || {})]);
    for (const d of dias)
      out.log[d] = Math.max((a.log || {})[d] || 0, (b.log || {})[d] || 0);
    return out;
  }
  const maiorData = (x, y) => (!x ? y : !y ? x : (x > y ? x : y));
  const menorData = (x, y) => (!x ? y : !y ? x : (x < y ? x : y));

  function valido(o){
    return o && typeof o === "object" && o.cards && typeof o.cards === "object";
  }

  /* ---------- leitura ---------- */
  async function baixar(){
    if (ativo()){
      const r = await fetch(
        `${API}/repos/${conf.repo}/contents/${conf.caminho}?ref=${encodeURIComponent(conf.branch)}`,
        { headers:{ Authorization:"Bearer " + conf.token,
                    Accept:"application/vnd.github+json",
                    "X-GitHub-Api-Version":"2022-11-28" } });
      if (r.status === 404){ sha = null; return null; }        // ainda não existe
      if (!r.ok) throw new Error(await mensagemErro(r));
      const j = await r.json();
      sha = j.sha;
      return JSON.parse(b64dec(j.content));
    }
    // sem token: lê o arquivo publicado, só de leitura
    const r = await fetch(conf.caminho + "?t=" + Date.now(), { cache:"no-store" });
    if (!r.ok) return null;
    return await r.json();
  }

  /* ---------- escrita (cria um commit) ---------- */
  async function enviar(dados){
    const corpo = {
      message: `progresso: ${new Date().toLocaleString("pt-BR")}`,
      content: b64enc(JSON.stringify(dados, null, 2)),
      branch: conf.branch
    };
    if (sha) corpo.sha = sha;
    const r = await fetch(`${API}/repos/${conf.repo}/contents/${conf.caminho}`, {
      method:"PUT",
      headers:{ Authorization:"Bearer " + conf.token,
                Accept:"application/vnd.github+json",
                "X-GitHub-Api-Version":"2022-11-28",
                "Content-Type":"application/json" },
      body: JSON.stringify(corpo)
    });
    if (!r.ok) throw new Error(await mensagemErro(r));
    const j = await r.json();
    sha = j.content && j.content.sha;
    return true;
  }

  async function mensagemErro(r){
    let extra = "";
    try{ const j = await r.json(); extra = j.message ? " — " + j.message : ""; }catch(e){}
    if (r.status === 401) return "token inválido ou expirado";
    if (r.status === 403) return "sem permissão (o token precisa de Contents: read and write)" + extra;
    if (r.status === 404) return "repositório, branch ou caminho não encontrado" + extra;
    if (r.status === 409 || r.status === 422) return "conflito de versão" + extra;
    return "HTTP " + r.status + extra;
  }

  /* ---------- operações públicas ---------- */

  // traz o remoto, funde com o local e aplica
  async function puxar({ silencioso = false } = {}){
    if (ocupado) return false;
    ocupado = true;
    try{
      const remoto = await baixar();
      if (valido(remoto)){
        const fundido = fundir(ctx.get(), remoto);
        ctx.replace(fundido);
        ultimo = new Date().toISOString(); gravarConf();
        ctx.onChange();
        if (!silencioso) ctx.aviso("Progresso baixado do repositório");
        return true;
      }
      if (!silencioso) ctx.aviso("Nada para baixar ainda");
      return false;
    }catch(e){
      if (!silencioso) ctx.aviso("Falha ao baixar: " + e.message);
      return false;
    }finally{ ocupado = false; }
  }

  // funde com o remoto e grava de volta (um commit)
  async function empurrar({ silencioso = false } = {}){
    if (!ativo() || ocupado) return false;
    ocupado = true;
    try{
      for (let tentativa = 0; tentativa < 2; tentativa++){
        try{
          const remoto = await baixar();                 // atualiza o sha
          const fundido = valido(remoto) ? fundir(ctx.get(), remoto) : ctx.get();
          ctx.replace(fundido);
          await enviar(fundido);
          sujo = false;
          ultimo = new Date().toISOString(); gravarConf();
          ctx.onChange();
          if (!silencioso) ctx.aviso("Progresso enviado ao repositório");
          return true;
        }catch(e){
          if (tentativa === 0 && /conflito/.test(e.message)){ sha = null; continue; }
          throw e;
        }
      }
    }catch(e){
      if (!silencioso) ctx.aviso("Falha ao enviar: " + e.message);
      return false;
    }finally{ ocupado = false; }
  }

  // chamado a cada resposta; agenda um envio sem gerar commit a cada clique
  function marcarSujo(){
    if (!ativo()) return;
    sujo = true;
    clearTimeout(timer);
    timer = setTimeout(() => empurrar({ silencioso:true }), 90000);
  }

  // ao fim de uma sessão, envia na hora
  function agora(){
    if (!ativo() || !sujo) return;
    clearTimeout(timer);
    empurrar({ silencioso:true });
  }

  function init(contexto){
    ctx = contexto;
    // ao abrir, sempre tenta ler o arquivo do repositório
    puxar({ silencioso:true });
  }

  function estado(){
    return {
      ativo: ativo(),
      repo: conf.repo, token: conf.token, branch: conf.branch, caminho: conf.caminho,
      ultimo, sujo, ocupado
    };
  }
  function configurar({ repo, token, branch, caminho }){
    if (repo    !== undefined) conf.repo    = repo.trim().replace(/^https?:\/\/github\.com\//, "").replace(/\.git$/, "").replace(/\/+$/, "");
    if (token   !== undefined) conf.token   = token.trim();
    if (branch  !== undefined) conf.branch  = branch.trim() || "main";
    if (caminho !== undefined) conf.caminho = caminho.trim() || CAMINHO_PADRAO;
    sha = null;
    gravarConf();
  }
  function esquecer(){
    conf = { repo:"", token:"", branch:"main", caminho:CAMINHO_PADRAO, ultimo:null };
    sha = null; ultimo = null; gravarConf();
  }

  return { init, puxar, empurrar, marcarSujo, agora, estado, configurar, esquecer, fundir, b64enc, b64dec };
})();
