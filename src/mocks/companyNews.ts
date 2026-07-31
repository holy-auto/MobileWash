export interface NewsItem {
  id: string;
  date: string;
  category: 'お知らせ' | 'プレスリリース' | 'メディア' | '採用';
  title: string;
  description: string;
  imageUrl?: string;
  url?: string;
}

export const newsItems: NewsItem[] = [
  {
    id: 'news-2026-06-01',
    date: '2026年6月1日',
    category: 'お知らせ',
    title: 'CAMPFIREにてクラウドファンディングを開始しました',
    description: '目標金額300万円に対し、開始3日で達成率120%を突破。全国から1,000名以上の方にご支援いただいています。リターンには限定価格での洗車チケットや永久割引特典などをご用意。ぜひプロジェクトページをご覧ください。',
    imageUrl: 'https://readdy.ai/api/search-image?query=Japanese%20crowdfunding%20campaign%20launch%20celebration%20with%20car%20detailing%20theme%2C%20clean%20modern%20design%2C%20warm%20lighting%2C%20professional%20photography%2C%20success%20milestone%20visual%2C%20white%20and%20teal%20color%20palette%2C%20achievement%20and%20community%20support%20atmosphere%2C%20minimalist%20Japanese%20aesthetic&width=800&height=450&seq=news-campfire-2026&orientation=landscape',
  },
  {
    id: 'news-2026-05-20',
    date: '2026年5月20日',
    category: 'メディア',
    title: 'Forbes JAPAN「注目のスタートアップ30選」に選出されました',
    description: 'カーディテイリング×テクノロジーの革新的なビジネスモデルが評価され、Forbes JAPANの「2026年 注目のスタートアップ30選」に選出。6月発売号にインタビュー記事が掲載されます。',
  },
  {
    id: 'news-2026-05-10',
    date: '2026年5月10日',
    category: '採用',
    title: '2027年度新卒採用エントリーを開始しました',
    description: 'エンジニア、プロダクトマネージャー、マーケティングの3職種で新卒採用を開始。カジュアル面談も随時受け付けています。詳細は採用情報ページをご確認ください。',
  },
  {
    id: 'news-2026-04-30',
    date: '2026年4月30日',
    category: 'お知らせ',
    title: 'プライバシーポリシーおよび利用規約を更新しました',
    description: '正式ローンチに向けて、プライバシーポリシーおよび利用規約の全面改定を実施しました。個人情報の取り扱いやサービス提供条件について、より明確な記載に改めています。',
  },
  {
    id: 'news-2026-04-15',
    date: '2026年4月15日',
    category: 'お知らせ',
    title: '公式サイトをリニューアルオープンしました',
    description: 'MobileWashのサービス内容、料金プラン、対応エリアなど、全情報を網羅した公式サイトを公開。プレローンチ期間中はサイトからの事前登録で正式版を特別価格でご利用いただける特典も。',
  },
  {
    id: 'news-2026-03-25',
    date: '2026年3月25日',
    category: 'メディア',
    title: '日経トレンディ「2026年ヒット予測」に掲載されました',
    description: '日経トレンディ4月号の「2026年ヒット予測」特集にて、今年ブレイクが期待されるサービスとしてMobileWashが紹介されました。出張型サービスの新潮流として注目されています。',
  },
  {
    id: 'news-2026-03-01',
    date: '2026年3月1日',
    category: 'お知らせ',
    title: '全国47都道府県のプロ登録受付を開始しました',
    description: 'これまでの東京都内限定から、全国47都道府県のプロフェッショナル登録受付を開始。各地域の優良なカーディテイラーとのネットワーク構築を本格化します。',
  },
  {
    id: 'news-2026-02-10',
    date: '2026年2月10日',
    category: 'お知らせ',
    title: 'iOS版アプリのβテスト参加者を募集開始',
    description: 'TestFlightを通じたiOS版アプリのβテスト参加者募集を開始。抽選で500名様に先行体験いただける機会をご提供します。ご応募は公式サイトの登録フォームから。',
  },
];