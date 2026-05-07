import { type ReactNode } from 'react';
import {
  StyleSheet,
  View,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Gradients, BorderRadius } from '@/constants/colors';

type Variant = keyof typeof Gradients;

type Props = {
  children: ReactNode;
  variant?: Variant;
  glow?: boolean;
  radius?: number;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

/**
 * Card with a gradient background. Adds a subtle inner sheen and optional
 * colored glow shadow that matches the gradient.
 */
export default function GradientCard({
  children,
  variant = 'brandCta',
  glow = true,
  radius = BorderRadius.lg,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  style,
  contentStyle,
}: Props) {
  const colors = Gradients[variant];

  return (
    <View
      style={[
        { borderRadius: radius },
        glow && glowShadow(variant),
        style,
      ]}
    >
      <LinearGradient
        colors={colors as unknown as readonly [string, string, ...string[]]}
        start={start}
        end={end}
        style={[styles.card, { borderRadius: radius }, contentStyle]}
      >
        <View style={[styles.sheen, { borderTopLeftRadius: radius, borderTopRightRadius: radius }]} pointerEvents="none" />
        {children}
      </LinearGradient>
    </View>
  );
}

function glowShadow(variant: Variant): ViewStyle {
  const map: Record<Variant, string> = {
    heroNavy: Colors.inkDeep,
    aurora: Colors.violet,
    skyPop: Colors.electric,
    brandCta: Colors.electricDeep,
    sunset: Colors.hotPink,
    mint: Colors.mint,
    gold: '#F59E0B',
    glassWhite: Colors.shadow,
    bgTint: Colors.shadow,
  };
  return {
    shadowColor: map[variant],
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 8,
  };
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  sheen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '45%',
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
});
