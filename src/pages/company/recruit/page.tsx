import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { culture, jobOpenings, JobOpening } from '@/mocks/companyRecruit';

const departmentFilters = ['すべて', 'プロダクト開発部', 'マーケティング部'];

export default function CompanyRecruitPage() {
  const [activeDept, setActiveDept] = useState('すべて');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  useEffect(() => {
    document.title = '採用情報 | MobileWash';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'MobileWash株式会社の採用情報。エンジニア・マーケティングの採用ポジション、会社の文化、福利厚生。出張洗車・出張コーティングのスタートアップで新しいカーケア体験を一緒に創りませんか。');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://mobilewash.app/company/recruit');
    window.scrollTo(0, 0);
    return () => {
      document.title = 'MobileWash | 出張洗車・出張コーティングアプリ 全国47都道府県対応';
    };
  }, []);

  const filteredJobs = activeDept === 'すべて'
    ? jobOpenings
    : jobOpenings.filter((j) => j.department === activeDept);

  const toggleJob = (id: string) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

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
            <span className="text-white/70">採用情報</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">採用情報</h1>
          <p className="text-[14px] text-white/55 leading-relaxed max-w-2xl">
            一緒にカーディテイリング業界の未来をつくりませんか？テクノロジー×カーケアで、まったく新しい体験を。
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-10 -mt-6">
        <div className="bg-white rounded-2xl border border-[#e8ecf0] p-6 sm:p-8 lg:p-10 shadow-sm">

          {/* Culture Section */}
          <section>
            <p className="text-[11px] font-bold text-emerald-500 tracking-widest mb-2">{culture.title}</p>
            <h2 className="text-[18px] font-bold text-[#0a2540] mb-3">{culture.heading}</h2>
            <p className="text-[13px] text-[#4a5568] leading-relaxed mb-6">{culture.description}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {culture.features.map((f, i) => (
                <div key={i} className="rounded-xl border border-[#e8ecf0] p-4 hover:border-[#d0dbe6] transition-colors">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-emerald-50 mb-2.5">
                    <i className={`${f.icon} text-emerald-500 text-base`}></i>
                  </div>
                  <h3 className="text-[13px] font-bold text-[#0a2540] mb-1">{f.title}</h3>
                  <p className="text-[11px] text-[#5a6a7a] leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Job Openings */}
          <section className="mt-10 pt-8 border-t border-[#e8ecf0]">
            <h2 className="text-[16px] font-bold text-[#0a2540] mb-5">募集中のポジション</h2>

            {/* Department Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {departmentFilters.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDept(dept)}
                  className={`text-[12px] font-bold px-4 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                    activeDept === dept
                      ? 'bg-[#0a1628] text-white'
                      : 'bg-[#f0f4f8] text-[#5a6a7a] hover:bg-[#e4eaf2]'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Jobs List */}
            <div className="space-y-3">
              {filteredJobs.map((job: JobOpening) => {
                const isExpanded = expandedJob === job.id;
                return (
                  <div key={job.id} className="rounded-xl border border-[#e8ecf0] overflow-hidden transition-colors hover:border-[#d0dbe6]">
                    <button
                      onClick={() => toggleJob(job.id)}
                      className="w-full text-left p-5 flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                            job.type === '正社員' ? 'bg-emerald-50 text-emerald-600' :
                            job.type === 'インターン' ? 'bg-violet-50 text-violet-600' :
                            'bg-amber-50 text-amber-600'
                          }`}>
                            {job.type}
                          </span>
                          <span className="text-[11px] text-[#7a8a9a]">{job.department}</span>
                        </div>
                        <h3 className="text-[15px] font-bold text-[#0a2540]">{job.title}</h3>
                        <p className="text-[12px] text-[#7a8a9a] mt-1">{job.location}</p>
                      </div>
                      <div className="w-6 h-6 flex items-center justify-center shrink-0">
                        {isExpanded ? (
                          <i className="ri-arrow-up-s-line text-[#7a8a9a] text-lg"></i>
                        ) : (
                          <i className="ri-arrow-down-s-line text-[#7a8a9a] text-lg"></i>
                        )}
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-[#e8ecf0] pt-5 space-y-5">
                        <div>
                          <p className="text-[13px] text-[#4a5568] leading-relaxed">{job.description}</p>
                        </div>
                        <div>
                          <h4 className="text-[12px] font-bold text-[#0a2540] mb-2">必須要件</h4>
                          <ul className="space-y-1.5">
                            {job.requirements.map((req, i) => (
                              <li key={i} className="flex items-start gap-2 text-[12px] text-[#5a6a7a] leading-relaxed">
                                <div className="w-1 h-1 rounded-full bg-[#0a2540] mt-2 shrink-0"></div>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {job.preferred.length > 0 && (
                          <div>
                            <h4 className="text-[12px] font-bold text-[#0a2540] mb-2">歓迎要件</h4>
                            <ul className="space-y-1.5">
                              {job.preferred.map((pref, i) => (
                                <li key={i} className="flex items-start gap-2 text-[12px] text-[#5a6a7a] leading-relaxed">
                                  <div className="w-1 h-1 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                                  {pref}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="grid sm:grid-cols-2 gap-4 bg-[#f8fafb] rounded-xl p-4">
                          <div>
                            <p className="text-[11px] text-[#7a8a9a] font-bold mb-0.5">給与</p>
                            <p className="text-[13px] text-[#0a2540] font-bold">{job.salary}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-[#7a8a9a] font-bold mb-0.5">勤務時間</p>
                            <p className="text-[13px] text-[#0a2540]">{job.hours}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-[12px] font-bold text-[#0a2540] mb-2">福利厚生</h4>
                          <div className="flex flex-wrap gap-2">
                            {job.benefits.map((benefit, i) => (
                              <span key={i} className="text-[11px] bg-[#f0f4f8] text-[#5a6a7a] px-3 py-1 rounded-full">
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="pt-2">
                          <p className="text-[12px] text-[#7a8a9a] mb-3">
                            ご応募は下記メールアドレスまで、履歴書・職務経歴書を添付の上お送りください。
                          </p>
                          <a
                            href="mailto:info@holy-inc.jp"
                            className="inline-flex items-center gap-2 bg-[#0a1628] text-white font-bold px-5 py-2.5 rounded-full text-[12px] hover:bg-[#1a3658] transition-colors cursor-pointer whitespace-nowrap"
                          >
                            <i className="ri-mail-send-line text-sm"></i>
                            info@holy-inc.jp に応募する
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <div className="w-14 h-14 flex items-center justify-center mx-auto mb-4 rounded-full bg-[#f0f4f8]">
                  <i className="ri-briefcase-line text-[#7a8a9a] text-2xl"></i>
                </div>
                <p className="text-[13px] text-[#7a8a9a]">現在募集中のポジションはありません</p>
                <p className="text-[12px] text-[#a0aab4] mt-1">採用に関するお問い合わせ：info@holy-inc.jp</p>
              </div>
            )}
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