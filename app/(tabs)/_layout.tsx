import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue,
  withTiming 
} from 'react-native-reanimated';

const AnimatedTabBarIcon = ({ focused, iconName, color }: any) => {
  const scale = useSharedValue(1);
  
  React.useEffect(() => {
    scale.value = withSpring(focused ? 1.2 : 1, {
      damping: 10,
      stiffness: 100,
    });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons 
        name={iconName} 
        size={focused ? 28 : 24} 
        color={color} 
      />
    </Animated.View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1A1A1A',
          borderTopColor: '#333',
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: '#888',
        headerStyle: {
          backgroundColor: '#1A1A1A',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <AnimatedTabBarIcon 
              focused={focused} 
              iconName={focused ? 'home' : 'home-outline'} 
              color={color} 
            />
          ),
        }}
      />
      
  <Tabs.Screen
        name="AboutScreen"
        options={{
          title: 'About',
          tabBarIcon: ({ focused, color }) => (
            <AnimatedTabBarIcon 
              focused={focused} 
              iconName={focused ? 'briefcase' : 'briefcase-outline'} 
              color={color} 
            />
          ),
        }}
      />
    
      <Tabs.Screen
        name="PortfolioScreen"
        options={{
          title: 'Portfolio',
          tabBarIcon: ({ focused, color }) => (
            <AnimatedTabBarIcon 
              focused={focused} 
              iconName={focused ? 'briefcase' : 'briefcase-outline'} 
              color={color} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="ServicesScreen"
        options={{
          title: 'Services',
          tabBarIcon: ({ focused, color }) => (
            <AnimatedTabBarIcon 
              focused={focused} 
              iconName={focused ? 'construct' : 'construct-outline'} 
              color={color} 
            />
          ),
        }}
      />
    
      <Tabs.Screen
        name="ProductsScreen"
        options={{
          title: 'Products',
          tabBarIcon: ({ focused, color }) => (
            <AnimatedTabBarIcon 
              focused={focused} 
              iconName={focused ? 'construct' : 'construct-outline'} 
              color={color} 
            />
          ),
        }}
      />

  {/* <Tabs.Screen
        name="NewsScreen"
        options={{
          title: 'News',
          tabBarIcon: ({ focused, color }) => (
            <AnimatedTabBarIcon 
              focused={focused} 
              iconName={focused ? 'newspaper' : 'newspaper-outline'} 
              color={color} 
            />
          ),
        }}
      /> */}
  <Tabs.Screen
        name="ContactScreen"
        options={{
          title: 'Contact',
          tabBarIcon: ({ focused, color }) => (
            <AnimatedTabBarIcon 
              focused={focused} 
              iconName={focused ? 'briefcase' : 'briefcase-outline'} 
              color={color} 
            
            />
          ),
        }}
      />


    </Tabs>
  );
}