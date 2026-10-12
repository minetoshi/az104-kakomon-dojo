import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT=path.resolve(process.cwd());
globalThis.window={AZ104_QUESTIONS:[]};
globalThis.document={readyState:"complete",querySelectorAll:()=>[]};
globalThis.localStorage={getItem:()=>null,setItem:()=>{},removeItem:()=>{}};

const read=rel=>fs.readFileSync(path.join(ROOT,rel),"utf8");
const run=rel=>vm.runInThisContext(read(rel),{filename:rel});
const filesIn=dir=>fs.readdirSync(path.join(ROOT,dir))
  .filter(x=>x.endsWith(".js"))
  .sort((a,b)=>a.localeCompare(b,undefined,{numeric:true,sensitivity:"base"}))
  .map(x=>dir+"/"+x);

[
  ...filesIn("questions/set-01"),
  ...filesIn("questions/set-02"),
  ...filesIn("questions/similar"),
  ...filesIn("questions/coverage"),
  ...filesIn("questions/learn-products")
].forEach(run);
run("learn-map.js");
run("explanation-helper.js");
run("question-normalizer.js");
run("audit-map.js");
run("glossary.js");

const refs=new Map();
function add(url,where){
  if(typeof url!=="string"||!/^https:\/\//.test(url))return;
  const host=new URL(url).hostname;
  if(host!=="learn.microsoft.com"&&host!=="microsoftlearning.github.io")return;
  if(!refs.has(url))refs.set(url,new Set());
  refs.get(url).add(where);
}

for(const q of window.AZ104_QUESTIONS||[]){
  for(const x of q.learn||[])add(x&&x.url,"question:"+q.uid);
  const a=window.AZ104_AUDIT&&window.AZ104_AUDIT.get?window.AZ104_AUDIT.get(q):null;
  for(const x of (a&&a.extra)||[])add(x&&x.url,"audit:"+q.uid);
}
for(const t of (window.AZ104_GLOSSARY&&window.AZ104_GLOSSARY.terms)||[])add(t.source&&t.source.url,"glossary:"+t.id);

const urls=[...refs.keys()].sort();
console.log("Checking",urls.length,"unique official URLs");

const DEAD=new Set([400,404,405,410,451]);
const SOFT=new Set([401,403,408,425,429]);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

async function probe(url){
  let last={kind:"warning",status:0,message:"unknown"};
  for(let attempt=1;attempt<=3;attempt++){
    const ac=new AbortController();
    const timer=setTimeout(()=>ac.abort(),15000);
    try{
      const res=await fetch(url,{
        method:"GET",
        redirect:"follow",
        signal:ac.signal,
        headers:{
          "user-agent":"az104-kakomon-dojo-link-check/1.0",
          "accept":"text/html,application/xhtml+xml"
        }
      });
      clearTimeout(timer);
      try{await res.body?.cancel()}catch{}
      if(res.status>=200&&res.status<400)return {kind:"ok",status:res.status,finalUrl:res.url};
      if(DEAD.has(res.status))return {kind:"dead",status:res.status,finalUrl:res.url};
      if(SOFT.has(res.status)){last={kind:"warning",status:res.status,finalUrl:res.url,message:"rate/auth response"}}
      else if(res.status>=500){last={kind:"warning",status:res.status,finalUrl:res.url,message:"server error"}}
      else return {kind:"dead",status:res.status,finalUrl:res.url};
    }catch(e){
      clearTimeout(timer);
      last={kind:"warning",status:0,message:e&&e.name==="AbortError"?"timeout":String(e&&e.message||e)};
    }
    if(attempt<3)await sleep(700*attempt);
  }
  return last;
}

const results=[];
let cursor=0;
async function worker(){
  while(true){
    const i=cursor++;
    if(i>=urls.length)return;
    const url=urls[i],result=await probe(url);
    results[i]={url,...result,refs:[...refs.get(url)]};
    const prefix=result.kind==="ok"?"OK":result.kind==="dead"?"DEAD":"WARN";
    console.log(prefix,result.status||"-",url,result.finalUrl&&result.finalUrl!==url?"-> "+result.finalUrl:"");
  }
}
await Promise.all(Array.from({length:8},()=>worker()));

const dead=results.filter(x=>x.kind==="dead");
const warnings=results.filter(x=>x.kind==="warning");
console.log("\nSummary:",{total:results.length,ok:results.length-dead.length-warnings.length,dead:dead.length,warnings:warnings.length});
if(warnings.length){
  console.warn("\nTransient/warning responses:");
  for(const x of warnings)console.warn("-",x.status||"-",x.url,"used by",x.refs.join(", "));
}
const checkedAt=new Date().toISOString();
const redirects=results.filter(x=>x.kind==="ok"&&x.finalUrl&&x.finalUrl!==x.url).length;
const questionUidToUrls={};
for(const x of results){
  for(const r of x.refs){
    if(!r.startsWith("question:"))continue;
    const uid=r.slice("question:".length);
    (questionUidToUrls[uid]??=[]).push(x.url);
  }
}
const report={
  schemaVersion:1,
  checkedAt,
  summary:{
    totalUniqueUrls:results.length,
    ok:results.length-dead.length-warnings.length,
    dead:dead.length,
    warnings:warnings.length,
    redirects,
    referencedQuestionUids:Object.keys(questionUidToUrls).length
  },
  results:results.map(x=>({
    url:x.url,
    kind:x.kind,
    httpStatus:x.status,
    finalUrl:x.finalUrl??null,
    message:x.message??null,
    checkedAt,
    refs:x.refs,
    questionUids:x.refs.filter(r=>r.startsWith("question:")).map(r=>r.slice("question:".length))
  })),
  questionUidToUrls
};
const reportPath=path.join(ROOT,"reports","learn-links.json");
fs.mkdirSync(path.dirname(reportPath),{recursive:true});
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+"\\n","utf8");
console.log("Report written to reports/learn-links.json at",checkedAt,"(redirects:",redirects,")");

if(dead.length){
  console.error("\nDefinitively broken links:");
  for(const x of dead)console.error("-",x.status,x.url,"used by",x.refs.join(", "));
  process.exit(1);
}
