import React from 'react';
import { TextInput, TextInputProps, StyleSheet, View, Text } from 'react-native';
import Animated, { 
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function Input({ label, error, style, onFocus, onBlur, ...props }: InputProps) {
  const focus = useSharedValue(0);
  const borderColor = useSharedValue('#333');

  const handleFocus = (e: any) => {
    focus.value = withTiming(1);
    borderColor.value = withTiming('#4A90E2');
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    focus.value = withTiming(0);
    borderColor.value = withTiming('#333');
    onBlur?.(e);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
    transform: [
      { 
        translateY: interpolate(
          focus.value,
          [0, 1],
          [0, -8],
          Extrapolate.CLAMP
        )
      }
    ],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    fontSize: interpolate(
      focus.value,
      [0, 1],
      [16, 14],
      Extrapolate.CLAMP
    ),
    color: interpolate(
      focus.value,
      [0, 1],
      ['#888', '#4A90E2'],
      Extrapolate.CLAMP
    ),
  }));

  return (
    <View style={styles.container}>
      {label && (
        <Animated.Text style={[styles.label, labelStyle]}>
          {label}
        </Animated.Text>
      )}
      <AnimatedTextInput
        style={[styles.input, animatedStyle, style]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderTextColor="#666"
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    color: 'white',
    fontSize: 16,
  },
  error: {
    color: '#FF6B6B',
    fontSize: 14,
    marginTop: 4,
  },
});