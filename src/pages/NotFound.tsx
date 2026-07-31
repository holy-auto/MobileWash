import { Link } from "react-router-dom";
import { useEffect, useMemo } from "react";

function Bubbles() {
  const bubbles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${16 + Math.random() * 48}px`,
      delay: `${Math.random() * 8}s`,
      duration: `${6 + Math.random() * 10}s`,
      opacity: 0.04 + Math.random() * 0.1,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full bg-[#0099e6]"
          style={{
            left: b.left,
            bottom: '-60px',
            width: b.size,
            height: b.size,
            opacity: b.opacity,
            animation: `rise ${b.duration} ${b.delay} infinite ease-in`,
          }}
        />
      ))}
      <style>{`
        @keyframes rise {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: var(--bubble-opacity, 0.08); }
          50% { transform: translateY(-50vh) scale(1.1); }
          100% { transform: translateY(-110vh) scale(0.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function GlowOrb({ className }: { className?: string }) {
  return (
    <div
      className={`absolute rounded-full blur-[100px] pointer-events-none ${className}`}
    />
  );
}

const quickLinks = [
  { label: "トップページ", href: "/", icon: "ri-home-4-line" },
  { label: "サービス紹介", href: "/#services", icon: "ri-car-washing-line" },
  { label: "料金プラン", href: "/#plans", icon: "ri-price-tag-3-line" },
  { label: "法人プラン", href: "/corporate", icon: "ri-building-2-line" },
  { label: "よくある質問", href: "/#faq", icon: "ri-questionnaire-line" },
  { label: "サイトマップ", href: "/sitemap", icon: "ri-map-2-line" },
];

export default function NotFound() {
  useEffect(() => {
    document.title = "ページが見つかりません | MobileWash";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'お探しのページが見つかりません。MobileWashのサイトマップまたはホームページから、目的のページをお探しください。出張洗車・コーティングサービスの情報はこちら。');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://mobilewash.app/');
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a1628] flex flex-col text-white overflow-hidden">
      {/* Background orbs */}
      <GlowOrb className="w-[500px] h-[500px] bg-[#0099e6]/10 -top-40 -left-40" />
      <GlowOrb className="w-[400px] h-[400px] bg-[#00c8aa]/8 top-1/3 right-0" />
      <GlowOrb className="w-[600px] h-[600px] bg-[#0099e6]/8 -bottom-60 left-1/3" />

      {/* Bubbles animation */}
      <Bubbles />

      {/* Header */}
      <header className="relative z-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-5">
          <Link
            to="/"
            className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img
              src="https://storage.readdy-site.link/project_files/c40f971a-8995-4350-8e33-e7b8168d5850/60df7e55-3821-4161-a8bd-e386660f21ef_mobile_wash_app_icon.png?v=1a084e8094f7ad1f039da984d9cffe58"
              alt="MobileWash"
              className="w-9 h-9 rounded-lg object-cover"
            />
            <div>
              <p className="text-white font-bold text-[15px] leading-tight">MobileWash</p>
              <p className="text-white/40 text-[9px] tracking-widest mt-0.5">MOBILE CAR WASH & COATING</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-10 py-12">
        <div className="max-w-[720px] w-full text-center">
          {/* Big 404 with icon */}
          <div className="relative mb-10 select-none">
            <p className="text-[140px] sm:text-[200px] md:text-[260px] font-black leading-none tracking-tighter bg-gradient-to-b from-white/10 via-white/5 to-transparent bg-clip-text text-transparent">
              404
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center rounded-3xl bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm shadow-[0_0_60px_rgba(0,153,230,0.15)]">
                <i className="ri-car-washing-line text-[#0099e6] text-3xl sm:text-4xl md:text-5xl"></i>
              </div>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-xl sm:text-2xl md:text-[28px] font-bold text-white mb-3 tracking-tight">
            お探しのページが見つかりません
          </h1>
          <p className="text-[13px] sm:text-[14px] text-white/50 leading-relaxed max-w-md mx-auto mb-10">
            ご指定のページは削除されたか、URLが変更された可能性があります。
            以下のリンクから、目的のページをお探しください。
          </p>

          {/* Quick Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="group flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] hover:border-[#0099e6]/30 px-4 py-3 transition-all duration-300 cursor-pointer"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.06] group-hover:bg-[#0099e6]/15 transition-colors shrink-0">
                  <i className={`${link.icon} text-white/60 group-hover:text-[#0099e6] text-sm transition-colors`}></i>
                </div>
                <span className="text-[12px] sm:text-[13px] text-white/80 group-hover:text-white font-medium whitespace-nowrap transition-colors">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#0099e6] hover:bg-[#0077b3] text-white font-bold px-7 py-3 rounded-full transition-colors text-[13px] cursor-pointer whitespace-nowrap shadow-[0_0_30px_rgba(0,153,230,0.25)] hover:shadow-[0_0_40px_rgba(0,153,230,0.35)]"
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-home-line text-sm"></i>
              </div>
              ホームに戻る
            </Link>
            <Link
              to="/sitemap"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold px-7 py-3 rounded-full transition-colors text-[13px] cursor-pointer whitespace-nowrap border border-white/15 hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.06]"
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-map-2-line text-sm"></i>
              </div>
              サイトマップを見る
            </Link>
          </div>

          {/* Bottom tip */}
          <p className="mt-10 text-[11px] text-white/25">
            それでも見つからない場合は、カスタマーサポート（03-4363-3234）までお問い合わせください
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/[0.06]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-white/30">© 2026 MobileWash, Inc. All rights reserved.</p>
            <div className="flex gap-x-5 text-[11px] text-white/35">
              <Link to="/legal/terms" className="hover:text-white/70 transition-colors cursor-pointer">利用規約</Link>
              <Link to="/legal/privacy" className="hover:text-white/70 transition-colors cursor-pointer">プライバシーポリシー</Link>
              <Link to="/legal/consumer-law" className="hover:text-white/70 transition-colors cursor-pointer">特定商取引法に基づく表記</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}