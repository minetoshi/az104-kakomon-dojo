// Reproducible QA triage report. Scores prioritize manual review; they do not verify answers.
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const ROOT=path.resolve(__dirname,"..");
global.window={AZ104_QUESTIONS:[]};
global.document={readyState:"complete",querySelectorAll:()=>[]};
global.localStorage={getItem:()=>null,setItem:()=>{},removeItem:()=>{}};
const read=p=>fs.readFileSync(path.join(ROOT,p),"utf8");
const filesIn=d=>fs.readdirSync(path.join(ROOT,d)).filter(x=>x.endsWith(".js")).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true})).map(x=>d+"/"+x);
const files=["questions/set-01","questions/set-02","questions/similar","questions/coverage","questions/learn-products"].flatMap(filesIn);
const fileOf=new Map(),ownOx=new Map(),ownLearn=new Map();
for(const f of files){
  const n=window.AZ104_QUESTIONS.length;
  vm.runInThisContext(read(f),{filename:f});
  for(const q of window.AZ104_QUESTIONS.slice(n)){
    fileOf.set(q.uid,f);
    ownOx.set(q.uid,Array.isArray(q.ox)&&q.ox.length===q.o.length&&q.ox.every(x=>typeof x==="string"&&x.trim()));
    ownLearn.set(q.uid,Array.isArray(q.learn)&&q.learn.length>0);
  }
}
vm.runInThisContext(read("learn-map.js"),{filename:"learn-map.js"});
vm.runInThisContext(read("explanation-helper.js"),{filename:"explanation-helper.js"});
vm.runInThisContext(read("question-normalizer.js"),{filename:"question-normalizer.js"});
vm.runInThisContext(read("audit-map.js"),{filename:"audit-map.js"});
const questions=window.AZ104_QUESTIONS,ledger=JSON.parse(read("audit/quality-evidence-ledger.json"));
const reviewed=new Set(ledger.reviewed.map(x=>x.uid));
if(questions.length!==366||questions.length-reviewed.size!==ledger.remainingCount)throw Error("Review ledger count differs from question data");
function domain(q){
  const c=q.cat||"";
  if(c.startsWith("ID/")||c==="監視/コスト")return "ID/Governance";
  if(c.startsWith("ストレージ"))return "Storage";
  if(c.startsWith("ネットワーク"))return "Networking";
  if(c.startsWith("コンピュート")||c.startsWith("コンテナー")||c==="App Service")return "Compute";
  return "Monitor/Backup";
}
const dynamic=/既定|制限|最大|最小|無償|無料|Basic|Premium|Standard|SKU|エディション|バージョン|ライセンス|日間|時間|年|日後|リージョン|サポート/i;
const conditional=/のみ|すべて|必ず|選択|直後|他の|移動|継承|認可|拒否|監査|削除|復旧|停止|スケール|暗号化/;
const queue=questions.filter(q=>!reviewed.has(q.uid)).map(q=>{
 const signals=[];
 if(!ownOx.get(q.uid))signals.push(["Individual choice explanations are generated, not authored",6]);
 if(!ownLearn.get(q.uid))signals.push(["Official reference depends on shared mapping",3]);
 if(dynamic.test(q.q))signals.push(["Time-sensitive SKU/limit/default premise",3]);
 if(conditional.test(q.q))signals.push(["Conditional scenario requires unique-answer check",2]);
 if(q.multi===true)signals.push(["Multi-select answer set",2]);
 if(q.set===1||q.set===2)signals.push(["Historical Practice question",2]);
 const a=window.AZ104_AUDIT.get(q);
 if(a.note)signals.push(["Historical exception note requires renewed review",5]);
 const score=signals.reduce((sum,x)=>sum+x[1],0);
 return {uid:q.uid,file:fileOf.get(q.uid),domain:domain(q),set:q.set,score,
   priority:score>=10?"P0":score>=6?"P1":"P2",
   signals:signals.map(x=>x[0]),questionExcerpt:q.q.slice(0,150),correctAnswerCount:q.a.length};
}).sort((a,b)=>b.score-a.score||a.uid.localeCompare(b.uid,undefined,{numeric:true}));
const priorityCounts=queue.reduce((a,q)=>(a[q.priority]=(a[q.priority]||0)+1,a),{P0:0,P1:0,P2:0});
const domainCounts=queue.reduce((a,q)=>(a[q.domain]=(a[q.domain]||0)+1,a),{});
const report={generatedAt:new Date().toISOString(),
  notice:"Triage estimates only. Low-risk does not mean verified.",
  total:questions.length,reviewed:reviewed.size,unreviewed:queue.length,
  priorityCounts,domainCounts,items:queue};
fs.mkdirSync(path.join(ROOT,"reports"),{recursive:true});
fs.writeFileSync(path.join(ROOT,"reports","semantic-audit-queue.json"),JSON.stringify(report,null,2)+"\n");
const lines=["# AZ-104 semantic review backlog","",
"Generated: "+report.generatedAt,"",
"Risk priority is a heuristic, NOT a semantic correctness assertion.","",
"| Label | Count |","| --- | ---: |",
"| Reviewed with official sources | "+reviewed.size+" |",
"| Not independently reviewed | "+queue.length+" |",
"| P0 / P1 / P2 | "+priorityCounts.P0+" / "+priorityCounts.P1+" / "+priorityCounts.P2+" |",
"","## First 40 candidates","",
"| UID | Domain | Score | Priority | Lead signal |",
"| --- | --- | ---: | --- | --- |"];
for(const q of queue.slice(0,40))lines.push("| "+q.uid+" | "+q.domain+" | "+q.score+" | "+q.priority+" | "+(q.signals[0]||"manual review pending")+" |");
fs.writeFileSync(path.join(ROOT,"reports","semantic-audit-queue.md"),lines.join("\n")+"\n");
console.log("QUALITY QUEUE",JSON.stringify({total:report.total,reviewed:report.reviewed,unreviewed:report.unreviewed,priorityCounts,domainCounts}));
