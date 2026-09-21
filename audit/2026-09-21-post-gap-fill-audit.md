# AZ-104 360問 最終ギャップ解消・独立再監査

監査日: 2026-09-21  
公式基準: Microsoft Learn「Study guide for Exam AZ-104: Microsoft Azure Administrator」Skills measured as of April 17, 2026  
対象: 過去問100 + 類似100 + 公式範囲補強160 = **360問**

## 結論

2026-04-17版の公式スキル細目82項目を、単なるキーワード一致ではなく「問題だけで学ぶときに中心判断を複数角度から経験できるか」で再判定した。

- 十分: **80 / 82**
- 薄い: **2 / 82**
- 不足: **0 / 82**

不足は0。薄い2項目は「アクセス割り当てを理解する」「サブスクリプションを管理する」。どちらも直接問題はあるが、他の80項目ほど異なる条件での反復が厚くないため、無理に「十分」へ上げていない。

今回の最優先だった **VM作成 / VNet・Subnet / Site Recovery構成** はいずれも「十分」と判定した。

## 今回の最終追加

355問版をさらに厳格に再監査し、次の5問を追加した。

- cov-q156: Encryption at host の subscription feature 登録
- cov-q157: Encryption at host と Azure Disk Encryption の併用制約
- cov-q158: VM 作成時の Image と Size の役割
- cov-q159: Public IP / public inbound ports を使わない VM + Bastion 前提の作成
- cov-q160: Site Recovery replication policy の recovery point retention / app-consistent snapshot frequency

また cov-q146〜q155 は教材仕様に合わせて `kind:"coverage"` に統一した。

## 構造・回帰監査

- 総問題数: **360**
- 過去問: 100
- 類似問題: 100
- coverage: 160
- UID 重複: **0**（既存355問の分割監査で重複0、新規UIDは cov-q156〜q160）
- 正答 index 異常: **0**
- multi と正答数の不整合: **0**
- coverage 160問の raw `ox` 数不一致: **0**
- coverage 160問の Microsoft Learn リンク欠落: **0**
- 旧200問: `question-normalizer.js` で既存 explanation helper / learn-map を使い、読み込み後オブジェクトへ `ox` と不足 Learn リンクを正規化
- 実行時の全360問: **ox数 = 選択肢数** を満たす設計
- question JS の構文異常: **0**
- index.html inline JS 構文異常: **0**
- missing question script: **0**
- missing DOM ref: **0**
- localStorage キーは維持:
  - `az104_kakomon_dojo_v5_250`
  - `az104_kakomon_mock_history_v1`
  - `az104_kakomon_resume_v1`
- 模試: similar(set 3) 除外を維持、coverage は候補に含む
- 模試除外: `legacy-practice` / `practice-nuance` を維持
- 模試比率: ID/ガバナンス12、ストレージ9、コンピュート12、ネットワーク10、監視/バックアップ7 を維持
- 黒本章フィルター: `コンピュート/*` を第4章へ分類するよう修正し、新規 VM 問題も正しく集計
- 続きから: UID ベース復元を維持し、既存履歴キーを変更していない

## 82項目の再判定

| 分野 | 公式スキル細目 | 主な直接問題 | 判定 |
|---|---|---|---|
| ID/ガバナンス | ユーザーとグループを作成する | cov-q001, q002, q091 | **十分** |
| ID/ガバナンス | ユーザーとグループのプロパティを管理する | cov-q002, s1-q26 | **十分** |
| ID/ガバナンス | Microsoft Entra ID でライセンスを管理する | s1-q26, q27, cov-q148, q149 | **十分** |
| ID/ガバナンス | 外部ユーザーを管理する | s1-q24, q25, s2-q17 | **十分** |
| ID/ガバナンス | SSPR を構成する | s2-q18, q19, cov-q092, q093 | **十分** |
| ID/ガバナンス | 組み込み Azure ロールを管理する | s1-q29〜q31 | **十分** |
| ID/ガバナンス | 異なるスコープでロールを割り当てる | s1-q34, s2-q26, cov-q006 | **十分** |
| ID/ガバナンス | アクセス割り当てを理解する | s1-q28, sim-q072 | **薄い** |
| ID/ガバナンス | Azure Policy を実装して管理する | cov-q003〜q005, q078 | **十分** |
| ID/ガバナンス | リソース ロックを構成する | s1-q33, s2-q27, sim-q077 | **十分** |
| ID/ガバナンス | タグを適用・管理する | s1-q34, s2-q26, sim-q076 | **十分** |
| ID/ガバナンス | リソース グループを管理する | cov-q007, s2-q27 | **十分** |
| ID/ガバナンス | サブスクリプションを管理する | cov-q094, cov-q006 | **薄い** |
| ID/ガバナンス | アラート、予算、Azure Advisor 推奨事項を使用してコストを管理する | s1-q31, q32, s2-q25, cov-q080 | **十分** |
| ID/ガバナンス | 管理グループを構成する | cov-q006, q079, q094 | **十分** |
| ストレージ | Azure Storage ファイアウォールおよび仮想ネットワークを構成する | cov-q008, q009, q076 | **十分** |
| ストレージ | SAS トークンを作成して使用する | s1-q35, sim-q035, cov-q072 | **十分** |
| ストレージ | 保存されているアクセス ポリシーを構成する | cov-q010, q073 | **十分** |
| ストレージ | アクセス キーを管理する | cov-q011, q074, s1-q30 | **十分** |
| ストレージ | Azure Files の ID ベースのアクセスを構成する | s1-q36, sim-q036, cov-q141 | **十分** |
| ストレージ | ストレージ アカウントを作成・構成する | cov-q020, q095, q096 | **十分** |
| ストレージ | Azure Storage の冗長性を構成する | s1-q38, s2-q03, cov-q097〜q099 | **十分** |
| ストレージ | オブジェクト レプリケーションを構成する | s1-q39, q40, s2-q04 | **十分** |
| ストレージ | ストレージ アカウントの暗号化を構成する | cov-q012, q075 | **十分** |
| ストレージ | Storage Explorer / AzCopy を使用してデータを管理する | cov-q013, q014, q077, q145 | **十分** |
| ストレージ | Azure Files でファイル共有を作成・構成する | cov-q015, q100 | **十分** |
| ストレージ | Azure Blob Storage でコンテナーを作成・構成する | s1-q35, q41, cov-q101 | **十分** |
| ストレージ | ストレージ層を構成する | s1-q42, q43, s2-q09 | **十分** |
| ストレージ | Blob / container soft delete を構成する | cov-q017, q102 | **十分** |
| ストレージ | Azure Files のスナップショットと soft delete を構成する | cov-q015, q016 | **十分** |
| ストレージ | Blob lifecycle management を構成する | cov-q018, s2-q07 | **十分** |
| ストレージ | Blob versioning を構成する | cov-q019, s1-q40 | **十分** |
| コンピュート | ARM template / Bicep を解釈する | s1-q14, cov-q021, q022 | **十分** |
| コンピュート | 既存 ARM template を変更する | s1-q14, s2-q31, cov-q103, q150 | **十分** |
| コンピュート | 既存 Bicep ファイルを変更する | cov-q021, q022, q051〜q054 | **十分** |
| コンピュート | ARM template / Bicep でデプロイする | s1-q12, cov-q024 | **十分** |
| コンピュート | ARM export / ARM→Bicep 変換 | s1-q11, cov-q023 | **十分** |
| コンピュート | 仮想マシンを作成する | cov-q104〜q106, q158, q159 | **十分** |
| コンピュート | VM Encryption at host を構成する | cov-q025, q107, q156, q157 | **十分** |
| コンピュート | VM を別 RG / subscription / region に移動する | cov-q026, q027, q007 | **十分** |
| コンピュート | VM サイズを管理する | cov-q028, q108, q158 | **十分** |
| コンピュート | VM disk を管理する | s1-q15, sim-q082, cov-q109, q110 | **十分** |
| コンピュート | Availability Zone / Set に VM をデプロイする | cov-q029, q030, q106 | **十分** |
| コンピュート | VM Scale Sets をデプロイ・構成する | cov-q031, q032, q055, q056 | **十分** |
| コンピュート | Azure Container Registry を作成・管理する | cov-q033, q034, q057, q058 | **十分** |
| コンピュート | ACI を使用してコンテナーをプロビジョニングする | s1-q16, cov-q111〜q113 | **十分** |
| コンピュート | Container Apps を使用してコンテナーをプロビジョニングする | s1-q17, q18, cov-q114〜q116 | **十分** |
| コンピュート | コンテナーのサイズ設定とスケーリングを管理する | s1-q17, cov-q112, q117 | **十分** |
| App Service | App Service plan をプロビジョニングする | s1-q22, s2-q39 | **十分** |
| App Service | App Service plan scaling を構成する | s1-q21, sim-q088 | **十分** |
| App Service | App Service を作成する | s1-q22, sim-q085, cov-q118 | **十分** |
| App Service | 証明書 / TLS を構成する | s1-q19, cov-q059〜q061 | **十分** |
| App Service | Custom DNS mapping を構成する | s1-q23, cov-q119 | **十分** |
| App Service | App Service Backup を構成する | cov-q038, q065, q120 | **十分** |
| App Service | App Service networking を構成する | cov-q036, q037, q063, q064 | **十分** |
| App Service | Deployment slots を構成する | cov-q035, q062 | **十分** |
| ネットワーク | VNet / Subnet を作成・構成する | cov-q121〜q125 | **十分** |
| ネットワーク | VNet peering を作成・構成する | s2-q49, cov-q042, q067 | **十分** |
| ネットワーク | Public IP を構成する | s1-q01, cov-q066, q159 | **十分** |
| ネットワーク | UDR を構成する | s2-q41, sim-q091, cov-q068, q130 | **十分** |
| ネットワーク | ネットワーク接続をトラブルシューティングする | s1-q45, sim-q060, cov-q046 | **十分** |
| ネットワーク | NSG / ASG を作成・構成する | s2-q44, sim-q094, q097, cov-q071 | **十分** |
| ネットワーク | NSG の有効なセキュリティ規則を評価する | cov-q041, IP Flow Verify 系問題 | **十分** |
| ネットワーク | Azure Bastion を実装する | s1-q03, sim-q095, cov-q126, q127 | **十分** |
| ネットワーク | PaaS service endpoint を構成する | cov-q039, q009, q128 | **十分** |
| ネットワーク | PaaS private endpoint を構成する | cov-q040, q037, q070, q129 | **十分** |
| ネットワーク | Azure DNS を構成する | s1-q05〜q07 | **十分** |
| ネットワーク | Internal/Public Load Balancer を構成する | s1-q08, q09, s2-q48, cov-q069 | **十分** |
| ネットワーク | Load Balancer をトラブルシューティングする | s1-q10, sim-q100 | **十分** |
| 監視/バックアップ | Azure Monitor metrics を解釈する | cov-q084, q131, q132 | **十分** |
| 監視/バックアップ | Azure Monitor log settings を構成する | s2-q12, sim-q062, cov-q081 | **十分** |
| 監視/バックアップ | Azure Monitor でログをクエリ・分析する | s1-q47, cov-q085, q086 | **十分** |
| 監視/バックアップ | Alert rule / Action Group / Alert Processing Rule を設定する | s2-q11, sim-q061, cov-q044 | **十分** |
| 監視/バックアップ | Azure Monitor Insights を構成・解釈する | cov-q045, q082, q083 | **十分** |
| 監視/バックアップ | Network Watcher / Connection Monitor を使用する | s1-q45, cov-q046 | **十分** |
| 監視/バックアップ | Recovery Services vault を作成する | s2-q13, q16, cov-q134, q142 | **十分** |
| 監視/バックアップ | Backup vault を作成する | cov-q047, q133, q143 | **十分** |
| 監視/バックアップ | Backup policy を作成・構成する | s1-q50, s2-q15, cov-q135 | **十分** |
| 監視/バックアップ | Azure Backup で backup / restore を実行する | cov-q048, q136, q137 | **十分** |
| 監視/バックアップ | Azure Site Recovery を構成する | cov-q043, q138〜q140, q160 | **十分** |
| 監視/バックアップ | Site Recovery で secondary region failover を実行する | cov-q049, q087, q088 | **十分** |
| 監視/バックアップ | Backup reports / alerts を構成・解釈する | cov-q050, q090 | **十分** |

## 薄い2項目の扱い

### アクセス割り当てを理解する
カスタムロールの Actions / NotActions や Reader など権限判断はあるが、role assignment の継承・effective access を別シナリオで反復する厚みは相対的に弱い。

### サブスクリプションを管理する
管理グループ間で subscription を移動した際の Policy / RBAC 継承は直接問えている。一方、subscription 管理そのものを複数の異なる運用判断で問う問題は他項目より少ない。

どちらも「不足」ではなく、現状でも試験範囲の中心判断には触れている。問題数を増やすだけの水増しを避けるため、今回は薄いとして明示的に残す。

## 公式・公開模試クロスチェックから教材へ反映した論点

既存355問までに、Microsoft公式 Practice Assessment / MicrosoftLearning AZ-104 Labs と、公開範囲で確認できる正規練習教材の論点をクロスチェック済み。問題文は転載せず、判断軸のみ抽出して Microsoft Learn の現行仕様へ戻して検証した。

代表的な追加・補強:
- Entra group naming policy / custom domain verification / group-based licensing
- ARM `dependsOn`
- Azure File Sync
- Application Gateway WAF / dedicated subnet
- VPN Gateway Local network gateway / BGP
- AzCopy の Blob / Files 対応
- VM create の image / size / authentication / public IP / availability
- VNet address space / CIDR / delegation / custom DNS
- Site Recovery enable replication / network mapping / recovery plan / replication policy
- Azure Monitor metrics aggregation / dimensions
- Backup policy / new VM restore / file recovery

## 公式基準

- https://learn.microsoft.com/ja-jp/credentials/certifications/resources/study-guides/az-104
- https://learn.microsoft.com/ja-jp/azure/virtual-machines/disks-enable-host-based-encryption-portal
- https://learn.microsoft.com/en-us/azure/virtual-machines/disk-encryption
- https://learn.microsoft.com/ja-jp/azure/virtual-machines/windows/quick-create-portal
- https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/virtual-networks-static-private-ip
- https://learn.microsoft.com/ja-jp/azure/site-recovery/azure-to-azure-architecture

## 最終評価

「公式82項目すべてに1問ある」だけの状態ではなく、**80項目は複数の異なる判断軸まで問題化、2項目は直接問題ありだが相対的に薄い、不足0** まで到達した。

参考書なしで問題中心に学ぶ教材としては完成扱いでよい。ただし Microsoft 公式が明記する通り、skills measured の bullet は評価方法の例であり related topics が出題される可能性があるため、公式 Practice Assessment と実操作で初見耐性を確認する前提は残す。
