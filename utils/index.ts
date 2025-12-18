import { Platform } from 'react-native';
import { Colors } from '../constants/colors';

// Format currency
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

// Format date relative (e.g., "2 days ago")
export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

// Generate random color from brand palette
export const getRandomColor = (): string => {
  const brandColors = [
    Colors.brand.purple,
    Colors.brand.indigo,
    Colors.brand.blue,
    Colors.brand.teal,
    Colors.brand.emerald,
    Colors.brand.amber,
    Colors.brand.rose,
    Colors.brand.pink,
  ];
  return brandColors[Math.floor(Math.random() * brandColors.length)];
};

// Get service color by ID
export const getServiceColor = (serviceId: string): string => {
  const colorMap: Record<string, string> = {
    '1': Colors.primary,
    '2': Colors.success,
    '3': Colors.warning,
    '4': Colors.error,
    '5': Colors.secondary,
    '6': Colors.brand.pink,
    '7': Colors.brand.teal,
  };
  return colorMap[serviceId] || Colors.primary;
};

// Get service icon by ID
export const getServiceIcon = (serviceId: string): string => {
  const iconMap: Record<string, string> = {
    '1': 'wifi',
    '2': 'code-slash',
    '3': 'color-palette',
    '4': 'cart',
    '5': 'phone-portrait',
    '6': 'brush',
    '7': 'laptop',
  };
  return iconMap[serviceId] || 'help-circle';
};

// Capitalize first letter
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Platform-specific styling
export const platformStyle = {
  ios: Platform.OS === 'ios',
  android: Platform.OS === 'android',
  web: Platform.OS === 'web',
  paddingTop: Platform.OS === 'ios' ? 50 : 30,
  tabBarHeight: Platform.OS === 'ios' ? 90 : 70,
  shadow: Platform.select({
    ios: {
      shadowColor: Colors.shadow.default,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    android: {
      elevation: 4,
    },
    web: {
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
  }),
};

// Generate unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Get initials from name
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Calculate reading time
export const calculateReadingTime = (text: string): string => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min read`;
};