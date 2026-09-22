window.AZ104_INVENTORY={
  version:"2026-09-22",
  total:366,
  sets:{
    past:100,
    set1:50,
    set2:50,
    similar:100,
    coverage:160,
    learnProducts:6
  },
  chapters:{
    1:{title:"Azureの概要と管理ツール",count:27},
    2:{title:"Azure Active Directory",count:45},
    3:{title:"ガバナンスとコンプライアンス",count:17},
    4:{title:"仮想マシン",count:24},
    5:{title:"ストレージ",count:67},
    6:{title:"仮想ネットワーク",count:22},
    7:{title:"サイト間接続",count:19},
    8:{title:"ネットワークトラフィック管理",count:33},
    9:{title:"App Serviceとコンテナー",count:59},
    10:{title:"データ保護",count:36},
    11:{title:"監視",count:17}
  },
  studyStages:{
    1:{title:"ID・ガバナンス",count:61},
    2:{title:"ストレージ",count:68},
    3:{title:"VM・Compute",count:55},
    4:{title:"App Service・コンテナー",count:56},
    5:{title:"ネットワーク",count:71},
    6:{title:"Monitor・Backup・DR",count:55}
  }
};

(function(){
  function applyInventory(){
    const inv=window.AZ104_INVENTORY;if(!inv)return;
    document.querySelectorAll("[data-az104-total]").forEach(el=>{el.textContent=String(inv.total)});
    document.querySelectorAll("[data-az104-chapter]").forEach(el=>{
      const id=Number(el.getAttribute("data-az104-chapter"));
      if(inv.chapters[id])el.textContent=String(inv.chapters[id].count);
    });
    document.querySelectorAll("[data-az104-stage]").forEach(el=>{
      const id=Number(el.getAttribute("data-az104-stage"));
      if(inv.studyStages[id])el.textContent=String(inv.studyStages[id].count);
    });
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",applyInventory);
  else applyInventory();
})();