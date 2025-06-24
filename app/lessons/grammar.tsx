import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput
} from 'react-native';
import { useRouter } from 'expo-router';

const GRAMMAR_QUESTIONS = [
  {
    id: 1,
    question: "Hi! I'll help you learn fast and speak with confidence! 😊 What's your name?",
    userResponse: "My name is Emma Doe! Let's start",
    teacherResponse: "Ready to dive into our beach vacation plans? What's your ideal beach vibe: chill or adventure?",
    audioIcons: true,
  },
  {
    id: 2,
    question: "Great! Now let's practice some grammar structures.",
    userResponse: "123123123",
    teacherResponse: "123123123",
    audioIcons: false,
  },
];

export default function GrammarLesson() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const router = useRouter();

  const currentQuestion = GRAMMAR_QUESTIONS[currentQuestionIndex];
  const progress = `${currentQuestionIndex + 1}/${GRAMMAR_QUESTIONS.length}`;

  const handleBack = () => {
    router.back();
  };

  const handleMicPress = () => {
    setIsRecording(!isRecording);
  };

  const handleNext = () => {
    if (currentQuestionIndex < GRAMMAR_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Lesson complete
      router.back();
    }
  };

  const handleKeyboardToggle = () => {
    setShowKeyboard(!showKeyboard);
  };

  const handleSendInput = () => {
    // Handle user input submission
    setUserInput('');
    setShowKeyboard(false);
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
        <View style={styles.progressContainer}>
          <Text style={styles.heartIcon}>❤️</Text>
          <Text style={styles.progressText}>{progress}</Text>
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
        {/* Teacher Question */}
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{currentQuestion.question}</Text>
          {currentQuestion.audioIcons && (
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

        {/* User Response */}
        {currentQuestion.userResponse && (
          <View style={styles.userMessageContainer}>
            <Text style={styles.userMessageText}>{currentQuestion.userResponse}</Text>
          </View>
        )}

        {/* Teacher Response */}
        {currentQuestion.teacherResponse && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{currentQuestion.teacherResponse}</Text>
            {currentQuestion.audioIcons && (
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
        )}
      </ScrollView>

      {/* Bottom Controls */}
      {showKeyboard ? (
        <View style={styles.keyboardSection}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Type here..."
              placeholderTextColor="#999"
              value={userInput}
              onChangeText={setUserInput}
              autoFocus
            />
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={handleSendInput}
            >
              <Text style={styles.sendButtonText}>→</Text>
            </TouchableOpacity>
          </View>
          
          {/* Custom Keyboard Suggestions */}
          <View style={styles.suggestions}>
            <TouchableOpacity style={styles.suggestionButton}>
              <Text style={styles.suggestionText}>"The"</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.suggestionButton}>
              <Text style={styles.suggestionText}>the</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.suggestionButton}>
              <Text style={styles.suggestionText}>to</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.sideButton}
            onPress={handleKeyboardToggle}
          >
            <Image source={require('@/assets/images/buttons/keyboard.png')} style={styles.sideIcon} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.micButton}>
            <Image source={require('@/assets/images/buttons/microphone.png')} style={styles.micIcon} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.sideButton}
            onPress={handleNext}
          >
            <Image source={require('@/assets/images/buttons/next.png')} style={styles.sideIcon} />
          </TouchableOpacity>
        </View>
      )}
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
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  heartIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  teacherImageContainer: {
    alignItems: 'center',
    height: '20%',
    marginBottom: 20,
    position: 'relative',
  },
  teacherImage: {
    width: '90%',
    height: '100%',
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
  messageContainer: {
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
  messageText: {
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
    marginBottom: 40
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
  micButtonActive: {
    backgroundColor: '#EF4444',
  },
  micButtonIcon: {
    fontSize: 32,
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
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: 40,
    backgroundColor: '#7B6EF6', // purple
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7B6EF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 4,
  },
  keyboardSection: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
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
  suggestions: {
    flexDirection: 'row',
    gap: 8,
  },
  suggestionButton: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
  },
  micIcon: {
    width: 36,
    height: 36,
    tintColor: '#fff', // white mic icon
  },
  iconImage: {
    width: 18,
    height: 18,
    tintColor: '#A0AEC0', // Muted gray
  },
  chatIconImage: {
    width: 18,
    height: 18,
    tintColor: '#A0AEC0', // Muted gray
  },
});