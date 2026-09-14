/**
 * お知らせ・プレスリリースの読み込み。
 *
 * 記事は `src/content/news/<slug>.md` と `src/content/press/<slug>.md` に
 * 1ファイル1件で置く。書き方は `src/content/README.md`。
 *
 * このファイルは **Node からも読めるように** `import.meta.glob` を含めない。
 * ブラウザ向けの読み込みは `posts.ts`、ビルドスクリプトは
 * `scripts/prerender.mjs` がそれぞれディレクトリを走査してここを呼ぶ。
 * ファイルを1つ足せば、一覧ページ・プリレンダHTML・RSS に自動で載る。
 * コードを書き換える必要はない。
 *
 * ponytail: frontmatter のパーサは `key: "value"` だけを見る素朴な実装。
 * 配列やネストは扱わない。必要になったら gray-matter を入れる。
 */

/** ニュースの分類。一覧のフィルタタブもこの順で出す。 */
export const NEWS_CATEGORIES = ['お知らせ', 'プレスリリース', 'メディア', '採用'] as const;
export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export type PostKind = 'news' | 'press';

export type Post = {
  kind: PostKind;
  /** ファイル名（拡張子なし）。一覧ページ内のアンカーIDにもなる。 */
  slug: string;
  /** YYYY-MM または YYYY-MM-DD。日が分からない出来事は月までで書く。 */
  date: string;
  /** 表示用の日付（2024年11月12日 / 2026年8月）。 */
  dateLabel: string;
  /** news のみ。press は undefined。 */
  category?: NewsCategory;
  title: string;
  description: string;
};

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
const FIELD = /^(\w+):\s*(?:"([^"]*)"|'([^']*)')\s*$/;

/** 2024-11-12 → 2024年11月12日 / 2025-10 → 2025年10月 */
export function formatPostDate(date: string): string {
  const [y, m, d] = date.split('-');
  const head = `${y}年${Number(m)}月`;
  return d ? `${head}${Number(d)}日` : head;
}

/** 1ファイル分をパースする。必須項目が欠けていれば例外（黙って落とさない）。 */
export function parsePostFile(kind: PostKind, slug: string, raw: string): Post {
  const where = `${kind}/${slug}.md`;
  const m = FRONTMATTER.exec(raw.trim() + '\n');
  if (!m) throw new Error(`${where}: frontmatter が読めない`);

  const fields: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const f = FIELD.exec(line);
    if (!f) throw new Error(`${where}: frontmatter の行が読めない: ${line}`);
    fields[f[1]] = f[2] ?? f[3] ?? '';
  }

  for (const key of ['date', 'title', 'description']) {
    if (!fields[key]) throw new Error(`${where}: ${key} が無い`);
  }
  if (!/^\d{4}-\d{2}(-\d{2})?$/.test(fields.date)) {
    throw new Error(`${where}: date は YYYY-MM-DD か YYYY-MM で書く: ${fields.date}`);
  }

  let category: NewsCategory | undefined;
  if (kind === 'news') {
    if (!fields.category) throw new Error(`${where}: category が無い`);
    if (!(NEWS_CATEGORIES as readonly string[]).includes(fields.category)) {
      throw new Error(`${where}: category は ${NEWS_CATEGORIES.join(' / ')} のいずれか: ${fields.category}`);
    }
    category = fields.category as NewsCategory;
  }

  return {
    kind,
    slug,
    date: fields.date,
    dateLabel: formatPostDate(fields.date),
    category,
    title: fields.title,
    description: fields.description,
  };
}

/** 新しい順。ファイル名ではなく date で並べる。 */
export function sortPosts<T extends { date: string }>(posts: T[]): T[] {
  return posts.slice().sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}
