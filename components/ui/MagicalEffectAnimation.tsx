import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop, G, Path, LinearGradient } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedG = Animated.createAnimatedComponent(G);

const musicalNotes = [
  { angle: 0, color: '#FFD700' },
  { angle: 60, color: '#FF69B4' },
  { angle: 120, color: '#00E1FF' },
  { angle: 180, color: '#A685FA' },
  { angle: 240, color: '#FF8C00' },
  { angle: 300, color: '#00FFB2' },
];

const sparkles = [
  { angle: 30, delay: 0 },
  { angle: 90, delay: 0.2 },
  { angle: 150, delay: 0.4 },
  { angle: 210, delay: 0.6 },
  { angle: 270, delay: 0.8 },
  { angle: 330, delay: 1.0 },
];

export default function MagicalEffectAnimation() {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 4000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  // Center pulse
  const centerPulse = useAnimatedProps(() => ({
    r: interpolate(Math.sin(progress.value * 2 * Math.PI), [-1, 1], [38, 48]),
    opacity: interpolate(Math.cos(progress.value * 2 * Math.PI), [-1, 1], [0.7, 1]),
  }));

  // Radiating sound waves
  const wave1 = useAnimatedProps(() => ({
    r: interpolate(progress.value, [0, 1], [60, 110]),
    opacity: interpolate(progress.value, [0, 1], [0.4, 0]),
  }));
  const wave2 = useAnimatedProps(() => ({
    r: interpolate(progress.value, [0, 1], [80, 130]),
    opacity: interpolate(progress.value, [0, 1], [0.3, 0]),
  }));

  // Rotating gradient ring
  const ringRotation = useAnimatedProps(() => ({
    transform: [
      { rotate: `${progress.value * 360}deg` }
    ]
  }));

  // Musical notes orbiting, pulsing, and glowing
  const getNoteStyle = (noteIdx: number) =>
    useAnimatedStyle(() => {
      const angle = (musicalNotes[noteIdx].angle + progress.value * 360) * (Math.PI / 180);
      const radius = 90 + 8 * Math.sin(progress.value * 2 * Math.PI + noteIdx);
      const cx = 125 + Math.cos(angle) * radius;
      const cy = 125 + Math.sin(angle) * radius;
      const scale = 1 + 0.3 * Math.sin(progress.value * 2 * Math.PI + noteIdx);
      const opacity = 0.7 + 0.3 * Math.abs(Math.cos(progress.value * 2 * Math.PI + noteIdx));
      return {
        position: 'absolute',
        left: cx - 12,
        top: cy - 12,
        opacity,
        transform: [{ scale }],
      };
    });

  // Sparkle animation
  const getSparkleStyle = (sparkleIdx: number) =>
    useAnimatedStyle(() => {
      const sparkle = sparkles[sparkleIdx];
      const localProgress = (progress.value + sparkle.delay) % 1;
      const angle = (sparkle.angle + localProgress * 360) * (Math.PI / 180);
      const radius = 70 + 20 * Math.sin(localProgress * 2 * Math.PI);
      const cx = 125 + Math.cos(angle) * radius;
      const cy = 125 + Math.sin(angle) * radius;
      const scale = 0.7 + 0.6 * Math.abs(Math.sin(localProgress * Math.PI));
      const opacity = 0.5 + 0.5 * Math.abs(Math.cos(localProgress * Math.PI));
      return {
        position: 'absolute',
        left: cx - 6,
        top: cy - 6,
        opacity,
        transform: [{ scale }],
      };
    });

  return (
    <View style={styles.container}>
      <Svg width={250} height={250}>
        {/* Radiating sound waves */}
        <AnimatedCircle
          cx={125}
          cy={125}
          animatedProps={wave1}
          fill="none"
          stroke="#A685FA"
          strokeWidth={4}
        />
        <AnimatedCircle
          cx={125}
          cy={125}
          animatedProps={wave2}
          fill="none"
          stroke="#FFD700"
          strokeWidth={2}
        />
        {/* Center pulse */}
        <AnimatedCircle
          cx={125}
          cy={125}
          animatedProps={centerPulse}
          fill="url(#glow)"
        />
        <Circle cx={125} cy={125} r={24} fill="#fff" opacity={0.18} />
        {/* Glow gradient */}
        <Defs>
          <RadialGradient id="glow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <Stop offset="100%" stopColor="#A685FA" stopOpacity="0" />
          </RadialGradient>
          <LinearGradient id="ringGradient" x1="0" y1="0" x2="250" y2="250">
            <Stop offset="0%" stopColor="#FFD700" />
            <Stop offset="25%" stopColor="#FF69B4" />
            <Stop offset="50%" stopColor="#00E1FF" />
            <Stop offset="75%" stopColor="#A685FA" />
            <Stop offset="100%" stopColor="#FFD700" />
          </LinearGradient>
        </Defs>
      </Svg>
      {/* Musical notes (outside Svg, absolutely positioned) */}
      {musicalNotes.map((note, idx) => {
        const animatedStyle = getNoteStyle(idx);
        return (
            <Animated.View key={idx} style={animatedStyle}>
            <Text
                style={{
                fontSize: 28,
                color: note.color,
                fontWeight: 'bold',
                textShadowColor: note.color,
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 8,
                }}
            >
                ♪
            </Text>
            </Animated.View>
        );
        })}
      {/* Sparkles */}
      {sparkles.map((sparkle, idx) => {
        const sparkleStyle = getSparkleStyle(idx);
        return (
          <Animated.View key={`sparkle-${idx}`} style={sparkleStyle}>
            <Text style={{ fontSize: 16, color: '#fff', textShadowColor: '#fff', textShadowRadius: 6 }}>✦</Text>
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
});