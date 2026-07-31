# MobileWash

出張洗車・出張コーティング専門のカーディテイリングアプリ「MobileWash」の公式サイト（ランディングページ）。
GPSで近くの認定プロを自動マッチングし、最短5分で駐車場まで出張するサービスのプレローンチサイトです。

## 技術スタック

- [Vite](https://vitejs.dev/) + [React 19](https://react.dev/)
- [React Router](https://reactrouter.com/) — ルーティング
- [Tailwind CSS](https://tailwindcss.com/) — スタイリング
- [framer-motion](https://www.framer.com/motion/) — アニメーション
- [i18next](https://www.i18next.com/) — 多言語対応
- TypeScript

## セットアップ

```bash
npm install
```

## 開発

```bash
npm run dev
```

開発サーバーが起動したら、ターミナルに表示される URL（既定 http://localhost:5173）をブラウザで開きます。

## その他のコマンド

```bash
npm run build       # 本番ビルド
npm run preview     # ビルド成果物のプレビュー
npm run lint        # ESLint
npm run type-check  # 型チェック
```

## ディレクトリ構成

- `src/main.tsx` — エントリーポイント
- `src/router/` — ルーティング設定
- `src/pages/` — 各ページ（home / corporate / company / legal など）
- `src/components/feature/` — 画面遷移などの共通コンポーネント
- `src/hooks/` — カスタムフック
- `src/i18n/` — 多言語リソース
- `src/mocks/` — 表示用モックデータ

> `mobile/` は別途 React Native（Expo）アプリのため、独自の設定・依存で管理されています。
