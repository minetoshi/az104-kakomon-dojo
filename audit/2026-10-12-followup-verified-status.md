# AZ-104 再監査：実測結果と未完了範囲

確認日: 2026-10-12 (JST)
開始時点のmain HEAD: `df9b0265b3641f89731fb5ac069f682073c1897c`
公式基準: [2026-04-17版 AZ-104 Study Guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104)

## 判断基準

**CI成功は教材の意味的正確性を保証しない。** 自動チェックは件数、UID、選択肢と正解配列、Learn要約のマッチ有無、UIの静的回帰を検証する。366問の本文・全選択肢・Learn本文を個別に独立照合したとは見なさない。

## 今回の確認・改訂UID

| UID | 判定 | 変更・確認の内容 | 根拠 |
| --- | --- | --- | --- |
| `cov-q003` | 公式根拠と照合、変更なし | RBAC継承、Contributorのアクセス権、Blobデータアクセスの別管理 | [RBAC role assignments](https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments), [Blob data access](https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access) |
| `cov-q006` | 公式根拠と照合、変更なし | 管理グループ間移動、親から継承したOwnerと直接割り当てOwnerの違い | [Move subscriptions](https://learn.microsoft.com/en-us/azure/governance/management-groups/manage#move-management-groups-and-subscriptions) |
| `cov-q010` | 改訂 | Stored access policyはService SASに限り適用。Account SASとUser delegation SASには非対応であることを明記 | [SAS types](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview) |
| `sim-q028` | 改訂 | 以前のActionsにdeleteが含まれておらず、NotActionsの除外を説明できない欠陥を修正。選択肢別解説を追加 | [Role definitions](https://learn.microsoft.com/en-us/azure/role-based-access-control/role-definitions) |
| `s1-q28` | 改訂 | 同種のNotActions差分不成立を修正し、他ロール・Deny assignmentなしの条件を明記 | [Role definitions](https://learn.microsoft.com/en-us/azure/role-based-access-control/role-definitions) |

今回、公式仕様と直接照合したUIDは**5 / 366**。その他361問は今回の独立した全選択肢・本文の意味的監査が未完了。過去に「監査済み」と報告された問題を今回の完了数へ加算していない。

## 自動検証と既存機能

- 問題母数: 366 = 中核260 + 応用100 + Learn補完6。中央台帳 `inventory.js` と `scripts/validate-data.js` が一致を要求する。
- 中核6分野: 39 / 49 / 42 / 40 / 46 / 44、合計260。
- Learn URL要約: fallback 0 / ルール複数一致0 / 未生成0 をCIで検証。**Learn本文との意味的未照合は残る**。
- 用語辞書: 136用語の公式Learn出典メタデータ存在をCIで検証。各定義とリンク先の意味的妥当性は136語個別に未照合。
- Learnリンク監視: GitHub Actions Run #11で352件のユニークURLへGETし、HTTP OK 352 / dead 0 / warning 0 / redirect 193。URL検証は重複排除し、問題UIDへの逆引き、最終URL、検証日時をJSONとして保存し、Actions artifactにアップロードする。**HTTP OKは主張の根拠としての適合を意味しない**。
- CIで既存localStorageキー、学習再開、正解ラベルシャッフル、366件、模試候補比率、カテゴリ全件表示を検証する既存のチェックは維持。
- 今回見つかった条件不足を繰り返さないよう `scripts/validate-data.js` にRBAC NotActionsとService SASに関する回帰アサーションを追加した。
- Pages成功はActionsデプロイ成功を意味する。実端末ブラウザ描画・iPhoneの手操作検証は今回未実施。

## 今後の順序（未完了）

1. **P0**: 残り361問をUID単位で公式本文と突合し、設問前提・正解の一意性・全不正解肢・日本語・Learn要約を監査。公式仕様が変化しやすい領域（バックアップ、Storage、VM、App Service、RBAC）から進める。
2. **P0**: 2026-04-17版Study Guideの各細目へUIDを明示的に対応付け、実践的シナリオ・操作・診断問題の不足を定量化。マッピングの存在のみでは深さを保証しない。
3. **P1**: 全366問のLearn本文に対する意味的照合。正規表現が選んだ要約と実際の問題の論点をUID単位でチェックする。
4. **P1**: 用語辞書136語の定義・別義誤マッチをMicrosoft Learn本文と照合し、ソース不足や優先順位問題を修正する。
5. **P1**: iPhone実機 / Safari の画面操作、既存ユーザー履歴の互換性、中断再開、各カテゴリ全問、模試とタイマーをエンドツーエンドで再確認する。
6. **P1**: 初見の公式Practice AssessmentとPortal / CLI / PowerShell / Bicep操作課題を別評価にし、内部366問の連続正解だけでは合格可能性を高く見積もらない。

試験範囲の公式配点: ID / Governance 20–25%、Storage 15–20%、Compute 20–25%、Networking 15–20%、Monitor 10–15%。既存50問模試の配分は12 / 9 / 12 / 10 / 7問でいずれも公式範囲内。ただし内部問題の再利用で初見対応力を保証しない。

## 完了の定義

366/366問が構造上読み込まれることと、366/366問が**現在のAzure仕様に照らして意味的検証済み**であることを別指標として扱う。現状の後者は未完了。完了宣言は、全UIDの監査根拠と、CI・公式ドキュメント照合・操作試験の結果が揃うまで禁止する。
