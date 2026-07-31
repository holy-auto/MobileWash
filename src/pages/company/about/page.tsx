import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { companyInfo, mission, vision, values, timeline, officers } from '@/mocks/companyAbout';

export default function CompanyAboutPage() {
  useEffect(() => {
    document.title = '会社概要 | MobileWash';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'MobileWash株式会社の会社概要。ミッション・ビジョン・バリュー、沿革、役員情報、事業内容。出張洗車・出張コーティングサービスを運営するMobileWashの企業情報ページです。');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://mobilewash.app/company/about');
    window.scrollTo(0, 0);

    const script = document.createElement('script');
    script.id = 'about-structured-data';
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'MobileWash株式会社',
      url: 'https://mobilewash.app/',
      logo: 'https://storage.readdy-site.link/project_files/c40f971a-8995-4350-8e33-e7b8168d5850/60df7e55-3821-4161-a8bd-e386660f21ef_mobile_wash_app_icon.png?v=1a084e8094f7ad1f039da984d9cffe58',
      foundingDate: '2025-04-01',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '前林623-1',
        addressLocality: '古河市',
        addressRegion: '茨城県',
        postalCode: '306-0216',
        addressCountry: 'JP',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+81-3-4363-3234',
        email: 'info@holy-inc.jp',
        contactType: 'customer service',
      },
    });
    document.head.appendChild(script);

    return () => {
      document.title = 'MobileWash | 出張洗車・出張コーティングアプリ 全国47都道府県対応';
      const el = document.getElementById('about-structured-data');
      if (el) el.remove();
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
            <span className="text-white/70">会社概要</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">会社概要</h1>
          <p className="text-[14px] text-white/55 leading-relaxed max-w-2xl">
            テクノロジーの力でカーディテイリング業界をアップデートし、「洗車をもっと自由に、もっとスマートに」を実現します。
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-10 -mt-6">
        <div className="bg-white rounded-2xl border border-[#e8ecf0] p-6 sm:p-8 lg:p-10 shadow-sm">

          {/* Company Info Table */}
          <section>
            <h2 className="text-[16px] font-bold text-[#0a2540] mb-5">企業情報</h2>
            <div className="rounded-xl border border-[#e8ecf0] overflow-hidden">
              <table className="w-full text-[13px]">
                <tbody>
                  {[
                    { label: '商号', value: companyInfo.name },
                    { label: '英文商号', value: companyInfo.nameEn },
                    { label: '設立', value: companyInfo.established },
                    { label: '資本金', value: companyInfo.capital },
                    { label: '代表者', value: companyInfo.ceo },
                    { label: '従業員数', value: companyInfo.employees },
                    { label: '所在地', value: companyInfo.address },
                    { label: '電話番号', value: companyInfo.phone },
                    { label: 'メールアドレス', value: companyInfo.email },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#fafcfd]'}>
                      <th className="text-left px-5 py-3 text-[#7a8a9a] font-medium w-36 border-r border-[#e8ecf0]">{row.label}</th>
                      <td className="px-5 py-3 text-[#1a3658]">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Business Description */}
          <section className="mt-10 pt-8 border-t border-[#e8ecf0]">
            <h2 className="text-[16px] font-bold text-[#0a2540] mb-4">事業内容</h2>
            <ul className="space-y-2.5">
              {companyInfo.business.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] text-[#4a5568] leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Licenses */}
          <section className="mt-10 pt-8 border-t border-[#e8ecf0]">
            <h2 className="text-[16px] font-bold text-[#0a2540] mb-4">許認可・届出</h2>
            <ul className="space-y-2.5">
              {companyInfo.licenses.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] text-[#4a5568] leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Banks */}
          <section className="mt-10 pt-8 border-t border-[#e8ecf0]">
            <h2 className="text-[16px] font-bold text-[#0a2540] mb-4">取引銀行</h2>
            <ul className="space-y-2.5">
              {companyInfo.banks.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] text-[#4a5568] leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Mission */}
          <section className="mt-10 pt-8 border-t border-[#e8ecf0]">
            <p className="text-[11px] font-bold text-emerald-500 tracking-widest mb-2">{mission.title}</p>
            <h2 className="text-[18px] font-bold text-[#0a2540] mb-3">{mission.heading}</h2>
            <p className="text-[13px] text-[#4a5568] leading-relaxed">{mission.description}</p>
          </section>

          {/* Vision */}
          <section className="mt-10 pt-8 border-t border-[#e8ecf0]">
            <p className="text-[11px] font-bold text-emerald-500 tracking-widest mb-2">{vision.title}</p>
            <h2 className="text-[18px] font-bold text-[#0a2540] mb-3">{vision.heading}</h2>
            <p className="text-[13px] text-[#4a5568] leading-relaxed">{vision.description}</p>
          </section>

          {/* Values */}
          <section className="mt-10 pt-8 border-t border-[#e8ecf0]">
            <h2 className="text-[16px] font-bold text-[#0a2540] mb-5">Our Values</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <div key={i} className="rounded-xl border border-[#e8ecf0] p-5 hover:border-[#d0dbe6] transition-colors">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-50 mb-3">
                    <i className={`${v.icon} text-emerald-500 text-lg`}></i>
                  </div>
                  <h3 className="text-[14px] font-bold text-[#0a2540] mb-1.5">{v.title}</h3>
                  <p className="text-[12px] text-[#5a6a7a] leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section className="mt-10 pt-8 border-t border-[#e8ecf0]">
            <h2 className="text-[16px] font-bold text-[#0a2540] mb-6">沿革</h2>
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1.5"></div>
                    {i < timeline.length - 1 && <div className="w-px flex-1 bg-[#d8e2ec] mt-1"></div>}
                  </div>
                  <div className={`pb-6 ${i === timeline.length - 1 ? 'pb-0' : ''}`}>
                    <span className="text-[12px] font-bold text-emerald-500">{item.year}</span>
                    <p className="text-[13px] text-[#4a5568] leading-relaxed mt-0.5">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Officers */}
          <section className="mt-10 pt-8 border-t border-[#e8ecf0]">
            <h2 className="text-[16px] font-bold text-[#0a2540] mb-5">役員紹介</h2>
            <div className="space-y-4">
              {officers.map((officer, i) => (
                <div key={i} className="rounded-xl border border-[#e8ecf0] p-5 hover:border-[#d0dbe6] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <i className="ri-user-3-line text-emerald-500 text-xl"></i>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#7a8a9a] font-bold tracking-wider mb-0.5">{officer.role}</p>
                      <h3 className="text-[15px] font-bold text-[#0a2540] mb-1.5">{officer.name}</h3>
                      <p className="text-[12px] text-[#5a6a7a] leading-relaxed">{officer.description}</p>
                    </div>
                  </div>
                </div>
              ))}
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