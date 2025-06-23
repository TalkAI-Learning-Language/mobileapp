import { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';
import { useRouter } from 'expo-router';

const EXPERIENCE_LEVELS = [
  { 
    id: 'beginner', 
    title: 'Complete Beginner', 
    description: 'I\'m just starting out',
    icon: '🌱'
  },
  { 
    id: 'elementary', 
    title: 'Elementary', 
    description: 'I know some basic words',
    icon: '📚'
  },
  { 
    id: 'intermediate', 
    title: 'Intermediate', 
    description: 'I can have simple conversations',
    icon: '💬'
  },
  { 
    id: 'advanced', 
    title: 'Advanced', 
    description: 'I\'m quite fluent already',
    icon: '🎯'
  },
];

export default function ExperienceScreen() {
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const router = useRouter();

  const handleContinue = () => {
    router.push('/onboarding/complete');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.stepText}>3 of 4</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>What's your current level?</Text>
        <Text style={styles.subtitle}>This helps us personalize your learning</Text>

        <View style={styles.levelsContainer}>
          {EXPERIENCE_LEVELS.map(level => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.levelItem,
                selectedLevel === level.id && styles.levelItemSelected
              ]}
              onPress={() => setSelectedLevel(level.id)}
            >
              <Text style={styles.levelIcon}>{level.icon}</Text>
              <View style={styles.levelTextContainer}>
                <Text style={[
                  styles.levelTitle,
                  selectedLevel === level.id && styles.levelTitleSelected
                ]}>
                  {level.title}
                </Text>
                <Text style={styles.levelDescription}>{level.description}</Text>
              </View>
              <View style={[
                styles.radioButton,
                selectedLevel === level.id && styles.radioButtonSelected
              ]}>
                {selectedLevel === level.id && <View style={styles.radioButtonInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.continueButton, !selectedLevel && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedLevel}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    fontSize: 16,
    color: '#667EEA',
  },
  stepText: {
    fontSize: 14,
    color: '#6B7280',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
  },
  levelsContainer: {
    gap: 16,
  },
  levelItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  levelItemSelected: {
    borderColor: '#667EEA',
    backgroundColor: '#F0F4FF',
  },
  levelIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  levelTextContainer: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  levelTitleSelected: {
    color: '#667EEA',
  },
  levelDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
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
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
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
});