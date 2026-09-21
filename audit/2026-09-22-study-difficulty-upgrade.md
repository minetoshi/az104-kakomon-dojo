# AZ-104 勉強モード 難易度格上げ監査

監査日: 2026-09-22  
対象: 公式範囲補強160問 + Learn製品補強6問 = 166問  
基準: Microsoft Learn「Study guide for Exam AZ-104」Skills measured as of April 17, 2026

## 目的

勉強モードを「用語を当てるだけの問題集」ではなく、実際の AZ-104 に近い形で要件を読み、複数の Azure 機能から適切な構成を選ぶ教材に寄せる。

過去問100問と類似100問は原型を維持し、こちらで作成した coverage / Learn製品問題を優先して難化した。

## 今回の変更

### Learn製品補強6問
以下を単純な製品名当てからシナリオ型へ全面改訂した。

- learn-q001: Azure Cloud Shell
- learn-q002: Microsoft Entra Domain Services
- learn-q003: Azure Kubernetes Service (AKS)
- learn-q004: Azure ExpressRoute
- learn-q005: Azure Firewall
- learn-q006: Azure Virtual Desktop

### 公式範囲補強 37問
特に「問題文が短い」「正解サービス名が浮いている」「誤答が明らかに別分野」の問題を優先して、複数条件・既存構成・運用制約を含むシナリオへ変更した。

対象:
- cov-q004
- cov-q012
- cov-q014
- cov-q016
- cov-q017
- cov-q021
- cov-q022
- cov-q024
- cov-q025
- cov-q029
- cov-q031
- cov-q044
- cov-q045
- cov-q053
- cov-q065
- cov-q066
- cov-q077
- cov-q080
- cov-q084
- cov-q089
- cov-q094
- cov-q097
- cov-q098
- cov-q099
- cov-q100
- cov-q103
- cov-q107
- cov-q108
- cov-q109
- cov-q115
- cov-q117
- cov-q119
- cov-q120
- cov-q121
- cov-q122
- cov-q125
- cov-q137

主な改善例:
- Azure Policy: 「Denyはどれ」→既存リソースを残し、新規違反デプロイだけ拒否する要件
- Bicep: キーワード暗記→コード断片の空欄補完、scope を読んだ CLI コマンド選択
- Storage: ZRS / GRS / RA-GRS / GZRS を「ゾーン」「別リージョン」「平常時のsecondary read」で切り分け
- VM: Encryption at host を Storage Service Encryption / ADE / Trusted launch と比較
- VMSS: CPU 条件、評価期間、min/max capacity を含む autoscale シナリオ
- Monitor: Metrics / Logs / Activity Log の使い分け、maintenance 時の Alert processing rule
- App Service: Backup、apex custom domain、backup storage/SAS を要件ベースで選択
- VNet: CIDR の包含・重複・分割を実際の prefix で判断
- Backup: VM 全体 restore ではなく単一ファイルだけを戻す File Recovery シナリオ

## 勉強モード側の難易度対策

- 全366問を学習対象
- 初期設定: ランダム出題
- 初期設定: 選択肢シャッフル
- 解答前: カテゴリ非表示
- 解答前: 黒本章非表示
- 解答後: カテゴリ / 章 / 正解理由 / 全選択肢解説 / Learn を表示

これにより「カテゴリ名が答えのヒントになる」「選択肢の位置を覚える」といった問題を抑える。

## 模試との分離

- 模試: 50問 / 100分
- set 3（類似問題）を除外
- set 5（Learn製品補強）を除外
- coverage は候補に含める
- legacy-practice / practice-nuance は除外
- 公式5分野比率を維持
- 模試中は正誤・解説・カテゴリ・章を非表示

## 構造監査

166補強問について再チェック:

- JavaScript 構文エラー: 0
- UID 重複: 0
- 必須フィールド欠落: 0
- 正答 index 異常: 0
- multi / 正答数不整合: 0
- ox 数と選択肢数の不一致: 0
- coverage: 160問
- Learn製品補強: 6問
- 合計: 166問

cov-q144 と cov-q152 は Microsoft Learn に加えて MicrosoftLearning 公式 AZ-104 Lab 06 へのリンクも持つため、全リンクを learn.microsoft.com ドメインだけに限定する検査では例外になるが、リンク欠落ではない。

## 簡単すぎる問題の再スキャン

今回の監査では、以下の簡易基準で再スキャンした。

- 問題文が極端に短い
- 「どのサービス/機能/ツールか」だけで答えられる
- 実際の構成・制約・障害条件などがない

この高リスク条件に該当する問題は、166補強問内で **0問** になった。

これは本試験と同一難易度を保証するものではないが、少なくともこちらで追加した教材問題については「名称暗記だけで正解できる問題」を優先的に解消した状態。