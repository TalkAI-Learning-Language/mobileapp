import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';
import { useRouter } from 'expo-router';

export default function CompleteScreen() {
  const router = useRouter();

  const handleStart = () => {
    router.replace('/(tabs)/lessons');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.successIcon}>🎉</Text>
        </View>

        <Text style={styles.title}>You're all set!</Text>
        <Text style={styles.subtitle}>
          We've created your personalized learning plan. Ready to start your language journey?
        </Text>

        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📚</Text>
            <Text style={styles.featureText}>Personalized lessons</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🎯</Text>
            <Text style={styles.featureText}>Goal-oriented practice</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📊</Text>
            <Text style={styles.featureText}>Progress tracking</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>Start Learning</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 32,
  },
  successIcon: {
    fontSize: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 48,
  },
  featuresContainer: {
    alignSelf: 'stretch',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  startButton: {
    backgroundColor: '#667EEA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});