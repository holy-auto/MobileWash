"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "duplicated" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LAUNCH_DATE = "2026.6.1";

type Plan = {
  name: string;
  price: string;
  caption: string;
  benefits: string[];
  accent?: boolean;
};

// 利用者（B2C）向け 支援プラン：価格昇順
const memberPlans: Plan[] = [
  {
    name: "創業サポーター応援プラン",
    price: "¥3,000",
    caption: "まずは応援から",
    benefits: [
      "サポーターバッジ",
      "ポイントボーナス（¥1,000相当）",
      "月次進捗レポートメール",
      "創業サポートコンテンツへのアクセス",
    ],
  },
  {
    name: "シルバー会員権プラン",
    price: "¥8,000",
    caption: "会員資格 + 割引",
    benefits: [
      "即シルバー会員資格へのアクセス",
      "3%割引",
      "優先マッチング権（月1回）",
      "創設サポーターバッジ",
    ],
  },
  {
    name: "ゴールド会員権プラン",
    price: "¥25,000",
    caption: "優先予約 + 専用サポート",
    benefits: [
      "ゴールドランクアクセス",
      "5%割引",
      "繁忙期優先予約",
      "専用サポートライン",
      "特別デザインバッジ",
    ],
  },
  {
    name: "プラチナ創業メンバー権",
    price: "¥50,000",
    caption: "最上位・創業メンバー",
    accent: true,
    benefits: [
      "プラチナステータス資格",
      "8%割引",
      "指名サポート付き",
      "ベータテスター権",
      "年次経営集会への招待",
    ],
  },
];

// プロ（施工者・B2B）向け
const proPlan: Plan = {
  name: "プロ登録優待パック",
  price: "¥30,000",
  caption: "認定プロとして参加する方向け",
  benefits: [
    "3ヶ月ブースト機能付き（¥17,940相当）",
    "プラットフォーム手数料50%OFF（3ヶ月間）",
    "認定アーリープロフェッショナルバッジ",
    "専任サポートスタッフ",
  ],
};

// 数量限定 創業先行枠（超早割）：B＝先行価格を下げる ＋ C＝先行枠限定ワンタイム特典
type PriorityTier = {
  name: string;
  regular: string;
  price: string;
  off: string;
  limit: string;
  bonus: string;
  accent?: boolean;
};

const priorityTiers: PriorityTier[] = [
  {
    name: "創業先行・シルバー",
    regular: "¥8,000",
    price: "¥6,000",
    off: "約25%OFF",
    limit: "先着50名",
    bonus: "創業メンバー限定バッジ＋初回出張洗車¥1,000クーポン",
  },
  {
    name: "創業先行・ゴールド",
    regular: "¥25,000",
    price: "¥18,000",
    off: "約28%OFF",
    limit: "先着30名",
    bonus: "初回出張洗車無料券1回＋対応エリア優先",
    accent: true,
  },
  {
    name: "創業先行・プラチナ",
    regular: "¥50,000",
    price: "¥38,000",
    off: "約24%OFF",
    limit: "先着10名",
    bonus: "創業メンバー刻印／年次集会 創業席",
  },
];

// 個人向け 創業パトロン枠（プラチナ上位・数量限定）
type PatronTier = {
  name: string;
  price: string;
  limit: string;
  benefits: string[];
  accent?: boolean;
};

const patronTiers: PatronTier[] = [
  {
    name: "創業パトロン",
    price: "¥100,000",
    limit: "先着20名",
    benefits: [
      "プラチナ特典をすべて含む",
      "出張洗車 年間利用枠（回数はCAMPFIREに明示）",
      "公式サイトに創業パトロンとして刻名",
    ],
  },
  {
    name: "創業エグゼクティブパトロン",
    price: "¥300,000",
    limit: "先着5名",
    accent: true,
    benefits: [
      "創業パトロン特典をすべて含む",
      "代表との事業説明会／会食ご招待",
      "アプリ内に創業者クレジットを恒久掲載",
      "創業メンバー限定ノベルティ",
    ],
  },
];

// 法人・事業者向け スポンサープラン（役務＋掲載の協賛。投資ではない）
type SponsorTier = {
  name: string;
  price: string;
  scope: string;
  accent?: boolean;
};

const sponsorTiers: SponsorTier[] = [
  {
    name: "ブロンズスポンサー",
    price: "¥100,000",
    scope: "社用車 出張洗車パック＋公式サイト 感謝クレジット掲載",
  },
  {
    name: "シルバースポンサー",
    price: "¥300,000",
    scope: "出張洗車パック拡大＋公式サイト・アプリ内ロゴ掲載＋ローンチPR 協賛クレジット",
  },
  {
    name: "ゴールドスポンサー",
    price: "¥500,000",
    scope: "上記拡大＋指定エリア優先展開＋自社・管理駐車場の出張対応枠",
    accent: true,
  },
  {
    name: "プラチナスポンサー",
    price: "¥1,000,000",
    scope: "フリート年間契約相当＋共同企画・取材協力＋最上位協賛クレジット",
  },
];

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 shrink-0 mt-0.5 text-[#0099e6]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`rounded-2xl p-6 bg-white text-[#0a2540] border ${
        plan.accent
          ? "border-[#00b4ff] ring-2 ring-[#00b4ff]/25 soft-shadow-lg"
          : "border-[#e4eef7] soft-shadow"
      }`}
    >
      <p className="text-[11px] font-bold text-[#0099e6] mb-1">
        {plan.caption}
      </p>
      <h4 className="text-base font-bold text-[#0a2540] mb-2 leading-snug">
        {plan.name}
      </h4>
      <p className="heading-tight text-3xl font-bold text-[#0a2540] mb-4">
        {plan.price}
      </p>
      <ul className="space-y-2">
        {plan.benefits.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2 text-[12px] text-[#5a7090] leading-relaxed"
          >
            <CheckIcon />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Crowdfunding() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) return;
    if (!EMAIL_RE.test(value)) {
      setStatus("error");
      setErrorMessage("有効なメールアドレスを入力してください。");
      return;
    }

    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data = (await res.json().catch(() => null)) as
        | { message?: string; error?: string; duplicated?: boolean }
        | null;

      if (res.ok) {
        setStatus(data?.duplicated ? "duplicated" : "success");
        setEmail("");
        return;
      }

      setStatus("error");
      setErrorMessage(
        data?.error ??
          (res.status === 429
            ? "リクエストが多すぎます。しばらくしてから再度お試しください。"
            : "登録に失敗しました。時間をおいて再度お試しください。"),
      );
    } catch {
      setStatus("error");
      setErrorMessage("ネットワークエラーが発生しました。");
    }
  };

  return (
    <section
      id="crowdfunding"
      aria-labelledby="cf-heading"
      className="py-20 sm:py-28 bg-white scroll-mt-[120px]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="rounded-3xl bg-gradient-to-br from-[#0a2540] via-[#0e2d52] to-[#143a6b] p-8 sm:p-12 lg:p-14 relative overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#00b4ff] rounded-full opacity-15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-[#00d4b8] rounded-full opacity-10 blur-3xl pointer-events-none" />

          <div className="relative grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6 text-white">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] text-[#00b4ff] uppercase mb-4 bg-[#00b4ff]/10 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-[#00b4ff] rounded-full animate-pulse" />
                Crowdfunding / 応援購入
              </p>
              <h2
                id="cf-heading"
                className="heading-tight text-3xl sm:text-4xl lg:text-[44px] font-bold mb-5 text-white"
              >
                出張洗車を全国へ。
                <br />
                <span className="text-[#00b4ff]">CAMPFIRE</span> に挑戦します。
              </h2>
              <p className="text-[15px] text-white/80 mb-8 leading-relaxed max-w-xl">
                認定プロのネットワークを全国に広げ、もっと多くの駐車場へ「出張洗車」を届けるための応援購入プロジェクトを、
                クラウドファンディング「CAMPFIRE」にて実施します。
                創業を応援いただく方限定の
                <strong className="text-[#00b4ff]">特典付きリターン</strong>
                をご用意します。
              </p>

              <div className="bg-white/8 border border-white/15 backdrop-blur rounded-2xl p-6 lg:p-7">
                <div className="flex items-baseline justify-between mb-2">
                  <p className="text-[10px] font-bold tracking-[0.25em] text-[#00b4ff] uppercase">
                    Project Launch
                  </p>
                  <span className="text-[10px] text-white/50">CAMPFIRE 予定</span>
                </div>
                <p className="heading-tight text-4xl lg:text-5xl font-bold text-white">
                  {LAUNCH_DATE}
                  <span className="text-base text-white/60 ml-3">公開スタート</span>
                </p>
                <p className="text-[11px] text-white/60 mt-3">
                  ※ 創業メンバー特典はプロジェクト公開時のリターンです。公開通知を受け取って開始時にご参加ください。
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl p-6 lg:p-8 text-[#0a2540] soft-shadow-lg">
                <p className="text-[10px] font-bold tracking-[0.25em] text-[#0099e6] uppercase mb-1">
                  Get Notified
                </p>
                <h3 className="text-xl lg:text-2xl font-bold text-[#0a2540] mb-2">
                  公開通知を受け取る
                </h3>
                <p className="text-[12px] text-[#5a7090] leading-relaxed mb-5">
                  ご登録いただいた方へ、CAMPFIRE プロジェクトの公開を最速でお知らせします。
                  創業メンバー特典は開始と同時のご参加がおすすめです。
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 mb-3"
                  aria-label="クラウドファンディング公開通知 登録フォーム"
                >
                  <input
                    type="email"
                    placeholder="メールアドレスを入力"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="メールアドレス"
                    className="flex-1 px-5 py-3.5 rounded-full text-[#0a2540] placeholder-[#8ba0ba] bg-white border border-[#e4eef7] focus:outline-none focus:ring-2 focus:ring-[#0099e6]/30 focus:border-[#0099e6] text-[14px]"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary text-[14px] px-7"
                  >
                    {status === "loading" ? "送信中..." : "通知を受け取る"}
                  </button>
                </form>

                <p role="status" aria-live="polite" className="min-h-[1.25rem]">
                  {status === "success" && (
                    <span className="text-[#0a8f7c] text-[13px] font-medium">
                      ✓ ご登録ありがとうございます。公開時にメールでお知らせします。
                    </span>
                  )}
                  {status === "duplicated" && (
                    <span className="text-[#0a8f7c] text-[13px] font-medium">
                      ✓ 既にご登録済みです。公開までお待ちください。
                    </span>
                  )}
                  {status === "error" && (
                    <span className="text-[#c41e60] text-[13px] font-medium">
                      {errorMessage}
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-[#5a7090] mt-2">
                  送信により
                  <a
                    href="/privacy"
                    className="underline font-medium hover:text-[#0099e6]"
                  >
                    プライバシーポリシー
                  </a>
                  に同意したものとみなします。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16">
          <div className="text-center mb-8">
            <p className="section-label mb-3 inline-flex">Return / リターン予定</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0a2540]">
              プロジェクトのリターン
            </h3>
            <p className="text-[13px] text-[#5a7090] mt-2 max-w-2xl mx-auto leading-relaxed">
              下記は予定内容です。最終的なリターン内容・価格・数量・提供時期・適用条件は、CAMPFIRE プロジェクトページの掲載をもって確定とします。
            </p>
          </div>

          <div className="mb-6 rounded-2xl border-2 border-[#00b4ff] bg-gradient-to-br from-[#e6f4ff] via-white to-[#e6fbf7] p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#00b4ff]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-5">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] text-white uppercase bg-[#00b4ff] px-2.5 py-1 rounded-full mb-2">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    数量限定・先着順
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold text-[#0a2540]">
                    創業先行枠（超早割）
                  </h4>
                </div>
                <p className="text-[12px] text-[#5a7090] leading-relaxed sm:text-right max-w-md">
                  公開と同時に登場する<strong className="text-[#0099e6]">最もお得な枠</strong>。
                  上限到達で終了します。確保には公開通知のご登録がおすすめです。
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {priorityTiers.map((t) => (
                  <div
                    key={t.name}
                    className={`rounded-2xl bg-white p-5 border ${
                      t.accent
                        ? "border-[#00b4ff] ring-2 ring-[#00b4ff]/25 soft-shadow-lg"
                        : "border-[#cfe4f5] soft-shadow"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm font-bold text-[#0a2540]">
                        {t.name}
                      </h5>
                      <span className="text-[10px] font-bold text-white bg-[#c41e60] px-2 py-0.5 rounded-full">
                        {t.off}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8ba0ba] mb-0.5">
                      当社通常提供価格{" "}
                      <span className="line-through">{t.regular}</span> のところ
                    </p>
                    <p className="heading-tight text-3xl font-bold text-[#0a2540]">
                      {t.price}
                      <span className="text-[11px] font-bold text-[#0099e6] ml-2 align-middle">
                        {t.limit}
                      </span>
                    </p>
                    <p className="text-[11px] text-[#5a7090] leading-relaxed mt-2 pt-2 border-t border-[#eef4fa]">
                      ＋特典：{t.bonus}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-[#8ba0ba] mt-4">
                ※ 先着順・各枠の上限到達で終了。継続割引（3/5/8%）は通常会員プランと同率（先行枠で変動しません）。比較対象価格・適用条件は CAMPFIRE プロジェクトページに明示します。
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {memberPlans.map((p) => (
              <PlanCard key={p.name} plan={p} />
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#0a2540] via-[#0e2d52] to-[#143a6b] p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#00b4ff]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <p className="text-[10px] font-bold tracking-[0.25em] text-[#00b4ff] uppercase mb-1">
                Founding Patron / 創業パトロン枠
              </p>
              <h4 className="text-lg sm:text-xl font-bold text-white mb-1">
                プラチナ上位・数量限定の特別枠
              </h4>
              <p className="text-[12px] text-white/60 mb-5">
                立ち上げを強く後押しいただく方への、刻名・体験を伴う限定枠です。
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {patronTiers.map((t) => (
                  <div
                    key={t.name}
                    className={`rounded-2xl p-5 border backdrop-blur ${
                      t.accent
                        ? "bg-[#00b4ff]/15 border-[#00b4ff]/50"
                        : "bg-white/8 border-white/15"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h5 className="text-sm font-bold text-white">{t.name}</h5>
                      <span className="text-[10px] font-bold text-[#0a2540] bg-[#00b4ff] px-2 py-0.5 rounded-full">
                        {t.limit}
                      </span>
                    </div>
                    <p className="heading-tight text-3xl font-bold text-white mb-3">
                      {t.price}
                    </p>
                    <ul className="space-y-1.5">
                      {t.benefits.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-[11px] text-white/70 leading-relaxed"
                        >
                          <svg
                            className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#00b4ff]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[#e4eef7] bg-[#f7fbff] p-6 sm:p-7">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="sm:w-1/3">
                <p className="text-[11px] font-bold text-[#0099e6] mb-1">
                  For Professionals / プロ向け
                </p>
                <h4 className="text-base font-bold text-[#0a2540] mb-1 leading-snug">
                  {proPlan.name}
                </h4>
                <p className="heading-tight text-3xl font-bold text-[#0a2540]">
                  {proPlan.price}
                </p>
                <p className="text-[11px] text-[#5a7090] mt-1">
                  {proPlan.caption}
                </p>
              </div>
              <ul className="sm:w-2/3 grid sm:grid-cols-2 gap-x-6 gap-y-2">
                {proPlan.benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-[12px] text-[#5a7090] leading-relaxed"
                  >
                    <CheckIcon />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
              <div>
                <p className="text-[11px] font-bold text-[#0099e6] mb-1">
                  For Business / 法人・事業者向け スポンサープラン
                </p>
                <h4 className="text-base sm:text-lg font-bold text-[#0a2540]">
                  社用車・駐車場をお持ちの企業さまへ
                </h4>
              </div>
              <p className="text-[11px] text-[#8ba0ba] sm:text-right max-w-md leading-relaxed">
                協賛（出張洗車の役務＋掲載）の対価です。出資・配当等の投資ではありません。
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {sponsorTiers.map((s) => (
                <div
                  key={s.name}
                  className={`rounded-2xl p-5 bg-white border ${
                    s.accent
                      ? "border-[#00b4ff] ring-2 ring-[#00b4ff]/25 soft-shadow-lg"
                      : "border-[#e4eef7] soft-shadow"
                  }`}
                >
                  <h5 className="text-sm font-bold text-[#0a2540] mb-1">
                    {s.name}
                  </h5>
                  <p className="heading-tight text-2xl font-bold text-[#0a2540] mb-2">
                    {s.price}
                  </p>
                  <p className="text-[11px] text-[#5a7090] leading-relaxed pt-2 border-t border-[#eef4fa]">
                    {s.scope}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-[#8ba0ba] mt-5 leading-relaxed">
            ※ 本プロジェクトは購入型クラウドファンディングです。スポンサー・パトロン特典は役務・掲載等の対価であり、出資・配当・利益分配等の投資ではありません。
            ※「¥1,000相当」「¥17,940相当」等は、当社通常提供価格に基づく参考価値です。比較対象価格の算定根拠および割引・会員特典の適用条件（期間・回数・対象サービス）は CAMPFIRE プロジェクトページに明示します。
            割引・会員資格・優先予約・スポンサー役務（台数・回数・掲載期間）等の特典内容は、サービス正式提供開始後に適用・提供されます。
          </p>
        </div>
      </div>
    </section>
  );
}
