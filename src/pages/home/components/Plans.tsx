import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const SUBSCRIPTION_PLANS = [
  {
    tag: 'Light Monthly',
    name: '定額ライト',
    desc: '月1回の手洗い洗車で、いつもキレイをキープ。',
    monthlyPrice: 2980,
    yearlyPrice: 2480,
    unit: '/ 月',
    note: '税込・出張料込み',
    badge: null,
    highlight: false,
    color: '#00b4ff',
    lightColor: '#e6f4ff',
    forWho: ['月1回ケアで十分な方', '洗車を習慣にしたい方', 'まずサブスクを試したい方'],
    features: [
      { text: '月1回 出張手洗い洗車込み', strong: true },
      { text: 'オプション追加 10%OFF', strong: false },
      { text: '予約優先枠', strong: false },
      { text: '雨天時の再施工保証', strong: false },
      { text: 'いつでも解約・変更OK', strong: false },
    ],
    cta: 'ライトを始める',
  },
  {
    tag: 'Premium Monthly',
    name: '定額プレミアム',
    desc: '毎週ピカピカ。愛車家・法人に選ばれる王道プラン。',
    monthlyPrice: 9800,
    yearlyPrice: 8160,
    unit: '/ 月',
    note: '税込・出張料込み',
    badge: '人気No.1',
    highlight: true,
    color: '#00b4ff',
    lightColor: '#e6f4ff',
    forWho: ['毎週洗車したい愛車家', '年1回コーティングも欲しい方', '専属プロに任せたい方'],
    features: [
      { text: '月4回 出張手洗い洗車込み', strong: true },
      { text: '年1回 ガラスコーティング込み', strong: true },
      { text: 'オプション追加 20%OFF', strong: false },
      { text: '深夜・早朝枠の優先予約', strong: false },
      { text: '専属プロ指名可', strong: false },
      { text: 'いつでも解約・変更OK', strong: false },
    ],
    cta: 'プレミアムを始める',
  },
];

export default function Plans() {
  const [isYearly, setIsYearly] = useState(false);
  const heading = useScrollAnimation({ threshold: 0.08 });
  const spotAnim = useScrollAnimation({ threshold: 0.1 });
  const plansAnim = useScrollAnimation({ threshold: 0.08 });
  const corporateAnim = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="plans" className="py-20 sm:py-28 bg-[#f7fafd]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <div
          ref={heading.ref}
          className={`text-center max-w-2xl mx-auto mb-12 anim-fade-up ${heading.isVisible ? 'is-visible' : ''}`}
        >
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#00b4ff] mb-4">Plans</p>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#0a2540] mb-4 leading-tight">
            ライフスタイルに合わせて<br className="hidden sm:inline" />選べる料金プラン
          </h2>
          <p className="text-[15px] text-[#5a7090] leading-relaxed">
            「使いたい時だけ」も「毎週ピカピカ」も。<br className="hidden sm:inline" />
            あなたのカーライフに合わせてお選びください。
          </p>
        </div>

        {/* ── SPOT USE BANNER ── */}
        <div
          ref={spotAnim.ref}
          className={`mb-8 anim-fade-up ${spotAnim.isVisible ? 'is-visible' : ''}`}
        >
          <div className="relative bg-white border border-[#e4eef7] rounded-2xl overflow-hidden">
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00b4ff] to-[#00d4b8]"></div>

            <div className="pl-6 pr-6 py-5 flex flex-col sm:flex-row sm:items-center gap-5">
              {/* Icon + label */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#e6f4ff] shrink-0">
                  <i className="ri-flashlight-line text-[#00b4ff] text-xl"></i>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-[10px] font-bold tracking-widest text-[#00b4ff]">PAY AS YOU GO</p>
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full">契約不要</span>
                  </div>
                  <p className="text-[17px] font-bold text-[#0a2540]">都度払い — 使いたい時だけ、1回から</p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-12 bg-[#e4eef7] shrink-0"></div>

              {/* Price */}
              <div className="flex items-baseline gap-1 shrink-0">
                <span className="text-[15px] font-bold text-[#0a2540]">¥</span>
                <span className="text-[36px] font-bold text-[#0a2540] leading-none">3,980</span>
                <span className="text-[13px] text-[#5a7090] ml-1">〜 / 回</span>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 flex-1">
                {['出張料込み', '全メニュー対応', 'アプリで完結', '24時間前まで無料キャンセル'].map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#f7fafd] border border-[#e4eef7] text-[#5a7090] px-2.5 py-1 rounded-full">
                    <i className="ri-check-line text-[#00b4ff] text-[10px]"></i>
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#cta"
                className="inline-flex items-center gap-2 bg-[#0a2540] hover:bg-[#1a3a5c] text-white font-bold px-5 py-3 rounded-full transition-colors text-[13px] cursor-pointer whitespace-nowrap shrink-0"
              >
                今すぐ予約
                <i className="ri-arrow-right-line text-sm"></i>
              </a>
            </div>

            {/* Bottom note */}
            <div className="border-t border-[#f0f5fa] px-6 py-2.5 bg-[#fafcff] flex items-center gap-2">
              <i className="ri-information-line text-[#8ba0ba] text-sm"></i>
              <p className="text-[11px] text-[#8ba0ba]">
                月額契約・定期縛り一切なし。アプリをダウンロードして、好きな時に1回から注文できます。
              </p>
            </div>
          </div>
        </div>

        {/* ── SUBSCRIPTION PLANS ── */}
        <div
          ref={plansAnim.ref}
          className={`anim-fade-up ${plansAnim.isVisible ? 'is-visible' : ''}`}
        >
          {/* Toggle */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <p className="text-[13px] font-bold text-[#0a2540]">定額プランで、もっとお得に</p>
            <div className="flex items-center gap-3">
              <span className={`text-[13px] font-bold transition-colors ${!isYearly ? 'text-[#0a2540]' : 'text-[#8ba0ba]'}`}>月払い</span>
              <button
                onClick={() => setIsYearly(v => !v)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer ${isYearly ? 'bg-[#00b4ff]' : 'bg-[#e4eef7]'}`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${isYearly ? 'translate-x-6' : 'translate-x-0.5'}`}
                />
              </button>
              <span className={`text-[13px] font-bold transition-colors ${isYearly ? 'text-[#0a2540]' : 'text-[#8ba0ba]'}`}>
                年払い
              </span>
              {isYearly && (
                <span className="text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-200 px-2.5 py-1 rounded-full">
                  最大17%OFF
                </span>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {SUBSCRIPTION_PLANS.map((p, idx) => {
              const price = isYearly ? p.yearlyPrice : p.monthlyPrice;
              return (
                <div
                  key={p.name}
                  className={`relative rounded-3xl flex flex-col overflow-hidden transition-all duration-300 ${
                    p.highlight
                      ? 'bg-gradient-to-br from-[#0a2540] to-[#1a3a5c]'
                      : 'bg-white border border-[#e4eef7]'
                  }`}
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  {/* Badge */}
                  {p.badge && (
                    <div className="absolute top-4 right-4">
                      <span className="text-[10px] font-bold bg-[#00b4ff] text-white px-3 py-1 rounded-full">
                        ★ {p.badge}
                      </span>
                    </div>
                  )}

                  {/* Top accent line */}
                  {p.highlight && (
                    <div className="h-1 bg-gradient-to-r from-[#00b4ff] to-[#00d4b8]"></div>
                  )}

                  <div className="p-7 lg:p-8 flex flex-col flex-1">
                    {/* Tag + name */}
                    <p className={`text-[10px] font-bold tracking-[0.25em] uppercase mb-2 ${p.highlight ? 'text-[#00b4ff]' : 'text-[#00b4ff]'}`}>
                      {p.tag}
                    </p>
                    <h3 className={`text-2xl font-bold mb-2 ${p.highlight ? 'text-white' : 'text-[#0a2540]'}`}>{p.name}</h3>
                    <p className={`text-[13px] mb-5 leading-relaxed ${p.highlight ? 'text-white/65' : 'text-[#5a7090]'}`}>{p.desc}</p>

                    {/* Price */}
                    <div className={`mb-5 pb-5 border-b ${p.highlight ? 'border-white/15' : 'border-[#e4eef7]'}`}>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-lg font-bold ${p.highlight ? 'text-white' : 'text-[#0a2540]'}`}>¥</span>
                        <span className={`text-5xl font-bold tracking-tight leading-none ${p.highlight ? 'text-white' : 'text-[#0a2540]'}`}>
                          {price.toLocaleString()}
                        </span>
                        <span className={`text-sm font-medium ml-1 ${p.highlight ? 'text-white/60' : 'text-[#5a7090]'}`}>{p.unit}</span>
                      </div>
                      {isYearly && (
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={`text-[12px] line-through ${p.highlight ? 'text-white/30' : 'text-[#8ba0ba]'}`}>
                            ¥{p.monthlyPrice.toLocaleString()}
                          </span>
                          <span className="text-[11px] font-bold bg-amber-400/20 text-amber-500 px-2 py-0.5 rounded-full">
                            年払いで¥{((p.monthlyPrice - p.yearlyPrice) * 12).toLocaleString()}お得
                          </span>
                        </div>
                      )}
                      <p className={`text-[11px] mt-1.5 ${p.highlight ? 'text-white/40' : 'text-[#8ba0ba]'}`}>{p.note}</p>
                    </div>

                    {/* For who */}
                    <div className={`mb-5 p-3.5 rounded-xl ${p.highlight ? 'bg-white/8' : 'bg-[#f7fafd]'}`}>
                      <p className={`text-[10px] font-bold tracking-widest mb-2 ${p.highlight ? 'text-[#00b4ff]' : 'text-[#00b4ff]'}`}>
                        こんな方におすすめ
                      </p>
                      <ul className="space-y-1">
                        {p.forWho.map(w => (
                          <li key={w} className="flex items-center gap-2">
                            <i className={`ri-user-smile-line text-xs ${p.highlight ? 'text-[#00b4ff]' : 'text-[#00b4ff]'}`}></i>
                            <span className={`text-[12px] ${p.highlight ? 'text-white/75' : 'text-[#5a7090]'}`}>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-7 flex-1">
                      {p.features.map(f => (
                        <li key={f.text} className="flex items-start gap-2.5 text-[13px]">
                          <span className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5 ${
                            p.highlight ? 'bg-[#00b4ff]' : 'bg-[#e6f4ff]'
                          }`}>
                            <i className="ri-check-line text-white text-[9px]"></i>
                          </span>
                          <span className={`${f.strong ? 'font-bold' : ''} ${p.highlight ? 'text-white' : 'text-[#0a2540]'}`}>
                            {f.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href="#cta"
                      className={`block text-center font-bold px-6 py-3.5 rounded-full transition-all text-[14px] cursor-pointer whitespace-nowrap ${
                        p.highlight
                          ? 'bg-[#00b4ff] text-white hover:bg-[#0099e6]'
                          : 'bg-[#0a2540] text-white hover:bg-[#1a3a5c]'
                      }`}
                    >
                      {p.cta}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cancel note */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <i className="ri-shield-check-line text-[#00b4ff] text-sm"></i>
            <p className="text-[12px] text-[#8ba0ba]">
              定額プランはいつでも解約・プラン変更が可能です。最低契約期間・違約金はありません。
            </p>
          </div>
        </div>

        {/* ── CORPORATE BANNER ── */}
        <div
          ref={corporateAnim.ref}
          className={`mt-10 anim-fade-up ${corporateAnim.isVisible ? 'is-visible' : ''}`}
        >
          <div className="rounded-2xl bg-gradient-to-r from-[#0a2540] to-[#1a3a5c] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#00b4ff]/20 text-[#00b4ff] shrink-0">
                <i className="ri-building-line text-xl"></i>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-[0.2em] text-[#00b4ff] mb-1">For Business</p>
                <p className="text-[16px] font-bold text-white mb-1">法人・フリート向けプランをお探しですか？</p>
                <p className="text-[13px] text-white/65 leading-relaxed">
                  請求書払い・複数台割引（最大30%OFF）・専属プロ手配など、企業向けの専用プランをご用意しています。
                </p>
              </div>
            </div>
            <Link
              to="/corporate"
              className="inline-flex items-center gap-2 bg-[#00b4ff] hover:bg-[#0099e6] text-white font-bold px-6 py-3 rounded-full transition-colors text-[14px] cursor-pointer whitespace-nowrap shrink-0"
            >
              法人プランを見る
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
