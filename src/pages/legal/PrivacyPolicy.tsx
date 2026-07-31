import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: '1. 基本方針',
    content: `MobileWash株式会社（以下「当社」といいます）は、出張洗車・出張コーティングサービス「MobileWash」を運営するにあたり、ユーザーの個人情報の保護を最重要課題と位置づけています。当社は個人情報の適切な取り扱いおよび保護に関する法律を遵守し、以下の方針に基づき個人情報を取り扱います。`,
  },
  {
    title: '2. 取得する個人情報',
    content: `当社が取得する個人情報には、以下の情報が含まれます。`,
    list: [
      '氏名、生年月日、性別、連絡先（電話番号、メールアドレス）',
      '住所、勤務先情報',
      'クレジットカード情報、銀行口座情報等の決済情報',
      '車両情報（車種、ナンバープレート、駐車場所）',
      'GPS位置情報（サービス提供のため、ユーザーの許可に基づき取得）',
      'プロ（サービス提供者）に関する身分証明書、実技検定結果等',
      'サービス利用履歴、評価情報',
      'カスタマーサポートでのやり取り内容',
    ],
  },
  {
    title: '3. 個人情報の利用目的',
    content: `取得した個人情報は、以下の目的で利用いたします。`,
    list: [
      '出張洗車・コーティングサービスの提供および管理',
      'ユーザーと認定プロのマッチング',
      '料金の決済処理',
      'カスタマーサポート、お問い合わせ対応',
      'サービス向上のためのアンケート調査',
      '新機能・キャンペーン等のお知らせ（同意がある場合のみ）',
      '不正利用の防止およびセキュリティ対策',
      '法令等に基づく手続き',
    ],
  },
  {
    title: '4. 個人情報の第三者提供',
    content: `当社は、以下の場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。`,
    list: [
      'サービス提供に必要な範囲で認定プロに提供する場合',
      '決済代行会社に対して決済処理のために必要な情報を提供する場合',
      '法令に基づき開示を求められた場合',
      'ユーザーの生命、身体または財産の保護のために必要な場合',
      '合併・事業譲渡等に伴い個人情報が引き継がれる場合',
    ],
  },
  {
    title: '5. 認定プロへの情報提供',
    content: `サービスの円滑な提供のため、以下の範囲でユーザーの個人情報を認定プロに提供いたします。提供される情報には、氏名（姓のみ）、連絡先、駐車場所、車両情報、GPS位置情報が含まれます。認定プロはこれらの情報をサービス提供目的のみに利用し、当社との契約に基づき厳重に管理する義務を負っています。`,
  },
  {
    title: '6. 安全管理措置',
    content: `当社は個人情報の漏洩、滅失、毀損を防止するため、以下の安全管理措置を講じています。`,
    list: [
      'SSL暗号化通信による全データの保護',
      'データベースへのアクセス制限および監査ログの記録',
      '社員および認定プロへの定期的な情報セキュリティ教育',
      '個人情報へのアクセス権限の最小化',
      '定期的なセキュリティ診断および脆弱性検査',
    ],
  },
  {
    title: '7. Cookieおよびトラッキング技術',
    content: `当社のウェブサイトおよびアプリでは、利便性向上および分析のため、Cookieや類似のトラッキング技術を使用しています。ユーザーはブラウザの設定によりCookieを無効化できますが、その場合サービスの一部機能が利用できなくなることがあります。当社はGoogle Analytics等の第三者ツールを使用してアクセス解析を行っており、これに伴い匿名化された統計情報を取得します。`,
  },
  {
    title: '8. 位置情報の取り扱い',
    content: `当社は、サービスの核心的な機能である「近くの認定プロを検索する」ため、ユーザーの位置情報を取得します。位置情報はユーザーの明示的な許可に基づき取得され、許可がない場合は都道府県名による手動設定でサービスを利用できます。位置情報はサーバー上で暗号化され保存され、サービス提供期間終了後は90日以内に削除されます。`,
  },
  {
    title: '9. 個人情報の開示・訂正・削除',
    content: `ユーザーは、当社が保有する自身の個人情報について、開示、訂正、利用停止、削除を請求する権利を有します。請求をご希望の場合は、カスタマーサポートまでお問い合わせください。本人確認の上、法令に基づき適切に対応いたします。`,
  },
  {
    title: '10. 個人情報の保存期間',
    content: `当社は、個人情報を取得目的に必要な範囲で保存し、保存期間満了後は遅滞なく削除または匿名化処理を行います。具体的な保存期間は以下の通りです。`,
    list: [
      'アカウント情報：アカウント削除後90日間',
      'サービス利用履歴：最終利用日から3年間',
      '決済情報：決済完了後7年間（法令に基づく）',
      'カスタマーサポート記録：対応完了後1年間',
      '位置情報履歴：取得後90日間',
    ],
  },
  {
    title: '11. お子様の個人情報',
    content: `当社のサービスは18歳未満のお子様を対象としておりません。18歳未満の方が個人情報を提供したことが判明した場合は、速やかに削除いたします。`,
  },
  {
    title: '12. プライバシーポリシーの変更',
    content: `当社は、必要に応じて本プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、当社ウェブサイトおよびアプリ上に掲載した時点から効力を生じます。重要な変更がある場合は、登録メールアドレス宛に通知いたします。`,
  },
  {
    title: '13. お問い合わせ',
    content: `本プライバシーポリシーに関するお問い合わせは、以下の窓口までご連絡ください。`,
    contact: {
      name: 'MobileWash株式会社 個人情報保護管理者',
      address: '茨城県古河市前林623-1',
      email: 'info@holy-inc.jp',
      phone: '03-4363-3234（平日9:00-18:00）',
    },
  },
];

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'プライバシーポリシー | MobileWash';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'MobileWashのプライバシーポリシー。個人情報の取り扱い、利用目的、第三者提供、安全管理措置、Cookie・位置情報の取り扱いについて。個人情報保護に関するお問い合わせ窓口も記載しています。');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://mobilewash.app/legal/privacy');
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
            <span className="text-white/70">プライバシーポリシー</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">プライバシーポリシー</h1>
          <p className="text-[14px] text-white/55 leading-relaxed max-w-2xl">
            MobileWashは、ユーザーの個人情報保護を最重要課題として位置づけ、透明性のある取り扱いを徹底しています。
          </p>
          <p className="text-[11px] text-white/35 mt-4">最終更新日: 2026年4月30日</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-10 -mt-6">
        <div className="bg-white rounded-2xl border border-[#e8ecf0] p-6 sm:p-8 lg:p-10 shadow-sm">
          {sections.map((section, i) => (
            <section key={i} className={i > 0 ? 'mt-8 pt-8 border-t border-[#e8ecf0]' : ''}>
              <h2 className="text-[16px] font-bold text-[#0a2540] mb-4">{section.title}</h2>
              <p className="text-[13px] text-[#4a5568] leading-relaxed">{section.content}</p>
              {section.list && (
                <ul className="mt-3 space-y-2">
                  {section.list.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[13px] text-[#4a5568] leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.contact && (
                <div className="mt-4 rounded-xl bg-[#f5f7fa] border border-[#e8ecf0] p-5 space-y-2.5">
                  {Object.entries(section.contact).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:gap-4">
                      <span className="text-[12px] text-[#8a95a5] font-medium sm:w-24 shrink-0">
                        {key === 'name' && '窓口'}
                        {key === 'address' && '所在地'}
                        {key === 'email' && 'メール'}
                        {key === 'phone' && '電話'}
                      </span>
                      <span className="text-[13px] text-[#0a2540]">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
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