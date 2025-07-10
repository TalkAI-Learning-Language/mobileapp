import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Animated,
  Dimensions,
  TouchableNativeFeedbackComponent,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system'
import Slider from '@react-native-community/slider'

import AnimatedRecordButton from '@/components/ui/AnimatedRecordButton';
import { LinearGradient } from 'expo-linear-gradient'; // Add this import

const LISTENING_SCRIPT = [
  { text: "If you want to know more about our subscription service, it covers even more fascinating topics than you hear on the podcast.", hasAudio: true },
  { text: "More in depth and many more of them. Our paid subscription service is helping a lot of people develop their English language skills.", hasAudio: true },
  { text: "And we've covered some great topics recently. Find out what I really thought of Jeff Bezos' Blue Origin Rocket which took six women into space recently.", hasAudio: true },
  { text: "Hear about how we make our coffee and find out about the trend in the art world towards 'immersive experiences'.", hasAudio: true },
  { text: "That's really evident in London and other places and learn whether you suffer from a particular type of social anxiety that's very common and what to do about it.", hasAudio: true },
  { text: "Those were just some recent topics. Many more are covered in our subscription service and it's great value for money and a brilliant way to continue improving your English.", hasAudio: true },
  { text: "So the harm done by weight watchers and calorie counting to a generation of women?", hasAudio: true },
  { text: "First of all, just an acknowledgement to anyone listening who's done Weight Watchers or done calorie counted dieting, calorie controlled dieting, if it worked for you well done.", hasAudio: true },
  { text: "I in no way want to lessen that achievement. If anything even more praised because what I'm saying is that it's actually quite difficult to lose weight on a calorie counted diet.", hasAudio: true },
  { text: "It needs huge amounts of self-control. I mentioned in subscription episode 72 a newspaper article I read by Zing Tseng.", hasAudio: true },
  { text: "With the title, 'A Generation of Women are Still Haunted by Weight Watchers'. The word 'haunted' there is from the verb 'to haunt', H-A-U-N-T which means 'to cause repeated suffering or anxiety'.", hasAudio: true },
  { text: "That's a big word. So the idea that Weight Watchers has caused lots of suffering and anxiety.", hasAudio: true },
  { text: "Zing Tseng also says, \"Weight Watchers and calorie restriction profoundly altered how a generation of women and girls felt about food, not as a pleasurable source of nourishment but as something to be controlled and limited.\"", hasAudio: true },
  { text: "Or as she says later in the article, \"The idea of food as something to be portioned and carefully handled like a radioactive substance which could ruin your week if you weren't careful.\"", hasAudio: true },
];

const COMPREHENSION_QUESTIONS = [
  {
    question: "What does the speaker say about the subscription service?",
    options: [
      "It's only for advanced English learners.",
      "It covers more fascinating topics in greater depth than the podcast.",
      "It's completely free for all listeners."
    ],
    correctAnswer: "It covers more fascinating topics in greater depth than the podcast."
  },
  {
    question: "What is one of the topics mentioned in the subscription service?",
    options: [
      "How to lose weight with calorie counting.",
      "Jeff Bezos' Blue Origin Rocket that took six women to space.",
      "How to cook healthy meals at home."
    ],
    correctAnswer: "Jeff Bezos' Blue Origin Rocket that took six women to space."
  },
  {
    question: "According to the article by Zing Tseng, what does the word 'haunted' mean in the context?",
    options: [
      "To be visited by ghosts.",
      "To cause repeated suffering or anxiety.",
      "To remember fondly."
    ],
    correctAnswer: "To cause repeated suffering or anxiety."
  },
  {
    question: "How does Zing Tseng describe how Weight Watchers made women view food?",
    options: [
      "As a pleasurable source of nourishment.",
      "As something to be enjoyed in moderation.",
      "As something to be controlled and limited, like a radioactive substance."
    ],
    correctAnswer: "As something to be controlled and limited, like a radioactive substance."
  },
  {
    question: "What does the speaker acknowledge about calorie counting diets?",
    options: [
      "They are the best way to lose weight.",
      "They require huge amounts of self-control and are difficult.",
      "They are completely ineffective for everyone."
    ],
    correctAnswer: "They require huge amounts of self-control and are difficult."
  }
];

const COMPREHENSION_OPTIONS = [
  'Going to work',
  'The weekend',
  'A birthday party',
];

export default function ListeningLesson() {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showResultsPage, setShowResultsPage] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Pro');
  const [showFullVersion, setShowFullVersion] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Add new state variables for audio playback
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);
  const [showAudioControls, setShowAudioControls] = useState(false);
  const bottomSheetAnim = useRef(new Animated.Value(0)).current;
  
  // Add state for sentence audio
  const [currentSentenceSound, setCurrentSentenceSound] = useState<Audio.Sound | null>(null);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number | null>(null);
  const [isSentencePlaying, setIsSentencePlaying] = useState(false);
  
  const router = useRouter();
  const AUDIO_FILE = require('@/assets/music/1-2.mp3')

  // Load and unload sound when component mounts/unmounts
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  // Function to load and play audio
  const loadAndPlayAudio = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      
      const { sound: newSound } = await Audio.Sound.createAsync(AUDIO_FILE, 
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );
      
      setSound(newSound);
      setIsPlaying(true);
      setShowAudioControls(true);
      
      // Animate bottom sheet up
      Animated.timing(bottomSheetAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
      
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  };

  // Function to handle playback status updates
  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPlaybackPosition(status.positionMillis);
      setPlaybackDuration(status.durationMillis || 0);
      setIsPlaying(status.isPlaying);
      
      // Auto-hide controls when playback ends
      if (status.didJustFinish) {
        setIsPlaying(false);
        hideAudioControls();
      }
    }
  };

  // Function to toggle play/pause
  const togglePlayPause = async () => {
    if (!sound) return;
    
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  // Function to seek to position
  const seekAudio = async (position: number) => {
    if (sound) {
      await sound.setPositionAsync(position);
    }
  };

  // Function to hide audio controls
  const hideAudioControls = () => {
    Animated.timing(bottomSheetAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setShowAudioControls(false);
    });
  };

  // Function to format time in mm:ss
  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Function to convert ArrayBuffer to Base64
  function arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  // Function to play text with ElevenLabs TTS
  async function playTextWithElevenLabsTTS(text: string, sentenceIndex: number) {
    // Stop any currently playing sentence audio
    if (currentSentenceSound) {
      await currentSentenceSound.stopAsync();
      await currentSentenceSound.unloadAsync();
      setCurrentSentenceSound(null);
    }
    
    // Stop main audio if it's playing
    if (sound && isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
    
    setCurrentSentenceIndex(sentenceIndex);
    setIsSentencePlaying(true);
    
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

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: tempFilePath },
        { shouldPlay: true },
        onSentencePlaybackStatusUpdate
      );
      
      setCurrentSentenceSound(newSound);
    } catch (err: any) {
      console.error('TTS Error:', err.message);
      Alert.alert('Error', err.message || 'Failed to play TTS audio');
      setIsSentencePlaying(false);
      setCurrentSentenceIndex(null);
    }
  }
  
  // Function to handle sentence playback status updates
  const onSentencePlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setIsSentencePlaying(status.isPlaying);
      
      // When sentence audio finishes
      if (status.didJustFinish) {
        setIsSentencePlaying(false);
        setCurrentSentenceIndex(null);
      }
    }
  };
  
  // Clean up sentence audio when component unmounts
  useEffect(() => {
    return () => {
      if (currentSentenceSound) {
        currentSentenceSound.unloadAsync();
      }
    };
  }, [currentSentenceSound]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      if (currentQuestionIndex < COMPREHENSION_QUESTIONS.length - 1) {
        // Move to next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(''); // Clear the selected answer for the next question
      } else {
        // All questions answered, show completion modal
        setShowCompletionModal(true);
      }
    }
  };

  const handleMicPress = () => {
    setIsListening(!isListening);
  }

  const handleFinishLesson = () => {
    setShowCompletionModal(false);
    setShowUpgradeModal(false);
    setShowResultsPage(false);
    setShowFullVersion(false);
    router.push('/(tabs)/lessons');
  };

  const handleNextExample = () => {
    setShowCompletionModal(false);
    setShowUpgradeModal(true);
  };

  const handleKeepGoing = () => {
    setShowUpgradeModal(false);
    setSelectedAnswer('');
  };

  const handleSeePlans = () => {
    setShowUpgradeModal(false);
    setShowResultsPage(true);
  };

  const handleBack = () => {
    if (showResultsPage) {
      setShowResultsPage(false);
      return;
    }
    router.back();
  };

  // Helper to render message text with optional underline
  const renderMessageText = (item: typeof LISTENING_SCRIPT[0]) => {
    // Check if the item has the underline properties before using them
    if ('hasUnderline' in item && item.hasUnderline && 'underline' in item && item.underline) {
      const underline = item.underline as string;
      const [before, after] = item.text.split(underline);
      return (
        <Text>
          {before}
          <Text style={styles.underlinedText}>{underline}</Text>
          {after}
        </Text>
      );
    }
    return item.text;
  };
  if (showResultsPage) {
    return (
      <>
        {/* Full Version Modal */}
        <Modal
          visible={showFullVersion}
          transparent
          animationType="fade"
          onRequestClose={() => setShowFullVersion(false)}
        >
          <View style={styles.fullScreenModalOverlay}>
            <LinearGradient
              colors={['#E6E7FF', '#FFFFFF']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.fullScreenModalGradient}
            >
              <View style={styles.fullVersionIconCircle}>
                <Image
                  source={require('@/assets/images/buttons/crown.png')}
                  style={styles.fullVersionIcon}
                />
              </View>
              <Text style={styles.fullVersionTitle}>Welcome to the full version, Emma! 🎉</Text>
              <Text style={styles.fullVersionSubtitle}>Let’s build your fluency together!</Text>
              <TouchableOpacity
                style={styles.fullVersionButton}
                onPress={() => {
                  setShowFullVersion(false);
                  router.push('/(tabs)/lessons');
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.fullVersionButtonText}>Go to My Lessons</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </Modal>

        <SafeAreaView style={styles.resultsContainer}>
          <ScrollView contentContainerStyle={styles.resultsScrollContent}>
            <View style={styles.trophyContainer}>
              <View style={styles.trophyIcon}>
                <Text style={styles.trophyEmoji}>🏆</Text>
              </View>
            </View>

            <Text style={styles.resultsTitle}>Great job, Emma!</Text>
            <Text style={styles.resultsSubtitle}>Your trial is over</Text>

            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Image source={require('@/assets/images/buttons/book.png')} style={styles.statCardIcon} />
                <Text style={styles.statCardLabel}>Words Learned</Text>
                <Text style={styles.statCardValue}>127</Text>
              </View>
              <View style={styles.statCard}>
                <Image source={require('@/assets/images/buttons/microphone_black.png')} style={styles.statCardIcon} />
                <Text style={styles.statCardLabel}>Phrases Practiced</Text>
                <Text style={styles.statCardValue}>45</Text>
              </View>
            </View>

            <Text style={styles.readyText}>You're ready for the next level!🚀</Text>

            <Text style={styles.plansTitle}>Upgrade Plan</Text>
            <View style={styles.plansContainer}>
              {[
                { name: 'Standard', price: '$9.99', period: '/month', badge: 'Most flexible' },
                { name: 'Pro', price: '$19.99', period: '/month', badge: 'Save 50%' },
                { name: 'Yearly', price: '$199.99', period: '/month', badge: 'Best value' },
              ].map(plan => (
                <TouchableOpacity
                  key={plan.name}
                  style={[
                    styles.planOption,
                    selectedPlan === plan.name && styles.planOptionSelected
                  ]}
                  onPress={() => setSelectedPlan(plan.name)}
                  activeOpacity={0.8}
                >
                  <View style={styles.planOptionLeft}>
                    <Text style={styles.planName}>{plan.name}</Text>
                    <Text style={styles.planPrice}>
                      {plan.price}
                      <Text style={styles.planPeriod}>{plan.period}</Text>
                    </Text>
                  </View>
                  <View style={[
                    styles.planBadge,
                    plan.name === 'Pro' && styles.planBadgeSelected
                  ]}>
                    <Text style={[
                      styles.planBadgeText,
                      plan.name === 'Pro' && styles.planBadgeTextSelected
                    ]}>
                      {plan.badge}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.upgradeButton}
              onPress={() => setShowFullVersion(true)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#667EEA', '#764BA2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.continueButton}
              >
                <Text style={styles.continueButtonText}>Upgrade Plan</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }

  return (
    <LinearGradient
      colors={['#23244D', '#3A2966', '#7B3FA0', '#23244D']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
          <Image
            source={require('@/assets/images/buttons/arrow_left.png')}
            style={styles.headerIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Listening Practice</Text>
          <Text style={styles.headerSubtitle}>Daily Conversations</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.audioFrameContainer}>

          <View style={styles.audioFrameContent}>
            <TouchableOpacity 
              style={styles.audioSpeakerButton}
              onPress={loadAndPlayAudio}
            >
              <Image
                source={require('@/assets/images/buttons/volumn.png')}
                style={styles.audioSpeakerIcon}
              />
            </TouchableOpacity>
            
            {/* Waveform visualization */}
            <View style={styles.waveformContainer}>
              {[...Array(24)].map((_, i) => (
                <View 
                  key={i} 
                  style={[
                    styles.waveBar, 
                    { height: 10 + Math.random() * 20 }
                  ]} 
                />
              ))}
            </View>
            
            <View style={styles.audioControlsGroup}>
              <View style={styles.audioSpeedPill}>
                <Text style={styles.audioSpeedText}>1X</Text>
              </View>
              <TouchableOpacity 
                style={styles.audioRepeatPill}
                onPress={loadAndPlayAudio}
              >
                <Text style={styles.audioRepeatText}>Repeat after me</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Conversation Card */}
        <View style={styles.conversationCard}>
          {LISTENING_SCRIPT.map((item, idx) => (
            <View key={idx} style={styles.sentenceRow}>
              <View style={styles.messageRow}>
                <Text style={styles.messageText}>
                  {renderMessageText(item)}
                </Text>
                {item.hasAudio && (
                  <TouchableOpacity style={styles.inlineAudioButton} onPress={() => playTextWithElevenLabsTTS(item.text, idx)}>
                    <Image 
                      source={require('@/assets/images/buttons/volumn.png')} 
                      style={[
                        styles.inlineAudioIcon,
                        currentSentenceIndex === idx && isSentencePlaying && styles.inlineAudioIconActive
                      ]} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Comprehension Check Card */}
        <View style={styles.comprehensionCard}>
          <View style={styles.comprehensionHeader}>
            <Text style={styles.comprehensionTitle}>Comprehension Check</Text>
            {selectedAnswer && (
              <TouchableOpacity 
                style={styles.nextQuestionButton}
                onPress={handleNext}
              >
                <Text style={styles.nextQuestionButtonText}>Next</Text>
                <Image 
                  source={require('@/assets/images/buttons/next.png')} 
                  style={styles.nextQuestionButtonIcon} 
                />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.comprehensionQuestion}>
            {COMPREHENSION_QUESTIONS[currentQuestionIndex].question}
          </Text>
          <View style={styles.optionsContainer}>
            {COMPREHENSION_QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.optionButton,
                  selectedAnswer === option && styles.optionButtonSelected,
                  // Highlight correct answer when an answer is selected
                  selectedAnswer && 
                  option === COMPREHENSION_QUESTIONS[currentQuestionIndex].correctAnswer && 
                  styles.optionButtonCorrect
                ]}
                onPress={() => setSelectedAnswer(option)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.optionText,
                  selectedAnswer === option && styles.optionTextSelected,
                  // Change text color for correct answer
                  selectedAnswer && 
                  option === COMPREHENSION_QUESTIONS[currentQuestionIndex].correctAnswer && 
                  styles.optionTextCorrect
                ]}>
                  {option}
                </Text>
                {selectedAnswer === option && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>
                      {option === COMPREHENSION_QUESTIONS[currentQuestionIndex].correctAnswer ? "✓" : "✗"}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Question progress indicator */}
          <View style={styles.questionProgress}>
            <Text style={styles.questionProgressText}>
              Question {currentQuestionIndex + 1} of {COMPREHENSION_QUESTIONS.length}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Controls */}
      {/* <View style={styles.bottomControls}>
        <TouchableOpacity style={styles.actionButton}>
          <Image source={require('@/assets/images/buttons/keyboard.png')} style={styles.sideIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.micButton}>
          <Image source={require('@/assets/images/buttons/microphone.png')} style={styles.micIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, selectedAnswer && styles.actionButtonEnabled]}
          onPress={handleNext}
          disabled={!selectedAnswer}
        >
          <Image source={require('@/assets/images/buttons/next.png')} style={styles.sideIcon} />
        </TouchableOpacity>
      </View> */}

      {/* Completion Modal */}
      <Modal
        visible={showCompletionModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCompletionModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.completionModalNew}>
            <View style={styles.teacherCardNew}>
              <Image
                source={require('@/assets/images/teacher/teacher_1.png')}
                style={styles.teacherAvatarNew}
              />
              <View style={styles.teacherInfoNew}>
                <Text style={styles.teacherNameNew}>Mary Carter</Text>
                <Text style={styles.teacherTextNew}>Great job! 🎉{"\n"}Let's try the next one.</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleNextExample}
              
              style={{ marginBottom: 20, width: "100%" }}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#667EEA', '#764BA2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={
                  styles.continueButton
                }
              >
                <Text style={styles.continueButtonText}>Next Listening Example</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.lightButton}
              onPress={handleFinishLesson}
              activeOpacity={0.8}
            >
              <Text style={styles.lightButtonText}>Finish Lesson</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Upgrade Modal */}
      <Modal
        visible={showUpgradeModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowUpgradeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={['#E6E7FF', '#FFFFFF']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.upgradeModalNew}
          >
            <View style={styles.lockCircle}>
              <Image
                source={require('@/assets/images/buttons/lock.png')}
                style={styles.lockIconNew}
              />
            </View>
            <Text style={styles.upgradeTitleNew}>
              You're doing great! Want to unlock full lessons and keep learning?
            </Text>
            <TouchableOpacity
              style={styles.whiteButton}
              onPress={handleSeePlans}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#667EEA', '#764BA2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={
                  styles.continueButton
                }
              >
                <Text style={styles.continueButtonText}>See Plans</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.lightButton}
              onPress={handleKeepGoing}
              activeOpacity={0.8}
            >
              <Text style={styles.lightButtonText}>Keep Going</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>

      {/* Audio Controls Bottom Sheet */}
      {showAudioControls && (
        <Animated.View 
          style={[
            styles.audioControlsSheet,
            {
              transform: [
                {
                  translateY: bottomSheetAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0]
                  })
                }
              ]
            }
          ]}
        >
          <View style={styles.audioControlsHeader}>
            <View style={styles.audioControlsHeaderLine} />
            <TouchableOpacity 
              style={styles.audioControlsCloseButton}
              onPress={hideAudioControls}
            >
              <Image 
                source={require('@/assets/images/buttons/close.png')} 
                style={styles.audioControlsCloseIcon} 
              />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.audioTitle}>Listening Practice - Daily Conversations</Text>
          
          <View style={styles.audioProgressContainer}>
            <Text style={styles.audioTimeText}>{formatTime(playbackPosition)}</Text>
            <Slider
              style={styles.audioProgressSlider}
              minimumValue={0}
              maximumValue={playbackDuration}
              value={playbackPosition}
              onSlidingComplete={seekAudio}
              minimumTrackTintColor="#667EEA"
              maximumTrackTintColor="#D1D5DB"
              thumbTintColor="#667EEA"
            />
            <Text style={styles.audioTimeText}>{formatTime(playbackDuration)}</Text>
          </View>
          
          <View style={styles.audioControlsButtons}>
            <TouchableOpacity style={styles.audioControlButton}>
              <Text style={styles.audioPlayPauseIcon}>❎</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.audioPlayPauseButton}
              onPress={togglePlayPause}
            >
              {isPlaying ? (
                <Text style={styles.audioPlayPauseIcon}>⏸️</Text>
              ) : (
                <Text style={styles.audioPlayPauseIcon}>▶️</Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.audioControlButton}>
              <Text style={styles.audioControlIcon}>⏭️</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 20,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  audioControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8EDFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    marginTop: 8,
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  audioIcon: {
    width: 24,
    height: 24,
    tintColor: '#7B6EF6',
    marginRight: 8,
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  speedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginRight: 16,
  },
  repeatText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  conversationCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sentenceRow: {
    marginBottom: 12,
    flexDirection: 'column',
  },
  conversationRow: {
    marginBottom: 10,
  },
  speakerName: {
    fontWeight: '600',
    color: '#7B6EF6',
    marginBottom: 2,
    fontSize: 14,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    lineHeight: 22
  },
  underlinedText: {
    textDecorationLine: 'underline',
    fontWeight: '600',
    color: '#6366F1',
  },
  inlineAudioButton: {
    marginLeft: 8,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inlineAudioIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#7B6EF6',
  },
  comprehensionCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  comprehensionTitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: 8,
  },
  comprehensionQuestion: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#F4F6FB',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: 0,
  },
  optionButtonSelected: {
    backgroundColor: '#E8EDFF',
    borderColor: '#7B6EF6',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  optionTextSelected: {
    color: '#7B6EF6',
    fontWeight: '600',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#7B6EF6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 36,
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E5E7EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  actionButtonEnabled: {
    backgroundColor: '#7B6EF6',
  },
  sideIcon: {
    width: 20,
    height: 20,
    tintColor: '#7B6EF6',
  },
  micButton: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginHorizontal: 20,
    backgroundColor: '#7B6EF6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7B6EF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    marginTop: 20,
    elevation: 4,
  },
  micIcon: {
    width: 36,
    height: 36,
    tintColor: '#fff',
  },
  // ... keep the rest of your modal, results, and plan styles unchanged ...
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  completionModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  teacherSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  teacherAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  teacherMessage: {
    flex: 1,
  },
  teacherName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  teacherText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  modalButton: {
    backgroundColor: '#667EEA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalButtonSecondary: {
    alignItems: 'center',
    padding: 16,
  },
  modalButtonSecondaryText: {
    color: '#666',
    fontSize: 16,
  },
  upgradeModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  lockIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8EDFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  lockIcon: {
    fontSize: 32,
  },
  upgradeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 32,
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: '#E8EDFF',
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  resultsContent: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  planOptionSelected: {
    borderColor: '#667EEA',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  upgradeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  audioFrameContainer: {
    width: '100%',
    height: 70,
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 30,
    overflow: 'hidden',
  },
  audioFrameContent: {
    backgroundColor: '#F4F6FB',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  audioSpeakerButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#C7C8FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  audioSpeakerIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    flex: 1,
    marginHorizontal: 10,
  },
  waveBar: {
    width: 3,
    backgroundColor: '#C7C8FA',
    borderRadius: 1.5,
    marginHorizontal: 2,
  },
  audioControlsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  audioSpeedPill: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 10,
  },
  audioSpeedText: {
    color: '#222B45',
    fontWeight: 'bold',
    fontSize: 14,
  },
  audioRepeatPill: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  audioRepeatText: {
    color: '#222B45',
    fontWeight: '600',
    fontSize: 14,
  },
  completionModalNew: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    width: '90%',
    maxWidth: 380,
    alignItems: 'center',
  },
  teacherCardNew: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F6FB',
    borderRadius: 16,
    padding: 12,
    marginBottom: 28,
    width: '100%',
  },
  teacherAvatarNew: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 14,
  },
  teacherInfoNew: {
    flex: 1,
  },
  teacherNameNew: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222B45',
    marginBottom: 2,
  },
  teacherTextNew: {
    fontSize: 15,
    color: '#222B45',
    lineHeight: 22,
  },
  gradientButton: {
    width: '100%',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 14,
    backgroundColor: 'linear-gradient(90deg, #7B6EF6 0%, #5B5FEF 100%)', // fallback for web, see note below
    // For React Native, use a LinearGradient component if you want a real gradient
  },
  gradientButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  lightButton: {
    width: '100%',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#F4F6FB',
    marginBottom: 0,
  },
  lightButtonText: {
    color: '#222B45',
    fontWeight: 'bold',
    fontSize: 17,
  },
  // Upgrade Modal (Step 3)
  upgradeModalNew: {
    borderRadius: 24,
    padding: 24,
    width: '90%',
    maxWidth: 380,
    alignItems: 'center',
    // No backgroundColor here, LinearGradient provides it
  },
  lockCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    shadowColor: '#E6E7FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  lockIconNew: {
    width: 32,
    height: 32,
    tintColor: '#7B6EF6',
  },
  upgradeTitleNew: {
    fontSize: 17,
    color: '#222B45',
    textAlign: 'center',
    marginBottom: 28,
    fontWeight: 'bold',
  },
  whiteButton: {
    width: '100%',
    borderRadius: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 14,
  },
  whiteButtonText: {
    color: '#7B6EF6',
    fontWeight: 'bold',
    fontSize: 17,
  },
  resultsScrollContent: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  trophyContainer: {
    marginTop: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  trophyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 70,
    backgroundColor: '#F4F6FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  trophyEmoji: {
    fontSize: 40,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222B45',
    textAlign: 'center',
    marginBottom: 4,
  },
  resultsSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 18,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 12,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    width: 140,
    marginHorizontal: 4,
    shadowColor: '#E6E7FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
  statCardIcon: {
    width: 32,
    height: 32,
    marginBottom: 8,
    tintColor: '#7B6EF6',
  },
  statCardLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  statCardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222B45',
  },
  readyText: {
    fontSize: 15,
    color: '#222B45',
    textAlign: 'center',
    marginBottom: 18,
  },
  plansTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222B45',
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  plansContainer: {
    width: '100%',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  planOption: {
    backgroundColor: '#F4F6FB',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  planOptionLeft: {
    flex: 1,
  },
  planName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222B45',
    marginBottom: 2,
  },
  planPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222B45',
  },
  planPeriod: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#888',
  },
  planBadge: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 12,
  },
  planBadgeSelected: {
    backgroundColor: '#7B6EF6',
  },
  planBadgeText: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
  },
  planBadgeTextSelected: {
    color: '#fff',
  },
  upgradeButton: {
    width: '90%',
    marginTop: 8,
    borderRadius: 40,
    overflow: 'hidden',
  },
  continueButton: {
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  
  // Full Version Modal
  fullVersionModal: {
    height: "100%",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    padding: 0,
  },
  fullVersionIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#E6E7FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  fullVersionIcon: {
    width: 60,
    height: 60,
    tintColor: '#7B6EF6',
  },
  fullVersionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222B45',
    textAlign: 'center',
    marginBottom: 8,
    marginHorizontal: 30
  },
  fullVersionSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  fullVersionButton: {
    width: 260,
    borderRadius: 24,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: '#7B6EF6',
    paddingVertical: 16,
    alignItems: 'center',
  },
  fullVersionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  fullScreenModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 9999,
  },
  fullScreenModalGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
  optionButtonCorrect: {
    backgroundColor: '#E6F7EF',
    borderColor: '#34D399',
  },
  optionTextCorrect: {
    color: '#059669',
    fontWeight: '600',
  },
  questionProgress: {
    marginTop: 16,
    alignItems: 'center',
  },
  questionProgressText: {
    fontSize: 14,
    color: '#666',
  },
  comprehensionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nextQuestionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8EDFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  nextQuestionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7B6EF6',
    marginRight: 4,
  },
  nextQuestionButtonIcon: {
    width: 16,
    height: 16,
    tintColor: '#7B6EF6',
  },
  audioControlsSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  audioControlsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  audioControlsHeaderLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E8EDFF',
  },
  audioControlsCloseButton: {
    padding: 8,
  },
  audioControlsCloseIcon: {
    width: 24,
    height: 24,
    tintColor: '#7B6EF6',
  },
  audioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222B45',
    textAlign: 'center',
    marginVertical: 16,
  },
  audioProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  audioTimeText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  audioProgressSlider: {
    flex: 1,
  },
  audioControlsButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  audioControlButton: {
    padding: 12,
  },
  audioPlayPauseButton: {
    padding: 12,
  },
  audioControlIcon: {
    width: 24,
    height: 24,
    tintColor: '#7B6EF6',
  },
  audioPlayPauseIcon: {
    width: 32,
    height: 32,
    tintColor: '#7B6EF6',
  },
  inlineAudioIconActive: {
    tintColor: '#4B39EF'
  }
});
