import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor
} from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
  disabled?: boolean;
}

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary',
  icon,
  disabled = false 
}: ButtonProps) {
  const scale = useSharedValue(1);
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(
        pressed.value,
        [0, 1],
        variant === 'primary' 
          ? ['#4A90E2', '#357ABD']
          : variant === 'secondary'
          ? ['#1A1A1A', '#2A2A2A']
          : ['transparent', 'rgba(74, 144, 226, 0.1)']
      );
      return {
        transform: [{ scale: scale.value }],
        backgroundColor,
      };
    });

  const textStyle = {
    primary: styles.primaryText,
    secondary: styles.secondaryText,
    outline: styles.outlineText,
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
    pressed.value = withSpring(1);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    pressed.value = withSpring(0);
  };

  return (
    <AnimatedTouchable
      style={[styles.button, styles[variant], animatedStyle, disabled && styles.disabled]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {icon && <Animated.View style={styles.icon}>{icon}</Animated.View>}
      <Text style={[styles.text, textStyle[variant]]}>{title}</Text>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  primary: {
    backgroundColor: '#4A90E2',
  },
  secondary: {
    backgroundColor: '#1A1A1A',
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: '#4A90E2',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: 'white',
  },
  outlineText: {
    color: '#4A90E2',
  },
  icon: {
    marginRight: 8,
  },
});