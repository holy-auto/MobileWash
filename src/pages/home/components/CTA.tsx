import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import { CAMPFIRE_URL } from '@/constants';

const RETURNS = [
  {
    price: '¥3,000',
    icon: 'ri-hand-heart-line',
    label: '応援プラン',
    desc: '応援メッセージ掲載 + 限定ステッカー',
    color: 'from-[#00b4ff] to-[#00d4b8]',
    badge: '人気',
    badgeColor: 'bg-[#00b4ff]',
  },
  {
    price: '¥6,000',
    icon: 'ri-car-washing-line',
    label: '洗車体験プラン',
    desc: '手洗い洗車1回無料券 + カーケアグッズセット',
    color: 'from-[#00d4b8] to-[#0a8f7c]',
    badge: 'おすすめ',
    badgeColor: 'bg-[#00d4b8]',
  },
  {
    price: '¥15,000',
    icon: 'ri-sparkling-line',
    label: 'コーティングプラン',
    desc: 'ガラスコーティング施工券 + 限定Tシャツ',
    color: 'from-[#f59e0b] to-[#d97706]',
    badge: '最安',
    badgeColor: 'bg-amber-500',
  },
  {
    price: '¥30,000',
    icon: 'ri-vip-crown-line',
    label: 'プレミアムプラン',
    desc: '年間洗車フリーパス + 限定グッズ全部セット',
    color: 'from-[#ec4899] to-[#db2777]',
    badge: '豪華',
    badgeColor: 'bg-pink-500',
  },
];

export default function CTA() {
  const section = useScrollAnimation({ threshold: 0.06 });
  const returnsAnim = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="cta" className="py-20 sm:py-28 bg-[#f7fafd] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00b4ff]/30 to-transparent"></div>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#00b4ff]/6 to-transparent rounded-full blur-3xl"></div>
        {/* Floating bubbles */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-[#00b4ff]/15 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-40 right-20 w-2 h-2 bg-[#00d4b8]/15 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-20 w-1.5 h-1.5 bg-[#00b4ff]/10 rounded-full animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 relative">

        {/* Section header */}
        <div
          ref={section.ref}
          className={`text-center mb-12 anim-fade-up ${section.isVisible ? 'is-visible' : ''}`}
        >
          <div className="inline-flex items-center gap-2 bg-[#00b4ff]/10 border border-[#00b4ff]/30 text-[#0099e6] text-[11px] font-bold tracking-widest px-4 py-1.5 rounded-full mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00b4ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00b4ff]"></span>
            </span>
            CAMPFIRE クラウドファンディング
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#0a2540] leading-tight mb-4">
            プロジェクトを<span className="text-[#00b4ff]">応援</span>して<br className="sm:hidden" />
            限定リターンをゲット
          </h2>
          <p className="text-[15px] text-[#5a7090] max-w-xl mx-auto leading-relaxed">
            CAMPFIREにてクラウドファンディング実施中。<br />
            あなたの応援が、出張洗車の未来を加速させます。
          </p>
        </div>

        {/* Countdown */}
        <div className={`flex flex-col items-center gap-4 mb-14 anim-fade-up ${section.isVisible ? 'is-visible' : ''}`} style={{ animationDelay: '0.1s' }}>
          <p className="text-[11px] font-bold tracking-widest text-[#5a7090]">クラウドファンディング実施状況</p>
          <div className="flex items-center gap-3 bg-[#00d4b8]/10 border border-[#00d4b8]/30 rounded-full px-6 py-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4b8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00d4b8]"></span>
            </span>
            <span className="text-[15px] font-bold text-[#00d4b8]">現在CAMPFIREにて応援受付中！</span>
            <i className="ri-fire-line text-[#f59e0b] text-xl animate-pulse"></i>
          </div>
        </div>

        {/* Returns grid */}
        <div
          ref={returnsAnim.ref}
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 anim-fade-up ${returnsAnim.isVisible ? 'is-visible' : ''}`}
        >
          {RETURNS.map((item, i) => (
            <div
              key={item.label}
              className="group bg-white rounded-2xl border border-[#e4eef7] hover:border-[#00b4ff]/30 transition-all duration-300 overflow-hidden cursor-default relative"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Top accent line */}
              <div className={`h-1 bg-gradient-to-r ${item.color} w-0 group-hover:w-full transition-all duration-500`}></div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className={`${item.badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full`}>
                    {item.badge}
                  </span>
                  <div className={`w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`${item.icon} text-white text-lg`}></i>
                  </div>
                </div>

                <p className="text-2xl font-black text-[#0a2540] mb-1">{item.price}</p>
                <p className="text-[14px] font-bold text-[#0a2540] mb-2">{item.label}</p>
                <p className="text-[12px] text-[#5a7090] leading-relaxed">{item.desc}</p>
              </div>

              {/* Hover glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#00b4ff]/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Main CTA card */}
        <div className={`max-w-2xl mx-auto anim-fade-up ${section.isVisible ? 'is-visible' : ''}`} style={{ animationDelay: '0.2s' }}>
          <div className="bg-gradient-to-br from-[#0a2540] to-[#143a6b] rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#00b4ff]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#00d4b8]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative">
              <div className="w-16 h-16 flex items-center justify-center bg-[#00b4ff]/20 rounded-full mx-auto mb-5">
                <i className="ri-heart-add-line text-[#00b4ff] text-3xl"></i>
              </div>

              <h3 className="text-[22px] sm:text-[26px] font-bold text-white mb-3">
                MobileWash を応援する
              </h3>
              <p className="text-[14px] text-white/70 leading-relaxed mb-8 max-w-md mx-auto">
                CAMPFIREにてクラウドファンディングを受付中。<br />
                あなたの応援が、日本中の愛車をピカピカにする未来を作ります。
              </p>

              <a
                href={CAMPFIRE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#00b4ff] hover:bg-[#0099e6] text-white font-bold px-10 py-5 rounded-full transition-all text-[16px] cursor-pointer whitespace-nowrap shadow-lg shadow-[#00b4ff]/25 hover:shadow-xl hover:shadow-[#00b4ff]/30 group"
              >
                <i className="ri-external-link-line text-lg group-hover:translate-x-0.5 transition-transform"></i>
                CAMPFIRE で応援する
              </a>

              <div className="flex items-center justify-center gap-6 mt-6">
                <div className="flex items-center gap-1.5">
                  <i className="ri-shield-check-line text-[#00d4b8] text-sm"></i>
                  <span className="text-[11px] text-white/50">安全な決済</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <i className="ri-refund-line text-[#00d4b8] text-sm"></i>
                  <span className="text-[11px] text-white/50">目標未達成時は全額返金</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <i className="ri-time-line text-[#00d4b8] text-sm"></i>
                  <span className="text-[11px] text-white/50">限定リターンあり</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate CTA Banner */}
        <div className="mt-10 rounded-2xl border border-[#e4eef7] bg-white px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0a2540] shrink-0">
              <i className="ri-building-2-line text-white text-lg"></i>
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#0a2540]">
                法人・フリート向けプランをお探しですか？
              </p>
              <p className="text-[12px] text-[#5a7090] mt-0.5">
                5台以上の車両管理に特化した法人プランをご用意。専任担当者が対応します。
              </p>
            </div>
          </div>
          <Link
            to="/corporate"
            className="inline-flex items-center gap-2 bg-[#0a2540] hover:bg-[#1a3658] text-white font-bold px-5 py-2.5 rounded-full transition-colors text-[13px] cursor-pointer whitespace-nowrap shrink-0"
          >
            法人プランを見る
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-right-line"></i>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}