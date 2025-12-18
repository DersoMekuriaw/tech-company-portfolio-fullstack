import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface CardProps {
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
  animated?: boolean;
}

export default function Card({ children, style, onPress, animated = true }: CardProps) {
  const scale = useSharedValue(1);
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const handleGesture = (event: any) => {
    if (!animated) return;
    
    const { locationX, locationY } = event.nativeEvent;
    const centerX = width / 2;
    const centerY = 100;
    
    rotateX.value = withSpring((locationY - centerY) / 20);
    rotateY.value = withSpring((locationX - centerX) / 20);
  };

  const resetGesture = () => {
    if (!animated) return;
    rotateX.value = withSpring(0);
    rotateY.value = withSpring(0);
  };

  const handlePressIn = () => {
    if (!animated) return;
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    if (!animated) return;
    scale.value = withSpring(1);
    resetGesture();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotateX: `${rotateX.value}deg` },
      { rotateY: `${rotateY.value}deg` },
    ],
    shadowOpacity: interpolate(
      scale.value,
      [0.98, 1],
      [0.3, 0.5],
      Extrapolate.CLAMP
    ),
  }));

  return (
    <Animated.View
      style={[styles.card, animated && animatedStyle, style]}
      onTouchMove={handleGesture}
      onTouchEnd={() => {
        resetGesture();
        if (onPress) {
          handlePressOut();
          onPress();
        } else {
          handlePressOut();
        }
      }}
      onTouchStart={handlePressIn}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
});