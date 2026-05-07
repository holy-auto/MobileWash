import { useRef, type ReactNode } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Gradients, Spacing, FontSize, BorderRadius } from '@/constants/colors';

type Variant = keyof typeof Gradients;

type Props = {
  label: string;
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  iconRight?: keyof typeof Ionicons.glyphMap;
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  glow?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: ReactNode;
};

/**
 * Vibrant gradient pill button with press-scale animation and optional glow shadow.
 * Use for primary CTAs that should feel exciting.
 */
export default function GradientButton({
  label,
  onPress,
  icon,
  iconRight,
  variant = 'brandCta',
  size = 'md',
  disabled,
  glow = true,
  style,
  textStyle,
  children,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };

  const sizeStyle = SIZES[size];
  const colors = Gradients[variant];

  return (
    <Animated.View
      style={[
        styles.shadowWrap,
        glow && glowShadow(variant),
        disabled && { opacity: 0.55 },
        { transform: [{ scale }] },
        style,
      ]}
    >
      <Pressable
        onPress={disabled ? undefined : onPress}
        onPressIn={disabled ? undefined : handlePressIn}
        onPressOut={disabled ? undefined : handlePressOut}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
      >
        <LinearGradient
          colors={colors as unknown as readonly [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.button, sizeStyle.container]}
        >
          {/* sheen highlight */}
          <View style={styles.sheen} pointerEvents="none" />
          {icon ? (
            <Ionicons name={icon} size={sizeStyle.icon} color={Colors.white} />
          ) : null}
          <Text style={[styles.label, sizeStyle.text, textStyle]} numberOfLines={1}>
            {label}
          </Text>
          {children}
          {iconRight ? (
            <Ionicons name={iconRight} size={sizeStyle.icon} color={Colors.white} />
          ) : null}
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const SIZES = {
  sm: {
    container: { paddingVertical: 10, paddingHorizontal: 16, gap: 6 } as ViewStyle,
    text: { fontSize: FontSize.sm } as TextStyle,
    icon: 16,
  },
  md: {
    container: { paddingVertical: 14, paddingHorizontal: 20, gap: 8 } as ViewStyle,
    text: { fontSize: FontSize.md } as TextStyle,
    icon: 18,
  },
  lg: {
    container: { paddingVertical: 18, paddingHorizontal: 24, gap: 10 } as ViewStyle,
    text: { fontSize: FontSize.lg } as TextStyle,
    icon: 22,
  },
};

function glowShadow(variant: Variant): ViewStyle {
  // Match shadow to dominant gradient color so the glow reads naturally.
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
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  };
}

const styles = StyleSheet.create({
  shadowWrap: {
    borderRadius: BorderRadius.full,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  sheen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  label: {
    color: Colors.white,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});

// keep referenced
void Spacing;
