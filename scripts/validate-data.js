const fs=require("fs");
const path=require("path");
const vm=require("vm");

const ROOT=path.resolve(__dirname,"..");
const errors=[];
const warnings=[];
const assert=(cond,msg)=>{if(!cond)errors.push(msg)};
const warn=(cond,msg)=>{if(!cond)warnings.push(msg)};
const read=p=>fs.readFileSync(path.join(ROOT,p),"utf8");
const naturalSort=(a,b)=>a.localeCompare(b,undefined,{numeric:true,sensitivity:"base"});

global.window={AZ104_QUESTIONS:[]};
global.document={readyState:"complete",querySelectorAll:()=>[]};
global.localStorage={getItem:()=>null,setItem:()=>{},removeItem:()=>{}};

function runFile(rel){vm.runInThisContext(read(rel),{filename:rel})}
function filesIn(dir){
  return fs.readdirSync(path.join(ROOT,dir))
    .filter(x=>x.endsWith(".js"))
    .sort(naturalSort)
    .map(x=>dir+"/"+x);
}

const questionFiles=[
  ...filesIn("questions/set-01"),
  ...filesIn("questions/set-02"),
  ...filesIn("questions/similar"),
  ...filesIn("questions/coverage"),
  ...filesIn("questions/learn-products")
];
questionFiles.forEach(runFile);
runFile("learn-map.js");
runFile("explanation-helper.js");
runFile("question-normalizer.js");
runFile("inventory.js");

const qs=window.AZ104_QUESTIONS||[];
const inv=window.AZ104_INVENTORY||{};
assert(qs.length===366,"total questions must be 366, got "+qs.length);
assert(qs.length===inv.total,"question total differs from inventory total");

const uidSeen=new Set();
const textMap=new Map();
const setCounts={1:0,2:0,3:0,4:0,5:0};
const ids={1:new Set(),2:new Set(),3:new Set(),4:new Set(),5:new Set()};
const baseIds=new Set();

for(const q of qs){
  assert(q&&typeof q==="object","question must be an object");
  assert(typeof q.uid==="string"&&q.uid.trim(),"missing uid");
  if(typeof q.uid==="string"){
    assert(!uidSeen.has(q.uid),"duplicate uid: "+q.uid);
    uidSeen.add(q.uid);
  }
  assert([1,2,3,4,5].includes(q.set),"invalid set for "+q.uid+": "+q.set);
  if([1,2,3,4,5].includes(q.set)){
    setCounts[q.set]++;
    assert(Number.isInteger(q.id)&&q.id>=1,"invalid id for "+q.uid);
    if(Number.isInteger(q.id)){
      assert(!ids[q.set].has(q.id),"duplicate id in set "+q.set+": "+q.id);
      ids[q.set].add(q.id);
    }
  }
  assert(typeof q.q==="string"&&q.q.trim().length>0,"empty question text: "+q.uid);
  assert(typeof q.cat==="string"&&q.cat.trim().length>0,"missing category: "+q.uid);
  assert(Array.isArray(q.o)&&q.o.length>=2,"invalid options: "+q.uid);
  if(Array.isArray(q.o)){
    const normalized=q.o.map(x=>String(x).trim());
    assert(normalized.every(Boolean),"empty option: "+q.uid);
    assert(new Set(normalized).size===normalized.length,"duplicate option text: "+q.uid);
  }
  assert(Array.isArray(q.a)&&q.a.length>=1,"missing correct answer: "+q.uid);
  if(Array.isArray(q.a)&&Array.isArray(q.o)){
    assert(new Set(q.a).size===q.a.length,"duplicate correct index: "+q.uid);
    q.a.forEach(i=>assert(Number.isInteger(i)&&i>=0&&i<q.o.length,"out-of-range correct index "+i+": "+q.uid));
    if(q.multi===true)assert(q.a.length>=2,"multi=true but fewer than 2 answers: "+q.uid);
    if(q.multi!==true)assert(q.a.length===1,"multiple answers without multi=true: "+q.uid);
  }
  assert(typeof q.e==="string"&&q.e.trim().length>0,"missing explanation: "+q.uid);
  assert(Array.isArray(q.ox)&&Array.isArray(q.o)&&q.ox.length===q.o.length,"option explanation count mismatch: "+q.uid);
  if(Array.isArray(q.ox))assert(q.ox.every(x=>typeof x==="string"&&x.trim()),"empty option explanation: "+q.uid);
  assert(Array.isArray(q.learn)&&q.learn.length>0,"missing Learn links: "+q.uid);
  if(Array.isArray(q.learn)){
    q.learn.forEach((x,i)=>{
      assert(x&&typeof x.title==="string"&&x.title.trim(),"missing Learn title "+i+": "+q.uid);
      assert(x&&typeof x.url==="string"&&/^https:\/\//.test(x.url),"invalid Learn URL "+i+": "+q.uid);
    });
  }
  if(window.AZ104_EXPLAIN&&typeof window.AZ104_EXPLAIN.build==="function"){
    const d=window.AZ104_EXPLAIN.build(q);
    assert(d&&Array.isArray(d.options)&&d.options.length===q.o.length,"generated explanation mismatch: "+q.uid);
    if(d&&Array.isArray(d.options)){
      const di=d.options.map(x=>x.index);
      assert(new Set(di).size===q.o.length&&di.every(i=>Number.isInteger(i)&&i>=0&&i<q.o.length),"generated explanation indexes invalid: "+q.uid);
      d.options.forEach(x=>assert(Boolean(x.ok)===q.a.includes(x.index),"generated explanation correctness mismatch: "+q.uid+" index "+x.index));
    }
  }
  if(q.set===3){
    assert(Number.isInteger(q.baseId)&&q.baseId>=1&&q.baseId<=100,"invalid similar baseId: "+q.uid);
    if(Number.isInteger(q.baseId)){
      assert(!baseIds.has(q.baseId),"duplicate similar baseId: "+q.baseId);
      baseIds.add(q.baseId);
    }
  }
  const key=typeof q.q==="string"?q.q.replace(/\s+/g," ").trim():"";
  if(key){
    if(textMap.has(key))warnings.push("exact duplicate question text: "+textMap.get(key)+" / "+q.uid);
    else textMap.set(key,q.uid);
  }
}

const expectedSetCounts={1:50,2:50,3:100,4:160,5:6};
for(const s of [1,2,3,4,5]){
  assert(setCounts[s]===expectedSetCounts[s],"set "+s+" count: "+setCounts[s]+" expected "+expectedSetCounts[s]);
  assert(ids[s].size===expectedSetCounts[s],"set "+s+" unique id count mismatch");
  for(let i=1;i<=expectedSetCounts[s];i++)assert(ids[s].has(i),"missing id set "+s+" #"+i);
}
for(let i=1;i<=100;i++)assert(baseIds.has(i),"missing similar baseId "+i);

assert(inv.sets&&inv.sets.set1===50&&inv.sets.set2===50&&inv.sets.similar===100&&inv.sets.coverage===160&&inv.sets.learnProducts===6,"inventory set counts invalid");
assert(inv.chapters&&Object.values(inv.chapters).reduce((s,x)=>s+Number(x.count||0),0)===366,"inventory chapter sum != 366");
assert(inv.studyStages&&Object.values(inv.studyStages).reduce((s,x)=>s+Number(x.count||0),0)===366,"inventory study-stage sum != 366");
if(inv.chapterBySet){
  const rows={1:50,2:50,3:100,4:160,5:6};
  for(const s of [1,2,3,4,5])assert(Object.values(inv.chapterBySet[s]||{}).reduce((a,b)=>a+Number(b||0),0)===rows[s],"inventory chapterBySet row "+s+" invalid");
  for(let ch=1;ch<=11;ch++){
    let n=0;for(const s of [1,2,3,4,5])n+=Number((inv.chapterBySet[s]||{})[ch]||0);
    assert(n===Number(inv.chapters[ch].count),"inventory chapterBySet column "+ch+" invalid");
  }
}

const html=read("index.html");

const htmlFiles=fs.readdirSync(ROOT).filter(x=>x.endsWith(".html")).sort(naturalSort);
for(const file of htmlFiles){
  const page=read(file);
  const pageIds=[...page.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);
  const pageDup=pageIds.filter((x,i,a)=>a.indexOf(x)!==i);
  assert(pageDup.length===0,file+" duplicate DOM ids: "+[...new Set(pageDup)].join(", "));
  const pageIdSet=new Set(pageIds);
  const dollarRefs=[...page.matchAll(/\$\('([^']+)'\)/g)].map(m=>m[1]);
  const gebiRefs=[...page.matchAll(/getElementById\(['"]([^'"]+)['"]\)/g)].map(m=>m[1]);
  const missing=[...new Set([...dollarRefs,...gebiRefs].filter(x=>!pageIdSet.has(x)))];
  assert(missing.length===0,file+" missing DOM refs: "+missing.join(", "));
  const scripts=[...page.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(x=>x.trim());
  scripts.forEach((code,i)=>{try{new Function(code)}catch(e){errors.push(file+" inline script syntax #"+i+": "+e.message)}});
  const localRefs=[
    ...[...page.matchAll(/(?:href|src)="([^"]+)"/g)].map(m=>m[1])
  ].filter(x=>x&&!/^(?:https?:|mailto:|tel:|#|javascript:|data:)/.test(x));
  for(const ref of localRefs){
    const clean=ref.split("#")[0].split("?")[0];
    if(!clean)continue;
    assert(fs.existsSync(path.resolve(ROOT,path.dirname(file),clean)),file+" broken local reference: "+ref);
  }
  const stale=[...page.matchAll(/(?:250|290|340|345|350|355|360)\s*問/g)].map(m=>m[0]);
  assert(stale.length===0,file+" stale question-count labels: "+[...new Set(stale)].join(", "));
}

const idsHtml=[...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);
const dupIds=idsHtml.filter((x,i,a)=>a.indexOf(x)!==i);
assert(dupIds.length===0,"duplicate DOM ids: "+[...new Set(dupIds)].join(", "));
const idSet=new Set(idsHtml);
const refs=[...html.matchAll(/\$\('([^']+)'\)/g)].map(m=>m[1]);
const missingRefs=[...new Set(refs.filter(x=>!idSet.has(x)))];
assert(missingRefs.length===0,"missing DOM refs: "+missingRefs.join(", "));

const srcs=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
const duplicateSrc=srcs.filter((x,i,a)=>a.indexOf(x)!==i);
assert(duplicateSrc.length===0,"duplicate script src: "+[...new Set(duplicateSrc)].join(", "));
srcs.forEach(src=>assert(fs.existsSync(path.join(ROOT,src)),"missing script file: "+src));
const loadedQuestionSrcs=srcs.filter(x=>x.startsWith("questions/"));
const expectedQuestionSrcs=questionFiles;
assert(loadedQuestionSrcs.length===expectedQuestionSrcs.length,"loaded question file count mismatch");
expectedQuestionSrcs.forEach(x=>assert(loadedQuestionSrcs.includes(x),"question file not loaded by index: "+x));
loadedQuestionSrcs.forEach(x=>assert(expectedQuestionSrcs.includes(x),"unexpected question file loaded by index: "+x));

const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(x=>x.trim());
inline.forEach((code,i)=>{try{new Function(code)}catch(e){errors.push("inline script syntax #"+i+": "+e.message)}});

assert(!html.includes("String.fromCharCode(65+x.index)"),"feedback still labels original option index instead of visual order");
assert(html.includes("currentMap.forEach((orig,visual)=>"),"feedback does not iterate visual option order");
assert(html.includes("currentMap.filter(i=>ans.includes(i)).map(i=>displayedLetter(i)+'. '+q.o[i])"),"correct-answer text is not mapped to visual letters");
assert(html.includes("new Set(order).size===natural.length"),"resume/order validation does not reject duplicate option indexes");
assert(!html.includes("Number(r.remainingSec)||100*60"),"zero remaining mock time can reset to 100 minutes");
assert(html.includes("isMock?readinessText(rate,b):studyResultText(rate)"),"study result still uses mock readiness verdict");
assert(html.includes("rankBySmartScore(QUESTIONS)"),"smart ranking still uses unstable comparator scoring");
assert(html.includes("normalizeOrder(q,q._order)"),"session/retry order normalization missing");

if(warnings.length){
  console.warn("WARNINGS");
  warnings.forEach(x=>console.warn("- "+x));
}
if(errors.length){
  console.error("VALIDATION FAILED ("+errors.length+")");
  errors.forEach(x=>console.error("- "+x));
  process.exit(1);
}
console.log("VALIDATION OK");
console.log("questions:",qs.length);
console.log("sets:",JSON.stringify(setCounts));
console.log("uids:",uidSeen.size);
console.log("question files:",questionFiles.length);
console.log("DOM ids:",idsHtml.length);
console.log("warnings:",warnings.length);
