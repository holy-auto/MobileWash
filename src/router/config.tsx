import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Home = lazy(() => import("../pages/home/page"));
const Corporate = lazy(() => import("../pages/corporate/page"));
const NotFound = lazy(() => import("../pages/NotFound"));
const PrivacyPolicy = lazy(() => import("../pages/legal/PrivacyPolicy"));
const ConsumerLaw = lazy(() => import("../pages/legal/ConsumerLaw"));
const TermsOfService = lazy(() => import("../pages/legal/TermsOfService"));
const SecurityPolicy = lazy(() => import("../pages/legal/SecurityPolicy"));
const Sitemap = lazy(() => import("../pages/Sitemap"));
const CompanyAbout = lazy(() => import("../pages/company/about/page"));
const CompanyNews = lazy(() => import("../pages/company/news/page"));
const CompanyPress = lazy(() => import("../pages/company/press/page"));
const CompanyRecruit = lazy(() => import("../pages/company/recruit/page"));
const CompanyBrand = lazy(() => import("../pages/company/brand/page"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/corporate",
    element: <Corporate />,
  },
  {
    path: "/company/about",
    element: <CompanyAbout />,
  },
  {
    path: "/company/news",
    element: <CompanyNews />,
  },
  {
    path: "/company/press",
    element: <CompanyPress />,
  },
  {
    path: "/company/recruit",
    element: <CompanyRecruit />,
  },
  {
    path: "/company/brand",
    element: <CompanyBrand />,
  },
  {
    path: "/legal/terms",
    element: <TermsOfService />,
  },
  {
    path: "/legal/privacy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/legal/consumer-law",
    element: <ConsumerLaw />,
  },
  {
    path: "/legal/security",
    element: <SecurityPolicy />,
  },
  {
    path: "/sitemap",
    element: <Sitemap />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;