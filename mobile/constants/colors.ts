export const Colors = {
  // Blue palette
  primary: '#1E3A5F',
  primaryLight: '#2B5797',
  primaryMedium: '#3B82F6',
  primarySoft: '#60A5FA',
  primaryPale: '#BFDBFE',
  primaryFaint: '#DBEAFE',

  // Base
  white: '#FFFFFF',
  offWhite: '#F8FAFC',
  background: '#FAFBFE',
  card: '#FFFFFF',

  // Text
  textPrimary: '#1A1A2E',
  textSecondary: '#4A5568',
  textMuted: '#94A3B8',
  textOnPrimary: '#FFFFFF',

  // Accent
  gold: '#D4A574',
  goldLight: '#E8C9A0',

  // Status
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Borders & Shadows
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  shadow: 'rgba(30, 58, 95, 0.08)',
  shadowDark: 'rgba(30, 58, 95, 0.16)',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',

  // ─── Vibrant accent palette (excitement theme) ───
  electric: '#00D4FF',
  electricDeep: '#0EA5E9',
  violet: '#8B5CF6',
  violetSoft: '#C4B5FD',
  hotPink: '#EC4899',
  sunset: '#F97316',
  mint: '#10B981',
  lemon: '#FCD34D',
  inkDeep: '#0B1B3A',
  inkMid: '#162D4A',
} as const;

// ─── Gradients (consumed by expo-linear-gradient) ───
// Tuples are typed to satisfy LinearGradient's `colors` prop.
export const Gradients = {
  // Deep navy hero (header / role-select background)
  heroNavy: ['#0B1B3A', '#1E3A5F', '#2B5797'] as const,
  // Aurora — playful brand pop
  aurora: ['#3B82F6', '#8B5CF6', '#EC4899'] as const,
  // Sky pop — cyan to violet
  skyPop: ['#00D4FF', '#3B82F6', '#8B5CF6'] as const,
  // Brand CTA — primary call to action
  brandCta: ['#0EA5E9', '#3B82F6'] as const,
  // Sunset — celebration / completion
  sunset: ['#F97316', '#EC4899', '#8B5CF6'] as const,
  // Mint — success / online status
  mint: ['#10B981', '#00D4FF'] as const,
  // Gold — premium / pro role
  gold: ['#FCD34D', '#F59E0B', '#D4A574'] as const,
  // Glass white — overlays on dark
  glassWhite: ['rgba(255,255,255,0.95)', 'rgba(240,249,255,0.85)'] as const,
  // Subtle background tint
  bgTint: ['#FAFBFE', '#EFF6FF'] as const,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 28,
  xxxl: 34,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
