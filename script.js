(function(){
var $=function(i){return document.getElementById(i)};
function load(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}}
/* configuração pessoal (fica só no navegador) */
function sx(x,m){return typeof x==="string"?x.slice(0,m):""}
function ux(x){x=sx(x,500);return /^https:\/\//i.test(x)?x:""}
function clean(c){c=c||{};return{name:sx(c.name,40),
  drawers:(Array.isArray(c.drawers)?c.drawers:[]).slice(0,12).map(function(d){d=d||{};return{e:sx(d.e,8),n:sx(d.n,40),d:sx(d.d,60),u:ux(d.u)}}),
  apps:(Array.isArray(c.apps)?c.apps:[]).slice(0,20).map(function(a){a=a||{};return{f:sx(a.f,50),a:sx(a.a,50)}}),
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
var VIEWS=["painel","ajustes","foco","relaxar"];
function view(){var h=location.hash.slice(1);if(VIEWS.indexOf(h)<0)h="painel";
  VIEWS.forEach(function(v){var s=$("v-"+v);if(s)s.hidden=v!==h;var t=$("t-"+v);if(t)t.setAttribute("aria-selected",String(v===h));var b=$("b-"+v);if(b)b.setAttribute("aria-selected",String(v===h))}); document.body.className="v-"+h;$("exit").hidden=h!=="relaxar"}
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
["Não fique na ferramenta, foque no objetivo",""],
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
["Não espere a chuva passar; aprenda a dançar encharcado",""],
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
{n:"🧠 Decisões e perguntas",i:[]},{n:"📥 Inbox",i:[]},{n:"🔍 Pesquisar",i:[]},{n:"🇯🇵 Assistir",i:[]},{n:"💵 Dinheiro",i:[]},{n:"❔ Curiosidade e outros",i:[]}
];
var lists=load("jv.lists3",null);
if(!lists){lists=SEED.map(function(l){return{n:l.n,i:l.i.map(function(x){return{t:x[0],d:!!x[1]}})}})}
var openIdx=[0];
var editing=false;
function ib(t,fn){var b=document.createElement("button");b.type="button";b.className="x";b.textContent=t;b.onclick=fn;return b}
function commit(){if(!save("jv.lists3",lists))alert("Sem espaço no navegador! Remova ou diminua o fundo em Ajustes.");render()}
function render(){
  var sel=$("sel"),cur=sel.value||"0";sel.textContent="";
  lists.forEach(function(l,k){var o=document.createElement("option");o.value=k;o.textContent=l.n;sel.appendChild(o)});
  sel.value=cur<lists.length?cur:"0";
  var box=$("lists");box.textContent="";var total=0,done=0;
  lists.forEach(function(l,k){
    var d=document.createElement("details");d.className="lst";d.open=openIdx.indexOf(k)>-1;
    d.ontoggle=function(){var p=openIdx.indexOf(k);if(d.open&&p<0)openIdx.push(k);if(!d.open&&p>-1)openIdx.splice(p,1)};
    var dn=l.i.filter(function(x){return x.d}).length;total+=l.i.length;done+=dn;
    var s=document.createElement("summary");
    var a=document.createElement("span");a.textContent=l.n;
    var c=document.createElement("span");c.className="cnt";c.textContent=dn+"/"+l.i.length;
    s.appendChild(a);s.appendChild(c);d.appendChild(s);
    var ul=document.createElement("ul");
    l.i.forEach(function(it,n){
      var li=document.createElement("li");li.className="it"+(it.d?" done":"");
      var cb=document.createElement("input");cb.type="checkbox";cb.checked=it.d;
      cb.onchange=function(){it.d=cb.checked;commit()};
      var t=document.createElement("span");t.textContent=it.t;
      var x=document.createElement("button");x.type="button";x.className="x";x.textContent="✕";x.setAttribute("aria-label","Apagar");
      x.onclick=function(){l.i=l.i.filter(function(y){return y!==it});commit()};
      li.appendChild(cb);li.appendChild(t);
      if(editing){
        li.appendChild(ib("✏️",function(){var v=prompt("Renomear item",it.t);if(v&&v.trim()){it.t=v.trim().slice(0,300);commit()}}));
        li.appendChild(ib("▲",function(){if(n>0){l.i.splice(n-1,0,l.i.splice(n,1)[0]);commit()}}));
        li.appendChild(ib("▼",function(){if(n<l.i.length-1){l.i.splice(n+1,0,l.i.splice(n,1)[0]);commit()}}));
}
li.appendChild(x);ul.appendChild(li)});
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
$("edt").onclick=function(){editing=!editing;this.textContent=editing?"✅ Pronto":"✏️ Editar";render()};
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
  CFG.apps.forEach(function(a){var r=mk("tr");r.appendChild(mk("td","",a.f));r.appendChild(mk("td","",a.a));t.appendChild(r)});
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

  var d=sec("Qual app para quê");
  CFG.apps.forEach(function(p,k){
    d.appendChild(rw([inp("Função (ex.: 📅 Prazos)",p.f,"",function(v){p.f=v;saveCfg();renderPanel()}),
      inp("App (ex.: 🗓️ Agenda)",p.a,"",function(v){p.a=v;saveCfg();renderPanel()}),
      btn("✕",function(){CFG.apps.splice(k,1);saveCfg();renderPanel();buildSettings()})]))});
  if(CFG.apps.length<20)d.appendChild(btn("+ Adicionar app",function(){CFG.apps.push({f:"",a:""});saveCfg();renderPanel();buildSettings()}));
  d.appendChild(rw([inp("Apps que ficaram de fora (texto livre)",CFG.out,"",function(v){CFG.out=v;saveCfg();renderPanel()})]));
  S.appendChild(d);

  var e=sec("Listas");
  lists.forEach(function(l,k){
    e.appendChild(rw([inp("Nome da lista",l.n,"",function(v){l.n=v;save("jv.lists3",lists);render()}),
      btn("✕",function(){if(l.i.length&&!confirm("Apagar esta lista e os "+l.i.length+" itens dela?"))return;lists.splice(k,1);if(!lists.length)lists.push({n:"📥 Inbox",i:[]});commit();buildSettings()})]))});
  if(lists.length<12)e.appendChild(btn("+ Adicionar lista",function(){lists.push({n:"Nova lista",i:[]});commit();buildSettings()}));
  S.appendChild(e);

  var z=sec("Backup");
  var imp=mk("input");imp.type="file";imp.accept="application/json";imp.hidden=true;
  z.appendChild(rw([btn("⬇️ Exportar tudo",function(){
      var data=JSON.stringify({v:2,cfg:CFG,lists:lists,bg:BG_J,bgS:BG_S},null,2);
      var a=mk("a");a.href=URL.createObjectURL(new Blob([data],{type:"application/json"}));a.download="jade-backup.json";
      document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href)},1000)}),
    btn("⬆️ Importar",function(){imp.click()}),imp]));
  imp.onchange=function(){var fl=imp.files[0];if(!fl)return;var r=new FileReader();
    r.onload=function(){try{
      var o=JSON.parse(r.result);if(!o||!Array.isArray(o.lists))throw 0;
      var ok=o.lists.every(function(l){return l&&typeof l.n==="string"&&Array.isArray(l.i)&&l.i.every(function(x){return x&&typeof x.t==="string"})});
      if(!ok)throw 0;
      if(!confirm("Substituir tudo deste aparelho pelo conteúdo do arquivo?"))return;
      lists=o.lists.slice(0,12).map(function(l){return{n:sx(l.n,60),i:l.i.map(function(x){return{t:sx(x.t,300),d:!!x.d}})}});
      CFG=clean(o.cfg||DEF);saveCfg();
      
      /* as listas passam a ser salvas antes dos fundos */
      save("jv.lists3",lists);

      BG_J=(typeof o.bg==="string"&&o.bg.indexOf("data:image/")===0&&o.bg.length<4500000)?o.bg:"";save("jade.bg",BG_J);
      BG_S=(typeof o.bgS==="string"&&o.bgS.indexOf("data:image/")===0&&o.bgS.length<4500000)?o.bgS:"";save("safira.bg",BG_S);
      
      applyBg();commit();renderPanel();buildSettings();tick()}catch(err){alert("Arquivo inválido")}imp.value=""};
    r.readAsText(fl)};
  z.appendChild(mk("p","note","Tudo fica salvo só neste aparelho. Exporte para levar para outro ou guardar uma cópia."));
  S.appendChild(z)}
applyBg();renderPanel();buildSettings();tick();tdraw();
render();
})();