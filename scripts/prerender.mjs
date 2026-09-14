#!/usr/bin/env node
/**
 * ルート別の静的HTML・sitemap.xml・RSS を生成する（`vite build` の後段）。
 *
 * このサイトは CSR の SPA で、vercel.json の rewrite により全URLが同じ
 * index.html を返していた。Googlebot は JS を実行するので各ページを読めるが、
 * 生成AI・AI検索のクローラー（GPTBot / ClaudeBot / PerplexityBot 等）の多くは
 * JS を実行しない。AI から見ると12ルートすべてが同じ1ページだった。
 *
 * 文言は `src/seo/routes.ts`、お知らせ・プレスリリースは `src/content/{news,press}/*.md`
 * から読む。ここに直書きしない。
 * Vercel はファイルが存在すれば rewrite より優先して返すので、設定変更は要らない。
 *
 * ponytail: 文字列置換で HTML を組み立てる素朴な実装。index.html の head の
 * 並びが変わったら置換が効かなくなるが、そのときは黙って通さず Error で落ちる。
 * 上げるなら SSG に寄せる。
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const jiti = createJiti(import.meta.url);
const { ROUTES } = await jiti.import("../src/seo/routes.ts");
const { parsePostFile, sortPosts } = await jiti.import("../src/content/posts-parse.ts");

/**
 * お知らせ・プレスリリースを md から読む（ブラウザ側と同じパーサ）。
 * 記事のファイル名は日付で始める規約。README.md 等は読まない。
 */
function loadPosts(kind) {
  const dir = join(repoRoot, "src/content", kind);
  return sortPosts(
    readdirSync(dir)
      .filter((f) => f.endsWith(".md") && /^\d/.test(f))
      .map((f) => parsePostFile(kind, f.replace(/\.md$/, ""), readFileSync(join(dir, f), "utf8"))),
  );
}

/** ルート → そのページに載る記事。一覧ページの中身をクローラーにも見せる。 */
const POSTS_BY_ROUTE = {
  "/company/news": loadPosts("news"),
  "/company/press": loadPosts("press"),
};

const ORIGIN = "https://mobilewash.app";
const OUT = join(repoRoot, "out");
const LASTMOD = new Date().toISOString().slice(0, 10);

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * JSON-LD を <script> に入れる形にする。`</script>` で script が早期終了しないよう
 * `<` を Unicode エスケープする（JSON としては同じ値）。
 */
function jsonLdScript(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function replaceTag(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`index.html に ${label} が見つからない（head の構造が変わった可能性）`);
  return html.replace(pattern, replacement);
}

const template = readFileSync(join(OUT, "index.html"), "utf8");
if (!template.includes('<div id="root"></div>')) {
  throw new Error('index.html に <div id="root"></div> が無い（差し込み先が変わった可能性）');
}

let written = 0;
for (const route of ROUTES) {
  const url = route.path === "/" ? `${ORIGIN}/` : `${ORIGIN}${route.path}`;

  let html = template;
  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${esc(route.title)}</title>`, "<title>");
  html = replaceTag(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(route.description)}" />`, "description");
  html = replaceTag(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`, "canonical");
  html = replaceTag(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`, "og:url");
  html = replaceTag(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(route.title)}" />`, "og:title");
  html = replaceTag(html, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${esc(route.title)}" />`, "twitter:title");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: route.title,
    description: route.description,
    url,
    inLanguage: "ja",
    isPartOf: { "@type": "WebSite", name: "MobileWash", url: `${ORIGIN}/` },
    publisher: { "@type": "Organization", name: "株式会社HOLY", url: "https://holy-inc.jp" },
  };
  const posts = POSTS_BY_ROUTE[route.path] ?? [];
  if (posts.length > 0) {
    jsonLd["@type"] = "CollectionPage";
    jsonLd.mainEntity = {
      "@type": "ItemList",
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        // 記事ごとのページは作っていないので url は持たせない（一覧ページそのものが出典）
        item: {
          "@type": "NewsArticle",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          publisher: { "@type": "Organization", name: "株式会社HOLY", url: "https://holy-inc.jp" },
        },
      })),
    };
  }
  html = replaceTag(
    html,
    /<\/head>/,
    `  <script type="application/ld+json" id="prerender-jsonld">${jsonLdScript(jsonLd)}</script>\n  </head>`,
    "</head>（JSON-LD の差し込み先）",
  );

  // JS を実行しないクローラーに読ませる本文。React がマウントしたら取り除く。
  const body = [
    `<div id="prerender-content">`,
    `  <h1>${esc(route.h1)}</h1>`,
    ...route.lead.map((t) => `  <p>${esc(t)}</p>`),
    ...posts.flatMap((post) => [
      `  <article id="${post.slug}">`,
      `    <h2>${esc(post.title)}</h2>`,
      `    <p><time datetime="${post.date}">${esc(post.dateLabel)}</time>${post.category ? ` / ${esc(post.category)}` : ""}</p>`,
      `    <p>${esc(post.description)}</p>`,
      `  </article>`,
    ]),
    `  <nav aria-label="サイト内のページ">`,
    ...ROUTES.filter((r) => r.path !== route.path).map((r) => `    <a href="${r.path}">${esc(r.h1)}</a>`),
    `  </nav>`,
    `</div>`,
    `<script>(function(){var r=document.getElementById("root");var p=document.getElementById("prerender-content");var j=document.getElementById("prerender-jsonld");if(!r||!p)return;var n=0;(function c(){n++;if(r.children.length>0){p.remove();if(j)j.remove();return;}if(n<120)requestAnimationFrame(c);})();})();</script>`,
  ].join("\n    ");
  html = html.replace('<div id="root"></div>', `<div id="root"></div>\n    ${body}`);
  if (!html.includes(`<h1>${esc(route.h1)}</h1>`)) {
    throw new Error(`${route.path}: 本文の差し込みに失敗した`);
  }

  const dir = route.path === "/" ? OUT : join(OUT, route.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
  written += 1;
}

// sitemap.xml も同じ出典から作る（手書きの public/sitemap.xml は廃止）
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...ROUTES.flatMap((r) => [
    "  <url>",
    `    <loc>${ORIGIN}${r.path === "/" ? "/" : r.path}</loc>`,
    `    <lastmod>${LASTMOD}</lastmod>`,
    `    <changefreq>${r.changefreq}</changefreq>`,
    `    <priority>${r.priority}</priority>`,
    "  </url>",
  ]),
  "</urlset>",
  "",
].join("\n");
writeFileSync(join(OUT, "sitemap.xml"), sitemap);

// RSS も同じ md から作る。記事ごとのページは作っていないので、リンクは一覧ページを指す。
// 全件が同じ link になるため、guid は URL ではない一意なIDにする
// （isPermaLink="true" のまま link を重複させると、リーダーが同じ記事と見なして1件に潰す）。
const feedItems = sortPosts(
  Object.entries(POSTS_BY_ROUTE).flatMap(([path, posts]) => posts.map((post) => ({ ...post, path }))),
);
writeFileSync(
  join(OUT, "feed.xml"),
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>MobileWash のお知らせ</title>",
    `    <link>${ORIGIN}/company/news</link>`,
    "    <description>出張洗車・出張コーティング MobileWash と運営会社 株式会社HOLY のお知らせ・プレスリリース。</description>",
    "    <language>ja</language>",
    `    <atom:link href="${ORIGIN}/feed.xml" rel="self" type="application/rss+xml" />`,
    ...feedItems.flatMap((post) => {
      const link = `${ORIGIN}${post.path}`;
      // 月までしか分からない記事は、その月の1日 0時（JST）として配信する。
      // RSS の pubDate は GMT 表記なので、前月末日の 15:00 GMT と出る（同じ瞬間）。
      const date = post.date.length === 7 ? `${post.date}-01` : post.date;
      return [
        "    <item>",
        `      <title>${esc(post.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="false">mobilewash:${post.kind}/${post.slug}</guid>`,
        `      <pubDate>${new Date(`${date}T00:00:00+09:00`).toUTCString()}</pubDate>`,
        ...(post.category ? [`      <category>${esc(post.category)}</category>`] : []),
        `      <description>${esc(post.description)}</description>`,
        "    </item>",
      ];
    }),
    "  </channel>",
    "</rss>",
    "",
  ].join("\n"),
);

console.log(
  `OK: prerendered ${written} routes + sitemap.xml (${ROUTES.length} URLs) + feed.xml (${feedItems.length}件)`,
);
