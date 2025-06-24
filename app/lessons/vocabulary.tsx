import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { useRouter } from 'expo-router';

import { LinearGradient } from 'expo-linear-gradient'; // Add this import

const VOCABULARY_WORDS = [
  { id: 1, word: 'Apple', pronunciation: '/ˈæpəl/' },
  { id: 2, word: 'Banana', pronunciation: '/bəˈnænə/' },
  { id: 3, word: 'Orange', pronunciation: '/ˈɔːrɪndʒ/' },
  { id: 4, word: 'Grape', pronunciation: '/ɡreɪp/' },
  { id: 5, word: 'Strawberry', pronunciation: '/ˈstrɔːberi/' },
];

export default function VocabularyLesson() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [showNextModal, setShowNextModal] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [nextPracticeInput, setNextPracticeInput] = useState('');
  const router = useRouter();

  const currentWord = VOCABULARY_WORDS[currentWordIndex];
  const progress = `${currentWordIndex + 1}/${VOCABULARY_WORDS.length}`;

  const handleBack = () => {
    router.back();
  };

  const handleKeyboardToggle = () => {
    setShowKeyboard(!showKeyboard);
  };

  const handleNext = () => {
    if (currentWordIndex < VOCABULARY_WORDS.length - 1) {
      setShowNextModal(true);
    } else {
      // Lesson complete
      router.back();
    }
  };

  const handleSubmitNext = () => {
    setShowNextModal(false);
    setNextPracticeInput('');
    setCurrentWordIndex(currentWordIndex + 1);
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
        <View style={styles.progressContainer}>
          <Text style={styles.heartIcon}>❤️</Text>
          <Text style={styles.progressText}>{progress}</Text>
        </View>
      </View>

      {/* Teacher Image */}
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

      {/* Word Display */}
      <View style={styles.wordCard}>
        <Text style={styles.wordText}>{currentWord.word}</Text>
        <View style={styles.wordCardActions}>
          <TouchableOpacity style={styles.iconButton}>
            {/* Replace with your translation icon */}
            <Image source={require('@/assets/images/buttons/translate.png')} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            {/* Replace with your audio icon */}
            <Image source={require('@/assets/images/buttons/volumn.png')} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
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

        {/* Audio Controls
        {!showKeyboard && (
          <View style={styles.audioControls}>
            <TouchableOpacity style={styles.audioButton}>
              <Text style={styles.audioIcon}>🔄</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.audioButton}>
              <Text style={styles.audioIcon}>🔊</Text>
            </TouchableOpacity>
          </View>
        )} */}
      </View>

      {/* Next Practice Modal */}
      <Modal
        visible={showNextModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowNextModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowNextModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                <TouchableOpacity 
                  style={styles.modalCloseButton}
                  onPress={() => setShowNextModal(false)}
                >
                  <Text style={styles.modalCloseText}>×</Text>
                </TouchableOpacity>
                
                <Text style={styles.modalTitle}>What do you want to practice next?</Text>
                
                <TextInput
                  style={styles.modalInput}
                  placeholder="Type here..."
                  placeholderTextColor="#999"
                  value={nextPracticeInput}
                  onChangeText={setNextPracticeInput}
                  multiline
                />
                
                <TouchableOpacity style={styles.modalMicButton}>
                  <Image source={require('@/assets/images/buttons/microphone.png')} />
                </TouchableOpacity>
                {/* style={styles.modalSubmitButton} */}
                
                <TouchableOpacity
                  onPress={handleSubmitNext}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#667EEA', '#764BA2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                      styles.continueButton
                    ]}
                  >
                    <Text style={styles.continueButtonText}>Submit</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    paddingBottom: 10,
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
  teacherSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  teacherImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  teacherMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  wordSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  word: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  pronunciation: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  bottomControls: {
    paddingHorizontal: 20,
    paddingTop: 40
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
  micButtonIcon: {
    fontSize: 32,
  },
  audioControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
  },
  audioButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioIcon: {
    fontSize: 18,
  },
  keyboardSection: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: {
    fontSize: 20,
    color: '#666',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  modalInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalMicButton: {
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#667EEA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  modalMicIcon: {
    fontSize: 20,
  },
  modalSubmitButton: {
    backgroundColor: '#667EEA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  modalSubmitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
  wordCard: {
    backgroundColor: '#F7FAFC',
    borderRadius: 24,
    padding: 32,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 350,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 2,
    position: 'relative',
  },
  wordText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222B45',
    textAlign: 'center',
  },
  wordCardActions: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    right: 16,
    gap: 8,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  iconImage: {
    width: 18,
    height: 18,
    tintColor: '#A0AEC0', // Muted gray
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    gap: 36, // space between buttons
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
    backgroundColor: '#7B6EF6', // purple
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7B6EF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 4,
  },
  micIcon: {
    width: 36,
    height: 36,
    tintColor: '#fff', // white mic icon
  },
  continueButton: {
    backgroundColor: '#667EEA',
    borderRadius: 50,
    marginLeft: 30,
    marginRight: 30,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});