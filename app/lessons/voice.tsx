import React, { useState, useEffect} from 'react';
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

import NotificationAccessDialog from '@/components/ui/NotificationAccessDialog';

import AnimatedRecordButton from '@/components/ui/AnimatedRecordButton';
import MagicalEffectAnimation from '@/components/ui/MagicalEffectAnimation';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
import { AllowNotificationAccess, getNotificationAccess, saveNotificationAccess } from '../storage/notificationAccess';


export default function Voice() {
  const [isListening, setIsListening] = useState(false);
  const [showNotifDialog, setShowNotifDialog] = useState(false);
  const [notificationAccess, setNotificationAccess] = useState<AllowNotificationAccess | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNotificationAccess = async () => {
      const info = await getNotificationAccess();
      setNotificationAccess(info);
    };
    fetchNotificationAccess();
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleMicPress = () => {
    setIsListening(!isListening);
    setShowNotifDialog(false);
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <LinearGradient
      colors={['#23244D', '#3B2676', '#7B3FA0', '#23244D']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.greeting}>Hi, Anastacia</Text>
          <Text style={styles.instruction}>Say something</Text>

          
          <Image source={require('@/assets/images/lessons/effect.png')} />

          
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
        {/* ... existing code above ... */}

        {showNotifDialog && !notificationAccess && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.4)',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 100,
            }}
          >
            <View
              style={{
                width: 320,
                backgroundColor: '#23232D',
                borderRadius: 20,
                padding: 10,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowRadius: 20,
                elevation: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: '#7B3FA0',
                  borderRadius: 32,
                  width: 48,
                  height: 48,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 16,
                }}
              >
                <Image
                  source={require('@/assets/images/lessons/notification_bell.png')}
                  style={{ width: 32, height: 32, tintColor: '#C1A3FF' }}
                />
              </View>
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: '600', marginBottom: 8, textAlign: 'center' }}>
                Notification Access
              </Text>
              <Text style={{ color: '#ccc', fontSize: 15, textAlign: 'center', marginBottom: 24 }}>
                We'd like to send you notifications to keep you informed about important updates
              </Text>
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    borderTopWidth: 1,
                    borderColor: '#333',
                    alignItems: 'center',
                    borderBottomLeftRadius: 20,
                  }}
                  onPress={() => setShowNotifDialog(false)}
                >
                  <Text style={{ color: '#fff', fontSize: 17 }}>Later</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderColor: '#333',
                    alignItems: 'center',
                    borderBottomRightRadius: 20,
                  }}
                  onPress={() => {
                    setNotificationAccess({ notification: true });
                    saveNotificationAccess({ notification: true});
                    setShowNotifDialog(false);
                  }}
                >
                  <Text style={{ color: '#B393FC', fontSize: 17, fontWeight: '600' }}>Allow</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
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