import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity 
} from 'react-native';

const PRACTICE_MODES = [
  {
    id: 1,
    title: 'Flashcards',
    description: 'Review vocabulary with interactive cards',
    icon: '🗂️',
    difficulty: 'Easy',
  },
  {
    id: 2,
    title: 'Speaking Practice',
    description: 'Improve pronunciation with voice recognition',
    icon: '🎤',
    difficulty: 'Medium',
  },
  {
    id: 3,
    title: 'Listening Quiz',
    description: 'Test your comprehension skills',
    icon: '🎧',
    difficulty: 'Medium',
  },
  {
    id: 4,
    title: 'Grammar Challenge',
    description: 'Master sentence structure and rules',
    icon: '📝',
    difficulty: 'Hard',
  },
];

export default function PracticeTab() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Practice</Text>
          <Text style={styles.subtitle}>Choose your practice mode</Text>
        </View>

        <View style={styles.practiceContainer}>
          {PRACTICE_MODES.map(mode => (
            <TouchableOpacity key={mode.id} style={styles.practiceCard}>
              <Text style={styles.practiceIcon}>{mode.icon}</Text>
              <View style={styles.practiceContent}>
                <View style={styles.practiceHeader}>
                  <Text style={styles.practiceTitle}>{mode.title}</Text>
                  <View style={[
                    styles.difficultyBadge,
                    mode.difficulty === 'Easy' && styles.difficultyEasy,
                    mode.difficulty === 'Medium' && styles.difficultyMedium,
                    mode.difficulty === 'Hard' && styles.difficultyHard,
                  ]}>
                    <Text style={[
                      styles.difficultyText,
                      mode.difficulty === 'Easy' && styles.difficultyEasyText,
                      mode.difficulty === 'Medium' && styles.difficultyMediumText,
                      mode.difficulty === 'Hard' && styles.difficultyHardText,
                    ]}>
                      {mode.difficulty}
                    </Text>
                  </View>
                </View>
                <Text style={styles.practiceDescription}>{mode.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  practiceContainer: {
    gap: 16,
  },
  practiceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  practiceIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  practiceContent: {
    flex: 1,
  },
  practiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  practiceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyEasy: {
    backgroundColor: '#D1FAE5',
  },
  difficultyMedium: {
    backgroundColor: '#FEF3C7',
  },
  difficultyHard: {
    backgroundColor: '#FEE2E2',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  difficultyEasyText: {
    color: '#065F46',
  },
  difficultyMediumText: {
    color: '#92400E',
  },
  difficultyHardText: {
    color: '#991B1B',
  },
  practiceDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});