"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "duplicated" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LAUNCH_DATE = "2026.6.1";

const tiers = [
  {
    badge: "数量限定",
    name: "超早割",
    desc: "公開直後の最先行価格。最もお得な数量限定枠。スタートダッシュで枠が埋まり次第終了します。",
    accent: true,
  },
  {
    badge: "期間限定",
    name: "早割",
    desc: "超早割の完売後に登場する先行価格枠。公開後の早い段階での応援者向け。",
    accent: false,
  },
  {
    badge: "一般",
    name: "通常リターン",
    desc: "出張洗車チケット・年間パス・先行エリア優先予約権など。詳細は公開時に発表します。",
    accent: false,
  },
];

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
                公開と同時に、数量限定の<strong className="text-[#00b4ff]">超早割リターン</strong>をご用意します。
              </p>

              <div className="bg-white/8 border border-white/15 backdrop-blur rounded-2xl p-6 lg:p-7 mb-6">
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
                  ※ 数量限定の超早割は公開直後に上限へ達する可能性があります。公開通知を受け取って開始時にご参加ください。
                </p>
              </div>

              <ul className="grid sm:grid-cols-3 gap-3">
                {tiers.map((t) => (
                  <li
                    key={t.name}
                    className={`rounded-2xl p-4 border backdrop-blur ${
                      t.accent
                        ? "bg-[#00b4ff]/15 border-[#00b4ff]/40"
                        : "bg-white/8 border-white/15"
                    }`}
                  >
                    <span
                      className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 ${
                        t.accent
                          ? "bg-[#00b4ff] text-[#0a2540]"
                          : "bg-white/15 text-white/80"
                      }`}
                    >
                      {t.badge}
                    </span>
                    <h3 className="text-sm font-bold text-white mb-1">
                      {t.name}
                    </h3>
                    <p className="text-[11px] text-white/65 leading-relaxed">
                      {t.desc}
                    </p>
                  </li>
                ))}
              </ul>
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
                  超早割の枠は限られているため、開始と同時のご参加をおすすめします。
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
                  に同意したものとみなします。リターン内容・価格は確定次第、本ページおよび CAMPFIRE プロジェクトページにて公開します。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
