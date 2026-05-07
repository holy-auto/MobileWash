import { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Gradients, Spacing, FontSize, BorderRadius } from '@/constants/colors';
import {
  AnimatedNumber,
  FadeInView,
  PulsingDot,
  SectionHeader,
} from '@/components/excitement';
import { useAuth } from '../_layout';
import { signOut } from '@/lib/auth';
import {
  getCurrentLocation,
  watchPosition,
  updateProLocation,
  setProOnlineStatus,
  type Coords,
} from '@/lib/location';
import { BUSINESS_HOURS } from '@/constants/business-rules';

/** 現在時刻が営業時間内かどうか */
function isWithinBusinessHours(): boolean {
  const now = new Date();
  // JST offset: UTC+9
  const jstHour = (now.getUTCHours() + 9) % 24;
  return jstHour >= BUSINESS_HOURS.OPEN_HOUR && jstHour < BUSINESS_HOURS.CLOSE_HOUR;
}

/** 営業終了までのミリ秒を返す（営業時間外なら0） */
function msUntilClose(): number {
  const now = new Date();
  const jstMs = now.getTime() + 9 * 60 * 60 * 1000;
  const jstDate = new Date(jstMs);
  const closeToday = new Date(jstDate);
  closeToday.setUTCHours(BUSINESS_HOURS.CLOSE_HOUR, 0, 0, 0);
  const diff = closeToday.getTime() - jstDate.getTime();
  return diff > 0 ? diff : 0;
}

/** 営業時間を "HH:00〜HH:00" 形式で返す */
function formatBusinessHours(): string {
  const open = String(BUSINESS_HOURS.OPEN_HOUR).padStart(2, '0');
  const close = String(BUSINESS_HOURS.CLOSE_HOUR).padStart(2, '0');
  return `${open}:00〜${close}:00`;
}

const MOCK_STATS = {
  todayEarnings: 18000,
  todayJobs: 3,
  monthEarnings: 342000,
  monthJobs: 28,
  rating: 4.9,
  totalReviews: 127,
};

const MOCK_RECENT_JOBS = [
  {
    id: '1',
    customer: '山田 様',
    service: '手洗い洗車',
    price: 3000,
    time: '10:30',
    status: 'completed',
  },
  {
    id: '2',
    customer: '高橋 様',
    service: 'ガラスコーティング',
    price: 15000,
    time: '13:00',
    status: 'in_progress',
  },
];

export default function ProHome() {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(false);
  const [currentCoords, setCurrentCoords] = useState<Coords | null>(null);
  const watchRef = useRef<{ remove: () => void } | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const proId = user?.id;

  const userName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    'プロ';

  /** GPS停止 + オフライン化の共通処理 */
  const goOffline = useCallback(async () => {
    watchRef.current?.remove();
    watchRef.current = null;
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setCurrentCoords(null);
    setIsOnline(false);
    if (proId) await setProOnlineStatus(proId, false);
  }, [proId]);

  /** 営業終了時刻に自動OFFするタイマーをセット */
  const scheduleAutoOff = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    const remaining = msUntilClose();
    if (remaining <= 0) return;

    closeTimerRef.current = setTimeout(() => {
      goOffline();
      Alert.alert(
        '営業時間終了',
        `${formatBusinessHours()} の営業時間が終了したため、自動的にオフラインになりました。`,
      );
    }, remaining);
  }, [goOffline]);

  const handleToggleOnline = useCallback(
    async (value: boolean) => {
      if (!proId) return;

      if (value) {
        // 営業時間チェック
        if (BUSINESS_HOURS.BLOCK_OUTSIDE_HOURS && !isWithinBusinessHours()) {
          Alert.alert(
            '営業時間外',
            `受付可能な時間は ${formatBusinessHours()} です。\n営業時間内にONにしてください。`,
          );
          return;
        }

        try {
          const coords = await getCurrentLocation();
          setCurrentCoords(coords);

          await setProOnlineStatus(proId, true, coords);

          watchRef.current = watchPosition((newCoords) => {
            setCurrentCoords(newCoords);
            updateProLocation(proId, newCoords);
          }, 5000);

          setIsOnline(true);

          // 営業終了時に自動OFFタイマー
          if (BUSINESS_HOURS.AUTO_OFF_AT_CLOSE) {
            scheduleAutoOff();
          }
        } catch {
          Alert.alert('位置情報エラー', 'GPSの取得に失敗しました。設定を確認してください。');
        }
      } else {
        await goOffline();
      }
    },
    [proId, goOffline, scheduleAutoOff]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      watchRef.current?.remove();
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      if (proId && isOnline) {
        setProOnlineStatus(proId, false);
      }
    };
  }, [proId, isOnline]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero earnings header */}
        <FadeInView>
          <LinearGradient
            colors={Gradients.gold as unknown as readonly [string, string, ...string[]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.proHero}
          >
            <View style={styles.proHeroSheen} pointerEvents="none" />
            <View style={styles.header}>
              <View>
                <Text style={styles.role}>★ PRO MODE</Text>
                <Text style={styles.greeting}>{userName}</Text>
              </View>
              <TouchableOpacity
                style={styles.logoutBtn}
                onPress={() => signOut()}
              >
                <Ionicons name="log-out-outline" size={22} color={Colors.white} />
              </TouchableOpacity>
            </View>

            <View style={styles.heroEarningsRow}>
              <View>
                <Text style={styles.heroEarningsLabel}>本日の売上</Text>
                <View style={styles.heroEarningsValueRow}>
                  <Text style={styles.heroYen}>¥</Text>
                  <AnimatedNumber
                    value={MOCK_STATS.todayEarnings}
                    duration={1100}
                    style={styles.heroEarningsValue}
                  />
                </View>
                <Text style={styles.heroEarningsHint}>
                  今月累計 ¥{(MOCK_STATS.monthEarnings / 10000).toFixed(1)}万 / {MOCK_STATS.monthJobs}件
                </Text>
              </View>
              <View style={styles.heroRating}>
                <Ionicons name="star" size={16} color={Colors.white} />
                <Text style={styles.heroRatingText}>{MOCK_STATS.rating}</Text>
              </View>
            </View>
          </LinearGradient>
        </FadeInView>

        {/* GPS Online Toggle */}
        <FadeInView delay={120} style={[styles.gpsCard, isOnline && styles.gpsCardOnline]}>
          <View style={styles.gpsInfo}>
            {isOnline ? (
              <PulsingDot color={Colors.mint} size={12} />
            ) : (
              <View style={[styles.gpsIndicator, { backgroundColor: Colors.textMuted }]} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={[styles.gpsTitle, isOnline && styles.gpsTitleOnline]}>
                {isOnline ? '出張受付中' : 'オフライン'}
              </Text>
              <Text style={[styles.gpsSubtitle, isOnline && styles.gpsSubtitleOnline]}>
                {isOnline
                  ? 'GPS ON — お客さまからの依頼を受付中'
                  : `受付時間 ${formatBusinessHours()} — ONにして依頼を受けましょう`}
              </Text>
            </View>
          </View>
          <Switch
            value={isOnline}
            onValueChange={handleToggleOnline}
            trackColor={{
              false: Colors.border,
              true: Colors.mint,
            }}
            thumbColor={isOnline ? Colors.white : Colors.textMuted}
          />
        </FadeInView>

        {/* GPS Coordinates */}
        {isOnline && currentCoords && (
          <View style={styles.coordsRow}>
            <Ionicons name="navigate" size={14} color={Colors.primaryMedium} />
            <Text style={styles.coordsText}>
              {currentCoords.latitude.toFixed(4)}, {currentCoords.longitude.toFixed(4)}
            </Text>
          </View>
        )}

        {/* Today's Stats */}
        <FadeInView delay={200} style={styles.statsGrid}>
          <View style={[styles.statCard, styles.statCardAccent]}>
            <Ionicons name="briefcase" size={18} color={Colors.electricDeep} />
            <Text style={styles.statValue}>{MOCK_STATS.todayJobs}</Text>
            <Text style={styles.statLabel}>本日の件数</Text>
          </View>
          <View style={[styles.statCard, styles.statCardAccent]}>
            <Ionicons name="trending-up" size={18} color={Colors.mint} />
            <Text style={styles.statValue}>
              ¥{(MOCK_STATS.monthEarnings / 10000).toFixed(1)}万
            </Text>
            <Text style={styles.statLabel}>今月の売上</Text>
          </View>
          <View style={[styles.statCard, styles.statCardAccent]}>
            <Ionicons name="people" size={18} color={Colors.violet} />
            <Text style={styles.statValue}>{MOCK_STATS.totalReviews}</Text>
            <Text style={styles.statLabel}>レビュー数</Text>
          </View>
          <View style={[styles.statCard, styles.statCardAccent]}>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color={Colors.warning} />
              <Text style={styles.statValue}>{MOCK_STATS.rating}</Text>
            </View>
            <Text style={styles.statLabel}>平均評価</Text>
          </View>
        </FadeInView>

        {/* Recent Jobs */}
        <FadeInView delay={280} style={styles.section}>
          <SectionHeader title="本日の作業" eyebrow="TODAY'S JOBS" variant="gold" />
          {MOCK_RECENT_JOBS.map((job) => (
            <View key={job.id} style={styles.jobCard}>
              <View style={styles.jobTime}>
                <Text style={styles.jobTimeText}>{job.time}</Text>
              </View>
              <View style={styles.jobInfo}>
                <Text style={styles.jobCustomer}>{job.customer}</Text>
                <Text style={styles.jobService}>{job.service}</Text>
              </View>
              <View style={styles.jobRight}>
                <Text style={styles.jobPrice}>
                  ¥{job.price.toLocaleString()}
                </Text>
                <View
                  style={[
                    styles.jobStatus,
                    {
                      backgroundColor:
                        job.status === 'completed'
                          ? Colors.primaryFaint
                          : Colors.goldLight + '40',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.jobStatusText,
                      {
                        color:
                          job.status === 'completed'
                            ? Colors.primary
                            : Colors.gold,
                      },
                    ]}
                  >
                    {job.status === 'completed' ? '完了' : '作業中'}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </FadeInView>
      </ScrollView>
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
    paddingBottom: Spacing.xxl,
  },
  // Pro hero (gradient gold)
  proHero: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.32,
    shadowRadius: 18,
    elevation: 6,
  },
  proHeroSheen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: FontSize.xxl,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: -0.3,
    marginTop: 2,
  },
  role: {
    fontSize: FontSize.xs,
    color: Colors.white,
    fontWeight: '800',
    letterSpacing: 2.4,
  },
  logoutBtn: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  heroEarningsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: Spacing.lg,
  },
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
    marginTop: 4,
    gap: 4,
  },
  heroYen: {
    fontSize: FontSize.xl,
    color: Colors.white,
    fontWeight: '800',
    marginBottom: 4,
  },
  heroEarningsValue: {
    fontSize: 40,
    color: Colors.white,
    fontWeight: '900',
    letterSpacing: -1,
    fontVariant: ['tabular-nums'],
  },
  heroEarningsHint: {
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
    fontWeight: '600',
  },
  heroRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.22)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  heroRatingText: {
    color: Colors.white,
    fontWeight: '900',
    fontSize: FontSize.md,
  },
  gpsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
  },
  gpsCardOnline: {
    borderColor: Colors.mint,
    backgroundColor: '#ECFDF5',
    shadowColor: Colors.mint,
    shadowOpacity: 0.25,
  },
  gpsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Spacing.md,
  },
  gpsIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  gpsTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  gpsTitleOnline: {
    color: '#047857',
  },
  gpsSubtitle: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  gpsSubtitleOnline: {
    color: '#059669',
  },
  coordsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  coordsText: {
    fontSize: FontSize.xs,
    color: Colors.primaryMedium,
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  statCard: {
    width: '48%',
    backgroundColor: Colors.card,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
    flexGrow: 1,
    flexBasis: '47%',
    gap: 2,
  },
  statCardAccent: {
    borderTopWidth: 3,
    borderTopColor: Colors.electric,
  },
  statValue: {
    fontSize: FontSize.xxl - 2,
    fontWeight: '900',
    color: Colors.textPrimary,
    letterSpacing: -0.3,
    marginTop: 4,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  section: {
    marginTop: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  jobCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  jobTime: {
    backgroundColor: Colors.primaryFaint,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
  },
  jobTimeText: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: Colors.primary,
  },
  jobInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  jobCustomer: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  jobService: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  jobRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  jobPrice: {
    fontSize: FontSize.md,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  jobStatus: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: BorderRadius.full,
  },
  jobStatusText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
});
