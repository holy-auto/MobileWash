export const companyInfo = {
  name: '株式会社HOLY',
  nameEn: 'HOLY Inc.',
  founded: '2024年11月',
  established: '2024年11月12日',
  capital: '10万円',
  ceo: '代表取締役 — 堀越 友輔',
  employees: '1名（2026年6月現在、プロ登録者含まず）',
  address: '〒107-0061 東京都港区北青山1-3-1 アールキューブ青山3F',
  phone: '03-4363-3234',
  email: 'info@holy-inc.jp',
  business: [
    '出張洗車・出張コーティングサービス「MobileWash」の企画・開発・運営',
    'カーディテイリングに関するコンサルティング',
    'プロフェッショナル向け研修・認定制度の運営',
    '法人向けフリート管理ソリューションの提供',
  ],
  // 取引銀行・許認可は出典が確認できないため未掲載。
  // 実在するものが確定したらここに戻す（会社概要ページは空配列なら該当欄を出さない）。
  banks: [] as string[],
  licenses: [] as string[],
};

export const mission = {
  title: 'Mission',
  heading: '「洗車をもっと自由に、もっとスマートに」',
  description: 'MobileWashは、テクノロジーの力でカーディテイリング業界をアップデートします。GPSマッチングによるオンデマンド出張サービスにより、お客様の大切な時間を奪うことなく、プロフェッショナルな洗車・コーティングを提供。全国の優良なプロフェッショナルとお客様をつなぎ、新しいカーケア体験を創造します。',
};

export const vision = {
  title: 'Vision',
  heading: 'すべての車が、いつでも輝いている社会へ',
  description: '日本全国どこでも、スマホひとつでプロの手による洗車・コーティングを受けられる世界。私たちは車のコンディション維持を「面倒な作業」から「当たり前の日常」に変え、移動の喜びをすべての人に届けます。',
};

export const values = [
  {
    icon: 'ri-shining-line',
    title: '品質へのこだわり',
    description: 'すべてのプロは身分証確認・実技検定を通過した認定プロのみ。お客様に最高の仕上がりをお届けします。',
  },
  {
    icon: 'ri-user-heart-line',
    title: '人とテクノロジーの融合',
    description: 'GPSマッチングやAI最適化といった技術と、プロの確かな手仕事。両方の良さを掛け合わせます。',
  },
  {
    icon: 'ri-earth-line',
    title: '持続可能な社会へ',
    description: '節水型洗車技術の採用、環境負荷の少ない洗剤の使用、移動距離の最適化によるCO2削減に取り組んでいます。',
  },
  {
    icon: 'ri-hand-heart-line',
    title: 'プロと共に成長',
    description: '認定プロのスキルアップ支援、安定した案件供給、公正な報酬体系により、プロが誇りを持って働ける環境を。',
  },
];

export const timeline = [
  { year: '2024年11月', event: '株式会社HOLY 設立' },
  { year: '2025年10月', event: '出張洗車サービス「MobileWash」の立ち上げ準備を開始' },
  { year: '2026年Q3', event: '正式ローンチ予定' },
];

export const officers = [
  {
    role: '代表取締役',
    name: '堀越 友輔',
    description: '自動車業界歴10年。整備・鈑金塗装・ディテイリングまで幅広く経験し、車のトータルケアに精通。その現場経験をもとに、テクノロジーとプロの手仕事を融合させた新しいカーケア体験の創造に取り組む。',
  },
];