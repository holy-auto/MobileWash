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

          <div className="mb-6 rounded-2xl border-2 border-[#00b4ff] bg-gradient-to-br from-[#e6f4ff] via-white to-[#e6fbf7] p-6 sm:p-7 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#00b4ff]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="flex-1">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] text-white uppercase bg-[#00b4ff] px-2.5 py-1 rounded-full mb-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  数量限定・先着順
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-[#0a2540] mb-1.5">
                  創業先行枠（超早割）
                </h4>
                <p className="text-[12px] sm:text-[13px] text-[#5a7090] leading-relaxed">
                  公開と同時に登場する<strong className="text-[#0099e6]">最先着・最もお得な枠</strong>。
                  上限に達し次第終了します。枠数・特別価格は公開時に発表（先着順）。
                  確実に確保するには、公開通知のご登録がおすすめです。
                </p>
              </div>
              <div className="shrink-0 text-center sm:border-l sm:border-[#cfe4f5] sm:pl-6">
                <p className="text-[10px] font-bold tracking-[0.2em] text-[#0099e6] uppercase mb-1">
                  Limited
                </p>
                <p className="heading-tight text-3xl sm:text-4xl font-bold text-[#0a2540]">
                  先着限定
                </p>
                <p className="text-[11px] text-[#8ba0ba] mt-1">公開時に枠数発表</p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {memberPlans.map((p) => (
              <PlanCard key={p.name} plan={p} />
            ))}
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

          <p className="text-[11px] text-[#8ba0ba] mt-5 leading-relaxed">
            ※「¥1,000相当」「¥17,940相当」等は、当社通常提供価格に基づく参考価値です。比較対象価格の算定根拠および割引・会員特典の適用条件（期間・回数・対象サービス）は CAMPFIRE プロジェクトページに明示します。
            割引・会員資格・優先予約等の特典内容は、サービス正式提供開始後に適用されます。
          </p>
        </div>
      </div>
    </section>
  );
}
