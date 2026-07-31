import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: '1. 適用範囲',
    content: `本規約は、MobileWash株式会社（以下「当社」といいます）が運営する出張洗車・出張コーティングサービス「MobileWash」（以下「本サービス」といいます）の利用に関し、当社とユーザー（以下「会員」といいます）との間の権利義務関係を定めるものです。会員は、本規約に同意の上、本サービスを利用するものとします。`,
  },
  {
    title: '2. 会員登録',
    content: `本サービスを利用するにあたり、会員は当社所定の方法により会員登録を行うものとします。会員登録には以下の条件が適用されます。`,
    list: [
      '18歳以上であること（18歳未満の方は保護者の同意が必要）',
      '正確かつ最新の個人情報を提供すること',
      '1人で1つのアカウントを保有すること（複数アカウントの作成を禁止）',
      '当社が定める審査基準を満たすこと',
      '過去に当社のサービス利用規約に違反した履歴がないこと',
    ],
  },
  {
    title: '3. アカウントの管理',
    content: `会員は、自己の責任においてアカウント情報（メールアドレス、パスワード等）を適切に管理するものとします。アカウント情報の管理不十分、使用上の過誤、第三者による不正使用等によって生じた損害について、当社は責任を負わないものとします。会員は、アカウントが盗用された、または第三者に使用されている疑いがある場合、直ちに当社に連絡するものとします。`,
  },
  {
    title: '4. サービスの内容',
    content: `本サービスは、会員がスマートフォンアプリケーションまたはウェブサイトを通じて、洗車・コーティング等のカーケアサービスを出張形式で受けることができるプラットフォームサービスです。具体的なサービス内容は以下の通りです。`,
    list: [
      '出張手洗い洗車サービス',
      '出張ガラスコーティングサービス',
      '出張内装クリーニングサービス',
      '出張ポリッシュ磨きサービス',
      'エンジンルーム洗浄サービス',
      'フルディテイリングサービス',
      'その他当社が提供する付帯サービス',
    ],
  },
  {
    title: '5. 予約・キャンセル',
    content: `会員は本サービスを通じて、認定プロのサービスを予約することができます。予約に関する規定は以下の通りです。`,
    list: [
      '予約はアプリまたはウェブサイトから24時間受け付けます',
      'サービス開始24時間前までのキャンセル：全額返金',
      'サービス開始24時間以内のキャンセル：50%返金',
      'サービス開始後のキャンセル：返金不可',
      '天候等の不可抗力によるキャンセルは個別対応',
      'キャンセルポリシーの詳細は別途定めるものとする',
    ],
  },
  {
    title: '6. 料金および支払い',
    content: `本サービスの利用に関する料金および支払い条件は以下の通りです。`,
    list: [
      'サービス料金は各サービスページに表示された価格に基づく（税込表示）',
      '支払い方法：クレジットカード、Apple Pay、Google Pay、銀行振込（法人向け）',
      'クレジットカード決済は予約確定時に実行される',
      '定期的なサービス利用（定額プラン）の場合は毎月自動決済',
      '料金の変更がある場合は、変更前に会員に通知する',
      '未払い料金が発生した場合、当社はサービスの提供を停止できる',
    ],
  },
  {
    title: '7. 認定プロとの取引',
    content: `本サービスでは、会員と認定プロ（サービス提供者）が取引を行います。認定プロは当社の審査を通過した独立した事業者であり、当社は会員と認定プロの取引の仲介者として機能します。認定プロによるサービス提供に関する責任は原則として認定プロに帰属し、当社はサービスの瑕疵担保責任を負いません。ただし、認定プロの選定に関して当社に重大な過失があった場合はこの限りではありません。`,
  },
  {
    title: '8. 禁止事項',
    content: `会員は、本サービスの利用にあたり、以下の行為を行ってはなりません。`,
    list: [
      '法令または公序良俗に違反する行為',
      '犯罪行為に関連する行為',
      '認定プロに対する暴言、脅迫、ハラスメント',
      '認定プロの業務を妨害する行為',
      '虚偽の情報を登録・報告する行為',
      '本サービスのシステムに不正にアクセスする行為',
      '他の会員または認定プロのアカウントを不正に使用する行為',
      '営利目的で本サービスを転売・転用する行為',
      '当社または認定プロの知的財産権を侵害する行為',
      '本サービスの運営を妨げる行為',
    ],
  },
  {
    title: '9. サービスの変更・中断・終了',
    content: `当社は、以下の場合に本サービスの全部または一部を変更、中断、終了することがあります。`,
    list: [
      'システムの保守点検、更新を行う場合',
      '天災地変等の不可抗力によりサービスの提供が困難となった場合',
      'コンピューター、通信回線等の事故により停止した場合',
      '当社の経営判断によりサービスを終了する場合',
      'その他、当社がサービスの提供が困難と判断した場合',
    ],
  },
  {
    title: '10. 免責事項',
    content: `当社は、本サービスに関して以下の事項について免責されるものとします。`,
    list: [
      '認定プロによるサービスの品質、適合性、完全性',
      '会員と認定プロ間の取引に関する紛争',
      '会員の車両または財物への損害（認定プロの故意または重過失による場合を除く）',
      '通信環境等の問題によるサービスの利用障害',
      '会員の端末機器への影響',
      '会員が本サービスを通じて取得した情報等の完全性、正確性、確実性、有用性',
    ],
  },
  {
    title: '11. 知的財産権',
    content: `本サービスに関するすべてのコンテンツ（テキスト、画像、動画、ロゴ、商標、ソフトウェア等）の知的財産権は、当社または正当な権利者に帰属します。会員は、当社の事前の書面による承諾なく、これらを複製、転載、改変、配布、販売等の行為を行ってはなりません。`,
  },
  {
    title: '12. 個人情報の取り扱い',
    content: `当社は、会員の個人情報を「プライバシーポリシー」に基づき適切に取り扱います。会員は、本規約への同意と同時にプライバシーポリシーにも同意したものとみなされます。`,
  },
  {
    title: '13. 利用規約の変更',
    content: `当社は、必要に応じて本規約を変更することがあります。変更後の規約は、当社ウェブサイトまたはアプリ上に掲示した時点から効力を生じます。重要な変更がある場合は、登録メールアドレス宛に通知いたします。会員が変更後の規約に同意できない場合は、アカウントの削除をもって本サービスの利用を終了するものとします。`,
  },
  {
    title: '14. 準拠法および管轄裁判所',
    content: `本規約の準拠法は日本法とし、本サービスに関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。`,
  },
  {
    title: '15. 分離可能性',
    content: `本規約のいずれかの条項またはその一部が法令等により無効または執行不能と判断された場合であっても、本規約の残りの規定および一部が無効または執行不能と判断された規定の残りの部分は、継続して完全に効力を有するものとします。`,
  },
  {
    title: '16. お問い合わせ',
    content: `本利用規約に関するお問い合わせは、以下の窓口までご連絡ください。`,
    contact: {
      name: 'MobileWash株式会社 カスタマーサポート',
      email: 'info@holy-inc.jp',
      phone: '03-4363-3234（平日9:00-18:00）',
    },
  },
];

export default function TermsOfService() {
  useEffect(() => {
    document.title = '利用規約 | MobileWash';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'MobileWashの利用規約。会員登録、アカウント管理、予約・キャンセル、料金支払い、禁止事項、免責事項、知的財産権、準拠法等について定めています。');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://mobilewash.app/legal/terms');
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
            <span className="text-white/70">利用規約</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">利用規約</h1>
          <p className="text-[14px] text-white/55 leading-relaxed max-w-2xl">
            MobileWashのサービスをご利用いただくにあたり、以下の規約をご確認の上、同意いただく必要があります。
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