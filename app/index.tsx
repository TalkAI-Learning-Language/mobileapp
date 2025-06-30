import { useEffect } from 'react';
import { 
  View,
  StyleSheet,
  Text,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Simulate splash screen delay
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/splash-icon.png')}
        style={styles.iconImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667EEA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
  },
  iconImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});