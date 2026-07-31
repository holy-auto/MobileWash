import { useRef, useCallback, useEffect } from 'react';

interface SwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  preventDefaultOnSwipe?: boolean;
}

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  preventDefaultOnSwipe = true,
}: SwipeOptions) {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  const onTouchStart = useCallback(
    (e: React.TouchEvent | TouchEvent) => {
      touchStartX.current = e.changedTouches[0].screenX;
      touchStartY.current = e.changedTouches[0].screenY;
      touchEndX.current = null;
      touchEndY.current = null;
    },
    [],
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent | TouchEvent) => {
      touchEndX.current = e.changedTouches[0].screenX;
      touchEndY.current = e.changedTouches[0].screenY;

      if (touchStartX.current == null || touchStartY.current == null) return;
      if (touchEndX.current == null || touchEndY.current == null) return;

      const dx = touchEndX.current - touchStartX.current;
      const dy = touchEndY.current - touchStartY.current;

      // 水平方向のスワイプが支配的な場合のみ preventDefault
      if (preventDefaultOnSwipe && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
        // React synthetic eventではpreventDefaultできない場合があるため、
        // passive: false で登録したネイティブリスナーで対応する
      }
    },
    [preventDefaultOnSwipe],
  );

  const onTouchEnd = useCallback(() => {
    if (touchStartX.current == null || touchEndX.current == null) return;
    if (touchStartY.current == null || touchEndY.current == null) return;

    const dx = touchEndX.current - touchStartX.current;
    const dy = touchEndY.current - touchStartY.current;

    // 垂直移動が支配的なら無視（ページスクロールと競合しないよう）
    if (Math.abs(dy) > Math.abs(dx)) return;

    if (dx > threshold) {
      onSwipeRight?.();
    } else if (dx < -threshold) {
      onSwipeLeft?.();
    }

    touchStartX.current = null;
    touchStartY.current = null;
    touchEndX.current = null;
    touchEndY.current = null;
  }, [onSwipeLeft, onSwipeRight, threshold]);

  // ネイティブイベントで passive: false を使うためのref
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || !preventDefaultOnSwipe) return;

    const handleTouchMoveNative = (e: TouchEvent) => {
      if (touchStartX.current == null || touchStartY.current == null) return;
      // touchend の座標は changedTouches から取得できないため、
      // ここでは onTouchMove の処理と同様に判定
      const cx = e.changedTouches[0].screenX;
      const cy = e.changedTouches[0].screenY;
      const dx = cx - touchStartX.current;
      const dy = cy - touchStartY.current;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
        e.preventDefault();
      }
    };

    el.addEventListener('touchmove', handleTouchMoveNative, { passive: false });
    return () => {
      el.removeEventListener('touchmove', handleTouchMoveNative);
    };
  }, [preventDefaultOnSwipe]);

  return {
    elementRef,
    touchHandlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  };
}