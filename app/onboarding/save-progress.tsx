import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    Image
  } from 'react-native';
  import { useRouter } from 'expo-router';
  
  export default function SaveProgressScreen() {
    const router = useRouter();
  
    const handleEmailContinue = () => {
      router.push('/onboarding/ready');
    };
  
    const handleGoogleContinue = () => {
      router.push('/onboarding/ready');
    };
  
    const handleSocialContinue = (platform: string) => {
      router.push('/onboarding/ready');
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
            source={{ uri: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400' }}
            style={styles.backgroundImage}
          />
        </View>
  
        {/* White Bottom Section */}
        <View style={styles.bottomSection}>
          <Text style={styles.title}>Save Your Progress</Text>
          
          <TouchableOpacity 
            style={styles.emailButton}
            onPress={handleEmailContinue}
          >
            <Text style={styles.emailIcon}>✉️</Text>
            <Text style={styles.emailButtonText}>Continue with Email</Text>
          </TouchableOpacity>
  
          <TouchableOpacity 
            style={styles.googleButton}
            onPress={handleGoogleContinue}
          >
            <Text style={styles.googleIcon}>G</Text>
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>
  
          <Text style={styles.orText}>Or continue with</Text>
  
          <View style={styles.socialButtons}>
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => handleSocialContinue('facebook')}
            >
              <Text style={styles.socialIcon}>f</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => handleSocialContinue('twitter')}
            >
              <Text style={styles.socialIcon}>𝕏</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => handleSocialContinue('apple')}
            >
              <Text style={styles.socialIcon}>🍎</Text>
            </TouchableOpacity>
          </View>
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
      height: '50%',
      position: 'relative',
    },
    backgroundImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    bottomSection: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingHorizontal: 24,
      paddingTop: 32,
      paddingBottom: 40,
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: '#333',
      textAlign: 'center',
      marginBottom: 32,
    },
    emailButton: {
      backgroundColor: '#667EEA',
      borderRadius: 24,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    emailIcon: {
      fontSize: 20,
      marginRight: 12,
    },
    emailButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    googleButton: {
      backgroundColor: '#FFFFFF',
      borderRadius: 24,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
      borderWidth: 1,
      borderColor: '#E5E7EB',
    },
    googleIcon: {
      fontSize: 18,
      marginRight: 12,
      fontWeight: 'bold',
      color: '#4285F4',
    },
    googleButtonText: {
      color: '#333',
      fontSize: 16,
      fontWeight: '600',
    },
    orText: {
      textAlign: 'center',
      color: '#9CA3AF',
      fontSize: 14,
      marginBottom: 24,
    },
    socialButtons: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 16,
    },
    socialButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: '#F3F4F6',
      alignItems: 'center',
      justifyContent: 'center',
    },
    socialIcon: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });