(function(){
  const REVIEWED_UIDS=new Set(["cov-q003","cov-q006","cov-q010","cov-q034","cov-q116","cov-q120","cov-q156","cov-q157","s1-q01","s1-q08","s1-q09","s1-q28","s1-q49","s2-q46","s2-q48","s2-q50","sim-q028"]);
  const SPECIAL={
    "s1-q08":{
      status:"updated-current",
      label:"現行仕様に合わせて改訂",
      note:"旧Practice依存の5-tuple問題を廃止し、現行Azure Load Balancerの正常性プローブで異常バックエンドを新規接続から除外する設問へ改訂しました。",
      extra:[{title:"Microsoft Learn: Load Balancer の正常性プローブ",url:"https://learn.microsoft.com/ja-jp/azure/load-balancer/load-balancer-custom-probe-overview"}]
    },
    "s2-q01":{
      status:"updated-current",
      label:"現行仕様に合わせて改訂",
      note:"『IDベースStorage=Azure Filesだけ』という旧Practice依存を廃止し、Azure Files SMBでクラウド専用IDを使うMicrosoft Entra Kerberosの現行認証シナリオへ改訂しました。",
      extra:[{title:"Microsoft Learn: Azure Files の ID ベース認証",url:"https://learn.microsoft.com/ja-jp/azure/storage/files/storage-files-active-directory-overview"}]
    },
    "s1-q19":{
      status:"updated-current",
      label:"現行仕様に合わせて改訂",
      note:"App Service移動の現行ガイダンスに合わせ、アップロード済みTLS/SSL証明書の削除・再アップロードと、App Serviceリソースをまとめて移動する要件へ改訂しました。",
      extra:[{title:"Microsoft Learn: App Service リソースの移動制約",url:"https://learn.microsoft.com/ja-jp/azure/azure-resource-manager/management/move-limitations/app-service-move-limitations"}]
    },
    "s1-q34":{
      status:"verified-nuance",
      label:"監査済・コマンド注記",
      note:"選択肢 D はコマンド名だけなので省略が大きいです。最小権限を満たすには、実際には Tag Contributor をサブスクリプション スコープで User1 に割り当てる引数を指定します。例: az role assignment create --assignee <User1> --role \"Tag Contributor\" --scope /subscriptions/<subscription-id>。",
      extra:[{title:"Microsoft Learn: Tag Contributor",url:"https://learn.microsoft.com/ja-jp/azure/role-based-access-control/built-in-roles/management-and-governance#tag-contributor"}]
    },
    "s1-q46":{
      status:"updated-current",
      label:"現行仕様に合わせて改訂",
      note:"旧来の固定『14日』問題を廃止し、Log Analyticsのクエリ結果をログ検索アラートルールで評価しAction Groupで通知する現行Azure Monitor設問へ改訂しました。",
      extra:[{title:"Microsoft Learn: ログ検索アラート ルールを作成する",url:"https://learn.microsoft.com/ja-jp/azure/azure-monitor/alerts/alerts-create-log-alert-rule"}]
    },
    "s2-q13":{
      status:"updated-current",
      label:"現行仕様に合わせて改訂",
      note:"Secure by Defaultを踏まえ、Recovery Servicesコンテナー削除前に保護対象、soft-deleted項目、Private Endpoint等の依存関係を除去する現行設問へ改訂しました。",
      extra:[{title:"Microsoft Learn: Recovery Services コンテナーを削除",url:"https://learn.microsoft.com/ja-jp/azure/backup/backup-azure-delete-vault"},{title:"Microsoft Learn: Azure Backup Secure by Default",url:"https://learn.microsoft.com/ja-jp/azure/backup/secure-by-default"}]
    },
    "s2-q18":{
      status:"verified-nuance",
      label:"監査済・前提注記",
      note:"この設問で P1 となるのは、オンプレミス AD ユーザーの SSPR と password writeback を含むハイブリッド要件を前提にしているためです。クラウドのみの単純なパスワード変更など、要件が異なれば必要ライセンスも変わります。",
      extra:[{title:"Microsoft Learn: SSPR のライセンス要件",url:"https://learn.microsoft.com/ja-jp/entra/identity/authentication/concept-sspr-licensing"}]
    },
    "s2-q19":{
      status:"verified-nuance",
      label:"監査済・B2B注記",
      note:"User1 と User2 が Practice の想定解です。B2B ゲスト User3 の認証/パスワード権限は通常ホーム テナント側が権威を持ち、リソース テナントの SSPR ポリシーでメンバー ユーザーと同じようには扱いません。",
      extra:[{title:"Microsoft Learn: B2B ゲストの認証とパスワード",url:"https://learn.microsoft.com/ja-jp/entra/external-id/user-properties"}]
    },
    "s2-q26":{
      status:"verified-nuance",
      label:"監査済・コマンド注記",
      note:"選択肢 D を正答にする前提は、az role assignment create で Tag Contributor をサブスクリプション スコープに割り当てることです。単にコマンドを実行するだけでは要件を満たさないため、ロール名と scope の指定までセットで理解してください。",
      extra:[{title:"Microsoft Learn: Azure CLI でロールを割り当てる",url:"https://learn.microsoft.com/ja-jp/azure/role-based-access-control/role-assignments-cli"}]
    },
    "s2-q27":{
      status:"updated-current",
      label:"現行仕様に合わせて改訂",
      note:"リソースグループへCanNotDeleteを付けるとRG自体も削除できない現行仕様に合わせ、保護対象リソースへ個別に削除ロックを適用する設問へ改訂しました。",
      extra:[{title:"Microsoft Learn: Azure リソースのロック",url:"https://learn.microsoft.com/ja-jp/azure/azure-resource-manager/management/lock-resources"}]
    },
    "s2-q48":{
      status:"updated-current",
      label:"現行仕様へ修正済",
      note:"旧Practiceの2選択肢を合成して覚えさせる誤った設問を廃止しました。現行Session persistenceの『なし(5タプル)』『Client IP(2タプル)』『Client IP and protocol(3タプル)』を独立した設定値として比較する問題に改訂済みです。TCPとUDPを同じバックエンドへ振り分けたい場合は2タプルを選択します。バックエンド変更時の再割当には注意してください。",
      extra:[{title:"Microsoft Learn: Load Balancer の分散モード",url:"https://learn.microsoft.com/ja-jp/azure/load-balancer/distribution-mode-concepts"}]
    },
    "sim-q063":{
      status:"updated-current",
      label:"現行仕様に合わせて改訂",
      note:"生成した旧類似問題は soft delete の旧手順に寄り過ぎていたため、現行の Recovery Services vault 削除手順に合わせて設問自体を改訂しました。",
      extra:[{title:"Microsoft Learn: Recovery Services vault の削除",url:"https://learn.microsoft.com/ja-jp/azure/backup/backup-azure-delete-vault"}]
    },
    "sim-q069":{
      status:"verified-nuance",
      label:"監査済・B2B注記",
      note:"ゲスト ユーザーのパスワード権威は通常ホーム テナント側にあります。リソース テナントの SSPR 対象としてクラウド/同期メンバーと同一には扱わない点が決め手です。"
    }
  };
  window.AZ104_AUDIT={
    date:"2026-10-12",
    reviewedUids:REVIEWED_UIDS,
    get(q){
      const reviewed=REVIEWED_UIDS.has(q.uid),special=SPECIAL[q.uid];
      if(special)return {
        ...special,
        reviewed,
        label:reviewed?"公式Learn個別照合済・注記あり":"意味的監査未完了（旧監査メモあり）"
      };
      return reviewed
        ?{status:"verified",reviewed:true,label:"公式Learn個別照合済",note:""}
        :{status:"unverified",reviewed:false,label:"意味的監査未完了",note:""};
    }
  };
})();