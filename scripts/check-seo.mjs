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
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { createJiti } from "jiti";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const read = (p) => readFileSync(join(repoRoot, p), "utf8");
const jiti = createJiti(import.meta.url);
const { ROUTES } = await jiti.import("../src/seo/routes.ts");
const { parsePostFile } = await jiti.import("../src/content/posts-parse.ts");

// --- 1) routes.ts が router の実ルートを過不足なく覆っているか ---
// 実際に描画されるルータは AnimatedRoutes。以前 src/router/config.tsx という
// どこからも import されていない同種のファイルがあり、この検査はそちらを読んでいた
// （= 5ページがルータに無いのに検査は通っていた）。dead file は削除済み。
const routerPaths = [...read("src/components/feature/AnimatedRoutes.tsx").matchAll(/path="([^"]+)"/g)]
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

// --- 3) お知らせ・プレスリリースの md がすべてパースできるか ---
// 壊れた frontmatter は `npm run build` でも落ちるが、プッシュ前にここで気づけるようにする。
const postCounts = {};
for (const kind of ["news", "press"]) {
  const dir = join(repoRoot, "src/content", kind);
  const files = readdirSync(dir).filter((f) => f.endsWith(".md"));
  assert.ok(files.length > 0, `src/content/${kind}/ に記事が1件も無い`);

  const slugs = new Set();
  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    // 記事のファイル名は日付で始める規約（読み込み側はこれ以外を無視するので、
    // 名前を間違えると黙って公開されない。ここで落として気づけるようにする）。
    assert.match(slug, /^\d{4}-\d{2}/, `src/content/${kind}/${file}: ファイル名は YYYY-MM で始める（この名前でないと公開されない）`);
    assert.ok(!slugs.has(slug), `src/content/${kind}/${file}: slug が重複している`);
    slugs.add(slug);
    // 必須項目・日付書式・分類は parsePostFile が例外で落とす
    const post = parsePostFile(kind, slug, readFileSync(join(dir, file), "utf8"));
    assert.ok(
      slug.startsWith(post.date.slice(0, 7)),
      `src/content/${kind}/${file}: ファイル名の年月が frontmatter の date（${post.date}）と違う`,
    );
  }
  postCounts[kind] = files.length;
}
// --- 4) 手書きの sitemap.xml が残っていないか（プリレンダが生成する） ---
try {
  readFileSync(join(repoRoot, "public/sitemap.xml"));
  throw new Error("public/sitemap.xml が残っている。sitemap は scripts/prerender.mjs が生成するので削除する");
} catch (e) {
  if (e.code !== "ENOENT") throw e;
}

// --- 5) 記事の内容が HTML を壊さないか（プリレンダの差し込み） ---
// 記事は代表が md で書く。見出しや本文に `</script>` や `$'` が入っても
// 出力が壊れないことを、実際に通して確かめる。
{
  const { jsonLdScript, replaceTag, insertAfter } = await import("./lib/html.mjs");

  const evil = "終了</script><img src=x>";
  const out = jsonLdScript({ headline: evil });
  assert.ok(!out.includes("</script>"), "jsonLdScript が </script> を素通しした");
  assert.equal(JSON.parse(out).headline, evil, "jsonLdScript が値を変えてしまっている");

  // `$'` 等は String.replace の置換文字列で特殊解釈される（文書の一部が混入する）
  const dollar = "価格は$'お得 $& ${x}";
  assert.equal(
    replaceTag("<title>x</title>", /<title>[^<]*<\/title>/, `<title>${dollar}</title>`, "<title>"),
    `<title>${dollar}</title>`,
    "replaceTag が $ を特殊解釈している",
  );
  assert.equal(insertAfter("<a><b>", "<a>", dollar, "<a>"), `<a>${dollar}<b>`, "insertAfter が $ を特殊解釈している");

  assert.throws(() => replaceTag("<p></p>", /<title>/, "x", "<title>"), /見つからない/);
  assert.throws(() => insertAfter("<p></p>", "<div>", "x", "<div>"), /見つからない/);
}

// --- 6) frontmatter の書式（README の例がそのまま通るか） ---
{
  const sample = [
    "---",
    'date: "2026-10-01"        # 必須。YYYY-MM-DD または YYYY-MM',
    'category: "お知らせ"        # 必須',
    'title: "見出し"            # 必須',
    'description: "本文。"       # 必須',
    "---",
  ].join("\n");
  const post = parsePostFile("news", "2026-10-sample", sample);
  assert.equal(post.title, "見出し", "frontmatter の行末コメントが読めていない（README の例が通らない）");
  assert.equal(post.dateLabel, "2026年10月1日");
  assert.equal(parsePostFile("press", "2026-10-x", sample.replace(/^category:.*$/m, "")).dateLabel, "2026年10月1日");
}

console.log(
  `OK: routes=${seoPaths.length} pages=${checked} news=${postCounts.news} press=${postCounts.press}`,
);
