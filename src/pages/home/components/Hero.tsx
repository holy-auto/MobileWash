import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CountdownBadge from './CountdownBadge';
import { CAMPFIRE_URL } from '@/constants';

const BG_IMAGE = 'https://readdy.ai/api/search-image?query=A%20professional%20car%20detailer%20in%20a%20clean%20uniform%20carefully%20hand%20washing%20a%20sleek%20black%20luxury%20sedan%20in%20a%20modern%20residential%20driveway%20at%20golden%20hour%2C%20warm%20sunlight%20reflecting%20off%20the%20perfectly%20clean%20car%20surface%2C%20water%20droplets%20glistening%2C%20lush%20green%20suburban%20background%2C%20cinematic%20wide%20shot%2C%20premium%20lifestyle%20photography%2C%20deep%20rich%20colors%2C%20dramatic%20lighting&width=1600&height=900&seq=hero-bg-1&orientation=landscape';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = BG_IMAGE;
    img.onload = () => setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[100vh] flex flex-col overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={BG_IMAGE}
          alt="MobileWash 出張洗車"
          className={`w-full h-full object-cover object-top transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
        {/* Gradient overlay — left-heavy for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020f1e]/85 via-[#020f1e]/60 to-[#020f1e]/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020f1e]/60 via-transparent to-[#020f1e]/30"></div>
      </div>

      {/* News bar */}
      <div className="relative z-10 pt-[92px] md:pt-[110px] lg:pt-[130px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 mb-8 md:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-3 border-b border-white/15">
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#00b4ff]">NEWS</span>
              <span className="text-[11px] text-white/50">お知らせ</span>
            </div>
            <div className="flex-1 flex items-center gap-3 text-[13px] overflow-x-auto scrollbar-hide">
              <time className="text-white/60 shrink-0 tabular-nums">2026.04.21</time>
              <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00b4ff]/20 text-[#00b4ff]">プレス</span>
              <span className="text-white/80 truncate">MobileWashのコーポレートサイト・先行登録ページを公開しました。</span>
            </div>
            <a href="#" className="text-[12px] text-[#00b4ff] font-bold hover:underline shrink-0 cursor-pointer whitespace-nowrap">お知らせ一覧</a>
          </div>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 pb-12 md:pb-20 lg:pb-28">
          <div className="grid lg:grid-cols-12 gap-6 md:gap-10 lg:gap-16 items-center">

            {/* Left — text */}
            <div className="lg:col-span-6 xl:col-span-5">
              {/* Crowdfunding countdown */}
              <div className="mb-5 md:mb-6">
                <CountdownBadge />
              </div>

              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] md:text-[11px] font-bold px-3 py-1.5 rounded-full mb-5 md:mb-7">
                <span className="w-1.5 h-1.5 bg-[#00b4ff] rounded-full animate-pulse"></span>
                出張洗車アプリ / 2026年Q3 正式ローンチ予定
              </div>

              <h1 className="text-[32px] sm:text-[44px] lg:text-[60px] xl:text-[68px] font-bold text-white mb-5 md:mb-6 leading-[1.1]">
                <span className="text-[#00b4ff]">出張洗車</span>を、<br />
                呼ぶ時代へ。
              </h1>

              <p className="text-[14px] sm:text-[15px] lg:text-[17px] text-white/75 leading-relaxed mb-8 md:mb-10 max-w-lg">
                MobileWash は、<strong className="text-white font-bold">出張洗車・出張コーティング</strong>のプロをスマホひとつで呼べるカーディテイリングアプリ。
                GPSで近くの認定プロを自動マッチングし、ご自宅やマンションの駐車場へ<strong className="text-white font-bold">最短5分で出張</strong>します。
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <a
                  href={CAMPFIRE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#00b4ff] hover:bg-[#0099e6] text-white font-bold px-8 py-4 rounded-full transition-colors text-[15px] cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-heart-add-line"></i>
                  クラファンで応援する
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full transition-colors text-[15px] cursor-pointer whitespace-nowrap"
                >
                  サービスを見る
                </a>
              </div>

              {/* Stats row */}
              <dl className="flex flex-wrap items-center gap-x-6 md:gap-x-8 gap-y-4 pt-6 md:pt-7 border-t border-white/15">
                <div>
                  <dt className="text-[10px] md:text-[11px] text-white/50 font-bold tracking-widest mb-1">ローンチ予定</dt>
                  <dd className="text-xl md:text-2xl lg:text-[28px] font-bold text-white leading-none">2026年Q3</dd>
                </div>
                <div className="w-px h-9 bg-white/15 hidden sm:block"></div>
                <div>
                  <dt className="text-[10px] md:text-[11px] text-white/50 font-bold tracking-widest mb-1">対応予定エリア</dt>
                  <dd className="text-xl md:text-2xl lg:text-[28px] font-bold text-white leading-none tabular-nums">
                    47<span className="text-sm text-[#00b4ff] ml-1 font-bold">都道府県</span>
                  </dd>
                </div>
                <div className="w-px h-9 bg-white/15 hidden sm:block"></div>
                <div>
                  <dt className="text-[10px] md:text-[11px] text-white/50 font-bold tracking-widest mb-1 inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#00d4a0] rounded-full animate-pulse"></span>
                    先行登録特典
                  </dt>
                  <dd className="text-xl md:text-2xl lg:text-[28px] font-bold text-[#00b4ff] leading-none">¥1,500 OFF</dd>
                </div>
              </dl>
            </div>

            {/* Right — App mockup */}
            <div className="lg:col-span-6 xl:col-span-7 flex justify-center lg:justify-end mt-6 md:mt-0">
              <div className="relative">
                {/* Floating badge top */}
                <div className="absolute -top-6 sm:-top-8 left-0 sm:-left-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-3 sm:px-4 py-2 sm:py-3 z-20">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#00b4ff]/20 rounded-full flex items-center justify-center">
                      <i className="ri-map-pin-line text-[#00b4ff] text-xs sm:text-sm"></i>
                    </div>
                    <div>
                      <p className="text-[9px] sm:text-[10px] text-white/60 font-bold leading-tight">プロが向かいます(イメージ)</p>
                      <p className="text-[11px] sm:text-[13px] font-bold text-white leading-tight mt-0.5">最短5分で出張</p>
                    </div>
                  </div>
                </div>

                {/* Floating badge bottom */}
                <div className="absolute -bottom-2 sm:-bottom-4 right-0 sm:-right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-3 sm:px-4 py-2 sm:py-3 z-20">
                  <p className="text-[9px] sm:text-[10px] text-white/60 font-bold leading-tight">先行登録特典</p>
                  <p className="text-sm sm:text-base font-bold text-[#00b4ff] leading-tight mt-0.5">¥1,500 OFF</p>
                </div>

                {/* Phone frame */}
                <div className="relative w-[240px] sm:w-[260px] md:w-[290px] h-[480px] sm:h-[530px] md:h-[580px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-[2.5rem] p-3">
                  <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative flex flex-col">
                    {/* App header */}
                    <div className="bg-white border-b border-[#e4eef7] px-4 py-3 flex items-center gap-2 shrink-0">
                      <img
                        src="https://storage.readdy-site.link/project_files/c40f971a-8995-4350-8e33-e7b8168d5850/60df7e55-3821-4161-a8bd-e386660f21ef_mobile_wash_app_icon.png?v=1a084e8094f7ad1f039da984d9cffe58"
                        alt="MobileWash"
                        className="w-6 h-6 rounded-md object-cover"
                      />
                      <span className="text-[#0a2540] font-bold text-[13px]">MobileWash</span>
                      <span className="ml-auto text-[9px] font-bold text-[#0a8f7c] bg-[#e6fbf7] px-1.5 py-0.5 rounded-full">β</span>
                    </div>

                    {/* App hero image */}
                    <div className="relative h-[140px] shrink-0 overflow-hidden">
                      <img
                        src="https://readdy.ai/api/search-image?query=A%20professional%20car%20detailer%20polishing%20a%20shiny%20black%20car%20hood%20with%20a%20machine%20polisher%2C%20sparkling%20clean%20surface%2C%20warm%20golden%20light%2C%20close-up%20detail%20shot%2C%20premium%20automotive%20detailing%20photography&width=580&height=280&seq=app-hero-img&orientation=landscape"
                        alt="施工イメージ"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/60 to-transparent"></div>
                      <div className="absolute bottom-3 left-4">
                        <p className="text-[11px] text-white/70 font-bold mb-0.5">画面イメージ</p>
                        <p className="text-white font-bold text-sm leading-tight">
                          今日も愛車を、<span className="text-[#00b4ff]">ピカピカ</span>に。
                        </p>
                      </div>
                    </div>

                    {/* App content */}
                    <div className="px-3 pt-3 flex-1 overflow-hidden">
                      <div className="bg-white rounded-2xl border border-[#e4eef7] p-3 mb-3">
                        <p className="text-[10px] text-[#8ba0ba] mb-2 font-bold">サービスメニュー</p>
                        <div className="grid grid-cols-4 gap-2">
                          {['手洗い', '内装', 'コート', '磨き'].map((label) => (
                            <div key={label} className="flex flex-col items-center gap-1">
                              <div className="w-9 h-9 rounded-xl bg-[#f0f9ff] flex items-center justify-center">
                                <div className="w-3 h-3 bg-[#0099e6] rounded-full"></div>
                              </div>
                              <span className="text-[8px] text-[#5a7090] font-medium">{label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <p className="text-[10px] text-[#8ba0ba] mb-2 font-bold">
                        近くの出張プロ <span className="text-[#0a8f7c]">(β版イメージ)</span>
                      </p>
                      {[
                        { name: 'プロA', time: '約5分' },
                        { name: 'プロB', time: '約7分' },
                      ].map((pro) => (
                        <div key={pro.name} className="bg-white border border-[#e4eef7] rounded-xl p-2.5 mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 bg-[#e6f4ff] rounded-full flex items-center justify-center">
                              <i className="ri-user-line text-[#0099e6] text-sm"></i>
                            </div>
                            <div>
                              <p className="text-[11px] font-bold text-[#0a2540]">{pro.name}</p>
                              <p className="text-[9px] text-[#5a7090]">レビュー準備中</p>
                            </div>
                          </div>
                          <span className="text-[10px] text-[#0099e6] font-bold bg-[#e6f4ff] px-2 py-0.5 rounded-full">{pro.time}</span>
                        </div>
                      ))}
                    </div>

                    {/* App bottom nav */}
                    <div className="bg-white border-t border-[#e4eef7] flex justify-around py-2.5 shrink-0">
                      {['ホーム', '予約', '履歴', '設定'].map((item, i) => (
                        <span key={item} className={`text-[9px] font-bold ${i === 0 ? 'text-[#0099e6]' : 'text-[#8ba0ba]'}`}>{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
    </section>
  );
}