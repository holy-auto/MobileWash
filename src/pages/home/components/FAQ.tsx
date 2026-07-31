import { useState, useRef, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useSwipe } from '@/hooks/useSwipe';

const TRUST_POINTS = [
  {
    icon: 'ri-shield-check-line',
    color: 'bg-emerald-50 text-emerald-600',
    title: '全額返金保証',
    desc: '仕上がりに不満なら24時間以内に無料再施工 or 全額返金',
  },
  {
    icon: 'ri-user-star-line',
    color: 'bg-amber-50 text-amber-600',
    title: '認定プロのみ',
    desc: '身元確認・技能審査・接客研修を通過したプロだけが稼働',
  },
  {
    icon: 'ri-lock-2-line',
    color: 'bg-sky-50 text-sky-600',
    title: '個人情報保護',
    desc: 'SSL暗号化・プライバシーポリシー準拠。スパムメール一切なし',
  },
  {
    icon: 'ri-time-line',
    color: 'bg-violet-50 text-violet-600',
    title: 'いつでも解約OK',
    desc: 'サブスクも先行登録も、縛りなし・違約金なし・即時解約可能',
  },
];

const faqCategories = [
  {
    label: '先行登録について',
    icon: 'ri-gift-line',
    faqs: [
      {
        q: '先行登録は本当に無料ですか？クレジットカードは必要ですか？',
        a: '完全無料です。メールアドレスの入力だけで完了し、クレジットカードや個人情報の入力は一切不要です。登録後に勝手に課金されることもありません。',
        tag: '安心',
      },
      {
        q: '先行登録したら、しつこいメールが来ませんか？',
        a: 'リリース時の特典クーポン送付と、重要なサービス情報のみをお届けします。スパムメールや不要な営業メールは一切送りません。いつでもワンクリックで配信停止できます。',
        tag: '安心',
      },
      {
        q: '先行登録の特典（¥1,500 OFFクーポン・優先予約権）はいつ届きますか？',
        a: 'アプリの正式リリース（2026年Q3予定）と同時に、ご登録のメールアドレスへお届けします。クーポンの有効期限はリリースから90日間です。',
        tag: '特典',
      },
      {
        q: '先行登録の枠（2,000名）を超えたらどうなりますか？',
        a: '先行登録枠（2,000名）を超えた場合、特典付き先行登録は終了となります。ただし、通常のアプリ登録は引き続き可能です。特典を確実に受け取るには、お早めの登録をおすすめします。',
        tag: '重要',
      },
      {
        q: '先行登録後にキャンセル・削除はできますか？',
        a: 'はい、いつでも可能です。登録解除ご希望の場合は、受信したメール内の「登録解除」リンクからワンクリックで削除できます。',
        tag: '安心',
      },
    ],
  },
  {
    label: 'ご利用について',
    icon: 'ri-smartphone-line',
    faqs: [
      {
        q: 'マンションの駐車場でも出張洗車は利用できますか？',
        a: 'はい、ご利用いただけます。プロは給水タンク・電源・撥水排水マットを完備しているため、水道や電源がない駐車場でも問題ありません。事前にマンション管理規約をご確認のうえ、ご予約ください。',
        tag: null,
      },
      {
        q: '予約から最短どのくらいで来てもらえますか？',
        a: 'GPSマッチングにより、近くにオンラインのプロがいる場合、最短5分でお伺いできます。混雑時間帯は1〜2時間ほどお待ちいただく場合もあります。事前予約も可能です。',
        tag: null,
      },
      {
        q: '雨の日でも出張洗車・コーティングは受けられますか？',
        a: '屋根付き駐車場であれば施工可能です。屋外駐車場の場合は、安全と仕上がり品質を担保するため、施工前後24時間以内に再降雨が予想される場合は無料で日程変更いただけます。',
        tag: null,
      },
      {
        q: '自宅以外（職場・外出先）でも利用できますか？',
        a: 'はい、駐車場があればどこでもご利用いただけます。職場の駐車場・商業施設・コインパーキングなど、施工スペースが確保できる場所であれば対応可能です。',
        tag: null,
      },
    ],
  },
  {
    label: '料金・支払い',
    icon: 'ri-price-tag-3-line',
    faqs: [
      {
        q: '出張洗車の料金はいくらですか？追加料金はありますか？',
        a: '出張手洗い洗車は¥3,980〜（普通車Mサイズ目安）です。出張料金込みの明朗会計で、追加請求は一切ありません。アプリで車種・サービスを選択した時点で最終金額が確定します。',
        tag: '重要',
      },
      {
        q: '支払い方法は何が使えますか？',
        a: 'アプリ内のクレジットカード決済（Visa/Master/JCB/Amex）、Apple Pay、Google Pay、PayPay、d払いに対応しています。法人プランでは請求書払いも可能です。',
        tag: null,
      },
      {
        q: 'サブスクリプション（定額プラン）はいつでも解約できますか？',
        a: 'はい、違約金・解約手数料は一切なく、アプリからいつでも即時解約できます。解約後は次回更新日まで引き続きご利用いただけます。',
        tag: '安心',
      },
      {
        q: '車種・サイズによる料金の違いはありますか？',
        a: 'コンパクトカー（Sサイズ）は表示料金から-500円、SUVや3列シート車（L/XLサイズ）は+1,000〜3,000円となります。アプリで車種選択時に自動計算されます。',
        tag: null,
      },
    ],
  },
  {
    label: '品質・安全',
    icon: 'ri-shield-check-line',
    faqs: [
      {
        q: '施工の品質に満足できなかった場合はどうなりますか？',
        a: '万が一仕上がりにご満足いただけない場合は、施工後24時間以内のご連絡で無料で再施工いたします。それでも解決しない場合は全額返金保証も用意しています。',
        tag: '保証',
      },
      {
        q: 'プロの身元確認・技術審査はされていますか？',
        a: 'はい、全プロは身元確認・技能審査・接客研修を通過した認定プロのみです。施工中の保険補償も完備しており、万が一の損傷にも迅速に対応します。',
        tag: '安心',
      },
      {
        q: '施工中に車が傷ついた場合の補償はありますか？',
        a: '全プロは施工中の損傷に対する保険に加入しています。万が一の場合は、MobileWashのサポートチームが迅速に対応し、修理費用を全額補償します。',
        tag: '保証',
      },
      {
        q: 'ガラスコーティングの効果はどのくらい続きますか？',
        a: '施工するコーティング剤の種類によって異なりますが、MobileWashの出張ガラスコーティングは最大3年間の艶・撥水効果を保ちます。定期的なメンテナンスで効果を長持ちさせることができます。',
        tag: null,
      },
    ],
  },
  {
    label: '法人・プロ登録',
    icon: 'ri-building-2-line',
    faqs: [
      {
        q: '法人で複数台の依頼は可能ですか？',
        a: 'はい、法人プラン（請求書払い・複数台割引・専属プロ手配）をご用意しています。5台以上から最大30%OFFの段階割引が適用されます。詳細はお問い合わせフォームからご相談ください。',
        tag: null,
      },
      {
        q: 'プロとして登録・働くことはできますか？',
        a: 'はい、現在認定プロ第一期生を全国47都道府県から募集中です。登録費用は無料、還元率は業界最高水準の90%です。プロ募集フォームからご登録ください。',
        tag: null,
      },
      {
        q: 'MobileWashはいつからサービス開始ですか？',
        a: '2026年Q3（7〜9月）の正式ローンチを予定しています。現在は事前登録を受付中で、登録いただいた方には特典クーポンをリリース時にお届けします。',
        tag: null,
      },
    ],
  },
];

const TAG_STYLES: Record<string, string> = {
  '安心': 'bg-emerald-50 text-emerald-600 border-emerald-200',
  '特典': 'bg-amber-50 text-amber-600 border-amber-200',
  '重要': 'bg-red-50 text-red-500 border-red-200',
  '保証': 'bg-sky-50 text-sky-600 border-sky-200',
};

function AccordionItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { q: string; a: string; tag: string | null };
  isOpen: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(isOpen ? bodyRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={`bg-white border rounded-xl overflow-hidden transition-all duration-200 ${
        isOpen ? 'border-[#00b4ff]/40' : 'border-[#e4eef7] hover:border-[#c8dff0]'
      }`}
    >
      <button
        className="w-full flex items-start justify-between gap-4 p-5 lg:p-6 text-left cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          <span className="shrink-0 w-7 h-7 bg-[#e6f4ff] text-[#00b4ff] rounded-full flex items-center justify-center font-bold text-[12px]">
            Q
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              {faq.tag && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${TAG_STYLES[faq.tag]}`}>
                  {faq.tag}
                </span>
              )}
            </div>
            <h3 className="text-[14px] lg:text-[15px] font-bold text-[#0a2540] leading-snug">
              {faq.q}
            </h3>
          </div>
        </div>
        <span
          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 ${
            isOpen ? 'bg-[#00b4ff] text-white' : 'bg-[#f0f9ff] text-[#00b4ff]'
          }`}
        >
          <i className={`ri-${isOpen ? 'subtract' : 'add'}-line text-sm`}></i>
        </span>
      </button>
      <div
        style={{ height, overflow: 'hidden', transition: 'height 0.28s cubic-bezier(0.4,0,0.2,1)' }}
      >
        <div ref={bodyRef} className="px-5 lg:px-6 pb-5 lg:pb-6 pl-[60px] lg:pl-[68px]">
          <div className="flex items-start gap-2.5">
            <span className="shrink-0 w-5 h-5 bg-[#f0fdf4] text-emerald-500 rounded-full flex items-center justify-center text-[11px] font-bold mt-0.5">
              A
            </span>
            <p className="text-[13px] lg:text-[14px] text-[#5a7090] leading-relaxed">{faq.a}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const section = useScrollAnimation({ threshold: 0.04 });
  const trustAnim = useScrollAnimation({ threshold: 0.1 });

  const handleCategoryChange = (idx: number) => {
    setActiveCategory(idx);
    setOpenIndex(null);
    setSearchQuery('');
  };

  const { elementRef: faqSwipeRef, touchHandlers: faqSwipeHandlers } = useSwipe({
    onSwipeLeft: () => {
      if (searchQuery) return;
      setActiveCategory((prev) => (prev + 1) % faqCategories.length);
      setOpenIndex(null);
    },
    onSwipeRight: () => {
      if (searchQuery) return;
      setActiveCategory((prev) => (prev - 1 + faqCategories.length) % faqCategories.length);
      setOpenIndex(null);
    },
    threshold: 40,
    preventDefaultOnSwipe: true,
  });

  const allFaqs = faqCategories.flatMap((cat) =>
    cat.faqs.map((faq) => ({ ...faq, category: cat.label }))
  );

  const searchResults = searchQuery.trim()
    ? allFaqs.filter(
        (f) =>
          f.q.includes(searchQuery) ||
          f.a.includes(searchQuery) ||
          f.category.includes(searchQuery)
      )
    : null;

  const displayFaqs = searchResults ?? faqCategories[activeCategory].faqs;
  const totalFaqs = allFaqs.length;

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <div
          ref={section.ref}
          className={`anim-fade-up ${section.isVisible ? 'is-visible' : ''}`}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] text-[#00b4ff] mb-4">FAQ</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0a2540] mb-3">
                よくあるご質問
              </h2>
              <p className="text-[14px] text-[#5a7090] leading-relaxed max-w-xl">
                登録前の不安・疑問にすべてお答えします。<br className="hidden sm:inline" />
                全{totalFaqs}問を掲載。気になる質問をすぐに検索できます。
              </p>
            </div>
            <a
              href="#cta"
              className="border border-[#00b4ff] text-[#00b4ff] hover:bg-[#e6f4ff] font-bold px-5 py-2.5 rounded-full text-[13px] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <i className="ri-mail-line mr-1.5"></i>
              お問い合わせ
            </a>
          </div>

          {/* Trust points bar */}
          <div
            ref={trustAnim.ref}
            className={`grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10 anim-fade-up ${trustAnim.isVisible ? 'is-visible' : ''}`}
          >
            {TRUST_POINTS.map((t, i) => (
              <div
                key={t.title}
                className="flex items-start gap-3 bg-[#f7fafd] rounded-xl p-4 border border-[#e4eef7]"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className={`w-9 h-9 flex items-center justify-center rounded-lg shrink-0 ${t.color}`}>
                  <i className={`${t.icon} text-base`}></i>
                </div>
                <div>
                  <p className="text-[12px] font-bold text-[#0a2540] leading-tight">{t.title}</p>
                  <p className="text-[11px] text-[#5a7090] mt-0.5 leading-snug">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative mb-7">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center pointer-events-none">
              <i className="ri-search-line text-[#8ba0ba] text-base"></i>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="質問を検索… 例：「返金」「マンション」「解約」"
              className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-[#f7fafd] border border-[#e4eef7] focus:outline-none focus:ring-2 focus:ring-[#00b4ff]/30 focus:border-[#00b4ff] text-[14px] text-[#0a2540] placeholder-[#8ba0ba] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-[#8ba0ba] hover:text-[#0a2540] transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-base"></i>
              </button>
            )}
          </div>

          {/* Category tabs — hidden during search */}
          {!searchQuery && (
            <div className="flex flex-wrap gap-2 mb-8">
              {faqCategories.map((cat, i) => (
                <button
                  key={cat.label}
                  onClick={() => handleCategoryChange(i)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === i
                      ? 'bg-[#0a2540] text-white'
                      : 'bg-[#f7fafd] border border-[#e4eef7] text-[#5a7090] hover:border-[#c8dff0] hover:text-[#0a2540]'
                  }`}
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className={`${cat.icon} text-sm`}></i>
                  </div>
                  {cat.label}
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      activeCategory === i ? 'bg-white/20 text-white' : 'bg-white text-[#00b4ff]'
                    }`}
                  >
                    {cat.faqs.length}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Search result label */}
          {searchQuery && (
            <div className="flex items-center gap-2 mb-6">
              <i className="ri-search-line text-[#00b4ff] text-sm"></i>
              <p className="text-[13px] text-[#5a7090]">
                「<strong className="text-[#0a2540]">{searchQuery}</strong>」の検索結果：
                <strong className="text-[#0a2540] ml-1">{displayFaqs.length}件</strong>
              </p>
            </div>
          )}

          {/* Main grid */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* FAQ list */}
            <div
              className="lg:col-span-8 touch-pan-y"
              ref={faqSwipeRef}
              {...faqSwipeHandlers}
            >
              {/* Mobile swipe hint */}
              {!searchQuery && (
                <div className="md:hidden flex items-center justify-center gap-2 text-[11px] text-[#8ba0ba] mb-3">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-arrow-left-right-line text-sm"></i>
                  </div>
                  <span>スワイプでカテゴリ切替</span>
                </div>
              )}

              {displayFaqs.length === 0 ? (
                <div className="text-center py-16 bg-[#f7fafd] rounded-2xl border border-[#e4eef7]">
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full mx-auto mb-3 border border-[#e4eef7]">
                    <i className="ri-search-line text-[#8ba0ba] text-xl"></i>
                  </div>
                  <p className="text-[14px] font-bold text-[#0a2540] mb-1">該当する質問が見つかりませんでした</p>
                  <p className="text-[12px] text-[#5a7090]">別のキーワードで検索するか、お問い合わせください。</p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {displayFaqs.map((faq, i) => (
                    <li key={`${activeCategory}-${i}`}>
                      <AccordionItem
                        faq={faq}
                        isOpen={openIndex === i}
                        onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                      />
                    </li>
                  ))}
                </ul>
              )}

              {/* Bottom CTA strip */}
              <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#0a2540] to-[#1a3a5c] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-[14px] font-bold text-white mb-1">まだ疑問が解決しない方へ</p>
                  <p className="text-[12px] text-white/60">担当者が丁寧にご回答します。お気軽にどうぞ。</p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <a
                    href="#cta"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-4 py-2.5 rounded-full text-[12px] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-mail-line text-sm"></i>
                    メールで質問
                  </a>
                  <a
                    href="#cta"
                    className="inline-flex items-center gap-2 bg-[#00b4ff] hover:bg-[#0099e6] text-white font-bold px-4 py-2.5 rounded-full text-[12px] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-gift-line text-sm"></i>
                    先行登録する
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              {/* Registration CTA card */}
              <div className="bg-gradient-to-br from-[#0a2540] to-[#1a3a5c] rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#00b4ff]/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="relative">
                  <div className="inline-flex items-center gap-1.5 bg-[#00b4ff]/20 text-[#00b4ff] text-[10px] font-bold tracking-widest px-3 py-1 rounded-full mb-4">
                    <span className="w-1.5 h-1.5 bg-[#00b4ff] rounded-full animate-pulse inline-block"></span>
                    先行登録受付中
                  </div>
                  <p className="text-[20px] font-bold mb-1 leading-tight">
                    今なら<span className="text-[#00b4ff]">¥1,500 OFF</span><br />クーポン付き
                  </p>
                  <p className="text-[12px] text-white/60 leading-relaxed mb-5">
                    先行登録者限定の特典は枠がなくなり次第終了。無料・クレカ不要。
                  </p>
                  <a
                    href="#cta"
                    className="flex items-center justify-center gap-2 bg-[#00b4ff] hover:bg-[#0099e6] text-white font-bold px-4 py-3 rounded-xl text-[13px] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-gift-line"></i>
                    無料で先行登録する
                  </a>
                </div>
              </div>

              {/* Category navigator */}
              <div className="bg-[#f7fafd] border border-[#e4eef7] rounded-2xl p-5">
                <p className="text-[11px] font-bold text-[#0a2540] tracking-widest mb-4">カテゴリから探す</p>
                <ul className="space-y-1.5">
                  {faqCategories.map((cat, i) => (
                    <li key={cat.label}>
                      <button
                        onClick={() => { handleCategoryChange(i); setSearchQuery(''); }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left cursor-pointer transition-all ${
                          activeCategory === i && !searchQuery
                            ? 'bg-white border border-[#00b4ff]/30 text-[#0a2540]'
                            : 'hover:bg-white text-[#5a7090] hover:text-[#0a2540]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-5 h-5 flex items-center justify-center">
                            <i className={`${cat.icon} text-sm ${activeCategory === i && !searchQuery ? 'text-[#00b4ff]' : 'text-[#8ba0ba]'}`}></i>
                          </div>
                          <span className="text-[12px] font-medium">{cat.label}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          activeCategory === i && !searchQuery ? 'bg-[#e6f4ff] text-[#00b4ff]' : 'bg-white text-[#8ba0ba]'
                        }`}>
                          {cat.faqs.length}問
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick answers */}
              <div className="bg-white border border-[#e4eef7] rounded-2xl p-5">
                <p className="text-[11px] font-bold text-[#0a2540] tracking-widest mb-4">よく検索されるキーワード</p>
                <div className="flex flex-wrap gap-2">
                  {['返金保証', 'マンション', '解約方法', '先行登録', '料金', 'コーティング', '法人', 'プロ登録'].map((kw) => (
                    <button
                      key={kw}
                      onClick={() => setSearchQuery(kw)}
                      className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-[#f7fafd] border border-[#e4eef7] text-[#5a7090] hover:border-[#00b4ff]/40 hover:text-[#0a2540] transition-all cursor-pointer whitespace-nowrap"
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
