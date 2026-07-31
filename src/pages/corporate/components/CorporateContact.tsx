import { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// ===== PDF資料のURLをここで管理 =====
// 資料が準備できたら下記のURLを実際のPDFファイルURLに差し替えるだけでOK
// 例: const BROCHURE_PDF_URL = 'https://example.com/corporate-plan.pdf';
const BROCHURE_PDF_URL = '';
const BROCHURE_READY = BROCHURE_PDF_URL !== '';

function ThanksModal({ onClose, withBrochure }: { onClose: () => void; withBrochure: boolean }) {
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleDownload = () => {
    if (BROCHURE_READY) {
      const a = document.createElement('a');
      a.href = BROCHURE_PDF_URL;
      a.download = '法人プラン資料.pdf';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setDownloaded(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(10,37,64,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-md w-full p-10 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-[#8ba0ba] hover:bg-[#f0f6fb] hover:text-[#0a2540] transition-colors cursor-pointer"
        >
          <i className="ri-close-line text-lg"></i>
        </button>

        {/* Success icon */}
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#e6f9f4] mx-auto mb-5">
          <i className="ri-checkbox-circle-fill text-3xl text-[#0ab87a]"></i>
        </div>

        {/* Title */}
        <h3 className="text-[22px] font-bold text-[#0a2540] mb-3">
          {withBrochure ? '資料リクエストを受け付けました' : 'お問い合わせを受け付けました'}
        </h3>

        {/* Description */}
        <p className="text-[14px] text-[#5a7090] leading-relaxed mb-2">
          {withBrochure ? '資料リクエストおよびお問い合わせいただきありがとうございます。' : 'この度はお問い合わせいただきありがとうございます。'}
        </p>
        <p className="text-[14px] text-[#5a7090] leading-relaxed mb-6">
          {withBrochure
            ? <>{BROCHURE_READY ? <>資料は<strong className="text-[#0a2540]">このページから今すぐ</strong>ダウンロードできます。担当者より<strong className="text-[#0a2540]">2営業日以内</strong>にもご連絡いたします。</> : <>担当者より<strong className="text-[#0a2540]">2営業日以内</strong>に法人プラン資料（PDF）とともにご連絡いたします。</>}</>
            : <>担当者より<strong className="text-[#0a2540]">2営業日以内</strong>にご登録のメールアドレスへご連絡いたします。しばらくお待ちください。</>}
        </p>

        {/* PDF Download Button — shown only when brochure requested */}
        {withBrochure && (
          <div className="mb-6">
            {BROCHURE_READY ? (
              <button
                onClick={handleDownload}
                className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-[14px] transition-all cursor-pointer whitespace-nowrap ${
                  downloaded
                    ? 'bg-[#e6f9f4] text-[#0ab87a] border-2 border-[#0ab87a]/30'
                    : 'bg-gradient-to-r from-[#0099e6] to-[#0077b3] text-white hover:from-[#0077b3] hover:to-[#005a8a]'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className={`text-lg ${downloaded ? 'ri-checkbox-circle-fill' : 'ri-file-download-line'}`}></i>
                </div>
                {downloaded ? 'ダウンロード完了！' : '法人プラン資料をダウンロード（PDF）'}
                {!downloaded && (
                  <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">無料</span>
                )}
              </button>
            ) : (
              <div className="w-full flex items-center gap-3 p-4 rounded-xl bg-[#f7fbff] border border-[#e4eef7]">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#e6f4ff] shrink-0">
                  <i className="ri-file-pdf-line text-xl text-[#0099e6]"></i>
                </div>
                <div className="text-left flex-1">
                  <p className="text-[13px] font-bold text-[#0a2540]">法人プラン資料（PDF）</p>
                  <p className="text-[11px] text-[#5a7090] mt-0.5">担当者よりメールにてお送りします</p>
                </div>
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-mail-send-line text-[#0099e6] text-lg"></i>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Info chips */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          {[
            { icon: 'ri-time-line', text: '平日 9:00～18:00 受付' },
            { icon: withBrochure ? 'ri-file-download-line' : 'ri-mail-check-line', text: withBrochure ? 'PDF資料をご用意' : '確認メールを送信済み' },
          ].map((chip) => (
            <div
              key={chip.text}
              className="flex items-center gap-2 bg-[#f0f6fb] rounded-full px-4 py-2 text-[12px] text-[#5a7090] font-medium"
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className={`${chip.icon} text-[#0099e6]`}></i>
              </div>
              {chip.text}
            </div>
          ))}
        </div>

        {/* Close CTA */}
        <button
          onClick={onClose}
          className="w-full bg-[#0099e6] hover:bg-[#0077b3] text-white font-bold py-3.5 rounded-full transition-colors text-[14px] cursor-pointer whitespace-nowrap"
        >
          閉じる
        </button>
      </div>
    </div>
  );
}

export default function CorporateContact() {
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [wantBrochure, setWantBrochure] = useState(false);
  const section = useScrollAnimation({ threshold: 0.05 });

  useEffect(() => {
    const handleRequestBrochure = () => {
      setWantBrochure(true);
    };
    window.addEventListener('requestBrochure', handleRequestBrochure);
    return () => {
      window.removeEventListener('requestBrochure', handleRequestBrochure);
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new URLSearchParams();
    new FormData(form).forEach((v, k) => data.append(k, v as string));
    data.append('brochure_request', wantBrochure ? '資料ダウンロード希望' : '不要');
    setErrorMsg('');
    try {
      const res = await fetch('https://readdy.ai/api/form/d866pmi1csuacpqtdatg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
      });
      if (res.ok) {
        setShowModal(true);
        form.reset();
      } else {
        setErrorMsg('送信に失敗しました。もう一度お試しください。');
      }
    } catch {
      setErrorMsg('送信に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <>
      {showModal && <ThanksModal onClose={() => setShowModal(false)} withBrochure={wantBrochure} />}

      <section id="contact" className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div
            ref={section.ref}
            className={`grid lg:grid-cols-12 gap-12 anim-fade-up ${section.isVisible ? 'is-visible' : ''}`}
          >
            {/* Left */}
            <div className="lg:col-span-5">
              <p className="text-[11px] font-bold tracking-[0.2em] text-[#0099e6] mb-4">Contact</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0a2540] mb-5 leading-tight">
                無料相談・<br />資料請求はこちら
              </h2>
              <p className="text-[14px] text-[#5a7090] leading-relaxed mb-8">
                法人プランの詳細・お見積もり・導入のご相談は、フォームよりお気軽にお問い合わせください。
                担当者より<strong className="text-[#0a2540]">2営業日以内</strong>にご連絡いたします。
              </p>

              <ul className="space-y-4">
                {[
                  { icon: 'ri-time-line', title: '2営業日以内に返信', desc: '平日9:00〜18:00 受付' },
                  { icon: 'ri-money-dollar-circle-line', title: '相談・資料請求は無料', desc: '費用は一切かかりません' },
                  { icon: 'ri-customer-service-2-line', title: '専任担当者が対応', desc: '法人営業チームが丁寧にサポート' },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#e6f4ff] text-[#0099e6] shrink-0">
                      <i className={`${item.icon} text-lg`}></i>
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-[#0a2540]">{item.title}</p>
                      <p className="text-[12px] text-[#5a7090] mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right - Form */}
            <div className="lg:col-span-7">
              <form
                data-readdy-form
                onSubmit={handleSubmit}
                className="bg-[#f7fbff] border border-[#e4eef7] rounded-2xl p-7 lg:p-9 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold text-[#0a2540] mb-1.5">
                      会社名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="company"
                      required
                      placeholder="株式会社〇〇"
                      className="w-full px-4 py-2.5 rounded-lg text-[14px] text-[#0a2540] placeholder-[#8ba0ba] bg-white border border-[#e4eef7] focus:outline-none focus:ring-2 focus:ring-[#0099e6]/30 focus:border-[#0099e6]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#0a2540] mb-1.5">
                      お名前 <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      required
                      placeholder="山田 太郎"
                      className="w-full px-4 py-2.5 rounded-lg text-[14px] text-[#0a2540] placeholder-[#8ba0ba] bg-white border border-[#e4eef7] focus:outline-none focus:ring-2 focus:ring-[#0099e6]/30 focus:border-[#0099e6]"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold text-[#0a2540] mb-1.5">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="taro@company.co.jp"
                      className="w-full px-4 py-2.5 rounded-lg text-[14px] text-[#0a2540] placeholder-[#8ba0ba] bg-white border border-[#e4eef7] focus:outline-none focus:ring-2 focus:ring-[#0099e6]/30 focus:border-[#0099e6]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#0a2540] mb-1.5">電話番号</label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="03-4363-3234"
                      className="w-full px-4 py-2.5 rounded-lg text-[14px] text-[#0a2540] placeholder-[#8ba0ba] bg-white border border-[#e4eef7] focus:outline-none focus:ring-2 focus:ring-[#0099e6]/30 focus:border-[#0099e6]"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold text-[#0a2540] mb-1.5">車両台数（目安）</label>
                    <select
                      name="vehicles"
                      className="w-full px-4 py-2.5 rounded-lg text-[14px] text-[#0a2540] bg-white border border-[#e4eef7] focus:outline-none focus:ring-2 focus:ring-[#0099e6]/30 focus:border-[#0099e6]"
                    >
                      <option value="">選択してください</option>
                      <option value="1-4">1〜4台</option>
                      <option value="5-9">5〜9台</option>
                      <option value="10-19">10〜19台</option>
                      <option value="20-49">20〜49台</option>
                      <option value="50+">50台以上</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#0a2540] mb-1.5">ご希望のサービス</label>
                    <select
                      name="service"
                      className="w-full px-4 py-2.5 rounded-lg text-[14px] text-[#0a2540] bg-white border border-[#e4eef7] focus:outline-none focus:ring-2 focus:ring-[#0099e6]/30 focus:border-[#0099e6]"
                    >
                      <option value="">選択してください</option>
                      <option value="wash">定期洗車</option>
                      <option value="coating">ガラスコーティング</option>
                      <option value="interior">内装クリーニング</option>
                      <option value="full">フルディテイリング</option>
                      <option value="other">その他・複数</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#0a2540] mb-1.5">お問い合わせ内容</label>
                  <textarea
                    name="message"
                    rows={4}
                    maxLength={500}
                    placeholder="ご要望・ご質問・現在の課題などをご記入ください。"
                    className="w-full px-4 py-2.5 rounded-lg text-[14px] text-[#0a2540] placeholder-[#8ba0ba] bg-white border border-[#e4eef7] focus:outline-none focus:ring-2 focus:ring-[#0099e6]/30 focus:border-[#0099e6] resize-none"
                  />
                </div>

                {/* Brochure download checkbox */}
                <div
                  onClick={() => setWantBrochure(!wantBrochure)}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all select-none ${
                    wantBrochure
                      ? 'border-[#0099e6] bg-[#e6f4ff]'
                      : 'border-[#e4eef7] bg-white hover:border-[#0099e6]/40'
                  }`}
                >
                  <div className={`w-5 h-5 flex items-center justify-center rounded shrink-0 mt-0.5 transition-all ${
                    wantBrochure ? 'bg-[#0099e6]' : 'bg-white border-2 border-[#c8d9ea]'
                  }`}>
                    {wantBrochure && <i className="ri-check-line text-white text-[12px]"></i>}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[13px] font-bold text-[#0a2540]">資料ダウンロードも希望する</span>
                      <span className="text-[10px] font-bold text-white bg-[#0099e6] px-2 py-0.5 rounded-full whitespace-nowrap">PDF 無料</span>
                    </div>
                    <p className="text-[12px] text-[#5a7090] mt-0.5 leading-relaxed">
                      法人プランの詳細・料金表・導入事例をまとめたPDF資料をお送りします。
                    </p>
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center shrink-0">
                    <i className={`ri-file-download-line text-lg transition-colors ${
                      wantBrochure ? 'text-[#0099e6]' : 'text-[#8ba0ba]'
                    }`}></i>
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-[13px] font-medium text-red-500">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#0099e6] hover:bg-[#0077b3] text-white font-bold py-4 rounded-full transition-colors text-[15px] cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <i className="ri-send-plane-line"></i>
                  {wantBrochure ? '資料ダウンロード＋お問い合わせを送信' : '送信する（無料・2営業日以内に返信）'}
                </button>

                <p className="text-[11px] text-[#8ba0ba] text-center">
                  送信により
                  <Link to="/legal/privacy" className="text-[#0099e6] hover:underline mx-1">プライバシーポリシー</Link>
                  に同意したものとみなします。
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}