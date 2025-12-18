export const Colors = {
  // Primary Colors
  primary: '#4F46E5',
  primaryLight: '#6366F1',
  primaryDark: '#4338CA',
  
  // Secondary Colors
  secondary: '#7C3AED',
  secondaryLight: '#8B5CF6',
  secondaryDark: '#6D28D9',
  
  // Status Colors
  success: '#10B981',
  successLight: '#34D399',
  successDark: '#059669',
  
  warning: '#F59E0B',
  warningLight: '#FBBF24',
  warningDark: '#D97706',
  
  error: '#EF4444',
  errorLight: '#F87171',
  errorDark: '#DC2626',
  
  info: '#3B82F6',
  infoLight: '#60A5FA',
  infoDark: '#2563EB',
  
  // Brand Colors
  brand: {
    purple: '#8B5CF6',
    indigo: '#4F46E5',
    blue: '#3B82F6',
    teal: '#06B6D4',
    emerald: '#10B981',
    amber: '#F59E0B',
    rose: '#F43F5E',
    pink: '#EC4899',
  },
  
  // Gray Scale
  gray: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  
  // Background & Surface
  background: '#FFFFFF',
  surface: '#F8FAFC',
  card: '#FFFFFF',
  
  // Text Colors
  text: {
    primary: '#1E293B',
    secondary: '#64748B',
    tertiary: '#94A3B8',
    disabled: '#CBD5E1',
    inverse: '#FFFFFF',
    link: '#4F46E5',
  },
  
  // Border Colors
  border: {
    light: '#E2E8F0',
    default: '#CBD5E1',
    dark: '#94A3B8',
  },
  
  // Shadow Colors
  shadow: {
    light: '#00000010',
    default: '#00000020',
    dark: '#00000040',
  },
};

export const Gradients = {
  primary: ['#4F46E5', '#7C3AED'],
  secondary: ['#10B981', '#059669'],
  accent: ['#F59E0B', '#D97706'],
  sunset: ['#EC4899', '#8B5CF6'],
  ocean: ['#06B6D4', '#3B82F6'],
  forest: ['#10B981', '#059669'],
  fire: ['#EF4444', '#F59E0B'],
  premium: ['#4F46E5', '#EC4899', '#F59E0B'],
};

export const Shadows = {
  sm: {
    shadowColor: Colors.shadow.default,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: Colors.shadow.default,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: Colors.shadow.dark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  xl: {
    shadowColor: Colors.shadow.dark,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 12,
  },
};

export const Typography = {
  h1: {
    fontSize: 48,
    fontFamily: 'Inter-Bold',
    lineHeight: 56,
  },
  h2: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    lineHeight: 44,
  },
  h3: {
    fontSize: 30,
    fontFamily: 'Inter-Bold',
    lineHeight: 38,
  },
  h4: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    lineHeight: 32,
  },
  h5: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    lineHeight: 28,
  },
  h6: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    lineHeight: 26,
  },
  body1: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    lineHeight: 16,
  },
  overline: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    lineHeight: 14,
    letterSpacing: 1.5,
  },
};