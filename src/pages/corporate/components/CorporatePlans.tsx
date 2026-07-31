import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const plans = [
  {
    name: 'スモール',
    nameEn: 'Small Fleet',
    vehicles: '1〜4台',
    price: '都度払い',
    priceNote: '台数割引なし',
    features: [
      '請求書払い対応',
      '施工履歴管理',
      '全メニュー利用可',
      'アプリで一括予約',
      'メールサポート',
    ],
    cta: '相談する',
    highlight: false,
    badge: null,
  },
  {
    name: 'スタンダード',
    nameEn: 'Standard Fleet',
    vehicles: '5〜19台',
    price: '10〜20% OFF',
    priceNote: '台数に応じて自動適用',
    features: [
      'スモールの全機能',
      '台数割引（10〜20%）',
      '専属プロ担当者',
      '定期スケジュール設定',
      '月次費用レポート',
      '電話・チャットサポート',
    ],
    cta: '相談する',
    highlight: true,
    badge: '人気No.1',
  },
  {
    name: 'エンタープライズ',
    nameEn: 'Enterprise Fleet',
    vehicles: '20台以上',
    price: '最大30% OFF',
    priceNote: 'カスタム見積もり対応',
    features: [
      'スタンダードの全機能',
      '最大30% OFF',
      '複数拠点対応',
      '専任カスタマーサクセス',
      '年次コスト分析レポート',
      '優先対応・SLA保証',
      'API連携・システム統合',
    ],
    cta: '見積もり依頼',
    highlight: false,
    badge: null,
  },
];

export default function CorporatePlans() {
  const heading = useScrollAnimation();
  const list = useScrollAnimation<HTMLUListElement>();

  return (
    <section id="plans" className="py-20 sm:py-28 bg-[#f7fbff]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div
          ref={heading.ref}
          className={`text-center max-w-2xl mx-auto mb-14 anim-fade-up ${heading.isVisible ? 'is-visible' : ''}`}
        >
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#0099e6] mb-4">Plans</p>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#0a2540] mb-4">法人料金プラン</h2>
          <p className="text-[15px] text-[#5a7090] leading-relaxed">
            車両台数に応じた3つのプラン。<br className="hidden sm:inline" />
            すべて初期費用・登録料は無料です。
          </p>
        </div>

        <ul
          ref={list.ref}
          className={`grid md:grid-cols-3 gap-5 stagger-children anim-fade-up ${list.isVisible ? 'is-visible' : ''}`}
        >
          {plans.map((p) => (
            <li
              key={p.name}
              className={`group relative rounded-3xl p-8 lg:p-9 flex flex-col cursor-pointer overflow-hidden transition-all duration-500 ease-out hover:-translate-y-3 ${
                p.highlight
                  ? 'bg-gradient-to-br from-[#0a2540] to-[#1a3658] text-white shadow-xl hover:shadow-2xl hover:shadow-[#0a2540]/30'
                  : 'bg-white border border-[#e4eef7] hover:border-[#0099e6]/30 hover:shadow-xl hover:shadow-[#0099e6]/10'
              }`}
            >
              {/* ホバー装飾背景：右下から広がる円 */}
              <div
                className={`absolute -bottom-24 -right-24 w-48 h-48 rounded-full transition-transform duration-700 ease-out scale-0 group-hover:scale-[6] pointer-events-none ${
                  p.highlight ? 'bg-[#00b4ff]/10' : 'bg-[#0099e6]/5'
                }`}
              />

              {/* ホバー装飾：上部アクセントライン */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 transition-transform duration-500 ease-out origin-left scale-x-0 group-hover:scale-x-100 ${
                  p.highlight
                    ? 'bg-gradient-to-r from-[#00b4ff] to-[#00d4aa]'
                    : 'bg-gradient-to-r from-[#0099e6] to-[#00b4ff]'
                }`}
              />

              {p.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap bg-[#00b4ff] text-white transition-transform duration-300 group-hover:-translate-y-1">
                  ★ {p.badge}
                </span>
              )}

              <p
                className={`relative z-10 text-[10px] font-bold tracking-[0.25em] uppercase mb-2 transition-all duration-500 group-hover:tracking-[0.35em] ${
                  p.highlight ? 'text-[#00b4ff]' : 'text-[#0099e6]'
                }`}
              >
                {p.nameEn}
              </p>
              <h3
                className={`relative z-10 text-2xl font-bold mb-1 transition-transform duration-500 group-hover:scale-[1.02] origin-left ${
                  p.highlight ? 'text-white' : 'text-[#0a2540]'
                }`}
              >
                {p.name}
              </h3>
              <p
                className={`relative z-10 text-[13px] mb-6 transition-opacity duration-500 ${
                  p.highlight ? 'text-white/60' : 'text-[#8ba0ba]'
                }`}
              >
                {p.vehicles}
              </p>

              <div
                className={`relative z-10 mb-7 pb-7 border-b transition-all duration-500 ${
                  p.highlight ? 'border-white/15' : 'border-[#e4eef7] group-hover:border-[#0099e6]/20'
                }`}
              >
                <p
                  className={`text-2xl font-bold transition-transform duration-500 group-hover:scale-105 origin-left ${
                    p.highlight ? 'text-[#00b4ff]' : 'text-[#0099e6]'
                  }`}
                >
                  {p.price}
                </p>
                <p
                  className={`text-[12px] mt-1 transition-opacity duration-500 ${
                    p.highlight ? 'text-white/50' : 'text-[#8ba0ba]'
                  }`}
                >
                  {p.priceNote}
                </p>
              </div>

              <ul className="relative z-10 space-y-3 mb-8 flex-1">
                {p.features.map((f, idx) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-[13px] transition-transform duration-300"
                    style={{ transitionDelay: `${idx * 30}ms` }}
                  >
                    <span
                      className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:scale-110 ${
                        p.highlight ? 'bg-[#00b4ff] text-white' : 'bg-[#e6f4ff] text-[#0099e6]'
                      }`}
                    >
                      <i className="ri-check-line text-[9px]"></i>
                    </span>
                    <span className={p.highlight ? 'text-white' : 'text-[#0a2540]'}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`relative z-10 block text-center font-bold px-6 py-3.5 rounded-full transition-all duration-300 text-sm whitespace-nowrap ${
                  p.highlight
                    ? 'bg-[#00b4ff] text-white hover:bg-white hover:text-[#0a2540] hover:shadow-lg hover:shadow-[#00b4ff]/30'
                    : 'bg-[#0099e6] text-white hover:bg-[#0077b3] hover:shadow-lg hover:shadow-[#0099e6]/25'
                }`}
              >
                {p.cta}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-center text-[12px] text-[#8ba0ba] mt-8">
          ※ 台数・エリア・施工頻度によりカスタム見積もりも承ります。お気軽にご相談ください。
        </p>
      </div>
    </section>
  );
}