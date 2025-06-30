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

const TEACHERS = [
  {
    id: 'mary',
    name: 'Mary Carter',
    accent: 'American',
    traits: ['Gentle', 'Calming'],
    image: 'teacher_1.png',
    selected: true,
  },
  {
    id: 'james',
    name: 'James Wilson',
    accent: 'British',
    traits: ['Emotional', 'Funny'],
    image: 'teacher_2.png',
    selected: false,
  },
  {
    id: 'michael',
    name: 'Michael John',
    accent: 'American',
    traits: ['Smooth', 'Funny'],
    image: 'teacher_3.png',
    selected: false,
  },
  {
    id: 'emily',
    name: 'Emily Parker',
    accent: 'American',
    traits: ['Sarcastic', 'Rough'],
    image: 'teacher_4.png',
    selected: false,
  },
];

const teacherImages = {
  'teacher_1.png': require('@/assets/images/teacher/teacher_1.png'),
  'teacher_2.png': require('@/assets/images/teacher/teacher_2.png'),
  'teacher_3.png': require('@/assets/images/teacher/teacher_3.png'),
  'teacher_4.png': require('@/assets/images/teacher/teacher_4.png'),
};

export default function TeacherScreen() {
  const [selectedTeacher, setSelectedTeacher] = useState('mary');
  const router = useRouter();

  const handleContinue = () => {
    router.push('/onboarding/final');
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
        <Text style={styles.title}>Choose your English teacher to guide you!</Text>
        
        <ScrollView style={styles.teacherList} showsVerticalScrollIndicator={false}>
          {TEACHERS.map(teacher => (
            <TouchableOpacity
              key={teacher.id}
              style={[
                styles.teacherItem,
                selectedTeacher === teacher.id && styles.teacherItemSelected
              ]}
              onPress={() => {
                setSelectedTeacher(teacher.id);
                handleContinue();
              }}
            >
              <Image
                source={teacherImages[teacher.image as keyof typeof teacherImages]}
                style={styles.teacherImage}
              />
              <View style={styles.teacherInfo}>
                <View style={styles.teacherHeader}>
                  <Text style={styles.teacherName}>{teacher.name}</Text>
                  <View style={styles.accentContainer}>
                    <Text style={styles.soundIcon}>🔊</Text>
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
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  teacherList: {
    flex: 1,
    marginBottom: 20,
  },
  teacherItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  teacherItemSelected: {
    backgroundColor: '#E8EDFF',
    borderColor: '#667EEA',
  },
  teacherImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  teacherInfo: {
    flex: 1,
  },
  teacherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  teacherName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  accentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  soundIcon: {
    fontSize: 16,
    marginRight: 4,
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