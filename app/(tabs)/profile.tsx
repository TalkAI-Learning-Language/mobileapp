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
];

const CANCELLATION_REASONS = [
  { id: 'expensive', text: 'Too expensive', icon: '💰' },
  { id: 'not_using', text: 'I like it, but just not using it', icon: '👍' },
  { id: 'break', text: 'Taking a break', icon: '☕' },
  { id: 'speech_recognition', text: "Speech recognition isn't accurate", icon: '🎤' },
  { id: 'other', text: 'Other', icon: '💬' },
];

const SETTINGS_ITEMS = [
  {
    id: 'teacher',
    title: 'Change Teacher',
    value: 'Sarah Miller',
    icon: '👩‍🏫',
    hasArrow: true,
  },
  {
    id: 'language',
    title: 'App Language',
    value: 'English',
    icon: '🇺🇸',
    hasArrow: true,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    subtitle: 'Set App Reminders',
    hasSwitch: true,
    switchValue: true,
  },
  {
    id: 'membership',
    title: 'Manage Membership',
    value: 'Premium',
    hasArrow: true,
  },
  {
    id: 'minutes',
    title: 'Buy Extra Minutes',
    hasArrow: true,
  },
  {
    id: 'contact',
    title: 'Contact',
    hasArrow: true,
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    hasArrow: true,
  },
  {
    id: 'terms',
    title: 'Terms of Use',
    hasArrow: true,
  },
  {
    id: 'logout',
    title: 'Log Out',
    icon: '🔄',
    isLogout: true,
  },
];

export default function ProfileTab() {
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState('james');
  const [selectedLanguage, setSelectedLanguage] = useState('french');
  const [selectedCancellationReason, setSelectedCancellationReason] = useState('');
  const [cancellationText, setCancellationText] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

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
      default:
        break;
    }
  };

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
          
          {SETTINGS_ITEMS.map((item, index) => (
            <TouchableOpacity 
              key={item.id} 
              style={[
                styles.settingItem,
                item.isLogout && styles.logoutItem
              ]}
              onPress={() => handleSettingPress(item.id)}
            >
              <View style={styles.settingLeft}>
                {item.id === 'teacher' && selectedTeacherData ? (
                  <Image
                    source={selectedTeacherData.image}
                    style={styles.teacherImage}
                  />
                ) : item.id === 'language' && selectedLanguageData ? (
                  <View style={styles.settingIconContainer}>
                    <Text style={styles.flagIcon}>{selectedLanguageData.flag}</Text>
                  </View>
                ) : item.icon && (
                  <View style={styles.settingIconContainer}>
                    <Text style={styles.settingIcon}>{item.icon}</Text>
                  </View>
                )}
                
                <View style={styles.settingTextContainer}>
                  <Text style={[
                    styles.settingTitle,
                    item.isLogout && styles.logoutTitle
                  ]}>
                    {item.title}
                  </Text>
                  {item.subtitle && (
                    <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                  )}
                </View>
              </View>

              <View style={styles.settingRight}>
                {item.hasSwitch ? (
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{ false: '#E5E7EB', true: '#667EEA' }}
                    thumbColor={'#FFFFFF'}
                  />
                ) : item.value ? (
                  <View style={styles.valueContainer}>
                    <Text style={styles.settingValue}>
                      {item.id === 'teacher' && selectedTeacherData ? selectedTeacherData.name :
                       item.id === 'language' && selectedLanguageData ? selectedLanguageData.name :
                       item.value}
                    </Text>
                    {item.hasArrow && (
                      <Text style={styles.arrow}>›</Text>
                    )}
                  </View>
                ) : item.hasArrow ? (
                  <Text style={styles.arrow}>›</Text>
                ) : null}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Teacher Selection Modal */}
      <Modal
        visible={showTeacherModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTeacherModal(false)}
      >
        <View style={styles.modalOverlay}>
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
        <View style={styles.modalOverlay}>
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
        <View style={styles.modalOverlay}>
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
                  <Text style={styles.reasonIcon}>{reason.icon}</Text>
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
    paddingHorizontal: 24,
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
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  logoutItem: {
    marginTop: 24,
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
  logoutTitle: {
    color: '#EF4444',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
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
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 32,
  },
  reasonOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
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
});