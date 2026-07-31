import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { pressReleases } from '@/mocks/companyPress';

export default function CompanyPressPage() {
  useEffect(() => {
    document.title = 'プレスリリース | MobileWash';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'MobileWash株式会社のプレスリリース一覧。設立発表、資金調達、全国展開、クラウドファンディング開始など、出張洗車・出張コーティングサービスMobileWashのプレスリリースを掲載しています。');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://mobilewash.app/company/press');
    window.scrollTo(0, 0);
    return () => {
      document.title = 'MobileWash | 出張洗車・出張コーティングアプリ 全国47都道府県対応';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#0a2540]">
      {/* Header */}
      <header className="bg-[#0a1628] text-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
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
            <span className="text-white/70">プレスリリース</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">プレスリリース</h1>
          <p className="text-[14px] text-white/55 leading-relaxed max-w-2xl">
            MobileWash株式会社の公式プレスリリースを掲載しています。取材・掲載に関するお問い合わせは info@holy-inc.jp まで。
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-10 -mt-6">
        <div className="bg-white rounded-2xl border border-[#e8ecf0] p-6 sm:p-8 lg:p-10 shadow-sm">

          {/* Press Contact */}
          <div className="rounded-xl bg-[#f5f9fc] border border-[#e0ecf5] p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[13px] font-bold text-[#0a2540] mb-0.5">プレス・取材に関するお問い合わせ</p>
              <p className="text-[12px] text-[#5a6a7a]">広報担当：info@holy-inc.jp</p>
            </div>
            <a
              href="mailto:info@holy-inc.jp"
              className="inline-flex items-center gap-2 bg-[#0a1628] text-white font-bold px-4 py-2.5 rounded-full text-[12px] hover:bg-[#1a3658] transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-mail-send-line text-sm"></i>
              広報に問い合わせる
            </a>
          </div>

          {/* Press Release List */}
          <div className="space-y-0">
            {pressReleases.map((pr, i) => (
              <article key={pr.id} className={`py-6 ${i < pressReleases.length - 1 ? 'border-b border-[#e8ecf0]' : ''}`}>
                <span className="text-[11px] text-[#7a8a9a] font-medium">{pr.date}</span>
                <h2 className="text-[15px] font-bold text-[#0a2540] leading-snug mt-1.5 mb-2">{pr.title}</h2>
                <p className="text-[12px] text-[#5a6a7a] leading-relaxed">{pr.description}</p>
                {pr.pdfUrl && (
                  <a
                    href={pr.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-[12px] font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer transition-colors"
                  >
                    <i className="ri-file-pdf-line text-sm"></i>
                    PDFをダウンロード
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* Back */}
        <div className="flex justify-center py-12">
          <Link to="/" className="inline-flex items-center gap-2 text-[13px] text-[#5a6a7a] hover:text-[#0a2540] transition-colors cursor-pointer">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-left-line text-sm"></i>
            </div>
            ホームに戻る
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0a1628] text-white border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-white/40">© 2026 MobileWash, Inc. All rights reserved.</p>
            <div className="flex gap-x-5 text-[11px] text-white/45">
              <Link to="/legal/privacy" className="hover:text-white transition-colors cursor-pointer">プライバシーポリシー</Link>
              <Link to="/legal/terms" className="hover:text-white transition-colors cursor-pointer">利用規約</Link>
              <Link to="/legal/security" className="hover:text-white transition-colors cursor-pointer">情報セキュリティ方針</Link>
              <Link to="/legal/consumer-law" className="hover:text-white transition-colors cursor-pointer">特定商取引法に基づく表記</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}