import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View, type ViewStyle, type StyleProp } from 'react-native';

type Props = {
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * A small dot with two outward-pulsing rings — used as a "live" indicator.
 */
export default function PulsingDot({
  color = '#22C55E',
  size = 10,
  style,
}: Props) {
  const ring1 = useRef(new Animated.Value(0)).current;
  const ring2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const make = (val: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(val, {
            toValue: 1,
            duration: 1600,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(val, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
    const a = make(ring1, 0);
    const b = make(ring2, 800);
    a.start();
    b.start();
    return () => {
      a.stop();
      b.stop();
    };
  }, []);

  const ringStyle = (val: Animated.Value): ViewStyle => ({
    position: 'absolute',
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: 2,
    borderColor: color,
    opacity: val.interpolate({ inputRange: [0, 1], outputRange: [0.6, 0] }),
    transform: [
      { scale: val.interpolate({ inputRange: [0, 1], outputRange: [1, 2.6] }) },
    ],
  });

  return (
    <View style={[styles.wrap, { width: size, height: size }, style]}>
      <Animated.View style={ringStyle(ring1)} />
      <Animated.View style={ringStyle(ring2)} />
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
