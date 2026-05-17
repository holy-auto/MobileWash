"use client";

import { useEffect, useState } from "react";
import { CROWDFUNDING } from "@/data/site";

type Status = "idle" | "loading" | "success" | "duplicated" | "error";
type Remaining = { days: number; hours: number; minutes: number; seconds: number };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TARGET = new Date(CROWDFUNDING.startsAt).getTime();

function getRemaining(): Remaining | null {
  const diff = TARGET - Date.now();
  if (diff <= 0) return null;
  const sec = Math.floor(diff / 1000);
  return {
    days: Math.floor(sec / 86400),
    hours: Math.floor((sec % 86400) / 3600),
    minutes: Math.floor((sec % 3600) / 60),
    seconds: sec % 60,
  };
}

export default function Crowdfunding() {
  // undefined = マウント前（サーバー描画と一致させハイドレーション差異を防ぐ）
  const [remaining, setRemaining] = useState<Remaining | null | undefined>(
    undefined,
  );
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const tick = () => setRemaining(getRemaining());
    // 初回はマウント後の次マクロタスクで反映（同期 setState を避けつつ即時表示）
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

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

  const started = remaining === null;
  const units: { label: string; value?: number }[] = [
    { label: "日", value: remaining?.days },
    { label: "時間", value: remaining?.hours },
    { label: "分", value: remaining?.minutes },
    { label: "秒", value: remaining?.seconds },
  ];

  return (
    <section
      id="crowdfunding"
      aria-labelledby="crowdfunding-heading"
      className="py-20 sm:py-28 bg-white"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="rounded-3xl bg-gradient-to-br from-[#0a2540] to-[#1a3658] p-8 sm:p-12 lg:p-16 relative overflow-hidden text-white">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#00b4ff]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#00d4b8]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 bg-white/10 text-white font-bold text-[12px] px-3 py-1.5 rounded-full tracking-wide mb-5">
                <span className="w-1.5 h-1.5 bg-[#00d4b8] rounded-full animate-pulse" />
                {CROWDFUNDING.platform} クラウドファンディング
              </span>
              <h2
                id="crowdfunding-heading"
                className="heading-tight text-3xl sm:text-4xl lg:text-[44px] font-bold mb-5"
              >
                {started ? (
                  <>
                    クラウドファンディング
                    <br className="hidden sm:block" />
                    開始しました。
                  </>
                ) : (
                  <>
                    <span className="text-[#00d4b8]">
                      {CROWDFUNDING.startLabel}
                    </span>
                    、
                    <br className="hidden sm:block" />
                    クラウドファンディング開始。
                  </>
                )}
              </h2>
              <p className="text-[14px] sm:text-[15px] text-white/70 leading-relaxed mb-8 max-w-xl">
                {CROWDFUNDING.summary}
              </p>

              {started ? (
                <a
                  href={CROWDFUNDING.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-[15px] px-7"
                >
                  {CROWDFUNDING.platform} でプロジェクトを見る
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              ) : (
                <>
                  <div
                    className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md mb-8"
                    role="timer"
                    aria-label={`${CROWDFUNDING.startLabel} のクラウドファンディング開始までの残り時間`}
                  >
                    {units.map((u) => (
                      <div
                        key={u.label}
                        className="bg-white/10 border border-white/15 rounded-2xl py-4 text-center"
                      >
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold tabular-nums leading-none">
                          {remaining === undefined || u.value === undefined
                            ? "--"
                            : String(u.value).padStart(2, "0")}
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-white/55 font-bold mt-2">
                          {u.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3 max-w-lg mb-3"
                    aria-label="クラウドファンディング開始通知の登録フォーム"
                  >
                    <input
                      type="email"
                      placeholder="メールアドレスを入力"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-label="メールアドレス"
                      className="flex-1 px-5 py-3.5 rounded-full text-[#0a2540] placeholder-[#8ba0ba] bg-white border border-transparent focus:outline-none focus:ring-2 focus:ring-[#00b4ff]/40 text-[14px]"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-primary text-[14px] px-7"
                    >
                      {status === "loading" ? "送信中..." : "開始を通知してもらう"}
                    </button>
                  </form>

                  <p
                    role="status"
                    aria-live="polite"
                    className="min-h-[1.25rem]"
                  >
                    {status === "success" && (
                      <span className="text-[#7df0d8] text-[13px] font-medium">
                        ✓ 登録ありがとうございます。開始時にメールでお知らせします。
                      </span>
                    )}
                    {status === "duplicated" && (
                      <span className="text-[#7df0d8] text-[13px] font-medium">
                        ✓ 既にご登録済みです。開始までお待ちください。
                      </span>
                    )}
                    {status === "error" && (
                      <span className="text-[#ff9bbf] text-[13px] font-medium">
                        {errorMessage}
                      </span>
                    )}
                  </p>
                  <p className="text-[11px] text-white/45 mt-2">
                    送信により
                    <a
                      href="/privacy"
                      className="underline font-medium hover:text-white"
                    >
                      プライバシーポリシー
                    </a>
                    に同意したものとみなします。先行登録済みの方には開始時に改めてご案内します。
                  </p>
                </>
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white/[0.06] border border-white/12 rounded-2xl p-6 sm:p-7 backdrop-blur">
                <p className="text-[11px] font-bold tracking-widest text-white/50 mb-4">
                  支援リターン（例）
                </p>
                <ul className="space-y-3 mb-6">
                  {CROWDFUNDING.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-start gap-3 text-[14px] text-white/85"
                    >
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-[#00d4b8]/20 flex items-center justify-center shrink-0">
                        <svg
                          className="w-3 h-3 text-[#00d4b8]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href={CROWDFUNDING.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] font-bold text-white/80 hover:text-white transition-colors"
                >
                  {CROWDFUNDING.platform} で事前にフォローする
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
                <p className="text-[11px] text-white/40 mt-3 leading-relaxed">
                  リターン内容・目標金額は開始時に {CROWDFUNDING.platform}
                  のプロジェクトページで公開します。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
