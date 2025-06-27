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

const { width, height } = Dimensions.get('window');

const CONVERSATION = [
  {
    id: 1,
    speaker: 'teacher',
    message: "Hi! I'll help you learn fast and speak with confidence! 😊 What's your name?",
    hasAudio: true,
  },
  {
    id: 2,
    speaker: 'user',
    message: "My name is Emma Doe! Let's start",
    hasAudio: false,
  },
  {
    id: 3,
    speaker: 'teacher',
    message: "Hi! I'll help you learn fast and speak with confidence! 😊 What's your name?",
    hasAudio: true,
  },
];

export default function GrammarLesson() {
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
      colors={['#1E3A8A', '#3B82F6', '#8B5CF6', '#A855F7']}
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

        {/* Teacher Avatar */}
        <View style={styles.teacherContainer}>
          <Image
            source={require('@/assets/images/teacher/teacher_1.png')}
            style={styles.teacherAvatar}
          />
        </View>

        {/* Conversation Messages */}
        <View style={styles.conversationContainer}>
          {CONVERSATION.map((item) => (
            <View key={item.id} style={styles.messageWrapper}>
              {item.speaker === 'teacher' ? (
                <View style={styles.teacherMessage}>
                  <Text style={styles.teacherMessageText}>{item.message}</Text>
                  {item.hasAudio && (
                    <View style={styles.messageActions}>
                      <TouchableOpacity style={styles.actionButton}>
                        <Image
                          source={require('@/assets/images/buttons/translate.png')}
                          style={styles.actionIcon}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionButton}>
                        <Image
                          source={require('@/assets/images/buttons/volumn.png')}
                          style={styles.actionIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ) : (
                <View style={styles.userMessage}>
                  <Text style={styles.userMessageText}>{item.message}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          <TouchableOpacity style={styles.sideButton}>
            <Image
              source={require('@/assets/images/buttons/keyboard.png')}
              style={styles.sideIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.micButton, isListening && styles.micButtonActive]}
            onPress={handleMicPress}
            activeOpacity={0.8}
          >
            <View style={styles.micButtonInner}>
              <Image
                source={require('@/assets/images/buttons/microphone.png')}
                style={styles.micIcon}
              />
            </View>
            {isListening && (
              <>
                <View style={[styles.pulseRing, styles.pulseRing1]} />
                <View style={[styles.pulseRing, styles.pulseRing2]} />
                <View style={[styles.pulseRing, styles.pulseRing3]} />
              </>
            )}
          </TouchableOpacity>

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
  teacherContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  teacherAvatar: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  conversationContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  teacherMessage: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 16,
    marginRight: 40,
  },
  teacherMessageText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 8,
  },
  messageActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    width: 16,
    height: 16,
    tintColor: '#666',
  },
  userMessage: {
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    borderRadius: 20,
    padding: 16,
    marginLeft: 40,
    alignSelf: 'flex-end',
  },
  userMessageText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
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