import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'; // Add this import

const LESSONS = [
  { 
    id: 1, 
    title: 'Vocabulary', 
    icon: '📚', 
    completed: true, 
    locked: false,
    type: 'vocabulary'
  },
  { 
    id: 2, 
    title: 'Grammar', 
    icon: '✏️', 
    completed: true, 
    locked: false,
    type: 'grammar'
  },
  { 
    id: 3, 
    title: 'Speak Freely', 
    icon: '💬', 
    completed: false, 
    locked: true,
    type: 'speaking'
  },
  { 
    id: 4, 
    title: 'Vocabulary', 
    icon: '📚', 
    completed: false, 
    locked: true,
    type: 'vocabulary'
  },
  { 
    id: 5, 
    title: 'Grammar', 
    icon: '✏️', 
    completed: false, 
    locked: true,
    type: 'grammar'
  },
  { 
    id: 6, 
    title: 'Speak Freely', 
    icon: '💬', 
    completed: false, 
    locked: true,
    type: 'speaking'
  },
];

export default function LessonsTab() {
  const handleLessonPress = (lesson: any) => {
    if (!lesson.locked) {
      // Navigate to lesson
      console.log('Starting lesson:', lesson.title);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Lessons</Text>
            <View style={styles.streakContainer}>
              <Image
                source={require('@/assets/images/lessons/cup.png')}
                style={styles.iconImage}
                resizeMode="contain"
              />
              <Text style={styles.streakNumber}> 1</Text>
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Time</Text>
            <View style={styles.statRow}>
              <Image
                source={require('@/assets/images/lessons/cup.png')}
                style={styles.iconImage}
                resizeMode="contain"
              />
              <Text style={styles.statValue}>20 min</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Lessons</Text>
            <View style={styles.statRow}>
              <Image
                source={require('@/assets/images/lessons/book.png')}
                style={styles.iconImage}
                resizeMode="contain"
              />
              <Text style={styles.statValue}>2</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Units</Text>
            <View style={styles.statRow}>
              <Image
                source={require('@/assets/images/lessons/unit.png')}
                style={styles.iconImage}
                resizeMode="contain"
              />
              <Text style={styles.statValue}>1</Text>
            </View>
          </View>
        </View>

        {/* Current Lesson */}
        <View style={styles.currentLessonContainer}>
          
        </View>

        <TouchableOpacity
          style={{ marginBottom: 20 }}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#667EEA', '#764BA2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.continueButton
            ]}
          >
            <View style={styles.currentLesson}>
              <View style={styles.currentLessonContent}>
                <Text style={styles.currentLessonTitle}>Grammar</Text>
                <Text style={styles.currentLessonSubtitle}>Unit 1</Text>
              </View>
              <TouchableOpacity style={styles.continueButton}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Unit Section */}
        <View style={styles.unitSection}>
          <Text style={styles.unitTitle}>Unit 1</Text>
          <Text style={styles.unitSubtitle}>Job & Work English</Text>
        </View>

        {/* Lessons List */}
        <View style={styles.lessonsContainer}>
          {LESSONS.map((lesson, index) => (
            <TouchableOpacity
              key={lesson.id}
              style={[
                styles.lessonItem,
                lesson.locked && styles.lessonItemLocked
              ]}
              onPress={() => handleLessonPress(lesson)}
              disabled={lesson.locked}
            >
              <View style={styles.lessonLeft}>
                <View style={[
                  styles.lessonIconContainer,
                  lesson.completed && styles.lessonIconCompleted,
                  lesson.locked && styles.lessonIconLocked
                ]}>
                  {lesson.completed ? (
                    <Text style={styles.completedIcon}>✓</Text>
                  ) : lesson.locked ? (
                    <Text style={styles.lockedIcon}>🔒</Text>
                  ) : (
                    <Text style={styles.lessonIcon}>{lesson.icon}</Text>
                  )}
                </View>
                <Text style={[
                  styles.lessonTitle,
                  lesson.locked && styles.lessonTitleLocked
                ]}>
                  {lesson.icon} {lesson.title}
                </Text>
              </View>
              
              <TouchableOpacity 
                style={[
                  styles.playButton,
                  lesson.locked && styles.playButtonLocked
                ]}
                disabled={lesson.locked}
              >
                <Text style={[
                  styles.playButtonText,
                  lesson.locked && styles.playButtonTextLocked
                ]}>
                  Play
                </Text>
                <Image
                  source={require('@/assets/images/lessons/play.png')}
                  style={styles.iconImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EDFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 60,
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  streakIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  streakNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  currentLessonContainer: {
    marginBottom: 32,
  },
  currentLesson: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currentLessonContent: {
    flex: 1,
  },
  currentLessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  currentLessonSubtitle: {
    fontSize: 14,
    color: '#E0E7FF',
  },
  continueButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  continueButtonText: {
    color: '#667EEA',
    fontSize: 14,
    fontWeight: '600',
  },
  unitSection: {
    marginBottom: 24,
  },
  unitTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  unitSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  lessonsContainer: {
    gap: 16,
    paddingBottom: 100,
  },
  lessonItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  lessonItemLocked: {
    opacity: 0.6,
  },
  lessonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lessonIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  lessonIconCompleted: {
    backgroundColor: '#343434',
  },
  lessonIconLocked: {
    backgroundColor: '#E5E7EB',
  },
  lessonIcon: {
    fontSize: 18,
  },
  completedIcon: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  lockedIcon: {
    fontSize: 16,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  lessonTitleLocked: {
    color: '#9CA3AF',
  },
  playButton: {
    backgroundColor: '#667EEA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  playButtonLocked: {
    backgroundColor: '#E5E7EB',
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  playButtonTextLocked: {
    color: '#9CA3AF',
  },
  playIcon: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  playIconLocked: {
    color: '#9CA3AF',
  }, 
  iconImage: {
    backgroundColor: 'transparent',
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  lessonCard: {
    flex: 1,
    backgroundColor: '#08080833'
  }, 
  statRow: {

  }
});