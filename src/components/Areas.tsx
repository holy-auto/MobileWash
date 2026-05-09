type RegionStatus = "active" | "soon";

const regions: {
  name: string;
  nameEn: string;
  status: RegionStatus;
  prefectures: string[];
}[] = [
  {
    name: "首都圏",
    nameEn: "Tokyo Metro",
    status: "active",
    prefectures: ["東京都", "神奈川県", "埼玉県", "千葉県"],
  },
  {
    name: "関西圏",
    nameEn: "Kansai",
    status: "active",
    prefectures: ["大阪府", "京都府", "兵庫県", "奈良県"],
  },
  {
    name: "中部・東海",
    nameEn: "Chubu",
    status: "active",
    prefectures: ["愛知県", "静岡県", "岐阜県", "三重県"],
  },
  {
    name: "九州",
    nameEn: "Kyushu",
    status: "soon",
    prefectures: ["福岡県", "熊本県", "鹿児島県"],
  },
  {
    name: "東北・北海道",
    nameEn: "Tohoku & Hokkaido",
    status: "soon",
    prefectures: ["北海道", "宮城県", "福島県"],
  },
  {
    name: "中国・四国",
    nameEn: "Chugoku & Shikoku",
    status: "soon",
    prefectures: ["広島県", "岡山県", "香川県"],
  },
];

const ACTIVE_FILL = "#0099e6";
const SOON_FILL = "#cfdfee";
const STROKE = "#ffffff";

const japanRegions: {
  id: string;
  name: string;
  status: RegionStatus;
  d: string;
}[] = [
  {
    id: "hokkaido",
    name: "北海道",
    status: "soon",
    d: "M286 48 L312 44 L338 50 L356 64 L364 86 L362 112 L350 132 L324 144 L294 142 L270 130 L258 108 L258 84 L268 62 Z",
  },
  {
    id: "tohoku",
    name: "東北",
    status: "soon",
    d: "M276 162 L296 166 L308 184 L314 214 L312 246 L302 268 L284 274 L270 268 L260 248 L256 218 L260 188 L268 170 Z",
  },
  {
    id: "kanto",
    name: "関東",
    status: "active",
    d: "M268 274 L296 278 L318 290 L324 308 L314 322 L296 330 L270 332 L250 322 L242 306 L246 290 L256 280 Z",
  },
  {
    id: "chubu",
    name: "中部",
    status: "active",
    d: "M188 280 L236 282 L248 296 L252 314 L242 326 L222 332 L204 330 L184 322 L172 306 L172 292 Z",
  },
  {
    id: "kansai",
    name: "関西",
    status: "active",
    d: "M150 298 L180 296 L196 304 L202 318 L192 330 L172 334 L152 330 L140 318 L140 308 Z",
  },
  {
    id: "chugoku",
    name: "中国",
    status: "soon",
    d: "M70 304 L142 308 L148 318 L140 328 L86 332 L62 326 L56 316 L60 308 Z",
  },
  {
    id: "shikoku",
    name: "四国",
    status: "soon",
    d: "M112 350 L162 350 L176 360 L168 372 L130 374 L108 366 L102 358 Z",
  },
  {
    id: "kyushu",
    name: "九州",
    status: "soon",
    d: "M36 320 L78 322 L94 342 L98 368 L86 388 L66 394 L42 386 L24 366 L20 344 L26 328 Z",
  },
  {
    id: "okinawa",
    name: "沖縄",
    status: "soon",
    d: "M8 434 L32 434 L40 444 L24 450 L4 446 Z",
  },
];

const cityMarkers: {
  name: string;
  cx: number;
  cy: number;
  status: RegionStatus;
  primary?: boolean;
}[] = [
  { name: "東京", cx: 282, cy: 308, status: "active", primary: true },
  { name: "名古屋", cx: 218, cy: 308, status: "active" },
  { name: "大阪", cx: 172, cy: 318, status: "active" },
  { name: "札幌", cx: 308, cy: 92, status: "soon" },
  { name: "仙台", cx: 290, cy: 220, status: "soon" },
  { name: "福岡", cx: 56, cy: 340, status: "soon" },
];

export default function Areas() {
  return (
    <section
      id="areas"
      aria-labelledby="areas-heading"
      className="py-20 sm:py-28 bg-[#f7fbff]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="section-label mb-4 inline-flex">Service Area</p>
          <h2
            id="areas-heading"
            className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#0a2540] mb-4"
          >
            対応エリア
          </h2>
          <p className="text-[15px] text-[#5a7090] leading-relaxed">
            現在、首都圏・関西圏・東海エリアでサービス提供中。
            2026年中には全国47都道府県への展開を予定しています。
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5">
            <div className="soft-card bg-white p-8">
              <p className="section-label mb-4 inline-flex">Coverage Map</p>
              <div className="aspect-square max-w-[320px] mx-auto relative">
                <svg
                  viewBox="0 0 400 480"
                  className="w-full h-full"
                  role="img"
                  aria-label="日本地図 - 出張洗車サービス対応エリア"
                >
                  <g strokeLinejoin="round" strokeLinecap="round">
                    {japanRegions.map((r) => (
                      <path
                        key={r.id}
                        d={r.d}
                        fill={r.status === "active" ? ACTIVE_FILL : SOON_FILL}
                        fillOpacity={r.status === "active" ? 0.9 : 1}
                        stroke={STROKE}
                        strokeWidth={1.5}
                      >
                        <title>{r.name}</title>
                      </path>
                    ))}
                  </g>

                  <g>
                    {cityMarkers.map((c) => (
                      <g key={c.name}>
                        {c.primary && (
                          <circle
                            cx={c.cx}
                            cy={c.cy}
                            r={8}
                            fill={ACTIVE_FILL}
                            opacity={0.35}
                          >
                            <animate
                              attributeName="r"
                              from="8"
                              to="22"
                              dur="2s"
                              repeatCount="indefinite"
                            />
                            <animate
                              attributeName="opacity"
                              from="0.6"
                              to="0"
                              dur="2s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        )}
                        <circle
                          cx={c.cx}
                          cy={c.cy}
                          r={c.primary ? 6 : 4.5}
                          fill={c.status === "active" ? ACTIVE_FILL : "#ffffff"}
                          stroke={c.status === "active" ? "#ffffff" : ACTIVE_FILL}
                          strokeWidth={c.status === "active" ? 2 : 1.5}
                          opacity={c.status === "active" ? 1 : 0.85}
                        >
                          <title>{c.name}</title>
                        </circle>
                      </g>
                    ))}
                  </g>
                </svg>
              </div>
              <div className="flex items-center justify-center gap-5 mt-4 text-[12px]">
                <span className="flex items-center gap-1.5 text-[#5a7090]">
                  <span className="w-2.5 h-2.5 bg-[#0099e6] rounded-full" />
                  対応中
                </span>
                <span className="flex items-center gap-1.5 text-[#8ba0ba]">
                  <span className="w-2.5 h-2.5 bg-[#0099e6]/30 rounded-full" />
                  準備中
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid sm:grid-cols-2 gap-3">
              {regions.map((r) => (
                <li
                  key={r.name}
                  className={`rounded-2xl p-5 border ${
                    r.status === "active"
                      ? "bg-white border-[#0099e6]/30 soft-shadow"
                      : "bg-white border-[#e4eef7]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-[#8ba0ba] mb-1">
                        {r.nameEn}
                      </p>
                      <h3 className="text-base font-bold text-[#0a2540]">{r.name}</h3>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                        r.status === "active"
                          ? "bg-[#e6f4ff] text-[#0099e6]"
                          : "bg-[#f0f5fa] text-[#8ba0ba]"
                      }`}
                    >
                      {r.status === "active" ? "● 対応中" : "準備中"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {r.prefectures.map((p) => (
                      <span
                        key={p}
                        className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                          r.status === "active"
                            ? "bg-[#f0f9ff] text-[#1a3658]"
                            : "bg-[#f7fbff] text-[#8ba0ba]"
                        }`}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 bg-white border border-[#e4eef7] rounded-2xl p-5 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-sm font-bold text-[#0a2540] mb-0.5">
                  あなたのエリアは対応中？
                </p>
                <p className="text-[12px] text-[#5a7090]">
                  アプリで郵便番号を入力すると、対応状況がすぐに分かります。
                </p>
              </div>
              <a
                href="#cta"
                className="text-[13px] font-bold text-[#0099e6] hover:underline inline-flex items-center gap-1"
              >
                エリアを確認
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
