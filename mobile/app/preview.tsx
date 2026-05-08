import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Gradients, Spacing, FontSize, BorderRadius } from '@/constants/colors';
import {
  AnimatedNumber,
  ConfettiBurst,
  FadeInView,
  GradientButton,
  GradientCard,
  PulsingDot,
  SectionHeader,
} from '@/components/excitement';

/**
 * Design system playground — `localhost:8081/preview` (web)
 *
 * 全UIプリミティブとカラートークンを1画面で確認・微調整するためのページ。
 * ここで `constants/colors.ts` を編集すれば全パーツに即反映される。
 */

const GRADIENT_KEYS = Object.keys(Gradients) as Array<keyof typeof Gradients>;

const ACCENT_COLORS: Array<[string, string]> = [
  ['primary', Colors.primary],
  ['primaryMedium', Colors.primaryMedium],
  ['electric', Colors.electric],
  ['electricDeep', Colors.electricDeep],
  ['violet', Colors.violet],
  ['violetSoft', Colors.violetSoft],
  ['hotPink', Colors.hotPink],
  ['sunset', Colors.sunset],
  ['mint', Colors.mint],
  ['lemon', Colors.lemon],
  ['gold', Colors.gold],
  ['inkDeep', Colors.inkDeep],
];

export default function PreviewScreen() {
  const [counter, setCounter] = useState(4850);
  const [confettiKey, setConfettiKey] = useState<number | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      {confettiKey !== null && (
        <ConfettiBurst key={confettiKey} count={36} duration={1800} originY={300} />
      )}
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.eyebrow}>DESIGN PLAYGROUND</Text>
            <Text style={styles.title}>UI Preview</Text>
            <Text style={styles.subtitle}>
              constants/colors.ts を編集して全パーツの色味を一気に調整できます
            </Text>
          </View>
          <View style={styles.titleBadge}>
            <PulsingDot color={Colors.electric} size={8} />
            <Text style={styles.titleBadgeText}>LIVE</Text>
          </View>
        </View>

        {/* Gradients */}
        <SectionHeader title="Gradients" eyebrow="01 / TOKENS" variant="skyPop" />
        <View style={styles.gridGradients}>
          {GRADIENT_KEYS.map((key) => (
            <View key={key} style={styles.swatchWrap}>
              <LinearGradient
                colors={
                  Gradients[key] as unknown as readonly [string, string, ...string[]]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.swatch}
              />
              <Text style={styles.swatchLabel}>{key}</Text>
            </View>
          ))}
        </View>

        {/* Accent Colors */}
        <SectionHeader title="Accent Colors" eyebrow="02 / COLORS" variant="aurora" />
        <View style={styles.gridColors}>
          {ACCENT_COLORS.map(([name, hex]) => (
            <View key={name} style={styles.colorChip}>
              <View style={[styles.colorDot, { backgroundColor: hex }]} />
              <Text style={styles.colorName}>{name}</Text>
              <Text style={styles.colorHex}>{hex}</Text>
            </View>
          ))}
        </View>

        {/* Buttons */}
        <SectionHeader title="GradientButton" eyebrow="03 / BUTTONS" variant="brandCta" />
        <View style={styles.column}>
          {(['skyPop', 'aurora', 'sunset', 'mint', 'gold', 'brandCta'] as const).map(
            (variant) => (
              <View key={variant} style={styles.buttonRow}>
                <Text style={styles.variantLabel}>{variant}</Text>
                <View style={styles.buttonRowInner}>
                  <GradientButton
                    label="Small"
                    icon="rocket"
                    variant={variant}
                    size="sm"
                  />
                  <GradientButton
                    label="Medium"
                    icon="flash"
                    variant={variant}
                    size="md"
                  />
                  <GradientButton
                    label="Large CTA"
                    icon="car-sport"
                    variant={variant}
                    size="lg"
                  />
                </View>
              </View>
            ),
          )}
        </View>

        {/* Cards */}
        <SectionHeader title="GradientCard" eyebrow="04 / CARDS" variant="sunset" />
        <View style={styles.cardsGrid}>
          {(['heroNavy', 'aurora', 'skyPop', 'sunset', 'mint', 'gold'] as const).map(
            (variant) => (
              <GradientCard key={variant} variant={variant} style={styles.demoCard}>
                <Text style={styles.demoCardEyebrow}>{variant.toUpperCase()}</Text>
                <Text style={styles.demoCardTitle}>洗車の予約完了 ✨</Text>
                <Text style={styles.demoCardBody}>
                  プロが向かっています。到着まで約 5 分です。
                </Text>
                <View style={styles.demoCardFooter}>
                  <Text style={styles.demoCardPrice}>¥3,200</Text>
                  <Ionicons name="arrow-forward" size={18} color={Colors.white} />
                </View>
              </GradientCard>
            ),
          )}
        </View>

        {/* AnimatedNumber */}
        <SectionHeader title="AnimatedNumber" eyebrow="05 / ANIMATION" variant="mint" />
        <View style={styles.animatedNumberCard}>
          <View>
            <Text style={styles.animLabel}>ポイント残高</Text>
            <View style={styles.animValueRow}>
              <AnimatedNumber value={counter} duration={900} style={styles.animValue} />
              <Text style={styles.animUnit}>pt</Text>
            </View>
          </View>
          <View style={styles.animActions}>
            <Pressable
              onPress={() => setCounter((c) => c + 500)}
              style={[styles.animBtn, { backgroundColor: Colors.mint }]}
            >
              <Text style={styles.animBtnText}>+500</Text>
            </Pressable>
            <Pressable
              onPress={() => setCounter((c) => Math.max(0, c - 500))}
              style={[styles.animBtn, { backgroundColor: Colors.hotPink }]}
            >
              <Text style={styles.animBtnText}>−500</Text>
            </Pressable>
            <Pressable
              onPress={() => setCounter(Math.floor(Math.random() * 99999))}
              style={[styles.animBtn, { backgroundColor: Colors.violet }]}
            >
              <Text style={styles.animBtnText}>RAND</Text>
            </Pressable>
          </View>
        </View>

        {/* PulsingDot */}
        <SectionHeader title="PulsingDot" eyebrow="06 / INDICATOR" variant="aurora" />
        <View style={styles.dotsRow}>
          {[
            ['mint', Colors.mint],
            ['electric', Colors.electric],
            ['hotPink', Colors.hotPink],
            ['sunset', Colors.sunset],
            ['violet', Colors.violet],
            ['lemon', Colors.lemon],
          ].map(([name, color]) => (
            <View key={name} style={styles.dotItem}>
              <PulsingDot color={color} size={14} />
              <Text style={styles.dotName}>{name}</Text>
            </View>
          ))}
        </View>

        {/* ConfettiBurst */}
        <SectionHeader title="ConfettiBurst" eyebrow="07 / CELEBRATION" variant="sunset" />
        <View style={styles.confettiCard}>
          <Text style={styles.confettiText}>
            完了画面で発火する紙吹雪。タップで再生。
          </Text>
          <GradientButton
            label="🎉 紙吹雪を発射"
            variant="sunset"
            size="md"
            onPress={() => setConfettiKey(Date.now())}
          />
        </View>

        {/* SectionHeader variants */}
        <SectionHeader title="SectionHeader" eyebrow="08 / HEADERS" variant="skyPop" />
        <View style={styles.column}>
          {(['skyPop', 'aurora', 'sunset', 'mint', 'gold'] as const).map((v) => (
            <SectionHeader
              key={v}
              title={`見出しサンプル / ${v}`}
              eyebrow={`VARIANT ${v.toUpperCase()}`}
              variant={v}
            />
          ))}
        </View>

        {/* FadeInView demo */}
        <SectionHeader title="FadeInView" eyebrow="09 / ENTRANCE" variant="brandCta" />
        <View style={styles.column}>
          {[0, 100, 200, 300, 400].map((delay) => (
            <FadeInView key={delay} delay={delay}>
              <View style={styles.fadeBar}>
                <Text style={styles.fadeBarText}>delay {delay}ms でフェードイン</Text>
              </View>
            </FadeInView>
          ))}
        </View>

        {/* Hero band mocks */}
        <SectionHeader title="Hero Bands" eyebrow="10 / SECTIONS" variant="heroNavy" />
        <View style={{ gap: Spacing.md }}>
          {/* Customer hero mock */}
          <LinearGradient
            colors={Gradients.heroNavy as unknown as readonly [string, string, ...string[]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroMock}
          >
            <View style={styles.heroOrb1} />
            <View style={styles.heroOrb2} />
            <Text style={styles.heroGreeting}>こんにちは ✨</Text>
            <Text style={styles.heroName}>山田 さん</Text>
            <View style={styles.heroOnline}>
              <PulsingDot color={Colors.electric} size={8} />
              <Text style={styles.heroOnlineText}>3名のプロがオンライン</Text>
            </View>
          </LinearGradient>

          {/* Pro hero mock */}
          <LinearGradient
            colors={Gradients.gold as unknown as readonly [string, string, ...string[]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroMock}
          >
            <Text style={styles.heroProRole}>★ PRO MODE</Text>
            <Text style={styles.heroName}>田中 太郎</Text>
            <View style={styles.heroEarningsRow}>
              <Text style={styles.heroEarningsLabel}>本日の売上</Text>
              <View style={styles.heroEarningsValueRow}>
                <Text style={styles.heroYen}>¥</Text>
                <AnimatedNumber value={18000} duration={900} style={styles.heroEarnings} />
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={{ height: 60 }} />
        <Text style={styles.footer}>
          編集 → 保存で即反映（Fast Refresh）
        </Text>
      </ScrollView>

      {/* Quick nav back to real screens */}
      <View style={styles.fab}>
        <TouchableOpacity
          style={styles.fabBtn}
          onPress={() => {
            if (typeof window !== 'undefined') window.location.href = '/role-select';
          }}
        >
          <Ionicons name="arrow-forward" size={18} color={Colors.white} />
          <Text style={styles.fabText}>実画面へ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: 120,
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xl,
  },
  eyebrow: {
    fontSize: FontSize.xs,
    fontWeight: '800',
    color: Colors.electricDeep,
    letterSpacing: 2.4,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: '900',
    color: Colors.textPrimary,
    letterSpacing: -1,
    marginTop: 4,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginTop: 6,
    fontWeight: '600',
  },
  titleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Colors.inkDeep,
    borderRadius: BorderRadius.full,
  },
  titleBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.electric,
    letterSpacing: 1.5,
  },

  // Gradients grid
  gridGradients: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  swatchWrap: {
    width: 110,
    alignItems: 'center',
  },
  swatch: {
    width: '100%',
    height: 64,
    borderRadius: BorderRadius.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  swatchLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 6,
    fontWeight: '700',
  },

  // Color chips
  gridColors: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  colorChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
    minWidth: 170,
    flexGrow: 1,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  colorDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  colorName: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.textPrimary,
    flex: 1,
  },
  colorHex: {
    fontSize: 10,
    color: Colors.textMuted,
    fontFamily: 'monospace',
  },

  // Buttons
  column: { gap: Spacing.md, marginBottom: Spacing.xl },
  buttonRow: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  variantLabel: {
    fontSize: FontSize.xs,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 1.6,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
  },
  buttonRowInner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    alignItems: 'center',
  },

  // Cards
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  demoCard: {
    minWidth: 240,
    flexGrow: 1,
    flexBasis: '47%',
    padding: Spacing.lg,
  },
  demoCardEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 2,
  },
  demoCardTitle: {
    fontSize: FontSize.lg,
    fontWeight: '800',
    color: Colors.white,
    marginTop: 8,
  },
  demoCardBody: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 6,
  },
  demoCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  demoCardPrice: {
    fontSize: FontSize.xl,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: -0.3,
  },

  // AnimatedNumber
  animatedNumberCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  animLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  animValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginTop: 4,
  },
  animValue: {
    fontSize: 36,
    fontWeight: '900',
    color: Colors.violet,
    fontVariant: ['tabular-nums'],
    letterSpacing: -1,
  },
  animUnit: {
    fontSize: FontSize.md,
    color: Colors.violet,
    fontWeight: '700',
  },
  animActions: { flexDirection: 'row', gap: 6 },
  animBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.full,
  },
  animBtnText: {
    color: Colors.white,
    fontWeight: '800',
    fontSize: FontSize.xs,
    letterSpacing: 0.5,
  },

  // Dots
  dotsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.lg,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  dotItem: { alignItems: 'center', gap: 6, minWidth: 60 },
  dotName: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontWeight: '600',
  },

  // Confetti
  confettiCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  confettiText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },

  // FadeInView
  fadeBar: {
    backgroundColor: Colors.card,
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.electric,
  },
  fadeBarText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
  },

  // Hero mocks
  heroMock: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    overflow: 'hidden',
    minHeight: 130,
  },
  heroOrb1: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0,212,255,0.18)',
  },
  heroOrb2: {
    position: 'absolute',
    bottom: -40,
    left: -40,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(139,92,246,0.18)',
  },
  heroGreeting: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
  },
  heroName: {
    fontSize: FontSize.xxl,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: -0.3,
    marginTop: 4,
  },
  heroOnline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'flex-start',
  },
  heroOnlineText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.white,
  },
  heroProRole: {
    fontSize: FontSize.xs,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 2.4,
  },
  heroEarningsRow: { marginTop: 12 },
  heroEarningsLabel: {
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  heroEarningsValueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    marginTop: 2,
  },
  heroYen: {
    fontSize: FontSize.lg,
    color: Colors.white,
    fontWeight: '800',
    marginBottom: 2,
  },
  heroEarnings: {
    fontSize: 32,
    color: Colors.white,
    fontWeight: '900',
    letterSpacing: -1,
    fontVariant: ['tabular-nums'],
  },

  // Footer + FAB
  footer: {
    textAlign: 'center',
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  fabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.inkDeep,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: BorderRadius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  fabText: {
    color: Colors.white,
    fontWeight: '800',
    fontSize: FontSize.sm,
  },
});
