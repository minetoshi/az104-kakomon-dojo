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
runFile("audit-map.js");
runFile("inventory.js");
runFile("ui-logic.js");

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
  const fixedLetterRe=/(?:選択肢|回答|正解|不正解)\s*[A-FＡ-Ｆ](?:\b|[.．:：、はをが])|(?:^|[\s「（(])[A-FＡ-Ｆ][.．:：]\s*/i;
  assert(!(typeof q.e==="string"&&fixedLetterRe.test(q.e)),"fixed A/B/C label in explanation: "+q.uid);
  assert(Array.isArray(q.ox)&&Array.isArray(q.o)&&q.ox.length===q.o.length,"option explanation count mismatch: "+q.uid);
  if(Array.isArray(q.ox)){
    assert(q.ox.every(x=>typeof x==="string"&&x.trim()),"empty option explanation: "+q.uid);
    q.ox.forEach((x,i)=>assert(!fixedLetterRe.test(x),"fixed A/B/C label in option explanation "+i+": "+q.uid));
  }
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
assert(inv.mastery&&Number(inv.mastery.requiredStreak)===2,"mastery streak must be 2");
assert(inv.mastery&&Number(inv.mastery.total)===366,"mastery total must be 366");
assert(inv.mastery&&Number(inv.mastery.core.count)===260,"core mastery count must be 260");
assert(inv.mastery&&Number(inv.mastery.transfer.count)===100,"transfer mastery count must be 100");
assert(inv.mastery&&Number(inv.mastery.learn.count)===6,"Learn mastery count must be 6");

function studyStageId(q){
  const c=q.cat||"";
  if(c.startsWith("ID/")||c==="監視/コスト")return 1;
  if(c.startsWith("ストレージ"))return 2;
  if(c==="App Service"||c.startsWith("コンテナー"))return 4;
  if(c.startsWith("コンピュート"))return 3;
  if(c.startsWith("ネットワーク"))return 5;
  return 6;
}
const masteryGroups={
  core:qs.filter(q=>[1,2,4].includes(q.set)),
  transfer:qs.filter(q=>q.set===3),
  learn:qs.filter(q=>q.set===5)
};
for(const tier of ["core","transfer","learn"]){
  assert(masteryGroups[tier].length===Number(inv.mastery[tier].count),"mastery "+tier+" count mismatch");
  for(let i=1;i<=6;i++){
    const actual=masteryGroups[tier].filter(q=>studyStageId(q)===i).length;
    const expected=Number(inv.mastery[tier].stageCounts[i]);
    assert(actual===expected,"mastery "+tier+" stage "+i+": "+actual+" expected "+expected);
  }
}
assert(Object.values(inv.mastery.core.stageCounts).reduce((a,b)=>a+Number(b),0)===260,"core mastery stage sum != 260");
assert(Object.values(inv.mastery.transfer.stageCounts).reduce((a,b)=>a+Number(b),0)===100,"transfer mastery stage sum != 100");
assert(Object.values(inv.mastery.learn.stageCounts).reduce((a,b)=>a+Number(b),0)===6,"Learn mastery stage sum != 6");

function domainOf(q){
  const cat=q.cat||"";
  if(cat.startsWith("ID/")||cat==="監視/コスト")return "ID/ガバナンス";
  if(cat.startsWith("ストレージ"))return "ストレージ";
  if(cat.startsWith("コンピュート")||cat.startsWith("コンテナー")||cat==="App Service")return "コンピュート";
  if(cat.startsWith("ネットワーク"))return "ネットワーク";
  return "監視/バックアップ";
}
const mockQuota={"ID/ガバナンス":12,"ストレージ":9,"コンピュート":12,"ネットワーク":10,"監視/バックアップ":7};
assert(Object.values(mockQuota).reduce((a,b)=>a+b,0)===50,"mock quota must sum to 50");
const mockPool=qs.filter(q=>q.set!==3&&q.set!==5).filter(q=>{
  const a=window.AZ104_AUDIT&&window.AZ104_AUDIT.get?window.AZ104_AUDIT.get(q):null;
  return !a||!["legacy-practice","practice-nuance"].includes(a.status);
});
assert(mockPool.length>=50,"mock candidate pool has fewer than 50 questions");
assert(mockPool.every(q=>q.set!==3&&q.set!==5),"mock pool contains excluded set 3/5");
assert(mockPool.every(q=>{const a=window.AZ104_AUDIT.get(q);return !["legacy-practice","practice-nuance"].includes(a.status)}),"mock pool contains legacy/practice-nuance item");
for(const [domain,n] of Object.entries(mockQuota)){
  const count=mockPool.filter(q=>domainOf(q)===domain).length;
  assert(count>=n,"mock domain "+domain+" has "+count+" candidates, needs "+n);
}

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
assert(html.includes("UI_LOGIC.correctAnswerText(q,currentMap)"),"feedback correct-answer text does not use shuffle-safe UI logic");
assert(html.includes("UI_LOGIC.feedbackRows(q,detail,currentMap)"),"feedback option rows do not use shuffle-safe UI logic");
assert(typeof window.AZ104_UI_LOGIC==="object","ui-logic.js failed to load");
const fixtureQ={o:["Action Group","Application Security Group","Availability Set","Management Group"],a:[0],ox:["action","asg","availability","management"]};
const fixtureDetail={options:[
  {index:0,ok:true,text:"action"},
  {index:1,ok:false,text:"asg"},
  {index:2,ok:false,text:"availability"},
  {index:3,ok:false,text:"management"}
]};
const fixtureOrder=[2,1,0,3];
const fixtureRows=window.AZ104_UI_LOGIC.feedbackRows(fixtureQ,fixtureDetail,fixtureOrder);
assert(fixtureRows.map(x=>x.letter+"."+x.option).join("|")==="A.Availability Set|B.Application Security Group|C.Action Group|D.Management Group","shuffle regression: visual labels do not match displayed options");
assert(window.AZ104_UI_LOGIC.correctAnswerText(fixtureQ,fixtureOrder)==="C. Action Group","shuffle regression: correct answer letter must be C after shuffle");
assert(window.AZ104_UI_LOGIC.validOrder(fixtureQ,[0,0,1,2])===false,"duplicate option indexes must be rejected");
assert(window.AZ104_UI_LOGIC.normalizeOrder(fixtureQ,[0,0,1,2]).join(",")==="0,1,2,3","invalid order must fall back to natural order");
assert(!html.includes("Number(r.remainingSec)||100*60"),"zero remaining mock time can reset to 100 minutes");
assert(html.includes("isMock?readinessText(rate,b):studyResultText(rate)"),"study result still uses mock readiness verdict");
assert(html.includes("rankBySmartScore(QUESTIONS)"),"smart ranking still uses unstable comparator scoring");
assert(html.includes("normalizeOrder(q,q._order)"),"session/retry order normalization missing");
assert(html.includes("questionSignature(q)"),"resume question signature missing");
assert(html.includes("sig:questionSignature(q)"),"resume payload does not persist question signature");
assert(html.includes("stale.forEach(uid=>{delete runResult[uid];delete sessionSelections[uid]})"),"stale resume answers are not invalidated");
assert(html.includes("questionSetCount(q)"),"question screen denominator is still hard-coded");
assert(html.includes("const KEY='az104_kakomon_dojo_v5_250'"),"learning-history localStorage key changed");
assert(html.includes("const MOCK_KEY='az104_kakomon_mock_history_v1'"),"mock-history localStorage key changed");
assert(html.includes("const RESUME_KEY='az104_kakomon_resume_v1'"),"resume localStorage key changed");
assert(html.includes("Math.min(100*60,saved)"),"resumed mock timer is not clamped to 100 minutes");
assert(html.includes("const raw=state[q.uid]&&typeof state[q.uid]==='object'"),"learning history values are not normalized defensively");
assert(html.includes("sig=questionSignature(q)"),"persistent learning history is not versioned by question content");
assert(html.includes("migrateHistorySignatures()"),"existing history signatures are not migrated");
assert(html.includes("slice(0,20).map(q=>({uid:q.uid"),"inferred resume is not limited to the next 20 unanswered questions");
assert(html.includes("sessionName()+' / '+(pos+1)+' / '+session.length+'問'"),"study progress label is not aligned to the active session");
assert(html.includes("if(input)input.checked=on"),"native answer input checked state is not synchronized");
assert(html.includes("function save(){try{localStorage.setItem"),"learning history storage failures are not caught");
assert(html.includes("function saveMockHistory(){try{localStorage.setItem"),"mock history storage failures are not caught");
assert(html.includes("Array.isArray(sessionSelections[q.uid])?sessionSelections[q.uid]:[]"),"saved selection values are not guarded as arrays");
assert(html.includes("const MASTERY_STREAK=Number(INVENTORY.mastery&&INVENTORY.mastery.requiredStreak)||2"),"mastery streak is not driven by inventory");
assert(html.includes("function isMastered(q){return history(q).streak>=MASTERY_STREAK}"),"mastery criterion is not two-consecutive-correct based");
assert(html.includes("QUESTIONS.filter(q=>[1,2,4].includes(q.set)&&studyStageId(q)===id)"),"recommended route is not limited to the 260 core questions");
assert(html.includes("masterCoreBtn")&&html.includes("masterTransferBtn")&&html.includes("masterLearnBtn"),"mastery action buttons missing");
assert(html.includes("masterCoreBreakdown")&&html.includes("masterTransferBreakdown")&&html.includes("masterLearnBreakdown"),"mastery breakdown containers missing");
assert(html.includes("function masteryStageStats(tier,id)"),"mastery stage stats function missing");
assert(html.includes("function renderMasteryBreakdown(tier,containerId)"),"mastery breakdown rendering missing");
assert(html.includes("function startMasteryTierStage(tier,id)"),"mastery subcategory start function missing");
assert(html.includes("masteryQuestions(tier).filter(q=>studyStageId(q)===id)"),"mastery subcategory does not filter by stage");
assert(html.includes("start(shuffle(qs.slice()).map(q=>({...q,_order:makeOrder(q,true)})),kind)"),"mastery subcategory is not starting every question in the selected category");
assert(html.includes("function startStudyStage(id){\n  const qs=stageQuestions(id);if(!qs.length)return;\n  start(shuffle(qs.slice()).map(q=>({...q,_order:makeOrder(q,true)}))"),"recommended stage is still limiting questions instead of opening the full category");
assert(html.includes("function startMasteryTier(tier)"),"mastery tier start function missing");
assert(!/function startMasteryTier\(tier\)[\s\S]{0,900}Math\.min\((?:20|limit)/.test(html),"mastery tier still limits question count");
assert(!/function startMasteryTierStage\(tier,id\)[\s\S]{0,900}Math\.min\((?:20|limit)/.test(html),"mastery subcategory still limits question count");
assert(html.includes("masteryUnlocked(tier)"),"mastery subcategory lock check missing");
assert(html.includes("完全マスター条件"),"mastery definition is not visible in study mode");
assert(html.includes('<script src="ui-logic.js"></script>'),"index does not load ui-logic.js");
assert(!html.includes("cats.map(c=>'<option>'+c+'</option>')"),"category values are still injected with innerHTML");
assert(html.includes("q.set!==3&&q.set!==5"),"mock pool no longer excludes similar/Learn-product sets");
assert(html.includes("['legacy-practice','practice-nuance'].includes(a.status)")||html.includes('["legacy-practice","practice-nuance"].includes(a.status)'),"mock pool no longer excludes legacy/practice-nuance questions");
const setMarkers=[...html.matchAll(/data-az104-set="([^"]+)"/g)].map(m=>m[1]);
setMarkers.forEach(k=>assert(inv.sets&&Object.prototype.hasOwnProperty.call(inv.sets,k),"unknown data-az104-set key: "+k));

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
