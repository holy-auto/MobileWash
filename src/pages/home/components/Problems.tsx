import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const problems = [
  {
    num: '01',
    icon: 'ri-time-line',
    title: '洗車に行く時間がない',
    desc: '週末は家族の時間を優先し、平日は帰宅が深夜。ガソリンスタンドの洗車機に並ぶ余裕なんて、もうありません。',
    stat: '日本人の平均洗車頻度',
    statVal: '月1回以下',
    image: 'https://readdy.ai/api/search-image?query=A%20tired%20Japanese%20businessman%20in%20a%20dark%20suit%20standing%20in%20front%20of%20his%20dusty%20dirty%20black%20sedan%20in%20a%20dimly%20lit%20underground%20apartment%20parking%20lot%20at%20night%20after%20a%20long%20work%20day%20feeling%20exhausted%20and%20depressed%20about%20having%20no%20time%20for%20car%20wash%20urban%20tokyo%20setting%20moody%20atmospheric%20blue%20and%20warm%20orange%20lighting%20cinematic%20photography%20style%20with%20shallow%20depth%20of%20field%20realistic%20documentary%20photography%20with%20grainy%20texture%20emotional%20storytelling%20style&width=400&height=300&seq=prob01&orientation=landscape',
    solution: 'MobileWashなら、駐車場に停めたままプロが出張。待ち時間ゼロ、予約はアプリで30秒で完了します。',
    accent: '#e07b00',
  },
  {
    num: '02',
    icon: 'ri-building-line',
    title: 'マンションで洗車できない',
    desc: '駐車場で水を使えない、ホースが届かない、騒音も気になる。手洗い洗車は諦めていました。',
    stat: 'マンション居住者の悩み',
    statVal: '水・電源が使えない',
    image: 'https://readdy.ai/api/search-image?query=A%20close-up%20shot%20of%20a%20restrictive%20warning%20sign%20mounted%20on%20a%20rough%20concrete%20wall%20inside%20a%20modern%20Japanese%20apartment%20parking%20garage%20indicating%20no%20water%20usage%20allowed%20with%20a%20compact%20white%20family%20car%20parked%20nearby%20and%20visible%20water%20stains%20on%20the%20floor%20minimalist%20architectural%20photography%20natural%20daylight%20streaming%20from%20small%20windows%20desaturated%20muted%20colors%20realistic%20documentary%20photography%20clean%20composition&width=400&height=300&seq=prob02&orientation=landscape',
    solution: 'MobileWashの認定プロは、専用の給水・電源システムを完備。どんな駐車場でも、出張手洗い洗車が可能です。',
    accent: '#0077b3',
  },
  {
    num: '03',
    icon: 'ri-money-dollar-circle-line',
    title: 'コーティングは高すぎる',
    desc: 'ディーラーや専門店では数十万円。気軽に頼めず、結局はワックス掛けで凌いでいるのが現状です。',
    stat: 'ディーラーコーティング相場',
    statVal: '10〜30万円',
    image: 'https://readdy.ai/api/search-image?query=A%20shocked%20and%20disappointed%20Japanese%20middle%20aged%20man%20in%20casual%20clothing%20looking%20at%20a%20very%20expensive%20automotive%20service%20receipt%20and%20invoice%20showing%20over%20200000%20yen%20for%20car%20coating%20service%20at%20a%20modern%20car%20dealership%20service%20counter%20with%20bright%20fluorescent%20lighting%20and%20white%20walls%20realistic%20documentary%20photography%20style%20clean%20composition%20focus%20on%20the%20expensive%20paper%20invoice%20with%20visible%20numbers%20emotional%20reaction%20capture&width=400&height=300&seq=prob03&orientation=landscape',
    solution: 'MobileWashのサブスクプランなら、月額¥9,800〜で出張コーティングが付いてくる。高額なディーラーに頼む必要はありません。',
    accent: '#059669',
  },
  {
    num: '04',
    icon: 'ri-question-mark',
    title: '業者の質が分からない',
    desc: 'ネットで頼んでも当たり外れが大きく、仕上がりに満足できなかった経験がある方は少なくありません。',
    stat: 'カーケア不満理由No.1',
    statVal: '仕上がりのばらつき',
    image: 'https://readdy.ai/api/search-image?query=A%20disappointed%20young%20Japanese%20woman%20in%20casual%20clothing%20carefully%20inspecting%20a%20poorly%20finished%20car%20wash%20result%20with%20visible%20water%20spots%20streaks%20and%20swirl%20marks%20on%20the%20dark%20colored%20paint%20surface%20of%20her%20vehicle%20in%20bright%20daylight%20outdoor%20residential%20setting%20close-up%20on%20the%20damaged%20paint%20with%20reflections%20realistic%20documentary%20photography%20style%20clean%20simple%20background%20high%20detail%20texture%20emphasis&width=400&height=300&seq=prob04&orientation=landscape',
    solution: 'MobileWashの認定プロはGPS追跡付き。実績・評価が見えるから、誰が来るか事前に確認できます。',
    accent: '#7c3aed',
  },
];

export default function Problems() {
  const heading = useScrollAnimation();
  const list = useScrollAnimation();

  return (
    <section id="problems" className="py-20 sm:py-28 bg-[#fafbfc]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* ヘッダー */}
        <div
          ref={heading.ref}
          className={`text-center max-w-2xl mx-auto mb-16 anim-fade-up ${heading.isVisible ? 'is-visible' : ''}`}
        >
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#0099e6] mb-4">PAIN POINTS</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0a2540] mb-4">
            この悩み、<span className="text-[#0099e6]">あなたも</span>ありませんか？
          </h2>
          <p className="text-[15px] text-[#5a7090] leading-relaxed">
            洗車もコーティングも「やりたい」けど、時間も場所も予算も足りない。
            <br className="hidden sm:inline" />
            そんな日常のもどかしさに、MobileWashが答えます。
          </p>
        </div>

        {/* カードグリッド */}
        <div
          ref={list.ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-5 stagger-children anim-fade-up ${list.isVisible ? 'is-visible' : ''}`}
        >
          {problems.map((p) => (
            <div
              key={p.num}
              className="group relative bg-white rounded-2xl border border-[#e4eef7] overflow-hidden hover:border-[#cfdfee] transition-all duration-500 hover:shadow-lg flex flex-col sm:flex-row"
            >
              {/* 画像エリア */}
              <div className="relative w-full sm:w-[42%] h-52 sm:h-auto flex-shrink-0 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                {/* ホバー時のダークオーバーレイ */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div
                      className="w-14 h-14 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm"
                      style={{ color: p.accent }}
                    >
                      <i className={`${p.icon} text-2xl`}></i>
                    </div>
                  </div>
                </div>
                {/* 番号バッジ */}
                <div
                  className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full text-[11px] font-bold text-white transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: p.accent }}
                >
                  {p.num}
                </div>
              </div>

              {/* テキストエリア */}
              <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden">
                <div>
                  <h3 className="text-lg font-bold text-[#0a2540] mb-3 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-[14px] text-[#5a7090] leading-relaxed mb-4">
                    {p.desc}
                  </p>

                  {/* 統計情報 */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="h-px flex-1 max-w-[40px]"
                      style={{ backgroundColor: `${p.accent}30` }}
                    ></div>
                    <div>
                      <p className="text-[10px] text-[#8ba0ba] font-bold tracking-wide">{p.stat}</p>
                      <p className="text-[13px] font-bold" style={{ color: p.accent }}>{p.statVal}</p>
                    </div>
                  </div>
                </div>

                {/* 解決策（ホバーで表示） */}
                <div
                  className="relative overflow-hidden rounded-xl mt-2"
                  style={{ backgroundColor: `${p.accent}08` }}
                >
                  <div className="p-4 transform translate-y-0 group-hover:-translate-y-full transition-transform duration-500">
                    <p className="text-[12px] text-[#8ba0ba]">MobileWashなら...</p>
                  </div>
                  <div
                    className="absolute inset-0 p-4 flex items-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                    style={{ backgroundColor: `${p.accent}10` }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full mt-0.5"
                        style={{ backgroundColor: `${p.accent}20` }}
                      >
                        <i className="ri-check-line text-sm" style={{ color: p.accent }}></i>
                      </div>
                      <p className="text-[13px] font-medium leading-relaxed" style={{ color: p.accent }}>
                        {p.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ホバー時の縁取りアクセント */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ backgroundColor: p.accent }}
              ></div>
            </div>
          ))}
        </div>

        {/* セクション締め */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white rounded-2xl border border-[#e4eef7]">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#e8f7ff]">
              <i className="ri-emotion-happy-line text-lg text-[#0099e6]"></i>
            </div>
            <p className="text-[15px] text-[#0a2540] font-medium">
              すべての悩みを、<strong className="text-[#0099e6]">ひとつのアプリ</strong>で解決します。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}