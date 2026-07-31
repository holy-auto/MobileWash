export default function CorporateHero() {
  const handleBrochureClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('requestBrochure'));
      }, 600);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-[#0a2540] via-[#0e2d52] to-[#143a6b] pt-[108px] lg:pt-[122px] pb-20 lg:pb-28 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#00b4ff] rounded-full opacity-10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-[#00d4b8] rounded-full opacity-10 blur-3xl pointer-events-none"></div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* ── Left: copy ── */}
          <div className="lg:col-span-6 pt-2">
            <div className="inline-flex items-center gap-2 bg-[#00b4ff]/15 border border-[#00b4ff]/30 text-[#00b4ff] text-[11px] font-bold px-3 py-1.5 rounded-full mb-6">
              <i className="ri-building-line text-sm"></i>
              法人・フリート向けプラン
            </div>

            <h1 className="text-[38px] sm:text-5xl lg:text-[54px] font-bold text-white mb-6 leading-tight">
              社用車の洗車を、<br />
              <span className="text-[#00b4ff]">もっとスマートに。</span>
            </h1>

            <p className="text-[15px] sm:text-lg text-white/75 leading-relaxed mb-10 max-w-xl">
              MobileWash 法人プランは、社用車・営業車・フリート車両の出張洗車・コーティングを一括管理。
              請求書払い・複数台割引・専属プロ手配で、企業の車両管理コストを削減します。
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-[#00b4ff] hover:bg-[#0099e6] text-white font-bold px-8 py-4 rounded-full transition-colors text-[15px] cursor-pointer whitespace-nowrap"
              >
                <i className="ri-mail-send-line"></i>
                無料で相談する
              </a>
              <button
                type="button"
                onClick={handleBrochureClick}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-full transition-colors text-[15px] cursor-pointer whitespace-nowrap"
              >
                <i className="ri-file-download-line"></i>
                資料ダウンロード
                <span className="bg-[#00d4b8] text-[#0a2540] text-[10px] font-black px-2 py-0.5 rounded-full ml-1">無料</span>
              </button>
              <a
                href="#plans"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/70 hover:text-white hover:bg-white/10 font-semibold px-6 py-4 rounded-full transition-colors text-[14px] cursor-pointer whitespace-nowrap"
              >
                料金を見る
                <i className="ri-arrow-down-line"></i>
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {[
                { icon: 'ri-building-2-line', label: '法人請求書払い対応' },
                { icon: 'ri-car-line', label: '複数台一括管理' },
                { icon: 'ri-user-star-line', label: '専属プロ手配可' },
                { icon: 'ri-shield-check-line', label: '保険補償完備' },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-2 text-white/70">
                  <i className={`${b.icon} text-[#00b4ff] text-base`}></i>
                  <span className="text-[13px] font-medium">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: image + stats card ── */}
          <div className="lg:col-span-6 flex flex-col gap-4">

            {/* Car image */}
            <div className="relative w-full h-[240px] sm:h-[280px] lg:h-[300px] rounded-2xl overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=fleet%20of%20clean%20corporate%20business%20cars%20parked%20in%20a%20row%20in%20a%20modern%20parking%20lot%2C%20professional%20car%20wash%20service%2C%20shiny%20black%20and%20white%20sedans%2C%20soft%20natural%20light%2C%20clean%20minimal%20background%2C%20high%20quality%20automotive%20photography&width=800&height=400&seq=corp-hero-car-01&orientation=landscape"
                alt="法人・フリート車両の出張洗車"
                className="w-full h-full object-cover object-center"
              />
              {/* Dark overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/70 via-[#0a2540]/20 to-transparent"></div>

              {/* Floating badge on image */}
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <div className="bg-white/15 backdrop-blur border border-white/20 rounded-xl px-4 py-2.5 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#00d4b8] rounded-full animate-pulse"></span>
                  <span className="text-white text-[12px] font-bold">出張プロが駐車場まで来る</span>
                </div>
              </div>

              {/* Top-right badge */}
              <div className="absolute top-4 right-4 bg-[#00b4ff] text-white text-[11px] font-bold px-3 py-1.5 rounded-full">
                最大30% OFF
              </div>
            </div>

            {/* Stats card */}
            <div className="bg-white/8 border border-white/15 rounded-2xl p-6 backdrop-blur">
              <p className="text-[11px] font-bold tracking-[0.2em] text-[#00b4ff] mb-4">法人プランの強み</p>
              <ul className="grid grid-cols-2 gap-4">
                {[
                  { num: '最大30%', label: '複数台割引', desc: '5台以上で適用' },
                  { num: '¥0', label: '初期費用', desc: '登録料・手数料なし' },
                  { num: '翌月末', label: '請求書払い', desc: '月次まとめ請求' },
                  { num: '専属', label: 'プロ担当者', desc: '品質を安定化' },
                ].map((item) => (
                  <li key={item.label} className="bg-white/8 rounded-xl p-4">
                    <p className="text-lg font-bold text-[#00b4ff] leading-none mb-1">{item.num}</p>
                    <p className="text-[13px] font-bold text-white">{item.label}</p>
                    <p className="text-[11px] text-white/50 mt-0.5">{item.desc}</p>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-5 w-full flex items-center justify-center gap-2 bg-[#00b4ff] hover:bg-[#0099e6] text-white font-bold py-3.5 rounded-full transition-colors text-[14px] cursor-pointer whitespace-nowrap"
              >
                資料請求・無料相談はこちら
                <i className="ri-arrow-right-line"></i>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
