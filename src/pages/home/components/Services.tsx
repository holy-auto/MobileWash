import { useState, useRef, useEffect, useCallback } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useSwipe } from '@/hooks/useSwipe';

const services = [
  {
    id: 'handwash',
    badge: '人気No.1',
    badgeColor: 'bg-[#0099e6] text-white',
    category: 'Hand Wash',
    title: '出張手洗い洗車',
    shortDesc: 'ピュアウォーターで丁寧に手洗い。ホイールも含めて隅々まで仕上げます。',
    fullDesc: '機械洗車では届かない細部まで、熟練プロが手作業で丁寧に洗い上げます。ピュアウォーター（純水）を使用することで、水垢の原因となるミネラル分を除去。洗車傷がつきにくいマイクロファイバーミットで、塗装面を守りながら汚れを落とします。',
    time: '約45分',
    price: '¥3,980',
    icon: 'ri-drop-line',
    accentColor: '#0099e6',
    image: 'https://readdy.ai/api/search-image?query=professional%20car%20wash%20technician%20in%20uniform%20carefully%20hand%20washing%20a%20white%20luxury%20sedan%20with%20soft%20microfiber%20mitt%2C%20soapy%20foam%20on%20car%20surface%2C%20close-up%20detail%20shot%2C%20clean%20bright%20outdoor%20residential%20driveway%20setting%2C%20water%20droplets%20glistening%20in%20sunlight%2C%20premium%20automotive%20photography%2C%20shallow%20depth%20of%20field&width=900&height=560&seq=svc-detail-1&orientation=landscape',
    beforeImage: 'https://readdy.ai/api/search-image?query=dirty%20dusty%20car%20exterior%20before%20washing%2C%20mud%20splashes%20on%20door%20panels%2C%20grimy%20windshield%2C%20bird%20droppings%20on%20hood%2C%20realistic%20automotive%20photography%2C%20overcast%20natural%20light%2C%20simple%20background&width=440&height=300&seq=svc-before-1&orientation=landscape',
    afterImage: 'https://readdy.ai/api/search-image?query=perfectly%20clean%20shiny%20white%20car%20after%20professional%20hand%20wash%2C%20water%20beading%20on%20glossy%20paint%20surface%2C%20sparkling%20clean%20wheels%2C%20reflections%20visible%20on%20hood%2C%20bright%20natural%20light%2C%20premium%20automotive%20photography&width=440&height=300&seq=svc-after-1&orientation=landscape',
    steps: [
      { icon: 'ri-water-flash-line', label: '純水リンス', desc: 'ミネラルフリーの純水で予洗い' },
      { icon: 'ri-bubble-chart-line', label: 'フォーム洗浄', desc: '高品質カーシャンプーで泡立て' },
      { icon: 'ri-hand-heart-line', label: '手洗い仕上げ', desc: 'マイクロファイバーで丁寧に洗浄' },
      { icon: 'ri-sparkling-2-line', label: '拭き上げ', desc: '水垢なしの完璧な仕上がり' },
    ],
    includes: ['ボディ全体手洗い', 'ホイール・タイヤ洗浄', 'ガラス外側清掃', '拭き上げ仕上げ', '純水使用'],
    faq: [
      { q: 'マンションの駐車場でも対応できますか？', a: '屋外・屋内駐車場どちらでも対応可能です。水道が使えない場合も、プロが専用タンクを持参します。' },
      { q: '雨の日でも施工できますか？', a: '小雨程度であれば施工可能ですが、大雨の場合は安全のため日程変更をお願いする場合があります。' },
    ],
  },
  {
    id: 'interior',
    badge: null,
    badgeColor: '',
    category: 'Interior Clean',
    title: '出張内装クリーニング',
    shortDesc: 'シート・天井・ダッシュボード・フロアを徹底的にクリーニング。消臭・除菌込み。',
    fullDesc: '車内の見えない汚れ・ニオイ・菌を徹底除去。業務用スチームクリーナーとプロ用洗剤で、シート・カーペット・天井・ダッシュボードを隅々まで清潔に。ペット臭・タバコ臭・食べ物臭にも対応します。',
    time: '約90分',
    price: '¥6,980',
    icon: 'ri-car-line',
    accentColor: '#00b894',
    image: 'https://readdy.ai/api/search-image?query=professional%20detailer%20vacuuming%20and%20steam%20cleaning%20the%20interior%20of%20a%20luxury%20car%2C%20spotless%20beige%20leather%20seats%2C%20clean%20dashboard%2C%20professional%20cleaning%20equipment%20visible%2C%20bright%20natural%20light%20inside%20the%20car%2C%20high-end%20automotive%20detailing%20photography%2C%20cinematic%20composition&width=900&height=560&seq=svc-detail-2&orientation=landscape',
    beforeImage: 'https://readdy.ai/api/search-image?query=dirty%20car%20interior%20before%20cleaning%2C%20crumbs%20on%20seats%2C%20dusty%20dashboard%2C%20stained%20floor%20mats%2C%20cluttered%20messy%20car%20interior%2C%20realistic%20photography&width=440&height=300&seq=svc-before-2&orientation=landscape',
    afterImage: 'https://readdy.ai/api/search-image?query=spotlessly%20clean%20car%20interior%20after%20professional%20detailing%2C%20pristine%20leather%20seats%2C%20dust-free%20dashboard%2C%20clean%20floor%20mats%2C%20fresh%20and%20bright%20interior%2C%20premium%20automotive%20photography&width=440&height=300&seq=svc-after-2&orientation=landscape',
    steps: [
      { icon: 'ri-delete-bin-line', label: 'ゴミ除去', desc: '車内の大きなゴミを取り除く' },
      { icon: 'ri-tornado-line', label: 'バキューム', desc: 'シート・フロアを強力吸引' },
      { icon: 'ri-fire-line', desc: 'スチームで除菌・消臭', label: 'スチーム除菌' },
      { icon: 'ri-shield-check-line', label: '仕上げ保護', desc: 'ダッシュボード保護剤を塗布' },
    ],
    includes: ['シート全面クリーニング', 'フロアマット洗浄', 'ダッシュボード清掃', '天井クリーニング', '消臭・除菌処理'],
    faq: [
      { q: 'チャイルドシートがついていても大丈夫ですか？', a: 'チャイルドシートを外した状態でご準備いただくか、プロが取り外して施工することも可能です。' },
      { q: 'ペットの毛は取れますか？', a: '専用ツールで徹底的に除去します。ただし、毛の量によっては追加料金が発生する場合があります。' },
    ],
  },
  {
    id: 'coating',
    badge: 'おすすめ',
    badgeColor: 'bg-[#0099e6] text-white',
    category: 'Glass Coating',
    title: '出張ガラスコーティング',
    shortDesc: 'プロ施工のガラスコーティング。最大3年間、艶と撥水を保ちます。',
    fullDesc: '市販品とは次元が違う、プロ専用ガラスコーティング剤を使用。塗装面に強固なガラス被膜を形成し、最大3年間の撥水・防汚・UV保護効果を発揮します。施工後は雨水が汚れを流し落とし、洗車の手間が大幅に減ります。',
    time: '約3時間',
    price: '¥29,800',
    icon: 'ri-shield-star-line',
    accentColor: '#6c5ce7',
    image: 'https://readdy.ai/api/search-image?query=professional%20applying%20glass%20ceramic%20coating%20to%20a%20dark%20navy%20luxury%20car%20hood%2C%20the%20surface%20showing%20deep%20mirror-like%20reflections%2C%20water%20beading%20effect%20dramatically%20visible%2C%20professional%20detailing%20tools%20and%20coating%20bottles%2C%20clean%20minimal%20garage%20background%2C%20premium%20automotive%20photography%20with%20dramatic%20studio%20lighting&width=900&height=560&seq=svc-detail-3&orientation=landscape',
    beforeImage: 'https://readdy.ai/api/search-image?query=car%20paint%20surface%20before%20coating%2C%20dull%20oxidized%20paint%2C%20water%20not%20beading%2C%20flat%20unprotected%20surface%2C%20close-up%20automotive%20photography&width=440&height=300&seq=svc-before-3&orientation=landscape',
    afterImage: 'https://readdy.ai/api/search-image?query=car%20paint%20surface%20after%20glass%20coating%2C%20dramatic%20water%20beading%20effect%2C%20mirror-like%20deep%20gloss%20reflection%2C%20protected%20shiny%20surface%2C%20close-up%20automotive%20photography%20with%20water%20droplets&width=440&height=300&seq=svc-after-3&orientation=landscape',
    steps: [
      { icon: 'ri-drop-line', label: '下地洗浄', desc: '鉄粉除去・脱脂処理' },
      { icon: 'ri-sparkling-line', label: '磨き処理', desc: '微細な傷を除去して下地を整える' },
      { icon: 'ri-shield-star-line', label: 'コーティング塗布', desc: 'プロ専用剤を均一に塗布' },
      { icon: 'ri-time-line', label: '硬化・仕上げ', desc: '完全硬化まで丁寧に管理' },
    ],
    includes: ['下地処理（脱脂・鉄粉除去）', '軽度磨き処理', 'ガラスコーティング施工', '1年保証付き', '施工証明書発行'],
    faq: [
      { q: 'コーティング後すぐに雨に濡れても大丈夫ですか？', a: '施工後24時間は水に濡れないようにしてください。その後は雨でも問題ありません。' },
      { q: '新車でなくても施工できますか？', a: 'もちろん可能です。ただし、塗装の状態によっては磨き処理が必要になる場合があります。' },
    ],
  },
  {
    id: 'polish',
    badge: null,
    badgeColor: '',
    category: 'Polish',
    title: '出張ポリッシュ磨き',
    shortDesc: '小傷・くすみを丁寧に磨き上げ、新車のような輝きを復活させます。',
    fullDesc: '洗車傷・スクラッチ・くすみ・水垢を、プロ用ダブルアクションポリッシャーで丁寧に除去。コンパウンドの選定から仕上げまで、塗装の状態に合わせて最適な施工を行います。コーティング前の下地処理としても最適です。',
    time: '約2時間',
    price: '¥12,800',
    icon: 'ri-sparkling-line',
    accentColor: '#e17055',
    image: 'https://readdy.ai/api/search-image?query=professional%20car%20detailer%20using%20a%20dual-action%20polisher%20on%20a%20red%20sports%20car%20hood%2C%20swirl%20marks%20being%20removed%2C%20deep%20glossy%20reflection%20appearing%2C%20professional%20polishing%20compound%20and%20pads%20visible%2C%20clean%20bright%20workshop%20setting%2C%20automotive%20detailing%20photography%20with%20dramatic%20lighting&width=900&height=560&seq=svc-detail-4&orientation=landscape',
    beforeImage: 'https://readdy.ai/api/search-image?query=car%20paint%20with%20swirl%20marks%20and%20scratches%20before%20polishing%2C%20dull%20surface%20with%20visible%20circular%20scratches%2C%20close-up%20automotive%20photography%20showing%20paint%20defects&width=440&height=300&seq=svc-before-4&orientation=landscape',
    afterImage: 'https://readdy.ai/api/search-image?query=car%20paint%20after%20professional%20polishing%2C%20perfect%20mirror-like%20reflection%2C%20no%20swirl%20marks%2C%20deep%20glossy%20finish%2C%20close-up%20automotive%20photography%20showing%20flawless%20paint&width=440&height=300&seq=svc-after-4&orientation=landscape',
    steps: [
      { icon: 'ri-search-eye-line', label: '塗装診断', desc: '傷・くすみの状態を確認' },
      { icon: 'ri-settings-3-line', label: 'コンパウンド磨き', desc: '傷を削り取る粗磨き' },
      { icon: 'ri-sparkling-2-line', label: '仕上げ磨き', desc: '鏡面仕上げに整える' },
      { icon: 'ri-eye-line', label: '品質確認', desc: '光源下で仕上がりをチェック' },
    ],
    includes: ['塗装状態診断', 'コンパウンド磨き', '仕上げポリッシュ', '脱脂処理', '施工後コーティング推奨'],
    faq: [
      { q: 'どの程度の傷まで消えますか？', a: '爪が引っかからない程度の浅い傷（クリア層内）であれば、ほぼ完全に除去できます。深い傷は目立たなくなりますが、完全除去は難しい場合があります。' },
      { q: '磨きとコーティングをセットで頼めますか？', a: 'はい、セット割引があります。磨き後にコーティングを施工することで、最高の仕上がりになります。' },
    ],
  },
  {
    id: 'fulldetail',
    badge: 'プレミアム',
    badgeColor: 'bg-[#0a2540] text-white',
    category: 'Full Detail',
    title: 'フルディテイリング',
    shortDesc: '洗車・内装・磨き・コーティングをトータルケア。最高の仕上がりへ。',
    fullDesc: '手洗い洗車から内装クリーニング、ポリッシュ磨き、ガラスコーティングまで、すべてのサービスをワンパッケージで提供。新車購入時・売却前・特別なイベント前など、愛車を最高の状態に仕上げたい方に。',
    time: '約5時間',
    price: '¥49,800',
    icon: 'ri-star-line',
    accentColor: '#fdcb6e',
    image: 'https://readdy.ai/api/search-image?query=fully%20detailed%20black%20luxury%20sports%20car%20gleaming%20under%20dramatic%20studio%20lighting%2C%20perfect%20mirror-like%20finish%20on%20every%20panel%2C%20spotless%20interior%20visible%20through%20window%2C%20professional%20detailing%20result%20showcase%2C%20premium%20automotive%20photography%20with%20cinematic%20lighting%20and%20dark%20background&width=900&height=560&seq=svc-detail-5&orientation=landscape',
    beforeImage: 'https://readdy.ai/api/search-image?query=neglected%20car%20before%20full%20detailing%2C%20dirty%20exterior%20with%20water%20spots%2C%20dusty%20interior%2C%20dull%20paint%2C%20realistic%20automotive%20photography&width=440&height=300&seq=svc-before-5&orientation=landscape',
    afterImage: 'https://readdy.ai/api/search-image?query=luxury%20car%20after%20complete%20full%20detailing%2C%20showroom%20perfect%20condition%2C%20mirror%20finish%20exterior%2C%20pristine%20interior%2C%20dramatic%20lighting%2C%20premium%20automotive%20photography&width=440&height=300&seq=svc-after-5&orientation=landscape',
    steps: [
      { icon: 'ri-drop-line', label: '外装洗浄', desc: '手洗い＋鉄粉除去' },
      { icon: 'ri-car-line', label: '内装クリーニング', desc: 'バキューム＋スチーム除菌' },
      { icon: 'ri-sparkling-line', label: 'ポリッシュ磨き', desc: '傷・くすみを完全除去' },
      { icon: 'ri-shield-star-line', label: 'コーティング', desc: 'ガラスコーティングで保護' },
    ],
    includes: ['手洗い洗車フル', '内装フルクリーニング', 'ポリッシュ磨き', 'ガラスコーティング', '施工証明書・1年保証'],
    faq: [
      { q: '5時間の施工中、車を預けておく必要がありますか？', a: 'はい、施工中は車をお預けいただきます。ご自宅駐車場での施工の場合、外出していただいても問題ありません。' },
      { q: 'フルディテイリングはどのくらいの頻度で行うべきですか？', a: '年1〜2回が理想的です。定期的なメンテナンス洗車と組み合わせることで、常に最高の状態を保てます。' },
    ],
  },
  {
    id: 'engine',
    badge: null,
    badgeColor: '',
    category: 'Engine Bay',
    title: 'エンジンルーム洗浄',
    shortDesc: 'エンジン周りの油汚れ・ホコリを丁寧に洗浄。点検前にもおすすめです。',
    fullDesc: 'エンジンルームの油汚れ・ホコリ・泥を専用脱脂剤とブラシで丁寧に洗浄。電装系を保護しながら安全に施工します。エンジンルームが清潔だと、オイル漏れなどの異常も早期発見しやすくなります。',
    time: '約1時間',
    price: '¥9,800',
    icon: 'ri-settings-3-line',
    accentColor: '#636e72',
    image: 'https://readdy.ai/api/search-image?query=professional%20technician%20carefully%20cleaning%20a%20car%20engine%20bay%20with%20degreaser%20spray%20and%20detailing%20brushes%2C%20engine%20components%20becoming%20clean%20and%20shiny%2C%20professional%20automotive%20detailing%2C%20clean%20workshop%20background%2C%20detailed%20close-up%20photography%20with%20good%20lighting&width=900&height=560&seq=svc-detail-6&orientation=landscape',
    beforeImage: 'https://readdy.ai/api/search-image?query=dirty%20car%20engine%20bay%20before%20cleaning%2C%20oil%20grime%20buildup%20on%20engine%20components%2C%20dusty%20dirty%20engine%20compartment%2C%20realistic%20automotive%20photography&width=440&height=300&seq=svc-before-6&orientation=landscape',
    afterImage: 'https://readdy.ai/api/search-image?query=clean%20car%20engine%20bay%20after%20professional%20cleaning%2C%20shiny%20engine%20components%2C%20no%20grease%20or%20dirt%2C%20clean%20engine%20compartment%2C%20automotive%20photography&width=440&height=300&seq=svc-after-6&orientation=landscape',
    steps: [
      { icon: 'ri-shield-check-line', label: '電装系保護', desc: '水がかからないよう養生' },
      { icon: 'ri-contrast-drop-line', label: '脱脂剤塗布', desc: '専用脱脂剤を全体に噴霧' },
      { icon: 'ri-brush-line', label: 'ブラシ洗浄', desc: '細部まで丁寧にブラッシング' },
      { icon: 'ri-drop-line', label: 'リンス仕上げ', desc: '低圧水で丁寧に洗い流す' },
    ],
    includes: ['電装系養生・保護', '脱脂剤洗浄', 'ブラシ細部洗浄', '低圧リンス', 'エンジン保護剤塗布'],
    faq: [
      { q: '電装系が壊れる心配はありませんか？', a: '施工前に電装系を丁寧に養生・保護します。プロが安全に施工しますのでご安心ください。' },
      { q: '車検前に施工するのはいいですか？', a: 'はい、車検前の施工はとてもおすすめです。エンジンルームが清潔だと、整備士も点検しやすくなります。' },
    ],
  },
];

type TabType = 'flow' | 'includes' | 'faq';

/* ─── Before/After スライダーコンポーネント ─── */
function BeforeAfterSlider({ before, after, accentColor }: { before: string; after: string; accentColor: string }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  }, [handleMove]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    };
    const handleUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, handleMove]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-2xl cursor-ew-resize select-none"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* After画像（全体） */}
      <img
        src={after}
        alt="after"
        className="absolute inset-0 w-full h-full object-cover object-top"
        draggable={false}
        loading="lazy"
      />
      {/* Before画像（クリップ） */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={before}
          alt="before"
          className="absolute inset-0 w-full h-full object-cover object-top max-w-none"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
          draggable={false}
          loading="lazy"
        />
      </div>

      {/* スライダーバー */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] z-10"
        style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
      />

      {/* ハンドル */}
      <div
        className="absolute top-1/2 -translate-y-1/2 z-20"
        style={{ left: `${sliderPos}%`, transform: `translate(-50%, -50%)` }}
      >
        <div
          className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-white shadow-lg"
          style={{ backgroundColor: accentColor }}
        >
          <div className="flex items-center gap-0.5">
            <i className="ri-arrow-left-s-line text-white text-sm"></i>
            <i className="ri-arrow-right-s-line text-white text-sm"></i>
          </div>
        </div>
      </div>

      {/* ラベル */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full pointer-events-none">
        Before
      </div>
      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-[#0a2540] text-[10px] font-bold px-2.5 py-1 rounded-full pointer-events-none">
        After
      </div>
    </div>
  );
}

/* ─── 施工フロータイムライン ─── */
function FlowTimeline({ steps, accentColor }: { steps: typeof services[0]['steps']; accentColor: string }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {steps.map((step, i) => (
        <div
          key={step.label}
          className="flex-shrink-0 flex flex-col items-center text-center group cursor-default"
          onMouseEnter={() => setHoveredIdx(i)}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {/* ステップ円 */}
          <div
            className="relative w-14 h-14 flex items-center justify-center rounded-full transition-all duration-300 mb-2"
            style={{
              backgroundColor: hoveredIdx === i ? accentColor : `${accentColor}15`,
              transform: hoveredIdx === i ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <i
              className={`${step.icon} text-lg transition-colors duration-300`}
              style={{ color: hoveredIdx === i ? '#fff' : accentColor }}
            ></i>
            <div
              className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full text-white text-[10px] font-black"
              style={{ backgroundColor: accentColor }}
            >
              {i + 1}
            </div>
          </div>
          {/* ラベル */}
          <p
            className="text-[11px] font-bold text-[#0a2540] mb-0.5 transition-colors duration-300"
            style={{ color: hoveredIdx === i ? accentColor : '#0a2540' }}
          >
            {step.label}
          </p>
          <p className="text-[10px] text-[#8ba0ba] max-w-[100px] leading-tight">{step.desc}</p>

          {/* コネクターライン */}
          {i < steps.length - 1 && (
            <div
              className="absolute hidden lg:block"
              style={{
                top: '28px',
                left: `calc(${(i + 0.5) * (100 / steps.length)}%)`,
                right: `calc(${((steps.length - i - 1.5) / steps.length) * 100}%)`,
                height: '2px',
                backgroundColor: `${accentColor}30`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Services() {
  const [selectedId, setSelectedId] = useState<string>('handwash');
  const [activeTab, setActiveTab] = useState<TabType>('flow');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const heading = useScrollAnimation();
  const listAnim = useScrollAnimation();
  const detailAnim = useScrollAnimation();

  const selectedIndex = services.findIndex((s) => s.id === selectedId);
  const selected = services[selectedIndex] ?? services[0];

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    setActiveTab('flow');
    setExpandedFaq(null);
    // ユーザーの明示的な操作時のみスクロール — 初期ロード時は発火しない
    if (detailRef.current) {
      requestAnimationFrame(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
  }, []);

  const nextService = useCallback(() => {
    const nextIndex = (selectedIndex + 1) % services.length;
    handleSelect(services[nextIndex].id);
  }, [selectedIndex, handleSelect]);

  const prevService = useCallback(() => {
    const prevIndex = (selectedIndex - 1 + services.length) % services.length;
    handleSelect(services[prevIndex].id);
  }, [selectedIndex, handleSelect]);

  // Swipe for service tabs
  const { elementRef: tabsRef, touchHandlers: tabsSwipe } = useSwipe({
    onSwipeLeft: nextService,
    onSwipeRight: prevService,
    threshold: 40,
  });

  // 初期ロード時に自動スクロールを絶対に行わない — useEffectでselectedIdを監視していたが削除済み
  // スクロールは handleSelect 内のユーザークリック時のみ発火

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#f7fbff]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* ヘッダー */}
        <div
          ref={heading.ref}
          className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 anim-fade-up ${heading.isVisible ? 'is-visible' : ''}`}
        >
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#0099e6] mb-4 uppercase">Services</p>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0a2540] mb-3 leading-tight">
              6つの出張サービス
            </h2>
            <p className="text-[15px] text-[#5a7090] leading-relaxed max-w-xl">
              手洗い洗車から本格コーティングまで。サービスを選ぶと、施工の流れや詳細が確認できます。
            </p>
          </div>
          <a
            href="#cta"
            className="border border-[#0099e6] text-[#0099e6] hover:bg-[#e6f4ff] font-bold px-5 py-2.5 rounded-full text-[14px] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            予約・見積もりはこちら
          </a>
        </div>

        {/* ── サービス選択タブ（スワイプ対応）── */}
        <div className="relative mb-8">
          {/* Swipe hint mobile */}
          <div className="md:hidden flex items-center justify-center gap-2 mb-2">
            <div className="flex items-center gap-1.5 bg-[#e6f4ff] text-[#0099e6] text-[10px] font-bold px-3 py-1.5 rounded-full">
              <i className="ri-arrow-left-right-line text-xs"></i>
              スワイプでサービス切替
            </div>
          </div>
          <div
            ref={tabsRef}
            {...tabsSwipe}
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide touch-pan-x"
          >
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSelect(s.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap border ${
                  selectedId === s.id
                    ? 'bg-[#0a2540] text-white border-[#0a2540]'
                    : 'bg-white text-[#5a7090] border-[#e4eef7] hover:border-[#0099e6] hover:text-[#0099e6]'
                }`}
              >
                <i className={`${s.icon} text-sm`}></i>
                {s.title}
                {s.badge && (
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                    selectedId === s.id ? 'bg-white/20 text-white' : s.badgeColor
                  }`}>
                    {s.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── メイン詳細パネル ── */}
        <div
          ref={detailRef}
          className={`anim-fade-up ${detailAnim.isVisible ? 'is-visible' : ''} is-visible`}
        >
          <div className="bg-white rounded-3xl overflow-hidden border border-[#e4eef7]">
            <div className="grid lg:grid-cols-2">

              {/* 左：Before/Afterスライダー */}
              <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[500px] p-4 sm:p-5 lg:p-6 bg-[#f0f5fa]">
                <BeforeAfterSlider
                  before={selected.beforeImage}
                  after={selected.afterImage}
                  accentColor={selected.accentColor}
                />

                {/* 施工時間・料金オーバーレイ（左下） */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                  <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                    <i className="ri-time-line text-sm" style={{ color: selected.accentColor }}></i>
                    <span className="text-[11px] font-bold text-[#0a2540]">{selected.time}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                    <i className="ri-price-tag-3-line text-sm" style={{ color: selected.accentColor }}></i>
                    <span className="text-[11px] font-bold text-[#0a2540]">{selected.price}〜</span>
                  </div>
                </div>

                {/* ドラッグヒント */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 opacity-70 pointer-events-none">
                  <i className="ri-drag-move-line text-xs"></i>
                  左右にドラッグして比較
                </div>
              </div>

              {/* 右：詳細コンテンツ */}
              <div className="p-5 sm:p-6 lg:p-8 flex flex-col">
                {/* カテゴリ＋タイトル */}
                <p className="text-[10px] font-bold tracking-[0.2em] text-[#8ba0ba] mb-1 uppercase">{selected.category}</p>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl sm:text-2xl font-black text-[#0a2540]">{selected.title}</h3>
                  {selected.badge && (
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${selected.badgeColor}`}>
                      {selected.badge}
                    </span>
                  )}
                </div>

                <p className="text-[14px] text-[#5a7090] leading-relaxed mb-6">{selected.fullDesc}</p>

                {/* 施工の流れ（横スクロールタイムライン） */}
                <div className="mb-5">
                  <p className="text-[11px] font-bold text-[#0a2540] mb-3 flex items-center gap-2">
                    <i className="ri-route-line text-[#0099e6]"></i>
                    施工の流れ
                  </p>
                  <FlowTimeline steps={selected.steps} accentColor={selected.accentColor} />
                </div>

                {/* タブ切り替え */}
                <div className="flex gap-1 bg-[#f7fbff] rounded-full p-1 mb-5">
                  {([
                    { key: 'includes', label: '含まれる内容', icon: 'ri-checkbox-circle-line' },
                    { key: 'faq', label: 'よくある質問', icon: 'ri-question-line' },
                  ] as { key: TabType; label: string; icon: string }[]).map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                        activeTab === tab.key
                          ? 'bg-white text-[#0a2540] shadow-sm'
                          : 'text-[#8ba0ba] hover:text-[#5a7090]'
                      }`}
                    >
                      <i className={`${tab.icon} text-sm`}></i>
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* タブコンテンツ */}
                <div className="flex-1 min-h-[140px]">
                  {activeTab === 'includes' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selected.includes.map((item, i) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 bg-[#f7fbff] rounded-xl px-3 py-2.5 group hover:bg-white hover:border hover:border-[#e4eef7] transition-all"
                          style={{ animationDelay: `${i * 50}ms` }}
                        >
                          <div
                            className="w-7 h-7 flex items-center justify-center rounded-full shrink-0 transition-transform duration-300 group-hover:scale-110"
                            style={{ backgroundColor: `${selected.accentColor}15` }}
                          >
                            <i className="ri-check-line text-xs" style={{ color: selected.accentColor }}></i>
                          </div>
                          <span className="text-[12px] font-medium text-[#0a2540]">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'faq' && (
                    <div className="space-y-2">
                      {selected.faq.map((item, i) => (
                        <div key={item.q} className="border border-[#e4eef7] rounded-xl overflow-hidden">
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#f7fbff] transition-colors cursor-pointer"
                          >
                            <div
                              className="w-6 h-6 flex items-center justify-center rounded-full text-white text-[10px] font-black shrink-0"
                              style={{ backgroundColor: selected.accentColor }}
                            >Q</div>
                            <p className="text-[12px] font-bold text-[#0a2540] flex-1">{item.q}</p>
                            <i
                              className={`ri-arrow-down-s-line text-sm text-[#8ba0ba] transition-transform duration-300 ${
                                expandedFaq === i ? 'rotate-180' : ''
                              }`}
                            ></i>
                          </button>
                          <div
                            className="overflow-hidden transition-all duration-300"
                            style={{
                              maxHeight: expandedFaq === i ? '200px' : '0px',
                              opacity: expandedFaq === i ? 1 : 0,
                            }}
                          >
                            <div className="px-4 pb-4 pl-[52px]">
                              <p className="text-[12px] text-[#5a7090] leading-relaxed">{item.a}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-5 pt-5 border-t border-[#e4eef7]">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div>
                      <p className="text-[11px] text-[#8ba0ba] mb-0.5">{selected.time}</p>
                      <p className="text-2xl font-black text-[#0a2540]">
                        {selected.price}
                        <span className="text-sm font-medium text-[#5a7090] ml-1">〜（税込）</span>
                      </p>
                    </div>
                    <a
                      href="#cta"
                      className="text-[13px] font-bold text-white px-5 sm:px-6 py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap inline-flex items-center gap-2 hover:opacity-90"
                      style={{ backgroundColor: selected.accentColor }}
                    >
                      このサービスを予約 <i className="ri-arrow-right-line"></i>
                    </a>
                  </div>
                  <p className="text-[10px] text-[#8ba0ba]">
                    ※ 普通車(Mサイズ)の目安価格。車種・状態により変動する場合があります。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── サービス一覧ミニカード（下部）── */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelect(s.id)}
              className={`group rounded-2xl overflow-hidden border transition-all cursor-pointer text-left ${
                selectedId === s.id
                  ? 'bg-[#0a2540] border-[#0a2540]'
                  : 'bg-white border-[#e4eef7] hover:border-[#0099e6]'
              }`}
            >
              {/* サムネイル画像 */}
              <div className="relative h-20 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className={`w-full h-full object-cover object-top transition-transform duration-500 ${
                    selectedId === s.id ? '' : 'group-hover:scale-110'
                  }`}
                />
                <div
                  className={`absolute inset-0 ${
                    selectedId === s.id
                      ? 'bg-gradient-to-t from-[#0a2540] to-transparent'
                      : 'bg-gradient-to-t from-black/40 to-transparent'
                  }`}
                ></div>
                {s.badge && (
                  <span className={`absolute top-2 right-2 text-[8px] font-black px-1.5 py-0.5 rounded-full ${s.badgeColor}`}>
                    {s.badge}
                  </span>
                )}
              </div>
              {/* テキスト */}
              <div className="p-3">
                <p className={`text-[11px] font-bold leading-tight ${selectedId === s.id ? 'text-white' : 'text-[#0a2540]'}`}>
                  {s.title.replace('出張', '')}
                </p>
                <p className={`text-[10px] mt-1 font-medium ${selectedId === s.id ? 'text-white/60' : 'text-[#8ba0ba]'}`}>
                  {s.price}〜
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}