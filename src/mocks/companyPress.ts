export interface PressReleaseItem {
  id: string;
  date: string;
  title: string;
  description: string;
  pdfUrl?: string;
}

/**
 * プレスリリース。
 *
 * ここに載せるのは、コーポレートサイト（holy-inc.jp）の沿革・お知らせで
 * 裏が取れている出来事だけ。未発表の計画や、出典を示せない実績（メディア掲載・
 * 資金調達・登録者数など）は載せない。
 */
export const pressReleases: PressReleaseItem[] = [
  {
    id: 'pr-2025-10',
    date: '2025年10月',
    title: '出張洗車サービス「MobileWash」の立ち上げ準備を開始',
    description:
      '株式会社HOLYは、出張洗車・出張コーティングサービス「MobileWash」の立ち上げ準備を開始しました。整備・鈑金塗装・コーティングの現場で培った施工の知見を、お客様の指定場所へ伺う出張型のサービスとして提供します。',
  },
  {
    id: 'pr-2024-11-12',
    date: '2024年11月12日',
    title: '株式会社HOLYを設立',
    description:
      '代表取締役 堀越友輔が、全国47都道府県での出張作業を中心とした個人事業から法人成りし、株式会社HOLYを設立しました。自動車のコーティング・フィルム施工・技術講習（HOLY AUTO）、車両履歴・技術証明インフラ（Ledra）、出張洗車（MobileWash）の3事業を展開します。',
  },
];
