import { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, View, Dimensions } from 'react-native';
import { Colors } from '@/constants/colors';

type Props = {
  count?: number;
  duration?: number;
  delay?: number;
  /** Y origin (px from top). Defaults to ~30% screen height. */
  originY?: number;
};

const COLORS = [
  Colors.electric,
  Colors.violet,
  Colors.hotPink,
  Colors.sunset,
  Colors.mint,
  Colors.lemon,
  Colors.primaryMedium,
];

/**
 * Lightweight confetti — N small rotating squares burst from a center origin
 * outward, fall, and fade out. No native dep beyond Animated.
 */
export default function ConfettiBurst({
  count = 36,
  duration = 1800,
  delay = 0,
  originY,
}: Props) {
  const { width: SW, height: SH } = Dimensions.get('window');
  const oy = originY ?? SH * 0.3;

  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        const power = 120 + Math.random() * 200;
        const fall = 80 + Math.random() * 220;
        return {
          id: i,
          color: COLORS[i % COLORS.length],
          dx: Math.cos(angle) * power + (Math.random() - 0.5) * 30,
          dy: Math.sin(angle) * power - 60 + Math.random() * 40,
          fall,
          size: 6 + Math.random() * 8,
          rot: (Math.random() - 0.5) * 720,
          delay: Math.random() * 120,
        };
      }),
    [count]
  );

  const anims = useRef(
    pieces.map(() => ({
      t: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    const seq = Animated.parallel(
      anims.map((a, i) =>
        Animated.timing(a.t, {
          toValue: 1,
          duration,
          delay: delay + pieces[i].delay,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        })
      )
    );
    seq.start();
    return () => seq.stop();
  }, []);

  return (
    <View style={[StyleSheet.absoluteFillObject, { zIndex: 50 }]} pointerEvents="none">
      {pieces.map((p, i) => {
        const t = anims[i].t;
        const tx = t.interpolate({ inputRange: [0, 1], outputRange: [0, p.dx] });
        const ty = t.interpolate({
          inputRange: [0, 0.4, 1],
          outputRange: [0, p.dy, p.dy + p.fall],
        });
        const opacity = t.interpolate({
          inputRange: [0, 0.85, 1],
          outputRange: [1, 1, 0],
        });
        const rotate = t.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', `${p.rot}deg`],
        });
        return (
          <Animated.View
            key={p.id}
            style={{
              position: 'absolute',
              left: SW / 2 - p.size / 2,
              top: oy,
              width: p.size,
              height: p.size * 0.5,
              borderRadius: 1.5,
              backgroundColor: p.color,
              opacity,
              transform: [{ translateX: tx }, { translateY: ty }, { rotate }],
            }}
          />
        );
      })}
    </View>
  );
}
