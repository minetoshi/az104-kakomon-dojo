> **Superseded:** この345問監査は履歴として保持しています。外部模試・公式Labを追加クロスチェックした最新監査は `2026-09-21-external-crosscheck-355-audit.md`（355問）です。

# AZ-104 345問 最終ギャップ解消監査

監査日: 2026-09-21  
基準: Microsoft Learn「Study guide for Exam AZ-104: Microsoft Azure Administrator」Skills measured as of April 17, 2026  
対象: 過去問100 + 類似100 + 公式範囲補強145 = **345問**

## 結論

2026-09-21 の独立ギャップ監査では、公式82スキル細目に対して:

- 十分: 54
- 薄い: 25
- 不足: 3

だった。

その後、既存問題の単なる言い換えではなく、**不足している判断軸を直接問う55問 (cov-q091 ～ cov-q145)** を追加した。

再監査結果:

- 公式スキル細目: **82 / 82 に直接問題あり**
- 「周辺問題しかない」状態: **0**
- 旧監査の「不足」: **3 → 0**
- 旧監査の「薄い」: **25 → 0（少なくとも1つ以上の異なる直接判断軸を追加）**
- UID / 正答構造の意図的重複: なし
- 既存の類似問題は定着用として削除しない

ここでいう「解消」は、**参考書を読まず問題から学ぶ際に、その公式スキルの中心的判断を問題として経験できる**という意味。Microsoft が明記している通り、公式スキルの bullet は出題例であり関連トピックも出題され得るため、あらゆる未知シナリオを保証する意味ではない。

## 追加55問の目的

| 旧ギャップ | 追加問題 | 補強した判断軸 |
|---|---|---|
| ユーザーとグループ作成 | cov-q091 | クラウドユーザー作成時の基本情報 |
| SSPR設定 | cov-q092, q093 | 対象グループ、必要認証方法数 |
| サブスクリプション管理 | cov-q094 | 管理グループ移動後の継承 |
| Azure Files IDベースアクセス | cov-q141 | SMB share-level RBAC |
| Storage account作成/構成 | cov-q095, q096 | StorageV2、Secure transfer |
| Storage冗長性 | cov-q097 ～ q099 | ZRS / RA-GRS / GZRS の使い分け |
| Azure Files share作成/構成 | cov-q100 | Share quota |
| Blob container作成/構成 | cov-q101 | account-level / container-level public access |
| Blob/container soft delete | cov-q102 | Container soft delete を直接判断 |
| ARM template変更 | cov-q103 | parameter による外部入力 |
| VM作成 | cov-q104 ～ q106 | SSH認証、Public IPなし、Availability Zone |
| Encryption at host | cov-q107 | temp disk / cache を含む暗号化 |
| VM size | cov-q108 | resize と再起動 |
| VM disk | cov-q109, q110 | data disk attach、managed disk snapshot |
| ACI provisioning | cov-q111 ～ q113 | restart policy、CPU/memory、secureValue |
| Container Apps provisioning | cov-q114 ～ q116 | environment、ingress、revision |
| Container sizing/scaling | cov-q112, q117 | ACI resource request、minReplicas |
| App Service作成 | cov-q118 | App Service planとの関係 |
| App Service custom DNS | cov-q119 | apex domain の A + TXT |
| App Service Backup | cov-q120 | Storage container / SAS |
| VNet/Subnet作成・構成 | cov-q121 ～ q125 | address space、非重複、delegation、custom DNS、CIDR |
| Bastion | cov-q126, q127 | Developerと専用SKUの構成差 |
| Service Endpoint | cov-q128 | public endpoint維持とsubnet identity |
| Private Endpoint深掘り | cov-q129 | Private DNS解決 |
| UDR/NVA深掘り | cov-q130 | NIC IP forwarding |
| Azure Monitor metrics | cov-q131, q132 | aggregation、dimension |
| Backup vault | cov-q133, q143 | workload選択、作成時redundancy |
| Recovery Services vault作成 | cov-q134, q142 | region、作成/初期redundancy |
| Backup policy | cov-q135 | schedule + retention |
| Backup/Restore | cov-q136, q137 | new VM restore、file recovery |
| Site Recovery構成 | cov-q138 ～ q140 | enable replication、network mapping、recovery plan |

## 外部クロスチェック

問題追加にあたり、公式スキル表だけでなく次の公開リソースの出題・実習論点も確認した。

### Microsoft公式 Practice Assessment
- Microsoft は Practice Assessment を無料・繰り返し受験可能として提供
- 正答、rationale、追加Learnリンクを確認できる
- 問題本文はこのリポジトリへ複製していない

### MicrosoftLearning AZ-104 公式 Labs
2026-09-21 時点で公開されているラボ群を確認:
- Identity
- Subscriptions / RBAC
- Azure Policy
- ARM templates / Bicep
- Virtual Networking
- Intersite Connectivity
- Network Traffic Management
- Storage
- Virtual Machines / VMSS
- Web Apps
- Azure Container Instances
- Azure Container Apps
- Data Protection
- Monitoring

公式 Lab 06 では Application Gateway も扱われるため、現行 skills bullet の明示項目外だが related topic の補助として **cov-q144** を追加した。

### 公開無料模試
Tutorials Dojo の無料 AZ-104 sampler（20問、Timed 10 + Review 10）を公開範囲で確認。問題本文は転記していない。公開サンプルで確認できた AzCopy の対応対象という論点を、Microsoft Learn で仕様確認したうえで独自問題 **cov-q145** として追加した。

## 重要な方針

- 外部模試の問題文・選択肢をコピーしない
- 外部模試は「どんな論点が別角度から問われているか」の監査材料としてのみ利用
- 正答根拠は Microsoft Learn の現行仕様へ戻して検証
- 旧Practice由来問題と現行仕様に差がある場合は audit-map.js の注記を維持
- 重複問題は定着に有効なので削らず、欠けた判断軸を追加する

## 最終評価

**345問は、2026-04-17版AZ-104の公式82スキル細目について、少なくとも1つの直接判断問題を持つ状態になった。**

以前の290問に対する「形式上82/82だが実質28項目が弱い」という問題は、今回の55問追加で解消した。

ただし、Microsoft公式自身が「skills measured の各 bullet は評価方法の例であり、related topics が出る可能性がある」と明記している。よって教材の完成判定は「問題を暗記すれば100%」ではなく、

1. 345問で公式範囲を一巡
2. 誤答の全選択肢理由を理解
3. Microsoft公式 Practice Assessmentで初見耐性を確認
4. MicrosoftLearning公式Labs / 本サイトのハンズオンで操作と結びつける
5. 50問模試で総合85%以上・各分野75%以上を3回連続

を満たすことを前提とする。

## 公式基準

- https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104
- https://learn.microsoft.com/en-us/credentials/certifications/practice-assessments-for-microsoft-certifications
- https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/
