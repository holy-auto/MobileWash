import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: '1. 基本方針',
    content: `MobileWash株式会社（以下「当社」といいます）は、出張洗車・出張コーティングサービス「MobileWash」の運営にあたり、ユーザーの情報資産を適切に保護し、安全かつ信頼性の高いサービスを提供するため、以下の情報セキュリティ方針を定め、徹底いたします。`,
  },
  {
    title: '2. 情報セキュリティ管理組織',
    content: `当社は、情報セキュリティの管理責任者（CISO：Chief Information Security Officer）を置き、組織全体の情報セキュリティ管理体制を構築・運営しております。各部署には情報セキュリティ担当者を配置し、日々のセキュリティ運用を徹底しています。`,
    list: [
      'CISO：情報セキュリティ戦略の策定および全社的な統括管理',
      'セキュリティ担当チーム：日々の監視、インシデント対応、脆弱性診断',
      '各部門セキュリティ担当：部門内のセキュリティ教育、ポリシー遵守の確認',
      '認定プロ（サービス提供者）へのセキュリティ指導および監査',
    ],
  },
  {
    title: '3. リスク管理体制',
    content: `当社は、情報セキュリティリスクを継続的に評価し、適切な対策を講じています。`,
    list: [
      '年1回以上の情報セキュリティリスクアセスメントの実施',
      '重要情報（個人情報、決済情報、システム情報）の分類と保護レベルの設定',
      '脅威インテリジェンスの収集および最新脅威への対応',
      'インシデント発生時の対応手順（IRP：Incident Response Plan）の策定',
      '事業継続計画（BCP）の策定および定期的な見直し',
    ],
  },
  {
    title: '4. 技術的安全管理措置',
    content: `当社は、以下の技術的安全管理措置を講じ、情報資産を保護しています。`,
    list: [
      'SSL/TLS暗号化通信による全データ転送の保護',
      'AES-256によるデータベース保存データの暗号化',
      '多要素認証（MFA）による管理画面および重要システムへのアクセス制御',
      'Webアプリケーションファイアウォール（WAF）による不正アクセス防御',
      'DDoS攻撃対策および不正アクセス検知システムの導入',
      '定期的な脆弱性診断およびペネトレーションテストの実施',
      '開発環境・本番環境の分離および本番データの厳格なアクセス制限',
      'ソースコードのセキュリティレビューおよび自動脆弱性スキャン',
    ],
  },
  {
    title: '5. 人的安全管理措置',
    content: `当社は、社員および認定プロに対して、以下の人的安全管理措置を実施しています。`,
    list: [
      '入社時および年1回以上の情報セキュリティ教育の実施',
      '守秘義務契約の締結',
      '情報セキュリティポリシーの周知徹底および遵守状況の確認',
      '最小権限の原則に基づくアクセス権限の管理',
      '退職・契約終了時のアカウント削除および機密情報返却の徹底',
    ],
  },
  {
    title: '6. 物理的安全管理措置',
    content: `当社は、オフィスおよびサーバー設備に対して以下の物理的安全管理措置を講じています。`,
    list: [
      'オフィスへの入退室管理（ICカード認証、来訪者登録）',
      'サーバールームへの物理的アクセス制限（生体認証、監視カメラ）',
      '文書等の機密情報の管理および廃棄時の完全消去',
      '持ち出し機器の暗号化およびリモートワイプ機能の導入',
      '備品の管理台帳の整備および定期的な棚卸',
    ],
  },
  {
    title: '7. 委託先管理',
    content: `当社は、個人情報等の取り扱いを委託する場合、委託先との間で秘密保持契約を締結し、適切な監督を行います。委託先に対しては、以下の管理を実施しています。`,
    list: [
      '委託先の情報セキュリティ体制の事前審査',
      '委託契約におけるセキュリティ要件の明確化',
      '委託先への定期的な監査および報告義務の設定',
      '委託関係終了時のデータ返却・削除確認',
    ],
  },
  {
    title: '8. インシデント対応',
    content: `当社は、情報セキュリティインシデントが発生した場合、以下の対応を取ります。`,
    list: [
      'インシデント検知後、即座にCISOおよびセキュリティ担当チームへ報告',
      '影響範囲の特定および被害の最小化に向けた緊急対応',
      '個人情報の漏洩等の事故が発生した場合、関係者への通知および監督官庁への報告',
      'インシデントの原因分析および再発防止策の策定・実施',
      'インシデント記録の整備および定期的な見直し',
    ],
  },
  {
    title: '9. コンプライアンス',
    content: `当社は、情報セキュリティに関する法令、国が定める指針、その他の規範を遵守します。具体的には以下の法令・規格に準拠しています。`,
    list: [
      '個人情報保護法および関連ガイドライン',
      '電子署名法',
      '不正アクセス禁止法',
      '情報セキュリティマネジメントシステム（ISO/IEC 27001）の取得・維持',
      'PCI DSS（決済業界のデータセキュリティ基準）への準拠',
    ],
  },
  {
    title: '10. 継続的改善',
    content: `当社は、情報セキュリティ管理体制を継続的に見直し、改善していきます。`,
    list: [
      '年1回以上の情報セキュリティマネジメントレビューの実施',
      '社内外のセキュリティインシデントからの教訓の反映',
      '最新の技術動向および脅威情報に基づく対策の更新',
      '情報セキュリティポリシーの年1回以上の見直しおよび改訂',
    ],
  },
  {
    title: '11. お問い合わせ',
    content: `本情報セキュリティ方針に関するお問い合わせは、以下の窓口までご連絡ください。`,
    contact: {
      name: 'MobileWash株式会社 情報セキュリティ担当',
      email: 'info@holy-inc.jp',
      phone: '03-4363-3234（平日9:00-18:00）',
    },
  },
];

export default function SecurityPolicy() {
  useEffect(() => {
    document.title = '情報セキュリティ方針 | MobileWash';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'MobileWashの情報セキュリティ方針。情報セキュリティ管理組織、リスク管理体制、技術的・人的・物理的安全管理措置、インシデント対応、コンプライアンスについて。');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://mobilewash.app/legal/security');
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
            <span className="text-white/70">情報セキュリティ方針</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">情報セキュリティ方針</h1>
          <p className="text-[14px] text-white/55 leading-relaxed max-w-2xl">
            MobileWashは、ユーザーの情報資産を最高水準で保護し、信頼性の高いサービスを提供するため、情報セキュリティ管理体制を徹底しています。
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
              <Link to="/legal/terms" className="hover:text-white transition-colors cursor-pointer">利用規約</Link>
              <Link to="/legal/privacy" className="hover:text-white transition-colors cursor-pointer">プライバシーポリシー</Link>
              <Link to="/legal/consumer-law" className="hover:text-white transition-colors cursor-pointer">特定商取引法に基づく表記</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}