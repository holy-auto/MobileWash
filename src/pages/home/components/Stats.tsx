import { useState, useRef, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCountUp } from '@/hooks/useCountUp';

/* ── パノラマ施工写真 ── */
const PANORAMA_IMAGES = [
  {
    src: 'https://readdy.ai/api/search-image?query=close-up%20of%20professional%20hand%20car%20wash%20in%20progress%2C%20soapy%20water%20flowing%20over%20glossy%20dark%20car%20paint%2C%20worker%20in%20blue%20apron%20with%20microfiber%20mitt%2C%20soft%20natural%20daylight%2C%20clean%20organized%20garage%20environment%2C%20detailed%20high-quality%20photography%2C%20warm%20tones&width=800&height=400&seq=stats-wash1&orientation=landscape',
    alt: 'プロによる手洗い洗車施工',
  },
  {
    src: 'https://readdy.ai/api/search-image?query=close-up%20of%20car%20glass%20coating%20application%2C%20technician%20in%20gloves%20applying%20ceramic%20coating%20with%20applicator%20pad%20on%20shiny%20car%20hood%2C%20reflection%20of%20workshop%20lights%20on%20wet%20glossy%20surface%2C%20professional%20detailing%20studio%2C%20dramatic%20side%20lighting%2C%20premium%20quality%20finish%20visible&width=800&height=400&seq=stats-coat1&orientation=landscape',
    alt: 'ガラスコーティング施工',
  },
  {
    src: 'https://readdy.ai/api/search-image?query=overhead%20view%20of%20a%20perfectly%20clean%20luxury%20sedan%20parked%20in%20a%20modern%20residential%20driveway%20after%20professional%20detailing%20service%2C%20sunlight%20creating%20mirror-like%20reflections%20on%20the%20polished%20paint%20surface%2C%20pristine%20condition%2C%20suburban%20neighborhood%20with%20green%20trees%2C%20crisp%20and%20bright%20daylight%20photography&width=800&height=400&seq=stats-finish1&orientation=landscape',
    alt: '施工完了後の仕上がり',
  },
];

/* ── メイン指標 — ローンチ前なので正直に表示 ── */
const MAIN_METRICS = [
  {
    value: 0,
    suffix: '',
    unit: '件',
    label: '施工実績',
    desc: '2026年Q3ローンチ後に公開予定',
    accent: false,
    icon: 'ri-car-washing-line',
  },
  {
    value: 0,
    suffix: '',
    unit: '',
    label: '平均評価',
    desc: 'サービス開始後にユーザー評価を公開',
    accent: true,
    icon: 'ri-star-fill',
  },
  {
    value: 4,
    suffix: '',
    unit: 'エリア',
    label: '対応予定',
    desc: '首都圏・関西・東海・北関東',
    accent: false,
    icon: 'ri-map-pin-2-line',
  },
  {
    value: 0,
    suffix: '',
    unit: '分〜',
    label: '最短到着目標',
    desc: 'GPSマッチングでの目標到着時間',
    accent: false,
    icon: 'ri-time-line',
  },
];

/* ── サブ指標 — 同じく正直に ── */
const SUB_METRICS = [
  {
    value: 0,
    suffix: '%',
    label: '再予約率',
    desc: 'サービス開始後に集計・公開予定',
    icon: 'ri-heart-3-line',
  },
  {
    value: 0,
    suffix: '名',
    label: '認定プロ',
    desc: '現在プロ募集中。登録受付中',
    icon: 'ri-user-star-line',
  },
  {
    value: 24,
    suffix: 'h',
    label: '返金保証対応',
    desc: '満足できなければ全額返金',
    icon: 'ri-shield-check-line',
  },
];

/* ── Counter カード ── */
function CounterCard({
  metric,
  enabled,
}: {
  metric: (typeof MAIN_METRICS)[0];
  enabled: boolean;
}) {
  const isDecimal = metric.value % 1 !== 0;
  const count = useCountUp(metric.value, {
    duration: 2200,
    enabled,
    decimals: isDecimal ? 1 : 0,
  });

  return (
    <div
      className={`relative rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 hover:-translate-y-1 ${
        metric.accent
          ? 'bg-[#0a2540] text-white'
          : 'bg-white text-[#0a2540]'
      }`}
    >
      {/* アイコン */}
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4 ${
          metric.accent ? 'bg-white/15' : 'bg-[#f0f7ff]'
        }`}
      >
        <i
          className={`${metric.icon} text-lg ${metric.accent ? 'text-[#00b4ff]' : 'text-[#00b4ff]'}`}
        ></i>
      </div>

      {/* 数値 */}
      <div className="flex items-baseline justify-center gap-0.5 mb-1">
        <span
          className={`text-4xl sm:text-5xl font-bold tracking-tight tabular-nums ${
            metric.accent ? 'text-white' : 'text-[#0a2540]'
          }`}
        >
          {isDecimal ? count.toFixed(1) : count}
        </span>
        {metric.suffix && (
          <span
            className={`text-lg sm:text-xl font-bold ${
              metric.accent ? 'text-[#00b4ff]' : 'text-[#00b4ff]'
            }`}
          >
            {metric.suffix}
          </span>
        )}
      </div>

      {/* 単位ラベル */}
      {metric.unit && (
        <p
          className={`text-sm font-medium mb-2 ${
            metric.accent ? 'text-white/70' : 'text-[#5a7090]'
          }`}
        >
          {metric.unit}
        </p>
      )}

      {/* ラベル */}
      <p className="text-[15px] font-bold mb-1.5">{metric.label}</p>

      {/* 補足 */}
      <p
        className={`text-[12px] leading-snug ${
          metric.accent ? 'text-white/50' : 'text-[#8ba0ba]'
        }`}
      >
        {metric.desc}
      </p>
    </div>
  );
}

/* ── サブ指標 カード ── */
function SubMetricCard({
  metric,
  enabled,
}: {
  metric: (typeof SUB_METRICS)[0];
  enabled: boolean;
}) {
  const isDecimal = metric.value % 1 !== 0;
  const count = useCountUp(metric.value, {
    duration: 2000,
    enabled,
    decimals: isDecimal ? 1 : 0,
  });

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#e4eef7] hover:border-[#00b4ff]/30 hover:shadow-sm transition-all duration-300">
      <div className="w-10 h-10 rounded-lg bg-[#f0f7ff] flex items-center justify-center shrink-0">
        <i className={`${metric.icon} text-[#00b4ff]`}></i>
      </div>
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-[#0a2540] tabular-nums">
            {isDecimal ? count.toFixed(1) : count}
          </span>
          <span className="text-sm font-bold text-[#00b4ff]">{metric.suffix}</span>
        </div>
        <p className="text-[13px] font-bold text-[#0a2540]">{metric.label}</p>
        <p className="text-[11px] text-[#8ba0ba]">{metric.desc}</p>
      </div>
    </div>
  );
}

/* ── パノラマスライダー ── */
function PanoramaSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % PANORAMA_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[180px] sm:h-[220px] rounded-2xl overflow-hidden mb-10">
      {PANORAMA_IMAGES.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img src={img.src} alt={img.alt} className="w-full h-full object-cover object-top" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/60 via-transparent to-transparent" />
        </div>
      ))}

      {/* 写真ラベル */}
      <div className="absolute bottom-3 left-4 z-10 flex items-center gap-2">
        <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-bold text-white">
          {PANORAMA_IMAGES[current].alt}
        </span>
      </div>

      {/* ドット */}
      <div className="absolute bottom-3 right-4 z-10 flex items-center gap-1.5">
        {PANORAMA_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="cursor-pointer"
          >
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 20 : 6,
                height: 6,
                backgroundColor: i === current ? '#00b4ff' : 'rgba(255,255,255,0.5)',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── メインコンポーネント ── */
export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [countersEnabled, setCountersEnabled] = useState(false);
  const heading = useScrollAnimation({ threshold: 0.15 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersEnabled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f7fbff] py-14 sm:py-20 border-y border-[#e4eef7]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div
          ref={heading.ref}
          className={`text-center mb-10 anim-fade-up ${heading.isVisible ? 'is-visible' : ''}`}
        >
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#0099e6] mb-3">
            By the Numbers
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0a2540] mb-3">
            数字で見る <span className="text-[#00b4ff]">MobileWash</span>
          </h2>
          <p className="text-[14px] text-[#5a7090] max-w-lg mx-auto">
            ローンチに向けて、いまお伝えできる数字を正直に公開しています。
          </p>
        </div>

        {/* パノラマ施工写真 */}
        <PanoramaSlider />

        {/* メイン指標カード */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {MAIN_METRICS.map((m) => (
            <CounterCard key={m.label} metric={m} enabled={countersEnabled} />
          ))}
        </div>

        {/* サブ指標 */}
        <div className="grid sm:grid-cols-3 gap-3">
          {SUB_METRICS.map((m) => (
            <SubMetricCard key={m.label} metric={m} enabled={countersEnabled} />
          ))}
        </div>

        {/* ライブバッジバー */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0ab87a] bg-[#e6f9f4] px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-[#0ab87a] rounded-full animate-pulse"></span>
            先行登録受付中
          </span>
          <span className="text-[12px] text-[#8ba0ba]">
            登録者全員に¥1,500 OFFクーポン進呈
          </span>
        </div>
      </div>
    </section>
  );
}