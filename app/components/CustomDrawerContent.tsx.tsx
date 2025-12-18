// src/components/CustomDrawerContent.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Switch,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  withDelay,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../contexts/ThemeContext';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface MenuItem {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  color: string;
  description: string;
  notificationCount?: number;
  badge?: string;
}

const MenuItemComponent = ({
  item,
  navigation,
  index,
  isActive,
}: {
  item: MenuItem;
  navigation: any;
  index: number;
  isActive: boolean;
}) => {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = Colors[theme];
  
  const scale = useSharedValue(1);
  const translateX = useSharedValue(-50);
  const opacity = useSharedValue(0);
  const bgColor = useSharedValue(0);

  React.useEffect(() => {
    const delay = index * 80;
    translateX.value = withDelay(delay, withTiming(0, { 
      duration: 400,
      easing: t => t * (2 - t)
    }));
    opacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value }
    ],
    opacity: opacity.value,
    backgroundColor: `rgba(${theme === 'dark' ? '255,255,255' : '0,0,0'}, ${bgColor.value * 0.05})`,
  }));

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(item.route as any);
    navigation.closeDrawer();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={() => {
        scale.value = withSequence(
          withSpring(0.95, { damping: 15 }),
          withSpring(1, { damping: 15 })
        );
        bgColor.value = withTiming(1, { duration: 150 });
      }}
      onPressOut={() => {
        bgColor.value = withTiming(0, { duration: 200 });
      }}
      onPress={handlePress}
      style={styles.menuItemWrapper}
    >
      <Animated.View 
        style={[
          styles.menuItemContainer,
          {
            backgroundColor: isActive ? colors.primaryLight : colors.card,
            borderColor: isActive ? colors.primary : colors.border,
          },
          animatedStyle
        ]}
      >
        <View style={[
          styles.iconContainer,
          { backgroundColor: isActive ? colors.primary : `${item.color}15` }
        ]}>
          <Ionicons 
            name={item.icon} 
            size={22} 
            color={isActive ? colors.white : item.color}
          />
        </View>
        
        <View style={styles.menuTextContainer}>
          <View style={styles.menuTitleRow}>
            <Text style={[
              styles.menuItemText,
              { color: isActive ? colors.primary : colors.text }
            ]}>
              {item.name}
            </Text>
            {item.notificationCount ? (
              <View style={[
                styles.notificationBadge,
                { backgroundColor: item.color }
              ]}>
                <Text style={styles.notificationText}>
                  {item.notificationCount > 9 ? '9+' : item.notificationCount}
                </Text>
              </View>
            ) : null}
            {item.badge && (
              <View style={[
                styles.customBadge,
                { backgroundColor: item.color }
              ]}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            )}
          </View>
          <Text style={[
            styles.menuItemDescription,
            { color: colors.textTertiary }
          ]}>
            {item.description}
          </Text>
        </View>
        
        <View style={styles.chevronContainer}>
          <Ionicons 
            name="chevron-forward" 
            size={20} 
            color={colors.textTertiary}
          />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function CustomDrawerContent({ navigation }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const colors = Colors[theme];
  
  const [userProfile, setUserProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex@techsolutions.com',
    role: 'Senior Developer',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  });

  const drawerWidth = useSharedValue(0);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    drawerWidth.value = withTiming(320, { duration: 400 });
    opacity.value = withDelay(100, withTiming(1, { duration: 300 }));
  }, []);

  const menuItems: MenuItem[] = [
    { 
      id: '1',
      name: 'Dashboard', 
      icon: 'grid', 
      route: '/(tabs)',
      color: colors.primary,
      description: 'Analytics and overview',
      notificationCount: 3
    },
    { 
      id: '2',
      name: 'News Feed', 
      icon: 'newspaper', 
      route: '/(tabs)/news',
      color: colors.secondary,
      description: 'Latest updates and articles',
      badge: 'NEW'
    },
    { 
      id: '3',
      name: 'Products', 
      icon: 'cube', 
      route: '/(tabs)/products',
      color: colors.accent,
      description: 'Our product catalog'
    },
    { 
      id: '4',
      name: 'Services', 
      icon: 'construct', 
      route: '/(tabs)/services',
      color: colors.warning,
      description: 'Services we offer'
    },
    { 
      id: '5',
      name: 'Portfolio', 
      icon: 'briefcase', 
      route: '/portfolio',
      color: '#9D50BB',
      description: 'Client projects showcase'
    },
    { 
      id: '6',
      name: 'Analytics', 
      icon: 'stats-chart', 
      route: '/analytics',
      color: colors.info,
      description: 'Performance metrics'
    },
    { 
      id: '7',
      name: 'Team', 
      icon: 'people', 
      route: '/team',
      color: colors.success,
      description: 'Our team members'
    },
    { 
      id: '8',
      name: 'Documents', 
      icon: 'document-text', 
      route: '/documents',
      color: '#5F27CD',
      description: 'Files and resources'
    },
    { 
      id: '9',
      name: 'About Us', 
      icon: 'information-circle', 
      route: '/about',
      color: '#6A0572',
      description: 'Company information'
    },
    { 
      id: '10',
      name: 'Contact', 
      icon: 'mail', 
      route: '/contact',
      color: '#45B7D1',
      description: 'Get in touch'
    },
    { 
      id: '11',
      name: 'Settings', 
      icon: 'settings', 
      route: '/settings',
      color: colors.textTertiary,
      description: 'App configuration'
    },
  ];

  const drawerAnimatedStyle = useAnimatedStyle(() => ({
    width: drawerWidth.value,
  }));

  const handleLogout = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    // Clear storage
    await AsyncStorage.clear();
    // Navigate to login
    router.replace('/login');
  };

  const handleUpgrade = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/upgrade');
    navigation.closeDrawer();
  };

  return (
    <Animated.View style={[
      styles.drawerContainer,
      { backgroundColor: colors.background },
      drawerAnimatedStyle
    ]}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header Section */}
          <LinearGradient
            colors={[colors.primary, '#357ABD']}
            style={styles.headerGradient}
          >
            <View style={styles.headerContainer}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: userProfile.avatar }}
                  style={styles.avatar}
                />
                <View style={[
                  styles.statusIndicator,
                  { backgroundColor: colors.success }
                ]} />
              </View>
              
              <View style={styles.headerTextContainer}>
                <Text style={[styles.userName, { color: colors.white }]}>
                  {userProfile.name}
                </Text>
                <Text style={[styles.userRole, { color: 'rgba(255,255,255,0.8)' }]}>
                  {userProfile.role}
                </Text>
                <Text style={[styles.userEmail, { color: 'rgba(255,255,255,0.6)' }]}>
                  {userProfile.email}
                </Text>
              </View>
              
              <TouchableOpacity
                style={[styles.editButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.push('/profile');
                  navigation.closeDrawer();
                }}
              >
                <Feather name="edit-2" size={18} color={colors.white} />
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Quick Stats */}
          <View style={[
            styles.statsContainer,
            { backgroundColor: colors.card }
          ]}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.text }]}>24</Text>
              <Text style={[styles.statLabel, { color: colors.textTertiary }]}>Projects</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.text }]}>98%</Text>
              <Text style={[styles.statLabel, { color: colors.textTertiary }]}>Satisfaction</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.text }]}>15</Text>
              <Text style={[styles.statLabel, { color: colors.textTertiary }]}>Team</Text>
            </View>
          </View>

          {/* Menu Section */}
          <View style={styles.menuSection}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>
                MAIN MENU
              </Text>
              <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
                {menuItems.length} items
              </Text>
            </View>
            
            {menuItems.map((item, index) => (
              <MenuItemComponent 
                key={item.id}
                item={item} 
                navigation={navigation} 
                index={index}
                isActive={pathname === item.route || pathname.startsWith(item.route)}
              />
            ))}
          </View>

          {/* Theme Toggle */}
          <View style={[
            styles.themeToggleContainer,
            { backgroundColor: colors.card }
          ]}>
            <View style={styles.themeToggleContent}>
              <View style={styles.themeIconContainer}>
                <Ionicons 
                  name={theme === 'dark' ? 'moon' : 'sunny'}
                  size={22}
                  color={theme === 'dark' ? '#FFD700' : '#FFA500'}
                />
              </View>
              <View style={styles.themeTextContainer}>
                <Text style={[styles.themeTitle, { color: colors.text }]}>
                  {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </Text>
                <Text style={[styles.themeDescription, { color: colors.textTertiary }]}>
                  Switch interface theme
                </Text>
              </View>
            </View>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: colors.primary }}
              thumbColor={theme === 'dark' ? colors.white : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              style={styles.themeSwitch}
            />
          </View>

          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            <TouchableOpacity 
              style={styles.upgradeButton}
              onPress={handleUpgrade}
            >
              <LinearGradient
                colors={[colors.primary, '#357ABD']}
                style={styles.upgradeGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="rocket" size={20} color={colors.white} />
                <Text style={styles.upgradeText}>UPGRADE TO PRO</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.logoutButton, { backgroundColor: `${colors.secondary}15` }]}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={20} color={colors.secondary} />
              <Text style={[styles.logoutText, { color: colors.secondary }]}>
                Logout
              </Text>
            </TouchableOpacity>
            
            <Text style={[styles.versionText, { color: colors.textTertiary }]}>
              v2.1.4 • TechSolutions PLC
            </Text>
            <Text style={[styles.copyrightText, { color: colors.textTertiary }]}>
              © 2024 All rights reserved
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  headerGradient: {
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: BorderRadius.round,
    borderWidth: 2,
    borderColor: 'white',
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  userName: {
    ...Typography.h4,
    fontWeight: '700',
  },
  userRole: {
    ...Typography.body2,
    marginTop: 2,
  },
  userEmail: {
    ...Typography.caption,
    marginTop: 2,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: Spacing.lg,
    marginTop: -Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.medium,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    ...Typography.h3,
    fontWeight: '700',
  },
  statLabel: {
    ...Typography.caption,
    marginTop: Spacing.xs,
  },
  statDivider: {
    width: 1,
  },
  menuSection: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.caption,
    fontWeight: '700',
    letterSpacing: 1,
  },
  sectionSubtitle: {
    ...Typography.caption,
    fontWeight: '600',
  },
  menuItemWrapper: {
    marginVertical: Spacing.xs,
  },
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  menuItemText: {
    ...Typography.body1,
    fontWeight: '600',
  },
  menuItemDescription: {
    ...Typography.caption,
    marginTop: 2,
  },
  notificationBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.round,
    marginLeft: Spacing.sm,
  },
  notificationText: {
    ...Typography.small,
    color: 'white',
    fontWeight: '700',
  },
  customBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
    marginLeft: Spacing.sm,
  },
  badgeText: {
    ...Typography.small,
    color: 'white',
    fontWeight: '700',
  },
  chevronContainer: {
    marginLeft: Spacing.sm,
  },
  themeToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    ...Shadows.small,
  },
  themeToggleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  themeIconContainer: {
    marginRight: Spacing.md,
  },
  themeTextContainer: {
    flex: 1,
  },
  themeTitle: {
    ...Typography.body2,
    fontWeight: '600',
  },
  themeDescription: {
    ...Typography.caption,
    marginTop: 2,
  },
  themeSwitch: {
    transform: [{ scale: 0.9 }],
  },
  bottomSection: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  upgradeButton: {
    width: '100%',
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    ...Shadows.medium,
  },
  upgradeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  upgradeText: {
    ...Typography.body2,
    color: 'white',
    fontWeight: '700',
    marginLeft: Spacing.sm,
    letterSpacing: 0.5,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    width: '100%',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  logoutText: {
    ...Typography.body2,
    fontWeight: '600',
    marginLeft: Spacing.sm,
  },
  versionText: {
    ...Typography.small,
    fontWeight: '500',
    marginBottom: 4,
  },
  copyrightText: {
    ...Typography.small,
    fontWeight: '400',
  },
});