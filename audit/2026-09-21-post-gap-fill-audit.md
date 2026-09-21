# AZ-104 357問 最終ポスト・ギャップ監査

監査日: 2026-09-21  
公式基準: Microsoft Learn「Study guide for Exam AZ-104: Microsoft Azure Administrator」**Skills measured as of April 17, 2026**  
対象: 過去問100 + 類似問題100 + 公式範囲補強157 = **357問**

## 結論

290問時点の独立ギャップ監査は、公式82スキル細目を「問題だけで学べる深さ」で評価し、**十分54 / 薄い25 / 不足3** だった。

その後の追加は次のとおり。

- cov-q091〜cov-q145: 55問（不足3 + 薄い25の直接補強）
- cov-q146〜cov-q155: 10問（Microsoft公式Lab・Practice Assessment・合法的に公開された外部練習問題から、未経験の判断軸を抽出して独自問題化）
- cov-q156〜cov-q157: 2問（355問版の再監査で残った Encryption at host の同型反復を解消）

290問からの追加は **67問**、最終総数は **357問**。

最終的に公式82スキル細目をゼロベースで再判定した結果:

| 公式領域 | スキル細目数 | 十分 | 薄い | 不足 |
|---|---:|---:|---:|---:|
| ID / Governance | 15 | 15 | 0 | 0 |
| Storage | 17 | 17 | 0 | 0 |
| Compute / App Service | 24 | 24 | 0 | 0 |
| Networking | 13 | 13 | 0 | 0 |
| Monitor / Backup / DR | 13 | 13 | 0 | 0 |
| **合計** | **82** | **82** | **0** | **0** |

ここでの「十分」は、**同じ答えを言い換えた問題が複数あるだけではなく、基礎概念・設定・判断・操作・トラブルシューティング等のうち複数の異なる判断軸を問題で経験できる**ことを意味する。これは本試験の未知シナリオを100%保証する意味ではない。

Microsoft自身も、skills measured の各 bullet は評価方法の例であり related topics が出題され得ると明記している。

## 355問版で最後に残った問題

### Encryption at host

355問版には以下があった。

- cov-q025: OS/Data disk に加え cache / temp disk も暗号化したい → Encryption at host
- cov-q107: 上記とほぼ同じ判断

2問存在しても判断軸がほぼ同じため、独立監査基準では「十分」ではなく **薄い** と再判定した。

追加:

- cov-q156: **現在または過去に Azure Disk Encryption (ADE) を使用した VM / VMSS には Encryption at host を有効化できない**という制約
- cov-q157: **既存 VM は Encryption at host 適用時に deallocate / reallocate が必要**という操作

これにより、サービス名当てだけでなく、対象可否と既存VMへの適用手順まで学習できる。

Microsoft Learn:
- https://learn.microsoft.com/en-us/azure/virtual-machines/linux/disks-enable-host-based-encryption-cli
- https://learn.microsoft.com/en-us/azure/virtual-machines/disks-enable-host-based-encryption-portal

## 290問時点で不足/薄かった28項目の再評価

| 旧ギャップ | 主な補強問題 | 最終判定 |
|---|---|---|
| ユーザーとグループ作成 | cov-q091, cov-q146 | 十分 |
| SSPR構成 | cov-q092, q093 | 十分 |
| Subscription管理 | cov-q094 + 既存scope問題 | 十分 |
| Azure Files IDベースアクセス | cov-q141 + 既存認証問題 | 十分 |
| Storage account作成・構成 | cov-q095, q096 | 十分 |
| Storage redundancy | cov-q097〜q099 | 十分 |
| Azure Files file share | cov-q100 + 既存snapshot/認証 | 十分 |
| Blob container作成・構成 | cov-q101 + 既存SAS/immutability | 十分 |
| Blob/container soft delete | cov-q102 + 既存blob soft delete | 十分 |
| 既存ARM template変更 | cov-q103, cov-q150 | 十分 |
| VM Encryption at host | cov-q025, q107, **q156, q157** | 十分 |
| VM size管理 | cov-q028, q108 | 十分 |
| VM disk管理 | cov-q109, q110 + 既存disk移動 | 十分 |
| ACI provisioning | cov-q111〜q113 | 十分 |
| Container Apps provisioning | cov-q114〜q116 | 十分 |
| Container sizing/scaling | cov-q112, q117 + 既存event scale | 十分 |
| App Service作成 | cov-q118 + 既存plan/publish | 十分 |
| Custom DNS mapping | cov-q119 + 既存CNAME問題 | 十分 |
| App Service Backup | cov-q120 + 既存backup/restore | 十分 |
| VNet/Subnet作成・構成 | cov-q121〜q125 | 十分 |
| Azure Bastion | cov-q126, q127 + 既存接続問題 | 十分 |
| PaaS Service Endpoint | cov-q128 + 既存Storage endpoint | 十分 |
| Azure Monitor metrics | cov-q131, q132 | 十分 |
| Backup vault | cov-q133, q143 | 十分 |
| Backup policy | cov-q135 + 既存retention問題 | 十分 |
| Backup / Restore operation | cov-q136, q137 + 既存restore問題 | 十分 |
| VM作成（旧「不足」） | cov-q104〜q106 + availability/disk問題 | 十分 |
| Site Recovery構成（旧「不足」） | cov-q138〜q140 + 既存failover/re-protect | 十分 |

VNet/Subnet（旧「不足」）は cov-q121〜q125 で address space / CIDR / overlap / delegation / custom DNS を直接補強している。

## 最終構造監査

作業ブランチ上の実ファイルを読み込み順に評価した。

- 総問題数: **357**
  - original: 100
  - similar: 100
  - coverage: 157
- Question script: **37ファイル**
- support script: 3ファイル
- UID重複: **0**
  - s1-q01〜s1-q50
  - s2-q01〜s2-q50
  - sim-q001〜sim-q100
  - cov-q001〜cov-q157
- 正答 index 異常: **0**
- multi と正答数の不整合: **0**
- coverage の `ox.length !== o.length`: **0**
- coverage の Microsoft Learn リンク欠落: **0**
- similar の Microsoft Learn リンク欠落: **0**
- original set-01 は `learn-map.js` で50/50に公式Learnリンクあり
- 選択肢別解説:
  - coverage は `ox` を直接保持
  - original / similar は `explanation-helper.js` が全選択肢を `q.o.map(...)` で必ず生成
- Question JS syntax error: **0**
- index.html inline JS syntax error: **0**
- support JS syntax error: **0**
- missing question/support script: **0**（監査時に参照37 + support3をすべて取得成功）
- missing DOM reference: **0**

### metadata修正

外部クロスチェック由来の cov-q146〜cov-q155 は内容上 coverage だが `kind:"crosscheck"` になっていた。

今回すべて:

```
set: 4
kind: "coverage"
```

へ統一した。

## 学習履歴・模試・章フィルター

既存 localStorage key は変更していない。

- `az104_kakomon_dojo_v5_250`
- `az104_kakomon_mock_history_v1`
- `az104_kakomon_resume_v1`

「続きから」は UID で復元するため、既存 UID を変更せず cov-q156 / q157 を末尾追加した今回の変更と互換。

模試は従来どおり:

- similar (`set===3`) を除外
- original + coverage を使用
- `legacy-practice` / `practice-nuance` を除外
- ID/ガバナンス 12、ストレージ9、コンピュート12、ネットワーク10、監視/バックアップ7

黒本章フィルターの件数は固定値ではなく、現在の `QUESTIONS` に対して `bookChapterOf(q)` を評価して動的集計するため、357問へ自動追従する。

## Microsoft公式の再確認

2026-04-17版 Study Guide の82細目を再確認した。

- ID / Governance: 15
- Storage: 17
- Compute / App Service: 24
- Networking: 13
- Monitor / Backup / DR: 13

合計82。

公式Study Guide:
https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104

Microsoft Practice Assessment:
https://learn.microsoft.com/en-us/credentials/certifications/practice-assessments-for-microsoft-certifications

MicrosoftLearning AZ-104 Labs:
https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/

Practice Assessment は無料で繰り返し利用でき、正答・rationale・追加Learnリンクを提供する。問題本文はこのリポジトリへコピーしていない。

## 外部模試・公開サンプルから得た判断軸

合法的に公開されているサンプルは**論点発見だけ**に使用し、問題文・選択肢は転載していない。

主に追加/再確認した論点:

- AzCopy が扱う主要対象（Blob / Azure Files）
- Microsoft Entra group naming policy
- Entra custom domain の TXT / MX verification
- group-based licensing の nested group / DisabledPlans
- ARM `dependsOn`
- Azure File Sync の構成順
- Application Gateway WAF / dedicated subnet
- Local network gateway
- VPN Gateway BGP
- Load Balancer session persistence
- P2S topology変更後のclient profile
- Storage redundancyの使い分け

確認した公開ソース:
- Tutorials Dojo AZ-104 sample:
  https://tutorialsdojo.com/az-104-microsoft-azure-administrator-sample-exam-questions/
- Tutorials Dojo free sampler:
  https://portal.tutorialsdojo.com/courses/free-az-104-microsoft-azure-administrator-practice-exams-sampler/
- MeasureUp AZ-104 practice page:
  https://www.measureup.com/microsoft-practice-test-az-104-microsoft-azure-administrator.html
- Whizlabs 公開sampleも論点発見には使用したが、試験時間などMicrosoft公式と異なる記述があるため、仕様・試験条件の根拠には使用しない。

## 完成判定

この監査基準では:

- **不足: 0**
- **薄い: 0**
- **十分: 82 / 82**

よって「2026-04-17版の公式範囲を、参考書を読まず問題中心で一巡する教材」という目標には到達したと判定する。

ただし、これは「357問を暗記すれば必ず合格」という意味ではない。Microsoft Practice Assessment と公式Labで初見耐性・操作経験を確認し、サイト内50問模試の独自基準（総合85%以上、各分野75%以上を3回連続）まで仕上げる運用を推奨する。
