#!/usr/bin/env node
/**
 * SEO メタ情報の突き合わせ検査（`npm run check:seo`）。
 *
 * `src/seo/routes.ts` を単一定義源にしたが、各ページは今も useEffect の中で
 * document.title を直書きしている（12ファイルの書き換えは別PR）。
 * その間、静的HTML（プリレンダ）と実際の描画がズレるのを防ぐための検査。
 *
 * 実際にこのリポジトリで起きていた同種のズレ:
 * index.html は先行登録クーポンを「¥1,000OFF」、React 側は「¥1,500 OFF」と
 * 書いており、同じ特典の金額が2通り存在していた（この検査の対象外。
 * どちらが正しいか決まったら検査項目を足す）。
 *
 * ponytail: 突き合わせは文字列比較。title をテンプレート化すると効かなくなる。
 * そのときはページ側を routes.ts から読む形に直して、この検査ごと捨てる。
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { createJiti } from "jiti";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const read = (p) => readFileSync(join(repoRoot, p), "utf8");
const { ROUTES } = await createJiti(import.meta.url).import("../src/seo/routes.ts");

// --- 1) routes.ts が router の実ルートを過不足なく覆っているか ---
const routerPaths = [...read("src/router/config.tsx").matchAll(/path:\s*"([^"]+)"/g)]
  .map((m) => m[1])
  .filter((p) => p !== "*");
assert.ok(routerPaths.length > 5, `router からルートが取れていない: ${routerPaths.length}`);

const seoPaths = ROUTES.map((r) => r.path);
for (const p of routerPaths) {
  assert.ok(seoPaths.includes(p), `router の ${p} が src/seo/routes.ts に無い`);
}
for (const p of seoPaths) {
  assert.ok(routerPaths.includes(p), `routes.ts の ${p} に対応するルートが router に無い`);
}

// --- 2) 各ページが設定する document.title が routes.ts と一致するか ---
/** ルート → ページ実装ファイル。router/config.tsx の lazy import から引く。 */
const PAGE_FILES = {
  "/": "src/pages/home/page.tsx",
  "/corporate": "src/pages/corporate/page.tsx",
  "/company/about": "src/pages/company/about/page.tsx",
  "/company/news": "src/pages/company/news/page.tsx",
  "/company/press": "src/pages/company/press/page.tsx",
  "/company/recruit": "src/pages/company/recruit/page.tsx",
  "/company/brand": "src/pages/company/brand/page.tsx",
  "/sitemap": "src/pages/Sitemap.tsx",
  "/legal/terms": "src/pages/legal/TermsOfService.tsx",
  "/legal/privacy": "src/pages/legal/PrivacyPolicy.tsx",
  "/legal/consumer-law": "src/pages/legal/ConsumerLaw.tsx",
  "/legal/security": "src/pages/legal/SecurityPolicy.tsx",
};
assert.deepEqual(
  Object.keys(PAGE_FILES).sort(),
  seoPaths.slice().sort(),
  "PAGE_FILES と routes.ts のルートが食い違っている",
);

let checked = 0;
for (const route of ROUTES) {
  const src = read(PAGE_FILES[route.path]);
  const titles = [...src.matchAll(/document\.title\s*=\s*'([^']*)'/g)].map((m) => m[1]);
  assert.ok(titles.length > 0, `${PAGE_FILES[route.path]} が document.title を設定していない`);
  // 先頭がそのページの title（2つ目以降はクリーンアップで元に戻す用）
  assert.equal(
    titles[0],
    route.title,
    `${route.path}: ページの document.title が routes.ts と違う\n  page:   ${titles[0]}\n  routes: ${route.title}`,
  );
  const descs = [...src.matchAll(/setAttribute\('content', '([^']*)'\)/g)].map((m) => m[1]);
  assert.ok(descs.length > 0, `${PAGE_FILES[route.path]} が description を設定していない`);
  assert.equal(
    descs[0],
    route.description,
    `${route.path}: ページの description が routes.ts と違う\n  page:   ${descs[0]}\n  routes: ${route.description}`,
  );
  checked += 1;
}

// --- 3) 手書きの sitemap.xml が残っていないか（プリレンダが生成する） ---
try {
  readFileSync(join(repoRoot, "public/sitemap.xml"));
  throw new Error("public/sitemap.xml が残っている。sitemap は scripts/prerender.mjs が生成するので削除する");
} catch (e) {
  if (e.code !== "ENOENT") throw e;
}

console.log(`OK: routes=${seoPaths.length} pages=${checked} （router と routes.ts と各ページの title/description が一致）`);
