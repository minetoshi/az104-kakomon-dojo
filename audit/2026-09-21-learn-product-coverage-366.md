# AZ-104 Microsoft Learn 製品カバレッジ監査（366問）

監査日: 2026-09-21

## 目的

2026-09-21 時点の Microsoft Learn に掲載されている AZ-104 自己学習用ラーニング パスについて、試験 Study Guide のスキル細目だけでなく、各 Learning Path の **Product** に掲載される製品・サービス、および AZ-104 学習ステップ内で明示的に扱われる代表的な周辺サービスも、問題学習で一度は直接理解できる状態にする。

公式試験範囲の厳密な監査は `audit/2026-09-21-post-gap-fill-audit.md` の360問を基準とし、本監査で追加した6問は **Learn製品補強** として分離する。Learn製品補強は本番模試50問の抽選対象から除外し、公式出題比率を崩さない。

## 参照した AZ-104 Learning Path

- AZ-104: Prerequisites for Azure administrators  
  https://learn.microsoft.com/en-us/training/paths/az-104-administrator-prerequisites/
- AZ-104: Manage identities and governance in Azure  
  https://learn.microsoft.com/en-us/training/paths/az-104-manage-identities-governance/
- AZ-104: Implement and manage storage in Azure  
  https://learn.microsoft.com/en-us/training/paths/az-104-manage-storage/
- AZ-104: Deploy and manage Azure compute resources  
  https://learn.microsoft.com/en-us/training/paths/az-104-manage-compute-resources/
- AZ-104: Configure and manage virtual networks for Azure administrators  
  https://learn.microsoft.com/en-us/training/paths/az-104-manage-virtual-networks/
- AZ-104: Monitor and back up Azure resources  
  https://learn.microsoft.com/en-us/training/paths/az-104-monitor-backup-resources/

## Product / service カバレッジ

| Learn 上の製品・サービス | 問題での扱い | 代表問題 |
|---|---|---|
| Azure | 全体 | 全問題 |
| Azure CLI | 直接 | cov-q023, cov-q024 |
| Azure Container Instances | 直接 | cov-q111〜q113 |
| Azure Container Registry | 直接 | cov-q033, cov-q057, cov-q058 |
| Azure Virtual Machines | 直接 | cov-q104〜q110, cov-q156〜q159 ほか |
| Azure Virtual Network | 直接 | cov-q121〜q125 ほか |
| Microsoft Entra ID | 直接 | cov-q091〜q094, cov-q146〜q149 ほか |
| Azure Cost Management | 直接 | 既存 Cost/Budget 問題群 |
| Azure role-based access control (Azure RBAC) | 直接 | 既存 RBAC 問題群 |
| Azure Resource Manager | 直接 | ARM/Bicep 問題群、cov-q103, cov-q150 |
| Azure Blob Storage | 直接 | cov-q101, lifecycle/versioning 問題群 |
| Azure Files | 直接 | cov-q100, cov-q141, cov-q151 |
| Azure Storage | 直接 | storage account / Blob / Files 問題群 |
| Azure Storage Accounts | 直接 | cov-q095〜q099 |
| Azure Storage Explorer | 直接 | cov-q013 |
| Azure Kubernetes Service (AKS) | **Learn製品補強で直接化** | learn-q003 |
| Azure Virtual Machine Scale Sets | 直接 | cov-q031, cov-q032, cov-q055, cov-q056 |
| Azure Application Gateway | 直接 | cov-q144, cov-q152, cov-q153 |
| Azure Bastion | 直接 | cov-q126, cov-q127 |
| Azure DNS | 直接 | 既存 DNS 問題群 |
| Azure ExpressRoute | **Learn製品補強で直接化** | learn-q004 |
| Azure Firewall | **Learn製品補強で直接化** | learn-q005 |
| Azure Load Balancer | 直接 | 既存 Load Balancer 問題群 |
| Azure VPN Gateway | 直接 | cov-q154, cov-q155 ほか |
| Azure Virtual Desktop | **Learn製品補強で直接化** | learn-q006 |
| Azure Backup | 直接 | cov-q133〜q137 |
| Azure Monitor | 直接 | cov-q131, cov-q132 ほか |
| Azure Site Recovery | 直接 | cov-q138〜q140, cov-q160 |

## Product タグ外だが AZ-104 Learning Path 内で明示されるサービス

| サービス | Learn 上の位置付け | 対応 |
|---|---|---|
| Azure Cloud Shell | AZ-104 Prerequisites の独立モジュール | **learn-q001 を追加** |
| Microsoft Entra Domain Services | Manage identities の Microsoft Entra ID モジュール内で明示 | **learn-q002 を追加** |
| Azure App Service | Compute Learning Path の独立モジュール | 既存 App Service 問題群で直接カバー済み |
| Azure Policy | Identity/Governance Learning Path の独立モジュール | 既存 Policy 問題群で直接カバー済み |
| Azure File Sync | Storage Learning Path の Azure Files モジュール内 | cov-q151 で直接カバー済み |
| Azure Network Watcher | Networking Learning Path の独立モジュール | 既存 Network Watcher 問題群で直接カバー済み |

## 今回追加した Learn製品補強 6問

- learn-q001: Azure Cloud Shell
- learn-q002: Microsoft Entra Domain Services
- learn-q003: Azure Kubernetes Service (AKS)
- learn-q004: Azure ExpressRoute
- learn-q005: Azure Firewall
- learn-q006: Azure Virtual Desktop

追加ファイル: `questions/learn-products/q01-06.js`

## 設計上の扱い

- 全体問題数: **366問**
  - 過去問 100
  - 類似問題 100
  - 公式範囲補強 160
  - Learn製品補強 6
- Learn製品補強は通常学習、ランダム、弱点学習、未回答学習では利用できる。
- **本番模試50問からは set 5 を除外**する。
- 公式試験範囲の82スキル細目評価（十分80 / 薄い2 / 不足0）は、Learn周辺製品6問を追加して水増しせず、従来の360問監査をそのまま保持する。
- 各 Learn製品補強問題は全選択肢の個別解説と Microsoft Learn 公式リンクを持つ。

## 結論

現行 AZ-104 Learning Path の Product に掲載される具体的な Azure 製品・サービスについて、**既存問題または Learn製品補強問題で直接学習できる状態**にした。

さらに Product タグだけでは拾えないが AZ-104 学習ステップ内で明示される Cloud Shell、Microsoft Entra Domain Services、App Service、Azure Policy、Azure File Sync、Network Watcher も直接カバーしている。

今後 Microsoft Learn の AZ-104 Learning Path の Product / Module 構成が変更された場合は、この監査表を再照合して追加する。
