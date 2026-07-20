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

## 6. 参考リンク

- [Google Maps Platform 料金概要](https://developers.google.com/maps/billing-and-pricing/overview) / [無料枠(製品ごと最大1万回/月)](https://mapsplatform.google.com/resources/blog/start-building-today-with-up-to-10-000-monthly-free-calls-per-product/)
- [Mapbox Pricing](https://www.mapbox.com/pricing) / [Navigation SDK Pricing](https://docs.mapbox.com/ios/navigation/guides/pricing/)
- [HERE Pricing](https://www.here.com/get-started/pricing)
- [Valhalla (OSS)](https://github.com/valhalla/valhalla) / [OSRM](https://wiki.openstreetmap.org/wiki/Open_Source_Routing_Machine) / [OpenRouteService](https://openrouteservice.org/)
- [NAVITIME API](https://api-sdk.navitime.co.jp/api/) / [ZENRIN Maps API](https://www.zenrin-datacom.net/solution/zenrin-maps-api)
