import { useEffect, useState } from 'react';
import { CAMPFIRE_URL } from '@/constants';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function formatNumber(n: number): string {
  return n.toString().padStart(2, '0');
}

export default function CountdownBadge() {
  // 2026年6月1日 00:00:00 JST
  const targetDate = new Date('2026-06-01T00:00:00+09:00');
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    setIsLive(true);
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const isExpired =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  return (
    <a
      href={CAMPFIRE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-5 bg-gradient-to-r from-[#00b4ff]/20 via-[#0099e6]/20 to-[#00d4b8]/20 backdrop-blur-md border border-[#00b4ff]/30 rounded-2xl px-5 sm:px-7 py-3.5 sm:py-4 transition-all duration-700 hover:border-[#00b4ff]/60 hover:shadow-[0_0_30px_rgba(0,180,255,0.15)] cursor-pointer group ${isLive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
    >
      {/* Glow orb behind */}
      <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#00b4ff]/20 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#00d4b8]/15 rounded-full blur-2xl pointer-events-none"></div>

      {/* Label */}
      <div className="flex items-center gap-2 shrink-0">
        {isExpired ? (
          <>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4b8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00d4b8]"></span>
            </span>
            <span className="text-[12px] sm:text-[13px] font-bold text-[#00d4b8] whitespace-nowrap tracking-wide">
              クラウドファンディング実施中
            </span>
          </>
        ) : (
          <>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00b4ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00b4ff]"></span>
            </span>
            <span className="text-[12px] sm:text-[13px] font-bold text-[#00b4ff] whitespace-nowrap tracking-wide">
              クラウドファンディング開始まで
            </span>
          </>
        )}
      </div>

      {/* Countdown numbers */}
      {isExpired ? (
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4b8] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00d4b8]"></span>
          </span>
          <span className="text-[13px] sm:text-[14px] font-bold text-[#00d4b8] whitespace-nowrap">
            応援受付中！今すぐチェック
          </span>
          <i className="ri-fire-line text-[#f59e0b] text-lg animate-pulse"></i>
        </div>
      ) : (
        <div className="flex items-center gap-2 sm:gap-3">
          {[
            { value: timeLeft.days, label: '日' },
            { value: timeLeft.hours, label: '時間' },
            { value: timeLeft.minutes, label: '分' },
            { value: timeLeft.seconds, label: '秒' },
          ].map((item, idx) => (
            <div key={item.label} className="flex items-center gap-2 sm:gap-3">
              <div className="flex flex-col items-center">
                <div className="bg-[#0a2540]/60 border border-[#00b4ff]/20 rounded-lg px-2 sm:px-2.5 py-1 min-w-[36px] sm:min-w-[44px] text-center group-hover:border-[#00b4ff]/40 transition-colors">
                  <span className="text-[17px] sm:text-[22px] font-black text-white tabular-nums leading-none">
                    {formatNumber(item.value)}
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-[#00b4ff]/70 font-bold mt-1">
                  {item.label}
                </span>
              </div>
              {idx < 3 && (
                <span className="text-[#00b4ff]/50 font-bold text-sm sm:text-base -mt-3">:</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Hover arrow */}
      <div className="hidden sm:flex items-center justify-center w-7 h-7 rounded-full bg-[#00b4ff]/10 border border-[#00b4ff]/20 ml-1 group-hover:bg-[#00b4ff]/25 group-hover:border-[#00b4ff]/40 transition-all">
        <i className="ri-arrow-right-up-line text-[#00b4ff] text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></i>
      </div>

      {/* Floating bubbles decoration */}
      <div className="absolute top-1 right-2 w-2 h-2 bg-[#00b4ff]/30 rounded-full animate-bounce" style={{ animationDuration: '2.5s' }}></div>
      <div className="absolute bottom-1 left-3 w-1.5 h-1.5 bg-[#00d4b8]/25 rounded-full animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
    </a>
  );
}