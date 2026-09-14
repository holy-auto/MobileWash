export interface NewsItem {
  id: string;
  date: string;
  category: 'お知らせ' | 'プレスリリース' | 'メディア' | '採用';
  title: string;
  description: string;
  imageUrl?: string;
  url?: string;
}

/**
 * お知らせ。
 *
 * 出典はコーポレートサイト（holy-inc.jp）の沿革・お知らせ。
 * 裏が取れていない実績（メディア掲載・資金調達・登録者数・達成率など）は載せない。
 */
export const newsItems: NewsItem[] = [
  {
    id: 'news-2026-08',
    date: '2026年8月',
    category: 'お知らせ',
    title: '「つくば子育て＆教育サミット2026」のメインスポンサーに就任しました',
    description:
      '運営会社である株式会社HOLYが、「つくば子育て＆教育サミット2026」のメインスポンサーに就任しました。',
  },
  {
    id: 'news-2025-10',
    date: '2025年10月',
    category: 'お知らせ',
    title: '出張洗車「MobileWash」サービスの準備を開始しました',
    description:
      '株式会社HOLYの3つ目の事業として、出張洗車・出張コーティングサービス「MobileWash」の立ち上げ準備を開始しました。',
  },
  {
    id: 'news-2024-11',
    date: '2024年11月',
    category: 'プレスリリース',
    title: '株式会社HOLYを設立しました',
    description:
      'MobileWash の運営会社である株式会社HOLYを設立しました。会社概要はコーポレートサイトをご覧ください。',
  },
];
