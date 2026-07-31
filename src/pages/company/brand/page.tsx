import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { brandAssets, brandGuidelines, faqContact } from '@/mocks/companyBrand';

export default function CompanyBrandPage() {
  useEffect(() => {
    document.title = 'ブランド素材 | MobileWash';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'MobileWashのブランド素材・ガイドラインページ。ロゴデータ、カラーパレット、フォント情報、キービジュアル素材のダウンロード。プレス・メディア関係者向けブランドアセット。');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://mobilewash.app/company/brand');
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
            <span className="text-white/70">ブランド素材</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">ブランド素材</h1>
          <p className="text-[14px] text-white/55 leading-relaxed max-w-2xl">
            プレス・メディア関係者、パートナー企業の皆様向けに、MobileWashのブランドアセットをご用意しています。ご利用の際はブランドガイドラインをご確認ください。
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-10 -mt-6">
        <div className="bg-white rounded-2xl border border-[#e8ecf0] p-6 sm:p-8 lg:p-10 shadow-sm">

          {/* Guidelines First */}
          <section>
            <h2 className="text-[16px] font-bold text-[#0a2540] mb-3">{brandGuidelines.title}</h2>
            <p className="text-[13px] text-[#4a5568] leading-relaxed mb-4">{brandGuidelines.description}</p>
            <ul className="space-y-2">
              {brandGuidelines.rules.map((rule, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[12px] text-[#5a6a7a] leading-relaxed">
                  <span className="text-emerald-500 font-bold shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}.</span>
                  {rule}
                </li>
              ))}
            </ul>
          </section>

          {/* Brand Assets */}
          {brandAssets.map((category, catIdx) => (
            <section key={catIdx} className="mt-10 pt-8 border-t border-[#e8ecf0]">
              <h2 className="text-[16px] font-bold text-[#0a2540] mb-5">{category.category}</h2>
              <div className="space-y-3">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="rounded-xl border border-[#e8ecf0] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#d0dbe6] transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#f0f4f8] shrink-0">
                        <i className={`${item.icon} text-[#5a6a7a] text-lg`}></i>
                      </div>
                      <div>
                        <h3 className="text-[14px] font-bold text-[#0a2540] mb-0.5">{item.name}</h3>
                        <p className="text-[11px] text-[#7a8a9a] leading-relaxed">{item.description}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-[10px] text-[#a0aab4] bg-[#f0f4f8] px-2 py-0.5 rounded">{item.format}</span>
                          <span className="text-[10px] text-[#a0aab4]">{item.size}</span>
                        </div>
                      </div>
                    </div>
                    <button className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#0a2540] border border-[#d0dbe6] px-3 py-2 rounded-full hover:bg-[#f0f4f8] transition-colors cursor-pointer whitespace-nowrap shrink-0">
                      <i className="ri-download-line text-sm"></i>
                      ダウンロード
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Contact */}
          <section className="mt-10 pt-8 border-t border-[#e8ecf0]">
            <h2 className="text-[16px] font-bold text-[#0a2540] mb-3">{faqContact.title}</h2>
            <p className="text-[13px] text-[#4a5568] leading-relaxed mb-4">{faqContact.description}</p>
            <div className="rounded-xl bg-[#f5f9fc] border border-[#e0ecf5] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-[13px] font-bold text-[#0a2540] mb-0.5">{faqContact.email}</p>
                <p className="text-[11px] text-[#7a8a9a]">{faqContact.response}</p>
              </div>
              <a
                href={`mailto:${faqContact.email}`}
                className="inline-flex items-center gap-2 bg-[#0a1628] text-white font-bold px-4 py-2.5 rounded-full text-[12px] hover:bg-[#1a3658] transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-mail-send-line text-sm"></i>
                お問い合わせ
              </a>
            </div>
          </section>
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