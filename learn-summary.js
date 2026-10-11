(function(){
  const RULES=[
    {id:"netstat",re:/\/windows-server\/administration\/windows-commands\/netstat/,title:"netstat",points:[
      "netstat はローカル コンピューターのアクティブなTCP接続、待受ポート、ネットワーク統計などを確認するWindowsコマンドです。",
      "サーバー上のアプリが特定TCPポートで待ち受けているかを確認するときは、ポート状態を直接確認します。",
      "Azure側のNSGやLoad Balancer設定ではなく、ゲストOS内部の待受確認に使う点を区別します。"
    ]},
    {id:"app-service-move",re:/\/azure-resource-manager\/management\/move-limitations\/app-service-move-limitations/,title:"App Service の移動制約",points:[
      "App Serviceリソースの移動では、同じリソースグループ内の関連App Serviceリソースをまとめて扱う必要があります。",
      "アップロード/インポート済みTLS/SSL証明書など、移動前後に追加対応が必要なリソースがあります。",
      "移動元/移動先のサブスクリプションやリージョン、証明書種別などの制約を最新ドキュメントで確認します。"
    ]},
    {id:"app-service-limits",re:/\/azure-resource-manager\/management\/azure-subscription-service-limits(?:#app-service-limits)?/,title:"App Service の制限とプラン",points:[
      "App Serviceのスケール数、ストレージ、機能はApp Service PlanのSKUによって上限が異なります。",
      "設問では必要インスタンス数、ストレージ量、カスタムドメイン、スケール機能を満たす最小SKUを選びます。",
      "コスト最小化では、要件を満たす中で最も低いプランを選ぶのが基本です。"
    ]},
    {id:"storage-data-rbac",re:/\/storage\/blobs\/assign-azure-role-data-access/,title:"Azure Storage データ アクセスのRBAC",points:[
      "Blobなどのデータプレーンアクセスは、Storage Blob Data Reader/Contributorなどのデータアクセス用Azureロールで制御します。",
      "ストレージアカウント自体の管理権限と、Blobデータを読む/書く権限は別です。",
      "最小権限では、必要なデータ操作だけを許可する組み込みロールを適切なスコープで割り当てます。"
    ]},
    {id:"kusto-summarize",re:/\/kusto\/query\/summarize-operator/,title:"KQL summarize",points:[
      "summarize 演算子はKQLで行をグループ化し、count、sum、avgなどの集計を計算します。",
      "by 句に列を指定すると、その列の値ごとに集計結果を分けられます。",
      "行の絞り込みはwhere、列の選択はproject、集計はsummarizeと役割を分けます。"
    ]},
    {id:"management-groups",re:/\/governance\/management-groups\/(?:overview|manage)/,title:"Azure Management Groups",points:[
      "管理グループは複数サブスクリプションを階層化して、PolicyやRBACをまとめて適用するためのスコープです。",
      "親スコープに割り当てたPolicyやRBACは子の管理グループ/サブスクリプションへ継承されます。",
      "サブスクリプションを別の管理グループへ移動すると、新しい親の継承設定が適用されます。"
    ]},
    {id:"resource-move",re:/\/azure-resource-manager\/management\/move-resource-group-and-subscription/,title:"Azure リソースの移動",points:[
      "Azureリソースは対応していればリソースグループ間やサブスクリプション間へ移動できます。",
      "移動中もリソースIDや依存関係、ロック、サポート可否を事前確認する必要があります。",
      "移動可能性はリソース種類ごとに異なるため、関連リソースを含めて検証します。"
    ]},
    {id:"storage-network",re:/\/storage\/common\/storage-network-security/,title:"Storage のネットワーク セキュリティ",points:[
      "Storageアカウントはパブリックネットワークアクセス、選択したVNet/IP、Private Endpointなどで到達経路を制御できます。",
      "認証/認可とネットワーク到達性は別条件で、両方を満たす必要があります。",
      "完全なプライベート接続が必要ならPrivate Endpointを検討します。"
    ]},
    {id:"stored-access-policy",re:/\/rest\/api\/storageservices\/define-stored-access-policy/,title:"Stored access policy",points:[
      "Stored access policy はService SASの開始時刻、有効期限、権限をサーバー側でまとめて管理する仕組みです。",
      "ポリシーを変更/削除することで、関連付けたService SASの条件を後から変更・失効できます。",
      "User delegation SASやAccount SASとは対応関係が異なる点に注意します。"
    ]},
    {id:"customer-managed-keys",re:/\/storage\/common\/customer-managed-keys-overview/,title:"Storage のカスタマー マネージド キー",points:[
      "カスタマー マネージド キーでは、Storage暗号化に使う鍵をKey VaultまたはManaged HSMで利用者側が管理します。",
      "鍵のローテーション、無効化、アクセス権、managed identityとの関係を確認します。",
      "Microsoft管理キーより鍵管理の自由度は高い一方、運用責任も増えます。"
    ]},
    {id:"storage-explorer",re:/\/storage\/storage-explorer\//,title:"Azure Storage Explorer",points:[
      "Storage ExplorerはBlob、Files、Queues、TablesなどAzure StorageをGUIで操作するデスクトップツールです。",
      "手動の閲覧・コピー・アップロードなどに向き、反復バッチや大量転送の自動化はAzCopyが向きます。",
      "ツールの違いは『GUI操作かコマンド自動化か』で整理します。"
    ]},
    {id:"blob-soft-delete",re:/\/storage\/blobs\/soft-delete-blob-overview/,title:"Blob soft delete",points:[
      "Blob soft deleteは削除または上書きされたBlobを保持期間内なら復元できるデータ保護機能です。",
      "versioningは更新履歴、soft deleteは削除/上書きからの復旧という役割で整理します。",
      "保持期間を過ぎると復元できないため、保護要件に合わせて設定します。"
    ]},
    {id:"blob-versioning",re:/\/storage\/blobs\/versioning-overview/,title:"Blob versioning",points:[
      "Blob versioningはBlob更新時に以前のバージョンを自動保持します。",
      "誤上書きから以前の状態へ戻す用途で、削除保護はsoft deleteと組み合わせます。",
      "バージョン数増加によるストレージコストにも注意します。"
    ]},
    {id:"resource-mover",re:/\/resource-mover\/overview/,title:"Azure Resource Mover",points:[
      "Azure Resource Moverはサポート対象リソースをAzureリージョン間で移動する作業を計画・実行するサービスです。",
      "依存関係の分析、準備、移動開始、コミットなど段階的に進めます。",
      "単なるリソースグループ間移動とは目的と手順が異なります。"
    ]},
    {id:"availability-zones",re:/\/reliability\/availability-zones-overview/,title:"Availability Zones",points:[
      "Availability Zoneはリージョン内で電源・冷却・ネットワークが独立した物理ゾーンです。",
      "ゾーン冗長/ゾーン指定リソースを使うことで単一データセンター障害への耐性を高めます。",
      "Availability Setは同一データセンター内の論理分散で、ゾーンとは障害境界が異なります。"
    ]},
    {id:"vmss-autoscale",re:/\/virtual-machine-scale-sets\/virtual-machine-scale-sets-autoscale-overview/,title:"VM Scale Sets の自動スケール",points:[
      "VMSSは同一構成のVM群をまとめて管理し、Azure Monitor autoscaleで台数を自動増減できます。",
      "最小/既定/最大インスタンス数と、CPUなどのメトリック条件を組み合わせます。",
      "スケール条件とVMのアップグレードポリシーは別設定です。"
    ]},
    {id:"vmss-upgrade",re:/\/virtual-machine-scale-sets\/virtual-machine-scale-sets-upgrade-policy/,title:"VMSS upgrade policy",points:[
      "VMSSのアップグレードポリシーはモデル変更を既存インスタンスへどう反映するかを決めます。",
      "Automatic、Rolling、Manualなどで更新タイミングと可用性への影響が異なります。",
      "台数を増減するautoscaleとは別の論点です。"
    ]},
    {id:"acr-intro",re:/\/container-registry\/container-registry-intro/,title:"Azure Container Registry",points:[
      "ACRはコンテナーイメージとOCI成果物を保存・配布するプライベートレジストリです。",
      "コンテナーの実行基盤ではなく、イメージ保管/配布が主な役割です。",
      "AKS、Container Apps、ACIなど実行サービスから認証してpullします。"
    ]},
    {id:"acr-service-principal",re:/\/container-registry\/container-registry-auth-service-principal/,title:"ACR のサービス プリンシパル認証",points:[
      "サービス プリンシパルを使うとアプリやCI/CDからACRへ非対話的に認証できます。",
      "必要なpush/pull権限だけをAzure RBACで付与するのが基本です。",
      "人間のサインイン用IDではなく、ワークロード認証として使います。"
    ]},
    {id:"private-endpoint",re:/\/private-link\/private-endpoint-overview/,title:"Private Endpoint",points:[
      "Private EndpointはPaaSサービスへVNet内のプライベートIPを割り当てるPrivate Linkのネットワークインターフェースです。",
      "PaaSのパブリックエンドポイントを使わずプライベート経路で接続できます。",
      "Private DNSでサービスFQDNをPrivate EndpointのIPへ解決させる構成が重要です。"
    ]},
    {id:"acr-rbac",re:/\/container-registry\/container-registry-rbac-(?:built-in-roles-overview|abac-repository-permissions)/,title:"ACR のRBAC/ABAC",points:[
      "ACRでは組み込みAzureロールや、ABAC対応構成ではリポジトリ単位の権限でpush/pullを制御できます。",
      "レジストリ全体の管理権限と、イメージデータへのpush/pull権限を区別します。",
      "必要なリポジトリだけに最小権限を与える構成を選びます。"
    ]},
    {id:"storage-insights",re:/\/storage\/common\/storage-insights-overview/,title:"Storage insights",points:[
      "Storage insightsはAzure Monitorを使ってStorageアカウントの可用性、容量、トランザクション、待機時間などを可視化します。",
      "複数Storageアカウントの状態を一元的に確認し、問題調査へつなげます。",
      "ストレージデータそのものを操作する機能ではなく監視機能です。"
    ]},
    {id:"kusto-where",re:/\/kusto\/query\/where-operator/,title:"KQL where",points:[
      "where 演算子はKQLで条件に一致する行だけを絞り込みます。",
      "時間範囲や列値で対象を減らしてから集計すると効率的です。",
      "列の選択はproject、グループ集計はsummarizeと使い分けます。"
    ]},
    {id:"kusto-project",re:/\/kusto\/query\/project-operator/,title:"KQL project",points:[
      "project 演算子は出力する列を選択・並べ替え・計算します。",
      "行を絞るwhere、集計するsummarizeとは役割が異なります。",
      "ログ結果を必要な列だけへ整形する用途で使います。"
    ]},
    {id:"storage-account",re:/\/storage\/common\/storage-account-overview/,title:"Storage account",points:[
      "Storage accountはBlob、Files、Queue、TableなどAzure Storageサービスの管理単位です。",
      "アカウント種類や冗長性、ネットワーク、暗号化など多くの設定がアカウント単位です。",
      "個々のデータサービスとアカウント全体の設定を分けて考えます。"
    ]},
    {id:"secure-transfer",re:/\/storage\/common\/storage-require-secure-transfer/,title:"Secure transfer required",points:[
      "Secure transfer requiredを有効にすると、Storageへの要求でHTTPSなど安全なプロトコルを要求します。",
      "HTTPなど安全でない接続は拒否されます。",
      "認証方式とは別に、通信経路の暗号化要件を強制する設定です。"
    ]},
    {id:"blob-anonymous",re:/\/storage\/blobs\/anonymous-read-access-configure/,title:"Blob の匿名読み取りアクセス",points:[
      "Blobの匿名読み取りは、認証なしでコンテナー/Blobを読み取れる公開設定です。",
      "セキュリティ上は必要な場合だけ有効化し、アカウントレベルとコンテナーレベルの両方を確認します。",
      "SASやEntra IDによる限定アクセスとは異なります。"
    ]},
    {id:"container-soft-delete",re:/\/storage\/blobs\/soft-delete-container-overview/,title:"Container soft delete",points:[
      "Container soft deleteは削除されたBlobコンテナーとその内容を保持期間内なら復元できる機能です。",
      "Blob soft deleteは個々のBlob、container soft deleteはコンテナー削除を保護します。",
      "必要な復旧単位に応じて両方を使い分けます。"
    ]},
    {id:"private-endpoint-dns",re:/\/private-link\/private-endpoint-dns/,title:"Private Endpoint のDNS",points:[
      "Private Endpoint利用時はサービスの公開FQDNをPrivate EndpointのプライベートIPへ解決できるDNS構成が必要です。",
      "Private DNS ZoneをVNetへリンクし、対象サービスの推奨ゾーン名を使います。",
      "ネットワーク接続が正しくてもDNSが公開IPを返すと期待どおり動かない点が重要です。"
    ]},
    {id:"file-sync",re:/\/storage\/file-sync\/(?:file-sync-introduction|file-sync-server-registration)/,title:"Azure File Sync",points:[
      "Azure File SyncはWindows Server上のファイルをAzure Filesと同期し、複数拠点で同じ共有を利用できるようにします。",
      "Storage Sync Service、sync group、cloud endpoint、server endpointで構成します。",
      "サーバー登録とAzure File Syncエージェントの役割を押さえます。"
    ]},
    {id:"waf",re:/\/web-application-firewall\/ag\/ag-overview/,title:"Web Application Firewall",points:[
      "Application Gateway WAFはHTTP/HTTPSトラフィックを検査し、一般的なWeb攻撃からアプリを保護します。",
      "SQL injectionやXSSなどアプリ層攻撃への防御が主目的です。",
      "L3/L4通信制御のNSGやAzure Firewallとは保護レイヤーが異なります。"
    ]},
    {id:"cloud-shell",re:/\/azure\/cloud-shell\/overview/,title:"Azure Cloud Shell",points:[
      "Azure Cloud ShellはブラウザーからAzure CLIまたはPowerShellを利用できる管理シェルです。",
      "ローカル端末へCLIをインストールせず、Azure認証済み環境から管理できます。",
      "一時的な管理端末やブラウザーだけの運用シナリオで有効です。"
    ]},
    {id:"avd",re:/\/azure\/virtual-desktop\/overview/,title:"Azure Virtual Desktop",points:[
      "Azure Virtual DesktopはAzure上からWindowsデスクトップやRemoteAppを配信するサービスです。",
      "pooled/personal host pool、Windows multi-session、RemoteAppなどを要件に応じて選びます。",
      "通常の単体VM公開ではなく、ユーザー向け仮想デスクトップ/アプリ配信基盤です。"
    ]},
    {id:"rbac",re:/\/role-based-access-control\//,title:"Azure RBAC",points:[
      "Azure RBAC は『誰が・どのスコープで・何をできるか』をロール割り当てで制御する認可機能です。",
      "ロール割り当ては principal（ユーザー/グループ/マネージドID等）・role・scope の組み合わせで考えます。",
      "最小権限を優先し、閲覧だけなら Reader、変更が必要なら用途に合う組み込みロールを選びます。"
    ]},
    {id:"entra",re:/\/entra\/(?!identity\/role-based-access-control\/)/,title:"Microsoft Entra ID",points:[
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
    {id:"vnet",re:/\/virtual-network\/(?!network-security-group)/,title:"Azure Virtual Network",points:[
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
    {id:"monitor",re:/\/azure-monitor\/(?!autoscale\/)/,title:"Azure Monitor",points:[
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

  function resolve(q){
    const links=(q&&Array.isArray(q.learn)?q.learn:[]).filter(x=>x&&typeof x.url==="string");
    for(let i=0;i<links.length;i++){
      const hits=RULES.filter(r=>r.re.test(links[i].url));
      if(hits.length){
        return {rule:hits[0],matchedRuleIds:hits.map(x=>x.id),sourceIndex:i,mode:"url"};
      }
    }
    return {rule:domainFallback(q),matchedRuleIds:[],sourceIndex:-1,mode:"fallback"};
  }

  function build(q,glossary){
    const links=(q&&Array.isArray(q.learn)?q.learn:[]).filter(x=>x&&typeof x.url==="string");
    const resolved=resolve(q),rule=resolved.rule;
    const terms=(glossary&&typeof glossary.match==="function")?glossary.match(q):[];
    const problemPoint=(q&&typeof q.e==="string"&&q.e.trim())?q.e.trim():"この問題では、要件に最も直接対応するAzure機能を選びます。";
    const caution=terms.length?terms[0].exam:"似たサービスを選択肢ごとに『目的・スコープ・動作』で比較します。";
    return {
      title:rule.title||"Microsoft Learn 要約",
      points:(rule.points||[]).slice(0,3),
      problemPoint,
      caution,
      sources:links.slice(0,3),
      ruleId:rule.id||"fallback",
      matchedRuleIds:resolved.matchedRuleIds,
      matchMode:resolved.mode,
      sourceIndex:resolved.sourceIndex
    };
  }

  window.AZ104_LEARN_SUMMARY={rules:RULES,resolve,build};
})();