/* ============================================================
   Anki UFF — SRS (SM-2) + progresso em JSON no localStorage
   ============================================================ */

const SUBJECTS = [GPMS, REDES];
const STORE_KEY = "ankiuff.progress.v1";
const CFG_KEY   = "ankiuff.config.v1";
const DAY = 86400000;

/* ---------- utilidades ---------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// id estável derivado do texto da pergunta (sobrevive a reordenações)
function hashId(str){
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
  return "c" + (h >>> 0).toString(36);
}
const today = () => { const d = new Date(); d.setHours(0,0,0,0); return d.getTime(); };
const dayKey = ts => new Date(ts).toISOString().slice(0,10);

/* ---------- índice de cartões ---------- */
const CARDS = {};        // id -> {id, q, a, t, lessonId, subjectId}
const LESSON = {};       // lessonId -> {..., subject, cardIds[]}
const SUBJ = {};         // subjectId -> subject

for (const s of SUBJECTS){
  SUBJ[s.id] = s;
  for (const l of s.lessons){
    l.subject = s;
    l.cardIds = [];
    LESSON[l.id] = l;
    for (const c of l.cards){
      const id = hashId(c.q);
      const card = { id, q:c.q, a:c.a, t:c.t || "", lessonId:l.id, subjectId:s.id };
      CARDS[id] = card;
      l.cardIds.push(id);
    }
  }
}

/* ---------- progresso ---------- */
let P = load();
let CFG = loadCfg();

function blank(){
  return { version:1, criado:new Date().toISOString(), atualizado:null, cards:{}, log:{} };
}
function load(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return blank();
    const o = JSON.parse(raw);
    if (!o.cards) o.cards = {};
    if (!o.log)   o.log = {};
    return o;
  }catch(e){ return blank(); }
}
function save(marcar){
  P.atualizado = new Date().toISOString();
  try{ localStorage.setItem(STORE_KEY, JSON.stringify(P)); }
  catch(e){ toast("Não foi possível salvar o progresso"); }
  if (marcar !== false && typeof SYNC !== "undefined") SYNC.marcarSujo();
}
function loadCfg(){
  try{ return Object.assign({novosPorDia:20, tema:"claro"}, JSON.parse(localStorage.getItem(CFG_KEY) || "{}")); }
  catch(e){ return {novosPorDia:20, tema:"claro"}; }
}
function saveCfg(){ localStorage.setItem(CFG_KEY, JSON.stringify(CFG)); }

/* estado de um cartão:
   undefined                 -> novo
   {rep, ef, iv, due, lapses}-> em aprendizado (rep 0 e passos) ou revisão  */
function st(id){ return P.cards[id]; }
function isNew(id){ return !P.cards[id]; }
function isDue(id, now = Date.now()){
  const s = P.cards[id];
  return !!s && s.due <= now;
}
function isLearning(id){ const s = P.cards[id]; return !!s && s.rep === 0; }

/* ---------- SM-2 adaptado (Anki-like) ---------- */
// grade: 1 Errei · 2 Difícil · 3 Bom · 4 Fácil
const LEARN_STEPS = [1, 10];   // minutos

// "Difícil" durante o aprendizado: entre o passo atual e o próximo
function hardMin(step){
  const cur = LEARN_STEPS[Math.min(step, LEARN_STEPS.length-1)];
  const nxt = LEARN_STEPS[Math.min(step+1, LEARN_STEPS.length-1)];
  return Math.max(cur, Math.round((cur + nxt) / 2));
}

function preview(id, grade){
  const s = st(id);
  if (!s || s.rep === 0){
    const step = s ? (s.step || 0) : 0;
    if (grade === 1) return fmtMin(LEARN_STEPS[0]);
    if (grade === 2) return fmtMin(hardMin(step));
    if (grade === 3){
      const nx = step + 1;
      return nx >= LEARN_STEPS.length ? "1 d" : fmtMin(LEARN_STEPS[nx]);
    }
    return "4 d";
  }
  const n = schedule(s, grade, true);
  return fmtDays(n.iv);
}
function fmtMin(m){ return m < 60 ? m + " min" : Math.round(m/60) + " h"; }
function fmtDays(d){
  if (d < 1) return Math.max(1, Math.round(d*24)) + " h";
  if (d < 30) return Math.round(d) + " d";
  if (d < 365) return (d/30).toFixed(d < 60 ? 1 : 0).replace(".0","") + " mes";
  return (d/365).toFixed(1).replace(".0","") + " a";
}

function schedule(s, grade, dry){
  const o = { ef:s.ef, iv:s.iv, rep:s.rep, lapses:s.lapses||0 };
  if (grade === 1){
    o.rep = 0; o.step = 0; o.lapses = o.lapses + 1;
    o.ef = Math.max(1.3, o.ef - 0.2);
    o.iv = LEARN_STEPS[0] / 1440;
    return o;
  }
  // SM-2
  const q = grade === 2 ? 3 : grade === 3 ? 4 : 5;
  o.ef = Math.max(1.3, o.ef + (0.1 - (5-q) * (0.08 + (5-q) * 0.02)));
  o.rep = s.rep + 1;
  if (o.rep === 1)      o.iv = 1;
  else if (o.rep === 2) o.iv = 6;
  else                  o.iv = s.iv * o.ef;
  if (grade === 2) o.iv = Math.max(1, o.iv * 0.7);
  if (grade === 4) o.iv = o.iv * 1.25;
  o.iv = Math.min(o.iv, 365 * 3);
  return o;
}

function answer(id, grade){
  const now = Date.now();
  let s = st(id);

  if (!s || s.rep === 0){                       // novo ou em aprendizado
    let step = s ? (s.step || 0) : 0;
    const ef = s ? s.ef : 2.5;
    const lapses = s ? (s.lapses || 0) : 0;
    if (grade === 1){
      s = { rep:0, step:0, ef:Math.max(1.3, ef - 0.2), iv:0, due:now + LEARN_STEPS[0]*60000, lapses:lapses+1 };
    } else if (grade === 2){
      s = { rep:0, step, ef, iv:0, due:now + hardMin(step)*60000, lapses };
    } else if (grade === 3){
      const nx = step + 1;
      if (nx >= LEARN_STEPS.length) s = { rep:1, step:0, ef, iv:1, due:today() + DAY, lapses };
      else s = { rep:0, step:nx, ef, iv:0, due:now + LEARN_STEPS[nx]*60000, lapses };
    } else {
      s = { rep:1, step:0, ef:ef + 0.1, iv:4, due:today() + 4*DAY, lapses };
    }
  } else {                                      // revisão
    const n = schedule(s, grade, false);
    s = { rep:n.rep, step:0, ef:n.ef, iv:n.iv, due:today() + Math.round(n.iv)*DAY, lapses:n.lapses };
  }

  s.visto = now;
  P.cards[id] = s;

  const k = dayKey(now);
  P.log[k] = (P.log[k] || 0) + 1;
  save();
}

/* ---------- contagens ---------- */
function countsFor(cardIds){
  const now = Date.now();
  let novos = 0, revisar = 0, aprendidos = 0, maduros = 0;
  for (const id of cardIds){
    const s = st(id);
    if (!s){ novos++; continue; }
    if (s.due <= now) revisar++;
    if (s.rep >= 1){ aprendidos++; if (s.iv >= 21) maduros++; }
  }
  return { total:cardIds.length, novos, revisar, aprendidos, maduros,
           pct: cardIds.length ? Math.round(aprendidos / cardIds.length * 100) : 0 };
}
const allIds = () => Object.keys(CARDS);
function subjIds(sid){ return SUBJ[sid].lessons.flatMap(l => l.cardIds); }

/* ---------- fila de estudo ---------- */
let Q = { ids:[], i:0, revealed:false, origem:null, feitos:0, inicio:0, acertos:0 };

function buildQueue(cardIds, modo){
  const now = Date.now();
  const learn = [], rev = [], novos = [];
  for (const id of cardIds){
    const s = st(id);
    if (!s) novos.push(id);
    else if (s.due <= now){ (s.rep === 0 ? learn : rev).push(id); }
  }
  if (modo === "tudo"){
    const resto = cardIds.filter(id => st(id) && st(id).due > now);
    return shuffle([...learn, ...rev, ...novos, ...resto]);
  }
  rev.sort((a,b) => st(a).due - st(b).due);
  const lim = CFG.novosPorDia > 0 ? novos.slice(0, CFG.novosPorDia) : novos;
  return [...learn, ...shuffle([...rev, ...lim])];
}
function shuffle(a){
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--){ const j = (Math.random()*(i+1))|0; [a[i],a[j]] = [a[j],a[i]]; }
  return a;
}

/* ============================================================
   RENDER
   ============================================================ */
let VIEW = "home";

/* helpers de animação --------------------------------------- */
const raf = fn => (typeof requestAnimationFrame === "function" ? requestAnimationFrame(fn) : setTimeout(fn, 16));
const reduced = () => typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
function buzz(ms){ try{ navigator.vibrate && navigator.vibrate(ms); }catch(e){} }

/* profundidade das telas, para saber se a transição vai ou volta */
const DEPTH = { home:0, subject:1, study:2 };

function go(view, opts){
  const back = DEPTH[view] < DEPTH[VIEW];
  VIEW = view;
  $$(".view").forEach(v => v.classList.remove("on", "nav-fwd", "nav-back"));
  const el = $("#v-" + view);
  el.classList.add("on");
  window.scrollTo(0, 0);
  if (view === "home")    renderHome();
  if (view === "subject") renderSubject(opts.sid);
  if (view === "study")   startStudy(opts);
  el.classList.add(back ? "nav-back" : "nav-fwd");
}

/* números que sobem de 0 até o valor final */
function countUp(el, to, ms){
  if (!el || reduced() || to <= 0){ if (el) el.textContent = to; return; }
  const t0 = Date.now();
  (function tick(){
    const p = Math.min(1, (Date.now() - t0) / ms);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(to * eased);
    if (p < 1) raf(tick);
  })();
}
function animateNumbers(scope){
  $$("[data-count]", scope).forEach((el, i) => {
    const to = +el.dataset.count;
    el.textContent = "0";
    setTimeout(() => countUp(el, to, 620), 90 + i * 55);
  });
}

/* ---------- saudação ---------- */
function saudacao(){
  const hora = new Date().getHours();
  if (hora < 5)  return "Boa madrugada";
  if (hora < 12) return "Bom dia";
  if (hora < 18) return "Boa tarde";
  return "Boa noite";
}

/* ---------- HOME ---------- */
function renderHome(){
  setTop({ title:"Meus baralhos", sub:"UFF · Instituto de Computação", back:false });

  const ids = allIds();
  const c = countsFor(ids);
  const hoje = P.log[dayKey(Date.now())] || 0;

  let h = `
  <div class="hero">
    <div class="masthead">Anki UFF</div>
    <div class="dateline">
      <span>GPMS</span><span>Redes</span><span>UFF</span>
    </div>
    <h1>${saudacao()}</h1>
    <p>${c.total} cartões · ${c.aprendidos} já aprendidos</p>
  </div>
  <div class="duebar">
    <div class="duechip new"><b data-count="${c.novos}">${c.novos}</b><span>Novos</span></div>
    <div class="duechip rev"><b data-count="${c.revisar}">${c.revisar}</b><span>A revisar</span></div>
    <div class="duechip done"><b data-count="${hoje}">${hoje}</b><span>Hoje</span></div>
  </div>`;

  if (c.novos + c.revisar > 0){
    h += `<div style="margin:16px 0 4px"><button class="btn primary" data-act="studyall">Estudar hoje (${c.revisar + Math.min(c.novos, CFG.novosPorDia || c.novos)})</button></div>`;
  }

  h += `<div class="sectitle">Matérias</div>`;
  SUBJECTS.forEach((s, i) => {
    const sc = countsFor(subjIds(s.id));
    h += `
    <button class="subj rise" data-sid="${s.id}"
      style="--c1:${s.cor};--c2:${s.cor2};animation-delay:${170 + i*70}ms">
      <div class="subj-top">
        <div class="subj-ico">${s.icone}</div>
        <div style="min-width:0">
          <div class="subj-name">${s.nomeLongo}</div>
          <div class="subj-meta">${s.codigo} · ${s.lessons.length} aulas · ${sc.total} cartões</div>
        </div>
        <div class="subj-arrow">›</div>
      </div>
      <div class="subj-foot">
        <div class="bar"><i style="width:${sc.pct}%"></i></div>
        <div class="pct">${sc.pct}%</div>
      </div>
      <div class="badges">
        ${sc.novos   ? `<span class="badge new">${sc.novos} novos</span>` : ""}
        ${sc.revisar ? `<span class="badge rev">${sc.revisar} a revisar</span>` : ""}
        ${!sc.novos && !sc.revisar ? `<span class="badge">em dia</span>` : ""}
        <span class="badge">${sc.maduros} maduros</span>
      </div>
    </button>`;
  });
  const root = $("#v-home");
  root.innerHTML = h;
  animateNumbers(root);
  growBars(root);
}

/* barras crescem de 0 até o valor ao entrar na tela */
function growBars(scope){
  const bars = $$(".bar > i", scope);
  if (!bars.length) return;
  if (reduced()) return;
  bars.forEach(b => { b.dataset.w = b.style.width; b.style.width = "0%"; });
  setTimeout(() => bars.forEach(b => { b.style.width = b.dataset.w; }), 120);
}

/* ---------- MATÉRIA ---------- */
let SUBJ_ATUAL = null;

function renderSubject(sid){
  SUBJ_ATUAL = sid;
  const s = SUBJ[sid];
  setTop({ title:s.nome, sub:s.nomeLongo, back:"home" });
  const sc = countsFor(subjIds(sid));

  let h = `<div class="hero">
    <div class="dateline"><span>${s.codigo}</span><span>${s.lessons.length} aulas</span></div>
    <h1>${s.nomeLongo}</h1>
    <p>${s.prof}</p>
  </div>
  <div class="duebar">
    <div class="duechip new"><b data-count="${sc.novos}">${sc.novos}</b><span>Novos</span></div>
    <div class="duechip rev"><b data-count="${sc.revisar}">${sc.revisar}</b><span>A revisar</span></div>
    <div class="duechip done"><b>${sc.pct}%</b><span>Aprendido</span></div>
  </div>`;

  if (sc.novos + sc.revisar > 0){
    h += `<div style="margin:16px 0 4px"><button class="btn primary" style="--c1:${s.cor};--c2:${s.cor2}"
      data-act="study" data-scope="subject" data-id="${sid}">Estudar a matéria toda</button></div>`;
  }

  h += `<div class="sectitle">Aulas</div>`;
  s.lessons.forEach((l, i) => {
    const lc = countsFor(l.cardIds);
    const pend = lc.novos + lc.revisar;
    h += `
    <div class="lesson rise ${pend ? "" : "done"}"
      style="--c1:${s.cor};--c2:${s.cor2};animation-delay:${180 + i*55}ms">
      <div class="lsn-top">
        <span class="lsn-tag">${l.nome}</span>
        <span class="lsn-title">${l.titulo}</span>
        ${pend ? "" : `<span class="lsn-check">✓</span>`}
      </div>
      <div class="lsn-foot">
        <div class="bar"><i style="width:${lc.pct}%"></i></div>
        <div class="pct">${lc.pct}%</div>
      </div>
      <div class="badges" style="margin-bottom:13px">
        <span class="badge">${lc.total} cartões</span>
        ${lc.novos   ? `<span class="badge new">${lc.novos} novos</span>` : ""}
        ${lc.revisar ? `<span class="badge rev">${lc.revisar} a revisar</span>` : ""}
        ${!pend ? `<span class="badge">em dia</span>` : ""}
      </div>
      <div class="btnrow">
        <button class="btn small ${pend ? "primary" : ""}" style="--c1:${s.cor};--c2:${s.cor2}"
          data-act="study" data-scope="lesson" data-id="${l.id}">${pend ? "Estudar ("+pend+")" : "Estudar"}</button>
        <button class="btn small" data-act="study" data-scope="lesson" data-id="${l.id}" data-modo="tudo">Revisar tudo</button>
      </div>
    </div>`;
  });
  const root = $("#v-subject");
  root.innerHTML = h;
  animateNumbers(root);
  growBars(root);
}

/* ---------- ESTUDO ---------- */
function startStudy(o){
  let ids, titulo, sub, cor = "var(--accent)", cor2 = "var(--accent-2)";
  if (o.scope === "lesson"){
    const l = LESSON[o.id];
    ids = l.cardIds; titulo = l.subject.nome + " · " + l.nome; sub = l.titulo;
    cor = l.subject.cor; cor2 = l.subject.cor2; Q.origem = { view:"subject", sid:l.subject.id };
  } else if (o.scope === "subject"){
    const s = SUBJ[o.id];
    ids = subjIds(o.id); titulo = s.nome; sub = "Todas as aulas";
    cor = s.cor; cor2 = s.cor2; Q.origem = { view:"subject", sid:o.id };
  } else {
    ids = allIds(); titulo = "Revisão geral"; sub = "Todas as matérias";
    Q.origem = { view:"home" };
  }
  Q.ids = buildQueue(ids, o.modo);
  Q.i = 0; Q.revealed = false; Q.feitos = 0; Q.acertos = 0; Q.inicio = Date.now();
  Q.total = Q.ids.length; Q.cor = cor; Q.cor2 = cor2;
  Q.shell = false;
  setTop({ title:titulo, sub, back:"close" });
  drawStudy(true);
}

/* estrutura fixa da sessão — desenhada uma vez, para que a barra
   de progresso e os contadores possam transicionar em vez de piscar */
function studyShell(){
  $("#v-study").innerHTML = `
  <div class="studywrap" style="--c1:${Q.cor};--c2:${Q.cor2}">
    <div class="progline">
      <div class="bar"><i id="s-bar" style="width:0%"></i></div>
      <div class="counts" id="s-counts">
        <i class="c-new">0</i><i class="c-lrn">0</i><i class="c-rev">0</i>
      </div>
    </div>
    <div id="s-card"></div>
    <div class="answers" id="s-ans"></div>
    <div class="studyfoot">
      <button class="linkbtn" data-act="skip">Pular →</button>
      <button class="linkbtn" data-act="reset-card">Zerar este cartão</button>
    </div>
  </div>`;
  Q.shell = true;
}

function drawStudy(animar){
  if (Q.i >= Q.ids.length){ drawDone(); return; }
  if (!Q.shell) studyShell();

  const id = Q.ids[Q.i];
  const c = CARDS[id];
  const s = st(id);
  const estado = !s ? ["state-new","Novo"] : s.rep === 0 ? ["state-lrn","Aprendendo"] : ["state-rev","Revisão"];

  $("#s-card").innerHTML = `
    <div class="card${animar ? " in" : ""}">
      <div class="card-head">
        <span class="chip ${estado[0]}">${estado[1]}</span>
        <span class="chip">${LESSON[c.lessonId].nome}</span>
        ${c.t ? `<span class="chip topic">${c.t}</span>` : ""}
      </div>
      <div class="qa">
        <div class="q">${c.q}</div>
        ${Q.revealed ? `<div class="divider"></div><div class="a">${c.a}</div>` : ""}
      </div>
    </div>`;

  $("#s-ans").innerHTML = Q.revealed ? gradeButtons(id)
    : `<button class="btn primary" data-act="reveal">Mostrar resposta</button>`;

  updateProgress();
}

function gradeButtons(id){
  return `
  <div class="grade">
    <button class="gbtn g1" data-grade="1"><b>Errei</b><span>${preview(id,1)}</span></button>
    <button class="gbtn g2" data-grade="2"><b>Difícil</b><span>${preview(id,2)}</span></button>
    <button class="gbtn g3" data-grade="3"><b>Bom</b><span>${preview(id,3)}</span></button>
    <button class="gbtn g4" data-grade="4"><b>Fácil</b><span>${preview(id,4)}</span></button>
  </div>`;
}

/* atualiza barra e contadores no lugar, com pulso no que mudou */
function updateProgress(){
  let nNew = 0, nLrn = 0, nRev = 0;
  for (let k = Q.i; k < Q.ids.length; k++){
    const x = st(Q.ids[k]);
    if (!x) nNew++; else if (x.rep === 0) nLrn++; else nRev++;
  }
  const pct = Q.total ? Math.round(Q.i / Q.total * 100) : 0;

  const bar = $("#s-bar");
  if (bar){
    const antes = parseFloat(bar.style.width) || 0;
    bar.style.width = pct + "%";
    if (pct > antes){
      bar.classList.remove("shine");
      raf(() => raf(() => bar.classList.add("shine")));
    }
  }
  const box = $("#s-counts");
  if (box){
    [["c-new", nNew], ["c-lrn", nLrn], ["c-rev", nRev]].forEach(([cls, v]) => {
      const el = $("." + cls, box);
      if (!el) return;
      if (el.textContent !== String(v)){
        el.textContent = v;
        el.classList.remove("bump");
        raf(() => raf(() => el.classList.add("bump")));
      }
    });
  }
}

/* revela a resposta sem redesenhar o cartão inteiro */
function revealAnswer(){
  if (Q.revealed) return;
  Q.revealed = true;
  const id = Q.ids[Q.i];
  const qa = $(".qa", $("#s-card"));
  if (qa) qa.insertAdjacentHTML("beforeend",
    `<div class="divider"></div><div class="a">${CARDS[id].a}</div>`);
  $("#s-ans").innerHTML = gradeButtons(id);
  buzz(6);
}

/* anima a saída do cartão antes de avançar */
function slideOut(classe, depois){
  const card = $(".card", $("#s-card"));
  if (!card || reduced()){ depois(); return; }
  card.classList.add(classe);
  setTimeout(depois, classe === "out-left" ? 190 : 165);
}

function drawDone(){
  Q.shell = false;
  const min = Math.max(1, Math.round((Date.now() - Q.inicio) / 60000));
  const taxa = Q.feitos ? Math.round(Q.acertos / Q.feitos * 100) : 0;
  $("#v-study").innerHTML = `
  <div class="sessionend" style="--c1:${Q.cor};--c2:${Q.cor2}">
    <div class="em">${taxa >= 80 ? "🏆" : taxa >= 60 ? "🎖️" : "🔁"}</div>
    <h2>Sessão concluída</h2>
    <p>${taxa >= 80 ? "Placar excelente." : taxa >= 60 ? "Bom desempenho." : "Vale uma nova rodada."}
       ${Q.feitos} ${Q.feitos === 1 ? "cartão revisado" : "cartões revisados"}.</p>
    <div class="stats">
      <div class="stat"><b data-count="${Q.feitos}">${Q.feitos}</b><span>Cartões</span></div>
      <div class="stat"><b>${taxa}%</b><span>Acertos</span></div>
      <div class="stat"><b data-count="${min}">${min}</b><span>Minutos</span></div>
    </div>
    <button class="btn primary" data-act="finish">Voltar</button>
  </div>`;
  animateNumbers($("#v-study"));
  if (Q.feitos > 0 && taxa >= 60) confetti();
  buzz(taxa >= 80 ? [12, 60, 12] : 12);
  if (Q.feitos > 0 && typeof SYNC !== "undefined") SYNC.agora();   // commita a sessão
}

/* confete leve, só com DOM */
function confetti(){
  if (reduced() || typeof document.createElement !== "function") return;
  const cores = [Q.cor, Q.cor2, "#c9971f", "#2c7248", "#1e6f96"];   // recortes de revista
  const box = document.createElement("div");
  box.className = "confetti";
  for (let i = 0; i < 34; i++){
    const p = document.createElement("i");
    p.style.left = Math.random() * 100 + "vw";
    p.style.background = cores[i % cores.length];
    p.style.animationDuration = (1.5 + Math.random() * 1.3) + "s";
    p.style.animationDelay = (Math.random() * 0.4) + "s";
    p.style.setProperty("--rot", Math.round(360 + Math.random() * 720) + "deg");
    p.style.opacity = 0.55 + Math.random() * 0.45;
    box.appendChild(p);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 3600);
}

/* ---------- topbar ---------- */
function setTop({ title, sub, back }){
  const tt = $("#tb-title");
  tt.innerHTML = title + (sub ? `<span class="tb-sub">${sub}</span>` : "");
  tt.classList.remove("swap");
  raf(() => raf(() => tt.classList.add("swap")));
  const b = $("#tb-back");
  if (!back){ b.style.visibility = "hidden"; b.dataset.to = ""; }
  else { b.style.visibility = "visible"; b.dataset.to = back; b.textContent = back === "close" ? "✕" : "‹"; }
}

/* ============================================================
   EVENTOS
   ============================================================ */
document.addEventListener("click", e => {
  const t = e.target.closest("[data-act],[data-sid],[data-grade],#tb-back,#tb-cfg");
  if (!t) return;

  if (t.id === "tb-back"){
    const to = t.dataset.to;
    if (to === "close") finishStudy();
    else go(to);
    return;
  }
  if (t.id === "tb-cfg"){ openSheet(); return; }

  if (t.dataset.sid && !t.dataset.act){ go("subject", { sid:t.dataset.sid }); return; }

  const g = t.dataset.grade;
  if (g){ doGrade(+g); return; }

  switch (t.dataset.act){
    case "studyall": go("study", { scope:"all" }); break;
    case "study":    go("study", { scope:t.dataset.scope, id:t.dataset.id, modo:t.dataset.modo }); break;
    case "reveal":   revealAnswer(); break;
    case "skip":
      slideOut("out-up", () => { Q.i++; Q.revealed = false; drawStudy(true); });
      break;
    case "reset-card": {
      const id = Q.ids[Q.i];
      delete P.cards[id]; save(); Q.revealed = false; drawStudy(true); toast("Cartão zerado");
      break;
    }
    case "finish":   finishStudy(); break;
    case "close-sheet": closeSheet(); break;
    case "export":   doExport(); break;
    case "import":   $("#file").click(); break;
    case "reset-all": doResetAll(); break;
    case "sync-save": {
      SYNC.configurar({
        repo:    $("#sy-repo").value,
        token:   $("#sy-token").value,
        branch:  $("#sy-branch").value,
        caminho: $("#sy-path").value
      });
      const e2 = SYNC.estado();
      if (!e2.repo || !e2.token){ toast("Informe o repositório e o token"); break; }
      if (!/^[\w.-]+\/[\w.-]+$/.test(e2.repo)){ toast("Repositório deve ser usuario/repositorio"); break; }
      toast("Enviando…");
      SYNC.empurrar().then(() => openSheet());
      break;
    }
    case "sync-pull": toast("Baixando…"); SYNC.puxar().then(() => openSheet()); break;
    case "sync-off":  SYNC.esquecer(); openSheet(); toast("Sincronização desligada"); break;
  }
});

const esc = s => String(s || "").replace(/&/g,"&amp;").replace(/</g,"&lt;")
                                .replace(/>/g,"&gt;").replace(/"/g,"&quot;");

function doGrade(g){
  if (Q.travado) return;             // evita duplo toque durante a animação
  Q.travado = true;
  const id = Q.ids[Q.i];
  answer(id, g);
  Q.feitos++;
  if (g >= 3) Q.acertos++;
  if (g === 1) Q.ids.push(id);       // reapresenta no fim da sessão
  buzz(g === 1 ? [8, 40, 8] : 8);
  slideOut(g === 1 ? "out-left" : "out-up", () => {
    Q.i++; Q.revealed = false;
    drawStudy(true);
    Q.travado = false;
  });
}
function finishStudy(){
  const o = Q.origem || { view:"home" };
  go(o.view, { sid:o.sid });
}

/* teclado (desktop) */
document.addEventListener("keydown", e => {
  if (VIEW !== "study" || $("#sheet").classList.contains("on")) return;
  if (e.key === " " || e.key === "Enter"){
    e.preventDefault();
    if (!Q.revealed) revealAnswer(); else doGrade(3);
  }
  if (Q.revealed && ["1","2","3","4"].includes(e.key)) doGrade(+e.key);
  if (e.key === "Escape") finishStudy();
});

/* ---------- sheet de configurações ---------- */
function openSheet(){
  const c = countsFor(allIds());
  const sy = typeof SYNC !== "undefined" ? SYNC.estado() : null;
  const quando = sy && sy.ultimo
    ? new Date(sy.ultimo).toLocaleString("pt-BR", { dateStyle:"short", timeStyle:"short" })
    : "nunca";

  $("#sheet-body").innerHTML = `
    <h3>Ajustes</h3>
    <p class="hint">O progresso fica em JSON no <b>localStorage</b> deste navegador. Para que ele
       acompanhe você em <b>qualquer navegador</b>, ligue a sincronização abaixo: o app grava o
       arquivo <code>${sy ? sy.caminho : "dados/progresso.json"}</code> no seu repositório,
       via API do GitHub.</p>

    <div class="row">
      <div><div class="lbl">Novos por dia</div>
      <div class="sub">Limite de cartões inéditos por sessão</div></div>
      <div class="seg" id="seg-novos">
        ${[10,20,40,0].map(n => `<button data-n="${n}" class="${CFG.novosPorDia===n?"on":""}">${n||"∞"}</button>`).join("")}
      </div>
    </div>

    <div class="row">
      <div><div class="lbl">Tema</div><div class="sub">Papel claro ou noturno</div></div>
      <div class="seg" id="seg-tema">
        <button data-t="claro"  class="${CFG.tema==="claro"?"on":""}">Claro</button>
        <button data-t="escuro" class="${CFG.tema==="escuro"?"on":""}">Escuro</button>
      </div>
    </div>

    <div class="row">
      <div><div class="lbl">Resumo</div>
      <div class="sub">${c.total} cartões · ${c.aprendidos} aprendidos · ${c.maduros} maduros (intervalo ≥ 21 d)</div></div>
    </div>

    <div class="sectitle" style="margin:24px 0 12px">Sincronizar</div>
    <div class="synced ${sy && sy.ativo ? "ativo" : ""}">
      <span class="dot"></span>
      ${sy && sy.ativo ? `Ligado · última sincronização: <b>${quando}</b>`
                       : "Desligado — o progresso fica só neste navegador"}
    </div>

    <div class="field">
      <label for="sy-repo">Repositório</label>
      <input id="sy-repo" type="text" spellcheck="false" autocapitalize="off"
             placeholder="seu-usuario/anki-uff" value="${sy ? esc(sy.repo) : ""}">
    </div>
    <div class="field">
      <label for="sy-token">Token de acesso</label>
      <input id="sy-token" type="password" spellcheck="false" autocomplete="off"
             placeholder="github_pat_…" value="${sy ? esc(sy.token) : ""}">
      <small>Token <b>fine-grained</b>, só neste repositório, com permissão
             <b>Contents: Read and write</b>. Fica salvo apenas neste navegador —
             nunca vai para os arquivos publicados.</small>
    </div>
    <div class="field2">
      <div class="field">
        <label for="sy-branch">Branch</label>
        <input id="sy-branch" type="text" spellcheck="false" value="${sy ? esc(sy.branch) : "main"}">
      </div>
      <div class="field">
        <label for="sy-path">Caminho do JSON</label>
        <input id="sy-path" type="text" spellcheck="false" value="${sy ? esc(sy.caminho) : "dados/progresso.json"}">
      </div>
    </div>

    <div class="btnrow" style="margin-top:12px">
      <button class="btn small primary" data-act="sync-save">Salvar e enviar</button>
      <button class="btn small" data-act="sync-pull">Baixar agora</button>
    </div>
    ${sy && sy.ativo ? `<div style="margin-top:9px">
      <button class="btn small danger" data-act="sync-off">Desligar sincronização</button></div>` : ""}

    <div class="sectitle" style="margin:24px 0 12px">Arquivo local</div>
    <div class="btnrow">
      <button class="btn small" data-act="export">⬇️ Exportar JSON</button>
      <button class="btn small" data-act="import">⬆️ Importar JSON</button>
    </div>
    <div style="margin-top:9px">
      <button class="btn small danger" data-act="reset-all">Apagar todo o progresso</button>
    </div>`;

  $("#seg-novos").onclick = e => {
    const b = e.target.closest("[data-n]"); if (!b) return;
    CFG.novosPorDia = +b.dataset.n; saveCfg(); openSheet();
  };
  $("#seg-tema").onclick = e => {
    const b = e.target.closest("[data-t]"); if (!b) return;
    CFG.tema = b.dataset.t; saveCfg(); applyTheme(); openSheet();
  };
  $("#sheet").classList.add("on");
}
function closeSheet(){ $("#sheet").classList.remove("on"); refresh(); }
function refresh(){ if (VIEW === "home") renderHome(); }

function applyTheme(){
  document.documentElement.setAttribute("data-theme", CFG.tema === "claro" ? "light" : "dark");
  // a barra superior é sticky — vive numa camada composta própria e nem sempre
  // repinta sozinha quando os tokens de cor mudam. Força a repintura.
  const tb = $(".topbar");
  if (tb && tb.style){ tb.style.display = "none"; void tb.offsetHeight; tb.style.display = ""; }
}

/* ---------- export / import / reset ---------- */
function doExport(){
  const data = JSON.stringify(P, null, 2);
  const blob = new Blob([data], { type:"application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `anki-uff-progresso-${dayKey(Date.now())}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
  toast("Progresso exportado");
}
$("#file").addEventListener("change", ev => {
  const f = ev.target.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    try{
      const o = JSON.parse(r.result);
      if (!o || typeof o !== "object" || !o.cards) throw 0;
      P = { version:1, criado:o.criado || new Date().toISOString(), atualizado:null,
            cards:o.cards, log:o.log || {} };
      save(); closeSheet(); go("home"); toast("Progresso importado");
    }catch(e){ toast("Arquivo inválido"); }
  };
  r.readAsText(f);
  ev.target.value = "";
});
function doResetAll(){
  if (!confirm("Apagar TODO o progresso de estudo? Esta ação não pode ser desfeita.")) return;
  P = blank(); save(); closeSheet(); go("home"); toast("Progresso apagado");
}

/* ---------- toast ---------- */
let toastT;
function toast(msg){
  const el = $("#toast");
  el.textContent = msg; el.classList.add("on");
  clearTimeout(toastT);
  toastT = setTimeout(() => el.classList.remove("on"), 2200);
}

/* ---------- ondulação no toque ---------- */
document.addEventListener("pointerdown", e => {
  const el = e.target.closest && e.target.closest(".btn, .gbtn, .subj, .lesson");
  if (!el || reduced()) return;
  const r = el.getBoundingClientRect();
  const d = Math.max(r.width, r.height);
  const ink = document.createElement("span");
  ink.className = "ripple";
  ink.style.width = ink.style.height = d + "px";
  ink.style.left = (e.clientX - r.left - d/2) + "px";
  ink.style.top  = (e.clientY - r.top  - d/2) + "px";
  el.appendChild(ink);
  setTimeout(() => ink.remove(), 620);
}, { passive:true });

/* ---------- init ---------- */
$("#sheet-bg").addEventListener("click", closeSheet);
applyTheme();
go("home");

if (typeof SYNC !== "undefined"){
  SYNC.init({
    get: () => P,
    replace: novo => { P = novo; save(false); },
    onChange: () => { if (VIEW === "home") renderHome();
                      else if (VIEW === "subject") renderSubject(SUBJ_ATUAL); },
    aviso: toast
  });
}
