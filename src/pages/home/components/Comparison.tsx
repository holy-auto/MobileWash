import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ROWS = [
  {
    icon: 'ri-smartphone-line',
    label: '予約方法',
    mw: { text: 'アプリで30秒', score: 98, detail: 'タップ数3回で予約完了' },
    trad: { text: '電話・店舗持込', score: 30, detail: '営業時間内に電話が必要' },
  },
  {
    icon: 'ri-map-pin-line',
    label: '施工場所',
    mw: { text: '自宅・職場へ出張', score: 100, detail: '駐車場があればどこでもOK' },
    trad: { text: '店舗まで来店必須', score: 20, detail: '往復の移動時間が発生' },
  },
  {
    icon: 'ri-time-line',
    label: '所要時間',
    mw: { text: '最短45分〜', score: 90, detail: '待ち時間ゼロ・施工中は自由' },
    trad: { text: '半日〜1日', score: 25, detail: '待ち時間込みで半日拘束' },
  },
  {
    icon: 'ri-price-tag-3-line',
    label: '料金の透明性',
    mw: { text: '事前確定・追加なし', score: 100, detail: '予約時に最終金額が確定' },
    trad: { text: '現地で見積もり', score: 35, detail: '追加料金が発生することも' },
  },
  {
    icon: 'ri-user-star-line',
    label: 'プロの品質',
    mw: { text: '認定プロ・評価制', score: 95, detail: '審査通過＋ユーザー評価で管理' },
    trad: { text: '店舗ごとにバラつき', score: 50, detail: 'スタッフの経験値に依存' },
  },
  {
    icon: 'ri-bank-card-line',
    label: '決済方法',
    mw: { text: 'アプリで自動決済', score: 100, detail: 'Apple Pay / Google Pay 対応' },
    trad: { text: '現金・カード払い', score: 45, detail: '現金のみの店舗も多い' },
  },
  {
    icon: 'ri-shield-check-line',
    label: '品質保証',
    mw: { text: '全額返金保証付き', score: 100, detail: '24時間以内なら無料再施工' },
    trad: { text: '保証なし・要交渉', score: 20, detail: 'クレーム対応は店舗次第' },
  },
];

const MW_COLOR = '#00b4ff';
const TRAD_COLOR = '#94a3b8';

function ScoreBar({ score, color, delay }: { score: number; color: string; delay: number }) {
  const anim = useScrollAnimation({ threshold: 0.1 });
  return (
    <div ref={anim.ref} className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[#f0f5fa] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: anim.isVisible ? `${score}%` : '0%',
            backgroundColor: color,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
      <span className="text-[11px] font-bold w-7 text-right" style={{ color }}>
        {score}
      </span>
    </div>
  );
}

function ComparisonRow({
  row,
  index,
  isHighlighted,
  onHover,
  onLeave,
}: {
  row: typeof ROWS[0];
  index: number;
  isHighlighted: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const anim = useScrollAnimation({ threshold: 0.15 });

  return (
    <div
      ref={anim.ref}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`grid grid-cols-[1fr_2fr_2fr] gap-0 border-b border-[#f0f5fa] last:border-0 transition-all duration-300 cursor-default anim-fade-up ${anim.isVisible ? 'is-visible' : ''} ${isHighlighted ? 'bg-[#f0f9ff]' : 'bg-white hover:bg-[#fafcff]'}`}
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      {/* Label */}
      <div className="p-4 lg:p-5 flex items-center gap-3 border-r border-[#f0f5fa]">
        <div className={`w-8 h-8 flex items-center justify-center rounded-lg shrink-0 transition-colors duration-300 ${isHighlighted ? 'bg-[#e6f4ff]' : 'bg-[#f7fafd]'}`}>
          <i className={`${row.icon} text-sm ${isHighlighted ? 'text-[#00b4ff]' : 'text-[#8ba0ba]'}`}></i>
        </div>
        <span className="text-[13px] font-bold text-[#0a2540] leading-tight">{row.label}</span>
      </div>

      {/* MobileWash */}
      <div className="p-4 lg:p-5 border-r border-[#f0f5fa]">
        <div className="flex items-start gap-2 mb-2">
          <div className="w-4 h-4 flex items-center justify-center rounded-full bg-[#00b4ff] shrink-0 mt-0.5">
            <i className="ri-check-line text-white text-[9px]"></i>
          </div>
          <div>
            <p className="text-[13px] font-bold text-[#0a2540] leading-tight">{row.mw.text}</p>
            <p className="text-[11px] text-[#5a7090] mt-0.5">{row.mw.detail}</p>
          </div>
        </div>
        <ScoreBar score={row.mw.score} color={MW_COLOR} delay={index * 60} />
      </div>

      {/* Traditional */}
      <div className="p-4 lg:p-5">
        <div className="flex items-start gap-2 mb-2">
          <div className="w-4 h-4 flex items-center justify-center rounded-full bg-[#e4eef7] shrink-0 mt-0.5">
            <i className="ri-subtract-line text-[#94a3b8] text-[9px]"></i>
          </div>
          <div>
            <p className="text-[13px] font-medium text-[#5a7090] leading-tight">{row.trad.text}</p>
            <p className="text-[11px] text-[#94a3b8] mt-0.5">{row.trad.detail}</p>
          </div>
        </div>
        <ScoreBar score={row.trad.score} color={TRAD_COLOR} delay={index * 60 + 100} />
      </div>
    </div>
  );
}

export default function Comparison() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const heading = useScrollAnimation({ threshold: 0.1 });
  const heroAnim = useScrollAnimation({ threshold: 0.08 });
  const ctaAnim = useScrollAnimation({ threshold: 0.1 });

  const mwTotal = Math.round(ROWS.reduce((s, r) => s + r.mw.score, 0) / ROWS.length);
  const tradTotal = Math.round(ROWS.reduce((s, r) => s + r.trad.score, 0) / ROWS.length);

  return (
    <section className="py-20 sm:py-28 bg-[#f7fafd] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#e4eef7] to-transparent"></div>
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-[#e4eef7] to-transparent"></div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 relative">

        {/* Header */}
        <div
          ref={heading.ref}
          className={`text-center max-w-2xl mx-auto mb-12 anim-fade-up ${heading.isVisible ? 'is-visible' : ''}`}
        >
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#00b4ff] mb-4">Comparison</p>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#0a2540] mb-4">
            出張型 vs 従来型、<br className="sm:hidden" />7項目で比較
          </h2>
          <p className="text-[15px] text-[#5a7090] leading-relaxed">
            ガソリンスタンドや専門店との違いを、スコアで可視化しました。
          </p>
        </div>

        {/* Hero score cards */}
        <div
          ref={heroAnim.ref}
          className={`grid sm:grid-cols-2 gap-4 mb-8 anim-fade-up ${heroAnim.isVisible ? 'is-visible' : ''}`}
        >
          {/* MobileWash card */}
          <div className="relative bg-gradient-to-br from-[#0a2540] to-[#1a3a5c] rounded-2xl p-6 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00b4ff]/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-[#00b4ff]/20 text-[#00b4ff] text-[10px] font-bold tracking-widest px-3 py-1 rounded-full mb-3">
                  <i className="ri-trophy-line text-xs"></i>
                  WINNER
                </div>
                <p className="text-[11px] font-bold tracking-widest text-white/50 mb-1">MOBILEWASH</p>
                <p className="text-[17px] font-bold text-white">出張型アプリ</p>
              </div>
              <div className="text-right">
                <p className="text-[52px] font-bold leading-none text-white">{mwTotal}</p>
                <p className="text-[11px] text-white/50 mt-1">総合スコア / 100</p>
              </div>
            </div>
            <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: heroAnim.isVisible ? `${mwTotal}%` : '0%',
                  background: 'linear-gradient(90deg, #00b4ff, #00d4b8)',
                }}
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {['予約30秒', '出張対応', '全額返金保証'].map((tag) => (
                <span key={tag} className="text-[10px] font-bold bg-white/10 text-white/80 px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Traditional card */}
          <div className="bg-white rounded-2xl p-6 border border-[#e4eef7]">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-[#f0f5fa] text-[#94a3b8] text-[10px] font-bold tracking-widest px-3 py-1 rounded-full mb-3">
                  <i className="ri-store-2-line text-xs"></i>
                  TRADITIONAL
                </div>
                <p className="text-[11px] font-bold tracking-widest text-[#94a3b8] mb-1">TRADITIONAL</p>
                <p className="text-[17px] font-bold text-[#5a7090]">従来型店舗</p>
              </div>
              <div className="text-right">
                <p className="text-[52px] font-bold leading-none text-[#94a3b8]">{tradTotal}</p>
                <p className="text-[11px] text-[#94a3b8] mt-1">総合スコア / 100</p>
              </div>
            </div>
            <div className="mt-4 h-2 bg-[#f0f5fa] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#cbd5e1] rounded-full transition-all duration-1000 ease-out"
                style={{ width: heroAnim.isVisible ? `${tradTotal}%` : '0%' }}
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {['来店必須', '待ち時間あり', '料金不透明'].map((tag) => (
                <span key={tag} className="text-[10px] font-medium bg-[#f7fafd] text-[#94a3b8] px-2.5 py-1 rounded-full border border-[#e4eef7]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Comparison table */}
        <div className="hidden sm:block bg-white rounded-2xl border border-[#e4eef7] overflow-hidden mb-8">
          <div className="grid grid-cols-[1fr_2fr_2fr] bg-[#f7fafd] border-b border-[#e4eef7]">
            <div className="p-4 lg:p-5 border-r border-[#f0f5fa]">
              <p className="text-[10px] font-bold text-[#8ba0ba] tracking-widest">比較項目</p>
            </div>
            <div className="p-4 lg:p-5 border-r border-[#f0f5fa]">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#00b4ff]">
                  <i className="ri-check-line text-white text-[9px]"></i>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#00b4ff] tracking-widest leading-tight">MOBILEWASH</p>
                  <p className="text-[12px] font-bold text-[#0a2540]">出張型アプリ</p>
                </div>
                <span className="ml-auto text-[9px] font-bold bg-[#00b4ff] text-white px-2 py-0.5 rounded-full">BEST</span>
              </div>
            </div>
            <div className="p-4 lg:p-5">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#e4eef7]">
                  <i className="ri-store-2-line text-[#94a3b8] text-[9px]"></i>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#94a3b8] tracking-widest leading-tight">TRADITIONAL</p>
                  <p className="text-[12px] font-bold text-[#5a7090]">従来型店舗</p>
                </div>
              </div>
            </div>
          </div>

          {ROWS.map((row, i) => (
            <ComparisonRow
              key={row.label}
              row={row}
              index={i}
              isHighlighted={hoveredRow === i}
              onHover={() => setHoveredRow(i)}
              onLeave={() => setHoveredRow(null)}
            />
          ))}
        </div>

        {/* Mobile Comparison cards */}
        <div className="sm:hidden space-y-3 mb-8">
          {ROWS.map((row) => (
            <div key={row.label} className="bg-white rounded-2xl border border-[#e4eef7] p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#f7fafd]">
                  <i className={`${row.icon} text-sm text-[#8ba0ba]`}></i>
                </div>
                <span className="text-[13px] font-bold text-[#0a2540]">{row.label}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#f0f9ff] rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-4 h-4 flex items-center justify-center rounded-full bg-[#00b4ff]">
                      <i className="ri-check-line text-white text-[9px]"></i>
                    </div>
                    <span className="text-[10px] font-bold text-[#00b4ff]">MobileWash</span>
                  </div>
                  <p className="text-[13px] font-bold text-[#0a2540] leading-tight">{row.mw.text}</p>
                  <p className="text-[11px] text-[#5a7090] mt-0.5">{row.mw.detail}</p>
                  <div className="mt-2 h-1.5 bg-white rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-[#00b4ff]" style={{ width: `${row.mw.score}%` }} />
                  </div>
                  <p className="text-[10px] text-[#00b4ff] font-bold mt-1 text-right">{row.mw.score}点</p>
                </div>
                <div className="bg-[#f7fafd] rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-4 h-4 flex items-center justify-center rounded-full bg-[#e4eef7]">
                      <i className="ri-subtract-line text-[#94a3b8] text-[9px]"></i>
                    </div>
                    <span className="text-[10px] font-bold text-[#94a3b8]">従来型</span>
                  </div>
                  <p className="text-[13px] font-medium text-[#5a7090] leading-tight">{row.trad.text}</p>
                  <p className="text-[11px] text-[#94a3b8] mt-0.5">{row.trad.detail}</p>
                  <div className="mt-2 h-1.5 bg-white rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-[#cbd5e1]" style={{ width: `${row.trad.score}%` }} />
                  </div>
                  <p className="text-[10px] text-[#94a3b8] font-bold mt-1 text-right">{row.trad.score}点</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom summary cards */}
        <div
          ref={ctaAnim.ref}
          className={`anim-fade-up ${ctaAnim.isVisible ? 'is-visible' : ''}`}
        >
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                icon: 'ri-time-line',
                color: 'bg-sky-50 text-sky-600',
                title: '平均スコア差',
                value: `+${mwTotal - tradTotal}点`,
                desc: '全7項目でMobileWashが上回る',
              },
              {
                icon: 'ri-trophy-line',
                color: 'bg-amber-50 text-amber-600',
                title: '完全勝利項目',
                value: `${ROWS.filter(r => r.mw.score >= 95).length}/${ROWS.length}項目`,
                desc: '予約・場所・料金・保証で満点',
              },
              {
                icon: 'ri-arrow-up-line',
                color: 'bg-emerald-50 text-emerald-600',
                title: '最大スコア差',
                value: `+${Math.max(...ROWS.map(r => r.mw.score - r.trad.score))}点`,
                desc: '施工場所・品質保証で圧倒的差',
              },
            ].map((card, i) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl border border-[#e4eef7] p-5 flex items-center gap-4"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={`w-10 h-10 flex items-center justify-center rounded-xl shrink-0 ${card.color}`}>
                  <i className={`${card.icon} text-base`}></i>
                </div>
                <div>
                  <p className="text-[11px] text-[#5a7090] font-medium">{card.title}</p>
                  <p className="text-[20px] font-bold text-[#0a2540] leading-tight">{card.value}</p>
                  <p className="text-[11px] text-[#8ba0ba]">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#0a2540] to-[#1a3a5c] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p className="text-[13px] font-bold text-[#00b4ff] mb-1">MobileWashを選ぶ理由は明確です</p>
              <p className="text-[20px] sm:text-[22px] font-bold text-white leading-tight">
                7項目すべてで従来型を上回る、<br className="hidden sm:inline" />新しい洗車体験を。
              </p>
            </div>
            <a
              href="#cta"
              className="inline-flex items-center gap-2 bg-[#00b4ff] hover:bg-[#0099e6] text-white font-bold px-7 py-3.5 rounded-full transition-colors text-[14px] cursor-pointer whitespace-nowrap shrink-0"
            >
              <i className="ri-gift-line"></i>
              先行登録する（無料）
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}