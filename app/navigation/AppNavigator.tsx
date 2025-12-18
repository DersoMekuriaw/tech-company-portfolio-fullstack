import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // Import screens
import HomeScreen from '../(tabs)/HomeScreen';
import ServicesScreen from '../(tabs)/ServicesScreen';
import ProductsScreen from '../(tabs)/ProductsScreen';
import PortfolioScreen from '../(tabs)/PortfolioScreen';
import NewsScreen from '../(tabs)/NewsScreen';
import AboutScreen from '../(tabs)/AboutScreen';
import ContactScreen from '../(tabs)/ContactScreen';
import ServiceDetailScreen from '../ServiceDetailScreen/ServiceDetailScreen';

export type RootStackParamList = {
  Main: undefined;
  ServiceDetail: { serviceId: string };
  Home: undefined;
  Services: undefined;
  Products: undefined;
  Portfolio: undefined;
  News: undefined;
  About: undefined;
  Contact: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
    </Stack.Navigator>
  );
}

function ServicesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Services" component={ServicesScreen} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'home';

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Services') {
              iconName = focused ? 'construct' : 'construct-outline';
            } else if (route.name === 'Products') {
              iconName = focused ? 'cube' : 'cube-outline';
            } else if (route.name === 'Portfolio') {
              iconName = focused ? 'images' : 'images-outline';
            } else if (route.name === 'News') {
              iconName = focused ? 'newspaper' : 'newspaper-outline';
            } else if (route.name === 'About') {
              iconName = focused ? 'information-circle' : 'information-circle-outline';
            } else if (route.name === 'Contact') {
              iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4F46E5',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#F1F5F9',
            height: Platform.OS === 'ios' ? 90 : 70,
            paddingBottom: Platform.OS === 'ios' ? 30 : 10,
            paddingTop: 10,
          },
          headerStyle: {
            backgroundColor: '#4F46E5',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '600',
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Services" component={ServicesStack} />
        <Tab.Screen name="Products" component={ProductsScreen} />
        <Tab.Screen name="Portfolio" component={PortfolioScreen} />
        <Tab.Screen name="News" component={NewsScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
        <Tab.Screen name="Contact" component={ContactScreen} />
      </Tab.Navigator>
    </Stack.Navigator>
  );
}