// サイト共通定数
export const CAMPFIRE_URL = 'https://camp-fire.jp/projects/944308/preview?token=6vm6u1vg&utm_campaign=cp_po_share_c_msg_projects_show';

/**
 * 関連サイト（相互リンク）。
 *
 * URL の出典:
 * - holy-inc.jp     … コーポレートサイトのルートドメイン（holy-inc リポジトリの VITE_SITE_URL 既定値）
 * - www.ledra.co.jp … Ledra リポジトリ siteConfig.siteUrl（「canonical は www に統一」とコメント有り）
 * - holy-auto.com   … holy-inc リポジトリが従来から掲載しているURL。canonical の宣言は未確認
 *
 * MobileWash は株式会社HOLY の事業ブランド（別法人ではない）。
 */
export const GROUP_SITES = {
  holyInc: 'https://holy-inc.jp',
  ledra: 'https://www.ledra.co.jp',
  holyAuto: 'https://holy-auto.com',
} as const;
