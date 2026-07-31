import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function CorporateNavbar() {
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
    { href: '#features', label: '法人向け機能' },
    { href: '#plans', label: '料金プラン' },
    { href: '#cases', label: '導入事例' },
    { href: '#faq', label: 'よくある質問' },
    { href: '#contact', label: 'お問い合わせ' },
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
      <div className={`hidden lg:block border-b transition-all duration-300 ${
        scrolled
          ? 'bg-[#f7fbff] border-[#e4eef7]'
          : 'bg-[#0a2540]/60 border-white/10 backdrop-blur-sm'
      }`}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 flex justify-end items-center h-9 gap-6 text-[12px]">
          <Link to="/" className={`group relative transition-colors cursor-pointer pb-0.5 ${
            scrolled ? 'text-[#5a7090] hover:text-[#0099e6]' : 'text-white/70 hover:text-white'
          }`}>個人のお客様<span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0099e6] rounded-full origin-left scale-x-0 transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" /></Link>
          <span className={scrolled ? 'text-[#0099e6] font-bold' : 'text-[#00b4ff] font-bold'}>法人のお客様</span>
          <Link to="/#pro-recruit" className={`group relative transition-colors cursor-pointer pb-0.5 ${
            scrolled ? 'text-[#5a7090] hover:text-[#0099e6]' : 'text-white/70 hover:text-white'
          }`}>プロ募集<span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0099e6] rounded-full origin-left scale-x-0 transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" /></Link>
          <span className={scrolled ? 'text-[#cfdfee]' : 'text-white/20'}>|</span>
          <a href="#contact" className={`group relative transition-colors cursor-pointer pb-0.5 ${
            scrolled ? 'text-[#5a7090] hover:text-[#0099e6]' : 'text-white/70 hover:text-white'
          }`}>お問い合わせ<span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0099e6] rounded-full origin-left scale-x-0 transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" /></a>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-[68px]">
          <Link to="/" className="flex items-center gap-2.5 shrink-0 cursor-pointer">
            <img
              src="https://storage.readdy-site.link/project_files/c40f971a-8995-4350-8e33-e7b8168d5850/60df7e55-3821-4161-a8bd-e386660f21ef_mobile_wash_app_icon.png?v=1a084e8094f7ad1f039da984d9cffe58"
              alt="MobileWash"
              className="w-9 h-9 rounded-xl object-cover"
            />
            <div>
              <span className={`text-[17px] font-bold tracking-tight transition-colors ${
                scrolled ? 'text-[#0a2540]' : 'text-white'
              }`}>MobileWash</span>
              <span className="ml-2 text-[10px] font-bold text-white bg-[#0099e6] px-2 py-0.5 rounded-full">法人</span>
            </div>
          </Link>

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
                      ? 'text-[#00b4ff]'
                      : scrolled
                        ? 'text-[#1a3658] hover:text-[#0099e6]'
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${
                      scrolled ? 'bg-[#0099e6]' : 'bg-[#00b4ff]'
                    }`} />
                  )}
                  {!isActive && (
                    <span className={`absolute bottom-0 left-0 w-full h-[2px] rounded-full origin-left scale-x-0 transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 ${
                      scrolled ? 'bg-[#0099e6]' : 'bg-[#00b4ff]'
                    }`} />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              to="/"
              className={`text-[13px] font-bold px-4 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap border ${
                scrolled
                  ? 'text-[#5a7090] border-[#e4eef7] hover:border-[#0099e6] hover:text-[#0099e6]'
                  : 'text-white/80 border-white/25 hover:border-white hover:text-white'
              }`}
            >
              個人向けサイト
            </Link>
            <a
              href="#contact"
              className="text-[13px] font-bold text-white bg-[#0099e6] hover:bg-[#0077b3] px-5 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              無料相談する
            </a>
          </div>

          <button
            className="lg:hidden p-2 -mr-2 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="メニュー"
          >
            <i className={`${mobileOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl transition-colors ${
              scrolled ? 'text-[#0a2540]' : 'text-white'
            }`}></i>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#e4eef7] px-4 py-4 space-y-3">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 text-[14px] font-medium py-2 cursor-pointer transition-colors ${
                  isActive ? 'text-[#0099e6] font-bold' : 'text-[#1a3658] hover:text-[#0099e6]'
                }`}
              >
                {isActive && <span className="w-1 h-1 rounded-full bg-[#0099e6] shrink-0" />}
                {link.label}
              </a>
            );
          })}
          <div className="flex gap-2 pt-2">
            <Link to="/" className="flex-1 text-center text-[13px] font-bold text-[#5a7090] border border-[#e4eef7] px-4 py-2 rounded-full cursor-pointer whitespace-nowrap">
              個人向け
            </Link>
            <a href="#contact" className="flex-1 text-center text-[13px] font-bold text-white bg-[#0099e6] px-4 py-2 rounded-full cursor-pointer whitespace-nowrap">
              無料相談
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
