import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  withSpring, 
  useAnimatedStyle, 
  useSharedValue,
  withTiming,
  withSequence,
  withDelay,
  // interpolate,
  // Extrapolate,
  // runOnJS
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

Dimensions.get('window');

interface MenuItem {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  color: string;
  description: string;
}

const MenuItemComponent = ({ 
  item, 
  navigation, 
  index 
}: { 
  item: MenuItem; 
  navigation: any; 
  index: number; 
}) => {
  const router = useRouter();
  const scale = useSharedValue(1);
  const translateX = useSharedValue(-20);
  const opacity = useSharedValue(0);
  const bgOpacity = useSharedValue(0);

  React.useEffect(() => {
    const delay = index * 100;
    translateX.value = withDelay(delay, withTiming(0, { duration: 300 }));
    opacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
  }, [index, opacity, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value }
    ],
    opacity: opacity.value
  }));

  const bgAnimatedStyle = useAnimatedStyle(() => ({
    opacity: bgOpacity.value
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
          withSpring(0.95),
          withSpring(1)
        );
        bgOpacity.value = withTiming(1, { duration: 150 });
      }}
      onPressOut={() => {
        bgOpacity.value = withTiming(0, { duration: 200 });
      }}
      onPress={handlePress}
      style={{ marginVertical: 6 }}
    >
      <Animated.View 
        style={[
          styles.menuItemContainer,
          animatedStyle
        ]}
      >
        {/* Background glow effect */}
        <Animated.View 
          style={[
            styles.menuItemBackground,
            bgAnimatedStyle,
            { backgroundColor: item.color }
          ]}
        />
        
        {/* Icon with gradient background */}
        <LinearGradient
          colors={[`${item.color}20`, `${item.color}10`]}
          style={styles.iconContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons 
            name={item.icon} 
            size={22} 
            color={item.color} 
            style={styles.icon}
          />
        </LinearGradient>
        
        <View style={styles.menuTextContainer}>
          <Text style={styles.menuItemText}>{item.name}</Text>
          <Text style={styles.menuItemDescription}>{item.description}</Text>
        </View>
        
        {/* Chevron indicator */}
        <MaterialCommunityIcons 
          name="chevron-right" 
          size={20} 
          color="rgba(255,255,255,0.3)" 
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = ({ navigation }: any) => {
  const drawerWidth = useSharedValue(0);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    drawerWidth.value = withTiming(300, { duration: 400 });
    opacity.value = withDelay(100, withTiming(1, { duration: 300 }));
  }, [drawerWidth, opacity]);

  const menuItems: MenuItem[] = [
    { 
      name: 'Home', 
      icon: 'grid', 
      route: '/(tabs)/HomeScreen',
      color: '#4A90E2',
      description: 'Main dashboard overview'
    },
    // { 
    //   name: 'News & Updates', 
    //   icon: 'newspaper', 
    //   route: '/(tabs)/NewsScreen',
    //   color: '#FF6B6B',
    //   description: 'Latest company news'
    // },
    { 
      name: 'Our Products', 
      icon: 'cube', 
      route: '/(tabs)/ProductsScreen',
      color: '#4ECDC4',
      description: 'Product catalog'
    },
    { 
      name: 'Services', 
      icon: 'construct', 
      route: '/(tabs)/ServicesScreen',
      color: '#FFD166',
      description: 'Our services'
    },
    { 
      name: 'Portfolio', 
      icon: 'briefcase', 
      route: '/(tabs)/PortfolioScreen',
      color: '#9D50BB',
      description: 'Client portfolio'
    },
    { 
      name: 'About Us', 
      icon: 'information-circle', 
      route: '/(tabs)/AboutScreen',
      color: '#6A0572',
      description: 'Company information'
    },
    { 
      name: 'Contact', 
      icon: 'mail', 
      route: '/(tabs)/ContactScreen',
      color: '#45B7D1',
      description: 'Get in touch'
    },
    // { 
    //   name: 'Settings', 
    //   icon: 'settings', 
    //   route: '/(tabs)/SettingsScreen',
    //   color: '#95A5A6',
    //   description: 'App settings'
    // },
  ];

  const drawerAnimatedStyle = useAnimatedStyle(() => ({
    width: drawerWidth.value,
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }));

  return (
    <Animated.View style={[styles.drawerContainer, drawerAnimatedStyle]}>
      <StatusBar barStyle="light-content" />
      
      {/* Background with gradient */}
      <LinearGradient
        colors={['#0A0F24', '#121828', '#1A1F2E']}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Subtle pattern overlay */}
      <View style={styles.patternOverlay} />
      
      <Animated.ScrollView 
        style={[styles.scrollView, contentAnimatedStyle]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={['#4A90E2', '#6A11CB']}
            style={styles.avatarGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <FontAwesome5 name="lightbulb" size={28} color="white" />
          </LinearGradient>
          
          <View style={styles.headerTextContainer}>
            <Text style={styles.companyName}>TechSolutions PLC</Text>
            <Text style={styles.welcomeText}>Welcome to TechSolutions PLC</Text>
            
            {/* Status indicator */}
            <View style={styles.statusContainer}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Premium Member</Text>
            </View>
          </View>
        </View>
        
        {/* Divider */}
        <View style={styles.divider} />
        
        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>98%</Text>
            <Text style={styles.statLabel}>Satisfaction</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Team</Text>
          </View>
        </View>
        
        {/* Menu Section */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>MAIN MENU</Text>
          {menuItems.map((item, index) => (
            <MenuItemComponent 
              key={item.name} 
              item={item} 
              navigation={navigation} 
              index={index}
            />
          ))}
        </View>
        
        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <TouchableOpacity 
            style={styles.upgradeButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              // Handle upgrade
            }}
          >
            <LinearGradient
              colors={['#4A90E2', '#357ABD']}
              style={styles.upgradeGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="rocket" size={18} color="white" />
              <Text style={styles.upgradeText}>UPGRADE TO PRO</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              // Handle logout
            }}
          >
            <Ionicons name="log-out-outline" size={20} color="#FF6B6B" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
          
          <Text style={styles.versionText}>v2.1.4 • TechSolutions PLC</Text>
        </View>
      </Animated.ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#0A0F24',
    overflow: 'hidden',
  },
  patternOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.03,
    backgroundColor: 'transparent',
    backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%)`,
    backgroundSize: '50px 50px',
  },
  scrollView: {
    flex: 1,
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  avatarGradient: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  companyName: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  welcomeText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginTop: 4,
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ECDC4',
    marginRight: 8,
  },
  statusText: {
    color: '#4ECDC4',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 10,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  menuSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 15,
    marginTop: 10,
  },
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.03)',
    marginVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
  },
  menuItemBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 14,
    opacity: 0.1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuItemText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuItemDescription: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    fontWeight: '400',
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
    alignItems: 'center',
  },
  upgradeButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  upgradeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  upgradeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 10,
    letterSpacing: 0.5,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,107,107,0.1)',
    marginBottom: 15,
    width: '100%',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  versionText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 10,
  },
});

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props: any) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: 'transparent',
            width: 300,
          },
          drawerActiveTintColor: '#4A90E2',
          drawerInactiveTintColor: '#888',
          headerStyle: {
            backgroundColor: '#1A1F2E',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 10,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
            letterSpacing: 0.5,
          },
          headerTitleAlign: 'center',
          drawerType: 'slide',
          overlayColor: 'rgba(0,0,0,0.7)',
          swipeEdgeWidth: 50,
          swipeEnabled: true,
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Dashboard',
            title: 'Tech Solutions PLC',
            headerRight: () => (
              <TouchableOpacity 
                style={{ marginRight: 15 }}
                onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
              >
                <Ionicons name="notifications-outline" size={24} color="white" />
                <View style={{
                  position: 'absolute',
                  right: -2,
                  top: -2,
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#FF6B6B',
                }} />
              </TouchableOpacity>
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}