import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="login_email" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="signup_email" />
    </Stack>
  );
}