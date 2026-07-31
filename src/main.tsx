import { StrictMode, useLayoutEffect } from 'react'
import './i18n'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// ブラウザの自動スクロール復元を完全無効化 — 常にページ最上部から開始
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

// 即座にトップへ — 全ての方法で
window.scrollTo(0, 0)
if (document.documentElement) document.documentElement.scrollTop = 0
if (document.body) document.body.scrollTop = 0
if (document.scrollingElement) document.scrollingElement.scrollTop = 0

// hash がついてたら消す
if (window.location.hash) {
  window.history.replaceState(null, '', window.location.pathname + window.location.search)
}

// root 描画後も複数回スクロールを強制（ブラウザの復元を上書き）
// ユーザーがまだ手動スクロールしていない間はトップに固定
function ForceScrollOnMount() {
  useLayoutEffect(() => {
    let userScrolled = false
    let attemptCount = 0
    const maxAttempts = 30 // 3秒間 (100ms x 30)

    const onUserScroll = () => {
      userScrolled = true
    }
    window.addEventListener('scroll', onUserScroll, { passive: true })
    window.addEventListener('wheel', onUserScroll, { passive: true })
    window.addEventListener('touchmove', onUserScroll, { passive: true })

    const force = () => {
      if (userScrolled || attemptCount >= maxAttempts) return
      window.scrollTo(0, 0)
      if (document.documentElement) document.documentElement.scrollTop = 0
      if (document.body) document.body.scrollTop = 0
      if (document.scrollingElement) document.scrollingElement.scrollTop = 0
      attemptCount++
    }

    // 即座に + rAF + setTimeout で多段階実行
    force()
    requestAnimationFrame(force)
    const t1 = setTimeout(force, 0)
    const t2 = setTimeout(force, 50)
    const t3 = setTimeout(force, 100)
    const t4 = setTimeout(force, 200)
    const t5 = setTimeout(force, 300)
    const t6 = setTimeout(force, 500)
    const t7 = setTimeout(force, 700)
    const t8 = setTimeout(force, 1000)
    const t9 = setTimeout(force, 1500)
    const t10 = setTimeout(force, 2000)
    const t11 = setTimeout(force, 2500)
    const t12 = setTimeout(force, 3000)

    return () => {
      window.removeEventListener('scroll', onUserScroll)
      window.removeEventListener('wheel', onUserScroll)
      window.removeEventListener('touchmove', onUserScroll)
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4)
      clearTimeout(t5); clearTimeout(t6); clearTimeout(t7); clearTimeout(t8)
      clearTimeout(t9); clearTimeout(t10); clearTimeout(t11); clearTimeout(t12)
    }
  }, [])
  return null
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ForceScrollOnMount />
    <App />
  </StrictMode>,
)