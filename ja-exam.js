(function(){
  // 表示専用の日本語化。q.q / q.o / q.a / uidを変更しない。
  const labels=new Map([["FileStorage","Premium ファイル共有用（FileStorage）"],["Standard general-purpose v2 のみ","Standard 汎用 v2（StorageV2）のみ"],["Premium BlockBlobStorage","Premium ブロック BLOB（BlockBlobStorage）"],["Premium PageBlobStorage","Premium ページ BLOB（PageBlobStorage）"],["Standard GPv2","Standard 汎用 v2（StorageV2）"],["Premium Block Blob","Premium ブロック BLOB"],["Premium Page Blob","Premium ページ BLOB"],["Premium File Share","Premium ファイル共有"],["StorageV2 (general-purpose v2)","汎用 v2 ストレージ アカウント（StorageV2）"],["Storage (general-purpose v1)","汎用 v1 ストレージ アカウント（Storage）"],["Basic","Basic（基本）"],["Standard","Standard（標準）"],["Premium","Premium（高性能）"],["Archive","アーカイブ層（Archive）"],["Hot","ホット層（Hot）"],["Cool","クール層（Cool）"],["Cold","コールド層（Cold）"],["RA-GRS","読み取りアクセス geo 冗長ストレージ（RA-GRS）"],["Azure Firewall","Azure Firewall（Azure のファイアウォール）"],["Azure Bastion","Azure Bastion（公開IP不要のVM管理接続）"],["Azure Front Door","Azure Front Door（グローバルなWeb配信・負荷分散）"],["Azure Network Watcher","Azure Network Watcher（ネットワーク監視・診断）"],["Network Watcher","Network Watcher（ネットワーク監視・診断）"],["Azure Virtual Desktop","Azure Virtual Desktop（仮想デスクトップ配信）"],["Azure DNS","Azure DNS（DNSゾーンの管理）"],["Azure Load Balancer","Azure Load Balancer（第4層の負荷分散）"],["Azure Application Gateway","Azure Application Gateway（HTTP/HTTPSの負荷分散）"],["Azure Traffic Manager","Azure Traffic Manager（DNSベースのトラフィック振り分け）"],["Azure Container Registry","Azure Container Registry（コンテナーイメージ保管）"],["Azure Container Instances","Azure Container Instances（単体コンテナー実行）"],["Azure Container Instances (ACI)","Azure Container Instances（単体コンテナー実行／ACI）"],["Azure Container Apps","Azure Container Apps（マネージドなコンテナーアプリ実行）"],["Azure Kubernetes Service (AKS)","Azure Kubernetes Service（Kubernetesの運用基盤／AKS）"],["Azure Container Registry (ACR)","Azure Container Registry（イメージ保管庫／ACR）"],["Azure Files","Azure Files（マネージド ファイル共有）"],["Azure Blob Storage","Azure Blob Storage（オブジェクト ストレージ）"],["Blob Storage","Blob Storage（オブジェクト ストレージ）"],["Azure Queue Storage","Azure Queue Storage（メッセージ キュー）"],["Azure Table Storage","Azure Table Storage（NoSQLテーブル）"],["Azure SQL Database","Azure SQL Database（マネージド SQL データベース）"],["Azure Event Grid","Azure Event Grid（イベント配信サービス）"],["Azure CDN","Azure CDN（コンテンツ配信ネットワーク）"],["Azure Content Delivery Network (CDN)","Azure CDN（コンテンツ配信ネットワーク）"],["Azure VM","Azure VM（仮想マシン）"],["Azure VM Scale Sets","Azure VM Scale Sets（VMのスケール セット）"],["Azure Virtual Machine Scale Sets","Azure Virtual Machine Scale Sets（VMのスケール セット）"],["Azure App Service","Azure App Service（Webアプリ実行基盤）"],["Azure Site Recovery","Azure Site Recovery（災害復旧・複製）"],["Azure Backup","Azure Backup（バックアップサービス）"],["Azure Files Sync","Azure File Sync（ファイルサーバー同期）"],["Azure File Sync","Azure File Sync（ファイルサーバー同期）"],["Azure Policy","Azure Policy（リソース構成ルールの強制・監査）"],["Azure Monitor","Azure Monitor（リソース監視）"],["Azure Monitor Agent","Azure Monitor Agent（監視データ収集エージェント）"],["Microsoft Azure Backup Server (MABS)","Microsoft Azure Backup Server（バックアップサーバー／MABS）"],["Microsoft Entra Kerberos","Microsoft Entra Kerberos（Entra ID連携のKerberos認証）"],["Microsoft Entra ID P1","Microsoft Entra ID P1（ID管理の有料プラン）"],["Microsoft Entra ID P2","Microsoft Entra ID P2（高度なID保護プラン）"],["Azure Connected Machine Agent","Azure Connected Machine Agent（Azure Arc接続用エージェント）"],["Site Recovery Mobility Service","Site Recovery Mobility Service（レプリケーション用エージェント）"],["VMAccess extension","VMAccess 拡張機能（VMのログイン回復）"],["Custom Script Extension","Custom Script Extension（VMでスクリプトを実行）"],["Azure Resource Mover","Azure Resource Mover（リージョン間移動）"],["Azure Advisor","Azure Advisor（最適化の推奨事項）"],["Advisor","Advisor（Azureの推奨事項）"],["Azure Data Box","Azure Data Box（物理デバイスによるデータ移行）"],["Azure Storage Explorer","Azure Storage Explorer（ストレージ管理GUI）"],["AzCopy","AzCopy（ストレージ転送用コマンド）"],["Reader","閲覧者ロール（Reader）"],["Contributor","共同作成者ロール（Contributor）"],["Owner","所有者ロール（Owner）"],["User Access Administrator","ユーザー アクセス管理者ロール（User Access Administrator）"],["Storage Account Contributor","ストレージ アカウント共同作成者（Storage Account Contributor）"],["Storage Blob Data Reader","ストレージ BLOB データ閲覧者（Storage Blob Data Reader）"],["Cost Management Contributor","コスト管理共同作成者（Cost Management Contributor）"],["Billing Reader","請求閲覧者（Billing Reader）"],["Tag Contributor","タグ共同作成者（Tag Contributor）"],["Guest Inviter","ゲスト招待者（Guest Inviter）"],["Global Administrator","全体管理者（Global Administrator）"],["Security Administrator","セキュリティ管理者（Security Administrator）"],["Groups Administrator","グループ管理者（Groups Administrator）"],["AcrPull","コンテナーイメージの取得権限（AcrPull）"],["AcrPush","コンテナーイメージの登録・取得権限（AcrPush）"],["Storage File Data SMB Share Contributor","SMBファイル共有の変更権限（Storage File Data SMB Share Contributor）"],["Storage File Data SMB Share Reader","SMBファイル共有の読み取り権限（Storage File Data SMB Share Reader）"],["Storage File Data SMB Share Elevated Contributor","SMBファイル共有の昇格された変更権限（Storage File Data SMB Share Elevated Contributor）"],["Policy","ポリシー（Policy）"],["Action Group","アクション グループ（アラート通知・処理）"],["Application Security Group","アプリケーション セキュリティ グループ（ASG）"],["Availability Set","可用性セット（Availability Set）"],["Management Group","管理グループ（Management Group）"],["Management group","管理グループ（Management group）"],["Resource lock","リソース ロック（誤操作防止）"],["Management lock","管理ロック（リソースの操作制限）"],["Availability zone","可用性ゾーン（物理的に分離された設備）"],["Fault domain","障害ドメイン（共通障害の範囲）"],["Update domain","更新ドメイン（更新を分散する範囲）"],["Storage account","ストレージ アカウント（Storage account）"],["Storage account key","ストレージ アカウント キー（Storage account key）"],["Blob versioning","BLOB のバージョン管理（Blob versioning）"],["Blob soft delete","BLOB の論理削除（復元可能な削除）"],["Container soft delete","コンテナーの論理削除（復元可能な削除）"],["Soft delete","論理削除（Soft delete）"],["Static website","静的Webサイト（Static website）"],["Object replication","オブジェクト レプリケーション（別アカウントへの複製）"],["Lifecycle rule","ライフサイクル規則（Lifecycle rule）"],["Lifecycle management","ライフサイクル管理（Lifecycle management）"],["Change feed","変更フィード（変更イベントの記録）"],["Access tracking","アクセス追跡（Access tracking）"],["Public access","パブリックアクセス（匿名公開）"],["Container public access","コンテナーの匿名アクセス（Container public access）"],["User delegation SAS","ユーザー委任 SAS（Entra IDベースの署名）"],["Service SAS","サービス SAS（特定ストレージサービスへの権限委任）"],["Account SAS","アカウント SAS（複数サービスへの権限委任）"],["SAS token","SAS トークン（期限付きの共有アクセス署名）"],["SAS expiry","SAS の有効期限"],["File share snapshot","ファイル共有のスナップショット"],["Blob snapshot","BLOB のスナップショット"],["Storage firewall","ストレージのファイアウォール"],["Private Endpoint","プライベート エンドポイント（PaaSのプライベートIP接続）"],["Service Endpoint","サービス エンドポイント（サブネットからPaaSへの接続制御）"],["Virtual Network Service Endpoint","仮想ネットワークのサービス エンドポイント"],["VNet peering","VNet ピアリング（仮想ネットワーク間接続）"],["Private DNS zone","プライベート DNS ゾーン（内部名前解決）"],["Azure DNS zone","Azure DNS ゾーン（名前解決）"],["Network Insights","ネットワーク分析（Network Insights）"],["Storage insights","ストレージ分析（Storage insights）"],["VM insights","VM分析（VM insights）"],["Activity Log","アクティビティ ログ（操作記録）"],["Activity log","アクティビティ ログ（操作記録）"],["Azure Activity Log","Azure アクティビティ ログ（管理操作記録）"],["Log Analytics workspace","Log Analytics ワークスペース（ログの保存・分析）"],["Log Analytics logs","Log Analytics のログ（クエリ可能なログ）"],["Azure Monitor Metrics","Azure Monitor メトリック（数値時系列）"],["Azure Resource Graph","Azure Resource Graph（リソース検索）"],["Recovery Services vault","Recovery Services コンテナー（バックアップ保管・管理）"],["Backup vault","Backup コンテナー（バックアップ管理）"],["Key Vault","Key Vault（鍵・シークレット管理）"],["Event Hub","Event Hub（イベントのストリーム受信）"],["Connection Monitor","接続モニター（通信の継続監視）"],["Connection monitor","接続モニター（通信の継続監視）"],["IP flow verify","IP フロー検証（NSGの許可・拒否診断）"],["Packet capture","パケット キャプチャ（通信データの取得）"],["Traffic Analytics","トラフィック分析（通信ログ分析）"],["NSG flow logs","NSG フロー ログ（通信フローの記録）"],["Topology","トポロジ（ネットワーク構成図）"],["Next hop","次ホップ（通信の転送先）"],["Route Table","ルート テーブル（経路表）"],["Route table","ルート テーブル（経路表）"],["Service Tag","サービス タグ（AzureサービスのIP範囲）"],["NAT Gateway","NAT Gateway（送信元アドレス変換）"],["Load Balancer health probe","ロード バランサーの正常性プローブ"],["Load Balancer inbound NAT rule","ロード バランサーの受信 NAT 規則"],["Azure ExpressRoute","Azure ExpressRoute（専用プライベート接続）"],["Azure Private Link","Azure Private Link（サービスへのプライベート接続）"],["Public IP prefix","パブリックIPプレフィックス（IPアドレス範囲）"],["Public IP Prefix","パブリックIPプレフィックス（IPアドレス範囲）"],["Subnet delegation","サブネット委任（サービス専用のサブネット割り当て）"],["IP forwarding","IP転送（NICでの転送を許可）"],["Effective security rules","有効なセキュリティ規則（適用後のNSG規則）"],["DNS settings","DNS 設定"],["DNS TTL","DNS の有効期限（TTL）"],["NSG priority","NSG規則の優先度"],["NSG rule priority","NSG規則の優先度"],["Resource group","リソース グループ（Resource group）"],["App Service plan","App Service プラン（Webアプリの実行基盤）"],["Container Apps environment","Container Apps 環境（コンテナーアプリの配置単位）"],["Application Gateway WAF_v2","Application Gateway WAF_v2（Webアプリへの攻撃を防御）"],["Source IP affinity (Client IP)","送信元IPによるセッション維持（Client IP）"],["Client IP and protocol","クライアントIPとプロトコル（セッション維持）"],["5-tuple hash","5タプル ハッシュ（IP・ポート・プロトコルで接続を分散）"],["Outbound rule","アウトバウンド規則（送信通信の設定）"],["HA Ports","HA ポート（全ポートを対象にする負荷分散）"],["External collaboration settings","外部コラボレーション設定"],["Conditional Access","条件付きアクセス"],["Authentication methods","認証方法（Authentication methods）"],["Identity Protection","ID 保護（Identity Protection）"],["Access control (IAM)","アクセス制御（IAM）"],["Deployments","デプロイ（リソースの展開履歴）"],["Locks","ロック（削除・変更の制限）"],["Redeploy","再デプロイ（VMを別ホストで再展開）"],["Resize","サイズ変更（VMサイズの変更）"],["Reimage","再イメージ化（VMのOSディスクを再構成）"],["Capture","イメージのキャプチャ"],["Image","イメージ（VM構成の元データ）"],["Commit","コミット（フェールオーバーの確定）"],["Test failover","テスト フェールオーバー"],["Re-protect","再保護（レプリケーションを逆方向へ構成）"],["Delete replication","レプリケーションの削除"],["Stop backup","バックアップの停止"],["Stop backup with delete data","バックアップ停止とデータ削除"],["Delete backup data","バックアップ データの削除"],["Delete recovery points","復旧ポイントの削除"],["Disable replication permanently","レプリケーションの完全停止"],["Create new virtual machine","新しい仮想マシンを作成"],["Replace existing virtual machine","既存の仮想マシンを置き換える"],["Commit failover","フェールオーバーを確定する"],["Recovery plan","復旧計画（災害復旧の実行手順）"],["Network mapping","ネットワーク マッピング（復旧先ネットワークの対応設定）"],["Target region","移行・復旧先リージョン"],["Backup schedule","バックアップのスケジュール"],["Recovery point retention","復旧ポイントの保持期間"],["Backup policy","バックアップ ポリシー"],["App-consistent snapshot frequency","アプリケーション整合性スナップショットの頻度"],["App Service Backup","App Service のバックアップ"],["Backup","バックアップ"],["Diagnostic setting","診断設定（ログ・メトリックの転送）"],["Alert processing rule","アラート処理規則（通知の抑止など）"],["Storage lifecycle rule","ストレージのライフサイクル規則"],["Resource lock","リソース ロック（誤操作防止）"],["Azure Policy initiative","Azure Policy イニシアチブ（ポリシーセット）"],["Load Balancer session persistence","ロード バランサーのセッション維持"],["Application Logging (Blob)","アプリケーション ログ（BLOBへ保存）"],["Application Logging (File System)","アプリケーション ログ（ファイルシステム）"],["Warning","警告（Warning）"],["Verbose","詳細ログ（Verbose）"],["Always On","常時実行（Always On）"],["HTTPS Only","HTTPS のみ（安全な通信を強制）"],["ARR Affinity","ARR アフィニティ（セッションを同じインスタンスへ）"],["WebSockets","WebSocket 通信"],["Deployment slot","デプロイ スロット（本番と切替可能な環境）"],["Slot swap","スロットの入れ替え（本番リリース）"],["Scale up","スケールアップ（性能拡張）"],["Autoscale","自動スケール"],["Backup restore","バックアップから復元"],["Redeploy VM","仮想マシンを再デプロイ"],["App Service managed certificate","App Service のマネージド証明書"],["Virtual Network Integration","仮想ネットワーク統合（送信接続）"],["Storage account の Firewalls and virtual networks","ストレージ アカウントのファイアウォールと仮想ネットワーク"],["Public inbound ports を None にする","パブリック受信ポートを「なし（None）」にする"],["Always","常に実行（Always）"],["OnFailure","失敗時に実行（OnFailure）"],["Never","実行しない（Never）"],["Automatic","自動（Automatic）"],["Manual","手動（Manual）"],["Rolling","順次更新（Rolling）"],["Static","静的（Static）"],["Dynamic","動的（Dynamic）"],["Ephemeral","一時的（Ephemeral）"],["resource","リソースの宣言（resource）"],["param","パラメーターの宣言（param）"],["parameters","パラメーター（parameters）"],["output","出力値の宣言（output）"],["outputs","出力値（outputs）"],["condition","条件（condition）"],["dependsOn","依存関係（dependsOn）"],["variables","変数（variables）"],["existing","既存リソースの参照（existing）"],["secure","機密情報として扱う指定（secure）"],["secureValue","機密値（secureValue）"],["batchSize","一括処理サイズ（batchSize）"],["module","モジュール（module）"],["Project","列の選択（project）"],["where","行の絞り込み（where）"],["summarize","集計（summarize）"],["render","グラフ表示（render）"],["project","列の選択（project）"],["project-away","指定列の除外（project-away）"],["extend","計算列の追加（extend）"],["parse","文字列の解析（parse）"],["union","テーブルの結合（union）"],["Average","平均（Average）"],["Total","合計（Total）"],["Count","件数（Count）"],["Split by dimension","ディメンション別に分割"],["Fault domain","障害ドメイン（Fault domain）"],["Secure transfer required","安全な転送を必須にする（Secure transfer required）"],["Hierarchical namespace","階層型名前空間（Hierarchical namespace）"],["Allow cross-tenant replication","テナント間レプリケーションを許可"],["File share quota","ファイル共有の容量上限"],["Application security group","アプリケーション セキュリティ グループ（ASG）"],["Site Recovery Mobility Service","Site Recovery のモビリティ エージェント"],["Storage account の budget","ストレージアカウントの予算設定"],["Recovery Services vault のみ","Recovery Services コンテナーのみ"],["Standard Load Balancer のみ","Standard Load Balancer（第4層の負荷分散）のみ"],["Azure Load Balancer のみ","Azure Load Balancer（第4層の負荷分散）のみ"],["Virtual Network Integration のみ","仮想ネットワーク統合のみ"],["Azure DNS public zone のみ","Azure DNS の公開ゾーンのみ"],["Proximity placement group のみ","近接配置グループのみ"],["Azure Policy の Audit effect","Azure Policy の監査（Audit）効果"],["Azure Disk Encryption だけ","Azure Disk Encryption（VMディスクの暗号化）だけ"],["Microsoft Entra ID 無料","Microsoft Entra ID の無料プラン"],["Microsoft Entra Domain Services 認証","Microsoft Entra Domain Services（マネージド ドメイン）認証"],["VMSS の automatic OS image upgrade","VMSS の OSイメージ自動アップグレード"],["VMSS の scale-in policy だけ","VMSS のスケールイン ポリシーだけ"],["Azure Load Balancer の health probe","Azure Load Balancer の正常性プローブ"],["Container Apps environment","Container Apps 環境（コンテナーアプリの配置単位）"],["Azure DNS public zone","Azure DNS 公開ゾーン"],["Local network gateway","ローカル ネットワーク ゲートウェイ（オンプレ側の定義）"],["Route Table","ルート テーブル（経路表）"],["public IP","パブリックIP（公開IP）"],["DNS label","DNS ラベル（名前解決用の接頭辞）"],["Managed data disk","マネージド データディスク"],["Temporary disk","一時ディスク（再配置時にデータ消失）"],["Managed disk snapshot","マネージド ディスクのスナップショット"],["Boot diagnostics","ブート診断（起動ログの確認）"],["Managed identity","マネージドID（パスワード不要の認証ID）"],["Encryption at host","ホストでの暗号化（VMホスト側）"],["VNet encryption","VNet 暗号化（ネットワーク通信の保護）"],["SSH public key","SSH 公開鍵"],["MX + PTR","MX（メール配送先）とPTR（逆引きDNS）"],["SRV + NS","SRV（サービス検索）とNS（権威DNSサーバー）"],["KQL","KQL（ログ検索クエリ言語）"],["SAS","SAS（共有アクセス署名）"]]);
  labels.set("CNAME","CNAMEレコード（別名を指定するDNSレコード）");
  labels.set("Workbook","ワークブック（Azure Monitorの可視化画面）");
  labels.set("Alert instances","アラート インスタンス（発生したアラート）");
  labels.set("Versioning","バージョン管理（変更前の履歴保存）");
  labels.set("Traffic Manager","Traffic Manager（DNSベースのトラフィック振り分け）");
  labels.set("Audit","監査（違反を記録するPolicy効果）");
  labels.set("Modify","変更（リソースを修正するPolicy効果）");
  labels.set("DeployIfNotExists","存在しない場合にデプロイ（Policy効果）");
  labels.set("Microsoft.Storage","ストレージ サービスのリソース プロバイダー（Microsoft.Storage）");
  labels.set("Microsoft.Sql","SQLサービスのリソース プロバイダー（Microsoft.Sql）");
  labels.set("Microsoft.KeyVault","Key Vault のリソース プロバイダー（Microsoft.KeyVault）");
  labels.set("Microsoft.Web","App Service のリソース プロバイダー（Microsoft.Web）");
  labels.set("NSG encryption rule","NSGの暗号化規則（架空の設定）");
  labels.set("Move > Move to another resource group","［移動］→［別のリソース グループへ移動］");
  labels.set("Azure DevTest Labs","Azure DevTest Labs（開発・テスト環境の提供）");
  labels.set("Front Door","Front Door（グローバルなWeb配信・負荷分散）");
  labels.set("Azure Import/Export job","Azure Import/Export ジョブ（ディスクによるオフラインデータ移行）");
  labels.set("Remediation task","修復タスク（非準拠リソースの自動修復）");
  labels.set("Budget alert","予算アラート（コストしきい値通知）");
  labels.set("Blob lifecycle management","BLOB のライフサイクル管理（移行・削除の自動化）");
  labels.set("VM extension","VM 拡張機能（ゲストOSへ機能を追加）");
  labels.set("resource requests","コンテナーの要求リソース量（resource requests）");
  labels.set("Delete lock","削除ロック（CanNotDelete）");
  labels.set("App Service deployment slot","App Service のデプロイ スロット");
  labels.set("NSG service tag","NSGのサービス タグ（AzureのIP範囲指定）");
  labels.set("Azure DNS delegation","Azure DNS の委任（別DNSサーバーへ管理権限を委任）");
  labels.set("VM size","仮想マシンのサイズ（CPU・メモリ性能）");
  labels.set("User1、User2、User3","ユーザー1、ユーザー2、ユーザー3（User1、User2、User3）");
  labels.set("Load Balancer inbound NAT rule","Load Balancer の受信NAT規則");
  labels.set("Storage account の CORS","ストレージ アカウントの CORS（オリジン間アクセス制御）");
  labels.set("Microsoft Entra ID 無料","Microsoft Entra ID 無料プラン");
  labels.set("File share snapshot だけ","ファイル共有のスナップショットだけ");
  labels.set("Blob soft delete","BLOB の論理削除（削除後の復元）");
  labels.set("Recovery Services vault 名","Recovery Services コンテナーの名前");
  labels.set("Slot swap","スロットの入れ替え（Slot swap）");
  labels.set("Azure Site Recovery のみ","Azure Site Recovery（災害復旧）のみ");
  labels.set("Publish を Container にする","公開方法（Publish）を［コンテナー］にする");
  labels.set("Storage account key のみ","ストレージ アカウント キーのみ");
  labels.set("Recovery Services vault だけ","Recovery Services コンテナーだけ");
  labels.set("Azure Files の soft delete","Azure Files の論理削除（soft delete）");
  labels.set("Lifecycle management rule を作成する","ライフサイクル管理規則を作成する");
  labels.set("0.0.0.0/0、Next hop type を Internet のみ","宛先0.0.0.0/0、次ホップ種類をインターネットにする");
  labels.set("Azure Key Vault または Managed HSM","Azure Key Vault またはマネージドHSM（鍵管理）");
  labels.set("BlockBlobStorage のみ","ブロックBLOBストレージ（BlockBlobStorage）のみ");
  labels.set("Standard Public IP を必ず作成","StandardのパブリックIPを必ず作成する");
  labels.set("新しい Recovery Services vault","新しいRecovery Servicesコンテナー");
  labels.set("revision mode を multiple にする","リビジョンモードを［複数（multiple）］にする");
  labels.set("Recovery Services vault と MARS agent","Recovery ServicesコンテナーとMARSエージェント");
  labels.set("Azure Bastion と Public IP","Azure BastionとパブリックIP");
  labels.set("Log Analytics workspace と Data Collection Rule","Log Analyticsワークスペースとデータ収集ルール");
  labels.set("Route table の next hop","ルート テーブルの次ホップ（転送先）");
  labels.set("対応する Azure Private DNS zone と VNet link","対応するAzureプライベートDNSゾーンとVNetリンク");
  labels.set("NSG の Application Security Group","NSGのアプリケーション セキュリティ グループ（ASG）");
  labels.set("Accelerated Networking のみ","高速ネットワーク（Accelerated Networking）のみ");
  labels.set("Diagnostic setting の削除","診断設定（Diagnostic setting）の削除");
  labels.set("VNet peering の Allow forwarded traffic","VNetピアリングで［転送トラフィックを許可］を有効にする");
  labels.set("Target resource group / VNet などの target 設定","対象のリソースグループ／VNetなどの復旧先設定");
  labels.set("Backup policy の Instant Restore","バックアップ ポリシーのインスタント復元（Instant Restore）");
  labels.set("Microsoft.Storage を unregister する","Microsoft.Storage リソースプロバイダーを登録解除する");
  labels.set("Recovery Services vault を作成する","Recovery Servicesコンテナーを作成する");
  labels.set("Azure VPN Gateway の Site-to-Site VPN","Azure VPN Gatewayのサイト間（S2S）VPN");
  const STEM_TERMS={"IOPS":"IOPS（1秒当たりの入出力処理回数）","SMB":"SMB（ファイル共有の通信プロトコル）","RDP":"RDP（リモートデスクトップ接続）","FQDN":"FQDN（完全修飾ドメイン名）","SAS":"SAS（共有アクセス署名）","NSG":"NSG（ネットワーク セキュリティ グループ）","ASG":"ASG（アプリケーション セキュリティ グループ）","KQL":"KQL（ログ検索クエリ言語）","RBAC":"RBAC（ロールベースのアクセス制御）","SSPR":"SSPR（セルフサービス パスワード リセット）","VMSS":"VMSS（仮想マシン スケール セット）","P2S":"P2S（端末からネットワークへのVPN）","S2S":"S2S（拠点間VPN）","WAF":"WAF（Webアプリケーション ファイアウォール）","SKU":"SKU（機能・性能のプラン）","CIDR":"CIDR（IPアドレス範囲の表記法）"};
  const CODE_EXACT={
    "netstat -an":"待受ポートと接続状態を一覧表示するコマンド",
    "nbtstat -c":"NetBIOS名キャッシュを表示するコマンド",
    "Test-NetConnection localhost":"ローカルへのTCP接続を確認するPowerShellコマンド",
    "ipconfig /flushdns":"DNSクライアントキャッシュを消去するコマンド",
    "nslookup localhost":"DNSの名前解決を確認するコマンド",
    "route print":"ルーティング テーブルを表示するコマンド",
    "--parameters":"ARM/Bicepのパラメーターを指定するオプション",
    "--template-file":"テンプレート ファイルを指定するオプション",
    "--subscription":"サブスクリプションを指定するオプション",
    "--resource-group":"リソース グループを指定するオプション",
    "--confirm-with-what-if":"事前変更確認を伴うオプション"
  };
  function codeDescription(s){
    if(CODE_EXACT[s])return CODE_EXACT[s];
    if(/^Get-Az/.test(s))return "Azure情報を取得するPowerShellコマンド";
    if(/^New-AzManagementGroupDeployment/.test(s))return "管理グループ単位でARMをデプロイするPowerShellコマンド";
    if(/^New-AzResourceGroupDeployment/.test(s))return "リソース グループ単位でARMをデプロイするPowerShellコマンド";
    if(/^New-AzSubscriptionDeployment/.test(s))return "サブスクリプション単位でARMをデプロイするPowerShellコマンド";
    if(/^New-AzNetworkSecurityGroup/.test(s))return "ネットワーク セキュリティ グループを作成するPowerShellコマンド";
    if(/^New-AzNetworkSecurityRuleConfig/.test(s))return "NSGのセキュリティ規則を作成するPowerShellコマンド";
    if(/^New-AzVM$/.test(s))return "Azure仮想マシンを作成するPowerShellコマンド";
    if(/^New-Az/.test(s))return "Azureリソースを作成するPowerShellコマンド";
    if(/^Add-Az/.test(s))return "Azureの構成項目を追加するPowerShellコマンド";
    if(/^Set-Az/.test(s))return "Azureの構成を更新するPowerShellコマンド";
    if(/^\$Role/.test(s))return "PowerShellのロール割り当て用スクリプト";
    if(/^az bicep decompile/.test(s))return "ARM JSONをBicepへ逆変換するAzure CLIコマンド";
    if(/^az bicep build/.test(s))return "BicepをARM JSONへビルドするAzure CLIコマンド";
    if(/^az deployment group create/.test(s))return "リソース グループにテンプレートを展開するAzure CLIコマンド";
    if(/^az deployment sub create/.test(s))return "サブスクリプション単位で展開するAzure CLIコマンド";
    if(/^az group/.test(s))return "リソース グループ操作のAzure CLIコマンド";
    if(/^--[a-z-]+$/.test(s))return "コマンドラインのオプション名";
    return "";
  }
  function baseLabel(s){
    const raw=String(s==null?"":s);
    if(labels.has(raw))return labels.get(raw);
    const lower=raw.toLowerCase();
    for(const [key,value] of labels){if(key.toLowerCase()===lower)return value}
    const command=codeDescription(raw);
    if(command)return raw+"（"+command+"）";
    return raw;
  }
  function stem(s){
    let out=String(s==null?"":s);
    out=out.replace(/Premium Azure Files/g,"Azure FilesのPremiumファイル共有");
    for(const [abbr,ja] of Object.entries(STEM_TERMS)){
      const escaped=abbr.replace(/[.*+?^$\\{}()|[\]\\]/g,"\\$&");
      const re=new RegExp("(^|[^A-Za-z0-9])("+escaped+")(?![A-Za-z0-9]|[（(])");
      out=out.replace(re,(all,prefix,term)=>prefix+ja);
    }
    return out;
  }
  function option(q,index){return baseLabel(q.o[index]);}
  window.AZ104_JA_EXAM={option,stem,known:labels.has.bind(labels),codeDescription};
})();