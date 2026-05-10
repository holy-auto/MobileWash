import { useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize } from '@/constants/colors';

const { width: SW, height: SH } = Dimensions.get('window');

type Props = { onFinish: () => void };

// Module-level guard: survives React Strict Mode full remounts
let _animationStarted = false;

// ─────────────────────────────────────────────
// Cyberpunk neon palette
// ─────────────────────────────────────────────
const NEON = {
  cyan: '#00F0FF',
  magenta: '#FF2EC4',
  hotPink: '#FF006E',
  purple: '#9D00FF',
  white: '#EAF6FF',
  amber: '#FFB800',
};

// ─────────────────────────────────────────────
// Static decoration data (positions / sizes)
// ─────────────────────────────────────────────

// Stars: small twinkling points in the upper sky.
const STARS = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  x: Math.random() * SW,
  y: Math.random() * SH * 0.42,
  size: 1 + Math.random() * 2.5,
  delay: Math.random() * 800,
  twinkle: 1200 + Math.random() * 1800,
}));

// City building silhouettes along the horizon line.
const HORIZON_Y = SH * 0.5; // road horizon (vanishing point baseline)
const BUILDINGS = (() => {
  const rng = (seed: number) => {
    const x = Math.sin(seed * 9999) * 10000;
    return x - Math.floor(x);
  };
  return Array.from({ length: 16 }, (_, i) => {
    const w = 26 + rng(i + 1) * 70;
    const h = 50 + rng(i + 17) * 130;
    return {
      id: i,
      x: (SW / 16) * i + (rng(i + 5) - 0.5) * 16,
      w,
      h,
      neonColor: i % 3 === 0 ? NEON.magenta : i % 3 === 1 ? NEON.cyan : NEON.purple,
      windows: Array.from({ length: Math.floor(h / 14) }, (_, j) => ({
        lit: rng(i * 100 + j) > 0.55,
        warm: rng(i * 200 + j) > 0.5,
      })),
    };
  });
})();

// Lane center dashes: 0 = at vanishing point, 1 = past camera (off-screen below).
const LANE_DASH_COUNT = 8;
const LANES = Array.from({ length: LANE_DASH_COUNT }, (_, i) => ({
  id: i,
  delayOffset: i * (1000 / LANE_DASH_COUNT),
}));

// Speed streaks: horizontal neon lines passing the camera.
const SPEED_STREAKS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  y: HORIZON_Y + 20 + (i / 16) * (SH - HORIZON_Y - 80),
  width: 80 + Math.random() * 240,
  color: i % 4 === 0 ? NEON.magenta : i % 4 === 1 ? NEON.cyan : i % 4 === 2 ? '#FFFFFF' : NEON.purple,
  delay: Math.random() * 1200,
  loops: 3 + Math.floor(Math.random() * 3),
  speed: 280 + Math.random() * 220,
}));

// Side guardrail neon poles
const GUARD_POLES = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  side: i % 2 === 0 ? 'left' : 'right',
  delay: i * 220,
}));

export default function SplashScreen({ onFinish }: Props) {
  // === Scene-level ===
  const overallFade = useRef(new Animated.Value(1)).current;
  const sceneOpacity = useRef(new Animated.Value(0)).current;
  const cameraShakeX = useRef(new Animated.Value(0)).current;

  // === Stars ===
  const starAnims = useMemo(() => STARS.map(() => new Animated.Value(0)), []);

  // === Lane dashes (perspective) ===
  const laneAnims = useMemo(
    () => LANES.map(() => new Animated.Value(0)),
    [],
  );

  // === Speed streaks ===
  const streakAnims = useMemo(
    () =>
      SPEED_STREAKS.map(() => ({
        x: new Animated.Value(SW + 200),
        opacity: new Animated.Value(0),
      })),
    [],
  );

  // === Side neon poles (zooming past) ===
  const poleAnims = useMemo(
    () =>
      GUARD_POLES.map(() => new Animated.Value(0)),
    [],
  );

  // === Car (the hero) ===
  const carScale = useRef(new Animated.Value(0.04)).current;
  const carY = useRef(new Animated.Value(-SH * 0.18)).current;
  const carOpacity = useRef(new Animated.Value(0)).current;
  const carWobble = useRef(new Animated.Value(0)).current;

  // === Headlights ===
  const headlightGlow = useRef(new Animated.Value(0)).current;
  const headlightFlare = useRef(new Animated.Value(0)).current;

  // === Underglow neon ===
  const underglowOpacity = useRef(new Animated.Value(0)).current;

  // === Brake light ===
  const brakeLight = useRef(new Animated.Value(0)).current;

  // === Flash burst (car → logo morph) ===
  const flashOpacity = useRef(new Animated.Value(0)).current;

  // === Logo ===
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.6)).current;
  const ringRotate = useRef(new Animated.Value(0)).current;
  const logoGlow = useRef(new Animated.Value(0.3)).current;

  // === Title + tagline ===
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(20)).current;
  const titleGlowAlt = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineY = useRef(new Animated.Value(15)).current;

  // === Bottom dots ===
  const dotsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (_animationStarted) return;
    _animationStarted = true;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const loops: Animated.CompositeAnimation[] = [];

    // ============================================
    // PHASE 1: Scene fade-in (0-500ms)
    // ============================================
    Animated.timing(sceneOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Stars twinkle
    starAnims.forEach((a, i) => {
      const t = setTimeout(() => {
        const loop = Animated.loop(
          Animated.sequence([
            Animated.timing(a, {
              toValue: 0.6 + Math.random() * 0.4,
              duration: STARS[i].twinkle,
              useNativeDriver: true,
            }),
            Animated.timing(a, {
              toValue: 0.15,
              duration: STARS[i].twinkle,
              useNativeDriver: true,
            }),
          ]),
        );
        loop.start();
        loops.push(loop);
      }, STARS[i].delay);
      timers.push(t);
    });

    // ============================================
    // PHASE 2: Road + city motion starts (300ms)
    // ============================================
    const roadStart = setTimeout(() => {
      // Lane dashes stream toward camera
      laneAnims.forEach((a, i) => {
        const animateLane = () => {
          a.setValue(0);
          Animated.timing(a, {
            toValue: 1,
            duration: 850,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }).start(animateLane);
        };
        const t = setTimeout(animateLane, LANES[i].delayOffset);
        timers.push(t);
      });

      // Side neon poles zoom past
      poleAnims.forEach((a, i) => {
        const animatePole = () => {
          a.setValue(0);
          Animated.timing(a, {
            toValue: 1,
            duration: 700,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          }).start(() => {
            const t = setTimeout(animatePole, 200 + Math.random() * 600);
            timers.push(t);
          });
        };
        const t = setTimeout(animatePole, GUARD_POLES[i].delay);
        timers.push(t);
      });

      // Speed streaks
      streakAnims.forEach((s, i) => {
        const def = SPEED_STREAKS[i];
        let count = 0;
        const animateStreak = () => {
          if (count >= def.loops) return;
          count += 1;
          s.x.setValue(SW + 200);
          s.opacity.setValue(0);
          Animated.parallel([
            Animated.sequence([
              Animated.timing(s.opacity, { toValue: 0.85, duration: 80, useNativeDriver: true }),
              Animated.delay(120),
              Animated.timing(s.opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
            ]),
            Animated.timing(s.x, {
              toValue: -def.width - 200,
              duration: def.speed,
              easing: Easing.in(Easing.quad),
              useNativeDriver: true,
            }),
          ]).start(animateStreak);
        };
        const t = setTimeout(animateStreak, def.delay);
        timers.push(t);
      });
    }, 300);
    timers.push(roadStart);

    // ============================================
    // PHASE 3: Car approaching (700ms - 2400ms)
    // Tiny glowing dot grows into a roaring car
    // ============================================
    const carPhase = setTimeout(() => {
      Animated.parallel([
        Animated.timing(carOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(carScale, {
          toValue: 1,
          duration: 1700,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(carY, {
          toValue: 0, // settle near vertical center
          duration: 1700,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(headlightGlow, {
          toValue: 1,
          duration: 1700,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(underglowOpacity, {
          toValue: 1,
          duration: 1500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();

      // Subtle car wobble during approach (suspension)
      Animated.loop(
        Animated.sequence([
          Animated.timing(carWobble, {
            toValue: 2,
            duration: 180,
            useNativeDriver: true,
          }),
          Animated.timing(carWobble, {
            toValue: -1.5,
            duration: 180,
            useNativeDriver: true,
          }),
        ]),
        { iterations: 6 },
      ).start();
    }, 700);
    timers.push(carPhase);

    // ============================================
    // PHASE 4: Car arrives — brake + flare + shake (2400ms)
    // ============================================
    const arrivePhase = setTimeout(() => {
      Animated.sequence([
        Animated.timing(brakeLight, { toValue: 1, duration: 130, useNativeDriver: true }),
        Animated.timing(brakeLight, { toValue: 0.55, duration: 320, useNativeDriver: true }),
      ]).start();

      Animated.sequence([
        Animated.timing(headlightFlare, { toValue: 1, duration: 180, useNativeDriver: true }),
        Animated.timing(headlightFlare, { toValue: 0.25, duration: 380, useNativeDriver: true }),
      ]).start();

      // Camera rumble (skid stop)
      Animated.sequence([
        Animated.timing(cameraShakeX, { toValue: 6, duration: 50, useNativeDriver: true }),
        Animated.timing(cameraShakeX, { toValue: -5, duration: 55, useNativeDriver: true }),
        Animated.timing(cameraShakeX, { toValue: 4, duration: 50, useNativeDriver: true }),
        Animated.timing(cameraShakeX, { toValue: -3, duration: 50, useNativeDriver: true }),
        Animated.timing(cameraShakeX, { toValue: 2, duration: 50, useNativeDriver: true }),
        Animated.timing(cameraShakeX, { toValue: 0, duration: 60, useNativeDriver: true }),
      ]).start();
    }, 2400);
    timers.push(arrivePhase);

    // ============================================
    // PHASE 5: Flash → morph to logo (3000ms)
    // ============================================
    const flashPhase = setTimeout(() => {
      Animated.sequence([
        Animated.timing(flashOpacity, {
          toValue: 1,
          duration: 130,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(flashOpacity, {
          toValue: 0,
          duration: 480,
          useNativeDriver: true,
        }),
      ]).start();

      // At the peak of the flash, swap car for logo
      const morph = setTimeout(() => {
        Animated.parallel([
          Animated.timing(carOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
          Animated.timing(headlightGlow, { toValue: 0, duration: 200, useNativeDriver: true }),
          Animated.timing(headlightFlare, { toValue: 0, duration: 200, useNativeDriver: true }),
          Animated.timing(underglowOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
          Animated.timing(brakeLight, { toValue: 0, duration: 200, useNativeDriver: true }),
          Animated.spring(logoScale, {
            toValue: 1,
            tension: 60,
            friction: 7,
            useNativeDriver: true,
          }),
          Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 380,
            useNativeDriver: true,
          }),
        ]).start();

        // Logo glow pulse
        const glowLoop = Animated.loop(
          Animated.sequence([
            Animated.timing(logoGlow, { toValue: 0.85, duration: 1100, useNativeDriver: true }),
            Animated.timing(logoGlow, { toValue: 0.3, duration: 1100, useNativeDriver: true }),
          ]),
        );
        glowLoop.start();
        loops.push(glowLoop);

        // Ring rotates slowly
        const rotateLoop = Animated.loop(
          Animated.timing(ringRotate, {
            toValue: 1,
            duration: 9000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        );
        rotateLoop.start();
        loops.push(rotateLoop);
      }, 110);
      timers.push(morph);
    }, 3000);
    timers.push(flashPhase);

    // ============================================
    // PHASE 6: Title + tagline (3550ms)
    // ============================================
    const titlePhase = setTimeout(() => {
      Animated.parallel([
        Animated.spring(titleOpacity, { toValue: 1, tension: 50, friction: 8, useNativeDriver: true }),
        Animated.spring(titleY, { toValue: 0, tension: 50, friction: 8, useNativeDriver: true }),
      ]).start();

      // Cyan glow text behind cycles in/out
      const glowAltLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(titleGlowAlt, { toValue: 1, duration: 1400, useNativeDriver: true }),
          Animated.timing(titleGlowAlt, { toValue: 0.35, duration: 1400, useNativeDriver: true }),
        ]),
      );
      glowAltLoop.start();
      loops.push(glowAltLoop);
    }, 3550);
    timers.push(titlePhase);

    const tagPhase = setTimeout(() => {
      Animated.parallel([
        Animated.timing(taglineOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(taglineY, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]).start();
    }, 3850);
    timers.push(tagPhase);

    const dotsPhase = setTimeout(() => {
      Animated.timing(dotsOpacity, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    }, 4050);
    timers.push(dotsPhase);

    // ============================================
    // PHASE 7: Exit (4900ms)
    // ============================================
    const exitPhase = setTimeout(() => {
      Animated.timing(overallFade, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => onFinish());
    }, 4900);
    timers.push(exitPhase);

    return () => {
      timers.forEach(clearTimeout);
      loops.forEach((l) => l.stop());
    };
  }, []);

  const ringRotateStr = ringRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: overallFade }]}>
      <Animated.View
        style={[
          styles.scene,
          {
            opacity: sceneOpacity,
            transform: [{ translateX: cameraShakeX }],
          },
        ]}
      >
        {/* ═══ Sky gradient ═══ */}
        <LinearGradient
          colors={['#08010F', '#1A0A35', '#3D0F5C', '#5C0E4D', '#1F0832']}
          locations={[0, 0.28, 0.5, 0.72, 1]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        {/* Distant horizon glow (sunset/skyline haze) */}
        <View style={styles.horizonGlow}>
          <LinearGradient
            colors={['transparent', 'rgba(255, 46, 196, 0.18)', 'rgba(0, 240, 255, 0.10)', 'transparent']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={StyleSheet.absoluteFill}
          />
        </View>

        {/* ═══ Stars ═══ */}
        {STARS.map((s, i) => (
          <Animated.View
            key={`star-${s.id}`}
            style={[
              styles.star,
              {
                left: s.x,
                top: s.y,
                width: s.size,
                height: s.size,
                borderRadius: s.size / 2,
                opacity: starAnims[i],
              },
            ]}
          />
        ))}

        {/* ═══ City silhouette ═══ */}
        <View style={styles.cityRow}>
          {BUILDINGS.map((b) => (
            <View
              key={`bldg-${b.id}`}
              style={[
                styles.building,
                {
                  left: b.x,
                  width: b.w,
                  height: b.h,
                  bottom: SH - HORIZON_Y - 4,
                },
              ]}
            >
              {/* Neon top edge */}
              <View
                style={[
                  styles.buildingTop,
                  { backgroundColor: b.neonColor, shadowColor: b.neonColor },
                ]}
              />
              {/* Side neon stripe */}
              <View
                style={[
                  styles.buildingStripe,
                  { backgroundColor: b.neonColor, shadowColor: b.neonColor },
                ]}
              />
              {/* Lit windows */}
              {b.windows.map((w, j) =>
                w.lit ? (
                  <View
                    key={j}
                    style={[
                      styles.buildingWindow,
                      {
                        bottom: 8 + j * 14,
                        backgroundColor: w.warm ? '#FFC542' : '#FFE7AA',
                      },
                    ]}
                  />
                ) : null,
              )}
            </View>
          ))}
        </View>

        {/* ═══ Road surface (asphalt gradient) ═══ */}
        <View style={styles.road}>
          <LinearGradient
            colors={['rgba(40, 12, 60, 0.55)', 'rgba(8, 1, 15, 0.95)', '#000000']}
            locations={[0, 0.5, 1]}
            style={StyleSheet.absoluteFill}
          />

          {/* Perspective road edges (left/right) */}
          <View style={styles.roadEdgeLeft} />
          <View style={styles.roadEdgeRight} />

          {/* Magenta/cyan rim glow on road edges */}
          <View style={styles.roadEdgeGlowLeft} />
          <View style={styles.roadEdgeGlowRight} />
        </View>

        {/* ═══ Lane center dashes (animated, perspective) ═══ */}
        {LANES.map((lane, i) => {
          const dashY = laneAnims[i].interpolate({
            inputRange: [0, 1],
            outputRange: [0, SH * 0.5],
          });
          const dashScale = laneAnims[i].interpolate({
            inputRange: [0, 1],
            outputRange: [0.15, 5.5],
          });
          const dashOpacity = laneAnims[i].interpolate({
            inputRange: [0, 0.08, 0.85, 1],
            outputRange: [0, 1, 1, 0],
          });
          return (
            <Animated.View
              key={`lane-${lane.id}`}
              style={[
                styles.laneDash,
                {
                  opacity: dashOpacity,
                  transform: [{ translateY: dashY }, { scale: dashScale }],
                },
              ]}
            />
          );
        })}

        {/* ═══ Side neon poles whooshing past ═══ */}
        {GUARD_POLES.map((pole, i) => {
          const isLeft = pole.side === 'left';
          const startX = isLeft ? SW * 0.45 : SW * 0.55;
          const endX = isLeft ? -50 : SW + 50;
          const startY = HORIZON_Y;
          const endY = SH - 40;
          const tx = poleAnims[i].interpolate({
            inputRange: [0, 1],
            outputRange: [startX, endX],
          });
          const ty = poleAnims[i].interpolate({
            inputRange: [0, 1],
            outputRange: [startY, endY],
          });
          const ps = poleAnims[i].interpolate({
            inputRange: [0, 1],
            outputRange: [0.1, 4],
          });
          const po = poleAnims[i].interpolate({
            inputRange: [0, 0.15, 0.85, 1],
            outputRange: [0, 1, 1, 0],
          });
          return (
            <Animated.View
              key={`pole-${pole.id}`}
              style={[
                styles.neonPole,
                {
                  backgroundColor: i % 2 === 0 ? NEON.cyan : NEON.magenta,
                  shadowColor: i % 2 === 0 ? NEON.cyan : NEON.magenta,
                  opacity: po,
                  transform: [
                    { translateX: tx },
                    { translateY: ty },
                    { scale: ps },
                  ],
                },
              ]}
            />
          );
        })}

        {/* ═══ Speed streaks ═══ */}
        {SPEED_STREAKS.map((s, i) => (
          <Animated.View
            key={`streak-${s.id}`}
            style={[
              styles.speedStreak,
              {
                top: s.y,
                width: s.width,
                backgroundColor: s.color,
                shadowColor: s.color,
                opacity: streakAnims[i].opacity,
                transform: [{ translateX: streakAnims[i].x }],
              },
            ]}
          />
        ))}

        {/* ═══ CAR (the hero) ═══ */}
        <Animated.View
          style={[
            styles.carContainer,
            {
              opacity: carOpacity,
              transform: [
                { translateY: Animated.add(carY, carWobble) },
                { scale: carScale },
              ],
            },
          ]}
        >
          {/* Headlight beams (cone) */}
          <Animated.View
            style={[styles.beamWrap, { opacity: headlightGlow }]}
            pointerEvents="none"
          >
            <View style={[styles.beam, styles.beamLeft]}>
              <LinearGradient
                colors={[
                  'rgba(220, 240, 255, 0.7)',
                  'rgba(220, 240, 255, 0.18)',
                  'rgba(220, 240, 255, 0)',
                ]}
                style={StyleSheet.absoluteFill}
              />
            </View>
            <View style={[styles.beam, styles.beamRight]}>
              <LinearGradient
                colors={[
                  'rgba(220, 240, 255, 0.7)',
                  'rgba(220, 240, 255, 0.18)',
                  'rgba(220, 240, 255, 0)',
                ]}
                style={StyleSheet.absoluteFill}
              />
            </View>
          </Animated.View>

          {/* Underglow neon (cyan + magenta) */}
          <Animated.View
            style={[styles.underglow, { opacity: underglowOpacity }]}
            pointerEvents="none"
          >
            <LinearGradient
              colors={['rgba(255, 46, 196, 0.0)', 'rgba(255, 46, 196, 0.55)', 'rgba(0, 240, 255, 0.55)', 'rgba(0, 240, 255, 0.0)']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>

          {/* Car silhouette */}
          <View style={styles.carBody}>
            <MaterialCommunityIcons name="car-sports" size={140} color="#070716" />
          </View>

          {/* Bright headlight pinpoints */}
          <Animated.View
            style={[styles.headlightDot, styles.headlightLeft, { opacity: headlightGlow }]}
          />
          <Animated.View
            style={[styles.headlightDot, styles.headlightRight, { opacity: headlightGlow }]}
          />

          {/* Lens flare (large soft bloom on arrival) */}
          <Animated.View
            style={[styles.lensFlare, { opacity: headlightFlare }]}
            pointerEvents="none"
          />

          {/* Brake light glow */}
          <Animated.View
            style={[styles.brakeGlow, { opacity: brakeLight }]}
            pointerEvents="none"
          />
        </Animated.View>

        {/* ═══ Flash burst (car → logo) ═══ */}
        <Animated.View
          style={[styles.flashBurst, { opacity: flashOpacity }]}
          pointerEvents="none"
        />

        {/* ═══ LOGO ═══ */}
        <Animated.View
          style={[
            styles.logoWrap,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          {/* Outer glow */}
          <Animated.View
            style={[styles.logoOuterGlow, { opacity: logoGlow }]}
            pointerEvents="none"
          />
          {/* Magenta rotating ring */}
          <Animated.View
            style={[
              styles.ringRotating,
              { transform: [{ rotate: ringRotateStr }] },
            ]}
          />
          {/* Inner orb */}
          <View style={styles.logoOrb}>
            <View style={styles.logoOrbInner}>
              <MaterialCommunityIcons name="car-wash" size={56} color={Colors.white} />
            </View>
          </View>
          {/* Sparkles */}
          <Ionicons name="sparkles" size={14} color={NEON.cyan} style={styles.sparkle1} />
          <Ionicons name="sparkles" size={10} color={NEON.magenta} style={styles.sparkle2} />
          <Ionicons name="water" size={11} color={NEON.cyan} style={styles.sparkle3} />
        </Animated.View>

        {/* ═══ Title (with cyan glow ghost) ═══ */}
        <Animated.View
          style={[
            styles.titleWrap,
            { opacity: titleOpacity, transform: [{ translateY: titleY }] },
          ]}
        >
          {/* Cyan glow underlayer */}
          <Animated.Text
            style={[styles.titleGhost, { opacity: titleGlowAlt }]}
            numberOfLines={1}
          >
            Mobile Wash
          </Animated.Text>
          {/* Magenta offset (chromatic aberration vibe) */}
          <Text style={[styles.titleAberration, styles.titleAberrationMagenta]}>
            Mobile Wash
          </Text>
          <Text style={[styles.titleAberration, styles.titleAberrationCyan]}>
            Mobile Wash
          </Text>
          {/* Main title */}
          <Text style={styles.title}>Mobile Wash</Text>
        </Animated.View>

        {/* ═══ Tagline ═══ */}
        <Animated.View
          style={[
            styles.taglineWrap,
            { opacity: taglineOpacity, transform: [{ translateY: taglineY }] },
          ]}
        >
          <View style={styles.taglineDecorRow}>
            <View style={styles.taglineLine} />
            <Text style={styles.tagline}>YOUR CITY · YOUR SHINE</Text>
            <View style={styles.taglineLine} />
          </View>
        </Animated.View>

        {/* ═══ Bottom dots ═══ */}
        <Animated.View style={[styles.bottomDots, { opacity: dotsOpacity }]}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}

// ─────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    backgroundColor: '#08010F',
  },
  scene: {
    flex: 1,
    overflow: 'hidden',
  },

  // ── Sky elements ──
  horizonGlow: {
    position: 'absolute',
    top: HORIZON_Y - 60,
    left: 0,
    right: 0,
    height: 100,
  },
  star: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
  },

  // ── City silhouette ──
  cityRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SH * 0.5 + 200,
  },
  building: {
    position: 'absolute',
    backgroundColor: '#06010C',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  buildingTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1.5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  buildingStripe: {
    position: 'absolute',
    top: 6,
    bottom: 6,
    width: 1,
    left: 4,
    opacity: 0.55,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  buildingWindow: {
    position: 'absolute',
    width: 3,
    height: 3,
    left: '50%' as any,
    marginLeft: -1.5,
    borderRadius: 0.5,
    opacity: 0.85,
  },

  // ── Road ──
  road: {
    position: 'absolute',
    top: HORIZON_Y,
    left: 0,
    right: 0,
    height: SH - HORIZON_Y,
    overflow: 'hidden',
  },
  roadEdgeLeft: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 0,
    height: 0,
    borderLeftWidth: SW * 0.45,
    borderBottomWidth: SH - HORIZON_Y,
    borderLeftColor: 'rgba(40, 12, 60, 0.4)',
    borderBottomColor: 'transparent',
  },
  roadEdgeRight: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    borderRightWidth: SW * 0.45,
    borderBottomWidth: SH - HORIZON_Y,
    borderRightColor: 'rgba(40, 12, 60, 0.4)',
    borderBottomColor: 'transparent',
  },
  roadEdgeGlowLeft: {
    position: 'absolute',
    left: SW * 0.05,
    top: 0,
    width: 1.5,
    height: SH - HORIZON_Y,
    backgroundColor: NEON.magenta,
    opacity: 0.55,
    transform: [{ skewX: '-32deg' }],
    shadowColor: NEON.magenta,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  roadEdgeGlowRight: {
    position: 'absolute',
    right: SW * 0.05,
    top: 0,
    width: 1.5,
    height: SH - HORIZON_Y,
    backgroundColor: NEON.cyan,
    opacity: 0.55,
    transform: [{ skewX: '32deg' }],
    shadowColor: NEON.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },

  // ── Lane center dash ──
  laneDash: {
    position: 'absolute',
    top: HORIZON_Y - 4,
    left: SW / 2 - 8,
    width: 16,
    height: 8,
    backgroundColor: '#FFD64A',
    borderRadius: 2,
    shadowColor: '#FFD64A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },

  // ── Side neon poles ──
  neonPole: {
    position: 'absolute',
    width: 3,
    height: 18,
    borderRadius: 1.5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },

  // ── Speed streaks ──
  speedStreak: {
    position: 'absolute',
    height: 2,
    borderRadius: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },

  // ── Car ──
  carContainer: {
    position: 'absolute',
    top: SH * 0.5 - 70,
    left: SW / 2 - 70,
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  beamWrap: {
    position: 'absolute',
    top: 70,
    left: -90,
    right: -90,
    height: 240,
  },
  beam: {
    position: 'absolute',
    top: 0,
    height: 240,
    overflow: 'hidden',
  },
  beamLeft: {
    left: 70,
    width: 70,
    transform: [{ skewX: '-25deg' }],
  },
  beamRight: {
    right: 70,
    width: 70,
    transform: [{ skewX: '25deg' }],
  },
  underglow: {
    position: 'absolute',
    bottom: 18,
    width: 160,
    height: 26,
    borderRadius: 80,
    overflow: 'hidden',
  },
  carBody: {
    zIndex: 2,
  },
  headlightDot: {
    position: 'absolute',
    width: 13,
    height: 13,
    borderRadius: 6.5,
    backgroundColor: '#FFFFFF',
    top: 84,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 14,
    zIndex: 3,
  },
  headlightLeft: { left: 30 },
  headlightRight: { right: 30 },
  lensFlare: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(220, 240, 255, 0.45)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 40,
    top: 10,
  },
  brakeGlow: {
    position: 'absolute',
    bottom: 32,
    width: 120,
    height: 16,
    borderRadius: 60,
    backgroundColor: NEON.hotPink,
    shadowColor: NEON.hotPink,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 25,
  },

  // ── Flash burst ──
  flashBurst: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
    zIndex: 50,
  },

  // ── Logo ──
  logoWrap: {
    position: 'absolute',
    top: SH * 0.5 - 70,
    left: SW / 2 - 70,
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 60,
  },
  logoOuterGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: NEON.cyan,
    opacity: 0.15,
    shadowColor: NEON.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 30,
  },
  ringRotating: {
    position: 'absolute',
    width: 134,
    height: 134,
    borderRadius: 67,
    borderWidth: 1.5,
    borderColor: NEON.magenta,
    shadowColor: NEON.magenta,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },
  logoOrb: {
    width: 116,
    height: 116,
    borderRadius: 58,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 240, 255, 0.6)',
    backgroundColor: 'rgba(15, 8, 35, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: NEON.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 18,
  },
  logoOrbInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(30, 58, 95, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(0, 240, 255, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sparkle1: { position: 'absolute', top: -4, right: -4 },
  sparkle2: { position: 'absolute', bottom: 0, left: -2 },
  sparkle3: { position: 'absolute', top: 24, left: -8 },

  // ── Title ──
  titleWrap: {
    position: 'absolute',
    top: SH * 0.5 + 90,
    width: SW,
    alignItems: 'center',
    zIndex: 70,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 3,
    textAlign: 'center',
    textShadowColor: NEON.cyan,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    ...Platform.select({ ios: { fontFamily: 'System' } }),
  },
  titleGhost: {
    position: 'absolute',
    fontSize: 40,
    fontWeight: '800',
    color: 'transparent',
    letterSpacing: 3,
    textAlign: 'center',
    textShadowColor: NEON.cyan,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 22,
  },
  titleAberration: {
    position: 'absolute',
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: 3,
    textAlign: 'center',
    width: SW,
  },
  titleAberrationMagenta: {
    color: 'rgba(255, 46, 196, 0.55)',
    transform: [{ translateX: -2 }],
  },
  titleAberrationCyan: {
    color: 'rgba(0, 240, 255, 0.55)',
    transform: [{ translateX: 2 }],
  },

  // ── Tagline ──
  taglineWrap: {
    position: 'absolute',
    top: SH * 0.5 + 152,
    width: SW,
    alignItems: 'center',
    zIndex: 70,
  },
  taglineDecorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  taglineLine: {
    width: 24,
    height: 1.5,
    backgroundColor: NEON.cyan,
    shadowColor: NEON.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  tagline: {
    fontSize: FontSize.xs,
    color: NEON.cyan,
    letterSpacing: 5,
    fontWeight: '600',
    textShadowColor: NEON.cyan,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },

  // ── Bottom dots ──
  bottomDots: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    zIndex: 70,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0, 240, 255, 0.25)',
  },
  dotActive: {
    backgroundColor: NEON.cyan,
    width: 18,
    borderRadius: 3,
    shadowColor: NEON.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
  },
});
