import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';

import AnimatedRecordButton from '@/components/ui/AnimatedRecordButton';
import MagicalEffectAnimation from '@/components/ui/MagicalEffectAnimation';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');



export default function Voice() {
  const [isListening, setIsListening] = useState(false);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleMicPress = () => {
    setIsListening(!isListening);
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <LinearGradient
      colors={['#351555', '#6B35E7', '#442561']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.greeting}>Hi, Anastacia</Text>
          <Text style={styles.instruction}>Say something</Text>

          
          <View style={styles.content}>
            <MagicalEffectAnimation />
          </View>

          
        </View>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          <TouchableOpacity style={styles.sideButton} onPress={handleBack}>
            <Image
              source={require('@/assets/images/buttons/chat.png')}
              style={styles.sideIcon}
            />
          </TouchableOpacity>

          <View >
            <AnimatedRecordButton
              isListening={isListening}
              onPress={handleMicPress}
            />
          </View>
          {/* {isListening && (
              <>
                <View style={[styles.pulseRing, styles.pulseRing1]} />
                <View style={[styles.pulseRing, styles.pulseRing2]} />
                <View style={[styles.pulseRing, styles.pulseRing3]} />
              </>
            )} */}

          <TouchableOpacity style={styles.sideButton} onPress={handleClose}>
            <Image
              source={require('@/assets/images/buttons/close.png')}
              style={styles.sideIcon}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  signalBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  bar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  bar1: {
    width: 3,
    height: 4,
  },
  bar2: {
    width: 3,
    height: 6,
  },
  bar3: {
    width: 3,
    height: 8,
  },
  bar4: {
    width: 3,
    height: 10,
  },
  wifiIcon: {
    width: 16,
    height: 16,
    tintColor: '#FFFFFF',
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  battery: {
    width: 22,
    height: 11,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  batteryTip: {
    width: 2,
    height: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
    marginLeft: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: 80
  },
  greeting: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 16,
    opacity: 0.9,
  },
  instruction: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '300',
    marginBottom: 80,
    textAlign: 'center',
  },
  voiceVisualization: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircle: {
    width: 150,
    height: 150,
    borderRadius: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleCircle: {
    width: 120,
    height: 120,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 50,
    gap: 60,
  },
  sideButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  micButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  micButtonInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(179 147 252 / 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  micButtonActive: {
    // Active state handled by pulse rings
  },
  micIcon: {
    width: 32,
    height: 32,
    tintColor: '#FFFFFF',
  },
  pulseRing: {
    position: 'absolute',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
  pulseRing1: {
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  pulseRing2: {
    borderRadius: 100,
    width: 120,
    height: 120,
  },
  pulseRing3: {
    borderRadius: 100,
    width: 140,
    height: 140,
  },
});