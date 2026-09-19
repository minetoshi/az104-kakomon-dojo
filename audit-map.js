(function(){
  const SPECIAL={
    "s1-q19":{
      status:"practice-nuance",
      label:"Practice想定・現行仕様注記",
      note:"Microsoft Practice Assessment の想定解は「TLS/SSL 証明書を削除・再アップロード」+「App Service リソースを移動」です。一方、現行 Microsoft Learn の App Service 移動ガイダンスは、アップロード/インポート済み証明書を App Service リソースとして列挙し、リソース グループ内の App Service リソースをまとめて移動する説明も含みます。無料 App Service マネージド証明書は移動不可で、削除後に再作成が必要です。試験では設問の想定解を選びつつ、実運用では証明書種別と最新の移動ガイダンスを確認してください。",
      extra:[{title:"Microsoft Learn: App Service リソースの移動制約",url:"https://learn.microsoft.com/ja-jp/azure/azure-resource-manager/management/move-limitations/app-service-move-limitations"}]
    },
    "s1-q34":{
      status:"verified-nuance",
      label:"監査済・コマンド注記",
      note:"選択肢 D はコマンド名だけなので省略が大きいです。最小権限を満たすには、実際には Tag Contributor をサブスクリプション スコープで User1 に割り当てる引数を指定します。例: az role assignment create --assignee <User1> --role \"Tag Contributor\" --scope /subscriptions/<subscription-id>。",
      extra:[{title:"Microsoft Learn: Tag Contributor",url:"https://learn.microsoft.com/ja-jp/azure/role-based-access-control/built-in-roles/management-and-governance#tag-contributor"}]
    },
    "s1-q46":{
      status:"legacy-practice",
      label:"Practice想定・レガシー注意",
      note:"Microsoft Practice Assessment の想定解は 14 日です。ただし、現行 Microsoft Learn のダッシュボード/Workbook のドキュメントでは、この旧来の「最大14日」という制限を明確な現行制限として確認できません。AZ-104 の Practice 問題としては 14 日を覚えつつ、実運用の仕様値として固定暗記しないでください。",
      extra:[{title:"Microsoft Learn: Workbook のダッシュボード固定と時間範囲",url:"https://learn.microsoft.com/ja-jp/azure/azure-monitor/visualize/workbooks-manage"}]
    },
    "s2-q13":{
      status:"legacy-practice",
      label:"Practice想定・現行Backup仕様注意",
      note:"Practice の想定解は「バックアップ停止」「soft delete を無効化してデータ削除」「soft-deleted item を完全削除」です。現在の Azure Backup は Secure by Default の展開により、リージョン/状態によって soft delete を無効化できない構成があります。現行の vault 削除では保護停止・依存関係の除去・soft-deleted item の扱いを最新手順で確認してください。",
      extra:[
        {title:"Microsoft Learn: Recovery Services vault の削除",url:"https://learn.microsoft.com/ja-jp/azure/backup/backup-azure-delete-vault"},
        {title:"Microsoft Learn: Azure Backup Secure by Default",url:"https://learn.microsoft.com/ja-jp/azure/backup/secure-by-default"}
      ]
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
      status:"legacy-practice",
      label:"Practice設問と現行仕様にずれ",
      note:"Practice の選択肢では RG1 に削除ロックを付けるのが想定解です。しかし現行 Azure では、リソース グループに付けた CanNotDelete ロックはリソース グループ自身にも効くため、空になってもロックを解除するまで RG1 は削除できません。「空ならそのまま削除可能」を厳密に満たすには、保護対象リソース側へロックを付ける設計などが必要です。",
      extra:[{title:"Microsoft Learn: Azure リソースのロック",url:"https://learn.microsoft.com/ja-jp/azure/azure-resource-manager/management/lock-resources"}]
    },
    "s2-q48":{
      status:"verified-nuance",
      label:"監査済・UI表現注記",
      note:"Practice では [Client IP] と [Protocol] の 2 項目を選択させますが、現行 Azure Load Balancer の概念では「Client IP and protocol」が 3-tuple の 1 つの Session persistence モードです。設問の 2 選択肢は、その組み合わせを分割して表したものとして理解してください。",
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
    date:"2026-09-19",
    get(q){
      return SPECIAL[q.uid]||{status:"verified",label:"Microsoft Learn監査済",note:"現行 Microsoft Learn の該当論点と照合済みです。"};
    }
  };
})();