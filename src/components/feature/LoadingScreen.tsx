import { useEffect, useState } from "react";

const messages = [
  "準備中です...",
  "コンテンツを読み込み中...",
  "もうしばらくお待ちください...",
];

function FloatingBubbles() {
  const bubbles = Array.from({ length: 16 }).map((_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    size: `${8 + Math.random() * 28}px`,
    delay: `${Math.random() * 6}s`,
    duration: `${5 + Math.random() * 8}s`,
    opacity: 0.03 + Math.random() * 0.08,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full"
          style={{
            left: b.left,
            bottom: "-40px",
            width: b.size,
            height: b.size,
            opacity: b.opacity,
            background: `radial-gradient(circle at 30% 30%, rgba(0,153,230,0.5), rgba(0,153,230,0.1))`,
            animation: `loadBubble ${b.duration} ${b.delay} infinite ease-in`,
          }}
        />
      ))}
      <style>{`
        @keyframes loadBubble {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          15% { opacity: var(--bubble-opacity, 0.06); }
          50% { transform: translateY(-50vh) scale(1.15); }
          100% { transform: translateY(-110vh) scale(0.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function LoadingScreen() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a1628] overflow-hidden">
      {/* Background bubbles */}
      <FloatingBubbles />

      {/* Ripple rings */}
      <div className="relative mb-10 flex items-center justify-center">
        <div className="absolute inset-[-40px] rounded-full border border-[#0099e6]/10 animate-ping" style={{ animationDuration: "2s" }} />
        <div className="absolute inset-[-24px] rounded-full border border-[#0099e6]/15 animate-ping" style={{ animationDuration: "2.4s", animationDelay: "0.3s" }} />
        <div className="absolute inset-[-8px] rounded-full border border-[#0099e6]/20 animate-ping" style={{ animationDuration: "2.8s", animationDelay: "0.6s" }} />

        {/* Logo core */}
        <div className="relative h-[72px] w-[72px] flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#0099e6]/10 animate-pulse" style={{ animationDuration: "2s" }} />
          <div className="absolute inset-2 rounded-full bg-[#0099e6]/15 animate-pulse" style={{ animationDuration: "2.2s" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <i className="ri-drop-fill text-[40px] text-[#0099e6]" />
          </div>
        </div>
      </div>

      {/* Brand */}
      <p className="text-[13px] font-bold tracking-[0.25em] text-white/80 uppercase relative z-10">
        MobileWash
      </p>

      {/* Tagline */}
      <p className="mt-1 text-[10px] tracking-widest text-[#0099e6]/60 uppercase relative z-10">
        MOBILE CAR WASH & COATING
      </p>

      {/* Progress bar */}
      <div className="mt-8 w-48 h-[2px] bg-white/[0.06] rounded-full overflow-hidden relative z-10">
        <div
          className="h-full bg-gradient-to-r from-[#0099e6] to-[#00c8aa] rounded-full animate-[loadSlide_1.5s_ease-in-out_infinite]"
          style={{
            width: "40%",
          }}
        />
        <style>{`
          @keyframes loadSlide {
            0% { transform: translateX(-120%); }
            50% { transform: translateX(150%); }
            100% { transform: translateX(300%); }
          }
        `}</style>
      </div>

      {/* Message */}
      <p className="mt-5 text-[11px] text-white/35 transition-opacity duration-500 relative z-10 min-h-[1.25rem]">
        {messages[msgIndex]}
      </p>

      {/* Bouncing dots */}
      <div className="mt-4 flex items-center gap-1.5 relative z-10">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-[#0099e6] animate-bounce"
            style={{ animationDelay: `${i * 160}ms` }}
          />
        ))}
      </div>
    </div>
  );
}