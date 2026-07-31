import { useEffect } from 'react';
import CorporateNavbar from '@/pages/corporate/components/CorporateNavbar';
import CorporateHero from '@/pages/corporate/components/CorporateHero';
import CorporateFeatures from '@/pages/corporate/components/CorporateFeatures';
import CorporatePlans from '@/pages/corporate/components/CorporatePlans';
import CorporateCases from '@/pages/corporate/components/CorporateCases';
import CorporateFAQ from '@/pages/corporate/components/CorporateFAQ';
import CorporateContact from '@/pages/corporate/components/CorporateContact';
import Footer from '@/pages/home/components/Footer';

export default function CorporatePage() {
  useEffect(() => {
    document.title = 'MobileWash 法人プラン | 社用車・フリート向け出張洗車・コーティング 請求書払・複数台割引';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'MobileWash法人プランは社用車・フリート向けの出張洗車・出張コーティングサービス。請求書払・複数台割引（最大30% OFF）・専任担当者対応・全国対応。スタンダード・プレミアム・エンタープライズの3プラン。無料相談・資料請求はお気軽に。法人プラン資料（PDF）無料送付。');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://mobilewash.app/corporate');

    // Corporate page structured data: Service
    const script = document.createElement('script');
    script.id = 'corporate-structured-data';
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'MobileWash 法人プラン',
      description: '社用車・フリート向けの出張洗車・出張コーティングサービス。請求書払・複数台割引・専任担当者対応。',
      provider: {
        '@type': 'Organization',
        name: 'MobileWash',
        url: 'https://mobilewash.app/',
        logo: 'https://storage.readdy-site.link/project_files/c40f971a-8995-4350-8e33-e7b8168d5850/60df7e55-3821-4161-a8bd-e386660f21ef_mobile_wash_app_icon.png?v=1a084e8094f7ad1f039da984d9cffe58',
        address: {
          '@type': 'PostalAddress',
          addressLocality: '古河市',
          addressRegion: '茨城県',
          addressCountry: 'JP',
        },
      },
      serviceType: '法人向けカーディテイリング',
      areaServed: { '@type': 'Country', name: '日本' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: '法人プラン',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'スタンダードプラン（1〜9台）' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'プレミアムプラン（10〜49台）' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'エンタープライズプラン（50台以上）' } },
        ],
      },
    });
    document.head.appendChild(script);

    // BreadcrumbList structured data
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.id = 'corporate-breadcrumb-structured-data';
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
        {
          '@type': 'ListItem',
          position: 2,
          name: '法人プラン',
          item: 'https://mobilewash.app/corporate',
        },
      ],
    });
    document.head.appendChild(breadcrumbScript);

    return () => {
      document.title = 'MobileWash | 出張洗車・出張コーティングアプリ 全国47都道府県対応';
      ['corporate-structured-data', 'corporate-breadcrumb-structured-data'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, []);

  return (
    <div className="min-h-full flex flex-col bg-white text-[#0a2540]">
      <CorporateNavbar />
      <main>
        <CorporateHero />
        <CorporateFeatures />
        <CorporatePlans />
        <CorporateCases />
        <CorporateFAQ />
        <CorporateContact />
      </main>
      <Footer />
    </div>
  );
}
