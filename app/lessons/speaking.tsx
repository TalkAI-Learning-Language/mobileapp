import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { encode as btoa } from 'base-64';

import AnimatedRecordButton from '@/components/ui/AnimatedRecordButton';
import LoadingOverlay from '@/components/LoadingOverlay';

const { width, height } = Dimensions.get('window');

export default function GrammarLesson() {
  const [isListening, setIsListening] = useState(false);
  const [inputMode, setInputMode] = useState<'audio' | 'text'>('audio');
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState([
    {
      id: 1,
      speaker: 'teacher',
      message: "Hi! I'll help you learn fast and speak with confidence! 😊 What's your name?",
      hasAudio: true,
    },
  ]);
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

    // Add handler for speak button
  const handleSpeakMessage = (message: string) => {
    playTextWithElevenLabsTTS(message, setIsLoading);
  };

  // Add this helper function to convert ArrayBuffer to Base64
  function arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  // Add this function to play text with ElevenLabs TTS
  async function playTextWithElevenLabsTTS(text: string, setIsLoading: (loading: boolean) => void) {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/dCnu06FiOZma2KVNUoPZ`,
        {
          method: 'POST',
          headers: {
            'xi-api-key': 'sk_8d2b0a34e73399bd9a9c03a70be3f1dc42a8031e5ee19730',
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.5,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get TTS audio');
      }

      const arrayBuffer = await response.arrayBuffer();
      const base64Audio = arrayBufferToBase64(arrayBuffer);
      const tempFilePath = FileSystem.cacheDirectory + `tts_${Date.now()}.mp3`;
      await FileSystem.writeAsStringAsync(tempFilePath, base64Audio, { encoding: FileSystem.EncodingType.Base64 });

      const { sound } = await Audio.Sound.createAsync({ uri: tempFilePath });
      await sound.playAsync();
    } catch (err: any) {
      console.error('TTS Error:', err.message);
      Alert.alert('Error', err.message || 'Failed to play TTS audio');
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyboardToggle = () => setInputMode('text');
  const handleMicInInput = () => setInputMode('audio');
  const handleSendInput = async () => {
    if (userInput.trim() === '') return;
    const userMessageId = Date.now();

    // Show loading overlay
    setIsLoading(true);
    setConversation(prev => [
      ...prev,
      {
        id: userMessageId,
        speaker: 'user',
        message: userInput,
        hasAudio: false,
      }
    ]);

    const newHistory = buildHistoryString([
      ...conversation,
      { speaker: 'user', message: userInput }
    ]);

    try {
      const teacherMessage = await fetchTeacherResponse(userInput, newHistory);
  
      const teacherMessageId = Date.now() + 1;
      // 4. Add teacher response to conversation
      setConversation(prev => [
        ...prev,
        {
          id: teacherMessageId,
          speaker: 'teacher',
          message: teacherMessage,
          hasAudio: true,
        }
      ]);
    } catch (err) {
      // Optionally handle error
      const errorMessageId = Date.now() + 2;
      setConversation(prev => [
        ...prev,
        {
          id: errorMessageId,
          speaker: 'teacher',
          message: "Sorry, I couldn't get a response.",
          hasAudio: false,
        }
      ]);
    } finally {
      // Show loading overlay
      setIsLoading(false);
    }
    setUserInput('');
    // setShowKeyboard(false);
  };

  function buildHistoryString(conversation: {speaker: string, message: string}[]) {
    return conversation.map(item => `${item.speaker}: ${item.message}`).join('\n');
  }

  async function fetchTeacherResponse(userMessage: string, history: string) {
    const response = await fetch('http://3.137.223.204:8080/api/v1/chat/get_text_response', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        history: history,
      }),
    });
    if (!response.ok) throw new Error('Failed to get response');
    const data = await response.json();
    return data.message;
  }

  return (
    <LinearGradient
      colors={['#23244D', '#3B2676', '#7B3FA0', '#B86DD7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <LoadingOverlay visible={isLoading} />
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
        <View style={styles.teacherCard}>
          <Image
            source={require('@/assets/images/teacher/teacher_1.png')}
            style={styles.teacherAvatar}
          />
          <View style={styles.teacherInfo}>
            <Text style={styles.teacherName}>Mary Carter</Text>
            <Text style={styles.teacherSubtitle}>
              Listen, repeat and write these words
            </Text>
          </View>
        </View>

        {/* Conversation Messages */}
        <View style={styles.conversationWrapper}>
          <ScrollView
            style={styles.conversationContainer}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={true}
          >
            {conversation.map((item) => (
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
                        <TouchableOpacity 
                          style={styles.actionButton}
                          onPress={() => handleSpeakMessage(item.message)}
                          disabled={isLoading}
                        >
                          <Image
                            source={require('@/assets/images/buttons/volumn.png')}
                            style={[styles.actionIcon, isLoading && {opacity: 0.5}]}
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
          </ScrollView>
        </View>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          {inputMode === 'text' ? (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Type here..."
                placeholderTextColor="#999"
                value={userInput}
                onChangeText={setUserInput}
                autoFocus
              />
              <TouchableOpacity style={styles.micInInputButton} onPress={handleMicInInput}>
                <Image source={require('@/assets/images/buttons/microphone.png')} style={styles.micIconSmall} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.sendButton} onPress={handleSendInput}>
                <Text style={styles.sendButtonText}>→</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.sideButton} onPress={handleKeyboardToggle}>
                <Image source={require('@/assets/images/buttons/keyboard.png')} style={styles.sideIcon} />
              </TouchableOpacity>
              <AnimatedRecordButton
                isListening={isListening}
                onPress={handleMicPress}
              />
              <TouchableOpacity style={styles.sideButton} onPress={handleClose}>
                <Image
                  source={require('@/assets/images/buttons/close.png')}
                  style={styles.sideIcon}
                />
              </TouchableOpacity>
            </View>
          )}
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
    backgroundColor: 'transparent',
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
  conversationWrapper: {
    flex: 1,
    width: '100%',
  },
  conversationContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  messageWrapper: {
    marginBottom: 16,
    minWidth: 220, 
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
    width: 20,
    height: 20,
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
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  teacherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  teacherAvatar: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 16,
  },
  teacherInfo: {
    flex: 1,
  },
  teacherName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222B45',
    marginBottom: 4,
  },
  teacherSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 40,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  micInInputButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  micIconSmall: {
    width: 20,
    height: 20,
    tintColor: '#7B6EF6',
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#667EEA',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,

    gap: 46,
  },
  conversationScrollWrapper: {
    maxHeight: 800,
    width: '100%',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});