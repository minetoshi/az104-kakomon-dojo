# AZ-104 過去問道場

AZ-104 学習用の問題データと、ブラウザで解ける「過去問道場」ページを保存するリポジトリです。

## 現在の収録数
- 過去問: 100問
  - 第1セット: 50問
  - 第2セット: 50問
- 類似問題: 100問
- 公式範囲補強: 160問
- Learn製品補強: 6問
- **合計: 366問**

類似問題は過去問と同じ論点を別シナリオ・別数値・別の問い方で確認できるようにしています。公式範囲補強160問は、2026年4月17日時点の Microsoft Learn AZ-104 学習ガイドを基準に、公式82スキル細目の不足と薄さを補強したものです。さらに Learn製品補強6問を別セットで追加し、AZ-104 の公式 Learning Path に掲載される周辺製品も問題から直接学べるようにしています。

## 過去問道場
`index.html` に366問対応のページを実装しています。

主な機能:
- 全366問 / 過去問100問 / 第1セット / 第2セット / 類似問題100問 / 公式範囲補強160問 / Learn製品補強6問の切り替え
- 番号順 / ランダム / 間違えた問題のみ
- カテゴリ絞り込み
- 10問 / 20問 / 50問 / 100問 / 対象すべて
- 選択肢シャッフル
- 未回答のみ
- 単一選択 / 複数選択
- 正誤判定、正答、解説
- **全ての類似問題に Microsoft Learn の関連リンク**
- 過去問にも Microsoft Learn の関連リンク
- 学習履歴を localStorage に保存
- 問題一覧から直接ジャンプ
- iPhone 対応

## 問題データ
過去問は `questions/set-01/` と `questions/set-02/`、類似問題は `questions/similar/`、公式範囲補強は `questions/coverage/`、Learn製品補強は `questions/learn-products/` に、ページから直接読み込む JavaScript 形式で保存しています。

元データ確認用として JSON も `questions/` 配下に保存しています。

## 品質チェック
- 読み込み対象: **366問**
- 第1セット: 50問
- 第2セット: 50問
- 類似問題: 100問
- 公式範囲補強: 160問
- Learn製品補強: 6問
- UID 重複なし
- 正答インデックス異常なし
- 複数選択問題の正答数チェック済み
- 公式範囲補強160問 + Learn製品補強6問は全選択肢に明示的な個別解説あり
- 公式範囲補強160問 + Learn製品補強6問は全問に Microsoft Learn リンクあり
- `index.html` の JavaScript 構文チェック済み

## 方針
- 過去問の問題順は維持する
- 類似問題は元問題の暗記だけでなく、同じ概念を別条件で判断できるようにする
- 解説は「なぜ正解か」に加え、誤選択肢との違いが分かる内容を優先する
- Azure の仕様変更があり得るため、Microsoft Learn の現行ドキュメントも併読する


## 解説の構成
回答後は全366問で、次の順に学習できるようにしています。

1. **判断ポイント**: 問題文のどの条件が決め手か
2. **正解理由**: なぜその選択肢が要件を満たすか
3. **選択肢ごとの確認**: 正解・不正解それぞれの役割と、なぜ選ぶ/選ばないか
4. **試験での覚え方**: 類似問題にも使える切り分け方
5. **Microsoft Learn**: 公式ドキュメントで追加確認

解説表示は `explanation-helper.js` で共通化しており、過去問100問と類似問題100問の両方に適用されます。


## 2026-09-19 最終監査
過去問100問と類似問題100問の合計200問について、正答・解説・誤選択肢・Microsoft Learn の関連論点を再監査しました。

- 全200問の正答インデックスを再検証
- **全817選択肢**に、回答後の個別解説を表示
- 汎用の「不正解です」だけになる選択肢: **0**
- Microsoft Practice Assessment の想定と現行 Azure に差がある問題には監査メモを表示
- 類似問題の Recovery Services vault 削除問題は Secure by Default の現行仕様に合わせて改訂
- 問題画面に「Microsoft Learn監査済」または注意ステータスを表示
- 監査記録:
  - `audit/2026-09-19-original-100.md`
  - `audit/2026-09-19-similar-100.md`

### 特に注意する問題
- `s1-q19`: App Service 移動時の証明書の扱いに現行仕様注記
- `s1-q46`: Practice 想定は 14 日だが、現行 Learn では旧「最大14日」を明確な現行制限として確認できない
- `s2-q13`: Azure Backup Secure by Default による soft delete の仕様変化
- `s2-q18`: P1 は hybrid SSPR/password writeback 前提
- `s2-q19`: B2B guest のパスワード権威は home tenant 側
- `s2-q26`: Tag Contributor と scope を明示して理解する
- `s2-q27`: Practice 想定と現行 Resource Lock の挙動にずれ
- `s2-q48`: Practice の2選択肢は現行の「Client IP and protocol」1モードを分割表現


## 2026-09-20 公式試験範囲カバレッジ
Microsoft Learn「試験 AZ-104 の学習ガイド」の **2026年4月17日現在のスキル** と既存200問を突き合わせ、不足項目を補う50問を追加しました。

主な追加領域:
- Microsoft Entra のユーザー/グループ、Azure Policy、管理グループ
- Storage firewall / VNet、Stored Access Policy、access key、customer-managed key
- Storage Explorer、AzCopy、Azure Files snapshot / soft delete
- Bicep の解釈・変更・deploy・ARM→Bicep 変換
- VM Encryption at host、VM移動、resize、Availability Zone / Set
- VM Scale Sets、Azure Container Registry
- App Service backup / networking / deployment slots
- Service Endpoint / Private Endpoint / Effective security rules
- Alert Processing Rule、VM Insights、Connection Monitor
- Backup vault、Site Recovery、test failover、Backup reports / alerts

公式スキル項目と対応問題の完全なマッピング:
- `audit/2026-09-20-official-skills-coverage.md`
- `audit/2026-09-20-final-290-current-spec-audit.md`

この追加により、学習ガイドに列挙された公式スキル項目は、すべて少なくとも1問以上の対応問題を持つ状態にしています。


## 2026-09-20 深さ監査の追加補強
「公式スキル項目に1問以上ある」だけでは本番対策として薄い箇所が残るため、追加で40問（cov-q051〜cov-q090）を投入しました。

重点補強:
- Bicep: for / existing / module / if
- VM Scale Sets: Rolling / Manual upgrade policy
- Azure Container Registry: AcrPull / AcrPush
- App Service: HTTPS Only / Minimum TLS / managed certificate / slot settings / VNet Integration / Private Endpoint / Backup
- Networking: Standard Public IP / peering のアドレス重複 / UDR + NVA / Internal Load Balancer / Private Endpoint / NSG の重複適用
- Storage: User delegation SAS / Stored access policy / access key rotation / CMK / firewall / AzCopy
- Governance: Policy remediation / management group 継承 / Budget の基本動作
- Monitoring: Diagnostic settings / Storage insights / Network Insights / Metrics / KQL where・project
- Backup/DR: Site Recovery Commit / Re-protect / Recovery Services vault / Backup Reports

追加40問も、全選択肢に個別解説と Microsoft Learn 公式リンクを持たせています。


## 2026-09-20 290問 Current-Spec 最終監査
全290問について構造整合性を再チェックし、Azure の仕様変更影響が大きい論点を Microsoft Learn で再確認しました。

今回の修正:
- ACR の AcrPull / AcrPush 問題に RBAC Registry Permissions モードを明記
- Storage の ID ベースアクセス問題に Blob / File / Queue / Table の現行 Entra 認可範囲を注記
- Load Balancer 5-tuple 問題に「5-tuple は既定であり、障害原因の切り分けには追加確認が必要」という注記を追加

構造チェック結果:
- 290問すべて読み込み成功
- UID重複 0
- 正答インデックス異常 0
- Learnリンク不足 0
- index.html JavaScript 構文エラー 0

詳細は `audit/2026-09-20-final-290-current-spec-audit.md` を参照してください。


## 2026-09-21 問題学習前提の独立ギャップ監査と追加55問

「公式スキル名に関連する問題がある」だけでは、参考書なしで問題から学ぶには不十分と判断し、2026年4月17日版の公式82スキル細目を再監査しました。

290問時点の再評価:
- 十分: 54 / 82
- 薄い: 25 / 82
- 不足: 3 / 82

特に不足していたのは **VM作成そのもの / VNet・Subnet作成・構成 / Site Recoveryの初期構成** でした。また Storage冗長性、ACI/Container Apps provisioning、Azure Monitor Metrics、Backup/Restore、SSPR実設定なども薄いと判定しました。

そこで **cov-q091〜cov-q145 の55問** を追加し、以下を直接補強しました。
- Entra user作成 / SSPR / subscription管理
- StorageV2 / Secure transfer / ZRS・RA-GRS・GZRS / Files quota / container public access・soft delete / Azure Files SMB RBAC
- VM作成 / SSH / Public IPなし / Availability Zone / Encryption at host / resize / managed disk / snapshot
- ACI restart・size・secureValue / Container Apps environment・ingress・revision・minReplicas
- App Service plan / apex custom DNS / custom backup
- VNet/Subnet CIDR / overlap / delegation / custom DNS / Bastion SKU / Service Endpoint / Private Endpoint DNS / NVA IP forwarding
- Azure Monitor metric aggregation / dimension
- Backup vault / Recovery Services vault作成 / backup policy / new VM restore / file recovery
- Site Recovery enable replication / network mapping / recovery plan

さらに Microsoft公式 Practice Assessment、MicrosoftLearning公式AZ-104 Labs、公開されている無料模試をクロスチェックし、外部問題本文はコピーせず、論点確認だけに利用しています。

現行の最終監査:
- `audit/2026-09-21-independent-gap-audit.md`
- `audit/2026-09-21-post-gap-345-audit.md`
- `audit/2026-09-21-external-crosscheck-355-audit.md`
- `audit/2026-09-21-post-gap-fill-audit.md` ← 現行360問の最終監査

**現時点では公式82スキル細目すべてに、その中心判断を直接問う問題が少なくとも1問あります。** ただし Microsoft 公式が明記する通り related topics が出題される可能性はあるため、未知シナリオへの耐性は公式 Practice Assessment とハンズオンでも確認します。


## 合格率向上モード
過去問道場に、通常の問題演習だけでなく本番対策用の学習エンジンを実装しています。

### 本番模試
- **50問 / 100分**
- 公式5領域の出題比率の範囲内で構成
  - ID / Governance: 12問 (24%)
  - Storage: 9問 (18%)
  - Compute: 12問 (24%)
  - Networking: 10問 (20%)
  - Monitor / Backup: 7問 (14%)
- 類似問題セットは模試候補から除外し、過去問 + current-spec 補強問題を中心に抽選
- Practice想定と現行仕様に明確な差がある `legacy-practice` / `practice-nuance` 問題は模試候補から除外
- 模試中は正誤・解説・監査注記を表示しない
- 問題一覧、戻る、要復習フラグ、未回答のまま移動に対応
- 終了後に5分野別の正答率を表示
- 本試験の 700/1000 はスケールスコアであり raw 70% ではないため、道場独自の保守的目安として **総合85%以上 + 各分野75%以上** を使用

### 適応学習
- **おすすめ弱点20問**: 間違い、復習期限、フラグ、低正答率を優先
- **今日の復習**: 正誤に応じて 1 / 3 / 7 / 14 / 30 日の間隔反復
- **要復習フラグ**: 問題単位で手動マーキング
- **未回答20問**: 未着手問題からランダム出題
- 分野別の通算正答率と弱点判定
- 模試履歴を localStorage に保存
- 3回連続で「総合85%以上 + 各分野75%以上」を達成したか表示

### 受験直前ページ
`exam-guide.html` に次を用意しています。
- Microsoft公式の試験時間・採点方式へのリンク
- ハンズオン30項目のチェックリスト
- Bicep / Storage / VM / App Service / Network / Monitor / Backup / Site Recovery の実操作確認
- 頻出のサービス切り分けルール
- Practice由来の古い仕様問題に関する注意
- 本番100分の時間戦略

ハンズオンの進捗はブラウザの localStorage に保存されます。


## 12か月無料アカウント向けハンズオン
ユーザーが12か月無料の対象であることを前提に、課金ゼロを狙いつつ実機比率を上げた学習ルートを追加しました。

- `free-12m-labs.html`
  - VNet / Subnet / NSG / UDR
  - Blob Storage / SAS / versioning / soft delete / lifecycle
  - Azure Files / snapshot / soft delete
  - AzCopy / Storage Explorer
  - 無料対象 VM + Managed Disks
  - Azure Container Registry（Portal の Free services で対象が確認できる場合のみ）
  - App Service Free tier（対象/利用可能性を確認して基本操作）
  - それ以外のコンテナー/ネットワーク有料機能は、無料条件を個別確認してから任意演習
- 無料枠外または付随課金が読みにくい機能は `manual-only.html` に残す
- 毎回 Azure Portal の `Cost Management + Billing > Free services` で対象SKU・残量・有効期限を確認する
- Budget は通知用であり自動停止ではないことを明記

12か月無料枠の対象・数量は Microsoft 側で変更される可能性があるため、教材内の数値より Azure Portal の Free services と Microsoft公式無料サービス一覧を優先します。


## 2026-09-21 外部模試・公式Labクロスチェック（355問）

345問到達後、Microsoft公式Labに加えて、公開範囲で確認できる正規のAZ-104練習問題（Tutorials Dojo、Whizlabs、MeasureUp demoの公開情報）をクロスチェックしました。外部問題文はコピーせず、別教材で問われている判断軸を抽出し、Microsoft Learnの現行仕様で再検証しています。

追加10問（cov-q146〜cov-q155）:
- Microsoft Entra group naming policy / custom domain verification / group-based licensing
- ARM template dependsOn
- Azure File Sync
- Application Gateway WAF / dedicated subnet
- VPN Gateway の Local network gateway / BGP

詳細は `audit/2026-09-21-external-crosscheck-355-audit.md` を参照してください。


## 2026-09-21 最終深さ補強（360問）

355問版を厳格再監査し、VM作成・Encryption at host・Site Recovery replication policy の異なる判断軸を5問追加しました。`questions/coverage/q156-160.js` を参照してください。cov-q146〜q155 も教材仕様に合わせて `kind: "coverage"` に統一しています。


## 2026-09-21 Microsoft Learn 製品カバレッジ（366問）

公式試験範囲360問とは別に、AZ-104 の Microsoft Learn Learning Path に製品・サービスとして登場するものを再監査し、既存問題で直接学べていなかった6製品を `Learn製品補強` として追加しました。

追加6問:
- Azure Cloud Shell
- Microsoft Entra Domain Services
- Azure Kubernetes Service (AKS)
- Azure ExpressRoute
- Azure Firewall
- Azure Virtual Desktop

既存問題で Azure CLI、ACI、ACR、VM、VNet、Entra ID、Cost Management、RBAC、ARM、Blob Storage、Azure Files、Storage Explorer、VMSS、Application Gateway、Bastion、Azure DNS、Load Balancer、VPN Gateway、Azure Backup、Azure Monitor、Azure Site Recovery などは直接カバー済みです。

Learn製品補強は周辺知識の学習用で、**本番模試50問からは除外**しています。公式82スキル細目の監査結果は360問版の評価を維持します。

詳細:
- `audit/2026-09-21-learn-product-coverage-366.md`
