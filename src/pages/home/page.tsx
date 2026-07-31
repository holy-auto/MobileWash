import { useEffect } from 'react';
import Navbar from '@/pages/home/components/Navbar';
import Hero from '@/pages/home/components/Hero';
import Stats from '@/pages/home/components/Stats';
import Problems from '@/pages/home/components/Problems';
import Features from '@/pages/home/components/Features';
import Services from '@/pages/home/components/Services';
import HowItWorks from '@/pages/home/components/HowItWorks';
import Plans from '@/pages/home/components/Plans';
import Comparison from '@/pages/home/components/Comparison';
import Areas from '@/pages/home/components/Areas';
import UseCases from '@/pages/home/components/UseCases';
import ProRecruit from '@/pages/home/components/ProRecruit';
import FAQ from '@/pages/home/components/FAQ';
import CTA from '@/pages/home/components/CTA';
import Footer from '@/pages/home/components/Footer';

export default function HomePage() {
  useEffect(() => {
    document.title = 'MobileWash | 出張洗車・出張コーティングアプリ 全国47都道府県対応';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'MobileWashは出張洗車・出張コーティングのプロをスマホひとつで呼べるカーディテイリングアプリ。GPSで近くの認定プロを自動マッチング、最短5分でご自宅・マンション駐車場へ出張。手洗い洗車¥3,980〜、ガラスコーティング¥29,800〜。2026年Q3ローンチ予定、先行登録で¥1,500 OFFクーポン進呈。');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://mobilewash.app/');

    // BreadcrumbList structured data
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.id = 'home-breadcrumb-structured-data';
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'ホーム',
          item: 'https://mobilewash.app/',
        },
      ],
    });
    document.head.appendChild(breadcrumbScript);

    return () => {
      document.title = 'MobileWash | 出張洗車・出張コーティングアプリ 全国47都道府県対応';
      const el = document.getElementById('home-breadcrumb-structured-data');
      if (el) el.remove();
    };
  }, []);

  return (
    <div className="min-h-full flex flex-col bg-white text-[#0a2540]">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Problems />
        <Features />
        <Services />
        <HowItWorks />
        <Plans />
        <Comparison />
        <Areas />
        <UseCases />
        <ProRecruit />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
