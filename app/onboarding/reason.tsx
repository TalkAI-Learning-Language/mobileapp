import { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';

import { saveUserInfo } from '../storage/userStorage';

const REASONS = [
  { id: 'work', title: 'For work', image: 'work.png' },
  { id: 'school', title: 'For school or exams', image: 'school.png' },
  { id: 'daily', title: 'To speak better in daily life', image: 'daily.png' },
  { id: 'dating', title: 'For dating and social life', image: 'dating.png' },
  { id: 'speak', title: 'I just want to speak English well', image: 'speak.png' },
  { id: 'pronunciation', title: 'Improve pronunciation', image: 'pronunciation.png' },
  { id: 'other', title: 'Other', image: 'other.png' },
];

const reasonImages = {
  'work.png': require('@/assets/images/reasons/work.png'),
  'school.png': require('@/assets/images/reasons/school.png'),
  'daily.png': require('@/assets/images/reasons/daily.png'),
  'dating.png': require('@/assets/images/reasons/dating.png'),
  'speak.png': require('@/assets/images/reasons/speak.png'),
  'pronunciation.png': require('@/assets/images/reasons/pronunciation.png'),
  'other.png': require('@/assets/images/reasons/other.png'),
} as const;

type ReasonImageKey = keyof typeof reasonImages;

export default function ReasonScreen() {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const router = useRouter();

  const handleContinue = () => {
    // if (selectedReason) {
      router.push('/onboarding/time');
    // }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image
            source={require('@/assets/images/buttons/arrow_left.png')}
            style={styles.iconImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.soundButton}>
          <Image
            source={require('@/assets/images/buttons/volumn.png')}
            style={styles.iconImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Background Image with Teacher */}
      <View style={styles.backgroundContainer}>
        <Image
          source={require('@/assets/images/default_avatar.png')}
          style={styles.backgroundImage}
        />
      </View>

      {/* White Bottom Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.title}>What's your main reason for learning English?</Text>
        
        <ScrollView style={styles.reasonList} showsVerticalScrollIndicator={false}>
          <View style={styles.reasonGrid}>
            {REASONS.map(reason => (
              <TouchableOpacity
                key={reason.id}
                style={[
                  styles.reasonItem,
                  selectedReason === reason.id && styles.reasonItemSelected
                ]}
                onPress={() => {
                  setSelectedReason(reason.id);
                  saveUserInfo({ reason: reason.title });
                  handleContinue();
                }}
              >
                <Image
                  source={reasonImages[reason.image as keyof typeof reasonImages]}
                  style={styles.reasonIcon}
                  resizeMode="contain"
                />
                <Text style={[
                  styles.reasonText,
                  selectedReason === reason.id && styles.reasonTextSelected
                ]}>
                  {reason.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

      </View>
    </View>
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
    paddingTop: 50,
    paddingBottom: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#333',
  },
  soundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  soundButtonText: {
    fontSize: 20,
  },
  backgroundContainer: {
    height: '45%',
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '140%',
    resizeMode: 'cover',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  reasonList: {
    flex: 1,
    marginBottom: 20,
  },
  reasonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  reasonItem: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  reasonItemSelected: {
    backgroundColor: '#E8EDFF',
    borderColor: '#667EEA',
  },
  reasonIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  reasonText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  reasonTextSelected: {
    color: '#667EEA',
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#667EEA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  iconImage: {
    backgroundColor: 'transparent',
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
});