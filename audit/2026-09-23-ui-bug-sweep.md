# AZ-104 過去問道場 UI・データ不具合総点検

監査日: 2026-09-23

## 発端

選択肢シャッフル後の問題画面では、

- A: Availability Set
- B: Application Security Group
- C: Action Group
- D: Management Group

と表示されているのに、回答後の「選択肢ごとの確認」が元データ順の

- A: Action Group
- B: Application Security Group
- C: Availability Set
- D: Management Group

になっていた。

原因は、問題画面がシャッフル後の visual order を使う一方、解説欄が original option index をそのまま A/B/C/D に変換していたこと。

## 根本修正

### 1. シャッフル表示と解説表示を同一ロジックへ統一

`ui-logic.js` を新設。

- naturalOrder
- validOrder
- normalizeOrder
- correctAnswerText
- feedbackRows

を純粋関数化し、問題表示と回答後解説の双方で「original index → visual index」を正しく対応させる。

スクリーンショット相当の回帰テストを固定:

元データ:
- 0 Action Group（正解）
- 1 Application Security Group
- 2 Availability Set
- 3 Management Group

表示順:
- [2, 1, 0, 3]

期待:
- A Availability Set
- B Application Security Group
- C Action Group
- D Management Group
- 正解表示: C. Action Group

この条件を満たさなければ GitHub Pages のデプロイ前検証を失敗させる。

### 2. 固定 A/B/C/D を解説データへ持たせない

全366問について、正解解説 `e` と選択肢解説 `ox` に
「選択肢A」「A. ～」のような表示順依存文字列がないことを検査。

現行データ: 該当 0件。

## 同時に修正したロジック不具合

### 再開データ

- 選択肢 order が重複 index を含む壊れた配列でも通っていた
  - Set で重複検査し、完全な permutation だけを許可
- 問題更新前に保存した index が、更新後の別選択肢へ復元される可能性
  - 問題本文・選択肢・正答・multi から signature を保存
  - signature 不一致時は古い選択・正誤を破棄
  - resume schema を v2 化
- v1 以前の再開データ
  - 安全のため古い回答 index を引き継がず先頭から再開
- legacy resume
  - 「次の未回答」以降に回答済み問題まで混ざる可能性を修正
  - 未回答問題だけを順番に並べる

### 模試タイマー

- `remainingSec=0` が falsy 扱いされ、再開時に100分へ戻る可能性を修正
- 保存値が異常に大きい場合も100分を上限に clamp

### 学習結果表示

- 20問などの通常学習でも、模試用の
  「総合85%以上 + 各分野75%以上 = 仕上がり目安クリア」
  が表示され得た
- 通常学習と本番模試の結果判定を分離
- 通常学習では、そのセッションの正答率だけを表示し、模試合格目安とは扱わない
- 通常学習の分野表は出題0問の行を非表示

### おすすめ学習ルート

- 未回答が20問未満になると、ボタン表記は20問なのに5問などで開始する場合があった
- 未回答を最優先し、不足分を弱点問題で埋めて原則20問にする
- smartScore を `sort` comparator 内で毎回再計算しており、比較順が非推移になる問題を修正
- 各問題の score を1回だけ計算してから sort

### 「今回の間違いだけ」

- 復習開始時に選択肢順を natural order へ戻していた
- 直前に見た表示順を維持して復習するよう修正

### 保存データ耐性

- state が配列など想定外型でも読み込まれる可能性を修正
- `tries / correct / streak / due / lastAt` を数値として正規化
- `correct <= tries` に clamp
- mockHistory の rate / correct / total / elapsedSec を正規化
- 不正な日付は「日付不明」として表示
- localStorage の壊れた値で HTML やタイマーが崩れにくい構成へ変更

### 動的HTML

- category 値を `innerHTML` で option 化していた箇所を DOM + textContent へ変更
- chapter chip も DOM + textContent へ変更
- mockHistory 由来の値を readiness の `innerHTML` へ直接連結しないよう変更

## 問題数・表示数

`inventory.js` を中央台帳として利用。

- 全366
- 第1セット 50
- 第2セット 50
- 類似 100
- 公式範囲補強 160
- Learn製品補強 6

画面の set count、問題画面の「問n/総数」、resume/session 名称を台帳参照へ寄せた。

既存 localStorage key は変更しない:

- `az104_kakomon_dojo_v5_250`
- `az104_kakomon_mock_history_v1`
- `az104_kakomon_resume_v1`

## デプロイ前自動検証

`scripts/validate-data.js` を追加し、GitHub Pages workflow の Checkout 後に必ず実行。

### 366問データ

- 合計 366
- UID 重複
- set別件数
- set内 id 重複 / 欠番
- similar baseId 1～100 の重複 / 欠番
- 問題文 / category 欠落
- 選択肢2件以上
- 空選択肢
- 同一問題内の選択肢重複
- 正答 index 範囲外
- 正答 index 重複
- multi と正答数の矛盾
- 正解解説欠落
- `ox` 件数と option 件数の不一致
- 空の選択肢解説
- 固定 A/B/C/D 表現
- Learn link 欠落 / URL不正
- explanation-helper の生成 option index
- explanation-helper の ok 判定と q.a の一致

### 模試

- quota 合計50
- set3 / set5 を除外
- legacy-practice / practice-nuance を除外
- 各公式分野に quota 以上の候補が存在

### UI / ページ

- 全HTMLの duplicate id
- 存在しない DOM id 参照
- inline JavaScript 構文
- 壊れたローカル href / src
- 旧 250/290/340/345/350/355/360問表記
- duplicate script src
- index が全 question JS を漏れなく1回読み込む
- `data-az104-set` の未知キー
- localStorage key の変更
- 0秒模試再開の100分リセット再発
- ui-logic.js 読み込み
- category の動的 innerHTML 再発

### シャッフル回帰テスト

スクリーンショット相当の fixture に対し、

- A Availability Set
- B Application Security Group
- C Action Group
- D Management Group
- correct = C. Action Group

を直接テストする。

## 結論

今回確認された表示順バグは、個別問題データの修正ではなく UI の index mapping の根本修正で対応した。
そのため、選択肢シャッフルを使用する全366問に同じ修正が適用される。

加えて、再開、タイマー、学習結果、弱点出題、保存データ、動的HTML、問題データ構造、模試候補、ページ参照までデプロイ前検証対象にした。

## 追加ハードニング

- resume session 内の null / 不正要素を除外
- resume の runResult は boolean のみ、sessionSelections は有効な index 配列のみ復元
- 回答後表示でも malformed sessionSelections を配列として検証
- localStorage の setItem/removeItem 失敗を捕捉し、学習フロー継続
- native radio/checkbox の checked と見た目の選択状態を同期
- 永続学習履歴にも question signature を付与し、将来同一UIDの問題内容が変わった場合は旧正答履歴を自動無効化
- セッション下部の進捗表示を元問題セットではなく現在の学習セッション名へ統一
- explicit resume がないときの履歴推測は「続きから」ではなく「次の未回答20問」として区別

これらも `scripts/validate-data.js` の回帰条件に追加した。