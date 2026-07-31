import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const cases = [
  {
    industry: '不動産・建設',
    company: '都内不動産管理会社',
    vehicles: '営業車12台',
    tag: '定期洗車 + コーティング',
    quote: '毎週の洗車予約が不要になり、担当者の工数が月8時間削減。専属プロが車両状態を把握してくれるので安心です。',
    result: '月間コスト 約22%削減',
    icon: 'ri-building-line',
    color: 'bg-[#e6f4ff] text-[#0099e6]',
  },
  {
    industry: 'レンタカー・カーシェア',
    company: '関東レンタカー事業者',
    vehicles: '車両35台',
    tag: '納車前洗車 + 内装クリーニング',
    quote: '返却後の清掃をMobileWashに委託。スタッフの負担が大幅に減り、回転率が上がりました。請求書払いで経理も楽です。',
    result: '清掃工数 月40時間削減',
    icon: 'ri-car-line',
    color: 'bg-[#e6fbf7] text-[#0a8f7c]',
  },
  {
    industry: '運輸・物流',
    company: '中堅物流会社',
    vehicles: '社用車8台',
    tag: '月次定期洗車',
    quote: '複数拠点の車両をまとめて管理できるのが助かります。月次レポートで各拠点のコストが一目でわかります。',
    result: '管理工数 月5時間削減',
    icon: 'ri-truck-line',
    color: 'bg-[#fff4e6] text-[#b36b00]',
  },
];

export default function CorporateCases() {
  const heading = useScrollAnimation();
  const list = useScrollAnimation();

  return (
    <section id="cases" className="py-20 sm:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div
          ref={heading.ref}
          className={`text-center max-w-2xl mx-auto mb-14 anim-fade-up ${heading.isVisible ? 'is-visible' : ''}`}
        >
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#0099e6] mb-4">Use Cases</p>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#0a2540] mb-4">導入事例</h2>
          <p className="text-[15px] text-[#5a7090] leading-relaxed">
            正式ローンチ後、導入企業の事例をここで紹介していきます。<br className="hidden sm:inline" />
            現在は先行企業を募集中です。
          </p>
        </div>

        <ul
          ref={list.ref}
          className={`grid lg:grid-cols-3 gap-5 stagger-children anim-fade-up ${list.isVisible ? 'is-visible' : ''}`}
        >
          {cases.map((c) => (
            <li key={c.company} className="bg-white border border-[#e4eef7] rounded-2xl p-7 hover:border-[#cfdfee] transition-colors flex flex-col">
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl shrink-0 ${c.color}`}>
                  <i className={`${c.icon} text-xl`}></i>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#8ba0ba] tracking-widest mb-0.5">{c.industry}</p>
                  <p className="text-[14px] font-bold text-[#0a2540]">{c.company}</p>
                  <p className="text-[12px] text-[#5a7090]">{c.vehicles}</p>
                </div>
              </div>

              <span className="inline-block bg-[#f0f9ff] text-[#0099e6] text-[11px] font-bold px-2.5 py-1 rounded-full mb-4 self-start">
                {c.tag}
              </span>

              <blockquote className="text-[13px] text-[#5a7090] leading-relaxed mb-5 flex-1 italic border-l-2 border-[#e4eef7] pl-4">
                「{c.quote}」
              </blockquote>

              <div className="pt-4 border-t border-[#e4eef7] flex items-center gap-2">
                <i className="ri-bar-chart-fill text-[#0a8f7c] text-base"></i>
                <span className="text-[13px] font-bold text-[#0a8f7c]">{c.result}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
