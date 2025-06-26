import { Stack } from 'expo-router';

export default function LessonsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="vocabulary" />
      <Stack.Screen name="grammar" />
      <Stack.Screen name="speaking" />
      <Stack.Screen name="voice" />
    </Stack>
  );
}