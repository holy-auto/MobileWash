export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: '正社員' | '業務委託' | 'インターン' | 'アルバイト';
  description: string;
  requirements: string[];
  preferred: string[];
  salary: string;
  hours: string;
  benefits: string[];
}

export const culture = {
  title: 'MobileWashの文化',
  heading: '「変化を楽しみ、挑戦を称える」',
  description: '私たちはカーディテイリング業界という伝統的な分野に、テクノロジーで新しい風を吹き込むスタートアップです。前例のないことに挑戦する楽しさと、仲間と共に成長する喜びを何より大切にしています。',
  features: [
    {
      icon: 'ri-time-line',
      title: 'フルフレックス制',
      description: 'コアタイムなしの完全フレックスタイム制。一人ひとりが最もパフォーマンスを発揮できる時間帯で働けます。',
    },
    {
      icon: 'ri-home-office-line',
      title: 'リモートワーク可',
      description: '週3日までのリモートワークが可能。通勤時間を削減し、集中できる環境で最高のアウトプットを。',
    },
    {
      icon: 'ri-book-open-line',
      title: '学習支援制度',
      description: '書籍購入補助（月5,000円まで）、カンファレンス参加費補助、オンライン学習プラットフォーム完備。',
    },
    {
      icon: 'ri-heart-pulse-line',
      title: '健康・福利厚生',
      description: '社会保険完備、定期健康診断、ストレスチェック、オフィスにフリードリンク・スナック完備。',
    },
    {
      icon: 'ri-team-line',
      title: 'フラットな組織',
      description: '役職にかかわらず自由に意見を交わせる文化。週次の全社会議で誰でもプレゼン可能。',
    },
    {
      icon: 'ri-rocket-line',
      title: 'ストックオプション',
      description: '正社員全員にストックオプションを付与。会社の成長をチーム全員で分かち合います。',
    },
  ],
};

export const jobOpenings: JobOpening[] = [
  {
    id: 'job-eng-frontend',
    title: 'フロントエンドエンジニア',
    department: 'プロダクト開発部',
    location: '東京・渋谷（リモート可）',
    type: '正社員',
    description: 'MobileWashのユーザー向けWebアプリ・プロ向け管理画面の開発を担当していただきます。React/TypeScriptを用いたSPA開発が中心です。ユーザー体験を最優先に考え、デザイナーやバックエンドエンジニアと密に連携しながらプロダクトを成長させていくやりがいのあるポジションです。',
    requirements: [
      'React / TypeScriptを用いたWebアプリケーション開発経験（2年以上）',
      'TailwindCSS等のモダンCSSフレームワークの実務経験',
      'Git/GitHubを用いたチーム開発経験',
      '日本語でのビジネスコミュニケーション能力',
    ],
    preferred: [
      'Next.js / Remix等のReactフレームワーク経験',
      '地図・位置情報系ライブラリ（Google Maps API / Mapbox等）の使用経験',
      'パフォーマンスチューニング・Core Web Vitals改善の知見',
      'モバイルアプリ（React Native / Flutter）の開発経験',
    ],
    salary: '年収 500万円〜900万円（経験・能力に応じて優遇）',
    hours: 'フルフレックス制（コアタイムなし）／週5日',
    benefits: [
      '社会保険完備（健康保険・厚生年金・雇用保険・労災保険）',
      '交通費支給（月3万円まで）',
      'リモートワーク手当（月5,000円）',
      '書籍購入補助（月5,000円）',
      'ストックオプション制度',
    ],
  },
  {
    id: 'job-eng-backend',
    title: 'バックエンドエンジニア',
    department: 'プロダクト開発部',
    location: '東京・渋谷（リモート可）',
    type: '正社員',
    description: 'MobileWashのサーバーサイド全般の設計・開発・運用を担当していただきます。マッチングアルゴリズムの改善、決済システムとの連携、プロ管理システムの構築など、サービスの根幹を支える重要なポジションです。',
    requirements: [
      'サーバーサイド開発経験（3年以上、言語不問）',
      'RDB（PostgreSQL等）の設計・運用経験',
      'RESTful API / GraphQLの設計・開発経験',
      'クラウドサービス（AWS / GCP / Azure）の使用経験',
    ],
    preferred: [
      'TypeScript / Node.js / Denoでの開発経験',
      'Supabase / Firebase等のBaaS使用経験',
      '位置情報・地理空間データの取り扱い経験',
      '決済システム（Stripe等）との連携経験',
    ],
    salary: '年収 550万円〜1,000万円（経験・能力に応じて優遇）',
    hours: 'フルフレックス制（コアタイムなし）／週5日',
    benefits: [
      '社会保険完備',
      '交通費支給（月3万円まで）',
      'リモートワーク手当（月5,000円）',
      '書籍購入補助（月5,000円）',
      'ストックオプション制度',
    ],
  },
  {
    id: 'job-marketing',
    title: 'マーケティングスペシャリスト',
    department: 'マーケティング部',
    location: '東京・渋谷',
    type: '正社員',
    description: 'MobileWashの認知拡大・ユーザー獲得のためのマーケティング戦略立案から実行までを担当していただきます。デジタルマーケティングを中心に、イベント出展やパートナーシップ開拓など幅広いチャネルでの施策展開をお任せします。',
    requirements: [
      'BtoC向けWebマーケティングの実務経験（2年以上）',
      'SEO / コンテンツマーケティング / SNS運用の知識と経験',
      'Google Analytics等のアクセス解析ツールの使用経験',
      'データに基づいたPDCAを回せる方',
    ],
    preferred: [
      '自動車関連・カー用品業界でのマーケティング経験',
      '動画コンテンツの企画・制作経験',
      '広告運用（Google Ads / SNS広告）の経験',
      'PR・メディアリレーションの経験',
    ],
    salary: '年収 450万円〜750万円（経験・能力に応じて優遇）',
    hours: 'フルフレックス制（コアタイムなし）／週5日',
    benefits: [
      '社会保険完備',
      '交通費支給（月3万円まで）',
      '書籍購入補助（月5,000円）',
      'ストックオプション制度',
    ],
  },
  {
    id: 'job-intern',
    title: 'プロダクト開発インターン',
    department: 'プロダクト開発部',
    location: '東京・渋谷（リモート可）',
    type: 'インターン',
    description: 'MobileWashのプロダクト開発に学生インターンとして参画していただきます。実務経験を積みながら、実際のユーザーに使われるプロダクトの開発に携われる貴重な機会です。フロントエンドまたはバックエンドの希望分野に応じて配属を決定します。',
    requirements: [
      'HTML / CSS / JavaScriptの基礎知識',
      'ReactまたはVue.jsの学習経験',
      'Gitの基本操作',
      '週16時間以上の稼働が可能な方',
    ],
    preferred: [
      'TypeScriptの使用経験',
      '個人またはチームでのWebアプリ開発経験',
      'コンピューターサイエンス専攻',
    ],
    salary: '時給 1,500円〜（経験に応じて）',
    hours: '週16時間〜40時間（シフト制）',
    benefits: [
      '交通費支給',
      'フリードリンク・スナック',
      '正社員登用制度あり',
      'メンター制度',
    ],
  },
];