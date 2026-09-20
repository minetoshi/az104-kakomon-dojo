# AZ-104 過去問道場 290問 最終 Current-Spec 監査

監査日: 2026-09-20  
対象: 過去問100 + 類似問題100 + 公式範囲補強90 = 290問

## 結論

290問を、次の3観点で再監査した。

1. **構造整合性**: 問題数、UID、正答インデックス、単一/複数選択、Learnリンク
2. **意味整合性**: 問題文と正答・誤答選択肢の対応
3. **Current-Spec**: 2026-09-20時点の Microsoft Learn と矛盾しやすい論点を重点確認

### 構造監査結果

- 過去問: 100 / 100 読み込み成功
- 類似問題: 100 / 100 読み込み成功
- 公式範囲補強: 90 / 90 読み込み成功
- 合計: **290問**
- UID重複: **0**
- 正答インデックス異常: **0**
- 単一/複数選択の構造異常: **0**
- Microsoft Learnリンク不足: **0**
- 公式範囲補強90問の選択肢別解説不足: **0**
- index.html のインライン JavaScript 構文エラー: **0**
- 読み込み対象 question script: **29ファイル**

## 今回の Current-Spec 修正

### 1. ACR の AcrPull / AcrPush を権限モード付きに修正

対象:
- cov-q057
- cov-q058

Azure Container Registry は、現在 **RBAC Registry Permissions** と **RBAC Registry + ABAC Repository Permissions** で使用するデータプレーン ロールが異なる。

ABAC対応モードでは、従来の AcrPull / AcrPush / AcrDelete は使用しない。  
そのため、AcrPull / AcrPush を正答にする2問へ **RBAC Registry Permissions モード** という前提を明記した。

現行仕様:
- RBAC Registry Permissions: AcrPull / AcrPush
- RBAC + ABAC Repository Permissions: Container Registry Repository Reader / Writer 等

Microsoft Learn:
- https://learn.microsoft.com/ja-jp/azure/container-registry/container-registry-rbac-built-in-roles-overview
- https://learn.microsoft.com/ja-jp/azure/container-registry/container-registry-rbac-abac-repository-permissions

### 2. Azure Storage の ID ベースアクセス問題へ現行仕様注記

対象:
- s2-q01

Practice Assessment の想定解は「ファイル共有」だが、現行 Azure Storage は **Blob / File / Queue / Table** で Microsoft Entra ID を使った認可をサポートする。

したがって、問題画面に次を明示する監査注記を追加した。

- Practice の想定は Azure Files / SMB の ID ベース認証
- 「IDベース認可が使える Storage サービスは Files だけ」と暗記しない

Microsoft Learn:
- https://learn.microsoft.com/ja-jp/azure/storage/common/authorize-data-access
- https://learn.microsoft.com/ja-jp/rest/api/storageservices/authorize-with-azure-active-directory

### 3. Load Balancer 5-tuple 問題へ条件注記

対象:
- s1-q08

Practice の想定解は 5-tuple hash。現行 Azure Load Balancer でも 5-tuple は既定の hash-based distribution mode。

ただし、5-tuple へ変更するだけで断続的な接続タイムアウトが必ず解消するわけではない。  
この問題では **「均等分散」** が正答の決め手であり、実障害では health probe、backend port、NSG 等も確認すべきことを監査注記へ追加した。

Microsoft Learn:
- https://learn.microsoft.com/ja-jp/azure/load-balancer/distribution-mode-concepts
- https://learn.microsoft.com/ja-jp/azure/load-balancer/load-balancer-custom-probe-overview

## 再確認した主要な時限・変更リスク論点

### Azure Backup

- 既定 Standard VM Backup policy の daily retention は 30日
- Instant Restore snapshot の既定値は2日
- Standard policy の snapshot retention は1～5日
- Weekly policy の snapshot retention は5日に固定
- よって、Weekly から「snapshot 2日」にしたい問題は **先に Daily へ変更**する考え方で整合

Microsoft Learn:
- https://learn.microsoft.com/ja-jp/azure/backup/quick-backup-vm-portal
- https://learn.microsoft.com/en-us/azure/backup/backup-instant-restore-capability

### Azure Network Watcher Packet Capture

Packet Capture には Network Watcher Agent VM extension (AzureNetworkWatcherExtension) が必要。  
s1-q44 の正答は現行仕様と整合。

Microsoft Learn:
- https://learn.microsoft.com/ja-jp/azure/network-watcher/packet-capture-overview

### P2S VPN と VNet Peering

VNet peering を構成した後、P2S client に新しい経路を反映するには client profile の再ダウンロードが必要。  
s2-q42 / sim-q092 は現行仕様と整合。

Microsoft Learn:
- https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-manage-peering

### Azure Public IP

Basic Public IP は 2025-09-30 に廃止。Standard Public IP の IPv4 allocation は Static。  
cov-q066 は現行仕様と整合。

Microsoft Learn:
- https://learn.microsoft.com/ja-jp/azure/virtual-network/ip-services/public-ip-addresses

### Object Replication

Blob Object Replication は source/destination の versioning と source の change feed が必要。  
HNS-enabled account は未サポート。  
s1-q39 / s1-q40 / s2-q04 / sim-q039 / sim-q040 は現行仕様と整合。

Microsoft Learn:
- https://learn.microsoft.com/en-us/azure/storage/blobs/object-replication-configure

### App Service Autoscale

- Manual scaling: Basic以上
- Azure Monitor Autoscale (CPU/Memory/スケジュール): Standard以上
- App Service Automatic scaling (HTTP traffic): Premium v2-v4

よって Basic から CPU metric autoscale を行う問題で Standard 以上へ scale-up する判断は現行仕様と整合。

Microsoft Learn:
- https://learn.microsoft.com/ja-jp/azure/app-service/manage-automatic-scaling

### Site Recovery

Failover後:
1. 復旧VMを検証
2. Commit
3. 必要に応じて Re-protect
4. Failback

cov-q087 / cov-q088 は現行仕様と整合。

Microsoft Learn:
- https://learn.microsoft.com/ja-jp/azure/site-recovery/azure-to-azure-tutorial-failback

### Azure Monitor Network Insights

Network Insights は現在も、複数subscription/region/resource groupにまたがる network topology、health、metrics、diagnostic tools を提供する。  
cov-q083 は現行仕様と整合。

Microsoft Learn:
- https://learn.microsoft.com/en-us/azure/network-watcher/network-insights-overview

## 既存の「Practice想定と現行仕様に差がある」問題

次の問題は、過去問として残しつつ audit-map.js で注記を表示する。

- s1-q08: 5-tuple は既定。障害切り分けとしては条件不足
- s1-q19: App Service移動時の証明書
- s1-q34: az role assignment create の引数省略
- s1-q46: 旧「14日」制限
- s2-q01: Storage ID-based access の現在の対応サービス範囲
- s2-q13: Azure Backup Secure by Default / soft delete
- s2-q18: P1 は hybrid SSPR/password writeback 前提
- s2-q19: B2B guest の password authority
- s2-q26: Tag Contributor + scope の明示
- s2-q27: Resource Group lock と RG削除要件の不整合
- s2-q48: 現行UIでは Client IP and protocol は1つの session persistence mode
- sim-q063: 現行 Recovery Services vault 削除手順へ改訂済み
- sim-q069: B2B SSPR 注記

## 教材としての扱い

290問のうち、Practice Assessment由来の問題は「Microsoft Practice の想定解」と「現在のAzure実仕様」を混同しないことが重要。

このリポジトリでは以下の方針とする。

- Practice想定解は過去問として保持
- 現行仕様と差がある場合は audit note を表示
- 新規/類似/補強問題は current Azure specification を優先
- 仕様値を問う問題は Microsoft Learn リンクを併記
- Microsoft Learn の更新で前提が変わった場合は問題を再監査する

## 現時点の評価

**大きな未修正の正答誤りは今回の監査では検出しなかった。**

ただし、Azure は継続的に仕様が変わるため、「290問を暗記」ではなく、
- 正答理由
- 誤答理由
- audit note
- Microsoft Learn
をセットで確認することを前提とする。
