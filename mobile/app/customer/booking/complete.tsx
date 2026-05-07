import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Gradients, Spacing, FontSize, BorderRadius } from '@/constants/colors';
import { COMPLETION } from '@/constants/business-rules';
import { showInterstitial, preloadInterstitial } from '@/lib/admob';
import AdBanner from '@/components/AdBanner';
import RewardedAdButton from '@/components/RewardedAdButton';
import { saveCoupon } from '@/lib/coupons';
import { shouldTriggerAudit, createAuditRequest } from '@/lib/quality-audit';
import { useAuth } from '../../_layout';
import {
  AnimatedNumber,
  ConfettiBurst,
  FadeInView,
  GradientButton,
} from '@/components/excitement';

export default function CompleteScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const params = useLocalSearchParams<{
    proName: string;
    totalPrice: string;
    orderId: string;
    proId: string;
    autoCompleted: string;
  }>();

  const totalPrice = parseInt(params.totalPrice ?? '0', 10);
  const isAutoCompleted = params.autoCompleted === 'true';

  useEffect(() => {
    if (params.orderId && params.proId && user?.id) {
      shouldTriggerAudit(params.proId).then((should) => {
        if (should) createAuditRequest(params.orderId, user.id!, params.proId);
      });
    }
  }, []);

  // サービス完了後にインタースティシャル広告を表示
  useEffect(() => {
    preloadInterstitial();
    // 少し間を置いてから表示（完了画面を見せてから）
    const timer = setTimeout(() => {
      showInterstitial();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleRewardEarned = async (amount: number) => {
    if (!user?.id) return;
    await saveCoupon({
      customerId: user.id,
      amount,
      source: 'rewarded_ad',
      type: 'fixed',
    });
  };

  const handleReview = () => {
    router.replace({
      pathname: '/customer/booking/review',
      params: {
        proName: params.proName,
        orderId: params.orderId,
      },
    });
  };

  const handleDispute = () => {
    router.dismissAll();
  };

  const handleDone = () => {
    router.dismissAll();
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isAutoCompleted && <ConfettiBurst count={42} duration={2000} originY={180} />}
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero success card */}
        <FadeInView>
          <LinearGradient
            colors={
              (isAutoCompleted ? Gradients.brandCta : Gradients.sunset) as unknown as readonly [
                string,
                string,
                ...string[]
              ]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <View style={styles.heroSheen} pointerEvents="none" />
            <View style={styles.iconCircle}>
              <Ionicons name="checkmark-done" size={56} color={Colors.white} />
            </View>
            <Text style={styles.title}>
              {isAutoCompleted ? '自動完了しました' : 'サービス完了！'}
            </Text>
            {isAutoCompleted ? (
              <Text style={styles.autoNote}>
                {COMPLETION.CONFIRMATION_TIMEOUT_MIN}分以内に確認がなかったため自動完了しました
              </Text>
            ) : (
              <Text style={styles.celebrate}>愛車がピカピカに ✨</Text>
            )}
            <Text style={styles.proName}>{params.proName}</Text>
          </LinearGradient>
        </FadeInView>

        {/* Summary */}
        <FadeInView delay={150} style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>お支払い金額</Text>
            <AnimatedNumber
              value={totalPrice}
              duration={1100}
              prefix="¥"
              style={styles.summaryValue}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>ステータス</Text>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusBadgeText}>決済完了</Text>
            </View>
          </View>
        </FadeInView>

        {/* Actions */}
        <FadeInView delay={250} style={styles.actions}>
          <GradientButton
            label="レビューを書く"
            icon="star"
            variant="gold"
            size="lg"
            onPress={handleReview}
          />

          <RewardedAdButton onRewardEarned={handleRewardEarned} />

          <AdBanner placement="order_complete" />

          <TouchableOpacity style={styles.disputeBtn} onPress={handleDispute}>
            <Ionicons name="alert-circle-outline" size={18} color={Colors.error} />
            <Text style={styles.disputeBtnText}>
              問題を報告（{COMPLETION.DISPUTE_WINDOW_HOURS}時間以内）
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.doneBtn} onPress={handleDone}>
            <Text style={styles.doneBtnText}>ホームに戻る</Text>
          </TouchableOpacity>
        </FadeInView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },

  // Hero
  heroCard: {
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: Colors.hotPink,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.32,
    shadowRadius: 22,
    elevation: 10,
  },
  heroSheen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxl + 2,
    fontWeight: '900',
    color: Colors.white,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  celebrate: {
    fontSize: FontSize.md,
    color: 'rgba(255,255,255,0.95)',
    fontWeight: '700',
    marginTop: 6,
    letterSpacing: 0.4,
  },
  autoNote: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  proName: {
    fontSize: FontSize.lg,
    color: Colors.white,
    fontWeight: '700',
    marginTop: Spacing.sm,
  },

  // Summary
  summaryCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginTop: Spacing.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  summaryLabel: { fontSize: FontSize.md, color: Colors.textSecondary, fontWeight: '600' },
  summaryValue: {
    fontSize: FontSize.xxl,
    fontWeight: '900',
    color: Colors.textPrimary,
    fontVariant: ['tabular-nums'],
    letterSpacing: -0.3,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 6,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success + '18',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.full,
    gap: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Colors.success,
  },
  statusBadgeText: { fontSize: FontSize.sm, fontWeight: '700', color: Colors.success },

  // Actions
  actions: { width: '100%', marginTop: Spacing.lg, gap: Spacing.md },
  disputeBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.error,
    paddingVertical: 12,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  disputeBtnText: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.error },
  doneBtn: { alignItems: 'center', paddingVertical: Spacing.md },
  doneBtnText: { fontSize: FontSize.md, fontWeight: '600', color: Colors.textMuted },
});
