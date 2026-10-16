import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { spawn } from 'node:child_process';
import http from 'node:http';
import assert from 'node:assert/strict';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const PRIVATE = path.join(ROOT, 'private/pinterest-guide-campaign');
const OUTPUT = path.join(ROOT, 'public/pinterest-guides');
const SOURCES = path.join(HERE, 'artwork');
const P = { cream:'#fff9ee', paper:'#fffefb', petrol:'#086d61', deep:'#075449', ink:'#233c37', mint:'#e6f3e9', sage:'#bdd9c8', coral:'#f4a394', pale:'#fbe4d9', line:'#9ab8aa' };
const escape = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const attrs = o => Object.entries(o).map(([k,v]) => `${k}="${escape(v)}"`).join(' ');
const shape = (tag,o,inside='') => `<${tag} ${attrs(o)}>${inside}</${tag}>`;
const rect = (x,y,w,h,fill,rx=0,stroke='none',sw=6) => shape('rect',{x,y,width:w,height:h,rx,fill,stroke,'stroke-width':sw});
const circle = (cx,cy,r,fill,stroke='none',sw=6) => shape('circle',{cx,cy,r,fill,stroke,'stroke-width':sw});
const ellipse = (cx,cy,rx,ry,fill) => shape('ellipse',{cx,cy,rx,ry,fill});
const line = (x1,y1,x2,y2,stroke=P.deep,sw=7,extra={}) => shape('line',{x1,y1,x2,y2,stroke,'stroke-width':sw,'stroke-linecap':'round',...extra});
const curve = (d,fill='none',stroke=P.deep,sw=7,extra={}) => shape('path',{d,fill,stroke,'stroke-width':sw,'stroke-linecap':'round','stroke-linejoin':'round',...extra});
const group = (inside,transform='',extra={}) => shape('g',{transform,...extra},inside);
const text = (x,y,s,size=36,weight=400,fill=P.deep,anchor='start',extra={}) => shape('text',{x,y,fill,'font-size':size,'font-weight':weight,'text-anchor':anchor,'data-copy':s,...extra},escape(s));
const arrow = (x,y,scale=1,color=P.deep) => group(curve('M0 0H63M43 -20L64 0 43 20','none',color,6),`translate(${x} ${y}) scale(${scale})`);
const spark = (x,y,s=1,c=P.deep) => group(curve('M0 -19V19M-19 0H19M-13 -13L13 13M-13 13L13 -13','none',c,4),`translate(${x} ${y}) scale(${s})`);
const pin = (x,y,fill=P.coral,s=1) => group(curve('M0 50C-15 31-41 10-41-17A41 41 0 0 1 41-17C41 10 15 31 0 50Z',fill,P.deep,6)+circle(0,-17,13,P.cream,P.deep,5),`translate(${x} ${y}) scale(${s})`);
const cooler = (x,y,s=1,color=P.coral) => group(
  curve('M57 47V24C57-14 153-14 153 24V47','none',P.deep,9)+
  rect(0,43,210,164,color,24,P.deep,7)+rect(-4,42,218,43,P.cream,15,P.deep,7)+
  line(20,108,190,108,P.deep,4)+rect(83,66,44,33,P.deep,8)+
  curve('M43 143H68M142 143H167','none',P.deep,5)+
  curve('M-4 79C-39 99-35 174-16 181M214 79C249 99 245 174 226 181','none',P.deep,7),`translate(${x} ${y}) scale(${s})`);
const tote = (x,y,s=1,color=P.petrol) => group(
  curve('M92 77V24C92-66 254-66 254 24V77','none',P.deep,18)+
  curve('M92 77V24C92-66 254-66 254 24V77','none',P.coral,8)+
  curve('M31 57Q173 88 315 57L340 319Q173 350 6 319Z',color,P.deep,7)+
  curve('M35 66L49 313M310 68L296 313','none',P.mint,3)+
  curve('M85 165Q173 191 261 165L253 265Q173 284 93 265Z',P.mint,P.deep,5)+
  line(145,202,201,202,P.deep,5)+line(154,221,192,221,P.deep,4)+
  rect(54,39,26,53,P.coral,6,P.deep,5)+rect(266,39,26,53,P.coral,6,P.deep,5),`translate(${x} ${y}) scale(${s})`);
const house = (x,y,s=1) => group(curve('M0 77L75 10 150 77',P.cream,P.deep,7)+rect(19,77,112,103,P.cream,4,P.deep,7)+rect(63,116,31,64,P.mint,4,P.deep,5)+rect(37,96,20,24,P.coral,2,P.deep,4),`translate(${x} ${y}) scale(${s})`);
const tag = (x,y,s,label,color=P.paper,angle=0,token='circle') => group(
  curve('M0 62L61 0H209V274H0Z',color,P.deep,6)+circle(52,56,12,P.cream,P.deep,5)+
  (token==='circle'?circle(105,133,39,P.coral,P.deep,5):rect(65,94,79,79,P.mint,10,P.deep,5))+
  text(104,232,label,32,500,P.deep,'middle'),`translate(${x} ${y}) rotate(${angle}) scale(${s})`);

function illustration(id) {
  switch(id) {
    case 'tote-route': return ellipse(500,995,420,248,P.mint)+
      curve('M151 801C62 654 364 598 535 699S889 813 814 1100','none',P.line,5,{'stroke-dasharray':'12 19'})+
      pin(166,760,P.coral,.85)+pin(537,681,P.cream,.75)+pin(811,1080,P.coral,.8)+
      ellipse(443,1189,300,25,P.sage)+tote(190,785,1.35)+cooler(670,974,.88,P.coral)+
      curve('M616 842L669 793 696 820 643 869Z',P.coral,P.deep,5)+circle(667,816,5,P.cream)+
      line(624,841,602,897,P.deep,4)+spark(811,723,1.1,P.petrol);
    case 'cooler-map': return ellipse(551,919,346,286,P.cream)+
      curve('M176 742C338 705 670 613 751 752S244 875 307 1053 695 1235 804 1121','none',P.deep,9)+
      curve('M176 742C338 705 670 613 751 752S244 875 307 1053 695 1235 804 1121','none',P.cream,3,{'stroke-dasharray':'2 20'})+
      house(93,612,.92)+circle(176,800,14,P.coral,P.deep,4)+
      cooler(352,849,1.6,P.petrol)+
      line(803,1128,803,1015,P.deep,7)+curve('M803 1019Q850 991 899 1015L882 1078Q846 1054 803 1080Z',P.coral,P.deep,6)+
      circle(745,710,63,P.coral)+text(745,740,'?',86,300,P.deep,'middle')+spark(208,1103,1,P.petrol);
    case 'office-door': return ellipse(503,997,391,231,P.mint)+ellipse(478,1205,339,23,P.sage)+
      rect(204,637,395,556,P.deep,15)+rect(231,665,339,514,P.cream,4)+
      rect(366,880,163,19,P.petrol,7)+line(382,900,376,1039,P.deep,8)+line(513,900,519,1039,P.deep,8)+
      rect(388,766,104,82,P.mint,7,P.deep,5)+line(440,850,440,879,P.deep,6)+line(411,879,470,879,P.deep,6)+
      curve('M237 667L438 725V1190L237 1169Z',P.sage,P.deep,7)+circle(401,955,10,P.deep)+
      line(184,1196,626,1196,P.deep,7)+
      group(circle(0,0,61,P.coral,P.deep,8)+circle(0,0,23,P.cream,P.deep,6)+curve('M44 43L159 158 186 132 161 107 137 130 115 107 140 84 115 60 90 84 62 56',P.coral,P.deep,7),'translate(704 823) rotate(13)')+
      curve('M661 711C682 641 807 633 838 715','none',P.deep,4,{'stroke-dasharray':'8 15'})+spark(789,1119,1.3,P.petrol);
    case 'hands-handover': return ellipse(500,976,423,253,P.petrol)+
      group(curve('M0 0H192Q229 13 237 48L282 77Q301 94 280 110L231 103Q197 126 155 112L0 79Z',P.pale,P.deep,7)+rect(-4,-11,120,119,P.mint,17,P.deep,7),'translate(55 963) rotate(-8)')+
      group(curve('M0 0H192Q229 13 237 48L282 77Q301 94 280 110L231 103Q197 126 155 112L0 79Z',P.pale,P.deep,7)+rect(-4,-11,120,119,P.coral,17,P.deep,7),'translate(943 1091) rotate(171)')+
      cooler(361,882,1.32,P.coral)+
      curve('M125 677H370Q393 677 393 705V774Q393 802 367 802H252L208 843V802H150Q125 802 125 777Z',P.paper,P.deep,5)+text(258,757,'Wer?',47,400,P.deep,'middle')+
      curve('M661 657H840Q871 657 871 688V758Q871 789 839 789H787L748 827V789H661Q635 789 635 758V688Q635 657 661 657Z',P.mint,P.deep,5)+text(753,740,'Wo?',47,400,P.deep,'middle')+
      curve('M213 1185C391 1264 622 1264 805 1187','none',P.deep,4,{'stroke-dasharray':'8 16'})+circle(212,1183,11,P.coral)+circle(805,1185,11,P.coral);
    case 'status-stages': return curve('M179 692C842 594 866 1006 175 1170','none',P.sage,66)+
      group(rect(0,0,502,156,P.coral,39,P.deep,5)+
      curve('M38 70H149Q137 127 93 127T38 70Z',P.cream,P.deep,5)+line(31,69,156,69,P.deep,5)+text(194,96,'Benutzt',47,400),'translate(96 650) rotate(-5)')+
      group(rect(0,0,594,167,P.paper,39,P.deep,5)+
      line(43,115,158,115,P.deep,6)+line(64,91,64,63,P.deep,5)+line(100,91,100,42,P.deep,5)+line(137,91,137,63,P.deep,5)+
      curve('M66 27C55 14 76 6 65-9M102 10C90-2 111-10 101-23M139 27C126 14 150 6 139-9','none',P.petrol,4)+text(202,106,'Trocknet',47,400),'translate(278 864) rotate(3)')+
      group(rect(0,0,514,155,P.mint,39,P.deep,5)+rect(48,62,110,66,P.sage,10,P.deep,5)+rect(40,48,125,22,P.cream,7,P.deep,5)+line(76,86,126,86,P.deep,4)+text(203,98,'Bereit',47,400),'translate(126 1091) rotate(-3)');
    case 'manual-fork': return ellipse(500,922,365,305,P.mint)+
      group(curve('M0 24Q92-22 184 20V224Q92 182 0 228ZM184 20Q276-22 368 24V228Q276 182 184 224Z',P.paper,P.deep,6)+
      line(184,22,184,224,P.deep,5)+line(41,62,135,62,P.line,5)+line(41,92,135,92,P.line,5)+line(41,122,115,122,P.line,5)+
      circle(278,85,28,P.coral)+text(278,102,'?',49,400,P.deep,'middle')+curve('M250 1V39L269 26 288 39V-5',P.petrol,P.deep,3),'translate(316 640) rotate(5)')+
      curve('M490 912C490 971 300 950 267 1022M490 912C490 969 701 956 738 1022','none',P.deep,7)+
      curve('M250 1003L265 1029 288 1005M716 1005L741 1031 754 1003','none',P.deep,7)+
      curve('M125 1060H386Q367 1180 255 1180T125 1060Z',P.coral,P.deep,7)+line(113,1060,398,1060,P.deep,7)+
      curve('M174 1080Q201 1067 227 1080T280 1080T335 1080','none',P.cream,5)+
      rect(627,1085,233,96,P.sage,17,P.deep,6)+rect(615,1064,257,32,P.cream,10,P.deep,6)+

      text(255,1230,'Pflegeweg',36,500,P.deep,'middle')+text(744,1230,'laut Anleitung',36,500,P.deep,'middle');
    case 'consult-tote': return ellipse(511,1021,408,212,P.mint)+ellipse(486,1219,342,22,P.sage)+
      group(rect(0,0,177,237,P.paper,18,P.deep,5)+circle(87,60,25,P.coral,P.deep,4)+text(89,130,'Modell',33,500,P.deep,'middle')+line(39,168,137,168,P.line,5),'translate(159 635) rotate(-12)')+
      group(rect(0,0,184,244,P.mint,18,P.deep,5)+curve('M56 64L113 15 140 44 83 94 46 106Z',P.coral,P.deep,5)+text(92,140,'Notizen',33,500,P.deep,'middle')+line(37,178,147,178,P.line,5),'translate(407 618) rotate(4)')+
      group(rect(0,0,175,244,P.coral,18,P.deep,5)+text(88,94,'?',91,300,P.deep,'middle')+text(88,151,'Fragen',33,500,P.deep,'middle'),'translate(665 672) rotate(14)')+
      tote(276,860,1.14,P.petrol)+
      curve('M195 914C130 959 137 1086 199 1098M815 949C884 1009 861 1104 812 1144','none',P.deep,4,{'stroke-dasharray':'7 14'});
    case 'question-bubbles': return ellipse(502,963,396,260,P.mint)+
      group(curve('M0 63Q0 0 63 0H413Q476 0 476 63V198Q476 261 413 261H197L124 332V261H63Q0 261 0 198Z',P.petrol,P.deep,7)+text(234,198,'?',200,300,P.cream,'middle'),'translate(106 656) rotate(-5)')+
      group(curve('M0 45Q0 0 45 0H262Q307 0 307 45V169Q307 214 262 214H220L253 268 150 214H45Q0 214 0 169Z',P.coral,P.deep,6)+text(152,165,'?',165,300,P.deep,'middle'),'translate(580 859) rotate(7)')+
      group(curve('M0 37Q0 0 37 0H260Q297 0 297 37V158Q297 195 260 195H121L65 241V195H37Q0 195 0 158Z',P.paper,P.deep,6)+text(147,146,'?',140,300,P.deep,'middle'),'translate(229 1010) rotate(-3)')+
      spark(756,701,1.2,P.petrol)+circle(161,1081,10,P.coral)+circle(817,1187,14,P.petrol);
    case 'tags-magnifier': return ellipse(500,949,409,263,P.mint)+
      curve('M244 715C213 622 422 616 438 719M582 714C551 621 760 614 776 718','none',P.deep,6)+
      tag(157,725,1.25,'Modell',P.paper,-8,'circle')+
      tag(569,686,1.25,'Variante',P.coral,9,'square')+
      circle(500,1128,94,P.cream,P.deep,11)+circle(500,1128,78,P.mint,P.petrol,5)+
      line(565,1204,601,1240,P.deep,30)+line(565,1204,601,1240,P.coral,17)+
      text(500,1160,'?',96,300,P.deep,'middle')+spark(137,1101,.9,P.petrol);
    case 'support-envelope': return ellipse(498,962,415,258,P.mint)+
      group(curve('M0 160L295 0 590 160V430H0Z',P.petrol,P.deep,7)+
      rect(67,40,456,297,P.paper,20,P.deep,6)+text(295,211,'?',157,300,P.deep,'middle')+
      curve('M0 162L295 330 590 162V430H0Z',P.coral,P.deep,7)+
      curve('M0 430L212 288M590 430L378 288','none',P.deep,6),'translate(202 756) rotate(-3)')+
      group(rect(0,0,229,93,P.mint,24,P.deep,5)+text(114,61,'Modell',39,500,P.deep,'middle'),'translate(112 676) rotate(-10)')+
      group(rect(0,0,185,93,P.paper,24,P.deep,5)+text(92,61,'Teil',39,500,P.deep,'middle'),'translate(716 780) rotate(11)')+
      curve('M242 1185C347 1267 665 1283 784 1168','none',P.deep,4,{'stroke-dasharray':'7 15'})+arrow(808,1135,.8)+spark(827,656,1,P.petrol);
    default: throw new Error(`Unknown illustration ${id}`);
  }
}

async function copyFontEvidence() {
  const dest = path.join(HERE,'fonts');
  await fs.mkdir(dest,{recursive:true});
  // No acquisition: preserve this repository's existing licensed font bytes.
  const files = ['manrope-latin.woff2','manrope-latin-ext.woff2','OFL-manrope.txt'];
  for (const f of files) {
    try { await fs.access(path.join(dest,f)); }
    catch { await fs.copyFile(path.join(ROOT,'public/fonts',f),path.join(dest,f)); }
  }
  try { await fs.access(path.join(dest,'source-manifest.json')); }
  catch { await fs.copyFile(path.join(ROOT,'docs/font-licenses/manrope/manifest.json'),path.join(dest,'source-manifest.json')); }
  const source = JSON.parse(await fs.readFile(path.join(dest,'source-manifest.json'),'utf8'));
  const recorded = [];
  for (const f of files) {
    const b = await fs.readFile(path.join(dest,f));
    const sha256 = createHash('sha256').update(b).digest('hex');
    const entry = source.assets.find(x=>x.path.endsWith('/'+f));
    if(entry) assert.equal(sha256,entry.sha256,`Font changed: ${f}`);
    recorded.push({file:f,bytes:b.length,sha256,originalRepositoryPath:`public/fonts/${f}`});
  }
  await fs.writeFile(path.join(dest,'evidence.json'),JSON.stringify({family:'Manrope',license:'SIL Open Font License 1.1',weightRange:[300,800],usedWeights:[300,400,500],acquisition:'Copied existing local licensed assets; no new downloads',files:recorded},null,2)+'\n');
  return await fs.readFile(path.join(dest,'manrope-latin.woff2'),'base64');
}

function artwork(d,font) {
  const centered = ['status-stages','question-bubbles'].includes(d.composition);
  const x = centered ? 500 : 72;
  const anchor = centered ? 'middle' : 'start';
  const bg = d.id==='pin01b'?P.mint:P.cream;
  let decoration='';
  if(d.id==='pin02a') decoration = rect(913,0,87,1500,P.mint);
  if(d.id==='pin04a') decoration = curve('M847 0H1000V524Q887 501 847 405Z',P.pale,'none');
  if(d.id==='pin05b') decoration = circle(1014,179,208,P.mint);
  if(d.id==='pin03b') decoration = rect(0,0,18,1500,P.petrol);
  const step = d.id==='pin01b'?115:100;
  const h = d.headline.map((s,i)=>text(x,240+i*step,s,d.fontSize,i===d.headline.length-1?500:300,P.deep,anchor,{'letter-spacing':'-2.9'})).join('');
  const leadY = d.headline.length===2?438:515;
  const lead = d.lead.map((s,i)=>text(x,leadY+i*49,s,38,400,P.ink,anchor,{'letter-spacing':'-.65'})).join('');
  const darkFooter = d.id==='pin01b';
  const footer = (darkFooter?rect(0,1280,1000,220,P.deep):'')+
    rect(72,1300,856,105,darkFooter?P.cream:P.deep,53)+
    text(116,1369,'GRATIS PDF',46,500,darkFooter?P.deep:P.cream)+
    text(595,1367,'Zum Guide',36,400,darkFooter?P.deep:P.cream)+
    arrow(812,1353,.88,darkFooter?P.deep:P.cream)+
    text(500,1460,'Direkt laden · ohne E-Mail',34,400,darkFooter?P.cream:P.deep,'middle',{'letter-spacing':'-.5'});
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1500" viewBox="0 0 1000 1500" role="img" aria-labelledby="title desc"><title id="title">${escape(d.title)}</title><desc id="desc">${escape(d.altText)}</desc><defs><style>@font-face{font-family:Manrope;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:300 800;font-style:normal}text{font-family:Manrope,sans-serif;font-synthesis:none}</style></defs>${rect(0,0,1000,1500,bg)}${decoration}${text(72,66,'milchpumpe-vergleich.de',31,400,P.deep)}${line(72,94,928,94,P.line,1.5)}${text(72,143,d.eyebrow,29,500,P.petrol,'start',{'letter-spacing':'2.3'})}${h}${lead}<g data-illustration="${d.composition}">${illustration(d.composition)}</g>${footer}</svg>`;
}

const wait = ms => new Promise(r=>setTimeout(r,ms));
class CDP {
  constructor(url) { this.ws=new WebSocket(url);this.id=0;this.pending=new Map(); this.ready=new Promise((resolve,reject)=>{this.ws.addEventListener('open',resolve,{once:true});this.ws.addEventListener('error',reject,{once:true})});this.ws.addEventListener('message',e=>{const d=JSON.parse(e.data);if(d.id){const p=this.pending.get(d.id);if(!p)return;this.pending.delete(d.id);if(d.error)p.reject(new Error(JSON.stringify(d.error)));else p.resolve(d.result);}}); }
  async send(method,params={}) {await this.ready;const id=++this.id;return new Promise((resolve,reject)=>{this.pending.set(id,{resolve,reject});this.ws.send(JSON.stringify({id,method,params}));setTimeout(()=>{if(this.pending.has(id)){this.pending.delete(id);reject(new Error('CDP timeout '+method));}},30000).unref();});}
  async eval(expression){const r=await this.send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
  close(){this.ws.close();}
}
async function launch() {
  const candidates=[process.env.PINTEREST_CHROME,'C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].filter(Boolean);
  let exe;
  for(const c of candidates){try{await fs.access(c);exe=c;break;}catch{}}
  if(!exe)throw new Error('Set PINTEREST_CHROME to an existing Chromium browser executable.');
  const profile = path.join(PRIVATE,'.renderer-profile');
  await fs.mkdir(profile,{recursive:true});
  await fs.rm(path.join(profile,'DevToolsActivePort'),{force:true});
  const proc=spawn(exe,['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--disable-background-networking','--disable-extensions','--hide-scrollbars','--remote-debugging-port=0',`--user-data-dir=${profile}`],{stdio:'ignore'});
  let port;
  for(let i=0;i<100;i++){try{port=Number((await fs.readFile(path.join(profile,'DevToolsActivePort'),'utf8')).split('\n')[0]);if(port)break;}catch{} await wait(100);}
  if(!port){proc.kill();throw new Error('Headless browser failed to start');}
  const t=await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`,{method:'PUT'})).json();
  return {proc,cdp:new CDP(t.webSocketDebuggerUrl),exe,profile};
}

async function main() {
  for(const d of [PRIVATE,OUTPUT,SOURCES])await fs.mkdir(d,{recursive:true});
  const data=JSON.parse(await fs.readFile(path.join(HERE,'content.json'),'utf8'));
  assert.equal(data.length,10);assert.equal(new Set(data.map(d=>d.id)).size,10);assert.equal(new Set(data.map(d=>d.composition)).size,10);
  const counts=Object.fromEntries([...new Set(data.map(d=>d.guideSlug))].map(slug=>[slug,data.filter(d=>d.guideSlug===slug).length]));
  assert.equal(Object.keys(counts).length,5);assert.ok(Object.values(counts).every(n=>n===2));
  const font=await copyFontEvidence();
  for(const d of data) {
    const svg=artwork(d,font);await fs.writeFile(path.join(SOURCES,d.id+'.svg'),svg);
    await fs.writeFile(path.join(SOURCES,d.id+'.html'),`<!doctype html><html lang="de"><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(d.title)}</title><style>*{box-sizing:border-box}html,body{margin:0;width:1000px;height:1500px;background:${P.cream}}svg{display:block;width:1000px;height:1500px;overflow:visible}</style>${svg}</html>`);
  }
  const server=http.createServer(async(req,res)=>{try{const name=path.basename(decodeURIComponent(new URL(req.url,'http://localhost').pathname));assert.ok(/^pin\d\d[ab]\.html$/.test(name));res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});res.end(await fs.readFile(path.join(SOURCES,name)));}catch{res.writeHead(404);res.end('Not found');}});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const origin=`http://127.0.0.1:${server.address().port}`;
  const {proc,cdp,exe,profile}=await launch();
  const qa=[];const metadata=[];
  try {
    await cdp.send('Page.enable');await cdp.send('Runtime.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride',{width:1000,height:1500,deviceScaleFactor:1,mobile:false});
    for(const d of data) {
      await cdp.send('Page.navigate',{url:`${origin}/${d.id}.html`});
      for(let n=0;n<50;n++){if(await cdp.eval(`document.readyState==='complete' && !!document.querySelector('svg')`))break;await wait(100);}
      await cdp.eval(`(async()=>{await document.fonts.load('300 96px Manrope');await document.fonts.load('400 38px Manrope');await document.fonts.load('500 86px Manrope');await document.fonts.ready;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));return true})()`);
      const audit=await cdp.eval(`(()=>{const texts=[...document.querySelectorAll('text')].map(e=>{const b=e.getBoundingClientRect();const s=getComputedStyle(e);const c=document.createElement('canvas').getContext('2d');c.font=s.font;const m=c.measureText(e.textContent);return {copy:e.textContent,size:Number.parseFloat(s.fontSize),weight:s.fontWeight,bbox:{x:b.x,y:b.y,width:b.width,height:b.height},actualGlyphHeight:m.actualBoundingBoxAscent+m.actualBoundingBoxDescent}});const invalid=texts.filter(t=>t.bbox.x<32||t.bbox.x+t.bbox.width>968||t.bbox.y<14||t.bbox.y+t.bbox.height>1480);return {width:document.documentElement.clientWidth,height:document.documentElement.clientHeight,scrollWidth:document.documentElement.scrollWidth,fontLoaded:document.fonts.check('300 96px Manrope')&&document.fonts.check('500 86px Manrope'),texts,invalid}})()`);
      assert.equal(audit.width,1000);assert.equal(audit.height,1500);assert.equal(audit.scrollWidth,1000);assert.ok(audit.fontLoaded);assert.deepEqual(audit.invalid,[],`Text clipping ${d.id}: ${JSON.stringify(audit.invalid)}`);
      const shot=await cdp.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false,clip:{x:0,y:0,width:1000,height:1500,scale:1}});
      const image=Buffer.from(shot.data,'base64');const imagePath=`public/pinterest-guides/${d.id}.png`;
      await fs.writeFile(path.join(ROOT,imagePath),image);
      const landing=`https://milchpumpe-vergleich.de/gratis-guides/${d.guideSlug}/`;
      const url=new URL(landing);for(const [k,v] of Object.entries({utm_source:'pinterest',utm_medium:'organic',utm_campaign:'gratis_guides',utm_content:d.id}))url.searchParams.set(k,v);
      metadata.push({id:d.id,guideSlug:d.guideSlug,title:d.title,description:d.description,altText:d.altText,landingUrl:landing,link:url.href,imagePath,width:1000,height:1500,dimensions:'1000x1500',SHA256:createHash('sha256').update(image).digest('hex'),status:'not-published'});
      qa.push({id:d.id,composition:d.composition,...audit});
      console.log(`${d.id}: ${image.length} PNG bytes; fonts loaded; ${audit.texts.length} text elements within safety bounds`);
    }
    assert.equal(new Set(metadata.map(d=>d.SHA256)).size,10,'PNG hashes must be unique');
    for(const p of metadata){const u=new URL(p.link);assert.equal(u.searchParams.size,4);assert.equal(u.searchParams.get('utm_content'),p.id);assert.equal(p.status,'not-published');assert.ok(p.title.length<=100);}
    const manifest={campaign:'gratis_guides',status:'not-published',distribution:'Direct free full PDF, without email; newsletter optional',imageCount:metadata.length,perGuide:counts,editorialCsvNotice:'Editorial handoff, not a claimed Pinterest native bulk-import schema.',pins:metadata};
    await fs.writeFile(path.join(PRIVATE,'campaign.json'),JSON.stringify(manifest,null,2)+'\n');
    const keys=Object.keys(metadata[0]);const csv=s=>'"'+String(s).replaceAll('"','""')+'"';
    await fs.writeFile(path.join(PRIVATE,'editorial.csv'),'\uFEFF'+[keys.map(csv).join(','),...metadata.map(p=>keys.map(k=>csv(p[k])).join(','))].join('\r\n')+'\r\n');
    await fs.writeFile(path.join(PRIVATE,'render-qa.json'),JSON.stringify({browserExecutable:exe,renderer:'Chromium CDP screenshot of self-contained original SVG; no remote resources',dimensions:{width:1000,height:1500},guideCounts:counts,uniqueIds:metadata.length,uniqueImageHashes:new Set(metadata.map(d=>d.SHA256)).size,textSafetyBounds:{left:32,right:968,top:14,bottom:1480},checks:qa},null,2)+'\n');
    console.log(`Verified ${metadata.length} unique IDs/images; two per guide. Metadata written.`);
  } finally {
    cdp.close();proc.kill();server.close();
    // Dedicated disposable profile, never the user's browser profile.
    for(let i=0;i<15;i++){try{await fs.rm(profile,{recursive:true,force:true});break;}catch{await wait(200);}}
  }
}
await main();
