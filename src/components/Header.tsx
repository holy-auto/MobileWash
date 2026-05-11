"use client";

import { useEffect, useState } from "react";

const mainNav = [
  { href: "/#services", label: "サービス", section: "services" },
  { href: "/#plans", label: "料金プラン", section: "plans" },
  { href: "/#how-it-works", label: "ご利用の流れ", section: "how-it-works" },
  { href: "/areas", label: "対応エリア", section: null },
  { href: "/guide/mobile-wash", label: "出張洗車ガイド", section: null },
  { href: "/#faq", label: "よくある質問", section: "faq" },
];

const utilityNav = [
  { href: "#cta", label: "個人のお客様" },
  { href: "#cta", label: "法人のお客様" },
  { href: "#pro-recruit", label: "プロ募集" },
];

const SECTION_IDS = [
  "services",
  "features",
  "plans",
  "how-it-works",
  "areas",
  "stories",
  "faq",
  "pro-recruit",
  "cta",
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (elements.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.1, 0.3, 0.5] },
    );
    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (section: string | null) =>
    section !== null && section === activeSection;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b transition-shadow duration-200 ${
        scrolled
          ? "border-[#e4eef7] shadow-[0_6px_20px_-12px_rgba(10,37,64,0.15)]"
          : "border-transparent"
      }`}
    >
      <div className="hidden lg:block bg-[#f7fbff] border-b border-[#e4eef7]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 flex justify-end items-center h-9 gap-6 text-[12px]">
          {utilityNav.map((u) => (
            <a
              key={u.label}
              href={u.href}
              className="text-[#5a7090] hover:text-[#0099e6] transition-colors"
            >
              {u.label}
            </a>
          ))}
          <span className="text-[#cfdfee]">|</span>
          <a href="#" className="text-[#5a7090] hover:text-[#0099e6] transition-colors">
            お問い合わせ
          </a>
          <span className="text-[#cfdfee]">|</span>
          <a href="#" className="text-[#5a7090] hover:text-[#0099e6] transition-colors flex items-center gap-1">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            JA
          </a>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-[68px]">
          <a href="#" className="flex items-center gap-2.5 shrink-0" aria-label="MobileWash ホームへ">
            <div className="logo-mark w-9 h-9 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M5 11l1.5-4.5A2 2 0 018.4 5h7.2a2 2 0 011.9 1.5L19 11h.5a1.5 1.5 0 011.5 1.5V17a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H6v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-4.5A1.5 1.5 0 014.5 11H5zm2.2 0h9.6L15.6 7.3a.5.5 0 00-.5-.3H8.9a.5.5 0 00-.5.3L7.2 11zM7 14a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            </div>
            <span className="text-[17px] font-bold text-[#0a2540] tracking-tight">
              MobileWash
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-7" aria-label="メインメニュー">
            {mainNav.map((item) => {
              const active = isActive(item.section);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "true" : undefined}
                  className={`relative text-[14px] font-medium transition-colors py-1 ${
                    active
                      ? "text-[#0099e6]"
                      : "text-[#1a3658] hover:text-[#0099e6]"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 right-0 -bottom-1 h-[2px] rounded-full bg-[#0099e6] origin-center transition-transform duration-200 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2.5">
            <a
              href="#cta"
              className="text-[13px] font-bold text-[#0099e6] border border-[#0099e6] hover:bg-[#e6f4ff] px-4 py-2 rounded-full transition-colors"
            >
              事前登録
            </a>
            <a
              href="#cta"
              className="text-[13px] font-bold text-white bg-[#0099e6] hover:bg-[#0077b3] px-5 py-2 rounded-full transition-colors inline-flex items-center gap-1"
            >
              アプリをダウンロード
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <svg
              className="w-6 h-6 text-[#0a2540]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="メニューを閉じる"
            className="lg:hidden fixed inset-0 top-16 bg-[#0a2540]/40 backdrop-blur-sm z-40 cursor-default"
            onClick={() => setMenuOpen(false)}
          />
          <nav
            id="mobile-nav"
            className="lg:hidden relative z-50 bg-white border-t border-[#e4eef7] px-4 py-4 max-h-[calc(100vh-4rem)] overflow-y-auto"
            aria-label="モバイルメニュー"
          >
            <div className="space-y-1 mb-5">
              {mainNav.map((item) => {
                const active = isActive(item.section);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "true" : undefined}
                    className={`flex items-center justify-between text-[15px] font-medium py-3 border-b border-[#f0f5fa] ${
                      active ? "text-[#0099e6]" : "text-[#1a3658]"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span className="text-[10px] font-bold text-[#0099e6]">
                        ● 現在地
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
            <div className="space-y-1 mb-5 pt-2 border-t border-[#e4eef7]">
              {utilityNav.map((u) => (
                <a
                  key={u.label}
                  href={u.href}
                  className="block text-[13px] text-[#5a7090] py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {u.label}
                </a>
              ))}
            </div>
            <a
              href="#cta"
              className="block bg-[#0099e6] text-white text-center px-5 py-3.5 rounded-full text-[14px] font-bold"
              onClick={() => setMenuOpen(false)}
            >
              アプリをダウンロード
            </a>
          </nav>
        </>
      )}
    </header>
  );
}
