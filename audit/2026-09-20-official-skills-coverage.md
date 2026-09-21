> **2026-09-21 追補:** この監査は290問時点の履歴として保持しています。その後、問題学習だけで進める前提の独立再監査で28項目の深さ不足を検出し、cov-q091〜cov-q145の55問を追加しました。現行の最終評価は [2026-09-21-post-gap-345-audit.md](./2026-09-21-post-gap-345-audit.md) を参照してください。

# AZ-104 公式スキル範囲カバレッジ

基準: Microsoft Learn「試験 AZ-104 の学習ガイド: Microsoft Azure Administrator」2026年4月17日現在のスキル。

監査日: 2026-09-20

## 結論
既存の過去問100問 + 類似問題100問に、公式学習ガイドで薄かった領域を狙った **公式範囲補強90問** を追加した。  
下表の公式スキル項目は、すべて少なくとも1問以上の対応問題を持つ。

| 領域 | 公式スキル項目 | 主な対応問題 | 状態 |
|---|---|---|---|
| ID/ガバナンス | ユーザーとグループを作成する | cov-q001, cov-q002 | 補強済 |
| ID/ガバナンス | ユーザーとグループのプロパティを管理する | cov-q002, s1-q026 | 補強済 |
| ID/ガバナンス | Microsoft Entra ID でライセンスを管理する | s1-q026, s1-q027 | 既存 |
| ID/ガバナンス | 外部ユーザーを管理する | s1-q024, s1-q025, s2-q017 | 既存 |
| ID/ガバナンス | SSPR を構成する | s2-q018, s2-q019 | 既存 |
| ID/ガバナンス | 組み込み Azure ロールを管理する | s1-q029, s1-q030, s1-q031 | 既存 |
| ID/ガバナンス | 異なるスコープでロールを割り当てる | s1-q034, s2-q026, cov-q006 | 補強済 |
| ID/ガバナンス | アクセス割り当てを理解する | s1-q028, sim-q072 | 既存 |
| ID/ガバナンス | Azure Policy を実装して管理する | cov-q003, cov-q004, cov-q005, cov-q078 | 深掘り補強済 |
| ID/ガバナンス | リソース ロックを構成する | s1-q033, s2-q027, sim-q077 | 既存 |
| ID/ガバナンス | タグを適用・管理する | s1-q034, s2-q026, sim-q076 | 既存 |
| ID/ガバナンス | リソース グループを管理する | cov-q007, s2-q027 | 補強済 |
| ID/ガバナンス | サブスクリプションを管理する | cov-q003, cov-q006, s1-q032 | 補強済 |
| ID/ガバナンス | アラート、予算、Advisor でコストを管理する | s1-q031, s1-q032, s2-q025, cov-q080 | 深掘り補強済 |
| ID/ガバナンス | 管理グループを構成する | cov-q006, cov-q079 | 深掘り補強済 |
| Storage | Storage firewall / VNet を構成する | cov-q008, cov-q009, cov-q076 | 深掘り補強済 |
| Storage | SAS を作成・使用する | s1-q035, sim-q035, cov-q072 | 深掘り補強済 |
| Storage | Stored access policy を構成する | cov-q010, cov-q073 | 深掘り補強済 |
| Storage | アクセス キーを管理する | cov-q011, cov-q074, s1-q030 | 深掘り補強済 |
| Storage | Azure Files の ID ベース アクセス | s1-q036, sim-q036 | 既存 |
| Storage | ストレージ アカウントを作成・構成する | cov-q020, s1-q037 | 補強済 |
| Storage | 冗長性を構成する | s1-q038, s2-q003 | 既存 |
| Storage | Object Replication を構成する | s1-q039, s1-q040, s2-q004 | 既存 |
| Storage | ストレージ暗号化を構成する | cov-q012, cov-q075 | 深掘り補強済 |
| Storage | Storage Explorer / AzCopy でデータ管理 | cov-q013, cov-q014, cov-q077 | 深掘り補強済 |
| Storage | Azure Files の file share を作成・構成 | s1-q036, cov-q015 | 補強済 |
| Storage | Blob container を作成・構成 | s1-q035, s1-q041 | 既存 |
| Storage | Storage tier を構成する | s1-q042, s1-q043, s2-q009 | 既存 |
| Storage | Blob / container soft delete | cov-q017, s1-q039 | 補強済 |
| Storage | Azure Files snapshot / soft delete | cov-q015, cov-q016 | 補強済 |
| Storage | Blob lifecycle management | cov-q018, s2-q007 | 補強済 |
| Storage | Blob versioning | cov-q019, s1-q040 | 補強済 |
| Compute | ARM/Bicep を解釈する | s1-q014, cov-q021, cov-q022 | 補強済 |
| Compute | 既存 ARM template を変更する | s1-q014, s2-q031 | 既存 |
| Compute | 既存 Bicep を変更する | cov-q021, cov-q022, cov-q051, cov-q052, cov-q053, cov-q054 | 深掘り補強済 |
| Compute | ARM/Bicep でデプロイする | s1-q012, cov-q024 | 補強済 |
| Compute | ARM export / Bicep 変換 | s1-q011, cov-q023 | 補強済 |
| Compute | VM を作成する | s1-q011, s1-q012 | 既存 |
| Compute | VM Encryption at host | cov-q025 | 補強済 |
| Compute | VM を RG / subscription / region へ移動 | cov-q026, cov-q027, cov-q007 | 補強済 |
| Compute | VM サイズを管理する | cov-q028 | 補強済 |
| Compute | VM disk を管理する | s1-q015, sim-q082 | 既存 |
| Compute | Availability Zone / Set | cov-q029, cov-q030 | 補強済 |
| Compute | VM Scale Sets | cov-q031, cov-q032, cov-q055, cov-q056 | 深掘り補強済 |
| Compute | Azure Container Registry | cov-q033, cov-q034, cov-q057, cov-q058 | 深掘り補強済 |
| Compute | ACI をプロビジョニング | s1-q016, sim-q084 | 既存 |
| Compute | Container Apps をプロビジョニング | s1-q017, s1-q018 | 既存 |
| Compute | コンテナーのサイズ/スケーリング | s1-q017, sim-q090 | 既存 |
| App Service | App Service plan をプロビジョニング | s1-q022, s2-q039 | 既存 |
| App Service | App Service plan scaling | s1-q021, sim-q088 | 既存 |
| App Service | App Service を作成 | s1-q022, sim-q085 | 既存 |
| App Service | 証明書 / TLS | s1-q019, cov-q059, cov-q060, cov-q061 | 深掘り補強済 |
| App Service | Custom DNS mapping | s1-q023 | 既存 |
| App Service | Backup | cov-q038, cov-q065 | 深掘り補強済 |
| App Service | Networking | cov-q036, cov-q037, cov-q063, cov-q064 | 深掘り補強済 |
| App Service | Deployment slots | cov-q035, cov-q062 | 深掘り補強済 |
| Networking | VNet / Subnet を作成・構成 | s2-q044, sim-q093 | 既存 |
| Networking | VNet peering | s2-q049, cov-q042, cov-q067, sim-q099 | 深掘り補強済 |
| Networking | Public IP | s1-q001, cov-q066 | 深掘り補強済 |
| Networking | UDR | s2-q041, sim-q091, cov-q068 | 深掘り補強済 |
| Networking | 接続トラブルシューティング | s1-q045, sim-q060 | 既存 |
| Networking | NSG / ASG | s2-q044, sim-q094, sim-q097, cov-q071 | 深掘り補強済 |
| Networking | Effective security rules | cov-q041 | 補強済 |
| Networking | Azure Bastion | s1-q003, sim-q095 | 既存 |
| Networking | PaaS service endpoint | cov-q039, cov-q009 | 補強済 |
| Networking | PaaS private endpoint | cov-q040, cov-q037, cov-q070 | 深掘り補強済 |
| Networking | Azure DNS | s1-q005, s1-q006, s1-q007 | 既存 |
| Networking | Internal/Public Load Balancer | s1-q008, s1-q009, s2-q048, cov-q069 | 深掘り補強済 |
| Networking | Load Balancer troubleshooting | s1-q010, sim-q100 | 既存 |
| Monitor | Azure Monitor metrics を解釈 | s1-q021, s1-q044, cov-q084 | 深掘り補強済 |
| Monitor | Azure Monitor log settings | s2-q012, sim-q062, cov-q081 | 深掘り補強済 |
| Monitor | KQL query / analysis | s1-q047, cov-q085, cov-q086 | 深掘り補強済 |
| Monitor | Alert rule / Action Group / Alert Processing Rule | s2-q011, sim-q061, cov-q044 | 補強済 |
| Monitor | Azure Monitor Insights | cov-q045, cov-q082, cov-q083 | 深掘り補強済 |
| Monitor | Network Watcher / Connection Monitor | s1-q045, cov-q046 | 補強済 |
| Backup/DR | Recovery Services vault | s2-q013, s2-q016, cov-q089 | 深掘り補強済 |
| Backup/DR | Backup vault | cov-q047 | 補強済 |
| Backup/DR | Backup policy | s1-q050, s2-q015 | 既存 |
| Backup/DR | Backup / Restore operation | cov-q048, s1-q049 | 補強済 |
| Backup/DR | Site Recovery を構成 | cov-q043 | 補強済 |
| Backup/DR | Secondary region failover | cov-q049, cov-q087, cov-q088 | 深掘り補強済 |
| Backup/DR | Backup reports / alerts | cov-q050, cov-q090 | 深掘り補強済 |

## 公式範囲補強90問の内訳
- ID / Governance: cov-q001 ～ cov-q007
- Storage: cov-q008 ～ cov-q020
- Bicep / VM / VMSS / ACR / App Service: cov-q021 ～ cov-q038
- Networking: cov-q039 ～ cov-q042
- Site Recovery / Monitor / Backup: cov-q043 ～ cov-q050
- 深さ監査追加: cov-q051 ～ cov-q090
  - Bicep / VMSS / ACR: cov-q051 ～ cov-q058
  - App Service: cov-q059 ～ cov-q065
  - Networking: cov-q066 ～ cov-q071
  - Storage / Governance: cov-q072 ～ cov-q080
  - Monitoring / Backup / DR: cov-q081 ～ cov-q090

## 注意
「1項目につき1問ある」ことと「本番のあらゆる聞かれ方を完全に再現する」ことは同義ではない。  
このマトリクスは **公式スキル項目の欠落をなくすための coverage map** であり、過去問・類似問題・補強問題を合わせて反復し、Microsoft Learn とハンズオンを併用する前提とする。


## 深さ監査の結果
初回50問追加後に、「各公式スキルに1問あるか」ではなく「そのスキルを異なる条件・設定値・運用手順でも判断できるか」で再監査した。  
特に薄かった Bicep、App Service TLS、Azure Monitor Insights、Site Recovery の本番フェールオーバー手順を中心に40問を追加した。

追加40問は、すべて:
- 正答インデックスを明示
- 全選択肢に個別解説
- Microsoft Learn 公式リンクを付与
- 2026-09-20 時点の現行ドキュメント内容と整合するよう作成
