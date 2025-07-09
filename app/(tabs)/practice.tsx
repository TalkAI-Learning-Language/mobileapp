import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';

import AnimatedRecordButton from '@/components/ui/AnimatedRecordButton';
import { LinearGradient } from 'expo-linear-gradient'; // Add this import

const CONVERSATION = [
  { speaker: 'Emma', text: "Hi! How's it going?", hasAudio: true },
  { speaker: 'Tom', text: '"Me too", I feel the same', hasAudio: true, isIncomplete: true },
  { speaker: 'Emma', text: "Same here. Work's been crazy lately.", hasAudio: true, hasUnderline: true, underline: 'Same here' },
  { speaker: 'Tom', text: "Tell me about it. Ready for the weekend?", hasAudio: true },
  { speaker: 'Emma', text: "Totally. Can't wait to sleep in!", hasAudio: true, hasUnderline: true, underline: 'sleep in' },
];

const COMPREHENSION_OPTIONS = [
  'Going to work',
  'The weekend',
  'A birthday party',
];

export default function PracticeTab() {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showResultsPage, setShowResultsPage] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Pro');
  const [showFullVersion, setShowFullVersion] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const router = useRouter();

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      setShowCompletionModal(true);
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

  // Helper to render underlined text
  const renderMessageText = (item: typeof CONVERSATION[0]) => {
    if (item.hasUnderline && item.underline) {
      const [before, after] = item.text.split(item.underline);
      return (
        <Text>
          {before}
          <Text style={styles.underlinedText}>{item.underline}</Text>
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
            <TouchableOpacity style={styles.audioSpeakerButton}>
              <Image
                source={require('@/assets/images/buttons/volumn.png')}
                style={styles.audioSpeakerIcon}
              />
            </TouchableOpacity>
            <Image
              source={require('@/assets/images/practice/audio_frame.png')}
              style={styles.audioFrameBg}
            />
            <View style={styles.audioTextGroup}>
              <View style={styles.audioSpeedPill}>
                <Text style={styles.audioSpeedText}>0.5X</Text>
              </View>
              <View style={styles.audioRepeatPill}>
                <Text style={styles.audioRepeatText}>Repeat after me</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Conversation Card */}
        <View style={styles.conversationCard}>
          {CONVERSATION.map((item, idx) => (
            <View key={idx} style={styles.conversationRow}>
              <Text style={styles.speakerName}>{item.speaker}:</Text>
              <View style={styles.messageRow}>
                <Text style={styles.messageText}>
                  {renderMessageText(item)}
                </Text>
                {item.hasAudio && (
                  <TouchableOpacity style={styles.inlineAudioButton}>
                    <Image source={require('@/assets/images/buttons/volumn.png')} style={styles.inlineAudioIcon} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Comprehension Check Card */}
        <View style={styles.comprehensionCard}>
          <Text style={styles.comprehensionTitle}>Comprehension Check</Text>
          <Text style={styles.comprehensionQuestion}>What is Emma excited about?</Text>
          <View style={styles.optionsContainer}>
            {COMPREHENSION_OPTIONS.map((option, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.optionButton,
                  selectedAnswer === option && styles.optionButtonSelected
                ]}
                onPress={() => setSelectedAnswer(option)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.optionText,
                  selectedAnswer === option && styles.optionTextSelected
                ]}>
                  {option}
                </Text>
                {selectedAnswer === option && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
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
      </View>

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
  waveBar: {
    width: 3,
    height: 16,
    backgroundColor: '#667EEA',
    borderRadius: 2,
    marginHorizontal: 1,
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
    backgroundColor: '#F4F6FB',
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
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
  },
  messageText: {
    fontSize: 16,
    color: '#222B45',
    flexShrink: 1,
  },
  underlinedText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: '#222B45',
  },
  inlineAudioButton: {
    marginLeft: 8,
  },
  inlineAudioIcon: {
    width: 18,
    height: 18,
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
    height: 90,
    marginTop: 8,
    marginBottom: 24,
    borderRadius: 28,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  audioFrameBg: {
    position: 'relative',
    top: 0,
    left: 0,
    marginRight: 5
  },
  audioFrameContent: {
    backgroundColor: '#F4F6FB',
    padding: 5,
    
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    zIndex: 1,
  },
  audioSpeakerButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#C7C8FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5
  },
  audioSpeakerIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  audioWaveform: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 40,
    marginRight: 24,
    gap: 3,
  },
  audioWaveBar: {
    width: 6,
    borderRadius: 3,
    backgroundColor: '#B1B3F7',
    marginHorizontal: 1,
  },
  audioTextGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  audioSpeedPill: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 5,
    minWidth: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioSpeedText: {
    color: '#222B45',
    fontWeight: 'bold',
    fontSize: 15,
  },
  audioRepeatPill: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioRepeatText: {
    color: '#222B45',
    fontWeight: 'bold',
    fontSize: 16,
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
});