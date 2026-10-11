(function(){
  const RULES=[
    {id:"rbac",re:/\/role-based-access-control\//,title:"Azure RBAC",points:[
      "Azure RBAC は『誰が・どのスコープで・何をできるか』をロール割り当てで制御する認可機能です。",
      "ロール割り当ては principal（ユーザー/グループ/マネージドID等）・role・scope の組み合わせで考えます。",
      "最小権限を優先し、閲覧だけなら Reader、変更が必要なら用途に合う組み込みロールを選びます。"
    ]},
    {id:"entra",re:/\/entra\//,title:"Microsoft Entra ID",points:[
      "Microsoft Entra ID はユーザー、グループ、アプリ、外部ユーザーなどのID管理基盤です。",
      "Microsoft Entra ロールはIDリソースの管理権限、Azure RBACはAzureリソースの管理権限で、対象が異なります。",
      "ゲスト、SSPR、グループベース ライセンスなどは『誰のIDをどう管理するか』を軸に整理します。"
    ]},
    {id:"policy",re:/\/(governance\/policy|azure-policy)\//,title:"Azure Policy",points:[
      "Azure Policy はリソースの状態を組織ルールと比較し、準拠/非準拠を評価するガバナンス機能です。",
      "Deny は作成を拒否、Audit は記録、Modify/DeployIfNotExists は修正・補完に使います。",
      "既存リソースを修復する場合は remediation task が必要になるケースがあります。"
    ]},
    {id:"locks",re:/\/management\/lock-resources/,title:"Resource locks",points:[
      "リソース ロックは誤削除や変更を防ぐ保護機能で、CanNotDelete と ReadOnly が代表です。",
      "RBACで権限があっても、ロックによって操作が拒否されることがあります。",
      "ロックはアクセス権を付与する機能ではなく、操作を追加で制限する機能です。"
    ]},
    {id:"tags",re:/\/management\/tag-resources/,title:"Azure tags",points:[
      "タグはキー/値のメタデータで、コスト配賦や運用分類に使います。",
      "タグはアクセス制御の代替ではなく、RBACやPolicyとは役割が異なります。",
      "タグの強制や継承が必要な場合はAzure Policyと組み合わせます。"
    ]},
    {id:"cost",re:/\/cost-management-billing\//,title:"Cost Management",points:[
      "Cost Management は利用料金の分析、予算、アラートを行うための機能群です。",
      "Budget はしきい値通知やアクション連携に使いますが、Budget単体でVMを自動停止するわけではありません。",
      "コストの閲覧/管理権限はRBACロールと組み合わせて考えます。"
    ]},
    {id:"advisor",re:/\/advisor\//,title:"Azure Advisor",points:[
      "Azure Advisor はコスト、信頼性、セキュリティ、性能などの推奨事項を提示します。",
      "推奨事項を通知する場合はAdvisor alertとAction Groupなどを組み合わせます。",
      "Advisorは設定を強制するPolicyとは異なり、改善の推奨を提示するサービスです。"
    ]},
    {id:"sas",re:/storage-(sas|account-keys)|\/storage\/common\/storage-sas|\/storage\/common\/storage-account-keys/,title:"Azure Storage の認証とSAS",points:[
      "SAS は権限・対象・期間を限定してStorageアクセスを委任する仕組みです。",
      "User delegation SAS はMicrosoft Entra資格情報で署名し、Account/Service SASは用途と署名方式を区別します。",
      "ストレージ アカウント キーは強い権限を持つため、可能ならEntra IDや限定的なSASを優先します。"
    ]},
    {id:"redundancy",re:/\/storage\/common\/storage-redundancy/,title:"Azure Storage の冗長性",points:[
      "冗長性は『プライマリ内でどう複製するか』『別リージョンへ複製するか』『セカンダリを読めるか』で選びます。",
      "LRSは単一データセンター、ZRSは同一リージョンの複数ゾーン、GRS/GZRSは別リージョンにも複製します。",
      "RA- が付く構成は通常時からセカンダリの読み取りエンドポイントを利用できます。"
    ]},
    {id:"access-tier",re:/\/storage\/blobs\/access-tiers-overview/,title:"Blob のアクセス層",points:[
      "Hot/Cool/Cold/Archive はアクセス頻度、保存コスト、読み出しコスト、最低保持期間、取り出し時間のトレードオフで選びます。",
      "Archive は最安級ですがオフライン層で、利用前に再水和が必要です。",
      "すぐ取り出す必要がある低頻度データはCool/Cold、長期保管で数時間待てるならArchiveが候補です。"
    ]},
    {id:"lifecycle",re:/\/storage\/blobs\/lifecycle-management/,title:"Blob lifecycle management",points:[
      "ライフサイクル管理はBlobの経過日数などを条件にアクセス層移行や削除を自動化します。",
      "保存コストの最適化に使い、アクセス権管理やネットワーク制御には使いません。",
      "ルールの条件、対象Blob、実行アクションを分けて考えます。"
    ]},
    {id:"immutable",re:/\/storage\/blobs\/immutable-storage/,title:"Immutable Blob Storage",points:[
      "不変ストレージはWORM要件向けに、一定期間または法的保持中のBlobの変更・削除を防ぎます。",
      "誤削除から戻すsoft deleteとは目的が異なり、改ざん防止・規制対応が中心です。",
      "time-based retention と legal hold の違いを整理します。"
    ]},
    {id:"object-replication",re:/\/storage\/blobs\/object-replication/,title:"Blob object replication",points:[
      "オブジェクト レプリケーションはブロックBlobを別ストレージアカウントへ非同期複製します。",
      "冗長性設定とは別機能で、アカウント/コンテナー間の論理的な複製を構成します。",
      "変更フィードやバージョン管理など前提条件を確認します。"
    ]},
    {id:"data-lake",re:/\/storage\/blobs\/create-data-lake-storage-account/,title:"Data Lake Storage Gen2",points:[
      "ADLS Gen2 はBlob Storageに階層型名前空間を追加し、分析用途のディレクトリ操作を効率化します。",
      "新規構成ではStorageV2を中心に、階層型名前空間を有効化して利用します。",
      "通常のBlob用途との違いは階層構造と分析ワークロード向け機能です。"
    ]},
    {id:"azure-files",re:/\/storage\/files\//,title:"Azure Files",points:[
      "Azure Files はSMB/NFSで利用できるマネージド ファイル共有です。",
      "IDベース認証、ネットワーク制限、Azure File Syncなどを要件ごとに組み合わせます。",
      "Blobはオブジェクト、Azure Filesはファイル共有という違いを押さえます。"
    ]},
    {id:"azcopy",re:/storage-use-azcopy/,title:"AzCopy",points:[
      "AzCopy はAzure Storageとのデータ転送を自動化するコマンドライン ツールです。",
      "大量・反復・スクリプト化した転送に向き、GUI中心のStorage Explorerとは用途が異なります。",
      "ローカル、Blob、Files間のコピー/同期シナリオを整理します。"
    ]},
    {id:"arm",re:/\/azure-resource-manager\/(templates|bicep)\//,title:"ARM / Bicep デプロイ",points:[
      "ARMテンプレートやBicepはAzureリソースを宣言的に定義するIaCです。",
      "デプロイスコープ（resource group / subscription / management group）に応じて実行コマンドを選びます。",
      "Bicepのparam、resource、moduleと、ARMの反復/依存関係を区別して覚えます。"
    ]},
    {id:"vm",re:/\/virtual-machines\//,title:"Azure Virtual Machines",points:[
      "VMはOSまで管理できるIaaSコンピュートで、サイズ、ディスク、ネットワーク、可用性を組み合わせて構成します。",
      "可用性セットは論理分散、Availability Zoneは物理的に独立したゾーンへの分散です。",
      "VMSSは同一構成VM群のスケール、通常VMは個別サーバー管理という違いがあります。"
    ]},
    {id:"autoscale",re:/\/azure-monitor\/autoscale\//,title:"Azure Monitor autoscale",points:[
      "自動スケールはメトリックやスケジュールに応じてインスタンス数を増減します。",
      "最小・既定・最大インスタンス数と、scale-out/scale-inルールを分けて設定します。",
      "評価期間、しきい値、クールダウンを含めてスケール条件を判断します。"
    ]},
    {id:"container-apps",re:/\/container-apps\//,title:"Azure Container Apps",points:[
      "Container Appsは基盤インフラを管理せずコンテナー化アプリを実行するサーバーレス基盤です。",
      "HTTP、CPU/メモリ、イベントソースなどでスケールし、minReplicasでscale-from-zeroを制御できます。",
      "Kubernetes API互換性が必要ならAKS、単純な単体コンテナーならACIとの違いを確認します。"
    ]},
    {id:"aci",re:/\/container-instances\//,title:"Azure Container Instances",points:[
      "ACIはVMやKubernetesクラスタを管理せず、単体コンテナーを素早く実行するサービスです。",
      "永続ファイル共有が必要な場合はAzure Filesのマウントが代表的です。",
      "高度なオーケストレーションやKubernetes APIが必要ならAKSを検討します。"
    ]},
    {id:"aks",re:/\/aks\//,title:"Azure Kubernetes Service",points:[
      "AKSはAzureがKubernetesコントロールプレーンを管理するマネージドKubernetesです。",
      "kubectl、Helm、Namespace、DaemonSetなどKubernetesネイティブ機能を利用できます。",
      "Kubernetes運用互換性が必要か、より抽象化されたContainer Appsで十分かを見分けます。"
    ]},
    {id:"app-service",re:/\/app-service\//,title:"Azure App Service",points:[
      "App Serviceは基盤OSを管理せずWebアプリやREST APIを実行できるPaaSです。",
      "App Service PlanがCPU/メモリ/スケールなどの実行基盤を決め、アプリ設定やスロットはアプリ側の機能です。",
      "VNet Integration、Private Endpoint、バックアップ、カスタムドメインなどは用途を分けて覚えます。"
    ]},
    {id:"nsg",re:/\/virtual-network\/network-security-group/,title:"Network Security Group",points:[
      "NSGは受信/送信トラフィックを送信元、宛先、ポート、プロトコル、優先度でAllow/Denyします。",
      "NSGはSubnetまたはNICへ関連付けでき、両方にある場合は通信が両方の評価を通る必要があります。",
      "ASGはNICの論理グループであり、ASG単体で通信を許可/拒否するわけではありません。"
    ]},
    {id:"vnet",re:/\/virtual-network\//,title:"Azure Virtual Network",points:[
      "VNetはAzureのプライベート ネットワーク基盤で、アドレス空間をSubnetへ分割して利用します。",
      "PeeringはVNet間接続、UDRは次ホップ制御、Private EndpointはPaaSへプライベートIP接続という役割です。",
      "アドレス範囲の重複、サブネット包含、NSG/ルートの適用位置を確認します。"
    ]},
    {id:"dns",re:/\/dns\//,title:"Azure DNS",points:[
      "Azure DNSはDNSゾーンをホストして名前解決を提供します。",
      "Private DNS ZoneはVNet向けプライベート名前解決で、VNet linkにより利用するネットワークを関連付けます。",
      "名前解決と通信許可は別問題で、NSGやFirewallの代わりにはなりません。"
    ]},
    {id:"bastion",re:/\/bastion\//,title:"Azure Bastion",points:[
      "Azure BastionはVMにパブリックIPを付けず、ブラウザー経由でRDP/SSH接続する管理サービスです。",
      "管理ポートをインターネット公開しないことが主な利点です。",
      "VPN/ExpressRouteはネットワーク接続、BastionはVMへの管理アクセスという役割の違いがあります。"
    ]},
    {id:"lb",re:/\/load-balancer\//,title:"Azure Load Balancer",points:[
      "Azure Load BalancerはTCP/UDPを扱うLayer 4負荷分散サービスです。",
      "フロントエンドIP、バックエンドプール、負荷分散規則、正常性プローブを組み合わせます。",
      "URLパスやホスト名を見て振り分けるLayer 7要件はApplication Gatewayの領域です。"
    ]},
    {id:"appgw",re:/\/application-gateway\//,title:"Application Gateway",points:[
      "Application GatewayはHTTP/HTTPSを扱うLayer 7ロードバランサーです。",
      "URLパス/ホストベース ルーティング、TLS終端、WAFなどWeb向け機能を提供します。",
      "TCP/UDPの単純L4負荷分散はLoad Balancerと区別します。"
    ]},
    {id:"vpn",re:/\/vpn-gateway\//,title:"VPN Gateway",points:[
      "VPN Gatewayは暗号化VPNでVNetとオンプレミス、ユーザー端末、他VNetを接続します。",
      "S2S、P2S、VNet-to-VNetなど接続形態を要件に合わせて選びます。",
      "専用線接続を求めるExpressRouteとは接続経路が異なります。"
    ]},
    {id:"expressroute",re:/\/expressroute\//,title:"ExpressRoute",points:[
      "ExpressRouteは接続プロバイダー経由のプライベート接続でMicrosoftクラウドへ接続します。",
      "通常のパブリックインターネットを経由しないことが大きな特徴です。",
      "経路交換ではBGPが使われ、複数VNet接続や冗長化設計も確認します。"
    ]},
    {id:"firewall",re:/\/firewall\//,title:"Azure Firewall",points:[
      "Azure Firewallは集中管理できるマネージド ステートフル ファイアウォールです。",
      "ネットワーク規則、アプリケーション/FQDN規則、NATなどを用途で使い分けます。",
      "Subnet/NIC単位の基本フィルタはNSG、集中境界防御はFirewallと整理します。"
    ]},
    {id:"network-watcher",re:/\/network-watcher\//,title:"Network Watcher",points:[
      "Network WatcherはAzureネットワークの監視・診断機能群です。",
      "IP flow verifyはNSG判定、packet captureはパケット取得、Connection Monitorは継続的な接続監視に使います。",
      "『設定する機能』と『診断する機能』を分けて選びます。"
    ]},
    {id:"monitor",re:/\/azure-monitor\//,title:"Azure Monitor",points:[
      "Azure Monitorはメトリック、ログ、トレース、イベントを収集・分析し、アラートや自動処理につなげる統合監視基盤です。",
      "Metricsは数値時系列、LogsはLog Analytics/KQLで分析するログデータとして区別します。",
      "アラート条件はAlert rule、通知・Webhook・Runbook等の実行先はAction Groupで分けて考えます。"
    ]},
    {id:"backup",re:/\/backup\//,title:"Azure Backup",points:[
      "Azure BackupはAzure/オンプレミスのワークロードをポリシーベースで保護し、必要時に復元するサービスです。",
      "バックアップ頻度・保持期間・復元ポイント・vaultの種類をワークロード要件に合わせます。",
      "Site Recoveryの継続レプリケーション/フェールオーバーとは目的が異なります。"
    ]},
    {id:"site-recovery",re:/\/site-recovery\//,title:"Azure Site Recovery",points:[
      "Site Recoveryはワークロードを別場所へ継続レプリケーションし、障害時にフェールオーバーするDRサービスです。",
      "復旧計画ではRPO/RTO、レプリケーション、フェールオーバー/フェールバックを整理します。",
      "過去時点のデータ復元が中心のBackupとは役割を分けて覚えます。"
    ]},
    {id:"powershell",re:/\/powershell\//,title:"Azure PowerShell",points:[
      "Azure PowerShellはAzモジュール等のコマンドレットでAzureを管理する方法です。",
      "コマンドレット名だけでなく、対象スコープと必須パラメーターを確認します。",
      "PowerShell、Azure CLI、Portalは同じAzure管理を別の操作手段で行うものです。"
    ]}
  ];

  const FALLBACK={
    "ID/ガバナンス":{title:"ID・ガバナンス",points:["ID管理ではMicrosoft Entra ID、Azureリソースの認可ではAzure RBAC、構成ルールではAzure Policyを役割で分けます。","スコープと継承、最小権限、ガバナンスの適用単位を必ず確認します。","権限付与・構成強制・誤操作防止（lock）は別機能として整理します。"]},
    "ストレージ":{title:"Azure Storage",points:["Storageはサービス種別、認証、ネットワーク、冗長性、データ保護を別軸で整理します。","Blob/Files、SAS/Entra ID、LRS/ZRS/GRS系、soft delete/versioning/lifecycleの役割を区別します。","設問ではアクセス頻度、障害範囲、読み取り要件、復元要件などの条件語を拾います。"]},
    "コンピュート":{title:"Azure Compute",points:["ComputeではVM、VMSS、App Service、コンテナーの管理責任範囲とスケール方式を比較します。","可用性、ネットワーク、ストレージ、スケール条件を分解して判断します。","IaaS/PaaS/コンテナー基盤のどこまで管理したいかがサービス選択の軸です。"]},
    "コンテナー":{title:"Azure containers",points:["コンテナー系サービスはKubernetes互換性、運用負荷、スケール、永続化の要件で選びます。","AKSはKubernetes、Container Appsはサーバーレス型、ACIは単体コンテナー向けという違いがあります。","イメージ保存はACR、実行サービスとは役割が異なります。"]},
    "App Service":{title:"Azure App Service",points:["App ServiceはWebアプリ/APIを基盤管理なしで実行するPaaSです。","Plan、scale、slot、backup、networkingを別々の設定として整理します。","アプリの受信公開と、VNet内への送信接続は別機能です。"]},
    "ネットワーク":{title:"Azure networking",points:["ネットワーク問題は接続、ルーティング、名前解決、セキュリティ、負荷分散を別軸に分解します。","VNet/Subnet、NSG、UDR、DNS、LB/App Gateway、VPN/ExpressRoute/Firewallを役割で区別します。","Layer 4/7、public/private、送信/受信、オンプレ接続の条件語を確認します。"]},
    "監視/バックアップ":{title:"Monitoring / Backup / DR",points:["監視は収集→分析→アラート→アクション、保護はBackup→復元、DRはレプリケーション→フェールオーバーで整理します。","Metrics/Logs、Alert rule/Action Group、Backup/Site Recoveryの役割を混同しないことが重要です。","設問の目的が『気付く』『戻す』『切り替える』のどれかを先に判定します。"]},
    "監視/コスト":{title:"Monitoring / Cost",points:["監視とコスト管理はデータを収集・分析し、しきい値に応じて通知やアクションへつなげます。","通知機能と自動停止などの実行機能は分けて考えます。","Advisorの推奨、Budgetのしきい値、Azure Monitorのアラートを役割で区別します。"]}
  };

  function domainFallback(q){
    const cat=(q&&q.cat)||"";
    if(FALLBACK[cat])return FALLBACK[cat];
    if(cat.startsWith("ID/"))return FALLBACK["ID/ガバナンス"];
    if(cat.startsWith("ストレージ"))return FALLBACK["ストレージ"];
    if(cat.startsWith("コンピュート"))return FALLBACK["コンピュート"];
    if(cat.startsWith("コンテナー"))return FALLBACK["コンテナー"];
    if(cat.startsWith("ネットワーク"))return FALLBACK["ネットワーク"];
    return FALLBACK["監視/バックアップ"];
  }

  function build(q,glossary){
    const links=(q&&Array.isArray(q.learn)?q.learn:[]).filter(x=>x&&typeof x.url==="string");
    const urls=links.map(x=>x.url).join(" ");
    const rule=RULES.find(r=>r.re.test(urls))||domainFallback(q);
    const terms=(glossary&&typeof glossary.match==="function")?glossary.match(q):[];
    const problemPoint=(q&&typeof q.e==="string"&&q.e.trim())?q.e.trim():"この問題では、要件に最も直接対応するAzure機能を選びます。";
    const caution=terms.length?terms[0].exam:"似たサービスを選択肢ごとに『目的・スコープ・動作』で比較します。";
    return {
      title:rule.title||"Microsoft Learn 要約",
      points:(rule.points||[]).slice(0,3),
      problemPoint,
      caution,
      sources:links.slice(0,3)
    };
  }

  window.AZ104_LEARN_SUMMARY={rules:RULES,build};
})();