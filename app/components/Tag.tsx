import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming
} from 'react-native-reanimated';

interface TagProps {
  label: string;
  onPress?: () => void;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  selected?: boolean;
  animated?: boolean;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function Tag({
  label,
  onPress,
  variant = 'default',
  size = 'medium',
  icon,
  selected = false,
  animated = true
}: TagProps) {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const handlePressIn = () => {
    if (!animated) return;
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    if (!animated) return;
    scale.value = withSpring(1);
  };

  const handlePress = () => {
    if (animated) {
      rotate.value = withSequence(
        withTiming(10, { duration: 100 }),
        withTiming(-10, { duration: 100 }),
        withTiming(0, { duration: 100 })
      );
    }
    onPress?.();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotate.value}deg` }
    ],
  }));

  const variantStyles = {
    default: styles.default,
    primary: styles.primary,
    success: styles.success,
    warning: styles.warning,
    danger: styles.danger,
  };

  const sizeStyles = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  };

  const selectedStyle = selected ? styles.selected : {};

  return (
    <AnimatedTouchable
      style={[
        styles.tag,
        variantStyles[variant],
        sizeStyles[size],
        selectedStyle,
        animated && animatedStyle
      ]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
      disabled={!onPress}
    >
      {icon && <Animated.View style={styles.icon}>{icon}</Animated.View>}
      <Text style={[
        styles.label,
        variant === 'primary' && styles.primaryLabel,
        variant === 'success' && styles.successLabel,
        variant === 'warning' && styles.warningLabel,
        variant === 'danger' && styles.dangerLabel,
        selected && styles.selectedLabel
      ]}>
        {label}
      </Text>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 20,
    borderWidth: 1,
  },
  default: {
    backgroundColor: '#1A1A1A',
    borderColor: '#333',
  },
  primary: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderColor: '#4A90E2',
  },
  success: {
    backgroundColor: 'rgba(80, 200, 120, 0.1)',
    borderColor: '#50C878',
  },
  warning: {
    backgroundColor: 'rgba(255, 209, 102, 0.1)',
    borderColor: '#FFD166',
  },
  danger: {
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderColor: '#FF6B6B',
  },
  selected: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  small: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  medium: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  large: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  primaryLabel: {
    color: '#4A90E2',
  },
  successLabel: {
    color: '#50C878',
  },
  warningLabel: {
    color: '#FFD166',
  },
  dangerLabel: {
    color: '#FF6B6B',
  },
  selectedLabel: {
    color: 'white',
  },
  icon: {
    marginRight: 6,
  },
});