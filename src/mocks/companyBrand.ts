export interface BrandAsset {
  category: string;
  items: {
    name: string;
    description: string;
    format: string;
    size: string;
    icon: string;
  }[];
}

export const brandAssets: BrandAsset[] = [
  {
    category: 'ロゴ',
    items: [
      {
        name: 'MobileWash メインロゴ（横型・カラー）',
        description: 'Webサイト・アプリのヘッダーや名刺等の印刷物にご使用いただけます。',
        format: 'PNG / SVG / PDF',
        size: '2400×600px',
        icon: 'ri-image-line',
      },
      {
        name: 'MobileWash メインロゴ（横型・白抜き）',
        description: '濃色背景での表示用。フッターやヒーロー画像の上に配置する場合に推奨。',
        format: 'PNG / SVG',
        size: '2400×600px',
        icon: 'ri-contrast-2-line',
      },
      {
        name: 'MobileWash アプリアイコン',
        description: 'App Store / Google Play掲載用アイコン。1024px角の正方形フォーマット。',
        format: 'PNG',
        size: '1024×1024px',
        icon: 'ri-app-store-line',
      },
      {
        name: 'MobileWash ファビコン・シンボルマーク',
        description: 'ブラウザタブ・ブックマーク用アイコン。最小サイズ16pxまで視認性を確保。',
        format: 'ICO / PNG / SVG',
        size: '16〜512px（マルチサイズ）',
        icon: 'ri-shield-check-line',
      },
    ],
  },
  {
    category: 'カラーパレット',
    items: [
      {
        name: 'プライマリーカラー',
        description: 'ブランドの中心となる色。#0099e6（アクアブルー）。CTAボタン・リンク・アクセントに使用。',
        format: 'HEX / RGB / CMYK',
        size: '—',
        icon: 'ri-palette-line',
      },
      {
        name: 'ダークテーマカラー',
        description: 'フッター・ヘッダー背景用。#0a1628（ディープネイビー）。信頼感と高級感を演出。',
        format: 'HEX / RGB / CMYK',
        size: '—',
        icon: 'ri-moon-line',
      },
      {
        name: 'サポートカラー',
        description: 'エメラルドグリーン系・暖色アクセント。バッジ・アイコン・グラフ等にアクセントとして使用。',
        format: 'HEX / RGB',
        size: '—',
        icon: 'ri-contrast-drop-2-line',
      },
    ],
  },
  {
    category: 'フォント',
    items: [
      {
        name: '見出し用フォント',
        description: 'Google Fontsより提供。太字での使用を推奨。Webフォントとして全ページに適用。',
        format: 'WOFF2',
        size: '—',
        icon: 'ri-font-size-2',
      },
      {
        name: '本文用フォント',
        description: '可読性を重視したサンセリフ体。日本語と英数字のバランスを最適化。',
        format: 'WOFF2',
        size: '—',
        icon: 'ri-font-size',
      },
    ],
  },
  {
    category: 'キービジュアル・写真素材',
    items: [
      {
        name: 'ヒーロー用背景画像',
        description: 'トップページ・各ランディングページの背景画像。洗車・コーティングのプロフェッショナルな仕上がりを表現。',
        format: 'JPEG / WebP',
        size: '1920×1080px',
        icon: 'ri-landscape-line',
      },
      {
        name: 'サービスカテゴリアイコン',
        description: '6つのサービスメニューに対応するアイコンセット。統一されたラインスタイル。',
        format: 'SVG',
        size: '64×64px',
        icon: 'ri-grid-line',
      },
    ],
  },
];

export const brandGuidelines = {
  title: 'ブランドガイドライン',
  description: 'MobileWashのブランド資材をご利用いただく際は、以下のガイドラインに従ってください。ブランドの一貫性を保つため、ロゴの変形・色変更・エフェクト追加は禁止されています。',
  rules: [
    'ロゴの周囲には、ロゴ高さの25%以上のクリアスペースを確保してください。',
    'ロゴの最小表示サイズは、横型ロゴで幅120px、アイコンのみで24pxです。',
    '原則として、白背景にはカラーロゴ、濃色背景には白抜きロゴを使用してください。',
    'ロゴの回転、斜め配置、変形、ドロップシャドウの追加は禁止です。',
    'ロゴの色をブランドカラーパレット以外に変更することは禁止です。',
    'プレスリリース等で掲載される場合は、事前に広報担当（info@holy-inc.jp）までご連絡ください。',
  ],
};

export const faqContact = {
  title: 'お問い合わせ',
  description: 'ブランド素材に関するお問い合わせや、利用許諾の申請は以下までご連絡ください。',
  email: 'info@holy-inc.jp',
  response: '通常2〜3営業日以内にご返信いたします。',
};