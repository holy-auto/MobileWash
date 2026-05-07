import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  InteractionManager,
  Platform,
  Alert,
} from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors, Gradients, Spacing, FontSize, BorderRadius } from '@/constants/colors';
import { SERVICE_CATEGORIES } from '@/constants/categories';
import { MATCHING } from '@/constants/business-rules';
import { useAuth } from '../_layout';
import { preloadInterstitial } from '@/lib/admob';
import AdBanner from '@/components/AdBanner';
import AdMobBanner from '@/components/AdMobBanner';
import {
  FadeInView,
  GradientButton,
  PulsingDot,
  SectionHeader,
  AnimatedNumber,
} from '@/components/excitement';
import {
  getCurrentLocation,
  DEFAULT_LOCATION,
  type Coords,
} from '@/lib/location';
import { fetchRankedPros, rankPros, type ProRankData } from '@/lib/ranking';
import { PRO_BOOST, PRO_RANKING } from '@/constants/business-rules';
import { isSupabaseConfigured } from '@/lib/supabase';

// Google Maps API key required for MapView on Android.
// When not set the map is replaced with a placeholder so the app doesn't crash.
const MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAP_HEIGHT = 280;

// Fallback demo pros used only when Supabase is not configured.
const DEMO_PROS_RAW: ProRankData[] = [
  {
    id: '1',
    name: '田中 太郎',
    rating: 4.9,
    reviewCount: 127,
    distance: 0.8,
    responseRate: 0.98,
    completionRate: 0.99,
    createdAt: '2025-01-15',
    boostActive: true,
    boostExpiresAt: '2026-04-20T00:00:00Z',
    improvementStatus: null,
    speciality: '外装洗車',
    latitude: 35.6842,
    longitude: 139.7645,
  },
  {
    id: '2',
    name: '佐藤 健一',
    rating: 4.8,
    reviewCount: 89,
    distance: 1.2,
    responseRate: 0.95,
    completionRate: 0.97,
    createdAt: '2025-06-10',
    boostActive: false,
    improvementStatus: null,
    speciality: 'コーティング',
    latitude: 35.6795,
    longitude: 139.7710,
  },
  {
    id: '3',
    name: '鈴木 美咲',
    rating: 5.0,
    reviewCount: 64,
    distance: 2.1,
    responseRate: 1.0,
    completionRate: 1.0,
    createdAt: '2026-03-20',
    boostActive: false,
    improvementStatus: null,
    speciality: 'フルディテイル',
    latitude: 35.6762,
    longitude: 139.7580,
  },
];

type DisplayPro = ProRankData & { eta: string };

function withEta(pros: ProRankData[]): DisplayPro[] {
  return pros.map((pro) => ({
    ...pro,
    eta: `${Math.round(pro.distance * 4)}分`,
  }));
}

const CATEGORY_ICONS: Record<string, string> = {
  exterior: 'car-wash',
  interior: 'car-seat',
  coating: 'shield-check',
  polish: 'auto-fix',
  full_detail: 'star-circle',
  engine: 'engine',
};

export default function CustomerHome() {
  const router = useRouter();
  const { user, isGuest, requireAuth } = useAuth();
  const mapRef = useRef<MapView>(null);
  const userName = isGuest
    ? 'ゲスト'
    : user?.user_metadata?.full_name ||
      user?.user_metadata?.name ||
      user?.email?.split('@')[0] ||
      'ユーザー';

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<Coords>(DEFAULT_LOCATION);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [selectedProId, setSelectedProId] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [pros, setPros] = useState<DisplayPro[]>(() =>
    withEta(rankPros(DEMO_PROS_RAW)),
  );

  useEffect(() => {
    (async () => {
      const coords = await getCurrentLocation(async () => {
        // Android: show Japanese rationale before the system permission dialog
        await new Promise<void>((resolve) => {
          Alert.alert(
            '位置情報の使用',
            '近くのプロを表示するために現在地を使用します。',
            [{ text: 'OK', onPress: resolve }],
          );
        });
      });
      setUserLocation(coords);
      setLoadingLocation(false);

      // Fetch ranked pros from Supabase once we have the user's location
      if (isSupabaseConfigured) {
        try {
          const ranked = await fetchRankedPros(
            coords.latitude,
            coords.longitude,
            MATCHING.BASE_RADIUS_KM,
          );
          const withCoords = ranked.filter(
            (p) => typeof p.latitude === 'number' && typeof p.longitude === 'number',
          );
          if (withCoords.length > 0) {
            setPros(withEta(withCoords));
          }
        } catch {
          // Keep demo pros on failure
        }
      }
    })();
    preloadInterstitial();
  }, []);

  // Defer map rendering until navigation transition completes for smoother UX
  useEffect(() => {
    const handle = InteractionManager.runAfterInteractions(() => {
      setMapReady(true);
    });
    return () => handle.cancel();
  }, []);

  const handleCallPro = () => {
    if (!requireAuth()) return;
    // Pass current location to booking flow
    router.push({
      pathname: '/customer/booking/select-menu',
      params: {
        lat: userLocation.latitude.toString(),
        lng: userLocation.longitude.toString(),
      },
    });
  };

  const handleScheduleBooking = () => {
    if (!requireAuth()) return;
    router.push('/customer/booking/schedule' as any);
  };

  const handleSubscription = () => {
    if (!requireAuth()) return;
    router.push('/customer/subscription' as any);
  };

  const handleRecenter = () => {
    mapRef.current?.animateToRegion(
      {
        ...userLocation,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
      },
      500
    );
  };

  const handleProMarkerPress = (proId: string) => {
    setSelectedProId(selectedProId === proId ? null : proId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero header — gradient band with greeting + decorative orbs */}
        <LinearGradient
          colors={Gradients.heroNavy as unknown as readonly [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroBand}
        >
          {/* Decorative orbs */}
          <View style={styles.orbA} pointerEvents="none" />
          <View style={styles.orbB} pointerEvents="none" />
          <View style={styles.orbC} pointerEvents="none" />

          <FadeInView style={styles.header}>
            <View>
              <Text style={styles.greeting}>こんにちは ✨</Text>
              <Text style={styles.userName}>{userName} さん</Text>
              <View style={styles.heroOnlineRow}>
                <PulsingDot color={Colors.electric} size={8} />
                <Text style={styles.heroOnlineText}>
                  <AnimatedNumber value={pros.length} />
                  名のプロが今オンライン
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={Colors.white}
              />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </FadeInView>
        </LinearGradient>

        {/* Map */}
        <View style={styles.mapContainer}>
          {loadingLocation || !mapReady ? (
            <View style={styles.mapLoading}>
              <ActivityIndicator size="large" color={Colors.primary} />
              <Text style={styles.mapLoadingText}>
                {loadingLocation ? '位置情報を取得中...' : '地図を読み込み中...'}
              </Text>
            </View>
          ) : !MAPS_API_KEY && Platform.OS === 'android' ? (
            /* Placeholder when Google Maps API key is not configured */
            <View style={styles.mapPlaceholder}>
              <MaterialCommunityIcons name="map-outline" size={48} color={Colors.primarySoft} />
              <Text style={styles.mapPlaceholderText}>地図を表示するには</Text>
              <Text style={styles.mapPlaceholderSub}>
                EXPO_PUBLIC_GOOGLE_MAPS_API_KEY を設定してください
              </Text>
            </View>
          ) : (
            <MapView
              ref={mapRef}
              style={styles.map}
              provider={undefined}
              initialRegion={{
                ...userLocation,
                latitudeDelta: 0.025,
                longitudeDelta: 0.025,
              }}
              showsUserLocation
              showsMyLocationButton={false}
              mapPadding={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
              {/* 15km matching radius circle */}
              <Circle
                center={userLocation}
                radius={MATCHING.BASE_RADIUS_KM * 1000}
                strokeColor={Colors.primarySoft + '40'}
                fillColor={Colors.primaryFaint + '20'}
                strokeWidth={1}
              />

              {/* Pro markers */}
              {pros.map((pro) => pro.latitude !== undefined && pro.longitude !== undefined && (
                <Marker
                  key={pro.id}
                  coordinate={{
                    latitude: pro.latitude,
                    longitude: pro.longitude,
                  }}
                  onPress={() => handleProMarkerPress(pro.id)}
                  anchor={{ x: 0.5, y: 0.5 }}
                >
                  <View
                    style={[
                      styles.proMarker,
                      selectedProId === pro.id && styles.proMarkerSelected,
                    ]}
                  >
                    <Ionicons
                      name="construct"
                      size={16}
                      color={
                        selectedProId === pro.id
                          ? Colors.white
                          : Colors.primary
                      }
                    />
                  </View>
                </Marker>
              ))}
            </MapView>
          )}

          {/* Recenter button */}
          <TouchableOpacity
            style={styles.recenterButton}
            onPress={handleRecenter}
          >
            <Ionicons name="navigate" size={20} color={Colors.primary} />
          </TouchableOpacity>

          {/* Online count badge */}
          <View style={styles.onlineCountBadge}>
            <PulsingDot color={Colors.success} size={8} />
            <Text style={styles.onlineCountText}>
              {pros.length}名のプロがオンライン
            </Text>
          </View>
        </View>

        {/* Categories */}
        <FadeInView delay={120} style={styles.section}>
          <SectionHeader title="サービスを選ぶ" eyebrow="WHAT'S TODAY?" variant="skyPop" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {SERVICE_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === cat.id && styles.categoryChipActive,
                ]}
                onPress={() =>
                  setSelectedCategory(
                    selectedCategory === cat.id ? null : cat.id
                  )
                }
              >
                <MaterialCommunityIcons
                  name={CATEGORY_ICONS[cat.id] as any}
                  size={18}
                  color={
                    selectedCategory === cat.id ? Colors.white : Colors.primary
                  }
                />
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === cat.id &&
                      styles.categoryChipTextActive,
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </FadeInView>

        {/* パートナー広告 — ホーム上部 */}
        <AdBanner placement="home_top" />

        {/* Nearby Pros */}
        <FadeInView delay={200} style={styles.section}>
          <SectionHeader
            title="近くのプロ"
            eyebrow="NEARBY PROS"
            variant="aurora"
            trailing={
              <TouchableOpacity>
                <Text style={styles.seeAll}>すべて見る ›</Text>
              </TouchableOpacity>
            }
          />

          {pros.map((pro, idx) => (
            <FadeInView key={pro.id} delay={220 + idx * 80}>
            <TouchableOpacity
              style={[
                styles.proCard,
                selectedProId === pro.id && styles.proCardSelected,
              ]}
              activeOpacity={0.85}
              onPress={() => {
                setSelectedProId(pro.id);
                if (pro.latitude !== undefined && pro.longitude !== undefined) {
                  mapRef.current?.animateToRegion(
                    {
                      latitude: pro.latitude,
                      longitude: pro.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    },
                    500
                  );
                }
              }}
            >
              <View style={styles.proAvatar}>
                <Ionicons name="person" size={24} color={Colors.primaryMedium} />
                <View style={styles.onlineDot} />
              </View>
              <View style={styles.proInfo}>
                <View style={styles.proNameRow}>
                  <Text style={styles.proName}>{pro.name}</Text>
                  {(pro.badges ?? []).map((badge) => (
                    <View
                      key={badge}
                      style={[
                        styles.proBadge,
                        {
                          backgroundColor:
                            badge === PRO_BOOST.BADGE_TEXT
                              ? PRO_BOOST.BADGE_COLOR + '20'
                              : badge === '新人'
                              ? '#EFF6FF'
                              : Colors.primaryFaint,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.proBadgeText,
                          {
                            color:
                              badge === PRO_BOOST.BADGE_TEXT
                                ? PRO_BOOST.BADGE_COLOR
                                : badge === '新人'
                                ? '#3B82F6'
                                : Colors.primary,
                          },
                        ]}
                      >
                        {badge}
                      </Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.proSpeciality}>{pro.speciality}</Text>
                <View style={styles.proMeta}>
                  <Ionicons name="star" size={14} color={Colors.gold} />
                  <Text style={styles.proRating}>
                    {pro.rating} ({pro.reviewCount})
                  </Text>
                  <Text style={styles.proDivider}>|</Text>
                  <Ionicons
                    name="location-outline"
                    size={14}
                    color={Colors.textMuted}
                  />
                  <Text style={styles.proDistance}>{pro.distance.toFixed(1)}km</Text>
                </View>
              </View>
              <LinearGradient
                colors={Gradients.brandCta as unknown as readonly [string, string, ...string[]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.proEta}
              >
                <Text style={styles.proEtaTime}>{pro.eta}</Text>
                <Text style={styles.proEtaLabel}>到着</Text>
              </LinearGradient>
            </TouchableOpacity>
            </FadeInView>
          ))}
        </FadeInView>
      </ScrollView>

      {/* AdMob バナー広告 */}
      <AdMobBanner size="ANCHORED_ADAPTIVE_BANNER" />

      {/* Bottom action bar — 3 buttons horizontal */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.sideButton}
          activeOpacity={0.85}
          onPress={handleScheduleBooking}
        >
          <Ionicons name="calendar-outline" size={18} color={Colors.primary} />
          <Text style={styles.sideButtonText}>日時予約</Text>
        </TouchableOpacity>

        <GradientButton
          label="プロを呼ぶ"
          icon="car-sport"
          variant="brandCta"
          size="lg"
          onPress={handleCallPro}
          style={styles.mainButtonWrap}
        />

        <TouchableOpacity
          style={styles.sideButton}
          activeOpacity={0.85}
          onPress={handleSubscription}
        >
          <Ionicons name="repeat-outline" size={18} color={Colors.mint} />
          <Text style={[styles.sideButtonText, { color: Colors.mint }]}>定期コース</Text>
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
  scrollContent: {
    paddingBottom: 100,
  },
  // Hero band (gradient)
  heroBand: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg + 6,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
  },
  orbA: {
    position: 'absolute',
    top: -60,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(0,212,255,0.16)',
  },
  orbB: {
    position: 'absolute',
    bottom: -50,
    left: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(139,92,246,0.18)',
  },
  orbC: {
    position: 'absolute',
    top: 30,
    left: '40%',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(236,72,153,0.10)',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  userName: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.3,
    marginTop: 2,
  },
  heroOnlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.10)',
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  heroOnlineText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.3,
  },
  notificationButton: {
    position: 'relative',
    padding: Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.hotPink,
  },

  // Map
  mapContainer: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    height: MAP_HEIGHT,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapLoading: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.primaryFaint,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
  },
  mapLoadingText: {
    fontSize: FontSize.sm,
    color: Colors.primaryMedium,
    marginTop: Spacing.sm,
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.primaryFaint,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
    gap: Spacing.xs,
  },
  mapPlaceholderText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.primaryMedium,
  },
  mapPlaceholderSub: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
  },
  recenterButton: {
    position: 'absolute',
    bottom: Spacing.md,
    right: Spacing.md,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadowDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 4,
  },
  onlineCountBadge: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.full,
    gap: 6,
    shadowColor: Colors.shadowDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  onlinePulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  onlineCountText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.textPrimary,
  },

  // Pro Markers
  proMarker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
    shadowColor: Colors.shadowDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  proMarkerSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryLight,
    transform: [{ scale: 1.2 }],
  },

  // Sections
  section: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  seeAll: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },

  // Categories
  categoryScroll: {
    gap: Spacing.sm,
    paddingRight: Spacing.lg,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primaryFaint,
    gap: 6,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
  },
  categoryChipText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.primary,
  },
  categoryChipTextActive: {
    color: Colors.white,
  },

  // Pro Cards
  proCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  proCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryFaint,
  },
  proAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primaryFaint,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  proInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  proNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  proName: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  proBadge: {
    paddingVertical: 1,
    paddingHorizontal: 6,
    borderRadius: BorderRadius.full,
  },
  proBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  proSpeciality: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  proMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  proRating: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  proDivider: {
    color: Colors.textMuted,
    marginHorizontal: 2,
  },
  proDistance: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  proEta: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    shadowColor: Colors.electricDeep,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  proEtaTime: {
    fontSize: FontSize.lg,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: 0.3,
  },
  proEtaLabel: {
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.92)',
    fontWeight: '700',
  },

  // Bottom action bar
  bottomBar: {
    position: 'absolute',
    bottom: 30,
    left: Spacing.md,
    right: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  sideButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: BorderRadius.lg,
    gap: 4,
    shadowColor: Colors.shadowDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    minWidth: 72,
  },
  sideButtonText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.primary,
  },
  mainButtonWrap: {
    flex: 1,
  },
});
