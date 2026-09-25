# AZ-104 勉強モード マスター対象の明確化

監査日: 2026-09-25

## 結論

この道場では、最終ゴールを **366 / 366問マスター** とする。

マスターの定義:
- 同じ問題を **2回連続で正解**
- 実装上は `history(q).streak >= 2`
- 1回だけ正解、または通算正答率だけではマスター扱いにしない

これは道場内の学習完了基準であり、Microsoft公式の合格保証ではない。

## 366問の役割

| フェーズ | 対象 | 件数 | 役割 |
|---|---|---:|---|
| ① 中核マスター | 第1セット50 + 第2セット50 + 公式範囲補強160 | **260** | 最優先。現行AZ-104の試験範囲を問題学習する中心セット |
| ② 応用・類似 | 類似問題 | **100** | 中核と同じ論点を別シナリオで判断できるか確認 |
| ③ Learn補完 | Learn製品補強 | **6** | Learning Path周辺製品の補完 |
| **完全マスター** | 上記すべて | **366** | 366問すべて2回連続正解 |

推奨順は固定:
1. 中核260問をすべてマスター
2. 応用・類似100問をすべてマスター
3. Learn補完6問をすべてマスター
4. 366 / 366問で完全マスター

画面上では②は①完了後、③は①+②完了後に解放する。

## 中核260問の分野別件数

`studyStageId(q)` で中核セット（set 1, 2, 4）のみを再集計。

| 順 | 分野 | 件数 |
|---:|---|---:|
| 1 | ID・ガバナンス | **39** |
| 2 | ストレージ | **49** |
| 3 | VM・Compute | **42** |
| 4 | App Service・コンテナー | **40** |
| 5 | ネットワーク | **46** |
| 6 | Monitor・Backup・DR | **44** |
| **合計** |  | **260** |

中核合計: `39 + 49 + 42 + 40 + 46 + 44 = 260`

## 応用100問の分野別件数

| 分野 | 件数 |
|---|---:|
| ID・ガバナンス | 21 |
| ストレージ | 19 |
| VM・Compute | 11 |
| App Service・コンテナー | 15 |
| ネットワーク | 23 |
| Monitor・Backup・DR | 11 |
| **合計** | **100** |

## Learn補完6問の分野別件数

| 分野 | 件数 |
|---|---:|
| ID・ガバナンス | 1 |
| ストレージ | 0 |
| VM・Compute | 2 |
| App Service・コンテナー | 1 |
| ネットワーク | 2 |
| Monitor・Backup・DR | 0 |
| **合計** | **6** |

## 全366問との整合性

分野別全量は従来どおり:
- ID・ガバナンス 61
- ストレージ 68
- VM・Compute 55
- App Service・コンテナー 56
- ネットワーク 71
- Monitor・Backup・DR 55
- 合計 366

各分野で `中核 + 応用 + Learn = 全量` を満たす:
- 39 + 21 + 1 = 61
- 49 + 19 + 0 = 68
- 42 + 11 + 2 = 55
- 40 + 15 + 1 = 56
- 46 + 23 + 2 = 71
- 44 + 11 + 0 = 55

## 現行Study Guideとの関係

2026-09-25時点で確認した Microsoft Learn の AZ-104 Study Guide は、Skills measured as of April 17, 2026 を掲載している。

公式の大分類は:
- Manage Azure identities and governance
- Implement and manage storage
- Deploy and manage Azure compute resources
- Implement and manage virtual networking
- Monitor and maintain Azure resources

道場の6ステップは、Computeを VM/Compute と App Service/Container に分けて学びやすくした内部分類である。

## 自動検証

`inventory.js` に以下を固定:
- mastery total 366
- core 260
- transfer 100
- learn 6
- requiredStreak 2
- 各フェーズの6分野件数

`scripts/validate-data.js` で、実データから再集計した値と台帳を比較し、1件でも不一致なら Pages デプロイを失敗させる。

また `index.html` 起動時にも同じ mastery 件数を実データと照合する。