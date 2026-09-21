# AZ-104 290問 独立ギャップ監査（問題学習前提）

監査日: 2026-09-21  
基準: Microsoft Learn「Study guide for Exam AZ-104: Microsoft Azure Administrator」Skills measured as of April 17, 2026  
対象: 過去問100 + 類似100 + 公式補強90 = 290問

## 結論

従来の「公式スキル項目ごとに少なくとも1問ある」という判定は、**問題を解きながら知識を身につける教材としては甘かった**。

今回は、単に問題文中に用語が出るだけでは「カバー」と数えず、各公式スキルを**正答判断の主論点として直接問うか**、さらに**異なる条件・操作・設定で反復できるか**を基準に再監査した。

82個の公式スキル細目を独立に再評価した結果:

- **十分**: 54 / 82
- **薄い**: 25 / 82
- **不足**: 3 / 82

よって、現行290問は「公式項目名を一通り触っている」という意味では広いが、**参考書なし・問題だけでゼロから学ぶ教材として『完全網羅』とはまだ言わない方が正確**。

## 判定基準

### 十分
少なくとも2つ以上の意味の異なる直接問題があり、設定・判断・トラブルシューティングなど複数角度から学べる。

### 薄い
直接問題はあるが、1問だけ、または類似問題がほぼ同型で、問題学習だけでは知識の幅が不足しやすい。

### 不足
既存の対応問題が周辺論点を扱うだけ、またはサービス名を当てる程度で、公式スキルそのものを十分に練習できない。

---

## 不足 3項目

### 1. 仮想マシンの作成
従来マップ: s1-q011, s1-q012

問題点:
- s1-q011 は既存VMからARMテンプレートを取得・再利用する論点
- s1-q012 はARMテンプレートをPowerShellでデプロイする論点
- VM作成時の image / size / authentication / disk / NIC / availability / inbound ports などを直接選ばせる問題が不足

必要な補強例:
- PortalでVM作成時に選ぶ認証方式
- Public IPなしのVM作成
- OS disk / data disk / disk type
- availability zone指定
- VM作成後のNIC/NSG関連

### 2. 仮想ネットワークとサブネットを作成して構成する
従来マップ: s2-q044, sim-q093

問題点:
- s2-q044 は主にASG/NSGルール最小化
- sim-q093 はNSGの関連付け先
- VNet address space、subnet prefix、重複、subnet分割、DNS、delegation等の「VNet/Subnet作成・構成」を直接問う問題が不足

必要な補強例:
- VNet /16から複数subnetを切るCIDR判断
- subnet address range変更の条件
- address space重複
- custom DNS server
- subnet delegation

### 3. Azure Site Recoveryを構成する
従来マップ: cov-q043

問題点:
- cov-q043 は「別リージョンへ継続レプリケートするサービスは何か」を選ぶ問題
- Test failover / Commit / Re-protect は十分あるが、「ASRを構成する」部分が薄い

必要な補強例:
- source / target region
- replication policy
- target resource group / VNet
- network mapping
- enable replication
- recovery planの役割

---

## 薄い 25項目

### ID / Governance
1. ユーザーとグループを作成する
   - グループ作成はあるが、ユーザー作成そのものが弱い
2. SSPRを構成する
   - ライセンス/利用者判定はあるが、対象scope・認証方法・有効化設定が弱い
3. サブスクリプションを管理する
   - Policy/RBAC/costのscopeとしては登場するが、subscription管理自体の判断問題が少ない

### Storage
4. Azure FilesのIDベースアクセス
   - 同じ認証論点に寄っている
5. ストレージアカウントを作成・構成する
   - account kind / performance / access tier / secure transfer等の幅が不足
6. Azure Storageの冗長性
   - ZRS中心。LRS / GRS / RA-GRS / GZRSの使い分けが弱い
7. Azure Filesでfile shareを作成・構成する
   - snapshot/認証はあるが、share作成・quota・protocol等が弱い
8. Blob containerを作成・構成する
   - SAS/immutability中心。container作成・public access等が弱い
9. Blob / container soft delete
   - Blob soft deleteはあるが、container soft deleteを直接判断させる問題が弱い

### Compute / App Service
10. 既存ARM templateを変更する
    - copy/反復に偏る
11. VM Encryption at host
    - 1問のみ
12. VMサイズを管理する
    - resize 1論点のみ
13. VM diskを管理する
    - diskの付け替え中心。作成/種類/snapshot等が弱い
14. ACIをプロビジョニング
    - Azure Files永続化問題が中心で、作成設定をほぼ問わない
15. Container Appsをプロビジョニング
    - scaling/sidecar中心で、作成そのものが弱い
16. コンテナーのサイズ設定とスケーリング
    - Container Appsのevent scaleはあるが、ACI sizing等が弱い
17. App Serviceを作成する
    - plan選択やcontainer publishはあるが、作成時の基本設定が薄い
18. App Service Custom DNS
    - CNAME系に偏る
19. App Service Backup
    - ほぼ同一論点の反復

### Networking
20. Azure Bastion
    - サービス名当てが中心。SKU/構成差の問題が薄い
21. PaaS service endpoint
    - 同一パターンの反復が中心

### Monitor / Backup
22. Azure Monitor metricsを解釈する
    - cov-q084は直接問題だが、従来マップのs1-q044はPacket Capture問題であり、metricsの直接カバーではない
23. Backup vault
    - cov-q047のvault種別判定が中心
24. Backup policy
    - Instant Restore retentionの同型問題が多く、policy全体の設計幅が弱い
25. Backup / Restore operation
    - 「別VMとしてRestore」はあるが、file restore / disk restore / restore point選択等の幅が不足

---

## 旧coverage mapで「カバー済み」と判定しすぎていた代表例

### Azure Monitor metrics
旧マップ:
- s1-q021
- s1-q044
- cov-q084

問題:
- s1-q044はVM間トラフィックのPacket Capture問題で、metrics解釈ではない
- s1-q021はApp Service autoscaleが主論点
- metricsそのものを直接問うのは実質cov-q084が中心

### VNet / Subnet作成・構成
旧マップ:
- s2-q044
- sim-q093

問題:
- どちらもNSG/ASG関連で、VNet/Subnet作成そのものを直接問わない

### コンテナーのサイズ設定/スケーリング
旧マップ:
- s1-q017
- sim-q090

問題:
- s1-q017はContainer Apps scalingで妥当
- sim-q090はApp Serviceを選ぶ問題で、コンテナー sizing/scaling の直接問題ではない

### VM作成
旧マップ:
- s1-q011
- s1-q012

問題:
- どちらもARM template利用が主論点で、VM作成画面・構成選択の練習としては不足

---

## 重複について

重複自体は問題ではない。むしろ定着には有効。

ただし現状は、次のような論点に重複が多い一方で、上記の薄い/不足項目への問題数が少ない。

重複が多い代表:
- Object Replication
- Blob tier
- Load Balancer troubleshooting
- Guest invitation
- SSPR license/eligibility
- App Service autoscale
- Recovery Services vault削除
- Instant Restore retention
- NSG / IP Flow Verify

問題学習型教材としては、これらを削る必要はなく、**不足分野を追加する**方がよい。

---

## 公式82項目に対する最終評価

- 形式的カバレッジ（用語/周辺問題を含めれば）: 82/82
- 問題だけで学習する前提の実質カバレッジ:
  - 十分: 54
  - 薄い: 25
  - 不足: 3

したがって「290問だけで完全網羅」とは現時点では言わない。

## 推奨対応

既存290問は残す。重複も残す。

そのうえで、薄い25項目と不足3項目に対し、**約35〜45問の“穴埋め専用問題”**を追加するのが最も効率的。

優先順位:
1. VM作成
2. VNet/Subnet作成・構成
3. Site Recovery構成
4. Storage redundancy
5. VM disk / size
6. ACI / Container Apps provisioning
7. Azure Monitor metrics
8. Backup policy / restore
9. SSPR実設定
10. Storage account / Files / Blob container基本構成

追加問題は既存の類題コピーではなく、「正答判断の軸が異なる」問題にする。

---
Official source:
https://learn.microsoft.com/ja-jp/credentials/certifications/resources/study-guides/az-104
