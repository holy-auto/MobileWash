import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const MENU_OPTIONS = [
  '出張手洗い洗車', '出張ガラスコーティング', '出張内装クリーニング',
  '出張ポリッシュ磨き', 'フルディテイリング', 'エンジンルーム洗浄',
];

const PRO_BENEFITS = [
  {
    icon: 'ri-time-line',
    color: 'from-sky-400 to-blue-500',
    title: '完全シフトフリー',
    desc: '本業の合間・週末だけでもOK。自分のペースで稼働できます。',
  },
  {
    icon: 'ri-percent-line',
    color: 'from-emerald-400 to-teal-500',
    title: '還元率90%',
    desc: '業界最高水準。施工料金の90%が直接あなたの収益になります。',
  },
  {
    icon: 'ri-map-pin-2-line',
    color: 'from-amber-400 to-orange-500',
    title: 'GPS自動集客',
    desc: '集客・マーケティング不要。アプリが自動でお客様をマッチング。',
  },
  {
    icon: 'ri-shield-check-line',
    color: 'from-violet-400 to-purple-500',
    title: '保険・研修完備',
    desc: '未経験でも研修プログラムで安心。施工中の保険補償も完備。',
  },
];

const STEPS = [
  { icon: 'ri-file-list-3-line', label: '事前登録', desc: '約2分で完了' },
  { icon: 'ri-video-chat-line', label: 'オンライン面談', desc: '30分程度' },
  { icon: 'ri-graduation-cap-line', label: '認定研修', desc: '1〜2日間' },
  { icon: 'ri-rocket-line', label: '稼働開始', desc: 'すぐに稼げる' },
];

function IncomeSimulator() {
  const [days, setDays] = useState(16);
  const [jobsPerDay, setJobsPerDay] = useState(3);
  const [unitPrice, setUnitPrice] = useState(12000);
  const anim = useScrollAnimation({ threshold: 0.1 });

  const gross = days * jobsPerDay * unitPrice;
  const net = Math.round(gross * 0.9);
  const formatted = net.toLocaleString();

  return (
    <div
      ref={anim.ref}
      className={`bg-white/8 border border-white/15 rounded-2xl p-6 anim-fade-up ${anim.isVisible ? 'is-visible' : ''}`}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] text-[#00b4ff] mb-1">INCOME SIMULATOR</p>
          <p className="text-[14px] font-bold text-white">収入シミュレーター</p>
        </div>
        <div className="text-right">
          <p className="text-[36px] font-bold text-white leading-none">¥{formatted}</p>
          <p className="text-[11px] text-white/50 mt-1">/ 月（手取り想定）</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-[11px] text-white/70 font-medium">稼働日数</label>
            <span className="text-[12px] font-bold text-[#00b4ff]">{days}日 / 月</span>
          </div>
          <input
            type="range" min={4} max={26} step={1} value={days}
            onChange={e => setDays(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: '#00b4ff', background: `linear-gradient(to right, #00b4ff ${((days-4)/22)*100}%, rgba(255,255,255,0.15) ${((days-4)/22)*100}%)` }}
          />
          <div className="flex justify-between text-[10px] text-white/30 mt-1">
            <span>4日</span><span>26日</span>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-[11px] text-white/70 font-medium">1日あたりの件数</label>
            <span className="text-[12px] font-bold text-[#00b4ff]">{jobsPerDay}件</span>
          </div>
          <input
            type="range" min={1} max={6} step={1} value={jobsPerDay}
            onChange={e => setJobsPerDay(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: '#00b4ff', background: `linear-gradient(to right, #00b4ff ${((jobsPerDay-1)/5)*100}%, rgba(255,255,255,0.15) ${((jobsPerDay-1)/5)*100}%)` }}
          />
          <div className="flex justify-between text-[10px] text-white/30 mt-1">
            <span>1件</span><span>6件</span>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-[11px] text-white/70 font-medium">平均単価</label>
            <span className="text-[12px] font-bold text-[#00b4ff]">¥{unitPrice.toLocaleString()}</span>
          </div>
          <input
            type="range" min={4000} max={50000} step={1000} value={unitPrice}
            onChange={e => setUnitPrice(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: '#00b4ff', background: `linear-gradient(to right, #00b4ff ${((unitPrice-4000)/46000)*100}%, rgba(255,255,255,0.15) ${((unitPrice-4000)/46000)*100}%)` }}
          />
          <div className="flex justify-between text-[10px] text-white/30 mt-1">
            <span>¥4,000</span><span>¥50,000</span>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
        {[
          { label: '売上', val: `¥${gross.toLocaleString()}` },
          { label: '還元率', val: '90%', highlight: true },
          { label: '手取り', val: `¥${formatted}`, highlight: true },
        ].map(item => (
          <div key={item.label}>
            <p className="text-[10px] text-white/50 mb-0.5">{item.label}</p>
            <p className={`text-[13px] font-bold ${item.highlight ? 'text-[#00b4ff]' : 'text-white'}`}>{item.val}</p>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-white/30 mt-3 text-center">※ 試算例。実際の収入は稼働状況により異なります。</p>
    </div>
  );
}

export default function ProRecruit() {
  const [selected, setSelected] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');
  const section = useScrollAnimation({ threshold: 0.04 });
  const benefitsAnim = useScrollAnimation({ threshold: 0.1 });
  const stepsAnim = useScrollAnimation({ threshold: 0.1 });
  const voicesAnim = useScrollAnimation({ threshold: 0.1 });

  const toggleMenu = (m: string) => {
    setSelected(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed || status === 'loading') return;
    setStatus('loading');
    const form = e.currentTarget;
    const data = new URLSearchParams();
    const fd = new FormData(form);
    fd.forEach((v, k) => data.append(k, v as string));
    if (selected.length > 0) data.append('menus', selected.join(', '));
    try {
      const res = await fetch('https://readdy.ai/api/form/d7p8tipus6nbnotnpbi0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
      });
      if (res.ok) {
        setStatus('success');
        setMsg('');
        form.reset();
        setSelected([]);
        setAgreed(false);
      } else {
        setStatus('error');
        setMsg('送信に失敗しました。もう一度お試しください。');
      }
    } catch {
      setStatus('error');
      setMsg('送信に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <section id="pro-recruit" className="py-20 sm:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div
          ref={section.ref}
          className={`rounded-3xl bg-gradient-to-br from-[#071828] via-[#0a2540] to-[#0e2d52] relative overflow-hidden anim-scale-up ${section.isVisible ? 'is-visible' : ''}`}
        >
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#00b4ff] rounded-full opacity-10 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#00d4b8] rounded-full opacity-8 blur-3xl pointer-events-none"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00b4ff]/40 to-transparent"></div>

          {/* Hero banner */}
          <div className="relative px-8 sm:px-12 lg:px-14 pt-12 pb-8 border-b border-white/10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#00b4ff]/15 border border-[#00b4ff]/30 text-[#00b4ff] text-[11px] font-bold tracking-widest px-4 py-1.5 rounded-full mb-5">
                  <span className="w-1.5 h-1.5 bg-[#00b4ff] rounded-full animate-pulse inline-block"></span>
                  認定プロ第一期生 募集中 — 全国47都道府県
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white leading-tight mb-3">
                  洗車・コーティングの<br />
                  <span className="text-[#00b4ff]">プロ</span>として、<br className="sm:hidden" />自由に稼ごう
                </h2>
                <p className="text-[15px] text-white/70 max-w-xl leading-relaxed">
                  ディテイリングのスキルを、もっと自由に。もっと稼げる場所へ。
                  MobileWashは出張型カーケアの新しい働き方を提案します。
                </p>
              </div>
              <div className="flex flex-wrap gap-4 lg:flex-col lg:items-end shrink-0">
                {[
                  { val: '90%', label: '還元率（業界最高水準）', icon: 'ri-percent-line' },
                  { val: '¥0', label: '登録費用・初期費用', icon: 'ri-money-dollar-circle-line' },
                  { val: '47', label: '都道府県で募集中', icon: 'ri-map-pin-line' },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-3 bg-white/8 border border-white/10 rounded-xl px-4 py-2.5">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#00b4ff]/20 shrink-0">
                      <i className={`${s.icon} text-[#00b4ff] text-sm`}></i>
                    </div>
                    <div>
                      <p className="text-[18px] font-bold text-white leading-tight">{s.val}</p>
                      <p className="text-[10px] text-white/50">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative px-8 sm:px-12 lg:px-14 py-10 grid lg:grid-cols-12 gap-10 items-start">

            {/* LEFT COLUMN */}
            <div className="lg:col-span-6 space-y-8">

              {/* Benefits grid */}
              <div ref={benefitsAnim.ref} className={`anim-fade-up ${benefitsAnim.isVisible ? 'is-visible' : ''}`}>
                <p className="text-[11px] font-bold tracking-[0.2em] text-[#00b4ff] mb-4">WHY MOBILEWASH</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {PRO_BENEFITS.map((b, i) => (
                    <div
                      key={b.title}
                      className="bg-white/6 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors duration-300"
                      style={{ animationDelay: `${i * 0.07}s` }}
                    >
                      <div className={`w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br ${b.color} mb-3`}>
                        <i className={`${b.icon} text-white text-base`}></i>
                      </div>
                      <p className="text-[13px] font-bold text-white mb-1">{b.title}</p>
                      <p className="text-[11px] text-white/60 leading-relaxed">{b.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Income simulator */}
              <IncomeSimulator />

              {/* Registration steps */}
              <div ref={stepsAnim.ref} className={`anim-fade-up ${stepsAnim.isVisible ? 'is-visible' : ''}`}>
                <p className="text-[11px] font-bold tracking-[0.2em] text-[#00b4ff] mb-4">REGISTRATION FLOW</p>
                <div className="relative flex items-start gap-0">
                  {STEPS.map((s, i) => (
                    <div key={s.label} className="flex-1 flex flex-col items-center relative">
                      {i < STEPS.length - 1 && (
                        <div className="absolute top-4 left-1/2 right-0 h-px bg-gradient-to-r from-[#00b4ff]/50 to-[#00b4ff]/20 z-0"></div>
                      )}
                      <div className="relative z-10 w-8 h-8 rounded-full bg-gradient-to-br from-[#00b4ff] to-[#00d4b8] flex items-center justify-center mb-2">
                        <i className={`${s.icon} text-white text-xs`}></i>
                      </div>
                      <p className="text-[11px] font-bold text-white text-center leading-tight">{s.label}</p>
                      <p className="text-[10px] text-white/40 text-center mt-0.5">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Voices — honest coming-soon */}
              <div ref={voicesAnim.ref} className={`anim-fade-up ${voicesAnim.isVisible ? 'is-visible' : ''}`}>
                <p className="text-[11px] font-bold tracking-[0.2em] text-[#00b4ff] mb-4">PRO VOICES</p>
                <div className="bg-white/6 border border-white/10 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#00b4ff]/15 mx-auto mb-4">
                    <i className="ri-chat-smile-3-line text-[#00b4ff] text-2xl"></i>
                  </div>
                  <p className="text-[14px] font-bold text-white mb-2">プロの声、近日公開予定</p>
                  <p className="text-[12px] text-white/55 leading-relaxed">
                    2026年Q3のローンチ後、実際に稼働したプロの声をここで公開します。<br />
                    まずはあなたが第一期プロとして記念すべき最初の一人に。
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN — Form */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#00b4ff] to-[#00d4b8] px-6 py-5">
                  <p className="text-[10px] font-bold tracking-widest text-white/80 mb-1">PRO PRE-REGISTRATION</p>
                  <h3 className="text-[20px] font-bold text-white">認定プロ第一期生 事前登録</h3>
                  <p className="text-[12px] text-white/80 mt-1">
                    登録者には優先案内・研修招待・初期報酬アップを提供
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {['優先案内', '研修招待', '初期報酬UP', '登録費¥0'].map(tag => (
                      <span key={tag} className="text-[10px] font-bold bg-white/20 text-white px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {status === 'success' ? (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 flex items-center justify-center bg-emerald-50 rounded-full mx-auto mb-4">
                      <i className="ri-check-double-line text-emerald-500 text-3xl"></i>
                    </div>
                    <h4 className="text-[18px] font-bold text-[#0a2540] mb-2">登録完了！</h4>
                    <p className="text-[13px] text-[#5a7090] leading-relaxed">
                      ご登録ありがとうございます。<br />
                      ローンチ時に優先案内・研修招待をお送りします。
                    </p>
                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                      {['優先案内メール', '研修招待', '初期報酬アップ'].map(tag => (
                        <span key={tag} className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full border border-emerald-200">
                          <i className="ri-check-line text-xs"></i>{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <form data-readdy-form onSubmit={handleSubmit} className="p-6 lg:p-7 space-y-4 text-[#0a2540]">
                    <div>
                      <label className="block text-[12px] font-bold text-[#0a2540] mb-1.5">
                        メールアドレス <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="email" type="email" required
                        placeholder="example@holy-inc.jp"
                        className="w-full px-4 py-3 rounded-xl text-[14px] text-[#0a2540] placeholder-[#8ba0ba] bg-[#f7fafd] border border-[#e4eef7] focus:outline-none focus:ring-2 focus:ring-[#00b4ff]/30 focus:border-[#00b4ff] transition-all"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[12px] font-bold text-[#0a2540] mb-1.5">お名前</label>
                        <input
                          name="name" placeholder="山田 太郎"
                          className="w-full px-4 py-3 rounded-xl text-[14px] text-[#0a2540] placeholder-[#8ba0ba] bg-[#f7fafd] border border-[#e4eef7] focus:outline-none focus:ring-2 focus:ring-[#00b4ff]/30 focus:border-[#00b4ff] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-[#0a2540] mb-1.5">電話番号</label>
                        <input
                          name="phone" type="tel" placeholder="090-0000-0000"
                          className="w-full px-4 py-3 rounded-xl text-[14px] text-[#0a2540] placeholder-[#8ba0ba] bg-[#f7fafd] border border-[#e4eef7] focus:outline-none focus:ring-2 focus:ring-[#00b4ff]/30 focus:border-[#00b4ff] transition-all"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[12px] font-bold text-[#0a2540] mb-1.5">活動希望エリア</label>
                        <select name="area" className="w-full px-4 py-3 rounded-xl text-[14px] text-[#0a2540] bg-[#f7fafd] border border-[#e4eef7] focus:outline-none focus:ring-2 focus:ring-[#00b4ff]/30 focus:border-[#00b4ff] transition-all">
                          <option value="">全国対応</option>
                          <optgroup label="関東">
                            <option value="tokyo">東京都</option>
                            <option value="kanagawa">神奈川県</option>
                            <option value="saitama">埼玉県</option>
                            <option value="chiba">千葉県</option>
                          </optgroup>
                          <optgroup label="近畿">
                            <option value="osaka">大阪府</option>
                            <option value="kyoto">京都府</option>
                            <option value="hyogo">兵庫県</option>
                          </optgroup>
                          <optgroup label="中部">
                            <option value="aichi">愛知県</option>
                            <option value="shizuoka">静岡県</option>
                          </optgroup>
                          <optgroup label="九州">
                            <option value="fukuoka">福岡県</option>
                            <option value="kumamoto">熊本県</option>
                          </optgroup>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-[#0a2540] mb-1.5">経験年数</label>
                        <select name="experience" className="w-full px-4 py-3 rounded-xl text-[14px] text-[#0a2540] bg-[#f7fafd] border border-[#e4eef7] focus:outline-none focus:ring-2 focus:ring-[#00b4ff]/30 focus:border-[#00b4ff] transition-all">
                          <option value="">選択してください</option>
                          <option value="beginner">未経験 / 学習中</option>
                          <option value="1-3">1〜3年</option>
                          <option value="3-5">3〜5年</option>
                          <option value="5-10">5〜10年</option>
                          <option value="10+">10年以上</option>
                        </select>
                      </div>
                    </div>
                    <fieldset>
                      <legend className="block text-[12px] font-bold text-[#0a2540] mb-2">得意なメニュー（複数選択可）</legend>
                      <div className="flex flex-wrap gap-2">
                        {MENU_OPTIONS.map(m => (
                          <button key={m} type="button" onClick={() => toggleMenu(m)}
                            className={`text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                              selected.includes(m) ? 'bg-[#00b4ff] text-white border-[#00b4ff]' : 'bg-white text-[#5a7090] border-[#e4eef7] hover:border-[#00b4ff]/40'
                            }`}
                          >
                            {selected.includes(m) && <i className="ri-check-line mr-1 text-[10px]"></i>}
                            {m}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                    <div>
                      <label className="block text-[12px] font-bold text-[#0a2540] mb-1.5">
                        メッセージ・自己PR <span className="text-[#8ba0ba] font-normal">（任意）</span>
                      </label>
                      <textarea
                        name="message" rows={3} maxLength={500}
                        placeholder="例：店舗で5年勤務後、現在は副業として活動。ガラスコーティングが得意です。"
                        className="w-full px-4 py-3 rounded-xl text-[14px] text-[#0a2540] placeholder-[#8ba0ba] bg-[#f7fafd] border border-[#e4eef7] focus:outline-none focus:ring-2 focus:ring-[#00b4ff]/30 focus:border-[#00b4ff] resize-none transition-all"
                      />
                    </div>
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 accent-[#00b4ff] w-4 h-4" />
                      <span className="text-[12px] text-[#5a7090] leading-relaxed">
                        <Link to="/legal/terms" className="text-[#00b4ff] hover:underline">利用規約</Link>・
                        <Link to="/legal/privacy" className="text-[#00b4ff] hover:underline">プライバシーポリシー</Link>に同意のうえ申し込みます。
                      </span>
                    </label>
                    {status === 'error' && (
                      <p className="text-[12px] text-red-500 font-medium">{msg}</p>
                    )}
                    <button
                      type="submit"
                      disabled={!agreed || status === 'loading'}
                      className="w-full bg-gradient-to-r from-[#00b4ff] to-[#00d4b8] hover:from-[#0099e6] hover:to-[#00b8a0] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all text-[15px] cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                    >
                      {status === 'loading' ? (
                        <><i className="ri-loader-4-line animate-spin"></i>送信中...</>
                      ) : (
                        <><i className="ri-rocket-line"></i>プロ事前登録に申し込む（無料）</>
                      )}
                    </button>
                    <p className="text-[11px] text-[#8ba0ba] text-center">
                      登録費用・初期費用は一切かかりません
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}