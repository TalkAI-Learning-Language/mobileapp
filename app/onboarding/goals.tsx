import { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';

const GOALS = [
  { id: 1, title: 'Travel', icon: '✈️' },
  { id: 2, title: 'Business', icon: '💼' },
  { id: 3, title: 'Education', icon: '🎓' },
  { id: 4, title: 'Personal Growth', icon: '🌱' },
  { id: 5, title: 'Culture', icon: '🌍' },
  { id: 6, title: 'Family', icon: '👨‍👩‍👧‍👦' },
];

export default function GoalsScreen() {
  const [selectedGoals, setSelectedGoals] = useState<number[]>([]);
  const router = useRouter();

  const toggleGoal = (goalId: number) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleContinue = () => {
    // router.push('/onboarding/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.stepText}>2 of 4</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>What are your goals?</Text>
        <Text style={styles.subtitle}>Select all that apply</Text>

        <View style={styles.goalsContainer}>
          {GOALS.map(goal => (
            <TouchableOpacity
              key={goal.id}
              style={[
                styles.goalItem,
                selectedGoals.includes(goal.id) && styles.goalItemSelected
              ]}
              onPress={() => toggleGoal(goal.id)}
            >
              <Text style={styles.goalIcon}>{goal.icon}</Text>
              <Text style={[
                styles.goalText,
                selectedGoals.includes(goal.id) && styles.goalTextSelected
              ]}>
                {goal.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.continueButton, selectedGoals.length === 0 && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={selectedGoals.length === 0}
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
  goalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  goalItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: '45%',
    flex: 1,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  goalItemSelected: {
    borderColor: '#667EEA',
    backgroundColor: '#F0F4FF',
  },
  goalIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  goalText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  goalTextSelected: {
    color: '#667EEA',
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