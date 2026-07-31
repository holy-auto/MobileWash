import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useMemo } from "react";
import LoadingScreen from "./LoadingScreen";

const Home = lazy(() => import("@/pages/home/page"));
const Corporate = lazy(() => import("@/pages/corporate/page"));
const TermsOfService = lazy(() => import("@/pages/legal/TermsOfService"));
const PrivacyPolicy = lazy(() => import("@/pages/legal/PrivacyPolicy"));
const ConsumerLaw = lazy(() => import("@/pages/legal/ConsumerLaw"));
const SecurityPolicy = lazy(() => import("@/pages/legal/SecurityPolicy"));
const Sitemap = lazy(() => import("@/pages/Sitemap"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function useDirection(pathname: string) {
  return useMemo(() => {
    const depth = pathname.split("/").filter(Boolean).length;
    // ホーム(深度0)↔深いページ で方向を決定
    if (depth === 0) return -1;
    return 1;
  }, [pathname]);
}

function AnimatedPage({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const direction = useDirection(location.pathname);

  const variants = {
    initial: {
      opacity: 0,
      x: direction * 60,
      scale: 0.97,
    },
    in: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      x: direction * -40,
      scale: 0.97,
    },
  };

  return (
    <>
      {/* Transition color flash overlay */}
      <motion.div
        className="fixed inset-0 z-[9998] bg-[#0099e6] pointer-events-none"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: [0, 0.04, 0], scaleX: [0, 1, 1] }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: direction > 0 ? "left" : "right" }}
      />

      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={variants}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </>
  );
}

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AnimatedPage>
              <Suspense fallback={<LoadingScreen />}>
                <Home />
              </Suspense>
            </AnimatedPage>
          }
        />
        <Route
          path="/corporate"
          element={
            <AnimatedPage>
              <Suspense fallback={<LoadingScreen />}>
                <Corporate />
              </Suspense>
            </AnimatedPage>
          }
        />
        <Route
          path="/legal/terms"
          element={
            <AnimatedPage>
              <Suspense fallback={<LoadingScreen />}>
                <TermsOfService />
              </Suspense>
            </AnimatedPage>
          }
        />
        <Route
          path="/legal/privacy"
          element={
            <AnimatedPage>
              <Suspense fallback={<LoadingScreen />}>
                <PrivacyPolicy />
              </Suspense>
            </AnimatedPage>
          }
        />
        <Route
          path="/legal/consumer-law"
          element={
            <AnimatedPage>
              <Suspense fallback={<LoadingScreen />}>
                <ConsumerLaw />
              </Suspense>
            </AnimatedPage>
          }
        />
        <Route
          path="/legal/security"
          element={
            <AnimatedPage>
              <Suspense fallback={<LoadingScreen />}>
                <SecurityPolicy />
              </Suspense>
            </AnimatedPage>
          }
        />
        <Route
          path="/sitemap"
          element={
            <AnimatedPage>
              <Suspense fallback={<LoadingScreen />}>
                <Sitemap />
              </Suspense>
            </AnimatedPage>
          }
        />
        <Route
          path="*"
          element={
            <AnimatedPage>
              <Suspense fallback={<LoadingScreen />}>
                <NotFound />
              </Suspense>
            </AnimatedPage>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}