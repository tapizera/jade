(function(){
var $=function(i){return document.getElementById(i)};
function load(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}}
/* configuração pessoal (fica só no navegador) */
function sx(x,m){return typeof x==="string"?x.slice(0,m):""}
function ux(x){x=sx(x,500);return /^https:\/\//i.test(x)?x:""}
function clean(c){c=c||{};return{name:sx(c.name,40),
  drawers:(Array.isArray(c.drawers)?c.drawers:[]).slice(0,12).map(function(d){d=d||{};return{e:sx(d.e,8),n:sx(d.n,40),d:sx(d.d,60),u:ux(d.u)}}),
  apps:(Array.isArray(c.apps)?c.apps:[]).slice(0,20).map(function(a){a=a||{};return{f:sx(a.f,50),a:sx(a.a,50),u:ux(a.u)}}),
  out:sx(c.out,300)}}
var DEF={name:"",drawers:[{e:"📥",n:"Entrada",d:"Captura rápida",u:""},{e:"📚",n:"Estudos",d:"Cursos e anotações",u:""},{e:"🧠",n:"Ideias",d:"Princípios e reflexões",u:""},{e:"⚙️",n:"Sistema",d:"Regras e apps",u:""}],
  apps:[{f:"📅 Prazos",a:"🗓️ Agenda"},{f:"⏰ Hábitos",a:"📱 App de hábitos"},{f:"🛎️ Lembretes",a:"🔔 App de lembretes"},{f:"📝 Notas",a:"📝 App de notas"}],out:""};
var CFG=clean(load("jade.cfg",null)||DEF);
var BG_J=load("jade.bg","");if(typeof BG_J!=="string"||BG_J.indexOf("data:image/")!==0)BG_J="";
var BG_S=load("safira.bg","");if(typeof BG_S!=="string"||BG_S.indexOf("data:image/")!==0)BG_S="";
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

/* tema */
var root=document.documentElement;
function setTheme(t){root.setAttribute("data-theme",t);$("theme").textContent=t==="jade"?"🫧 Safira":"🌲 Jade";save("jv.theme2",t);applyBg()}
setTheme(load("jv.theme2","jade")==="safira"?"safira":"jade");
$("theme").onclick=function(){setTheme(root.getAttribute("data-theme")==="jade"?"safira":"jade");buildSettings()};
$("b-theme").onclick=$("theme").onclick;

/* abas */ 
var VIEWS=["painel","ajustes","foco","relaxar","cartas"];
function view(){var h=location.hash.slice(1);if(VIEWS.indexOf(h)<0)h="painel";
  VIEWS.forEach(function(v){var s=$("v-"+v);if(s)s.hidden=v!==h;var t=$("t-"+v);if(t)t.setAttribute("aria-selected",String(v===h));var b=$("b-"+v);if(b)b.setAttribute("aria-selected",String(v===h))}); document.body.className="v-"+h+(h==="cartas"?" v-foco":"");$("exit").hidden=h!=="relaxar"}
  VIEWS.forEach(function(v){var t=$("t-"+v);if(t)t.onclick=function(){location.hash=v};var b=$("b-"+v);if(b)b.onclick=function(){location.hash=v}});
function toPainel(){location.hash="painel"}
$("exit").onclick=toPainel;$("fback").onclick=toPainel;
$("b-exit").onclick=toPainel;
$("b-back").onclick=toPainel;
addEventListener("keydown",function(e){if(e.key==="Escape"&&(location.hash==="#relaxar"||location.hash==="#foco"))toPainel()});
addEventListener("hashchange",view);view();

/* relógio */ /*
function tick(){
  var d=new Date(),h=d.getHours();
  $("clk").textContent=d.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});
  $("dt").textContent=d.toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"});
  $("greet").textContent=(h<5?"Boa madrugada":h<12?"Bom dia":h<18?"Boa tarde":"Boa noite")+(CFG.name?", "+CFG.name:"")}
tick();setInterval(tick,20000); 
*/

/* relógio */
function tick(){
  var d=new Date(),h=d.getHours();
  $("clk").textContent=d.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});
  if(matchMedia("(max-width:699px)").matches){
    var wd=d.toLocaleDateString("pt-BR",{weekday:"short"}).replace(".",""),mo=d.toLocaleDateString("pt-BR",{month:"short"}).replace(".","");
    $("dt").textContent=wd+", "+d.getDate()+" "+mo}
  else $("dt").textContent=d.toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"});
  $("greet").textContent=(h<5?"Boa madrugada":h<12?"Bom dia":h<18?"Boa tarde":"Boa noite")+(CFG.name?", "+CFG.name:"")}
tick();setInterval(tick,20000);addEventListener("resize",tick);

/* frases com glitch */
var Q=[
["O descanso só é prazeroso quando ele é o resultado do dever cumprido","Matheus Menucci"],
["Disciplina é regra, não sentimento",""],
["Pra quebrar a inércia, aja sem pensar",""],
["Nada começa perfeito, começa rabiscando",""],
["Aceita a bagunça e elimina fazendo!",""],
["Foco = consequência da falta de distrações",""],
["Não foque na ferramenta, foque no objetivo",""],
["Descansar é um pedaço essencial da produtividade",""],
["Analise oq já funcionou e replique",""],
["Tudo oq vc quer está do outro lado do medo",""],
["Não precisa ser perfeito, basta ser feito",""],
["Quer? Só começa",""],
["Foque no agora, aja agora, o momento perfeito… é agora!","Mark Tillbury"],
["Vai passar, tá passando, e já passou",""],
["A vida é simples",""],
["Seja quem você precisava quando era mais jovem",""],
["Você já sobreviveu a dias piores, siga",""],
["Não espere a chuva passar, aprenda a dançar encharcado",""],
["A vida é uma jornada, não uma corrida",""],
["Seus erros são degraus necessários para melhorar",""],
["Posso não ter chegado lá ainda, mas estou mais perto do que estava ontem",""],
["Descartar é mais fácil do que coletar",""],
["Estudar é saber o quanto eu sei sobre algo","LumberGeek"],
["Produza algo para alguém, assim vc se esforça para garantir o conhecimento","Corre de PhD"],
["Todo mundo quer o topo, mas ninguém quer escalar até lá",""],
["Transforme a dificuldade em diversão",""],
["Os programadores de amanhã são os magos do futuro","Gabe Newell"]
];
var qi=-1;
function setQ(i){$("qt").textContent="“"+Q[i][0]+"”";$("qa").textContent=Q[i][1]?"— "+Q[i][1]:""}
function nextQ(){
  var n;do{n=Math.floor(Math.random()*Q.length)}while(n===qi&&Q.length>1);qi=n;
  var box=$("qt").parentNode;
  if(reduce){setQ(n);return}
  box.classList.remove("gl");void box.offsetWidth;box.classList.add("gl");
  setTimeout(function(){setQ(n)},280);
  setTimeout(function(){box.classList.remove("gl")},700)}
nextQ();setInterval(nextQ,18000);$("qt").onclick=nextQ;

/* listas (cópia do Notion, 15/11) */
var SEED=[
{n:"🧠 Decisões e perguntas",i:[]},{n:"📥 Inbox",i:[]},{n:"🔍 Pesquisar",i:[]},{n:"🎞️ Assistir",i:[]},{n:"💵 Dinheiro",i:[]},{n:"❔ Curiosidade e outros",i:[]}
];
var lists=load("jv.lists3",null);
if(!lists){lists=SEED.map(function(l){return{n:l.n,i:l.i.map(function(x){return{t:x[0],d:!!x[1]}})}})}
var openIdx=[0];
var editing=false;
function ib(t,fn){var b=document.createElement("button");b.type="button";b.className="x";b.textContent=t;b.onclick=fn;return b}
function commit(){if(!save("jv.lists3",lists))alert("Sem espaço no navegador! Remova ou diminua o fundo em Ajustes.");render()}

/* troquei a função render pra subitens e link */

/*function units(l){var u=0,d=0;l.i.forEach(function(it){if(it.s&&it.s.length){u+=it.s.length;d+=it.s.filter(function(y){return y.d}).length}else{u++;if(it.d)d++}});return[u,d]}*/

function units(l){return[l.i.length,l.i.filter(function(x){return x.d}).length]}

function render(){
  var sel=$("sel"),cur=sel.value||"0";sel.textContent="";
  lists.forEach(function(l,k){var o=document.createElement("option");o.value=k;o.textContent=l.n;sel.appendChild(o)});
  sel.value=cur<lists.length?cur:"0";
  var box=$("lists");box.textContent="";var total=0,done=0;
  lists.forEach(function(l,k){
    var d=document.createElement("details");d.className="lst";d.open=openIdx.indexOf(k)>-1;
    d.ontoggle=function(){var p=openIdx.indexOf(k);if(d.open&&p<0)openIdx.push(k);if(!d.open&&p>-1)openIdx.splice(p,1)};
    var u=units(l),dn=u[1],tl=u[0];total+=tl;done+=dn;
    var s=document.createElement("summary");
    var a=document.createElement("span");a.textContent=l.n;
    var c=document.createElement("span");c.className="cnt";

    var pc=tl?Math.round(dn/tl*100):0;
    var c1=document.createElement("span");c1.textContent=dn+"/"+tl;
    var pb=document.createElement("span");pb.className="pb";var pf=document.createElement("i");pf.style.width=pc+"%";pb.appendChild(pf);
    var c2=document.createElement("span");c2.textContent=tl?pc+"%":"";
    c.appendChild(c1);c.appendChild(pb);c.appendChild(c2);

    s.appendChild(a);s.appendChild(c);d.appendChild(s);
    var ul=document.createElement("ul");
    l.i.forEach(function(it,n){
      var li=document.createElement("li");li.className="it"+(it.d?" done":"");
      var cb=document.createElement("input");cb.type="checkbox";cb.checked=it.d;
      cb.onchange=function(){it.d=cb.checked;if(it.s)it.s.forEach(function(y){y.d=cb.checked});commit()};
      var t=document.createElement("span");t.textContent=it.t;
      var x=document.createElement("button");x.type="button";x.className="x";x.textContent="✕";x.setAttribute("aria-label","Apagar");
      x.onclick=function(){if(!confirm("Mover para a lixeira?"))return;trash.unshift({t:it.t,d:it.d,s:it.s,from:l.n,p:n,desc:it.desc});trash=trash.slice(0,200);tsave();trender();l.i=l.i.filter(function(y){return y!==it});commit()};
      li.appendChild(cb);li.appendChild(t);
      if(it.s&&it.s.length){var bg=document.createElement("small");bg.className="sc";bg.textContent=it.s.filter(function(y){return y.d}).length+"/"+it.s.length;li.appendChild(bg)}
      var mb=ib("⋯",function(){amOpen(l,it,n)});mb.setAttribute("aria-label","Mais opções");li.appendChild(mb);
      li.appendChild(x);
      if(it.desc){var ds=document.createElement("div");ds.className="dsc";ds.textContent=it.desc;li.appendChild(ds)}
      if(it.s&&it.s.length){
        var sl=document.createElement("ul");sl.className="sub";
        it.s.forEach(function(y,m){
          var sb=document.createElement("li");sb.className="sb"+(y.d?" done":"");
          var c2=document.createElement("input");c2.type="checkbox";c2.checked=y.d;
          c2.onchange=function(){y.d=c2.checked;it.d=it.s.every(function(z){return z.d});commit()};
          var t2=document.createElement("span");t2.textContent=y.t;
          sb.appendChild(c2);sb.appendChild(t2);
          var sm=ib("⋯",function(){amOpenSub(l,it,y,m)});sm.setAttribute("aria-label","Mais opções");sb.appendChild(sm);
          sb.appendChild(ib("✕",function(){it.s.splice(m,1);if(!it.s.length)delete it.s;else it.d=it.s.every(function(z){return z.d});commit()}));
          sl.appendChild(sb)});
        li.appendChild(sl)}
      ul.appendChild(li)});
    d.appendChild(ul);box.appendChild(d)});
  var open=total-done;
  $("bar").style.strokeDashoffset=490.1*(1-(total?done/total:1));
  $("bar").style.stroke=open?"var(--warm)":"var(--ok)";
  $("num").textContent=open;
  var st=$("status");
  if(!open){st.textContent="Tudo feito";st.className="status good"}
  else{st.textContent=done+" de "+total+" feitos";st.className="status warn"}}
  
$("form").onsubmit=function(e){
  e.preventDefault();var v=$("in").value.trim();if(!v)return;
  var k=parseInt($("sel").value,10)||0;
  lists[k].i.unshift({t:v,d:false});if(openIdx.indexOf(k)<0)openIdx.push(k);
  $("in").value="";commit()};

var trash=load("jv.trash",[]);if(!Array.isArray(trash))trash=[];
function tsave(){save("jv.trash",trash)}
function trender(){
  $("trn").textContent=trash.length;
  var ul=$("trl");ul.textContent="";
  trash.forEach(function(e,n){
    var li=document.createElement("li");li.className="it";
    var t=document.createElement("span");t.textContent=e.t;
    var f=document.createElement("small");f.className="sc";f.textContent=e.from||"";
    li.appendChild(t);li.appendChild(f);
    li.appendChild(ib("↩️",function(){
      var k=lists.map(function(l){return l.n}).indexOf(e.from);if(k<0)k=0;
      var it={t:e.t,d:!!e.d};if(e.s)it.s=e.s;if(e.desc)it.desc=e.desc;
      lists[k].i.splice(Math.min(e.p||0,lists[k].i.length),0,it);trash.splice(n,1);tsave();trender();commit()}));
    li.appendChild(ib("🔥",function(){if(confirm("Apagar de vez?")){trash.splice(n,1);tsave();trender()}}));
    ul.appendChild(li)})}
$("tre").onclick=function(){if(trash.length&&confirm("Esvaziar a lixeira?")){trash=[];tsave();trender()}};
trender();

var MVB=true; /* true = botões (B) · false = select (A) */
var mvL=null,mvN=0;

function amOpenSub(l,it,y,m){
  var b=$("amb");b.textContent="";
  $("amt").textContent=y.t.slice(0,60);
  function add(label,fn,dis){var q=mk("button","pill",label);q.type="button";q.disabled=!!dis;q.onclick=function(){$("am").hidden=true;fn()};b.appendChild(q)}
  add("✏️ Renomear",function(){var v=prompt("Renomear subitem",y.t);if(v&&v.trim()){y.t=v.trim().slice(0,300);commit()}});
  add("▲ Subir",function(){it.s.splice(m-1,0,it.s.splice(m,1)[0]);commit()},m===0);
  add("▼ Descer",function(){it.s.splice(m+1,0,it.s.splice(m,1)[0]);commit()},m===it.s.length-1);
  $("am").hidden=false}

function amOpen(l,it,n){
  var b=$("amb");b.textContent="";
  $("amt").textContent=it.t.slice(0,60);
  function add(label,fn,dis){var q=mk("button","pill",label);q.type="button";q.disabled=!!dis;q.onclick=function(){$("am").hidden=true;fn()};b.appendChild(q)}
  add("✏️ Renomear",function(){var v=prompt("Renomear item",it.t);if(v&&v.trim()){it.t=v.trim().slice(0,300);commit()}});
  add("📝 Descrição",function(){var v=prompt("Descrição do item",it.desc||"");if(v!==null){v=v.trim().slice(0,1000);if(v)it.desc=v;else delete it.desc;commit()}});
  add("📤 Mover para outra lista",function(){mvOpen(l,n)});
  add("➕ Adicionar subitem",function(){var v=prompt("Novo subitem");if(v&&v.trim()){(it.s=it.s||[]).push({t:v.trim().slice(0,300),d:false});it.d=false;commit()}});
  add("▲ Subir",function(){l.i.splice(n-1,0,l.i.splice(n,1)[0]);commit()},n===0);
  add("▼ Descer",function(){l.i.splice(n+1,0,l.i.splice(n,1)[0]);commit()},n===l.i.length-1);
  $("am").hidden=false}
if($("amx"))$("amx").onclick=function(){$("am").hidden=true};

function mvDo(j){
  if(!mvL||isNaN(j)||lists[j]===mvL)return;
  lists[j].i.unshift(mvL.i.splice(mvN,1)[0]);if(openIdx.indexOf(j)<0)openIdx.push(j);
  $("mv").hidden=true;mvL=null;commit()}
function mvOpen(l,n){
  var s=$("mvs"),b=$("mvb"),first=-1;s.textContent="";b.textContent="";
  lists.forEach(function(l2,j){
    var o=document.createElement("option");o.value=j;o.textContent=l2.n;if(l2===l)o.disabled=true;else if(first<0)first=j;s.appendChild(o);
    var q=document.createElement("button");q.type="button";q.className="pill";q.textContent=l2.n;q.disabled=(l2===l);q.onclick=function(){mvDo(j)};b.appendChild(q)});
  if(first<0)return;
  s.value=first;mvL=l;mvN=n;
  s.hidden=$("mvgo").hidden=MVB;b.hidden=!MVB;
  $("mvt").textContent="Mover “"+l.i[n].t.slice(0,40)+"” para:";
  $("mv").hidden=false}
if($("mvgo")){
  $("mvgo").onclick=function(){mvDo(parseInt($("mvs").value,10))};
  $("mvx").onclick=function(){$("mv").hidden=true;mvL=null};
}

var rbusy=false,ritems=[];
function rpool(){var v=$("rsel").value,p=[];
  lists.forEach(function(l,k){if(v==="all"||+v===k)l.i.forEach(function(it){if(!it.d)p.push({t:it.t,l:l.n})})});
  return p}


function rdraw(items,win){
  var x=$("wc").getContext("2d"),s=getComputedStyle(root),n=items.length,a=2*Math.PI/n,R=150,g=function(k){return s.getPropertyValue(k)};
  x.clearRect(0,0,300,300);
  items.forEach(function(it,i){
    var odd=n%2&&i===n-1;
    x.beginPath();x.moveTo(R,R);x.arc(R,R,R,i*a-Math.PI/2,(i+1)*a-Math.PI/2);x.closePath();
    x.fillStyle=i===win?g("--warm"):odd?g("--line"):i%2?g("--track"):g("--acc");x.fill();x.strokeStyle=g("--bg");x.lineWidth=2;x.stroke();
    x.save();x.translate(R,R);x.rotate((i+.5)*a-Math.PI/2);x.textAlign="right";
    x.fillStyle=(i===win||(!odd&&i%2===0))?g("--bg"):g("--ink");x.font="700 15px Nunito,sans-serif";
    x.fillText(it.t.length>16?it.t.slice(0,15)+"…":it.t,R-12,5);x.restore()})}


function rprep(){
  var p=rpool().sort(function(){return Math.random()-.5}),c=$("wc");ritems=p.slice(0,10);
  c.style.transition="none";c.style.transform="rotate(0deg)";void c.offsetWidth;c.style.transition="";
  if(ritems.length)rdraw(ritems);else c.getContext("2d").clearRect(0,0,300,300);
  $("rres").textContent=ritems.length?"Pronto para girar":"Nada pendente 🎉"}
$("roll").onclick=function(){
  var s=$("rsel"),cur=s.value||"all";s.textContent="";
  var o=document.createElement("option");o.value="all";o.textContent="🎡 Todas as listas";s.appendChild(o);
  lists.forEach(function(l,k){var q=document.createElement("option");q.value=k;q.textContent=l.n;s.appendChild(q)});
  s.value=cur;$("rl").hidden=false;rprep()};
$("rsel").onchange=rprep;
$("rx").onclick=function(){$("rl").hidden=true};
$("rgo").onclick=function(){
  if(rbusy)return;rprep();if(!ritems.length)return;
  rbusy=true;var n=ritems.length,w=Math.floor(Math.random()*n),a=360/n;
  $("wc").style.transform="rotate("+(1800+360-(w+.5)*a)+"deg)";$("rres").textContent="🎡 ...";
  setTimeout(function(){rbusy=false;rdraw(ritems,w);$("rres").textContent="👉 "+ritems[w].t+" ("+ritems[w].l+")"},4100)};
  

/* timer */
var tmin=load("jv.tmin",25);if(typeof tmin!=="number"||tmin<1||tmin>180)tmin=25;
var tTotal=tmin*60,tLeft=tTotal,tEnd=0,tRun=null,tDone=false,CIRC=552.92;
function tfmt(s){var m=Math.floor(s/60),x=s%60;return(m<10?"0":"")+m+":"+(x<10?"0":"")+x}
function tdraw(){
  var part=tLeft<tTotal&&tLeft>0;
  $("tt").textContent=tfmt(tLeft);
  $("tbar").style.strokeDashoffset=CIRC*(1-(tTotal?tLeft/tTotal:0));
  $("tgo").textContent=tRun?"Pausar":(part?"Continuar":"Iniciar");
  $("tlabel").textContent=tDone?"Acabou! 🎉":"Foco de "+tmin+" min";
  $("tmin").value=tmin;
  $("mini").textContent=tRun?"⏱️ "+tfmt(tLeft)+" rodando":(part?"⏸️ "+tfmt(tLeft)+" pausado":(tDone?"Acabou! 🎉":"Pronto: "+tmin+" min"));
  document.title=tRun?tfmt(tLeft)+" · Jade":"Jade"}
function beep(){try{var ac=new(window.AudioContext||window.webkitAudioContext)(),o=ac.createOscillator(),g=ac.createGain();
  o.connect(g);g.connect(ac.destination);o.frequency.value=660;g.gain.setValueAtTime(.001,ac.currentTime);
  g.gain.exponentialRampToValueAtTime(.3,ac.currentTime+.05);g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+1.2);
  o.start();o.stop(ac.currentTime+1.3)}catch(e){}
  try{if(navigator.vibrate)navigator.vibrate([200,100,200])}catch(e){}}
function tstop(){clearInterval(tRun);tRun=null}
function tstep(){tLeft=Math.max(0,Math.round((tEnd-Date.now())/1000));if(tLeft<=0){tstop();tDone=true;beep()}tdraw()}
function tstart(){if(tLeft<=0)tLeft=tTotal;tDone=false;tEnd=Date.now()+tLeft*1000;tRun=setInterval(tstep,250);tdraw()}
function setMin(m){m=Math.min(180,Math.max(1,Math.round(Number(m))||25));
  if((tRun||(tLeft<tTotal&&tLeft>0))&&!confirm("Mudar o tempo reinicia o timer. Continuar?")){tdraw();return}
  tstop();tmin=m;tTotal=m*60;tLeft=tTotal;tDone=false;save("jv.tmin",m);tdraw()}
$("tgo").onclick=function(){if(tRun){tstop();tdraw()}else tstart()};
$("trs").onclick=function(){if((tRun||(tLeft<tTotal&&tLeft>0))&&!confirm("Resetar o timer?"))return;tstop();tLeft=tTotal;tDone=false;tdraw()};
$("tmin").onchange=function(){setMin(this.value)};
document.querySelectorAll(".pre").forEach(function(b){b.onclick=function(){setMin(b.dataset.m)}});

/* painel: gavetas e apps */
function mk(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!==undefined)e.textContent=x;return e}
function renderPanel(){
  var g=$("drawers");g.textContent="";
  CFG.drawers.forEach(function(d){
    var c=mk("div","dr");c.setAttribute("role","link");c.tabIndex=0;
    c.appendChild(mk("b","",(d.e?d.e+" ":"")+d.n));c.appendChild(mk("span","",d.d));
    function go(){if(d.u)window.open(d.u,"_blank","noopener");else location.hash="ajustes"}
    c.onclick=go;c.onkeydown=function(e){if(e.key==="Enter")go()};g.appendChild(c)});
  var t=$("apps");t.textContent="";
  CFG.apps.forEach(function(a){var r=mk("tr");r.appendChild(mk("td","",a.f));var c=mk("td");
    if(a.u){var l=mk("a","",a.a);l.href=a.u;l.target="_blank";l.rel="noopener";c.appendChild(l)}else c.textContent=a.a;
    r.appendChild(c);t.appendChild(r)});
  var o=$("out");o.textContent=CFG.out?"❌ Fora: "+CFG.out:"";o.hidden=!CFG.out}
function saveCfg(){save("jade.cfg",CFG)}

/*
function applyBg(){var g="linear-gradient(rgba(6,18,12,.55),rgba(6,18,12,.74))";$("bgimg").style.backgroundImage=BG?g+',url("'+BG+'")':g+',url("fundo.gif")'}
*/
/*
function applyBg(){if(BG)root.style.setProperty("--jbg",'url("'+BG+'")');else root.style.removeProperty("--jbg")}
*/
/*
function applyBg(){
  if(BG_J)root.style.setProperty("--bg-jade",'url("'+BG_J+'")');else root.style.removeProperty("--bg-jade");
  if(BG_S){root.style.setProperty("--bg-safira",'url("'+BG_S+'")');root.style.setProperty("--has-safira","block")}
  else{root.style.removeProperty("--bg-safira");root.style.setProperty("--has-safira","none")}
}*/

function applyBg(){
  var s=root.getAttribute("data-theme")==="safira",img=s?BG_S:BG_J,el=$("bgimg");
  if(img){el.style.backgroundImage=(s?"linear-gradient(rgba(0,2,42,.55),rgba(0,2,42,.78))":"linear-gradient(rgba(6,18,12,.55),rgba(6,18,12,.74))")+',url("'+img+'")';el.style.display="block"}
  else{el.style.backgroundImage="";el.style.display=""}
}

/* ajustes */
function inp(ph,val,cls,fn){var i=mk("input",cls);i.type="text";i.placeholder=ph;i.value=val;i.oninput=function(){fn(i.value)};return i}
function btn(t,fn){var b=mk("button","pill",t);b.type="button";b.onclick=fn;return b}
function rw(kids){var r=mk("div","rw");kids.forEach(function(k){r.appendChild(k)});return r}
function sec(t){var d=mk("div","sec");d.appendChild(mk("h2","",t));return d}
function buildSettings(){
  var S=$("set");S.textContent="";
  var a=sec("Você");
  a.appendChild(rw([inp("Seu nome",CFG.name,"",function(v){CFG.name=v;saveCfg();tick()})]));S.appendChild(a);

  var isSaf=root.getAttribute("data-theme")==="safira";
  var curBG=isSaf?BG_S:BG_J;
  var b=sec("Fundo ("+(isSaf?"tema Safira":"tema Jade")+")");
  var f=mk("input");f.type="file";f.accept="image/*";f.hidden=true;
  f.onchange=function(){var x=f.files[0];if(!x)return;
    if(!/^image\//.test(x.type)){alert("Escolha uma imagem");return}
    if(x.size>3*1024*1024){alert("Imagem grande demais (máximo 3 MB)");return}
    var r=new FileReader();r.onload=function(){
      try{localStorage.setItem(isSaf?"safira.bg":"jade.bg",JSON.stringify(r.result))}catch(e){alert("Não coube no armazenamento do navegador");return}
      if(isSaf)BG_S=r.result;else BG_J=r.result;
      applyBg();pv.src=r.result;pv.hidden=false;st.textContent="Imagem aplicada ✓"};r.onerror=function(){alert("Não consegui ler o arquivo")};r.readAsDataURL(x)};
  var st=mk("p","note",curBG?"Imagem personalizada ativa neste tema.":"Nenhuma imagem personalizada neste tema.");
  var pv=mk("img");pv.alt="Prévia";pv.style.cssText="max-width:180px;border-radius:10px;margin:6px 0";pv.hidden=!curBG;if(curBG)pv.src=curBG;
  b.appendChild(rw([btn("Escolher imagem",function(){f.click()}),btn("Remover imagem",function(){
    if(isSaf){BG_S="";save("safira.bg","")}else{BG_J="";save("jade.bg","")}
    applyBg();pv.hidden=true;st.textContent="Nenhuma imagem personalizada neste tema."}),f]));
  b.appendChild(pv);b.appendChild(st);b.appendChild(mk("p","note","GIF ou imagem de até 3 MB. Cada tema guarda o seu próprio fundo."));S.appendChild(b);

  var g=sec("Gavetas");
  CFG.drawers.forEach(function(w,k){
    g.appendChild(rw([
      inp("😀",w.e,"sm",function(v){w.e=v.slice(0,8);saveCfg();renderPanel()}),
      inp("Nome",w.n,"",function(v){w.n=v.slice(0,40);saveCfg();renderPanel()}),
      inp("Descrição",w.d,"",function(v){w.d=v.slice(0,60);saveCfg();renderPanel()})
    ]));
    g.appendChild(rw([
      inp("Link (https://...)",w.u,"",function(v){w.u=ux(v);saveCfg();renderPanel()}),
      btn("▲",function(){if(k>0){CFG.drawers.splice(k-1,0,CFG.drawers.splice(k,1)[0]);saveCfg();renderPanel();buildSettings()}}),
      btn("▼",function(){if(k<CFG.drawers.length-1){CFG.drawers.splice(k+1,0,CFG.drawers.splice(k,1)[0]);saveCfg();renderPanel();buildSettings()}}),
      btn("✕",function(){CFG.drawers.splice(k,1);saveCfg();renderPanel();buildSettings()})
    ]));
  });
  if(CFG.drawers.length<12)g.appendChild(btn("+ Adicionar gaveta",function(){CFG.drawers.push({e:"📁",n:"Nova gaveta",d:"",u:""});saveCfg();renderPanel();buildSettings()}));
  g.appendChild(mk("p","note","Link opcional, só https. Sem link, tocar na gaveta abre os Ajustes."));
  S.appendChild(g);

  var d=sec("Qual app para quê");
  CFG.apps.forEach(function(p,k){
    d.appendChild(rw([inp("Função (ex.: 📅 Prazos)",p.f,"",function(v){p.f=v;saveCfg();renderPanel()}),
      inp("App (ex.: 🗓️ Agenda)",p.a,"",function(v){p.a=v;saveCfg();renderPanel()})]));
    d.appendChild(rw([inp("Link (https://...)",p.u||"","",function(v){p.u=ux(v);saveCfg();renderPanel()}),
      btn("▲",function(){if(k>0){CFG.apps.splice(k-1,0,CFG.apps.splice(k,1)[0]);saveCfg();renderPanel();buildSettings()}}),
      btn("▼",function(){if(k<CFG.apps.length-1){CFG.apps.splice(k+1,0,CFG.apps.splice(k,1)[0]);saveCfg();renderPanel();buildSettings()}}),
      btn("✕",function(){CFG.apps.splice(k,1);saveCfg();renderPanel();buildSettings()})]))});
  if(CFG.apps.length<20)d.appendChild(btn("+ Adicionar app",function(){CFG.apps.push({f:"",a:""});saveCfg();renderPanel();buildSettings()}));
  d.appendChild(rw([inp("Apps que ficaram de fora (texto livre)",CFG.out,"",function(v){CFG.out=v;saveCfg();renderPanel()})]));
  S.appendChild(d);

function swapL(a,b){var tmp=lists[a];lists[a]=lists[b];lists[b]=tmp;openIdx=openIdx.map(function(x){return x===a?b:(x===b?a:x)});commit();buildSettings()}
  var e=sec("Listas");
  lists.forEach(function(l,k){
    e.appendChild(rw([inp("Nome da lista",l.n,"",function(v){l.n=v;save("jv.lists3",lists);render()}),
      btn("▲",function(){if(k>0)swapL(k,k-1)}),btn("▼",function(){if(k<lists.length-1)swapL(k,k+1)}),btn("✕",function(){if(l.i.length&&!confirm("Apagar esta lista e os "+l.i.length+" itens dela?"))return;lists.splice(k,1);if(!lists.length)lists.push({n:"📥 Inbox",i:[]});commit();buildSettings()})]))});
  if(lists.length<12)e.appendChild(btn("+ Adicionar lista",function(){lists.push({n:"Nova lista",i:[]});commit();buildSettings()}));
  S.appendChild(e);

  var z=sec("Backup");
  var imp=mk("input");imp.type="file";imp.accept="application/json";imp.hidden=true;
  z.appendChild(rw([btn("⬇️ Exportar tudo",function(){
      var data=JSON.stringify({v:2,cfg:CFG,lists:lists,bg:BG_J,bgS:BG_S,cards:kc},null,2);
      var a=mk("a");a.href=URL.createObjectURL(new Blob([data],{type:"application/json"}));a.download="jade-backup.json";
      document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href)},1000)}),
    btn("⬆️ Importar",function(){imp.click()}),imp]));
  imp.onchange=function(){var fl=imp.files[0];if(!fl)return;var r=new FileReader();
    r.onload=function(){try{
      var o=JSON.parse(r.result);if(!o||!Array.isArray(o.lists))throw 0;
      var ok=o.lists.every(function(l){return l&&typeof l.n==="string"&&Array.isArray(l.i)&&l.i.every(function(x){return x&&typeof x.t==="string"})});
      if(!ok)throw 0;
      if(!confirm("Substituir tudo deste aparelho pelo conteúdo do arquivo?"))return;
      lists=o.lists.slice(0,12).map(function(l){return{n:sx(l.n,60),i:l.i.map(function(x){var r={t:sx(x.t,300),d:!!x.d};if(Array.isArray(x.s)&&x.s.length)r.s=x.s.filter(function(y){return y&&typeof y.t==="string"}).slice(0,30).map(function(y){return{t:sx(y.t,300),d:!!y.d}});if(typeof x.desc==="string"&&x.desc)r.desc=sx(x.desc,1000);return r})}});
      CFG=clean(o.cfg||DEF);saveCfg();

      /* salvar as cartas no backup */
      if(Array.isArray(o.cards)){kc=o.cards.filter(function(c){return c&&typeof c.se==="string"&&typeof c.en==="string"}).slice(0,200).map(function(c){return{se:sx(c.se,120),en:sx(c.en,400),w:sx(c.w,80)}});kSave();kReset();ki=0;ke=false;kr=false;kRender()}

      /* as listas passam a ser salvas antes dos fundos */
      save("jv.lists3",lists);

      BG_J=(typeof o.bg==="string"&&o.bg.indexOf("data:image/")===0&&o.bg.length<4500000)?o.bg:"";save("jade.bg",BG_J);
      BG_S=(typeof o.bgS==="string"&&o.bgS.indexOf("data:image/")===0&&o.bgS.length<4500000)?o.bgS:"";save("safira.bg",BG_S);
      
      applyBg();commit();renderPanel();buildSettings();tick()}catch(err){alert("Arquivo inválido")}imp.value=""};
    r.readAsText(fl)};
  z.appendChild(mk("p","note","Tudo fica salvo só neste aparelho. Exporte para levar para outro ou guardar uma cópia."));
  S.appendChild(z)}
/* cartas SE→ENTÃO */
var kc=load("jv.cards",[]);if(!Array.isArray(kc))kc=[];
kc=kc.filter(function(c){return c&&typeof c.se==="string"&&typeof c.en==="string"}).slice(0,200).map(function(c){return{se:sx(c.se,120),en:sx(c.en,400),w:sx(c.w,80)}});
var ki=0,kr=false,ke=false,kn={},km=load("jv.view",0),kfl=false;if([0,1,2].indexOf(km)<0)km=0;
function kSave(){save("jv.cards",kc)}
function kReset(){$("cst").textContent="";kn={}}
function kIn(ph,v,m,fn){var t=mk("textarea","ci");t.placeholder=ph;t.value=v;t.maxLength=m;t.rows=2;t.oninput=function(){fn(t.value);kSave()};t.onclick=function(e){e.stopPropagation()};return t}
function kNew(){if(kc.length>=200)return;kc.push({se:"",en:"",w:""});kReset();ki=kc.length-1;kr=true;ke=true;kRender();var t=$("cst").querySelector("textarea");if(t)t.focus()}

function kFill(e,i,o){
  var c=kc[i],ed=o===0&&ke,h=mk("div","ch"),b=mk("div","cb");e.textContent="";
  h.appendChild(mk("small","","SE"));b.appendChild(mk("small","","ENTÃO"));
  if(ed){h.appendChild(kIn("SE…",c.se,120,function(v){c.se=v}));b.appendChild(kIn("ENTÃO…",c.en,400,function(v){c.en=v}))}
  else{h.appendChild(mk("span","",c.se||"…"));b.appendChild(mk("span","",c.en||"…"))}
  e.className="cc m"+(ed?0:km);
  if(km===2&&!ed){var fc=(o===0&&kr)?b:h;e.appendChild(fc);if(kfl&&o===0)fc.classList.add("fl")}
  else{e.appendChild(h);e.appendChild(b)}
  e.onclick=function(){if(o!==0)kGo(i);else if(km===2&&!ed){kr=!kr;kfl=true;kRender();kfl=false}}}
function kRender(){
  var st=$("cst"),n=kc.length,seen={};
  $("cnum").textContent=n?(ki+1)+"/"+n:"0/0";
  [0,1,-1,2,-2].forEach(function(o){if(!n)return;var i=((ki+o)%n+n)%n;if(seen[i]!==undefined)return;seen[i]=o;
    var e=kn[i];if(!e){e=mk("div","cc");kn[i]=e;st.appendChild(e)}
    e.setAttribute("data-o",o);kFill(e,i,o)});
  Object.keys(kn).forEach(function(k){if(seen[k]===undefined){kn[k].remove();delete kn[k]}});
  $("cedit").hidden=$("cdel").hidden=!n;$("cedit").textContent=ke?"✔️":"✏️"}
function kGo(n){var t=Math.max(1,kc.length);ki=((n%t)+t)%t;kr=false;ke=false;kRender()}
function kFind(from){var q=$("csr").value.trim().toLowerCase();if(!q||!kc.length)return;
  for(var j=0;j<kc.length;j++){var i=(from+j)%kc.length,c=kc[i];
    if((c.se+" "+c.en+" "+c.w).toLowerCase().indexOf(q)>-1){kGo(i);return}}}
$("cback").onclick=toPainel;

/*
$("cprev").onclick=function(){kGo(ki-1)};
$("cnext").onclick=function(){kGo(ki+1)};
*/

$("cnew").onclick=kNew; 
function kV(){$("cview").textContent=["📄","⚖️","🔄"][km];$("cview").title=["Padrão","Metade","Virar"][km]}
$("cview").onclick=function(){km=(km+1)%3;save("jv.view",km);kr=false;kV();kRender()};
kV();
$("cst").onclick=function(){if(!kc.length)kNew()};
$("csr").oninput=function(){kFind(0)};
$("csr").onkeydown=function(e){if(e.key==="Enter"){e.preventDefault();kFind(ki+1)}};
$("cedit").onclick=function(){ke=!ke;kr=true;
  if(!ke){var c=kc[ki];if(c&&!c.se&&!c.en&&!c.w){kc.splice(ki,1);kSave();kReset();if(ki>=kc.length)ki=Math.max(0,kc.length-1)}}
  kRender()};
$("cdel").onclick=function(){if(!kc.length||!confirm("Apagar esta carta?"))return;kc.splice(ki,1);kSave();ke=false;kr=false;kReset();if(ki>=kc.length)ki=Math.max(0,kc.length-1);kRender()};
addEventListener("keydown",function(e){if(location.hash!=="#cartas")return;var t=e.target.tagName;
  if(t==="TEXTAREA"||t==="INPUT"){if(e.key==="Escape")e.target.blur();return}
  if(e.key==="ArrowLeft")kGo(ki-1);else if(e.key==="ArrowRight")kGo(ki+1);else if(e.key==="Escape")toPainel()});
kRender();
applyBg();renderPanel();buildSettings();tick();tdraw();
render();
})();