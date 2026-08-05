# 地図・経路API 候補比較（ナレッジ）

MobileWash（出張洗車マッチング）で使う **地図表示・経路案内・位置情報** 系APIの候補と選定メモ。
将来の乗り換え・コスト最適化検討時の判断材料として残す。

> 料金・無料枠は **2026-07 時点の調査値**。各社とも改定が多いので、契約・見積もり前に必ず公式で再確認すること（特にGoogleは2025年3月に体系変更あり）。

---

## 1. 現状（as-is）

| 用途 | 実装 | ファイル | 課金 |
|---|---|---|---|
| 地図表示 | `react-native-maps` + `PROVIDER_GOOGLE`（ネイティブのみ、Webはshimでプレースホルダ） | `mobile/shims/react-native-maps.tsx` | **無料**（モバイルネイティブSDKの地図表示は無制限無料） |
| 経路案内 | Google **Directions API**（Supabase Edge Functionでプロキシ、キーはサーバ側） | `mobile/supabase/functions/get-directions/index.ts`、`mobile/lib/location.ts` の `fetchRoute` | **従量課金**（唯一の課金ポイント） |
| 現在地・GPS追跡 | `expo-location`（端末GPS） | `mobile/lib/location.ts` | 無料（地図API非依存） |
| プロ位置のリアルタイム配信 | Supabase Realtime（`postgres_changes`） | `mobile/lib/location.ts` の `subscribeToProLocation` | 無料（地図API非依存） |
| フォールバック経路 | Edge Function不通時は直線補間 `buildFallbackRoute` | `mobile/lib/location.ts` | 無料 |

**要点**: コストが出るのは経路APIだけ。地図表示・追跡はどのベンダーでも実質無料枠で足りる。
→ 乗り換え検討の主対象は **経路（Directions/Routing）API**。

---

## 2. 評価軸

- **日本カバレッジ**: 国内の道路・規制・住所精度。
- **RN対応**: React Native / Expo での地図表示SDKの成熟度。
- **経路品質**: 車ルートの正確さ、渋滞考慮、日本語対応。
- **料金 / 無料枠**: 月次無料枠と超過単価。
- **セルフホスト可否**: ベンダーロックイン回避・コスト固定化。
- **移行コスト**: 現状Edge Function 1ファイル（`get-directions`）が呼び出し口なので、経路APIの差し替え自体は影響範囲が小さい。

---

## 3. 候補 — 地図表示SDK

| SDK | 日本カバレッジ | RN対応 | 料金感 | 備考 |
|---|---|---|---|---|
| **Google Maps SDK**（現状 / react-native-maps） | ◎ | ◎ 実績豊富 | モバイルネイティブ表示は**無制限無料** | 現状維持がコスト的に最有力 |
| **Mapbox**（`@rnmapbox/maps`） | ○（OSMベース、都市部良好） | ◎ | Maps SDK for Mobileに無料枠あり（MAU課金） | 地図デザイン自由度が高い。ナビUIも用意 |
| **MapLibre GL Native**（`@maplibre/maplibre-react-native`） | タイル提供元次第 | ○ | **SDK自体は無料/OSS**（タイル代のみ） | ベンダー非依存。タイルは国産provider等と組み合わせ |
| **Apple MapKit** | ◎（国内精度高い） | △ iOS限定 | 無料 | iOSのみ。Android併用アプリでは主軸にしにくい |

> 地図表示はどれも「実質無料」の範囲。**表示だけを理由に乗り換える必要性は低い**。

---

## 4. 候補 — 経路 / ルーティングAPI（本命）

### 4-1. 商用クラウドAPI

| API | 日本カバレッジ | 無料枠(月) | 超過単価(目安) | 渋滞考慮 | 備考 |
|---|---|---|---|---|---|
| **Google Directions API（現状／Legacy）** | ◎ | 10,000回 | 約$5 / 1,000 | ○ | 2025改定で"Legacy"化。新規はRoutes API推奨 |
| **Google Routes API（後継）** | ◎ | 10,000回(Essentials) | 約$5 / 1,000〜（機能で変動） | ◎ | Directionsの後継。渋滞・高度機能。移行推奨先 |
| **Mapbox Directions API** | ○ | **100,000回** | 従量（ボリューム割引あり） | ○ | 無料枠が大きい。ナビSDKセッション内リクエストは無料 |
| **HERE Routing API** | ○ | **30,000回**（Base） | **約$0.75 / 1,000** | ○ | 単価が最安クラス。コスト最適化の第一候補 |

### 4-2. オープンソース / セルフホスト（インフラ代のみ）

| エンジン | ベース | 特徴 | 運用 |
|---|---|---|---|
| **OSRM** | OSM | 超高速。距離行列(Matrix)が強い | Docker自前運用。渋滞なし |
| **Valhalla** | OSM | 車/自転車/徒歩、Matrix・isochrone・ターンバイターン対応。公開デモ鯖あり | 自前 or FOSSGIS公開鯖 |
| **OpenRouteService (ORS)** | OSM/GraphHopper | API/各種言語ライブラリが充実。ホスト版は無料枠あり | ホスト版 or 自前 |
| **GraphHopper** | OSM | 車ルート実用的。ホスト版(有料枠)＋OSS版 | ホスト版 or 自前 |

> セルフホストは **コスト固定＆データ所有** が利点。難点は日本の**渋滞情報・住所精度**がOSM品質依存になる点と運用負荷。

### 4-3. 日本特化ベンダー

| サービス | 強み | 料金 | 備考 |
|---|---|---|---|
| **NAVITIME API** | 国内ルート/乗換/スポット。車・自転車・徒歩・公共交通を網羅 | 商用従量（要見積） | 国内経路品質は最強クラス。出張系と相性良い |
| **ZENRIN Maps API（ゼンリンデータコム）** | 国内道路・規制情報の精度が高い。複数目的地の最適巡回も可 | 従量課金（付加コンテンツ別料金） | 高品質だがコストは高め。BtoB向け |
| **Yahoo!（YOLP系）** | 国内・乗換に強い。無料枠 | Yahoo! Developer無料枠内 | 商用利用条件・提供状況は要確認 |
| **Geolonia / MIERUNE** | 国産のMapLibre系ベクトルタイル | 要確認 | 主に「表示」用途。経路は別エンジン併用が前提 |

---

## 5. ざっくり選定メモ

- **今すぐの結論**: 現状のGoogle構成のままでコスト問題はほぼ無し（表示無料＋経路は月1万回まで無料）。急いで乗り換える理由はない。
- **短期の宿題**: Google **Directions → Routes API** への移行（Legacy化対応）。呼び出し口は `get-directions/index.ts` 1ファイルなので低コストで対応可。
- **コストが跳ねてきたら**（経路が月1万回を大きく超える規模）:
  1. **HERE Routing**（単価最安・無料枠3万）へ寄せる、または
  2. **Mapbox Directions**（無料枠10万）でバッファを稼ぐ、
  3. 規模が読めて運用体制があるなら **Valhalla/OSRM セルフホスト** で単価ゼロ化。
- **国内ルート品質を最優先する局面**（配車ETAの精度が事業KPIになる等）: **NAVITIME API** を評価。
- **地図表示**: 当面Google（react-native-maps）維持でOK。デザイン刷新や脱ロックインが必要になったら MapLibre + 国産タイルを検討。

### 意思決定の早見表

| 重視点 | 推し |
|---|---|
| 現状維持・工数最小 | Google（Directions→Routes移行のみ） |
| 経路の単価を下げたい | HERE Routing |
| 無料枠の余裕がほしい | Mapbox Directions |
| コスト固定・ロックイン回避 | Valhalla / OSRM（セルフホスト） |
| 国内ルート品質最優先 | NAVITIME API |

---

## 6. 商用経路API 3社の詳細

現状のGoogleと、有力な代替である Mapbox / HERE を深掘り。
（MobileWashの経路利用は「配車追跡中に車ルートを1本取得」する程度で、渋滞考慮は必須ではない前提）

### 6-1. Google（Directions API / Routes API）

| 項目 | 内容 |
|---|---|
| 位置づけ | **Directions API は Legacy 化**（2025改定）。新規は後継の **Routes API** 推奨 |
| 無料枠 | Essentials 10,000回/月、Pro 5,000回/月（SKUごと） |
| 単価 | **Compute Routes Essentials: $5 / 1,000**（基本の車ルート）／ **Pro: $10 / 1,000**（`TRAFFIC_AWARE` 等の渋滞考慮を使うと約2倍） |
| 課金単位 | 1リクエスト＝1課金。waypoint多数や高度機能でPro扱いに昇格 |
| 日本カバレッジ | ◎（道路・規制・住所とも国内最高クラス）、日本語 ◎ |
| 地図表示 | ネイティブSDK表示は**無制限無料**（別課金なし）。表示を移さない限りタダ |
| 移行コスト | レスポンス形式が変わる（`encodedPolyline` はフィールドマスクで取得、既存 `decodePolyline` はほぼ流用可）。呼び出し口は `get-directions/index.ts` の1ファイルのみ |
| 向き | 現状維持・国内品質・渋滞ETA重視。ただし単価は3社で最も高い |

### 6-2. Mapbox（Directions API）

| 項目 | 内容 |
|---|---|
| 無料枠 | **100,000回/月**（3社で最大） |
| 単価 | 100,001–500,000: **$2.00 / 1,000** ／ 500,001–1,000,000: $1.60 / 1,000（ボリューム割引） |
| 課金単位 | 1リクエスト＝1課金（複数waypointを含めても1）。Navigation SDK利用時はセッション内リクエスト無料（100 MAU + 1,000 trips 無料） |
| 日本カバレッジ | ○（OSMベース。都市部は良好だが、細街路の規制情報はGoogle/HEREより弱め）、日本語 ○ |
| 地図表示 | 同ベンダーの `@rnmapbox/maps` で表示も統一可。デザイン自由度が高い |
| 移行コスト | レスポンスは GeoJSON or encoded polyline を選択可。Edge Function差し替えで対応 |
| 向き | 無料枠を厚く取りたい／地図デザインも刷新したい場合。中規模まで実質無料で回せる |

### 6-3. HERE（Routing API）

| 項目 | 内容 |
|---|---|
| 無料枠 | **30,000トランザクション/月**（Basic Routing: 車・自転車・徒歩） |
| 単価 | **$0.75 / 1,000**（3社で**最安**）。一定量超で約20%のボリューム割引 |
| 渋滞考慮 | Advanced Traffic は無料2,500/月、超過 **$5 / 1,000**（渋滞を使うと一気に高くなる点に注意） |
| 日本カバレッジ | ○〜◎（車載ナビ由来で自動車道路・規制データに定評）、日本語 ○ |
| 地図表示 | 表示SDKはあるが **React Native公式サポートが薄い**。表示はGoogle/MapLibre併用が現実的 |
| 移行コスト | Edge Functionの差し替えのみ。ただし表示ベンダーは別立てになりやすい |
| 向き | 経路の**単価を最優先で下げたい**／渋滞考慮は使わない用途に最適 |

### 6-4. コスト・シミュレーション（車ルート・渋滞考慮なし）

月あたりの経路リクエスト数別の概算（ボリューム割引・無料枠適用後、渋滞なしの素の車ルート）:

| 月間リクエスト | Google (Essentials $5/1k) | Mapbox ($2/1k, 10万無料) | HERE ($0.75/1k, 3万無料) |
|---|---|---|---|
| 10,000 | **$0**（無料枠内） | **$0** | **$0** |
| 50,000 | 約 **$200** | **$0** | 約 **$15** |
| 100,000 | 約 **$450** | **$0** | 約 **$53** |
| 300,000 | 約 **$1,450** | 約 **$400** | 約 **$203** |

> 傾向: **〜10万/月なら Mapbox が実質無料で最強**。それ以上の規模では **HERE が単価最安で頭打ちしにくい**。Google は国内品質・渋滞ETA・表示無料が武器だが素の単価は最も高い。

### 6-5. MobileWashでの当てはめ

- 経路取得は「配車追跡中に1本」程度 → **現状規模ではどれを選んでも無料枠内**。コスト理由だけの緊急移行は不要。
- 追跡ユーザーが増えて **月1万回を超え始めたら**、まず **Mapbox（10万無料）** に寄せるのが手離れ良い。さらに規模が出たら **HERE（単価最安）**。
- **渋滞を考慮したETA**を売りにするなら Google Routes Pro か HERE Advanced Traffic（どちらも単価上がるので費用対効果を要検証）。
- 地図表示は当面Google（`react-native-maps`）維持でOK。HEREに寄せる場合は表示を別ベンダーにする前提で設計する。

---

## 7. データ主権・自社にデータを貯める観点

「自社にデータを貯めたい」は2種類に分けて考える。

- **自社が集めたデータ**（GPS位置ログ・予約・走行実績など）: **どのプロバイダを使っても自社のもの**。現状も `pro_profiles.latitude/longitude` 等でSupabaseに蓄積済み。制約なし。
- **プロバイダの地図/経路コンテンツ**（算出したルート・ETA・地図タイル）: ここは各社ToSでキャッシュ・保存が制限される。「貯められるか」はこれで決まる。

### 保存・自社ホストの可否

| 選択肢 | ルート結果を自社DBに保存 | 地図データを自社ホスト | データ主権 | 備考 |
|---|---|---|---|---|
| **セルフホストOSS**（OSRM / Valhalla / ORS + OSM） | ◎ 自由 | ◎（MapLibre + 自前タイル） | ◎ 完全 | OSM=ODbLライセンス、クレジット表示必須。運用は自前 |
| **Mapbox** | △ 標準は制限、オンプレ版 **Atlas** なら可 | ○（Atlas / 自前タイル） | ○（Atlas契約時） | Geocodingは "Permanent" プランで保存可 |
| **HERE** | △〜○ エンタープライズ/商用ライセンス次第 | ○（オンプレ提供あり） | ○（要ライセンス） | 商用契約で柔軟性は高め、要個別確認 |
| **Google** | ✕ ToSで厳格制限（lat/lng 最大30日・place ID 無期限のみ、経路のバルク保存は禁止） | ✕（ネイティブSDK表示のみ） | ✕ | 「貯める」用途には最も不向き |

### 結論

- **「経路・地図データを自社に蓄積したい」が主目的なら → セルフホストOSS（OSRM / Valhalla / OpenRouteService）が本命**。エンジン・地図・算出結果すべてを自社インフラに置け、ルート/ETA履歴を自由に蓄積・分析できる（ML・需要予測の素材化も可能）。
- 商用の品質を保ちつつオンプレ寄せたいなら **Mapbox Atlas** か **HERE エンタープライズ**。
- **Google はキャッシュ・保存禁止が厳しく、この用途には向かない**（表示無料・国内品質は強いが、データを"貯める"設計とは相性が悪い）。
- なお **GPS位置ログ・予約・走行実績などの自社データは、どの表示/経路プロバイダを選んでもSupabaseに蓄積可能**（プロバイダ選定とは独立の論点）。

---

## 8. 参考リンク

- [Google Maps Platform 料金概要](https://developers.google.com/maps/billing-and-pricing/overview) / [無料枠(製品ごと最大1万回/月)](https://mapsplatform.google.com/resources/blog/start-building-today-with-up-to-10-000-monthly-free-calls-per-product/) / [Routes API 課金](https://developers.google.com/maps/documentation/routes/usage-and-billing)
- [Mapbox Pricing](https://www.mapbox.com/pricing) / [Directions API Docs](https://docs.mapbox.com/api/navigation/directions/) / [Navigation SDK Pricing](https://docs.mapbox.com/ios/navigation/guides/pricing/)
- [HERE Pricing](https://www.here.com/get-started/pricing) / [HERE Routing](https://www.here.com/platform/routing)
- [Valhalla (OSS)](https://github.com/valhalla/valhalla) / [OSRM](https://wiki.openstreetmap.org/wiki/Open_Source_Routing_Machine) / [OpenRouteService](https://openrouteservice.org/)
- [NAVITIME API](https://api-sdk.navitime.co.jp/api/) / [ZENRIN Maps API](https://www.zenrin-datacom.net/solution/zenrin-maps-api)
- ToS（キャッシュ・保存）: [Google Maps Service Terms](https://cloud.google.com/maps-platform/terms/maps-service-terms) / [Mapbox API Caching](https://docs.mapbox.com/help/dive-deeper/api-caching/) / [Mapbox Atlas（オンプレ）](https://www.mapbox.com/atlas) / [OSM ODbL](https://www.openstreetmap.org/copyright)
