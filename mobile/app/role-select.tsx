import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Gradients, Spacing, FontSize, BorderRadius } from '@/constants/colors';
import { FadeInView } from '@/components/excitement';
import { useAuth } from './_layout';

const ROLES = [
  {
    role: 'customer' as const,
    title: 'お客さまとして利用',
    subtitle: 'プロを呼んでカーディテイリングを依頼',
    icon: 'car-sport' as const,
    variant: 'skyPop' as const,
    eyebrow: 'CUSTOMER',
    sparkles: ['✨', '💧'],
  },
  {
    role: 'pro' as const,
    title: 'プロとして登録',
    subtitle: '技術者としてサービスを提供・収益を得る',
    icon: 'construct' as const,
    variant: 'gold' as const,
    eyebrow: 'PROFESSIONAL',
    sparkles: ['💼', '⭐'],
  },
];

export default function RoleSelectScreen() {
  const router = useRouter();
  const { setRole } = useAuth();

  const handleSelectRole = async (role: 'customer' | 'pro') => {
    await setRole(role);
    if (role === 'customer') {
      router.replace('/customer');
    } else {
      router.replace('/pro');
    }
  };

  return (
    <View style={styles.outer}>
      <LinearGradient
        colors={Gradients.heroNavy as unknown as readonly [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {/* Decorative orbs */}
      <View style={styles.orb1} pointerEvents="none" />
      <View style={styles.orb2} pointerEvents="none" />
      <View style={styles.orb3} pointerEvents="none" />

      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <FadeInView style={styles.header}>
            <Text style={styles.eyebrow}>WELCOME ABOARD ✦</Text>
            <Text style={styles.title}>ようこそ</Text>
            <Text style={styles.subtitle}>
              どちらの利用方法で{'\n'}始めますか？
            </Text>
          </FadeInView>

          <View style={styles.roleList}>
            {ROLES.map((item, idx) => (
              <FadeInView key={item.role} delay={150 + idx * 120}>
                <TouchableOpacity
                  style={styles.roleCard}
                  activeOpacity={0.85}
                  onPress={() => handleSelectRole(item.role)}
                >
                  <LinearGradient
                    colors={
                      Gradients[item.variant] as unknown as readonly [
                        string,
                        string,
                        ...string[]
                      ]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.roleIcon}
                  >
                    <Ionicons name={item.icon} size={36} color={Colors.white} />
                  </LinearGradient>

                  <View style={styles.roleEyebrowRow}>
                    <Text style={styles.roleEyebrow}>{item.eyebrow}</Text>
                    <Text style={styles.roleSparkle}>
                      {item.sparkles.join(' ')}
                    </Text>
                  </View>
                  <Text style={styles.roleTitle}>{item.title}</Text>
                  <Text style={styles.roleSubtitle}>{item.subtitle}</Text>
                  <View style={styles.selectButton}>
                    <Text style={styles.selectButtonText}>選択する</Text>
                    <Ionicons
                      name="arrow-forward"
                      size={16}
                      color={Colors.white}
                    />
                  </View>
                </TouchableOpacity>
              </FadeInView>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: Colors.inkDeep,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
  },

  // Decorative orbs
  orb1: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(0,212,255,0.18)',
  },
  orb2: {
    position: 'absolute',
    bottom: -120,
    left: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(139,92,246,0.18)',
  },
  orb3: {
    position: 'absolute',
    top: '40%',
    right: -50,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(236,72,153,0.12)',
  },

  header: {
    marginBottom: Spacing.xl,
  },
  eyebrow: {
    fontSize: FontSize.xs,
    color: Colors.electric,
    fontWeight: '800',
    letterSpacing: 3,
    marginBottom: 8,
  },
  title: {
    fontSize: FontSize.xxxl + 4,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: FontSize.lg,
    color: 'rgba(255,255,255,0.78)',
    marginTop: Spacing.sm,
    lineHeight: 28,
    fontWeight: '500',
  },
  roleList: {
    gap: Spacing.md,
  },
  roleCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 6,
  },
  roleIcon: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  roleEyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  roleEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    color: Colors.electric,
  },
  roleSparkle: {
    fontSize: 14,
  },
  roleTitle: {
    fontSize: FontSize.xl,
    fontWeight: '800',
    color: Colors.white,
  },
  roleSubtitle: {
    fontSize: FontSize.md,
    color: 'rgba(255,255,255,0.7)',
    marginTop: Spacing.xs,
    lineHeight: 22,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.md,
    gap: Spacing.xs,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,212,255,0.18)',
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(0,212,255,0.35)',
  },
  selectButtonText: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.5,
  },
});
