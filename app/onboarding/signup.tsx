import React, { useState, useEffect } from 'react';
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

import { signup, login } from '../api/auth';
import { UserInfo, getUserInfo, saveUserInfo } from '../storage/userStorage';

import { LinearGradient } from 'expo-linear-gradient'; // Add this import
import LoadingOverlay from '../../components/LoadingOverlay'; // adjust path as needed

import { useRouter } from 'expo-router';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const info = await getUserInfo();
      setUserInfo(info);
    };
    fetchUserInfo();
  }, []);

  function ErrorModal({ visible, message, onClose }: { visible: boolean, message: string, onClose: () => void }) {
    if (!visible) return null;
    return (
      <View style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
      }}>
        <View style={{
          backgroundColor: '#fff',
          padding: 24,
          borderRadius: 12,
          minWidth: 200,
          alignItems: 'center',
        }}>
          <Text style={{ color: '#333', fontSize: 16, marginBottom: 16 }}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={{ padding: 8 }}>
            <Text style={{ color: '#667EEA', fontWeight: 'bold' }}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }


  const handleContinue = async () => {
    // const userInfo = getUserInfo();
    // print("asdf",userInfo)
    if (!userInfo) return;
    setIsLoading(true);
    try {
      const res = await signup({
        email,
        password,
        name: userInfo.name ?? '',
        native_language: userInfo.native_language ?? '',
        purpose_language: userInfo.purpose_language ?? '',
        reason: userInfo.reason ?? '',
        time: userInfo.time ?? 0,
      });
      
      const loginRes = await login({ username: email, password });
      if (loginRes.access_token !== null) {
        // Save access token to user storage
        await saveUserInfo({ access_token: loginRes.access_token });
        router.push('/onboarding/ready');
      } else {
        setErrorMsg(loginRes.detail || 'Login Failed');
      }

      
      console.log(loginRes)
      // Call login API
      
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    router.push('/onboarding/save-progress');
  };

  const handleBack = () => {
    router.back();
  };

  

  return (
    <View style={styles.container}>
      <LoadingOverlay visible={isLoading} />
      <ErrorModal
        visible={!!errorMsg}
        message={errorMsg || ''}
        onClose={() => setErrorMsg(null)}
      />
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
        <Text style={styles.title}>Save Your Progress</Text>
        <KeyboardAvoidingView
          style={styles.inputContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TextInput
            style={styles.nameInput}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="words"
            returnKeyType="done"
          />

          <TextInput
            style={styles.nameInput}
            placeholder="Create your password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            returnKeyType="done"
            secureTextEntry={true}
          />

          <TouchableOpacity
            onPress={handleContinue}
            disabled={!email.trim()}
            style={{ marginBottom: 20 }}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={email.trim() ? ['#667EEA', '#764BA2'] : ['#D1D5DB', '#D1D5DB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.continueButton,
                !email.trim() && styles.continueButtonDisabled,
              ]}
            >
              <Text style={styles.continueButtonText}>Register</Text>
            </LinearGradient>
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
  soundButtonText: {
    fontSize: 20,
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
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 32,
  },
  iconImage: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
});