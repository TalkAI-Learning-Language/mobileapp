import { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'; // Add this import

import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    // if (name.trim()) {
      router.push('/onboarding/greeting');
    // }
  };

  const handleLogin = () => {
    router.push('/onboarding/login');
  };

  return (
    <View style={styles.container}>
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
              Hi! Welcome! I'm Mary Carter, your language teacher. I'll help you learn fast and speak with confidence! 😊 What's your name?
            </Text>
          </View>
        </View>
      </View>

      {/* White Bottom Section */}
      <View style={styles.bottomSection}>
        <KeyboardAvoidingView
          style={styles.inputContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TextInput
            style={styles.nameInput}
            placeholder="Type your name here..."
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            returnKeyType="done"
          />

          <TouchableOpacity
            onPress={handleContinue}
            disabled={!name.trim()}
            style={{ marginBottom: 20 }}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={name.trim() ? ['#667EEA', '#764BA2'] : ['#D1D5DB', '#D1D5DB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.continueButton,
                !name.trim() && styles.continueButtonDisabled,
              ]}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin} style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginLink}>Log In</Text>
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  backgroundContainer: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '105%',
    resizeMode: 'cover',
  },
  speechBubbleContainer: {
    position: 'absolute',
    bottom: 10,
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
    marginBottom: 10,
  },
  speechBubbleTail: {
    position: 'absolute',
    bottom: -16,
    left: '50%',
    marginLeft: -12,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 16,
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    minHeight: 200,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  inputContainer: {
    alignItems: 'stretch',
  },
  nameInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  continueButton: {
    borderRadius: 50,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    // backgroundColor: '#D1D5DB',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    fontSize: 14,
    color: '#6B7280',
    paddingBottom: 20
  },
  loginLink: {
    color: '#667EEA',
    fontWeight: '600',
  },
});