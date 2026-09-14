/**
 * お知らせ・プレスリリースの読み込み（ブラウザ向け）。
 *
 * 記事の置き場所と書き方は `README.md` と `posts-parse.ts` を見る。
 * ここは Vite の `import.meta.glob` で md を集めるだけ。
 */
import { parsePostFile, sortPosts, type Post, type PostKind } from './posts-parse';

export { NEWS_CATEGORIES, formatPostDate } from './posts-parse';
export type { Post, NewsCategory } from './posts-parse';

/**
 * 記事のファイル名は日付で始める規約なので、数字以外で始まるファイルは
 * 記事として読まない（README.md などを誤って記事にしないため）。
 */
function collect(kind: PostKind, files: Record<string, string>): Post[] {
  return sortPosts(
    Object.entries(files)
      .map(([path, raw]) => [path.replace(/^.*\/([^/]+)\.md$/, '$1'), raw] as const)
      .filter(([slug]) => /^\d/.test(slug))
      .map(([slug, raw]) => parsePostFile(kind, slug, raw)),
  );
}

// import.meta.glob の引数は Vite がビルド時に静的解析する。パターンもオプションも
// リテラルで書く必要がある（変数に括り出すと ?raw が効かず、md を JS として解析して落ちる）。
export const newsPosts: Post[] = collect(
  'news',
  import.meta.glob<string>('./news/*.md', { eager: true, query: '?raw', import: 'default' }),
);

export const pressPosts: Post[] = collect(
  'press',
  import.meta.glob<string>('./press/*.md', { eager: true, query: '?raw', import: 'default' }),
);
