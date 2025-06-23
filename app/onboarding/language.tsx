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

export default function LanguageScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const router = useRouter();

  const handleContinue = () => {
    router.push('/onboarding/reason');
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
        <Text style={styles.title}>What's your native language?</Text>
        
        <ScrollView style={styles.languageList} showsVerticalScrollIndicator={false}>
          {LANGUAGES.map(language => (
            <TouchableOpacity
              key={language.id}
              style={[
                styles.languageItem,
                selectedLanguage === language.id && styles.languageItemSelected
              ]}
              onPress={() => {
                  setSelectedLanguage(language.id);
                  handleContinue()
                }
              }
            >
              <Text style={styles.languageFlag}>{language.flag}</Text>
              <Text style={[
                styles.languageText,
                selectedLanguage === language.id && styles.languageTextSelected
              ]}>
                {language.name}
              </Text>
              {selectedLanguage === language.id && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
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
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  languageList: {
    flex: 1,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 8,
    backgroundColor: '#F5F7FB',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  languageItemSelected: {
    backgroundColor: '#E8EDFF',
    borderColor: '#667EEA',
  },
  languageFlag: {
    fontSize: 24,
    marginRight: 16,
  },
  languageText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  languageTextSelected: {
    color: '#667EEA',
    fontWeight: '600',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#667EEA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#667EEA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
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