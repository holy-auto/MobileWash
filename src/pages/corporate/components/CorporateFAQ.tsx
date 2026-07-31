import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const brochureFaqs = [
  {
    q: '法人プランの資料はどこでもらえますか？',
    a: 'このページ下部の「無料相談・資料請求」フォームからお申し込みください。「資料ダウンロードも希望する」にチェックを入れて送信いただくと、法人プランの詳細・料金表・導入事例をまとめたPDF資料をお送りします。もちろん無料です。',
    linkLabel: '資料請求フォームへ',
  },
  {
    q: '資料請求だけでも大丈夫ですか？商談は必須ですか？',
    a: 'もちろん資料請求だけでも大歓迎です。商談・営業のご連絡は一切いたしません。資料をご覧いただいた上で、ご興味があればお気軽にご相談ください。',
    linkLabel: null,
  },
  {
    q: '資料に料金は載っていますか？',
    a: 'はい、参考価格帯と各プランの比較表を掲載しています。実際のお見積もりは車両台数・エリア・サービス内容によって異なりますので、資料請求後に担当者より個別にご案内いたします。',
    linkLabel: null,
  },
];

const generalFaqs = [
  {
    q: '最低契約台数はありますか？',
    a: '1台からご利用いただけます。台数が増えるほど割引率が上がる段階割引制度を採用しています。',
  },
  {
    q: '請求書払いはどのように処理されますか？',
    a: '毎月末締め・翌月末払いが基本です。月次でまとめた請求書をメールにてお送りします。銀行振込・口座振替に対応しています。',
  },
  {
    q: '複数拠点の車両をまとめて管理できますか？',
    a: 'はい、エンタープライズプランでは複数拠点の車両を一つのアカウントで管理できます。拠点ごとのコスト分析も可能です。',
  },
  {
    q: '専属プロはどのように選定されますか？',
    a: '担当エリアの認定プロの中から、スキル・評価・稼働状況を考慮してマッチングします。ご希望があれば複数名の候補からお選びいただけます。',
  },
  {
    q: '契約期間の縛りはありますか？',
    a: '最低契約期間はありません。月単位でのご利用が可能で、いつでも解約・プラン変更ができます。',
  },
  {
    q: '施工中の事故・損傷はどう対応しますか？',
    a: '全プロは施工中の保険補償を完備しています。万が一の場合は専任担当者が迅速に対応し、修理費用の補償を行います。',
  },
];

export default function CorporateFAQ() {
  const [openBrochure, setOpenBrochure] = useState<number | null>(null);
  const [openGeneral, setOpenGeneral] = useState<number | null>(null);
  const section = useScrollAnimation({ threshold: 0.05 });

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#f7fbff]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div
          ref={section.ref}
          className={`grid lg:grid-cols-12 gap-10 anim-fade-up ${section.isVisible ? 'is-visible' : ''}`}
        >
          {/* Left */}
          <div className="lg:col-span-4">
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#0099e6] mb-4">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0a2540] mb-4">よくあるご質問</h2>
            <p className="text-[14px] text-[#5a7090] leading-relaxed mb-5">
              法人プランに関するご不明点はこちら。解決しない場合はお気軽にお問い合わせください。
            </p>

            {/* Brochure CTA card */}
            <div className="bg-white border border-[#e4eef7] rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#e6f4ff]">
                  <i className="ri-file-download-line text-[#0099e6] text-base"></i>
                </div>
                <p className="text-[13px] font-bold text-[#0a2540]">まずは資料をご覧ください</p>
              </div>
              <p className="text-[12px] text-[#5a7090] leading-relaxed mb-4">
                料金表・導入事例・プラン比較をまとめたPDF資料を無料でお送りします。
              </p>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 bg-[#0099e6] hover:bg-[#0077b3] text-white font-bold px-4 py-2.5 rounded-full text-[12px] transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-file-pdf-line text-sm"></i>
                無料で資料請求する
              </a>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-[#0099e6] text-[#0099e6] hover:bg-[#e6f4ff] font-bold px-5 py-2.5 rounded-full text-[13px] transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-mail-line text-sm"></i>
              お問い合わせ
            </a>
          </div>

          {/* Right */}
          <div className="lg:col-span-8 space-y-8">
            {/* Brochure FAQs */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-file-download-line text-[#0099e6] text-sm"></i>
                </div>
                <p className="text-[11px] font-bold tracking-[0.15em] text-[#0099e6]">資料・お問い合わせについて</p>
              </div>
              <ul className="space-y-2">
                {brochureFaqs.map((faq, i) => (
                  <li key={i}>
                    <div
                      className={`bg-white border rounded-xl overflow-hidden transition-colors cursor-pointer ${
                        openBrochure === i
                          ? 'border-[#0099e6]/40 ring-1 ring-[#0099e6]/20'
                          : 'border-[#c8dff5] hover:border-[#0099e6]/40'
                      }`}
                    >
                      <button
                        className="w-full flex items-start justify-between gap-4 p-5 lg:p-6 text-left cursor-pointer"
                        onClick={() => setOpenBrochure(openBrochure === i ? null : i)}
                      >
                        <div className="flex items-start gap-3.5 flex-1">
                          <span className="shrink-0 w-7 h-7 bg-[#0099e6] text-white rounded-full flex items-center justify-center font-bold text-[12px]">
                            Q
                          </span>
                          <h3 className="text-[14px] lg:text-[15px] font-bold text-[#0a2540] leading-snug pt-0.5">
                            {faq.q}
                          </h3>
                        </div>
                        <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-[#f0f9ff]">
                          <i className={`ri-${openBrochure === i ? 'subtract' : 'add'}-line text-[#0099e6] text-sm`}></i>
                        </span>
                      </button>
                      {openBrochure === i && (
                        <div className="px-5 lg:px-6 pb-5 lg:pb-6 pl-[60px] lg:pl-[68px]">
                          <p className="text-[13px] lg:text-[14px] text-[#5a7090] leading-relaxed">{faq.a}</p>
                          {faq.linkLabel && (
                            <a
                              href="#contact"
                              className="inline-flex items-center gap-1.5 mt-3 text-[12px] font-bold text-[#0099e6] hover:underline cursor-pointer"
                            >
                              <i className="ri-arrow-right-circle-line text-sm"></i>
                              {faq.linkLabel}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* General FAQs */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-question-line text-[#8ba0ba] text-sm"></i>
                </div>
                <p className="text-[11px] font-bold tracking-[0.15em] text-[#8ba0ba]">契約・サービスについて</p>
              </div>
              <ul className="space-y-2">
                {generalFaqs.map((faq, i) => (
                  <li key={i}>
                    <div
                      className={`bg-white border rounded-xl overflow-hidden transition-colors cursor-pointer ${
                        openGeneral === i
                          ? 'border-[#0099e6]/30'
                          : 'border-[#e4eef7] hover:border-[#cfdfee]'
                      }`}
                    >
                      <button
                        className="w-full flex items-start justify-between gap-4 p-5 lg:p-6 text-left cursor-pointer"
                        onClick={() => setOpenGeneral(openGeneral === i ? null : i)}
                      >
                        <div className="flex items-start gap-3.5 flex-1">
                          <span className="shrink-0 w-7 h-7 bg-[#e6f4ff] text-[#0099e6] rounded-full flex items-center justify-center font-bold text-[12px]">
                            Q
                          </span>
                          <h3 className="text-[14px] lg:text-[15px] font-bold text-[#0a2540] leading-snug pt-0.5">
                            {faq.q}
                          </h3>
                        </div>
                        <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-[#f0f9ff]">
                          <i className={`ri-${openGeneral === i ? 'subtract' : 'add'}-line text-[#0099e6] text-sm`}></i>
                        </span>
                      </button>
                      {openGeneral === i && (
                        <div className="px-5 lg:px-6 pb-5 lg:pb-6 pl-[60px] lg:pl-[68px]">
                          <p className="text-[13px] lg:text-[14px] text-[#5a7090] leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
