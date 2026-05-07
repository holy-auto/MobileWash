import { StyleSheet, Text, View, type ViewStyle, type StyleProp, type TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Gradients, FontSize, Spacing } from '@/constants/colors';

type Props = {
  title: string;
  eyebrow?: string;
  trailing?: React.ReactNode;
  variant?: keyof typeof Gradients;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

/**
 * Section header with a gradient accent bar + optional eyebrow label.
 */
export default function SectionHeader({
  title,
  eyebrow,
  trailing,
  variant = 'brandCta',
  style,
  titleStyle,
}: Props) {
  const colors = Gradients[variant];
  return (
    <View style={[styles.row, style]}>
      <View style={styles.left}>
        <View style={styles.titleRow}>
          <LinearGradient
            colors={colors as unknown as readonly [string, string, ...string[]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.bar}
          />
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        </View>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      </View>
      {trailing}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  left: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bar: {
    width: 4,
    height: 18,
    borderRadius: 2,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: 0.2,
  },
  eyebrow: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    marginTop: 4,
    marginLeft: 14,
  },
});
