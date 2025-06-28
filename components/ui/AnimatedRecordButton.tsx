import React, { useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

type AnimatedRecordButtonProps = {
    isListening: boolean;
    onPress: () => void;
};

export default function AnimatedRecordButton({ isListening, onPress }: AnimatedRecordButtonProps) {
  // Bubble animation values
  const bubble1 = useSharedValue(0);
  const bubble2 = useSharedValue(0);

  // Start/stop animation based on isListening
  useEffect(() => {
    if (isListening) {
      bubble1.value = withRepeat(
        withTiming(1, { duration: 1200, easing: Easing.out(Easing.ease) }),
        -1,
        false
      );
      setTimeout(() => {
        bubble2.value = withRepeat(
          withTiming(1, { duration: 1200, easing: Easing.out(Easing.ease) }),
          -1,
          false
        );
      }, 600); // Stagger the second bubble
    } else {
      cancelAnimation(bubble1);
      cancelAnimation(bubble2);
      bubble1.value = 0;
      bubble2.value = 0;
    }
  }, [isListening]);

  // Animated styles for bubbles
    const bubbleStyle = (bubble : any) =>
        useAnimatedStyle(() => ({
        opacity: 0.4 * (1 - bubble.value),
        transform: [
            { scale: 1 + bubble.value * 1.8 },
        ],
        }));

    const bubble1Style = useAnimatedStyle(() => ({
        opacity: 0.3 * (1 - bubble1.value),
        transform: [{ scale: 1 + bubble1.value * 1.8 }],
        }));
    const bubble2Style = useAnimatedStyle(() => ({
        opacity: 0.4 * (1 - bubble2.value),
        transform: [{ scale: 1 + bubble2.value * 1.8 }],
        }));
    const bubble3Style = useAnimatedStyle(() => ({
        opacity: 0.4 * (1 - bubble2.value),
        transform: [{ scale: 1 + bubble2.value * 1.8 }],
        }));

  return (
    <View style={styles.container}>
      {/* Bubble Animations */}
      <Animated.View style={[styles.bubble, bubble1Style]} pointerEvents="none" />
      <Animated.View style={[styles.bubble, bubble2Style]} pointerEvents="none" />
      <Animated.View style={[styles.bubble, bubble3Style]} pointerEvents="none" />
      {/* Record Button */}
      <TouchableOpacity
        style={styles.micButton}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#667EEA', '#A685FA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButton}
        >
          <Image
            source={require('@/assets/images/buttons/microphone.png')}
            style={styles.micIcon}
          />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const BUTTON_SIZE = 72;
const BUBBLE_SIZE = 70;

const styles = StyleSheet.create({
  container: {
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    position: 'absolute',
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: BUBBLE_SIZE / 2,
    backgroundColor: '#A685FA',
    zIndex: 0,
  },
  micButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    elevation: 3,
  },
  gradientButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micIcon: {
    width: 36,
    height: 36,
    tintColor: 'white',
  },
});