import { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  Platform,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize } from '@/constants/colors';

// =============================================================
// Splash screen (native: iOS / Android / Expo Go)
// =============================================================
// Plays a Lottie animation from `assets/splash-animation.json`
// over a dark gradient background, with the brand title and
// tagline fading in toward the end.
//
// To replace the animation: drop in a new Lottie JSON file at
//   mobile/assets/splash-animation.json
// (export from After Effects + Bodymovin, or download from
//  LottieFiles, or generate with an AI tool such as Rive Studio
//  or LottieFiles AI.)
//
// Web uses splash.web.tsx instead — see Metro platform extensions.
// =============================================================

const { width: SW, height: SH } = Dimensions.get('window');

type Props = { onFinish: () => void };

// Module-level guard: survives React Strict Mode full remounts.
let _animationStarted = false;

// How long to keep the splash visible before fading out, in ms.
// The Lottie animation should ideally fit within this window so the
// user sees the whole loop before the screen leaves.
const SPLASH_DURATION_MS = 4200;

export default function SplashScreen({ onFinish }: Props) {
  const lottieRef = useRef<LottieView>(null);

  // Brand text reveal
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(20)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineY = useRef(new Animated.Value(15)).current;
  const dotsOpacity = useRef(new Animated.Value(0)).current;

  // Whole-screen fade
  const overallFade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (_animationStarted) return;
    _animationStarted = true;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Lottie autoplay starts immediately via the prop. We just orchestrate
    // the brand text and the eventual fade-out.

    // Title at ~55% of total duration
    const titleTimer = setTimeout(() => {
      Animated.parallel([
        Animated.spring(titleOpacity, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(titleY, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, Math.floor(SPLASH_DURATION_MS * 0.55));
    timers.push(titleTimer);

    // Tagline 250ms after title
    const tagTimer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(taglineY, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    }, Math.floor(SPLASH_DURATION_MS * 0.62));
    timers.push(tagTimer);

    const dotsTimer = setTimeout(() => {
      Animated.timing(dotsOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, Math.floor(SPLASH_DURATION_MS * 0.7));
    timers.push(dotsTimer);

    // Fade out and finish
    const exitTimer = setTimeout(() => {
      Animated.timing(overallFade, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start(() => onFinish());
    }, SPLASH_DURATION_MS);
    timers.push(exitTimer);

    return () => timers.forEach(clearTimeout);
  }, [onFinish, overallFade, titleOpacity, titleY, taglineOpacity, taglineY, dotsOpacity]);

  return (
    <Animated.View style={[styles.container, { opacity: overallFade }]}>
      <LinearGradient
        colors={['#08010F', '#1A0A35', '#1E3A5F', '#0D1B2A']}
        locations={[0, 0.35, 0.7, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Background ambient circles */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      {/* Lottie animation (the hero asset). Replace assets/splash-animation.json
          with a custom file to change the visual. */}
      <View style={styles.lottieWrap}>
        <LottieView
          ref={lottieRef}
          source={require('../assets/splash-animation.json')}
          autoPlay
          loop
          resizeMode="contain"
          style={styles.lottie}
        />
      </View>

      {/* Title */}
      <Animated.View
        style={[
          styles.titleWrap,
          { opacity: titleOpacity, transform: [{ translateY: titleY }] },
        ]}
      >
        <Text style={styles.title}>Mobile Wash</Text>
      </Animated.View>

      {/* Tagline */}
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

      {/* Bottom dots */}
      <Animated.View style={[styles.bottomDots, { opacity: dotsOpacity }]}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    backgroundColor: '#08010F',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bgCircle1: {
    position: 'absolute',
    top: -SH * 0.15,
    right: -SW * 0.2,
    width: SW * 0.7,
    height: SW * 0.7,
    borderRadius: SW * 0.35,
    backgroundColor: 'rgba(96, 165, 250, 0.06)',
  },
  bgCircle2: {
    position: 'absolute',
    bottom: -SH * 0.1,
    left: -SW * 0.2,
    width: SW * 0.6,
    height: SW * 0.6,
    borderRadius: SW * 0.3,
    backgroundColor: 'rgba(157, 0, 255, 0.05)',
  },

  // Lottie occupies the visual focus area, sized relative to the screen.
  lottieWrap: {
    position: 'absolute',
    top: SH * 0.5 - SW * 0.45,
    width: SW,
    height: SW * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width: SW * 0.9,
    height: SW * 0.9,
  },

  // Brand text positioned below the Lottie hero
  titleWrap: {
    position: 'absolute',
    top: SH * 0.5 + SW * 0.5,
    width: SW,
    alignItems: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 3,
    textAlign: 'center',
    textShadowColor: 'rgba(96, 165, 250, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
    ...Platform.select({ ios: { fontFamily: 'System' } }),
  },

  taglineWrap: {
    position: 'absolute',
    top: SH * 0.5 + SW * 0.5 + 56,
    width: SW,
    alignItems: 'center',
  },
  taglineDecorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  taglineLine: {
    width: 22,
    height: 1.5,
    backgroundColor: 'rgba(96, 165, 250, 0.65)',
  },
  tagline: {
    fontSize: FontSize.xs,
    color: 'rgba(191, 219, 254, 0.95)',
    letterSpacing: 5,
    fontWeight: '600',
  },

  bottomDots: {
    position: 'absolute',
    bottom: 70,
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(96, 165, 250, 0.25)',
  },
  dotActive: {
    backgroundColor: 'rgba(96, 165, 250, 0.95)',
    width: 18,
    borderRadius: 3,
  },
});
