// src/constants/theme.ts
export const Colors = {
  // Light Theme
  light: {
    background: '#FFFFFF',
    surface: '#F8F9FA',
    card: '#FFFFFF',
    text: '#1A1A1A',
    textSecondary: '#666666',
    textTertiary: '#888888',
    border: '#E0E0E0',
    primary: '#4A90E2',
    primaryLight: '#E3F2FD',
    secondary: '#FF6B6B',
    accent: '#4ECDC4',
    success: '#4CAF50',
    warning: '#FFA726',
    error: '#F44336',
    info: '#2196F3',
    white: '#FFFFFF',
    black: '#000000',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  // Dark Theme
  dark: {
    background: '#0A0F24',
    surface: '#121828',
    card: '#1A1F2E',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    textTertiary: 'rgba(255, 255, 255, 0.5)',
    border: 'rgba(255, 255, 255, 0.1)',
    primary: '#4A90E2',
    primaryLight: 'rgba(74, 144, 226, 0.1)',
    secondary: '#FF6B6B',
    accent: '#4ECDC4',
    success: '#4CAF50',
    warning: '#FFA726',
    error: '#F44336',
    info: '#2196F3',
    white: '#FFFFFF',
    black: '#000000',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
};

export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: '800' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  body1: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  small: {
    fontSize: 10,
    fontWeight: '400' as const,
    lineHeight: 14,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  round: 999,
};

export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export type ThemeType = 'light' | 'dark';