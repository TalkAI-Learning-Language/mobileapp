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
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import AnimatedRecordButton from '@/components/ui/AnimatedRecordButton';
import PracticeVoiceAnimation from '@/components/ui/PracticeVoiceAnimation';

const { width, height } = Dimensions.get('window');

export default function GrammarVoiceLesson() {
  const [isListening, setIsListening] = useState(false);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleMicPress = () => {
    setIsListening(!isListening);
  };

  const handleNext = () => {
    // Navigate to next lesson or back to lessons
    router.back();
  };

  return (
    <LinearGradient
      colors={['#23244D', '#3B2676', '#7B3FA0', '#B86DD7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
            <Image
              source={require('@/assets/images/buttons/arrow_left.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Mary Carter</Text>
          
          <View style={styles.timerContainer}>
            <Image
              source={require('@/assets/images/lessons/clock.png')}
              style={styles.timerIcon}
            />
            <Text style={styles.timerText}>01:00</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.instructionText}>
            "Practice introducing yourself in English. Record and listen to your own voice."
          </Text>

        </View>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          <TouchableOpacity style={styles.sideButton}>
            <Image
              source={require('@/assets/images/buttons/keyboard.png')}
              style={styles.sideIcon}
            />
          </TouchableOpacity>

          <AnimatedRecordButton
            isListening={isListening}
            onPress={handleMicPress}
          />

          <TouchableOpacity style={styles.sideButton} onPress={handleNext}>
            <Image
              source={require('@/assets/images/buttons/next.png')}
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
    paddingTop: 70,
    paddingBottom: 20,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  timerIcon: {
    width: 14,
    height: 14,
    tintColor: '#FFFFFF',
    marginRight: 4,
  },
  timerText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  instructionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 80,
    opacity: 0.9,
  },
  voiceVisualization: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  outerCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 160,
    height: 160,
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
    backgroundColor: 'rgba(139, 92, 246, 0.8)',
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
    width: 100,
    height: 100,
  },
  pulseRing2: {
    width: 120,
    height: 120,
  },
  pulseRing3: {
    width: 140,
    height: 140,
  },
});