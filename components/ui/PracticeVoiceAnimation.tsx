// components/ui/PracticeVoiceAnimation.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function PracticeVoiceAnimation() {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  // Animated rings
  const getRingProps = (baseRadius: number, delay: number) =>
    useAnimatedProps(() => {
      // Each ring starts at a different time
      const localProgress = (progress.value + delay) % 1;
      const r = interpolate(localProgress, [0, 1], [baseRadius, baseRadius + 60]);
      const opacity = interpolate(localProgress, [0, 0.7, 1], [0.5, 0.2, 0]);
      return { r, opacity };
    });

  // Center pulse
  const centerPulse = useAnimatedProps(() => ({
    r: interpolate(Math.sin(progress.value * 2 * Math.PI), [-1, 1], [18, 24]),
    opacity: interpolate(Math.cos(progress.value * 2 * Math.PI), [-1, 1], [0.7, 1]),
  }));

  return (
    <View style={styles.gradientBackground}>
      <Svg width={200} height={200}>
        <Defs>
          <RadialGradient id="bg" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#5eaaff" stopOpacity="1" />
            <Stop offset="100%" stopColor="#a16cf4" stopOpacity="1" />
          </RadialGradient>
          <RadialGradient id="pulse" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <Stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        {/* Expanding rings */}
        <AnimatedCircle
          cx={100}
          cy={100}
          animatedProps={getRingProps(50, 0)}
          fill="none"
          stroke="#fff"
          strokeWidth={2}
        />
        <AnimatedCircle
          cx={100}
          cy={100}
          animatedProps={getRingProps(50, 0.33)}
          fill="none"
          stroke="#fff"
          strokeWidth={2}
        />
        <AnimatedCircle
          cx={100}
          cy={100}
          animatedProps={getRingProps(50, 0.66)}
          fill="none"
          stroke="#fff"
          strokeWidth={2}
        />
        {/* Center pulse */}
        <AnimatedCircle
          cx={100}
          cy={100}
          animatedProps={centerPulse}
          fill="url(#pulse)"
        />
        {/* Center dot */}
        <Circle cx={100} cy={100} r={10} fill="#fff" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    // For native gradients, use a library or wrap in a parent with a gradient
  },
});