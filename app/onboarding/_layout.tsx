import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="name" />
      <Stack.Screen name="greeting" />
      <Stack.Screen name="language" />
      <Stack.Screen name="reason" />
      <Stack.Screen name="goals" />
      <Stack.Screen name="login" />
      <Stack.Screen name="complete" />
      <Stack.Screen name="save-progress" />
      <Stack.Screen name="teacher" />
      <Stack.Screen name="ready" />
      <Stack.Screen name="final" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="purpose-language" />
    </Stack>
  );
}