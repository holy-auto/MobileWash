import { useState, useEffect, useCallback, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useSwipe } from '@/hooks/useSwipe';

const FEATURES = [
  {
    id: 'gps',
    icon: 'ri-map-pin-2-line',
    tag: 'GPS マッチング',
    title: 'GPSで近くのプロを自動マッチング',
    shortTitle: 'GPSマッチング',
    desc: '現在地から最も近いオンラインプロを自動で検索。到着予想時間もリアルタイムで確認できます。',
    stat: { value: '最短5分', label: '到着時間' },
    points: ['リアルタイムGPS追跡', '到着5分前に通知', '全国47都道府県対応予定'],
    color: '#00b4ff',
    image: 'https://readdy.ai/api/search-image?query=aerial%20view%20of%20a%20clean%20modern%20city%20neighborhood%20with%20streets%20and%20parking%20lots%20from%20above%2C%20soft%20blue%20tones%2C%20minimal%20clean%20look%2C%20top%20down%20perspective%2C%20urban%20map%20style%20illustration&width=900&height=600&seq=feat-gps2&orientation=landscape',
  },
  {
    id: 'price',
    icon: 'ri-price-tag-3-line',
    tag: '明朗会計',
    title: '追加料金ゼロ、事前確定価格',
    shortTitle: '明朗会計',
    desc: '予約時に最終金額が確定。施工後に追加請求されることは一切ありません。出張費込みの固定価格で安心です。',
    stat: { value: '¥0', label: '追加料金' },
    points: ['予約時に料金確定', '出張費込みの固定価格', '車種・サイズで自動計算'],
    color: '#10b981',
    image: 'https://readdy.ai/api/search-image?query=close%20up%20of%20a%20smartphone%20screen%20showing%20a%20clean%20minimal%20payment%20app%20interface%20with%20price%20confirmation%2C%20soft%20green%20light%2C%20modern%20design%2C%20blurred%20background&width=900&height=600&seq=feat-price2&orientation=landscape',
  },
  {
    id: 'pro',
    icon: 'ri-user-star-line',
    tag: '認定プロ',
    title: '審査通過の認定プロのみ稼働',
    shortTitle: '認定プロ',
    desc: '技能審査・身元確認・接客研修を通過したプロだけが稼働。施工中の保険補償も完備しています。',
    stat: { value: '4.9★', label: '平均評価' },
    points: ['3段階の審査プロセス', '施工中の損害保険完備', 'ユーザー評価で品質管理'],
    color: '#f59e0b',
    image: 'https://readdy.ai/api/search-image?query=professional%20car%20detailing%20expert%20in%20uniform%20carefully%20washing%20a%20luxury%20car%20in%20a%20parking%20lot%2C%20golden%20hour%20light%2C%20high%20quality%20professional%20service%2C%20clean%20background&width=900&height=600&seq=feat-pro2&orientation=landscape',
  },
  {
    id: 'guarantee',
    icon: 'ri-shield-check-line',
    tag: '全額返金保証',
    title: '満足できなければ全額返金保証',
    shortTitle: '返金保証',
    desc: '仕上がりに不満なら24時間以内に無料再施工。それでも解決しない場合は全額返金します。',
    stat: { value: '100%', label: '返金保証' },
    points: ['24時間以内に無料再施工', '解決しない場合は全額返金', 'クレーム対応チーム常駐'],
    color: '#8b5cf6',
    image: 'https://readdy.ai/api/search-image?query=sparkling%20clean%20car%20after%20professional%20detailing%20service%2C%20water%20droplets%20on%20shiny%20surface%2C%20dramatic%20lighting%2C%20luxury%20car%20exterior%20close%20up%2C%20high%20quality%20finish&width=900&height=600&seq=feat-guarantee2&orientation=landscape',
  },
  {
    id: 'payment',
    icon: 'ri-bank-card-line',
    tag: 'キャッシュレス',
    title: 'アプリで完結、キャッシュレス決済',
    shortTitle: 'キャッシュレス',
    desc: 'クレカ・Apple Pay・Google Pay・PayPayに対応。電子レシートも自動発行されます。',
    stat: { value: '6種', label: '決済方法' },
    points: ['Apple Pay / Google Pay', 'PayPay / d払い対応', '法人請求書払いも可能'],
    color: '#ec4899',
    image: 'https://readdy.ai/api/search-image?query=hand%20holding%20smartphone%20with%20contactless%20payment%20app%2C%20clean%20white%20background%2C%20modern%20minimal%20design%2C%20soft%20pink%20light%2C%20digital%20payment%20concept&width=900&height=600&seq=feat-pay2&orientation=landscape',
  },
  {
    id: 'schedule',
    icon: 'ri-calendar-check-line',
    tag: '柔軟な予約',
    title: '今すぐも事前予約もOK',
    shortTitle: '柔軟予約',
    desc: '「来週末の朝」も「今すぐ」も。お客様のスケジュールに合わせて柔軟に対応します。',
    stat: { value: '24/7', label: '予約受付' },
    points: ['当日・即日対応可能', '最大30日先まで予約', 'キャンセル無料（24時間前まで）'],
    color: '#06b6d4',
    image: 'https://readdy.ai/api/search-image?query=clean%20minimal%20calendar%20app%20on%20smartphone%20screen%20showing%20booking%20schedule%2C%20soft%20cyan%20blue%20tones%2C%20modern%20UI%20design%2C%20white%20background%2C%20scheduling%20concept&width=900&height=600&seq=feat-sched2&orientation=landscape',
  },
];

const AUTO_ROTATE_INTERVAL = 5000;

export default function Features() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const heading = useScrollAnimation({ threshold: 0.1 });

  const goTo = useCallback((index: number) => {
    if (index === activeIndex || isTransitioning) return;
    setIsTransitioning(true);
    setProgress(0);
    setActiveIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [activeIndex, isTransitioning]);

  const next = useCallback(() => {
    goTo((activeIndex + 1) % FEATURES.length);
  }, [activeIndex, goTo]);

  const prev = useCallback(() => {
    goTo((activeIndex - 1 + FEATURES.length) % FEATURES.length);
  }, [activeIndex, goTo]);

  // Swipe handlers
  const { elementRef, touchHandlers } = useSwipe({
    onSwipeLeft: () => { setIsAutoPlay(false); next(); },
    onSwipeRight: () => { setIsAutoPlay(false); prev(); },
    threshold: 40,
  });

  // Auto rotate
  useEffect(() => {
    if (!isAutoPlay) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }

    setProgress(0);
    if (progressRef.current) clearInterval(progressRef.current);
    progressRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 100;
        return p + 100 / (AUTO_ROTATE_INTERVAL / 50);
      });
    }, 50);

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      next();
    }, AUTO_ROTATE_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isAutoPlay, next, activeIndex]);

  const activeFeature = FEATURES[activeIndex];

  return (
    <section id="features" className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div
          ref={heading.ref}
          className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 anim-fade-up ${heading.isVisible ? 'is-visible' : ''}`}
        >
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#00b4ff] mb-4">Features</p>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#0a2540] mb-4 leading-tight">
              MobileWashが選ばれる<br className="hidden sm:inline" />
              <span className="text-[#00b4ff]">6つの理由</span>
            </h2>
            <p className="text-[15px] text-[#5a7090] leading-relaxed max-w-xl">
              スマホひとつで、出張洗車・出張コーティングのプロをあなたの元へ。
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00b4ff] to-[#00d4b8] border-2 border-white flex items-center justify-center">
                  <i className="ri-star-fill text-white text-[9px]"></i>
                </div>
              ))}
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#0a2540]">2026年Q3</p>
              <p className="text-[11px] text-[#5a7090]">正式ローンチ予定</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {FEATURES.map((f, i) => (
              <button
                key={f.id}
                onClick={() => {
                  setIsAutoPlay(false);
                  goTo(i);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0 ${
                  i === activeIndex
                    ? 'text-white shadow-lg'
                    : 'bg-[#f0f4f8] text-[#5a7090] hover:bg-[#e4eef7] hover:text-[#0a2540]'
                }`}
                style={i === activeIndex ? { backgroundColor: activeFeature.color } : {}}
              >
                <i className={`${f.icon} text-sm`}></i>
                <span className="hidden sm:inline">{f.shortTitle}</span>
                <span className="sm:hidden">{f.tag}</span>
              </button>
            ))}
            {/* Play/Pause */}
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="w-9 h-9 rounded-full bg-[#f0f4f8] hover:bg-[#e4eef7] flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-1"
              aria-label={isAutoPlay ? '自動再生を停止' : '自動再生を開始'}
            >
              <i className={`${isAutoPlay ? 'ri-pause-line' : 'ri-play-line'} text-[#5a7090] text-sm`}></i>
            </button>
          </div>
          {/* Progress bar */}
          <div className="h-[3px] bg-[#f0f4f8] rounded-full mt-3 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-100 ease-linear"
              style={{
                width: `${isAutoPlay ? progress : 0}%`,
                backgroundColor: activeFeature.color,
              }}
            />
          </div>
        </div>

        {/* Main Showcase — with swipe support */}
        <div
          ref={elementRef}
          {...touchHandlers}
          className="relative rounded-3xl overflow-hidden bg-[#0a2540] min-h-[400px] sm:min-h-[480px] lg:min-h-[540px] touch-pan-y"
        >
          {/* Swipe hint for mobile */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 md:hidden">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm text-white/70 text-[10px] font-bold px-3 py-1.5 rounded-full pointer-events-none">
              <i className="ri-arrow-left-right-line text-xs"></i>
              スワイプで切り替え
            </div>
          </div>

          {/* Background Images with Crossfade */}
          {FEATURES.map((f, i) => (
            <div
              key={f.id}
              className="absolute inset-0 transition-opacity duration-600 ease-in-out"
              style={{
                opacity: i === activeIndex ? 1 : 0,
                zIndex: i === activeIndex ? 1 : 0,
              }}
            >
              <img
                src={f.image}
                alt={f.title}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a2540]/90 via-[#0a2540]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/70 via-transparent to-transparent" />
            </div>
          ))}

          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row h-full min-h-[400px] sm:min-h-[480px] lg:min-h-[540px]">
            {/* Left: Info */}
            <div className="flex-1 p-5 sm:p-8 lg:p-12 flex flex-col justify-center">
              <div
                className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
              >
                {/* Tag */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold text-white mb-5 backdrop-blur-sm"
                  style={{ backgroundColor: `${activeFeature.color}cc` }}
                >
                  <i className={`${activeFeature.icon}`}></i>
                  {activeFeature.tag}
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl lg:text-[36px] font-bold text-white leading-snug mb-3 sm:mb-4">
                  {activeFeature.title}
                </h3>

                {/* Desc */}
                <p className="text-[14px] sm:text-[15px] text-white/80 leading-relaxed mb-5 sm:mb-6 max-w-lg">
                  {activeFeature.desc}
                </p>

                {/* Points */}
                <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                  {activeFeature.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-3 text-[14px] text-white/90">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${activeFeature.color}40` }}
                      >
                        <i className="ri-check-line text-white text-[10px]"></i>
                      </div>
                      {pt}
                    </li>
                  ))}
                </ul>

                {/* Stat + CTA */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <div
                    className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl"
                    style={{ backgroundColor: `${activeFeature.color}20` }}
                  >
                    <p className="text-lg sm:text-[22px] font-bold text-white">{activeFeature.stat.value}</p>
                    <p className="text-[10px] sm:text-[11px] text-white/70">{activeFeature.stat.label}</p>
                  </div>
                  <a
                    href="#cta"
                    className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-[#0a2540] font-bold px-6 py-3 rounded-full transition-colors text-[14px] cursor-pointer whitespace-nowrap"
                  >
                    この機能を体験する
                    <i className="ri-arrow-right-line text-sm"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Visual indicator / decorative */}
            <div className="hidden lg:flex flex-col justify-end p-12 items-end">
              <div
                className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
              >
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${activeFeature.color}30` }}
                >
                  <i className={`${activeFeature.icon} text-3xl text-white`}></i>
                </div>
                <p className="text-[11px] text-white/50 font-mono">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(FEATURES.length).padStart(2, '0')}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => { setIsAutoPlay(false); prev(); }}
            className="absolute left-2 sm:left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors cursor-pointer"
            aria-label="前へ"
          >
            <i className="ri-arrow-left-s-line text-white text-base sm:text-lg"></i>
          </button>
          <button
            onClick={() => { setIsAutoPlay(false); next(); }}
            className="absolute right-2 sm:right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors cursor-pointer"
            aria-label="次へ"
          >
            <i className="ri-arrow-right-s-line text-white text-base sm:text-lg"></i>
          </button>

          {/* Bottom dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {FEATURES.map((f, i) => (
              <button
                key={f.id}
                onClick={() => { setIsAutoPlay(false); goTo(i); }}
                className="cursor-pointer transition-all duration-300"
                aria-label={`${f.shortTitle}へ移動`}
              >
                <div
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIndex ? 28 : 8,
                    height: 8,
                    backgroundColor: i === activeIndex ? activeFeature.color : 'rgba(255,255,255,0.35)',
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Feature mini cards below */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {FEATURES.map((f, i) => (
            <button
              key={f.id}
              onClick={() => { setIsAutoPlay(false); goTo(i); }}
              onMouseEnter={() => { if (!isAutoPlay) goTo(i); }}
              className={`relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 ${
                i === activeIndex ? 'ring-2 ring-offset-2' : 'opacity-70 hover:opacity-100'
              }`}
              style={i === activeIndex ? ({ '--tw-ring-color': f.color } as React.CSSProperties) : {}}
            >
              <div className="aspect-[4/3]">
                <img
                  src={f.image}
                  alt={f.shortTitle}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 transition-colors duration-300 ${
                  i === activeIndex ? 'bg-black/40' : 'bg-black/50 group-hover:bg-black/40'
                }`} />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                <i className={`${f.icon} text-white text-lg mb-1`}></i>
                <p className="text-[11px] font-bold text-white text-center leading-tight">{f.shortTitle}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-10">
          <div className="bg-[#f7fafd] rounded-2xl border border-[#e4eef7] p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#00b4ff] to-[#00d4b8] shrink-0">
                <i className="ri-rocket-line text-white text-xl"></i>
              </div>
              <div>
                <p className="text-[15px] font-bold text-[#0a2540]">
                  6つの強みを、今すぐ体験しよう
                </p>
                <p className="text-[13px] text-[#5a7090] mt-0.5">
                  先行登録で¥1,500 OFFクーポン＋優先予約権をプレゼント
                </p>
              </div>
            </div>
            <a
              href="#cta"
              className="inline-flex items-center gap-2 bg-[#0a2540] hover:bg-[#1a3a5c] text-white font-bold px-6 py-3 rounded-full transition-colors text-[14px] cursor-pointer whitespace-nowrap shrink-0"
            >
              <i className="ri-gift-line"></i>
              無料で先行登録する
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}