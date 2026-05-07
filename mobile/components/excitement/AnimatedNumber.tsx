import { useEffect, useRef, useState } from 'react';
import { Text, type TextStyle, type StyleProp, Easing, Animated } from 'react-native';

type Props = {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  formatter?: (n: number) => string;
  style?: StyleProp<TextStyle>;
};

const defaultFormat = (n: number) => Math.round(n).toLocaleString();

/**
 * Counts a number up from 0 → value over `duration`. When `value` changes later,
 * tweens from the previous displayed value to the new one.
 */
export default function AnimatedNumber({
  value,
  duration = 900,
  prefix = '',
  suffix = '',
  formatter = defaultFormat,
  style,
}: Props) {
  const animated = useRef(new Animated.Value(0)).current;
  const previous = useRef(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const id = animated.addListener(({ value: v }) => setDisplay(v));
    Animated.timing(animated, {
      toValue: value,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start(() => {
      previous.current = value;
    });
    return () => animated.removeListener(id);
  }, [value]);

  return (
    <Text style={style} accessibilityLabel={`${prefix}${formatter(value)}${suffix}`}>
      {prefix}
      {formatter(display)}
      {suffix}
    </Text>
  );
}
