import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const cases = [
  {
    tag: '共働きファミリー',
    title: '「週末は家族の時間。\n洗車に行く余裕はありません。」',
    desc: 'ご自宅の駐車場まで認定プロが出張するため、お子様のお昼寝中や在宅勤務の合間でも愛車をプロの仕上がりに。土日は家族との時間に集中できます。',
    recommend: 'おすすめ:定額ライトプラン',
    image: 'https://readdy.ai/api/search-image?query=A%20happy%20Japanese%20family%20with%20two%20children%20standing%20next%20to%20a%20clean%20shiny%20white%20SUV%20in%20a%20residential%20parking%20lot%20on%20a%20sunny%20weekend%20morning%2C%20soft%20natural%20light%2C%20clean%20suburban%20background%2C%20warm%20lifestyle%20photography%20style&width=600&height=380&seq=uc1&orientation=landscape',
  },
  {
    tag: 'マンション在住オーナー',
    title: '「敷地で水が使えない、\n駐車場が狭くて諦めていた。」',
    desc: 'プロは給水タンク・電源・撥水排水マットを持参するため、水道や電源がないマンション駐車場でも施工が可能です。管理規約のご確認だけお願いしています。',
    recommend: 'おすすめ:出張手洗い洗車',
    image: 'https://readdy.ai/api/search-image?query=A%20professional%20car%20wash%20technician%20in%20uniform%20carefully%20hand%20washing%20a%20black%20sedan%20in%20a%20modern%20apartment%20underground%20parking%20garage%2C%20portable%20water%20tank%20visible%2C%20clean%20concrete%20floor%2C%20professional%20equipment%2C%20soft%20indoor%20lighting&width=600&height=380&seq=uc2&orientation=landscape',
  },
  {
    tag: '輸入車・愛車家',
    title: '「ディーラー20万円のコーティング、\n気軽に頼めない。」',
    desc: '認定プロによるガラスコーティングを、ディーラーよりも手の届きやすい価格で。仕上がり保証・再施工対応・保険補償付きで、大切な愛車も安心です。',
    recommend: 'おすすめ:出張ガラスコーティング',
    image: 'https://readdy.ai/api/search-image?query=A%20professional%20detailer%20applying%20glass%20coating%20to%20a%20luxury%20silver%20sports%20car%20outdoors%2C%20the%20car%20surface%20gleaming%20with%20deep%20reflections%2C%20professional%20tools%20and%20products%20nearby%2C%20clean%20minimalist%20background%2C%20high-end%20automotive%20photography&width=600&height=380&seq=uc3&orientation=landscape',
  },
];

export default function UseCases() {
  const heading = useScrollAnimation();
  const list = useScrollAnimation<HTMLUListElement>();
  return (
    <section id="stories" className="py-20 sm:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div
          ref={heading.ref}
          className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 anim-fade-up ${heading.isVisible ? 'is-visible' : ''}`}
        >
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#0099e6] mb-4">Use Cases</p>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#0a2540] mb-3">こんな方に選ばれます</h2>
            <p className="text-[15px] text-[#5a7090] leading-relaxed max-w-xl">
              MobileWash は現在ローンチ準備中のサービスです。<br className="hidden sm:inline" />
              実際にご利用いただいた方の声は、サービス開始後に随時公開していきます。
            </p>
          </div>
        </div>

        <ul
          ref={list.ref}
          className={`grid lg:grid-cols-3 gap-6 stagger-children anim-fade-up ${list.isVisible ? 'is-visible' : ''}`}
        >
          {cases.map((c) => (
            <li key={c.tag} className="bg-white border border-[#e4eef7] rounded-2xl overflow-hidden flex flex-col hover:border-[#cfdfee] transition-all group">
              {/* Image */}
              <div className="w-full h-[200px] overflow-hidden relative">
                <img
                  src={c.image}
                  alt={c.tag}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/40 to-transparent"></div>
                <span className="absolute bottom-4 left-4 text-[10px] font-bold text-white tracking-widest bg-[#0099e6] px-2.5 py-1 rounded-full">
                  {c.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-base lg:text-lg font-bold text-[#0a2540] mb-3 leading-snug whitespace-pre-line">{c.title}</h3>
                <p className="text-[13px] text-[#5a7090] leading-relaxed mb-5 flex-1">{c.desc}</p>
                <div className="pt-4 border-t border-[#e4eef7] flex items-center justify-between">
                  <span className="inline-block bg-[#f0f9ff] text-[#0099e6] text-[11px] font-bold px-2.5 py-1 rounded-full">
                    {c.recommend}
                  </span>
                  <a
                    href="#cta"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f0f9ff] hover:bg-[#0099e6] transition-colors group/btn cursor-pointer"
                  >
                    <i className="ri-arrow-right-line text-[#0099e6] group-hover/btn:text-white text-sm transition-colors"></i>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 bg-[#f7fbff] border border-[#e4eef7] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-[#0a2540] mb-1">お客様の声を募集予定</p>
            <p className="text-[12px] text-[#5a7090]">
              正式ローンチ後、ご利用いただいたお客様の体験談を順次掲載予定です。先行登録いただくと、第一陣のお客様としてご招待します。
            </p>
          </div>
          <a href="#cta" className="border border-[#0099e6] text-[#0099e6] hover:bg-[#e6f4ff] font-bold px-5 py-2.5 rounded-full text-[13px] transition-colors cursor-pointer whitespace-nowrap shrink-0">
            先行登録する
          </a>
        </div>
      </div>
    </section>
  );
}
