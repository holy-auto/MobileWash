import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsItems, NewsItem } from '@/mocks/companyNews';

type CategoryFilter = 'すべて' | 'お知らせ' | 'プレスリリース' | 'メディア' | '採用';
const categories: CategoryFilter[] = ['すべて', 'お知らせ', 'プレスリリース', 'メディア', '採用'];

export default function CompanyNewsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('すべて');

  useEffect(() => {
    document.title = 'ニュース | MobileWash';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'MobileWashの最新ニュース一覧。クラウドファンディング開始、メディア掲載実績、サービスアップデート、採用情報など。出張洗車・出張コーティングサービスMobileWashの最新情報をお届けします。');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://mobilewash.app/company/news');
    window.scrollTo(0, 0);
    return () => {
      document.title = 'MobileWash | 出張洗車・出張コーティングアプリ 全国47都道府県対応';
    };
  }, []);

  const filteredNews = activeCategory === 'すべて'
    ? newsItems
    : newsItems.filter((item) => item.category === activeCategory);

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
            <span className="text-white/70">ニュース</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">ニュース</h1>
          <p className="text-[14px] text-white/55 leading-relaxed max-w-2xl">
            MobileWashの最新情報、メディア掲載実績、採用情報などをお届けします。
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-10 -mt-6">
        <div className="bg-white rounded-2xl border border-[#e8ecf0] p-6 sm:p-8 lg:p-10 shadow-sm">

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[12px] font-bold px-4 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#0a1628] text-white'
                    : 'bg-[#f0f4f8] text-[#5a6a7a] hover:bg-[#e4eaf2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* News List */}
          <div className="space-y-0">
            {filteredNews.map((item: NewsItem) => (
              <article key={item.id} className="py-5 border-b border-[#e8ecf0] last:border-b-0">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {item.imageUrl && (
                    <div className="w-full sm:w-48 h-32 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="text-[11px] text-[#7a8a9a]">{item.date}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                        item.category === 'お知らせ' ? 'bg-blue-50 text-blue-600' :
                        item.category === 'プレスリリース' ? 'bg-emerald-50 text-emerald-600' :
                        item.category === 'メディア' ? 'bg-amber-50 text-amber-600' :
                        'bg-violet-50 text-violet-600'
                      }`}>
                        {item.category}
                      </span>
                    </div>
                    <h2 className="text-[15px] font-bold text-[#0a2540] leading-snug mb-1.5">{item.title}</h2>
                    <p className="text-[12px] text-[#5a6a7a] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-16">
              <div className="w-14 h-14 flex items-center justify-center mx-auto mb-4 rounded-full bg-[#f0f4f8]">
                <i className="ri-news-line text-[#7a8a9a] text-2xl"></i>
              </div>
              <p className="text-[13px] text-[#7a8a9a]">該当するニュースはまだありません</p>
            </div>
          )}
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