import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';

import { useRouter } from 'expo-router';

import { LinearGradient } from 'expo-linear-gradient'; // Add this import

const LESSONS_UNIT_1 = [
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
    title: 'Phrase Builder', 
    icon: '🧱', 
    completed: false, 
    locked: false,
    type: 'speaking'
  },
  { 
    id: 4, 
    title: 'Talki with a Friend', 
    icon: '💬', 
    completed: false, 
    locked: true,
    type: 'vocabulary'
  },
  { 
    id: 5, 
    title: 'Pronunciation Feedback', 
    icon: '🗣️', 
    completed: false, 
    locked: true,
    type: 'grammar'
  },
  { 
    id: 6, 
    title: 'Real Life Practice Mision', 
    icon: '🕹️', 
    completed: false, 
    locked: true,
    type: 'speaking'
  },
  { 
    id: 7, 
    title: 'Vocabulary', 
    icon: '📚', 
    completed: false, 
    locked: true,
    type: 'vocabulary'
  },
  { 
    id: 8, 
    title: 'Grammar', 
    icon: '✏️', 
    completed: false, 
    locked: true,
    type: 'grammar'
  },
  { 
    id: 9, 
    title: 'Speak Freely', 
    icon: '💬', 
    completed: false, 
    locked: true,
    type: 'speaking'
  },
  { 
    id: 10, 
    title: 'Vocabulary', 
    icon: '📚', 
    completed: false, 
    locked: true,
    type: 'vocabulary'
  },
  { 
    id: 11, 
    title: 'Grammar', 
    icon: '✏️', 
    completed: false, 
    locked: true,
    type: 'grammar'
  },
  { 
    id: 12, 
    title: 'Speak Freely', 
    icon: '💬', 
    completed: false, 
    locked: true,
    type: 'speaking'
  },
];

const LESSONS_UNIT_2 = [
  { 
    id: 1, 
    title: 'Vocabulary', 
    icon: '📚', 
    completed: false, 
    locked: true,
    type: 'vocabulary'
  },
  { 
    id: 2, 
    title: 'Grammar', 
    icon: '✏️', 
    completed: true, 
    locked: true,
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
  }
];

export default function LessonsTab() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  

  const handleLessonPress = (lesson: any) => {
    console.log("lesson type: ",lesson.type)
    if (!lesson.locked) {
      // Navigate to specific lesson type
      // Only allow known lesson types to satisfy the type checker
      const allowedTypes = ['vocabulary', 'grammar', 'speaking'] as const;
      type LessonType = typeof allowedTypes[number];
      if (allowedTypes.includes(lesson.type)) {
        router.push(`/lessons/${lesson.type}` as
          | '/lessons/vocabulary'
          | '/lessons/grammar'
          | '/lessons/speaking'
        );
      }
    }
  };

  const handleLessonPlayPress = (lesson : any) => {
    console.log("lesson type: ",lesson.type)
    if (!lesson.locked) {
      // Navigate to specific lesson type
      // Only allow known lesson types to satisfy the type checker
      const allowedTypes = ['vocabulary', 'grammar', 'speaking'] as const;
      if (lesson.type == 'vocabulary')
        router.push('/lessons/voice')
      else if (lesson.type == 'grammar')
        router.push('/lessons/grammar-voice')
      else if (lesson.type == 'speaking')
        router.push('/lessons/voice')
    }
  }

  return (
    <LinearGradient
      colors={['#23244D', '#3A2966', '#7B3FA0', '#23244D']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>
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
              <Text style={styles.statValue}> 20 min</Text>
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
              <Text style={styles.statValue}> 2</Text>
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
              <Text style={styles.statValue}> 1</Text>
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
          {LESSONS_UNIT_1.map((lesson, index) => (
            <View style={{ flexDirection: "row" }} key={lesson.id}>
              <TouchableOpacity
                style={[
                  styles.lessonItemCheck,
                  lesson.locked && styles.lessonItemLocked
                ]}
                >
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
              </TouchableOpacity>
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
                  onPress={() => handleLessonPlayPress(lesson)}
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
            </View>
          ))}
        </View>
        {/* Unit Section */}
        <View style={styles.unitSection}>
          <Text style={styles.unitTitle}>Unit 2</Text>
          <Text style={styles.unitSubtitle}>Free Conversation</Text>
        </View>

        {/* Lessons List */}
        <View style={styles.lessonsContainer}>
          {LESSONS_UNIT_2.map((lesson, index) => (
            <View style={{ flexDirection: "row" }} key={lesson.id}>
              <TouchableOpacity
                style={[
                  styles.lessonItemCheck,
                  lesson.locked && styles.lessonItemLocked
                ]}
                >
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
              </TouchableOpacity>
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
                  onPress={() => handleLessonPlayPress(lesson)}
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
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
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
    color: 'white',
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 16,
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
    color: 'white',
    marginBottom: 4,
  },
  unitSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  lessonsContainer: {
    gap: 16,
    paddingBottom: 50,
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
    width: '73%',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  lessonItemCheck: {
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
    width: 72,
    marginRight: 20,
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: 'rgba(109 107 107 / 0.2)',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 10,
  }
});