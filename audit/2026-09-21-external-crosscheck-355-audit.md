# AZ-104 355問 外部模試・公式Labクロスチェック監査

監査日: 2026-09-21  
基準: Microsoft Learn「Study guide for Exam AZ-104: Microsoft Azure Administrator」Skills measured as of April 17, 2026  
対象: 過去問100 + 類似100 + 公式/関連範囲補強155 = **355問**

## 結論

345問時点で、2026-04-17版の公式82スキル細目について「中心判断を直接問う問題が少なくとも1問ある」状態には到達していた。

その後、公式スキル表だけでなく、**公開範囲でクロール可能な正規の練習問題・Microsoft公式Lab**を独立にクロスチェックした。外部問題文は転載せず、「別の教材ではどの判断軸が問われているか」だけを抽出し、必ず Microsoft Learn の現行仕様へ戻って確認した。

結果、既存345問で未経験または薄かった関連判断軸を10個追加し、**355問**とした。

## クロスチェックした公開ソース

### Microsoft公式
- AZ-104 Study Guide（2026-04-17 skills measured）
- AZ-104 Certification page / Practice Assessment / Exam Sandbox
- MicrosoftLearning AZ-104 official Labs
  - Identity
  - Governance / RBAC / Policy
  - ARM / Bicep
  - Virtual Networking / Intersite Connectivity
  - Network Traffic Management
  - Storage
  - VM / VMSS
  - Web Apps
  - ACI / Container Apps
  - Data Protection
  - Monitoring

### Tutorials Dojo
- 2026-07-27更新の公開AZ-104 Sample Exam Questions
- 無料Sampler（Timed / Review）
- 公開問題から、AzCopy対応対象、Load Balancer session persistence、Entra custom domain、Storage redundancy migration、P2S topology change、Azure File Sync、Application Gateway/WAF、VNet peering、S2S/BGP、Internal Load Balancer等の論点を確認

### Whizlabs
- 公開AZ-104 Sample Practice Questions（20問）
- Group naming policy、group-based licensing、SSPR、Policy、lock、ARM dependsOn、Bicep parameter、VM sizing/availability、Container Apps scale、App Service scale等の論点を確認

### MeasureUp
- Practice test demoは5問の無料デモが提供されていることを確認
- 公開ページから問題本文までは取得できなかったため、問題内容の監査材料には使用していない

## 追加した10問

| 問題 | 分野 | 追加判断軸 | 根拠 |
|---|---|---|---|
| cov-q146 | ID/Governance | Microsoft 365 group naming policy / prefix-suffix | Microsoft Learn group naming policy |
| cov-q147 | ID/Governance | Entra custom domain ownership verification: TXT / MX | Microsoft Learn custom domain |
| cov-q148 | ID/Governance | group-based licensing と nested group 非対応 | Microsoft Learn group licensing |
| cov-q149 | ID/Governance | group license の DisabledPlans / service plan | Microsoft Learn group licensing |
| cov-q150 | Compute/ARM | ARM template dependsOn | Microsoft Learn ARM dependency |
| cov-q151 | Storage | Azure File Sync の agent → register → cloud/server endpoint の構成順 | Microsoft Learn Azure File Sync |
| cov-q152 | Networking | Application Gateway WAF_v2 / SQL injection・XSS保護 | Microsoft Learn WAF + AZ-104 Lab 06 |
| cov-q153 | Networking | Application Gateway は専用subnetを必要とする | Microsoft Learn App Gateway infrastructure |
| cov-q154 | Networking | Local network gateway がオンプレ拠点を表す | Microsoft Learn VPN Gateway |
| cov-q155 | Networking | S2S VPN の動的ルート交換にBGP | Microsoft Learn VPN Gateway BGP |

## 外部模試で見つかったが既存問題ですでに十分だった論点

以下は公開模試でも確認されたが、新規追加は不要と判断した。

- AzCopyが主にBlob / Filesを扱う → cov-q145
- Load Balancer session persistence → s2-q48 / sim-q098
- P2S topology変更後のclient profile再取得 → s2-q42 / sim-q092
- ZRS / GRS / GZRS の使い分け → cov-q097～q099
- Application Gateway path-based routing → cov-q144
- VNet peering → 既存Networking問題 + cov-q067
- Internal Load Balancer → cov-q069
- SSPR methods / scope → cov-q092 / q093
- Bicep parameter → cov-q022 / q103
- VM resize → cov-q108
- Availability Setのfault/update domain概念 → cov-q030
- Container Apps event-based scaling → s1-q017ほか

## 外部問題をそのまま採用しない理由

公開練習問題は有用だが、Microsoftの現行仕様と完全一致するとは限らない。

今回のクロスチェックでも、外部教材に本試験時間を120分と記載している例があったが、Microsoft公式の現在のAZ-104 certification pageは **100分** としている。

また、古いPractice/模試ではAzure Resource Lock、Storage、App Gateway SKU、Backup等で現在の仕様とズレる可能性がある。

したがって本リポジトリでは:
1. 外部模試は「論点発見」にだけ使う
2. 問題文・選択肢はコピーしない
3. 正答根拠は現行Microsoft Learnで再確認する
4. Microsoft公式と外部教材が食い違う場合はMicrosoft公式を優先する

## 現時点の評価

- 公式82スキル細目: 82 / 82 に直接判断問題あり
- 345問時点の実質ギャップ: 解消済み
- 外部模試/公式Labで見つかった追加関連論点: 10問追加
- 合計: **355問**

「355問を暗記すれば必ず合格」という意味ではない。
Microsoft公式は skills measured の各bulletを評価方法の例としており、related topicsも出題され得る。

問題学習型の推奨ループ:
1. 355問を分野ごとに解く
2. 誤答は全選択肢の理由を読む
3. Microsoft Practice Assessmentで初見耐性を確認
4. 本サイト/公式Labで操作と結びつける
5. 50問模試で総合85%以上・各分野75%以上を3回連続

## 公式根拠
- https://learn.microsoft.com/ja-jp/credentials/certifications/resources/study-guides/az-104
- https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/
- https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/
- https://learn.microsoft.com/en-us/entra/identity/users/groups-naming-policy
- https://learn.microsoft.com/en-us/entra/fundamentals/add-custom-domain
- https://learn.microsoft.com/en-us/entra/identity/users/licensing-group-advanced
- https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/template-tutorial-create-templates-with-dependent-resources
- https://learn.microsoft.com/en-us/azure/storage/file-sync/file-sync-introduction
- https://learn.microsoft.com/en-us/azure/web-application-firewall/ag/ag-overview
- https://learn.microsoft.com/en-us/azure/application-gateway/configuration-infrastructure
- https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpn-gateway-settings
- https://learn.microsoft.com/en-us/azure/vpn-gateway/configure-bgp


## 最終機械監査（355問）

2026-09-21 に main ブランチの実ファイルを再取得し、静的 JS/HTML の構造を再監査した。

- 総問題数: **355**
  - 過去問: 100
  - 類似問題: 100
  - 公式/関連範囲補強: 155
- 290問以降の穴埋め専用問題: **55**（cov-q091 ～ cov-q145）
- 外部クロスチェック追加: **10**（cov-q146 ～ cov-q155）
- UID 重複: **0**
  - s1-q01 ～ s1-q50
  - s2-q01 ～ s2-q50
  - sim-q001 ～ sim-q100
  - cov-q001 ～ cov-q155
  - 各名前空間内の重複 0、名前空間も分離
- coverage の ID 欠番: **0**
- 正答 index 範囲外: **0**
- multi と正答数の不整合: **0**
- cov-q001 ～ cov-q155 の ox 数と選択肢数の不一致: **0**
- cov-q001 ～ cov-q155 の Microsoft Learn 根拠リンク不足: **0**
- cov-q091 ～ cov-q145 の必須フィールド不足: **0**
- cov-q091 ～ cov-q145 の kind: **全55問 coverage**
- cov-q146 ～ cov-q155 は外部クロスチェック用として **crosscheck** に分離
- question JS の構文エラー: **0**
- index.html inline JS / learn-map.js / explanation-helper.js の構文エラー: **0**
- index.html の missing DOM reference: **0**
- index.html から参照する script: **39本**
- missing script: **0**

### 既存問題の ox / Learn の扱い

過去問・類似問題の一部は、元データ互換性を維持するため raw question object に ox を持たせず、`explanation-helper.js` が全選択肢分の解説を実行時生成する既存設計を維持している。Microsoft Learn リンクも、直接の `learn` または `learn-map.js` で全100過去問を補完する。

したがって、今回追加した gap-fill 55問は要求通り raw object 自体に `ox` と `learn` を持たせ、既存問題は既存の互換レイヤーを壊さない方針とした。

## 公式82スキル細目のゼロベース再分類

判定基準:
- **十分**: そのスキルの中心判断を直接問う問題が複数角度にあり、問題と解説だけでも基礎概念・設定・判断・操作またはトラブルシューティングの主要部分を学べる
- **薄い**: 直接問題はあるが判断軸が1つに寄り、問題だけでは公式スキルの主要部分を学ぶには不足
- **不足**: 周辺論点しかない、またはサービス名当て程度

最終判定:
- **十分: 82 / 82**
- **薄い: 0 / 82**
- **不足: 0 / 82**

これは「すべての未知シナリオを網羅した」という意味ではない。Microsoft 公式学習ガイドが明記する related topics の余地は残る。一方、2026-09-21 の独立ギャップ監査で薄い/不足とした28項目については、既存問題とは異なる直接判断軸を cov-q091 ～ cov-q143 で追加し、さらに公式Lab/公開模試クロスチェックで関連論点を cov-q144 ～ cov-q155 まで補強したため、今回の教材基準では「薄い」を残す根拠は確認できなかった。

特に旧「不足」3項目は次のように改善した。

- VM作成: cov-q104 ～ q106 を中心に、認証、Public IP、Availability Zone を直接判断
- VNet/Subnet作成・構成: cov-q121 ～ q125 で address space、非重複、delegation、custom DNS、CIDR 分割を直接判断
- Azure Site Recovery構成: cov-q138 ～ q140 で enable replication、network mapping、recovery plan を直接判断

## UI / 学習履歴 / 模試の最終確認

- 画面総数: **355問**へ統一
- 黒本章フィルター: `QUESTIONS` を毎回動的集計するため355問に自動追随
- localStorage 学習履歴: `az104_kakomon_dojo_v5_250` を維持
- 模試履歴: `az104_kakomon_mock_history_v1` を維持
- 続きから: `az104_kakomon_resume_v1` を維持し、UID ベースで復元
- 模試プール: similar（set 3）は除外のまま、original + coverage/crosscheck を対象
- legacy-practice / practice-nuance: 模試から除外
- 模試分野比率: ID/ガバナンス 12、ストレージ 9、コンピュート 12、ネットワーク 10、監視/バックアップ 7 を維持
