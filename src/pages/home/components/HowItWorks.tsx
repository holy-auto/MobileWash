import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useSwipe } from '@/hooks/useSwipe';

const STEPS = [
  {
    step: '01',
    icon: 'ri-download-2-line',
    title: 'アプリをダウンロード',
    desc: 'App Store / Google Play から無料ダウンロード。会員登録は約60秒で完了します。',
    time: '約60秒',
    timeIcon: 'ri-time-line',
    color: '#00b4ff',
    lightColor: '#e6f4ff',
    badge: '無料・登録簡単',
    badgeIcon: 'ri-star-line',
    points: ['クレカ登録不要', 'SNSアカウントでも登録可', 'プッシュ通知で進捗確認'],
    image: 'https://readdy.ai/api/search-image?query=a%20young%20Japanese%20man%20in%20casual%20clothes%20sitting%20in%20the%20driver%20seat%20of%20a%20modern%20car%20holding%20an%20iPhone%20with%20a%20bright%20mobile%20app%20download%20screen%20visible%2C%20clean%20modern%20car%20interior%2C%20soft%20natural%20daylight%20through%20windows%2C%20warm%20friendly%20atmosphere%2C%20realistic%20lifestyle%20photography%2C%20shallow%20depth%20of%20field%2C%20simple%20clean%20background&width=480&height=520&seq=hiw-step1-v2&orientation=portrait',
  },
  {
    step: '02',
    icon: 'ri-calendar-check-line',
    title: 'メニューと日時を選ぶ',
    desc: '出張洗車・コーティングなど、必要なメニューと希望日時をアプリで選びます。',
    time: '約2分',
    timeIcon: 'ri-time-line',
    color: '#10b981',
    lightColor: '#ecfdf5',
    badge: '最短当日予約OK',
    badgeIcon: 'ri-flashlight-line',
    points: ['6種類のメニューから選択', '車種・サイズで自動見積もり', '希望日時を自由に指定'],
    image: 'https://readdy.ai/api/search-image?query=close-up%20of%20a%20Japanese%20woman%20hand%20using%20a%20smartphone%20with%20a%20clean%20modern%20car%20service%20booking%20app%20interface%20showing%20car%20wash%20and%20coating%20menu%20options%2C%20finger%20tapping%20on%20screen%2C%20bright%20minimal%20UI%20design%2C%20clean%20white%20desk%20background%2C%20soft%20natural%20lighting%2C%20lifestyle%20photography%2C%20realistic%20and%20modern&width=480&height=520&seq=hiw-step2-v2&orientation=portrait',
  },
  {
    step: '03',
    icon: 'ri-map-pin-2-line',
    title: 'プロが出張到着',
    desc: 'GPSで近くのプロが自動マッチング。最短5分であなたの駐車場まで出張します。',
    time: '最短5分',
    timeIcon: 'ri-flashlight-line',
    color: '#f59e0b',
    lightColor: '#fffbeb',
    badge: 'リアルタイム追跡',
    badgeIcon: 'ri-map-pin-line',
    points: ['GPSでプロの位置を追跡', '到着5分前に通知', '認定プロのみ稼働'],
    image: 'https://readdy.ai/api/search-image?query=a%20professional%20Japanese%20car%20detailer%20in%20a%20clean%20uniform%20arriving%20at%20a%20residential%20apartment%20parking%20lot%20carrying%20professional%20detailing%20equipment%20and%20water%20tanks%2C%20friendly%20smile%2C%20early%20morning%20soft%20sunlight%2C%20modern%20Japanese%20residential%20setting%2C%20professional%20service%20photography%2C%20realistic%20documentary%20style%2C%20warm%20tones&width=480&height=520&seq=hiw-step3-v2&orientation=portrait',
  },
  {
    step: '04',
    icon: 'ri-check-double-line',
    title: '施工完了・自動決済',
    desc: '施工完了後、アプリで自動決済。電子レシートも発行。レビューもお忘れなく。',
    time: '自動完了',
    timeIcon: 'ri-check-line',
    color: '#8b5cf6',
    lightColor: '#f5f3ff',
    badge: '全額返金保証付き',
    badgeIcon: 'ri-shield-check-line',
    points: ['キャッシュレス自動決済', '施工前後の写真レポート', '満足保証・再施工無料'],
    image: 'https://readdy.ai/api/search-image?query=a%20happy%20Japanese%20businessman%20in%20a%20dark%20suit%20standing%20next%20to%20his%20perfectly%20clean%20and%20shiny%20black%20sedan%20in%20a%20modern%20office%20parking%20lot%20at%20golden%20hour%20sunset%20light%2C%20looking%20satisfied%20and%20proud%2C%20car%20reflecting%20beautiful%20sunset%20colors%2C%20premium%20automotive%20photography%2C%20cinematic%20warm%20lighting%2C%20realistic%20lifestyle%20shot%2C%20shallow%20depth%20of%20field&width=480&height=520&seq=hiw-step4-v2&orientation=portrait',
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const heading = useScrollAnimation({ threshold: 0.1 });
  const stepsAnim = useScrollAnimation({ threshold: 0.05 });
  const ctaAnim = useScrollAnimation({ threshold: 0.1 });

  // 5秒おきに自動でステップが進む
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Swipe for step navigation on mobile
  const { elementRef: stepsContainerRef, touchHandlers: stepsSwipe } = useSwipe({
    onSwipeLeft: () => setActiveStep((prev) => (prev + 1) % STEPS.length),
    onSwipeRight: () => setActiveStep((prev) => (prev - 1 + STEPS.length) % STEPS.length),
    threshold: 40,
  });

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#f7fafd] relative overflow-hidden">
      {/* 背景デコレーション */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#e4eef7] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#e4eef7] to-transparent"></div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 relative">
        {/* ヘッダー */}
        <div
          ref={heading.ref}
          className={`text-center max-w-2xl mx-auto mb-14 anim-fade-up ${heading.isVisible ? 'is-visible' : ''}`}
        >
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#00b4ff] mb-4">How it Works</p>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#0a2540] mb-4">ご利用の流れ</h2>
          <p className="text-[15px] text-[#5a7090] leading-relaxed">
            ダウンロードから施工完了まで、すべてアプリで完結。<br className="hidden sm:inline" />
            はじめての方でも、4ステップで簡単にご利用いただけます。
          </p>
        </div>

        {/* ステップカードエリア（スワイプ対応） */}
        <div
          ref={stepsContainerRef}
          {...stepsSwipe}
          className="touch-pan-y"
        >
          {/* Swipe hint for mobile */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-3">
            <div className="flex items-center gap-1.5 bg-[#e6f4ff] text-[#00b4ff] text-[10px] font-bold px-3 py-1.5 rounded-full">
              <i className="ri-arrow-left-right-line text-xs"></i>
              スワイプでSTEP切替
            </div>
          </div>

          <div
            ref={stepsAnim.ref}
            className={`anim-fade-up ${stepsAnim.isVisible ? 'is-visible' : ''}`}
          >
            {/* デスクトップ：横並び4カード + 矢印 */}
            <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start gap-0">
              {STEPS.map((s, i) => {
                const isActive = activeStep === i;
                return (
                  <div key={s.step} className="contents">
                    <button
                      onClick={() => setActiveStep(i)}
                      className="group text-left rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer bg-white hover:shadow-lg"
                      style={{
                        borderColor: isActive ? `${s.color}40` : '#e4eef7',
                        transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
                        boxShadow: isActive ? `0 8px 32px ${s.color}15` : undefined,
                      }}
                    >
                      {/* 写真エリア */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={s.image}
                          alt={s.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* グラデーションオーバーレイ */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/70 via-transparent to-transparent"></div>
                        {/* ステップ番号 */}
                        <div
                          className="absolute top-3 left-3 w-9 h-9 flex items-center justify-center rounded-full text-white text-sm font-black"
                          style={{ backgroundColor: s.color }}
                        >
                          {s.step}
                        </div>
                        {/* バッジ */}
                        <div
                          className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
                          style={{ backgroundColor: s.color }}
                        >
                          {s.badge}
                        </div>
                        {/* 下部テキストオーバーレイ */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-lg font-bold text-white mb-1">{s.title}</h3>
                          <div className="flex items-center gap-2">
                            <i className={`${s.timeIcon} text-white/80 text-xs`}></i>
                            <span className="text-[11px] font-medium text-white/90">{s.time}</span>
                          </div>
                        </div>
                      </div>
                      {/* 詳細エリア（アクティブ時に展開） */}
                      <div
                        className="overflow-hidden transition-all duration-500"
                        style={{ maxHeight: isActive ? '200px' : '0px' }}
                      >
                        <div className="p-4 pt-3 border-t" style={{ borderColor: `${s.color}20` }}>
                          <p className="text-[13px] text-[#5a7090] leading-relaxed mb-3">{s.desc}</p>
                          <ul className="space-y-1.5">
                            {s.points.map((pt) => (
                              <li key={pt} className="flex items-center gap-2">
                                <div
                                  className="w-4 h-4 flex items-center justify-center rounded-full shrink-0"
                                  style={{ backgroundColor: `${s.color}15` }}
                                >
                                  <i className="ri-check-line text-[9px]" style={{ color: s.color }}></i>
                                </div>
                                <span className="text-[12px] text-[#0a2540]">{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </button>

                    {/* 矢印（最後以外） */}
                    {i < STEPS.length - 1 && (
                      <div className="flex flex-col items-center justify-center h-full pt-20 px-1">
                        <div className="flex flex-col items-center">
                          <div className="w-px h-8 bg-[#e4eef7]"></div>
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f0f5fa] border border-[#e4eef7]">
                            <i className="ri-arrow-right-line text-[#8ba0ba] text-sm"></i>
                          </div>
                          <div className="w-px h-8 bg-[#e4eef7]"></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* タブレット・スマホ：2列グリッド + swipe active */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
              {STEPS.map((s, i) => {
                const isActive = activeStep === i;
                return (
                  <button
                    key={s.step}
                    onClick={() => setActiveStep(i)}
                    className="group text-left rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer bg-white hover:shadow-lg"
                    style={{
                      borderColor: isActive ? `${s.color}40` : '#e4eef7',
                      transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                      boxShadow: isActive ? `0 8px 24px ${s.color}12` : undefined,
                    }}
                  >
                    {/* 写真エリア */}
                    <div className="relative h-48 sm:h-52 overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/70 via-transparent to-transparent"></div>
                      <div
                        className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center rounded-full text-white text-xs font-black"
                        style={{ backgroundColor: s.color }}
                      >
                        {s.step}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-base font-bold text-white mb-1">{s.title}</h3>
                        <div className="flex items-center gap-2">
                          <i className={`${s.timeIcon} text-white/80 text-xs`}></i>
                          <span className="text-[11px] font-medium text-white/90">{s.time}</span>
                        </div>
                      </div>
                    </div>
                    {/* 詳細 */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: s.color }}
                        >
                          {s.badge}
                        </div>
                      </div>
                      <p className="text-[13px] text-[#5a7090] leading-relaxed mb-3">{s.desc}</p>
                      <ul className="space-y-1.5">
                        {s.points.map((pt) => (
                          <li key={pt} className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 flex items-center justify-center rounded-full shrink-0"
                              style={{ backgroundColor: `${s.color}15` }}
                            >
                              <i className="ri-check-line text-[9px]" style={{ color: s.color }}></i>
                            </div>
                            <span className="text-[12px] text-[#0a2540]">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 自動再生インジケーター（PC・モバイル共通） */}
            <div className="flex items-center justify-center gap-3 mt-10">
              {STEPS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className="flex items-center gap-2 transition-all duration-300 rounded-full cursor-pointer px-3 py-1.5"
                  style={{
                    backgroundColor: activeStep === i ? `${s.color}15` : 'transparent',
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: activeStep === i ? s.color : '#e4eef7',
                      transform: activeStep === i ? 'scale(1.3)' : 'scale(1)',
                    }}
                  />
                  <span
                    className="text-[11px] font-bold transition-colors duration-300"
                    style={{ color: activeStep === i ? s.color : '#8ba0ba' }}
                  >
                    STEP {s.step}
                  </span>
                </button>
              ))}
              <span className="text-[11px] text-[#8ba0ba] ml-2">自動再生中</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          ref={ctaAnim.ref}
          className={`mt-12 text-center anim-fade-up ${ctaAnim.isVisible ? 'is-visible' : ''}`}
        >
          <a
            href="#cta"
            className="inline-flex items-center gap-2 bg-[#0a2540] hover:bg-[#1a3a5c] text-white font-bold px-8 py-4 rounded-full transition-colors text-[15px] cursor-pointer whitespace-nowrap"
          >
            <i className="ri-gift-line"></i>
            先行登録して特典をもらう
          </a>
          <p className="text-[12px] text-[#8ba0ba] mt-3">無料・クレカ不要・いつでも解約OK</p>
        </div>
      </div>
    </section>
  );
}