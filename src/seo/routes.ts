/**
 * ルートごとの SEO メタ情報（単一定義源）。
 *
 * ここが唯一の出典で、次の3つがすべてこれを読む:
 * - `scripts/prerender.mjs` — ルート別の静的HTML生成
 * - `scripts/prerender.mjs` — sitemap.xml の生成
 * - `scripts/check-seo.mjs` — 各ページの実装との突き合わせ
 *
 * ## なぜ要るか
 *
 * このサイトは CSR の SPA で、vercel.json の rewrite により全URLが同じ
 * index.html を返している。Googlebot は JS を実行するので各ページを読めるが、
 * 生成AI・AI検索のクローラー（GPTBot / ClaudeBot / PerplexityBot 等）の多くは
 * JS を実行しない。AI から見ると12ルートすべてが同じ1ページだった。
 *
 * ## 既知の負債
 *
 * 各ページは今も useEffect の中で document.title を直書きしている。
 * 本来はここから読むべきだが、12ファイルの書き換えは別PRに分ける。
 * それまでのあいだ、ズレは `npm run check:seo` が落として知らせる。
 * ponytail: 上限。突き合わせは文字列比較なので、title の組み立て方を
 * 変数化すると検査が効かなくなる。そのときは検査ごと作り直す。
 */

export type RouteSeo = {
  /** ルート。AnimatedRoutes.tsx の path と一致させる（check:seo が突き合わせる）。 */
  path: string;
  title: string;
  description: string;
  /** 静的HTMLに出す見出し。クローラーが最初に読む行。 */
  h1: string;
  /** 静的HTMLに出す本文。事実として書けることだけを書く。 */
  lead: string[];
  changefreq: "weekly" | "monthly" | "yearly";
  priority: string;
};

const SITE = "MobileWash";

export const ROUTES: RouteSeo[] = [
  {
    path: "/",
    title: `${SITE} | 出張洗車・出張コーティングアプリ 全国47都道府県対応`,
    description:
      "MobileWashは出張洗車・出張コーティングのプロをスマホひとつで呼べるカーディテイリングアプリ。GPSで近くの認定プロを自動マッチング、最短5分でご自宅・マンション駐車場へ出張。手洗い洗車¥3,980〜、ガラスコーティング¥29,800〜。2026年Q3ローンチ予定、先行登録で¥1,500 OFFクーポン進呈。",
    h1: "出張洗車・出張コーティングの MobileWash",
    lead: [
      "店舗に車を持ち込むのではなく、ご自宅や職場の駐車場にプロが出向いて施工します。",
      "手洗い洗車・内装クリーニング・ポリッシュ磨き・ガラスコーティング・フルディテイリング・エンジンルーム洗浄に対応。都度払いと月額プランから選べます。",
      "2026年Q3の正式ローンチに向けて準備中です。運営は株式会社HOLY。",
    ],
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    path: "/corporate",
    title: `${SITE} 法人プラン | 社用車・フリート向け出張洗車・コーティング 請求書払・複数台割引`,
    description:
      "MobileWash法人プランは社用車・フリート向けの出張洗車・出張コーティングサービス。請求書払・複数台割引（最大30% OFF）・専任担当者対応・全国対応。スタンダード・プレミアム・エンタープライズの3プラン。無料相談・資料請求はお気軽に。法人プラン資料（PDF）無料送付。",
    h1: "法人・フリート向けプラン",
    lead: [
      "社用車・フリート車両の管理向けに、請求書払い・複数台割引・専任担当者対応をまとめた法人プランです。",
      "スタンダード／プレミアム／エンタープライズの3プランをご用意しています。無料相談・資料請求を受け付けています。",
    ],
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    path: "/company/about",
    title: `会社概要 | ${SITE}`,
    description:
      "株式会社HOLYの会社概要。ミッション・ビジョン・バリュー、沿革、役員情報、事業内容。出張洗車・出張コーティングサービスを運営するMobileWashの企業情報ページです。",
    h1: "会社概要",
    lead: [
      "MobileWash を運営する株式会社HOLY の会社概要です。",
      "設立は2024年11月12日、所在地は東京都港区北青山1-3-1 アールキューブ青山3F、代表取締役は堀越友輔。",
      "ミッション・ビジョン・バリュー、沿革、役員情報、事業内容を掲載しています。",
    ],
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/company/news",
    title: `ニュース | ${SITE}`,
    description:
      "MobileWash のお知らせ一覧。サービスの準備状況、運営会社である株式会社HOLYに関する発表を掲載しています。",
    h1: "ニュース",
    lead: ["MobileWash と運営会社 株式会社HOLY に関するお知らせを掲載しています。"],
    changefreq: "weekly",
    priority: "0.7",
  },
  {
    path: "/company/press",
    title: `プレスリリース | ${SITE}`,
    description:
      "株式会社HOLYのプレスリリース一覧。出張洗車・出張コーティングサービス MobileWash に関する公式発表を掲載しています。",
    h1: "プレスリリース",
    lead: [
      "株式会社HOLY の公式発表を掲載しています。",
      "取材・掲載に関するお問い合わせは info@holy-inc.jp までご連絡ください。",
    ],
    changefreq: "weekly",
    priority: "0.7",
  },
  {
    path: "/company/recruit",
    title: `採用情報 | ${SITE}`,
    description:
      "株式会社HOLYの採用情報。エンジニア・マーケティングの採用ポジション、会社の文化、福利厚生。出張洗車・出張コーティングのスタートアップで新しいカーケア体験を一緒に創りませんか。",
    h1: "採用情報",
    lead: [
      "株式会社HOLY の採用情報です。募集職種、働き方、選考の流れを掲載しています。",
      "ご応募・お問い合わせは info@holy-inc.jp まで。",
    ],
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/company/brand",
    title: `ブランド素材 | ${SITE}`,
    description:
      "MobileWashのブランド素材・ガイドラインページ。ロゴデータ、カラーパレット、フォント情報、キービジュアル素材のダウンロード。プレス・メディア関係者向けブランドアセット。",
    h1: "ブランド素材",
    lead: [
      "プレス・メディア関係者向けに、ロゴデータ・カラーパレット・フォント情報・キービジュアル素材を提供しています。",
      "掲載前に広報担当（info@holy-inc.jp）までご連絡ください。",
    ],
    changefreq: "monthly",
    priority: "0.5",
  },
  {
    path: "/sitemap",
    title: `サイトマップ | ${SITE}`,
    description:
      "MobileWashウェブサイトのサイトマップ。ホーム、法人プラン、サービス、料金プラン、サポート・ガイド、法務・ポリシーページの全ページ一覧です。",
    h1: "サイトマップ",
    lead: ["MobileWash のサイト内の全ページ一覧です。"],
    changefreq: "monthly",
    priority: "0.3",
  },
  {
    path: "/legal/terms",
    title: `利用規約 | ${SITE}`,
    description:
      "MobileWashの利用規約。会員登録、アカウント管理、予約・キャンセル、料金支払い、禁止事項、免責事項、知的財産権、準拠法等について定めています。",
    h1: "利用規約",
    lead: ["MobileWash の利用条件を定めた規約です。事業者は株式会社HOLY。"],
    changefreq: "yearly",
    priority: "0.3",
  },
  {
    path: "/legal/privacy",
    title: `プライバシーポリシー | ${SITE}`,
    description:
      "MobileWashのプライバシーポリシー。個人情報の取り扱い、利用目的、第三者提供、安全管理措置、Cookie・位置情報の取り扱いについて。個人情報保護に関するお問い合わせ窓口も記載しています。",
    h1: "プライバシーポリシー",
    lead: ["個人情報の取り扱いについて定めた方針です。事業者は株式会社HOLY。"],
    changefreq: "yearly",
    priority: "0.3",
  },
  {
    path: "/legal/consumer-law",
    title: `特定商取引法に基づく表記 | ${SITE}`,
    description:
      "MobileWashの特定商取引法に基づく表記。事業者情報、販売価格、支払い方法・時期、サービス提供時期、キャンセルポリシー、動作環境等の取引条件を明示しています。",
    h1: "特定商取引法に基づく表記",
    lead: ["特定商取引に関する法律に基づく表記です。販売事業者は株式会社HOLY。"],
    changefreq: "yearly",
    priority: "0.3",
  },
  {
    path: "/legal/security",
    title: `情報セキュリティ方針 | ${SITE}`,
    description:
      "MobileWashの情報セキュリティ方針。情報セキュリティ管理組織、リスク管理体制、技術的・人的・物理的安全管理措置、インシデント対応、コンプライアンスについて。",
    h1: "情報セキュリティ方針",
    lead: ["情報資産の保護について定めた方針です。事業者は株式会社HOLY。"],
    changefreq: "yearly",
    priority: "0.3",
  },
];
