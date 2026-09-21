(function(){
  const qs=window.AZ104_QUESTIONS||[];
  const learnMap=window.AZ104_LEARN_MAP||{};
  const explain=window.AZ104_EXPLAIN;
  qs.forEach(q=>{
    if(!q.kind && (q.set===1||q.set===2)) q.kind="original";
    if((!Array.isArray(q.learn)||q.learn.length===0) && Array.isArray(learnMap[q.uid]) && learnMap[q.uid].length){
      q.learn=learnMap[q.uid].map(x=>({title:x.title,url:x.url}));
    }
    if(!Array.isArray(q.ox) || q.ox.length!==(Array.isArray(q.o)?q.o.length:0)){
      if(explain&&typeof explain.build==="function"){
        const d=explain.build(q);
        if(d&&Array.isArray(d.options)){
          const ox=new Array(q.o.length).fill("");
          d.options.forEach(x=>{if(Number.isInteger(x.index)&&x.index>=0&&x.index<ox.length)ox[x.index]=x.text||""});
          q.ox=ox;
        }
      }
    }
  });
})();
