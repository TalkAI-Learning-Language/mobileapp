import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    Image
  } from 'react-native';
  import { useRouter } from 'expo-router';

  import { LinearGradient } from 'expo-linear-gradient'; // Add this import
  
  export default function FinalScreen() {
    const router = useRouter();
  
    const handleStartLesson = () => {
        router.replace('/(tabs)/lessons');
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
          
          {/* Speech Bubble on Image */}
          <View style={styles.speechBubbleContainer}>
            <View style={styles.speechBubble}>
              <Text style={styles.messageText}>
                You now have 10 minutes of free speaking time with Sarah Miller
              </Text>
            </View>
          </View>
        </View>
  
        {/* White Bottom Section */}
        <TouchableOpacity
          onPress={handleStartLesson}
          style={styles.startLessonButton}
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
            <Text style={styles.continueButtonText}>Start My First Lesson</Text>
          </LinearGradient>
        </TouchableOpacity>
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
    timerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
    },
    timerIcon: {
      fontSize: 16,
      marginRight: 4,
    },
    timerText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },
    backgroundContainer: {
      flex: 1,
      position: 'relative',
    },
    backgroundImage: {
      width: '100%',
      height: '120%',
      resizeMode: 'cover',
    },
    speechBubbleContainer: {
      position: 'absolute',
      bottom: 40,
      left: 5,
      right: 5,
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
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingHorizontal: 24,
      paddingTop: 32,
      paddingBottom: 40,
      minHeight: 120,
      justifyContent: 'center',
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
    continueButton: {
      backgroundColor: '#667EEA',
      borderRadius: 50,
      padding: 16,
      alignItems: 'center',
    },
    continueButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    startLessonButton: {
      margin: 20,
      borderRadius: 50
    },
    iconImage: {
      backgroundColor: 'transparent',
      width: 24,
      height: 24,
      alignSelf: 'center',
    },
    soundButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      alignItems: 'center',
      justifyContent: 'center',
    },   
  });