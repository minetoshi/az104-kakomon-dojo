(function(){
  function naturalOrder(q){return (q.o||[]).map((_,i)=>i)}
  function validOrder(q,order){
    const natural=naturalOrder(q);
    return Array.isArray(order)&&order.length===natural.length&&new Set(order).size===natural.length&&order.every(i=>Number.isInteger(i)&&natural.includes(i));
  }
  function normalizeOrder(q,order){return validOrder(q,order)?order.slice():naturalOrder(q)}
  function letterAt(visual){return String.fromCharCode(65+visual)}
  function visualIndex(order,orig){return order.indexOf(orig)}
  function correctAnswerText(q,order){
    const normalized=normalizeOrder(q,order),correct=new Set(q.a||[]);
    return normalized.filter(orig=>correct.has(orig)).map(orig=>letterAt(visualIndex(normalized,orig))+". "+q.o[orig]).join(" / ");
  }
  function feedbackRows(q,detail,order){
    const normalized=normalizeOrder(q,order),correct=new Set(q.a||[]);
    const details=new Map(((detail&&detail.options)||[]).map(x=>[x.index,x]));
    return normalized.map((orig,visual)=>{
      const x=details.get(orig)||{index:orig,ok:correct.has(orig),text:(q.ox&&q.ox[orig])||""};
      return {
        orig,
        visual,
        letter:letterAt(visual),
        option:q.o[orig],
        ok:Boolean(x.ok),
        text:x.text||"この選択肢の役割を正解選択肢と比較して確認します。"
      };
    });
  }
  window.AZ104_UI_LOGIC={naturalOrder,validOrder,normalizeOrder,letterAt,correctAnswerText,feedbackRows};
})();