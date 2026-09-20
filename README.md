# AZ-104 過去問道場

AZ-104 学習用の問題データと、ブラウザで解ける「過去問道場」ページを保存するリポジトリです。

## 現在の収録数
- 過去問: 100問
  - 第1セット: 50問
  - 第2セット: 50問
- 類似問題: 100問
- 公式範囲補強: 90問
- **合計: 290問**

類似問題は過去問と同じ論点を別シナリオ・別数値・別の問い方で確認できるようにしています。公式範囲補強90問は、2026年4月17日時点の Microsoft Learn AZ-104 学習ガイドと既存200問を突き合わせ、まず不足項目を50問で埋め、その後の深さ監査で薄かった論点をさらに40問追加したものです。

## 過去問道場
`index.html` に290問対応のページを実装しています。

主な機能:
- 全290問 / 過去問100問 / 第1セット / 第2セット / 類似問題100問 / 公式範囲補強90問の切り替え
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
過去問は `questions/set-01/` と `questions/set-02/`、類似問題は `questions/similar/`、公式範囲補強は `questions/coverage/` に、ページから直接読み込む JavaScript 形式で保存しています。

元データ確認用として JSON も `questions/` 配下に保存しています。

## 品質チェック
- 読み込み対象: **290問**
- 第1セット: 50問
- 第2セット: 50問
- 類似問題: 100問
- 公式範囲補強: 90問
- UID 重複なし
- 正答インデックス異常なし
- 複数選択問題の正答数チェック済み
- 公式範囲補強90問は全選択肢に明示的な個別解説あり
- 公式範囲補強90問は全問に Microsoft Learn リンクあり
- `index.html` の JavaScript 構文チェック済み

## 方針
- 過去問の問題順は維持する
- 類似問題は元問題の暗記だけでなく、同じ概念を別条件で判断できるようにする
- 解説は「なぜ正解か」に加え、誤選択肢との違いが分かる内容を優先する
- Azure の仕様変更があり得るため、Microsoft Learn の現行ドキュメントも併読する


## 解説の構成
回答後は全290問で、次の順に学習できるようにしています。

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
