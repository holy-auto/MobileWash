import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const items = [
  {
    label: '事業者の名称',
    value: 'MobileWash株式会社',
  },
  {
    label: '代表者',
    value: '代表取締役 CEO（氏名は個別に開示）',
  },
  {
    label: '所在地',
    value: '茨城県古河市前林623-1',
  },
  {
    label: '電話番号',
    value: '03-4363-3234（平日 9:00-18:00）',
  },
  {
    label: 'メールアドレス',
    value: 'info@holy-inc.jp',
  },
  {
    label: '営業時間',
    value: '受付：平日 9:00-18:00 / サービス提供：7:00-21:00（エリアにより異なる）',
  },
  {
    label: 'URL',
    value: 'https://mobilewash.app',
  },
  {
    label: '販売価格',
    value: '各サービスページに記載（税込価格で表示）',
  },
  {
    label: '価格以外に必要な料金',
    value: '出張料（エリアにより異なる）、駐車場利用料（実費）、追加オプション料金',
  },
  {
    label: 'お支払い方法',
    value: 'クレジットカード（Visa / Mastercard / JCB / AMEX）、Apple Pay、Google Pay、銀行振込（法人向け）',
  },
  {
    label: 'お支払い時期',
    value: 'クレジットカード：予約確定時に決済 / 銀行振込：請求書発行後14日以内',
  },
  {
    label: 'サービス提供時期',
    value: '予約日時に指定された日時に、ご指定の駐車場所へ出張してサービスを提供',
  },
  {
    label: '返品・キャンセルについて',
    value: 'サービス開始24時間前までのキャンセル：全額返金 / 24時間以内のキャンセル：50%返金 / サービス開始後のキャンセル：返金不可（詳細はキャンセルポリシーを参照）',
  },
  {
    label: '動作環境',
    value: 'iOS 16.0以上 / Android 10.0以上のスマートフォンおよびインターネット接続環境',
  },
];

export default function ConsumerLaw() {
  useEffect(() => {
    document.title = '特定商取引法に基づく表記 | MobileWash';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'MobileWashの特定商取引法に基づく表記。事業者情報、販売価格、支払い方法・時期、サービス提供時期、キャンセルポリシー、動作環境等の取引条件を明示しています。');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://mobilewash.app/legal/consumer-law');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#0a2540]">
      {/* Header */}
      <header className="bg-[#0a1628] text-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-4">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img
                src="https://storage.readdy-site.link/project_files/c40f971a-8995-4350-8e33-e7b8168d5850/60df7e55-3821-4161-a8bd-e386660f21ef_mobile_wash_app_icon.png?v=1a084e8094f7ad1f039da984d9cffe58"
                alt="MobileWash"
                className="w-9 h-9 rounded-lg object-cover"
              />
              <div>
                <p className="text-white font-bold text-[15px] leading-tight">MobileWash</p>
                <p className="text-white/40 text-[9px] tracking-widest mt-0.5">MOBILE CAR WASH &amp; COATING</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-[#0a1628] text-white pb-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 pb-12">
          <div className="flex items-center gap-2 text-white/50 text-[12px] mb-4">
            <Link to="/" className="hover:text-white transition-colors cursor-pointer">ホーム</Link>
            <div className="w-3 h-3 flex items-center justify-center"><i className="ri-arrow-right-s-line text-xs"></i></div>
            <span className="text-white/70">特定商取引法に基づく表記</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">特定商取引法に基づく表記</h1>
          <p className="text-[14px] text-white/55 leading-relaxed max-w-2xl">
            消費者の皆様に対し、当社のサービスに関する取引条件を法令に基づき明示いたします。
          </p>
          <p className="text-[11px] text-white/35 mt-4">最終更新日: 2026年4月30日</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-10 -mt-6">
        <div className="bg-white rounded-2xl border border-[#e8ecf0] shadow-sm overflow-hidden">
          {/* Table */}
          <div className="divide-y divide-[#e8ecf0]">
            {items.map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-1 sm:gap-0 px-6 sm:px-8 py-5 hover:bg-[#fafbfc]/50 transition-colors">
                <div className="sm:w-48 shrink-0">
                  <span className="text-[12px] font-bold text-[#0a2540] tracking-wide">{item.label}</span>
                </div>
                <div className="flex-1">
                  <p className="text-[13px] text-[#4a5568] leading-relaxed">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="mt-8 space-y-4">
          <div className="rounded-xl bg-[#f5f7fa] border border-[#e8ecf0] p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-500/10 shrink-0 mt-0.5">
                <i className="ri-information-line text-amber-500 text-base"></i>
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-[#0a2540] mb-2">キャンセルポリシーについて</h3>
                <p className="text-[13px] text-[#4a5568] leading-relaxed">
                  サービス開始24時間前までのキャンセルは全額返金いたします。24時間以内のキャンセルは50%の返金となり、サービス開始後のキャンセルは返金対象外となります。天候等の不可抗力によるキャンセルについては、個別に対応いたしますのでカスタマーサポートまでご連絡ください。
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-[#f5f7fa] border border-[#e8ecf0] p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-500/10 shrink-0 mt-0.5">
                <i className="ri-shield-check-line text-emerald-500 text-base"></i>
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-[#0a2540] mb-2">個人情報の取り扱い</h3>
                <p className="text-[13px] text-[#4a5568] leading-relaxed">
                  当社は取得した個人情報を適切に管理し、サービス提供に必要な範囲でのみ利用いたします。詳細は
                  <Link to="/legal/privacy" className="text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer underline underline-offset-2">プライバシーポリシー</Link>
                  をご確認ください。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="flex justify-center py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[13px] text-[#5a6a7a] hover:text-[#0a2540] transition-colors cursor-pointer"
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-left-line text-sm"></i>
            </div>
            ホームに戻る
          </Link>
        </div>
      </div>

      {/* Footer mini */}
      <footer className="bg-[#0a1628] text-white border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-white/40">© 2026 MobileWash, Inc. All rights reserved.</p>
            <div className="flex gap-x-5 text-[11px] text-white/45">
              <Link to="/legal/privacy" className="hover:text-white transition-colors cursor-pointer">プライバシーポリシー</Link>
              <Link to="/legal/terms" className="hover:text-white transition-colors cursor-pointer">利用規約</Link>
              <Link to="/legal/security" className="hover:text-white transition-colors cursor-pointer">情報セキュリティ方針</Link>
              <Link to="/legal/consumer-law" className="hover:text-white transition-colors cursor-pointer">特定商取引法に基づく表記</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}