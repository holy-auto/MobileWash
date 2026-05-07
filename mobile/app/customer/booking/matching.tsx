import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Gradients, Spacing, FontSize, BorderRadius } from '@/constants/colors';
import { MATCHING } from '@/constants/business-rules';
import { ConfettiBurst, FadeInView } from '@/components/excitement';

export default function MatchingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    proId: string;
    proName: string;
    totalPrice: string;
    paymentMethod: string;
    orderId: string;
  }>();

  const [status, setStatus] = useState<'searching' | 'expanded' | 'accepted' | 'no_match'>('searching');
  const [countdown, setCountdown] = useState<number>(MATCHING.ACCEPTANCE_TIMEOUT_SEC);
  const [radius, setRadius] = useState<number>(MATCHING.BASE_RADIUS_KM);

  // Pulsing rings (3 staggered rings, ripple-out radar style)
  const ringAnims = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;
  // Rotating sweep arm
  const sweepAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Stagger ring pulses
    const loops = ringAnims.map((v, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 700),
          Animated.timing(v, {
            toValue: 1,
            duration: 2100,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(v, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      )
    );
    loops.forEach((l) => l.start());

    const sweepLoop = Animated.loop(
      Animated.timing(sweepAnim, {
        toValue: 1,
        duration: 2400,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    sweepLoop.start();

    return () => {
      loops.forEach((l) => l.stop());
      sweepLoop.stop();
    };
  }, []);

  // Countdown timer
  useEffect(() => {
    if (status !== 'searching' && status !== 'expanded') return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (status === 'searching') {
            handleNoMatchInRange();
          } else {
            setStatus('no_match');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  // Simulate pro accepting after some time
  useEffect(() => {
    const acceptTimeout = setTimeout(() => {
      if (status === 'searching' || status === 'expanded') {
        setStatus('accepted');
        setTimeout(() => {
          router.replace({
            pathname: '/customer/booking/tracking',
            params: {
              proName: params.proName ?? '田中 太郎',
              totalPrice: params.totalPrice,
              paymentMethod: params.paymentMethod,
              orderId: params.orderId,
            },
          });
        }, 1800);
      }
    }, 5000);

    return () => clearTimeout(acceptTimeout);
  }, [status]);

  const handleNoMatchInRange = () => {
    Alert.alert(
      '周辺にプロが見つかりません',
      `現在${MATCHING.BASE_RADIUS_KM}km圏内に対応可能なプロがいません。\n検索範囲を${MATCHING.EXPANDED_RADIUS_KM}kmに拡大しますか？`,
      [
        {
          text: 'キャンセル',
          style: 'cancel',
          onPress: () => {
            setStatus('no_match');
          },
        },
        {
          text: '拡大する',
          onPress: () => {
            setStatus('expanded');
            setRadius(MATCHING.EXPANDED_RADIUS_KM);
            setCountdown(MATCHING.ACCEPTANCE_TIMEOUT_SEC);
          },
        },
      ]
    );
  };

  const handleCancel = () => {
    Alert.alert('依頼をキャンセル', 'プロ承認前のため無料でキャンセルできます。', [
      { text: '戻る', style: 'cancel' },
      {
        text: 'キャンセルする',
        style: 'destructive',
        onPress: () => router.dismissAll(),
      },
    ]);
  };

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  const sweepRotate = sweepAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Gradients.heroNavy as unknown as readonly [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {/* decorative orbs */}
      <View style={styles.orb1} pointerEvents="none" />
      <View style={styles.orb2} pointerEvents="none" />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.content}>
          {status === 'accepted' ? (
            <>
              <ConfettiBurst count={28} duration={1600} originY={260} />
              <FadeInView style={styles.acceptedContainer}>
                <LinearGradient
                  colors={Gradients.mint as unknown as readonly [string, string, ...string[]]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.acceptedCircle}
                >
                  <Ionicons name="checkmark" size={64} color={Colors.white} />
                </LinearGradient>
                <Text style={styles.acceptedTitle}>プロが承認しました！</Text>
                <Text style={styles.acceptedName}>{params.proName}</Text>
                <Text style={styles.acceptedSub}>まもなく移動を開始します</Text>
              </FadeInView>
            </>
          ) : status === 'no_match' ? (
            <FadeInView style={styles.noMatchContainer}>
              <Ionicons name="sad-outline" size={64} color="rgba(255,255,255,0.7)" />
              <Text style={styles.noMatchTitle}>
                対応可能なプロが見つかりませんでした
              </Text>
              <Text style={styles.noMatchSub}>
                時間帯を変えて再度お試しください
              </Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={() => router.dismissAll()}
              >
                <LinearGradient
                  colors={Gradients.brandCta as unknown as readonly [string, string, ...string[]]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.retryGradient}
                >
                  <Text style={styles.retryButtonText}>ホームに戻る</Text>
                </LinearGradient>
              </TouchableOpacity>
            </FadeInView>
          ) : (
            <>
              {/* Radar */}
              <View style={styles.searchContainer}>
                {/* Outer rings */}
                {ringAnims.map((v, i) => (
                  <Animated.View
                    key={i}
                    style={[
                      styles.ring,
                      {
                        opacity: v.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.55, 0],
                        }),
                        transform: [
                          {
                            scale: v.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0.4, 1.5],
                            }),
                          },
                        ],
                      },
                    ]}
                  />
                ))}

                {/* Sweeping arm */}
                <Animated.View
                  style={[
                    styles.sweepWrap,
                    { transform: [{ rotate: sweepRotate }] },
                  ]}
                  pointerEvents="none"
                >
                  <LinearGradient
                    colors={['rgba(0,212,255,0)', 'rgba(0,212,255,0.55)']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.sweepArm}
                  />
                </Animated.View>

                {/* Center icon */}
                <LinearGradient
                  colors={Gradients.brandCta as unknown as readonly [string, string, ...string[]]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.searchCenter}
                >
                  <Ionicons name="search" size={36} color={Colors.white} />
                </LinearGradient>
              </View>

              <FadeInView delay={150}>
                <Text style={styles.searchTitle}>
                  {status === 'expanded' ? '範囲を広げて検索中…' : 'プロを探しています…'}
                </Text>
                <Text style={styles.searchRadius}>検索範囲: {radius} km</Text>
              </FadeInView>

              {/* Countdown */}
              <FadeInView delay={250} style={styles.countdownContainer}>
                <Text style={styles.countdownLabel}>受付猶予時間</Text>
                <Text style={styles.countdownTime}>
                  {minutes}:{seconds.toString().padStart(2, '0')}
                </Text>
                <View style={styles.progressBar}>
                  <LinearGradient
                    colors={Gradients.skyPop as unknown as readonly [string, string, ...string[]]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                      styles.progressFill,
                      {
                        width: `${(countdown / MATCHING.ACCEPTANCE_TIMEOUT_SEC) * 100}%`,
                      },
                    ]}
                  />
                </View>
              </FadeInView>

              {/* Cancel */}
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelText}>キャンセル（無料）</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const RING_SIZE = 240;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.inkDeep },
  orb1: {
    position: 'absolute',
    top: -100,
    right: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(0,212,255,0.18)',
  },
  orb2: {
    position: 'absolute',
    bottom: -120,
    left: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(139,92,246,0.18)',
  },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.lg },
  // Searching radar
  searchContainer: {
    width: RING_SIZE,
    height: RING_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  ring: {
    position: 'absolute',
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 1.5,
    borderColor: 'rgba(0,212,255,0.65)',
  },
  sweepWrap: {
    position: 'absolute',
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  sweepArm: {
    width: RING_SIZE / 2,
    height: 4,
    borderRadius: 2,
  },
  searchCenter: {
    width: 92, height: 92, borderRadius: 46,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: Colors.electric,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  searchTitle: {
    fontSize: FontSize.xxl, fontWeight: '800', color: Colors.white,
    textAlign: 'center', letterSpacing: 0.3,
  },
  searchRadius: {
    fontSize: FontSize.md, color: 'rgba(255,255,255,0.7)',
    marginTop: Spacing.xs, textAlign: 'center',
  },
  countdownContainer: { alignItems: 'center', marginTop: Spacing.xxl },
  countdownLabel: {
    fontSize: FontSize.xs, color: 'rgba(255,255,255,0.65)',
    fontWeight: '700', letterSpacing: 1.6, textTransform: 'uppercase',
  },
  countdownTime: {
    fontSize: 56, fontWeight: '900', color: Colors.white,
    fontVariant: ['tabular-nums'], letterSpacing: -1, marginTop: 4,
  },
  progressBar: {
    width: 220, height: 6, backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 3, marginTop: Spacing.sm, overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 3 },
  cancelButton: {
    marginTop: Spacing.xxl, paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl,
  },
  cancelText: {
    fontSize: FontSize.md, fontWeight: '700',
    color: 'rgba(255,255,255,0.65)', letterSpacing: 0.3,
  },
  // Accepted
  acceptedContainer: { alignItems: 'center' },
  acceptedCircle: {
    width: 130, height: 130, borderRadius: 65,
    justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.lg,
    shadowColor: Colors.mint, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6, shadowRadius: 24, elevation: 12,
  },
  acceptedTitle: { fontSize: FontSize.xxl, fontWeight: '900', color: Colors.white },
  acceptedName: {
    fontSize: FontSize.lg, color: Colors.electric,
    fontWeight: '700', marginTop: Spacing.sm,
  },
  acceptedSub: {
    fontSize: FontSize.md, color: 'rgba(255,255,255,0.75)',
    marginTop: Spacing.xs,
  },
  // No Match
  noMatchContainer: { alignItems: 'center', gap: Spacing.md },
  noMatchTitle: {
    fontSize: FontSize.lg, fontWeight: '700',
    color: Colors.white, textAlign: 'center',
  },
  noMatchSub: {
    fontSize: FontSize.md, color: 'rgba(255,255,255,0.7)', textAlign: 'center',
  },
  retryButton: { marginTop: Spacing.md, borderRadius: BorderRadius.full, overflow: 'hidden' },
  retryGradient: {
    paddingVertical: 14, paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.full,
  },
  retryButtonText: {
    fontSize: FontSize.md, fontWeight: '800', color: Colors.white,
  },
});
