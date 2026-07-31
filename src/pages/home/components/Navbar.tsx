import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CAMPFIRE_URL } from '@/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: 'サービス' },
    { href: '#plans', label: '料金プラン' },
    { href: '#how-it-works', label: 'ご利用の流れ' },
    { href: '#areas', label: '対応エリア' },
    { href: '#faq', label: 'よくある質問' },
  ];

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
    const visibleMap = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleMap.set(entry.target.id, entry.intersectionRatio);
        });
        let maxRatio = 0;
        let current = '';
        visibleMap.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            current = id;
          }
        });
        if (current) setActiveSection(current);
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0], rootMargin: '-10% 0px -40% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur border-b border-[#e4eef7]' : 'bg-transparent'
      }`}
    >
      {/* Top bar */}
      <div className={`hidden lg:block border-b transition-all duration-300 ${scrolled ? 'bg-[#f7fbff] border-[#e4eef7]' : 'bg-white/5 border-white/10'}`}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 flex justify-end items-center h-9 gap-6 text-[12px]">
          <a href="#cta" className={`group relative transition-colors cursor-pointer hover:text-[#0099e6] pb-0.5 ${scrolled ? 'text-[#5a7090]' : 'text-white/70'}`}>個人のお客様<span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0099e6] rounded-full origin-left scale-x-0 transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" /></a>
          <Link to="/corporate" className={`group relative transition-colors cursor-pointer hover:text-[#0099e6] pb-0.5 ${scrolled ? 'text-[#5a7090]' : 'text-white/70'}`}>法人のお客様<span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0099e6] rounded-full origin-left scale-x-0 transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" /></Link>
          <a href="#pro-recruit" className={`group relative transition-colors cursor-pointer hover:text-[#0099e6] pb-0.5 ${scrolled ? 'text-[#5a7090]' : 'text-white/70'}`}>プロ募集<span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0099e6] rounded-full origin-left scale-x-0 transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" /></a>
          <span className={scrolled ? 'text-[#cfdfee]' : 'text-white/20'}>|</span>
          <a href="#faq" className={`group relative transition-colors cursor-pointer hover:text-[#0099e6] pb-0.5 ${scrolled ? 'text-[#5a7090]' : 'text-white/70'}`}>お問い合わせ<span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0099e6] rounded-full origin-left scale-x-0 transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" /></a>
          <span className={scrolled ? 'text-[#cfdfee]' : 'text-white/20'}>|</span>
          <span className={scrolled ? 'text-[#5a7090]' : 'text-white/70'}>JA</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-[68px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 cursor-pointer">
            <img
              src="https://storage.readdy-site.link/project_files/c40f971a-8995-4350-8e33-e7b8168d5850/60df7e55-3821-4161-a8bd-e386660f21ef_mobile_wash_app_icon.png?v=1a084e8094f7ad1f039da984d9cffe58"
              alt="MobileWash"
              className="w-9 h-9 rounded-xl object-cover"
            />
            <span className={`text-[17px] font-bold tracking-tight transition-colors duration-300 ${scrolled ? 'text-[#0a2540]' : 'text-white'}`}>MobileWash</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`group relative text-[14px] font-medium transition-colors cursor-pointer pb-1 ${
                    isActive
                      ? 'text-[#0099e6]'
                      : scrolled ? 'text-[#1a3658] hover:text-[#0099e6]' : 'text-white/85 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0099e6] rounded-full" />
                  )}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0099e6] rounded-full origin-left scale-x-0 transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            <a
              href={CAMPFIRE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[13px] font-bold px-5 py-2.5 rounded-full transition-colors cursor-pointer whitespace-nowrap border ${
                scrolled
                  ? 'text-[#0099e6] border-[#0099e6] hover:bg-[#e6f4ff]'
                  : 'text-white border-white/40 hover:bg-white/10'
              }`}
            >
              プロジェクトを見る
            </a>
            <a
              href={CAMPFIRE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-bold text-white bg-[#0099e6] hover:bg-[#0077b3] px-5 py-2.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              CAMPFIREで応援する
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -mr-2 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="メニュー"
          >
            <i className={`${mobileOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl transition-colors ${scrolled ? 'text-[#0a2540]' : 'text-white'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#e4eef7] px-4 py-5 space-y-3">
          {/* Utility nav for mobile */}
          <div className="flex items-center justify-center gap-4 pb-3 border-b border-[#f0f5fa]">
            <a href="#cta" onClick={() => setMobileOpen(false)} className="text-[12px] font-medium text-[#5a7090] hover:text-[#0099e6] cursor-pointer">個人のお客様</a>
            <Link to="/corporate" onClick={() => setMobileOpen(false)} className="text-[12px] font-medium text-[#5a7090] hover:text-[#0099e6] cursor-pointer">法人のお客様</Link>
            <a href="#pro-recruit" onClick={() => setMobileOpen(false)} className="text-[12px] font-medium text-[#5a7090] hover:text-[#0099e6] cursor-pointer">プロ募集</a>
          </div>
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 text-[15px] font-medium py-2.5 px-2 cursor-pointer transition-colors rounded-lg ${
                  isActive ? 'text-[#0099e6] font-bold bg-[#f0f9ff]' : 'text-[#1a3658] hover:text-[#0099e6]'
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#0099e6] shrink-0" />}
                {link.label}
              </a>
            );
          })}
          <div className="flex gap-2 pt-3">
            <a href={CAMPFIRE_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="flex-1 text-center text-[13px] font-bold text-[#0099e6] border border-[#0099e6] px-4 py-3 rounded-full cursor-pointer whitespace-nowrap">
              プロジェクトを見る
            </a>
            <a href={CAMPFIRE_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="flex-1 text-center text-[13px] font-bold text-white bg-[#0099e6] px-4 py-3 rounded-full cursor-pointer whitespace-nowrap">
              応援する
            </a>
          </div>
        </div>
      )}
    </header>
  );
}