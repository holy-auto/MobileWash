"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One client component that owns three immersion-related affordances so we
 * only ship a single bundle and one IntersectionObserver instance:
 *   - scroll progress bar at the top of the viewport
 *   - back-to-top floating button (visible after scrolling past the hero)
 *   - reveal-on-scroll for any element marked with [data-reveal]
 */
export default function PageEnhancements() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    const updateScrollState = () => {
      const doc = document.documentElement;
      const scrolled = window.scrollY;
      const max = doc.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(scrolled / max, 1) : 0;
      if (progressRef.current) {
        progressRef.current.style.width = `${(ratio * 100).toFixed(2)}%`;
      }
      setShowBackToTop(scrolled > window.innerHeight * 0.8);
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (targets.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleBackToTop = () => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <>
      <div
        ref={progressRef}
        className="scroll-progress"
        aria-hidden="true"
        role="presentation"
      />
      <button
        type="button"
        onClick={handleBackToTop}
        aria-label="ページの先頭へ戻る"
        className={`back-to-top${showBackToTop ? " is-shown" : ""}`}
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
