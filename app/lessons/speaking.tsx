import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';

const SPEAKING_CONVERSATION = [
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
    message: "Ready to dive into our beach vacation plans? What's your ideal beach vibe: chill or adventure?",
    hasAudio: true,
  },
];

export default function SpeakingLesson() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentTime, setCurrentTime] = useState('09:00');
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleMicPress = () => {
    setIsRecording(!isRecording);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image
            source={require('@/assets/images/buttons/arrow_left.png')}
            style={styles.iconImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mary Carter</Text>
        <View style={styles.timerContainer}>
          <Text style={styles.timerIcon}>⏱️</Text>
          <Text style={styles.timerText}>{currentTime}</Text>
        </View>
      </View>

      {/* Teacher Image */}
      <View style={styles.teacherImageContainer}>
        <Image
          source={require('@/assets/images/default_avatar.png')}
          style={styles.teacherImage}
        />
        <TouchableOpacity style={styles.soundToggle}>
          <Text style={styles.soundToggleIcon}>🔊</Text>
        </TouchableOpacity>
      </View>

      {/* Conversation */}
      <ScrollView style={styles.conversationContainer} showsVerticalScrollIndicator={false}>
        {SPEAKING_CONVERSATION.map((item) => (
          <View key={item.id}>
            {item.speaker === 'teacher' ? (
              <View style={styles.teacherMessageContainer}>
                <Text style={styles.teacherMessageText}>{item.message}</Text>
                {item.hasAudio && (
                  <View style={styles.audioControls}>
                    <TouchableOpacity style={styles.audioButton}>
                      <Image source={require('@/assets/images/buttons/translate.png')} style={styles.chatIconImage}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.audioButton}>
                      <Image source={require('@/assets/images/buttons/volumn.png')} style={styles.chatIconImage} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ) : (
              <View style={styles.userMessageContainer}>
                <Text style={styles.userMessageText}>{item.message}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.sideButton}
        >
          <Image source={require('@/assets/images/buttons/keyboard.png')} style={styles.sideIcon} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.micButton}>
          <Image source={require('@/assets/images/buttons/microphone.png')} style={styles.micIcon} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.sideButton}
        >
          <Image source={require('@/assets/images/buttons/next.png')} style={styles.sideIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 20,
  },
  backButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backButtonText: {
    fontSize: 20,
    color: '#333',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
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
    fontSize: 14,
    marginRight: 4,
  },
  timerText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  teacherImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  teacherImage: {
    width: 350,
    height: 200,
    borderRadius: 20,
  },
  soundToggle: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  soundToggleIcon: {
    fontSize: 20,
  },
  conversationContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  teacherMessageContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  teacherMessageText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 12,
  },
  audioControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  audioButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioIcon: {
    fontSize: 16,
  },
  userMessageContainer: {
    backgroundColor: '#E8EDFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignSelf: 'flex-end',
    maxWidth: '80%',
  },
  userMessageText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  bottomControls: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  actionButtonIcon: {
    fontSize: 20,
  },
  micButton: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: '#667EEA',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
  },
  micButtonActive: {
    backgroundColor: '#EF4444',
  },
  micButtonIcon: {
    fontSize: 32,
  },
  iconImage: {
    backgroundColor: 'transparent',
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  sideButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E5E7EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  sideIcon: {
    width: 20,
    height: 20,
    tintColor: '#7B6EF6', // purple as in design
  },
  micIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff', // white mic icon
  },
  chatIconImage: {
    width: 18,
    height: 18,
    tintColor: '#A0AEC0', // Muted gray
  },
});