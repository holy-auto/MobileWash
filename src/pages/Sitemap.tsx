import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    title: 'メインページ',
    links: [
      { label: 'ホーム', href: '/' },
      { label: '法人向けページ', href: '/corporate' },
    ],
  },
  {
    title: 'サービス',
    links: [
      { label: '出張手洗い洗車', href: '/#services' },
      { label: '出張ガラスコーティング', href: '/#services' },
      { label: '出張内装クリーニング', href: '/#services' },
      { label: '出張ポリッシュ磨き', href: '/#services' },
      { label: 'フルディテイリング', href: '/#services' },
      { label: 'エンジンルーム洗浄', href: '/#services' },
    ],
  },
  {
    title: '料金プラン',
    links: [
      { label: '都度払い', href: '/#plans' },
      { label: '定額ライト', href: '/#plans' },
      { label: '定額プレミアム', href: '/#plans' },
      { label: '法人プラン', href: '/corporate' },
      { label: 'ギフト・クーポン', href: '/#cta' },
    ],
  },
  {
    title: 'サポート・ガイド',
    links: [
      { label: 'ご利用ガイド', href: '/#how-it-works' },
      { label: '対応エリア', href: '/#areas' },
      { label: 'よくある質問', href: '/#faq' },
      { label: 'お問い合わせ', href: '/#faq' },
      { label: 'ヘルプセンター', href: '/#faq' },
    ],
  },
  {
    title: 'プロの方へ',
    links: [
      { label: 'プロ登録', href: '/#pro-recruit' },
      { label: 'プロ向けFAQ', href: '/#faq' },
      { label: 'プロ向けマニュアル', href: '/#pro-recruit' },
      { label: 'プロ向けニュース', href: '/#pro-recruit' },
    ],
  },
  {
    title: '法務・ポリシー',
    links: [
      { label: '利用規約', href: '/legal/terms' },
      { label: 'プライバシーポリシー', href: '/legal/privacy' },
      { label: '特定商取引法に基づく表記', href: '/legal/consumer-law' },
      { label: '情報セキュリティ方針', href: '/legal/security' },
    ],
  },
];

export default function Sitemap() {
  useEffect(() => {
    document.title = 'サイトマップ | MobileWash';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'MobileWashウェブサイトのサイトマップ。ホーム、法人プラン、サービス、料金プラン、サポート・ガイド、法務・ポリシーページの全ページ一覧です。');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://mobilewash.app/sitemap');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#0a2540]">
      {/* Header */}
      <header className="bg-[#0a1628] text-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-4">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img
                src="https://storage.readdy-site.link/project_files/c40f971a-8995-4350-8e33-e7b8168d5850/60df7e55-3821-4161-a8bd-e386660f21ef_mobile_wash_app_icon.png?v=1a084e8094f7ad1f039da984d9cffe58"
                alt="MobileWash"
                className="w-9 h-9 rounded-lg object-cover"
              />
              <div>
                <p className="text-white font-bold text-[15px] leading-tight">MobileWash</p>
                <p className="text-white/40 text-[9px] tracking-widest mt-0.5">MOBILE CAR WASH &amp; COATING</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-[#0a1628] text-white pb-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 pb-12">
          <div className="flex items-center gap-2 text-white/50 text-[12px] mb-4">
            <Link to="/" className="hover:text-white transition-colors cursor-pointer">ホーム</Link>
            <div className="w-3 h-3 flex items-center justify-center"><i className="ri-arrow-right-s-line text-xs"></i></div>
            <span className="text-white/70">サイトマップ</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">サイトマップ</h1>
          <p className="text-[14px] text-white/55 leading-relaxed max-w-2xl">
            MobileWashウェブサイトの全ページ一覧です。目的のページを簡単に見つけることができます。
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-10 -mt-6">
        <div className="bg-white rounded-2xl border border-[#e8ecf0] p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {categories.map((cat) => (
              <div key={cat.title}>
                <h2 className="text-[14px] font-bold text-[#0a2540] mb-4 flex items-center gap-2">
                  <div className="w-1 h-4 bg-emerald-400 rounded-full"></div>
                  {cat.title}
                </h2>
                <ul className="space-y-2.5">
                  {cat.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('/#') ? (
                        <a
                          href={link.href}
                          className="text-[13px] text-[#4a5568] hover:text-emerald-600 transition-colors cursor-pointer inline-flex items-center gap-2"
                        >
                          <i className="ri-arrow-right-s-line text-emerald-400 text-xs"></i>
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-[13px] text-[#4a5568] hover:text-emerald-600 transition-colors cursor-pointer inline-flex items-center gap-2"
                        >
                          <i className="ri-arrow-right-s-line text-emerald-400 text-xs"></i>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Back link */}
        <div className="flex justify-center py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[13px] text-[#5a6a7a] hover:text-[#0a2540] transition-colors cursor-pointer"
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-left-line text-sm"></i>
            </div>
            ホームに戻る
          </Link>
        </div>
      </div>

      {/* Footer mini */}
      <footer className="bg-[#0a1628] text-white border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-white/40">© 2026 MobileWash, Inc. All rights reserved.</p>
            <div className="flex gap-x-5 text-[11px] text-white/45">
              <Link to="/legal/terms" className="hover:text-white transition-colors cursor-pointer">利用規約</Link>
              <Link to="/legal/privacy" className="hover:text-white transition-colors cursor-pointer">プライバシーポリシー</Link>
              <Link to="/legal/security" className="hover:text-white transition-colors cursor-pointer">情報セキュリティ方針</Link>
              <Link to="/legal/consumer-law" className="hover:text-white transition-colors cursor-pointer">特定商取引法に基づく表記</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}