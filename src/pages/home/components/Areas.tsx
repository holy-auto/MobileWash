import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useSwipe } from '@/hooks/useSwipe';

interface Area {
  id: string;
  region: string;
  regionEn: string;
  prefs: string[];
  active: boolean;
  proCount: number;
  color: string;
  photo: string;
  cities: string[];
  description: string;
}

const areas: Area[] = [
  {
    id: 'tokyo',
    region: '首都圏',
    regionEn: 'Tokyo Metro',
    prefs: ['東京都', '神奈川県', '埼玉県', '千葉県'],
    active: true,
    proCount: 0,
    color: '#0099e6',
    photo: 'https://readdy.ai/api/search-image?query=Tokyo%20cityscape%20at%20dusk%20with%20illuminated%20Tokyo%20Tower%20and%20modern%20skyscrapers%2C%20warm%20orange%20and%20blue%20twilight%20sky%2C%20urban%20panorama%2C%20highly%20detailed%20cinematic%20photography%2C%20clean%20modern%20Japanese%20city%20view&width=900&height=700&seq=area-tokyo-01&orientation=landscape',
    cities: ['新宿', '渋谷', '銀座', '六本木', '横浜みなとみらい', '浦和'],
    description: '日本最大のサービスエリア。新宿・渋谷・銀座など主要商業地を中心に、プロの募集を進めています。',
  },
  {
    id: 'kansai',
    region: '関西圏',
    regionEn: 'Kansai',
    prefs: ['大阪府', '京都府', '兵庫県', '奈良県'],
    active: true,
    proCount: 0,
    color: '#0099e6',
    photo: 'https://readdy.ai/api/search-image?query=Osaka%20city%20skyline%20at%20night%20with%20glowing%20neon%20signs%2C%20Dotonbori%20canal%20reflection%2C%20vibrant%20urban%20atmosphere%2C%20modern%20Japanese%20cityscape%2C%20warm%20colorful%20lights%2C%20cinematic%20photography%20style&width=900&height=700&seq=area-kansai-01&orientation=landscape',
    cities: ['梅田', '難波', '心斎橋', '京都駅周辺', '三宮', '奈良公園周辺'],
    description: '関西の経済・文化の中心。大阪・京都・神戸でプロを募集中です。',
  },
  {
    id: 'chubu',
    region: '中部・東海',
    regionEn: 'Chubu',
    prefs: ['愛知県', '静岡県', '岐阜県', '三重県'],
    active: true,
    proCount: 0,
    color: '#0099e6',
    photo: 'https://readdy.ai/api/search-image?query=Nagoya%20cityscape%20featuring%20Nagoya%20Castle%20with%20modern%20city%20buildings%20in%20background%2C%20clean%20blue%20sky%2C%20Japanese%20urban%20landscape%2C%20wide%20angle%20view%2C%20professional%20photography%2C%20warm%20daylight&width=900&height=700&seq=area-nagoya-01&orientation=landscape',
    cities: ['名古屋駅', '栄', '浜松', '静岡', '岐阜'],
    description: '自動車産業の拠点である愛知県を中心に、東海エリアでプロを募集中。',
  },
  {
    id: 'kitakanto',
    region: '北関東',
    regionEn: 'Kita-Kanto',
    prefs: ['茨城県', '栃木県', '群馬県'],
    active: true,
    proCount: 0,
    color: '#0099e6',
    photo: 'https://readdy.ai/api/search-image?query=Japanese%20countryside%20landscape%20with%20rice%20fields%20and%20distant%20mountains%2C%20clean%20blue%20sky%2C%20rural%20Japan%20scenery%2C%20Tochigi%20or%20Gunma%20prefecture%20style%2C%20peaceful%20pastoral%20view%2C%20golden%20hour%20lighting%2C%20wide%20angle&width=900&height=700&seq=area-kitakanto-01&orientation=landscape',
    cities: ['水戸', '宇都宮', '前橋', '高崎'],
    description: '首都圏に隣接する北関東エリア。プロの募集を開始しました。',
  },
  {
    id: 'kyushu',
    region: '九州',
    regionEn: 'Kyushu',
    prefs: ['福岡県', '熊本県', '鹿児島県'],
    active: false,
    proCount: 0,
    color: '#94a3b8',
    photo: 'https://readdy.ai/api/search-image?query=Fukuoka%20city%20skyline%20at%20sunset%20with%20modern%20buildings%20and%20Yatai%20food%20stalls%20by%20the%20river%2C%20warm%20golden%20light%2C%20Kyushu%20Japan%20urban%20landscape%2C%20professional%20photography%2C%20atmospheric%20mood&width=900&height=700&seq=area-kyushu-01&orientation=landscape',
    cities: ['博多', '天神', '熊本市', '鹿児島'],
    description: '2026年Q1にサービス開始予定。福岡・熊本を中心に九州エリアへの展開を準備中。',
  },
  {
    id: 'tohoku',
    region: '東北・北海道',
    regionEn: 'Tohoku & Hokkaido',
    prefs: ['北海道', '宮城県', '福島県'],
    active: false,
    proCount: 0,
    color: '#94a3b8',
    photo: 'https://readdy.ai/api/search-image?query=Sapporo%20cityscape%20with%20snow%20covered%20urban%20landscape%2C%20Hokkaido%20Japan%20winter%20scene%2C%20modern%20buildings%20with%20snow%2C%20clean%20white%20and%20blue%20atmosphere%2C%20wide%20angle%20view%2C%20professional%20photography&width=900&height=700&seq=area-hokkaido-01&orientation=landscape',
    cities: ['札幌', '仙台', '福島'],
    description: '2026年Q3を目標に東北・北海道エリアへの展開を計画中。プロの募集も並行して行っています。',
  },
  {
    id: 'chugoku',
    region: '中国・四国',
    regionEn: 'Chugoku & Shikoku',
    prefs: ['広島県', '岡山県', '香川県'],
    active: false,
    proCount: 0,
    color: '#94a3b8',
    photo: 'https://readdy.ai/api/search-image?query=Hiroshima%20cityscape%20with%20Otorii%20gate%20and%20modern%20city%20view%2C%20Seto%20Inland%20Sea%20in%20background%2C%20warm%20sunset%20colors%2C%20Chugoku%20region%20Japan%2C%20professional%20landscape%20photography%2C%20wide%20angle&width=900&height=700&seq=area-hiroshima-01&orientation=landscape',
    cities: ['広島', '岡山', '高松'],
    description: '2026年Q3に中国・四国エリアのサービス開始を計画。瀬戸内エリアのプロを募集中。',
  },
];

const roadmap = [
  { phase: 'Phase 1', period: '2025年〜', label: 'サービス開始', regions: '首都圏・関西・東海', done: true },
  { phase: 'Phase 2', period: '2026年Q1', label: '北関東・九州展開', regions: '北関東・福岡・熊本', done: true },
  { phase: 'Phase 3', period: '2026年Q3', label: '東北・中国四国', regions: '北海道・宮城・広島', done: false },
  { phase: 'Phase 4', period: '2026年末', label: '全国47都道府県', regions: '全エリア完全対応', done: false },
];

const stats = [
  { value: '4', unit: '大都市圏', label: '現在の対応予定エリア', icon: 'ri-map-pin-2-line' },
  { value: '募集中', unit: '', label: '認定プロ登録', icon: 'ri-user-star-line' },
  { value: '47', unit: '都道府県', label: '2026年末目標', icon: 'ri-flag-line' },
  { value: '最短', unit: '当日', label: '予約から施工まで（目標）', icon: 'ri-time-line' },
];

export default function Areas() {
  const [selectedArea, setSelectedArea] = useState<string>('tokyo');
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [photoKey, setPhotoKey] = useState(0);
  const heading = useScrollAnimation();
  const statsAnim = useScrollAnimation();
  const mapAnim = useScrollAnimation();
  const roadmapAnim = useScrollAnimation();

  const currentArea = areas.find((a) => a.id === selectedArea) || areas[0];
  const currentIndex = areas.findIndex((a) => a.id === selectedArea);

  // 選択変更時に写真トランジション用キーを更新
  useEffect(() => {
    setPhotoKey((k) => k + 1);
  }, [selectedArea]);

  // Swipe for area photo
  const { elementRef: photoRef, touchHandlers: photoSwipe } = useSwipe({
    onSwipeLeft: () => {
      const nextIndex = (currentIndex + 1) % areas.length;
      setSelectedArea(areas[nextIndex].id);
    },
    onSwipeRight: () => {
      const prevIndex = (currentIndex - 1 + areas.length) % areas.length;
      setSelectedArea(areas[prevIndex].id);
    },
    threshold: 40,
  });

  return (
    <section id="areas" className="py-20 sm:py-28 bg-[#f8fafd] overflow-hidden">
      {/* Header */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div
          ref={heading.ref}
          className={`text-center max-w-2xl mx-auto mb-16 anim-fade-up ${heading.isVisible ? 'is-visible' : ''}`}
        >
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#0099e6] mb-4 uppercase">Service Area</p>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0a2540] mb-5 leading-tight">
            全国へ、広がる<br className="sm:hidden" />出張洗車ネットワーク
          </h2>
          <p className="text-[15px] text-[#5a7090] leading-relaxed">
            首都圏・関西・東海を中心に急速拡大中。<br className="hidden sm:inline" />
            2026年末には全国47都道府県への完全展開を目指しています。
          </p>
        </div>

        {/* Stats Bar */}
        <div
          ref={statsAnim.ref}
          className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 stagger-children anim-fade-up ${statsAnim.isVisible ? 'is-visible' : ''}`}
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 text-center border border-[#e4eef7]">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#e6f4ff] mx-auto mb-3">
                <i className={`${s.icon} text-[#0099e6] text-lg`}></i>
              </div>
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-2xl sm:text-3xl font-black text-[#0a2540]">{s.value}</span>
                <span className="text-xs font-bold text-[#0099e6]">{s.unit}</span>
              </div>
              <p className="text-[11px] text-[#5a7090] font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div
          ref={mapAnim.ref}
          className={`mb-16 anim-fade-up ${mapAnim.isVisible ? 'is-visible' : ''}`}
        >
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left: Photo Showcase with swipe */}
            <div
              ref={photoRef}
              {...photoSwipe}
              className="lg:col-span-7 relative rounded-3xl overflow-hidden min-h-[360px] sm:min-h-[460px] lg:min-h-[560px] touch-pan-y"
            >
              {/* Swipe hint mobile */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 lg:hidden">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm text-white/70 text-[10px] font-bold px-3 py-1.5 rounded-full pointer-events-none">
                  <i className="ri-arrow-left-right-line text-xs"></i>
                  スワイプでエリア切替
                </div>
              </div>

              {/* Background Photo with transition */}
              <div className="absolute inset-0" key={photoKey}>
                <img
                  src={currentArea.photo}
                  alt={currentArea.region}
                  loading="lazy"
                  className="w-full h-full object-cover object-top animate-area-photo-in"
                />
              </div>

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/40 to-transparent"></div>

              {/* Area info overlay */}
              <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-end">
                {/* Status badge */}
                <div className="mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-full ${
                      currentArea.active
                        ? 'bg-[#0099e6] text-white'
                        : 'bg-white/20 text-white/70 backdrop-blur-sm'
                    }`}
                  >
                    {currentArea.active ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        対応中
                      </>
                    ) : (
                      <>
                        <i className="ri-time-line"></i>
                        準備中
                      </>
                    )}
                  </span>
                </div>

                {/* Region name */}
                <p className="text-[11px] font-bold tracking-[0.2em] text-white/50 mb-1 uppercase">
                  {currentArea.regionEn}
                </p>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
                  {currentArea.region}
                </h3>

                {/* Description */}
                <p className="text-[13px] text-white/70 leading-relaxed max-w-md mb-4">
                  {currentArea.description}
                </p>

                {/* Cities */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {currentArea.cities.map((city) => (
                    <span
                      key={city}
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/80 border border-white/10"
                    >
                      {city}
                    </span>
                  ))}
                </div>

                {/* Bottom info bar */}
                <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                  {currentArea.active && (
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10">
                        <i className="ri-user-star-line text-[#7dd3fc] text-sm"></i>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/45">登録プロ</p>
                        <p className="text-sm font-bold text-white">{currentArea.proCount}名</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10">
                      <i className="ri-map-pin-2-line text-[#7dd3fc] text-sm"></i>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/45">対応県数</p>
                      <p className="text-sm font-bold text-white">{currentArea.prefs.length}県</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10">
                      <i className="ri-building-line text-[#7dd3fc] text-sm"></i>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/45">対応都市</p>
                      <p className="text-sm font-bold text-white">{currentArea.cities.length}都市</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Area Selector */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {/* Section label */}
              <div className="flex items-center gap-2 mb-1 px-1">
                <i className="ri-map-pin-2-line text-[#0099e6] text-sm"></i>
                <p className="text-[11px] font-bold tracking-widest text-[#8ba0ba] uppercase">Select Area</p>
              </div>

              {areas.map((a) => {
                const isActive = selectedArea === a.id;
                const isHover = hoveredArea === a.id;
                return (
                  <button
                    key={a.id}
                    onClick={() => setSelectedArea(a.id)}
                    onMouseEnter={() => setHoveredArea(a.id)}
                    onMouseLeave={() => setHoveredArea(null)}
                    className={`w-full text-left rounded-2xl p-4 border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'border-[#0099e6] bg-white shadow-md'
                        : a.active
                          ? isHover
                            ? 'border-[#0099e6]/40 bg-[#f0f9ff]'
                            : 'border-[#e4eef7] bg-white hover:border-[#0099e6]/30'
                          : 'border-[#e4eef7] bg-white/[0.5]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {/* Color indicator */}
                        <div
                          className={`w-1 h-10 rounded-full shrink-0 transition-colors ${
                            isActive ? 'bg-[#0099e6]' : a.active ? 'bg-[#0099e6]/40' : 'bg-[#cbd5e1]'
                          }`}
                        ></div>
                        <div>
                          <p className="text-[9px] font-bold tracking-widest text-[#8ba0ba] mb-0.5 uppercase">
                            {a.regionEn}
                          </p>
                          <h4 className="text-[14px] font-bold text-[#0a2540]">{a.region}</h4>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                            a.active
                              ? 'bg-[#e6f4ff] text-[#0099e6]'
                              : 'bg-[#f0f5fa] text-[#8ba0ba]'
                          }`}
                        >
                          {a.active ? '対応中' : '準備中'}
                        </span>
                        {a.active && (
                          <span className="text-[9px] font-bold text-[#0099e6]">
                            <i className="ri-user-line mr-0.5"></i>
                            {a.proCount}名
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Expanded details when selected */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isActive ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 mt-0 opacity-0'
                      }`}
                    >
                      <div className="pl-4 border-l-2 border-[#e4eef7] ml-0.5">
                        <p className="text-[11px] text-[#5a7090] leading-relaxed mb-2">{a.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {a.prefs.map((pref) => (
                            <span
                              key={pref}
                              className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#f0f9ff] text-[#1a3658]"
                            >
                              {pref}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Expansion Roadmap */}
        <div
          ref={roadmapAnim.ref}
          className={`anim-fade-up ${roadmapAnim.isVisible ? 'is-visible' : ''}`}
        >
          <div className="bg-white rounded-3xl p-8 border border-[#e4eef7]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#e6f4ff]">
                <i className="ri-road-map-line text-[#0099e6]"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] text-[#0099e6] uppercase">Expansion Roadmap</p>
                <h3 className="text-base font-bold text-[#0a2540]">全国展開ロードマップ</h3>
              </div>
            </div>

            <div className="relative">
              {/* Connection line */}
              <div className="absolute top-5 left-5 right-5 h-0.5 bg-gradient-to-r from-[#0099e6] via-[#0099e6] to-[#e4eef7] hidden lg:block"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {roadmap.map((r, i) => (
                  <div key={r.phase} className="relative">
                    <div
                      className={`rounded-2xl p-5 border transition-all ${
                        r.done ? 'bg-white border-[#0099e6]/30' : 'bg-white border-[#e4eef7]'
                      }`}
                    >
                      {/* Phase badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className={`w-8 h-8 flex items-center justify-center rounded-full text-[11px] font-black ${
                            r.done ? 'bg-[#0099e6] text-white' : 'bg-[#e4eef7] text-[#8ba0ba]'
                          }`}
                        >
                          {i + 1}
                        </div>
                        <span
                          className={`text-[10px] font-bold ${r.done ? 'text-[#0099e6]' : 'text-[#8ba0ba]'}`}
                        >
                          {r.phase}
                        </span>
                        {r.done && (
                          <span className="ml-auto text-[9px] font-bold bg-[#e6f4ff] text-[#0099e6] px-2 py-0.5 rounded-full">
                            完了
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-bold text-[#8ba0ba] mb-1">{r.period}</p>
                      <p className="text-sm font-bold text-[#0a2540] mb-1.5">{r.label}</p>
                      <p className="text-[11px] text-[#5a7090]">{r.regions}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 bg-gradient-to-r from-[#0a2540] to-[#0d3a6e] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
              <i className="ri-map-pin-2-line text-[#7dd3fc] text-lg"></i>
            </div>
            <div>
              <p className="text-sm font-bold text-white mb-0.5">あなたのエリアは対応中？</p>
              <p className="text-[12px] text-white/60">郵便番号を入力するだけで、すぐに確認できます。</p>
            </div>
          </div>
          <a
            href="#cta"
            className="text-[13px] font-bold bg-[#0099e6] hover:bg-[#007acc] text-white px-6 py-2.5 rounded-full transition-colors whitespace-nowrap cursor-pointer inline-flex items-center gap-2"
          >
            エリアを確認する <i className="ri-arrow-right-line"></i>
          </a>
        </div>
      </div>

      {/* Photo transition keyframe */}
      <style>{`
        @keyframes area-photo-in {
          from {
            opacity: 0;
            transform: scale(1.05);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-area-photo-in {
          animation: area-photo-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </section>
  );
}