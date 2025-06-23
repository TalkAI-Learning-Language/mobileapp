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

const TIME_OPTIONS = [
  { id: '5', label: '5 mins' },
  { id: '10', label: '10 mins' },
  { id: '20', label: '20 mins' },
  { id: '30', label: '30+ mins' },
];

export default function TimeScreen() {
  const [selectedTime, setSelectedTime] = useState('10');
  const router = useRouter();

  const handleContinue = () => {
    router.push('/onboarding/save-progress');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.soundButton}>
          <Text style={styles.soundButtonText}>🔊</Text>
        </TouchableOpacity>
      </View>

      {/* Background Image with Teacher */}
      <View style={styles.backgroundContainer}>
        <Image
          source={require('@/assets/images/default_avatar.png')}
          style={styles.backgroundImage}
        />
        
        {/* Speech Bubble on Image */}
        <View style={styles.speechBubbleContainer}>
          <View style={styles.speechBubble}>
            <Text style={styles.messageText}>
              No pressure! Just choose what works for you 😊
            </Text>
            <View style={styles.speechBubbleTail} />
          </View>
        </View>
      </View>

      {/* White Bottom Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.title}>How much time can you study each day?</Text>
        
        <ScrollView style={styles.reasonList} showsVerticalScrollIndicator={false}>
          <View style={styles.timeOptions}>
            {TIME_OPTIONS.map(option => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.timeOption,
                  selectedTime === option.id && styles.timeOptionSelected
                ]}
                onPress={() => 
                  {
                    setSelectedTime(option.id);
                    handleContinue();
                  }
                }
              >
                <View style={styles.radioContainer}>
                  <View style={[
                    styles.radioButton,
                    selectedTime === option.id && styles.radioButtonSelected
                  ]}>
                    {selectedTime === option.id && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <Text style={[
                    styles.timeText,
                    selectedTime === option.id && styles.timeTextSelected
                  ]}>
                    {option.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        {/* <TouchableOpacity 
          style={styles.continueButton}
          
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity> */}
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
  reasonList: {
    flex: 1
  },
  soundButtonText: {
    fontSize: 20,
  },
  backgroundContainer: {
    height: '50%',
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  speechBubbleContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  speechBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    maxWidth: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  speechBubbleTail: {
    position: 'absolute',
    bottom: -10,
    left: '50%',
    marginLeft: -10,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#333333',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 32,
  },
  timeOptions: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  timeOption: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: '#F8F9FA',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  timeOptionSelected: {
    backgroundColor: '#E8EDFF',
    borderColor: '#667EEA',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  radioButtonSelected: {
    borderColor: '#667EEA',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#667EEA',
  },
  timeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  timeTextSelected: {
    color: '#667EEA',
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#667EEA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});