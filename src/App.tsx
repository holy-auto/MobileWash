import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router/index.tsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { useLayoutEffect } from "react";

function App() {
  useLayoutEffect(() => {
    const forceScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    forceScroll();
    requestAnimationFrame(forceScroll);
    setTimeout(forceScroll, 0);
    setTimeout(forceScroll, 50);
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__}>
        <AppRoutes />
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;