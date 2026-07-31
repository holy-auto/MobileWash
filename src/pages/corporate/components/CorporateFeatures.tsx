import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const features = [
  {
    icon: 'ri-file-list-3-line',
    title: '請求書払い・月次精算',
    desc: '毎月の施工費用をまとめて請求書払い。経費処理がシンプルになり、経理担当者の手間を大幅削減。振込・口座振替に対応。',
    color: 'bg-[#e6f4ff] text-[#0099e6]',
  },
  {
    icon: 'ri-car-line',
    title: '複数台・フリート一括管理',
    desc: '社用車・営業車・社有車を台数問わず一括登録。車両ごとの施工履歴・費用レポートをダッシュボードで一元管理。',
    color: 'bg-[#e6fbf7] text-[#0a8f7c]',
  },
  {
    icon: 'ri-user-star-line',
    title: '専属プロ担当者の固定',
    desc: '担当プロを固定することで、車両の状態を熟知したプロが毎回施工。仕上がりの品質が安定し、信頼関係も構築できます。',
    color: 'bg-[#fff4e6] text-[#b36b00]',
  },
  {
    icon: 'ri-percent-line',
    title: '台数に応じた割引',
    desc: '契約台数が増えるほど単価が下がる段階割引制度。5台以上で10% OFF、10台以上で20% OFF、20台以上で最大30% OFF。',
    color: 'bg-[#e6f4ff] text-[#0099e6]',
  },
  {
    icon: 'ri-calendar-schedule-line',
    title: '定期スケジュール自動設定',
    desc: '「毎週月曜の朝」など定期スケジュールを設定すれば、予約不要で自動的にプロが出張。車両管理の手間をゼロに。',
    color: 'bg-[#e6fbf7] text-[#0a8f7c]',
  },
  {
    icon: 'ri-bar-chart-2-line',
    title: '施工レポート・費用分析',
    desc: '月次・年次の施工レポートを自動生成。車両ごとのコスト分析・施工頻度・状態記録を可視化し、予算管理に活用できます。',
    color: 'bg-[#fff4e6] text-[#b36b00]',
  },
];

export default function CorporateFeatures() {
  const heading = useScrollAnimation();
  const list = useScrollAnimation<HTMLUListElement>();

  return (
    <section id="features" className="py-20 sm:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div
          ref={heading.ref}
          className={`text-center max-w-2xl mx-auto mb-14 anim-fade-up ${heading.isVisible ? 'is-visible' : ''}`}
        >
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#0099e6] mb-4">Features</p>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#0a2540] mb-4">法人向け専用機能</h2>
          <p className="text-[15px] text-[#5a7090] leading-relaxed">
            個人プランにはない、企業の車両管理に特化した6つの機能。<br className="hidden sm:inline" />
            導入後すぐに、コスト削減と業務効率化を実感できます。
          </p>
        </div>

        <ul
          ref={list.ref}
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children anim-fade-up ${list.isVisible ? 'is-visible' : ''}`}
        >
          {features.map((f) => (
            <li key={f.title} className="bg-white border border-[#e4eef7] rounded-2xl p-7 hover:border-[#cfdfee] transition-colors">
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${f.color} mb-5`}>
                <i className={`${f.icon} text-xl`}></i>
              </div>
              <h3 className="text-base lg:text-lg font-bold text-[#0a2540] mb-2 leading-snug">{f.title}</h3>
              <p className="text-[13px] text-[#5a7090] leading-relaxed">{f.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
