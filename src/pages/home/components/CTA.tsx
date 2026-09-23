import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'react-router-dom';

export default function CTA() {
  const section = useScrollAnimation({ threshold: 0.06 });

  return (
    <section id="cta" className="py-20 sm:py-28 bg-[#f7fafd] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00b4ff]/30 to-transparent"></div>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#00b4ff]/6 to-transparent rounded-full blur-3xl"></div>
        {/* Floating bubbles */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-[#00b4ff]/15 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-40 right-20 w-2 h-2 bg-[#00d4b8]/15 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-20 w-1.5 h-1.5 bg-[#00b4ff]/10 rounded-full animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 relative">

        {/* Corporate CTA Banner */}
        <div
          ref={section.ref}
          className={`rounded-2xl border border-[#e4eef7] bg-white px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 anim-fade-up ${section.isVisible ? 'is-visible' : ''}`}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0a2540] shrink-0">
              <i className="ri-building-2-line text-white text-lg"></i>
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#0a2540]">
                法人・フリート向けプランをお探しですか？
              </p>
              <p className="text-[12px] text-[#5a7090] mt-0.5">
                5台以上の車両管理に特化した法人プランをご用意。専任担当者が対応します。
              </p>
            </div>
          </div>
          <Link
            to="/corporate"
            className="inline-flex items-center gap-2 bg-[#0a2540] hover:bg-[#1a3658] text-white font-bold px-5 py-2.5 rounded-full transition-colors text-[13px] cursor-pointer whitespace-nowrap shrink-0"
          >
            法人プランを見る
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-right-line"></i>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}