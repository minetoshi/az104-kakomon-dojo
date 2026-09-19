(function(){
  const RULES=[
    [/パブリック IP|Public IP/i,"パブリック IP は Azure リソースをインターネットから到達可能にするための IP リソースです。直接公開する場合は NSG などの保護も必要です。"],
    [/プライベート IP/i,"プライベート IP は VNet 内部通信向けで、単独ではインターネットからの到達性を提供しません。"],
    [/Bastion/i,"Azure Bastion は VM にパブリック IP を付けたり RDP/SSH ポートを公開したりせずに管理接続するためのサービスです。"],
    [/Front Door/i,"Azure Front Door はグローバルな HTTP/HTTPS アプリ配信、L7 ルーティング、WAF などのためのサービスで、VM の RDP/SSH 管理用途ではありません。"],
    [/Network Watcher/i,"Azure Network Watcher はネットワークの監視・診断サービスで、接続そのものを提供するサービスではありません。"],
    [/Virtual Desktop/i,"Azure Virtual Desktop は仮想デスクトップ/アプリ配信基盤で、既存 VM への単純な管理接続手段とは役割が異なります。"],
    [/Azure Firewall/i,"Azure Firewall はマネージドなネットワーク ファイアウォールです。トラフィック制御には有効ですが、単に VM へ到達させる手段そのものではありません。"],
    [/S2S|拠点間.*VPN|サイト間.*VPN/i,"Site-to-Site VPN はオンプレミス拠点と Azure VNet を VPN Gateway で接続する方式です。対向機器やゲートウェイ構成が必要です。"],
    [/P2S|ポイント対サイト/i,"Point-to-Site VPN は個々のクライアント端末から Azure VNet へ VPN 接続する方式です。ルート変更時はクライアント構成の更新が必要になる場合があります。"],
    [/NSG|ネットワーク セキュリティ グループ/i,"NSG は NIC またはサブネットの受信/送信トラフィックを 5 タプル条件などで Allow/Deny するステートフル フィルターです。"],
    [/Application Security Group|アプリケーション セキュリティ グループ/i,"Application Security Group (ASG) は NIC をアプリ単位で論理グループ化し、NSG ルールの送信元/宛先として使えます。"],
    [/サービス タグ|Service Tag/i,"Service Tag は Azure サービスの IP 範囲を表す論理名で、個別 VM のグルーピング用途ではありません。"],
    [/ユーザー定義ルート|UDR/i,"UDR は Azure のシステム ルートを上書き/補完し、NVA や Virtual network gateway などへトラフィックを誘導できます。"],
    [/VNet peering|ネットワーク ピアリング|仮想ネットワーク ピアリング/i,"VNet Peering は Azure バックボーン上で VNet 間をプライベート接続します。アドレス空間の重複は許可されません。"],
    [/5 タプル|5-tuple/i,"5 タプル ハッシュは送信元/宛先 IP、送信元/宛先ポート、プロトコルを使って新しいフローをバックエンドへ分散します。"],
    [/ソース IP アフィニティ|Client IP|クライアント IP/i,"Source IP affinity / Client IP は同じクライアントを同じバックエンドへ維持しやすくするセッション永続化設定です。"],
    [/ヘルス プローブ|正常性プローブ/i,"Load Balancer の Health Probe は正常なバックエンドだけへ新規フローを送るための死活監視です。"],
    [/インバウンド NAT/i,"Inbound NAT rule は特定フロントエンド ポートを特定 VM/ポートへ変換する機能で、負荷分散やセッション固定そのものとは別です。"],
    [/netstat/i,"netstat は接続状態や LISTENING ポートを確認する OS コマンドです。"],
    [/Private DNS|プライベート DNS/i,"Azure Private DNS は VNet 内で利用するプライベート DNS ゾーンをマネージド提供します。"],
    [/Public DNS|パブリック DNS/i,"Azure Public DNS はインターネット向けの権威 DNS ホスティングです。プライベート VNet 内専用名前解決とは用途が異なります。"],
    [/DNS Private Resolver/i,"Azure DNS Private Resolver は Azure とオンプレミスなどの DNS 名前解決を転送するマネージド リゾルバーです。Private DNS の自動登録そのものではありません。"],
    [/仮想ネットワーク リンク|virtual network link/i,"Private DNS zone の Virtual network link により VNet からゾーンを解決でき、自動登録も設定できます。"],
    [/\bNS\b.*レコード|NS レコード/i,"NS レコードはゾーン/サブドメインを担当する権威 DNS サーバーを示し、サブドメイン委任に使います。"],
    [/\bCNAME\b/i,"CNAME はあるホスト名を別のホスト名へエイリアスする DNS レコードです。宛先 IP が変わってもホスト名を追従できます。"],
    [/\bSOA\b/i,"SOA は DNS ゾーンの権威情報やシリアル番号などを保持するレコードで、ホスト名エイリアスやサブドメイン委任の主目的には使いません。"],
    [/\bSRV\b/i,"SRV はサービスのホスト名とポートを公開する DNS レコードです。Web App の単純な別名設定には通常使いません。"],
    [/\bTXT\b/i,"TXT は文字列情報を保持し、ドメイン検証や SPF などに使われます。IP 変更へ追従するホスト名エイリアスではありません。"],
    [/テンプレートのエクスポート|Export template/i,"Export template は既存 Azure リソースの構成を ARM テンプレートとして取得する機能です。"],
    [/New-AzResourceGroupDeployment/i,"New-AzResourceGroupDeployment はリソース グループ スコープへ ARM テンプレートをデプロイする PowerShell コマンドレットです。"],
    [/New-AzSubscriptionDeployment/i,"New-AzSubscriptionDeployment はサブスクリプション スコープのテンプレート デプロイに使用します。"],
    [/New-AzManagementGroupDeployment/i,"New-AzManagementGroupDeployment は管理グループ スコープのテンプレート デプロイに使用します。"],
    [/--parameters/i,"--parameters は Azure CLI の ARM/Bicep デプロイでパラメーター値を指定するオプションです。"],
    [/--template-file/i,"--template-file はデプロイするテンプレート ファイルを指定するオプションで、パラメーター値の指定とは役割が異なります。"],
    [/\bcopy\b|copy 要素/i,"ARM template の copy ループは同一種別のリソースやプロパティを複数回生成するために使います。"],
    [/Deployments|デプロイメント/i,"Resource group の Deployments では ARM/Bicep のデプロイ履歴、状態、時刻、操作内容などを確認できます。"],
    [/デタッチ|detach/i,"Managed Disk は対応条件下で VM からデタッチし、別 VM へアタッチできます。データ ディスク移動では元 VM からのデタッチが基本です。"],
    [/Redeploy|再デプロイ/i,"VM Redeploy は OS ディスクや構成を保持したまま VM を別の Azure ホストへ移動するトラブルシューティング操作です。"],
    [/Spot/i,"Azure Spot VM は未使用容量を低価格で利用する代わりに、Azure の容量需要や価格条件によって eviction される可能性があります。"],
    [/Azure Files|ファイル共有/i,"Azure Files は SMB/NFS のマネージド ファイル共有で、複数クライアントからの共有ファイルやコンテナーの永続ボリュームに利用できます。"],
    [/Blob Storage|BLOB/i,"Azure Blob Storage は非構造化オブジェクト データ向けストレージです。SMB ファイル共有とは用途が異なります。"],
    [/Queue Storage|キュー/i,"Azure Queue Storage は大量のメッセージを非同期に保存するキュー サービスで、ファイル システム用途ではありません。"],
    [/Azure SQL Database/i,"Azure SQL Database はリレーショナル データベース サービスです。汎用ファイル共有や Blob 保管とは役割が異なります。"],
    [/イベント駆動|Service Bus/i,"Azure Container Apps は KEDA ベースのイベント駆動スケールで Service Bus などの外部イベントに応じてレプリカ数を変更できます。"],
    [/サイドカー|sidecar/i,"Sidecar はメイン コンテナーと並行して動作し、ログ転送、プロキシ、キャッシュ更新などの補助処理を担当します。"],
    [/初期化 \(?init\)?|init コンテナー/i,"Init container はメイン コンテナー起動前に完了すべき初期化処理向けで、継続的な補助処理には向きません。"],
    [/Application Logging.*Blob|アプリケーション ログ \(BLOB\)/i,"App Service の Application Logging to Blob はアプリケーション ログを Blob Storage に永続保存する方式です。"],
    [/Application Logging.*File|アプリケーション ログ \(ファイル システム\)/i,"App Service の File System logging は一時的なトラブルシューティング向けで、長期永続保存には向きません。"],
    [/Standard/i,"App Service Standard はカスタム ドメイン、より大きなスケール、autoscale など本番向け機能を提供します。"],
    [/Basic/i,"App Service Basic は本番向け基本機能を持ちますが、メトリック ベースの autoscale など一部機能は上位プランが必要です。"],
    [/Free/i,"App Service Free は検証向けで、カスタム ドメインや大規模スケールなど本番要件を満たせない場合があります。"],
    [/Premium/i,"App Service Premium は高性能・高度機能向けですが、要件が Standard で満たせる場合はコスト最小化の観点で過剰になり得ます。"],
    [/App Service/i,"Azure App Service は Web アプリ/API/コンテナーをマネージドでホストし、カスタム ドメインやスケール機能を提供します。"],
    [/AKS|Kubernetes/i,"AKS は Kubernetes の柔軟性を提供しますが、App Service などの PaaS より運用・構成の責任範囲が広くなります。"],
    [/Container Instances/i,"Azure Container Instances は単純なコンテナー実行に適しますが、フル機能の Web ホスティングや高度な autoscale では他サービスが適する場合があります。"],
    [/外部コラボレーション|External collaboration/i,"External collaboration settings は Microsoft Entra B2B のゲスト招待可否や招待権限の範囲を制御します。"],
    [/条件付きアクセス|Conditional Access/i,"Conditional Access はサインイン条件に応じて MFA、ブロック、準拠デバイス要求などを適用するアクセス制御です。ゲスト招待権限そのものの設定ではありません。"],
    [/クロステナント|Cross-tenant/i,"Cross-tenant access settings は別 Entra テナントとの B2B collaboration/direct connect の信頼・受入条件を制御します。"],
    [/アクセス レビュー|Access Review/i,"Access Review はユーザーのアクセス権やグループ メンバーシップを定期的にレビューするための機能です。"],
    [/Guest Inviter|ゲスト招待/i,"Guest Inviter は外部ゲスト招待に特化した Microsoft Entra ロールで、Global Administrator より最小権限です。"],
    [/利用場所|Usage location/i,"Usage location は Microsoft 365 などのライセンス割り当て前に必要となるユーザー属性で、サービス提供地域の判定に使われます。"],
    [/\bReader\b|リーダー/i,"Reader は Azure リソースを閲覧できますが変更できない組み込みロールで、参照のみの要件に適します。"],
    [/\bContributor\b|共同作成者|投稿者/i,"Contributor はリソースの作成・変更・削除が可能ですが、ロール割り当ては管理できません。閲覧のみの要件には過剰です。"],
    [/\bOwner\b|所有者/i,"Owner はリソース管理に加えてアクセス権管理も可能な強いロールです。最小権限が求められる場面では通常過剰です。"],
    [/Tag Contributor|タグ共同作成者/i,"Tag Contributor は Azure リソースのタグ管理に特化した組み込みロールです。"],
    [/Storage Account Contributor|ストレージ アカウント共同作成者/i,"Storage Account Contributor はストレージ アカウントの管理プレーン操作やアクセス キー取得を行えますが、データそのものへのアクセスは別権限です。"],
    [/Blob Data Contributor|BLOB データ共同作成者/i,"Storage Blob Data Contributor は Blob データの読み書き/削除などデータ プレーン権限を持ちますが、ストレージ アカウント キー管理とは別です。"],
    [/Cost Management Contributor|コスト管理共同作成者/i,"Cost Management Contributor はコスト表示、予算、エクスポートなど Cost Management を管理できますが、一般 Azure リソースの変更権限は持ちません。"],
    [/Billing Reader|請求書リーダー/i,"Billing Reader は請求情報の参照向けで、予算など Cost Management 設定を管理する権限とは異なります。"],
    [/削除ロック|CanNotDelete|管理ロック/i,"CanNotDelete ロックは対象リソースや下位リソースの削除を防ぎます。ロック自体を削除できる権限を持つ管理者には解除可能です。"],
    [/共有アクセス署名|SAS/i,"Shared Access Signature (SAS) はストレージ リソースへの権限、対象、開始/有効期限などを限定した一時アクセスを発行できます。"],
    [/アクセス キー/i,"Storage account key はアカウント全体に強いアクセスを与える共有秘密情報で、短時間・最小権限の外部共有には SAS の方が適します。"],
    [/ID ベース|Entra.*認証/i,"ID ベース認証は共有キーではなく Entra ID/AD DS などのユーザー・サービス ID でアクセスを制御します。"],
    [/Data Lake Storage|階層型名前空間/i,"Azure Data Lake Storage Gen2 は Blob Storage に hierarchical namespace を追加し、分析ワークロード向けのディレクトリ/ACL セマンティクスを提供します。"],
    [/\bZRS\b|ゾーン冗長/i,"ZRS は同一リージョン内の複数 Availability Zone に同期複製し、ゾーン障害への耐性を高めます。"],
    [/\bLRS\b|ローカル冗長/i,"LRS は単一リージョン内の単一物理ロケーションで複数コピーを保持します。ゾーン障害全体には対応しません。"],
    [/\bGRS\b|ジオ冗長/i,"GRS はプライマリ リージョンの LRS に加え、別リージョンへ非同期複製します。"],
    [/RA-GRS|読み取りアクセス.*ジオ/i,"RA-GRS は GRS に加えてセカンダリ リージョンからの読み取りアクセスを提供します。"],
    [/バージョン管理|versioning/i,"Blob versioning は Blob 更新時に以前のバージョンを保持します。Object Replication の前提機能でもあります。"],
    [/変更フィード|change feed/i,"Blob change feed は Blob の作成・変更・削除イベントを順序付きログとして保持し、Object Replication のソース側前提です。"],
    [/オブジェクト レプリケーション|Object Replication/i,"Blob Object Replication はブロック Blob を非同期に別ストレージ アカウントへ複製します。source/destination の versioning と source の change feed が必要です。"],
    [/不変|Immutable/i,"Immutable Storage は WORM (Write Once, Read Many) を実現し、保持期間中の変更・削除を防止します。"],
    [/ライフサイクル/i,"Lifecycle Management は Blob の経過日数やアクセス条件に応じて tier 移動や削除を自動化します。WORM 保護とは目的が異なります。"],
    [/アクセス追跡|最終アクセス/i,"Last access time tracking は Blob の最終アクセス時刻を記録し、その時刻を lifecycle rule の条件に利用できます。"],
    [/\bArchive\b/i,"Archive は最安のオフライン層ですが、読み出す前に再水和が必要で、即時アクセス要件には向きません。"],
    [/\bCold\b/i,"Cold は長めの最低保持期間を持つ低頻度アクセス向けオンライン層で、データは即時アクセス可能です。"],
    [/\bCool\b/i,"Cool は低頻度アクセス向けオンライン層で、Hot より保存単価が低く、Archive と異なり即時読み出しできます。"],
    [/\bHot\b/i,"Hot は頻繁にアクセスするデータ向けで、保存単価は高めですがアクセス コストを抑えやすい層です。"],
    [/Packet capture|パケット キャプチャ/i,"Network Watcher Packet Capture は VM/NIC の実パケットを取得し、プロトコル レベルの詳細解析に使います。"],
    [/IP フロー検証|IP flow verify/i,"IP flow verify は指定したフローが NSG により Allow/Deny されるか、および該当ルールを即時確認します。"],
    [/Flow Log|フロー ログ/i,"Flow Logs はネットワーク フローの履歴を記録し、長期分析や Traffic Analytics に利用します。単一通信の即時 NSG 判定には IP flow verify が適します。"],
    [/\bsummarize\b/i,"KQL の summarize は group by と count/sum/avg などの集計を行う演算子です。"],
    [/\bproject\b/i,"KQL の project は出力列の選択・並び替えに使います。集計そのものは行いません。"],
    [/\bextend\b/i,"KQL の extend は計算列を追加する演算子で、グループ集計の主目的には使いません。"],
    [/\bwhere\b/i,"KQL の where は行を条件で絞り込む演算子で、集計は summarize が担当します。"],
    [/Action Group|アクション グループ/i,"Action Group は Azure Monitor/Advisor アラートの通知先や自動アクション (メール、SMS、Webhook、Function、Runbook など) をまとめます。"],
    [/アラート ルール|Alert rule/i,"Alert rule は監視対象、条件、しきい値、重大度など『いつアラートを発火するか』を定義します。"],
    [/Azure Monitor Agent|AMA/i,"Azure Monitor Agent (AMA) は Data Collection Rule と組み合わせて VM/Arc サーバーからログやメトリックを収集します。"],
    [/MARS|Microsoft Azure Recovery Services/i,"MARS agent は Windows Server/クライアントのファイル・フォルダーやシステム状態を Recovery Services vault に直接バックアップします。"],
    [/Recovery Services.*vault|Recovery Services コンテナー/i,"Recovery Services vault は Azure Backup/Site Recovery の保護データやポリシーを管理します。削除前には保護停止や soft-deleted item の処理が必要です。"],
    [/Instant Restore|インスタント回復/i,"Azure VM Backup の Instant Restore はスナップショットを一定期間保持し、復旧ポイントへの高速アクセスを可能にします。"],
    [/SSPR|セルフサービス パスワード/i,"SSPR はユーザー自身によるパスワード リセット機能です。オンプレミス AD への password writeback には適切な Entra ID ライセンスと同期構成が必要です。"],
    [/\bP1\b/i,"Microsoft Entra ID P1 は Conditional Access、グループベース ライセンス、オンプレミスへの password writeback を含む SSPR などの機能要件で使われます。"],
    [/\bP2\b/i,"Microsoft Entra ID P2 は P1 に加えて Identity Protection や PIM など高度な ID ガバナンス/リスク機能を提供します。"],
    [/Free/i,"Free エディションは基本 ID 機能を提供しますが、高度な SSPR/Conditional Access など一部機能は上位ライセンスが必要です。"]
  ];

  const TIPS=[
    [/Bastion/i,"「RDP/SSH をインターネットに公開しない」「VM に Public IP を持たせない」なら Bastion を最優先で連想します。"],
    [/最小限の特権|Reader|Guest Inviter|Tag Contributor|Cost Management Contributor/i,"AZ-104 では『最小限の特権』が出たら、要件を満たす最も狭い組み込みロールを選びます。"],
    [/ZRS|可用性ゾーン/i,"「同一リージョン」「複数 Availability Zone」なら ZRS。別リージョンまで含める場合は GRS/GZRS 系を検討します。"],
    [/Object Replication|オブジェクト レプリケーション|versioning|変更フィード/i,"Object Replication は『source/destination の versioning + source の change feed』をセットで覚えます。"],
    [/Archive|Cool|Cold|Hot/i,"アクセス層は『アクセス頻度』『即時取得が必要か』『最低保持期間』の3点で切り分けます。"],
    [/NSG|IP flow/i,"NSG 問題では「どこに関連付くか (NIC/Subnet)」「どのルールが効くか」「即時判定なら IP flow verify」を分けて考えます。"],
    [/Load Balancer|ヘルス プローブ|5 タプル|セッション永続/i,"Load Balancer は『Health Probe=正常性』『Distribution mode=振り分け方』『Session persistence=固定性』を別概念として整理します。"],
    [/ARM|テンプレート|copy|New-AzResourceGroupDeployment/i,"ARM/Bicep はスコープを見抜くことが重要です。Resource Group / Subscription / Management Group でデプロイ コマンドが変わります。"],
    [/App Service|autoscale|Standard|Basic/i,"App Service は『プランの機能差』が頻出です。autoscale、deployment slots、custom domain、instance 上限を要件ごとに確認します。"],
    [/Private DNS|DNS/i,"DNS は『Public/Private』『ゾーンの委任』『VNet link』『Resolver』を役割ごとに分けて覚えます。"],
    [/SAS|アクセス キー/i,"Storage の一時共有では『期限・権限を絞れる SAS』、アカウント全体に強い権限を与える key は避ける、が基本です。"],
    [/不変|Immutable/i,"「一定期間変更・削除不可」= Immutable/WORM。「古いデータを移動/削除」= Lifecycle Management と切り分けます。"],
    [/MARS|Backup|Recovery Services|Instant Restore/i,"Backup は『何を守るか (VM全体/ファイル)』『どこへ保存するか』『復元速度』でサービス/エージェントを切り分けます。"],
    [/SSPR|Guest|外部コラボレーション/i,"Entra 問題では『ユーザー種類』『同期有無』『ライセンス』『ロール』を先に整理すると誤答を減らせます。"],
    [/UDR|ルート/i,"NVA 経由の強制ルーティングは UDR と next hop=Virtual appliance が基本形です。"]
  ];

  function noteFor(opt){
    for(const [re,n] of RULES){ if(re.test(String(opt))) return n; }
    return "";
  }
  function decision(q){
    const t=q.q||"";
    const points=[];
    const pairs=[
      [/最小限の特権/,"最小権限"],
      [/管理作業を最小限/,"運用負荷を最小化"],
      [/コストを最小限/,"コスト最小化"],
      [/インターネットに公開せず|公開したくありません/,"インターネット非公開"],
      [/自動|自動的/,"自動化"],
      [/永続/,"永続性"],
      [/高可用性/,"高可用性"],
      [/可用性ゾーン/,"可用性ゾーン"],
      [/数秒以内|即時/,"即時アクセス"],
      [/長期|年間|年保存|バックアップ/,"長期保管/バックアップ"],
      [/外部ユーザー|ゲスト/,"外部 ID"],
      [/複数選択|2 つ|2つ|3 つ|3つ/,"複数条件を同時に満たす"],
      [/RDP|SSH/,"管理接続"],
      [/SMB/,"SMB"],
      [/NSG/,"NSG 判定"],
      [/ロード バランサー|Load Balancer/i,"負荷分散"],
      [/ARM|テンプレート/i,"ARM/Bicep デプロイ"]
    ];
    for(const [re,label] of pairs){if(re.test(t)&&!points.includes(label))points.push(label);}
    if(!points.length) return "設問の最後にある『何を実現したいか』を先に特定し、その要件を直接満たす Azure 機能を選びます。";
    return "この問題の決め手は「"+points.slice(0,3).join("」「")+"」です。要件を満たす機能だけを残して選択肢を消去します。";
  }
  function tip(q){
    const blob=(q.q+" "+q.o.join(" ")+" "+q.a.map(i=>q.o[i]).join(" "));
    for(const [re,t] of TIPS){if(re.test(blob))return t;}
    return "サービス名の暗記だけでなく、『対象』『スコープ』『必要な前提条件』『管理負荷/コスト』をセットで覚えると、類似問題にも対応できます。";
  }
  function build(q){
    const correct=new Set(q.a||[]);
    const options=(q.o||[]).map((opt,i)=>{
      const n=noteFor(opt);
      if(correct.has(i)){
        return {index:i,ok:true,text:n||"この選択肢が設問の要件を直接満たします。"};
      }
      return {index:i,ok:false,text:n ? n+" ただし、この設問で要求されている条件を直接満たす選択肢ではありません。" : "この選択肢では設問の主要要件を直接満たせません。正解選択肢の役割・スコープ・前提条件と比較して消去します。"};
    });
    return {
      decision:decision(q),
      correctReason:(q.e||"")+" "+(q.a||[]).map(i=>noteFor(q.o[i])).filter(Boolean).join(" "),
      options,
      tip:tip(q)
    };
  }
  window.AZ104_EXPLAIN={build};
})();