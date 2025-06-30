import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);

const NUM_FIREWORKS = 14;
const COLORS = [
  '#FFD700', '#FF69B4', '#00E1FF', '#A685FA', '#FF8C00', '#00FFB2',
  '#FF5E5E', '#7B6EF6', '#FFB347', '#B19CD9', '#FF6F61', '#6B8E23', '#40E0D0', '#FF6347'
];

// Helper for randomization
function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

// Precompute firework configs for consistency
const FIREWORKS_CONFIG = Array.from({ length: NUM_FIREWORKS }).map((_, idx) => {
  const angle = (idx / NUM_FIREWORKS) * 2 * Math.PI + randomBetween(-0.18, 0.18);
  const burstLength = randomBetween(55, 90);
  const fallLength = randomBetween(30, 60);
  const color = COLORS[idx % COLORS.length];
  const delay = randomBetween(0, 0.18);
  return { angle, burstLength, fallLength, color, delay };
});

export default function CongratsFireworkAnimation() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1800, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  // Firework burst and fall
  const getLineProps = (idx: number) =>
    useAnimatedProps(() => {
      const { angle, burstLength, fallLength, delay } = FIREWORKS_CONFIG[idx];
      let localProgress = (progress.value + delay) % 1;
      let length, x2, y2, opacity;
      if (localProgress < 0.4) {
        // Burst out
        const burstProgress = localProgress / 0.4;
        length = interpolate(burstProgress, [0, 1], [0, burstLength]);
        x2 = 75 + Math.cos(angle) * length;
        y2 = 75 + Math.sin(angle) * length;
        opacity = interpolate(burstProgress, [0, 0.2, 1], [0, 1, 1]);
      } else {
        // Fall down
        const fallProgress = (localProgress - 0.4) / 0.6;
        length = burstLength + interpolate(fallProgress, [0, 1], [0, fallLength]);
        const gravity = interpolate(fallProgress, [0, 1], [0, 40]);
        x2 = 75 + Math.cos(angle) * length;
        y2 = 75 + Math.sin(angle) * length + gravity;
        opacity = interpolate(fallProgress, [0, 0.7, 1], [1, 0.7, 0]);
      }
      return {
        x2,
        y2,
        opacity,
      };
    });

  // Center pulse
  const centerPulse = useAnimatedProps(() => ({
    r: interpolate(Math.sin(progress.value * 2 * Math.PI), [-1, 1], [18, 28]),
    opacity: interpolate(Math.cos(progress.value * 2 * Math.PI), [-1, 1], [0.5, 1]),
  }));

  return (
    <View style={styles.container}>
      <Svg width={150} height={150}>
        {/* Firework burst lines */}
        {FIREWORKS_CONFIG.map((fw, idx) => (
          <AnimatedLine
            key={idx}
            x1={75}
            y1={75}
            animatedProps={getLineProps(idx)}
            stroke={fw.color}
            strokeWidth={4}
            strokeLinecap="round"
          />
        ))}
        {/* Center pulse */}
        <AnimatedCircle
          cx={75}
          cy={75}
          animatedProps={centerPulse}
          fill="#fff"
        />
        <Circle cx={75} cy={75} r={12} fill="#FFD700" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
});