import { Link } from 'react-router-dom';
import { CAMPFIRE_URL } from '@/constants';

const footerLinks = [
  {
    title: 'サービス',
    links: [
      { label: '出張手洗い洗車', href: '#services' },
      { label: '出張ガラスコーティング', href: '#services' },
      { label: '出張内装クリーニング', href: '#services' },
      { label: '出張ポリッシュ磨き', href: '#services' },
      { label: 'フルディテイリング', href: '#services' },
      { label: 'エンジンルーム洗浄', href: '#services' },
    ],
  },
  {
    title: '料金プラン',
    links: [
      { label: '都度払い', href: '#plans' },
      { label: '定額ライト', href: '#plans' },
      { label: '定額プレミアム', href: '#plans' },
      { label: '法人プラン', href: '/corporate' },
      { label: 'ギフト・クーポン', href: '#cta' },
    ],
  },
  {
    title: 'サポート',
    links: [
      { label: 'ご利用ガイド', href: '#how-it-works' },
      { label: '対応エリア', href: '#areas' },
      { label: 'よくある質問', href: '#faq' },
      { label: 'お問い合わせ', href: '#faq' },
      { label: 'ヘルプセンター', href: '#faq' },
    ],
  },
  {
    title: 'プロの方へ',
    links: [
      { label: 'プロ登録', href: '#pro-recruit' },
      { label: 'プロ向けFAQ', href: '#faq' },
      { label: 'プロ向けマニュアル', href: '#pro-recruit' },
      { label: 'プロ向けニュース', href: '#pro-recruit' },
    ],
  },
  {
    title: '会社情報',
    links: [
      { label: '会社概要', href: '/company/about' },
      { label: 'ニュース', href: '/company/news' },
      { label: 'プレスリリース', href: '/company/press' },
      { label: '採用情報', href: '/company/recruit' },
      { label: 'ブランド素材', href: '/company/brand' },
    ],
  },
];

const trustBadges = [
  {
    icon: 'ri-shield-check-line',
    label: 'SSL暗号化通信',
    desc: '全通信を暗号化',
  },
  {
    icon: 'ri-lock-password-line',
    label: 'プライバシー保護',
    desc: '個人情報厳重管理',
  },
  {
    icon: 'ri-secure-payment-line',
    label: '決済情報保護',
    desc: 'カード情報非保持',
  },
  {
    icon: 'ri-verified-badge-line',
    label: '認定プロのみ',
    desc: '身分証＋実技検定',
  },
];

const paymentMethods = [
  { icon: 'ri-bank-card-line', label: 'Visa' },
  { icon: 'ri-bank-card-line', label: 'Mastercard' },
  { icon: 'ri-bank-card-line', label: 'JCB' },
  { icon: 'ri-bank-card-line', label: 'AMEX' },
  { icon: 'ri-apple-fill', label: 'Apple Pay' },
  { icon: 'ri-google-fill', label: 'Google Pay' },
];

const mediaLogos = [
  // ローンチ後に更新予定
];

const quickContacts = [
  { icon: 'ri-customer-service-2-line', label: 'カスタマーサポート', value: '平日 9:00-18:00' },
  { icon: 'ri-mail-line', label: 'メールでのお問い合わせ', value: 'info@holy-inc.jp' },
  { icon: 'ri-phone-line', label: 'お電話でのお問い合わせ', value: '03-4363-3234' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a1628] text-white">
      {/* Top Section: Brand + Links */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 lg:pt-20 pb-12">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <a href="/" className="flex items-center gap-3 mb-5 cursor-pointer">
              <img
                src="https://storage.readdy-site.link/project_files/c40f971a-8995-4350-8e33-e7b8168d5850/60df7e55-3821-4161-a8bd-e386660f21ef_mobile_wash_app_icon.png?v=1a084e8094f7ad1f039da984d9cffe58"
                alt="MobileWash"
                className="w-11 h-11 rounded-xl object-cover"
              />
              <div>
                <p className="text-white font-bold text-[17px] leading-tight">MobileWash</p>
                <p className="text-white/40 text-[10px] tracking-widest mt-0.5">MOBILE CAR WASH &amp; COATING</p>
              </div>
            </a>
            <p className="text-[13px] text-white/65 leading-relaxed mb-6 max-w-xs">
              出張洗車・出張コーティングのプロを、あなたの元へ。スマホひとつで、車のお手入れを変えていきます。
            </p>
            <a
              href={CAMPFIRE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#0a1628] font-bold px-5 py-3 rounded-full text-[13px] hover:bg-[#e6f4ff] transition-colors mb-8 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-heart-add-line text-sm"></i>
              CAMPFIREで応援する
            </a>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
              {footerLinks.map((col) => (
                <div key={col.title}>
                  <h4 className="text-white font-bold text-[13px] mb-4">{col.title}</h4>
                  <ul className="space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        {link.href.startsWith('/') ? (
                          <Link
                            to={link.href}
                            className="text-[12px] text-white/55 hover:text-white transition-colors cursor-pointer"
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            className="text-[12px] text-white/55 hover:text-white transition-colors cursor-pointer"
                          >
                            {link.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Contact Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {quickContacts.map((c) => (
            <div
              key={c.label}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 hover:bg-white/[0.06] transition-colors"
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 shrink-0">
                <i className={`${c.icon} text-white/80 text-base`}></i>
              </div>
              <div>
                <p className="text-[11px] text-white/45 font-bold tracking-wider mb-0.5">{c.label}</p>
                <p className="text-[13px] text-white font-semibold">{c.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Section: Trust & Credibility */}
      <div className="bg-[#0d1d33] border-y border-white/[0.06]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Trust Badges */}
            <div>
              <p className="text-[11px] text-white/40 font-bold tracking-widest mb-5">SECURITY &amp; TRUST</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {trustBadges.map((badge) => (
                  <div
                    key={badge.label}
                    className="flex flex-col items-center text-center rounded-xl border border-white/10 bg-white/[0.03] px-3 py-4 hover:bg-white/[0.06] transition-colors cursor-default"
                  >
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-emerald-500/15 mb-2.5">
                      <i className={`${badge.icon} text-emerald-400 text-lg`}></i>
                    </div>
                    <p className="text-[12px] font-bold text-white mb-0.5">{badge.label}</p>
                    <p className="text-[10px] text-white/45">{badge.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Methods + Media */}
            <div className="space-y-8">
              {/* Payment */}
              <div>
                <p className="text-[11px] text-white/40 font-bold tracking-widest mb-4">決済方法</p>
                <div className="flex flex-wrap gap-3">
                  {paymentMethods.map((pm) => (
                    <div
                      key={pm.label}
                      className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
                    >
                      <i className={`${pm.icon} text-white/50 text-sm`}></i>
                      <span className="text-[11px] text-white/60 font-medium">{pm.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Media Logos */}
              <div>
                <p className="text-[11px] text-white/40 font-bold tracking-widest mb-4">メディア掲載実績</p>
                <p className="text-[12px] text-white/30 leading-relaxed">ローンチ後に順次公開予定</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate Banner */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 shrink-0">
              <i className="ri-building-2-line text-white text-lg"></i>
            </div>
            <div>
              <p className="text-[13px] font-bold text-white">
                法人・フリート向けプランのご案内
              </p>
              <p className="text-[12px] text-white/55 mt-0.5">
                5台以上の車両管理に。専任担当者による無料相談・資料請求を受け付けています。
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/corporate#contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-full transition-colors text-[12px] cursor-pointer whitespace-nowrap border border-white/15"
            >
              <i className="ri-file-download-line text-sm"></i>
              資料請求
            </Link>
            <Link
              to="/corporate"
              className="inline-flex items-center gap-2 bg-white text-[#0a1628] font-bold px-4 py-2.5 rounded-full transition-colors text-[12px] cursor-pointer whitespace-nowrap hover:bg-[#e6f4ff]"
            >
              法人プランを見る
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-line text-sm"></i>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-white/45">
              <Link to="/legal/terms" className="hover:text-white transition-colors cursor-pointer">利用規約</Link>
              <Link to="/legal/privacy" className="hover:text-white transition-colors cursor-pointer">プライバシーポリシー</Link>
              <Link to="/legal/consumer-law" className="hover:text-white transition-colors cursor-pointer">特定商取引法に基づく表記</Link>
              <Link to="/legal/security" className="hover:text-white transition-colors cursor-pointer">情報セキュリティ方針</Link>
              <Link to="/sitemap" className="hover:text-white transition-colors cursor-pointer">サイトマップ</Link>
            </div>
            <p className="text-[11px] text-white/40">© 2026 MobileWash, Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}