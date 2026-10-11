# AZ-104 Deep Research 監査対応記録

監査対応日: 2026-10-12

## 結論

Deep Research で指摘された高優先度の品質課題について、現行コード・問題データ・Microsoft Learn参照・自動検証まで反映した。

## 対応1: 旧仕様・Practice依存の6問を現行仕様へ改訂

以下のUIDは過去のPractice想定や旧仕様値への依存をやめ、現行Microsoft Learnでそのまま確認できる設問へ改訂した。

- `s1-q08`: Load Balancer の5-tuple暗記 → 正常性プローブ
- `s1-q19`: App Service移動 → 現行の証明書/関連App Serviceリソース移動要件
- `s1-q46`: 旧「最大14日」暗記 → Log Analyticsのログ検索アラート + Action Group
- `s2-q01`: 「IDベースStorage=Filesだけ」 → Azure Files + Microsoft Entra Kerberos
- `s2-q13`: Recovery Services vault削除 → Secure by Defaultを含む現行依存関係
- `s2-q27`: RGロックの旧想定 → 保護対象リソースへのCanNotDelete

UIDは維持した。問題指紋が変わるため、既存の学習履歴は自動的に未回答扱いへ戻る。

## 対応2: Microsoft Learn要約のfallback/競合を解消

`learn-summary.js` を以下のように変更した。

- 複数URLを連結して最初のルールに当てる方式を廃止
- 各Learn URLを個別に判定
- URLテーマ別の明示ルールを追加
- VNet/NSG、Monitor/Autoscale、Entra/RBACの広すぎる正規表現を分離
- CIでfallbackまたは複数ルール競合が1件でも残れば失敗

現行CIでは fallback 0 / ambiguity 0 を必須条件としている。

## 対応3: ID / Governance の薄かった2領域を補強

`cov-q003`:
- 複数スコープのAzure RBAC role assignmentを読み取り
- 継承と直接割り当てを組み合わせて実効アクセスを判断
- ContributorとroleAssignments/writeの違い
- Storageデータプレーン権限と管理プレーン権限の違い

`cov-q006`:
- 管理グループ間のサブスクリプション移動
- 現在のOwnerが管理グループから継承されている場合の移動先制限
- サブスクリプション直接Ownerと移動先Contributorの関係

## 対応4: 用語辞書136語へ公式Learn出典を追加

`glossary.js` の全136用語に `source` を付与した。

- source URL は `learn.microsoft.com` の公式ページ
- 解説画面の各用語カードに「公式 Microsoft Learn」リンクを表示
- `scripts/validate-data.js` で出典欠落を禁止

## 対応5: Learn URLの定期死活監視

追加:
- `scripts/check-learn-links.mjs`
- `.github/workflows/check-learn-links.yml`

対象:
- 全366問の `q.learn`
- audit-map の追加公式リンク
- glossary 136語の公式出典

動作:
- 重複URLを除去
- redirectを追跡
- 404 / 410など確定的な切れリンクはCI failure
- 403 / 429 / 一時的5xxはネットワーク起因の誤検知を避け警告扱い
- mainへの関連変更時、workflow_dispatch、毎週月曜06:00 JST相当で実行

初回監視で検出した実リンク切れを修正:
- Azure Monitor Metrics
- Cost Management Budget
- Azure Policy Initiative definition
- Azure Storage Explorer

最終確認:
- Learn link check Run #6: success
- GitHub Pages Run #186: success

## 現行の自動検証

Pagesデプロイ前の `scripts/validate-data.js` では、従来の問題構造・件数・シャッフル回帰・resume・DOM整合性に加えて以下を検証する。

- Learn summary fallback = 0
- Learn summary rule ambiguity = 0
- 366問すべてにLearn summaryあり
- 366問すべてに用語解説対象あり
- glossary全136語に公式Learn sourceあり
- mock候補のdomain quota充足
- legacy/practice-nuance問題の模試混入防止

## 合格について

このサイトの366問を「答えの暗記」ではなく、全選択肢の理由・用語・Learn要約まで説明できる状態にすることは、AZ-104合格に向けた強い準備になる。

ただしMicrosoft公式試験は未知のシナリオや操作理解も評価するため、366/366マスターは合格保証ではない。受験前は公式Practice AssessmentとAzure Portal / CLI / PowerShell / Bicepのハンズオンで最終確認する。
