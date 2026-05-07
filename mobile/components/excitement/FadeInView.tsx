import { useEffect, useRef, type ReactNode } from 'react';
import { Animated, type ViewStyle, type StyleProp } from 'react-native';

type Props = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  translateY?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * Fades + lifts children in on mount. Cheap entrance animation
 * to make screens feel alive without per-screen boilerplate.
 */
export default function FadeInView({
  children,
  delay = 0,
  duration = 420,
  translateY = 14,
  style,
}: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const ty = useRef(new Animated.Value(translateY)).current;

  useEffect(() => {
    const seq = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(ty, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]);
    seq.start();
    return () => seq.stop();
  }, []);

  return (
    <Animated.View
      style={[{ opacity, transform: [{ translateY: ty }] }, style]}
    >
      {children}
    </Animated.View>
  );
}
