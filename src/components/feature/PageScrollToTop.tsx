import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageScrollToTopProps {
  children: React.ReactNode;
}

export default function PageScrollToTop({ children }: PageScrollToTopProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}