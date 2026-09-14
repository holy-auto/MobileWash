#!/usr/bin/env node
/**
 * ルート別の静的HTML と sitemap.xml を生成する（`vite build` の後段）。
 *
 * このサイトは CSR の SPA で、vercel.json の rewrite により全URLが同じ
 * index.html を返していた。Googlebot は JS を実行するので各ページを読めるが、
 * 生成AI・AI検索のクローラー（GPTBot / ClaudeBot / PerplexityBot 等）の多くは
 * JS を実行しない。AI から見ると12ルートすべてが同じ1ページだった。
 *
 * 文言は `src/seo/routes.ts` から読む。ここに直書きしない。
 * Vercel はファイルが存在すれば rewrite より優先して返すので、設定変更は要らない。
 *
 * ponytail: 文字列置換で HTML を組み立てる素朴な実装。index.html の head の
 * 並びが変わったら置換が効かなくなるが、そのときは黙って通さず Error で落ちる。
 * 上げるなら SSG に寄せる。
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const jiti = createJiti(import.meta.url);
const { ROUTES } = await jiti.import("../src/seo/routes.ts");

const ORIGIN = "https://mobilewash.app";
const OUT = join(repoRoot, "out");
const LASTMOD = new Date().toISOString().slice(0, 10);

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

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
  html = html.replace(
    "</head>",
    `  <script type="application/ld+json" id="prerender-jsonld">${JSON.stringify(jsonLd)}</script>\n  </head>`,
  );

  // JS を実行しないクローラーに読ませる本文。React がマウントしたら取り除く。
  const body = [
    `<div id="prerender-content">`,
    `  <h1>${esc(route.h1)}</h1>`,
    ...route.lead.map((t) => `  <p>${esc(t)}</p>`),
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

console.log(`OK: prerendered ${written} routes + sitemap.xml (${ROUTES.length} URLs)`);
