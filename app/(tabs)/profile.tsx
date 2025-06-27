import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  Modal,
  TextInput
} from 'react-native';

import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const TEACHERS = [
  {
    id: 'mary',
    name: 'Mary Carter',
    accent: 'American',
    traits: ['Gentle', 'Calming'],
    image: require('@/assets/images/teacher/teacher_1.png'),
  },
  {
    id: 'james',
    name: 'James Wilson',
    accent: 'British',
    traits: ['Emotional', 'Funny'],
    image: require('@/assets/images/teacher/teacher_2.png'),
  },
  {
    id: 'michael',
    name: 'Michael John',
    accent: 'American',
    traits: ['Smooth', 'Funny'],
    image: require('@/assets/images/teacher/teacher_3.png'),
  },
  {
    id: 'emily',
    name: 'Emily Parker',
    accent: 'American',
    traits: ['Sarcastic', 'Rough'],
    image: require('@/assets/images/teacher/teacher_4.png'),
  },
];

const LANGUAGES = [
  { id: 'spanish', name: 'Spanish', flag: '🇪🇸' },
  { id: 'portuguese', name: 'Portuguese', flag: '🇧🇷' },
  { id: 'french', name: 'French', flag: '🇫🇷' },
  { id: 'english', name: 'English', flag: '🇺🇸' },
  { id: 'german', name: 'German', flag: '🇩🇪' },
  { id: 'mandarin', name: 'Mandarin', flag: '🇨🇳' },
  { id: 'japanese', name: 'Japanese', flag: '🇯🇵' },
  { id: 'italian', name: 'Italian', flag: '🇮🇹' },
  { id: 'korean', name: 'Korean', flag: '🇰🇷' },
];

const CANCELLATION_REASONS = [
  { id: 'expensive', text: 'Too expensive', image: require('@/assets/images/buttons/wallet.png') },
  { id: 'not_using', text: 'I like it, but just not using it', image: require('@/assets/images/buttons/like.png') },
  { id: 'break', text: 'Taking a break', image: require('@/assets/images/buttons/coffee.png') },
  { id: 'speech_recognition', text: "Speech recognition isn't accurate", image: require('@/assets/images/buttons/dislike.png') },
  { id: 'other', text: 'Other', image: require('@/assets/images/buttons/other.png') },
];


export default function ProfileTab() {
  const router = useRouter();
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState('james');
  const [selectedLanguage, setSelectedLanguage] = useState('french');
  const [selectedCancellationReason, setSelectedCancellationReason] = useState('');
  const [cancellationText, setCancellationText] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleSettingPress = (itemId: string) => {
    switch (itemId) {
      case 'teacher':
        setShowTeacherModal(true);
        break;
      case 'language':
        setShowLanguageModal(true);
        break;
      case 'membership':
        setShowMembershipModal(true);
        break;
      case 'logout':
        setShowLogoutModal(true);
        break;
      default:
        break;
    }
  };

  const handleLogoutPress = () => {
    router.push('/onboarding')
  }

  const handleTeacherSelect = (teacherId: string) => {
    setSelectedTeacher(teacherId);
    setShowTeacherModal(false);
  };

  const handleLanguageSelect = (languageId: string) => {
    setSelectedLanguage(languageId);
    setShowLanguageModal(false);
  };

  const handleCancelSubscription = () => {
    setShowMembershipModal(false);
    setShowCancellationModal(true);
  };

  const handleSendFeedback = () => {
    setShowCancellationModal(false);
    // Handle cancellation logic here
  };

  const selectedTeacherData = TEACHERS.find(t => t.id === selectedTeacher);
  const selectedLanguageData = LANGUAGES.find(l => l.id === selectedLanguage);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Text style={styles.profileName}>Emma Doe</Text>
          <Text style={styles.joinDate}>Joined May 5, 2025</Text>
        </View>

        {/* Settings Section */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>

          {/* Change Teacher */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => handleSettingPress('teacher')}
            activeOpacity={0.7}
          >
            <Text style={styles.settingTitle}>Change Teacher</Text>
            <View style={styles.pillRight}>
              <Image source={selectedTeacherData?.image} style={styles.pillAvatar} />
              <Text style={styles.pillText}>{selectedTeacherData?.name}</Text>
              <Image
                source={require('@/assets/images/buttons/arrow_right.png')}
                style={styles.logoutIcon}
              />
            </View>
          </TouchableOpacity>

          {/* App Language */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => handleSettingPress('language')}
            activeOpacity={0.7}
          >
            <Text style={styles.settingTitle}>App Language</Text>
            <View style={styles.pillRight}>
              <Text style={styles.pillFlag}>{selectedLanguageData?.flag}</Text>
              <Text style={styles.pillText}>{selectedLanguageData?.name}</Text>
              <Image
                source={require('@/assets/images/buttons/arrow_right.png')}
                style={styles.logoutIcon}
              />
            </View>
          </TouchableOpacity>

          {/* Notifications */}
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingSubtitle}>Set App Reminders</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E5E7EB', true: '#667EEA' }}
              thumbColor={'#FFFFFF'}
            />
          </View>

          {/* Manage Membership */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => handleSettingPress('membership')}
            activeOpacity={0.7}
          >
            <Text style={styles.settingTitle}>Manage Membership</Text>
            <View style={styles.pillRight}>
              <Text style={styles.pillText}>Premium</Text>
              <Image
                source={require('@/assets/images/buttons/arrow_right.png')}
                style={styles.logoutIcon}
              />
            </View>
          </TouchableOpacity>

          {/* Buy Extra Minutes */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => handleSettingPress('minutes')}
            activeOpacity={0.7}
          >
            <Text style={styles.settingTitle}>Buy Extra Minutes</Text>
            <Image
              source={require('@/assets/images/buttons/arrow_right.png')}
              style={styles.logoutIcon}
            />
          </TouchableOpacity>

          {/* Contact */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => handleSettingPress('contact')}
            activeOpacity={0.7}
          >
            <Text style={styles.settingTitle}>Contact</Text>
            <Image
              source={require('@/assets/images/buttons/arrow_right.png')}
              style={styles.logoutIcon}
            />
          </TouchableOpacity>

          {/* Privacy Policy */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => handleSettingPress('privacy')}
            activeOpacity={0.7}
          >
            <Text style={styles.settingTitle}>Privacy Policy</Text>
            <Image
              source={require('@/assets/images/buttons/arrow_right.png')}
              style={styles.logoutIcon}
            />
          </TouchableOpacity>

          {/* Terms of Use */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => handleSettingPress('terms')}
            activeOpacity={0.7}
          >
            <Text style={styles.settingTitle}>Terms of Use</Text>
            <Image
              source={require('@/assets/images/buttons/arrow_right.png')}
              style={styles.logoutIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Log Out at the bottom */}
        <View style={{ marginTop: 32, marginBottom: 24, marginHorizontal: 18 }}>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => handleSettingPress('logout')}
            activeOpacity={0.7}
          >
            <Text style={styles.settingTitle}>Log Out</Text>
            <Image
              source={require('@/assets/images/buttons/logout.png')}
              style={styles.logoutIcon}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Teacher Selection Modal */}
      <Modal
        visible={showTeacherModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTeacherModal(false)}
      >
        <View style={styles.modalOverlayBottom}>
          <View style={styles.bottomSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Change Teacher</Text>
            </View>
            
            <ScrollView style={styles.modalContent}>
              {TEACHERS.map((teacher) => (
                <TouchableOpacity
                  key={teacher.id}
                  style={[
                    styles.teacherOption,
                    selectedTeacher === teacher.id && styles.teacherOptionSelected
                  ]}
                  onPress={() => handleTeacherSelect(teacher.id)}
                >
                  <Image source={teacher.image} style={styles.teacherOptionImage} />
                  <View style={styles.teacherOptionInfo}>
                    <View style={styles.teacherOptionHeader}>
                      <Text style={styles.teacherOptionName}>{teacher.name}</Text>
                      <View style={styles.accentContainer}>
                        <Image
                          source={require('@/assets/images/buttons/volumn.png')}
                          style={styles.soundIcon}
                        />
                        <Text style={styles.accentText}>{teacher.accent}</Text>
                      </View>
                    </View>
                    <View style={styles.traitsContainer}>
                      {teacher.traits.map((trait, index) => (
                        <View key={index} style={styles.traitBadge}>
                          <Text style={styles.traitText}>{trait}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowTeacherModal(false)}
            >
              <LinearGradient
                colors={['#667EEA', '#764BA2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.modalButtonText}>
                  Select {selectedTeacherData?.name}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlayBottom}>
          <View style={styles.bottomSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>App Language</Text>
            </View>
            
            <ScrollView style={styles.modalContent}>
              {LANGUAGES.map((language) => (
                <TouchableOpacity
                  key={language.id}
                  style={[
                    styles.languageOption,
                    selectedLanguage === language.id && styles.languageOptionSelected
                  ]}
                  onPress={() => handleLanguageSelect(language.id)}
                >
                  <Text style={styles.languageFlag}>{language.flag}</Text>
                  <Text style={styles.languageName}>{language.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowLanguageModal(false)}
            >
              <LinearGradient
                colors={['#667EEA', '#764BA2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.modalButtonText}>
                  Switch to {selectedLanguageData?.name}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Membership Modal */}
      <Modal
        visible={showMembershipModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowMembershipModal(false)}
      >
        <View style={styles.modalOverlayBottom}>
          <View style={styles.bottomSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Manage Membership</Text>
            </View>
            
            <View style={styles.modalContent}>
              <View style={styles.subscriptionCard}>
                <LinearGradient
                  colors={['#667EEA', '#764BA2']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.subscriptionGradient}
                >
                  <Text style={styles.subscriptionLabel}>Your Subscription</Text>
                  <Text style={styles.subscriptionPlan}>Standard</Text>
                  <Text style={styles.subscriptionPrice}>$9.99/month</Text>
                  <Text style={styles.subscriptionNext}>Next payment: Jun 7, 2025</Text>
                </LinearGradient>
              </View>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowMembershipModal(false)}
              >
                <LinearGradient
                  colors={['#667EEA', '#764BA2']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.modalButtonText}>See all Plans</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelSubscription}
              >
                <Text style={styles.cancelButtonText}>Cancel Subscription</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Cancellation Feedback Modal */}
      <Modal
        visible={showCancellationModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCancellationModal(false)}
      >
        <View style={styles.fullScreenModal}>
          <SafeAreaView style={styles.cancellationContainer}>
            <View style={styles.cancellationHeader}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setShowCancellationModal(false)}
              >
                <Image
                  source={require('@/assets/images/buttons/arrow_left.png')}
                  style={styles.backIcon}
                />
              </TouchableOpacity>
              <Text style={styles.cancellationTitle}>Manage Membership</Text>
            </View>

            <ScrollView style={styles.cancellationContent}>
              <Text style={styles.cancellationQuestion}>Why do you want to cancel?</Text>

              {CANCELLATION_REASONS.map((reason) => (
                <TouchableOpacity
                  key={reason.id}
                  style={[
                    styles.reasonOption,
                    selectedCancellationReason === reason.id && styles.reasonOptionSelected
                  ]}
                  onPress={() => setSelectedCancellationReason(reason.id)}
                >
                  <Image source={reason.image} style={styles.reasonImage} />
                  <Text style={styles.reasonText}>{reason.text}</Text>
                </TouchableOpacity>
              ))}

              {selectedCancellationReason === 'other' && (
                <TextInput
                  style={styles.cancellationTextInput}
                  placeholder="Write your reason here..."
                  placeholderTextColor="#999"
                  value={cancellationText}
                  onChangeText={setCancellationText}
                  multiline
                />
              )}
            </ScrollView>

            <View style={styles.cancellationFooter}>
              <TouchableOpacity
                style={styles.sendFeedbackButton}
                onPress={handleSendFeedback}
                disabled={!selectedCancellationReason}
              >
                <LinearGradient
                  colors={['#667EEA', '#764BA2']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[
                    styles.gradientButton,
                    !selectedCancellationReason && styles.disabledButton
                  ]}
                >
                  <Text style={styles.modalButtonText}>Send Feedback & Cancel</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </Modal>

      {/* Logout Confirm Modal */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.logoutDialog}>
            <Text style={styles.logoutDialogTitle}>Log Out</Text>
            <Text style={styles.logoutDialogText}>Are you sure you want to log out?</Text>
            <View style={styles.logoutDialogActions}>
              <TouchableOpacity
                style={styles.logoutDialogButton}
                onPress={() => setShowLogoutModal(false)}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['#667EEA', '#A685FA']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.logoutDialogButtonGradient}
                >
                  <Text style={styles.logoutDialogButtonNoText}>No</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.logoutDialogButton, styles.logoutDialogButtonYes]}
                onPress={()=>handleLogoutPress()}
                activeOpacity={0.7}
              >
                <Text style={styles.logoutDialogButtonYesText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 32,
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  settingsSection: {
    paddingHorizontal: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  teacherImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  settingIcon: {
    fontSize: 20,
  },
  flagIcon: {
    fontSize: 24,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    color: '#9CA3AF',
    marginRight: 8,
  },
  arrow: {
    fontSize: 18,
    color: '#D1D5DB',
    fontWeight: '300',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  modalContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  modalButton: {
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 40
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  teacherOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  teacherOptionSelected: {
    backgroundColor: '#E8EDFF',
    borderColor: '#667EEA',
  },
  teacherOptionImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  teacherOptionInfo: {
    flex: 1,
  },
  teacherOptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  teacherOptionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  accentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  soundIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
    tintColor: '#666',
  },
  accentText: {
    fontSize: 14,
    color: '#666',
  },
  traitsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  traitBadge: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  traitText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  languageOptionSelected: {
    backgroundColor: '#E8EDFF',
    borderColor: '#667EEA',
  },
  languageFlag: {
    fontSize: 24,
    marginRight: 16,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  subscriptionCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  subscriptionGradient: {
    padding: 20,
  },
  subscriptionLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 8,
  },
  subscriptionPlan: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subscriptionPrice: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
  },
  subscriptionNext: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 12,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  fullScreenModal: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  cancellationContainer: {
    flex: 1,
  },
  cancellationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#666',
  },
  cancellationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  cancellationContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  cancellationQuestion: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reasonOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 40,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  reasonOptionSelected: {
    backgroundColor: '#E8EDFF',
    borderColor: '#667EEA',
  },
  reasonIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  reasonText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  cancellationTextInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    minHeight: 100,
    textAlignVertical: 'top',
    marginTop: 16,
  },
  cancellationFooter: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
  },
  sendFeedbackButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.5,
  },
  pillRight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minHeight: 40,
    minWidth: 80,
    marginLeft: 8,
    gap: 8,
  },
  pillAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 6,
  },
  pillFlag: {
    fontSize: 22,
    marginRight: 6,
  },
  pillText: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
    marginRight: 2,
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: 16,
    marginHorizontal: 24,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  logoutTitle: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  logoutIcon: {
    width: 28,
    height: 28,
    tintColor: '#000000',
  },
  reasonImage: {
    width: 32,
    height: 32,
    marginRight: 16,
    resizeMode: 'contain',
  },
  modalOverlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalOverlayCenter: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    padding: 28,
    alignItems: 'center',
  },
  logoutDialog: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  logoutDialogTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222',
    marginBottom: 12,
  },
  logoutDialogText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 28,
    textAlign: 'center',
  },
  logoutDialogActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  logoutDialogButton: {
    flex: 1,
    borderRadius: 24,
    marginHorizontal: 4,
  },
  logoutDialogButtonNo: {
    backgroundColor: 'linear-gradient(90deg, #667EEA 0%, #764BA2 100%)', // fallback for iOS, see below for gradient
    // backgroundColor: '#667EEA', // fallback for Android
  },
  logoutDialogButtonGradient: {
    borderRadius: 24,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 14,
  },
  logoutDialogButtonNoText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  logoutDialogButtonYes: {
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutDialogButtonYesText: {
    color: '#222',
    fontWeight: '600',
    fontSize: 16,
  },
});